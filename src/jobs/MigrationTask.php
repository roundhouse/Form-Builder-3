<?php

namespace roundhouse\formbuilder\jobs;

use Craft;
use craft\queue\BaseJob;
use craft\db\Query;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\FormBuilder;

class MigrationTask extends BaseJob
{
    // Public Properties
    // =========================================================================

    public $handle;
    public $form;
    public $oldFormId;

    // Public Methods
    // =========================================================================

    public function execute($queue)
    {
        $entries = FormBuilder::$plugin->migrations->getEntriesByFormId($this->oldFormId);

        try {
            foreach ($entries as $entry) {
                $result = FormBuilder::$plugin->migrations->migrateEntry($entry, $this->form);
            }
        } catch (\Exception $e) {
            FormBuilder::log('There was an error migrating entries: ' . $e->getMessage());
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
        return Craft::t('form-builder', 'Migrations');
    }
}