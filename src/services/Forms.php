<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\helpers\Json;
use craft\helpers\ArrayHelper;
use craft\db\Query;
use craft\helpers\MigrationHelper;
use craft\helpers\StringHelper;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\models\FormStatus as FormStatusModel;
use roundhouse\formbuilder\plugin\Table;
use roundhouse\formbuilder\records\FormStatus as FormStatusRecord;
use roundhouse\formbuilder\records\Form as FormRecord;
use roundhouse\formbuilder\errors\FormNotFoundException;
use roundhouse\formbuilder\migrations\CreateContentTable;

class Forms extends Component
{
    // Properties
    // =========================================================================

    protected $formRecord;
    private $_allForms;
    private $_formsById;

    // Public Methods
    // =========================================================================

    /**
     * Forms constructor.
     * @param null $formRecord
     */
    public function __construct($formRecord = null)
    {
        $this->formRecord = $formRecord;

        if (is_null($this->formRecord))
        {
            $this->formRecord = new FormRecord();
        }
    }

    /**
     * Get all forms
     *
     * @return array
     */
    public function getAllForms(): array
    {
        if ($this->_allForms !== null) {
            return $this->_allForms;
        }

        $this->_allForms = Form::findAll();
        $this->_formsById = ArrayHelper::index($this->_allForms, 'id');

        return $this->_allForms;
    }

    /**
     * Get form record by id
     *
     * @param int $formId
     * @return null|Form
     */
    public function getFormRecordById(int $formId)
    {
        if ($this->_formsById !== null && array_key_exists($formId, $this->_formsById)) {
            return $this->_formsById[$formId];
        }

        $formRecord = FormRecord::find()
            ->where(['id' => $formId])
            ->one();

        if ($formRecord === null) {
            return $this->_formsById[$formId] = null;
        }

        return $this->_formsById[$formId] = $this->_createFormFromRecord($formRecord);
    }

    /**
     * Get form by handle
     *
     * @param string $handle
     * @return null|Form
     */
    public function getFormByHandle(string $handle)
    {
        $formRecord = FormRecord::find()
            ->where(['handle' => $handle])
            ->one();

        return $this->_createFormFromRecord($formRecord);
    }

    /**
     * Save form
     *
     * @param Form $form
     * @return bool
     * @throws FormNotFoundException
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save(Form $form): bool
    {
        $isNew = !$form->id;

        if (!$isNew) {
            $formRecord = FormRecord::findOne($form->id);

            if (!$formRecord) {
                throw new FormNotFoundException("No form exists with the ID '{$form->id}'");
            }
        } else {
            $formRecord = new FormRecord();
        }

        $form->validate();

        if ($form->hasErrors()) {
            return false;
        }

        $fieldLayout = $form->getFieldLayout();
        $form->oldHandle = $formRecord->getOldHandle();
        $form->oldFieldLayoutId = $formRecord->getOldFieldLayoutId();

        $transaction = Craft::$app->db->beginTransaction();
        
        try {
            Craft::$app->getFields()->saveLayout($fieldLayout);
            $form->fieldLayoutId = $fieldLayout->id;
            $formRecord->fieldLayoutId = $fieldLayout->id;

            if ($isNew) {
                $formRecord->id = $form->id;

                $fieldLayout = $form->getFieldLayout();

                // Save field layout
                Craft::$app->getFields()->saveLayout($fieldLayout);
            }

            if (!Craft::$app->getElements()->saveElement($form)) {
                return false;
            }

            $transaction->commit();

        } catch(\Exception $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    /**
     * Delete form
     *
     * @param int $formId
     * @return bool
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function delete(int $formId): bool
    {
        if (!$formId) {
            return false;
        }

        $form = $this->getFormRecordById($formId);

        if (!$form) {
            return false;
        }
        
        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            // Delete field layout
            Craft::$app->getFields()->deleteFieldById($form->fieldLayoutId);

            // Delete all associated entries
            $entries = Entry::find()
                ->status(null)
                ->enabledForSite(false)
                ->formId($form->id)
                ->all();

            foreach ($entries as $entry) {
                Craft::$app->getElements()->deleteElement($entry);
            }

            // Delete form record
            Craft::$app->getDb()->createCommand()
                ->delete(
                    Table::FORMS,
                    ['id' => $form->id])
                ->execute();

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    /**
     * Get content table name
     *
     * @param Form $form
     * @param bool $useOldHandle
     * @return bool|string
     */
    public function getContentTableName(Form $form, $useOldHandle = false)
    {
        if ($useOldHandle) {
            if (!$form->oldHandle) {
                return false;
            }

            $handle = $form->oldHandle;
        } else {
            $handle = $form->handle;
        }

        $name = '_' . StringHelper::toLowerCase($handle);

        return '{{%formbuildercontent' . $name . '}}';
    }

    /**
     * Get content table
     *
     * @param $formId
     * @return string
     */
    public function getContentTable($formId)
    {
        $form = $this->getFormRecordById($formId);

        if ($form) {
            return sprintf('formbuildercontent_%s', trim(strtolower($form->handle)));
        }

        return 'content';
    }

    /**
     * Get all statuses
     *
     * @return array
     */
    public function getAllStatuses()
    {
        $statuses = FormStatusRecord::find()
            ->orderBy(['sortOrder' => SORT_ASC])
            ->all();

        $allStatuses = [];

        foreach ($statuses as $key => $value) {
            $allStatuses[] = new FormStatusModel($value->toArray([
                'id',
                'name',
                'handle',
                'color',
                'sortOrder',
                'isDefault'
            ]));
        }

        return array_values($allStatuses);
    }

    /**
     * Install default form statuses
     * @throws \yii\db\Exception
     */
    public function installDefaultStatuses()
    {
        $defaultStatuses = [
            0 => [
                'name'      => 'Enabled',
                'handle'    => 'enabled',
                'color'     => 'green',
                'sortOrder' => 1,
                'isDefault' => 0
            ],
            1 => [
                'name'      => 'Disabled',
                'handle'    => 'disabled',
                'color'     => 'red',
                'sortOrder' => 2,
                'isDefault' => 0
            ]
        ];

        foreach ($defaultStatuses as $key => $value) {
            Craft::$app->getDb()->createCommand()
                ->insert('{{%formbuilder_formstatus}}', [
                    'name' => $value['name'],
                    'handle' => $value['handle'],
                    'color' => $value['color'],
                    'sortOrder' => $value['sortOrder'],
                    'isDefault' => $value['isDefault']
                ])
                ->execute();
        }
    }

    // Private methods
    // =========================================================================

    /**
     * Create form from record
     *
     * @param FormRecord|null $formRecord
     * @return null|Form
     */
    private function _createFormFromRecord(FormRecord $formRecord = null)
    {
        if (!$formRecord) {
            return null;
        }

        $form = new Form($formRecord->toArray([
            'id',
            'name',
            'handle',
            'groupId',
            'fieldLayoutId',
            'statusId',
            'options',
            'spam',
            'integrations',
            'settings',
            'twig'
        ]));

        $form->options = Json::decode($form->options);
        $form->spam = Json::decode($form->spam);
        $form->integrations = Json::decode($form->integrations);
        $form->settings = Json::decode($form->settings);

        return $form;
    }

    /**
     * Create content table
     *
     * @param $name
     * @throws \Throwable
     */
    private function _createContentTable($name)
    {
        $migration = new CreateContentTable([
            'tableName' => $name
        ]);

        ob_start();
        $migration->up();
        ob_end_clean();
    }
}