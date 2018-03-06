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
use roundhouse\formbuilder\models\Field;
use roundhouse\formbuilder\records\Field as FieldRecord;

use Craft;
use craft\helpers\Json;
use craft\base\Component;
use craft\db\Query;

use yii\base\Exception;

/**
 * Fields Service
 *
 * All of your plugin’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Fields extends Component
{   

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

    public function getFieldRecordByFieldId(int $fieldId)
    {
        $fieldRecord = FieldRecord::find()
            ->where(['fieldId' => $fieldId])
            ->one();

        return $fieldRecord;
    }

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
     * @return array
     */
    private function _getAllFieldOptions()
    {
        $fields = FieldRecord::find()->all();
        return $fields;
    }


}