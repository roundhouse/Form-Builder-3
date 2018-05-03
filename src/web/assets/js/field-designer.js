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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

var LD_Fields = void 0;

LD_Fields = {
    setup: function setup() {}
};

LD_Fields = new (Garnish.Base.extend({
    fields: null,
    options: null,

    init: function init() {
        this.fields = {};
        this.options = {};
    },
    setup: function setup() {
        var self = void 0;
        var FLD = void 0;
        var FLD_init = void 0;
        var FLD_field = void 0;
        var FLD_fieldOptions = void 0;
        self = this;

        if (Craft.FieldLayoutDesigner) {
            FLD = Craft.FieldLayoutDesigner;
            FLD_init = FLD.prototype.init;
            FLD_field = FLD.prototype.initField;
            FLD_fieldOptions = FLD.prototype.onFieldOptionSelect;

            FLD.prototype.init = function () {
                FLD_init.apply(this, arguments);
                this.fieldEditor = new FieldEditor(this);
            };

            FLD.prototype.initField = function ($field) {
                var $preview = void 0;
                var $editBtn = void 0;
                var $html = void 0;
                var $menu = void 0;
                var $ul = void 0;
                var menu = void 0;
                var menuBtn = void 0;

                FLD_field.apply(this, arguments);

                $editBtn = $field.find('.settings');
                menuBtn = $editBtn.data('menubtn');
                menu = menuBtn.menu;
                $menu = menu.$container;
                $ul = $menu.children('ul');
                $html = $('<li><a data-action="fieldoptions">' + Craft.t('form-builder', 'Options') + '</a></li>').appendTo($ul);

                $preview = $(['<div class="field-options-preview">', '</div>'].join('')).appendTo($field);

                return menu.addOptions($html.children('a'));
            };

            FLD.prototype.onFieldOptionSelect = function (option) {
                var $field = void 0;
                var $option = void 0;
                var action = void 0;

                FLD_fieldOptions.apply(this, arguments);

                $option = $(option);
                $field = $option.data('menu').$anchor.parent();
                action = $option.data('action');

                switch (action) {
                    case 'fieldoptions':
                        this.trigger('fieldOptionsSelected', {
                            target: $option[0],
                            $target: $option,
                            $field: $field,
                            fld: this,
                            id: $field.data('id') | 0
                        });
                }
            };
        }
    },
    getOptions: function getOptions(layoutId) {
        var options = void 0;
        options = {};

        $.each(this.options, function (key, item) {
            if (parseInt(item.fieldLayoutId) == layoutId) {
                options[item.fieldId] = item.options;
            }
        });

        return options;
    }
}))();

FieldEditor = Garnish.Base.extend({
    fld: null,
    options: null,
    layoutId: null,
    namespace: 'form-builder',

    init: function init(fld) {
        this.fld = fld;
        this.layoutId = LD.getLayoutId();
        this.options = LD_Fields.getOptions(this.layoutId);

        this.fld.on('fieldOptionsSelected', $.proxy(this.openOptionsModal, this));

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
    openOptionsModal: function openOptionsModal(e) {
        var self = void 0;
        var formId = void 0;
        var modal = void 0;
        self = this;
        formId = e.id;

        modal = new FieldOptionsModal(e);
        modal.on('setOptions', function (e) {
            return self.setFormData(formId, e.options);
        });
        modal.show(this.options);
    },
    setFormData: function setFormData(fieldId, options) {
        var self = void 0;
        var $container = void 0;
        var $field = void 0;
        var name = void 0;
        self = this;

        $container = this.fld.$container;
        $field = $container.find('.fld-field[data-id="' + fieldId + '"]:not(".unused")');
        name = this.namespace + '[field][' + fieldId + '][options]';

        $.each(options, function (key, item) {
            if ($field.children('input[name="' + name + '[' + key + ']"]').length > 0) {
                if (item) {
                    $field.children('input[name="' + name + '[' + key + ']"]').val(item);
                    self.updatePreview($field, key, item);
                } else {
                    $field.children('input[name="' + name + '[' + key + ']"]').remove();
                    self.removePreview($field, key, item);
                }
            } else {
                if (item) {
                    self.updatePreview($field, key, item);
                    $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($field);
                }
            }
        });
    },
    updatePreview: function updatePreview(field, type, value) {
        body = field.find('.field-options-preview');
        markup = $('<div class="field-' + type + '-preview"><span class="preview-type">' + type + '</span> ' + value + '</div>');
        oldMarkup = body.find('.field-' + type + '-preview');

        if (oldMarkup) {
            oldMarkup.remove();
        }

        markup.appendTo(body);
    },
    removePreview: function removePreview(field, type, value) {
        field.find('.field-' + type + '-preview').remove();
    }
});

FieldOptionsModal = Garnish.Modal.extend({
    field: null,
    $formContainer: null,
    $classInput: null,
    $idInput: null,
    $templateInput: null,

    init: function init(field) {
        var body = void 0;
        this.field = field;
        this.base();

        this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);

        body = $(['<section class="modal-container">', '<div class="modal-sidebar">', '<nav>', '<a href="#" class="modal-nav active" data-target="modal-content-styles"><i class="far fa-magic"></i> <span class="link-text">Styles</span></a>', '<a href="#" class="modal-nav" data-target="modal-content-settings"><i class="far fa-cog"></i> <span class="link-text">Settings</span></a>', '</nav>', '</div>', '<div class="modal-content-container">', '<div class="modal-content modal-content-styles active">', '<header>', '<span class="modal-title">', 'Attributes', '</span>', '<div class="instructions">', 'Custom field attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth input-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth input-id">', '</div>', '</div>', '</div>', '<div class="modal-content modal-content-settings">', '<header>', '<span class="modal-title">', 'Settings', '</span>', '<div class="instructions">', 'Custom field settings', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'TEMPLATE', '</div>', '<input type="text" class="text fullwidth input-template">', '</div>', '</div>', '</div>', '</div>', '</section>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$classInput = body.find('.input-class');
        this.$idInput = body.find('.input-id');
        this.$templateInput = body.find('.input-template');

        this.$navLink = body.find('.modal-nav');
        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$navLink, 'click', 'toggleModalContent');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    loadModalValues: function loadModalValues() {
        $classInput = $('input[name="form-builder[field][' + this.field.id + '][options][class]"]').val();
        $idInput = $('input[name="form-builder[field][' + this.field.id + '][options][id]"]').val();
        $templateInput = $('input[name="form-builder[field][' + this.field.id + '][options][template]"]').val();

        if ($classInput) {
            this.$formContainer.find('.input-class').val($classInput);
        }

        if ($idInput) {
            this.$formContainer.find('.input-id').val($idInput);
        }

        if ($templateInput) {
            this.$formContainer.find('.input-template').val($templateInput);
        }
    },
    toggleModalContent: function toggleModalContent(e) {
        var _this2 = this;

        e.preventDefault();
        var target = void 0;
        var link = void 0;
        var height = void 0;

        link = $(e.currentTarget);
        target = link.data('target');
        height = $('.' + target).height() + 53;

        $('.modal-nav').removeClass('active');
        $('.modal-content').removeClass('active');

        link.addClass('active');
        $('.' + target).addClass('active');

        this.$container.velocity('stop');
        this.$container.velocity({ height: height }, 'fast', function () {
            _this2.$container.css({
                height: height,
                minHeight: 'auto'
            });
        });
    },
    onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();

        if (!this.visible) {
            return;
        }

        this.trigger('setOptions', {
            options: {
                "class": this.$classInput.val(),
                id: this.$idInput.val(),
                template: this.$templateInput.val()
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
        self = this;

        if (options.length > 0) {
            values = JSON.parse(options[this.field.id]);

            $.each(values, function (key, value) {
                if (key == 'class' && value) {
                    self.$classInput.val(value);
                }

                if (key == 'id' && value) {
                    self.$idInput.val(value);
                }
            });

            if (!Garnish.isMobileBrowser()) {
                setTimeout($.proxy(function () {
                    this.$classInput.focus();
                }));
            }
        }

        this.base();
    }
});

window.LD_Fields = LD_Fields;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjE2ZmFhNDQxYTg1YWJhYjcwYmYiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZmllbGQtZGVzaWduZXIuanMiXSwibmFtZXMiOlsiTERfRmllbGRzIiwic2V0dXAiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsImZpZWxkcyIsIm9wdGlvbnMiLCJpbml0Iiwic2VsZiIsIkZMRCIsIkZMRF9pbml0IiwiRkxEX2ZpZWxkIiwiRkxEX2ZpZWxkT3B0aW9ucyIsIkNyYWZ0IiwiRmllbGRMYXlvdXREZXNpZ25lciIsInByb3RvdHlwZSIsImluaXRGaWVsZCIsIm9uRmllbGRPcHRpb25TZWxlY3QiLCJhcHBseSIsImFyZ3VtZW50cyIsImZpZWxkRWRpdG9yIiwiRmllbGRFZGl0b3IiLCIkZmllbGQiLCIkcHJldmlldyIsIiRlZGl0QnRuIiwiJGh0bWwiLCIkbWVudSIsIiR1bCIsIm1lbnUiLCJtZW51QnRuIiwiZmluZCIsImRhdGEiLCIkY29udGFpbmVyIiwiY2hpbGRyZW4iLCIkIiwidCIsImFwcGVuZFRvIiwiam9pbiIsImFkZE9wdGlvbnMiLCJvcHRpb24iLCIkb3B0aW9uIiwiYWN0aW9uIiwiJGFuY2hvciIsInBhcmVudCIsInRyaWdnZXIiLCJ0YXJnZXQiLCIkdGFyZ2V0IiwiZmxkIiwiaWQiLCJnZXRPcHRpb25zIiwibGF5b3V0SWQiLCJlYWNoIiwia2V5IiwiaXRlbSIsInBhcnNlSW50IiwiZmllbGRMYXlvdXRJZCIsImZpZWxkSWQiLCJuYW1lc3BhY2UiLCJMRCIsImdldExheW91dElkIiwib24iLCJwcm94eSIsIm9wZW5PcHRpb25zTW9kYWwiLCJhcHBseU9wdGlvbnMiLCJyZXN1bHRzIiwidmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJzZXRGb3JtRGF0YSIsImUiLCJmb3JtSWQiLCJtb2RhbCIsIkZpZWxkT3B0aW9uc01vZGFsIiwic2hvdyIsIm5hbWUiLCJsZW5ndGgiLCJ2YWwiLCJ1cGRhdGVQcmV2aWV3IiwicmVtb3ZlIiwicmVtb3ZlUHJldmlldyIsImZpZWxkIiwidHlwZSIsImJvZHkiLCJtYXJrdXAiLCJvbGRNYXJrdXAiLCJNb2RhbCIsIiRmb3JtQ29udGFpbmVyIiwiJGNsYXNzSW5wdXQiLCIkaWRJbnB1dCIsIiR0ZW1wbGF0ZUlucHV0IiwiYmFzZSIsIiRib2QiLCJzZXRDb250YWluZXIiLCIkbmF2TGluayIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJhZGRMaXN0ZW5lciIsInRvZ2dsZU1vZGFsQ29udGVudCIsInByZXZlbnREZWZhdWx0IiwibGluayIsImhlaWdodCIsImN1cnJlbnRUYXJnZXQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidmVsb2NpdHkiLCJjc3MiLCJtaW5IZWlnaHQiLCJvbkZvcm1TdWJtaXQiLCJ2aXNpYmxlIiwidGVtcGxhdGUiLCJoaWRlIiwib25GYWRlT3V0IiwiZGVzdHJveSIsIiRzaGFkZSIsInZhbHVlcyIsImlzTW9iaWxlQnJvd3NlciIsInNldFRpbWVvdXQiLCJmb2N1cyIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLGtCQUFKOztBQUVBQSxZQUFZO0FBQ1JDLFNBRFEsbUJBQ0EsQ0FB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ZS9zcmMvd2ViL2Fzc2V0cy9qcy9maWVsZC1kZXNpZ25lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTZmYWE0NDFhODVhYmFiNzBiZiIsImxldCBMRF9GaWVsZHNcblxuTERfRmllbGRzID0ge1xuICAgIHNldHVwKCkge31cbn1cblxuTERfRmllbGRzID0gbmV3IChHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICBmaWVsZHM6IG51bGwsXG4gICAgb3B0aW9uczogbnVsbCxcblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZmllbGRzID0ge31cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge31cbiAgICB9LFxuXG4gICAgc2V0dXAoKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCBGTERcbiAgICAgICAgbGV0IEZMRF9pbml0XG4gICAgICAgIGxldCBGTERfZmllbGRcbiAgICAgICAgbGV0IEZMRF9maWVsZE9wdGlvbnNcbiAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgICBpZiAoQ3JhZnQuRmllbGRMYXlvdXREZXNpZ25lcikge1xuICAgICAgICAgICAgRkxEID0gQ3JhZnQuRmllbGRMYXlvdXREZXNpZ25lclxuICAgICAgICAgICAgRkxEX2luaXQgPSBGTEQucHJvdG90eXBlLmluaXRcbiAgICAgICAgICAgIEZMRF9maWVsZCA9IEZMRC5wcm90b3R5cGUuaW5pdEZpZWxkXG4gICAgICAgICAgICBGTERfZmllbGRPcHRpb25zID0gRkxELnByb3RvdHlwZS5vbkZpZWxkT3B0aW9uU2VsZWN0XG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIEZMRF9pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkRWRpdG9yID0gbmV3IEZpZWxkRWRpdG9yKHRoaXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZMRC5wcm90b3R5cGUuaW5pdEZpZWxkID0gZnVuY3Rpb24oJGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRwcmV2aWV3XG4gICAgICAgICAgICAgICAgbGV0ICRlZGl0QnRuXG4gICAgICAgICAgICAgICAgbGV0ICRodG1sXG4gICAgICAgICAgICAgICAgbGV0ICRtZW51XG4gICAgICAgICAgICAgICAgbGV0ICR1bFxuICAgICAgICAgICAgICAgIGxldCBtZW51XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVCdG5cblxuICAgICAgICAgICAgICAgIEZMRF9maWVsZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cbiAgICAgICAgICAgICAgICAkZWRpdEJ0biA9ICRmaWVsZC5maW5kKCcuc2V0dGluZ3MnKVxuICAgICAgICAgICAgICAgIG1lbnVCdG4gPSAkZWRpdEJ0bi5kYXRhKCdtZW51YnRuJylcbiAgICAgICAgICAgICAgICBtZW51ID0gbWVudUJ0bi5tZW51XG4gICAgICAgICAgICAgICAgJG1lbnUgPSBtZW51LiRjb250YWluZXJcbiAgICAgICAgICAgICAgICAkdWwgPSAkbWVudS5jaGlsZHJlbigndWwnKVxuICAgICAgICAgICAgICAgICRodG1sID0gJCgnPGxpPjxhIGRhdGEtYWN0aW9uPVwiZmllbGRvcHRpb25zXCI+JyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdPcHRpb25zJykgKyAnPC9hPjwvbGk+JykuYXBwZW5kVG8oJHVsKVxuXG4gICAgICAgICAgICAgICAgJHByZXZpZXcgPSAkKFtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWVsZC1vcHRpb25zLXByZXZpZXdcIj4nLFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgICAgIF0uam9pbignJykpLmFwcGVuZFRvKCRmaWVsZClcblxuICAgICAgICAgICAgICAgIHJldHVybiBtZW51LmFkZE9wdGlvbnMoJGh0bWwuY2hpbGRyZW4oJ2EnKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5vbkZpZWxkT3B0aW9uU2VsZWN0ID0gZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGV0ICRmaWVsZFxuICAgICAgICAgICAgICAgIGxldCAkb3B0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvblxuXG4gICAgICAgICAgICAgICAgRkxEX2ZpZWxkT3B0aW9ucy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cbiAgICAgICAgICAgICAgICAkb3B0aW9uID0gJChvcHRpb24pXG4gICAgICAgICAgICAgICAgJGZpZWxkID0gJG9wdGlvbi5kYXRhKCdtZW51JykuJGFuY2hvci5wYXJlbnQoKVxuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICRvcHRpb24uZGF0YSgnYWN0aW9uJylcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2ZpZWxkb3B0aW9ucyc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2ZpZWxkT3B0aW9uc1NlbGVjdGVkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogJG9wdGlvblswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0OiAkb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZDogJGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJGZpZWxkLmRhdGEoJ2lkJykgfCAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRPcHRpb25zKGxheW91dElkKSB7XG4gICAgICAgIGxldCBvcHRpb25zXG4gICAgICAgIG9wdGlvbnMgPSB7fVxuXG4gICAgICAgICQuZWFjaCh0aGlzLm9wdGlvbnMsIChrZXksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJzZUludChpdGVtLmZpZWxkTGF5b3V0SWQpID09IGxheW91dElkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1tpdGVtLmZpZWxkSWRdID0gaXRlbS5vcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG59KSlcblxuRmllbGRFZGl0b3IgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICBmbGQ6IG51bGwsXG4gICAgb3B0aW9uczogbnVsbCxcbiAgICBsYXlvdXRJZDogbnVsbCxcbiAgICBuYW1lc3BhY2U6ICdmb3JtLWJ1aWxkZXInLFxuXG4gICAgaW5pdChmbGQpIHtcbiAgICAgICAgdGhpcy5mbGQgPSBmbGRcbiAgICAgICAgdGhpcy5sYXlvdXRJZCA9IExELmdldExheW91dElkKClcbiAgICAgICAgdGhpcy5vcHRpb25zID0gTERfRmllbGRzLmdldE9wdGlvbnModGhpcy5sYXlvdXRJZClcblxuICAgICAgICB0aGlzLmZsZC5vbignZmllbGRPcHRpb25zU2VsZWN0ZWQnLCAkLnByb3h5KHRoaXMub3Blbk9wdGlvbnNNb2RhbCwgdGhpcykpXG5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0SWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5T3B0aW9ucyh0aGlzLmxheW91dElkKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFwcGx5T3B0aW9ucyhsYXlvdXRJZCkge1xuICAgICAgICBsZXQgcmVzdWx0c1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMgPSBbXVxuXG4gICAgICAgICAgICAkLmVhY2godGhpcy5vcHRpb25zLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZSh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2V0Rm9ybURhdGEoa2V5LCBKU09OLnBhcnNlKHZhbHVlKSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0c1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgb3Blbk9wdGlvbnNNb2RhbChlKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCBmb3JtSWRcbiAgICAgICAgbGV0IG1vZGFsXG4gICAgICAgIHNlbGYgPSB0aGlzXG4gICAgICAgIGZvcm1JZCA9IGUuaWRcblxuICAgICAgICBtb2RhbCA9IG5ldyBGaWVsZE9wdGlvbnNNb2RhbChlKVxuICAgICAgICBtb2RhbC5vbignc2V0T3B0aW9ucycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YShmb3JtSWQsIGUub3B0aW9ucykpXG4gICAgICAgIG1vZGFsLnNob3codGhpcy5vcHRpb25zKVxuICAgIH0sXG5cbiAgICBzZXRGb3JtRGF0YShmaWVsZElkLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIGxldCAkY29udGFpbmVyXG4gICAgICAgIGxldCAkZmllbGRcbiAgICAgICAgbGV0IG5hbWVcbiAgICAgICAgc2VsZiA9IHRoaXNcblxuICAgICAgICAkY29udGFpbmVyID0gdGhpcy5mbGQuJGNvbnRhaW5lclxuICAgICAgICAkZmllbGQgPSAkY29udGFpbmVyLmZpbmQoJy5mbGQtZmllbGRbZGF0YS1pZD1cIicgKyBmaWVsZElkICsgJ1wiXTpub3QoXCIudW51c2VkXCIpJylcbiAgICAgICAgbmFtZSA9IHRoaXMubmFtZXNwYWNlICsgJ1tmaWVsZF1bJyArIGZpZWxkSWQgKyAnXVtvcHRpb25zXSdcblxuICAgICAgICAkLmVhY2gob3B0aW9ucywgKGtleSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWVsZC5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkZmllbGQuY2hpbGRyZW4oYGlucHV0W25hbWU9XCIke25hbWV9WyR7a2V5fV1cIl1gKS52YWwoaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQcmV2aWV3KCRmaWVsZCwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRmaWVsZC5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlUHJldmlldygkZmllbGQsIGtleSwgaXRlbSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlUHJldmlldygkZmllbGQsIGtleSwgaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgJChgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJHtuYW1lfVske2tleX1dXCI+YCkudmFsKGl0ZW0pLmFwcGVuZFRvKCRmaWVsZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHVwZGF0ZVByZXZpZXcoZmllbGQsIHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIGJvZHkgPSBmaWVsZC5maW5kKCcuZmllbGQtb3B0aW9ucy1wcmV2aWV3JylcbiAgICAgICAgbWFya3VwID0gJCgnPGRpdiBjbGFzcz1cImZpZWxkLScrIHR5cGUgKyctcHJldmlld1wiPjxzcGFuIGNsYXNzPVwicHJldmlldy10eXBlXCI+JysgdHlwZSArJzwvc3Bhbj4gJyt2YWx1ZSsnPC9kaXY+JylcbiAgICAgICAgb2xkTWFya3VwID0gYm9keS5maW5kKCcuZmllbGQtJysgdHlwZSArJy1wcmV2aWV3JylcblxuICAgICAgICBpZiAob2xkTWFya3VwKSB7XG4gICAgICAgICAgICBvbGRNYXJrdXAucmVtb3ZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmt1cC5hcHBlbmRUbyhib2R5KVxuICAgIH0sXG5cbiAgICByZW1vdmVQcmV2aWV3KGZpZWxkLCB0eXBlLCB2YWx1ZSkge1xuICAgICAgICBmaWVsZC5maW5kKCcuZmllbGQtJyt0eXBlKyctcHJldmlldycpLnJlbW92ZSgpXG4gICAgfVxufSlcblxuRmllbGRPcHRpb25zTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgZmllbGQ6IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG4gICAgJGNsYXNzSW5wdXQ6IG51bGwsXG4gICAgJGlkSW5wdXQ6IG51bGwsXG4gICAgJHRlbXBsYXRlSW5wdXQ6IG51bGwsXG5cbiAgICBpbml0KGZpZWxkKSB7XG4gICAgICAgIGxldCBib2R5XG4gICAgICAgIHRoaXMuZmllbGQgPSBmaWVsZFxuICAgICAgICB0aGlzLmJhc2UoKVxuXG4gICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIgPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbCBoYXMtc2lkZWJhclwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybUNvbnRhaW5lcilcblxuICAgICAgICBib2R5ID0gJChbXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj4nLFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtc2lkZWJhclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPG5hdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwibW9kYWwtbmF2IGFjdGl2ZVwiIGRhdGEtdGFyZ2V0PVwibW9kYWwtY29udGVudC1zdHlsZXNcIj48aSBjbGFzcz1cImZhciBmYS1tYWdpY1wiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaW5rLXRleHRcIj5TdHlsZXM8L3NwYW4+PC9hPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtb2RhbC1uYXZcIiBkYXRhLXRhcmdldD1cIm1vZGFsLWNvbnRlbnQtc2V0dGluZ3NcIj48aSBjbGFzcz1cImZhciBmYS1jb2dcIj48L2k+IDxzcGFuIGNsYXNzPVwibGluay10ZXh0XCI+U2V0dGluZ3M8L3NwYW4+PC9hPicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9uYXY+JywgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudC1jb250YWluZXJcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IG1vZGFsLWNvbnRlbnQtc3R5bGVzIGFjdGl2ZVwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxoZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nLCAnQXR0cmlidXRlcycsICc8L3NwYW4+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnN0cnVjdGlvbnNcIj4nLCAnQ3VzdG9tIGZpZWxkIGF0dHJpYnV0ZXMnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NMQVNTJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtY2xhc3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJRCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHQgZnVsbHdpZHRoIGlucHV0LWlkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IG1vZGFsLWNvbnRlbnQtc2V0dGluZ3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ1NldHRpbmdzJywgJzwvc3Bhbj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicsICdDdXN0b20gZmllbGQgc2V0dGluZ3MnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1RFTVBMQVRFJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtdGVtcGxhdGVcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgJzwvc2VjdGlvbj4nLFxuICAgICAgICAgICAgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpfVwiPmAsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpfVwiPmAsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Zvb3Rlcj4nXG4gICAgICAgIF0uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm1Db250YWluZXIpO1xuXG4gICAgICAgIHRoaXMuJGNsYXNzSW5wdXQgPSBib2R5LmZpbmQoJy5pbnB1dC1jbGFzcycpXG4gICAgICAgIHRoaXMuJGlkSW5wdXQgPSBib2R5LmZpbmQoJy5pbnB1dC1pZCcpXG4gICAgICAgIHRoaXMuJHRlbXBsYXRlSW5wdXQgPSBib2R5LmZpbmQoJy5pbnB1dC10ZW1wbGF0ZScpXG5cbiAgICAgICAgdGhpcy4kbmF2TGluayA9IGJvZHkuZmluZCgnLm1vZGFsLW5hdicpXG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpXG5cbiAgICAgICAgdGhpcy5sb2FkTW9kYWxWYWx1ZXMoKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kbmF2TGluaywgJ2NsaWNrJywgJ3RvZ2dsZU1vZGFsQ29udGVudCcpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybUNvbnRhaW5lciwgJ3N1Ym1pdCcsICdvbkZvcm1TdWJtaXQnKVxuICAgIH0sXG5cbiAgICBsb2FkTW9kYWxWYWx1ZXMoKSB7XG4gICAgICAgICRjbGFzc0lucHV0ID0gJCgnaW5wdXRbbmFtZT1cImZvcm0tYnVpbGRlcltmaWVsZF1bJysgdGhpcy5maWVsZC5pZCArJ11bb3B0aW9uc11bY2xhc3NdXCJdJykudmFsKClcbiAgICAgICAgJGlkSW5wdXQgPSAkKCdpbnB1dFtuYW1lPVwiZm9ybS1idWlsZGVyW2ZpZWxkXVsnKyB0aGlzLmZpZWxkLmlkICsnXVtvcHRpb25zXVtpZF1cIl0nKS52YWwoKVxuICAgICAgICAkdGVtcGxhdGVJbnB1dCA9ICQoJ2lucHV0W25hbWU9XCJmb3JtLWJ1aWxkZXJbZmllbGRdWycrIHRoaXMuZmllbGQuaWQgKyddW29wdGlvbnNdW3RlbXBsYXRlXVwiXScpLnZhbCgpXG5cbiAgICAgICAgaWYgKCRjbGFzc0lucHV0KSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1jbGFzcycpLnZhbCgkY2xhc3NJbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaWRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuaW5wdXQtaWQnKS52YWwoJGlkSW5wdXQpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHRlbXBsYXRlSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmlucHV0LXRlbXBsYXRlJykudmFsKCR0ZW1wbGF0ZUlucHV0KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRvZ2dsZU1vZGFsQ29udGVudChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgdGFyZ2V0XG4gICAgICAgIGxldCBsaW5rXG4gICAgICAgIGxldCBoZWlnaHRcblxuICAgICAgICBsaW5rID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgICAgIHRhcmdldCA9IGxpbmsuZGF0YSgndGFyZ2V0JylcbiAgICAgICAgaGVpZ2h0ID0gJCgnLicrdGFyZ2V0KS5oZWlnaHQoKSArIDUzXG5cbiAgICAgICAgJCgnLm1vZGFsLW5hdicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuXG4gICAgICAgIGxpbmsuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQoJy4nK3RhcmdldCkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJylcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtoZWlnaHQ6IGhlaWdodH0sICdmYXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnYXV0bydcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uRm9ybVN1Ym1pdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignc2V0T3B0aW9ucycsIHtcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBcImNsYXNzXCI6IHRoaXMuJGNsYXNzSW5wdXQudmFsKCksXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuJGlkSW5wdXQudmFsKCksXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRoaXMuJHRlbXBsYXRlSW5wdXQudmFsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmhpZGUoKVxuICAgIH0sXG5cbiAgICBvbkZhZGVPdXQoKSB7XG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgfSxcblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKVxuICAgICAgICB0aGlzLiRzaGFkZS5yZW1vdmUoKVxuICAgIH0sXG5cbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0IHZhbHVlc1xuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IEpTT04ucGFyc2Uob3B0aW9uc1t0aGlzLmZpZWxkLmlkXSlcblxuICAgICAgICAgICAgJC5lYWNoKHZhbHVlcywgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdjbGFzcycgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kY2xhc3NJbnB1dC52YWwodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnaWQnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGlkSW5wdXQudmFsKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghR2FybmlzaC5pc01vYmlsZUJyb3dzZXIoKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGNsYXNzSW5wdXQuZm9jdXMoKVxuICAgICAgICAgICAgICAgIH0pKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICB9XG5cbn0pXG5cbndpbmRvdy5MRF9GaWVsZHMgPSBMRF9GaWVsZHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9maWVsZC1kZXNpZ25lci5qcyJdLCJzb3VyY2VSb290IjoiIn0=