<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\web\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class Form extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@roundhouse/formbuilder/web/assets";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/forms.js',
            'js/field-layout-designer.js',
            'js/integrations.js'
//            'js/modal.js',
//            'js/fields.js',
//            'js/tab-designer.js',
//            'js/designer.js',
//            'js/option.js',
//            'js/tags.js',
        ];

        parent::init();
    }
}
