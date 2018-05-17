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

use Craft;
use craft\web\AssetBundle;

class Plugins extends AssetBundle
{
    public function init()
    {
        Craft::setAlias('@odlib', '@vendor/roundhouse/form-builder-3/lib/');
        $this->sourcePath = "@odlib";

        $this->js = [
            'clipboard/clipboard.js'
        ];

        parent::init();
    }
}
