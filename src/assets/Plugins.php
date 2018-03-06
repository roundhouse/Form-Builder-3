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

/**
 * FormBuilderPluginsAsset AssetBundle
 *
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Plugins extends AssetBundle
{
    // Public Methods
    // =========================================================================

    public function init()
    {
        Craft::setAlias('@odlib', '@vendor/roundhouse/form-builder/lib/');
        $this->sourcePath = "@odlib";

        $this->js = [
            'clipboard/clipboard.js'
        ];

        parent::init();
    }
}
