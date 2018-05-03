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

use Craft;
use craft\base\Element;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\db\Query;
use craft\elements\db\ElementQueryInterface;
use craft\validators\HandleValidator;
use craft\validators\UniqueValidator;
use craft\behaviors\FieldLayoutBehavior;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\db\FormQuery;
use roundhouse\formbuilder\records\Form as FormRecord;

class Form extends Element
{

    // Constants
    // =========================================================================

    const STATUS_ENABLED = 'enabled';
    const STATUS_DISABLED = 'disabled';

    // Properties
    // =========================================================================

    public $name;
    public $handle;
    public $oldHandle;
    public $group;
    public $groupId = 1;
    public $status;
    public $statusId = 1;
    public $options;
    public $spam;
    public $integrations;
    public $settings;
    public $twig;
    public $totalEntries;
    public $oldFieldLayoutId;

    // Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return FormBuilder::t('Form');
    }

    /**
     * @inheritdoc
     */
    public static function refHandle()
    {
        return 'formbuilderForm';
    }

    /**
     * @inheritdoc
     */
    public static function hasContent(): bool
    {
        return false;
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

    /**
     * @inheritdoc
     */
    public function getFieldContext(): string
    {
        return 'global';
//        return 'formbuilder:' . $this->id;
    }

    /**
     * Returns the name of the table this element's content is stored in.
     *
     * @return string
     */
//    public function getContentTable(): string
//    {
//        return FormBuilder::$plugin->forms->getContentTableName($this);
//    }

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function getCpEditUrl()
    {
        return UrlHelper::cpUrl(
            'form-builder/forms/'.$this->id
        );
    }

    /**
     * @inheritdoc
     */
    public function __toString(): string
    {
        return (string)$this->name;
    }

    /**
     * @inheritdoc
     */
    public static function statuses(): array
    {
        return [
            self::STATUS_ENABLED => FormBuilder::t('Enabled'),
            self::STATUS_DISABLED => FormBuilder::t('Disabled')
        ];
    }

    /**
     * @inheritdoc
     *
     * @return FormQuery The newly created [[FormQuery]] instance.
     */
    public static function find(): ElementQueryInterface
    {
        return new FormQuery(get_called_class());
    }

    /**
     * Get group
     *
     * @return mixed
     */
    public function getGroup()
    {
        $this->group = FormBuilder::$plugin->groups->getGroupById($this->groupId);

        return $this->group;
    }

    public function getAllowedFieldTypes()
    {
        $allowed = [
            'PlainText',
            'Email',
            'Number',
            'Url',
            'Assets',
            'Dropdown',
            'Checkboxes',
            'MultiSelect',
            'RadioButtons',
            'Date',
            'Color'
        ];

        return $allowed;
    }

    /**
     * @inheritdoc
     */
    protected static function defineSources(string $context = null): array
    {
        $sources = [
            [
                'key'   => '*',
                'label' => FormBuilder::t('All Forms')
            ]
        ];

        $groups = FormBuilder::$plugin->groups->getAllGroups();

        foreach ($groups as $group) {
            $key = 'group:' . $group->id;
            $settings = Json::decode($group->settings);

            if (!empty($settings)) {
                $icon = $settings['icon']['name'];
            } else {
                $icon = null;
            }

            $sources[] = [
                'key'      => $key,
                'label'    => FormBuilder::t($group->name),
                'icon'     => $icon,
                'data'     => ['id' => $group->id],
                'criteria' => ['groupId' => $group->id]
            ];
        }

        return $sources;
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['fieldLayout'] = [
            'class' => FieldLayoutBehavior::class,
            'elementType' => __CLASS__
        ];

        return $behaviors;
    }

    /**
     * @inheritdoc
     */
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
     * @inheritdoc
     */
    public function getFieldLayout()
    {
        $behavior = $this->getBehavior('fieldLayout');

        return $behavior->getFieldLayout();
    }

    // Indexes, etc.
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     */
    protected function tableAttributeHtml(string $attribute): string
    {
        switch ($attribute) {
            case 'name':
                break;
            case 'handle':
                return '<span class="copy-handle" data-handle="' . $this->handle . '"  data-clipboard-text="' . $this->handle . '">
                            <code>' . $this->handle . '</code>
                            <span class="icon">
                                <i class="far fa-copy"></i>
                            </span>
                        </span>';
                break;
            case 'group':
                $group = FormBuilder::$plugin->groups->getGroupById($this->groupId);
                $settings = Json::decode($group->settings);
                if (!empty($settings)) {
                    $icon = $settings['icon']['name'];
                    return '<span class="group"><i class="far fa-'. $icon .'"></i><span class="group-name">'. $group .'</span></span>';
                } else {
                    return '<span>'. $group .'</span>';
                }

                break;
            case 'totalEntries':
                $totalEntries = (new Query())
                    ->select('COUNT(*) as [[value]]')
                    ->from(['{{%formbuilder_entries}}'])
                    ->where(['formbuilder_entries.formId' => $this->id])
                    ->scalar();

                return $totalEntries;
                break;
            case 'twig':
                return '<span class="twig-snippet" data-handle="'. $this->handle . '" data-clipboard-text="{{ craft.fb.form(\''.$this->handle.'\') }}">
                            <code>' . FormBuilder::t("Click to copy") . '<span class="icon"><i class="far fa-copy"></i></span></code>
                        </span>';
                break;
        }

        return parent::tableAttributeHtml($attribute);
    }

    /**
     * @inheritdoc
     */
    protected static function defineSearchableAttributes(): array
    {
        return ['name', 'handle', 'group'];
    }

    /**
     * @inheritdoc
     */
    protected static function defineSortOptions(): array
    {
        $attributes = [
            'formbuilder_forms.name'    => FormBuilder::t('Form Name'),
            'formbuilder_forms.groupId' => FormBuilder::t('Group'),
            'elements.dateCreated'      => FormBuilder::t('Date Created'),
            'elements.dateUpdated'      => FormBuilder::t('Date Updated'),
        ];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineTableAttributes(): array
    {
        $attributes['name']         = ['label' => FormBuilder::t('Name')];
        $attributes['handle']       = ['label' => FormBuilder::t('Handle')];
        $attributes['group']        = ['label' => FormBuilder::t('Group')];
        $attributes['totalEntries'] = ['label' => FormBuilder::t('Total Entries')];
        $attributes['twig']         = ['label' => FormBuilder::t('Twig Snippet')];

        return $attributes;
    }

    /**
     * @inheritdoc
     */
    protected static function defineDefaultTableAttributes(string $source): array
    {
        $attributes = ['name', 'handle', 'group', 'totalEntries', 'twig'];

        return $attributes;
    }

    // Events
    // -------------------------------------------------------------------------

    /**
     * @inheritdoc
     */
    public function beforeDelete(): bool
    {
        if ($this->fieldLayoutId !== null) {
            Craft::$app->getFields()->deleteLayoutById($this->fieldLayoutId);
        }

        return parent::beforeDelete();
    }
}
