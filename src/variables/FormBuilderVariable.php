<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\variables;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Entry;

use Craft;
use craft\base\ElementInterface;
use craft\web\View;
use craft\helpers\Template;
use craft\helpers\StringHelper;
use craft\helpers\FileHelper;
use craft\helpers\Json;

/**
 * Form Builder Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.formBuilder }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class FormBuilderVariable
{
    // Public Methods
    // =========================================================================

    /**
     * Render form on the frontend
     *
     * @param $variables
     * @return \Twig_Markup
     */
    public function form($variables)
    {
        $form = FormBuilder::$plugin->forms->getFormByHandle($variables['formHandle']);
        $options = isset($variables['options']) ? $variables['options'] : null;
        $submission = isset($variables['submission']) ? $variables['submission'] : null;

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
                'submission'    => $submission,
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
            $notice = '<code>'.FormBuilder::t('There is no form with handle: '. $handle).'</code>';

            echo $notice;
        }
    }

    /**
     * Get input HTML
     *
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
            'class'         => ''
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
        
        $fieldOptions = FormBuilder::$plugin->fields->getFieldRecordByFieldId($field->id);

        if ($fieldOptions) {
            $options = Json::decode($fieldOptions->options);
            if (isset($options['class'])) {
                $variables['class'] = $options['class'];
            }
        }

        if (isset($settings['fields']['global']['inputClass'])) {
            $availableClasses = $variables['class'];
            $variables['class'] = $availableClasses . ' ' . $settings['fields']['global']['inputClass'];
        }
        
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

    /**
     * Get all form groups
     *
     * @param $index
     * @return mixed
     */
    public function getAllGroups()
    {
        return FormBuilder::$plugin->groups->getAllGroups();
    }

    /**
     * Returns all forms.
     *
     * @param string|null $indexBy
     *
     * @return array
     */
    public function getAllForms(string $indexBy = null): array
    {
        $forms = FormBuilder::$plugin->forms->getAllForms();

        return $indexBy ? ArrayHelper::index($forms, $indexBy) : $forms;
    }

    /**
     * Get all form statuses
     *
     * @return mixed
     */
    public function getFormStatuses()
    {
        return FormBuilder::$plugin->forms->getAllStatuses();
    }

    /**
     * Get all entry statuses
     *
     * @return mixed
     */
    public function getEntryStatuses()
    {
        return FormBuilder::$plugin->entries->getAllStatuses();
    }

    /**
     * Get total number of entries
     *
     * @return int
     */
    public function getUnreadEntries()
    {
        return FormBuilder::$plugin->entries->getUnreadEntries();
    }

    /**
     * Get total number of entries
     *
     * @return int
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
     * @return mixed
     */
    public function getTabSettings($tabId) {
        return FormBuilder::$plugin->tabs->getTabSettings($tabId);
    }

}
