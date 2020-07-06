<?php

namespace roundhouse\formbuilder\events;

use yii\base\Event;

// Usage
// Event::on(
//    Form::class,
//    Form::EVENT_ALLOWED_FIELD_TYPES,
//    function (AllowedFieldTypesEvent $event) {
//        ArrayHelper::append($event->allowedFieldTypes, 'foo');
//    }
// );

class AllowedFieldTypesEvent extends Event
{
    /**
     * @var array List of allowed field types
     */
    public $allowedFieldTypes = [];
}