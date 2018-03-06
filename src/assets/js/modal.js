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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

var OptionModal;

window.OptionModal = Garnish.Modal.extend({
    option: null,
    $form: null,
    $modalInputs: null,
    $redactor: null,
    $validationItems: [],
    $togglerInput: null,
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
        var $toggler, item;
        $toggler = this.$form.find('.input-hint');

        if (this.$togglerInput.value) {
            item = this.$form.find('[data-selection-target="' + this.$togglerInput.value + '"]');
            item.addClass('active-field');
        }

        $toggler.on('click', $.proxy(function (e) {
            var input, target;
            $toggler.removeClass('active-field');
            $(e.target).addClass('active-field');
            target = $(e.target).data('selection-target');
            input = $('input[name="' + this.$togglerInput.name + '"]');

            return input.val(target);
        }, this));
    },

    renderInputs: function renderInputs(required, el, value, type, name, hint, className) {
        var $input;
        if (type === 'select') {
            $input = $('<div class="fb-field">' + '<div class="input-hint" data-selection-target="' + hint.toLowerCase() + '">' + hint + '</div>' + '<div class="select input"><select class="' + className + ' ' + required + '" data-hint="' + hint + '" data-name="' + name + '" /></div>' + '</div>');
            $.each(el, function (i, item) {
                $input.find('select').append($('<option>', {
                    value: item.value,
                    text: item.label
                }));
            });
            $input.find('select').val(value);
        } else {
            $input = $('<div class="fb-field">' + '<div class="input-hint" data-selection-target="' + hint.toLowerCase() + '">' + hint + '</div>' + '<div class="input">' + el + '</div>' + '</div>');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9zcmMvanMvbW9kYWwuanMiXSwibmFtZXMiOlsiT3B0aW9uTW9kYWwiLCJ3aW5kb3ciLCJHYXJuaXNoIiwiTW9kYWwiLCJleHRlbmQiLCJvcHRpb24iLCIkZm9ybSIsIiRtb2RhbElucHV0cyIsIiRyZWRhY3RvciIsIiR2YWxpZGF0aW9uSXRlbXMiLCIkdG9nZ2xlcklucHV0IiwiZXJyb3JzIiwiZXJyb3JMZW5ndGgiLCJpbml0IiwiYm9keSIsImZpZWxkcyIsInNlbGYiLCJiYXNlIiwiJCIsImFwcGVuZFRvIiwiJGJvZCIsInNldENvbnRhaW5lciIsIiRkYXRhIiwidGl0bGUiLCJpbnN0cnVjdGlvbnMiLCJDcmFmdCIsInQiLCJqb2luIiwiZWFjaCIsIiRpbnB1dHMiLCJpIiwiaXRlbSIsIiRpbnB1dCIsImNhbWVsQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwicmVxdWlyZWQiLCJ2YWxpZGF0aW9uIiwidG9nZ2xlciIsInR5cGUiLCJuYW1lIiwicmVwbGFjZSIsInNsaWNlIiwiZyIsInRvVXBwZXJDYXNlIiwidmFsdWUiLCJoaW50IiwicGFyc2VKU09OIiwib3B0aW9ucyIsInJlbmRlcklucHV0cyIsIiRjb250YWluZXIiLCJoYXNDbGFzcyIsIkZpZWxkcyIsImZpbmQiLCJhY3RpdmF0ZUZpZWxkVG9nZ2xlIiwic2hvdyIsIiRzYXZlQnRuIiwiJGNhbmNlbEJ0biIsImFkZExpc3RlbmVyIiwiJHRvZ2dsZXIiLCJhZGRDbGFzcyIsIm9uIiwicHJveHkiLCJlIiwiaW5wdXQiLCJ0YXJnZXQiLCJyZW1vdmVDbGFzcyIsImRhdGEiLCJ2YWwiLCJlbCIsInRvTG93ZXJDYXNlIiwiYXBwZW5kIiwidGV4dCIsImxhYmVsIiwiaW5pdFJlZGFjdG9yIiwicmVkYWN0b3IiLCJtYXhIZWlnaHQiLCJtaW5IZWlnaHQiLCJtYXhXaWR0aCIsImJ1dHRvbnMiLCJwbHVnaW5zIiwiY2FuY2VsIiwiZWRpdGluZyIsIiRlZGl0IiwiJHJlc3VsdENvbnRhaW5lciIsImh0bWwiLCIkdG9nZ2xlIiwiZGlzYWJsZU9wdGlvbiIsImNsb3NlTW9kYWwiLCIkZW5hYmxlQ2hlY2tib3giLCJwcm9wIiwiaGlkZSIsImV2IiwiZGlzYWJsZSIsInN0b3BQcm9wYWdhdGlvbiIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJGWF9EVVJBVElPTiIsIiRzaGFkZSIsImNvbXBsZXRlIiwic2V0dGluZ3MiLCJoaWRlT25TaGFkZUNsaWNrIiwicmVtb3ZlTGlzdGVuZXIiLCIkd2luIiwidmlzaWJsZSIsInZpc2libGVNb2RhbCIsImhpZGVPbkVzYyIsImVzY01hbmFnZXIiLCJ1bnJlZ2lzdGVyIiwidHJpZ2dlciIsIm9uSGlkZSIsInJ1blZhbGlkYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0Q2xhc3MiLCJtYXRjaCIsInBhc3NlZCIsImNwIiwiZGlzcGxheU5vdGljZSIsImVycm9yTWVzc2FnZSIsInNhdmUiLCJjaGVja0Vycm9ycyIsImxlbmd0aCIsInBhcmVudCIsInNoYWtlIiwidXBkYXRlT3B0aW9uIiwiaXMiLCJ1cGRhdGVIdG1sRnJvbU1vZGFsIiwicmVzZXQiLCJzdWNjZXNzTWVzc2FnZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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b0MsR0FBUixPQUFrQixFQUF0QixFQUEwQjtBQUN0Qm5ELHlCQUFLTCxNQUFMLENBQVltQixDQUFaLElBQWlCQyxJQUFqQjtBQUNBZix5QkFBS0osV0FBTCxJQUFvQixDQUFwQjtBQUNIO0FBQ0o7QUFDSixTQVBEO0FBUUgsS0FqUXFDOztBQW1RdEMrRyxrQkFBYyx3QkFBVztBQUNyQixhQUFLdEgsTUFBTCxDQUFZd0gsbUJBQVo7QUFDQSxhQUFLdEMsVUFBTDtBQUNBLGFBQUtqRixLQUFMLENBQVcsQ0FBWCxFQUFjd0gsS0FBZDs7QUFFQXJHLGNBQU0wRixFQUFOLENBQVNDLGFBQVQsQ0FBdUIsS0FBSy9HLE1BQUwsQ0FBWWlCLEtBQVosQ0FBa0J5RyxjQUF6QztBQUNIO0FBelFxQyxDQUFyQixDQUFyQixDIiwiZmlsZSI6Ii9zcmMvYXNzZXRidW5kbGVzL2Zvcm1zL2Rpc3QvanMvbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ2YXIgT3B0aW9uTW9kYWw7XG5cbndpbmRvdy5PcHRpb25Nb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICBvcHRpb246IG51bGwsXG4gICAgJGZvcm06IG51bGwsXG4gICAgJG1vZGFsSW5wdXRzOiBudWxsLFxuICAgICRyZWRhY3RvcjogbnVsbCxcbiAgICAkdmFsaWRhdGlvbkl0ZW1zOiBbXSxcbiAgICAkdG9nZ2xlcklucHV0OiBudWxsLFxuICAgIGVycm9yczogW10sXG4gICAgZXJyb3JMZW5ndGg6IDAsXG4gICAgaW5pdDogZnVuY3Rpb24ob3B0aW9uKSB7XG4gICAgICAgIHZhciBib2R5LCBmaWVsZHMsIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm9wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgdGhpcy5iYXNlKCk7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbFwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZCk7XG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm0pO1xuICAgICAgICBcbiAgICAgICAgYm9keSA9ICQoWyc8aGVhZGVyPicsICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jywgb3B0aW9uLiRkYXRhLnRpdGxlLCAnPC9zcGFuPicsICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+Jywgb3B0aW9uLiRkYXRhLmluc3RydWN0aW9ucywgJzwvZGl2PicsICc8L2hlYWRlcj4nLCAnPGRpdiBjbGFzcz1cImJvZHlcIj48L2Rpdj4nLCAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsICc8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCInICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpICsgJ1wiPicsICc8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCInICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1NhdmUnKSArICdcIj4nLCAnPC9kaXY+JywgJzwvZm9vdGVyPiddLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtKTtcbiAgICAgICAgXG4gICAgICAgICQuZWFjaChvcHRpb24uJGlucHV0cywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgdmFyICRpbnB1dCwgY2FtZWxDbGFzc05hbWUsIGNsYXNzTmFtZSwgcmVxdWlyZWQsIHZhbGlkYXRpb247XG4gICAgICAgICAgICByZXF1aXJlZCA9IGl0ZW0ucmVxdWlyZWQgPyAnZGF0YS1yZXF1aXJlZCcgOiAnZGF0YS1ub3QtcmVxdWlyZWQnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaXRlbS50b2dnbGVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kdG9nZ2xlcklucHV0ID0gaXRlbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSAhPT0gJ2NoZWNrYm94JyAmJiAhaXRlbS50b2dnbGVyKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gaXRlbS5uYW1lLnJlcGxhY2UoL1tfXFxXXSsvZywgXCItXCIpLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYW1lbENsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbihnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24gPSBpdGVtLnZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25bJ3Bhc3NlZCddID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25bJ2lucHV0Q2xhc3MnXSA9IGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kdmFsaWRhdGlvbkl0ZW1zW2ldID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9IFwiPHRleHRhcmVhIGNsYXNzPSdcIiArIGNsYXNzTmFtZSArIFwiIFwiICsgcmVxdWlyZWQgKyBcIicgdmFsdWU9J1wiICsgaXRlbS52YWx1ZSArIFwiJyBkYXRhLWhpbnQ9J1wiICsgaXRlbS5oaW50ICsgXCInIGRhdGEtbmFtZT0nXCIgKyBpdGVtLm5hbWUgKyBcIicgXCIgKyByZXF1aXJlZCArIFwiIC8+XCIgKyBpdGVtLnZhbHVlICsgXCI8L3RleHRhcmVhPlwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSAkLnBhcnNlSlNPTihpdGVtLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9IFwiPGlucHV0IHR5cGU9J1wiICsgaXRlbS50eXBlICsgXCInIGNsYXNzPSdcIiArIGNsYXNzTmFtZSArIFwiIFwiICsgcmVxdWlyZWQgKyBcIicgdmFsdWU9J1wiICsgaXRlbS52YWx1ZSArIFwiJyBkYXRhLWhpbnQ9J1wiICsgaXRlbS5oaW50ICsgXCInIGRhdGEtbmFtZT0nXCIgKyBpdGVtLm5hbWUgKyBcIicgXCIgKyByZXF1aXJlZCArIFwiIC8+XCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVySW5wdXRzKHJlcXVpcmVkLCAkaW5wdXQsIGl0ZW0udmFsdWUsIGl0ZW0udHlwZSwgaXRlbS5uYW1lLCBpdGVtLmhpbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbi4kY29udGFpbmVyLmhhc0NsYXNzKCdoYXMtZmllbGRzJykpIHtcbiAgICAgICAgICAgIGZpZWxkcyA9IG5ldyBGaWVsZHModGhpcy5vcHRpb24sIHRoaXMuJGZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kbW9kYWxJbnB1dHMgPSB0aGlzLiRmb3JtLmZpbmQoJy5ib2R5JykuZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcblxuICAgICAgICBpZiAodGhpcy4kdG9nZ2xlcklucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlRmllbGRUb2dnbGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLiRzYXZlQnRuID0gYm9keS5maW5kKCcuc3VibWl0Jyk7XG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2NhbmNlbCcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm0sICdzdWJtaXQnLCAnc2F2ZScpO1xuICAgIH0sXG5cbiAgICBhY3RpdmF0ZUZpZWxkVG9nZ2xlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICR0b2dnbGVyLCBpdGVtO1xuICAgICAgICAkdG9nZ2xlciA9IHRoaXMuJGZvcm0uZmluZCgnLmlucHV0LWhpbnQnKTtcblxuICAgICAgICBpZiAodGhpcy4kdG9nZ2xlcklucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy4kZm9ybS5maW5kKCdbZGF0YS1zZWxlY3Rpb24tdGFyZ2V0PVwiJyArIHRoaXMuJHRvZ2dsZXJJbnB1dC52YWx1ZSArICdcIl0nKTtcbiAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZS1maWVsZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHRvZ2dsZXIub24oJ2NsaWNrJywgJC5wcm94eSgoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGlucHV0LCB0YXJnZXQ7XG4gICAgICAgICAgICAkdG9nZ2xlci5yZW1vdmVDbGFzcygnYWN0aXZlLWZpZWxkJyk7XG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlLWZpZWxkJyk7XG4gICAgICAgICAgICB0YXJnZXQgPSAkKGUudGFyZ2V0KS5kYXRhKCdzZWxlY3Rpb24tdGFyZ2V0Jyk7XG4gICAgICAgICAgICBpbnB1dCA9ICQoJ2lucHV0W25hbWU9XCInICsgdGhpcy4kdG9nZ2xlcklucHV0Lm5hbWUgKyAnXCJdJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWwodGFyZ2V0KTtcbiAgICAgICAgfSksIHRoaXMpKTtcblxuICAgIH0sXG5cbiAgICByZW5kZXJJbnB1dHM6IGZ1bmN0aW9uKHJlcXVpcmVkLCBlbCwgdmFsdWUsIHR5cGUsIG5hbWUsIGhpbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgJGlucHV0O1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICAgICRpbnB1dCA9ICQoJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicgKyAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIiBkYXRhLXNlbGVjdGlvbi10YXJnZXQ9XCInICsgaGludC50b0xvd2VyQ2FzZSgpICsgJ1wiPicgKyBoaW50ICsgJzwvZGl2PicgKyAnPGRpdiBjbGFzcz1cInNlbGVjdCBpbnB1dFwiPjxzZWxlY3QgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJyAnICsgcmVxdWlyZWQgKyAnXCIgZGF0YS1oaW50PVwiJyArIGhpbnQgKyAnXCIgZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCIgLz48L2Rpdj4nICsgJzwvZGl2PicpO1xuICAgICAgICAgICAgJC5lYWNoKGVsLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0LmZpbmQoJ3NlbGVjdCcpLmFwcGVuZCgkKCc8b3B0aW9uPicsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGl0ZW0ubGFiZWxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5maW5kKCdzZWxlY3QnKS52YWwodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGlucHV0ID0gJCgnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JyArICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiIGRhdGEtc2VsZWN0aW9uLXRhcmdldD1cIicgKyBoaW50LnRvTG93ZXJDYXNlKCkgKyAnXCI+JyArIGhpbnQgKyAnPC9kaXY+JyArICc8ZGl2IGNsYXNzPVwiaW5wdXRcIj4nICsgZWwgKyAnPC9kaXY+JyArICc8L2Rpdj4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGZvcm0uZmluZCgnLmJvZHknKS5hcHBlbmQoJGlucHV0KTtcblxuICAgICAgICAvLyBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuaW5pdFJlZGFjdG9yKGVsKTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICBpbml0UmVkYWN0b3I6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSwgZWw7XG4gICAgICAgIGNsYXNzTmFtZSA9ICQoaXRlbSlbMF0uY2xhc3NOYW1lO1xuICAgICAgICBlbCA9IHRoaXMuJGZvcm0uZmluZChcIi5cIiArIGNsYXNzTmFtZSk7XG4gICAgICAgIGVsLnJlZGFjdG9yKHtcbiAgICAgICAgICAgIG1heEhlaWdodDogMTYwLFxuICAgICAgICAgICAgbWluSGVpZ2h0OiAxNTAsXG4gICAgICAgICAgICBtYXhXaWR0aDogJzQwMHB4JyxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFsnYm9sZCcsICdpdGFsaWMnLCAnbGluaycsICdob3Jpem9udGFscnVsZSddLFxuICAgICAgICAgICAgcGx1Z2luczogWydmb250ZmFtaWx5JywgJ2ZvbnRzaXplJywgJ2FsaWdubWVudCcsICdmb250Y29sb3InXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy4kcmVkYWN0b3IgPSBlbC5yZWRhY3RvcignY29yZS5vYmplY3QnKTtcbiAgICB9LFxuXG4gICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbi5lZGl0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi4kZWRpdC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbi4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdvcHRpb24tZW5hYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb24uJHJlc3VsdENvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uLiR0b2dnbGUuaHRtbCgnRU5BQkxFJyk7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVPcHRpb24oKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaXNhYmxlT3B0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLiRlbmFibGVDaGVja2JveCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uLiRlbmFibGVDaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5jZWwoKTtcbiAgICB9LFxuXG4gICAgY2xvc2VNb2RhbDogZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgaWYgKGV2KSB7XG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRjb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogR2FybmlzaC5GWF9EVVJBVElPTlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJHNoYWRlLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBHYXJuaXNoLkZYX0RVUkFUSU9OLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAkLnByb3h5KHRoaXMsICdvbkZhZGVPdXQnKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmhpZGVPblNoYWRlQ2xpY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHRoaXMuJHNoYWRlLCAnY2xpY2snKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihHYXJuaXNoLiR3aW4sICdyZXNpemUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBHYXJuaXNoLk1vZGFsLnZpc2libGVNb2RhbCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5oaWRlT25Fc2MpIHtcbiAgICAgICAgICAgIEdhcm5pc2guZXNjTWFuYWdlci51bnJlZ2lzdGVyKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdoaWRlJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Mub25IaWRlKCk7XG4gICAgfSxcblxuICAgIHJ1blZhbGlkYXRpb246IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuJHZhbGlkYXRpb25JdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuICQuZWFjaCh0aGlzLiR2YWxpZGF0aW9uSXRlbXMsIGZ1bmN0aW9uKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQ7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBzZWxmLiRmb3JtLmZpbmQoXCIuXCIgKyBpdGVtLnZhbGlkYXRpb24uaW5wdXRDbGFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnZhbCgpLm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWxpZGF0aW9uLnBhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS52YWxpZGF0aW9uLnBhc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQ3JhZnQuY3AuZGlzcGxheU5vdGljZShpdGVtLnZhbGlkYXRpb24uZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNhdmUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzYXZlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbi4kY29udGFpbmVyLmhhc0NsYXNzKCd0YWdzJykpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tFcnJvcnMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNlbGYuZXJyb3JzLCBmdW5jdGlvbihpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICQoaXRlbSkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBHYXJuaXNoLnNoYWtlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja0Vycm9ycygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JMZW5ndGggPT09IHRoaXMuJG1vZGFsSW5wdXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZWxmLmVycm9ycywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJChpdGVtKS5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbSkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBHYXJuaXNoLnNoYWtlKHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlT3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlY2tFcnJvcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuZXJyb3JMZW5ndGggPSAwO1xuXG4gICAgICAgICQuZWFjaCh0aGlzLiRtb2RhbElucHV0cywgZnVuY3Rpb24oaSwgaXRlbSkge1xuICAgICAgICAgICAgaWYgKCQoaXRlbSkuaGFzQ2xhc3MoJ2RhdGEtcmVxdWlyZWQnKSkge1xuICAgICAgICAgICAgICAgIGlmICgkKGl0ZW0pLnZhbCgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVycm9yc1tpXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JMZW5ndGggKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICB1cGRhdGVPcHRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm9wdGlvbi51cGRhdGVIdG1sRnJvbU1vZGFsKCk7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICB0aGlzLiRmb3JtWzBdLnJlc2V0KCk7XG5cbiAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZSh0aGlzLm9wdGlvbi4kZGF0YS5zdWNjZXNzTWVzc2FnZSk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9zcmMvanMvbW9kYWwuanMiXSwic291cmNlUm9vdCI6IiJ9