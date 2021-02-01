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
use craft\base\Component;
use roundhouse\formbuilder\objects\TabOptions;

use roundhouse\formbuilder\models\Tab;
use roundhouse\formbuilder\records\Tab as TabRecord;
use roundhouse\formbuilder\models\Tab as TabModel;

class Tabs extends Component
{
    /**
     * Get tabs
     *
     * @return array
     */
    public function getTabs()
    {
        $output = [];
        $tabs = FieldLayoutTab::find()->all();

        foreach ($tabs as $key => $tab) {
            $output[(int) $tab->id] = [
                'id'            => (int) $tab->id,
                'name'          => $tab->name,
                'layoutId'      => $tab->layoutId
            ];
        }

        return $output;
    }

    /**
     * Get all tab options
     *
     * @return array
     */
    public function getAllTabOptions()
    {
        $tabs = $this->_getAllTabOptions();
        $output = [];

        foreach ($tabs as $tab) {
            $output[$tab->tabId] = [
                'layoutId' => $tab->layoutId,
                'tabId' => $tab->tabId,
                'options' => $tab->options
            ];
        }

        return $output;
    }

    /**
     * Get tab options by payload
     *
     * @param $layoutId
     * @param $tabId
     * @param $tabName
     * @return array|\yii\db\ActiveRecord|null
     */
    public function getTabOptionsByPayload($layoutId, $tabId, $tabName)
    {
        return TabRecord::find()->where([
            'layoutId'=> $layoutId,
            'tabId'=> $tabId,
            'name' => $tabName,
        ])->one();
    }


    /**
     * Save tab options
     *
     * @param $tab
     * @param $newTabId
     * @param $postOptions
     * @param $formId
     * @param $layoutId
     * @return bool
     * @throws \Throwable
     * @throws \yii\base\InvalidConfigException
     * @throws \yii\db\Exception
     */
    public function save($tab, $newTabId , $postOptions, $formId, $layoutId) : bool
    {
        $tabModel               = new TabModel();
        $tabModel->tabId        = $newTabId;
        $tabModel->name         = $tab['tabName'];
        $tabModel->layoutId     = $layoutId;
        $tabModel->formId       = $formId;

        $tabModel->validate();

        if ($tabModel->hasErrors()) {
            return false;
        }

        $tabRecord              = new TabRecord();
        $tabRecord->tabId       = $newTabId;
        $tabRecord->name        = $tab['tabName'];
        $tabRecord->layoutId    = $layoutId;
        $tabRecord->formId      = $formId;

        // Validate class and id
        $options = Craft::createObject(TabOptions::class);

        if (isset($postOptions['class']) && $postOptions['class'] !== '') {
            $options->class = $postOptions['class'];
        }

        if (isset($postOptions['id']) && $postOptions['id'] !== '') {
            $options->id = $postOptions['id'];
        }

        $tabRecord->options = $options;

        if (!$options->isClassEmpty() || !$options->isIdEmpty()) {
            $transaction = Craft::$app->getDb()->beginTransaction();

            try {
                $tabRecord->save(false);
                $tabModel->id = $tabRecord->id;

                $transaction->commit();
            } catch (\Throwable $e) {
                $transaction->rollBack();

                throw $e;
            }
        }

        return true;
    }

    /**
     * Get tab settings
     *
     * @param $tabId
     * @return array|null|\yii\db\ActiveRecord
     */
    public function getTabSettings($tabId)
    {
        $tabRecord = TabRecord::find()
            ->where(['tabId' => $tabId])
            ->one();

        if ($tabRecord) {
            return Json::decodeIfJson($tabRecord->options);
        }
        
        return $tabRecord;
    }

    public function getRealTabIdByName($tabName, $fieldLayoutId)
    {
        $record = FieldLayoutTab::find()->where([
            'name' => $tabName,
            'layoutId' => $fieldLayoutId
        ])->one();

        if ($record) {
            return $record->id;
        }

        return null;
    }

    /**
     * Remove records
     *
     * @param $formId
     * @param $fieldLayoutId
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public function removeUnusedRecords($formId, $fieldLayoutId)
    {
        $existingRecords = TabRecord::find()->where([
            'formId' => $formId,
            'layoutId' => $fieldLayoutId
        ])->all();

        foreach ($existingRecords as $record) {
            $record->delete();
        }
    }

    // Private Methods
    // =========================================================================

    /**
     * Get all tab options
     *
     * @return array|\yii\db\ActiveRecord[]
     */
    private function _getAllTabOptions()
    {
        $tabs = TabRecord::find()->all();
        return $tabs;
    }


}