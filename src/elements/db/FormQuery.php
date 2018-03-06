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

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Form as FormModel;
use roundhouse\formbuilder\models\Group;

use Craft;
use craft\db\Query;
use craft\db\QueryAbortedException;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use yii\db\Connection;

class FormQuery extends ElementQuery
{
    // Public Properties
    // =========================================================================

    public $id;
    public $name;
    public $handle;
    public $groupId;
    public $statusId;
    public $options;
    public $spam;
    public $notifications;
    public $settings;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function __construct($elementType, array $config = [])
    {
        // Default orderBy
        if (!isset($config['status'])) {
            $config['status'] = 'enabled';
        }

        parent::__construct($elementType, $config);
    }

    /**
     * @inheritdoc
     */
    public function __set($name, $value)
    {
        switch ($name) {
            case 'group':
                $this->group($value);
                break;
            
            default:
                parent::__set($name, $value);
        }
    }

    // /**
    //  * @inheritdoc
    //  */
    // public function name($value)
    // {
    //     $this->name = $value;

    //     return $this;
    // }

    // /**
    //  * @inheritdoc
    //  */
    // public function handle($value)
    // {
    //     $this->handle = $value;

    //     return $this;
    // }

    /**
     * Sets the [[groupId]] property based on a given form group(s)’s handle(s).
     *
     * @param string|string[]|CategoryGroup|null $value The property value
     *
     * @return static self reference
     */
    public function group($value)
    {
        return $this;
    }

    public function groupId($value)
    {
        $this->groupId = $value;
        return $this;
    }

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
            'formbuilder_forms.notifications',
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