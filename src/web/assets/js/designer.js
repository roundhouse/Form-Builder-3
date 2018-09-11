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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

var LD = void 0;

LD = {
    setup: function setup() {}
};

LD = new (Garnish.Base.extend({
    layoutId: null,
    formId: null,
    $settingsBtn: null,

    init: function init() {
        this.layoutId = null;
        this.layoutId = null;
        this.$settingsBtn = $('.fields-settings');

        this.addListener(this.$settingsBtn, 'click', 'showFieldsSettings');
    },
    setup: function setup() {},
    showFieldsSettings: function showFieldsSettings() {
        var self = void 0;
        self = this;

        modal = new FieldSettingsModal();
        modal.on('setFieldsSettings', function (e) {
            return self.setFormData(e);
        });
        modal.show();
    },
    setFormData: function setFormData(data) {
        var self = void 0;
        var $container = void 0;
        var $field = void 0;
        var name = void 0;
        self = this;

        $container = $('#fieldlayoutsettings');
        name = 'settings[fields][global]';

        $container.html('');

        if (Object.keys(data.options).length === 0) {
            $('.fields-settings').removeClass('has-values');
        } else {
            $('.fields-settings').addClass('has-values');

            $.each(data.options, function (key, item) {
                if ($container.find('input[name="' + name + '[' + key + ']"]').length > 0) {
                    if (item) {
                        $container.find('input[name="' + name + '[' + key + ']"]').val(item);
                    } else {
                        $container.find('input[name="' + name + '[' + key + ']"]').remove();
                    }
                } else {
                    if (item) {
                        $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($container);
                    }
                }
            });
        }
    },
    getLayoutId: function getLayoutId() {
        return this.layoutId;
    },
    getFormId: function getFormId() {
        return this.formId;
    }
}))();

FieldSettingsModal = Garnish.Modal.extend({
    $formClass: null,
    $formId: null,
    $inputClass: null,
    $inputTemplate: null,
    $formContainer: null,

    timeout: null,

    init: function init() {
        var body = void 0;
        this.base();

        this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);

        body = $(['<section class="modal-container">', '<div class="modal-sidebar">', '<nav>', '<a href="#" class="modal-nav active" data-target="modal-content-styles"><i class="far fa-clipboard-list"></i> <span class="link-text">Styles</span></a>', '<a href="#" class="modal-nav" data-target="modal-content-settings"><i class="far fa-window-alt"></i> <span class="link-text">Settings</span></a>', '</nav>', '</div>', '<div class="modal-content-container">', '<div class="modal-content modal-content-styles active">', '<header>', '<span class="modal-title">', 'Form Attributes', '</span>', '<div class="instructions">', 'Global form attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth global-form-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth global-form-id">', '</div>', '</div>', '</div>', '<div class="modal-content modal-content-settings">', '<header>', '<span class="modal-title">', 'Input Settings', '</span>', '<div class="instructions">', 'Global input settings', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth global-input-class">', '</div>', '<div class="fb-field has-spinner">', '<div class="spinner hidden"></div>', '<div class="input-hint">', 'TEMPLATES', '</div>', '<input type="text" class="text fullwidth global-input-template">', '</div>', '</div>', '</div>', '</div>', '</section>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$formClass = body.find('.global-form-class');
        this.$formId = body.find('.global-form-id');
        this.$inputClass = body.find('.global-input-class');
        this.$inputTemplate = body.find('.global-input-template');

        this.$navLink = body.find('.modal-nav');
        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$navLink, 'click', 'toggleModalContent');
        this.addListener(this.$inputTemplate, 'keyup', 'checkTemplatePath');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    checkTemplatePath: function checkTemplatePath() {
        var _this = this;

        var $container = void 0;
        var $hint = void 0;

        $container = this.$inputTemplate.parent();
        $spinner = $container.find('.spinner');
        $hint = $container.find('.input-hint');

        data = {
            path: this.$inputTemplate.val()
        };

        $spinner.removeClass('hidden');

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
            $spinner.addClass('hidden');

            Craft.postActionRequest('form-builder/forms/check-input-template-path', data, $.proxy(function (response, textStatus) {
                if (response.valid) {
                    $hint.removeClass('error');
                    $hint.addClass('success');
                } else {
                    $hint.removeClass('success');
                    $hint.addClass('error');
                }
            }, _this));
        }, 1000);
    },
    loadModalValues: function loadModalValues() {
        $formClass = $('input[name="settings[fields][global][formClass]"]').val();
        $formId = $('input[name="settings[fields][global][formId]"]').val();
        $inputClass = $('input[name="settings[fields][global][inputClass]"]').val();
        $inputTemplate = $('input[name="settings[fields][global][inputTemplate]"]').val();

        if ($formClass) {
            this.$formContainer.find('.global-form-class').val($formClass);
        }

        if ($formId) {
            this.$formContainer.find('.global-form-id').val($formId);
        }

        if ($inputClass) {
            this.$formContainer.find('.global-input-class').val($inputClass);
        }

        if ($inputTemplate) {
            this.$formContainer.find('.global-input-template').val($inputTemplate);
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
        var options = void 0;
        options = {};

        e.preventDefault();

        if (!this.visible) {
            return;
        }

        if (this.$formClass.val()) {
            options.formClass = this.$formClass.val();
        }

        if (this.$formId.val()) {
            options.formId = this.$formId.val();
        }

        if (this.$inputClass.val()) {
            options.inputClass = this.$inputClass.val();
        }

        if (this.$inputTemplate.val()) {
            options.inputTemplate = this.$inputTemplate.val();
        }

        this.trigger('setFieldsSettings', { options: options });
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
        // let self
        // let values
        // self = this

        // if (options.length > 0) {
        //     values = JSON.parse(options[this.field.id])

        //     $.each(values, (key, value) => {
        //         if (key == 'class' && value) {
        //             self.$classInput.val(value)
        //         }

        //         if (key == 'id' && value) {
        //             self.$idInput.val(value)
        //         }
        //     })

        //     if (!Garnish.isMobileBrowser()) {
        //         setTimeout($.proxy((function() {
        //             this.$classInput.focus()
        //         })))
        //     }
        // }

        this.base();
    }
});

window.LD = LD;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZGVzaWduZXIuanMiXSwibmFtZXMiOlsiTEQiLCJzZXR1cCIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwibGF5b3V0SWQiLCJmb3JtSWQiLCIkc2V0dGluZ3NCdG4iLCJpbml0IiwiJCIsImFkZExpc3RlbmVyIiwic2hvd0ZpZWxkc1NldHRpbmdzIiwic2VsZiIsIm1vZGFsIiwiRmllbGRTZXR0aW5nc01vZGFsIiwib24iLCJzZXRGb3JtRGF0YSIsImUiLCJzaG93IiwiZGF0YSIsIiRjb250YWluZXIiLCIkZmllbGQiLCJuYW1lIiwiaHRtbCIsIk9iamVjdCIsImtleXMiLCJvcHRpb25zIiwibGVuZ3RoIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImVhY2giLCJrZXkiLCJpdGVtIiwiZmluZCIsInZhbCIsInJlbW92ZSIsImFwcGVuZFRvIiwiZ2V0TGF5b3V0SWQiLCJnZXRGb3JtSWQiLCJNb2RhbCIsIiRmb3JtQ2xhc3MiLCIkZm9ybUlkIiwiJGlucHV0Q2xhc3MiLCIkaW5wdXRUZW1wbGF0ZSIsIiRmb3JtQ29udGFpbmVyIiwidGltZW91dCIsImJvZHkiLCJiYXNlIiwiJGJvZCIsInNldENvbnRhaW5lciIsIkNyYWZ0IiwidCIsImpvaW4iLCIkbmF2TGluayIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJjaGVja1RlbXBsYXRlUGF0aCIsIiRoaW50IiwicGFyZW50IiwiJHNwaW5uZXIiLCJwYXRoIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInBvc3RBY3Rpb25SZXF1ZXN0IiwicHJveHkiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJ2YWxpZCIsInRvZ2dsZU1vZGFsQ29udGVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwibGluayIsImhlaWdodCIsImN1cnJlbnRUYXJnZXQiLCJ2ZWxvY2l0eSIsImNzcyIsIm1pbkhlaWdodCIsIm9uRm9ybVN1Ym1pdCIsInZpc2libGUiLCJmb3JtQ2xhc3MiLCJpbnB1dENsYXNzIiwiaW5wdXRUZW1wbGF0ZSIsInRyaWdnZXIiLCJoaWRlIiwib25GYWRlT3V0IiwiZGVzdHJveSIsIiRzaGFkZSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLFdBQUo7O0FBRUFBLEtBQUs7QUFDREMsU0FEQyxtQkFDTyxDQUFFO0FBRFQsQ0FBTDs7QUFJQUQsS0FBSyxLQUFLRSxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDMUJDLGNBQVUsSUFEZ0I7QUFFMUJDLFlBQVEsSUFGa0I7QUFHMUJDLGtCQUFjLElBSFk7O0FBSzFCQyxRQUwwQixrQkFLbkI7QUFDSCxhQUFLSCxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtFLFlBQUwsR0FBb0JFLEVBQUUsa0JBQUYsQ0FBcEI7O0FBRUEsYUFBS0MsV0FBTCxDQUFpQixLQUFLSCxZQUF0QixFQUFvQyxPQUFwQyxFQUE2QyxvQkFBN0M7QUFDSCxLQVh5QjtBQWExQk4sU0FiMEIsbUJBYWxCLENBQ1AsQ0FkeUI7QUFnQjFCVSxzQkFoQjBCLGdDQWdCTDtB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UixHQUFxQixLQUFLdEMsV0FBTCxDQUFpQlIsR0FBakIsRUFBckI7QUFDSDs7QUFFRCxZQUFJLEtBQUtTLGNBQUwsQ0FBb0JULEdBQXBCLEVBQUosRUFBK0I7QUFDM0JSLG9CQUFRdUQsYUFBUixHQUF3QixLQUFLdEMsY0FBTCxDQUFvQlQsR0FBcEIsRUFBeEI7QUFDSDs7QUFFRCxhQUFLZ0QsT0FBTCxDQUFhLG1CQUFiLEVBQWtDLEVBQUV4RCxTQUFTQSxPQUFYLEVBQWxDO0FBQ0EsYUFBS3lELElBQUw7QUFDSCxLQXhNcUM7QUEwTXRDQyxhQTFNc0MsdUJBME0xQjtBQUNSLGFBQUtyQyxJQUFMO0FBQ0EsYUFBS3NDLE9BQUw7QUFDSCxLQTdNcUM7QUErTXRDQSxXQS9Nc0MscUJBK001QjtBQUNOLGFBQUt0QyxJQUFMO0FBQ0EsYUFBSzNCLFVBQUwsQ0FBZ0JlLE1BQWhCO0FBQ0EsYUFBS21ELE1BQUwsQ0FBWW5ELE1BQVo7QUFDSCxLQW5OcUM7QUFxTnRDakIsUUFyTnNDLGdCQXFOakNRLE9Bck5pQyxFQXFOeEI7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBS3FCLElBQUw7QUFDSDtBQS9PcUMsQ0FBckIsQ0FBckI7O0FBbVBBd0MsT0FBT3ZGLEVBQVAsR0FBWUEsRUFBWixDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2Rlc2lnbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgzNjc4ODk4YWU3N2I4ZjNmNGU5IiwibGV0IExEXG5cbkxEID0ge1xuICAgIHNldHVwKCkge31cbn1cblxuTEQgPSBuZXcgKEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIGxheW91dElkOiBudWxsLFxuICAgIGZvcm1JZDogbnVsbCxcbiAgICAkc2V0dGluZ3NCdG46IG51bGwsXG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmxheW91dElkID0gbnVsbFxuICAgICAgICB0aGlzLmxheW91dElkID0gbnVsbFxuICAgICAgICB0aGlzLiRzZXR0aW5nc0J0biA9ICQoJy5maWVsZHMtc2V0dGluZ3MnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kc2V0dGluZ3NCdG4sICdjbGljaycsICdzaG93RmllbGRzU2V0dGluZ3MnKVxuICAgIH0sXG5cbiAgICBzZXR1cCgpIHtcbiAgICB9LFxuXG4gICAgc2hvd0ZpZWxkc1NldHRpbmdzKCkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgIG1vZGFsID0gbmV3IEZpZWxkU2V0dGluZ3NNb2RhbCgpXG4gICAgICAgIG1vZGFsLm9uKCdzZXRGaWVsZHNTZXR0aW5ncycsIGUgPT4gc2VsZi5zZXRGb3JtRGF0YShlKSlcbiAgICAgICAgbW9kYWwuc2hvdygpXG4gICAgfSxcblxuICAgIHNldEZvcm1EYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IHNlbGZcbiAgICAgICAgbGV0ICRjb250YWluZXJcbiAgICAgICAgbGV0ICRmaWVsZFxuICAgICAgICBsZXQgbmFtZVxuICAgICAgICBzZWxmID0gdGhpc1xuXG4gICAgICAgICRjb250YWluZXIgPSAkKCcjZmllbGRsYXlvdXRzZXR0aW5ncycpXG4gICAgICAgIG5hbWUgPSAnc2V0dGluZ3NbZmllbGRzXVtnbG9iYWxdJ1xuXG4gICAgICAgICRjb250YWluZXIuaHRtbCgnJylcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YS5vcHRpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICQoJy5maWVsZHMtc2V0dGluZ3MnKS5yZW1vdmVDbGFzcygnaGFzLXZhbHVlcycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuZmllbGRzLXNldHRpbmdzJykuYWRkQ2xhc3MoJ2hhcy12YWx1ZXMnKVxuXG4gICAgICAgICAgICAkLmVhY2goZGF0YS5vcHRpb25zLCAoa2V5LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCRjb250YWluZXIuZmluZChgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb250YWluZXIuZmluZChgaW5wdXRbbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiXWApLnZhbChpdGVtKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5maW5kKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkucmVtb3ZlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7a2V5fV1cIj5gKS52YWwoaXRlbSkuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0TGF5b3V0SWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheW91dElkXG4gICAgfSxcblxuICAgIGdldEZvcm1JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUlkXG4gICAgfVxufSkpXG5cbkZpZWxkU2V0dGluZ3NNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICAkZm9ybUNsYXNzOiBudWxsLFxuICAgICRmb3JtSWQ6IG51bGwsXG4gICAgJGlucHV0Q2xhc3M6IG51bGwsXG4gICAgJGlucHV0VGVtcGxhdGU6IG51bGwsXG4gICAgJGZvcm1Db250YWluZXI6IG51bGwsXG5cbiAgICB0aW1lb3V0OiBudWxsLFxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IGJvZHlcbiAgICAgICAgdGhpcy5iYXNlKClcblxuICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWwgaGFzLXNpZGViYXJcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm1Db250YWluZXIpXG5cbiAgICAgICAgYm9keSA9ICQoW1xuICAgICAgICAgICAgJzxzZWN0aW9uIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+JyxcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLXNpZGViYXJcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxuYXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm1vZGFsLW5hdiBhY3RpdmVcIiBkYXRhLXRhcmdldD1cIm1vZGFsLWNvbnRlbnQtc3R5bGVzXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2xpcGJvYXJkLWxpc3RcIj48L2k+IDxzcGFuIGNsYXNzPVwibGluay10ZXh0XCI+U3R5bGVzPC9zcGFuPjwvYT4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwibW9kYWwtbmF2XCIgZGF0YS10YXJnZXQ9XCJtb2RhbC1jb250ZW50LXNldHRpbmdzXCI+PGkgY2xhc3M9XCJmYXIgZmEtd2luZG93LWFsdFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaW5rLXRleHRcIj5TZXR0aW5nczwvc3Bhbj48L2E+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L25hdj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50LWNvbnRhaW5lclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtY29udGVudC1zdHlsZXMgYWN0aXZlXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGhlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsICdGb3JtIEF0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0dsb2JhbCBmb3JtIGF0dHJpYnV0ZXMnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NMQVNTJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggZ2xvYmFsLWZvcm0tY2xhc3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdJRCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHQgZnVsbHdpZHRoIGdsb2JhbC1mb3JtLWlkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IG1vZGFsLWNvbnRlbnQtc2V0dGluZ3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0lucHV0IFNldHRpbmdzJywgJzwvc3Bhbj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicsICdHbG9iYWwgaW5wdXQgc2V0dGluZ3MnLCAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBnbG9iYWwtaW5wdXQtY2xhc3NcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZCBoYXMtc3Bpbm5lclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNwaW5uZXIgaGlkZGVuXCI+PC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnVEVNUExBVEVTJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggZ2xvYmFsLWlucHV0LXRlbXBsYXRlXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyxcbiAgICAgICAgICAgICc8L3NlY3Rpb24+JyxcbiAgICAgICAgICAgICc8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidXR0b25zXCI+JywgXG4gICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKX1cIj5gLCBcbiAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1NhdmUnKX1cIj5gLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9mb290ZXI+J1xuICAgICAgICBdLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtQ29udGFpbmVyKTtcblxuXG4gICAgICAgIHRoaXMuJGZvcm1DbGFzcyA9IGJvZHkuZmluZCgnLmdsb2JhbC1mb3JtLWNsYXNzJylcbiAgICAgICAgdGhpcy4kZm9ybUlkID0gYm9keS5maW5kKCcuZ2xvYmFsLWZvcm0taWQnKVxuICAgICAgICB0aGlzLiRpbnB1dENsYXNzID0gYm9keS5maW5kKCcuZ2xvYmFsLWlucHV0LWNsYXNzJylcbiAgICAgICAgdGhpcy4kaW5wdXRUZW1wbGF0ZSA9IGJvZHkuZmluZCgnLmdsb2JhbC1pbnB1dC10ZW1wbGF0ZScpXG5cbiAgICAgICAgdGhpcy4kbmF2TGluayA9IGJvZHkuZmluZCgnLm1vZGFsLW5hdicpXG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpXG5cbiAgICAgICAgdGhpcy5sb2FkTW9kYWxWYWx1ZXMoKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kbmF2TGluaywgJ2NsaWNrJywgJ3RvZ2dsZU1vZGFsQ29udGVudCcpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kaW5wdXRUZW1wbGF0ZSwgJ2tleXVwJywgJ2NoZWNrVGVtcGxhdGVQYXRoJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtQ29udGFpbmVyLCAnc3VibWl0JywgJ29uRm9ybVN1Ym1pdCcpXG4gICAgfSxcblxuICAgIGNoZWNrVGVtcGxhdGVQYXRoKCkge1xuICAgICAgICBsZXQgJGNvbnRhaW5lclxuICAgICAgICBsZXQgJGhpbnRcblxuICAgICAgICAkY29udGFpbmVyID0gdGhpcy4kaW5wdXRUZW1wbGF0ZS5wYXJlbnQoKVxuICAgICAgICAkc3Bpbm5lciA9ICRjb250YWluZXIuZmluZCgnLnNwaW5uZXInKVxuICAgICAgICAkaGludCA9ICRjb250YWluZXIuZmluZCgnLmlucHV0LWhpbnQnKVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLiRpbnB1dFRlbXBsYXRlLnZhbCgpXG4gICAgICAgIH1cblxuICAgICAgICAkc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KVxuXG4gICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGRlbicpXG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZm9ybXMvY2hlY2staW5wdXQtdGVtcGxhdGUtcGF0aCcsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAkaGludC5yZW1vdmVDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgICAgICAgICAkaGludC5hZGRDbGFzcygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MnKVxuICAgICAgICAgICAgICAgICAgICAkaGludC5hZGRDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSlcbiAgICAgICAgfSwgMTAwMClcbiAgICB9LFxuXG4gICAgbG9hZE1vZGFsVmFsdWVzKCkge1xuICAgICAgICAkZm9ybUNsYXNzID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtmb3JtQ2xhc3NdXCJdJykudmFsKClcbiAgICAgICAgJGZvcm1JZCA9ICQoJ2lucHV0W25hbWU9XCJzZXR0aW5nc1tmaWVsZHNdW2dsb2JhbF1bZm9ybUlkXVwiXScpLnZhbCgpXG4gICAgICAgICRpbnB1dENsYXNzID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtpbnB1dENsYXNzXVwiXScpLnZhbCgpXG4gICAgICAgICRpbnB1dFRlbXBsYXRlID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtpbnB1dFRlbXBsYXRlXVwiXScpLnZhbCgpXG5cbiAgICAgICAgaWYgKCRmb3JtQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmdsb2JhbC1mb3JtLWNsYXNzJykudmFsKCRmb3JtQ2xhc3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGZvcm1JZCkge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuZ2xvYmFsLWZvcm0taWQnKS52YWwoJGZvcm1JZClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW5wdXRDbGFzcykge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuZ2xvYmFsLWlucHV0LWNsYXNzJykudmFsKCRpbnB1dENsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpbnB1dFRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5nbG9iYWwtaW5wdXQtdGVtcGxhdGUnKS52YWwoJGlucHV0VGVtcGxhdGUpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlTW9kYWxDb250ZW50KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCB0YXJnZXRcbiAgICAgICAgbGV0IGxpbmtcbiAgICAgICAgbGV0IGhlaWdodFxuXG4gICAgICAgIGxpbmsgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgdGFyZ2V0ID0gbGluay5kYXRhKCd0YXJnZXQnKVxuICAgICAgICBoZWlnaHQgPSAkKCcuJyt0YXJnZXQpLmhlaWdodCgpICsgNTNcblxuICAgICAgICAkKCcubW9kYWwtbmF2JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICAgICAgbGluay5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCgnLicrdGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKVxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe2hlaWdodDogaGVpZ2h0fSwgJ2Zhc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdhdXRvJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25Gb3JtU3VibWl0KGUpIHtcbiAgICAgICAgbGV0IG9wdGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IHt9XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGZvcm1DbGFzcy52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JtQ2xhc3MgPSB0aGlzLiRmb3JtQ2xhc3MudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRmb3JtSWQudmFsKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybUlkID0gdGhpcy4kZm9ybUlkLnZhbCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kaW5wdXRDbGFzcy52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5pbnB1dENsYXNzID0gdGhpcy4kaW5wdXRDbGFzcy52YWwoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGlucHV0VGVtcGxhdGUudmFsKCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaW5wdXRUZW1wbGF0ZSA9IHRoaXMuJGlucHV0VGVtcGxhdGUudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignc2V0RmllbGRzU2V0dGluZ3MnLCB7IG9wdGlvbnM6IG9wdGlvbnMgfSlcbiAgICAgICAgdGhpcy5oaWRlKClcbiAgICB9LFxuXG4gICAgb25GYWRlT3V0KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgIH0sXG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlKClcbiAgICAgICAgdGhpcy4kc2hhZGUucmVtb3ZlKClcbiAgICB9LFxuXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIC8vIGxldCBzZWxmXG4gICAgICAgIC8vIGxldCB2YWx1ZXNcbiAgICAgICAgLy8gc2VsZiA9IHRoaXNcblxuICAgICAgICAvLyBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKG9wdGlvbnNbdGhpcy5maWVsZC5pZF0pXG5cbiAgICAgICAgLy8gICAgICQuZWFjaCh2YWx1ZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSA9PSAnY2xhc3MnICYmIHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuJGNsYXNzSW5wdXQudmFsKHZhbHVlKVxuICAgICAgICAvLyAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkgPT0gJ2lkJyAmJiB2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBzZWxmLiRpZElucHV0LnZhbCh2YWx1ZSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9KVxuXG4gICAgICAgIC8vICAgICBpZiAoIUdhcm5pc2guaXNNb2JpbGVCcm93c2VyKCkpIHtcbiAgICAgICAgLy8gICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLiRjbGFzc0lucHV0LmZvY3VzKClcbiAgICAgICAgLy8gICAgICAgICB9KSkpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgfVxuXG59KVxuXG53aW5kb3cuTEQgPSBMRFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2Rlc2lnbmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==