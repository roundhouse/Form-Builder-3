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

use Craft;
use craft\web\Controller;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;

class IntegrationsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    public function actionIndex()
    {
        $this->requireAdmin();

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);

        $plugin = FormBuilder::getInstance();

        return $this->renderTemplate('form-builder/integrations/index', [
            'plugin' => $plugin
        ]);
    }
}