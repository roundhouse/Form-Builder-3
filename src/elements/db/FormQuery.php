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

class FormQuery extends ElementQuery
{
    // Public Properties
    // =========================================================================

    public $id;
    public $name;
    public $handle;
    public $oldHandle;
    public $groupId;
    public $statusId;
    public $options;
    public $spam;
    public $integrations;
    public $settings;

    // Public Methods
    // =========================================================================


    // Protected Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    protected function beforePrepare(): bool
    {
        $this->joinElementTable('formbuilder_forms');

        $this->query->select([
            'formbuilder_forms.name',
            'formbuilder_forms.handle',
            'formbuilder_forms.groupId',
            'formbuilder_forms.statusId',
            'formbuilder_forms.fieldLayoutId',
            'formbuilder_forms.options',
            'formbuilder_forms.spam',
            'formbuilder_forms.integrations',
            'formbuilder_forms.twig',
            'formbuilder_forms.settings'
        ]);

        if ($this->id) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_forms.id', $this->id));
        }

        if ($this->name) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_forms.name', $this->name));
        }

        if ($this->handle) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_forms.handle', $this->handle));
        }

        if ($this->groupId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_forms.groupId', $this->groupId));
        }

        if ($this->statusId) {
            $this->subQuery->andWhere(Db::parseParam('formbuilder_forms.statusId', $this->statusId));
        }

        return parent::beforePrepare();
    }

}