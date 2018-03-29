<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\plugin;

use roundhouse\formbuilder\services\Forms;
use roundhouse\formbuilder\services\Entries;
use roundhouse\formbuilder\services\Fields;
use roundhouse\formbuilder\services\Tabs;
use roundhouse\formbuilder\services\Groups;
use roundhouse\formbuilder\services\Notes;

trait Services
{
    // Public Methods
    // =========================================================================

    /**
     * Get forms
     *
     * @return Forms
     */
    public function getForms(): Forms
    {
        return $this->get('forms');
    }

    /**
     * Get entries
     *
     * @return Entries
     */
    public function getEntries(): Entries
    {
        return $this->get('entries');
    }

    /**
     * Get form groups
     *
     * @return Groups
     */
    public function getGroups(): Groups
    {
        return $this->get('groups');
    }

    /**
     * Get form custom fields
     *
     * @return Fields
     */
    public function getFields(): Fields
    {
        return $this->get('fields');
    }

    /**
     * Get form custom tabs
     *
     * @return Tabs
     */
    public function getTabs(): Tabs
    {
        return $this->get('tabs');
    }

    /**
     * Get entry notes
     *
     * @return Notes
     */
    public function getNotes(): Notes
    {
        return $this->get('notes');
    }

    // Private Methods
    // =========================================================================

    /**
     * Set components
     */
    private function _setPluginComponents()
    {
        $this->setComponents([
            'forms' => Forms::class,
            'entries' => Entries::class,
            'groups' => Groups::class,
            'fields' => Fields::class,
            'tabs' => Tabs::class,
            'notes' => Notes::class
        ]);
    }
}