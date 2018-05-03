<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\elements;

use craft;
use craft\base\Element;
use craft\helpers\UrlHelper;
use craft\helpers\ArrayHelper;
use craft\elements\db\ElementQueryInterface;
use craft\behaviors\FieldLayoutBehavior;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\db\EntryQuery;
use roundhouse\formbuilder\records\Entry as EntryRecord;
use roundhouse\formbuilder\elements\actions\SetStatus;
use roundhouse\formbuilder\elements\actions\Delete;
use roundhouse\formbuilder\elements\Form;

class Entry extends Element
{
    // Properties
    // =========================================================================

    public $title;
    public $form;
    public $formId;
    public $options;
    public $settings;
    public $statusId = 1;
    public $ipAddress;
    public $userAgent;

    // Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return FormBuilder::t('Entries');
    }

    /**
     * @inheritdoc
     */
    public static function refHandle()
    {
        return 'formbuilderEntry';
    }

    /**
     * @inheritdoc
     */
    public static function hasContent(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public static function hasTitles(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public static function isLocalized(): bool
    {
        return false;
    }

    /**
     * @inheritdoc
     */
    public static function hasStatuses(): bool
    {
        return true;
    }

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        $this->setScenario(self::SCENARIO_LIVE);

        if ($this->formId) {
            $this->form = FormBuilder::$plugin->forms->getFormRecordById($this->formId);
        }

    }

    /**
     * @inheritdoc
     */
    public function getFieldContext(): string
    {
        return 'global';
    }

    /**
     * @inheritdoc
     */
    public function __toString(): string
    {
        return (string)$this->title;
    }


    /**
     * Get entry's form
     *
     * @return mixed
     */
    public function getForm()
    {
        $this->form = FormBuilder::$plugin->forms->getFormRecordById($this->formId);

        return $this->form;
    }

    /**
     * @inheritdoc
     */
    public function getUrl()
    {
        return UrlHelper::cpUrl('form-builder/entries/'.$this->id);
    }

    /**
     * @inheritdoc
     */
    public function getFieldLayout()
    {
        return $this->form->getFieldLayout();

    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['fieldLayout'] = [
            'class' => FieldLayoutBehavior::class,
            'elementType' => Form::class
        ];

        return $behaviors;
    }

    /**
     * @inheritdoc
     */
    public static function statuses(): array
    {
        $statuses = FormBuilder::$plugin->entries->getAllStatuses();

        $statusArray = [];

        foreach ($statuses as $status) {
            $key = $status->handle;
            $statusArray[$key] = $status->name;
        }

        return $statusArray;
    }

    /**
     * @inheritdoc
     */
    public function getStatus()
    {
        $statuses = FormBuilder::$plugin->entries->getAllStatuses();

        foreach ($statuses as $status) {
            if ($this->statusId == $status->id) {
                return $status->color;
            }

        };

        return 'blue';
    }

    /**
     * @inheritdoc
     *
     * @return EntryQuery The newly created [[EntryQuery]] instance.
     */
    public static function find(): ElementQueryInterface
    {
        return new EntryQuery(get_called_class());
    }

    /**
     * @inheritdoc
     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key'   => '*',
                'label' => FormBuilder::t('All Entries')
            ]
        ];

        $forms = FormBuilder::$plugin->forms->getAllForms();

        foreach ($forms as $form) {
            $key = 'form:' . $form->id;
            $sources[$key] = [
                'key'      => $key,
                'label'    => FormBuilder::t($form->name),
                'criteria' => ['formId' => $form->id]
            ];
        }

        return $sources;
    }

    /**
     * @inheritdoc
     */
    protected static function defineActions(string $source = null): array
    {
        $actions[] = SetStatus::class;

        return $actions;
    }

    /**
     * @inheritdoc
     */
    public function getCpEditUrl(): string
    {
        return UrlHelper::cpUrl('form-builder/entries/'.$this->id);
    }

    // Indexes, etc.
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'formId':
                $form = $this->getForm();
//                $markup = '<span class="group">' . $form->name . '</span>';
                $template = Craft::$app->view->renderTemplate('form-builder/_includes/common/_form-details', ['form' => $form]);
                return $template;
                break;
            default:
                return parent::tableAttributeHtml($attribute);
                break;
        }
        
        return parent::tableAttributeHtml($attribute);
    }

    /**
     * @inheritdoc
     */
    protected static function defineSearchableAttributes(): array
    {
        return ['formId', 'dateCreated'];
    }

    /**
     * @inheritdoc
     */
    protected static function defineSortOptions(): array
    {
        $attributes = [
            'formbuilder_entries.statusId'  => FormBuilder::t('Status'),
            'formbuilder_entries.formId'    => FormBuilder::t('Form'),
            'elements.dateCreated'          => FormBuilder::t('Submitted')
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes = [];
        $customAttributes['title']        = ['label' => FormBuilder::t('Title')];
        $customAttributes['formId']       = ['label' => FormBuilder::t('Form')];
        $customAttributes['dateCreated']  = ['label' => FormBuilder::t('Submitted')];

        $formAttributes = Craft::$app->getElementIndexes()->getAvailableTableAttributes(Form::class);
        unset($formAttributes['name']);
        unset($formAttributes['handle']);
        unset($formAttributes['group']);
        unset($formAttributes['totalEntries']);
        unset($formAttributes['twig']);

        foreach ($customAttributes as $key => $label) {
            $attributes[$key] = $label;
        }

        $newArray = ArrayHelper::merge($attributes, $formAttributes);

        return $newArray;
    }


    /**
     * @inheritdoc
     */
    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['formId', 'dateCreated'];

        if ($source == '*') {
            $attributes[] = 'title';
        }

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    public function fieldLayoutFields(): array
    {
        $form = $this->getForm();
        $fieldLayout = $form->getFieldLayout();

        if ($fieldLayout) {
            return $fieldLayout->getFields();
        }

        return [];
    }


    // Events
    // -------------------------------------------------------------------------
//    public function beforeSave(bool $isNew): bool
//    {
//    }

    /**
     * @inheritdoc
     */
    public function afterSave(bool $isNew)
    {
        $entryRecord = new EntryRecord();

        $entryRecord->id                = $this->id;
        $entryRecord->formId            = $this->formId;
        $entryRecord->statusId          = $this->statusId;
        $entryRecord->title             = $this->title;
        $entryRecord->ipAddress         = $this->ipAddress;
        $entryRecord->userAgent         = $this->userAgent;
        $entryRecord->save(false);

        parent::afterSave($isNew);
    }
}