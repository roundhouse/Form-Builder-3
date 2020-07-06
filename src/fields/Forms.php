<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\fields;

use roundhouse\formbuilder\elements\db\FormQuery;
use roundhouse\formbuilder\elements\Form;
use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\base\ElementInterface;
use craft\fields\BaseRelationField;
use craft\base\Field;
use craft\helpers\Db;
use yii\db\Schema;
use craft\helpers\Json;

/**
 * FormBuilderField Field
 *
 * Whenever someone creates a new field in Craft, they must specify what
 * type of field it is. The system comes with a handful of field types baked in,
 * and we’ve made it extremely easy for plugins to add new ones.
 *
 * https://craftcms.com/docs/plugins/field-types
 *
 * @author    Vadim Goncharov (owldesign)
 * @package   FormBuilder
 * @since     3.0.0
 */
class Forms extends BaseRelationField
{
    // Public Properties
    // =========================================================================
    /**
     * @var array|null The available forms
     */
    public $options;

    // Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return Craft::t('form-builder', 'Forms');
    }

    /**
     * @inheritdoc
     */
    protected static function elementType(): string
    {
        return Form::class;
    }

    /**
     * @inheritdoc
     */
    public static function defaultSelectionLabel(): string
    {
        return Craft::t('form-builder', 'Add form');
    }

    /**
     * @inheritdoc
     */
    public static function valueType(): string
    {
        return FormQuery::class;
    }

    // Public Methods
    // =========================================================================

    public function icon()
    {
        return 'hi';
    }
}
