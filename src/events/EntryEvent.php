<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\events;

use yii\base\Event;
use craft\events\CancelableEvent;

class EntryEvent extends CancelableEvent
{
    public $entry;
    public $form;
}