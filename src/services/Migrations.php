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
use craft\records\FieldLayoutTab;
use craft\helpers\Json;
use craft\helpers\DateTimeHelper;
use craft\base\Component;
use craft\db\Query;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\jobs\PostedDateTask;
use roundhouse\formbuilder\records\Form as FormRecord;
use roundhouse\formbuilder\jobs\MigrationTask;

class Migrations extends Component
{
    public function getOldForms()
    {
        if (Craft::$app->db->columnExists('{{%formbuilder2_forms}}', 'id')) {
            $forms = (new Query())
                ->select([
                    'id',
                    'name',
                    'handle',
                    'fieldLayoutId',
                    'formSettings',
                    'spamProtectionSettings',
                    'messageSettings',
                    'notificationSettings',
                    'extra',
                ])
                ->from(['{{%formbuilder2_forms}}']);


            $clean = [];

            foreach ($forms->all() as $form) {
                $form = [
                    'id' => $form['id'],
                    'name' => $form['name'],
                    'handle' => $form['handle'],
                    'fieldLayoutId' => $form['fieldLayoutId'],
                    'formSettings' => Json::decode($form['formSettings']),
                    'spamProtectionSettings' => Json::decode($form['spamProtectionSettings']),
                    'messageSettings' => Json::decode($form['messageSettings']),
                    'notificationSettings' => Json::decode($form['notificationSettings']),
                    'extra' => Json::decode($form['extra']),
                ];

                $clean[] = $form;
            }
        } else {
            $clean = null;
        }

        return $clean;
    }

    public function getEntriesByFormId($formId)
    {
        $entries = (new Query())
            ->select('*')
            ->where(['formId' => $formId])
            ->from(['{{%formbuilder2_entries}}']);

        $clean = [];

        foreach ($entries->all() as $entry) {
            $entry = [
                'id' => $entry['id'],
                'oldFormId' => $entry['formId'],
                'title' => $entry['title'],
                'submission' => Json::decode($entry['submission']),
                'dateCreated' => $entry['dateCreated'],
                'dateUpdated' => $entry['dateUpdated'],
            ];

            $clean[] = $entry;
        }

        return $clean;
    }

    public function getOldEntries()
    {
        $entries = (new Query())
            ->select([
                'id',
                'formId',
                'title',
                'submission',
            ])
            ->from(['{{%formbuilder2_entries}}']);

        $clean = [];

        foreach ($entries->all() as $entry) {
            $entry = [
                'id' => $entry['id'],
                'formId' => $entry['formId'],
                'title' => $entry['title'],
                'submission' => Json::decode($entry['submission']),
            ];

            $clean[] = $entry;
        }

        return $clean;
    }

    public function migrateForm(Form $form, $oldFormId, $includeEntries): bool
    {
        $formRecord = new FormRecord();

        if ($form->hasErrors()) {
            return false;
        }

        $formRecord->name = $form->name;
        $formRecord->handle = $form->handle;
        $formRecord->statusId = $form->statusId;
        $formRecord->groupId = $form->groupId;
        $formRecord->settings = Json::encode($form->settings);
        $formRecord->options = Json::encode($form->options);
        $formRecord->spam = Json::encode($form->spam);
//        $formRecord->integrations      = Json::encode($form->integrations);

        $fieldLayout = $form->getFieldLayout();

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            Craft::$app->getFields()->saveLayout($fieldLayout);
            $form->fieldLayoutId = $fieldLayout->id;
            $formRecord->fieldLayoutId = $fieldLayout->id;

            if (!Craft::$app->getElements()->saveElement($form, false)) {
                FormBuilder::error('Cannot migrate form ' . $form);
            }

            $formRecord->id = $form->id;
            $formRecord->save(false);
            
            // Migrate entries
            if ($includeEntries) {
                Craft::$app->getQueue()->push(new MigrationTask([
                    'handle' => $form->handle,
                    'form' => $form,
                    'oldFormId' => $oldFormId,
                ]));
            }

            $transaction->commit();

        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return true;
    }

    /**
     * Migrate entry
     *
     * @param $entry
     * @param $form
     * @return bool
     * @throws \Throwable
     * @throws \craft\errors\ElementNotFoundException
     * @throws \yii\base\Exception
     */
    public function migrateEntry($entry, $form): bool
    {
        $data = $entry['submission'];

        $model = new Entry();
        $model->form = $form;
        $model->formId = $form->id;
        $model->statusId = 2;
        $model->ipAddress = '127.0.0.1';
        $model->postedOn = DateTimeHelper::toDateTime($entry['dateCreated']);
        $model->title = $form->name .' - '.DateTimeHelper::toDateTime($entry['dateCreated'])->format('Y-m-d');

        foreach ($form->getFields() as $field) {
            $model->setFieldValue($field->handle, $data[$field->handle]);
        }

        $model->validate();

        if (!$model->hasErrors()) {
            return Craft::$app->getElements()->saveElement($model, false);
        }

        return false;
    }

    /**
     * Check if form is migrated
     *
     * @param $handle
     * @return bool
     */
    public function isMigrated($handle)
    {
        return FormBuilder::$plugin->forms->getFormByHandle($handle) ? true : false;
    }

    /**
     * Check if migrations available
     *
     * @return bool
     */
    public function isMigrationsAvailable()
    {
        $forms = $this->getOldForms();
        $migrationAvailable = false;

        if ($forms) {
            foreach ($forms as $form) {
                $migrated = $this->isMigrated($form['handle']);

                if (!$migrated) {
                    $migrationAvailable = true;
                }
            }
        }

        return $migrationAvailable;
    }

    /**
     * Run posted date update task
     */
    public function updatePostedDate()
    {
        Craft::$app->getQueue()->push(new PostedDateTask());
    }
}