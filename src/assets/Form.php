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
use craft\web\assets\cp\CpAsset;

/**
 * Form AssetBundle
 *
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Form extends AssetBundle
{
    // Public Methods
    // =========================================================================

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
            'js/tags.js'
        ];

        parent::init();
    }
}
