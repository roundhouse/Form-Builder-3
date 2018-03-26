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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

EntriesIndex = Craft.BaseElementIndex.extend({
    getViewClass: function getViewClass(mode) {
        switch (mode) {
            case 'table':
                return EntriesTableView;
            default:
                return this.base(mode);
        }
    }
});

Craft.registerElementIndexClass('roundhouse\\formbuilder\\elements\\Entry', EntriesIndex);

EntriesTableView = Craft.TableElementIndexView.extend({
    startDate: null,
    endDate: null,

    startDatepicker: null,
    endDatepicker: null,

    $chartExplorer: null,
    $totalValue: null,
    $chartContainer: null,
    $spinner: null,
    $error: null,
    $chart: null,
    $startDate: null,
    $endDate: null,

    afterInit: function afterInit() {
        this.$explorerContainer = $('<div class="chart-explorer-container"></div>').prependTo(this.$container);
        this.createChartExplorer();

        this.base();
    },
    getStorage: function getStorage(key) {
        return EntriesTableView.getStorage(this.elementIndex._namespace, key);
    },
    setStorage: function setStorage(key, value) {
        EntriesTableView.setStorage(this.elementIndex._namespace, key, value);
    },
    createChartExplorer: function createChartExplorer() {
        var $chartExplorer = $('<div class="chart-explorer"></div>').appendTo(this.$explorerContainer);
        var $chartHeader = $('<div class="chart-header"></div>').appendTo($chartExplorer);
        var $dateRange = $('<div class="date-range" />').appendTo($chartHeader);
        var $startDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange);
        var $to = $('<span class="to"><i class="far fa-long-arrow-right"></i></span>').appendTo($dateRange);
        var $endDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange);
        var $total = $('<div class="total"></div>').prependTo($chartHeader);
        var $totalLabel = $('<div class="total-label"><p>' + Craft.t('form-builder', 'Total Submissions') + '</p></div>').appendTo($total);
        var $totalValueWrapper = $('<div class="total-value-wrapper"></div>').prependTo($total);
        var $totalValue = $('<span class="total-value">&nbsp;</span>').appendTo($totalValueWrapper);

        this.$chartExplorer = $chartExplorer;
        this.$totalValue = $totalValue;
        this.$chartContainer = $('<div class="chart-container"></div>').appendTo($chartExplorer);
        this.$spinner = $('<div class="loader"><svg width="20px" height="20px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g fill="none" fill-rule="evenodd"><g transform="translate(4 3)" stroke-width="5"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>').prependTo($chartHeader);
        this.$error = $('<div class="error"></div>').appendTo(this.$chartContainer);
        this.$chart = $('<div class="chart"></div>').appendTo(this.$chartContainer);

        this.$startDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($startDateContainer);
        this.$endDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($endDateContainer);

        this.$startDate.datepicker($.extend({
            onSelect: $.proxy(this, 'handleStartDateChange')
        }, Craft.datepickerOptions));

        this.$endDate.datepicker($.extend({
            onSelect: $.proxy(this, 'handleEndDateChange')
        }, Craft.datepickerOptions));

        this.startDatepicker = this.$startDate.data('datepicker');
        this.endDatepicker = this.$endDate.data('datepicker');

        this.addListener(this.$startDate, 'keyup', 'handleStartDateChange');
        this.addListener(this.$endDate, 'keyup', 'handleEndDateChange');

        var startTime = this.getStorage('startTime') || new Date().getTime() - 60 * 60 * 24 * 30 * 1000;
        var endTime = this.getStorage('endTime') || new Date().getTime();

        this.setStartDate(new Date(startTime));
        this.setEndDate(new Date(endTime));

        this.loadReport();
    },
    handleStartDateChange: function handleStartDateChange() {
        if (this.setStartDate(EntriesTableView.getDateFromDatepickerInstance(this.startDatepicker))) {
            this.loadReport();
        }
    },
    handleEndDateChange: function handleEndDateChange() {
        if (this.setEndDate(EntriesTableView.getDateFromDatepickerInstance(this.endDatepicker))) {
            this.loadReport();
        }
    },
    setStartDate: function setStartDate(date) {
        if (this.startDate && date.getTime() == this.startDate.getTime()) {
            return false;
        }

        this.startDate = date;
        this.setStorage('startTime', this.startDate.getTime());
        this.$startDate.val(Craft.formatDate(this.startDate));

        if (this.endDate && this.startDate.getTime() > this.endDate.getTime()) {
            this.setEndDate(new Date(this.startDate.getTime()));
        }

        return true;
    },
    setEndDate: function setEndDate(date) {
        if (this.endDate && date.getTime() == this.endDate.getTime()) {
            return false;
        }

        this.endDate = date;
        this.setStorage('endTime', this.endDate.getTime());
        this.$endDate.val(Craft.formatDate(this.endDate));

        if (this.startDate && this.endDate.getTime() < this.startDate.getTime()) {
            this.setStartDate(new Date(this.endDate.getTime()));
        }

        return true;
    },
    loadReport: function loadReport() {
        var requestData = this.settings.params;

        requestData.startDate = EntriesTableView.getDateValue(this.startDate);
        requestData.endDate = EntriesTableView.getDateValue(this.endDate);
        requestData.formId = this.elementIndex.$source.data('form-id');

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
    }
}, {
    storage: {},

    getStorage: function getStorage(namespace, key) {
        if (EntriesTableView.storage[namespace] && EntriesTableView.storage[namespace][key]) {
            return EntriesTableView.storage[namespace][key];
        }

        return null;
    },
    setStorage: function setStorage(namespace, key, value) {
        if (_typeof(EntriesTableView.storage[namespace]) == ( true ? 'undefined' : _typeof(undefined))) {
            EntriesTableView.storage[namespace] = {};
        }

        EntriesTableView.storage[namespace][key] = value;
    },
    getDateFromDatepickerInstance: function getDateFromDatepickerInstance(inst) {
        return new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
    },
    getDateValue: function getDateValue(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM4MDU3NDlmMmIxYWM3ZTM5M2QiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvY2hhcnRzLmpzIl0sIm5hbWVzIjpbIkVudHJpZXNJbmRleCIsIkNyYWZ0IiwiQmFzZUVsZW1lbnRJbmRleCIsImV4dGVuZCIsImdldFZpZXdDbGFzcyIsIm1vZGUiLCJFbnRyaWVzVGFibGVWaWV3IiwiYmFzZSIsInJlZ2lzdGVyRWxlbWVudEluZGV4Q2xhc3MiLCJUYWJsZUVsZW1lbnRJbmRleFZpZXciLCJzdGFydERhdGUiLCJlbmREYXRlIiwic3RhcnREYXRlcGlja2VyIiwiZW5kRGF0ZXBpY2tlciIsIiRjaGFydEV4cGxvcmVyIiwiJHRvdGFsVmFsdWUiLCIkY2hhcnRDb250YWluZXIiLCIkc3Bpbm5lciIsIiRlcnJvciIsIiRjaGFydCIsIiRzdGFydERhdGUiLCIkZW5kRGF0ZSIsImFmdGVySW5pdCIsIiRleHBsb3JlckNvbnRhaW5lciIsIiQiLCJwcmVwZW5kVG8iLCIkY29udGFpbmVyIiwiY3JlYXRlQ2hhcnRFeHBsb3JlciIsImdldFN0b3JhZ2UiLCJrZXkiLCJlbGVtZW50SW5kZXgiLCJfbmFtZXNwYWNlIiwic2V0U3RvcmFnZSIsInZhbHVlIiwiYXBwZW5kVG8iLCIkY2hhcnRIZWFkZXIiLCIkZGF0ZVJhbmdlIiwiJHN0YXJ0RGF0ZUNvbnRhaW5lciIsIiR0byIsIiRlbmREYXRlQ29udGFpbmVyIiwiJHRvdGFsIiwiJHRvdGFsTGFiZWwiLCJ0IiwiJHRvdGFsVmFsdWVXcmFwcGVyIiwiZGF0ZXBpY2tlciIsIm9uU2VsZWN0IiwicHJveHkiLCJkYXRlcGlja2VyT3B0aW9ucyIsImRhdGEiLCJhZGRMaXN0ZW5lciIsInN0YXJ0VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiZW5kVGltZSIsInNldFN0YXJ0RGF0ZSIsInNldEVuZERhdGUiLCJsb2FkUmVwb3J0IiwiaGFuZGxlU3RhcnREYXRlQ2hhbmdlIiwiZ2V0RGF0ZUZyb21EYXRlcGlja2VySW5zdGFuY2UiLCJoYW5kbGVFbmREYXRlQ2hhbmdlIiwiZGF0ZSIsInZhbCIsImZvcm1hdERhdGUiLCJyZXF1ZXN0RGF0YSIsInNldHRpbmdzIiwicGFyYW1zIiwiZ2V0RGF0ZVZhbHVlIiwiZm9ybUlkIiwiJHNvdXJjZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsImVycm9yIiwiY2hhcnQiLCJjaGFydHMiLCJBcmVhIiwiY2hhcnREYXRhVGFibGUiLCJEYXRhVGFibGUiLCJkYXRhVGFibGUiLCJjaGFydFNldHRpbmdzIiwib3JpZW50YXRpb24iLCJmb3JtYXRzIiwiZGF0YVNjYWxlIiwic2NhbGUiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJkcmF3IiwiaHRtbCIsInRvdGFsSHRtbCIsIm1zZyIsInN0b3JhZ2UiLCJuYW1lc3BhY2UiLCJ1bmRlZmluZWQiLCJpbnN0IiwiY3VycmVudFllYXIiLCJjdXJyZW50TW9udGgiLCJjdXJyZW50RGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBQSxlQUFlQyxNQUFNQyxnQkFBTixDQUF1QkMsTUFBdkIsQ0FBOEI7QUFDekNDLGdCQUR5Qyx3QkFDNUJDLElBRDRCLEVBQ3RCO0FBQ2YsZ0JBQVFBLElBQVI7QUFDSSxpQkFBSyxPQUFMO0FBQ0ksdUJBQU9DLGdCQUFQO0FBQ0o7QUFDSSx1QkFBTyxLQUFLQyxJQUFMLENBQVVGLElBQVYsQ0FBUDtBQUpSO0FBTUg7QUFSd0MsQ0FBOUIsQ0FBZjs7QUFXQUosTUFBTU8seUJBQU4sQ0FBZ0MsMENBQWhDLEVBQTRFUixZQUE1RTs7QUFFQU0sbUJBQW1CTCxNQUFNUSxxQkFBTixDQUE0Qk4sTUFBNUIsQ0FBbUM7QUFDbERPLGVBQVcsSUFEdUM7QUFFbERDLGFBQVMsSUFGeUM7O0FBSWxEQyxxQkFBaUIsSUFKaUM7QUFLbERDLG1CQUFlLElBTG1DOztBQU9sREMsb0JBQWdCLElBUGtDO0FBUWxEQyxpQkFBYSxJQVJxQztBQVNsREMscUJBQWlCLElBVGlDO0FBVWxEQyxjQUFVLElBVndDO0FBV2xEQyxZQUFRLElBWDBDO0FBWWxEQyxZQUFRLElBWjBDO0FBYWxEQyxnQkFBWSxJQWJzQztBQWNsREMsY0FBVSxJQWR3Qzs7QUFnQmxEQyxhQWhCa0QsdUJBZ0J0QztBQUNSLGFBQUtDLGtCQUFMLEdBQTBCQyxFQUFFLDhDQUFGLEVBQWtEQyxTQUFsRCxDQUE0RCxLQUFLQyxVQUFqRSxDQUExQjtBQUNBLGFBQUtDLG1CQUFMOztBQUVBLGFBQUtwQixJQUFMO0FBQ0gsS0FyQmlEO0FBdUJsRHFCLGNBdkJrRCxzQkF1QnZDQyxHQXZCdUMsRUF1QmxDO0FBQ1osZUFBT3ZCLGlCQUFpQnNCLFVBQWpCLENBQTRCLEtBQUtFLFlBQUwsQ0FBa0JDLFVBQTlDLEVBQTBERixHQUExRCxDQUFQO0FBQ0gsS0F6QmlEO0FBMkJsREcsY0EzQmtELHNCQTJCdkNILEdBM0J1QyxFQTJCbENJLEtBM0JrQyxFQTJCM0I7QUFDbkIzQix5QkFBaUIwQixVQUFqQixDQUE0QixLQUFLRixZQUFMLENBQWtCQyxVQUE5QyxFQUEwREYsR0FBMUQsRUFBK0RJLEtBQS9EO0FBQ0gsS0E3QmlEO0FBK0JsRE4sdUJBL0JrRCxpQ0ErQjVCO0FBQ2xCLFlBQUliLGlCQUFpQlUsRUFBRSxvQ0FBRixFQUF3Q1UsUUFBeEMsQ0FBaUQsS0FBS1gsa0JBQXRELENBQXJCO0FBQ0EsWUFBSVksZUFBZVgsRUFBRSxrQ0FBRixFQUFzQ1UsUUFBdEMsQ0FBK0NwQixjQUEvQyxDQUFuQjtBQUNBLFlBQUlzQixhQUFhWixFQUFFLDRCQUFGLEVBQWdDVSxRQUFoQyxDQUF5Q0MsWUFBekMsQ0FBakI7QUFDQSxZQUFJRSxzQkFBc0JiLEVBQUUsaUNBQUYsRUFBcUNVLFFBQXJDLENBQThDRSxVQUE5QyxDQUExQjtBQUNBLFlBQUlFLE1BQU1kLEVBQUUsaUVBQUYsRUFBcUVVLFFBQXJFLENBQThFRSxVQUE5RSxDQUFWO0FBQ0EsWUFBSUcsb0JBQW9CZixFQUFFLGlDQUFGLEVBQXFDVSxRQUFyQyxDQUE4Q0UsVUFBOUMsQ0FBeEI7QUFDQSxZQUFJSSxTQUFTaEIsRUFBRSwyQkFBRixFQUErQkMsU0FBL0IsQ0FBeUNVLFlBQXpDLENBQWI7QUFDQSxZQUFJTSxjQUFjakIsRUFBRSxpQ0FBK0J2QixNQUFNeUMsQ0FBTixDQUFRLGNBQVIsRUFBd0IsbUJBQXhCLENBQS9CLEdBQTRFLFlBQTlFLEVBQTRGUixRQUE1RixDQUFxR00sTUFBckcsQ0FBbEI7QUFDQSxZQUFJRyxxQkFBcUJuQixFQUFFLHlDQUFGLEVBQTZDQyxTQUE3QyxDQUF1RGUsTUFBdkQsQ0FBekI7QUFDQSxZQUFJekIsY0FBY1MsRUFBRSx5Q0FBRixFQUE2Q1UsUUFBN0MsQ0FBc0RTLGtCQUF0RCxDQUFsQjs7QUFFQSxhQUFLN0IsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLGFBQUtDLGVBQUwsR0FBdUJRLEVBQUUscUNBQUYsRUFBeUNVLFFBQXpDLENBQWtEcEIsY0FBbEQsQ0FBdkI7QUFDQSxhQUFLRyxRQUFMLEdBQWdCTyxFQUFFLGdjQUFGLEVBQW9jQyxTQUFwYyxDQUE4Y1UsWUFBOWMsQ0FBaEI7QUFDQSxhQUFLakIsTUFBTCxHQUFjTSxFQUFFLDJCQUFGLEVBQStCVSxRQUEvQixDQUF3QyxLQUFLbEIsZUFBN0MsQ0FBZDtBQUNBLGFBQUtHLE1BQUwsR0FBY0ssRUFBRSwyQkFBRixFQUErQlUsUUFBL0IsQ0FBd0MsS0FBS2xCLGVBQTdDLENBQWQ7O0FBRUEsYUFBS0ksVUFBTCxHQUFrQkksRUFBRSxpRUFBRixFQUFxRVUsUUFBckUsQ0FBOEVHLG1CQUE5RSxDQUFsQjtBQUNBLGFBQUtoQixRQUFMLEdBQWdCRyxFQUFFLGlFQUFGLEVBQXFFVSxRQUFyRSxDQUE4RUssaUJBQTlFLENBQWhCOztBQUVBLGFBQUtuQixVQUFMLENBQWdCd0IsVUFBaEIsQ0FBMkJwQixFQUFFckIsTUFBRixDQUFTO0FBQ2hDMEMsc0JBQVVyQixFQUFFc0IsS0FBRixDQUFRLElBQVIsRUFBYyx1QkFBZDtBQURzQixTQUFULEVBRXhCN0MsTUFBTThDLGlCQUZrQixDQUEzQjs7QUFJQSxhQUFLMUIsUUFBTCxDQUFjdUIsVUFBZCxDQUF5QnBCLEVBQUVyQixNQUFGLENBQVM7QUFDOUIwQyxzQkFBVXJCLEVBQUVzQixLQUFGLENBQVEsSUFBUixFQUFjLHFCQUFkO0FBRG9CLFNBQVQsRUFFdEI3QyxNQUFNOEMsaUJBRmdCLENBQXpCOztBQUlBLGFBQUtuQyxlQUFMLEdBQXVCLEtBQUtRLFVBQUwsQ0FBZ0I0QixJQUFoQixDQUFxQixZQUFyQixDQUF2QjtBQUNBLGFBQUtuQyxhQUFMLEdBQXFCLEtBQUtRLFFBQUwsQ0FBYzJCLElBQWQsQ0FBbUIsWUFBbkIsQ0FBckI7O0FBRUEsYUFBS0MsV0FBTCxDQUFpQixLQUFLN0IsVUFBdEIsRUFBa0MsT0FBbEMsRUFBMkMsdUJBQTNDO0FBQ0EsYUFBSzZCLFdBQUwsQ0FBaUIsS0FBSzVCLFFBQXRCLEVBQWdDLE9BQWhDLEVBQXlDLHFCQUF6Qzs7QUFFQSxZQUFJNkIsWUFBWSxLQUFLdEIsVUFBTCxDQUFnQixXQUFoQixLQUFrQyxJQUFJdUIsSUFBSixFQUFELENBQWFDLE9BQWIsS0FBMEIsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLEVBQWYsR0FBb0IsSUFBL0Y7QUFDQSxZQUFJQyxVQUFVLEtBQUt6QixVQUFMLENBQWdCLFNBQWhCLEtBQWdDLElBQUl1QixJQUFKLEVBQUQsQ0FBYUMsT0FBYixFQUE3Qzs7QUFFQSxhQUFLRSxZQUFMLENBQWtCLElBQUlILElBQUosQ0FBU0QsU0FBVCxDQUFsQjtBQUNBLGFBQUtLLFVBQUwsQ0FBZ0IsSUFBSUosSUFBSixDQUFTRSxPQUFULENBQWhCOztBQUVBLGFBQUtHLFVBQUw7QUFDSCxLQTFFaUQ7QUE0RWxEQyx5QkE1RWtELG1DQTRFMUI7QUFDcEIsWUFBSSxLQUFLSCxZQUFMLENBQWtCaEQsaUJBQWlCb0QsNkJBQWpCLENBQStDLEtBQUs5QyxlQUFwRCxDQUFsQixDQUFKLEVBQTZGO0FBQ3pGLGlCQUFLNEMsVUFBTDtBQUNIO0FBQ0osS0FoRmlEO0FBa0ZsREcsdUJBbEZrRCxpQ0FrRjVCO0FBQ2xCLFlBQUksS0FBS0osVUFBTCxDQUFnQmpELGlCQUFpQm9ELDZCQUFqQixDQUErQyxLQUFLN0MsYUFBcEQsQ0FBaEIsQ0FBSixFQUF5RjtBQUNyRixpQkFBSzJDLFVBQUw7QUFDSDtBQUNKLEtBdEZpRDtBQXdGbERGLGdCQXhGa0Qsd0JBd0ZyQ00sSUF4RnFDLEVBd0YvQjtBQUNmLFlBQUksS0FBS2xELFNBQUwsSUFBa0JrRCxLQUFLUixPQUFMLE1BQWtCLEtBQUsxQyxTQUFMLENBQWUwQyxPQUFmLEVBQXhDLEVBQWtFO0FBQzlELG1CQUFPLEtBQVA7QUFDSDs7QUFFRCxhQUFLMUMsU0FBTCxHQUFpQmtELElBQWpCO0FBQ0EsYUFBSzVCLFVBQUwsQ0FBZ0IsV0FBaEIsRUFBNkIsS0FBS3RCLFNBQUwsQ0FBZTBDLE9BQWYsRUFBN0I7QUFDQSxhQUFLaEMsVUFBTCxDQUFnQnlDLEdBQWhCLENBQW9CNUQsTUFBTTZELFVBQU4sQ0FBaUIsS0FBS3BELFNBQXRCLENBQXBCOztBQUVBLFlBQUksS0FBS0MsT0FBTCxJQUFnQixLQUFLRCxTQUFMLENBQWUwQyxPQUFmLEtBQTJCLEtBQUt6QyxPQUFMLENBQWF5QyxPQUFiLEVBQS9DLEVBQXVFO0FBQ25FLGlCQUFLRyxVQUFMLENBQWdCLElBQUlKLElBQUosQ0FBUyxLQUFLekMsU0FBTCxDQUFlMEMsT0FBZixFQUFULENBQWhCO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBQ0gsS0F0R2lEO0FBd0dsREcsY0F4R2tELHNCQXdHdkNLLElBeEd1QyxFQXdHakM7QUFDYixZQUFJLEtBQUtqRCxPQUFMLElBQWdCaUQsS0FBS1IsT0FBTCxNQUFrQixLQUFLekMsT0FBTCxDQUFheUMsT0FBYixFQUF0QyxFQUE4RDtBQUMxRCxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsYUFBS3pDLE9BQUwsR0FBZWlELElBQWY7QUFDQSxhQUFLNUIsVUFBTCxDQUFnQixTQUFoQixFQUEyQixLQUFLckIsT0FBTCxDQUFheUMsT0FBYixFQUEzQjtBQUNBLGFBQUsvQixRQUFMLENBQWN3QyxHQUFkLENBQWtCNUQsTUFBTTZELFVBQU4sQ0FBaUIsS0FBS25ELE9BQXRCLENBQWxCOztBQUVBLFlBQUksS0FBS0QsU0FBTCxJQUFrQixLQUFLQyxPQUFMLENBQWF5QyxPQUFiLEtBQXlCLEtBQUsxQyxTQUFMLENBQWUwQyxPQUFmLEVBQS9DLEVBQXlFO0FBQ3JFLGlCQUFLRSxZQUFMLENBQWtCLElBQUlILElBQUosQ0FBUyxLQUFLeEMsT0FBTCxDQUFheUMsT0FBYixFQUFULENBQWxCO0FBQ0g7O0FBRUQsZUFBTyxJQUFQO0FBQ0gsS0F0SGlEO0FBd0hsREksY0F4SGtELHdCQXdIckM7QUFDVCxZQUFJTyxjQUFjLEtBQUtDLFFBQUwsQ0FBY0MsTUFBaEM7O0FBRUFGLG9CQUFZckQsU0FBWixHQUF3QkosaUJBQWlCNEQsWUFBakIsQ0FBOEIsS0FBS3hELFNBQW5DLENBQXhCO0FBQ0FxRCxvQkFBWXBELE9BQVosR0FBc0JMLGlCQUFpQjRELFlBQWpCLENBQThCLEtBQUt2RCxPQUFuQyxDQUF0QjtBQUNBb0Qsb0JBQVlJLE1BQVosR0FBcUIsS0FBS3JDLFlBQUwsQ0FBa0JzQyxPQUFsQixDQUEwQnBCLElBQTFCLENBQStCLFNBQS9CLENBQXJCOztBQUVBLGFBQUsvQixRQUFMLENBQWNvRCxXQUFkLENBQTBCLFFBQTFCO0FBQ0EsYUFBS25ELE1BQUwsQ0FBWW9ELFFBQVosQ0FBcUIsUUFBckI7QUFDQSxhQUFLbkQsTUFBTCxDQUFZa0QsV0FBWixDQUF3QixPQUF4Qjs7QUFFQXBFLGNBQU1zRSxpQkFBTixDQUF3Qix1Q0FBeEIsRUFBaUVSLFdBQWpFLEVBQThFdkMsRUFBRXNCLEtBQUYsQ0FBUSxVQUFTMEIsUUFBVCxFQUFtQkMsVUFBbkIsRUFBK0I7QUFDakgsaUJBQUt4RCxRQUFMLENBQWNxRCxRQUFkLENBQXVCLFFBQXZCOztBQUVBLGdCQUFHRyxjQUFjLFNBQWQsSUFBMkIsT0FBT0QsU0FBU0UsS0FBaEIsSUFBMEIsV0FBeEQsRUFBcUU7QUFDakUsb0JBQUcsQ0FBQyxLQUFLQyxLQUFULEVBQWdCO0FBQ1oseUJBQUtBLEtBQUwsR0FBYSxJQUFJMUUsTUFBTTJFLE1BQU4sQ0FBYUMsSUFBakIsQ0FBc0IsS0FBSzFELE1BQTNCLENBQWI7QUFDSDs7QUFFRCxvQkFBSTJELGlCQUFpQixJQUFJN0UsTUFBTTJFLE1BQU4sQ0FBYUcsU0FBakIsQ0FBMkJQLFNBQVNRLFNBQXBDLENBQXJCOztBQUVBLG9CQUFJQyxnQkFBZ0I7QUFDaEJDLGlDQUFhVixTQUFTVSxXQUROO0FBRWhCQyw2QkFBU1gsU0FBU1csT0FGRjtBQUdoQkMsK0JBQVdaLFNBQVNhLEtBSEo7QUFJaEJDLDRCQUFRLEVBQUVDLEtBQUssRUFBUCxFQUFXQyxPQUFPLEVBQWxCLEVBQXNCQyxRQUFRLEVBQTlCLEVBQWtDQyxNQUFNLEVBQXhDO0FBSlEsaUJBQXBCOztBQVFBLHFCQUFLZixLQUFMLENBQVdYLFFBQVgsQ0FBb0JtQixPQUFwQixHQUE4QlgsU0FBU1csT0FBdkM7O0FBRUEscUJBQUtSLEtBQUwsQ0FBV2dCLElBQVgsQ0FBZ0JiLGNBQWhCLEVBQWdDRyxhQUFoQztBQUNBLHFCQUFLbEUsV0FBTCxDQUFpQjZFLElBQWpCLENBQXNCcEIsU0FBU3FCLFNBQS9CO0FBRUgsYUFwQkQsTUFvQk87QUFDSCxvQkFBSUMsTUFBTTdGLE1BQU15QyxDQUFOLENBQVEsNEJBQVIsQ0FBVjs7QUFFQSxvQkFBSSxPQUFPOEIsUUFBUCxJQUFvQixXQUFwQixJQUFtQ0EsUUFBbkMsSUFBK0MsT0FBT0EsU0FBU0UsS0FBaEIsSUFBMEIsV0FBN0UsRUFBMEY7QUFDdEZvQiwwQkFBTXRCLFNBQVNFLEtBQWY7QUFDSDs7QUFFRCxxQkFBS3hELE1BQUwsQ0FBWTBFLElBQVosQ0FBaUJFLEdBQWpCO0FBQ0EscUJBQUs1RSxNQUFMLENBQVltRCxXQUFaLENBQXdCLFFBQXhCO0FBQ0EscUJBQUtsRCxNQUFMLENBQVltRCxRQUFaLENBQXFCLE9BQXJCO0FBQ0g7QUFDSixTQWxDNkUsRUFrQzNFLElBbEMyRSxDQUE5RTtBQW1DSDtBQXRLaUQsQ0FBbkMsRUF1S2hCO0FBQ0N5QixhQUFTLEVBRFY7O0FBR0NuRSxjQUhELHNCQUdZb0UsU0FIWixFQUd1Qm5FLEdBSHZCLEVBRzRCO0FBQ3ZCLFlBQUl2QixpQkFBaUJ5RixPQUFqQixDQUF5QkMsU0FBekIsS0FBdUMxRixpQkFBaUJ5RixPQUFqQixDQUF5QkMsU0FBekIsRUFBb0NuRSxHQUFwQyxDQUEzQyxFQUFxRjtBQUNqRixtQkFBT3ZCLGlCQUFpQnlGLE9BQWpCLENBQXlCQyxTQUF6QixFQUFvQ25FLEdBQXBDLENBQVA7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLQVRGO0FBV0NHLGNBWEQsc0JBV1lnRSxTQVhaLEVBV3VCbkUsR0FYdkIsRUFXNEJJLEtBWDVCLEVBV21DO0FBQzlCLFlBQUksUUFBTzNCLGlCQUFpQnlGLE9BQWpCLENBQXlCQyxTQUF6QixDQUFQLG9DQUFxREMsU0FBckQsRUFBSixFQUFvRTtBQUNoRTNGLDZCQUFpQnlGLE9BQWpCLENBQXlCQyxTQUF6QixJQUFzQyxFQUF0QztBQUNIOztBQUVEMUYseUJBQWlCeUYsT0FBakIsQ0FBeUJDLFNBQXpCLEVBQW9DbkUsR0FBcEMsSUFBMkNJLEtBQTNDO0FBQ0gsS0FqQkY7QUFtQkN5QixpQ0FuQkQseUNBbUIrQndDLElBbkIvQixFQW1CcUM7QUFDaEMsZUFBTyxJQUFJL0MsSUFBSixDQUFTK0MsS0FBS0MsV0FBZCxFQUEyQkQsS0FBS0UsWUFBaEMsRUFBOENGLEtBQUtHLFVBQW5ELENBQVA7QUFDSCxLQXJCRjtBQXVCQ25DLGdCQXZCRCx3QkF1QmNOLElBdkJkLEVBdUJvQjtBQUNmLGVBQU9BLEtBQUswQyxXQUFMLEtBQW1CLEdBQW5CLElBQXdCMUMsS0FBSzJDLFFBQUwsS0FBZ0IsQ0FBeEMsSUFBMkMsR0FBM0MsR0FBK0MzQyxLQUFLNEMsT0FBTCxFQUF0RDtBQUNIO0FBekJGLENBdktnQixDQUFuQixDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy9hc3NldHMvanMvY2hhcnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODM4MDU3NDlmMmIxYWM3ZTM5M2QiLCJFbnRyaWVzSW5kZXggPSBDcmFmdC5CYXNlRWxlbWVudEluZGV4LmV4dGVuZCh7XG4gICAgZ2V0Vmlld0NsYXNzKG1vZGUpIHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVudHJpZXNUYWJsZVZpZXdcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFzZShtb2RlKVxuICAgICAgICB9XG4gICAgfSxcbn0pXG5cbkNyYWZ0LnJlZ2lzdGVyRWxlbWVudEluZGV4Q2xhc3MoJ3JvdW5kaG91c2VcXFxcZm9ybWJ1aWxkZXJcXFxcZWxlbWVudHNcXFxcRW50cnknLCBFbnRyaWVzSW5kZXgpXG5cbkVudHJpZXNUYWJsZVZpZXcgPSBDcmFmdC5UYWJsZUVsZW1lbnRJbmRleFZpZXcuZXh0ZW5kKHtcbiAgICBzdGFydERhdGU6IG51bGwsXG4gICAgZW5kRGF0ZTogbnVsbCxcblxuICAgIHN0YXJ0RGF0ZXBpY2tlcjogbnVsbCxcbiAgICBlbmREYXRlcGlja2VyOiBudWxsLFxuXG4gICAgJGNoYXJ0RXhwbG9yZXI6IG51bGwsXG4gICAgJHRvdGFsVmFsdWU6IG51bGwsXG4gICAgJGNoYXJ0Q29udGFpbmVyOiBudWxsLFxuICAgICRzcGlubmVyOiBudWxsLFxuICAgICRlcnJvcjogbnVsbCxcbiAgICAkY2hhcnQ6IG51bGwsXG4gICAgJHN0YXJ0RGF0ZTogbnVsbCxcbiAgICAkZW5kRGF0ZTogbnVsbCxcblxuICAgIGFmdGVySW5pdCgpIHtcbiAgICAgICAgdGhpcy4kZXhwbG9yZXJDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtZXhwbG9yZXItY29udGFpbmVyXCI+PC9kaXY+JykucHJlcGVuZFRvKHRoaXMuJGNvbnRhaW5lcilcbiAgICAgICAgdGhpcy5jcmVhdGVDaGFydEV4cGxvcmVyKClcblxuICAgICAgICB0aGlzLmJhc2UoKVxuICAgIH0sXG5cbiAgICBnZXRTdG9yYWdlKGtleSkge1xuICAgICAgICByZXR1cm4gRW50cmllc1RhYmxlVmlldy5nZXRTdG9yYWdlKHRoaXMuZWxlbWVudEluZGV4Ll9uYW1lc3BhY2UsIGtleSk7XG4gICAgfSxcblxuICAgIHNldFN0b3JhZ2Uoa2V5LCB2YWx1ZSkge1xuICAgICAgICBFbnRyaWVzVGFibGVWaWV3LnNldFN0b3JhZ2UodGhpcy5lbGVtZW50SW5kZXguX25hbWVzcGFjZSwga2V5LCB2YWx1ZSlcbiAgICB9LFxuXG4gICAgY3JlYXRlQ2hhcnRFeHBsb3JlcigpIHtcbiAgICAgICAgbGV0ICRjaGFydEV4cGxvcmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWV4cGxvcmVyXCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kZXhwbG9yZXJDb250YWluZXIpXG4gICAgICAgIGxldCAkY2hhcnRIZWFkZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnQtaGVhZGVyXCI+PC9kaXY+JykuYXBwZW5kVG8oJGNoYXJ0RXhwbG9yZXIpXG4gICAgICAgIGxldCAkZGF0ZVJhbmdlID0gJCgnPGRpdiBjbGFzcz1cImRhdGUtcmFuZ2VcIiAvPicpLmFwcGVuZFRvKCRjaGFydEhlYWRlcilcbiAgICAgICAgbGV0ICRzdGFydERhdGVDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiZGF0ZXdyYXBwZXJcIj48L2Rpdj4nKS5hcHBlbmRUbygkZGF0ZVJhbmdlKVxuICAgICAgICBsZXQgJHRvID0gJCgnPHNwYW4gY2xhc3M9XCJ0b1wiPjxpIGNsYXNzPVwiZmFyIGZhLWxvbmctYXJyb3ctcmlnaHRcIj48L2k+PC9zcGFuPicpLmFwcGVuZFRvKCRkYXRlUmFuZ2UpXG4gICAgICAgIGxldCAkZW5kRGF0ZUNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJkYXRld3JhcHBlclwiPjwvZGl2PicpLmFwcGVuZFRvKCRkYXRlUmFuZ2UpXG4gICAgICAgIGxldCAkdG90YWwgPSAkKCc8ZGl2IGNsYXNzPVwidG90YWxcIj48L2Rpdj4nKS5wcmVwZW5kVG8oJGNoYXJ0SGVhZGVyKVxuICAgICAgICBsZXQgJHRvdGFsTGFiZWwgPSAkKCc8ZGl2IGNsYXNzPVwidG90YWwtbGFiZWxcIj48cD4nK0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdUb3RhbCBTdWJtaXNzaW9ucycpKyc8L3A+PC9kaXY+JykuYXBwZW5kVG8oJHRvdGFsKVxuICAgICAgICBsZXQgJHRvdGFsVmFsdWVXcmFwcGVyID0gJCgnPGRpdiBjbGFzcz1cInRvdGFsLXZhbHVlLXdyYXBwZXJcIj48L2Rpdj4nKS5wcmVwZW5kVG8oJHRvdGFsKVxuICAgICAgICBsZXQgJHRvdGFsVmFsdWUgPSAkKCc8c3BhbiBjbGFzcz1cInRvdGFsLXZhbHVlXCI+Jm5ic3A7PC9zcGFuPicpLmFwcGVuZFRvKCR0b3RhbFZhbHVlV3JhcHBlcilcblxuICAgICAgICB0aGlzLiRjaGFydEV4cGxvcmVyID0gJGNoYXJ0RXhwbG9yZXJcbiAgICAgICAgdGhpcy4kdG90YWxWYWx1ZSA9ICR0b3RhbFZhbHVlXG4gICAgICAgIHRoaXMuJGNoYXJ0Q29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWNvbnRhaW5lclwiPjwvZGl2PicpLmFwcGVuZFRvKCRjaGFydEV4cGxvcmVyKVxuICAgICAgICB0aGlzLiRzcGlubmVyID0gJCgnPGRpdiBjbGFzcz1cImxvYWRlclwiPjxzdmcgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMjBweFwiIHZpZXdCb3g9XCIwIDAgNDIgNDJcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3Ryb2tlPVwiI2ZmZmZmZlwiPjxnIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg0IDMpXCIgc3Ryb2tlLXdpZHRoPVwiNVwiPjxjaXJjbGUgc3Ryb2tlLW9wYWNpdHk9XCIuNVwiIGN4PVwiMThcIiBjeT1cIjE4XCIgcj1cIjE4XCIvPjxwYXRoIGQ9XCJNMzYgMThjMC05Ljk0LTguMDYtMTgtMTgtMThcIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIGZyb209XCIwIDE4IDE4XCIgdG89XCIzNjAgMTggMThcIiBkdXI9XCIxc1wiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiLz48L3BhdGg+PC9nPjwvZz48L3N2Zz48L2Rpdj4nKS5wcmVwZW5kVG8oJGNoYXJ0SGVhZGVyKVxuICAgICAgICB0aGlzLiRlcnJvciA9ICQoJzxkaXYgY2xhc3M9XCJlcnJvclwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGNoYXJ0Q29udGFpbmVyKVxuICAgICAgICB0aGlzLiRjaGFydCA9ICQoJzxkaXYgY2xhc3M9XCJjaGFydFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGNoYXJ0Q29udGFpbmVyKVxuXG4gICAgICAgIHRoaXMuJHN0YXJ0RGF0ZSA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHNpemU9XCIyMFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+JykuYXBwZW5kVG8oJHN0YXJ0RGF0ZUNvbnRhaW5lcilcbiAgICAgICAgdGhpcy4kZW5kRGF0ZSA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dFwiIHNpemU9XCIyMFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIC8+JykuYXBwZW5kVG8oJGVuZERhdGVDb250YWluZXIpXG5cbiAgICAgICAgdGhpcy4kc3RhcnREYXRlLmRhdGVwaWNrZXIoJC5leHRlbmQoe1xuICAgICAgICAgICAgb25TZWxlY3Q6ICQucHJveHkodGhpcywgJ2hhbmRsZVN0YXJ0RGF0ZUNoYW5nZScpXG4gICAgICAgIH0sIENyYWZ0LmRhdGVwaWNrZXJPcHRpb25zKSlcblxuICAgICAgICB0aGlzLiRlbmREYXRlLmRhdGVwaWNrZXIoJC5leHRlbmQoe1xuICAgICAgICAgICAgb25TZWxlY3Q6ICQucHJveHkodGhpcywgJ2hhbmRsZUVuZERhdGVDaGFuZ2UnKVxuICAgICAgICB9LCBDcmFmdC5kYXRlcGlja2VyT3B0aW9ucykpXG5cbiAgICAgICAgdGhpcy5zdGFydERhdGVwaWNrZXIgPSB0aGlzLiRzdGFydERhdGUuZGF0YSgnZGF0ZXBpY2tlcicpXG4gICAgICAgIHRoaXMuZW5kRGF0ZXBpY2tlciA9IHRoaXMuJGVuZERhdGUuZGF0YSgnZGF0ZXBpY2tlcicpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRzdGFydERhdGUsICdrZXl1cCcsICdoYW5kbGVTdGFydERhdGVDaGFuZ2UnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGVuZERhdGUsICdrZXl1cCcsICdoYW5kbGVFbmREYXRlQ2hhbmdlJylcblxuICAgICAgICBsZXQgc3RhcnRUaW1lID0gdGhpcy5nZXRTdG9yYWdlKCdzdGFydFRpbWUnKSB8fCAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtICg2MCAqIDYwICogMjQgKiAzMCAqIDEwMDApKVxuICAgICAgICBsZXQgZW5kVGltZSA9IHRoaXMuZ2V0U3RvcmFnZSgnZW5kVGltZScpIHx8ICgobmV3IERhdGUoKSkuZ2V0VGltZSgpKVxuXG4gICAgICAgIHRoaXMuc2V0U3RhcnREYXRlKG5ldyBEYXRlKHN0YXJ0VGltZSkpXG4gICAgICAgIHRoaXMuc2V0RW5kRGF0ZShuZXcgRGF0ZShlbmRUaW1lKSlcblxuICAgICAgICB0aGlzLmxvYWRSZXBvcnQoKVxuICAgIH0sXG5cbiAgICBoYW5kbGVTdGFydERhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnNldFN0YXJ0RGF0ZShFbnRyaWVzVGFibGVWaWV3LmdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKHRoaXMuc3RhcnREYXRlcGlja2VyKSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlcG9ydCgpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFuZGxlRW5kRGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0RW5kRGF0ZShFbnRyaWVzVGFibGVWaWV3LmdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKHRoaXMuZW5kRGF0ZXBpY2tlcikpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQoKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0YXJ0RGF0ZShkYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA9PSB0aGlzLnN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXRlXG4gICAgICAgIHRoaXMuc2V0U3RvcmFnZSgnc3RhcnRUaW1lJywgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpKVxuICAgICAgICB0aGlzLiRzdGFydERhdGUudmFsKENyYWZ0LmZvcm1hdERhdGUodGhpcy5zdGFydERhdGUpKVxuXG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgJiYgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpID4gdGhpcy5lbmREYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRFbmREYXRlKG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlLmdldFRpbWUoKSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXRFbmREYXRlKGRhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kRGF0ZSAmJiBkYXRlLmdldFRpbWUoKSA9PSB0aGlzLmVuZERhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRhdGVcbiAgICAgICAgdGhpcy5zZXRTdG9yYWdlKCdlbmRUaW1lJywgdGhpcy5lbmREYXRlLmdldFRpbWUoKSlcbiAgICAgICAgdGhpcy4kZW5kRGF0ZS52YWwoQ3JhZnQuZm9ybWF0RGF0ZSh0aGlzLmVuZERhdGUpKVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aGlzLmVuZERhdGUuZ2V0VGltZSgpIDwgdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShuZXcgRGF0ZSh0aGlzLmVuZERhdGUuZ2V0VGltZSgpKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcblxuICAgIGxvYWRSZXBvcnQoKSB7XG4gICAgICAgIGxldCByZXF1ZXN0RGF0YSA9IHRoaXMuc2V0dGluZ3MucGFyYW1zXG5cbiAgICAgICAgcmVxdWVzdERhdGEuc3RhcnREYXRlID0gRW50cmllc1RhYmxlVmlldy5nZXREYXRlVmFsdWUodGhpcy5zdGFydERhdGUpXG4gICAgICAgIHJlcXVlc3REYXRhLmVuZERhdGUgPSBFbnRyaWVzVGFibGVWaWV3LmdldERhdGVWYWx1ZSh0aGlzLmVuZERhdGUpXG4gICAgICAgIHJlcXVlc3REYXRhLmZvcm1JZCA9IHRoaXMuZWxlbWVudEluZGV4LiRzb3VyY2UuZGF0YSgnZm9ybS1pZCcpXG5cbiAgICAgICAgdGhpcy4kc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgICAgdGhpcy4kZXJyb3IuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgIHRoaXMuJGNoYXJ0LnJlbW92ZUNsYXNzKCdlcnJvcicpXG5cbiAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9jaGFydHMvZ2V0LWVudHJpZXMtY291bnQnLCByZXF1ZXN0RGF0YSwgJC5wcm94eShmdW5jdGlvbihyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy4kc3Bpbm5lci5hZGRDbGFzcygnaGlkZGVuJylcblxuICAgICAgICAgICAgaWYodGV4dFN0YXR1cyA9PSAnc3VjY2VzcycgJiYgdHlwZW9mKHJlc3BvbnNlLmVycm9yKSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcnQgPSBuZXcgQ3JhZnQuY2hhcnRzLkFyZWEodGhpcy4kY2hhcnQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0RGF0YVRhYmxlID0gbmV3IENyYWZ0LmNoYXJ0cy5EYXRhVGFibGUocmVzcG9uc2UuZGF0YVRhYmxlKVxuXG4gICAgICAgICAgICAgICAgbGV0IGNoYXJ0U2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiByZXNwb25zZS5vcmllbnRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0czogcmVzcG9uc2UuZm9ybWF0cyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNjYWxlOiByZXNwb25zZS5zY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiB7IHRvcDogMTAsIHJpZ2h0OiAxMCwgYm90dG9tOiAzMCwgbGVmdDogMTAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydC5zZXR0aW5ncy5mb3JtYXRzID0gcmVzcG9uc2UuZm9ybWF0c1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydC5kcmF3KGNoYXJ0RGF0YVRhYmxlLCBjaGFydFNldHRpbmdzKVxuICAgICAgICAgICAgICAgIHRoaXMuJHRvdGFsVmFsdWUuaHRtbChyZXNwb25zZS50b3RhbEh0bWwpXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IENyYWZ0LnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJylcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YocmVzcG9uc2UpICE9ICd1bmRlZmluZWQnICYmIHJlc3BvbnNlICYmIHR5cGVvZihyZXNwb25zZS5lcnJvcikgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gcmVzcG9uc2UuZXJyb3JcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRlcnJvci5odG1sKG1zZylcbiAgICAgICAgICAgICAgICB0aGlzLiRlcnJvci5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgICAgICAgICAgICB0aGlzLiRjaGFydC5hZGRDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKSk7XG4gICAgfVxufSwge1xuICAgIHN0b3JhZ2U6IHt9LFxuXG4gICAgZ2V0U3RvcmFnZShuYW1lc3BhY2UsIGtleSkge1xuICAgICAgICBpZiAoRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gJiYgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdW2tleV1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfSxcblxuICAgIHNldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gPT0gdHlwZW9mIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV0gPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgRW50cmllc1RhYmxlVmlldy5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSA9IHZhbHVlXG4gICAgfSxcblxuICAgIGdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlKGluc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGluc3QuY3VycmVudFllYXIsIGluc3QuY3VycmVudE1vbnRoLCBpbnN0LmN1cnJlbnREYXkpXG4gICAgfSxcblxuICAgIGdldERhdGVWYWx1ZShkYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCkrJy0nKyhkYXRlLmdldE1vbnRoKCkrMSkrJy0nK2RhdGUuZ2V0RGF0ZSgpXG4gICAgfVxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9jaGFydHMuanMiXSwic291cmNlUm9vdCI6IiJ9