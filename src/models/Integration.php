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

class Integration extends Model
{
    // Public Properties
    // =========================================================================

    public $id;
    public $name;
    public $handle;
    public $type;
    public $status = 'enabled';
    public $content;
    public $settings;


    public function rules()
    {
        return [
            [['name', 'handle', 'type' ], 'required']
        ];
    }


}
