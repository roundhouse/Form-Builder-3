<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class Form extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@roundhouse/formbuilder/assets";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/modal.js',
            'js/fields.js',
            'js/forms.js',
            'js/field-designer.js',
            'js/tab-designer.js',
            'js/designer.js',
            'js/option.js',
            'js/tags.js',
            'js/integrations.js'
        ];

        parent::init();
    }
}
