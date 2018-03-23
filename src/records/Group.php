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
use yii\db\ActiveQueryInterface;

class Group extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formbuilder_formgroup}}';
    }

    /**
     * Returns the form's groups.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getGroups(): ActiveQueryInterface
    {
        return $this->hasMany(Form::class, ['groupId' => 'id']);
    }

}
