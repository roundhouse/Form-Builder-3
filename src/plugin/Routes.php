<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\plugin;

use craft;
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use yii\base\Event;

trait Routes
{
    private function _registerCpRoutes()
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['form-builder'] = 'form-builder/dashboard';
                $event->rules['form-builder/forms'] = 'form-builder/forms';
                $event->rules['form-builder/forms/group/<groupId:\d+>'] = 'form-builder/forms';
                $event->rules['form-builder/forms/new'] = 'form-builder/forms/edit';
                $event->rules['form-builder/forms/edit'] = 'form-builder/forms/edit';
                $event->rules['form-builder/forms/<formId:\d+>'] = 'form-builder/forms/edit';
                $event->rules['form-builder/entries'] = 'form-builder/entries';
                $event->rules['form-builder/entries/<entryId:\d+>'] = 'form-builder/entries/edit';
                $event->rules['form-builder/assets/download-files'] = 'form-builder/assets/download-files';
                $event->rules['form-builder/settings'] = 'form-builder/settings';
                $event->rules['form-builder/integrations'] = 'form-builder/integrations/index';
            }
        );
    }
}