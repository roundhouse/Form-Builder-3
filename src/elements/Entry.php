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

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\db\EntryQuery;
use roundhouse\formbuilder\records\Form as FormRecord;
use roundhouse\formbuilder\records\Entry as EntryRecord;
use roundhouse\formbuilder\elements\actions\SetStatus;
use roundhouse\formbuilder\elements\actions\Delete;

use Craft;
use craft\base\Element;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\db\Query;
use craft\elements\db\ElementQuery;
use craft\elements\db\ElementQueryInterface;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;
use yii\base\InvalidConfigException;
use yii\base\Exception;

/**
 * Entry Element
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Entry extends Element
{

    // Properties
    // =========================================================================

    public $title;
    public $form;
    public $formId;
    public $options;
    public $statusId = 1;
    public $ipAddress;
    public $userAgent;
    public $fieldLayoutId;

    // Static Methods
    // =========================================================================

    /**
     * Returns the display name of this class.
     *
     * @return string The display name of this class.
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

        if ($this->formId) {
            $this->form = FormBuilder::$plugin->forms->getFormRecordById($this->formId);
        }
    }

    /**
     * Returns the field context this element's content uses.
     *
     * @access protected
     * @return string
     */
    public function getFieldContext(): string
    {
        return 'global';
    }

    /**
     * Use the entry title as its string representation.
     *
     * @return string
     */
    public function __toString(): string
    {
        return (string)$this->title;
    }

    /**
     * Get Form
     */
    public function getForm()
    {
        $this->form = FormBuilder::$plugin->forms->getFormRecordById($this->formId);

        return $this->form;
    }

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
     * @return FormQuery The newly created [[FormQuery]] instance.
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
        // $canPublishEntries = $userSessionService->checkPermission('publishEntries:'.$section->id);
        
        $actions[] = SetStatus::class;
        $actions[] = Delete::class;

        return $actions;
    }

    /**
     * Returns the entry’s CP edit URL.
     *
     * @return string
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
                $markup = '<span class="group">' . $form->name . '</span>';
                return $markup;
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
            'formbuilder_entries.statusId' => FormBuilder::t('Status'),
            'formbuilder_entries.formId' => FormBuilder::t('Form'),
            'elements.dateCreated'      => FormBuilder::t('Date Submitted')
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes['title']       = ['label' => FormBuilder::t('Title')];
        $attributes['formId']       = ['label' => FormBuilder::t('Form')];
        $attributes['dateCreated']  = ['label' => FormBuilder::t('Date Submitted')];

        return $attributes;
    }

    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['formId', 'dateCreated'];

        if ($source == '*') {
            $attributes[] = 'title';
        }

        return $attributes;
    }

    /**
     * Returns each of this element’s fields.
     *
     * @return Field[] This element’s fields
     */
    protected function fieldLayoutFields(): array
    {   
        $form = $this->getForm($this->formId);

        $fieldLayout = $form->getFieldLayout();

        if ($fieldLayout) {
            return $fieldLayout->getFields();
        }

        return [];
    }

    // Events
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     * @throws Exception if reasons
     */
    public function beforeSave(bool $isNew): bool
    {
        $this->fieldLayoutId = $this->getForm()->fieldLayoutId;
        
        return parent::beforeSave($isNew);;
    }

    /**
     * @inheritdoc
     * @throws Exception if reasons
     */
    public function afterSave(bool $isNew)
    {
        $entryRecord = new EntryRecord();

        $entryRecord->id            = $this->id;
        $entryRecord->formId        = $this->formId;
        $entryRecord->statusId      = $this->statusId;
        $entryRecord->title         = $this->title;
        $entryRecord->ipAddress     = $this->ipAddress;
        $entryRecord->userAgent     = $this->userAgent;
        $entryRecord->save(false);

        parent::afterSave($isNew);
    }
}