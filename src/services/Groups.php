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
use craft\db\Query;

use roundhouse\formbuilder\models\Group;
use roundhouse\formbuilder\records\Group as GroupRecord;
use roundhouse\formbuilder\models\Group as GroupModel;
use roundhouse\formbuilder\errors\GroupNotFoundException;

class Groups extends Component
{

    // Properties
    // =========================================================================

    private $_groupsById;
    private $_fetchedAllGroups = false;

    // Public Methods
    // =========================================================================

    /**
     * Get all groups
     *
     * @return array
     */
    public function getAllGroups(): array
    {
        if (!$this->_fetchedAllGroups) {
            $this->_groupsById = GroupRecord::find()
                ->orderBy(['name' => SORT_ASC])
                ->indexBy('id')
                ->all();

            foreach ($this->_groupsById as $key => $value) {
                $group = new GroupModel();
                $group->id = $value->id;
                $group->name = $value->name;
                $group->settings = $value->settings;
                $this->_groupsById[$key] = $group;
            }

            $this->_fetchedAllGroups = true;
        }

        return array_values($this->_groupsById);
    }

    /**
     * Get group by ID
     *
     * @param int $groupId
     * @return null|GroupModel
     */
    public function getGroupById(int $groupId)
    {
        if ($this->_groupsById !== null && array_key_exists($groupId, $this->_groupsById)) {
            return $this->_groupsById[$groupId];
        }

        if ($this->_fetchedAllGroups) {
            return null;
        }

        $result = $this->_createFormGroupsQuery()
            ->where(['id' => $groupId])
            ->one();

        $group = new GroupModel();
        $group->id = $result['id'];
        $group->name = $result['name'];
        $group->settings = Json::decode($result['settings']);

        return $this->_groupsById[$groupId] = $result ? $group : null;
    }

    /**
     * Save group
     *
     * @param GroupModel $group
     * @param bool $runValidation
     * @return bool
     * @throws GroupNotFoundException
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save(GroupModel $group, bool $runValidation = true): bool
    {
        $isNewGroup = !$group->id;
        if ($runValidation && !$group->validate()) {
            Craft::info(Craft::t('form-builder', 'Group not saved due to validation errors'), __METHOD__);
            
            return false;
        }

        if (!$isNewGroup) {
            $groupRecord = GroupRecord::findOne($group->id);

            if (!$groupRecord) {
                throw new GroupNotFoundException("No group exists with the ID '{$group->id}'");
            } 

        } else {
            $groupRecord = new GroupRecord();
        }

        $groupRecord->name = $group->name;
        $groupRecord->settings = $group->settings;

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $groupRecord->save(false);

            if (!$group->id) {
                $group->id = $groupRecord->id;
            }

            $this->_groupsById[$group->id] = $group;

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }


    /**
     * Install default form groups
     *
     * @throws GroupNotFoundException
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function installDefaultGroups()
    {
        $groupSettings = [
            'icon' => [
                'name' => 'list'
            ]
        ];

        $group = new GroupModel([
            'name' => 'Default',
            'settings' => Json::encode($groupSettings)
        ]);

        $this->save($group);
    }


    // Private
    // -------------------------------------------------------------------------

    /**
     * Create form group
     *
     * @return Query
     */
    private function _createFormGroupsQuery(): Query
    {
        return (new Query())
            ->select([
                'id',
                'name',
                'settings'
            ])
            ->from(['{{%formbuilder_formgroup}}']);
    }
}
