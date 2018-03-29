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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvb3B0aW9uLmpzIl0sIm5hbWVzIjpbIk9wdGlvbiIsIndpbmRvdyIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiRyZXN1bHRXcmFwcGVyIiwiJHJlc3VsdENvbnRhaW5lciIsIiR0b2dnbGUiLCIkZWRpdCIsIiRkYXRhIiwiJGlucHV0cyIsImVuYWJsZWQiLCJlZGl0aW5nIiwiaGFzTW9kYWwiLCJoYXNUYWdzIiwiaXNUZW1wbGF0ZSIsIiRlbmFibGVDaGVja2JveCIsIiRmaWVsZHMiLCJpbml0IiwiY29udGFpbmVyIiwic2VsZiIsIiQiLCJmaW5kIiwiaGFzQ2xhc3MiLCJkYXRhIiwiZmllbGRzIiwiZWFjaCIsImkiLCJpdGVtIiwibmFtZSIsInR5cGUiLCJjaGVja2VkIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwiaHRtbCIsImRpc2FibGVPcHRpb24iLCJlbmFibGVPcHRpb24iLCJtb2RhbCIsIk9wdGlvbk1vZGFsIiwiJGZvcm0iLCJyZXNldCIsInNob3ciLCJlZGl0IiwiY2xhc3NOYW1lIiwiY3VycmVudFZhbHVlIiwidmFsIiwicmVwbGFjZSIsInNsaWNlIiwiJG1vZGFsSW5wdXRzIiwiaW5wdXQiLCJwcm9wIiwidXBkYXRlSHRtbEZyb21Nb2RhbCIsIiRyZXN1bHRIdG1sIiwiYm9keSIsImluZGV4Iiwia2V5IiwidG90YWxSZXN1bHRzIiwidmFsdWUiLCJsZW5ndGgiLCJhcHBlbmRUbyIsIiRib2QiLCJDcmFmdCIsInQiLCJqb2luIiwiYXBwZW5kIiwiVGFnIiwidXBkYXRlVGVtcGxhdGVIdG1sIiwiaGludCIsIiRkb2MiLCJyZWFkeSIsImVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFF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LElBQUYsRUFBUUosSUFBUixDQUFhLE1BQWIsQ0FBUDtBQUNBK0MsMkJBQU9sRCxFQUFFTyxJQUFGLEVBQVFKLElBQVIsQ0FBYSxNQUFiLENBQVA7QUFDQUgsbUNBQVlRLElBQVosVUFBc0JvQixHQUF0QixDQUEwQlksS0FBMUI7QUFDQXpDLHlCQUFLZCxnQkFBTCxDQUFzQjhELE1BQXRCLENBQTZCL0Msd0NBQW9Da0QsSUFBcEMsaUJBQW9EVixLQUFwRCxhQUE3QjtBQUNILGlCQUxELE1BS087QUFDSGhDLDJCQUFPUixFQUFFTyxJQUFGLEVBQVFKLElBQVIsQ0FBYSxNQUFiLENBQVA7QUFDQStDLDJCQUFPbEQsRUFBRU8sSUFBRixFQUFRSixJQUFSLENBQWEsTUFBYixDQUFQO0FBQ0FILG1DQUFZUSxJQUFaLFVBQXNCb0IsR0FBdEIsQ0FBMEIsRUFBMUI7QUFDSDtBQUNKLGFBZEQ7QUFlSDs7QUFFRCxhQUFLNUMsY0FBTCxDQUFvQjRCLFdBQXBCLENBQWdDLFFBQWhDO0FBQ0g7QUFuTStCLENBQXBCLENBQWhCOztBQXNNQWhDLFFBQVF1RSxJQUFSLENBQWFDLEtBQWIsQ0FBbUI7QUFBQSxXQUFNcEQsRUFBRSxjQUFGLEVBQWtCSyxJQUFsQixDQUF1QixVQUFDQyxDQUFELEVBQUkrQyxFQUFKO0FBQUEsZUFBVyxJQUFJMUUsT0FBT0QsTUFBWCxDQUFrQjJFLEVBQWxCLENBQVg7QUFBQSxLQUF2QixDQUFOO0FBQUEsQ0FBbkIsRSIsImZpbGUiOiIvcmVsZWFzZS9zcmMvd2ViL2Fzc2V0cy9qcy9vcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxOSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJsZXQgT3B0aW9uO1xuXG53aW5kb3cuT3B0aW9uID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICAkcmVzdWx0V3JhcHBlcjogbnVsbCxcbiAgICAkcmVzdWx0Q29udGFpbmVyOiBudWxsLFxuICAgICR0b2dnbGU6IG51bGwsXG4gICAgJGVkaXQ6IG51bGwsXG4gICAgJGRhdGE6IG51bGwsXG4gICAgJGlucHV0czogbnVsbCxcbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICBoYXNNb2RhbDogZmFsc2UsXG4gICAgaGFzVGFnczogZmFsc2UsXG4gICAgaXNUZW1wbGF0ZTogZmFsc2UsXG4gICAgJGVuYWJsZUNoZWNrYm94OiBudWxsLFxuICAgICRmaWVsZHM6IG51bGwsXG5cbiAgICBpbml0KGNvbnRhaW5lcikge1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICAgICAgICB0aGlzLiRyZXN1bHRXcmFwcGVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5vcHRpb24td3JhcHBlcicpO1xuICAgICAgICB0aGlzLiRyZXN1bHRDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi1yZXN1bHQnKTtcbiAgICAgICAgdGhpcy4kdG9nZ2xlID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5vcHRpb24tdG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuJGVkaXQgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi1lZGl0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygndGFncycpKSB7XG4gICAgICAgICAgICB0aGlzLmhhc1RhZ3MgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygnaXMtdGVtcGxhdGUnKSkge1xuICAgICAgICAgICAgdGhpcy5pc1RlbXBsYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGlucHV0cyA9IHRoaXMuJGNvbnRhaW5lci5kYXRhKCdpbnB1dHMnKTtcbiAgICAgICAgdGhpcy4kZGF0YSA9IHRoaXMuJGNvbnRhaW5lci5kYXRhKCdtb2RhbCcpO1xuXG4gICAgICAgIGlmICh0aGlzLiRkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHMgPSB0aGlzLiRkYXRhLmZpZWxkcztcbiAgICAgICAgICAgIHRoaXMuaGFzTW9kYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJGlucHV0cykge1xuICAgICAgICAgICAgJC5lYWNoKHRoaXMuJGlucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW5hYmxlZCA9IGl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kZW5hYmxlQ2hlY2tib3ggPSAkKGBbbmFtZT0nJHtuYW1lfSddYCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kdG9nZ2xlLCAnY2xpY2snLCAndG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZWRpdCwgJ2NsaWNrJywgJ2VkaXQnKTtcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVkaXQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgIH0sXG5cbiAgICB0b2dnbGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLiRjb250YWluZXIuaGFzQ2xhc3MoJ29wdGlvbi1lbmFibGVkJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGVkaXQuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnJlbW92ZUNsYXNzKCdvcHRpb24tZW5hYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0V3JhcHBlci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRDb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICB0aGlzLiR0b2dnbGUuaHRtbCgnRU5BQkxFJyk7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVPcHRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGVkaXQucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmFkZENsYXNzKCdvcHRpb24tZW5hYmxlZCcpO1xuICAgICAgICAgICAgdGhpcy4kdG9nZ2xlLmh0bWwoJ0RJU0FCTEUnKTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlT3B0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhc01vZGFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgT3B0aW9uTW9kYWwodGhpcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbC4kZm9ybS5maW5kKCcuZmItZmllbGQnKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RhbC4kZm9ybVswXS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZWRpdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmVkaXRpbmcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgT3B0aW9uTW9kYWwodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuJGZvcm0uZmluZCgnLmZiLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMuJGlucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlICE9PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSAkKGBbbmFtZT0nJHtpdGVtLm5hbWV9J11gKS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGl0ZW0ubmFtZS5yZXBsYWNlKC9bX1xcV10rL2csIFwiLVwiKS5zbGljZSgwLCAtMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChzZWxmLm1vZGFsLiRtb2RhbElucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSAkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Lmhhc0NsYXNzKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpc2FibGVPcHRpb24oKSB7XG4gICAgICAgIHRoaXMuJGVuYWJsZUNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIGVuYWJsZU9wdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuJGVuYWJsZUNoZWNrYm94KSB7XG4gICAgICAgICAgICB0aGlzLiRlbmFibGVDaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlSHRtbEZyb21Nb2RhbCgpIHtcbiAgICAgICAgbGV0IHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgJHJlc3VsdEh0bWw7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIGxldCBuYW1lO1xuICAgICAgICBsZXQgdG90YWxSZXN1bHRzO1xuICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVGFncykge1xuICAgICAgICAgICAgdG90YWxSZXN1bHRzID0gdGhpcy4kcmVzdWx0Q29udGFpbmVyLmZpbmQoJy5yZXN1bHQtaXRlbScpLmxlbmd0aDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRvdGFsUmVzdWx0cykge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdG90YWxSZXN1bHRzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRyZXN1bHRIdG1sID0gJChgPGRpdiBjbGFzcz1cInJlc3VsdC1pdGVtXCIgZGF0YS1yZXN1bHQtaW5kZXg9XCIke2luZGV4fVwiPmApLmFwcGVuZFRvKEdhcm5pc2guJGJvZCk7XG4gICAgICAgICAgICBuYW1lID0gJCh0aGlzLm1vZGFsLiRtb2RhbElucHV0c1swXSkuZGF0YSgnbmFtZScpO1xuICAgICAgICAgICAga2V5ID0gJCh0aGlzLm1vZGFsLiRtb2RhbElucHV0c1swXSkudmFsKCk7XG4gICAgICAgICAgICB2YWx1ZSA9ICQodGhpcy5tb2RhbC4kbW9kYWxJbnB1dHNbMV0pLnZhbCgpO1xuICAgICAgICAgICAgYm9keSA9ICQoWyc8ZGl2IGNsYXNzPVwib3B0aW9uLXJlc3VsdC1hY3Rpb25zXCI+JywgYDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJvcHRpb24tcmVzdWx0LWRlbGV0ZVwiIHRpdGxlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRGVsZXRlJyl9XCI+PHN2ZyB3aWR0aD1cIjE5XCIgaGVpZ2h0PVwiMTlcIiB2aWV3Qm94PVwiMCAwIDE5IDE5XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNOS41MjEwNjQgMTguNTE4MjUwNGMtNC45NzM0OTMgMC05LjAxOTg5Ny00LjA1MTA2NzEtOS4wMTk4OTctOS4wMzA0NzEgMC00Ljk4MDE4OTI0IDQuMDQ2NDA0LTkuMDMxMjU2MyA5LjAxOTg5Ny05LjAzMTI1NjNzOS4wMTk4OTcgNC4wNTEwNjcwNiA5LjAxOTg5NyA5LjAzMTI1NjNjMCA0Ljk3OTQwMzktNC4wNDY0MDQgOS4wMzA0NzEtOS4wMTk4OTcgOS4wMzA0NzF6bTAtMTYuMDU0MjU3ODVjLTMuODY4MzU5IDAtNy4wMTUxMjcgMy4xNTAyMTkwNy03LjAxNTEyNyA3LjAyMzc4Njg1IDAgMy44NzI3ODI0IDMuMTQ2NzY4IDcuMDIzNzg2OSA3LjAxNTEyNyA3LjAyMzc4NjkgMy44NjgzNiAwIDcuMDE1MTI3LTMuMTUxMDA0NSA3LjAxNTEyNy03LjAyMzc4NjkgMC0zLjg3MzU2Nzc4LTMuMTQ2NzY3LTcuMDIzNzg2ODUtNy4wMTUxMjctNy4wMjM3ODY4NXptMy4xNjc5NDUgMTAuMDI4NzA3ODVjLS4xOTYwODUuMTk1NTYzNC0uNDUyNTY0LjI5MzczNzgtLjcwODI1OC4yOTM3Mzc4LS4yNTY0NzkgMC0uNTEyOTU4LS4wOTgxNzQ0LS43MDkwNDItLjI5MzczNzhMOS41MjEwNjQgMTAuNzM5Njk5IDcuNzcwNDIgMTIuNDkyNzAwNGMtLjE5NjA4NS4xOTU1NjM0LS40NTI1NjQuMjkzNzM3OC0uNzA5MDQzLjI5MzczNzgtLjI1NjQ3OCAwLS41MTI5NTctLjA5ODE3NDQtLjcwODI1OC0uMjkzNzM3OC0uMzkxMzg1LS4zOTE5MTItLjM5MTM4NS0xLjAyNzI5NjUgMC0xLjQxOTIwODZsMS43NTA2NDUtMS43NTMwMDE1LTEuNzUwNjQ1LTEuNzUzMDAxNWMtLjM5MTM4NS0uMzkxOTEyLS4zOTEzODUtMS4wMjcyOTY1NSAwLTEuNDE5MjA4NjIuMzkxMzg1LS4zOTE5MTIwNyAxLjAyNTEzMS0uMzkxOTEyMDcgMS40MTczMDEgMEw5LjUyMTA2NCA3LjkwMTI4MTdsMS43NTA2NDUtMS43NTMwMDE1MmMuMzkxMzg1LS4zOTE5MTIwNyAxLjAyNTkxNS0uMzkxOTEyMDcgMS40MTczIDAgLjM5MTM4NS4zOTE5MTIwNy4zOTEzODUgMS4wMjcyOTY2MiAwIDEuNDE5MjA4NjJsLTEuNzUwNjQ0IDEuNzUzMDAxNSAxLjc1MDY0NCAxLjc1MzAwMTVjLjM5MTM4NS4zOTE5MTIxLjM5MTM4NSAxLjAyNzI5NjYgMCAxLjQxOTIwODZ6XCIgZmlsbD1cIiM4MDk0QTFcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIvPjwvc3ZnPjwvYT5gLCAnPC9kaXY+JywgYDxjb2RlPjxzcGFuIGNsYXNzPVwib3B0aW9uLWtleSBpbnB1dC1oaW50XCI+JHtrZXl9PC9zcGFuPiAke3ZhbHVlfTwvY29kZT5gLCBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJHtuYW1lfVske2luZGV4fV1ba2V5XVwiIHZhbHVlPVwiJHtrZXl9XCIgLz5gLCBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJHtuYW1lfVske2luZGV4fV1bdmFsdWVdXCIgdmFsdWU9XCIke3ZhbHVlfVwiIC8+YF0uam9pbignJykpLmFwcGVuZFRvKCRyZXN1bHRIdG1sKTtcbiAgICAgICAgICAgIHRoaXMuJHJlc3VsdENvbnRhaW5lci5hcHBlbmQoJHJlc3VsdEh0bWwpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBuZXcgVGFnKCRyZXN1bHRIdG1sLCB0aGlzLm1vZGFsKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRlbXBsYXRlSHRtbCh0aGlzLm1vZGFsLCB0aGlzLiRjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiRyZXN1bHRDb250YWluZXIuaHRtbCgnJyk7XG5cbiAgICAgICAgICAgICQuZWFjaCh0aGlzLm1vZGFsLiRtb2RhbElucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaGludDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICQoaXRlbSkudmFsKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICQoaXRlbSkuZGF0YSgnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICBoaW50ID0gJChpdGVtKS5kYXRhKCdoaW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoYFtuYW1lPScke25hbWV9J11gKS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLiRyZXN1bHRDb250YWluZXIuYXBwZW5kKCQoYDxjb2RlPjxzcGFuIGNsYXNzPSdpbnB1dC1oaW50Jz4ke2hpbnR9Ojwvc3Bhbj4gJHt2YWx1ZX08L2NvZGU+YCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAkKGl0ZW0pLmRhdGEoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaGludCA9ICQoaXRlbSkuZGF0YSgnaGludCcpO1xuICAgICAgICAgICAgICAgICAgICAkKGBbbmFtZT0nJHtuYW1lfSddYCkudmFsKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy4kcmVzdWx0V3JhcHBlci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxufSk7XG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiAkKCcub3B0aW9uLWl0ZW0nKS5lYWNoKChpLCBlbCkgPT4gbmV3IHdpbmRvdy5PcHRpb24oZWwpKSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvb3B0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==