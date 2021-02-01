<?php

namespace roundhouse\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use craft\helpers\MigrationHelper;
use roundhouse\formbuilder\plugin\Table;

/**
 * m210113_033630_UpdateTabTableToUseTabNames migration.
 */
class m210113_033630_UpdateTabTableToUseTabNames extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        MigrationHelper::dropForeignKeyIfExists(Table::TABS, ['tabId']);
        $this->addColumn(Table::TABS, 'name', $this->string()->after('id'));
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m210113_033630_UpdateTabTableToUseTabNames cannot be reverted.\n";
        return false;
    }
}
