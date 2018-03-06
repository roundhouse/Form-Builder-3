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

use roundhouse\formbuilder\models\Group;

/**
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class GroupsController extends Controller
{
    /**
     * Save group
     */
    public function actionSave()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();


        $group              = new Group();
        $group->id          = Craft::$app->getRequest()->getBodyParam('id');
        $group->name        = Craft::$app->getRequest()->getBodyParam('name');
        $group->settings    = Craft::$app->getRequest()->getBodyParam('settings');

        $isNewGroup = empty($group->id);


        if (FormBuilder::$plugin->groups->save($group)) {
            if ($isNewGroup) {
                Craft::$app->getSession()->setNotice(FormBuilder::t('Group added.'));
            }

            return $this->asJson([
                'success' => true,
                'group'   => $group->getAttributes(),
            ]);
        } else {
            return $this->asJson([
                'success' => false,
                'errors' => $group->getErrors(),
            ]);
        }
    }
}