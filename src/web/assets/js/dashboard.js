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
        if (_typeof(DashboardReportChart.storage[namespace]) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
            DashboardReportChart.storage[namespace] = {};
        }

        DashboardReportChart.storage[namespace][key] = value;
    }
});

Garnish.$doc.ready(function () {
    new DashboardReportChart($('.chart-explorer-container'));
});