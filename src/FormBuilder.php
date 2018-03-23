<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder;

use roundhouse\formbuilder\elements\Form as FormElement;
use roundhouse\formbuilder\elements\Entry as EntryElement;
use roundhouse\formbuilder\elements\actions\SetStatus;
use roundhouse\formbuilder\elements\actions\Delete;
use roundhouse\formbuilder\services\Forms as FormService;
use roundhouse\formbuilder\services\Entries as EntryService;
use roundhouse\formbuilder\services\Fields as FieldService;
use roundhouse\formbuilder\services\Tabs as TabService;
use roundhouse\formbuilder\services\Groups as FormGroups;
use roundhouse\formbuilder\variables\FormBuilderVariable;
use roundhouse\formbuilder\twigextensions\FormBuilderTwigExtension;
use roundhouse\formbuilder\models\Settings;
use roundhouse\formbuilder\models\Field as FieldModel;

use Craft;
use craft\base\Element;
use craft\base\Plugin;
use craft\web\UrlManager;
use craft\services\Elements;
use craft\services\Fields;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\events\FieldLayoutEvent;
use craft\helpers\Json;

use yii\base\Event;

class FormBuilder extends Plugin
{
    // Static Properties
    // =========================================================================

    public static $plugin;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->setComponents([
            'formbuilder' => FormBuilderVariable::class,
            'forms' => FormService::class,
            'groups' => FormGroups::class,
            'entries' => EntryService::class,
            'fields' => FieldService::class,
            'tabs' => TabService::class
        ]);

        // Add in our Twig extensions
        Craft::$app->view->registerTwigExtension(new FormBuilderTwigExtension());

        // Register user permissions
        Event::on(
            UserPermissions::class, 
            UserPermissions::EVENT_REGISTER_PERMISSIONS,
            function(RegisterUserPermissionsEvent $event) {
                $event->permissions[FormBuilder::t('Form Builder')] = $this->_getPermissions();
            }

        );

        // Register our CP routes
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
            }
        );

        // Register our elements
        Event::on(
            Elements::class, 
            Elements::EVENT_REGISTER_ELEMENT_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = FormElement::class;
                $event->types[] = EntryElement::class;
            }
        );

        // Register element actions
        Event::on(
            Entry::class, 
            Element::EVENT_REGISTER_ACTIONS, 
            function(RegisterElementActionsEvent $event) {
                $event->actions[] = SetStatus::class;
                $event->actions[] = Delete::class;
            }
        );

        // Register our fields
        // Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES,
        //     function (RegisterComponentTypesEvent $event) {
        //         $event->types[] = FormBuilderFieldField::class;
        //     }
        // );

        // Register our variables
        Event::on(
            CraftVariable::class, 
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                $variable = $event->sender;
                $variable->set('formBuilder', FormBuilderVariable::class);
            }
        );

        // Customize Fieldlayout fields and tabs
        Event::on(
            Fields::class, 
            Fields::EVENT_AFTER_SAVE_FIELD_LAYOUT, 
            function(FieldLayoutEvent $event) {
                $layout = $event->layout;
                $request = Craft::$app->getRequest();
                $post = $request->getBodyParam('form-builder');

                if ($post) {
                    if (isset($post['field'])) {
                        foreach ($post['field'] as $fieldId => $field) {
                            $fieldModel = new FieldModel();
                            $fieldModel->fieldId = $fieldId;
                           
                            if ($layout->id) {
                                $fieldModel->fieldLayoutId = $layout->id;
                            }

                            if (isset($post['formId'])) {
                                $fieldModel->formId = $post['formId'];
                            }

                            if (isset($field['options'])) {
                                $fieldModel->options = Json::encode($field['options']);
                            }

                            FormBuilder::$plugin->fields->save($fieldModel);
                        }
                    }

                    if (isset($post['tab'])) {
                        // Clean up old tab options
                        Craft::$app->getDb()->createCommand()
                            ->delete('{{%formbuilder_tabs}}', ['layoutId' => $layout->id])
                            ->execute();

                        foreach ($layout->getTabs() as $key => $value) {
                            if (isset(array_values($post['tab'])[$key]['options'])) {
                                FormBuilder::$plugin->tabs->save($value, array_values($post['tab'])[$key], $post['formId'], $layout->id);
                            }

                        }
                    }
                }

                unset($_POST['form-builder']);
            }
        );

        Craft::info(Craft::t('form-builder', '{name} plugin loaded', ['name' => $this->name]), __METHOD__);
    }

    /**
     * Check if Email Builder plugin is installed
     * Used for email notifications
     *
     * @return bool
     */
    public function isEmailBuilderPlugin()
    {
        return Craft::$app->plugins->isPluginInstalled('email-builder');
    }

    // Protected Methods
    // =========================================================================

    /**
     * Get plugin permissions
     *
     * @return array
     */
    private function _getPermissions()
    {
        $permissions = [];

        $permissions['accessForms'] = [
            'label' => FormBuilder::t('Access Forms'),
        ];

        $permissions['accessEntries'] = [
            'label' => FormBuilder::t('Access Submissions'),
        ];

        $permissions['accessNotifications'] = [
            'label' => FormBuilder::t('Access Notifications'),
        ];

        $permissions['editForms'] = [
            'label' => FormBuilder::t('Edit Forms'),
            'nested' => [
                'createForms' => [
                    'label' => FormBuilder::t('Create forms')
                ],
                'deleteForms' => [
                    'label' => FormBuilder::t('Delete forms')
                ]
            ]
        ];

        $permissions['editEntries'] = [
            'label' => FormBuilder::t('Edit Submissions'),
            'nested' => [
                'setStatusEntry' => [
                    'label' => FormBuilder::t('Set status')
                ],
                'deleteEntry' => [
                    'label' => FormBuilder::t('Delete submission')
                ]
            ]
        ];

        $permissions['editNotifications'] = [
            'label' => FormBuilder::t('Edit Notifications'),
            'nested' => [
                'createNotifications' => [
                    'label' => FormBuilder::t('Create notifications')
                ],
                'deleteNotifications' => [
                    'label' => FormBuilder::t('Delete notifications')
                ]
            ]
        ];

        return $permissions;
    }

    /**
     * @inheritdoc
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * @inheritdoc
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate('form-builder/settings', [
                'settings' => $this->getSettings()
            ]
        );
    }

    /**
     * @inheritdoc
     */
    protected function afterInstall()
    {
        FormBuilder::$plugin->groups->installDefaultGroups();
        FormBuilder::$plugin->forms->installDefaultStatuses();
        FormBuilder::$plugin->entries->installDefaultStatuses();
    }

    /**
     * @param $message
     * @param array $params
     * @return string
     */
    public static function t($message, array $params = [])
    {
        return Craft::t('form-builder', $message, $params);
    }

    /**
     * @param $message
     * @param string $type
     */
    public static function log($message, $type = 'info')
    {
        Craft::$type(self::t($message), __METHOD__);
    }

    /**
     * @param $message
     */
    public static function info($message)
    {
        Craft::info(self::t($message), __METHOD__);
    }

    /**
     * @param $message
     */
    public static function error($message)
    {
        Craft::error(self::t($message), __METHOD__);
    }
}
