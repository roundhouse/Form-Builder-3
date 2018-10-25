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

class Integration extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formbuilder_integrations}}';
    }

//    /**
//     * Returns the layout.
//     *
//     * @return ActiveQueryInterface The relational query object.
//     */
//    public function getTab(): ActiveQueryInterface
//    {
//        return $this->hasOne(FieldLayoutTab::class, ['id' => 'tabId']);
//    }
//
//    /**
//     * Returns the field's form.
//     *
//     * @return ActiveQueryInterface The relational query object.
//     */
//    public function getForm(): ActiveQueryInterface
//    {
//        return $this->hasOne(Form::class, ['id' => 'formId']);
//    }
//
//    /**
//     * Returns the field layout tab’s fields.
//     *
//     * @return ActiveQueryInterface The relational query object.
//     */
//    public function getFields(): ActiveQueryInterface
//    {
//        return $this->hasMany(FieldLayoutField::class, ['tabId' => 'id']);
//    }
}
