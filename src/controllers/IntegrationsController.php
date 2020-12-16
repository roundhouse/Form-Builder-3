<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\controllers;

use Craft;
use craft\errors\MissingComponentException;
use craft\helpers\ArrayHelper;
use craft\helpers\Json;
use craft\helpers\StringHelper;
use craft\web\Controller;
use craft\web\View;

use roundhouse\formbuilder\elements\Form;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig_Error_Loader;
use yii\base\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\Response;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\models\Integration;
use roundhouse\formbuilder\web\assets\FormBuilder as FormBuilderAsset;
use roundhouse\formbuilder\web\assets\Integrations;

class IntegrationsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    public function actionIndex()
    {
        $this->requirePermission('fb:accessIntegrations');

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);
        $view->registerAssetBundle(Integrations::class);

        $plugin = FormBuilder::getInstance();

        $integrations = FormBuilder::$plugin->integrations->getAllIntegrations();

        return $this->renderTemplate('form-builder/integrations/index', [
            'plugin' => $plugin,
            'integrations' => $integrations
        ]);
    }

    public function actionEdit(int $integrationId = null, string $type = null): Response
    {
        $this->requirePermission('fb:editIntegrations');

        $view = $this->getView();
        $view->registerAssetBundle(FormBuilderAsset::class);

        $variables['entryId'] = $integrationId;
        $variables['type'] = $type;

        if ($integrationId) {
            $variables['entry'] = FormBuilder::$plugin->integrations->getIntegrationById($integrationId);
            $variables['title'] = $variables['entry']->name;
        } else {
            $variables['entry'] = new Integration();
            $variables['title'] = FormBuilder::t('New integration for ' . $type);
        }

        $variables['fullPageForm'] = true;
        $variables['continueEditingUrl'] = 'form-builder/integrations/{id}';
        $variables['saveShortcutRedirect'] = $variables['continueEditingUrl'];

        return $this->renderTemplate('form-builder/integrations/_edit', $variables);
    }

    public function actionGetHudModal()
    {
        $this->requirePostRequest();

        $variables = [];
        $variables['type'] = Craft::$app->getRequest()->getBodyParam('type');

        $isTemplate = Craft::$app->view->doesTemplateExist('form-builder/integrations/_type/' . $variables['type'] . '/form');

        if ($isTemplate) {
            $template = Craft::$app->view->renderTemplate('form-builder/integrations/_type/' . $variables['type'] . '/form', $variables);
        } else {
            $isIntegrationPlugin = Craft::$app->plugins->isPluginInstalled('form-builder-integrations');
            if ($isIntegrationPlugin) {
                $isIntegrationTemplate = Craft::$app->view->doesTemplateExist('form-builder-integrations/types/' . $variables['type'] . '/form');

                if ($isIntegrationTemplate) {
                    $template = Craft::$app->view->renderTemplate('form-builder-integrations/types/' . $variables['type'] . '/form', $variables);
                } else {
                    return $this->asJson([
                        'success' => false,
                        'error' => FormBuilder::t('Template not found')
                    ]);
                }
            } else {
                return $this->asJson([
                    'success' => false,
                    'error' => FormBuilder::t('Template not found')
                ]);
            }
        }

        return $this->asJson([
            'success' => true,
            'template' => $template
        ]);
    }

    public function actionGetIntegrationsHud()
    {
        $this->requirePostRequest();

        $variables['integrations'] = FormBuilder::$plugin->integrations->getAllIntegrations();

        $template = Craft::$app->view->renderTemplate('form-builder/integrations/_includes/integrations-selection', $variables);

        return $this->asJson([
            'success' => true,
            'template' => $template
        ]);
    }

    /**
     * Get Integration Section
     *
     * @return Response
     * @throws BadRequestHttpException
     * @throws Exception
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function actionGetIntegrationSection()
    {
        $this->requirePostRequest();
        $id = Craft::$app->getRequest()->getBodyParam('id');
        $type = Craft::$app->getRequest()->getBodyParam('type');
        $formId = Craft::$app->getRequest()->getBodyParam('formId');


        $variables['integration'] = FormBuilder::$plugin->integrations->getIntegrationById($id);
        $variables['type'] = $type;
        $variables['allowMultiple'] = $variables['integration']->allowMultiple;
        $variables['index'] = StringHelper::randomString(4);
        $variables['form'] = Form::findOne($formId);

        $isTemplate = Craft::$app->view->doesTemplateExist('form-builder/integrations/_type/' . $type . '/form');

        if ($isTemplate) {
            $template = Craft::$app->view->renderTemplate('form-builder/integrations/_type/' . $type . '/integration-section', $variables);
        } else {
            $isIntegrationPlugin = Craft::$app->plugins->isPluginInstalled('form-builder-integrations');
            if ($isIntegrationPlugin) {
                $isIntegrationTemplate = Craft::$app->view->doesTemplateExist('form-builder-integrations/types/' . $type . '/form');

                if ($isIntegrationTemplate) {
                    $template = Craft::$app->view->renderTemplate('form-builder-integrations/types/' . $type . '/integration-section', $variables);
                } else {
                    return $this->asJson([
                        'success' => false,
                        'error' => FormBuilder::t('Template not found')
                    ]);
                }
            } else {
                return $this->asJson([
                    'success' => false,
                    'error' => FormBuilder::t('Template not found')
                ]);
            }
        }


        return $this->asJson([
            'success' => true,
            'template' => $template,
            'type' => $type,
            'index' => $variables['index']
        ]);
    }

    /**
     * Ajax Save Entry
     *
     * @return Response
     * @throws BadRequestHttpException
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws Exception
     */
    public function actionSave()
    {
        $this->requirePostRequest();

        $type = Craft::$app->getRequest()->getBodyParam('type');
        $name = Craft::$app->getRequest()->getBodyParam('name');
        $handle = Craft::$app->getRequest()->getBodyParam('handle');
        $token = Craft::$app->getRequest()->getBodyParam('token');
        $category = Craft::$app->getRequest()->getBodyParam('category');
        $frontend = Craft::$app->getRequest()->getBodyParam('frontend');

        $model = new Integration();
        $model->name = $name;
        $model->handle = $handle;
        $model->type = $type;
        $model->token = $token;
        $model->category = $category;
        $model->frontend = $frontend;
        $model->content = Craft::$app->getRequest()->getBodyParam('content');
        $model->settings = Craft::$app->getRequest()->getBodyParam('settings');
        $model->validate();

        if (!$model->hasErrors()) {
            $response = FormBuilder::$plugin->integrations->save($model);

            if ($response) {
                $array = ArrayHelper::toArray($response);

                $template = $template = Craft::$app->view->renderTemplate('form-builder/integrations/_includes/item', $array);

                return $this->asJson([
                    'success' => true,
                    'template' => $template
                ]);
            }
        } else {
            return $this->asJson([
                'success' => false,
                'errors' => $model->getErrors(),
            ]);
        }
    }


    /**
     * Save Entry
     *
     * @return null|Response
     * @throws BadRequestHttpException
     * @throws NotFoundHttpException
     * @throws MissingComponentException
     * @throws ForbiddenHttpException
     */
    public function actionSaveEntry()
    {
        $this->requirePermission('fb:editIntegrations');
        $this->requirePermission('fb:createIntegrations');
        $this->requirePostRequest();

        $integration = $this->_getIntegrationModel();

        if (!FormBuilder::$plugin->integrations->save($integration)) {
            Craft::$app->getSession()->setError(Craft::t('form-builder', 'Cannot save integration.'));

            Craft::$app->getUrlManager()->setRouteParams([
                'entry' => $integration
            ]);

            return null;
        }

        Craft::$app->getSession()->setNotice(Craft::t('form-builder', 'Integration saved.'));

        return $this->redirectToPostedUrl($integration);
    }


    public function actionDelete(): Response
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $this->requirePermission('fb:deleteIntegrations');

        $id = Craft::$app->getRequest()->getRequiredBodyParam('id');

        $result = FormBuilder::$plugin->integrations->deleteIntegrationsById($id);

        if ($result) {
            return $this->asJson(['success' => true]);
        } else {
            return $this->asJson(['success' => false]);
        }
    }


    /**
     * Get Integration model
     *
     * @return Integration
     * @throws NotFoundHttpException
     */
    private function _getIntegrationModel()
    {
        $id = Craft::$app->getRequest()->getBodyParam('id');

        if ($id) {
            $model = FormBuilder::$plugin->integrations->getIntegrationById($id);

            if (!$model) {
                throw new NotFoundHttpException('Integration not found');
            }
        } else {
            $model = new Integration();
        }

        $model->name = Craft::$app->getRequest()->getBodyParam('name');
        $model->handle = Craft::$app->getRequest()->getBodyParam('handle');
        $model->type = Craft::$app->getRequest()->getBodyParam('type');
        $model->content = Craft::$app->getRequest()->getBodyParam('content') ? Json::encode(Craft::$app->getRequest()->getBodyParam('content')) : null;
        $model->settings = Craft::$app->getRequest()->getBodyParam('settings') ? Json::encode(Craft::$app->getRequest()->getBodyParam('settings')) : null;

        $status = Craft::$app->getRequest()->getBodyParam('status');

        if ($status) {
            $model->status = 'enabled';
        } else {
            $model->status = 'disabled';
        }

        return $model;
    }
}