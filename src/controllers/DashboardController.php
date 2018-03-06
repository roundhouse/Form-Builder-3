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
use craft\web\View;
use craft\web\Controller;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\models\Form as FormModel;
use roundhouse\formbuilder\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\assets\Dashboard as DashboardAsset;

/**
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
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
     * Index
     *
     * @return Response
     * @throws ForbiddenHttpException if the user isn't authorized to edit forms
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
            'groups' => $groups,
            'forms' => $forms,
        ]);
    }

}