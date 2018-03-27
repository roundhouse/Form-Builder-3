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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),

/***/ 22:
/***/ (function(module, exports) {

function isToggler(item) {
    console.log(item);
}

var OptionModal;

window.OptionModal = Garnish.Modal.extend({
    option: null,
    $form: null,
    $modalInputs: null,
    $redactor: null,
    $validationItems: [],

    $togglerInput: null,
    hasTogglers: false,

    errors: [],
    errorLength: 0,

    init: function init(option) {
        var body, fields, self;
        self = this;
        this.option = option;
        this.base();
        this.$form = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$form);

        body = $(['<header>', '<span class="modal-title">', option.$data.title, '</span>', '<div class="instructions">', option.$data.instructions, '</div>', '</header>', '<div class="body"></div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$form);

        toggler = option.$inputs.some(function (elem) {
            return elem.toggler;
        });
        this.hasTogglers = toggler;

        $.each(option.$inputs, function (i, item) {
            var $input, camelClassName, className, required, validation;
            required = item.required ? 'data-required' : 'data-not-required';

            if (item.toggler) {
                self.$togglerInput = item;
            }

            if (item.type !== 'checkbox' && !item.toggler) {
                className = item.name.replace(/[_\W]+/g, "-").slice(0, -1);

                camelClassName = className.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });

                if (item.validation) {
                    validation = item.validation;
                    validation['passed'] = false;
                    validation['inputClass'] = className;
                    self.$validationItems[i] = item;
                }

                if (item.type === 'textarea') {
                    $input = "<textarea class='" + className + " " + required + "' value='" + item.value + "' data-hint='" + item.hint + "' data-name='" + item.name + "' " + required + " />" + item.value + "</textarea>";
                } else if (item.type === 'select') {
                    $input = $.parseJSON(item.options);
                } else {
                    $input = "<input type='" + item.type + "' class='" + className + " " + required + "' value='" + item.value + "' data-hint='" + item.hint + "' data-name='" + item.name + "' " + required + " />";
                }

                return self.renderInputs(required, $input, item.value, item.type, item.name, item.hint, className);
            }
        });

        if (this.option.$container.hasClass('has-fields')) {
            fields = new Fields(this.option, this.$form);
        }

        this.$modalInputs = this.$form.find('.body').find('input, textarea, select');

        if (this.$togglerInput) {
            this.activateFieldToggle();
        }

        this.show();
        this.$saveBtn = body.find('.submit');
        this.$cancelBtn = body.find('.cancel');
        this.addListener(this.$cancelBtn, 'click', 'cancel');

        return this.addListener(this.$form, 'submit', 'save');
    },

    activateFieldToggle: function activateFieldToggle() {
        var $toggler = void 0;
        var item = void 0;

        $toggler = this.$form.find('.toggle-btn');

        if (this.$togglerInput.value) {
            item = this.$form.find('[data-selection-target="' + this.$togglerInput.value + '"]');
            item.parent().addClass('active-field');
        } else {
            $($toggler[0]).parent().addClass('active-field');
            target = $($toggler[0]).data('selection-target');
            input = $('input[name="' + this.$togglerInput.name + '"]');
            input.val(target);
        }

        $toggler.on('click', $.proxy(function (e) {
            var input = void 0;
            var target = void 0;

            // $toggler.removeClass('active-field');
            $toggler.parent().removeClass('active-field');

            $(e.target).parent().addClass('active-field');
            // $(e.target).addClass('active-field');

            target = $(e.target).data('selection-target');
            input = $('input[name="' + this.$togglerInput.name + '"]');
            input.val(target);
        }, this));
    },

    renderInputs: function renderInputs(required, el, value, type, name, hint, className) {
        var $input, togglerClass;

        togglerClass = this.hasTogglers ? 'toggle-field' : '';
        if (type === 'select') {
            $input = $('<div class="fb-field ' + togglerClass + '">' + '<div class="input-hint">' + hint + '</div>' + '<div class="select input"><select class="' + className + ' ' + required + '" data-hint="' + hint + '" data-name="' + name + '" /></div>' + '</div>');
            $.each(el, function (i, item) {
                $input.find('select').append($('<option>', {
                    value: item.value,
                    text: item.label
                }));
            });
            $input.find('select').val(value);
        } else {
            $input = $('<div class="fb-field ' + togglerClass + '">' + '<div class="input-hint">' + hint + '</div>' + '<div class="input">' + el + '</div>' + '</div>');
        }

        if (this.hasTogglers) {
            $input.append($('<div class="toggle-btn" data-selection-target="' + hint.toLowerCase() + '"></div>'));
        }

        this.$form.find('.body').append($input);

        // if (type === 'textarea') {
        //     return this.initRedactor(el);
        // }
    },

    initRedactor: function initRedactor(item) {
        var className, el;
        className = $(item)[0].className;
        el = this.$form.find("." + className);
        el.redactor({
            maxHeight: 160,
            minHeight: 150,
            maxWidth: '400px',
            buttons: ['bold', 'italic', 'link', 'horizontalrule'],
            plugins: ['fontfamily', 'fontsize', 'alignment', 'fontcolor']
        });

        return this.$redactor = el.redactor('core.object');
    },

    cancel: function cancel() {
        if (!this.option.editing) {
            this.option.$edit.addClass('hidden');
            this.option.$container.removeClass('option-enabled');
            this.option.$resultContainer.html('');
            this.option.$toggle.html('ENABLE');
            this.disableOption();
            return this.closeModal();
        } else {
            return this.closeModal();
        }
    },

    disableOption: function disableOption() {
        if (this.option.$enableCheckbox) {
            return this.option.$enableCheckbox.prop('checked', false);
        }
    },

    hide: function hide() {
        return this.cancel();
    },

    closeModal: function closeModal(ev) {
        this.disable();

        if (ev) {
            ev.stopPropagation();
        }

        if (this.$container) {
            this.$container.velocity('fadeOut', {
                duration: Garnish.FX_DURATION
            });

            this.$shade.velocity('fadeOut', {
                duration: Garnish.FX_DURATION,
                complete: $.proxy(this, 'onFadeOut')
            });

            if (this.settings.hideOnShadeClick) {
                this.removeListener(this.$shade, 'click');
            }

            this.removeListener(Garnish.$win, 'resize');
        }

        this.visible = false;
        Garnish.Modal.visibleModal = null;

        if (this.settings.hideOnEsc) {
            Garnish.escManager.unregister(this);
        }

        this.trigger('hide');

        return this.settings.onHide();
    },

    runValidation: function runValidation(e) {
        var self;
        e.preventDefault();
        self = this;

        if (this.$validationItems) {
            return $.each(this.$validationItems, function (i, item) {
                var input;
                input = self.$form.find("." + item.validation.inputClass);
                if (input.val().match(/^\d+$/)) {
                    return item.validation.passed = true;
                } else {
                    item.validation.passed = false;
                    return Craft.cp.displayNotice(item.validation.errorMessage);
                }
            });
        } else {
            return this.save();
        }
    },

    save: function save(e) {
        var self;
        e.preventDefault();
        self = this;

        if (this.option.$container.hasClass('tags')) {
            this.checkErrors();
            if (this.errors.length > 0) {
                $.each(self.errors, function (i, item) {
                    $(item).parent().parent().addClass('error');
                });

                Garnish.shake(this.$container);
            } else {
                this.updateOption();
            }
        } else {
            this.checkErrors();
            if (this.errorLength === this.$modalInputs.length) {
                $.each(self.errors, function (i, item) {
                    if ($(item).is('select')) {
                        $(item).parent().parent().addClass('error');
                    } else {
                        $(item).parent().parent().addClass('error');
                    }
                });

                Garnish.shake(this.$container);
            } else {
                this.updateOption();
            }
        }
    },

    checkErrors: function checkErrors() {
        var self;
        self = this;
        this.errors = [];
        this.errorLength = 0;

        $.each(this.$modalInputs, function (i, item) {
            if ($(item).hasClass('data-required')) {
                if ($(item).val() === '') {
                    self.errors[i] = item;
                    self.errorLength += 1;
                }
            }
        });
    },

    updateOption: function updateOption() {
        this.option.updateHtmlFromModal();
        this.closeModal();
        this.$form[0].reset();

        Craft.cp.displayNotice(this.option.$data.successMessage);
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGI4MGVhYmZmNWJiMTlkYTA1NDUiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvbW9kYWwuanMiXSwibmFtZXMiOlsiaXNUb2dnbGVyIiwiaXRlbSIsImNvbnNvbGUiLCJsb2ciLCJPcHRpb25Nb2RhbCIsIndpbmRvdyIsIkdhcm5pc2giLCJNb2RhbCIsImV4dGVuZCIsIm9wdGlvbiIsIiRmb3JtIiwiJG1vZGFsSW5wdXRzIiwiJHJlZGFjdG9yIiwiJHZhbGlkYXRpb25JdGVtcyIsIiR0b2dnbGVySW5wdXQiLCJoYXNUb2dnbGVycyIsImVycm9ycyIsImVycm9yTGVuZ3RoIiwiaW5pdCIsImJvZHkiLCJmaWVsZHMiLCJzZWxmIiwiYmFzZSIsIiQiLCJhcHBlbmRUbyIsIiRib2QiLCJzZXRDb250YWluZXIiLCIkZGF0YSIsInRpdGxlIiwiaW5zdHJ1Y3Rpb25zIiwiQ3JhZnQiLCJ0Iiwiam9pbiIsInRvZ2dsZXIiLCIkaW5wdXRzIiwic29tZSIsImVsZW0iLCJlYWNoIiwiaSIsIiRpbnB1dCIsImNhbWVsQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwicmVxdWlyZWQiLCJ2YWxpZGF0aW9uIiwidHlwZSIsIm5hbWUiLCJyZXBsYWNlIiwic2xpY2UiLCJnIiwidG9VcHBlckNhc2UiLCJ2YWx1ZSIsImhpbnQiLCJwYXJzZUpTT04iLCJvcHRpb25zIiwicmVuZGVySW5wdXRzIiwiJGNvbnRhaW5lciIsImhhc0NsYXNzIiwiRmllbGRzIiwiZmluZCIsImFjdGl2YXRlRmllbGRUb2dnbGUiLCJzaG93IiwiJHNhdmVCdG4iLCIkY2FuY2VsQnRuIiwiYWRkTGlzdGVuZXIiLCIkdG9nZ2xlciIsInBhcmVudCIsImFkZENsYXNzIiwidGFyZ2V0IiwiZGF0YSIsImlucHV0IiwidmFsIiwib24iLCJwcm94eSIsImUiLCJyZW1vdmVDbGFzcyIsImVsIiwidG9nZ2xlckNsYXNzIiwiYXBwZW5kIiwidGV4dCIsImxhYmVsIiwidG9Mb3dlckNhc2UiLCJpbml0UmVkYWN0b3IiLCJyZWRhY3RvciIsIm1heEhlaWdodCIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwiYnV0dG9ucyIsInBsdWdpbnMiLCJjYW5jZWwiLCJlZGl0aW5nIiwiJGVkaXQiLCIkcmVzdWx0Q29udGFpbmVyIiwiaHRtbCIsIiR0b2dnbGUiLCJkaXNhYmxlT3B0aW9uIiwiY2xvc2VNb2RhbCIsIiRlbmFibGVDaGVja2JveCIsInByb3AiLCJoaWRlIiwiZXYiLCJkaXNhYmxlIiwic3RvcFByb3BhZ2F0aW9uIiwidmVsb2NpdHkiLCJkdXJhdGlvbiIsIkZYX0RVUkFUSU9OIiwiJHNoYWRlIiwiY29tcGxldGUiLCJzZXR0aW5ncyIsImhpZGVPblNoYWRlQ2xpY2siLCJyZW1vdmVMaXN0ZW5lciIsIiR3aW4iLCJ2aXNpYmxlIiwidmlzaWJsZU1vZGFsIiwiaGlkZU9uRXNjIiwiZXNjTWFuYWdlciIsInVucmVnaXN0ZXIiLCJ0cmlnZ2VyIiwib25IaWRlIiwicnVuVmFsaWRhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiaW5wdXRDbGFzcyIsIm1hdGNoIiwicGFzc2VkIiwiY3AiLCJkaXNwbGF5Tm90aWNlIiwiZXJyb3JNZXNzYWdlIiwic2F2ZSIsImNoZWNrRXJyb3JzIiwibGVuZ3RoIiwic2hha2UiLCJ1cGRhdGVPcHRpb24iLCJpcyIsInVwZGF0ZUh0bWxGcm9tTW9kYWwiLCJyZXNldCIsInN1Y2Nlc3NNZXNzYWdlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5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QStTdENpSCxrQkFBYyx3QkFBVztBQUNyQixhQUFLekgsTUFBTCxDQUFZMkgsbUJBQVo7QUFDQSxhQUFLckMsVUFBTDtBQUNBLGFBQUtyRixLQUFMLENBQVcsQ0FBWCxFQUFjMkgsS0FBZDs7QUFFQXZHLGNBQU02RixFQUFOLENBQVNDLGFBQVQsQ0FBdUIsS0FBS25ILE1BQUwsQ0FBWWtCLEtBQVosQ0FBa0IyRyxjQUF6QztBQUNIO0FBclRxQyxDQUFyQixDQUFyQixDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy9hc3NldHMvanMvbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGI4MGVhYmZmNWJiMTlkYTA1NDUiLCJmdW5jdGlvbiBpc1RvZ2dsZXIoaXRlbSkge1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pXG59XG5cbnZhciBPcHRpb25Nb2RhbDtcblxud2luZG93Lk9wdGlvbk1vZGFsID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgIG9wdGlvbjogbnVsbCxcbiAgICAkZm9ybTogbnVsbCxcbiAgICAkbW9kYWxJbnB1dHM6IG51bGwsXG4gICAgJHJlZGFjdG9yOiBudWxsLFxuICAgICR2YWxpZGF0aW9uSXRlbXM6IFtdLFxuICAgIFxuICAgICR0b2dnbGVySW5wdXQ6IG51bGwsXG4gICAgaGFzVG9nZ2xlcnM6IGZhbHNlLFxuXG4gICAgZXJyb3JzOiBbXSxcbiAgICBlcnJvckxlbmd0aDogMCxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICB2YXIgYm9keSwgZmllbGRzLCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5vcHRpb24gPSBvcHRpb247XG4gICAgICAgIHRoaXMuYmFzZSgpO1xuICAgICAgICB0aGlzLiRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKTtcbiAgICAgICAgXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jywgb3B0aW9uLiRkYXRhLnRpdGxlLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+Jywgb3B0aW9uLiRkYXRhLmluc3RydWN0aW9ucywgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvaGVhZGVyPicsIFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJib2R5XCI+PC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKSArICdcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpICsgJ1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Zvb3Rlcj4nXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybSk7XG4gICAgICAgIFxuICAgICAgICB0b2dnbGVyID0gb3B0aW9uLiRpbnB1dHMuc29tZShmdW5jdGlvbihlbGVtKSB7IHJldHVybiBlbGVtLnRvZ2dsZXIgfSApXG4gICAgICAgIHRoaXMuaGFzVG9nZ2xlcnMgPSB0b2dnbGVyXG5cbiAgICAgICAgJC5lYWNoKG9wdGlvbi4kaW5wdXRzLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIgJGlucHV0LCBjYW1lbENsYXNzTmFtZSwgY2xhc3NOYW1lLCByZXF1aXJlZCwgdmFsaWRhdGlvbjtcbiAgICAgICAgICAgIHJlcXVpcmVkID0gaXRlbS5yZXF1aXJlZCA/ICdkYXRhLXJlcXVpcmVkJyA6ICdkYXRhLW5vdC1yZXF1aXJlZCc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpdGVtLnRvZ2dsZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR0b2dnbGVySW5wdXQgPSBpdGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSAnY2hlY2tib3gnICYmICFpdGVtLnRvZ2dsZXIpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBpdGVtLm5hbWUucmVwbGFjZSgvW19cXFddKy9nLCBcIi1cIikuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhbWVsQ2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKGcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbiA9IGl0ZW0udmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblsncGFzc2VkJ10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblsnaW5wdXRDbGFzcyddID0gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiR2YWxpZGF0aW9uSXRlbXNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gXCI8dGV4dGFyZWEgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCIgXCIgKyByZXF1aXJlZCArIFwiJyB2YWx1ZT0nXCIgKyBpdGVtLnZhbHVlICsgXCInIGRhdGEtaGludD0nXCIgKyBpdGVtLmhpbnQgKyBcIicgZGF0YS1uYW1lPSdcIiArIGl0ZW0ubmFtZSArIFwiJyBcIiArIHJlcXVpcmVkICsgXCIgLz5cIiArIGl0ZW0udmFsdWUgKyBcIjwvdGV4dGFyZWE+XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9ICQucGFyc2VKU09OKGl0ZW0ub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gXCI8aW5wdXQgdHlwZT0nXCIgKyBpdGVtLnR5cGUgKyBcIicgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCIgXCIgKyByZXF1aXJlZCArIFwiJyB2YWx1ZT0nXCIgKyBpdGVtLnZhbHVlICsgXCInIGRhdGEtaGludD0nXCIgKyBpdGVtLmhpbnQgKyBcIicgZGF0YS1uYW1lPSdcIiArIGl0ZW0ubmFtZSArIFwiJyBcIiArIHJlcXVpcmVkICsgXCIgLz5cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZW5kZXJJbnB1dHMocmVxdWlyZWQsICRpbnB1dCwgaXRlbS52YWx1ZSwgaXRlbS50eXBlLCBpdGVtLm5hbWUsIGl0ZW0uaGludCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLiRjb250YWluZXIuaGFzQ2xhc3MoJ2hhcy1maWVsZHMnKSkge1xuICAgICAgICAgICAgZmllbGRzID0gbmV3IEZpZWxkcyh0aGlzLm9wdGlvbiwgdGhpcy4kZm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRtb2RhbElucHV0cyA9IHRoaXMuJGZvcm0uZmluZCgnLmJvZHknKS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuXG4gICAgICAgIGlmICh0aGlzLiR0b2dnbGVySW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVGaWVsZFRvZ2dsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNhdmVCdG4gPSBib2R5LmZpbmQoJy5zdWJtaXQnKTtcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnY2FuY2VsJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybSwgJ3N1Ym1pdCcsICdzYXZlJyk7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlRmllbGRUb2dnbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHRvZ2dsZXJcbiAgICAgICAgbGV0IGl0ZW1cblxuICAgICAgICAkdG9nZ2xlciA9IHRoaXMuJGZvcm0uZmluZCgnLnRvZ2dsZS1idG4nKVxuXG4gICAgICAgIGlmICh0aGlzLiR0b2dnbGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLiRmb3JtLmZpbmQoJ1tkYXRhLXNlbGVjdGlvbi10YXJnZXQ9XCInICsgdGhpcy4kdG9nZ2xlcklucHV0LnZhbHVlICsgJ1wiXScpXG4gICAgICAgICAgICBpdGVtLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUtZmllbGQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgkdG9nZ2xlclswXSkucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpXG4gICAgICAgICAgICB0YXJnZXQgPSAkKCR0b2dnbGVyWzBdKS5kYXRhKCdzZWxlY3Rpb24tdGFyZ2V0JylcbiAgICAgICAgICAgIGlucHV0ID0gJCgnaW5wdXRbbmFtZT1cIicgKyB0aGlzLiR0b2dnbGVySW5wdXQubmFtZSArICdcIl0nKVxuICAgICAgICAgICAgaW5wdXQudmFsKHRhcmdldClcbiAgICAgICAgfVxuXG4gICAgICAgICR0b2dnbGVyLm9uKCdjbGljaycsICQucHJveHkoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFxuICAgICAgICAgICAgbGV0IHRhcmdldFxuXG4gICAgICAgICAgICAvLyAkdG9nZ2xlci5yZW1vdmVDbGFzcygnYWN0aXZlLWZpZWxkJyk7XG4gICAgICAgICAgICAkdG9nZ2xlci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlLWZpZWxkJylcblxuICAgICAgICAgICAgJChlLnRhcmdldCkucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpXG4gICAgICAgICAgICAvLyAkKGUudGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlLWZpZWxkJyk7XG5cbiAgICAgICAgICAgIHRhcmdldCA9ICQoZS50YXJnZXQpLmRhdGEoJ3NlbGVjdGlvbi10YXJnZXQnKVxuICAgICAgICAgICAgaW5wdXQgPSAkKCdpbnB1dFtuYW1lPVwiJyArIHRoaXMuJHRvZ2dsZXJJbnB1dC5uYW1lICsgJ1wiXScpXG4gICAgICAgICAgICBpbnB1dC52YWwodGFyZ2V0KVxuICAgICAgICB9KSwgdGhpcykpXG5cbiAgICB9LFxuXG4gICAgcmVuZGVySW5wdXRzOiBmdW5jdGlvbihyZXF1aXJlZCwgZWwsIHZhbHVlLCB0eXBlLCBuYW1lLCBoaW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyICRpbnB1dCwgdG9nZ2xlckNsYXNzXG5cbiAgICAgICAgdG9nZ2xlckNsYXNzID0gdGhpcy5oYXNUb2dnbGVycyA/ICd0b2dnbGUtZmllbGQnIDogJydcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICAkaW5wdXQgPSAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGQgJyt0b2dnbGVyQ2xhc3MrJ1wiPicgKyBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JyArIGhpbnQgKyAnPC9kaXY+JyArIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNlbGVjdCBpbnB1dFwiPjxzZWxlY3QgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJyAnICsgcmVxdWlyZWQgKyAnXCIgZGF0YS1oaW50PVwiJyArIGhpbnQgKyAnXCIgZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCIgLz48L2Rpdj4nICsgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicpO1xuICAgICAgICAgICAgJC5lYWNoKGVsLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0LmZpbmQoJ3NlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uPicsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW0ubGFiZWxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5maW5kKCdzZWxlY3QnKS52YWwodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGlucHV0ID0gJChcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkICcrdG9nZ2xlckNsYXNzKydcIj4nICsgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPicgKyBoaW50ICsgJzwvZGl2PicgKyBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dFwiPicgKyBlbCArICc8L2Rpdj4nICsgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVG9nZ2xlcnMpIHtcbiAgICAgICAgICAgICRpbnB1dC5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cInRvZ2dsZS1idG5cIiBkYXRhLXNlbGVjdGlvbi10YXJnZXQ9XCInICsgaGludC50b0xvd2VyQ2FzZSgpICsgJ1wiPjwvZGl2PicpKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kZm9ybS5maW5kKCcuYm9keScpLmFwcGVuZCgkaW5wdXQpO1xuXG4gICAgICAgIC8vIGlmICh0eXBlID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy5pbml0UmVkYWN0b3IoZWwpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIGluaXRSZWRhY3RvcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICB2YXIgY2xhc3NOYW1lLCBlbDtcbiAgICAgICAgY2xhc3NOYW1lID0gJChpdGVtKVswXS5jbGFzc05hbWU7XG4gICAgICAgIGVsID0gdGhpcy4kZm9ybS5maW5kKFwiLlwiICsgY2xhc3NOYW1lKTtcbiAgICAgICAgZWwucmVkYWN0b3Ioe1xuICAgICAgICAgICAgbWF4SGVpZ2h0OiAxNjAsXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDE1MCxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnNDAwcHgnLFxuICAgICAgICAgICAgYnV0dG9uczogWydib2xkJywgJ2l0YWxpYycsICdsaW5rJywgJ2hvcml6b250YWxydWxlJ10sXG4gICAgICAgICAgICBwbHVnaW5zOiBbJ2ZvbnRmYW1pbHknLCAnZm9udHNpemUnLCAnYWxpZ25tZW50JywgJ2ZvbnRjb2xvciddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRyZWRhY3RvciA9IGVsLnJlZGFjdG9yKCdjb3JlLm9iamVjdCcpO1xuICAgIH0sXG5cbiAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uLiRlZGl0LmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ29wdGlvbi1lbmFibGVkJyk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi4kcmVzdWx0Q29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJHRvZ2dsZS5odG1sKCdFTkFCTEUnKTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU9wdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpc2FibGVPcHRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb24uJGVuYWJsZUNoZWNrYm94KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb24uJGVuYWJsZUNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbmNlbCgpO1xuICAgIH0sXG5cbiAgICBjbG9zZU1vZGFsOiBmdW5jdGlvbihldikge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgICBpZiAoZXYpIHtcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBHYXJuaXNoLkZYX0RVUkFUSU9OXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kc2hhZGUudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IEdhcm5pc2guRlhfRFVSQVRJT04sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICQucHJveHkodGhpcywgJ29uRmFkZU91dCcpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaGlkZU9uU2hhZGVDbGljaykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodGhpcy4kc2hhZGUsICdjbGljaycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKEdhcm5pc2guJHdpbiwgJ3Jlc2l6ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIEdhcm5pc2guTW9kYWwudmlzaWJsZU1vZGFsID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmhpZGVPbkVzYykge1xuICAgICAgICAgICAgR2FybmlzaC5lc2NNYW5hZ2VyLnVucmVnaXN0ZXIodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2hpZGUnKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5vbkhpZGUoKTtcbiAgICB9LFxuXG4gICAgcnVuVmFsaWRhdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy4kdmFsaWRhdGlvbkl0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5lYWNoKHRoaXMuJHZhbGlkYXRpb25JdGVtcywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dDtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHNlbGYuJGZvcm0uZmluZChcIi5cIiArIGl0ZW0udmFsaWRhdGlvbi5pbnB1dENsYXNzKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsKCkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbGlkYXRpb24ucGFzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnZhbGlkYXRpb24ucGFzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKGl0ZW0udmFsaWRhdGlvbi5lcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNhdmU6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLiRjb250YWluZXIuaGFzQ2xhc3MoJ3RhZ3MnKSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0Vycm9ycygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5lcnJvcnMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgJChpdGVtKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEdhcm5pc2guc2hha2UodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRXJyb3JzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5lcnJvckxlbmd0aCA9PT0gdGhpcy4kbW9kYWxJbnB1dHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNlbGYuZXJyb3JzLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGl0ZW0pLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbSkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEdhcm5pc2guc2hha2UodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjaGVja0Vycm9yczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5lcnJvckxlbmd0aCA9IDA7XG5cbiAgICAgICAgJC5lYWNoKHRoaXMuJG1vZGFsSW5wdXRzLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoJChpdGVtKS5oYXNDbGFzcygnZGF0YS1yZXF1aXJlZCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoaXRlbSkudmFsKCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JzW2ldID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvckxlbmd0aCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHVwZGF0ZU9wdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMub3B0aW9uLnVwZGF0ZUh0bWxGcm9tTW9kYWwoKTtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIHRoaXMuJGZvcm1bMF0ucmVzZXQoKTtcblxuICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKHRoaXMub3B0aW9uLiRkYXRhLnN1Y2Nlc3NNZXNzYWdlKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9tb2RhbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=