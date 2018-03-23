<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\models;


use Craft;
use craft\base\Model;

use roundhouse\formbuilder\elements\FormElement;

class Group extends Model
{
    // Public Properties
    // =========================================================================

    public $id;
    public $name;
    public $settings;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function __toString(): string
    {
        return Craft::t('form-builder', $this->name);
    }
}
