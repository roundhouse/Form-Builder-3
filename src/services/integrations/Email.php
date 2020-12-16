<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\services\integrations;

use Craft;
use craft\base\Component;
use craft\helpers\App;
use craft\helpers\ArrayHelper;
use craft\web\UploadedFile;
use craft\web\View;
use craft\helpers\Json;
use craft\mail\Message;

use yii\base\Exception;

class Email extends Component
{
    // Public Methods
    // =========================================================================

    /**
     * Prepare notification
     *
     * @param $items
     * @param $entry
     * @return bool
     * @throws Exception
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     */
    public function prepare($items, $entry)
    {
        $fields = $entry->form->getFieldLayout()->getFields();

        $hasFiles = $this->_checkForFiles($fields, $entry);

        if ($items) {
            foreach ($items as $item) {
                $variables = [
                    'id' => $item['integration']->id,
                    'enabled' => $item['integration']->status,
                    'settings' => [
                        'includeSubmission' => $item['includeSubmission'],
                        'sendCopyToSender' => isset($item['sendCopyToSender']) ? $item['sendCopyToSender'] : false,
                        'senderEmail' => Craft::$app->getView()->renderObjectTemplate('{' . $item['senderEmail'] . '}', $entry),
                        'senderSubject' => Craft::$app->getView()->renderObjectTemplate($item['senderSubject'], $entry),
                        'toEmail' => Craft::$app->getView()->renderObjectTemplate($item['toEmail'], $entry),
                        'fromEmail' => Craft::$app->getView()->renderObjectTemplate($item['fromEmail'], $entry),
                        'fromName' => Craft::$app->getView()->renderObjectTemplate($item['fromName'], $entry),
                        'subject' => Craft::$app->getView()->renderObjectTemplate($item['subject'], $entry),
                        'customTemplate' => Craft::$app->getView()->renderObjectTemplate($item['customTemplate'], $entry),
                        'includeFileAttachments' => isset($item['includeFileAttachments']) ? $item['includeFileAttachments'] : false,
                        'hasFiles' => $hasFiles,
                    ],
                    'entry' => $entry,
                    'fields' => $fields
                ];

                $result = $this->_preparePayload($variables);
            }
        }

        return true;
    }

    // Private Methods
    // =========================================================================

    private function _checkForFiles($fields, $entry)
    {
        $assets = [];

        foreach ($fields as $field) {
            $class = get_class($field);

            if ($class == 'craft\fields\Assets') {
                $handle = $field->handle;
                if ($handle) {
                    $assetEntry = $entry[$handle]->one();
                    if ($assetEntry) {
                        $asset = [
                            'url' => $assetEntry->url,
                            'filename' => $assetEntry->filename,
                            'volumeId' => $assetEntry->volumeId,
                            'folderId' => $assetEntry->folderId,
                            'folderPath' => $assetEntry->folderPath,
                        ];

                        $assets[] = $asset;
                    }
                }
            }

        }

        if (!empty($assets)) {
            return $assets;
        }

        return false;
    }

    /**
     * Prepare mail payload
     *
     * @param $variables
     * @throws Exception
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     */
    private function _preparePayload($variables)
    {
        $oldPath = Craft::$app->view->getTemplateMode();
        Craft::$app->view->setTemplateMode(View::TEMPLATE_MODE_CP);

        if (isset($variables['settings']['customTemplate']) && $variables['settings']['customTemplate'] != '') {
            $template = Craft::$app->view->renderTemplate($variables['settings']['customTemplate'], $variables);
        } else {
            $template = Craft::$app->view->renderTemplate('form-builder/integrations/_type/email/email-template', $variables);
        }

        Craft::$app->view->setTemplateMode($oldPath);

        $this->_sendEmail($variables['settings'], $template);
    }

    /**
     * Send email
     *
     * @param $settings
     * @param $template
     * @return bool
     * @throws \Throwable
     */
    private function _sendEmail($settings, $template)
    {
        $recipientMessage = false;

        if (isset($settings['sendCopyToSender']) && $settings['sendCopyToSender'] == '1') {
            if (isset($settings['senderEmail']) && $settings['senderEmail'] != '') {
                $messageRecipient = new Message();
                $messageRecipient->setFrom($this->_getFrom($settings));
                $messageRecipient->setTo($this->_getToRecipient($settings));
                $messageRecipient->setSubject($settings['senderSubject']);
                $messageRecipient->setHtmlBody($template);
                $recipientMessage = $messageRecipient;

                if (isset($settings['includeFileAttachments']) && $settings['includeFileAttachments'] && $settings['hasFiles']) {
                    foreach ($settings['hasFiles'] as $file) {
                        $messageRecipient->attach($file['url']);
                    }
                }

            }
        }
        
        $message = new Message();
        $message->setFrom($this->_getFrom($settings));
        $message->setTo($this->_getTo($settings));
        $message->setSubject($settings['subject']);
        $message->setHtmlBody($template);

        if (isset($settings['includeFileAttachments']) && $settings['includeFileAttachments'] && $settings['hasFiles']) {
            foreach ($settings['hasFiles'] as $file) {
                $message->attach($file['url']);
            }
        }

        $messages = [$message];

        if ($recipientMessage) {
            ArrayHelper::append($messages, $recipientMessage);
        }

        foreach ($messages as $message) {
            Craft::$app->mailer->send($message);
        }

        return true;
    }


    /**
     * Get from email and name
     *
     * @param $settings
     * @return array
     */
    private function _getFrom($settings)
    {
        $from = [];

        if ($settings['fromEmail'] != '') {
            $from['fromEmail'] = $settings['fromEmail'];
        } else {
            $from['fromEmail'] = App::mailSettings()->fromEmail;
        }

        if ($settings['fromName'] != '') {
            $from['fromName'] = $settings['fromName'];
        } else {
            $from['fromName'] = App::mailSettings()->fromName;
        }

        return [
            $from['fromEmail'] => $from['fromName']
        ];
    }

    /**
     * Get to email
     *
     * @param $settings
     * @return array
     */
    private function _getTo($settings)
    {
        return [
            $settings['toEmail'] => ''
        ];
    }

    /**
     * Get to recipient email
     *
     * @param $settings
     * @return array
     */
    private function _getToRecipient($settings)
    {
        return [
            $settings['senderEmail'] => ''
        ];
    }
}