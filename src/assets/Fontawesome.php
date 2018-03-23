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

use Craft;
use craft\web\AssetBundle;

class Fontawesome extends AssetBundle
{
    public function init()
    {
        Craft::setAlias('@odlib', '@vendor/roundhouse/form-builder/lib/');
        $this->sourcePath = "@odlib";

        $this->js = [
            'fontawesome/fa-light.js',
            'fontawesome/fa-regular.js',
            'fontawesome/fa-solid.js',
            'fontawesome/fontawesome.js'
        ];

        parent::init();
    }
}
