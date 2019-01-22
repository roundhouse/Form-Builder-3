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

use roundhouse\formbuilder\FormBuilder;
use yii\base\Exception;

class Salesforce extends Component
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
                    'organizationId' =>  $item['integration']->settings['organizationId'],
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
        // Salesforce values
        // TODO: add these to integration settings
        $oid = $variables['settings']['organizationId'];
        $returnUrl = 'https://google.com';
        $leadSource = 'Web';
//        $campaignId = $request->getBodyParam('Campaign_ID');

        $salesforce = [];
        $salesforce['oid'] = $oid;
        $salesforce['retURL'] = $returnUrl;
        $salesforce['lead_source'] = $leadSource;

        $fields = [];
        $fields['fullName'] = 'John Doe';
        $fields['company'] = 'Doe Firm';
        $fields['email'] = 'joh@doe.com';


        $data = ArrayHelper::merge($salesforce, $fields);

        $response = $this->_sendData($data, $variables);

        Craft::dd($response);
    }


    private function _sendData($formData, $variables)
    {
        $client = new \GuzzleHttp\Client([
            'base_uri' => 'https://webto.salesforce.com',
            'http_errors' => false,
            'timeout' => 10
        ]);

        try {
            $response = $client->request('POST', 'servlet/servlet.WebToLead', [
                'form_params' => $formData
            ]);

            FormBuilder::log('Salesforce data submitted!');

            return [
                'success' => true,
                'statusCode' => $response->getStatusCode(),
                'reason' => $response->getReasonPhrase(),
                'body' => (string) $response->getBody(),
                'payload' => $formData
            ];

        } catch (\Exception $e) {
            FormBuilder::error('Salesforce data submission failed! ' . $e->getMessage());

            return [
                'success' => false,
                'reason' => $e->getMessage(),
                'payload' => $formData
            ];
        }
    }
}
