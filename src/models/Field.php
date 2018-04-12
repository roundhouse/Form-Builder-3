<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\models;

use craft\base\Model;

/**
 * Field Model
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Field extends Model
{
    // Public Properties
    // =========================================================================
    
    public $id;
    public $fieldId;
    public $fieldLayoutId;
    public $options;
    public $formId;

    // Public Methods
    // =========================================================================

}
