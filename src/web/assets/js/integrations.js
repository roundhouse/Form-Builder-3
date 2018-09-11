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

IntegrationsElementModal = Craft.BaseElementSelectorModal.extend({
    $integrationContainer: null,
    type: null,
    index: null,
    form: null,

    init: function init(elementType, stettings, type, form) {
        this.type = type;
        this.form = form;
        this.base(elementType, settings);
        this.index = Math.floor(Math.random() * 10000 + 1);

        this.$integrationContainer = $('#formbuilder-integrations-container');
    },
    onSelectionChange: function onSelectionChange() {
        this.base();
    },
    onSelect: function onSelect(elementInfo) {
        Craft.postActionRequest('formbuilder-integrations/integrations/add-integration', {
            index: 'new' + this.index,
            elementId: elementInfo[0].id,
            type: this.type,
            form: this.form
        }, $.proxy(function (response, textStatus) {
            if (response.success) {
                this.$integrationContainer.append(response.markup);

                new IntegrationSection(response.markup, this.type, this.form, 'new' + this.index);
            }
        }, this));

        // Craft.postActionRequest('form-builder/integrations/add-notification', {
        //     index: this.index,
        //     elementId: elementInfo[0].id,
        //     type: this.type,
        //     form: this.form
        // }, $.proxy(function (response, textStatus) {
        //     if (response.success) {
        //         this.$notificationsContainer.append(response.markup);

        //         new NotificationSection(response.markup, this.type, this.form, this.index);
        //     }
        // }, this));
    }
});

IntegrationSection = Garnish.Base.extend({
    $container: null,
    type: null,
    form: null,

    init: function init(el, type, form, index) {
        this.$container = $('#integration-' + type + '-' + index);
        this.type = type;
        this.form = form;
        options = this.$container.find('.option-item');

        new window.FormBuilderSection($('#integration-' + type + '-' + index), type);

        options.each(function (i, el) {
            return new window.Option(el);
        });
    }
});

Garnish.$doc.ready(function () {

    // let $integrationContainer = $('#formbuilder-integrations-container')

    $('.integrate-item-btn').on('click', function (e) {
        e.preventDefault();
        var index = Math.floor(Math.random() * 10000 + 1);
        var type = e.currentTarget.dataset.type;
        var form = e.currentTarget.dataset.context;
        var elementType = e.currentTarget.dataset.element;

        new IntegrationsElementModal(elementType, {}, type, form);

        // Craft.postActionRequest('formbuilder-integrations/integrations/add-integration', {
        //     index: 'new'+index,
        //     type: type,
        //     form: form,
        // }, $.proxy((function(response, textStatus) {
        //     if (response.success) {
        //         $integrationContainer.append(response.markup)

        //         new IntegrationSection(response.markup, type, form, 'new'+index)
        //     }
        // }), this));
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvaW50ZWdyYXRpb25zLmpzIl0sIm5hbWVzIjpbIkludGVncmF0aW9uc0VsZW1lbnRNb2RhbCIsIkNyYWZ0IiwiQmFzZUVsZW1lbnRTZWxlY3Rvck1vZGFsIiwiZXh0ZW5kIiwiJGludGVncmF0aW9uQ29udGFpbmVyIiwidHlwZSIsImluZGV4IiwiZm9ybSIsImluaXQiLCJlbGVtZW50VHlwZSIsInN0ZXR0aW5ncyIsImJhc2UiLCJzZXR0aW5ncyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIiQiLCJvblNlbGVjdGlvbkNoYW5nZSIsIm9uU2VsZWN0IiwiZWxlbWVudEluZm8iLCJwb3N0QWN0aW9uUmVxdWVzdCIsImVsZW1lbnRJZCIsImlkIiwicHJveHkiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJzdWNjZXNzIiwiYXBwZW5kIiwibWFya3VwIiwiSW50ZWdyYXRpb25TZWN0aW9uIiwiR2FybmlzaCIsIkJhc2UiLCIkY29udGFpbmVyIiwiZWwiLCJvcHRpb25zIiwiZmluZCIsIndpbmRvdyIsIkZvcm1CdWlsZGVyU2VjdGlvbiIsImVhY2giLCJpIiwiT3B0aW9uIiwiJGRvYyIsInJlYWR5Iiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbnRleHQiLCJlbGVtZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QTRCLE9BQTVCLEVBQXFDLGFBQUs7QUFDdENDLFVBQUVDLGNBQUY7QUFDQSxZQUFJdkMsUUFBUU8sS0FBS0MsS0FBTCxDQUFZRCxLQUFLRSxNQUFMLEtBQWdCLEtBQWpCLEdBQTBCLENBQXJDLENBQVo7QUFDQSxZQUFJVixPQUFPdUMsRUFBRUUsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0IxQyxJQUFuQztBQUNBLFlBQUlFLE9BQU9xQyxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsT0FBbkM7QUFDQSxZQUFJdkMsY0FBY21DLEVBQUVFLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCRSxPQUExQzs7QUFFQSxZQUFJakQsd0JBQUosQ0FBNkJTLFdBQTdCLEVBQTBDLEVBQTFDLEVBQThDSixJQUE5QyxFQUFvREUsSUFBcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0gsS0FwQkQ7QUFxQkgsQ0F6QkQsRSIsImZpbGUiOiIvcmVsZWFzZS9zcmMvd2ViL2Fzc2V0cy9qcy9pbnRlZ3JhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJJbnRlZ3JhdGlvbnNFbGVtZW50TW9kYWwgPSBDcmFmdC5CYXNlRWxlbWVudFNlbGVjdG9yTW9kYWwuZXh0ZW5kKHtcbiAgICAkaW50ZWdyYXRpb25Db250YWluZXI6IG51bGwsXG4gICAgdHlwZTogbnVsbCxcbiAgICBpbmRleDogbnVsbCxcbiAgICBmb3JtOiBudWxsLFxuXG4gICAgaW5pdChlbGVtZW50VHlwZSwgc3RldHRpbmdzLCB0eXBlLCBmb3JtKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy5mb3JtID0gZm9ybVxuICAgICAgICB0aGlzLmJhc2UoZWxlbWVudFR5cGUsIHNldHRpbmdzKVxuICAgICAgICB0aGlzLmluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAgKyAxKVxuICAgICAgICBcbiAgICAgICAgdGhpcy4kaW50ZWdyYXRpb25Db250YWluZXIgPSAkKCcjZm9ybWJ1aWxkZXItaW50ZWdyYXRpb25zLWNvbnRhaW5lcicpXG4gICAgfSxcblxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmJhc2UoKVxuICAgIH0sXG5cbiAgICBvblNlbGVjdChlbGVtZW50SW5mbykge1xuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybWJ1aWxkZXItaW50ZWdyYXRpb25zL2ludGVncmF0aW9ucy9hZGQtaW50ZWdyYXRpb24nLCB7XG4gICAgICAgICAgICBpbmRleDogJ25ldycrdGhpcy5pbmRleCxcbiAgICAgICAgICAgIGVsZW1lbnRJZDogZWxlbWVudEluZm9bMF0uaWQsXG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICBmb3JtOiB0aGlzLmZvcm0sXG4gICAgICAgIH0sICQucHJveHkoKGZ1bmN0aW9uKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGludGVncmF0aW9uQ29udGFpbmVyLmFwcGVuZChyZXNwb25zZS5tYXJrdXApXG5cbiAgICAgICAgICAgICAgICBuZXcgSW50ZWdyYXRpb25TZWN0aW9uKHJlc3BvbnNlLm1hcmt1cCwgdGhpcy50eXBlLCB0aGlzLmZvcm0sICduZXcnK3RoaXMuaW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSlcblxuICAgICAgICAvLyBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2ludGVncmF0aW9ucy9hZGQtbm90aWZpY2F0aW9uJywge1xuICAgICAgICAvLyAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgIC8vICAgICBlbGVtZW50SWQ6IGVsZW1lbnRJbmZvWzBdLmlkLFxuICAgICAgICAvLyAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAvLyAgICAgZm9ybTogdGhpcy5mb3JtXG4gICAgICAgIC8vIH0sICQucHJveHkoZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgIC8vICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuJG5vdGlmaWNhdGlvbnNDb250YWluZXIuYXBwZW5kKHJlc3BvbnNlLm1hcmt1cCk7XG5cbiAgICAgICAgLy8gICAgICAgICBuZXcgTm90aWZpY2F0aW9uU2VjdGlvbihyZXNwb25zZS5tYXJrdXAsIHRoaXMudHlwZSwgdGhpcy5mb3JtLCB0aGlzLmluZGV4KTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSwgdGhpcykpO1xuICAgIH1cbn0pO1xuXG5JbnRlZ3JhdGlvblNlY3Rpb24gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgIHR5cGU6IG51bGwsXG4gICAgZm9ybTogbnVsbCxcblxuICAgIGluaXQoZWwsIHR5cGUsIGZvcm0sIGluZGV4KSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoJyNpbnRlZ3JhdGlvbi0nKyB0eXBlICsnLScgKyBpbmRleClcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLmZvcm0gPSBmb3JtXG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLm9wdGlvbi1pdGVtJylcblxuICAgICAgICBuZXcgd2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbigkKCcjaW50ZWdyYXRpb24tJysgdHlwZSArJy0nICsgaW5kZXgpLCB0eXBlKVxuXG4gICAgICAgIG9wdGlvbnMuZWFjaCgoaSwgZWwpID0+IG5ldyB3aW5kb3cuT3B0aW9uKGVsKSlcblxuICAgIH1cbn0pXG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG5cbiAgICAvLyBsZXQgJGludGVncmF0aW9uQ29udGFpbmVyID0gJCgnI2Zvcm1idWlsZGVyLWludGVncmF0aW9ucy1jb250YWluZXInKVxuXG4gICAgJCgnLmludGVncmF0ZS1pdGVtLWJ0bicpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEwMDAwKSArIDEpXG4gICAgICAgIGxldCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZVxuICAgICAgICBsZXQgZm9ybSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbnRleHRcbiAgICAgICAgbGV0IGVsZW1lbnRUeXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuZWxlbWVudDtcblxuICAgICAgICBuZXcgSW50ZWdyYXRpb25zRWxlbWVudE1vZGFsKGVsZW1lbnRUeXBlLCB7fSwgdHlwZSwgZm9ybSlcblxuICAgICAgICAvLyBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybWJ1aWxkZXItaW50ZWdyYXRpb25zL2ludGVncmF0aW9ucy9hZGQtaW50ZWdyYXRpb24nLCB7XG4gICAgICAgIC8vICAgICBpbmRleDogJ25ldycraW5kZXgsXG4gICAgICAgIC8vICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAvLyAgICAgZm9ybTogZm9ybSxcbiAgICAgICAgLy8gfSwgJC5wcm94eSgoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgLy8gICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIC8vICAgICAgICAgJGludGVncmF0aW9uQ29udGFpbmVyLmFwcGVuZChyZXNwb25zZS5tYXJrdXApXG5cbiAgICAgICAgLy8gICAgICAgICBuZXcgSW50ZWdyYXRpb25TZWN0aW9uKHJlc3BvbnNlLm1hcmt1cCwgdHlwZSwgZm9ybSwgJ25ldycraW5kZXgpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pLCB0aGlzKSk7XG4gICAgfSlcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2ludGVncmF0aW9ucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=