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
use craft\config\DbConfig;
use craft\db\Connection;
use craft\db\Migration;
use craft\db\Table as CraftTable;

use roundhouse\formbuilder\plugin\Table;

class Install extends Migration
{
    // Public Properties
    // =========================================================================

    public $driver;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;

        $this->createTables();
        $this->createIndexes();
        $this->addForeignKeys();
        
        // Refresh the db schema caches
        Craft::$app->db->schema->refresh();

        return true;
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;
        $this->removeTables();

        return true;
    }

    // Protected Methods
    // =========================================================================

    /**
     * Create tables
     */
    protected function createTables()
    {
        // Forms
        $this->createTable(Table::FORMS, [
                'id' => $this->integer()->notNull(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'groupId' => $this->integer(),
                'fieldLayoutId' => $this->integer(),
                'statusId' => $this->integer(),
                'options' => $this->text(),
                'spam' => $this->text(),
                'integrations' => $this->text(),
                'settings' => $this->text(),
                'twig' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );

        // Form Groups
        $this->createTable(Table::FORM_GROUP, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'settings' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]
        );

        // Form Statuses
        $this->createTable(Table::FORM_STATUS, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'color' => $this->enum('color', ['black', 'silver', 'maroon', 'red', 'fuchsia', 'purple', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange', 'aliceblue', 'antiquewhite', 'azure', 'beige', 'blueviolet', 'brown', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'crimson', 'cyan', 'deeppink', 'dimgray', 'hotpink', 'lightgreen', 'mediumpurple', 'slategray','tomato', 'yellowgreen', 'whitesmoke', 'rebeccapurple'])->notNull()->defaultValue('green'),
                'sortOrder' => $this->smallInteger()->unsigned(),
                'isDefault' => $this->boolean()->defaultValue(true),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]
        );

        // Entries
        $this->createTable(Table::ENTRIES, [
                'id' => $this->integer()->notNull(),
                'title' => $this->string()->notNull(),
                'options' => $this->text(),
                'notes' => $this->text(),
                'settings' => $this->text(),
                'formId' => $this->integer()->notNull(),
                'statusId' => $this->integer()->notNull(),
                'postedOn' => $this->dateTime()->notNull(),
                'ipAddress' => $this->string()->notNull(),
                'userAgent' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );

        // Entry's Note
        $this->createTable(Table::ENTRIES_NOTES, [
                'id' => $this->primaryKey(),
                'note' => $this->text(),
                'entryId' => $this->integer()->notNull(),
                'authorId' => $this->integer()->notNull(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid()
            ]
        );

        // Entry Statuses
        $this->createTable(Table::ENTRY_STATUS, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'color' => $this->enum('color', ['black', 'silver', 'maroon', 'red', 'fuchsia', 'purple', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'orange', 'aliceblue', 'antiquewhite', 'azure', 'beige', 'blueviolet', 'brown', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'crimson', 'cyan', 'deeppink', 'dimgray', 'hotpink', 'lightgreen', 'mediumpurple', 'slategray','tomato', 'yellowgreen', 'whitesmoke', 'rebeccapurple'])->notNull()->defaultValue('blue'),
                'sortOrder' => $this->smallInteger()->unsigned(),
                'isDefault' => $this->boolean()->defaultValue(true),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]
        );

        // Fields
        $this->createTable(Table::FIELDS, [
                'id' => $this->primaryKey(),
                'fieldId' => $this->integer()->notNull(),
                'fieldLayoutId' => $this->integer(),
                'options' => $this->text(),
                'formId' => $this->integer(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]
        );

        // Tabs
        $this->createTable(Table::TABS, [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'tabId' => $this->integer()->notNull(),
                'layoutId' => $this->integer(),
                'formId' => $this->integer(),
                'options' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid()
            ]
        );

        $this->createTable(Table::INTEGRATIONS, [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull(),
            'handle' => $this->string()->notNull(),
            'category' => $this->string(),
            'type' => $this->string()->notNull(),
            'status' => $this->string()->notNull()->defaultValue('enabled'),
            'token' => $this->string(),
            'frontend' => $this->boolean(),
            'allowMultiple' => $this->boolean()->defaultValue(0),
            'content' => $this->text(),
            'settings' => $this->text(),
            'dateCreated' => $this->dateTime()->notNull(),
            'dateUpdated' => $this->dateTime()->notNull(),
            'uid' => $this->uid(),
        ]);
    }

    /**
     * Create indexes
     */
    protected function createIndexes()
    {
        $indexName = $this->db->getIndexName();

        $this->createIndex($indexName, Table::FORMS, 'name', true);
        $this->createIndex($indexName, Table::FORMS, 'handle', true);
        $this->createIndex($indexName, Table::FORMS, 'fieldLayoutId', true);
        $this->createIndex($indexName, Table::FORM_GROUP, 'name', true);

        // Additional commands depending on the db driver
        switch ($this->driver) {
            case Connection::DRIVER_MYSQL;
                break;
            case Connection::DRIVER_PGSQL:
                break;
        }
    }

    /**
     * Add foreign keys
     */
    protected function addForeignKeys()
    {
        $foreignKeyName = $this->db->getForeignKeyName();

        $this->addForeignKey($foreignKeyName, Table::FORMS, 'id', CraftTable::ELEMENTS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::FORMS, 'fieldLayoutId', CraftTable::FIELDLAYOUTS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::FORMS, 'groupId', Table::FORM_GROUP, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::FORMS, 'statusId', Table::ENTRY_STATUS, 'id', 'CASCADE', null);

        $this->addForeignKey($foreignKeyName, Table::ENTRIES, 'id', CraftTable::ELEMENTS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::ENTRIES, 'formId', Table::FORMS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::ENTRIES, 'statusId', Table::ENTRY_STATUS, 'id', 'CASCADE', null);

        $this->addForeignKey($foreignKeyName, Table::FIELDS, 'fieldLayoutId', CraftTable::FIELDLAYOUTS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::FIELDS, 'fieldId', CraftTable::FIELDS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::FIELDS, 'formId', Table::FORMS, 'id', 'CASCADE', null);

        $this->addForeignKey($foreignKeyName, Table::TABS, 'layoutId', CraftTable::FIELDLAYOUTS, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::TABS, 'formId', Table::FORMS, 'id', 'CASCADE', null);

        $this->addForeignKey($foreignKeyName, Table::ENTRIES_NOTES, 'entryId', Table::ENTRIES, 'id', 'CASCADE', null);
        $this->addForeignKey($foreignKeyName, Table::ENTRIES_NOTES, 'authorId', CraftTable::USERS, 'id', 'CASCADE', null);
    }

    /**
     * Remove tables
     */
    protected function removeTables()
    {
        $hasIntegrationsPlugin = Craft::$app->plugins->isPluginInstalled('form-builder-integrations');

        if ($hasIntegrationsPlugin) {
            Craft::$app->plugins->uninstallPlugin('form-builder-integrations');
        }

        $this->dropTableIfExists('{{%formbuilder_entries_notes}}');
        $this->dropTableIfExists('{{%formbuilder_entries}}');
        $this->dropTableIfExists('{{%formbuilder_entrystatus}}');
        $this->dropTableIfExists('{{%formbuilder_fields}}');
        $this->dropTableIfExists('{{%formbuilder_tabs}}');
        $this->dropTableIfExists('{{%formbuilder_forms}}');
        $this->dropTableIfExists('{{%formbuilder_formgroup}}');
        $this->dropTableIfExists('{{%formbuilder_formstatus}}');

        $this->dropTableIfExists(Table::INTEGRATIONS);
    }
}
