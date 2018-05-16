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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ({

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var Option = void 0;

window.Option = Garnish.Base.extend({
    $container: null,
    $resultWrapper: null,
    $resultContainer: null,
    $toggle: null,
    $edit: null,
    $data: null,
    $inputs: null,
    enabled: false,
    editing: false,
    hasModal: false,
    hasTags: false,
    isTemplate: false,
    $enableCheckbox: null,
    $fields: null,

    init: function init(container) {
        var self = void 0;
        self = this;

        this.$container = $(container);
        this.$resultWrapper = this.$container.find('.option-wrapper');
        this.$resultContainer = this.$container.find('.option-result');
        this.$toggle = this.$container.find('.option-toggle');
        this.$edit = this.$container.find('.option-edit');

        if (this.$container.hasClass('tags')) {
            this.hasTags = true;
        }

        if (this.$container.hasClass('is-template')) {
            this.isTemplate = true;
        }

        this.$inputs = this.$container.data('inputs');
        this.$data = this.$container.data('modal');

        if (this.$data) {
            this.$fields = this.$data.fields;
            this.hasModal = true;
        }

        if (this.$inputs) {
            $.each(this.$inputs, function (i, item) {
                var name = void 0;
                if (item.type === 'checkbox') {
                    self.enabled = item.checked;
                    name = item.name;
                    self.$enableCheckbox = $('[name=\'' + name + '\']');
                } else {
                    self.enabled = true;
                }
            });
        }

        this.addListener(this.$toggle, 'click', 'toggle');
        this.addListener(this.$edit, 'click', 'edit');

        if (this.enabled) {
            this.editing = true;

            if (this.$data) {
                this.$edit.removeClass('hidden');
            }
        }
    },
    toggle: function toggle(e) {
        e.preventDefault();
        this.editing = false;

        if (this.$container.hasClass('option-enabled')) {
            this.$edit.addClass('hidden');
            this.$container.removeClass('option-enabled');
            this.$resultWrapper.addClass('hidden');
            this.$resultContainer.html('');
            this.$toggle.html('ENABLE');
            this.disableOption();
        } else {
            this.$edit.removeClass('hidden');
            this.$container.addClass('option-enabled');
            this.$toggle.html('DISABLE');
            this.enableOption();

            if (this.hasModal) {
                if (!this.modal) {
                    this.modal = new OptionModal(this);
                } else {
                    this.modal.$form.find('.fb-field').removeClass('error');
                    this.modal.$form[0].reset();
                    this.modal.show();
                }
            }
        }
    },
    edit: function edit(e) {
        e.preventDefault();
        var self = void 0;
        self = this;
        this.editing = true;

        if (this.editing) {
            if (!this.modal) {
                this.modal = new OptionModal(this);
            } else {
                this.modal.$form.find('.fb-field').removeClass('error');
                $.each(this.$inputs, function (i, item) {
                    var className = void 0;
                    var currentValue = void 0;

                    if (item.type !== 'checkbox') {
                        currentValue = $('[name=\'' + item.name + '\']').val();
                        console.log(item.name);
                        className = item.name.replace(/[_\W]+/g, "-").slice(0, -1);

                        $.each(self.modal.$modalInputs, function (i, item) {
                            var input = void 0;
                            input = $(item);

                            if (input.hasClass(className)) {
                                input.val(currentValue);
                            }
                        });
                    }
                });

                this.modal.show();
            }
        }
    },
    disableOption: function disableOption() {
        this.$enableCheckbox.prop('checked', false);
    },
    enableOption: function enableOption() {
        if (this.$enableCheckbox) {
            this.$enableCheckbox.prop('checked', true);
        }
    },
    updateHtmlFromModal: function updateHtmlFromModal() {
        var self = void 0;
        self = this;
        var $resultHtml = void 0;
        var body = void 0;
        var index = void 0;
        var key = void 0;
        var name = void 0;
        var totalResults = void 0;
        var value = void 0;

        if (this.hasTags) {
            totalResults = this.$resultContainer.find('.result-item').length;

            if (totalResults) {
                index = totalResults;
            } else {
                index = 0;
            }

            $resultHtml = $('<div class="result-item" data-result-index="' + index + '">').appendTo(Garnish.$bod);
            name = $(this.modal.$modalInputs[0]).data('name');
            key = $(this.modal.$modalInputs[0]).val();
            value = $(this.modal.$modalInputs[1]).val();
            body = $(['<div class="option-result-actions">', '<a href="#" class="option-result-delete" title="' + Craft.t('form-builder', 'Delete') + '"><svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><path d="M9.521064 18.5182504c-4.973493 0-9.019897-4.0510671-9.019897-9.030471 0-4.98018924 4.046404-9.0312563 9.019897-9.0312563s9.019897 4.05106706 9.019897 9.0312563c0 4.9794039-4.046404 9.030471-9.019897 9.030471zm0-16.05425785c-3.868359 0-7.015127 3.15021907-7.015127 7.02378685 0 3.8727824 3.146768 7.0237869 7.015127 7.0237869 3.86836 0 7.015127-3.1510045 7.015127-7.0237869 0-3.87356778-3.146767-7.02378685-7.015127-7.02378685zm3.167945 10.02870785c-.196085.1955634-.452564.2937378-.708258.2937378-.256479 0-.512958-.0981744-.709042-.2937378L9.521064 10.739699 7.77042 12.4927004c-.196085.1955634-.452564.2937378-.709043.2937378-.256478 0-.512957-.0981744-.708258-.2937378-.391385-.391912-.391385-1.0272965 0-1.4192086l1.750645-1.7530015-1.750645-1.7530015c-.391385-.391912-.391385-1.02729655 0-1.41920862.391385-.39191207 1.025131-.39191207 1.417301 0L9.521064 7.9012817l1.750645-1.75300152c.391385-.39191207 1.025915-.39191207 1.4173 0 .391385.39191207.391385 1.02729662 0 1.41920862l-1.750644 1.7530015 1.750644 1.7530015c.391385.3919121.391385 1.0272966 0 1.4192086z" fill="#8094A1" fill-rule="evenodd"/></svg></a>', '</div>', '<code><span class="option-key input-hint">' + key + '</span> ' + value + '</code>', '<input type="hidden" name="' + name + '[' + index + '][key]" value="' + key + '" />', '<input type="hidden" name="' + name + '[' + index + '][value]" value="' + value + '" />'].join('')).appendTo($resultHtml);
            this.$resultContainer.append($resultHtml);

            new Tag($resultHtml, this.modal);
        } else {
            if (this.isTemplate) {
                updateTemplateHtml(this.modal, this.$container);
            }

            this.$resultContainer.html('');

            $.each(this.modal.$modalInputs, function (i, item) {
                var hint = void 0;
                value = $(item).val();

                if (value) {
                    name = $(item).data('name');
                    hint = $(item).data('hint');
                    $('[name=\'' + name + '\']').val(value);
                    self.$resultContainer.append($('<code><span class=\'input-hint\'>' + hint + ':</span> ' + value + '</code>'));
                } else {
                    name = $(item).data('name');
                    hint = $(item).data('hint');
                    $('[name=\'' + name + '\']').val('');
                }
            });
        }

        this.$resultWrapper.removeClass('hidden');
    }
});

Garnish.$doc.ready(function () {
    return $('.option-item').each(function (i, el) {
        return new window.Option(el);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjRhYjBiMzJlZmZlYTlmYjdhZTYiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvb3B0aW9uLmpzIl0sIm5hbWVzIjpbIk9wdGlvbiIsIndpbmRvdyIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiRyZXN1bHRXcmFwcGVyIiwiJHJlc3VsdENvbnRhaW5lciIsIiR0b2dnbGUiLCIkZWRpdCIsIiRkYXRhIiwiJGlucHV0cyIsImVuYWJsZWQiLCJlZGl0aW5nIiwiaGFzTW9kYWwiLCJoYXNUYWdzIiwiaXNUZW1wbGF0ZSIsIiRlbmFibGVDaGVja2JveCIsIiRmaWVsZHMiLCJpbml0IiwiY29udGFpbmVyIiwic2VsZiIsIiQiLCJmaW5kIiwiaGFzQ2xhc3MiLCJkYXRhIiwiZmllbGRzIiwiZWFjaCIsImkiLCJpdGVtIiwibmFtZSIsInR5cGUiLCJjaGVja2VkIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwiaHRtbCIsImRpc2FibGVPcHRpb24iLCJlbmFibGVPcHRpb24iLCJtb2RhbCIsIk9wdGlvbk1vZGFsIiwiJGZvcm0iLCJyZXNldCIsInNob3ciLCJlZGl0IiwiY2xhc3NOYW1lIiwiY3VycmVudFZhbHVlIiwidmFsIiwiY29uc29sZSIsImxvZyIsInJlcGxhY2UiLCJzbGljZSIsIiRtb2RhbElucHV0cyIsImlucHV0IiwicHJvcCIsInVwZGF0ZUh0bWxGcm9tTW9kYWwiLCIkcmVzdWx0SHRtbCIsImJvZHkiLCJpbmRleCIsImtleSIsInRvdGFsUmVzdWx0cyIsInZhbHVlIiwibGVuZ3RoIiwiYXBwZW5kVG8iLCIkYm9kIiwiQ3JhZnQiLCJ0Iiwiam9pbiIsImFwcGVuZCIsIlRhZyIsInVwZGF0ZVRlbXBsYXRlSHRtbCIsImhpbnQiLCIkZG9jIiwicmVhZHkiLCJlbCJdLCJtYXBwaW5ncyI6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UXFCLEdBQVIsRUFBUjs7QUFFQSxvQkFBSWMsS0FBSixFQUFXO0FBQ1BsQywyQkFBT1IsRUFBRU8sSUFBRixFQUFRSixJQUFSLENBQWEsTUFBYixDQUFQO0FBQ0FpRCwyQkFBT3BELEVBQUVPLElBQUYsRUFBUUosSUFBUixDQUFhLE1BQWIsQ0FBUDtBQUNBSCxtQ0FBWVEsSUFBWixVQUFzQm9CLEdBQXRCLENBQTBCYyxLQUExQjtBQUNBM0MseUJBQUtkLGdCQUFMLENBQXNCZ0UsTUFBdEIsQ0FBNkJqRCx3Q0FBb0NvRCxJQUFwQyxpQkFBb0RWLEtBQXBELGFBQTdCO0FBQ0gsaUJBTEQsTUFLTztBQUNIbEMsMkJBQU9SLEVBQUVPLElBQUYsRUFBUUosSUFBUixDQUFhLE1BQWIsQ0FBUDtBQUNBaUQsMkJBQU9wRCxFQUFFTyxJQUFGLEVBQVFKLElBQVIsQ0FBYSxNQUFiLENBQVA7QUFDQUgsbUNBQVlRLElBQVosVUFBc0JvQixHQUF0QixDQUEwQixFQUExQjtBQUNIO0FBQ0osYUFkRDtBQWVIOztBQUVELGFBQUs1QyxjQUFMLENBQW9CNEIsV0FBcEIsQ0FBZ0MsUUFBaEM7QUFDSDtBQXBNK0IsQ0FBcEIsQ0FBaEI7O0FBdU1BaEMsUUFBUXlFLElBQVIsQ0FBYUMsS0FBYixDQUFtQjtBQUFBLFdBQU10RCxFQUFFLGNBQUYsRUFBa0JLLElBQWxCLENBQXVCLFVBQUNDLENBQUQsRUFBSWlELEVBQUo7QUFBQSxlQUFXLElBQUk1RSxPQUFPRCxNQUFYLENBQWtCNkUsRUFBbEIsQ0FBWDtBQUFBLEtBQXZCLENBQU47QUFBQSxDQUFuQixFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL29wdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2NGFiMGIzMmVmZmVhOWZiN2FlNiIsImxldCBPcHRpb247XG5cbndpbmRvdy5PcHRpb24gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRyZXN1bHRXcmFwcGVyOiBudWxsLFxuICAgICRyZXN1bHRDb250YWluZXI6IG51bGwsXG4gICAgJHRvZ2dsZTogbnVsbCxcbiAgICAkZWRpdDogbnVsbCxcbiAgICAkZGF0YTogbnVsbCxcbiAgICAkaW5wdXRzOiBudWxsLFxuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgIGhhc01vZGFsOiBmYWxzZSxcbiAgICBoYXNUYWdzOiBmYWxzZSxcbiAgICBpc1RlbXBsYXRlOiBmYWxzZSxcbiAgICAkZW5hYmxlQ2hlY2tib3g6IG51bGwsXG4gICAgJGZpZWxkczogbnVsbCxcblxuICAgIGluaXQoY29udGFpbmVyKSB7XG4gICAgICAgIGxldCBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKGNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuJHJlc3VsdFdyYXBwZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi13cmFwcGVyJyk7XG4gICAgICAgIHRoaXMuJHJlc3VsdENvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcub3B0aW9uLXJlc3VsdCcpO1xuICAgICAgICB0aGlzLiR0b2dnbGUgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi10b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kZWRpdCA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcub3B0aW9uLWVkaXQnKTtcblxuICAgICAgICBpZiAodGhpcy4kY29udGFpbmVyLmhhc0NsYXNzKCd0YWdzJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzVGFncyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kY29udGFpbmVyLmhhc0NsYXNzKCdpcy10ZW1wbGF0ZScpKSB7XG4gICAgICAgICAgICB0aGlzLmlzVGVtcGxhdGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kaW5wdXRzID0gdGhpcy4kY29udGFpbmVyLmRhdGEoJ2lucHV0cycpO1xuICAgICAgICB0aGlzLiRkYXRhID0gdGhpcy4kY29udGFpbmVyLmRhdGEoJ21vZGFsJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuJGZpZWxkcyA9IHRoaXMuJGRhdGEuZmllbGRzO1xuICAgICAgICAgICAgdGhpcy5oYXNNb2RhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kaW5wdXRzKSB7XG4gICAgICAgICAgICAkLmVhY2godGhpcy4kaW5wdXRzLCAoaSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmFibGVkID0gaXRlbS5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gaXRlbS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRlbmFibGVDaGVja2JveCA9ICQoYFtuYW1lPScke25hbWV9J11gKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiR0b2dnbGUsICdjbGljaycsICd0b2dnbGUnKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRlZGl0LCAnY2xpY2snLCAnZWRpdCcpO1xuXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWRpdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfSxcblxuICAgIHRvZ2dsZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygnb3B0aW9uLWVuYWJsZWQnKSkge1xuICAgICAgICAgICAgdGhpcy4kZWRpdC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ29wdGlvbi1lbmFibGVkJyk7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRXcmFwcGVyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdENvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgIHRoaXMuJHRvZ2dsZS5odG1sKCdFTkFCTEUnKTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU9wdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kZWRpdC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ29wdGlvbi1lbmFibGVkJyk7XG4gICAgICAgICAgICB0aGlzLiR0b2dnbGUuaHRtbCgnRElTQUJMRScpO1xuICAgICAgICAgICAgdGhpcy5lbmFibGVPcHRpb24oKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTW9kYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBPcHRpb25Nb2RhbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLiRmb3JtLmZpbmQoJy5mYi1maWVsZCcpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLiRmb3JtWzBdLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBlZGl0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuZWRpdGluZykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBPcHRpb25Nb2RhbCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC4kZm9ybS5maW5kKCcuZmItZmllbGQnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAkLmVhY2godGhpcy4kaW5wdXRzLCAoaSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9ICQoYFtuYW1lPScke2l0ZW0ubmFtZX0nXWApLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gaXRlbS5uYW1lLnJlcGxhY2UoL1tfXFxXXSsvZywgXCItXCIpLnNsaWNlKDAsIC0xKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHNlbGYubW9kYWwuJG1vZGFsSW5wdXRzLCAoaSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9ICQoaXRlbSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuaGFzQ2xhc3MoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzYWJsZU9wdGlvbigpIHtcbiAgICAgICAgdGhpcy4kZW5hYmxlQ2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgZW5hYmxlT3B0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy4kZW5hYmxlQ2hlY2tib3gpIHtcbiAgICAgICAgICAgIHRoaXMuJGVuYWJsZUNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVIdG1sRnJvbU1vZGFsKCkge1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCAkcmVzdWx0SHRtbDtcbiAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgIGxldCBpbmRleDtcbiAgICAgICAgbGV0IGtleTtcbiAgICAgICAgbGV0IG5hbWU7XG4gICAgICAgIGxldCB0b3RhbFJlc3VsdHM7XG4gICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5oYXNUYWdzKSB7XG4gICAgICAgICAgICB0b3RhbFJlc3VsdHMgPSB0aGlzLiRyZXN1bHRDb250YWluZXIuZmluZCgnLnJlc3VsdC1pdGVtJykubGVuZ3RoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodG90YWxSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSB0b3RhbFJlc3VsdHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHJlc3VsdEh0bWwgPSAkKGA8ZGl2IGNsYXNzPVwicmVzdWx0LWl0ZW1cIiBkYXRhLXJlc3VsdC1pbmRleD1cIiR7aW5kZXh9XCI+YCkuYXBwZW5kVG8oR2FybmlzaC4kYm9kKTtcbiAgICAgICAgICAgIG5hbWUgPSAkKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzWzBdKS5kYXRhKCduYW1lJyk7XG4gICAgICAgICAgICBrZXkgPSAkKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzWzBdKS52YWwoKTtcbiAgICAgICAgICAgIHZhbHVlID0gJCh0aGlzLm1vZGFsLiRtb2RhbElucHV0c1sxXSkudmFsKCk7XG4gICAgICAgICAgICBib2R5ID0gJChbJzxkaXYgY2xhc3M9XCJvcHRpb24tcmVzdWx0LWFjdGlvbnNcIj4nLCBgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm9wdGlvbi1yZXN1bHQtZGVsZXRlXCIgdGl0bGU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdEZWxldGUnKX1cIj48c3ZnIHdpZHRoPVwiMTlcIiBoZWlnaHQ9XCIxOVwiIHZpZXdCb3g9XCIwIDAgMTkgMTlcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZD1cIk05LjUyMTA2NCAxOC41MTgyNTA0Yy00Ljk3MzQ5MyAwLTkuMDE5ODk3LTQuMDUxMDY3MS05LjAxOTg5Ny05LjAzMDQ3MSAwLTQuOTgwMTg5MjQgNC4wNDY0MDQtOS4wMzEyNTYzIDkuMDE5ODk3LTkuMDMxMjU2M3M5LjAxOTg5NyA0LjA1MTA2NzA2IDkuMDE5ODk3IDkuMDMxMjU2M2MwIDQuOTc5NDAzOS00LjA0NjQwNCA5LjAzMDQ3MS05LjAxOTg5NyA5LjAzMDQ3MXptMC0xNi4wNTQyNTc4NWMtMy44NjgzNTkgMC03LjAxNTEyNyAzLjE1MDIxOTA3LTcuMDE1MTI3IDcuMDIzNzg2ODUgMCAzLjg3Mjc4MjQgMy4xNDY3NjggNy4wMjM3ODY5IDcuMDE1MTI3IDcuMDIzNzg2OSAzLjg2ODM2IDAgNy4wMTUxMjctMy4xNTEwMDQ1IDcuMDE1MTI3LTcuMDIzNzg2OSAwLTMuODczNTY3NzgtMy4xNDY3NjctNy4wMjM3ODY4NS03LjAxNTEyNy03LjAyMzc4Njg1em0zLjE2Nzk0NSAxMC4wMjg3MDc4NWMtLjE5NjA4NS4xOTU1NjM0LS40NTI1NjQuMjkzNzM3OC0uNzA4MjU4LjI5MzczNzgtLjI1NjQ3OSAwLS41MTI5NTgtLjA5ODE3NDQtLjcwOTA0Mi0uMjkzNzM3OEw5LjUyMTA2NCAxMC43Mzk2OTkgNy43NzA0MiAxMi40OTI3MDA0Yy0uMTk2MDg1LjE5NTU2MzQtLjQ1MjU2NC4yOTM3Mzc4LS43MDkwNDMuMjkzNzM3OC0uMjU2NDc4IDAtLjUxMjk1Ny0uMDk4MTc0NC0uNzA4MjU4LS4yOTM3Mzc4LS4zOTEzODUtLjM5MTkxMi0uMzkxMzg1LTEuMDI3Mjk2NSAwLTEuNDE5MjA4NmwxLjc1MDY0NS0xLjc1MzAwMTUtMS43NTA2NDUtMS43NTMwMDE1Yy0uMzkxMzg1LS4zOTE5MTItLjM5MTM4NS0xLjAyNzI5NjU1IDAtMS40MTkyMDg2Mi4zOTEzODUtLjM5MTkxMjA3IDEuMDI1MTMxLS4zOTE5MTIwNyAxLjQxNzMwMSAwTDkuNTIxMDY0IDcuOTAxMjgxN2wxLjc1MDY0NS0xLjc1MzAwMTUyYy4zOTEzODUtLjM5MTkxMjA3IDEuMDI1OTE1LS4zOTE5MTIwNyAxLjQxNzMgMCAuMzkxMzg1LjM5MTkxMjA3LjM5MTM4NSAxLjAyNzI5NjYyIDAgMS40MTkyMDg2MmwtMS43NTA2NDQgMS43NTMwMDE1IDEuNzUwNjQ0IDEuNzUzMDAxNWMuMzkxMzg1LjM5MTkxMjEuMzkxMzg1IDEuMDI3Mjk2NiAwIDEuNDE5MjA4NnpcIiBmaWxsPVwiIzgwOTRBMVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIi8+PC9zdmc+PC9hPmAsICc8L2Rpdj4nLCBgPGNvZGU+PHNwYW4gY2xhc3M9XCJvcHRpb24ta2V5IGlucHV0LWhpbnRcIj4ke2tleX08L3NwYW4+ICR7dmFsdWV9PC9jb2RlPmAsIGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7aW5kZXh9XVtrZXldXCIgdmFsdWU9XCIke2tleX1cIiAvPmAsIGA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIke25hbWV9WyR7aW5kZXh9XVt2YWx1ZV1cIiB2YWx1ZT1cIiR7dmFsdWV9XCIgLz5gXS5qb2luKCcnKSkuYXBwZW5kVG8oJHJlc3VsdEh0bWwpO1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0Q29udGFpbmVyLmFwcGVuZCgkcmVzdWx0SHRtbCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ldyBUYWcoJHJlc3VsdEh0bWwsIHRoaXMubW9kYWwpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1RlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGVtcGxhdGVIdG1sKHRoaXMubW9kYWwsIHRoaXMuJGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdENvbnRhaW5lci5odG1sKCcnKTtcblxuICAgICAgICAgICAgJC5lYWNoKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzLCAoaSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBoaW50O1xuICAgICAgICAgICAgICAgIHZhbHVlID0gJChpdGVtKS52YWwoKTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gJChpdGVtKS5kYXRhKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgIGhpbnQgPSAkKGl0ZW0pLmRhdGEoJ2hpbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgJChgW25hbWU9JyR7bmFtZX0nXWApLnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJHJlc3VsdENvbnRhaW5lci5hcHBlbmQoJChgPGNvZGU+PHNwYW4gY2xhc3M9J2lucHV0LWhpbnQnPiR7aGludH06PC9zcGFuPiAke3ZhbHVlfTwvY29kZT5gKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICQoaXRlbSkuZGF0YSgnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBoaW50ID0gJChpdGVtKS5kYXRhKCdoaW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoYFtuYW1lPScke25hbWV9J11gKS52YWwoJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRyZXN1bHRXcmFwcGVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG59KTtcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+ICQoJy5vcHRpb24taXRlbScpLmVhY2goKGksIGVsKSA9PiBuZXcgd2luZG93Lk9wdGlvbihlbCkpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9vcHRpb24uanMiXSwic291cmNlUm9vdCI6IiJ9