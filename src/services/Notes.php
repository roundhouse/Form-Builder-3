<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\services;

use Craft;
use craft\helpers\Json;
use craft\base\Component;

use roundhouse\formbuilder\records\Note as NoteRecord;
use roundhouse\formbuilder\models\Note as NoteModel;

class Notes extends Component
{
    public function getNotes(int $entryId)
    {
        $notes = NoteRecord::find()
            ->orderBy(['dateCreated' => SORT_DESC])
            ->where(['entryId' => $entryId])
            ->all();

        $allNotes = [];

        foreach ($notes as $key => $value) {
            $allNotes[] = new NoteModel($value->toArray([
                'id',
                'note',
                'entryId',
                'authorId',
                'dateCreated'
            ]));
        }

        return array_values($allNotes);
    }


    public function save($note) : bool
    {
        $note->validate();

        if ($note->hasErrors()) {
            return false;
        }

        $noteRecord             = new NoteRecord();
        $noteRecord->note       = $note->note;
        $noteRecord->entryId    = $note->entryId;
        $noteRecord->authorId   = $note->authorId;

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $noteRecord->save(false);
            $note->id = $noteRecord->id;

            $transaction->commit();
        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }
}