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

use craft;
use craft\web\Controller;
use craft\helpers\Json;
use yii\web\Response;
use GuzzleHttp\Client;

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
        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(DashboardAsset::class);

        $groups = FormBuilder::$plugin->groups->getAllGroups();
        $forms = FormBuilder::$plugin->forms->getAllForms();
        $plugin = FormBuilder::getInstance();

        return $this->renderTemplate('form-builder/dashboard/index', [
            'plugin' => $plugin,
            'groups' => $groups,
            'forms' => $forms,
            'hasUpdate' => Craft::$app->plugins->hasPluginVersionNumberChanged($plugin)
        ]);
    }

}