<?php

namespace roundhouse\formbuilder\migrations;

use Craft;
use craft\db\Migration;

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
        $this->addColumn('{{%formbuilder_integrations}}', 'category', $this->string()->after('handle'));
        $this->addColumn('{{%formbuilder_integrations}}', 'token', $this->string()->after('status'));
        $this->addColumn('{{%formbuilder_integrations}}', 'frontend', $this->boolean()->after('status'));
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
