<?php
/**
 * @link https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license https://craftcms.github.io/license/
 */

namespace roundhouse\formbuilder\elements\actions;

use roundhouse\formbuilder\FormBuilder;

use Craft;
use craft\base\Element;
use craft\base\ElementAction;
use craft\elements\db\ElementQueryInterface;

/**
 * SetStatus represents a Set Status element action.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0
 */
class SetStatus extends ElementAction
{
    // Properties
    // =========================================================================

    /**
     * @var string|null The status elements should be set to
     */
    public $status;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function getTriggerLabel(): string
    {
        return Craft::t('app', 'Set Status');
    }

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function isDestructive(): bool
    {
        return true;
    }

    /**
     * @inheritdoc
     */
    public function getTriggerHtml()
    {
        return Craft::$app->getView()->renderTemplate('form-builder/entries/_includes/actions/set-status');
    }

    /**
     * @param ElementQueryInterface $query
     * @return bool
     * @throws \yii\db\Exception
     */
    public function performAction(ElementQueryInterface $query): bool
    {
        $elementsService = Craft::$app->getElements();
        $elements = $query->all();
        $failCount = 0;

        foreach ($elements as $element) {
            $status = FormBuilder::$plugin->entries->getStatusByHandle($this->status);

            // This doesn't seem to work properly..
            if ($element->statusId == $status->id) {
                continue;
            }

            Craft::$app->getDb()->createCommand()
                ->update('{{%formbuilder_entries}}', ['statusId' => $status->id], ['id' => $element->id])
                ->execute();
        }

        if (count($elements) === 1) {
            $this->setMessage(Craft::t('app', 'Status updated.'));
        } else {
            $this->setMessage(Craft::t('app', 'Statuses updated.'));
        }

        return true;
    }
}
