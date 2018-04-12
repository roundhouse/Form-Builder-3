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
use craft\web\Controller;

use yii\web\Response;

use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;

class SettingsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    /**
     * Settings index
     *
     * @return Response
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionIndex()
    {
        $this->requireAdmin();

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);

        $settings = FormBuilder::getInstance()->getSettings();

        return $this->renderTemplate('form-builder/settings/index', [
            'settings' => $settings,
        ]);
    }
}