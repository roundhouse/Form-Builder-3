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

use Craft;
use craft\base\Element;
use craft\base\Plugin;
use craft\helpers\ArrayHelper;
use craft\helpers\UrlHelper;
use craft\services\Elements;
use craft\services\Fields;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\events\RegisterElementActionsEvent;
use craft\events\FieldLayoutEvent;
use craft\helpers\Json;

use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\elements\Form as FormElement;
use roundhouse\formbuilder\elements\Entry as EntryElement;
use roundhouse\formbuilder\elements\actions\SetStatus;
use roundhouse\formbuilder\elements\actions\Delete;
use roundhouse\formbuilder\events\AllowedFieldTypesEvent;
use roundhouse\formbuilder\fields\Forms;
use roundhouse\formbuilder\services\Forms as FormsService;
use roundhouse\formbuilder\services\Migrations as MigrationsService;
use roundhouse\formbuilder\web\twig\Variables;
use roundhouse\formbuilder\web\twig\Extensions;
use roundhouse\formbuilder\models\Settings;
use roundhouse\formbuilder\models\Field as FieldModel;
use roundhouse\formbuilder\plugin\Services as FormBuilderServices;
use roundhouse\formbuilder\plugin\Routes as FormBuilderRoutes;


use yii\base\Event;

class FormBuilder extends Plugin
{
    // Static Properties
    // =========================================================================

    public static $plugin;

    // Public Properties
    // =========================================================================

    public $schemaVersion = '1.0.3';
    public $hasCpSettings = true;
    public $hasCpSection = true;
    public $changelogUrl = 'https://raw.githubusercontent.com/roundhouse/Form-Builder-3/master/CHANGELOG.md';
    public $downloadUrl = 'https://github.com/roundhouse/Form-Builder-3/archive/master.zip';

    // Trails
    // =========================================================================
    use FormBuilderServices;
    use FormBuilderRoutes;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->_setPluginComponents();
        $this->_registerCpRoutes();
        $this->_addTwigExtensions();
        $this->_registerElementTypes();
        $this->_registerElementActions();
        $this->_registerPermissions();
        $this->_registerVariables();
        $this->_registerCustomEvents();
        $this->_registerFields();
    }

    public function getPluginName()
    {
        return Craft::t('form-builder', $this->getSettings()->pluginName);
    }

    /**
     * Check if Email Builder plugin is installed
     * Used for email notifications
     *
     * @return bool
     */
    public function isIntegrationsAvailable()
    {
        $integrationsInstalled = Craft::$app->plugins->isPluginInstalled('formbuilder-integrations');
        $integrationsEnabled = Craft::$app->plugins->isPluginEnabled('formbuilder-integrations');

        $active = $integrationsInstalled === $integrationsEnabled;

        return $active;
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

    public function getSettingsResponse()
    {
        $url = UrlHelper::cpUrl('form-builder/settings');

        return Craft::$app->controller->redirect($url);
    }

    // Protected Methods
    // =========================================================================

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

    // Private Methods
    // =========================================================================

    /**
     * Register twig extensions
     */
    private function _addTwigExtensions()
    {
        Craft::$app->view->registerTwigExtension(new Extensions);
    }

    /**
     * Register element types
     */
    private function _registerElementTypes()
    {
        Event::on(
            Elements::class,
            Elements::EVENT_REGISTER_ELEMENT_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = FormElement::class;
                $event->types[] = EntryElement::class;
            }
        );
    }

    /**
     * Register element actions
     */
    private function _registerElementActions()
    {
        Event::on(
            EntryElement::class,
            Element::EVENT_REGISTER_ACTIONS,
            function(RegisterElementActionsEvent $event) {
                $event->actions[] = SetStatus::class;
                $event->actions[] = Delete::class;
            }
        );
    }

    /**
     * Register custom events
     */
    private function _registerCustomEvents()
    {
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
    }

    /**
     * Register plugin permissions
     */
    private function _registerPermissions()
    {
        Event::on(
            UserPermissions::class,
            UserPermissions::EVENT_REGISTER_PERMISSIONS,
            function(RegisterUserPermissionsEvent $event) {
                $permissions = [];

                $permissions['fb:accessForms'] = [
                    'label' => FormBuilder::t('Access Forms'),
                ];

                $permissions['fb:accessEntries'] = [
                    'label' => FormBuilder::t('Access Entries'),
                ];

                $permissions['fb:accessIntegrations'] = [
                    'label' => FormBuilder::t('Access Integrations'),
                ];

                $permissions['fb:accessSettings'] = [
                    'label' => FormBuilder::t('Access Settings'),
                ];

                $permissions['fb:editForms'] = [
                    'label' => FormBuilder::t('Edit Forms'),
                    'nested' => [
                        'fb:createForms' => [
                            'label' => FormBuilder::t('Create forms')
                        ],
                        'fb:deleteForms' => [
                            'label' => FormBuilder::t('Delete forms')
                        ]
                    ]
                ];

                $permissions['fb:editEntries'] = [
                    'label' => FormBuilder::t('Edit Entries'),
                    'nested' => [
                        'fb:deleteEntry' => [
                            'label' => FormBuilder::t('Delete entry')
                        ],
                        'fb:downloadFiles' => [
                            'label' => FormBuilder::t('Download files')
                        ],
                        'fb:leaveNotes' => [
                            'label' => FormBuilder::t('Leave notes')
                        ]
                    ]
                ];

                $event->permissions[FormBuilder::t('Form Builder')] = $permissions;
            }
        );
    }

    /**
     * Register fields
     */
    private function _registerFields()
    {
        Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES, function (RegisterComponentTypesEvent $event) {
            $event->types[] = Forms::class;
        });
    }

    /**
     * Register variables
     */
    private function _registerVariables()
    {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                $variable = $event->sender;
                $variable->set('fb', Variables::class);
                $variable->set('fbMigration', MigrationsService::class);
                $variable->set('fbForms', FormsService::class);
            }
        );
    }

    /**
     * Register plugin CP navigation links
     */
    public function getCpNavItem()
    {
        $parent = parent::getCpNavItem();

        $parent['label'] = $this->getSettings()->pluginName;

        if ($this->getSettings()->pluginName) {
            $parent['label'] = $this->getSettings()->pluginName;
        }

        // Permission to access dashboard
        if (Craft::$app->user->checkPermission('accessPlugin-form-builder')) {
            $navigation['dashboard'] = [
                'label' => FormBuilder::t('Dashboard'),
                'url' => 'form-builder'
            ];
        }

        // Permission to access forms
        if (Craft::$app->user->checkPermission('fb:accessForms')) {
            $navigation['forms'] = [
                'label' => FormBuilder::t('Forms'),
                'url' => 'form-builder/forms'
            ];
        }

        // Permission to access entries
        if (Craft::$app->user->checkPermission('fb:accessEntries')) {
            $navigation['entries'] = [
                'label' => FormBuilder::t('Entries'),
                'url' => 'form-builder/entries'
            ];
        }


        // Permission to access integrations
        if (Craft::$app->user->checkPermission('fb:accessIntegrations') && $this->isIntegrationsAvailable()) {
            $navigation['integrations'] = [
                'label' => FormBuilder::t('Integrations'),
                'url' => 'form-builder/integrations'
            ];
        }

        // Permission to access settings
        if (Craft::$app->user->checkPermission('fb:accessSettings')) {
            $navigation['settings'] = [
                'label' => FormBuilder::t('Settings'),
                'url' => 'form-builder/settings'
            ];
        }

        $nav = ArrayHelper::merge($parent, [
            'subnav' => $navigation
        ]);

        return $nav;
    }
}
