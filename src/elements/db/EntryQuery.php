<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\elements\db;

use craft\elements\db\ElementQuery;
use craft\helpers\Db;

use roundhouse\formbuilder\FormBuilder;

class EntryQuery extends ElementQuery
{
    // Public Properties
    // =========================================================================

    public $id;
    public $form;
    public $title;
    public $formId;
    public $statusId;
    public $options;
    public $ipAddress;
    public $userAgent;


    // Public Methods
    // =========================================================================


    /**
     * Return Form ID
     *
     * @param $value
     * @return $this
     */
    public function formId($value)
    {
        $this->formId = $value;
        return $this;
    }


    /**
     * Return Status ID
     *
     * @param $value
     * @return $this
     */
    public function statusId($value)
    {
        $this->statusId = $value;
        return $this;
    }

    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected function beforePrepare(): bool
    {
        $this->joinElementTable('formbuilder_entries');

        $this->query->select([
            'formbuilder_entries.title',
            'formbuilder_entries.formId',
            'formbuilder_entries.statusId',
            'formbuilder_entries.ipAddress',
            'formbuilder_entries.userAgent',
            'formbuilder_entries.dateCreated',
            'formbuilder_entries.dateUpdated'
        ]);

        if ($this->title) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.title', $this->title));
        }

        if ($this->formId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.formId', $this->formId));
        }

        if ($this->statusId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.statusId', $this->statusId));
        }

        if ($this->options) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.options', $this->options));
        }

        if ($this->dateCreated) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.dateCreated', $this->dateCreated));
        }

        if ($this->ipAddress) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.ipAddress', $this->ipAddress));
        }

        if ($this->userAgent) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_entries.userAgent', $this->userAgent));
        }

        return parent::beforePrepare();
    }

    /**
     * @inheritdoc
     */
    protected function statusCondition(string $status)
    {
        $statuses = FormBuilder::$plugin->entries->getAllStatuses();

        foreach ($statuses as $value) {
            $result = FormBuilder::$plugin->entries->getStatusByHandle($value->handle);

            if ($value->handle == $status) {
                return ['formbuilder_entries.statusId' => $result->id];
            }
        };
    }
}