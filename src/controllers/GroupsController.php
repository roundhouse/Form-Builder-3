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
use craft\errors\MissingComponentException;
use craft\web\Controller;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Group;
use yii\web\BadRequestHttpException;
use yii\web\Response;

class GroupsController extends Controller
{
    /**
     * Save group
     *
     * @return Response
     * @throws MissingComponentException
     * @throws BadRequestHttpException
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