<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\web\twig;

use Craft;
use craft\web\View;
use craft\helpers\Template;
use craft\helpers\StringHelper;
use craft\helpers\ArrayHelper;
use craft\helpers\Json;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Entry;
use roundhouse\formbuilder\elements\db\EntryQuery;

class Variables
{
    // Public Methods
    // =========================================================================

    /**
     * Render form on the frontend
     *
     * * Basic usage:
     *
     * {{ craft.fb.form('formHandle') }}
     *
     *
     * Advanced usage:
     *
     * {{ craft.fb.form('formHandle', {
     *     options: {
     *         display: 'displayForProductReviews'
     *     }
     * }) }}
     * ```
     *
     * @param $variables
     * @return bool|\Twig_Markup
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     */
    public function form($formHandle, $variables = null)
    {
        if ($formHandle) {
            $form = FormBuilder::$plugin->forms->getFormByHandle($formHandle);
        } else {
            $form = FormBuilder::$plugin->forms->getFormByHandle($variables['formHandle']);
        }
        
        $options = isset($variables['options']) ? $variables['options'] : null;
        $submission = isset($variables['submission']) ? $variables['submission'] : null;

        if (!$form) {
            echo 'Invalid Form Handle!';
            return false;
        }

        if ($form->statusId == 2) {
            return false;
        }

        if ($submission) {
            $entry = $submission;
        } else {
            $entry = new Entry();
            $entry->form = $form;
        }

        if ($form) {
            $tabs = $form->fieldLayout->getTabs();

            $oldPath = Craft::$app->view->getTemplateMode();
            Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);

            $fieldsets = Craft::$app->view->renderTemplate('form-builder/frontend/fieldset', [
                'tabs'          => $tabs,
                'form'          => $form,
                'entry'         => $entry,
                'options'       => $options
            ]);

            $formHtml = Craft::$app->view->renderTemplate('form-builder/frontend/form', [
                'form'      => $form,
                'fieldset'  => $fieldsets,
                'entry'     => $entry,
                'options'   => $options
            ]);

            Craft::$app->view->setTemplateMode($oldPath);

            return Template::raw($formHtml);
        } else {
            $notice = '<code>'.FormBuilder::t('There is no form with handle: '. $variables['formHandle']).'</code>';

            echo $notice;
        }
    }

    /**
     * Get input HTML for frontend fields
     *
     * @param $value
     * @param Entry $entry
     * @param $field
     * @param Form $form
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \yii\base\Exception
     */
    public function getInputHtml($value, Entry $entry, $field, Form $form): string
    {
        $oldPath = Craft::$app->view->getTemplateMode();
        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);

        $type = StringHelper::toKebabCase(StringHelper::toLowerCase($field->displayName()));
        $settings = $form->settings;

        if (isset($settings['fields']['global']['inputTemplate']) && $settings['fields']['global']['inputTemplate'] != '') {
            $customPath = $settings['fields']['global']['inputTemplate'];
            Craft::$app->view->setTemplatesPath(Craft::$app->getPath()->getSiteTemplatesPath() . '/' . $customPath);
        } else {
            Craft::$app->view->setTemplatesPath(Craft::$app->getPath()->getVendorPath().'/roundhouse/form-builder/src/templates/_includes/forms/');
        }

        $fileExist = file_exists(Craft::$app->view->getTemplatesPath().'/'.$type.'/input.twig');

        if (!$fileExist) {
            Craft::$app->view->setTemplatesPath(Craft::$app->getPath()->getVendorPath().'/roundhouse/form-builder/src/templates/_includes/forms/');
        }

        $variables = [
            'name'          => $field->handle,
            'value'         => $value,
            'field'         => $field,
            'settings'      => $field,
            'form'          => $form,
            'options'       => null,
            'class'         => '',
            'id'            => ''
        ];

        if (isset($field->placeholder)) {
            $variables['placeholder'] = $field->placeholder;
        }

        if (isset($field->charLimit)) {
            $variables['maxlength'] = $field->charLimit;
        }

        if (isset($field->size)) {
            $variables['size'] = $field->size;
        }

        if (isset($field->initialRows)) {
            $variables['rows'] = $field->initialRows;
        }

        $fieldOptions = FormBuilder::$plugin->fields->getFieldRecordByFieldId($field->id, $form->id);

        if ($fieldOptions) {
            $options = Json::decode($fieldOptions->options);

            if (isset($options['class'])) {
                $variables['class'] = $options['class'];
            }

            if (isset($options['id'])) {
                $variables['id'] = $options['id'];
            }
        }

        if (isset($settings['fields']['global']['inputClass'])) {
            $availableClasses = $variables['class'];
            $variables['class'] = $availableClasses . ' ' . $settings['fields']['global']['inputClass'];
        }

        // TODO: Add functionality for custom templates
        // Just look at this overall
        switch ($type) {
            case 'plain-text':
                $variables['type'] = 'text';

                if ($field->multiline) {
                    $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/textarea', $variables);
                } else {
                    $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/text', $variables);
                }
                break;
            case 'email':
                $variables['type'] = 'email';
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/text', $variables);
                break;
            case 'url':
                $variables['type'] = 'url';
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/text', $variables);
                break;
            case 'number':
                $variables['type'] = 'number';
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/text', $variables);
                break;
            case 'color':
                $variables['type'] = 'color';
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/color', $variables);
                break;
            case 'date-time':
                $variables['type'] = 'date';
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/date', $variables);
                break;
            case 'checkboxes':
                $variables['type'] = 'checkbox';
                $variables['options'] = $field->options;
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/checkboxGroup', $variables);
                break;
            case 'dropdown':
                $variables['type'] = 'select';
                $variables['options'] = $field->options;
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/select', $variables);
                break;
            case 'multi-select':
                $variables['options'] = $field->options;
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/multiselect', $variables);
                break;
            case 'radio-buttons':
                $variables['options'] = $field->options;
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/radioGroup', $variables);
                break;
            case 'assets':
                $input = Craft::$app->view->renderTemplate('form-builder/_includes/forms/file', $variables);
                break;
            default:
                break;
        }

        Craft::$app->view->setTemplateMode($oldPath);

        if (isset($input)) {
            return Template::raw($input);
        } else {
            return '';
        }
    }

    public function entries($criteria = null): EntryQuery
    {
        $query = Entry::find();

        if ($criteria) {
            Craft::configure($query, $criteria);
        }

        return $query;
    }

    /**
     * Get entry's notes
     *
     * @param $entryId
     * @return \roundhouse\formbuilder\services\Notes
     */
    public function notes($entryId)
    {
        return FormBuilder::$plugin->notes->getNotes($entryId);
    }


    /**
     * Check if integrations plugin is enabled
     *
     * @return bool
     */
    public function isIntegrationsAvailable()
    {
        return Craft::$app->plugins->isPluginInstalled('formbuilder-integrations');
    }

    /**
     * Get all groups
     *
     * @return mixed
     */
    public function getAllGroups()
    {
        return FormBuilder::$plugin->groups->getAllGroups();
    }

    /**
     * Get all forms
     *
     * @param string|null $indexBy
     * @return array
     */
    public function getAllForms(string $indexBy = null): array
    {
        $forms = FormBuilder::$plugin->forms->getAllForms();

        return $indexBy ? ArrayHelper::index($forms, $indexBy) : $forms;
    }

    /**
     * Get form statuses
     *
     * @return mixed
     */
    public function getFormStatuses()
    {
        return FormBuilder::$plugin->forms->getAllStatuses();
    }

    /**
     * Get entry statuses
     *
     * @return mixed
     */
    public function getEntryStatuses()
    {
        return FormBuilder::$plugin->entries->getAllStatuses();
    }

    /**
     * Get unread entries
     *
     * @return mixed
     */
    public function getUnreadEntries()
    {
        return FormBuilder::$plugin->entries->getUnreadEntries();
    }

    /**
     * Get unread entries by form ID
     *
     * @param $formId
     * @return int|string
     */
    public function getUnreadEntriesByFormId($formId)
    {
        $entries = Entry::find()
            ->formId($formId)
            ->statusId(1)
            ->count();

        return $entries;
    }

    /**
     * Get tab settings
     *
     * @param $tabId
     * @return mixed
     */
    public function getTabSettings($tabId) {
        return FormBuilder::$plugin->tabs->getTabSettings($tabId);
    }

    /** Get allowed text fields
     *
     * @return array
     */
    public function getAllowedTextFields()
    {
        $fields = [
            'PlainText' => ['class' => 'PlainText'],
            'Email' => ['class' => 'Email'],
            'Url' => ['class' => 'Url'],
            'Number' => ['class' => 'Number'],
            'Dropdown' => ['class' => 'Dropdown'],
            'Checkboxes' => ['class' => 'Checkboxes'],
            'RadioButtons' => ['class' => 'RadioButtons']
        ];

        return $fields;
    }

    public function isIntegrations()
    {
        return FormBuilder::$plugin->integrations->isIntegrations();
    }

}
