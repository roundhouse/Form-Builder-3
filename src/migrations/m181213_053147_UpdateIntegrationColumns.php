<?php

namespace roundhouse\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use roundhouse\formbuilder\plugin\Table;

/**
 * m181213_053147_UpdateIntegrationColumns migration.
 */
class m181213_053147_UpdateIntegrationColumns extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->addColumn(Table::INTEGRATIONS, 'category', $this->string()->after('handle'));
        $this->addColumn(Table::INTEGRATIONS, 'token', $this->string()->after('status'));
        $this->addColumn(Table::INTEGRATIONS, 'frontend', $this->boolean()->after('status'));
        $this->addColumn(Table::INTEGRATIONS, 'allowMultiple', $this->boolean()->after('status')->defaultValue(0));
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m181213_053147_UpdateIntegrationColumns cannot be reverted.\n";
        return false;
    }
}
