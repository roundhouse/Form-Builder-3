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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
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

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzFjMDBkYWNlMjBjZTRkMTExYjQiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZGVzaWduZXIuanMiXSwibmFtZXMiOlsiTEQiLCJzZXR1cCIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwibGF5b3V0SWQiLCJmb3JtSWQiLCIkc2V0dGluZ3NCdG4iLCJpbml0IiwiJCIsImFkZExpc3RlbmVyIiwic2hvd0ZpZWxkc1NldHRpbmdzIiwic2VsZiIsIm1vZGFsIiwiRmllbGRTZXR0aW5nc01vZGFsIiwib24iLCJzZXRGb3JtRGF0YSIsImUiLCJzaG93IiwiZGF0YSIsIiRjb250YWluZXIiLCIkZmllbGQiLCJuYW1lIiwiaHRtbCIsIk9iamVjdCIsImtleXMiLCJvcHRpb25zIiwibGVuZ3RoIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImVhY2giLCJrZXkiLCJpdGVtIiwiZmluZCIsInZhbCIsInJlbW92ZSIsImFwcGVuZFRvIiwiZ2V0TGF5b3V0SWQiLCJnZXRGb3JtSWQiLCJNb2RhbCIsIiRmb3JtQ2xhc3MiLCIkZm9ybUlkIiwiJGlucHV0Q2xhc3MiLCIkaW5wdXRUZW1wbGF0ZSIsIiRmb3JtQ29udGFpbmVyIiwidGltZW91dCIsImJvZHkiLCJiYXNlIiwiJGJvZCIsInNldENvbnRhaW5lciIsIkNyYWZ0IiwidCIsImpvaW4iLCIkbmF2TGluayIsIiRjYW5jZWxCdG4iLCJsb2FkTW9kYWxWYWx1ZXMiLCJjaGVja1RlbXBsYXRlUGF0aCIsIiRoaW50IiwicGFyZW50IiwiJHNwaW5uZXIiLCJwYXRoIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInBvc3RBY3Rpb25SZXF1ZXN0IiwicHJveHkiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJ2YWxpZCIsInRvZ2dsZU1vZGFsQ29udGVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwibGluayIsImhlaWdodCIsImN1cnJlbnRUYXJnZXQiLCJ2ZWxvY2l0eSIsImNzcyIsIm1pbkhlaWdodCIsIm9uRm9ybVN1Ym1pdCIsInZpc2libGUiLCJmb3JtQ2xhc3MiLCJpbnB1dENsYXNzIiwiaW5wdXRUZW1wbGF0ZSIsInRyaWdnZXIiLCJoaWRlIiwib25GYWRlT3V0IiwiZGVzdHJveSIsIiRzaGFkZSIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxJQUFJQSxXQUFKOztBQUVBQSxLQUFLO0FBQ0RDLFNBREMsbUJBQ08sQ0FBRTtBQURULENBQUw7O0FBSUFELEtBQUssS0FBS0UsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQzFCQyxjQUFVLElBRGdCO0FBRTFCQyxZQUFRLElBRmtCO0FBRzFCQyxrQkFBYyxJQUhZOztBQUsxQkMsUUFMMEIsa0JBS25CO0FBQ0gsYUFBS0gsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxhQUFLRSxZQUFMLEdBQW9CRSxFQUFFLGtCQUFGLENBQXBCOztBQUVBLGFBQUtDLFdBQUwsQ0FBaUIsS0FBS0gsWUFBdEIsRUFBb0MsT0FBcEMsRUFBNkMsb0JBQTdDO0FBQ0gsS0FYeUI7QUFhMUJOLFNBYjBCLG1CQWFsQixDQUNQLENBZHlCO0FBZ0IxQlUsc0JBaEIwQixnQ0FnQkw7QUFDakIsWUFBSUMsYUFBSjtBQUNBQSxlQUFPLElBQVA7O0FBRUFDLGdCQUFRLElBQUlDLGtCQUFKLEVBQVI7QUFDQUQsY0FBTUUsRUFBTixDQUFTLG1CQUFULEVBQThCO0FBQUEsbUJBQUtILEtBQUtJLFdBQUwsQ0FBaUJDLENBQWpCLENBQUw7QUFBQSxTQUE5QjtBQUNBSixjQUFNSyxJQUFOO0FBQ0gsS0F2QnlCO0FBeUIxQkYsZUF6QjBCLHVCQXlCZEcsSUF6QmMsRUF5QlI7QUFDZCxZQUFJUCxhQUFKO0FBQ0EsWUFBSVEsbUJBQUo7QUFDQSxZQUFJQyxlQUFKO0FBQ0EsWUFBSUMsYUFBSjtBQUNBVixlQUFPLElBQVA7O0FBRUFRLHFCQUFhWCxFQUFFLHNCQUFGLENBQWI7QUFDQWEsZUFBTywwQkFBUDs7QUFFQUYsbUJBQVdHLElBQVgsQ0FBZ0IsRUFBaEI7O0FBRUEsWUFBSUMsT0FBT0MsSUFBUCxDQUFZTixLQUFLTyxPQUFqQixFQUEwQkMsTUFBMUIsS0FBcUMsQ0FBekMsRUFBNEM7QUFDeENsQixjQUFFLGtCQUFGLEVBQXNCbUIsV0FBdEIsQ0FBa0MsWUFBbEM7QUFDSCxTQUZELE1BRU87QUFDSG5CLGNBQUUsa0JBQUYsRUFBc0JvQixRQUF0QixDQUErQixZQUEvQjs7QUFFQXBCLGNBQUVxQixJQUFGLENBQU9YLEtBQUtPLE9BQVosRUFBcUIsVUFBQ0ssR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDaEMsb0JBQUlaLFdBQVdhLElBQVgsa0JBQStCWCxJQUEvQixTQUF1Q1MsR0FBdkMsVUFBaURKLE1BQWpELEdBQTBELENBQTlELEVBQWlFO0FBQzdELHdCQUFJSyxJQUFKLEVBQVU7QUFDTlosbUNBQVdhLElBQVgsa0JBQStCWCxJQUEvQixTQUF1Q1MsR0FBdkMsVUFBaURHLEdBQWpELENBQXFERixJQUFyRDtBQUNILHFCQUZELE1BRU87QUFDSFosbUNBQVdhLElBQVgsa0JBQStCWCxJQUEvQixTQUF1Q1MsR0FBdkMsVUFBaURJLE1BQWpEO0FBQ0g7QUFDSixpQkFORCxNQU1PO0FBQ0gsd0JBQUlILElBQUosRUFBVTtBQUNOdkIsMERBQWdDYSxJQUFoQyxTQUF3Q1MsR0FBeEMsVUFBa0RHLEdBQWxELENBQXNERixJQUF0RCxFQUE0REksUUFBNUQsQ0FBcUVoQixVQUFyRTtBQUNIO0FBQ0o7QUFDSixhQVpEO0FBYUg7QUFDSixLQXhEeUI7QUEwRDFCaUIsZUExRDBCLHlCQTBEWjtBQUNWLGVBQU8sS0FBS2hDLFFBQVo7QUFDSCxLQTVEeUI7QUE4RDFCaUMsYUE5RDBCLHVCQThEZDtBQUNSLGVBQU8sS0FBS2hDLE1BQVo7QUFDSDtBQWhFeUIsQ0FBcEIsQ0FBTCxHQUFMOztBQW1FQVEscUJBQXFCWixRQUFRcUMsS0FBUixDQUFjbkMsTUFBZCxDQUFxQjtBQUN0Q29DLGdCQUFZLElBRDBCO0FBRXRDQyxhQUFTLElBRjZCO0FBR3RDQyxpQkFBYSxJQUh5QjtBQUl0Q0Msb0JBQWdCLElBSnNCO0FBS3RDQyxvQkFBZ0IsSUFMc0I7O0FBT3RDQyxhQUFTLElBUDZCOztBQVN0Q3JDLFFBVHNDLGtCQVMvQjtBQUNILFlBQUlzQyxhQUFKO0FBQ0EsYUFBS0MsSUFBTDs7QUFFQSxhQUFLSCxjQUFMLEdBQXNCbkMsRUFBRSwyREFBRixFQUErRDJCLFFBQS9ELENBQXdFbEMsUUFBUThDLElBQWhGLENBQXRCO0FBQ0EsYUFBS0MsWUFBTCxDQUFrQixLQUFLTCxjQUF2Qjs7QUFFQUUsZUFBT3JDLEVBQUUsQ0FDTCxtQ0FESyxFQUVELDZCQUZDLEVBR0csT0FISCxFQUlPLHlKQUpQLEVBS08sa0pBTFAsRUFNRyxRQU5ILEVBT0QsUUFQQyxFQVFELHVDQVJDLEVBU0cseURBVEgsRUFVTyxVQVZQLEVBV1csNEJBWFgsRUFXeUMsaUJBWHpDLEVBVzRELFNBWDVELEVBWVcsNEJBWlgsRUFZeUMsd0JBWnpDLEVBWW1FLFFBWm5FLEVBYU8sV0FiUCxFQWNPLG9CQWRQLEVBZVcsd0JBZlgsRUFnQmUsMEJBaEJmLEVBaUJtQixPQWpCbkIsRUFrQmUsUUFsQmYsRUFtQmUsOERBbkJmLEVBb0JXLFFBcEJYLEVBcUJXLHdCQXJCWCxFQXNCZSwwQkF0QmYsRUF1Qm1CLElBdkJuQixFQXdCZSxRQXhCZixFQXlCZSwyREF6QmYsRUEwQlcsUUExQlgsRUEyQk8sUUEzQlAsRUE0QkcsUUE1QkgsRUE2Qkcsb0RBN0JILEVBOEJPLFVBOUJQLEVBK0JXLDRCQS9CWCxFQStCeUMsZ0JBL0J6QyxFQStCMkQsU0EvQjNELEVBZ0NXLDRCQWhDWCxFQWdDeUMsdUJBaEN6QyxFQWdDa0UsUUFoQ2xFLEVBaUNPLFdBakNQLEVBa0NPLG9CQWxDUCxFQW1DVyx3QkFuQ1gsRUFvQ2UsMEJBcENmLEVBcUNtQixPQXJDbkIsRUFzQ2UsUUF0Q2YsRUF1Q2UsK0RBdkNmLEVBd0NXLFFBeENYLEVBeUNXLG9DQXpDWCxFQTBDZSxvQ0ExQ2YsRUEyQ2UsMEJBM0NmLEVBNENtQixXQTVDbkIsRUE2Q2UsUUE3Q2YsRUE4Q2Usa0VBOUNmLEVBK0NXLFFBL0NYLEVBZ0RPLFFBaERQLEVBaURHLFFBakRILEVBa0RELFFBbERDLEVBbURMLFlBbkRLLEVBb0RMLHlCQXBESyxFQXFERCx1QkFyREMsaUVBc0RnRXlDLE1BQU1DLENBQU4sQ0FBUSxjQUFSLEVBQXdCLFFBQXhCLENBdERoRSx3RUF1RGdFRCxNQUFNQyxDQUFOLENBQVEsY0FBUixFQUF3QixNQUF4QixDQXZEaEUsU0F3REQsUUF4REMsRUF5REwsV0F6REssRUEwRFBDLElBMURPLENBMERGLEVBMURFLENBQUYsRUEwREtoQixRQTFETCxDQTBEYyxLQUFLUSxjQTFEbkIsQ0FBUDs7QUE2REEsYUFBS0osVUFBTCxHQUFrQk0sS0FBS2IsSUFBTCxDQUFVLG9CQUFWLENBQWxCO0FBQ0EsYUFBS1EsT0FBTCxHQUFlSyxLQUFLYixJQUFMLENBQVUsaUJBQVYsQ0FBZjtBQUNBLGFBQUtTLFdBQUwsR0FBbUJJLEtBQUtiLElBQUwsQ0FBVSxxQkFBVixDQUFuQjtBQUNBLGFBQUtVLGNBQUwsR0FBc0JHLEtBQUtiLElBQUwsQ0FBVSx3QkFBVixDQUF0Qjs7QUFFQSxhQUFLb0IsUUFBTCxHQUFnQlAsS0FBS2IsSUFBTCxDQUFVLFlBQVYsQ0FBaEI7QUFDQSxhQUFLcUIsVUFBTCxHQUFrQlIsS0FBS2IsSUFBTCxDQUFVLFNBQVYsQ0FBbEI7O0FBRUEsYUFBS3NCLGVBQUw7O0FBRUEsYUFBSzdDLFdBQUwsQ0FBaUIsS0FBSzRDLFVBQXRCLEVBQWtDLE9BQWxDLEVBQTJDLE1BQTNDO0FBQ0EsYUFBSzVDLFdBQUwsQ0FBaUIsS0FBSzJDLFFBQXRCLEVBQWdDLE9BQWhDLEVBQXlDLG9CQUF6QztBQUNBLGFBQUszQyxXQUFMLENBQWlCLEtBQUtpQyxjQUF0QixFQUFzQyxPQUF0QyxFQUErQyxtQkFBL0M7QUFDQSxhQUFLakMsV0FBTCxDQUFpQixLQUFLa0MsY0FBdEIsRUFBc0MsUUFBdEMsRUFBZ0QsY0FBaEQ7QUFDSCxLQTNGcUM7QUE2RnRDWSxxQkE3RnNDLCtCQTZGbEI7QUFBQTs7QUFDaEIsWUFBSXBDLG1CQUFKO0FBQ0EsWUFBSXFDLGNBQUo7O0FBRUFyQyxxQkFBYSxLQUFLdUIsY0FBTCxDQUFvQmUsTUFBcEIsRUFBYjtBQUNBQyxtQkFBV3ZDLFdBQVdhLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBWDtBQUNBd0IsZ0JBQVFyQyxXQUFXYSxJQUFYLENBQWdCLGFBQWhCLENBQVI7O0FBRUFkLGVBQU87QUFDSHlDLGtCQUFNLEtBQUtqQixjQUFMLENBQW9CVCxHQUFwQjtBQURILFNBQVA7O0FBSUF5QixpQkFBUy9CLFdBQVQsQ0FBcUIsUUFBckI7O0FBRUFpQyxxQkFBYSxLQUFLaEIsT0FBbEI7O0FBRUEsYUFBS0EsT0FBTCxHQUFlaUIsV0FBVyxZQUFNO0FBQzVCSCxxQkFBUzlCLFFBQVQsQ0FBa0IsUUFBbEI7O0FBRUFxQixrQkFBTWEsaUJBQU4sQ0FBd0IsOENBQXhCLEVBQXdFNUMsSUFBeEUsRUFBOEVWLEVBQUV1RCxLQUFGLENBQVMsVUFBQ0MsUUFBRCxFQUFXQyxVQUFYLEVBQTBCO0FBQzdHLG9CQUFJRCxTQUFTRSxLQUFiLEVBQW9CO0FBQ2hCViwwQkFBTTdCLFdBQU4sQ0FBa0IsT0FBbEI7QUFDQTZCLDBCQUFNNUIsUUFBTixDQUFlLFNBQWY7QUFDSCxpQkFIRCxNQUdPO0FBQ0g0QiwwQkFBTTdCLFdBQU4sQ0FBa0IsU0FBbEI7QUFDQTZCLDBCQUFNNUIsUUFBTixDQUFlLE9BQWY7QUFDSDtBQUNKLGFBUjZFLFFBQTlFO0FBU0gsU0FaYyxFQVlaLElBWlksQ0FBZjtBQWFILEtBMUhxQztBQTRIdEMwQixtQkE1SHNDLDZCQTRIcEI7QUFDZGYscUJBQWEvQixFQUFFLG1EQUFGLEVBQXVEeUIsR0FBdkQsRUFBYjtBQUNBTyxrQkFBVWhDLEVBQUUsZ0RBQUYsRUFBb0R5QixHQUFwRCxFQUFWO0FBQ0FRLHNCQUFjakMsRUFBRSxvREFBRixFQUF3RHlCLEdBQXhELEVBQWQ7QUFDQVMseUJBQWlCbEMsRUFBRSx1REFBRixFQUEyRHlCLEdBQTNELEVBQWpCOztBQUVBLFlBQUlNLFVBQUosRUFBZ0I7QUFDWixpQkFBS0ksY0FBTCxDQUFvQlgsSUFBcEIsQ0FBeUIsb0JBQXpCLEVBQStDQyxHQUEvQyxDQUFtRE0sVUFBbkQ7QUFDSDs7QUFFRCxZQUFJQyxPQUFKLEVBQWE7QUFDVCxpQkFBS0csY0FBTCxDQUFvQlgsSUFBcEIsQ0FBeUIsaUJBQXpCLEVBQTRDQyxHQUE1QyxDQUFnRE8sT0FBaEQ7QUFDSDs7QUFFRCxZQUFJQyxXQUFKLEVBQWlCO0FBQ2IsaUJBQUtFLGNBQUwsQ0FBb0JYLElBQXBCLENBQXlCLHFCQUF6QixFQUFnREMsR0FBaEQsQ0FBb0RRLFdBQXBEO0FBQ0g7O0FBRUQsWUFBSUMsY0FBSixFQUFvQjtBQUNoQixpQkFBS0MsY0FBTCxDQUFvQlgsSUFBcEIsQ0FBeUIsd0JBQXpCLEVBQW1EQyxHQUFuRCxDQUF1RFMsY0FBdkQ7QUFDSDtBQUNKLEtBakpxQztBQW1KdEN5QixzQkFuSnNDLDhCQW1KbkJuRCxDQW5KbUIsRUFtSmhCO0FBQUE7O0FBQ2xCQSxVQUFFb0QsY0FBRjtBQUNBLFlBQUlDLGVBQUo7QUFDQSxZQUFJQyxhQUFKO0FBQ0EsWUFBSUMsZUFBSjs7QUFFQUQsZUFBTzlELEVBQUVRLEVBQUV3RCxhQUFKLENBQVA7QUFDQUgsaUJBQVNDLEtBQUtwRCxJQUFMLENBQVUsUUFBVixDQUFUO0FBQ0FxRCxpQkFBUy9ELEVBQUUsTUFBSTZELE1BQU4sRUFBY0UsTUFBZCxLQUF5QixFQUFsQzs7QUFFQS9ELFVBQUUsWUFBRixFQUFnQm1CLFdBQWhCLENBQTRCLFFBQTVCO0FBQ0FuQixVQUFFLGdCQUFGLEVBQW9CbUIsV0FBcEIsQ0FBZ0MsUUFBaEM7O0FBRUEyQyxhQUFLMUMsUUFBTCxDQUFjLFFBQWQ7QUFDQXBCLFVBQUUsTUFBSTZELE1BQU4sRUFBY3pDLFFBQWQsQ0FBdUIsUUFBdkI7O0FBRUEsYUFBS1QsVUFBTCxDQUFnQnNELFFBQWhCLENBQXlCLE1BQXpCO0FBQ0EsYUFBS3RELFVBQUwsQ0FBZ0JzRCxRQUFoQixDQUF5QixFQUFDRixRQUFRQSxNQUFULEVBQXpCLEVBQTJDLE1BQTNDLEVBQW1ELFlBQU07QUFDckQsbUJBQUtwRCxVQUFMLENBQWdCdUQsR0FBaEIsQ0FBb0I7QUFDaEJILHdCQUFRQSxNQURRO0FBRWhCSSwyQkFBVztBQUZLLGFBQXBCO0FBSUgsU0FMRDtBQU1ILEtBMUtxQztBQTRLdENDLGdCQTVLc0Msd0JBNEt6QjVELENBNUt5QixFQTRLdEI7QUFDWixZQUFJUyxnQkFBSjtBQUNBQSxrQkFBVSxFQUFWOztBQUVBVCxVQUFFb0QsY0FBRjs7QUFFQSxZQUFJLENBQUMsS0FBS1MsT0FBVixFQUFtQjtBQUNmO0FBQ0g7O0FBRUQsWUFBSSxLQUFLdEMsVUFBTCxDQUFnQk4sR0FBaEIsRUFBSixFQUEyQjtBQUN2QlIsb0JBQVFxRCxTQUFSLEdBQW9CLEtBQUt2QyxVQUFMLENBQWdCTixHQUFoQixFQUFwQjtBQUNIOztBQUVELFlBQUksS0FBS08sT0FBTCxDQUFhUCxHQUFiLEVBQUosRUFBd0I7QUFDcEJSLG9CQUFRcEIsTUFBUixHQUFpQixLQUFLbUMsT0FBTCxDQUFhUCxHQUFiLEVBQWpCO0FBQ0g7O0FBRUQsWUFBSSxLQUFLUSxXQUFMLENBQWlCUixHQUFqQixFQUFKLEVBQTRCO0FBQ3hCUixvQkFBUXNELFVBQVIsR0FBcUIsS0FBS3RDLFdBQUwsQ0FBaUJSLEdBQWpCLEVBQXJCO0FBQ0g7O0FBRUQsWUFBSSxLQUFLUyxjQUFMLENBQW9CVCxHQUFwQixFQUFKLEVBQStCO0FBQzNCUixvQkFBUXVELGFBQVIsR0FBd0IsS0FBS3RDLGNBQUwsQ0FBb0JULEdBQXBCLEVBQXhCO0FBQ0g7O0FBRUQsYUFBS2dELE9BQUwsQ0FBYSxtQkFBYixFQUFrQyxFQUFFeEQsU0FBU0EsT0FBWCxFQUFsQztBQUNBLGFBQUt5RCxJQUFMO0FBQ0gsS0F4TXFDO0FBME10Q0MsYUExTXNDLHVCQTBNMUI7QUFDUixhQUFLckMsSUFBTDtBQUNBLGFBQUtzQyxPQUFMO0FBQ0gsS0E3TXFDO0FBK010Q0EsV0EvTXNDLHFCQStNNUI7QUFDTixhQUFLdEMsSUFBTDtBQUNBLGFBQUszQixVQUFMLENBQWdCZSxNQUFoQjtBQUNBLGFBQUttRCxNQUFMLENBQVluRCxNQUFaO0FBQ0gsS0FuTnFDO0FBcU50Q2pCLFFBck5zQyxnQkFxTmpDUSxPQXJOaUMsRUFxTnhCO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQUtxQixJQUFMO0FBQ0g7QUEvT3FDLENBQXJCLENBQXJCOztBQW1QQXdDLE9BQU92RixFQUFQLEdBQVlBLEVBQVosQyIsImZpbGUiOiIvcmVsZWFzZS9zcmMvYXNzZXRzL2pzL2Rlc2lnbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzFjMDBkYWNlMjBjZTRkMTExYjQiLCJsZXQgTERcblxuTEQgPSB7XG4gICAgc2V0dXAoKSB7fVxufVxuXG5MRCA9IG5ldyAoR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgbGF5b3V0SWQ6IG51bGwsXG4gICAgZm9ybUlkOiBudWxsLFxuICAgICRzZXR0aW5nc0J0bjogbnVsbCxcblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubGF5b3V0SWQgPSBudWxsXG4gICAgICAgIHRoaXMubGF5b3V0SWQgPSBudWxsXG4gICAgICAgIHRoaXMuJHNldHRpbmdzQnRuID0gJCgnLmZpZWxkcy1zZXR0aW5ncycpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRzZXR0aW5nc0J0biwgJ2NsaWNrJywgJ3Nob3dGaWVsZHNTZXR0aW5ncycpXG4gICAgfSxcblxuICAgIHNldHVwKCkge1xuICAgIH0sXG5cbiAgICBzaG93RmllbGRzU2V0dGluZ3MoKSB7XG4gICAgICAgIGxldCBzZWxmXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgbW9kYWwgPSBuZXcgRmllbGRTZXR0aW5nc01vZGFsKClcbiAgICAgICAgbW9kYWwub24oJ3NldEZpZWxkc1NldHRpbmdzJywgZSA9PiBzZWxmLnNldEZvcm1EYXRhKGUpKVxuICAgICAgICBtb2RhbC5zaG93KClcbiAgICB9LFxuXG4gICAgc2V0Rm9ybURhdGEoZGF0YSkge1xuICAgICAgICBsZXQgc2VsZlxuICAgICAgICBsZXQgJGNvbnRhaW5lclxuICAgICAgICBsZXQgJGZpZWxkXG4gICAgICAgIGxldCBuYW1lXG4gICAgICAgIHNlbGYgPSB0aGlzXG5cbiAgICAgICAgJGNvbnRhaW5lciA9ICQoJyNmaWVsZGxheW91dHNldHRpbmdzJylcbiAgICAgICAgbmFtZSA9ICdzZXR0aW5nc1tmaWVsZHNdW2dsb2JhbF0nXG5cbiAgICAgICAgJGNvbnRhaW5lci5odG1sKCcnKVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhkYXRhLm9wdGlvbnMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJCgnLmZpZWxkcy1zZXR0aW5ncycpLnJlbW92ZUNsYXNzKCdoYXMtdmFsdWVzJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5maWVsZHMtc2V0dGluZ3MnKS5hZGRDbGFzcygnaGFzLXZhbHVlcycpXG5cbiAgICAgICAgICAgICQuZWFjaChkYXRhLm9wdGlvbnMsIChrZXksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoJGNvbnRhaW5lci5maW5kKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvbnRhaW5lci5maW5kKGBpbnB1dFtuYW1lPVwiJHtuYW1lfVske2tleX1dXCJdYCkudmFsKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLmZpbmQoYGlucHV0W25hbWU9XCIke25hbWV9WyR7a2V5fV1cIl1gKS5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoYDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIiR7bmFtZX1bJHtrZXl9XVwiPmApLnZhbChpdGVtKS5hcHBlbmRUbygkY29udGFpbmVyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRMYXlvdXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0SWRcbiAgICB9LFxuXG4gICAgZ2V0Rm9ybUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtSWRcbiAgICB9XG59KSlcblxuRmllbGRTZXR0aW5nc01vZGFsID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgICRmb3JtQ2xhc3M6IG51bGwsXG4gICAgJGZvcm1JZDogbnVsbCxcbiAgICAkaW5wdXRDbGFzczogbnVsbCxcbiAgICAkaW5wdXRUZW1wbGF0ZTogbnVsbCxcbiAgICAkZm9ybUNvbnRhaW5lcjogbnVsbCxcblxuICAgIHRpbWVvdXQ6IG51bGwsXG5cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgYm9keVxuICAgICAgICB0aGlzLmJhc2UoKVxuXG4gICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIgPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbCBoYXMtc2lkZWJhclwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybUNvbnRhaW5lcilcblxuICAgICAgICBib2R5ID0gJChbXG4gICAgICAgICAgICAnPHNlY3Rpb24gY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj4nLFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtc2lkZWJhclwiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPG5hdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiI1wiIGNsYXNzPVwibW9kYWwtbmF2IGFjdGl2ZVwiIGRhdGEtdGFyZ2V0PVwibW9kYWwtY29udGVudC1zdHlsZXNcIj48aSBjbGFzcz1cImZhciBmYS1jbGlwYm9hcmQtbGlzdFwiPjwvaT4gPHNwYW4gY2xhc3M9XCJsaW5rLXRleHRcIj5TdHlsZXM8L3NwYW4+PC9hPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJtb2RhbC1uYXZcIiBkYXRhLXRhcmdldD1cIm1vZGFsLWNvbnRlbnQtc2V0dGluZ3NcIj48aSBjbGFzcz1cImZhciBmYS13aW5kb3ctYWx0XCI+PC9pPiA8c3BhbiBjbGFzcz1cImxpbmstdGV4dFwiPlNldHRpbmdzPC9zcGFuPjwvYT4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzwvbmF2PicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQtY29udGFpbmVyXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudCBtb2RhbC1jb250ZW50LXN0eWxlcyBhY3RpdmVcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0Zvcm0gQXR0cmlidXRlcycsICc8L3NwYW4+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnN0cnVjdGlvbnNcIj4nLCAnR2xvYmFsIGZvcm0gYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ0xBU1MnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBnbG9iYWwtZm9ybS1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0lEJywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwidGV4dCBmdWxsd2lkdGggZ2xvYmFsLWZvcm0taWRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgbW9kYWwtY29udGVudC1zZXR0aW5nc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxoZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nLCAnSW5wdXQgU2V0dGluZ3MnLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0dsb2JhbCBpbnB1dCBzZXR0aW5ncycsICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDTEFTUycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHQgZnVsbHdpZHRoIGdsb2JhbC1pbnB1dC1jbGFzc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkIGhhcy1zcGlubmVyXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic3Bpbm5lciBoaWRkZW5cIj48L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdURU1QTEFURVMnLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJ0ZXh0IGZ1bGx3aWR0aCBnbG9iYWwtaW5wdXQtdGVtcGxhdGVcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLFxuICAgICAgICAgICAgJzwvc2VjdGlvbj4nLFxuICAgICAgICAgICAgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpfVwiPmAsIFxuICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpfVwiPmAsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Zvb3Rlcj4nXG4gICAgICAgIF0uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm1Db250YWluZXIpO1xuXG5cbiAgICAgICAgdGhpcy4kZm9ybUNsYXNzID0gYm9keS5maW5kKCcuZ2xvYmFsLWZvcm0tY2xhc3MnKVxuICAgICAgICB0aGlzLiRmb3JtSWQgPSBib2R5LmZpbmQoJy5nbG9iYWwtZm9ybS1pZCcpXG4gICAgICAgIHRoaXMuJGlucHV0Q2xhc3MgPSBib2R5LmZpbmQoJy5nbG9iYWwtaW5wdXQtY2xhc3MnKVxuICAgICAgICB0aGlzLiRpbnB1dFRlbXBsYXRlID0gYm9keS5maW5kKCcuZ2xvYmFsLWlucHV0LXRlbXBsYXRlJylcblxuICAgICAgICB0aGlzLiRuYXZMaW5rID0gYm9keS5maW5kKCcubW9kYWwtbmF2JylcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJylcblxuICAgICAgICB0aGlzLmxvYWRNb2RhbFZhbHVlcygpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjYW5jZWxCdG4sICdjbGljaycsICdoaWRlJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRuYXZMaW5rLCAnY2xpY2snLCAndG9nZ2xlTW9kYWxDb250ZW50JylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRpbnB1dFRlbXBsYXRlLCAna2V5dXAnLCAnY2hlY2tUZW1wbGF0ZVBhdGgnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm1Db250YWluZXIsICdzdWJtaXQnLCAnb25Gb3JtU3VibWl0JylcbiAgICB9LFxuXG4gICAgY2hlY2tUZW1wbGF0ZVBhdGgoKSB7XG4gICAgICAgIGxldCAkY29udGFpbmVyXG4gICAgICAgIGxldCAkaGludFxuXG4gICAgICAgICRjb250YWluZXIgPSB0aGlzLiRpbnB1dFRlbXBsYXRlLnBhcmVudCgpXG4gICAgICAgICRzcGlubmVyID0gJGNvbnRhaW5lci5maW5kKCcuc3Bpbm5lcicpXG4gICAgICAgICRoaW50ID0gJGNvbnRhaW5lci5maW5kKCcuaW5wdXQtaGludCcpXG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMuJGlucHV0VGVtcGxhdGUudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgICRzcGlubmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG5cbiAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkc3Bpbm5lci5hZGRDbGFzcygnaGlkZGVuJylcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9mb3Jtcy9jaGVjay1pbnB1dC10ZW1wbGF0ZS1wYXRoJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRoaW50LnJlbW92ZUNsYXNzKCdlcnJvcicpXG4gICAgICAgICAgICAgICAgICAgICRoaW50LmFkZENsYXNzKCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkaGludC5yZW1vdmVDbGFzcygnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgICAgICRoaW50LmFkZENsYXNzKCdlcnJvcicpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKVxuICAgICAgICB9LCAxMDAwKVxuICAgIH0sXG5cbiAgICBsb2FkTW9kYWxWYWx1ZXMoKSB7XG4gICAgICAgICRmb3JtQ2xhc3MgPSAkKCdpbnB1dFtuYW1lPVwic2V0dGluZ3NbZmllbGRzXVtnbG9iYWxdW2Zvcm1DbGFzc11cIl0nKS52YWwoKVxuICAgICAgICAkZm9ybUlkID0gJCgnaW5wdXRbbmFtZT1cInNldHRpbmdzW2ZpZWxkc11bZ2xvYmFsXVtmb3JtSWRdXCJdJykudmFsKClcbiAgICAgICAgJGlucHV0Q2xhc3MgPSAkKCdpbnB1dFtuYW1lPVwic2V0dGluZ3NbZmllbGRzXVtnbG9iYWxdW2lucHV0Q2xhc3NdXCJdJykudmFsKClcbiAgICAgICAgJGlucHV0VGVtcGxhdGUgPSAkKCdpbnB1dFtuYW1lPVwic2V0dGluZ3NbZmllbGRzXVtnbG9iYWxdW2lucHV0VGVtcGxhdGVdXCJdJykudmFsKClcblxuICAgICAgICBpZiAoJGZvcm1DbGFzcykge1xuICAgICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuZ2xvYmFsLWZvcm0tY2xhc3MnKS52YWwoJGZvcm1DbGFzcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkZm9ybUlkKSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5nbG9iYWwtZm9ybS1pZCcpLnZhbCgkZm9ybUlkKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRpbnB1dENsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtQ29udGFpbmVyLmZpbmQoJy5nbG9iYWwtaW5wdXQtY2xhc3MnKS52YWwoJGlucHV0Q2xhc3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGlucHV0VGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmdsb2JhbC1pbnB1dC10ZW1wbGF0ZScpLnZhbCgkaW5wdXRUZW1wbGF0ZSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGVNb2RhbENvbnRlbnQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgbGV0IHRhcmdldFxuICAgICAgICBsZXQgbGlua1xuICAgICAgICBsZXQgaGVpZ2h0XG5cbiAgICAgICAgbGluayA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgICB0YXJnZXQgPSBsaW5rLmRhdGEoJ3RhcmdldCcpXG4gICAgICAgIGhlaWdodCA9ICQoJy4nK3RhcmdldCkuaGVpZ2h0KCkgKyA1M1xuXG4gICAgICAgICQoJy5tb2RhbC1uYXYnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcblxuICAgICAgICBsaW5rLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKCcuJyt0YXJnZXQpLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSh7aGVpZ2h0OiBoZWlnaHR9LCAnZmFzdCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogJ2F1dG8nXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvbkZvcm1TdWJtaXQoZSkge1xuICAgICAgICBsZXQgb3B0aW9uc1xuICAgICAgICBvcHRpb25zID0ge31cblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kZm9ybUNsYXNzLnZhbCgpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmZvcm1DbGFzcyA9IHRoaXMuJGZvcm1DbGFzcy52YWwoKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGZvcm1JZC52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JtSWQgPSB0aGlzLiRmb3JtSWQudmFsKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRpbnB1dENsYXNzLnZhbCgpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmlucHV0Q2xhc3MgPSB0aGlzLiRpbnB1dENsYXNzLnZhbCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kaW5wdXRUZW1wbGF0ZS52YWwoKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5pbnB1dFRlbXBsYXRlID0gdGhpcy4kaW5wdXRUZW1wbGF0ZS52YWwoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdzZXRGaWVsZHNTZXR0aW5ncycsIHsgb3B0aW9uczogb3B0aW9ucyB9KVxuICAgICAgICB0aGlzLmhpZGUoKVxuICAgIH0sXG5cbiAgICBvbkZhZGVPdXQoKSB7XG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgfSxcblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYmFzZSgpXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKVxuICAgICAgICB0aGlzLiRzaGFkZS5yZW1vdmUoKVxuICAgIH0sXG5cbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgICAgLy8gbGV0IHNlbGZcbiAgICAgICAgLy8gbGV0IHZhbHVlc1xuICAgICAgICAvLyBzZWxmID0gdGhpc1xuXG4gICAgICAgIC8vIGlmIChvcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgIHZhbHVlcyA9IEpTT04ucGFyc2Uob3B0aW9uc1t0aGlzLmZpZWxkLmlkXSlcblxuICAgICAgICAvLyAgICAgJC5lYWNoKHZhbHVlcywgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoa2V5ID09ICdjbGFzcycgJiYgdmFsdWUpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgc2VsZi4kY2xhc3NJbnB1dC52YWwodmFsdWUpXG4gICAgICAgIC8vICAgICAgICAgfVxuXG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSA9PSAnaWQnICYmIHZhbHVlKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuJGlkSW5wdXQudmFsKHZhbHVlKVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pXG5cbiAgICAgICAgLy8gICAgIGlmICghR2FybmlzaC5pc01vYmlsZUJyb3dzZXIoKSkge1xuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuJGNsYXNzSW5wdXQuZm9jdXMoKVxuICAgICAgICAvLyAgICAgICAgIH0pKSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICB9XG5cbn0pXG5cbndpbmRvdy5MRCA9IExEXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvZGVzaWduZXIuanMiXSwic291cmNlUm9vdCI6IiJ9