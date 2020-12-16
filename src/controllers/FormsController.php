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

use craft\base\Element;
use craft\helpers\ArrayHelper;
use craft\services\Elements;
use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\web\Controller;
use craft\helpers\Json;

use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Form as FormAsset;
use roundhouse\formbuilder\web\assets\Group as GroupAsset;
use roundhouse\formbuilder\web\assets\Plugins as PluginsAsset;

class FormsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    /**
     * Forms index page
     *
     * @return Response
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionIndex()
    {
        $this->requirePermission('fb:accessForms');

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(GroupAsset::class);
        $view->registerAssetBundle(FormAsset::class);
        $view->registerAssetBundle(PluginsAsset::class);

        $groups = FormBuilder::getInstance()->getGroups()->getAllGroups();

        return $this->renderTemplate('form-builder/forms/index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Edit form
     *
     * @param int|null $formId
     * @return Response
     * @throws NotFoundHttpException
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionEdit(int $formId = null): Response
    {
        $this->requirePermission('fb:editForms');
        $this->requirePermission('fb:createForms');

        $variables['id'] = $formId;
        $this->_prepEditFormVariables($variables);
        
        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(FormAsset::class);

        if (isset($variables["form"]->fieldLayoutId)) {
            $view->registerJs('LD.layoutId=' . $variables["form"]->fieldLayoutId);
            $view->registerJs('LD.formId=' . $variables["form"]->id);
        }
        $view->registerJs('LD.setup()');

        $view->registerJs('LD_Fields.fields=' . Json::encode(FormBuilder::$plugin->fields->getFields(), JSON_UNESCAPED_UNICODE));
        $view->registerJs('LD_Fields.options=' . Json::encode(FormBuilder::$plugin->fields->getAllFieldOptions(), JSON_UNESCAPED_UNICODE));
        $view->registerJs('LD_Fields.setup()');

        $view->registerJs('LD_Tabs.tabs=' . Json::encode(FormBuilder::$plugin->tabs->getTabs(), JSON_UNESCAPED_UNICODE));
        $view->registerJs('LD_Tabs.options=' . Json::encode(FormBuilder::$plugin->tabs->getAllTabOptions(), JSON_UNESCAPED_UNICODE));
        $view->registerJs('LD_Tabs.setup()');
        $view->registerJs('initFLD();');

        $view->registerJs('new window.FormBuilder.FormEdit()');

        if ($variables['form']) {
            $variables['title'] = 'Edit ' . $variables['form']->name;

        } else {
            $variables['title'] = 'New Form';
        }

        $variables['fullPageForm'] = true;
        $variables['continueEditingUrl'] = 'form-builder/forms/{id}';
        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        return $this->renderTemplate('form-builder/forms/_edit', $variables);
    }

    /**
     * Save form
     *
     * @return null|Response
     * @throws BadRequestHttpException
     * @throws NotFoundHttpException
     * @throws \craft\errors\MissingComponentException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionSave()
    {
        $this->requirePermission('fb:editForms');
        $this->requirePermission('fb:createForms');
        $this->requirePostRequest();

        $form = $this->_getFormModel();

        $fieldLayout = Craft::$app->getFields()->assembleLayoutFromPost();
        $fieldLayout->type = Form::class;
        $form->setFieldLayout($fieldLayout);

        if (!FormBuilder::$plugin->forms->save($form)) {
            Craft::$app->getSession()->setError(Craft::t('form-builder', 'Couldn’t save the form.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'form' => $form
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Craft::t('form-builder', 'Form saved.'));

        return $this->redirectToPostedUrl($form);
    }

    /**
     * Delete form
     *
     * @return Response
     * @throws BadRequestHttpException
     * @throws NotFoundHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionDelete(): Response
    {
        $this->requirePermission('fb:editForms');
        $this->requirePermission('fb:deleteForms');
        $this->requirePostRequest();
//        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();
        $formId = $request->getRequiredBodyParam('id');

        $form = Craft::$app->getElements()->getElementById($formId);

        if (!$form) {
            throw new NotFoundHttpException('Form not found');
        }

        if (!Craft::$app->getElements()->deleteElement($form)) {
            if ($request->getAcceptsJson()) {
                return $this->asJson([
                    'success' => false
                ]);
            }

            Craft::$app->getSession()->setError(Craft::t('form-builder', 'Could not delete form'));

            Craft::$app->getUrlManager()->setRouteParams([
                'form' => $form
            ]);

            return null;
        }

        if ($request->getAcceptsJson()) {
            return $this->asJson([
                'success' => true
            ]);
        }

        Craft::$app->getSession()->setNotice(Craft::t('form-builder', 'Form deleted'));

        return $this->redirectToPostedUrl($form);

//        $success = FormBuilder::$plugin->forms->delete($formId);
//
//        return $this->asJson([
//            'success' => $success
//        ]);
    }


    /**
     * Validate input field custom template path
     *
     * @return Response
     * @throws BadRequestHttpException
     * @throws \yii\base\Exception
     */
    public function actionCheckInputTemplatePath(): Response
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $sitePath = Craft::$app->getPath()->getSiteTemplatesPath();

        $path = Craft::$app->getRequest()->getRequiredBodyParam('path');

        $templatesPath = $sitePath . '/' . $path;

        $valid = is_dir($templatesPath);

        return $this->asJson([
            'valid' => $valid
        ]);
    }

    // Private Methods
    // =========================================================================

    /**
     * Get form model
     *
     * @return Form
     * @throws BadRequestHttpException
     * @throws NotFoundHttpException
     */
    private function _getFormModel(): Form
    {
        $formId = Craft::$app->getRequest()->getBodyParam('id');

        if ($formId) {
            $form = Craft::$app->getElements()->getElementById($formId);

            if (!$form) {
                throw new NotFoundHttpException('Form not found');
            }
        } else {

            if (($group = FormBuilder::$plugin->groups->getGroupById(Craft::$app->getRequest()->getBodyParam('groupId'))) === null) {
                throw new BadRequestHttpException('Invalid form group');
            }

            $form = new Form();
        }

        $form->groupId = Craft::$app->getRequest()->getBodyParam('groupId');
        $form->statusId = Craft::$app->getRequest()->getBodyParam('statusId');

        if ($form->statusId == '1') {
            $form->enabled = true;
            $form->enabledForSite = true;
        } else {
            $form->enabled = false;
            $form->enabledForSite = false;
        }

        $form->name = Craft::$app->getRequest()->getBodyParam('name');
        $form->handle = Craft::$app->getRequest()->getBodyParam('handle');
        $form->options = Craft::$app->getRequest()->getBodyParam('options');
        $form->spam = Craft::$app->getRequest()->getBodyParam('spam');
        $form->integrations = Craft::$app->getRequest()->getBodyParam('integrations');
        $form->settings = Craft::$app->getRequest()->getBodyParam('settings');

        return $form;
    }

    /**
     * Prepare form variables form post
     *
     * @param array $variables
     * @throws NotFoundHttpException
     */
    private function _prepEditFormVariables(array &$variables)
    {
        if ($variables['id']) {
            $variables['form'] = Form::find()
                ->id($variables['id'])
                ->siteId(null)
                ->anyStatus()
                ->one();

            if (!$variables['form']) {
                throw new NotFoundHttpException('Form not found');
            }


            if (!empty($variables['groupId'])) {
                $variables['group'] = FormBuilder::$plugin->groups->getGroupById($variables['groupId']);

                if (empty($variables['group'])) {
                    throw new NotFoundHttpException('Form group not found');
                }
            }

            $variables['form']->options = Json::decode($variables['form']->options);
            $variables['form']->spam = Json::decode($variables['form']->spam);
            $variables['form']->integrations = Json::decode($variables['form']->integrations);
            $variables['form']->settings = Json::decode($variables['form']->settings);

        } else {
            $variables['form'] = new Form();
            $variables['form']->groupId = 1;
            $variables['form']->statusId = 1;
            $variables['form']->enabled = 1;
        }

        // Integrations
//        $variables['integrations'] = FormBuilder::$plugin->integrations->getAllIntegrations();
    }
}
