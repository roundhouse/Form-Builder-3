/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// DashboardEntriesIndex = Craft.BaseElementIndex.extend({
//     getViewClass(mode) {
//         switch (mode) {
//             case 'table':
//                 return DashboardEntriesTableView
//             default:
//                 return this.base(mode)
//         }
//     },
// })

// Craft.registerElementIndexClass('roundhouse\\formbuilder\\elements\\Entry', DashboardEntriesIndex)

// DashboardEntriesTableView = Craft.TableElementIndexView.extend({
//     startDate: null,
//     endDate: null,

//     startDatepicker: null,
//     endDatepicker: null,

//     $chartExplorer: null,
//     $totalValue: null,
//     $chartContainer: null,
//     $spinner: null,
//     $error: null,
//     $chart: null,
//     $startDate: null,
//     $endDate: null,

//     afterInit() {
//         this.$explorerContainer = $('<div class="chart-explorer-container"></div>').prependTo(this.$container)
//         this.createChartExplorer()

//         this.base()
//     },

// getStorage(key) {
//     return DashboardEntriesTableView.getStorage(this.elementIndex._namespace, key);
// },

// setStorage(key, value) {
//     DashboardEntriesTableView.setStorage(this.elementIndex._namespace, key, value)
// },

//     createChartExplorer() {
//         let $chartExplorer = $('<div class="chart-explorer"></div>').appendTo(this.$explorerContainer)
//         let $chartHeader = $('<div class="chart-header"></div>').appendTo($chartExplorer)
//         let $dateRange = $('<div class="date-range" />').appendTo($chartHeader)
//         let $startDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange)
//         let $to = $('<span class="to"><i class="far fa-long-arrow-right"></i></span>').appendTo($dateRange)
//         let $endDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange)
//         let $total = $('<div class="total"></div>').prependTo($chartHeader)
//         let $totalLabel = $('<div class="total-label"><p>'+Craft.t('form-builder', 'Total Submissions')+'</p></div>').appendTo($total)
//         let $totalValueWrapper = $('<div class="total-value-wrapper"></div>').prependTo($total)
//         let $totalValue = $('<span class="total-value">&nbsp;</span>').appendTo($totalValueWrapper)

//         this.$chartExplorer = $chartExplorer
//         this.$totalValue = $totalValue
//         this.$chartContainer = $('<div class="chart-container"></div>').appendTo($chartExplorer)
//         this.$spinner = $('<div class="loader"><svg width="20px" height="20px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g fill="none" fill-rule="evenodd"><g transform="translate(4 3)" stroke-width="5"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>').prependTo($chartHeader)
//         this.$error = $('<div class="error"></div>').appendTo(this.$chartContainer)
//         this.$chart = $('<div class="chart"></div>').appendTo(this.$chartContainer)

//         this.$startDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($startDateContainer)
//         this.$endDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($endDateContainer)

//         this.$startDate.datepicker($.extend({
//             onSelect: $.proxy(this, 'handleStartDateChange')
//         }, Craft.datepickerOptions))

//         this.$endDate.datepicker($.extend({
//             onSelect: $.proxy(this, 'handleEndDateChange')
//         }, Craft.datepickerOptions))

//         this.startDatepicker = this.$startDate.data('datepicker')
//         this.endDatepicker = this.$endDate.data('datepicker')

//         this.addListener(this.$startDate, 'keyup', 'handleStartDateChange')
//         this.addListener(this.$endDate, 'keyup', 'handleEndDateChange')

//         let startTime = this.getStorage('startTime') || ((new Date()).getTime() - (60 * 60 * 24 * 30 * 1000))
//         let endTime = this.getStorage('endTime') || ((new Date()).getTime())

//         this.setStartDate(new Date(startTime))
//         this.setEndDate(new Date(endTime))

//         this.loadReport()
//     },

// handleStartDateChange() {
//     if (this.setStartDate(DashboardEntriesTableView.getDateFromDatepickerInstance(this.startDatepicker))) {
//         this.loadReport()
//     }
// },

//     handleEndDateChange() {
//         if (this.setEndDate(DashboardEntriesTableView.getDateFromDatepickerInstance(this.endDatepicker))) {
//             this.loadReport()
//         }
//     },

// setStartDate(date) {
//     if (this.startDate && date.getTime() == this.startDate.getTime()) {
//         return false
//     }

//     this.startDate = date
//     this.setStorage('startTime', this.startDate.getTime())
//     this.$startDate.val(Craft.formatDate(this.startDate))

//     if (this.endDate && this.startDate.getTime() > this.endDate.getTime()) {
//         this.setEndDate(new Date(this.startDate.getTime()))
//     }

//     return true
// },

// setEndDate(date) {
//     if (this.endDate && date.getTime() == this.endDate.getTime()) {
//         return false
//     }

//     this.endDate = date
//     this.setStorage('endTime', this.endDate.getTime())
//     this.$endDate.val(Craft.formatDate(this.endDate))

//     if (this.startDate && this.endDate.getTime() < this.startDate.getTime()) {
//         this.setStartDate(new Date(this.endDate.getTime()))
//     }

//     return true
// },

//     loadReport() {
//         let requestData = this.settings.params

//         requestData.startDate = DashboardEntriesTableView.getDateValue(this.startDate)
//         requestData.endDate = DashboardEntriesTableView.getDateValue(this.endDate)
//         requestData.formId = this.elementIndex.$source.data('form-id')

//         this.$spinner.removeClass('hidden')
//         this.$error.addClass('hidden')
//         this.$chart.removeClass('error')

//         Craft.postActionRequest('form-builder/charts/get-entries-count', requestData, $.proxy(function(response, textStatus) {
//             this.$spinner.addClass('hidden')

//             if(textStatus == 'success' && typeof(response.error) == 'undefined') {
//                 if(!this.chart) {
//                     this.chart = new Craft.charts.Area(this.$chart)
//                 }

//                 let chartDataTable = new Craft.charts.DataTable(response.dataTable)

//                 let chartSettings = {
//                     orientation: response.orientation,
//                     formats: response.formats,
//                     dataScale: response.scale,
//                     margin: { top: 10, right: 10, bottom: 30, left: 10 }
//                 }


//                 this.chart.settings.formats = response.formats

//                 this.chart.draw(chartDataTable, chartSettings)
//                 this.$totalValue.html(response.totalHtml)

//             } else {
//                 let msg = Craft.t('An unknown error occurred.')

//                 if (typeof(response) != 'undefined' && response && typeof(response.error) != 'undefined') {
//                     msg = response.error
//                 }

//                 this.$error.html(msg)
//                 this.$error.removeClass('hidden')
//                 this.$chart.addClass('error')
//             }
//         }, this));
//     }
// }, {
// storage: {},

// getStorage(namespace, key) {
//     if (DashboardEntriesTableView.storage[namespace] && DashboardEntriesTableView.storage[namespace][key]) {
//         return DashboardEntriesTableView.storage[namespace][key]
//     }

//     return null
// },

// setStorage(namespace, key, value) {
//     if (typeof EntriesTableView.storage[namespace] == typeof undefined) {
//         EntriesTableView.storage[namespace] = {}
//     }

//     EntriesTableView.storage[namespace][key] = value
// },

// getDateFromDatepickerInstance(inst) {
//     return new Date(inst.currentYear, inst.currentMonth, inst.currentDay)
// },

// getDateValue(date) {
//     return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
// }
// })


var DashboardReportChart = void 0;

DashboardReportChart = Garnish.Base.extend({
    $container: null,
    $chartExplorer: null,
    $totalValue: null,
    $chartContainer: null,
    $spinner: null,
    $error: null,
    $chart: null,

    params: {
        startDate: null,
        endDate: null
    },

    init: function init(el) {
        this.$container = $(el);
        this.createChartExplorer();

        this.handleMonthChange();
    },
    getStorage: function getStorage(key) {
        return DashboardReportChart.getStorage(this._namespace, key);
    },
    setStorage: function setStorage(key, value) {
        DashboardReportChart.setStorage(this._namespace, key, value);
    },
    createChartExplorer: function createChartExplorer() {
        var $chartExplorer = $('<div class="chart-explorer"></div>').appendTo(this.$container);
        var $chartHeader = $('<div class="chart-header"></div>').appendTo($chartExplorer);

        var $timelinePickerWrapper = $('<div class="timeline-wrapper" />').appendTo($chartHeader);

        var $total = $('<div class="total"></div>').prependTo($chartHeader);
        var $totalLabel = $('<div class="total-label"><p>' + Craft.t('form-builder', 'Total Submissions') + '</p></div>').appendTo($total);
        var $totalValueWrapper = $('<div class="total-value-wrapper"></div>').prependTo($total);
        var $totalValue = $('<span class="total-value">&nbsp;</span>').appendTo($totalValueWrapper);

        this.$chartExplorer = $chartExplorer;
        this.$totalValue = $totalValue;
        this.$chartContainer = $('<div class="chart-container"></div>').appendTo($chartExplorer);
        this.$spinner = $('<div class="loader"><svg width="20px" height="20px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#E9EFF4"><g fill="none" fill-rule="evenodd"><g transform="translate(4 3)" stroke-width="5"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>').prependTo($chartHeader);
        this.$error = $('<div class="error"></div>').appendTo(this.$chartContainer);
        this.$chart = $('<div class="chart"></div>').appendTo(this.$chartContainer);

        this.$monthBtn = $('<button id="month-range" class="active">Last 30 days</buttons>').appendTo($timelinePickerWrapper);
        this.$weekBtn = $('<button id="week-range">Week</buttons>').appendTo($timelinePickerWrapper);

        this.addListener(this.$monthBtn, 'click', 'handleMonthChange');
        this.addListener(this.$weekBtn, 'click', 'handleWeekChange');
    },
    handleMonthChange: function handleMonthChange() {
        this.$weekBtn.removeClass('active');
        this.$monthBtn.addClass('active');

        var startTime = this.monthRangeDate();
        var endTime = new Date(new Date().getTime());

        this.params.startDate = startTime;
        this.params.endDate = endTime;

        this.setStorage('startTime', startTime);
        this.setStorage('endTime', endTime);

        this.loadReport();
    },
    handleWeekChange: function handleWeekChange() {
        this.$monthBtn.removeClass('active');
        this.$weekBtn.addClass('active');

        var startTime = this.weekRangeDate();
        var endTime = new Date(new Date().getTime());

        this.params.startDate = startTime;
        this.params.endDate = endTime;

        this.setStorage('startTime', startTime);
        this.setStorage('endTime', endTime);

        this.loadReport();
    },
    monthRangeDate: function monthRangeDate() {
        var today = new Date();
        var priorDate = new Date(new Date().setDate(today.getDate() - 30));

        return priorDate;
    },
    weekRangeDate: function weekRangeDate() {
        var firstDay = new Date(new Date().getTime());
        var previousweek = new Date(firstDay.getTime() - 7 * 24 * 60 * 60 * 1000);

        return previousweek;
    },
    loadReport: function loadReport() {
        var requestData = this.params;

        requestData.startDate = this.getDateValue(this.params.startDate);
        requestData.endDate = this.getDateValue(this.params.endDate);
        requestData.elementType = 'roundhouse\\formbuilder\\elements\\Entry';

        this.$spinner.removeClass('hidden');
        this.$error.addClass('hidden');
        this.$chart.removeClass('error');

        Craft.postActionRequest('form-builder/charts/get-entries-count', requestData, $.proxy(function (response, textStatus) {
            this.$spinner.addClass('hidden');

            if (textStatus == 'success' && typeof response.error == 'undefined') {
                if (!this.chart) {
                    this.chart = new Craft.charts.Area(this.$chart);
                }

                var chartDataTable = new Craft.charts.DataTable(response.dataTable);

                var chartSettings = {
                    orientation: response.orientation,
                    formats: response.formats,
                    dataScale: response.scale,
                    margin: { top: 10, right: 10, bottom: 30, left: 10 }
                };

                this.chart.settings.formats = response.formats;

                this.chart.draw(chartDataTable, chartSettings);
                this.$totalValue.html(response.totalHtml);
            } else {
                var msg = Craft.t('An unknown error occurred.');

                if (typeof response != 'undefined' && response && typeof response.error != 'undefined') {
                    msg = response.error;
                }

                this.$error.html(msg);
                this.$error.removeClass('hidden');
                this.$chart.addClass('error');
            }
        }, this));
    },
    getDateFromDatepickerInstance: function getDateFromDatepickerInstance(inst) {
        return new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
    },
    getDateValue: function getDateValue(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}, {
    storage: {},

    getStorage: function getStorage(namespace, key) {
        if (DashboardReportChart.storage[namespace] && DashboardReportChart.storage[namespace][key]) {
            return DashboardReportChart.storage[namespace][key];
        }

        return null;
    },
    setStorage: function setStorage(namespace, key, value) {
        if (_typeof(DashboardReportChart.storage[namespace]) == ( true ? 'undefined' : _typeof(undefined))) {
            DashboardReportChart.storage[namespace] = {};
        }

        DashboardReportChart.storage[namespace][key] = value;
    }
});

Garnish.$doc.ready(function () {
    new DashboardReportChart($('.chart-explorer-container'));
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmUxNjU4ZjAzNTU2OWRjNjFlNzgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZGFzaGJvYXJkLmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZFJlcG9ydENoYXJ0IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJGNoYXJ0RXhwbG9yZXIiLCIkdG90YWxWYWx1ZSIsIiRjaGFydENvbnRhaW5lciIsIiRzcGlubmVyIiwiJGVycm9yIiwiJGNoYXJ0IiwicGFyYW1zIiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsImluaXQiLCJlbCIsIiQiLCJjcmVhdGVDaGFydEV4cGxvcmVyIiwiaGFuZGxlTW9udGhDaGFuZ2UiLCJnZXRTdG9yYWdlIiwia2V5IiwiX25hbWVzcGFjZSIsInNldFN0b3JhZ2UiLCJ2YWx1ZSIsImFwcGVuZFRvIiwiJGNoYXJ0SGVhZGVyIiwiJHRpbWVsaW5lUGlja2VyV3JhcHBlciIsIiR0b3RhbCIsInByZXBlbmRUbyIsIiR0b3RhbExhYmVsIiwiQ3JhZnQiLCJ0IiwiJHRvdGFsVmFsdWVXcmFwcGVyIiwiJG1vbnRoQnRuIiwiJHdlZWtCdG4iLCJhZGRMaXN0ZW5lciIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzdGFydFRpbWUiLCJtb250aFJhbmdlRGF0ZSIsImVuZFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImxvYWRSZXBvcnQiLCJoYW5kbGVXZWVrQ2hhbmdlIiwid2Vla1JhbmdlRGF0ZSIsInRvZGF5IiwicHJpb3JEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJmaXJzdERheSIsInByZXZpb3Vzd2VlayIsInJlcXVlc3REYXRhIiwiZ2V0RGF0ZVZhbHVlIiwiZWxlbWVudFR5cGUiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInByb3h5IiwicmVzcG9uc2UiLCJ0ZXh0U3RhdHVzIiwiZXJyb3IiLCJjaGFydCIsImNoYXJ0cyIsIkFyZWEiLCJjaGFydERhdGFUYWJsZSIsIkRhdGFUYWJsZSIsImRhdGFUYWJsZSIsImNoYXJ0U2V0dGluZ3MiLCJvcmllbnRhdGlvbiIsImZvcm1hdHMiLCJkYXRhU2NhbGUiLCJzY2FsZSIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInNldHRpbmdzIiwiZHJhdyIsImh0bWwiLCJ0b3RhbEh0bWwiLCJtc2ciLCJnZXREYXRlRnJvbURhdGVwaWNrZXJJbnN0YW5jZSIsImluc3QiLCJjdXJyZW50WWVhciIsImN1cnJlbnRNb250aCIsImN1cnJlbnREYXkiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInN0b3JhZ2UiLCJuYW1lc3BhY2UiLCJ1bmRlZmluZWQiLCIkZG9jIiwicmVhZHkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEVBR3dCdEUsR0FIeEIsRUFHNkI7QUFDdkIsWUFBSXBCLHFCQUFxQnlGLE9BQXJCLENBQTZCQyxTQUE3QixLQUEyQzFGLHFCQUFxQnlGLE9BQXJCLENBQTZCQyxTQUE3QixFQUF3Q3RFLEdBQXhDLENBQS9DLEVBQTZGO0FBQ3pGLG1CQUFPcEIscUJBQXFCeUYsT0FBckIsQ0FBNkJDLFNBQTdCLEVBQXdDdEUsR0FBeEMsQ0FBUDtBQUNIOztBQUVELGVBQU8sSUFBUDtBQUNILEtBVEg7QUFXRUUsY0FYRixzQkFXYW9FLFNBWGIsRUFXd0J0RSxHQVh4QixFQVc2QkcsS0FYN0IsRUFXb0M7QUFDOUIsWUFBSSxRQUFPdkIscUJBQXFCeUYsT0FBckIsQ0FBNkJDLFNBQTdCLENBQVAsb0NBQXlEQyxTQUF6RCxFQUFKLEVBQXdFO0FBQ3BFM0YsaUNBQXFCeUYsT0FBckIsQ0FBNkJDLFNBQTdCLElBQTBDLEVBQTFDO0FBQ0g7O0FBRUQxRiw2QkFBcUJ5RixPQUFyQixDQUE2QkMsU0FBN0IsRUFBd0N0RSxHQUF4QyxJQUErQ0csS0FBL0M7QUFDSDtBQWpCSCxDQTVKcUIsQ0FBdkI7O0FBbUxBdEIsUUFBUTJGLElBQVIsQ0FBYUMsS0FBYixDQUFtQixZQUFNO0FBQ3JCLFFBQUk3RixvQkFBSixDQUF5QmdCLEVBQUUsMkJBQUYsQ0FBekI7QUFDSCxDQUZELEUiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNmUxNjU4ZjAzNTU2OWRjNjFlNzgiLCIvLyBEYXNoYm9hcmRFbnRyaWVzSW5kZXggPSBDcmFmdC5CYXNlRWxlbWVudEluZGV4LmV4dGVuZCh7XG4vLyAgICAgZ2V0Vmlld0NsYXNzKG1vZGUpIHtcbi8vICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4vLyAgICAgICAgICAgICBjYXNlICd0YWJsZSc6XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIERhc2hib2FyZEVudHJpZXNUYWJsZVZpZXdcbi8vICAgICAgICAgICAgIGRlZmF1bHQ6XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFzZShtb2RlKVxuLy8gICAgICAgICB9XG4vLyAgICAgfSxcbi8vIH0pXG5cbi8vIENyYWZ0LnJlZ2lzdGVyRWxlbWVudEluZGV4Q2xhc3MoJ3JvdW5kaG91c2VcXFxcZm9ybWJ1aWxkZXJcXFxcZWxlbWVudHNcXFxcRW50cnknLCBEYXNoYm9hcmRFbnRyaWVzSW5kZXgpXG5cbi8vIERhc2hib2FyZEVudHJpZXNUYWJsZVZpZXcgPSBDcmFmdC5UYWJsZUVsZW1lbnRJbmRleFZpZXcuZXh0ZW5kKHtcbi8vICAgICBzdGFydERhdGU6IG51bGwsXG4vLyAgICAgZW5kRGF0ZTogbnVsbCxcblxuLy8gICAgIHN0YXJ0RGF0ZXBpY2tlcjogbnVsbCxcbi8vICAgICBlbmREYXRlcGlja2VyOiBudWxsLFxuXG4vLyAgICAgJGNoYXJ0RXhwbG9yZXI6IG51bGwsXG4vLyAgICAgJHRvdGFsVmFsdWU6IG51bGwsXG4vLyAgICAgJGNoYXJ0Q29udGFpbmVyOiBudWxsLFxuLy8gICAgICRzcGlubmVyOiBudWxsLFxuLy8gICAgICRlcnJvcjogbnVsbCxcbi8vICAgICAkY2hhcnQ6IG51bGwsXG4vLyAgICAgJHN0YXJ0RGF0ZTogbnVsbCxcbi8vICAgICAkZW5kRGF0ZTogbnVsbCxcblxuLy8gICAgIGFmdGVySW5pdCgpIHtcbi8vICAgICAgICAgdGhpcy4kZXhwbG9yZXJDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtZXhwbG9yZXItY29udGFpbmVyXCI+PC9kaXY+JykucHJlcGVuZFRvKHRoaXMuJGNvbnRhaW5lcilcbi8vICAgICAgICAgdGhpcy5jcmVhdGVDaGFydEV4cGxvcmVyKClcblxuLy8gICAgICAgICB0aGlzLmJhc2UoKVxuLy8gICAgIH0sXG5cbiAgICAvLyBnZXRTdG9yYWdlKGtleSkge1xuICAgIC8vICAgICByZXR1cm4gRGFzaGJvYXJkRW50cmllc1RhYmxlVmlldy5nZXRTdG9yYWdlKHRoaXMuZWxlbWVudEluZGV4Ll9uYW1lc3BhY2UsIGtleSk7XG4gICAgLy8gfSxcblxuICAgIC8vIHNldFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xuICAgIC8vICAgICBEYXNoYm9hcmRFbnRyaWVzVGFibGVWaWV3LnNldFN0b3JhZ2UodGhpcy5lbGVtZW50SW5kZXguX25hbWVzcGFjZSwga2V5LCB2YWx1ZSlcbiAgICAvLyB9LFxuXG4vLyAgICAgY3JlYXRlQ2hhcnRFeHBsb3JlcigpIHtcbi8vICAgICAgICAgbGV0ICRjaGFydEV4cGxvcmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWV4cGxvcmVyXCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kZXhwbG9yZXJDb250YWluZXIpXG4vLyAgICAgICAgIGxldCAkY2hhcnRIZWFkZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtaGVhZGVyXCI+PC9kaXY+JykuYXBwZW5kVG8oJGNoYXJ0RXhwbG9yZXIpXG4vLyAgICAgICAgIGxldCAkZGF0ZVJhbmdlID0gJCgnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIiAvPicpLmFwcGVuZFRvKCRjaGFydEhlYWRlcilcbi8vICAgICAgICAgbGV0ICRzdGFydERhdGVDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiZGF0ZXdyYXBwZXJcIj48L2Rpdj4nKS5hcHBlbmRUbygkZGF0ZVJhbmdlKVxuLy8gICAgICAgICBsZXQgJHRvID0gJCgnPHNwYW4gY2xhc3M9XCJ0b1wiPjxpIGNsYXNzPVwiZmFyIGZhLWxvbmctYXJyb3ctcmlnaHRcIj48L2k+PC9zcGFuPicpLmFwcGVuZFRvKCRkYXRlUmFuZ2UpXG4vLyAgICAgICAgIGxldCAkZW5kRGF0ZUNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJkYXRld3JhcHBlclwiPjwvZGl2PicpLmFwcGVuZFRvKCRkYXRlUmFuZ2UpXG4vLyAgICAgICAgIGxldCAkdG90YWwgPSAkKCc8ZGl2IGNsYXNzPVwidG90YWxcIj48L2Rpdj4nKS5wcmVwZW5kVG8oJGNoYXJ0SGVhZGVyKVxuLy8gICAgICAgICBsZXQgJHRvdGFsTGFiZWwgPSAkKCc8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj48cD4nK0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdUb3RhbCBTdWJtaXNzaW9ucycpKyc8L3A+PC9kaXY+JykuYXBwZW5kVG8oJHRvdGFsKVxuLy8gICAgICAgICBsZXQgJHRvdGFsVmFsdWVXcmFwcGVyID0gJCgnPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlLXdyYXBwZXJcIj48L2Rpdj4nKS5wcmVwZW5kVG8oJHRvdGFsKVxuLy8gICAgICAgICBsZXQgJHRvdGFsVmFsdWUgPSAkKCc8c3BhbiBjbGFzcz1cInRvdGFsLXZhbHVlXCI+Jm5ic3A7PC9zcGFuPicpLmFwcGVuZFRvKCR0b3RhbFZhbHVlV3JhcHBlcilcblxuLy8gICAgICAgICB0aGlzLiRjaGFydEV4cGxvcmVyID0gJGNoYXJ0RXhwbG9yZXJcbi8vICAgICAgICAgdGhpcy4kdG90YWxWYWx1ZSA9ICR0b3RhbFZhbHVlXG4vLyAgICAgICAgIHRoaXMuJGNoYXJ0Q29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWNvbnRhaW5lclwiPjwvZGl2PicpLmFwcGVuZFRvKCRjaGFydEV4cGxvcmVyKVxuLy8gICAgICAgICB0aGlzLiRzcGlubmVyID0gJCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjxzdmcgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIHZpZXdCb3g9XCIwIDAgNDIgNDJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiPjxnIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg0IDMpXCIgc3Ryb2tlLXdpZHRoPVwiNVwiPjxjaXJjbGUgc3Ryb2tlLW9wYWNpdHk9XCIuNVwiIGN4PVwiMThcIiBjeT1cIjE4XCIgcj1cIjE4XCIvPjxwYXRoIGQ9XCJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMThcIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIGZyb209XCIwIDE4IDE4XCIgdG89XCIzNjAgMTggMThcIiBkdXI9XCIxc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiLz48L3BhdGg+PC9nPjwvZz48L3N2Zz48L2Rpdj4nKS5wcmVwZW5kVG8oJGNoYXJ0SGVhZGVyKVxuLy8gICAgICAgICB0aGlzLiRlcnJvciA9ICQoJzxkaXYgY2xhc3M9XCJlcnJvclwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGNoYXJ0Q29udGFpbmVyKVxuLy8gICAgICAgICB0aGlzLiRjaGFydCA9ICQoJzxkaXYgY2xhc3M9XCJjaGFydFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGNoYXJ0Q29udGFpbmVyKVxuXG4vLyAgICAgICAgIHRoaXMuJHN0YXJ0RGF0ZSA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHNpemU9XCIyMFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+JykuYXBwZW5kVG8oJHN0YXJ0RGF0ZUNvbnRhaW5lcilcbi8vICAgICAgICAgdGhpcy4kZW5kRGF0ZSA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHNpemU9XCIyMFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+JykuYXBwZW5kVG8oJGVuZERhdGVDb250YWluZXIpXG5cbi8vICAgICAgICAgdGhpcy4kc3RhcnREYXRlLmRhdGVwaWNrZXIoJC5leHRlbmQoe1xuLy8gICAgICAgICAgICAgb25TZWxlY3Q6ICQucHJveHkodGhpcywgJ2hhbmRsZVN0YXJ0RGF0ZUNoYW5nZScpXG4vLyAgICAgICAgIH0sIENyYWZ0LmRhdGVwaWNrZXJPcHRpb25zKSlcblxuLy8gICAgICAgICB0aGlzLiRlbmREYXRlLmRhdGVwaWNrZXIoJC5leHRlbmQoe1xuLy8gICAgICAgICAgICAgb25TZWxlY3Q6ICQucHJveHkodGhpcywgJ2hhbmRsZUVuZERhdGVDaGFuZ2UnKVxuLy8gICAgICAgICB9LCBDcmFmdC5kYXRlcGlja2VyT3B0aW9ucykpXG5cbi8vICAgICAgICAgdGhpcy5zdGFydERhdGVwaWNrZXIgPSB0aGlzLiRzdGFydERhdGUuZGF0YSgnZGF0ZXBpY2tlcicpXG4vLyAgICAgICAgIHRoaXMuZW5kRGF0ZXBpY2tlciA9IHRoaXMuJGVuZERhdGUuZGF0YSgnZGF0ZXBpY2tlcicpXG5cbi8vICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRzdGFydERhdGUsICdrZXl1cCcsICdoYW5kbGVTdGFydERhdGVDaGFuZ2UnKVxuLy8gICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGVuZERhdGUsICdrZXl1cCcsICdoYW5kbGVFbmREYXRlQ2hhbmdlJylcblxuLy8gICAgICAgICBsZXQgc3RhcnRUaW1lID0gdGhpcy5nZXRTdG9yYWdlKCdzdGFydFRpbWUnKSB8fCAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtICg2MCAqIDYwICogMjQgKiAzMCAqIDEwMDApKVxuLy8gICAgICAgICBsZXQgZW5kVGltZSA9IHRoaXMuZ2V0U3RvcmFnZSgnZW5kVGltZScpIHx8ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpKVxuXG4vLyAgICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKG5ldyBEYXRlKHN0YXJ0VGltZSkpXG4vLyAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZShuZXcgRGF0ZShlbmRUaW1lKSlcblxuLy8gICAgICAgICB0aGlzLmxvYWRSZXBvcnQoKVxuLy8gICAgIH0sXG5cbiAgICAvLyBoYW5kbGVTdGFydERhdGVDaGFuZ2UoKSB7XG4gICAgLy8gICAgIGlmICh0aGlzLnNldFN0YXJ0RGF0ZShEYXNoYm9hcmRFbnRyaWVzVGFibGVWaWV3LmdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKHRoaXMuc3RhcnREYXRlcGlja2VyKSkpIHtcbiAgICAvLyAgICAgICAgIHRoaXMubG9hZFJlcG9ydCgpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9LFxuXG4vLyAgICAgaGFuZGxlRW5kRGF0ZUNoYW5nZSgpIHtcbi8vICAgICAgICAgaWYgKHRoaXMuc2V0RW5kRGF0ZShEYXNoYm9hcmRFbnRyaWVzVGFibGVWaWV3LmdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKHRoaXMuZW5kRGF0ZXBpY2tlcikpKSB7XG4vLyAgICAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQoKVxuLy8gICAgICAgICB9XG4vLyAgICAgfSxcblxuICAgIC8vIHNldFN0YXJ0RGF0ZShkYXRlKSB7XG4gICAgLy8gICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA9PSB0aGlzLnN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgdGhpcy5zdGFydERhdGUgPSBkYXRlXG4gICAgLy8gICAgIHRoaXMuc2V0U3RvcmFnZSgnc3RhcnRUaW1lJywgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpKVxuICAgIC8vICAgICB0aGlzLiRzdGFydERhdGUudmFsKENyYWZ0LmZvcm1hdERhdGUodGhpcy5zdGFydERhdGUpKVxuXG4gICAgLy8gICAgIGlmICh0aGlzLmVuZERhdGUgJiYgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpID4gdGhpcy5lbmREYXRlLmdldFRpbWUoKSkge1xuICAgIC8vICAgICAgICAgdGhpcy5zZXRFbmREYXRlKG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlLmdldFRpbWUoKSkpXG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICByZXR1cm4gdHJ1ZVxuICAgIC8vIH0sXG5cbiAgICAvLyBzZXRFbmREYXRlKGRhdGUpIHtcbiAgICAvLyAgICAgaWYgKHRoaXMuZW5kRGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA9PSB0aGlzLmVuZERhdGUuZ2V0VGltZSgpKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIHRoaXMuZW5kRGF0ZSA9IGRhdGVcbiAgICAvLyAgICAgdGhpcy5zZXRTdG9yYWdlKCdlbmRUaW1lJywgdGhpcy5lbmREYXRlLmdldFRpbWUoKSlcbiAgICAvLyAgICAgdGhpcy4kZW5kRGF0ZS52YWwoQ3JhZnQuZm9ybWF0RGF0ZSh0aGlzLmVuZERhdGUpKVxuXG4gICAgLy8gICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLmVuZERhdGUuZ2V0VGltZSgpIDwgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpKSB7XG4gICAgLy8gICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShuZXcgRGF0ZSh0aGlzLmVuZERhdGUuZ2V0VGltZSgpKSlcbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIHJldHVybiB0cnVlXG4gICAgLy8gfSxcblxuLy8gICAgIGxvYWRSZXBvcnQoKSB7XG4vLyAgICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IHRoaXMuc2V0dGluZ3MucGFyYW1zXG5cbi8vICAgICAgICAgcmVxdWVzdERhdGEuc3RhcnREYXRlID0gRGFzaGJvYXJkRW50cmllc1RhYmxlVmlldy5nZXREYXRlVmFsdWUodGhpcy5zdGFydERhdGUpXG4vLyAgICAgICAgIHJlcXVlc3REYXRhLmVuZERhdGUgPSBEYXNoYm9hcmRFbnRyaWVzVGFibGVWaWV3LmdldERhdGVWYWx1ZSh0aGlzLmVuZERhdGUpXG4vLyAgICAgICAgIHJlcXVlc3REYXRhLmZvcm1JZCA9IHRoaXMuZWxlbWVudEluZGV4LiRzb3VyY2UuZGF0YSgnZm9ybS1pZCcpXG5cbi8vICAgICAgICAgdGhpcy4kc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcbi8vICAgICAgICAgdGhpcy4kZXJyb3IuYWRkQ2xhc3MoJ2hpZGRlbicpXG4vLyAgICAgICAgIHRoaXMuJGNoYXJ0LnJlbW92ZUNsYXNzKCdlcnJvcicpXG5cbi8vICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9jaGFydHMvZ2V0LWVudHJpZXMtY291bnQnLCByZXF1ZXN0RGF0YSwgJC5wcm94eShmdW5jdGlvbihyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuLy8gICAgICAgICAgICAgdGhpcy4kc3Bpbm5lci5hZGRDbGFzcygnaGlkZGVuJylcblxuLy8gICAgICAgICAgICAgaWYodGV4dFN0YXR1cyA9PSAnc3VjY2VzcycgJiYgdHlwZW9mKHJlc3BvbnNlLmVycm9yKSA9PSAndW5kZWZpbmVkJykge1xuLy8gICAgICAgICAgICAgICAgIGlmKCF0aGlzLmNoYXJ0KSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcnQgPSBuZXcgQ3JhZnQuY2hhcnRzLkFyZWEodGhpcy4kY2hhcnQpXG4vLyAgICAgICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAgICAgbGV0IGNoYXJ0RGF0YVRhYmxlID0gbmV3IENyYWZ0LmNoYXJ0cy5EYXRhVGFibGUocmVzcG9uc2UuZGF0YVRhYmxlKVxuXG4vLyAgICAgICAgICAgICAgICAgbGV0IGNoYXJ0U2V0dGluZ3MgPSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiByZXNwb25zZS5vcmllbnRhdGlvbixcbi8vICAgICAgICAgICAgICAgICAgICAgZm9ybWF0czogcmVzcG9uc2UuZm9ybWF0cyxcbi8vICAgICAgICAgICAgICAgICAgICAgZGF0YVNjYWxlOiByZXNwb25zZS5zY2FsZSxcbi8vICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiB7IHRvcDogMTAsIHJpZ2h0OiAxMCwgYm90dG9tOiAzMCwgbGVmdDogMTAgfVxuLy8gICAgICAgICAgICAgICAgIH1cblxuXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jaGFydC5zZXR0aW5ncy5mb3JtYXRzID0gcmVzcG9uc2UuZm9ybWF0c1xuXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5jaGFydC5kcmF3KGNoYXJ0RGF0YVRhYmxlLCBjaGFydFNldHRpbmdzKVxuLy8gICAgICAgICAgICAgICAgIHRoaXMuJHRvdGFsVmFsdWUuaHRtbChyZXNwb25zZS50b3RhbEh0bWwpXG5cbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgbGV0IG1zZyA9IENyYWZ0LnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJylcblxuLy8gICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UpICE9ICd1bmRlZmluZWQnICYmIHJlc3BvbnNlICYmIHR5cGVvZihyZXNwb25zZS5lcnJvcikgIT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgbXNnID0gcmVzcG9uc2UuZXJyb3Jcbi8vICAgICAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgICAgICB0aGlzLiRlcnJvci5odG1sKG1zZylcbi8vICAgICAgICAgICAgICAgICB0aGlzLiRlcnJvci5yZW1vdmVDbGFzcygnaGlkZGVuJylcbi8vICAgICAgICAgICAgICAgICB0aGlzLiRjaGFydC5hZGRDbGFzcygnZXJyb3InKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9LCB0aGlzKSk7XG4vLyAgICAgfVxuLy8gfSwge1xuICAgIC8vIHN0b3JhZ2U6IHt9LFxuXG4gICAgLy8gZ2V0U3RvcmFnZShuYW1lc3BhY2UsIGtleSkge1xuICAgIC8vICAgICBpZiAoRGFzaGJvYXJkRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gJiYgRGFzaGJvYXJkRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIERhc2hib2FyZEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdW2tleV1cbiAgICAvLyAgICAgfVxuXG4gICAgLy8gICAgIHJldHVybiBudWxsXG4gICAgLy8gfSxcblxuICAgIC8vIHNldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXksIHZhbHVlKSB7XG4gICAgLy8gICAgIGlmICh0eXBlb2YgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gPT0gdHlwZW9mIHVuZGVmaW5lZCkge1xuICAgIC8vICAgICAgICAgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gPSB7fVxuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSA9IHZhbHVlXG4gICAgLy8gfSxcblxuICAgIC8vIGdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKGluc3QpIHtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBEYXRlKGluc3QuY3VycmVudFllYXIsIGluc3QuY3VycmVudE1vbnRoLCBpbnN0LmN1cnJlbnREYXkpXG4gICAgLy8gfSxcblxuICAgIC8vIGdldERhdGVWYWx1ZShkYXRlKSB7XG4gICAgLy8gICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkrJy0nKyhkYXRlLmdldE1vbnRoKCkrMSkrJy0nK2RhdGUuZ2V0RGF0ZSgpXG4gICAgLy8gfVxuLy8gfSlcblxuXG5sZXQgRGFzaGJvYXJkUmVwb3J0Q2hhcnRcblxuRGFzaGJvYXJkUmVwb3J0Q2hhcnQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRjaGFydEV4cGxvcmVyOiBudWxsLFxuICAgICR0b3RhbFZhbHVlOiBudWxsLFxuICAgICRjaGFydENvbnRhaW5lcjogbnVsbCxcbiAgICAkc3Bpbm5lcjogbnVsbCxcbiAgICAkZXJyb3I6IG51bGwsXG4gICAgJGNoYXJ0OiBudWxsLFxuXG4gICAgcGFyYW1zOiB7XG4gICAgICAgIHN0YXJ0RGF0ZTogbnVsbCxcbiAgICAgICAgZW5kRGF0ZTogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0KGVsKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoZWwpXG4gICAgICAgIHRoaXMuY3JlYXRlQ2hhcnRFeHBsb3JlcigpXG5cbiAgICAgICAgdGhpcy5oYW5kbGVNb250aENoYW5nZSgpXG4gICAgfSxcblxuICAgIGdldFN0b3JhZ2Uoa2V5KSB7XG4gICAgICAgIHJldHVybiBEYXNoYm9hcmRSZXBvcnRDaGFydC5nZXRTdG9yYWdlKHRoaXMuX25hbWVzcGFjZSwga2V5KTtcbiAgICB9LFxuXG4gICAgc2V0U3RvcmFnZShrZXksIHZhbHVlKSB7XG4gICAgICAgIERhc2hib2FyZFJlcG9ydENoYXJ0LnNldFN0b3JhZ2UodGhpcy5fbmFtZXNwYWNlLCBrZXksIHZhbHVlKVxuICAgIH0sXG5cbiAgICBjcmVhdGVDaGFydEV4cGxvcmVyKCkge1xuICAgICAgICBsZXQgJGNoYXJ0RXhwbG9yZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtZXhwbG9yZXJcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRjb250YWluZXIpXG4gICAgICAgIGxldCAkY2hhcnRIZWFkZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtaGVhZGVyXCI+PC9kaXY+JykuYXBwZW5kVG8oJGNoYXJ0RXhwbG9yZXIpXG4gICAgICAgIFxuICAgICAgICBsZXQgJHRpbWVsaW5lUGlja2VyV3JhcHBlciA9ICQoJzxkaXYgY2xhc3M9XCJ0aW1lbGluZS13cmFwcGVyXCIgLz4nKS5hcHBlbmRUbygkY2hhcnRIZWFkZXIpXG5cbiAgICAgICAgbGV0ICR0b3RhbCA9ICQoJzxkaXYgY2xhc3M9XCJ0b3RhbFwiPjwvZGl2PicpLnByZXBlbmRUbygkY2hhcnRIZWFkZXIpXG4gICAgICAgIGxldCAkdG90YWxMYWJlbCA9ICQoJzxkaXYgY2xhc3M9XCJ0b3RhbC1sYWJlbFwiPjxwPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1RvdGFsIFN1Ym1pc3Npb25zJykrJzwvcD48L2Rpdj4nKS5hcHBlbmRUbygkdG90YWwpXG4gICAgICAgIGxldCAkdG90YWxWYWx1ZVdyYXBwZXIgPSAkKCc8ZGl2IGNsYXNzPVwidG90YWwtdmFsdWUtd3JhcHBlclwiPjwvZGl2PicpLnByZXBlbmRUbygkdG90YWwpXG4gICAgICAgIGxldCAkdG90YWxWYWx1ZSA9ICQoJzxzcGFuIGNsYXNzPVwidG90YWwtdmFsdWVcIj4mbmJzcDs8L3NwYW4+JykuYXBwZW5kVG8oJHRvdGFsVmFsdWVXcmFwcGVyKVxuXG4gICAgICAgIHRoaXMuJGNoYXJ0RXhwbG9yZXIgPSAkY2hhcnRFeHBsb3JlclxuICAgICAgICB0aGlzLiR0b3RhbFZhbHVlID0gJHRvdGFsVmFsdWVcbiAgICAgICAgdGhpcy4kY2hhcnRDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtY29udGFpbmVyXCI+PC9kaXY+JykuYXBwZW5kVG8oJGNoYXJ0RXhwbG9yZXIpXG4gICAgICAgIHRoaXMuJHNwaW5uZXIgPSAkKCc8ZGl2IGNsYXNzPVwibG9hZGVyXCI+PHN2ZyB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCA0MiA0MlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHJva2U9XCIjRTlFRkY0XCI+PGcgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+PGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDQgMylcIiBzdHJva2Utd2lkdGg9XCI1XCI+PGNpcmNsZSBzdHJva2Utb3BhY2l0eT1cIi41XCIgY3g9XCIxOFwiIGN5PVwiMThcIiByPVwiMThcIi8+PHBhdGggZD1cIk0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFwiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9XCJ0cmFuc2Zvcm1cIiB0eXBlPVwicm90YXRlXCIgZnJvbT1cIjAgMTggMThcIiB0bz1cIjM2MCAxOCAxOFwiIGR1cj1cIjFzXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIvPjwvcGF0aD48L2c+PC9nPjwvc3ZnPjwvZGl2PicpLnByZXBlbmRUbygkY2hhcnRIZWFkZXIpXG4gICAgICAgIHRoaXMuJGVycm9yID0gJCgnPGRpdiBjbGFzcz1cImVycm9yXCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kY2hhcnRDb250YWluZXIpXG4gICAgICAgIHRoaXMuJGNoYXJ0ID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0XCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kY2hhcnRDb250YWluZXIpXG5cbiAgICAgICAgdGhpcy4kbW9udGhCdG4gPSAkKCc8YnV0dG9uIGlkPVwibW9udGgtcmFuZ2VcIiBjbGFzcz1cImFjdGl2ZVwiPkxhc3QgMzAgZGF5czwvYnV0dG9ucz4nKS5hcHBlbmRUbygkdGltZWxpbmVQaWNrZXJXcmFwcGVyKVxuICAgICAgICB0aGlzLiR3ZWVrQnRuID0gJCgnPGJ1dHRvbiBpZD1cIndlZWstcmFuZ2VcIj5XZWVrPC9idXR0b25zPicpLmFwcGVuZFRvKCR0aW1lbGluZVBpY2tlcldyYXBwZXIpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRtb250aEJ0biwgJ2NsaWNrJywgJ2hhbmRsZU1vbnRoQ2hhbmdlJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiR3ZWVrQnRuLCAnY2xpY2snLCAnaGFuZGxlV2Vla0NoYW5nZScpXG4gICAgfSxcblxuICAgIGhhbmRsZU1vbnRoQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLiR3ZWVrQnRuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLiRtb250aEJ0bi5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSB0aGlzLm1vbnRoUmFuZ2VEYXRlKClcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSkpXG5cbiAgICAgICAgdGhpcy5wYXJhbXMuc3RhcnREYXRlID0gc3RhcnRUaW1lXG4gICAgICAgIHRoaXMucGFyYW1zLmVuZERhdGUgPSBlbmRUaW1lXG5cbiAgICAgICAgdGhpcy5zZXRTdG9yYWdlKCdzdGFydFRpbWUnLCBzdGFydFRpbWUpXG4gICAgICAgIHRoaXMuc2V0U3RvcmFnZSgnZW5kVGltZScsIGVuZFRpbWUpXG5cbiAgICAgICAgdGhpcy5sb2FkUmVwb3J0KClcbiAgICB9LFxuXG4gICAgaGFuZGxlV2Vla0NoYW5nZSgpIHtcbiAgICAgICAgdGhpcy4kbW9udGhCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIHRoaXMuJHdlZWtCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IHRoaXMud2Vla1JhbmdlRGF0ZSgpXG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkpKVxuXG4gICAgICAgIHRoaXMucGFyYW1zLnN0YXJ0RGF0ZSA9IHN0YXJ0VGltZVxuICAgICAgICB0aGlzLnBhcmFtcy5lbmREYXRlID0gZW5kVGltZVxuXG4gICAgICAgIHRoaXMuc2V0U3RvcmFnZSgnc3RhcnRUaW1lJywgc3RhcnRUaW1lKVxuICAgICAgICB0aGlzLnNldFN0b3JhZ2UoJ2VuZFRpbWUnLCBlbmRUaW1lKVxuXG4gICAgICAgIHRoaXMubG9hZFJlcG9ydCgpXG4gICAgfSxcblxuICAgIG1vbnRoUmFuZ2VEYXRlKCkge1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpXG4gICAgICAgIGxldCBwcmlvckRhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpLTMwKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmlvckRhdGVcbiAgICB9LFxuXG4gICAgd2Vla1JhbmdlRGF0ZSgpIHtcbiAgICAgICAgbGV0IGZpcnN0RGF5ID0gbmV3IERhdGUoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSlcbiAgICAgICAgbGV0IHByZXZpb3Vzd2Vlaz0gbmV3IERhdGUoZmlyc3REYXkuZ2V0VGltZSgpIC0gNyAqIDI0ICogNjAgKiA2MCAqIDEwMDApXG5cbiAgICAgICAgcmV0dXJuIHByZXZpb3Vzd2Vla1xuICAgIH0sXG5cblxuICAgIGxvYWRSZXBvcnQoKSB7XG4gICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IHRoaXMucGFyYW1zXG5cbiAgICAgICAgcmVxdWVzdERhdGEuc3RhcnREYXRlID0gdGhpcy5nZXREYXRlVmFsdWUodGhpcy5wYXJhbXMuc3RhcnREYXRlKVxuICAgICAgICByZXF1ZXN0RGF0YS5lbmREYXRlID0gdGhpcy5nZXREYXRlVmFsdWUodGhpcy5wYXJhbXMuZW5kRGF0ZSlcbiAgICAgICAgcmVxdWVzdERhdGEuZWxlbWVudFR5cGUgPSAncm91bmRob3VzZVxcXFxmb3JtYnVpbGRlclxcXFxlbGVtZW50c1xcXFxFbnRyeSdcblxuICAgICAgICB0aGlzLiRzcGlubmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgICB0aGlzLiRlcnJvci5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgdGhpcy4kY2hhcnQucmVtb3ZlQ2xhc3MoJ2Vycm9yJylcblxuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2NoYXJ0cy9nZXQtZW50cmllcy1jb3VudCcsIHJlcXVlc3REYXRhLCAkLnByb3h5KGZ1bmN0aW9uKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLiRzcGlubmVyLmFkZENsYXNzKCdoaWRkZW4nKVxuXG4gICAgICAgICAgICBpZih0ZXh0U3RhdHVzID09ICdzdWNjZXNzJyAmJiB0eXBlb2YocmVzcG9uc2UuZXJyb3IpID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFydCA9IG5ldyBDcmFmdC5jaGFydHMuQXJlYSh0aGlzLiRjaGFydClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hhcnREYXRhVGFibGUgPSBuZXcgQ3JhZnQuY2hhcnRzLkRhdGFUYWJsZShyZXNwb25zZS5kYXRhVGFibGUpXG5cbiAgICAgICAgICAgICAgICBsZXQgY2hhcnRTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246IHJlc3BvbnNlLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRzOiByZXNwb25zZS5mb3JtYXRzLFxuICAgICAgICAgICAgICAgICAgICBkYXRhU2NhbGU6IHJlc3BvbnNlLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IHsgdG9wOiAxMCwgcmlnaHQ6IDEwLCBib3R0b206IDMwLCBsZWZ0OiAxMCB9XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0LnNldHRpbmdzLmZvcm1hdHMgPSByZXNwb25zZS5mb3JtYXRzXG5cbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0LmRyYXcoY2hhcnREYXRhVGFibGUsIGNoYXJ0U2V0dGluZ3MpXG4gICAgICAgICAgICAgICAgdGhpcy4kdG90YWxWYWx1ZS5odG1sKHJlc3BvbnNlLnRvdGFsSHRtbClcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gQ3JhZnQudCgnQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nKVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihyZXNwb25zZSkgIT0gJ3VuZGVmaW5lZCcgJiYgcmVzcG9uc2UgJiYgdHlwZW9mKHJlc3BvbnNlLmVycm9yKSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSByZXNwb25zZS5lcnJvclxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuJGVycm9yLmh0bWwobXNnKVxuICAgICAgICAgICAgICAgIHRoaXMuJGVycm9yLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgIHRoaXMuJGNoYXJ0LmFkZENsYXNzKCdlcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgZ2V0RGF0ZUZyb21EYXRlcGlja2VySW5zdGFuY2UoaW5zdCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoaW5zdC5jdXJyZW50WWVhciwgaW5zdC5jdXJyZW50TW9udGgsIGluc3QuY3VycmVudERheSlcbiAgICB9LFxuXG4gICAgZ2V0RGF0ZVZhbHVlKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSsnLScrKGRhdGUuZ2V0TW9udGgoKSsxKSsnLScrZGF0ZS5nZXREYXRlKClcbiAgICB9XG59LHtcbiAgICBzdG9yYWdlOiB7fSxcblxuICAgIGdldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXkpIHtcbiAgICAgICAgaWYgKERhc2hib2FyZFJlcG9ydENoYXJ0LnN0b3JhZ2VbbmFtZXNwYWNlXSAmJiBEYXNoYm9hcmRSZXBvcnRDaGFydC5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIERhc2hib2FyZFJlcG9ydENoYXJ0LnN0b3JhZ2VbbmFtZXNwYWNlXVtrZXldXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH0sXG5cbiAgICBzZXRTdG9yYWdlKG5hbWVzcGFjZSwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIERhc2hib2FyZFJlcG9ydENoYXJ0LnN0b3JhZ2VbbmFtZXNwYWNlXSA9PSB0eXBlb2YgdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBEYXNoYm9hcmRSZXBvcnRDaGFydC5zdG9yYWdlW25hbWVzcGFjZV0gPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgRGFzaGJvYXJkUmVwb3J0Q2hhcnQuc3RvcmFnZVtuYW1lc3BhY2VdW2tleV0gPSB2YWx1ZVxuICAgIH1cbn0pXG5cblxuXG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgbmV3IERhc2hib2FyZFJlcG9ydENoYXJ0KCQoJy5jaGFydC1leHBsb3Jlci1jb250YWluZXInKSlcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvZGFzaGJvYXJkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==