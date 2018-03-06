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

use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\db\ActiveRecord;

/**
 * Tab Record
 *
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Tab extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

     /**
     *
     * @return string the table name
     */
    public static function tableName()
    {
        return '{{%formbuilder_tabs}}';
    }

    /**
     * Returns the layout.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getTab(): ActiveQueryInterface
    {
        return $this->hasOne(FieldLayoutTab::class, ['id' => 'tabId']);
    }

    /**
     * Returns the field's form.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getForm(): ActiveQueryInterface
    {
        return $this->hasOne(Form::class, ['id' => 'formId']);
    }

    /**
     * Returns the field layout tab’s fields.
     *
     * @return ActiveQueryInterface The relational query object.
     */
    public function getFields(): ActiveQueryInterface
    {
        return $this->hasMany(FieldLayoutField::class, ['tabId' => 'id']);
    }
}
