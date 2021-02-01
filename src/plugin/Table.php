<?php

namespace roundhouse\formbuilder\plugin;

abstract class Table
{
    const ENTRIES = '{{%formbuilder_entries}}';
    const ENTRIES_NOTES = '{{%formbuilder_entries_notes}}';
    const ENTRY_STATUS = '{{%formbuilder_entrystatus}}';
    const FORMS = '{{%formbuilder_forms}}';
    const FORM_STATUS = '{{%formbuilder_formstatus}}';
    const FORM_GROUP = '{{%formbuilder_formgroup}}';

    const TABS = '{{%formbuilder_tabs}}';
    const FIELDS = '{{%formbuilder_fields}}';

    const INTEGRATIONS = '{{%formbuilder_integrations}}';
}
