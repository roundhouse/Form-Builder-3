<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage entries for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\assets;

use craft\web\AssetBundle;

class Entry extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@roundhouse/formbuilder/assets";

        $this->js = [
            'js/entries.js',
            'js/charts.js'
        ];

        parent::init();
    }
}
