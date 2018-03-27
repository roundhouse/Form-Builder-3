<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\controllers;

use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\base\Element;
use craft\web\Controller;
use craft\helpers\DateTimeHelper;
use craft\helpers\StringHelper;
use yii\web\Response;

use roundhouse\formbuilder\events\NotificationEvent;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Entry as EntryAsset;
use roundhouse\formbuilder\events\EntryEvent;

require_once __DIR__ . '/functions/array-group-by.php';

/**
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class EntriesController extends Controller
{

    // Constants
    // =========================================================================
    const EVENT_BEFORE_SUBMIT_ENTRY = 'beforeSubmitEntry';
    const EVENT_AFTER_SUBMIT_ENTRY = 'afterSubmitEntry';
    const EVENT_SEND_NOTIFICATION = 'sendNotification';

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = ['actionIndex', 'actionGetUnreadEntries', 'actionSave'];

    // Public Properties
    // =========================================================================

    public $form;
    public $entry;
    public $post;
    public $files;
    
    // Public Methods
    // =========================================================================
    
    public function actionIndex()
    {
        $this->requireAdmin();

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(EntryAsset::class);

        return $this->renderTemplate('form-builder/entries/index');
    }

    public function actionEdit( int $entryId = null, Entry $entry = null): Response
    {
        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(EntryAsset::class);
        
        $variables['entryId'] = $entryId;

        if ($entryId) {
            $variables['entry'] = Entry::find()->id($entryId)->one();
            $variables['title'] = $variables['entry']->title;
            
            // Update read status
            Craft::$app->getDb()->createCommand()
                ->update('{{%formbuilder_entries}}', ['statusId' => 2], ['id' => $variables['entry']->id])
                ->execute();
        }


        $variables['fullPageForm'] = true;
        $variables['continueEditingUrl'] = 'form-builder/entries/{id}';
        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        return $this->renderTemplate('form-builder/entries/_edit', $variables);
    }

    public function actionGetUnreadEntries()
    {
        $entries = Entry::find()
            ->where(['statusId' => 1])
            ->all();

        $grouped = array_group_by($entries, "formId");

        if ($entries) {
            $template = $this->getView()->renderTemplate('form-builder/entries/_includes/_unread-entries', ['entries' => $entries]);
        } else {
            $template = false;
        }

        return $this->asJson([
            'success' => true,
            'entries' => $entries,
            'grouped' => $grouped,
            'template' => $template,
            'totalCount' => count($entries)
        ]);
    }

    public function actionGetUnreadEntriesBySource()
    {
        $this->requirePostRequest();
        $source = Craft::$app->getRequest()->getBodyParam('source');

        if ($source) {
            $formId = StringHelper::explode($source, ':');

            $entries = Entry::find()
                ->formId($formId[1])
                ->statusId(1)
                ->all();
        }

        if ($entries) {
            $template = $this->getView()->renderTemplate('form-builder/entries/_includes/_unread-entries', ['entries' => $entries]);
        } else {
            $template = false;
        }
        return $this->asJson([
            'success' => true,
            'entries' => $entries,
            'template' => $template,
            'count' => count($entries)
        ]);
    }

    public function actionSave()
    {
        $this->requirePostRequest();

        $request = Craft::$app->getRequest();

        $formId         = $request->getBodyParam('formId');
        $this->form     = FormBuilder::$plugin->forms->getFormRecordById($formId);
        $this->post     = $request->post();
        $this->files    = $_FILES;

        $saveToDatabase = isset($this->form->settings['database']['enabled']) && $this->form->settings['database']['enabled'] == '1' ? true : false;

        // Setup entry model
        $this->entry = $this->_getEntryModel($request);
        $this->_populateEntryModel($this->entry, $request);

        // Spam Protection
        $this->_spamProtection($this->entry, $request);

        // Terms & Conditions
        // $this->_checkTermsConditions();

        $this->entry->setScenario(Element::SCENARIO_LIVE);

        // Check form errors
        if ($this->entry->hasErrors()) {
            Craft::$app->getUrlManager()->setRouteParams([
                'submission' => $this->entry
            ]);

            return null;
        }

        // Fire a 'beforeSubmitEntry' event
        if ($this->hasEventHandlers(self::EVENT_BEFORE_SUBMIT_ENTRY)) {
            $this->trigger(self::EVENT_BEFORE_SUBMIT_ENTRY, new EntryEvent([
                'entry' => $this->entry
            ]));
        }

        if ($saveToDatabase) {
            if (Craft::$app->getElements()->saveElement($this->entry)) {
                $saved = true;
            } else {
                $saved = false;
            }
        } else {
            $saved = true;
        }

        // Fire a 'afterSubmitEntry' event
        if ($this->hasEventHandlers(self::EVENT_AFTER_SUBMIT_ENTRY)) {
            $this->trigger(self::EVENT_AFTER_SUBMIT_ENTRY, new EntryEvent([
                'entry' => $this->entry
            ]));
        }

        // Notifications
        if ($saved) {
            if (FormBuilder::$plugin->isEmailBuilderPlugin()) {
                $this->_sendNotifications($this->form['notifications']);
            } else {
                Craft::error(Craft::t('form-builder', 'Email Builder is not installed, cannot send notification'), __METHOD__);
            }
            $this->_returnSuccessMessage();
        } else {
            $this->_returnErrorMessage($request);
        }
    }

    // Private Methods
    // =========================================================================
    
    /**
     * Creates an entry model
     *
     */
    private function _getEntryModel(): Entry
    {
        $entry = new Entry();

        return $entry;
    }

    /**
     * Populate an entry model
     *
     */
    private function _populateEntryModel(Entry $entry, $request)
    {
        $entry->formId      = $this->form->id;
        $entry->statusId    = $request->getRequiredBodyParam('statusId');
        $entry->ipAddress   = $request->getUserIP();
        $entry->userAgent   = $request->getHeaders()->get('user-agent');

        $title = isset($this->form->settings['database']['titleFormat']) && $this->form->settings['database']['titleFormat'] != '' ? $this->form->settings['database']['titleFormat'] : 'Submission - '.DateTimeHelper::currentTimeStamp();
        $entry->title = Craft::$app->getView()->renderObjectTemplate($title, $request->getParam('fields'));

        $_POST['fields']['date'] = DateTimeHelper::currentTimeStamp();

        $fieldsLocation = $request->getParam('fieldsLocation', 'fields');
        $entry->setFieldValuesFromRequest($fieldsLocation);
    }

    private function _spamProtection(Entry $entry, $request)
    {
        // Honeypot
        if (isset($this->form->spam['honeypot']['enabled']) && $this->form->spam['honeypot']['enabled'] == '1') {
            $honeypotField = $request->getRequiredBodyParam('email-address-new-one');
            if ($honeypotField != '') {
                $entry->addError('honeypot', FormBuilder::t('Failed honeypot validation!'));
            }
        }

        // Timed
        if (isset($this->form->spam['timed']['enabled']) && $this->form->spam['timed']['enabled'] == '1') {
            $submissionTime = (int)$request->getRequiredBodyParam('spamTimeMethod');
            $submissionDuration = time() - $submissionTime;
            $allowedTime = (int)$this->form->spam['timed']['number'];

            if ($submissionDuration < $allowedTime) {
                $entry->addError('timed', FormBuilder::t('You submitted too fast!'));
            }
        }
    }

    /**
     * Return error message
     */
    private function _returnErrorMessage($request)
    {   
        if (Craft::$app->getRequest()->getIsAjax()) {
            return $this->asJson([
                'success' => false,
                'message' => isset($this->form['options']['messages']['error']) ? $this->form['options']['messages']['error'] : FormBuilder::t('Form submission failed.')
            ]);
        } else {
            Craft::$app->getUrlManager()->setRouteParams([
                'submission' => $this->entry
            ]);
        }
    }
    
    private function _returnSuccessMessage()
    {
        if (Craft::$app->getRequest()->getIsAjax()) {
            return $this->asJson([
                'success' => true,
                'message' => isset($this->form['options']['messages']['success']) ? $this->form['options']['messages']['success'] : FormBuilder::t('Form submission successful.')
            ]);
        } else {
            Craft::$app->getSession()->setFlash('success', isset($this->form['options']['messages']['success']) ? $this->form['options']['messages']['success'] : FormBuilder::t('Form submission successful.'));
        }
        
    }

    private function _sendNotifications($notifications)
    {
        $this->trigger(self::EVENT_SEND_NOTIFICATION, new NotificationEvent([
            'form' => $this->form,
            'entry' => $this->entry,
            'notifications' => $notifications
        ]));
    }
}