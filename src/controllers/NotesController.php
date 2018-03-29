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
use craft\helpers\DateTimeHelper;
use craft\web\Controller;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Note;

class NotesController extends Controller
{
    public function actionSave()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $note              = new Note();
        $note->note        = Craft::$app->getRequest()->getBodyParam('note');
        $note->entryId     = Craft::$app->getRequest()->getBodyParam('entryId');
        $note->authorId    = Craft::$app->getUser()->id;

        if (FormBuilder::$plugin->notes->save($note)) {

            $savedNote = $note;
            $savedNote->author = $note->getAuthor();

            return $this->asJson([
                'success' => true,
                'note'   => $savedNote,
            ]);
        } else {
            return $this->asJson([
                'success' => false,
                'errors' => $note->getErrors(),
            ]);
        }
    }
}