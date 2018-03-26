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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGI4MGVhYmZmNWJiMTlkYTA1NDUiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZmllbGQtZGVzaWduZXIuanMiXSwibmFtZXMiOlsiTERfRmllbGRzIiwic2V0dXAiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsImZpZWxkcyIsIm9wdGlvbnMiLCJpbml0Iiwic2VsZiIsIkZMRCIsIkZMRF9pbml0IiwiRkxEX2ZpZWxkIiwiRkxEX2ZpZWxkT3B0aW9ucyIsIkNyYWZ0IiwiRmllbGRMYXlvdXREZXNpZ25lciIsInByb3RvdHlwZSIsImluaXRGaWVsZCIsIm9uRmllbGRPcHRpb25TZWxlY3QiLCJhcHBseSIsImFyZ3VtZW50cyIsImZpZWxkRWRpdG9yIiwiRmllbGRFZGl0b3IiLCIkZmllbGQiLCIkcHJldmlldyIsIiRlZGl0QnRuIiwiJGh0bWwiLCIkbWVudSIsIiR1bCIsIm1lbnUiLCJtZW51QnRuIiwiZmluZCIsImRhdGEiLCIkY29udGFpbmVyIiwiY2hpbGRyZW4iLCIkIiwidCIsImFwcGVuZFRvIiwiam9pbiIsImFkZE9wdGlvbnMiLCJvcHRpb24iLCIkb3B0aW9uIiwiYWN0aW9uIiwiJGFuY2hvciIsInBhcmVudCIsInRyaWdnZXIiLCJ0YXJnZXQiLCIkdGFyZ2V0IiwiZmxkIiwiaWQiLCJnZXRPcHRpb25zIiwibGF5b3V0SWQiLCJlYWNoIiwia2V5IiwiaXRlbSIsInBhcnNlSW50IiwiZmllbGRMYXlvdXRJZCIsImZpZWxkSWQiLCJuYW1lc3BhY2UiLCJMRCIsImdldExheW91dElkIiwib24iLCJwcm94eSIsIm9wZW5PcHRpb25zTW9kYWwiLCJhcHBseU9wdGlvbnMiLCJyZXN1bHRzIiwidmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJzZXRGb3JtRGF0YSIsImUiLCJmb3JtSWQiLCJtb2RhbCIsIkZpZWxkT3B0aW9uc01vZGFsIiwic2hvdyIsIm5hbWUiLCJsZW5ndGgiLCJ2YWwiLCJ1cGRhdGVQcmV2aWV3IiwicmVtb3ZlIiwicmVtb3ZlUHJldmlldyIsImZpZWxkIiwidHlwZSIsImJvZHkiLCJtYXJrdXAiLCJvbGRNYXJrdXAiLCJNb2RhbCIsIiRmb3JtQ29udGFpbmVyIiwiJGNsYXNzSW5wdXQiLCIkaWRJbnB1dCIsIiR0ZW1wbGF0ZUlucHV0IiwiYmFzZSIsIiRib2QiLCJzZXRDb250YWluZXIiLCIkbmF2TGluayIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJhZGRMaXN0ZW5lciIsInRvZ2dsZU1vZGFsQ29udGVudCIsInByZXZlbnREZWZhdWx0IiwibGluayIsImhlaWdodCIsImN1cnJlbnRUYXJnZXQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidmVsb2NpdHkiLCJjc3MiLCJtaW5IZWlnaHQiLCJvbkZvcm1TdWJtaXQiLCJ2aXNpYmxlIiwidGVtcGxhdGUiLCJoaWRlIiwib25GYWRlT3V0IiwiZGVzdHJveSIsIiRzaGFkZSIsInZhbHVlcyIsImlzTW9iaWxlQnJvd3NlciIsInNldFRpbWVvdXQiLCJmb2N1cyIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLGtCQUFKOztBQUVBQSxZQUFZO0FBQ1JDLFNBRFEsbUJBQ0EsQ0FB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ZS9zcmMvYXNzZXRzL2pzL2ZpZWxkLWRlc2lnbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhiODBlYWJmZjViYjE5ZGEwNTQ1IiwibGV0IExEX0ZpZWxkc1xuXG5MRF9GaWVsZHMgPSB7XG4gICAgc2V0dXAoKSB7fVxufVxuXG5MRF9GaWVsZHMgPSBuZXcgKEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIGZpZWxkczogbnVsbCxcbiAgICBvcHRpb25zOiBudWxsLFxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWVsZHMgPSB7fVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fVxuICAgIH0sXG5cbiAgICBzZXR1cCgpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0IEZMRFxuICAgICAgICBsZXQgRkxEX2luaXRcbiAgICAgICAgbGV0IEZMRF9maWVsZFxuICAgICAgICBsZXQgRkxEX2ZpZWxkT3B0aW9uc1xuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIGlmIChDcmFmdC5GaWVsZExheW91dERlc2lnbmVyKSB7XG4gICAgICAgICAgICBGTEQgPSBDcmFmdC5GaWVsZExheW91dERlc2lnbmVyXG4gICAgICAgICAgICBGTERfaW5pdCA9IEZMRC5wcm90b3R5cGUuaW5pdFxuICAgICAgICAgICAgRkxEX2ZpZWxkID0gRkxELnByb3RvdHlwZS5pbml0RmllbGRcbiAgICAgICAgICAgIEZMRF9maWVsZE9wdGlvbnMgPSBGTEQucHJvdG90eXBlLm9uRmllbGRPcHRpb25TZWxlY3RcblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgRkxEX2luaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRFZGl0b3IgPSBuZXcgRmllbGRFZGl0b3IodGhpcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRkxELnByb3RvdHlwZS5pbml0RmllbGQgPSBmdW5jdGlvbigkZmllbGQpIHtcbiAgICAgICAgICAgICAgICBsZXQgJHByZXZpZXdcbiAgICAgICAgICAgICAgICBsZXQgJGVkaXRCdG5cbiAgICAgICAgICAgICAgICBsZXQgJGh0bWxcbiAgICAgICAgICAgICAgICBsZXQgJG1lbnVcbiAgICAgICAgICAgICAgICBsZXQgJHVsXG4gICAgICAgICAgICAgICAgbGV0IG1lbnVcbiAgICAgICAgICAgICAgICBsZXQgbWVudUJ0blxuXG4gICAgICAgICAgICAgICAgRkxEX2ZpZWxkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblxuICAgICAgICAgICAgICAgICRlZGl0QnRuID0gJGZpZWxkLmZpbmQoJy5zZXR0aW5ncycpXG4gICAgICAgICAgICAgICAgbWVudUJ0biA9ICRlZGl0QnRuLmRhdGEoJ21lbnVidG4nKVxuICAgICAgICAgICAgICAgIG1lbnUgPSBtZW51QnRuLm1lbnVcbiAgICAgICAgICAgICAgICAkbWVudSA9IG1lbnUuJGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICR1bCA9ICRtZW51LmNoaWxkcmVuKCd1bCcpXG4gICAgICAgICAgICAgICAgJGh0bWwgPSAkKCc8bGk+PGEgZGF0YS1hY3Rpb249XCJmaWVsZG9wdGlvbnNcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ09wdGlvbnMnKSArICc8L2E+PC9saT4nKS5hcHBlbmRUbygkdWwpXG5cbiAgICAgICAgICAgICAgICAkcHJldmlldyA9ICQoW1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZpZWxkLW9wdGlvbnMtcHJldmlld1wiPicsXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8oJGZpZWxkKVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbnUuYWRkT3B0aW9ucygkaHRtbC5jaGlsZHJlbignYScpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBGTEQucHJvdG90eXBlLm9uRmllbGRPcHRpb25TZWxlY3QgPSBmdW5jdGlvbihvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgJGZpZWxkXG4gICAgICAgICAgICAgICAgbGV0ICRvcHRpb25cbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uXG5cbiAgICAgICAgICAgICAgICBGTERfZmllbGRPcHRpb25zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblxuICAgICAgICAgICAgICAgICRvcHRpb24gPSAkKG9wdGlvbilcbiAgICAgICAgICAgICAgICAkZmllbGQgPSAkb3B0aW9uLmRhdGEoJ21lbnUnKS4kYW5jaG9yLnBhcmVudCgpXG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJG9wdGlvbi5kYXRhKCdhY3Rpb24nKVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmllbGRvcHRpb25zJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZmllbGRPcHRpb25zU2VsZWN0ZWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAkb3B0aW9uWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0YXJnZXQ6ICRvcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkOiAkZmllbGQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxkOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAkZmllbGQuZGF0YSgnaWQnKSB8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldE9wdGlvbnMobGF5b3V0SWQpIHtcbiAgICAgICAgbGV0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IHt9XG5cbiAgICAgICAgJC5lYWNoKHRoaXMub3B0aW9ucywgKGtleSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGl0ZW0uZmllbGRMYXlvdXRJZCkgPT0gbGF5b3V0SWQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2l0ZW0uZmllbGRJZF0gPSBpdGVtLm9wdGlvbnNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gb3B0aW9uc1xuICAgIH1cbn0pKVxuXG5GaWVsZEVkaXRvciA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIGZsZDogbnVsbCxcbiAgICBvcHRpb25zOiBudWxsLFxuICAgIGxheW91dElkOiBudWxsLFxuICAgIG5hbWVzcGFjZTogJ2Zvcm0tYnVpbGRlcicsXG5cbiAgICBpbml0KGZsZCkge1xuICAgICAgICB0aGlzLmZsZCA9IGZsZFxuICAgICAgICB0aGlzLmxheW91dElkID0gTEQuZ2V0TGF5b3V0SWQoKVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBMRF9GaWVsZHMuZ2V0T3B0aW9ucyh0aGlzLmxheW91dElkKVxuXG4gICAgICAgIHRoaXMuZmxkLm9uKCdmaWVsZE9wdGlvbnNTZWxlY3RlZCcsICQucHJveHkodGhpcy5vcGVuT3B0aW9uc01vZGFsLCB0aGlzKSlcblxuICAgICAgICBpZiAodGhpcy5sYXlvdXRJZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlPcHRpb25zKHRoaXMubGF5b3V0SWQpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYXBwbHlPcHRpb25zKGxheW91dElkKSB7XG4gICAgICAgIGxldCByZXN1bHRzXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdXG5cbiAgICAgICAgICAgICQuZWFjaCh0aGlzLm9wdGlvbnMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBKU09OLnBhcnNlKHRoaXMub3B0aW9uc1trZXldKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5zZXRGb3JtRGF0YShrZXksIEpTT04ucGFyc2UodmFsdWUpKSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBvcGVuT3B0aW9uc01vZGFsKGUpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0IGZvcm1JZFxuICAgICAgICBsZXQgbW9kYWxcbiAgICAgICAgc2VsZiA9IHRoaXNcbiAgICAgICAgZm9ybUlkID0gZS5pZFxuXG4gICAgICAgIG1vZGFsID0gbmV3IEZpZWxkT3B0aW9uc01vZGFsKGUpXG4gICAgICAgIG1vZGFsLm9uKCdzZXRPcHRpb25zJywgZSA9PiBzZWxmLnNldEZvcm1EYXRhKGZvcm1JZCwgZS5vcHRpb25zKSlcbiAgICAgICAgbW9kYWwuc2hvdyh0aGlzLm9wdGlvbnMpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKGZpZWxkSWQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0ICRjb250YWluZXJcbiAgICAgICAgbGV0ICRmaWVsZFxuICAgICAgICBsZXQgbmFtZVxuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgICRjb250YWluZXIgPSB0aGlzLmZsZC4kY29udGFpbmVyXG4gICAgICAgICRmaWVsZCA9ICRjb250YWluZXIuZmluZCgnLmZsZC1maWVsZFtkYXRhLWlkPVwiJyArIGZpZWxkSWQgKyAnXCJdOm5vdChcIi51bnVzZWRcIiknKVxuICAgICAgICBuYW1lID0gdGhpcy5uYW1lc3BhY2UgKyAnW2ZpZWxkXVsnICsgZmllbGRJZCArICddW29wdGlvbnNdJ1xuXG4gICAgICAgICQuZWFjaChvcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoJGZpZWxkLmNoaWxkcmVuKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICRmaWVsZC5jaGlsZHJlbihgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLnZhbChpdGVtKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZVByZXZpZXcoJGZpZWxkLCBrZXksIGl0ZW0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmNoaWxkcmVuKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVQcmV2aWV3KCRmaWVsZCwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVQcmV2aWV3KCRmaWVsZCwga2V5LCBpdGVtKVxuICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGZpZWxkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgdXBkYXRlUHJldmlldyhmaWVsZCwgdHlwZSwgdmFsdWUpIHtcbiAgICAgICAgYm9keSA9IGZpZWxkLmZpbmQoJy5maWVsZC1vcHRpb25zLXByZXZpZXcnKVxuICAgICAgICBtYXJrdXAgPSAkKCc8ZGl2IGNsYXNzPVwiZmllbGQtJysgdHlwZSArJy1wcmV2aWV3XCI+PHNwYW4gY2xhc3M9XCJwcmV2aWV3LXR5cGVcIj4nKyB0eXBlICsnPC9zcGFuPiAnK3ZhbHVlKyc8L2Rpdj4nKVxuICAgICAgICBvbGRNYXJrdXAgPSBib2R5LmZpbmQoJy5maWVsZC0nKyB0eXBlICsnLXByZXZpZXcnKVxuXG4gICAgICAgIGlmIChvbGRNYXJrdXApIHtcbiAgICAgICAgICAgIG9sZE1hcmt1cC5yZW1vdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgbWFya3VwLmFwcGVuZFRvKGJvZHkpXG4gICAgfSxcblxuICAgIHJlbW92ZVByZXZpZXcoZmllbGQsIHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIGZpZWxkLmZpbmQoJy5maWVsZC0nK3R5cGUrJy1wcmV2aWV3JykucmVtb3ZlKClcbiAgICB9XG59KVxuXG5GaWVsZE9wdGlvbnNNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICBmaWVsZDogbnVsbCxcbiAgICAkZm9ybUNvbnRhaW5lcjogbnVsbCxcbiAgICAkY2xhc3NJbnB1dDogbnVsbCxcbiAgICAkaWRJbnB1dDogbnVsbCxcbiAgICAkdGVtcGxhdGVJbnB1dDogbnVsbCxcblxuICAgIGluaXQoZmllbGQpIHtcbiAgICAgICAgbGV0IGJvZHlcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkXG4gICAgICAgIHRoaXMuYmFzZSgpXG5cbiAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lciA9ICQoJzxmb3JtIGNsYXNzPVwibW9kYWwgZml0dGVkIGZvcm1idWlsZGVyLW1vZGFsIGhhcy1zaWRlYmFyXCI+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKVxuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtQ29udGFpbmVyKVxuXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8c2VjdGlvbiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiPicsXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1zaWRlYmFyXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8bmF2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtb2RhbC1uYXYgYWN0aXZlXCIgZGF0YS10YXJnZXQ9XCJtb2RhbC1jb250ZW50LXN0eWxlc1wiPjxpIGNsYXNzPVwiZmFyIGZhLW1hZ2ljXCI+PC9pPiA8c3BhbiBjbGFzcz1cImxpbmstdGV4dFwiPlN0eWxlczwvc3Bhbj48L2E+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm1vZGFsLW5hdlwiIGRhdGEtdGFyZ2V0PVwibW9kYWwtY29udGVudC1zZXR0aW5nc1wiPjxpIGNsYXNzPVwiZmFyIGZhLWNvZ1wiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaW5rLXRleHRcIj5TZXR0aW5nczwvc3Bhbj48L2E+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L25hdj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50LWNvbnRhaW5lclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtY29udGVudC1zdHlsZXMgYWN0aXZlXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGhlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsICdBdHRyaWJ1dGVzJywgJzwvc3Bhbj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicsICdDdXN0b20gZmllbGQgYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBpbnB1dC1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0lEJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggaW5wdXQtaWRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtY29udGVudC1zZXR0aW5nc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxoZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nLCAnU2V0dGluZ3MnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0N1c3RvbSBmaWVsZCBzZXR0aW5ncycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVEVNUExBVEUnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBpbnB1dC10ZW1wbGF0ZVwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsXG4gICAgICAgICAgICAnPC9zZWN0aW9uPicsXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZm9vdGVyPidcbiAgICAgICAgXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybUNvbnRhaW5lcik7XG5cbiAgICAgICAgdGhpcy4kY2xhc3NJbnB1dCA9IGJvZHkuZmluZCgnLmlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaWRJbnB1dCA9IGJvZHkuZmluZCgnLmlucHV0LWlkJylcbiAgICAgICAgdGhpcy4kdGVtcGxhdGVJbnB1dCA9IGJvZHkuZmluZCgnLmlucHV0LXRlbXBsYXRlJylcblxuICAgICAgICB0aGlzLiRuYXZMaW5rID0gYm9keS5maW5kKCcubW9kYWwtbmF2JylcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJylcblxuICAgICAgICB0aGlzLmxvYWRNb2RhbFZhbHVlcygpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjYW5jZWxCdG4sICdjbGljaycsICdoaWRlJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRuYXZMaW5rLCAnY2xpY2snLCAndG9nZ2xlTW9kYWxDb250ZW50JylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtQ29udGFpbmVyLCAnc3VibWl0JywgJ29uRm9ybVN1Ym1pdCcpXG4gICAgfSxcblxuICAgIGxvYWRNb2RhbFZhbHVlcygpIHtcbiAgICAgICAgJGNsYXNzSW5wdXQgPSAkKCdpbnB1dFtuYW1lPVwiZm9ybS1idWlsZGVyW2ZpZWxkXVsnKyB0aGlzLmZpZWxkLmlkICsnXVtvcHRpb25zXVtjbGFzc11cIl0nKS52YWwoKVxuICAgICAgICAkaWRJbnB1dCA9ICQoJ2lucHV0W25hbWU9XCJmb3JtLWJ1aWxkZXJbZmllbGRdWycrIHRoaXMuZmllbGQuaWQgKyddW29wdGlvbnNdW2lkXVwiXScpLnZhbCgpXG4gICAgICAgICR0ZW1wbGF0ZUlucHV0ID0gJCgnaW5wdXRbbmFtZT1cImZvcm0tYnVpbGRlcltmaWVsZF1bJysgdGhpcy5maWVsZC5pZCArJ11bb3B0aW9uc11bdGVtcGxhdGVdXCJdJykudmFsKClcblxuICAgICAgICBpZiAoJGNsYXNzSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmlucHV0LWNsYXNzJykudmFsKCRjbGFzc0lucHV0KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpZElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5pbnB1dC1pZCcpLnZhbCgkaWRJbnB1dClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkdGVtcGxhdGVJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuaW5wdXQtdGVtcGxhdGUnKS52YWwoJHRlbXBsYXRlSW5wdXQpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlTW9kYWxDb250ZW50KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCB0YXJnZXRcbiAgICAgICAgbGV0IGxpbmtcbiAgICAgICAgbGV0IGhlaWdodFxuXG4gICAgICAgIGxpbmsgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgdGFyZ2V0ID0gbGluay5kYXRhKCd0YXJnZXQnKVxuICAgICAgICBoZWlnaHQgPSAkKCcuJyt0YXJnZXQpLmhlaWdodCgpICsgNTNcblxuICAgICAgICAkKCcubW9kYWwtbmF2JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgbGluay5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCgnLicrdGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKVxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe2hlaWdodDogaGVpZ2h0fSwgJ2Zhc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdhdXRvJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25Gb3JtU3VibWl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdzZXRPcHRpb25zJywge1xuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogdGhpcy4kY2xhc3NJbnB1dC52YWwoKSxcbiAgICAgICAgICAgICAgICBpZDogdGhpcy4kaWRJbnB1dC52YWwoKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy4kdGVtcGxhdGVJbnB1dC52YWwoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuaGlkZSgpXG4gICAgfSxcblxuICAgIG9uRmFkZU91dCgpIHtcbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICAgICAgdGhpcy5kZXN0cm95KClcbiAgICB9LFxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZSgpXG4gICAgICAgIHRoaXMuJHNoYWRlLnJlbW92ZSgpXG4gICAgfSxcblxuICAgIHNob3cob3B0aW9ucykge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBsZXQgdmFsdWVzXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFsdWVzID0gSlNPTi5wYXJzZShvcHRpb25zW3RoaXMuZmllbGQuaWRdKVxuXG4gICAgICAgICAgICAkLmVhY2godmFsdWVzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gJ2NsYXNzJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRjbGFzc0lucHV0LnZhbCh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdpZCcgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kaWRJbnB1dC52YWwodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCFHYXJuaXNoLmlzTW9iaWxlQnJvd3NlcigpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY2xhc3NJbnB1dC5mb2N1cygpXG4gICAgICAgICAgICAgICAgfSkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhc2UoKVxuICAgIH1cblxufSlcblxud2luZG93LkxEX0ZpZWxkcyA9IExEX0ZpZWxkc1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2ZpZWxkLWRlc2lnbmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==