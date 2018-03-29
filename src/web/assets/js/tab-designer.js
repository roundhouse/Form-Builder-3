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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

var LD_Tabs = void 0;

LD_Tabs = {
    setup: function setup() {}
};

LD_Tabs = new (Garnish.Base.extend({
    tabs: null,
    options: null,

    init: function init() {
        this.tabs = {};
        this.options = {};
    },
    setup: function setup() {
        var self = void 0;
        var FLD = void 0;
        var FLD_tab = void 0;
        var FLD_addTab = void 0;
        var FLD_tabOptions = void 0;
        self = this;

        if (Craft.FieldLayoutDesigner) {
            FLD = Craft.FieldLayoutDesigner;
            FLD_init = FLD.prototype.init;
            FLD_tab = FLD.prototype.initTab;
            FLD_addTab = FLD.prototype.addTab;
            FLD_tabOptions = FLD.prototype.onFieldOptionSelect;

            FLD.prototype.init = function () {
                FLD_init.apply(this, arguments);
                this.tabEditor = new TabEditor(this);
            };

            FLD.prototype.initTab = function ($tab) {
                var $tabEl = void 0;
                var $preview = void 0;
                var $editBtn = void 0;
                var $html = void 0;
                var $menu = void 0;
                var $ul = void 0;
                var tabId = void 0;
                var menu = void 0;
                var menuBtn = void 0;

                FLD_tab.apply(this, arguments);

                tabId = $tab.find('.tab').data('id');

                if (tabId) {
                    $editBtn = $tab.find('.tabs .settings');
                    menuBtn = $editBtn.data('menubtn');
                    menu = menuBtn.menu;
                    $menu = menu.$container;
                    $ul = $menu.children('ul');
                    $html = $('<li><a data-action="taboptions">' + Craft.t('form-builder', 'Options') + '</a></li>').appendTo($ul);
                    console.log();

                    $preview = $(['<div class="field-options-preview">', '</div>'].join('')).appendTo($tab.find('.tabs'));

                    return menu.addOptions($html.children('a'));
                }
            }, FLD.prototype.onTabOptionSelect = function (option) {
                var $tab = void 0;
                var $option = void 0;
                var tabId = void 0;
                var action = void 0;

                FLD_tabOptions.apply(this, arguments);

                $option = $(option);
                $tab = $option.data('menu').$anchor.parent().parent().parent();
                action = $option.data('action');
                tabId = $tab.find('.tab').data('id');

                switch (action) {
                    case 'rename':
                        {
                            this.renameTab($tab);
                            this.trigger('tabRenamed', {
                                tabId: tabId
                            });
                            break;
                        }
                    case 'delete':
                        {
                            this.deleteTab($tab);
                            break;
                        }
                    case 'taboptions':
                        this.trigger('tabOptionsSelected', {
                            target: $option[0],
                            $target: $option,
                            $tab: $tab,
                            fld: this,
                            tabId: tabId
                        });
                        break;
                }
            };

            FLD.prototype.addTab = function () {
                return self.addTab(this);
            };
        }
    },
    addTab: function addTab(e) {
        if (!e.settings.customizableTabs) {
            return;
        }

        var $tab = $('<div class="fld-tab">' + '<div class="tabs">' + '<div class="tab sel draggable">' + '<span>Fieldset</span>' + '<a class="settings icon" title="' + Craft.t('app', 'Rename') + '"></a>' + '</div>' + '</div>' + '<div class="fld-tabcontent"></div>' + '</div>').appendTo(e.$tabContainer);

        e.tabGrid.addItems($tab);
        e.tabDrag.addItems($tab);

        e.initTab($tab);
    },
    getOptions: function getOptions(layoutId) {
        var options = void 0;
        options = {};

        $.each(this.options, function (key, item) {
            if (parseInt(item.layoutId) == layoutId) {
                options[item.tabId] = item.options;
            }
        });

        return options;
    }
}))();

TabEditor = Garnish.Base.extend({
    fld: null,
    options: null,
    layoutId: null,
    namespace: 'form-builder',

    init: function init(fld) {
        this.fld = fld;
        this.layoutId = LD.getLayoutId();
        this.options = LD_Tabs.getOptions(this.layoutId);

        this.fld.on('tabOptionsSelected', $.proxy(this.openOptionsModal, this));
        this.fld.on('tabRenamed', $.proxy(this.onTabRenamed, this));

        if (this.layoutId !== false) {
            this.applyOptions(this.layoutId);
        }
    },
    applyOptions: function applyOptions(layoutId) {
        var _this = this;

        var results = void 0;

        if (this.options) {
            results = [];

            $.each(this.options, function (key, value) {
                if (_this.options.hasOwnProperty(key)) {
                    options = JSON.parse(_this.options[key]);
                    results.push(_this.setFormData(key, JSON.parse(value)));
                } else {
                    results.push(void 0);
                }
            });

            return results;
        }
    },
    onTabRenamed: function onTabRenamed(e) {
        $tab = $('.tab-id-' + e.tabId);
        $input = $tab.parent().find('.tab-name-field');
        $labelSpan = $tab.find('span');
        tabName = $labelSpan.text();

        $input.val(tabName);
    },
    openOptionsModal: function openOptionsModal(e) {
        var self = void 0;
        self = this;
        var modal = void 0;
        var tabId = void 0;
        var $tab = e.$tab;
        var $labelSpan = void 0;

        $labelSpan = $tab.find('.tabs .tab span');
        tabName = $labelSpan.text();
        tabId = e.tabId;

        modal = new TabOptionsModal($tab);
        modal.on('setOptions', function (e) {
            return self.setFormData(tabId, e.options, tabName);
        });
        modal.show(this.options);
    },
    setFormData: function setFormData(tabId, options, tabName) {
        var self = void 0;
        var $container = void 0;
        var name = void 0;
        self = this;

        $container = $('[data-id="' + tabId + '"]').parent();
        name = this.namespace + '[tab][' + tabId + '][options]';

        $.each(options, function (key, item) {
            if ($container.children('input[name="' + name + '[' + key + ']"]').length > 0) {
                if (item) {
                    $container.children('input[name="' + name + '[' + key + ']"]').val(item);
                    self.updatePreview(tabId, $container, key, item);
                } else {
                    $container.children('input[name="' + name + '[' + key + ']"]').remove();
                    self.removePreview(tabId, $container, key, item);
                }
            } else {
                if (item) {
                    self.updatePreview(tabId, $container, key, item);
                    $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($container);
                }
            }
        });

        $container.find('.tab-name-field').val(tabName);
    },
    updatePreview: function updatePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        body = target.find('.field-options-preview');
        markup = $('<div class="field-' + type + '-preview"><span class="preview-type">' + type + '</span> ' + value + '</div>');
        oldMarkup = body.find('.field-' + type + '-preview');

        if (oldMarkup) {
            oldMarkup.remove();
        }

        markup.appendTo(body);
    },
    removePreview: function removePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        target.find('.field-' + type + '-preview').remove();
    }
});

TabOptionsModal = Garnish.Modal.extend({
    tab: null,
    form: null,
    $formContainer: null,

    init: function init(tab) {
        var body = void 0;
        this.tab = tab;
        this.base();
        this.$formContainer = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);
        body = $(['<header>', '<span class="modal-title">', 'Attributes', '</span>', '<div class="instructions">', 'Custom tab attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth input-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth input-id">', '</div>', '</div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$inputClass = body.find('.input-class');
        this.$inputId = body.find('.input-id');

        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    loadModalValues: function loadModalValues() {
        tabId = this.tab.find('.tab').data('id');
        $classInput = $('input[name="form-builder[tab][' + tabId + '][options][class]"]').val();
        $idInput = $('input[name="form-builder[tab][' + tabId + '][options][id]"]').val();

        if ($classInput) {
            this.$formContainer.find('.input-class').val($classInput);
        }

        if ($idInput) {
            this.$formContainer.find('.input-id').val($idInput);
        }
    },
    onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();

        if (!this.visible) {
            return;
        }

        this.trigger('setOptions', {
            options: {
                "class": this.$inputClass.val(),
                id: this.$inputId.val()
            }
        });

        this.hide();
    },
    onFadeOut: function onFadeOut() {
        this.base();
        this.destroy();
    },
    destroy: function destroy() {
        this.base();
        this.$container.remove();
        this.$shade.remove();
    },
    show: function show(options) {
        var self = void 0;
        var values = void 0;

        if (options.length > 0) {
            values = JSON.parse(options[this.tab.name]);
        }

        $.each(values, function (key, value) {
            if (key === 'class' && value) {
                self.$inputClass.val(value);
            }

            if (key === 'id' && value) {
                self.$inputId.val(value);
            }
        });

        if (!Garnish.isMobileBrowser()) {
            setTimeout($.proxy(function () {
                this.$inputClass.focus();
            }, this), 100);
        }

        this.base();
    }
});

window.LD_Tabs = LD_Tabs;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvdGFiLWRlc2lnbmVyLmpzIl0sIm5hbWVzIjpbIkxEX1RhYnMiLCJzZXR1cCIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwidGFicyIsIm9wdGlvbnMiLCJpbml0Iiwic2VsZiIsIkZMRCIsIkZMRF90YWIiLCJGTERfYWRkVGFiIiwiRkxEX3RhYk9wdGlvbnMiLCJDcmFmdCIsIkZpZWxkTGF5b3V0RGVzaWduZXIiLCJGTERfaW5pdCIsInByb3RvdHlwZSIsImluaXRUYWIiLCJhZGRUYWIiLCJvbkZpZWxkT3B0aW9uU2VsZWN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ0YWJFZGl0b3IiLCJUYWJFZGl0b3IiLCIkdGFiIiwiJHRhYkVsIiwiJHByZXZpZXciLCIkZWRpdEJ0biIsIiRodG1sIiwiJG1lbnUiLCIkdWwiLCJ0YWJJZCIsIm1lbnUiLCJtZW51QnRuIiwiZmluZCIsImRhdGEiLCIkY29udGFpbmVyIiwiY2hpbGRyZW4iLCIkIiwidCIsImFwcGVuZFRvIiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJhZGRPcHRpb25zIiwib25UYWJPcHRpb25TZWxlY3QiLCJvcHRpb24iLCIkb3B0aW9uIiwiYWN0aW9uIiwiJGFuY2hvciIsInBhcmVudCIsInJlbmFtZVRhYiIsInRyaWdnZXIiLCJkZWxldGVUYWIiLCJ0YXJnZXQiLCIkdGFyZ2V0IiwiZmxkIiwiZSIsInNldHRpbmdzIiwiY3VzdG9taXphYmxlVGFicyIsIiR0YWJDb250YWluZXIiLCJ0YWJHcmlkIiwiYWRkSXRlbXMiLCJ0YWJEcmFnIiwiZ2V0T3B0aW9ucyIsImxheW91dElkIiwiZWFjaCIsImtleSIsIml0ZW0iLCJwYXJzZUludCIsIm5hbWVzcGFjZSIsIkxEIiwiZ2V0TGF5b3V0SWQiLCJvbiIsInByb3h5Iiwib3Blbk9wdGlvbnNNb2RhbCIsIm9uVGFiUmVuYW1lZCIsImFwcGx5T3B0aW9ucyIsInJlc3VsdHMiLCJ2YWx1ZSIsImhhc093blByb3BlcnR5IiwiSlNPTiIsInBhcnNlIiwicHVzaCIsInNldEZvcm1EYXRhIiwiJGlucHV0IiwiJGxhYmVsU3BhbiIsInRhYk5hbWUiLCJ0ZXh0IiwidmFsIiwibW9kYWwiLCJUYWJPcHRpb25zTW9kYWwiLCJzaG93IiwibmFtZSIsImxlbmd0aCIsInVwZGF0ZVByZXZpZXciLCJyZW1vdmUiLCJyZW1vdmVQcmV2aWV3IiwidGFiIiwidHlwZSIsImJvZHkiLCJtYXJrdXAiLCJvbGRNYXJrdXAiLCJNb2RhbCIsImZvcm0iLCIkZm9ybUNvbnRhaW5lciIsImJhc2UiLCIkYm9kIiwic2V0Q29udGFpbmVyIiwiJGlucHV0Q2xhc3MiLCIkaW5wdXRJZCIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJhZGRMaXN0ZW5lciIsIiRjbGFzc0lucHV0IiwiJGlkSW5wdXQiLCJvbkZvcm1TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsInZpc2libGUiLCJpZCIsImhpZGUiLCJvbkZhZGVPdXQiLCJkZXN0cm95IiwiJHNoYWRlIiwidmFsdWVzIiwiaXNNb2JpbGVCcm93c2VyIiwic2V0VGltZW91dCIsImZvY3VzIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7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SUFBZ0JZLEtBQXBCLEVBQTJCO0FBQ3ZCdkUscUJBQUtzRyxRQUFMLENBQWNyQixHQUFkLENBQWtCVixLQUFsQjtBQUNIO0FBQ0wsU0FSRDs7QUFVQyxZQUFJLENBQUM3RSxRQUFRMkgsZUFBUixFQUFMLEVBQWdDO0FBQzVCQyx1QkFBV3hGLEVBQUVvQyxLQUFGLENBQVMsWUFBVztBQUMzQixxQkFBS21DLFdBQUwsQ0FBaUJrQixLQUFqQjtBQUNILGFBRlUsRUFFUCxJQUZPLENBQVgsRUFFVyxHQUZYO0FBR0g7O0FBRUQsYUFBS3JCLElBQUw7QUFDSjtBQXBIbUMsQ0FBckIsQ0FBbEI7O0FBMEhBc0IsT0FBT2hJLE9BQVAsR0FBaUJBLE9BQWpCLEMiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvdGFiLWRlc2lnbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg0NDRhMzJjMDgzMDI0YWUwYTk4IiwibGV0IExEX1RhYnNcblxuTERfVGFicyA9IHtcbiAgICBzZXR1cCgpIHt9XG59XG5cbkxEX1RhYnMgPSBuZXcgKEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIHRhYnM6IG51bGwsXG4gICAgb3B0aW9uczogbnVsbCxcblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMudGFicyA9IHt9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9XG4gICAgfSxcblxuICAgIHNldHVwKCkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBsZXQgRkxEXG4gICAgICAgIGxldCBGTERfdGFiXG4gICAgICAgIGxldCBGTERfYWRkVGFiXG4gICAgICAgIGxldCBGTERfdGFiT3B0aW9uc1xuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIGlmIChDcmFmdC5GaWVsZExheW91dERlc2lnbmVyKSB7XG4gICAgICAgICAgICBGTEQgPSBDcmFmdC5GaWVsZExheW91dERlc2lnbmVyXG4gICAgICAgICAgICBGTERfaW5pdCA9IEZMRC5wcm90b3R5cGUuaW5pdFxuICAgICAgICAgICAgRkxEX3RhYiA9IEZMRC5wcm90b3R5cGUuaW5pdFRhYlxuICAgICAgICAgICAgRkxEX2FkZFRhYiA9IEZMRC5wcm90b3R5cGUuYWRkVGFiXG4gICAgICAgICAgICBGTERfdGFiT3B0aW9ucyA9IEZMRC5wcm90b3R5cGUub25GaWVsZE9wdGlvblNlbGVjdFxuXG4gICAgICAgICAgICBGTEQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBGTERfaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgdGhpcy50YWJFZGl0b3IgPSBuZXcgVGFiRWRpdG9yKHRoaXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUuaW5pdFRhYiA9IGZ1bmN0aW9uKCR0YWIpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhYkVsXG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2aWV3XG4gICAgICAgICAgICAgICAgbGV0ICRlZGl0QnRuXG4gICAgICAgICAgICAgICAgbGV0ICRodG1sXG4gICAgICAgICAgICAgICAgbGV0ICRtZW51XG4gICAgICAgICAgICAgICAgbGV0ICR1bFxuICAgICAgICAgICAgICAgIGxldCB0YWJJZFxuICAgICAgICAgICAgICAgIGxldCBtZW51XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVCdG5cblxuICAgICAgICAgICAgICAgIEZMRF90YWIuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXG4gICAgICAgICAgICAgICAgdGFiSWQgPSAkdGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG5cbiAgICAgICAgICAgICAgICBpZiAodGFiSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGVkaXRCdG4gPSAkdGFiLmZpbmQoJy50YWJzIC5zZXR0aW5ncycpXG4gICAgICAgICAgICAgICAgICAgIG1lbnVCdG4gPSAkZWRpdEJ0bi5kYXRhKCdtZW51YnRuJylcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG1lbnVCdG4ubWVudVxuICAgICAgICAgICAgICAgICAgICAkbWVudSA9IG1lbnUuJGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAkdWwgPSAkbWVudS5jaGlsZHJlbigndWwnKVxuICAgICAgICAgICAgICAgICAgICAkaHRtbCA9ICQoJzxsaT48YSBkYXRhLWFjdGlvbj1cInRhYm9wdGlvbnNcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ09wdGlvbnMnKSArICc8L2E+PC9saT4nKS5hcHBlbmRUbygkdWwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKClcblxuICAgICAgICAgICAgICAgICAgICAkcHJldmlldyA9ICQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWVsZC1vcHRpb25zLXByZXZpZXdcIj4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8oJHRhYi5maW5kKCcudGFicycpKVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW51LmFkZE9wdGlvbnMoJGh0bWwuY2hpbGRyZW4oJ2EnKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUub25UYWJPcHRpb25TZWxlY3QgPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgJHRhYlxuICAgICAgICAgICAgICAgIGxldCAkb3B0aW9uXG4gICAgICAgICAgICAgICAgbGV0IHRhYklkXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblxuXG4gICAgICAgICAgICAgICAgRkxEX3RhYk9wdGlvbnMuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICRvcHRpb24gPSAkKG9wdGlvbilcbiAgICAgICAgICAgICAgICAkdGFiID0gJG9wdGlvbi5kYXRhKCdtZW51JykuJGFuY2hvci5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICRvcHRpb24uZGF0YSgnYWN0aW9uJylcbiAgICAgICAgICAgICAgICB0YWJJZCA9ICR0YWIuZmluZCgnLnRhYicpLmRhdGEoJ2lkJylcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbmFtZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuYW1lVGFiKCR0YWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd0YWJSZW5hbWVkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYklkOiB0YWJJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlVGFiKCR0YWIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGFib3B0aW9ucyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3RhYk9wdGlvbnNTZWxlY3RlZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICRvcHRpb25bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldDogJG9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFiOiAkdGFiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJZDogdGFiSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5hZGRUYWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5hZGRUYWIodGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGFkZFRhYihlKSB7XG4gICAgICAgIGlmICghZS5zZXR0aW5ncy5jdXN0b21pemFibGVUYWJzKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkdGFiID0gJCgnPGRpdiBjbGFzcz1cImZsZC10YWJcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFic1wiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0YWIgc2VsIGRyYWdnYWJsZVwiPicgK1xuICAgICAgICAgICAgJzxzcGFuPkZpZWxkc2V0PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxhIGNsYXNzPVwic2V0dGluZ3MgaWNvblwiIHRpdGxlPVwiJyArIENyYWZ0LnQoJ2FwcCcsICdSZW5hbWUnKSArICdcIj48L2E+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZsZC10YWJjb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JykuYXBwZW5kVG8oZS4kdGFiQ29udGFpbmVyKVxuXG4gICAgICAgIGUudGFiR3JpZC5hZGRJdGVtcygkdGFiKVxuICAgICAgICBlLnRhYkRyYWcuYWRkSXRlbXMoJHRhYilcblxuICAgICAgICBlLmluaXRUYWIoJHRhYilcbiAgICB9LFxuXG4gICAgZ2V0T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0ge31cblxuICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoaXRlbS5sYXlvdXRJZCkgPT0gbGF5b3V0SWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2l0ZW0udGFiSWRdID0gaXRlbS5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG59KSlcblxuVGFiRWRpdG9yID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgZmxkOiBudWxsLFxuICAgIG9wdGlvbnM6IG51bGwsXG4gICAgbGF5b3V0SWQ6IG51bGwsXG4gICAgbmFtZXNwYWNlOiAnZm9ybS1idWlsZGVyJyxcblxuICAgIGluaXQoZmxkKSB7XG4gICAgICAgIHRoaXMuZmxkID0gZmxkXG4gICAgICAgIHRoaXMubGF5b3V0SWQgPSBMRC5nZXRMYXlvdXRJZCgpXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IExEX1RhYnMuZ2V0T3B0aW9ucyh0aGlzLmxheW91dElkKVxuXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJPcHRpb25zU2VsZWN0ZWQnLCAkLnByb3h5KHRoaXMub3Blbk9wdGlvbnNNb2RhbCwgdGhpcykpXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJSZW5hbWVkJywgJC5wcm94eSh0aGlzLm9uVGFiUmVuYW1lZCwgdGhpcykpXG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0SWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9ucyh0aGlzLmxheW91dElkKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgcmVzdWx0c1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2V0Rm9ybURhdGEoa2V5LCBKU09OLnBhcnNlKHZhbHVlKSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0c1xuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25UYWJSZW5hbWVkKGUpIHtcbiAgICAgICAgJHRhYiA9ICQoJy50YWItaWQtJytlLnRhYklkKVxuICAgICAgICAkaW5wdXQgPSAkdGFiLnBhcmVudCgpLmZpbmQoJy50YWItbmFtZS1maWVsZCcpXG4gICAgICAgICRsYWJlbFNwYW4gPSAkdGFiLmZpbmQoJ3NwYW4nKVxuICAgICAgICB0YWJOYW1lID0gJGxhYmVsU3Bhbi50ZXh0KClcblxuICAgICAgICAkaW5wdXQudmFsKHRhYk5hbWUpXG4gICAgfSxcblxuICAgIG9wZW5PcHRpb25zTW9kYWwoZSkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICBsZXQgbW9kYWxcbiAgICAgICAgbGV0IHRhYklkXG4gICAgICAgIGxldCAkdGFiID0gZS4kdGFiXG4gICAgICAgIGxldCAkbGFiZWxTcGFuXG5cbiAgICAgICAgJGxhYmVsU3BhbiA9ICR0YWIuZmluZCgnLnRhYnMgLnRhYiBzcGFuJylcbiAgICAgICAgdGFiTmFtZSA9ICRsYWJlbFNwYW4udGV4dCgpXG4gICAgICAgIHRhYklkID0gZS50YWJJZFxuXG4gICAgICAgIG1vZGFsID0gbmV3IFRhYk9wdGlvbnNNb2RhbCgkdGFiKVxuICAgICAgICBtb2RhbC5vbignc2V0T3B0aW9ucycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YSh0YWJJZCwgZS5vcHRpb25zLCB0YWJOYW1lKSlcbiAgICAgICAgbW9kYWwuc2hvdyh0aGlzLm9wdGlvbnMpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKHRhYklkLCBvcHRpb25zLCB0YWJOYW1lKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCAkY29udGFpbmVyXG4gICAgICAgIGxldCBuYW1lXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgJGNvbnRhaW5lciA9ICQoJ1tkYXRhLWlkPVwiJyt0YWJJZCsnXCJdJykucGFyZW50KClcbiAgICAgICAgbmFtZSA9IHRoaXMubmFtZXNwYWNlICsgJ1t0YWJdWycgKyB0YWJJZCArICddW29wdGlvbnNdJ1xuXG4gICAgICAgICQuZWFjaChvcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGNvbnRhaW5lci5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmNoaWxkcmVuKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkudmFsKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuY2hpbGRyZW4oYGlucHV0W25hbWU9XCIke25hbWV9WyR7a2V5fV1cIl1gKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZVByZXZpZXcodGFiSWQsICRjb250YWluZXIsIGtleSwgaXRlbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgJGNvbnRhaW5lci5maW5kKCcudGFiLW5hbWUtZmllbGQnKS52YWwodGFiTmFtZSlcbiAgICB9LFxuXG4gICAgdXBkYXRlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIGJvZHkgPSB0YXJnZXQuZmluZCgnLmZpZWxkLW9wdGlvbnMtcHJldmlldycpXG4gICAgICAgIG1hcmt1cCA9ICQoJzxkaXYgY2xhc3M9XCJmaWVsZC0nKyB0eXBlICsnLXByZXZpZXdcIj48c3BhbiBjbGFzcz1cInByZXZpZXctdHlwZVwiPicrIHR5cGUgKyc8L3NwYW4+ICcrdmFsdWUrJzwvZGl2PicpXG4gICAgICAgIG9sZE1hcmt1cCA9IGJvZHkuZmluZCgnLmZpZWxkLScrIHR5cGUgKyctcHJldmlldycpXG5cbiAgICAgICAgaWYgKG9sZE1hcmt1cCkge1xuICAgICAgICAgICAgb2xkTWFya3VwLnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrdXAuYXBwZW5kVG8oYm9keSlcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIHRhcmdldC5maW5kKCcuZmllbGQtJyt0eXBlKyctcHJldmlldycpLnJlbW92ZSgpXG4gICAgfVxuXG59KVxuXG5UYWJPcHRpb25zTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgdGFiOiBudWxsLFxuICAgIGZvcm06IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG5cbiAgICBpbml0KHRhYikge1xuICAgICAgICBsZXQgYm9keVxuICAgICAgICB0aGlzLnRhYiA9IHRhYlxuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm1Db250YWluZXIpXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0F0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0N1c3RvbSB0YWIgYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBpbnB1dC1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0lEJywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtaWRcIj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZm9vdGVyPidcbiAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybUNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy4kaW5wdXRDbGFzcyA9IGJvZHkuZmluZCgnLmlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaW5wdXRJZCA9IGJvZHkuZmluZCgnLmlucHV0LWlkJylcblxuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKVxuXG4gICAgICAgIHRoaXMubG9hZE1vZGFsVmFsdWVzKClcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2hpZGUnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm1Db250YWluZXIsICdzdWJtaXQnLCAnb25Gb3JtU3VibWl0JylcbiAgICB9LFxuXG4gICAgbG9hZE1vZGFsVmFsdWVzKCkge1xuICAgICAgICB0YWJJZCA9IHRoaXMudGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG4gICAgICAgICRjbGFzc0lucHV0ID0gJCgnaW5wdXRbbmFtZT1cImZvcm0tYnVpbGRlclt0YWJdWycrIHRhYklkICsnXVtvcHRpb25zXVtjbGFzc11cIl0nKS52YWwoKVxuICAgICAgICAkaWRJbnB1dCA9ICQoJ2lucHV0W25hbWU9XCJmb3JtLWJ1aWxkZXJbdGFiXVsnKyB0YWJJZCArJ11bb3B0aW9uc11baWRdXCJdJykudmFsKClcblxuICAgICAgICBpZiAoJGNsYXNzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmlucHV0LWNsYXNzJykudmFsKCRjbGFzc0lucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpZElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1pZCcpLnZhbCgkaWRJbnB1dClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkZvcm1TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3NldE9wdGlvbnMnLCB7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgXCJjbGFzc1wiOiB0aGlzLiRpbnB1dENsYXNzLnZhbCgpLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLiRpbnB1dElkLnZhbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICB9LFxuXG4gICAgb25GYWRlT3V0KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0sXG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlKClcbiAgICAgICAgdGhpcy4kc2hhZGUucmVtb3ZlKClcbiAgICB9LFxuXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCB2YWx1ZXNcblxuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKG9wdGlvbnNbdGhpcy50YWIubmFtZV0pXG4gICAgICAgIH1cblxuICAgICAgICQuZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnY2xhc3MnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRDbGFzcy52YWwodmFsdWUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dElkLnZhbCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICB9KVxuXG4gICAgICAgIGlmICghR2FybmlzaC5pc01vYmlsZUJyb3dzZXIoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dENsYXNzLmZvY3VzKCk7XG4gICAgICAgICAgICB9KSwgdGhpcyksIDEwMClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICB9XG4gICBcblxufSlcblxuXG53aW5kb3cuTERfVGFicyA9IExEX1RhYnNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy90YWItZGVzaWduZXIuanMiXSwic291cmNlUm9vdCI6IiJ9