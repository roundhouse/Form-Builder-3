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

        if ($items) {
            foreach ($items as $item) {

                $variables = [
                    'id' => $item['integration']->id,
                    'enabled' => $item['integration']->status,
                    'settings' => [
                        'includeSubmission' => $item['includeSubmission'],
                        'toEmail' => Craft::$app->getView()->renderObjectTemplate($item['toEmail'], $entry),
                        'fromEmail' => Craft::$app->getView()->renderObjectTemplate($item['fromEmail'], $entry),
                        'subject' => Craft::$app->getView()->renderObjectTemplate($item['subject'], $entry),
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
        $template = Craft::$app->view->renderTemplate('form-builder/integrations/_type/email/email-template', $variables);
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
        $message = new Message();
        $message->setFrom([$settings['fromEmail'] => $settings['fromEmail']]);
        $message->setTo($settings['toEmail']);
        $message->setSubject($settings['subject']);
        $message->setHtmlBody($template);

        return Craft::$app->mailer->send($message);
    }
}