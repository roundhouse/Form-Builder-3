<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\records;

use craft\db\ActiveRecord;
use craft\records\Element;
use craft\records\FieldLayout;
use roundhouse\formbuilder\plugin\Table;
use yii\db\ActiveQueryInterface;

class Form extends ActiveRecord
{
    private $_oldHandle;
    private $_oldFieldLayoutId;

    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return Table::FORMS;
    }

    /**
     * Returns the entry’s element.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getElement(): ActiveQueryInterface
    {
        return $this->hasOne(Element::class, ['id' => 'id']);
    }

    /**
     * Returns forms entries
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getEntries(): ActiveQueryInterface
    {
        return $this->hasMany(Entry::class, ['formId' => 'id']);
    }

    /**
     * Return group
     *
     * @return ActiveQueryInterface
     */
    public function getGroup(): ActiveQueryInterface
    {
        return $this->hasOne(Group::class, ['id' => 'groupId']);
    }

    /**
     * Returns the forms fieldLayout.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getFieldLayout(): ActiveQueryInterface
    {
        return $this->hasOne(FieldLayout::class,
            ['id' => 'fieldLayoutId']);
    }

    function afterFind()
    {
        $this->_oldHandle = $this->handle;
        $this->_oldFieldLayoutId = $this->fieldLayoutId;
    }

    public function getOldHandle()
    {
        return $this->_oldHandle;
    }

    public function getOldFieldLayoutId()
    {
        return $this->_oldFieldLayoutId;
    }
}
