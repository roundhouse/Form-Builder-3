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
 * Fontawesome AssetBundle
 *
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Fontawesome extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * Initializes the bundle.
     */
    public function init()
    {
        // define the path that your publishable resources live
        Craft::setAlias('@odlib', '@vendor/roundhouse/form-builder/lib/');
        $this->sourcePath = "@odlib";

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'fontawesome/fa-light.js',
            'fontawesome/fa-regular.js',
            'fontawesome/fa-solid.js',
            'fontawesome/fontawesome.js'
        ];

        parent::init();
    }
}
