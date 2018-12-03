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

use craft;
use craft\web\Controller;
use yii\web\Response;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Migrations as MigrationsAsset;
use roundhouse\formbuilder\web\assets\Tippy as TippyAsset;

class ToolsController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = true;


    // Public Methods
    // =========================================================================

    /**
     * Dashboard index page
     *
     * @return Response
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionIndex()
    {
        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(MigrationsAsset::class);
        $view->registerAssetBundle(TippyAsset::class);

        $oldPlugin = Craft::$app->plugins->getStoredPluginInfo('form-builder2');
        $plugin = FormBuilder::getInstance();

        $oldForms = FormBuilder::$plugin->migrations->getOldForms();
        $forms = FormBuilder::$plugin->forms->getAllForms();

        return $this->renderTemplate('form-builder/settings/migration/index', [
            'oldPlugin' => $oldPlugin,
            'oldForms' => $oldForms,
            'forms' => $forms,
            'plugin' => $plugin,
        ]);
    }

    public function actionMigrateForm()
    {
        $this->requirePostRequest();

        $oldFormId = Craft::$app->getRequest()->getBodyParam('oldFormId');

        $form = new Form();
        $form->name = Craft::$app->getRequest()->getBodyParam('name');
        $form->handle = Craft::$app->getRequest()->getBodyParam('handle');
        $form->groupId = Craft::$app->getRequest()->getBodyParam('groupId');
        $form->statusId = Craft::$app->getRequest()->getBodyParam('statusId');
        $form->fieldLayoutId = Craft::$app->getRequest()->getBodyParam('fieldLayoutId');
        $form->settings = Craft::$app->getRequest()->getBodyParam('settings');
        $form->options = Craft::$app->getRequest()->getBodyParam('options');
        $form->spam = Craft::$app->getRequest()->getBodyParam('spam');
//        $form->integrations = Craft::$app->getRequest()->getBodyParam('integrations');

        $fieldLayout = Craft::$app->fields->getLayoutById($form->fieldLayoutId);
        $fieldLayout->type = Form::class;
        $form->setFieldLayout($fieldLayout);

        $result = FormBuilder::$plugin->migrations->migrateForm($form, $oldFormId, Craft::$app->getRequest()->getBodyParam('includeEntries') === 'on');

        if ($result) {
            Craft::$app->getSession()->setNotice(Craft::t('form-builder', 'Form migrated.'));
        } else {
            Craft::$app->getSession()->setError(Craft::t('form-builder', 'Form failed to migrate.'));
        }


        return $this->redirectToPostedUrl($form);
    }

}