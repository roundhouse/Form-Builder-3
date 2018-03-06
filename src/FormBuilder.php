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
use roundhouse\formbuilder\fields\FormBuilderField as FormBuilderFieldField;
use roundhouse\formbuilder\utilities\FormBuilderUtility as FormBuilderUtilityUtility;
use roundhouse\formbuilder\widgets\FormBuilderWidget as FormBuilderWidgetWidget;

use Craft;
use craft\base\Element;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\console\Application as ConsoleApplication;
use craft\web\UrlManager;
use craft\services\Elements;
use craft\services\Fields;
use craft\services\Utilities;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\services\Dashboard;
use craft\events\PluginEvent;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterCpNavItemsEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\events\FieldLayoutEvent;
use craft\web\twig\variables\Cp;
use craft\helpers\Json;
use craft\helpers\StringHelper;
use craft\helpers\ArrayHelper;

use yii\base\Event;

/**
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 *
 * @property  FormService $formService
 * @property  Settings $settings
 * @method    Settings getSettings()
 */
class FormBuilder extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * Static property that is an instance of this plugin class so that it can be accessed via
     * FormBuilder::$plugin
     *
     * @var FormBuilder
     */
    public static $plugin;

    // Public Methods
    // =========================================================================

    /**
     * Set our $plugin static property to this class so that it can be accessed via
     * FormBuilder::$plugin
     *
     * Called after the plugin class is instantiated; do any one-time initialization
     * here such as hooks and events.
     *
     * If you have a '/vendor/autoload.php' file, it will be loaded for you automatically;
     * you do not need to load it in your init() method.
     *
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

        // Add in our console commands
        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'roundhouse\formbuilder\console\controllers';
        }

        // Register user persmissions
        Event::on(
            UserPermissions::class, 
            UserPermissions::EVENT_REGISTER_PERMISSIONS,
            function(RegisterUserPermissionsEvent $event) {
                $event->permissions[FormBuilder::t('Form Builder')] = $this->_getPermissions();
            }

        );

        // Register our CP routes
        Event::on(UrlManager::class, UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['form-builder'] = 'form-builder/dashboard';
                $event->rules['form-builder/forms'] = 'form-builder/forms';
                $event->rules['form-builder/forms/group/<groupId:\d+>'] = 'form-builder/forms';
                $event->rules['form-builder/forms/new'] = 'form-builder/forms/edit';
                $event->rules['form-builder/forms/edit'] = 'form-builder/forms/edit';
                $event->rules['form-builder/forms/<formId:\d+>'] = 'form-builder/forms/edit';
                $event->rules['form-builder/entries'] = 'form-builder/entries';
                $event->rules['form-builder/entries/<entryId:\d+>'] = 'form-builder/entries/edit';
                $event->rules['form-builder/notifications'] = 'form-builder/notifications';
                $event->rules['form-builder/notifications/new'] = 'form-builder/notifications/edit';

            }
        );

        // Register our elements
        Event::on(Elements::class, Elements::EVENT_REGISTER_ELEMENT_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = FormElement::class;
            }
        );

        // Register element actions
        Event::on(Entry::class, Element::EVENT_REGISTER_ACTIONS, function(RegisterElementActionsEvent $event) {
            $event->actions[] = SetStatus::class;
            $event->actions[] = Delete::class;
        });

        // Register our fields
        // Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES,
        //     function (RegisterComponentTypesEvent $event) {
        //         $event->types[] = FormBuilderFieldField::class;
        //     }
        // );

        // Register our utilities
        // Event::on(Utilities::class, Utilities::EVENT_REGISTER_UTILITY_TYPES,
        //     function (RegisterComponentTypesEvent $event) {
        //         $event->types[] = FormBuilderUtilityUtility::class;
        //     }
        // );

        // Register our widgets
        // Event::on(Dashboard::class, Dashboard::EVENT_REGISTER_WIDGET_TYPES,
        //     function (RegisterComponentTypesEvent $event) {
        //         $event->types[] = FormBuilderWidgetWidget::class;
        //     }
        // );

        // Register our variables
        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('formBuilder', FormBuilderVariable::class);
            }
        );

        // Fieldlayout settings
        Event::on(Fields::class, Fields::EVENT_AFTER_SAVE_FIELD_LAYOUT, function(FieldLayoutEvent $event) {
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
                    $layoutTabs = [];

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
        });

        Craft::info(Craft::t('form-builder', '{name} plugin loaded', ['name' => $this->name]), __METHOD__);
    }

    // Protected Methods
    // =========================================================================

    private function _getPermissions()
    {
        $persmissions = [];

        $persmissions['accessForms'] = [
            'label' => FormBuilder::t('Access Forms'),
        ];

        $persmissions['accessEntries'] = [
            'label' => FormBuilder::t('Access Submissions'),
        ];

        $persmissions['accessNotifications'] = [
            'label' => FormBuilder::t('Access Notifications'),
        ];

        $persmissions['editForms'] = [
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

        $persmissions['editEntries'] = [
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

        $persmissions['editNotifications'] = [
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

        return $persmissions;
    }

    /**
     * Creates and returns the model used to store the plugin’s settings.
     *
     * @return \craft\base\Model|null
     */
    protected function createSettingsModel()
    {
        return new Settings();
    }

    /**
     * Returns the rendered settings HTML, which will be inserted into the content
     * block on the settings page.
     *
     * @return string The rendered settings HTML
     */
    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate('form-builder/settings', [
                'settings' => $this->getSettings()
            ]
        );
    }

    /**
     * Performs actions after the plugin is installed.
     */
    protected function afterInstall()
    {
        FormBuilder::$plugin->groups->installDefaultGroups();
        FormBuilder::$plugin->forms->installDefaultStatuses();
        FormBuilder::$plugin->entries->installDefaultStatuses();
    }

    /**
     * @param string $message
     * @param array  $params
     *
     * @return string
     */
    public static function t($message, array $params = [])
    {
        return Craft::t('form-builder', $message, $params);
    }

    public static function log($message, $type = 'info')
    {
        Craft::$type(self::t($message), __METHOD__);
    }

    public static function info($message)
    {
        Craft::info(self::t($message), __METHOD__);
    }

    public static function error($message)
    {
        Craft::error(self::t($message), __METHOD__);
    }
}
