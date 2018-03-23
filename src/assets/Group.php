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

class Group extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = "@roundhouse/formbuilder/assets";

        $this->js = [
            'js/groups.js',
        ];

        parent::init();
    }
}
