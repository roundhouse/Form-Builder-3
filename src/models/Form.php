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

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form as FormElement;
use roundhouse\formbuilder\records\FormRecord;

use Craft;
use craft\base\Model;
use craft\behaviors\FieldLayoutBehavior;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;

/**
 * FormModel
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Form extends Model
{
    // Public Properties
    // =========================================================================
    public $id;
    public $fieldLayoutId;
    public $name;
    public $handle;
    public $groupId = 1;
    public $statusId = 1;
    public $options;
    public $spam;
    public $notifications;
    public $settings;
    public $twig;
    public $totalEntries;

    // Public Methods
    // =========================================================================

    public function behaviors()
    {
        return [
            'fieldLayout' => [
                'class' => FieldLayoutBehavior::class,
                'elementType' => _prepEditFormVariables::class
            ],
        ];
    }

    public function rules()
    {
        return [
            [['id', 'groupId', 'fieldLayoutId', 'statusId'], 'number', 'integerOnly' => true],
            [['handle'], HandleValidator::class, 'reservedWords' => ['id', 'dateCreated', 'dateUpdated', 'uid', 'title']],
            [['name', 'handle'], UniqueValidator::class, 'targetClass' => FormRecord::class],
            [['name', 'handle'], 'required'],
            [['name', 'handle'], 'string', 'max' => 255]
        ];
    }


    /**
     * Use the translated category group's name as the string representation.
     *
     * @return string
     */
    public function __toString(): string
    {
        return Craft::t('form-builder', $this->name);
    }
}
