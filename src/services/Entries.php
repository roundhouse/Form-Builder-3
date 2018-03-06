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

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\models\FormModel;
use roundhouse\formbuilder\models\FormStatus as FormStatusModel;
use roundhouse\formbuilder\models\EntryStatus as EntryStatusModel;
use roundhouse\formbuilder\records\FormStatus as FormStatusRecord;
use roundhouse\formbuilder\records\EntryStatus as EntryStatusRecord;
use roundhouse\formbuilder\records\Entry as EntryRecord;
use roundhouse\formbuilder\errors\FormNotFoundException;

use Craft;
use craft\base\Component;
use craft\helpers\Json;
use craft\helpers\ArrayHelper;
use craft\db\Query;


/**
 * Entries Service
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Entries extends Component
{
    // Properties
    // =========================================================================

    private $_allEntryIds;
    private $_allEntries;
    private $_entriesById;

    // Properties
    // =========================================================================

    public function getUnreadEntries(): array
    {
        return $this->getAllEntries(true);
    }

    public function getUnreadEntriesByFormId($formId): int
    {
        return count($this->getAllEntries(true, $formId));
    }

    public function getAllEntries($unread = false, $formId = null): array
    {
        if ($this->_allEntries !== null) {
            return $this->_allEntries;
        }

        if ($formId && $unread) {
            $this->_allEntries = EntryRecord::find()
                ->where([
                    'statusId' => 1,
                    'formId' => $formId
                ])
                ->all();
        } elseif ($formId && !$unread) {
            $this->_allEntries = EntryRecord::find()
                ->where([
                    'formId' => $formId
                ])
                ->all();
        } else {
            $this->_allEntries = EntryRecord::find()
                ->where('statusId=1')
                ->all();
        }

        $this->_entriesById = ArrayHelper::index($this->_allEntries, 'id');

        return $this->_allEntries;
    }

    public function getAllStatuses(): array
    {
        $statuses = EntryStatusRecord::find()
            ->orderBy(['sortOrder' => SORT_ASC])
            ->all();

        $allStatuses = [];

        foreach ($statuses as $key => $value) {
            $allStatuses[] = new EntryStatusModel($value->toArray([
                'id',
                'name',
                'handle',
                'color',
                'sortOrder',
                'isDefault'
            ]));
        }

        return array_values($allStatuses);
    }
    
    public function getStatusByHandle($handle): EntryStatusRecord
    {
        $status = EntryStatusRecord::find()
            ->where(['handle' => $handle])
            ->one();

        return $status;
    }

    // public function getEntryModel(Form $form) : Entry
    // {
    //     $entry = new Entry();
    //     $entry->formId = $form->id;

    //     return $entry;
    // }


    /**
     * Saves a entry.
     *
     * @param Entry $entry      The tag group to be saved
     * @param bool     $runValidation Whether the entry should be validated
     *
     * @return bool Whether the tag group was saved successfully
     * @throws EntryNotFoundException if $entry->id is invalid
     * @throws \Throwable if reasons
     */
    // public function save(Entry $entry, bool $runValidation = true): bool
    // {
    //     $entryRecord = new EntryRecord();

    //     $entryRecord->formId        = $entry->formId;
    //     $entryRecord->statusId      = $entry->statusId;
    //     $entryRecord->title         = $entry->title;
    //     $entryRecord->ipAddress     = $entry->ipAddress;
    //     $entryRecord->userAgent     = $entry->userAgent;

    //     if ($runValidation && !$entry->validate()) {
    //         Craft::info('Submission is not saved due to validation error.', __METHOD__);
    //         return false;
    //     }

    //     $transaction = Craft::$app->getDb()->beginTransaction();

    //     try {

    //         if (!Craft::$app->getElements()->saveElement($entry, false)) {
    //             throw new Exception('Couldn’t save the entry.');
    //         }

    //         if (!$entry->id) {
    //             $entry->id = $entryRecord->id;
    //         }

    //         $entryRecord->save(false);

    //         $transaction->commit();

    //     } catch (\Throwable $e) {
    //         $transaction->rollBack();

    //         throw $e;
    //     }

    //     return true;
    // }

    public function installDefaultStatuses()
    {
        $defaultStatuses = [
            0 => [
                'name'      => 'Unread',
                'handle'    => 'unread',
                'color'     => 'blue',
                'sortOrder' => 1,
                'isDefault' => 1
            ],
            1 => [
                'name'      => 'Read',
                'handle'    => 'read',
                'color'     => 'green',
                'sortOrder' => 2,
                'isDefault' => 0
            ],
            2 => [
                'name'      => 'Archived',
                'handle'    => 'archived',
                'color'     => 'black',
                'sortOrder' => 3,
                'isDefault' => 0
            ]
        ];

        foreach ($defaultStatuses as $key => $value) {
            Craft::$app->getDb()->createCommand()
                ->insert('{{%formbuilder_entrystatus}}', [
                    'name' => $value['name'],
                    'handle' => $value['handle'],
                    'color' => $value['color'],
                    'sortOrder' => $value['sortOrder'],
                    'isDefault' => $value['isDefault']
                ])
                ->execute();
        }
    }
}