<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use roundhouse\formbuilder\plugin\Table;

/**
 * m181024_173921_AddIntegrationsTable migration.
 */
class m181024_173921_AddIntegrationsTable extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->createTable(Table::INTEGRATIONS, [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'handle' => $this->string()->notNull(),
            'type' => $this->string()->notNull(),
            'status' => $this->string()->notNull()->defaultValue('enabled'),
            'content' => $this->text(),
            'settings' => $this->text(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->dropTableIfExists(Table::INTEGRATIONS);

        return true;
    }
}
