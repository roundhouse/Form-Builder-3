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
     * Save tab options
     *
     * @param $layoutTab
     * @param $tab
     * @param $formId
     * @param $layoutId
     * @return bool
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save($layoutTab, $tab, $formId, $layoutId) : bool
    {
        $tabModel               = new TabModel();
        $tabModel->name         = $layoutTab->name;
        $tabModel->tabId        = $layoutTab->id;
        $tabModel->layoutId     = $layoutId;
        $tabModel->formId       = $formId;
        $tabModel->options      = $tab['options'];

        $tabModel->validate();

        if ($tabModel->hasErrors()) {
            return false;
        }

        $tabRecord              = new TabRecord();
        $tabRecord->tabId       = $layoutTab->id;
        $tabRecord->name        = $layoutTab->name;
        $tabRecord->layoutId    = $layoutId;
        $tabRecord->formId      = $formId;
        $tabRecord->options     = $tab['options'];

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $tabRecord->save(false);
            $tabModel->id = $tabRecord->id;

            $transaction->commit();
        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
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