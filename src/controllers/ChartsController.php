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
use craft\controllers\ElementIndexesController;
use craft\db\Query;
use craft\helpers\DateTimeHelper;
use craft\helpers\ChartHelper;
use craft\web\Controller;
use yii\web\Response;
use Exception;

use roundhouse\formbuilder\FormBuilder;
use roundhouse\formbuilder\plugin\Table;

class ChartsController extends Controller
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    /**
     * Get all submissions for specified date
     *
     * @return Response
     * @throws Exception
     */
    public function actionGetEntriesCount(): Response
    {
        $formId = Craft::$app->getRequest()->getBodyParam('formId');
        $startDateParam = Craft::$app->getRequest()->getRequiredBodyParam('startDate');
        $endDateParam = Craft::$app->getRequest()->getRequiredBodyParam('endDate');

        $startDate = DateTimeHelper::toDateTime($startDateParam);
        $endDate = DateTimeHelper::toDateTime($endDateParam);

        if ($startDate === false || $endDate === false) {
            throw new Exception('There was a problem calculating the start and end dates');
        }

        // Start at midnight on the start date, end at midnight after the end date
        $timeZone = new \DateTimeZone(Craft::$app->getTimeZone());
        $startDate = new \DateTime($startDate->format('Y-m-d'), $timeZone);
        $endDate = new \DateTime($endDate->modify('+1 day')->format('Y-m-d'), $timeZone);

        $intervalUnit = 'day';

        // Prep the query
        $query = (new Query())
            ->from([Table::ENTRIES . ' entries']);

        if ($formId) {
            $query->where(['formId' => $formId]);
        }
        
        $dataTable = ChartHelper::getRunChartDataFromQuery($query, $startDate, $endDate, 'entries.postedOn', 'count', '*', [
           'intervalUnit' => $intervalUnit,
           'valueLabel' =>  FormBuilder::t('Entries')
        ]);

        $total = 0;

        foreach ($dataTable['rows'] as $row) {
            $total += $row[1];
        }

        return $this->asJson([
            'dataTable' => $dataTable,
            'total' => $total,
            'totalHtml' => Craft::$app->getFormatter()->asInteger($total),
            'formats' => ChartHelper::formats(),
            'orientation' => Craft::$app->getLocale()->getOrientation(),
            'scale' => $intervalUnit
        ]);

//        $this->requirePostRequest();
//        $this->requireAcceptsJson();
//
//        $request = Craft::$app->getRequest();
//
//        $startDateParam = $request->getBodyParam('startDate');
//        $endDateParam = $request->getBodyParam('endDate');
//        $formId = $request->getBodyParam('formId');
//
//        $startDate = DateTimeHelper::toDateTime($startDateParam, true);
//        $endDate = DateTimeHelper::toDateTime($endDateParam, true);
//        $endDate->modify('+1 day');
//
//        $intervalUnit = ChartHelper::getRunChartIntervalUnit($startDate, $endDate);
//
//        if ($formId) {
//            $query = clone $this->getElementQuery()
//                ->where(['formId' => $formId])
//                ->search(null);
//        } else {
//            $query = clone $this->getElementQuery()
//                ->search(null);
//        }
//
//
//
//        $dataTable = ChartHelper::getRunChartDataFromQuery($query, $startDate, $endDate, 'formbuilder_entries.postedOn', 'count', '[[formbuilder_entries.postedOn]]', [
//            'intervalUnit' => $intervalUnit,
//            'valueLabel' => FormBuilder::t('Entries'),
//            'valueType' => 'number',
//        ]);
//
//        $total = 0;
//
//        foreach($dataTable['rows'] as $row) {
//            $total = $total + $row[1];
//        }
//
//        $totalHtml = Craft::$app->getFormatter()->asInteger($total);
//
//        $formats = [
//            'shortDateFormats' => [
//                'day' => '%-m/%-d',
//                'month' => '%-m/%Y',
//                'year' => '%Y',
//            ],
//            'currencyFormat' => '$,.2f',
//            'number' => ',',
//            'numberFormat' => ',.0f',
//            'percentFormat' => ',.2%'
//        ];
//
//        return $this->asJson([
//            'dataTable' => $dataTable,
//            'total' => $total,
//            'totalHtml' => $totalHtml,
//
//            'formats' => $formats,
//            'orientation' => Craft::$app->locale->getOrientation(),
//            'scale' => $intervalUnit
//        ]);
    }
}
