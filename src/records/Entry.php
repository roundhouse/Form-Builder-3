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

/**
 * Entry Record
 *
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Entry extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

     /**
     *
     * @return string the table name
     */
    public static function tableName()
    {
        return '{{%formbuilder_entries}}';
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
     * Returns the entry’s form.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getForm(): ActiveQueryInterface
    {
        return $this->hasOne(Form::class, ['id' => 'formId']);
    }

    /**
     * Returns the fieldLayout.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getFieldLayout(): ActiveQueryInterface
    {
        return $this->hasOne(FieldLayout::class,
            ['id' => 'fieldLayoutId']);
    }

}
