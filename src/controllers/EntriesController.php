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

use craft\errors\ElementNotFoundException;
use craft\errors\MissingComponentException;
use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\base\Element;
use craft\web\Controller;
use craft\helpers\DateTimeHelper;
use craft\helpers\StringHelper;
use roundhouse\formbuilder\records\Note;
use Throwable;
use Twig_Error_Loader;
use yii\base\Exception;
use yii\base\ExitException;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Entry as EntryAsset;
use roundhouse\formbuilder\events\EntryEvent;

require_once __DIR__ . '/functions/array-group-by.php';

class EntriesController extends Controller
{

    // Constants
    // =========================================================================
    const EVENT_BEFORE_SUBMIT_ENTRY = 'beforeSubmitEntry';
    const EVENT_AFTER_SUBMIT_ENTRY = 'afterSubmitEntry';

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = [
        'save' => self::ALLOW_ANONYMOUS_LIVE
    ];

    // Public Properties
    // =========================================================================

    public $form;
    public $entry;
    public $post;
    public $files;

    // Public Methods
    // =========================================================================

    /**
     * Entries index page
     *
     * @return Response
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     */
    public function actionIndex()
    {
        $this->requirePermission('fb:accessEntries');

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(EntryAsset::class);

        return $this->renderTemplate('form-builder/entries/index');
    }

    /**
     * Edit entry
     *
     * @param int|null $entryId
     * @return Response
     * @throws InvalidConfigException
     * @throws \yii\db\Exception
     * @throws ForbiddenHttpException
     */
    public function actionEdit(int $entryId = null): Response
    {
        $this->requirePermission('fb:editEntries');

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(EntryAsset::class);

        $variables['entryId'] = $entryId;

        if ($entryId) {
            $variables['entry'] = Entry::find()->id($entryId)->one();
            $variables['title'] = $variables['entry']->title;

            Craft::$app->getDb()->createCommand()
                ->update('{{%formbuilder_entries}}', ['statusId' => 2], ['id' => $variables['entry']->id])
                ->execute();
        }

        $variables['fullPageForm'] = false;
        $variables['continueEditingUrl'] = 'form-builder/entries/{id}';
        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        return $this->renderTemplate('form-builder/entries/_edit', $variables);
    }

    /**
     * Get all unread entries
     *
     * @return Response
     * @throws Twig_Error_Loader
     * @throws Exception
     */
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


    /**
     * Get all unread entries by form ID
     *
     * @return Response
     * @throws Twig_Error_Loader
     * @throws Exception
     * @throws BadRequestHttpException
     */
    public function actionGetUnreadEntriesBySource()
    {
        $this->requirePostRequest();
        $source = Craft::$app->getRequest()->getBodyParam('source');
        $entries = false;

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

    /**
     * Save entry
     *
     * @return null
     * @throws Throwable
     * @throws ElementNotFoundException
     * @throws Exception
     * @throws BadRequestHttpException
     */
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
        $this->entry = new Entry();
        $this->_populateEntryModel($this->entry, $request);

        // Spam Protection
        $this->_spamProtection($request);

        // Check form errors
        if ($this->entry->hasErrors()) {
            $this->entry->clearErrors('title');
            Craft::$app->getUrlManager()->setRouteParams([
                'submission' => $this->entry
            ]);

            return null;
        }

        $this->entry->setScenario(Element::SCENARIO_LIVE);
        $this->entry->validate();

        // Fire a 'beforeSubmitEntry' event
        $event = new EntryEvent([
            'entry' => $this->entry,
            'form' => $this->form
        ]);

        $this->trigger(self::EVENT_BEFORE_SUBMIT_ENTRY, $event);

        if ($saveToDatabase && $event->isValid) {
            if (Craft::$app->getElements()->saveElement($this->entry)) {
                $saved = true;
            } else {
                $saved = false;
            }
        } else {
            $saved = true;
        }


        // Fire a 'afterSubmitEntry' event
        $event = new EntryEvent([
            'entry' => $this->entry,
            'form' => $this->form
        ]);

        $this->trigger(self::EVENT_AFTER_SUBMIT_ENTRY, $event);

        // Notifications
        if ($saved) {
            // Perform Integrations
            if ($this->form->integrations) {
                FormBuilder::$plugin->integrations->performIntegrations($this->entry, $this->form);
            }

            return $this->_returnSuccessMessage();
        } else {
            return $this->_returnErrorMessage($request);
        }
    }

    /**
     * Delete entry
     *
     * @return null|Response
     * @throws NotFoundHttpException
     * @throws Throwable
     * @throws MissingComponentException
     * @throws BadRequestHttpException
     */
    public function actionDelete()
    {
        $this->requirePermission('fb:deleteEntry');
        $this->requirePostRequest();

        $entryId = Craft::$app->getRequest()->getRequiredBodyParam('entryId');
        $entry = Craft::$app->elements->getElementById($entryId);

        // Ensure this is a form builder entry element only
        $validElementType = $entry->refHandle() === 'formbuilderEntry';

        if (!$validElementType) {
            throw new ForbiddenHttpException(FormBuilder::t('You are not allowed to delete this element type.'));
        }

        if (!$entry) {
            throw new NotFoundHttpException('Entry not found');
        }

        if (!Craft::$app->getElements()->deleteElement($entry)) {
            if (Craft::$app->getRequest()->getAcceptsJson()) {
                return $this->asJson(['success' => false]);
            }

            Craft::$app->getSession()->setError(FormBuilder::t('Couldn’t delete entry.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'entry' => $entry
            ]);

            return null;
        }

        // Delete Notes
        Note::deleteAll(['entryId' => $entryId]);

        if (Craft::$app->getRequest()->getAcceptsJson()) {
            return $this->asJson(['success' => true]);
        }

        Craft::$app->getSession()->setNotice(FormBuilder::t( 'Entry deleted.'));

        return $this->redirectToPostedUrl($entry);
    }

    // Private Methods
    // =========================================================================

    /**
     * Populate entry model from post
     *
     * @param Entry $entry
     * @param $request
     * @throws Throwable
     * @throws Exception
     */
    private function _populateEntryModel(Entry $entry, $request)
    {
        $entry->formId          = $this->form->id;
        $entry->statusId        = $request->getRequiredBodyParam('statusId');
        $entry->postedOn        = DateTimeHelper::currentTimeStamp();
        $entry->ipAddress       = $request->getUserIP();
        $entry->userAgent       = $request->getHeaders()->get('user-agent');

        $title = isset($this->form->settings['database']['titleFormat']) && $this->form->settings['database']['titleFormat'] != '' ? $this->form->settings['database']['titleFormat'] : 'Submission - '.DateTimeHelper::currentTimeStamp();
        $entry->title = Craft::$app->getView()->renderObjectTemplate($title, $request->getParam('fields'));

        $_POST['fields']['date'] = DateTimeHelper::currentTimeStamp();

        $fieldsLocation = $request->getParam('fieldsLocation', 'fields');
        $entry->setFieldValuesFromRequest($fieldsLocation);
    }

    /**
     * Validate spam protection
     *
     * @param $request
     * @throws ExitException
     */
    private function _spamProtection($request)
    {
        // Honeypot
        if (isset($this->form->spam['honeypot']['enabled']) && $this->form->spam['honeypot']['enabled'] == '1') {
            $honeypotField = $request->getRequiredBodyParam('email-address-new-one');
            if ($honeypotField != '') {
                $this->entry->addError('honeypot', FormBuilder::t('Failed honeypot validation!'));
            }
        }

        // Timed
        if (isset($this->form->spam['timed']['enabled']) && $this->form->spam['timed']['enabled'] == '1') {
            $submissionTime = (int)$request->getRequiredBodyParam('spamTimeMethod');
            $submissionDuration = time() - $submissionTime;
            $allowedTime = (int)$this->form->spam['timed']['number'];

            if ($submissionDuration < $allowedTime) {
                $this->entry->addError('timed', FormBuilder::t('You submitted too fast!'));
            }
        }
    }

    /**
     * Return error message
     *
     * @param $request
     * @return Response
     */
    private function _returnErrorMessage($request)
    {
        if (Craft::$app->getRequest()->getIsAjax()) {
            return $this->asJson([
                'success' => false,
                'message' => isset($this->form['options']['messages']['error']) ? $this->form['options']['messages']['error'] : FormBuilder::t('Form submission failed.'),
                'errors' => $this->entry->getErrors()
            ]);
        } else {
            Craft::$app->getUrlManager()->setRouteParams([
                'submission' => $this->entry,
                'errors' => $this->entry->getErrors()
            ]);
        }
    }

    /**
     * Return success message
     *
     * @return Response
     * @throws MissingComponentException
     */
    private function _returnSuccessMessage()
    {
        $options = $this->form->options;
        $customRedirect = isset($options['redirect']['enabled']) && $options['redirect']['enabled'] === '1' ? true : false;
        $currentRoute = Craft::$app->request->url;
        $customRedirectUrl =  $currentRoute;

        if (Craft::$app->getRequest()->getIsAjax()) {
            return $this->asJson([
                'success' => true,
                'message' => isset($this->form['options']['messages']['success']) ? $this->form['options']['messages']['success'] : FormBuilder::t('Form submission successful.'),
                'redirect' => $customRedirectUrl
            ]);
        } else {
            if ($customRedirect) {
                $customRedirectUrl =  isset($options['redirect']['url']) && $options['redirect']['url'] != '' ? $options['redirect']['url'] : $currentRoute;

                if ($currentRoute === $customRedirectUrl) {
                    Craft::$app->getSession()->setFlash('success', isset($this->form['options']['messages']['success']) ? $this->form['options']['messages']['success'] : FormBuilder::t('Form submission successful.'));
                } else {
                    $this->redirect($customRedirectUrl);
                }
            } else {
                Craft::$app->getSession()->setFlash('success', isset($this->form['options']['messages']['success']) ? $this->form['options']['messages']['success'] : FormBuilder::t('Form submission successful.'));
            }
        }
    }
}
