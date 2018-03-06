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

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\models\FormModel;
use roundhouse\formbuilder\models\FormStatus as FormStatusModel;
use roundhouse\formbuilder\records\FormStatus as FormStatusRecord;
use roundhouse\formbuilder\records\Form as FormRecord;
use roundhouse\formbuilder\errors\FormNotFoundException;

use Craft;
use craft\base\Component;
use craft\helpers\Json;
use craft\helpers\ArrayHelper;
use craft\db\Query;


/**
 * Forms Service
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Forms extends Component
{
    // Properties
    // =========================================================================

    protected $formRecord;

    private $_allFormIds;
    private $_allForms;
    private $_formsById;

    // Public Methods
    // =========================================================================

    /**
     * Constructor
     *
     * @param object $sliderRecord
     */
    public function __construct($formRecord = null)
    {
        $this->formRecord = $formRecord;

        if (is_null($this->formRecord))
        {
            $this->formRecord = new FormRecord();
        }
    }

    public function getAllForms(): array
    {
        if ($this->_allForms !== null) {
            return $this->_allForms;
        }

        $this->_allForms = Form::findAll();
        $this->_formsById = ArrayHelper::index($this->_allForms, 'id');

        return $this->_allForms;
    }

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

    public function getFormByHandle(string $handle)
    {
        $formRecord = FormRecord::find()
            ->where(['handle' => $handle])
            ->one();

        return $this->_createFormFromRecord($formRecord);
    }

    /**
     * Saves a form.
     *
     * @param Form $form      The tag group to be saved
     * @param bool     $runValidation Whether the form should be validated
     *
     * @return bool Whether the tag group was saved successfully
     * @throws FormNotFoundException if $form->id is invalid
     * @throws \Throwable if reasons
     */
    public function save(Form $form): bool
    {
        $isNewForm = !$form->id;

        if (!$isNewForm) {
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

        $formRecord->name               = $form->name;
        $formRecord->handle             = $form->handle;
        $formRecord->statusId           = $form->statusId;
        $formRecord->groupId            = $form->groupId;
        $formRecord->options            = Json::encode($form->options);
        $formRecord->spam               = Json::encode($form->spam);
        $formRecord->notifications      = Json::encode($form->notifications);
        $formRecord->settings           = Json::encode($form->settings);


        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $fieldLayout = $form->getFieldLayout();
            Craft::$app->getFields()->saveLayout($fieldLayout);
            $form->fieldLayoutId = $fieldLayout->id;
            $formRecord->fieldLayoutId = $fieldLayout->id;

            if (!Craft::$app->getElements()->saveElement($form, false)) {
                throw new Exception('Couldn’t save the form.');
            }

            if ($isNewForm) {
                $formRecord->id = $form->id;
            }

            $formRecord->save(false);

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    /**
     * Deletes a form by its ID.
     *
     * @param int $formId
     *
     * @return bool Whether the form was deleted successfully
     * @throws \Throwable if reasons
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
            $fieldLayoutId = (new Query())
                ->select(['fieldLayoutId'])
                ->from(['{{%formbuilder_forms}}'])
                ->where(['id' => $formId])
                ->scalar();

            if ($fieldLayoutId) {
                Craft::$app->getFields()->deleteLayoutById($fieldLayoutId);
            }

            // Delete Entries
            $entries = Entry::find()
                ->status(null)
                ->enabledForSite(false)
                ->formId($formId)
                ->all();

            foreach ($entries as $entry) {
                Craft::$app->getElements()->deleteElement($entry);
            }

            Craft::$app->getDb()->createCommand()
                ->delete(
                    '{{%formbuilder_forms}}',
                    ['id' => $formId])
                ->execute();

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }



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
     * Install default statuses
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
            'notifications',
            'settings',
            'twig'
        ]));

        $form->options = Json::decode($form->options);
        $form->spam = Json::decode($form->spam);
        $form->notifications = Json::decode($form->notifications);
        $form->settings = Json::decode($form->settings);

        return $form;
    }
}
