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
use craft\helpers\Json;
use yii\web\Response;

class IntegrationsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    /**
     * Add notification template
     *
     * @return Response
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionAddNotification()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();

        $index = $request->getBodyParam('index');
        $type= $request->getBodyParam('type');
        $elementId = $request->getBodyParam('elementId');
        $form = $request->getBodyParam('form');

        $model = Craft::$app->elements->getElementById($elementId);

        $variables['index'] = $index;
        $variables['model'] = $model;
        $variables['type'] = $type;
        $variables['form'] = JSON::decode($form);

        $markup = Craft::$app->view->renderTemplate('form-builder/forms/_includes/integrations/'.$type.'/_notification-js', $variables);

        return $this->asJson([
            'success' => true,
            'markup'   => $markup,
        ]);
    }
}