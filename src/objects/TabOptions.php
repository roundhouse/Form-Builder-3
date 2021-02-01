<?php

namespace roundhouse\formbuilder\objects;

class TabOptions extends \yii\base\BaseObject
{
    public $class;
    public $id;

    public function isClassEmpty(): bool
    {
        return empty($this->class);
    }

    public function isIdEmpty(): bool
    {
        return empty($this->id);
    }
}