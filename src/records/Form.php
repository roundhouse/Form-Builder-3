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
use yii\db\ActiveQueryInterface;

class Form extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formbuilder_forms}}';
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
}
