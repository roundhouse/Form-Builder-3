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

class Fontawesome extends AssetBundle
{
    public function init()
    {
        Craft::setAlias('@odlib', '@vendor/roundhouse/form-builder/lib/');
        $this->sourcePath = "@odlib";

        $this->js = [
            'fontawesome/fa-light.min.js',
            'fontawesome/fa-regular.min.js',
            'fontawesome/fa-solid.min.js',
            'fontawesome/fontawesome.js'
        ];

        parent::init();
    }
}
