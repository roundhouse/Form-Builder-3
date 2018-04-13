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
use yii\base\Exception;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Field;
use roundhouse\formbuilder\records\Field as FieldRecord;

class Fields extends Component
{

    /**
     * Get fields
     *
     * @return array
     */
    public function getFields()
    {
        $fields = Craft::$app->fields->getAllFields();
        $output = [];

        foreach ($fields as $field) {
            $output[(int) $field->id] = [
                'id'            => (int) $field->id,
                'handle'        => $field->handle,
                'name'          => $field->name,
                'instructions'  => $field->instructions
            ];
        }

        return $output;
    }

    /**
     * Get all field options
     *
     * @return array
     */
    public function getAllFieldOptions()
    {
        $field = $this->_getAllFieldOptions();
        $output = [];

        foreach ($field as $field) {
            $output[$field->id] = [
                'fieldLayoutId' => $field->fieldLayoutId,
                'fieldId' => $field->fieldId,
                'options' => $field->options
            ];
        }

        return $output;
    }


    /**
     * Get field record by field id
     *
     * @param int $fieldId
     * @return array|null|\yii\db\ActiveRecord
     */
    public function getFieldRecordByFieldId(int $fieldId, int $formId)
    {
        $fieldRecord = FieldRecord::find()
            ->where([
                'fieldId' => $fieldId,
                'formId' => $formId
            ])
            ->one();

        return $fieldRecord;
    }

    /**
     * Save field options
     *
     * @param Field $field
     * @return bool
     * @throws Exception
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save(Field $field) : bool
    {
        $fieldRecord = FormBuilder::$plugin->fields->getFieldRecordByFieldId($field->fieldId);

        if ($fieldRecord) {
            if (!$fieldRecord) {
                throw new Exception("Field record not available", 1);
            }
        } else {
            $fieldRecord = new FieldRecord();
        }

        $field->validate();

        if ($field->hasErrors()) {
            return false;
        }

        $fieldRecord->fieldId           = $field->fieldId;
        $fieldRecord->fieldLayoutId     = $field->fieldLayoutId;
        $fieldRecord->options           = $field->options;
        $fieldRecord->formId            = $field->formId;

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $fieldRecord->save(false);
            $field->id = $fieldRecord->id;

            $transaction->commit();
        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    // Private Methods
    // =========================================================================

    /**
     * Get all field options
     *
     * @return array|\yii\db\ActiveRecord[]
     */
    private function _getAllFieldOptions()
    {
        $fields = FieldRecord::find()->all();
        return $fields;
    }


}