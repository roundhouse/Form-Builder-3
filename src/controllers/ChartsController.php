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
use craft\helpers\DateTimeHelper;
use craft\helpers\ChartHelper;
use craft\db\Query;

use roundhouse\formbuilder\FormBuilder;

class ChartsController extends ElementIndexesController
{
    // Protected Properties
    // =========================================================================

    protected $allowAnonymous = true;

    // Public Methods
    // =========================================================================

    /**
     * Get all submissions for specified date
     *
     * @return \yii\web\Response
     * @throws \yii\base\Exception
     * @throws \yii\web\BadRequestHttpException
     */
    public function actionGetEntriesCount()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();

        $startDateParam = $request->getBodyParam('startDate');
        $endDateParam = $request->getBodyParam('endDate');
        $formId = $request->getBodyParam('formId');

        $startDate = DateTimeHelper::toDateTime($startDateParam, true);
        $endDate = DateTimeHelper::toDateTime($endDateParam, true);
        $endDate->modify('+1 day');

        $intervalUnit = ChartHelper::getRunChartIntervalUnit($startDate, $endDate);

        if ($formId) {
            $query = clone $this->getElementQuery()
                ->where(['formId' => $formId])
                ->search(null);

//            $query = (new Query())
//                ->select('COUNT(*) as value')
//                ->from(['{{%formbuilder_entries}}'])
//                ->where(['formId' => $formId]);
        } else {
            $query = clone $this->getElementQuery()
                ->search(null);

//            $query = (new Query())
//                ->select('COUNT(*) as value')
//                ->from(['{{%formbuilder_entries}}']);
        }

        $dataTable = ChartHelper::getRunChartDataFromQuery($query, $startDate, $endDate, 'formbuilder_entries.dateCreated', 'count', '[[formbuilder_entries.dateCreated]]', [
            'intervalUnit' => $intervalUnit,
            'valueLabel' => FormBuilder::t('Entries'),
            'valueType' => 'number',
        ]);

//
//        $dataTable = ChartHelper::getRunChartDataFromQuery($query, $startDate, $endDate, 'formbuilder_entries.dateCreated','count','formbuilder_entries.dateCreated',
//            [
//                'intervalUnit' => $intervalUnit,
//                'valueLabel' => FormBuilder::t('Entries'),
//                'valueType' => 'number',
//            ]
//        );
//
        $total = 0;
//
        foreach($dataTable['rows'] as $row) {
            $total = $total + $row[1];
        }

        $totalHtml = Craft::$app->getFormatter()->asInteger($total);

        $formats = [
            'shortDateFormats' => [
                'day' => '%-m/%-d',
                'month' => '%-m/%Y',
                'year' => '%Y',
            ],
            'currencyFormat' => '$,.2f',
            'number' => ',',
            'numberFormat' => ',.0f',
            'percentFormat' => ',.2%'
        ];

        return $this->asJson([
            'dataTable' => $dataTable,
            'total' => $total,
            'totalHtml' => $totalHtml,

            'formats' => $formats,
            'orientation' => Craft::$app->locale->getOrientation(),
            'scale' => $intervalUnit
        ]);
    }
}