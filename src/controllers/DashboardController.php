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

use craft\web\Controller;
use yii\web\Response;

use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Dashboard as DashboardAsset;

class DashboardController extends Controller
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
        $this->requireAdmin();

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(DashboardAsset::class);

        $groups = FormBuilder::$plugin->groups->getAllGroups();
        $forms = FormBuilder::$plugin->forms->getAllForms();

        return $this->renderTemplate('form-builder/dashboard/index', [
            'plugin' => FormBuilder::getInstance(),
            'groups' => $groups,
            'forms' => $forms,
        ]);
    }

}