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

use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\config\DbConfig;
use craft\db\Migration;

/**
 * Form Builder Install Migration
 *
 * If your plugin needs to create any custom database tables when it gets installed,
 * create a migrations/ folder within your plugin folder, and save an Install.php file
 * within it using the following template:
 *
 * If you need to perform any additional actions on install/uninstall, override the
 * safeUp() and safeDown() methods.
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Install extends Migration
{
    // Public Properties
    // =========================================================================

    /**
     * @var string The database driver to use
     */
    public $driver;

    // Public Methods
    // =========================================================================

    /**
     * This method contains the logic to be executed when applying this migration.
     * This method differs from [[up()]] in that the DB logic implemented here will
     * be enclosed within a DB transaction.
     * Child classes may implement this method instead of [[up()]] if the DB logic
     * needs to be within a transaction.
     *
     * @return boolean return a false value to indicate the migration fails
     * and should not proceed further. All other return values mean the migration succeeds.
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
     * This method contains the logic to be executed when removing this migration.
     * This method differs from [[down()]] in that the DB logic implemented here will
     * be enclosed within a DB transaction.
     * Child classes may implement this method instead of [[down()]] if the DB logic
     * needs to be within a transaction.
     *
     * @return boolean return a false value to indicate the migration fails
     * and should not proceed further. All other return values mean the migration succeeds.
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
     * Creates the tables needed for the Records used by the plugin
     *
     * @return bool
     */
    protected function createTables()
    {
        // Forms
        $this->createTable('{{%formbuilder_forms}}', [
                'id' => $this->integer()->notNull(),
                'name' => $this->string()->notNull(),
                'handle' => $this->string()->notNull(),
                'groupId' => $this->integer(),
                'fieldLayoutId' => $this->integer(),
                'statusId' => $this->integer(),
                'options' => $this->text(),
                'spam' => $this->text(),
                'notifications' => $this->text(),
                'settings' => $this->text(),
                'twig' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );

        // Form Groups
        $this->createTable('{{%formbuilder_formgroup}}', [
                'id' => $this->primaryKey(),
                'name' => $this->string()->notNull(),
                'settings' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
            ]
        );

        // Form Statuses
        $this->createTable('{{%formbuilder_formstatus}}', [
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
        $this->createTable('{{%formbuilder_entries}}', [
                'id' => $this->integer()->notNull(),
                'title' => $this->string()->notNull(),
                'options' => $this->text(),
                'formId' => $this->integer()->notNull(),
                'statusId' => $this->integer()->notNull(),
                'ipAddress' => $this->string()->notNull(),
                'userAgent' => $this->text(),
                'dateCreated' => $this->dateTime()->notNull(),
                'dateUpdated' => $this->dateTime()->notNull(),
                'uid' => $this->uid(),
                'PRIMARY KEY(id)',
            ]
        );

        // Entry Statuses
        $this->createTable('{{%formbuilder_entrystatus}}', [
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
        $this->createTable('{{%formbuilder_fields}}', [
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
        $this->createTable('{{%formbuilder_tabs}}', [
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
    }

    /**
     * Creates the indexes needed for the Records used by the plugin
     *
     * @return void
     */
    protected function createIndexes()
    {
        $this->createIndex($this->db->getIndexName('{{%formbuilder_forms}}', 'name', true), '{{%formbuilder_forms}}', 'name', true);
        $this->createIndex($this->db->getIndexName('{{%formbuilder_forms}}', 'handle', true), '{{%formbuilder_forms}}', 'handle', true);
        $this->createIndex($this->db->getIndexName('{{%formbuilder_forms}}', 'fieldLayoutId', true), '{{%formbuilder_forms}}', 'fieldLayoutId', true);
        $this->createIndex($this->db->getIndexName('{{%formbuilder_formgroup}}', 'name', true), '{{%formbuilder_formgroup}}', 'name', true);
        
        // Additional commands depending on the db driver
        switch ($this->driver) {
            case DbConfig::DRIVER_MYSQL:
                break;
            case DbConfig::DRIVER_PGSQL:
                break;
        }
    }

    /**
     * Creates the foreign keys needed for the Records used by the plugin
     *
     * @return void
     */
    protected function addForeignKeys()
    {
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_forms}}', 'id'), '{{%formbuilder_forms}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_forms}}', 'fieldLayoutId'), '{{%formbuilder_forms}}', 'fieldLayoutId', '{{%fieldlayouts}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_forms}}', 'groupId'), '{{%formbuilder_forms}}', 'groupId', '{{%formbuilder_formgroup}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_forms}}', 'statusId'), '{{%formbuilder_forms}}', 'statusId', '{{%formbuilder_formstatus}}', 'id', 'CASCADE', null);
        
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_entries}}', 'id'), '{{%formbuilder_entries}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_entries}}', 'formId'), '{{%formbuilder_entries}}', 'formId', '{{%formbuilder_forms}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_entries}}', 'statusId'), '{{%formbuilder_entries}}', 'statusId', '{{%formbuilder_entrystatus}}', 'id', 'CASCADE', null);
        
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_fields}}', 'fieldLayoutId'), '{{%formbuilder_fields}}', 'fieldLayoutId', '{{%fieldlayouts}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_fields}}', 'fieldId'), '{{%formbuilder_fields}}', 'fieldId', '{{%fields}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_fields}}', 'formId'), '{{%formbuilder_fields}}', 'formId', '{{%formbuilder_forms}}', 'id', 'CASCADE', null);
        
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_tabs}}', 'layoutId'), '{{%formbuilder_tabs}}', 'layoutId', '{{%fieldlayouts}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_tabs}}', 'tabId'), '{{%formbuilder_tabs}}', 'tabId', '{{%fieldlayouttabs}}', 'id', 'CASCADE', null);
        $this->addForeignKey($this->db->getForeignKeyName('{{%formbuilder_tabs}}', 'formId'), '{{%formbuilder_tabs}}', 'formId', '{{%formbuilder_forms}}', 'id', 'CASCADE', null);
    }

    /**
     * Removes the tables needed for the Records used by the plugin
     *
     * @return void
     */
    protected function removeTables()
    {
        $this->dropTableIfExists('{{%formbuilder_entries}}');
        $this->dropTableIfExists('{{%formbuilder_entrystatus}}');
        $this->dropTableIfExists('{{%formbuilder_fields}}');
        $this->dropTableIfExists('{{%formbuilder_tabs}}');
        $this->dropTableIfExists('{{%formbuilder_forms}}');
        $this->dropTableIfExists('{{%formbuilder_formgroup}}');
        $this->dropTableIfExists('{{%formbuilder_formstatus}}');
    }
}
