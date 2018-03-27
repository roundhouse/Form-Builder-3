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

class FormBuilder extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@roundhouse/formbuilder/web/assets";

        $this->depends = [
            CpAsset::class,
            Fontawesome::class,
        ];

        $this->js = [
            'js/formbuilder.js',
        ];

        $this->css = [
            'css/formbuilder.css',
        ];

        parent::init();
    }
}
