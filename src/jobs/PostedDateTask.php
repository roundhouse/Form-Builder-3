<?php

namespace roundhouse\formbuilder\jobs;

use Craft;
use craft\queue\BaseJob;
use craft\db\Query;
use craft\helpers\DateTimeHelper;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\FormBuilder;

class PostedDateTask extends BaseJob
{
    // Public Methods
    // =========================================================================

    public function execute($queue)
    {
        $entries = Entry::findAll();

        try {
            foreach ($entries as $entry) {
                Craft::$app->getDb()->createCommand()
                    ->update('{{%formbuilder_entries}}', ['postedOn' => DateTimeHelper::toDateTime($entry->dateCreated)->format('Y-m-d H:i:s')], ['id' => $entry->id])
                    ->execute();
            }
        } catch (\Exception $e) {
            FormBuilder::log('There was an error running postedOn update: ' . $e->getMessage());
        }

        return true;
    }

    // Private Methods
    // =========================================================================


    // Protected Methods
    // =========================================================================

    /**
     * @return string
     */
    protected function defaultDescription(): string
    {
        return Craft::t('form-builder', 'Update Posted On');
    }
}