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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ({

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),

/***/ 28:
/***/ (function(module, exports) {

NotificationElementModal = Craft.BaseElementSelectorModal.extend({
    $notificationsContainer: null,

    type: null,
    index: null,
    form: null,

    init: function init(elementType, settings, type, form) {
        this.type = type;
        this.form = form;
        this.base(elementType, settings);
        this.index = Math.floor(Math.random() * 10000 + 1);

        this.$notificationsContainer = $('#formbuilder-notifications-container');
    },
    onSelectionChange: function onSelectionChange() {
        this.base();
    },
    onSelect: function onSelect(elementInfo) {

        Craft.postActionRequest('form-builder/integrations/add-notification', {
            index: this.index,
            elementId: elementInfo[0].id,
            type: this.type,
            form: this.form
        }, $.proxy(function (response, textStatus) {
            if (response.success) {
                this.$notificationsContainer.append(response.markup);

                new NotificationSection(response.markup, this.type, this.form, this.index);
            }
        }, this));
    }
});

NotificationSection = Garnish.Base.extend({
    $container: null,
    type: null,
    form: null,

    init: function init(el, type, form, index) {
        this.$container = $('#notification-email-' + index);
        this.type = type;
        this.form = form;
        options = this.$container.find('.option-item');

        new window.FormBuilderSection($('#notification-email-' + index), type);

        options.each(function (i, el) {
            return new window.Option(el);
        });
    }
});

Garnish.$doc.ready(function () {
    $('.notify-item-btn').on('click', function (e) {
        e.preventDefault();
        type = e.currentTarget.dataset.type;
        elementType = e.currentTarget.dataset.element;
        form = e.currentTarget.dataset.context;

        switch (type) {
            case 'email':
                new NotificationElementModal(elementType, {}, type, form);
                // this.prepareEmailNotification()
                break;
            case 'slack':
                console.log('slack');
                break;
            default:
                console.log('nothing available.');
        }

        // new Notification(e.currentTarget)
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvaW50ZWdyYXRpb25zLmpzIl0sIm5hbWVzIjpbIk5vdGlmaWNhdGlvbkVsZW1lbnRNb2RhbCIsIkNyYWZ0IiwiQmFzZUVsZW1lbnRTZWxlY3Rvck1vZGFsIiwiZXh0ZW5kIiwiJG5vdGlmaWNhdGlvbnNDb250YWluZXIiLCJ0eXBlIiwiaW5kZXgiLCJmb3JtIiwiaW5pdCIsImVsZW1lbnRUeXBlIiwic2V0dGluZ3MiLCJiYXNlIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiJCIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwib25TZWxlY3QiLCJlbGVtZW50SW5mbyIsInBvc3RBY3Rpb25SZXF1ZXN0IiwiZWxlbWVudElkIiwiaWQiLCJwcm94eSIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsInN1Y2Nlc3MiLCJhcHBlbmQiLCJtYXJrdXAiLCJOb3RpZmljYXRpb25TZWN0aW9uIiwiR2FybmlzaCIsIkJhc2UiLCIkY29udGFpbmVyIiwiZWwiLCJvcHRpb25zIiwiZmluZCIsIndpbmRvdyIsIkZvcm1CdWlsZGVyU2VjdGlvbiIsImVhY2giLCJpIiwiT3B0aW9uIiwiJGRvYyIsInJlYWR5Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImVsZW1lbnQiLCJjb250ZXh0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNB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QUFGLENBQWdCQyxPQUFoQixDQUF3QkMsT0FBdEM7QUFDQXhDLGVBQU9vQyxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkUsT0FBL0I7O0FBRUEsZ0JBQVEzQyxJQUFSO0FBQ0ksaUJBQUssT0FBTDtBQUNJLG9CQUFJTCx3QkFBSixDQUE2QlMsV0FBN0IsRUFBMEMsRUFBMUMsRUFBOENKLElBQTlDLEVBQW9ERSxJQUFwRDtBQUNBO0FBQ0E7QUFDSixpQkFBSyxPQUFMO0FBQ0kwQyx3QkFBUUMsR0FBUixDQUFZLE9BQVo7QUFDQTtBQUNKO0FBQ0lELHdCQUFRQyxHQUFSLENBQVksb0JBQVo7QUFUUjs7QUFZQTtBQUNILEtBbkJEO0FBb0JILENBckJELEUiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvaW50ZWdyYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg0NDRhMzJjMDgzMDI0YWUwYTk4IiwiTm90aWZpY2F0aW9uRWxlbWVudE1vZGFsID0gQ3JhZnQuQmFzZUVsZW1lbnRTZWxlY3Rvck1vZGFsLmV4dGVuZCh7XG4gICAgJG5vdGlmaWNhdGlvbnNDb250YWluZXI6IG51bGwsXG5cbiAgICB0eXBlOiBudWxsLFxuICAgIGluZGV4OiBudWxsLFxuICAgIGZvcm06IG51bGwsXG5cbiAgICBpbml0KGVsZW1lbnRUeXBlLCBzZXR0aW5ncywgdHlwZSwgZm9ybSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm1cbiAgICAgICAgdGhpcy5iYXNlKGVsZW1lbnRUeXBlLCBzZXR0aW5ncylcbiAgICAgICAgdGhpcy5pbmRleCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMDAwMCkgKyAxKVxuXG4gICAgICAgIHRoaXMuJG5vdGlmaWNhdGlvbnNDb250YWluZXIgPSAkKCcjZm9ybWJ1aWxkZXItbm90aWZpY2F0aW9ucy1jb250YWluZXInKVxuICAgIH0sXG5cbiAgICBvblNlbGVjdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICB9LFxuXG4gICAgb25TZWxlY3QoZWxlbWVudEluZm8pIHtcblxuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2ludGVncmF0aW9ucy9hZGQtbm90aWZpY2F0aW9uJywge1xuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICBlbGVtZW50SWQ6IGVsZW1lbnRJbmZvWzBdLmlkLCBcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgIGZvcm06IHRoaXMuZm9ybSxcbiAgICAgICAgfSwgJC5wcm94eSgoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm90aWZpY2F0aW9uc0NvbnRhaW5lci5hcHBlbmQocmVzcG9uc2UubWFya3VwKVxuXG4gICAgICAgICAgICAgICAgbmV3IE5vdGlmaWNhdGlvblNlY3Rpb24ocmVzcG9uc2UubWFya3VwLCB0aGlzLnR5cGUsIHRoaXMuZm9ybSwgdGhpcy5pbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHRoaXMpKTtcbiAgICB9XG59KVxuXG5Ob3RpZmljYXRpb25TZWN0aW9uID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICB0eXBlOiBudWxsLFxuICAgIGZvcm06IG51bGwsXG5cbiAgICBpbml0KGVsLCB0eXBlLCBmb3JtLCBpbmRleCkge1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKCcjbm90aWZpY2F0aW9uLWVtYWlsLScgKyBpbmRleClcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLmZvcm0gPSBmb3JtXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi1pdGVtJylcblxuICAgICAgICBuZXcgd2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbigkKCcjbm90aWZpY2F0aW9uLWVtYWlsLScgKyBpbmRleCksIHR5cGUpXG5cbiAgICAgICAgb3B0aW9ucy5lYWNoKChpLCBlbCkgPT4gbmV3IHdpbmRvdy5PcHRpb24oZWwpKVxuXG4gICAgfVxufSlcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+IHtcbiAgICAkKCcubm90aWZ5LWl0ZW0tYnRuJykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZVxuICAgICAgICBlbGVtZW50VHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmVsZW1lbnRcbiAgICAgICAgZm9ybSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbnRleHRcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgICAgICBuZXcgTm90aWZpY2F0aW9uRWxlbWVudE1vZGFsKGVsZW1lbnRUeXBlLCB7fSwgdHlwZSwgZm9ybSlcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnByZXBhcmVFbWFpbE5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3NsYWNrJzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2xhY2snKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGF2YWlsYWJsZS4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBuZXcgTm90aWZpY2F0aW9uKGUuY3VycmVudFRhcmdldClcbiAgICB9KVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvaW50ZWdyYXRpb25zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==