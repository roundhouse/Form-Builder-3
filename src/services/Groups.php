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
use roundhouse\formbuilder\records\Group as GroupRecord;
use roundhouse\formbuilder\models\Group as GroupModel;
use roundhouse\formbuilder\errors\GroupNotFoundException;

use Craft;
use craft\helpers\Json;
use craft\base\Component;
use craft\db\Query;

/**
 * Groups Service
 *
 * All of your plugin’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Groups extends Component
{

    // Properties
    // =========================================================================

    private $_groupsById;
    private $_fetchedAllGroups = false;

    // Public Methods
    // =========================================================================

    /**
     * Returns all form groups.
     *
     * @return TagGroup[]
     */
    public function getAllGroups(): array
    {
        if (!$this->_fetchedAllGroups) {
            $this->_groupsById = GroupRecord::find()
                ->orderBy(['name' => SORT_ASC])
                ->indexBy('id')
                ->all();

            foreach ($this->_groupsById as $key => $value) {
                $this->_groupsById[$key] = new GroupModel($value->toArray([
                    'id',
                    'name',
                    'settings'
                ]));
            }

            $this->_fetchedAllGroups = true;
        }

        return array_values($this->_groupsById);
    }

    /**
     * Get forms by group id
     *
     * @param $groupId
     * @return mixed
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

        return $this->_groupsById[$groupId] = $result ? new GroupModel($result) : null;
    }

    /**
     * Saves a form group.
     *
     * @param group $group      The form group to be saved
     * @param bool     $runValidation Whether the group should be validated
     *
     * @return bool Whether the tag group was saved successfully
     * @throws GroupNotFoundException if $group->id is invalid
     * @throws \Throwable if reasons
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
                throw new GroupNotFoundException("No tag group exists with the ID '{$tagGroup->id}'");
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
