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
use craft\helpers\ArrayHelper;
use craft\web\View;
use craft\helpers\Json;
use craft\mail\Message;

use yii\base\Exception;

class Slack extends Component
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
                    'includeSubmission' => $item['includeSubmission'],
                    'text' => $item['text'],
                    'enabled' => $item['integration']->status,
                    'settings' => $item['integration']->settings,
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
     * Prepare slack payload
     *
     * @param $variables
     * @throws Exception
     * @throws \Throwable
     * @throws \Twig_Error_Loader
     */
    private function _preparePayload($variables)
    {


        if ($variables['includeSubmission']) {
            
            $attachmentsCollection = [];
            
            foreach ($variables['fields'] as $field) {

                $handle = $field->handle;

                $attachment = [
                    'title' => $field->name,
                    'value' => ($variables['entry']->$handle ? $variables['entry']->$handle : 'n/a'),
                    'short' => true
                ];
                
                ArrayHelper::prependOrAppend($attachmentsCollection, $attachment, false);
            }

            $attachments = [[
                'color'    => '#4cb9d5',
                'fields'   => $attachmentsCollection
            ]];
            
        } else {
            $attachments = null;
        }

        $this->_sendMessage($variables['text'], $attachments);
    }


    /**
     * Send slack message
     *
     * @param $settings
     * @param $template
     * @return bool
     * @throws \Throwable
     */
    private function _sendMessage($text, $attachments)
    {
        $data['text'] = $text;

        if ($attachments) {
            $data['attachments'] = $attachments;
        }
        
        $payload = Json::encode($data);

        $ch = curl_init('https://hooks.slack.com/services/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');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        $result = curl_exec($ch);
        curl_close($ch);

        return true;

    }
}