<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\services;

use Craft;
use craft\base\Component;
use craft\db\Query;
use craft\helpers\Json;
use craft\mail\Message;

use yii\base\Exception;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Integration;
use roundhouse\formbuilder\records\Integration as IntegrationRecord;
use roundhouse\formbuilder\services\integrations\Email;
use roundhouse\formbuilder\services\integrations\Slack;

// Integrations plugin
use roundhouse\formbuilderintegrations\Integrations\Payment\Converge;

/**
 * Class Integrations
 * @package roundhouse\formbuilder\services
 */
class Integrations extends Component
{
    // Properties
    // =========================================================================

    /**
     * @var
     */
    protected $integrationRecord;
    /**
     * @var
     */
    private $_allIntegrations;
    /**
     * @var
     */
    private $_integrationsById;
    /**
     * @var bool
     */
    private $_fetchedAllIntegrations = false;

    // Public Methods
    // =========================================================================

    /**
     * Get all integrations
     *
     * @return array
     */
    public function getAllIntegrations(): array
    {
        if ($this->_fetchedAllIntegrations) {
            return array_values($this->_integrationsById);
        }

        $results = $this->_createIntegrationQuery()->all();

        $this->_integrationsById = [];

        foreach ($results as $result) {
            $integration = new Integration($result);
            $this->_integrationsById[$integration->id] = $integration;
        }

        $this->_fetchedAllIntegrations = true;

        return array_values($this->_integrationsById);
    }

    /**
     * @param int $integrationId
     * @return null|Integration
     */
    public function getIntegrationById(int $integrationId)
    {
        if (!$integrationId) {
            return null;
        }

        if ($this->_integrationsById !== null && array_key_exists($integrationId, $this->_integrationsById)) {
            return $this->_integrationsById[$integrationId];
        }

        if ($this->_fetchedAllIntegrations) {
            return null;
        }

        $result = $this->_createIntegrationQuery()
            ->where(['id' => $integrationId])
            ->one();

        $result['settings'] = Json::decode($result['settings']);

        return $this->_integrationsById[$integrationId] = $result ? new Integration($result) : null;
    }

    public function getFrontendIntegrations()
    {

    }

    /**
     * Save Integration to database
     *
     * @param Integration $model
     * @return bool|null|IntegrationRecord
     * @throws Exception
     * @throws \Throwable
     * @throws \yii\db\Exception
     */
    public function save(Integration $model)
    {
        $isNewIntegration = !$model->id;

        if (!$isNewIntegration) {
            $record = IntegrationRecord::findOne($model->id);

            if (!$record) {
                throw new Exception(FormBuilder::t('No integration exists with the ID “{id}”', ['id' => $model->id]));
            }
        } else {
            $record = new IntegrationRecord();
        }

        $record->validate();

        if ($record->hasErrors()) {
            return false;
        }

        $record->type       = $model->type;
        $record->name       = $model->name;
        $record->handle     = $model->handle;
        $record->status     = $model->status;
        $record->token      = $model->token;
        $record->category   = $model->category;
        $record->frontend   = $model->frontend;
        $record->content    = $model->content;
        $record->settings   = $model->settings;

        $transaction = Craft::$app->getDb()->beginTransaction();

        try {
            $record->save(false);
            $model->id = $record->id;

            $transaction->commit();
        } catch (\Throwable $e) {
            $transaction->rollBack();

            throw $e;
        }

        return $record;
    }

    /**
     * Delete integration by id
     *
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function deleteIntegrationsById(int $id): bool
    {
        $record = $this->getIntegrationById($id);

        if (!$record) {
            return false;
        }

        return $this->delete($record);
    }

    /**
     * @param Integration $integration
     * @return bool
     * @throws \yii\db\Exception
     */
    public function delete(Integration $integration): bool
    {
        $transaction = Craft::$app->db->beginTransaction();

        try {

            Craft::$app->getDb()->createCommand()
                ->delete('{{%formbuilder_integrations}}', ['id' => $integration->id])
                ->execute();

            $transaction->commit();

        } catch (\Exception $e) {
            $transaction->rollback();

            throw $e;
        }

        return true;
    }

    /**
     * @param $entry
     * @param $form
     * @throws Exception
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     */
    public function performIntegrations($entry, $form)
    {
        $integrations = $form->getIntegrations();

        foreach ($integrations as $type => $integration) {
            switch ($type) {
                case 'email':
                    Email::instance()->prepare($integration, $entry);
                    break;
                case 'slack':
                    Slack::instance()->prepare($integration, $entry);
                    break;
            }
        }
    }

    /**
     * Check if integrations exist
     *
     * @return int|string
     */
    public function isIntegrations()
    {
        return $this->_createIntegrationQuery()->count();
    }

    // Private Methods
    // =========================================================================

    /**
     * Create database query for integrations
     *
     * @return Query
     */
    private function _createIntegrationQuery(): Query
    {
        return (new Query())
            ->select([
                'integration.id',
                'integration.name',
                'integration.handle',
                'integration.type',
                'integration.category',
                'integration.status',
                'integration.frontend',
                'integration.allowMultiple',
                'integration.token',
                'integration.content',
                'integration.settings',
            ])
            ->from(['{{%formbuilder_integrations}} integration'])
            ->orderBy(['id' => SORT_ASC]);
    }
}