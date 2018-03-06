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
use roundhouse\formbuilder\assetbundles\formbuilder\FormBuilderAsset;
use roundhouse\formbuilder\assetbundles\entries\FormBuilderEntryAsset;
use roundhouse\formbuilder\assetbundles\groups\FormBuilderGroupAsset;
use roundhouse\formbuilder\assetbundles\plugins\FormBuilderPluginsAsset;

/**
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class IconsController extends Controller
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
     * Get unread entries count
     *
     * @return mixed
     */
    public function actionGetAllIcons()
    {
        $icons = [
            [
                'name' => 'glass',
                'icon' => '<svg>svg</svg>'
            ],
            [
                'name' => 'meetup',
                'icon' => '<svg>svg</svg>'
            ],
            [
                'name' => 'start',
                'icon' => '<svg>svg</svg>'
            ],
            [
                'name' => 'remove',
                'icon' => '<svg>svg</svg>'
            ]
        ];

        return $this->asJson([
            'success' => true,
            'icons' => $icons
        ]);
    }
}