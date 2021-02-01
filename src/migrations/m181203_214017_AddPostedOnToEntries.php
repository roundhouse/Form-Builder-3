<?php

namespace roundhouse\formbuilder\migrations;

use Craft;
use craft\db\Migration;
use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\plugin\Table;

/**
 * m181203_214017_AddPostedOnToEntries migration.
 */
class m181203_214017_AddPostedOnToEntries extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->addColumn(Table::ENTRIES, 'postedOn', $this->dateTime()->after('statusId')->notNull());

        // Update previous entries dateCreated to postedOn
        FormBuilder::$plugin->migrations->updatePostedDate();
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m181203_214017_AddPostedOnToEntries cannot be reverted.\n";
        return false;
    }
}
