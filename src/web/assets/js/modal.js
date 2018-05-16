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

            $toggler.parent().removeClass('active-field');

            this.disableField($(e.target).parent().parent().find('input'));
            this.disableField($(e.target).parent().parent().find('select'));

            $(e.target).parent().addClass('active-field');

            this.enableField($(e.target).parent().find('input'));
            this.enableField($(e.target).parent().find('select'));

            target = $(e.target).data('selection-target');
            input = $('input[name="' + this.$togglerInput.name + '"]');
            input.val(target);
        }, this));
    },

    disableField: function disableField(target) {
        target.prop('disabled', true);
        target.val('');
    },

    enableField: function enableField(target) {
        target.prop('disabled', false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjRhYjBiMzJlZmZlYTlmYjdhZTYiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvbW9kYWwuanMiXSwibmFtZXMiOlsiaXNUb2dnbGVyIiwiaXRlbSIsImNvbnNvbGUiLCJsb2ciLCJPcHRpb25Nb2RhbCIsIndpbmRvdyIsIkdhcm5pc2giLCJNb2RhbCIsImV4dGVuZCIsIm9wdGlvbiIsIiRmb3JtIiwiJG1vZGFsSW5wdXRzIiwiJHJlZGFjdG9yIiwiJHZhbGlkYXRpb25JdGVtcyIsIiR0b2dnbGVySW5wdXQiLCJoYXNUb2dnbGVycyIsImVycm9ycyIsImVycm9yTGVuZ3RoIiwiaW5pdCIsImJvZHkiLCJmaWVsZHMiLCJzZWxmIiwiYmFzZSIsIiQiLCJhcHBlbmRUbyIsIiRib2QiLCJzZXRDb250YWluZXIiLCIkZGF0YSIsInRpdGxlIiwiaW5zdHJ1Y3Rpb25zIiwiQ3JhZnQiLCJ0Iiwiam9pbiIsInRvZ2dsZXIiLCIkaW5wdXRzIiwic29tZSIsImVsZW0iLCJlYWNoIiwiaSIsIiRpbnB1dCIsImNhbWVsQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwicmVxdWlyZWQiLCJ2YWxpZGF0aW9uIiwidHlwZSIsIm5hbWUiLCJyZXBsYWNlIiwic2xpY2UiLCJnIiwidG9VcHBlckNhc2UiLCJ2YWx1ZSIsImhpbnQiLCJwYXJzZUpTT04iLCJvcHRpb25zIiwicmVuZGVySW5wdXRzIiwiJGNvbnRhaW5lciIsImhhc0NsYXNzIiwiRmllbGRzIiwiZmluZCIsImFjdGl2YXRlRmllbGRUb2dnbGUiLCJzaG93IiwiJHNhdmVCdG4iLCIkY2FuY2VsQnRuIiwiYWRkTGlzdGVuZXIiLCIkdG9nZ2xlciIsInBhcmVudCIsImFkZENsYXNzIiwidGFyZ2V0IiwiZGF0YSIsImlucHV0IiwidmFsIiwib24iLCJwcm94eSIsImUiLCJyZW1vdmVDbGFzcyIsImRpc2FibGVGaWVsZCIsImVuYWJsZUZpZWxkIiwicHJvcCIsImVsIiwidG9nZ2xlckNsYXNzIiwiYXBwZW5kIiwidGV4dCIsImxhYmVsIiwidG9Mb3dlckNhc2UiLCJpbml0UmVkYWN0b3IiLCJyZWRhY3RvciIsIm1heEhlaWdodCIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwiYnV0dG9ucyIsInBsdWdpbnMiLCJjYW5jZWwiLCJlZGl0aW5nIiwiJGVkaXQiLCIkcmVzdWx0Q29udGFpbmVyIiwiaHRtbCIsIiR0b2dnbGUiLCJkaXNhYmxlT3B0aW9uIiwiY2xvc2VNb2RhbCIsIiRlbmFibGVDaGVja2JveCIsImhpZGUiLCJldiIsImRpc2FibGUiLCJzdG9wUHJvcGFnYXRpb24iLCJ2ZWxvY2l0eSIsImR1cmF0aW9uIiwiRlhfRFVSQVRJT04iLCIkc2hhZGUiLCJjb21wbGV0ZSIsInNldHRpbmdzIiwiaGlkZU9uU2hhZGVDbGljayIsInJlbW92ZUxpc3RlbmVyIiwiJHdpbiIsInZpc2libGUiLCJ2aXNpYmxlTW9kYWwiLCJoaWRlT25Fc2MiLCJlc2NNYW5hZ2VyIiwidW5yZWdpc3RlciIsInRyaWdnZXIiLCJvbkhpZGUiLCJydW5WYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJpbnB1dENsYXNzIiwibWF0Y2giLCJwYXNzZWQiLCJjcCIsImRpc3BsYXlOb3RpY2UiLCJlcnJvck1lc3NhZ2UiLCJzYXZlIiwiY2hlY2tFcnJvcnMiLCJsZW5ndGgiLCJzaGFrZSIsInVwZGF0ZU9wdGlvbiIsImlzIiwidXBkYXRlSHRtbEZyb21Nb2RhbCIsInJlc2V0Iiwic3VjY2Vzc01lc3NhZ2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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TUFFTztBQUNIM0MsMEJBQUV0QixJQUFGLEVBQVFnRSxNQUFSLEdBQWlCQSxNQUFqQixHQUEwQkMsUUFBMUIsQ0FBbUMsT0FBbkM7QUFDSDtBQUNKLGlCQU5EOztBQVFBNUQsd0JBQVE2SCxLQUFSLENBQWMsS0FBSzVFLFVBQW5CO0FBQ0gsYUFWRCxNQVVPO0FBQ0gscUJBQUs2RSxZQUFMO0FBQ0g7QUFDSjtBQUNKLEtBMVNxQzs7QUE0U3RDSCxpQkFBYSx1QkFBVztBQUNwQixZQUFJNUcsSUFBSjtBQUNBQSxlQUFPLElBQVA7QUFDQSxhQUFLTCxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7O0FBRUFNLFVBQUVjLElBQUYsQ0FBTyxLQUFLMUIsWUFBWixFQUEwQixVQUFTMkIsQ0FBVCxFQUFZckMsSUFBWixFQUFrQjtBQUN4QyxnQkFBSXNCLEVBQUV0QixJQUFGLEVBQVF1RCxRQUFSLENBQWlCLGVBQWpCLENBQUosRUFBdUM7QUFDbkMsb0JBQUlqQyxFQUFFdEIsSUFBRixFQUFRcUUsR0FBUixPQUFrQixFQUF0QixFQUEwQjtBQUN0QmpELHlCQUFLTCxNQUFMLENBQVlzQixDQUFaLElBQWlCckMsSUFBakI7QUFDQW9CLHlCQUFLSixXQUFMLElBQW9CLENBQXBCO0FBQ0g7QUFDSjtBQUNKLFNBUEQ7QUFRSCxLQTFUcUM7O0FBNFR0Q21ILGtCQUFjLHdCQUFXO0FBQ3JCLGFBQUszSCxNQUFMLENBQVk2SCxtQkFBWjtBQUNBLGFBQUtwQyxVQUFMO0FBQ0EsYUFBS3hGLEtBQUwsQ0FBVyxDQUFYLEVBQWM2SCxLQUFkOztBQUVBekcsY0FBTStGLEVBQU4sQ0FBU0MsYUFBVCxDQUF1QixLQUFLckgsTUFBTCxDQUFZa0IsS0FBWixDQUFrQjZHLGNBQXpDO0FBQ0g7QUFsVXFDLENBQXJCLENBQXJCLEMiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjRhYjBiMzJlZmZlYTlmYjdhZTYiLCJmdW5jdGlvbiBpc1RvZ2dsZXIoaXRlbSkge1xuICAgIGNvbnNvbGUubG9nKGl0ZW0pXG59XG5cbnZhciBPcHRpb25Nb2RhbDtcblxud2luZG93Lk9wdGlvbk1vZGFsID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgIG9wdGlvbjogbnVsbCxcbiAgICAkZm9ybTogbnVsbCxcbiAgICAkbW9kYWxJbnB1dHM6IG51bGwsXG4gICAgJHJlZGFjdG9yOiBudWxsLFxuICAgICR2YWxpZGF0aW9uSXRlbXM6IFtdLFxuICAgIFxuICAgICR0b2dnbGVySW5wdXQ6IG51bGwsXG4gICAgaGFzVG9nZ2xlcnM6IGZhbHNlLFxuXG4gICAgZXJyb3JzOiBbXSxcbiAgICBlcnJvckxlbmd0aDogMCxcblxuICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbikge1xuICAgICAgICB2YXIgYm9keSwgZmllbGRzLCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5vcHRpb24gPSBvcHRpb247XG4gICAgICAgIHRoaXMuYmFzZSgpO1xuICAgICAgICB0aGlzLiRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKTtcbiAgICAgICAgXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jywgb3B0aW9uLiRkYXRhLnRpdGxlLCAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+Jywgb3B0aW9uLiRkYXRhLmluc3RydWN0aW9ucywgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvaGVhZGVyPicsIFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJib2R5XCI+PC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKSArICdcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpICsgJ1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Zvb3Rlcj4nXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybSk7XG4gICAgICAgIFxuICAgICAgICB0b2dnbGVyID0gb3B0aW9uLiRpbnB1dHMuc29tZShmdW5jdGlvbihlbGVtKSB7IHJldHVybiBlbGVtLnRvZ2dsZXIgfSApXG4gICAgICAgIHRoaXMuaGFzVG9nZ2xlcnMgPSB0b2dnbGVyXG5cbiAgICAgICAgJC5lYWNoKG9wdGlvbi4kaW5wdXRzLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIgJGlucHV0LCBjYW1lbENsYXNzTmFtZSwgY2xhc3NOYW1lLCByZXF1aXJlZCwgdmFsaWRhdGlvbjtcbiAgICAgICAgICAgIHJlcXVpcmVkID0gaXRlbS5yZXF1aXJlZCA/ICdkYXRhLXJlcXVpcmVkJyA6ICdkYXRhLW5vdC1yZXF1aXJlZCc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpdGVtLnRvZ2dsZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR0b2dnbGVySW5wdXQgPSBpdGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSAnY2hlY2tib3gnICYmICFpdGVtLnRvZ2dsZXIpIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBpdGVtLm5hbWUucmVwbGFjZSgvW19cXFddKy9nLCBcIi1cIikuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhbWVsQ2xhc3NOYW1lID0gY2xhc3NOYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKGcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbiA9IGl0ZW0udmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblsncGFzc2VkJ10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvblsnaW5wdXRDbGFzcyddID0gY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiR2YWxpZGF0aW9uSXRlbXNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gXCI8dGV4dGFyZWEgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCIgXCIgKyByZXF1aXJlZCArIFwiJyB2YWx1ZT0nXCIgKyBpdGVtLnZhbHVlICsgXCInIGRhdGEtaGludD0nXCIgKyBpdGVtLmhpbnQgKyBcIicgZGF0YS1uYW1lPSdcIiArIGl0ZW0ubmFtZSArIFwiJyBcIiArIHJlcXVpcmVkICsgXCIgLz5cIiArIGl0ZW0udmFsdWUgKyBcIjwvdGV4dGFyZWE+XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9ICQucGFyc2VKU09OKGl0ZW0ub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gXCI8aW5wdXQgdHlwZT0nXCIgKyBpdGVtLnR5cGUgKyBcIicgY2xhc3M9J1wiICsgY2xhc3NOYW1lICsgXCIgXCIgKyByZXF1aXJlZCArIFwiJyB2YWx1ZT0nXCIgKyBpdGVtLnZhbHVlICsgXCInIGRhdGEtaGludD0nXCIgKyBpdGVtLmhpbnQgKyBcIicgZGF0YS1uYW1lPSdcIiArIGl0ZW0ubmFtZSArIFwiJyBcIiArIHJlcXVpcmVkICsgXCIgLz5cIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZW5kZXJJbnB1dHMocmVxdWlyZWQsICRpbnB1dCwgaXRlbS52YWx1ZSwgaXRlbS50eXBlLCBpdGVtLm5hbWUsIGl0ZW0uaGludCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLiRjb250YWluZXIuaGFzQ2xhc3MoJ2hhcy1maWVsZHMnKSkge1xuICAgICAgICAgICAgZmllbGRzID0gbmV3IEZpZWxkcyh0aGlzLm9wdGlvbiwgdGhpcy4kZm9ybSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRtb2RhbElucHV0cyA9IHRoaXMuJGZvcm0uZmluZCgnLmJvZHknKS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuXG4gICAgICAgIGlmICh0aGlzLiR0b2dnbGVySW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVGaWVsZFRvZ2dsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNhdmVCdG4gPSBib2R5LmZpbmQoJy5zdWJtaXQnKTtcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnY2FuY2VsJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybSwgJ3N1Ym1pdCcsICdzYXZlJyk7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlRmllbGRUb2dnbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgJHRvZ2dsZXJcbiAgICAgICAgbGV0IGl0ZW1cblxuICAgICAgICAkdG9nZ2xlciA9IHRoaXMuJGZvcm0uZmluZCgnLnRvZ2dsZS1idG4nKVxuXG4gICAgICAgIGlmICh0aGlzLiR0b2dnbGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLiRmb3JtLmZpbmQoJ1tkYXRhLXNlbGVjdGlvbi10YXJnZXQ9XCInICsgdGhpcy4kdG9nZ2xlcklucHV0LnZhbHVlICsgJ1wiXScpXG4gICAgICAgICAgICBpdGVtLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUtZmllbGQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgkdG9nZ2xlclswXSkucGFyZW50KCkuYWRkQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpXG4gICAgICAgICAgICB0YXJnZXQgPSAkKCR0b2dnbGVyWzBdKS5kYXRhKCdzZWxlY3Rpb24tdGFyZ2V0JylcbiAgICAgICAgICAgIGlucHV0ID0gJCgnaW5wdXRbbmFtZT1cIicgKyB0aGlzLiR0b2dnbGVySW5wdXQubmFtZSArICdcIl0nKVxuICAgICAgICAgICAgaW5wdXQudmFsKHRhcmdldClcbiAgICAgICAgfVxuXG4gICAgICAgICR0b2dnbGVyLm9uKCdjbGljaycsICQucHJveHkoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBpbnB1dFxuICAgICAgICAgICAgbGV0IHRhcmdldFxuXG4gICAgICAgICAgICAkdG9nZ2xlci5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYWN0aXZlLWZpZWxkJylcblxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlRmllbGQoJChlLnRhcmdldCkucGFyZW50KCkucGFyZW50KCkuZmluZCgnaW5wdXQnKSlcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUZpZWxkKCQoZS50YXJnZXQpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ3NlbGVjdCcpKVxuXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlLWZpZWxkJylcblxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZCgkKGUudGFyZ2V0KS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpKVxuICAgICAgICAgICAgdGhpcy5lbmFibGVGaWVsZCgkKGUudGFyZ2V0KS5wYXJlbnQoKS5maW5kKCdzZWxlY3QnKSlcblxuICAgICAgICAgICAgdGFyZ2V0ID0gJChlLnRhcmdldCkuZGF0YSgnc2VsZWN0aW9uLXRhcmdldCcpXG4gICAgICAgICAgICBpbnB1dCA9ICQoJ2lucHV0W25hbWU9XCInICsgdGhpcy4kdG9nZ2xlcklucHV0Lm5hbWUgKyAnXCJdJylcbiAgICAgICAgICAgIGlucHV0LnZhbCh0YXJnZXQpXG4gICAgICAgIH0pLCB0aGlzKSlcblxuICAgIH0sXG5cbiAgICBkaXNhYmxlRmllbGQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxuICAgICAgICB0YXJnZXQudmFsKCcnKVxuICAgIH0sXG5cbiAgICBlbmFibGVGaWVsZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKVxuICAgIH0sXG5cbiAgICByZW5kZXJJbnB1dHM6IGZ1bmN0aW9uKHJlcXVpcmVkLCBlbCwgdmFsdWUsIHR5cGUsIG5hbWUsIGhpbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgJGlucHV0LCB0b2dnbGVyQ2xhc3NcblxuICAgICAgICB0b2dnbGVyQ2xhc3MgPSB0aGlzLmhhc1RvZ2dsZXJzID8gJ3RvZ2dsZS1maWVsZCcgOiAnJ1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgICRpbnB1dCA9ICQoXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZCAnK3RvZ2dsZXJDbGFzcysnXCI+JyArIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4nICsgaGludCArICc8L2Rpdj4nICsgXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2VsZWN0IGlucHV0XCI+PHNlbGVjdCBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnICcgKyByZXF1aXJlZCArICdcIiBkYXRhLWhpbnQ9XCInICsgaGludCArICdcIiBkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIiAvPjwvZGl2PicgKyBcbiAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XG4gICAgICAgICAgICAkLmVhY2goZWwsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAkaW5wdXQuZmluZCgnc2VsZWN0JykuYXBwZW5kKCQoJzxvcHRpb24+Jywge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaXRlbS5sYWJlbFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LmZpbmQoJ3NlbGVjdCcpLnZhbCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkaW5wdXQgPSAkKFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGQgJyt0b2dnbGVyQ2xhc3MrJ1wiPicgKyBcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JyArIGhpbnQgKyAnPC9kaXY+JyArIFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0XCI+JyArIGVsICsgJzwvZGl2PicgKyBcbiAgICAgICAgICAgICAgICAnPC9kaXY+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oYXNUb2dnbGVycykge1xuICAgICAgICAgICAgJGlucHV0LmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwidG9nZ2xlLWJ0blwiIGRhdGEtc2VsZWN0aW9uLXRhcmdldD1cIicgKyBoaW50LnRvTG93ZXJDYXNlKCkgKyAnXCI+PC9kaXY+JykpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRmb3JtLmZpbmQoJy5ib2R5JykuYXBwZW5kKCRpbnB1dCk7XG5cbiAgICAgICAgLy8gaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLmluaXRSZWRhY3RvcihlbCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgaW5pdFJlZGFjdG9yOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUsIGVsO1xuICAgICAgICBjbGFzc05hbWUgPSAkKGl0ZW0pWzBdLmNsYXNzTmFtZTtcbiAgICAgICAgZWwgPSB0aGlzLiRmb3JtLmZpbmQoXCIuXCIgKyBjbGFzc05hbWUpO1xuICAgICAgICBlbC5yZWRhY3Rvcih7XG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDE2MCxcbiAgICAgICAgICAgIG1pbkhlaWdodDogMTUwLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICc0MDBweCcsXG4gICAgICAgICAgICBidXR0b25zOiBbJ2JvbGQnLCAnaXRhbGljJywgJ2xpbmsnLCAnaG9yaXpvbnRhbHJ1bGUnXSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFsnZm9udGZhbWlseScsICdmb250c2l6ZScsICdhbGlnbm1lbnQnLCAnZm9udGNvbG9yJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlZGFjdG9yID0gZWwucmVkYWN0b3IoJ2NvcmUub2JqZWN0Jyk7XG4gICAgfSxcblxuICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb24uZWRpdGluZykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJGVkaXQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnb3B0aW9uLWVuYWJsZWQnKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uLiRyZXN1bHRDb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi4kdG9nZ2xlLmh0bWwoJ0VOQUJMRScpO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlT3B0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzYWJsZU9wdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbi4kZW5hYmxlQ2hlY2tib3gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbi4kZW5hYmxlQ2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsKCk7XG4gICAgfSxcblxuICAgIGNsb3NlTW9kYWw6IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgIGlmIChldikge1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IEdhcm5pc2guRlhfRFVSQVRJT05cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRzaGFkZS52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogR2FybmlzaC5GWF9EVVJBVElPTixcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogJC5wcm94eSh0aGlzLCAnb25GYWRlT3V0JylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5oaWRlT25TaGFkZUNsaWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0aGlzLiRzaGFkZSwgJ2NsaWNrJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoR2FybmlzaC4kd2luLCAncmVzaXplJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgR2FybmlzaC5Nb2RhbC52aXNpYmxlTW9kYWwgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaGlkZU9uRXNjKSB7XG4gICAgICAgICAgICBHYXJuaXNoLmVzY01hbmFnZXIudW5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcignaGlkZScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLm9uSGlkZSgpO1xuICAgIH0sXG5cbiAgICBydW5WYWxpZGF0aW9uOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLiR2YWxpZGF0aW9uSXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiAkLmVhY2godGhpcy4kdmFsaWRhdGlvbkl0ZW1zLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0O1xuICAgICAgICAgICAgICAgIGlucHV0ID0gc2VsZi4kZm9ybS5maW5kKFwiLlwiICsgaXRlbS52YWxpZGF0aW9uLmlucHV0Q2xhc3MpO1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWwoKS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsaWRhdGlvbi5wYXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsaWRhdGlvbi5wYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoaXRlbS52YWxpZGF0aW9uLmVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYXZlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2F2ZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy5vcHRpb24uJGNvbnRhaW5lci5oYXNDbGFzcygndGFncycpKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrRXJyb3JzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZWxmLmVycm9ycywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgR2FybmlzaC5zaGFrZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51cGRhdGVPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tFcnJvcnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVycm9yTGVuZ3RoID09PSB0aGlzLiRtb2RhbElucHV0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goc2VsZi5lcnJvcnMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoaXRlbSkuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgR2FybmlzaC5zaGFrZSh0aGlzLiRjb250YWluZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNoZWNrRXJyb3JzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgICB0aGlzLmVycm9yTGVuZ3RoID0gMDtcblxuICAgICAgICAkLmVhY2godGhpcy4kbW9kYWxJbnB1dHMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICgkKGl0ZW0pLmhhc0NsYXNzKCdkYXRhLXJlcXVpcmVkJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChpdGVtKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lcnJvcnNbaV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yTGVuZ3RoICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlT3B0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcHRpb24udXBkYXRlSHRtbEZyb21Nb2RhbCgpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgdGhpcy4kZm9ybVswXS5yZXNldCgpO1xuXG4gICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UodGhpcy5vcHRpb24uJGRhdGEuc3VjY2Vzc01lc3NhZ2UpO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL21vZGFsLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==