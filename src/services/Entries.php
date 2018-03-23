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
use craft\base\Component;
use craft\helpers\ArrayHelper;

use roundhouse\formbuilder\models\EntryStatus as EntryStatusModel;
use roundhouse\formbuilder\records\EntryStatus as EntryStatusRecord;
use roundhouse\formbuilder\records\Entry as EntryRecord;


class Entries extends Component
{
    // Properties
    // =========================================================================

    private $_allEntries;
    private $_entriesById;

    // Properties
    // =========================================================================

    /**
     * Get unread entries
     *
     * @return array
     */
    public function getUnreadEntries(): array
    {
        return $this->getAllEntries(true);
    }

    /**
     * Get unread entries by form ID
     *
     * @param $formId
     * @return int
     */
    public function getUnreadEntriesByFormId($formId): int
    {
        return count($this->getAllEntries(true, $formId));
    }

    /**
     * Get all entries
     *
     * @param bool $unread
     * @param null $formId
     * @return array
     */
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

    /**
     * Get all statuses
     *
     * @return array
     */
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

    /**
     * Get status by handle
     *
     * @param $handle
     * @return EntryStatusRecord
     */
    public function getStatusByHandle($handle): EntryStatusRecord
    {
        $status = EntryStatusRecord::find()
            ->where(['handle' => $handle])
            ->one();

        return $status;
    }

    /**
     * Install default statuses
     *
     * @throws \yii\db\Exception
     */
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