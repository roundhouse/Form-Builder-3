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

        var $tab = $('<div class="fld-tab">' + '<div class="tabs">' + '<div class="tab sel draggable">' + '<span>Fieldset ' + (e.tabGrid.$items.length + 1) + '</span>' + '<a class="settings icon" title="' + Craft.t('app', 'Rename') + '"></a>' + '</div>' + '</div>' + '<div class="fld-tabcontent"></div>' + '</div>').appendTo(e.$tabContainer);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvdGFiLWRlc2lnbmVyLmpzIl0sIm5hbWVzIjpbIkxEX1RhYnMiLCJzZXR1cCIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwidGFicyIsIm9wdGlvbnMiLCJpbml0Iiwic2VsZiIsIkZMRCIsIkZMRF90YWIiLCJGTERfYWRkVGFiIiwiRkxEX3RhYk9wdGlvbnMiLCJDcmFmdCIsIkZpZWxkTGF5b3V0RGVzaWduZXIiLCJGTERfaW5pdCIsInByb3RvdHlwZSIsImluaXRUYWIiLCJhZGRUYWIiLCJvbkZpZWxkT3B0aW9uU2VsZWN0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ0YWJFZGl0b3IiLCJUYWJFZGl0b3IiLCIkdGFiIiwiJHRhYkVsIiwiJHByZXZpZXciLCIkZWRpdEJ0biIsIiRodG1sIiwiJG1lbnUiLCIkdWwiLCJ0YWJJZCIsIm1lbnUiLCJtZW51QnRuIiwiZmluZCIsImRhdGEiLCIkY29udGFpbmVyIiwiY2hpbGRyZW4iLCIkIiwidCIsImFwcGVuZFRvIiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJhZGRPcHRpb25zIiwib25UYWJPcHRpb25TZWxlY3QiLCJvcHRpb24iLCIkb3B0aW9uIiwiYWN0aW9uIiwiJGFuY2hvciIsInBhcmVudCIsInJlbmFtZVRhYiIsInRyaWdnZXIiLCJkZWxldGVUYWIiLCJ0YXJnZXQiLCIkdGFyZ2V0IiwiZmxkIiwiZSIsInNldHRpbmdzIiwiY3VzdG9taXphYmxlVGFicyIsInRhYkdyaWQiLCIkaXRlbXMiLCJsZW5ndGgiLCIkdGFiQ29udGFpbmVyIiwiYWRkSXRlbXMiLCJ0YWJEcmFnIiwiZ2V0T3B0aW9ucyIsImxheW91dElkIiwiZWFjaCIsImtleSIsIml0ZW0iLCJwYXJzZUludCIsIm5hbWVzcGFjZSIsIkxEIiwiZ2V0TGF5b3V0SWQiLCJvbiIsInByb3h5Iiwib3Blbk9wdGlvbnNNb2RhbCIsIm9uVGFiUmVuYW1lZCIsImFwcGx5T3B0aW9ucyIsInJlc3VsdHMiLCJ2YWx1ZSIsImhhc093blByb3BlcnR5IiwiSlNPTiIsInBhcnNlIiwicHVzaCIsInNldEZvcm1EYXRhIiwiJGlucHV0IiwiJGxhYmVsU3BhbiIsInRhYk5hbWUiLCJ0ZXh0IiwidmFsIiwibW9kYWwiLCJUYWJPcHRpb25zTW9kYWwiLCJzaG93IiwibmFtZSIsInVwZGF0ZVByZXZpZXciLCJyZW1vdmUiLCJyZW1vdmVQcmV2aWV3IiwidGFiIiwidHlwZSIsImJvZHkiLCJtYXJrdXAiLCJvbGRNYXJrdXAiLCJNb2RhbCIsImZvcm0iLCIkZm9ybUNvbnRhaW5lciIsImJhc2UiLCIkYm9kIiwic2V0Q29udGFpbmVyIiwiJGlucHV0Q2xhc3MiLCIkaW5wdXRJZCIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJhZGRMaXN0ZW5lciIsIiRjbGFzc0lucHV0IiwiJGlkSW5wdXQiLCJvbkZvcm1TdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsInZpc2libGUiLCJpZCIsImhpZGUiLCJvbkZhZGVPdXQiLCJkZXN0cm95IiwiJHNoYWRlIiwidmFsdWVzIiwiaXNNb2JpbGVCcm93c2VyIiwic2V0VGltZW91dCIsImZvY3VzIiwid2luZG93Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FB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MUJ6RSxxQkFBS3NHLFdBQUwsQ0FBaUJuQixHQUFqQixDQUFxQlYsS0FBckI7QUFDSDs7QUFFRCxnQkFBSVosUUFBUSxJQUFSLElBQWdCWSxLQUFwQixFQUEyQjtBQUN2QnpFLHFCQUFLdUcsUUFBTCxDQUFjcEIsR0FBZCxDQUFrQlYsS0FBbEI7QUFDSDtBQUNMLFNBUkQ7O0FBVUMsWUFBSSxDQUFDL0UsUUFBUTRILGVBQVIsRUFBTCxFQUFnQztBQUM1QkMsdUJBQVd6RixFQUFFc0MsS0FBRixDQUFTLFlBQVc7QUFDM0IscUJBQUtrQyxXQUFMLENBQWlCa0IsS0FBakI7QUFDSCxhQUZVLEVBRVAsSUFGTyxDQUFYLEVBRVcsR0FGWDtBQUdIOztBQUVELGFBQUtyQixJQUFMO0FBQ0o7QUFwSG1DLENBQXJCLENBQWxCOztBQTBIQXNCLE9BQU9qSSxPQUFQLEdBQWlCQSxPQUFqQixDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL3RhYi1kZXNpZ25lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MzY3ODg5OGFlNzdiOGYzZjRlOSIsImxldCBMRF9UYWJzXG5cbkxEX1RhYnMgPSB7XG4gICAgc2V0dXAoKSB7fVxufVxuXG5MRF9UYWJzID0gbmV3IChHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICB0YWJzOiBudWxsLFxuICAgIG9wdGlvbnM6IG51bGwsXG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnRhYnMgPSB7fVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fVxuICAgIH0sXG5cbiAgICBzZXR1cCgpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0IEZMRFxuICAgICAgICBsZXQgRkxEX3RhYlxuICAgICAgICBsZXQgRkxEX2FkZFRhYlxuICAgICAgICBsZXQgRkxEX3RhYk9wdGlvbnNcbiAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgICBpZiAoQ3JhZnQuRmllbGRMYXlvdXREZXNpZ25lcikge1xuICAgICAgICAgICAgRkxEID0gQ3JhZnQuRmllbGRMYXlvdXREZXNpZ25lclxuICAgICAgICAgICAgRkxEX2luaXQgPSBGTEQucHJvdG90eXBlLmluaXRcbiAgICAgICAgICAgIEZMRF90YWIgPSBGTEQucHJvdG90eXBlLmluaXRUYWJcbiAgICAgICAgICAgIEZMRF9hZGRUYWIgPSBGTEQucHJvdG90eXBlLmFkZFRhYlxuICAgICAgICAgICAgRkxEX3RhYk9wdGlvbnMgPSBGTEQucHJvdG90eXBlLm9uRmllbGRPcHRpb25TZWxlY3RcblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRkxEX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIHRoaXMudGFiRWRpdG9yID0gbmV3IFRhYkVkaXRvcih0aGlzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGTEQucHJvdG90eXBlLmluaXRUYWIgPSBmdW5jdGlvbigkdGFiKSB7XG4gICAgICAgICAgICAgICAgbGV0ICR0YWJFbFxuICAgICAgICAgICAgICAgIGxldCAkcHJldmlld1xuICAgICAgICAgICAgICAgIGxldCAkZWRpdEJ0blxuICAgICAgICAgICAgICAgIGxldCAkaHRtbFxuICAgICAgICAgICAgICAgIGxldCAkbWVudVxuICAgICAgICAgICAgICAgIGxldCAkdWxcbiAgICAgICAgICAgICAgICBsZXQgdGFiSWRcbiAgICAgICAgICAgICAgICBsZXQgbWVudVxuICAgICAgICAgICAgICAgIGxldCBtZW51QnRuXG5cbiAgICAgICAgICAgICAgICBGTERfdGFiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblxuICAgICAgICAgICAgICAgIHRhYklkID0gJHRhYi5maW5kKCcudGFiJykuZGF0YSgnaWQnKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhYklkKSB7XG4gICAgICAgICAgICAgICAgICAgICRlZGl0QnRuID0gJHRhYi5maW5kKCcudGFicyAuc2V0dGluZ3MnKVxuICAgICAgICAgICAgICAgICAgICBtZW51QnRuID0gJGVkaXRCdG4uZGF0YSgnbWVudWJ0bicpXG4gICAgICAgICAgICAgICAgICAgIG1lbnUgPSBtZW51QnRuLm1lbnVcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUgPSBtZW51LiRjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgJHVsID0gJG1lbnUuY2hpbGRyZW4oJ3VsJylcbiAgICAgICAgICAgICAgICAgICAgJGh0bWwgPSAkKCc8bGk+PGEgZGF0YS1hY3Rpb249XCJ0YWJvcHRpb25zXCI+JyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdPcHRpb25zJykgKyAnPC9hPjwvbGk+JykuYXBwZW5kVG8oJHVsKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpXG5cbiAgICAgICAgICAgICAgICAgICAgJHByZXZpZXcgPSAkKFtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmllbGQtb3B0aW9ucy1wcmV2aWV3XCI+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignJykpLmFwcGVuZFRvKCR0YWIuZmluZCgnLnRhYnMnKSlcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVudS5hZGRPcHRpb25zKCRodG1sLmNoaWxkcmVuKCdhJykpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBGTEQucHJvdG90eXBlLm9uVGFiT3B0aW9uU2VsZWN0ID0gZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGV0ICR0YWJcbiAgICAgICAgICAgICAgICBsZXQgJG9wdGlvblxuICAgICAgICAgICAgICAgIGxldCB0YWJJZFxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25cblxuICAgICAgICAgICAgICAgIEZMRF90YWJPcHRpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkb3B0aW9uID0gJChvcHRpb24pXG4gICAgICAgICAgICAgICAgJHRhYiA9ICRvcHRpb24uZGF0YSgnbWVudScpLiRhbmNob3IucGFyZW50KCkucGFyZW50KCkucGFyZW50KClcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAkb3B0aW9uLmRhdGEoJ2FjdGlvbicpXG4gICAgICAgICAgICAgICAgdGFiSWQgPSAkdGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW5hbWUnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmFtZVRhYigkdGFiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcigndGFiUmVuYW1lZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJZDogdGFiSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVRhYigkdGFiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RhYm9wdGlvbnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd0YWJPcHRpb25zU2VsZWN0ZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkb3B0aW9uWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0YXJnZXQ6ICRvcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHRhYjogJHRhYixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSWQ6IHRhYklkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUuYWRkVGFiID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuYWRkVGFiKHRoaXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBhZGRUYWIoZSkge1xuICAgICAgICBpZiAoIWUuc2V0dGluZ3MuY3VzdG9taXphYmxlVGFicykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgJHRhYiA9ICQoJzxkaXYgY2xhc3M9XCJmbGQtdGFiXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRhYnNcIj4nICtcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGFiIHNlbCBkcmFnZ2FibGVcIj4nICtcbiAgICAgICAgICAgICc8c3Bhbj5GaWVsZHNldCAnICsgKGUudGFiR3JpZC4kaXRlbXMubGVuZ3RoICsgMSkgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxhIGNsYXNzPVwic2V0dGluZ3MgaWNvblwiIHRpdGxlPVwiJyArIENyYWZ0LnQoJ2FwcCcsICdSZW5hbWUnKSArICdcIj48L2E+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZsZC10YWJjb250ZW50XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JykuYXBwZW5kVG8oZS4kdGFiQ29udGFpbmVyKVxuXG4gICAgICAgIGUudGFiR3JpZC5hZGRJdGVtcygkdGFiKVxuICAgICAgICBlLnRhYkRyYWcuYWRkSXRlbXMoJHRhYilcblxuICAgICAgICBlLmluaXRUYWIoJHRhYilcbiAgICB9LFxuXG4gICAgZ2V0T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0ge31cblxuICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoaXRlbS5sYXlvdXRJZCkgPT0gbGF5b3V0SWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2l0ZW0udGFiSWRdID0gaXRlbS5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG59KSlcblxuVGFiRWRpdG9yID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgZmxkOiBudWxsLFxuICAgIG9wdGlvbnM6IG51bGwsXG4gICAgbGF5b3V0SWQ6IG51bGwsXG4gICAgbmFtZXNwYWNlOiAnZm9ybS1idWlsZGVyJyxcblxuICAgIGluaXQoZmxkKSB7XG4gICAgICAgIHRoaXMuZmxkID0gZmxkXG4gICAgICAgIHRoaXMubGF5b3V0SWQgPSBMRC5nZXRMYXlvdXRJZCgpXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IExEX1RhYnMuZ2V0T3B0aW9ucyh0aGlzLmxheW91dElkKVxuXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJPcHRpb25zU2VsZWN0ZWQnLCAkLnByb3h5KHRoaXMub3Blbk9wdGlvbnNNb2RhbCwgdGhpcykpXG4gICAgICAgIHRoaXMuZmxkLm9uKCd0YWJSZW5hbWVkJywgJC5wcm94eSh0aGlzLm9uVGFiUmVuYW1lZCwgdGhpcykpXG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0SWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9ucyh0aGlzLmxheW91dElkKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgcmVzdWx0c1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2V0Rm9ybURhdGEoa2V5LCBKU09OLnBhcnNlKHZhbHVlKSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0c1xuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25UYWJSZW5hbWVkKGUpIHtcbiAgICAgICAgJHRhYiA9ICQoJy50YWItaWQtJytlLnRhYklkKVxuICAgICAgICAkaW5wdXQgPSAkdGFiLnBhcmVudCgpLmZpbmQoJy50YWItbmFtZS1maWVsZCcpXG4gICAgICAgICRsYWJlbFNwYW4gPSAkdGFiLmZpbmQoJ3NwYW4nKVxuICAgICAgICB0YWJOYW1lID0gJGxhYmVsU3Bhbi50ZXh0KClcblxuICAgICAgICAkaW5wdXQudmFsKHRhYk5hbWUpXG4gICAgfSxcblxuICAgIG9wZW5PcHRpb25zTW9kYWwoZSkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICBsZXQgbW9kYWxcbiAgICAgICAgbGV0IHRhYklkXG4gICAgICAgIGxldCAkdGFiID0gZS4kdGFiXG4gICAgICAgIGxldCAkbGFiZWxTcGFuXG5cbiAgICAgICAgJGxhYmVsU3BhbiA9ICR0YWIuZmluZCgnLnRhYnMgLnRhYiBzcGFuJylcbiAgICAgICAgdGFiTmFtZSA9ICRsYWJlbFNwYW4udGV4dCgpXG4gICAgICAgIHRhYklkID0gZS50YWJJZFxuXG4gICAgICAgIG1vZGFsID0gbmV3IFRhYk9wdGlvbnNNb2RhbCgkdGFiKVxuICAgICAgICBtb2RhbC5vbignc2V0T3B0aW9ucycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YSh0YWJJZCwgZS5vcHRpb25zLCB0YWJOYW1lKSlcbiAgICAgICAgbW9kYWwuc2hvdyh0aGlzLm9wdGlvbnMpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKHRhYklkLCBvcHRpb25zLCB0YWJOYW1lKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCAkY29udGFpbmVyXG4gICAgICAgIGxldCBuYW1lXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgJGNvbnRhaW5lciA9ICQoJ1tkYXRhLWlkPVwiJyt0YWJJZCsnXCJdJykucGFyZW50KClcbiAgICAgICAgbmFtZSA9IHRoaXMubmFtZXNwYWNlICsgJ1t0YWJdWycgKyB0YWJJZCArICddW29wdGlvbnNdJ1xuXG4gICAgICAgICQuZWFjaChvcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGNvbnRhaW5lci5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmNoaWxkcmVuKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkudmFsKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuY2hpbGRyZW4oYGlucHV0W25hbWU9XCIke25hbWV9WyR7a2V5fV1cIl1gKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZVByZXZpZXcodGFiSWQsICRjb250YWluZXIsIGtleSwgaXRlbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldyh0YWJJZCwgJGNvbnRhaW5lciwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgJGNvbnRhaW5lci5maW5kKCcudGFiLW5hbWUtZmllbGQnKS52YWwodGFiTmFtZSlcbiAgICB9LFxuXG4gICAgdXBkYXRlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIGJvZHkgPSB0YXJnZXQuZmluZCgnLmZpZWxkLW9wdGlvbnMtcHJldmlldycpXG4gICAgICAgIG1hcmt1cCA9ICQoJzxkaXYgY2xhc3M9XCJmaWVsZC0nKyB0eXBlICsnLXByZXZpZXdcIj48c3BhbiBjbGFzcz1cInByZXZpZXctdHlwZVwiPicrIHR5cGUgKyc8L3NwYW4+ICcrdmFsdWUrJzwvZGl2PicpXG4gICAgICAgIG9sZE1hcmt1cCA9IGJvZHkuZmluZCgnLmZpZWxkLScrIHR5cGUgKyctcHJldmlldycpXG5cbiAgICAgICAgaWYgKG9sZE1hcmt1cCkge1xuICAgICAgICAgICAgb2xkTWFya3VwLnJlbW92ZSgpXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrdXAuYXBwZW5kVG8oYm9keSlcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJldmlldyh0YWJJZCwgdGFiLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICB0YXJnZXQgPSAkKCdbZGF0YS1pZD1cIicrdGFiSWQrJ1wiXScpLnBhcmVudCgpXG4gICAgICAgIHRhcmdldC5maW5kKCcuZmllbGQtJyt0eXBlKyctcHJldmlldycpLnJlbW92ZSgpXG4gICAgfVxuXG59KVxuXG5UYWJPcHRpb25zTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgdGFiOiBudWxsLFxuICAgIGZvcm06IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG5cbiAgICBpbml0KHRhYikge1xuICAgICAgICBsZXQgYm9keVxuICAgICAgICB0aGlzLnRhYiA9IHRhYlxuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm1Db250YWluZXIpXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0F0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0N1c3RvbSB0YWIgYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBpbnB1dC1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0lEJywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtaWRcIj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZm9vdGVyPidcbiAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybUNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy4kaW5wdXRDbGFzcyA9IGJvZHkuZmluZCgnLmlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaW5wdXRJZCA9IGJvZHkuZmluZCgnLmlucHV0LWlkJylcblxuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKVxuXG4gICAgICAgIHRoaXMubG9hZE1vZGFsVmFsdWVzKClcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2hpZGUnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm1Db250YWluZXIsICdzdWJtaXQnLCAnb25Gb3JtU3VibWl0JylcbiAgICB9LFxuXG4gICAgbG9hZE1vZGFsVmFsdWVzKCkge1xuICAgICAgICB0YWJJZCA9IHRoaXMudGFiLmZpbmQoJy50YWInKS5kYXRhKCdpZCcpXG4gICAgICAgICRjbGFzc0lucHV0ID0gJCgnaW5wdXRbbmFtZT1cImZvcm0tYnVpbGRlclt0YWJdWycrIHRhYklkICsnXVtvcHRpb25zXVtjbGFzc11cIl0nKS52YWwoKVxuICAgICAgICAkaWRJbnB1dCA9ICQoJ2lucHV0W25hbWU9XCJmb3JtLWJ1aWxkZXJbdGFiXVsnKyB0YWJJZCArJ11bb3B0aW9uc11baWRdXCJdJykudmFsKClcblxuICAgICAgICBpZiAoJGNsYXNzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmlucHV0LWNsYXNzJykudmFsKCRjbGFzc0lucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpZElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1pZCcpLnZhbCgkaWRJbnB1dClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkZvcm1TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3NldE9wdGlvbnMnLCB7XG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgXCJjbGFzc1wiOiB0aGlzLiRpbnB1dENsYXNzLnZhbCgpLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLiRpbnB1dElkLnZhbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICB9LFxuXG4gICAgb25GYWRlT3V0KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0sXG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlKClcbiAgICAgICAgdGhpcy4kc2hhZGUucmVtb3ZlKClcbiAgICB9LFxuXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCB2YWx1ZXNcblxuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKG9wdGlvbnNbdGhpcy50YWIubmFtZV0pXG4gICAgICAgIH1cblxuICAgICAgICQuZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnY2xhc3MnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRDbGFzcy52YWwodmFsdWUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiRpbnB1dElkLnZhbCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICB9KVxuXG4gICAgICAgIGlmICghR2FybmlzaC5pc01vYmlsZUJyb3dzZXIoKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dENsYXNzLmZvY3VzKCk7XG4gICAgICAgICAgICB9KSwgdGhpcyksIDEwMClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICB9XG4gICBcblxufSlcblxuXG53aW5kb3cuTERfVGFicyA9IExEX1RhYnNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy90YWItZGVzaWduZXIuanMiXSwic291cmNlUm9vdCI6IiJ9