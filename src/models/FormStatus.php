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
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;

use roundhouse\formbuilder\elements\FormElement;
use roundhouse\formbuilder\records\FormStatusRecord;

class FormStatus extends Model
{
    // Public Properties
    // =========================================================================

    public $id;
    public $name;
    public $handle;
    public $color;
    public $sortOrder;
    public $isDefault;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['handle'], HandleValidator::class, 'reservedWords' => ['id', 'dateCreated', 'dateUpdated', 'uid', 'title']],
            [['name', 'handle'], UniqueValidator::class, 'targetClass' => FormStatusRecord::class],
            [['name', 'handle'], 'required'],
            [['name', 'handle'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function __toString(): string
    {
        return Craft::t('form-builder', $this->name);
    }

    /**
     * @inheritdoc
     */
    public function htmlLabel()
    {
        return sprintf('<span class="formbuilder-status-label"><span class="status %s"></span> %s</span>',
            $this->color, $this->name);
    }
}
