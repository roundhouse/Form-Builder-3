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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26);


/***/ }),

/***/ 26:
/***/ (function(module, exports) {

var Field = void 0;
var Fields = void 0;

window.Fields = Garnish.Base.extend({
    $container: null,
    $form: null,
    $body: null,
    $tagContainer: null,
    $targetEl: null,
    $target: null,
    init: function init(container, form, target) {
        var self = void 0;
        var tags = void 0;
        var targetClassName = void 0;
        self = this;
        this.$container = container;
        this.$form = $(form);
        this.$body = this.$form.find('.body');
        this.$tagContainer = $('<div class="tags-container"></div>');
        this.$body.append(this.$tagContainer);
        tags = [];

        $.each($.parseJSON(this.$container.$fields), function (i, item) {
            return tags[i] = '<div class=\'tag-btn tag-' + item.value + '\' data-tag=\'{' + item.value + '}\'>' + item.label + '</div>';
        });

        tags.splice(0, 1);
        this.$tagContainer.html(tags);

        $.each(this.$container.$inputs, function (i, item) {
            if (item.tags) {
                self.$targetEl = item;
            }
        });

        targetClassName = this.$targetEl.name.replace(/[_\W]+/g, "-").slice(0, -1);
        this.$target = $('.' + targetClassName);

        $.each(this.$tagContainer.find('.tag-btn'), function (i, item) {
            return new Field(item, self.$target);
        });
    }
});

Field = Garnish.Base.extend({
    $tag: null,
    $target: null,

    init: function init(tag, target) {
        this.$tag = $(tag);
        this.$target = target;

        return this.addListener(this.$tag, 'click', 'addTag');
    },
    addTag: function addTag() {
        var tag = void 0;
        tag = this.$tag.data('tag');

        return this.$target.val(this.$target.val() + tag);
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZmllbGRzLmpzIl0sIm5hbWVzIjpbIkZpZWxkIiwiRmllbGRzIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJGZvcm0iLCIkYm9keSIsIiR0YWdDb250YWluZXIiLCIkdGFyZ2V0RWwiLCIkdGFyZ2V0IiwiaW5pdCIsImNvbnRhaW5lciIsImZvcm0iLCJ0YXJnZXQiLCJzZWxmIiwidGFncyIsInRhcmdldENsYXNzTmFtZSIsIiQiLCJmaW5kIiwiYXBwZW5kIiwiZWFjaCIsInBhcnNlSlNPTiIsIiRmaWVsZHMiLCJpIiwiaXRlbSIsInZhbHVlIiwibGFiZWwiLCJzcGxpY2UiLCJodG1sIiwiJGlucHV0cyIsIm5hbWUiLCJyZXBsYWNlIiwic2xpY2UiLCIkdGFnIiwidGFnIiwiYWRkTGlzdGVuZXIiLCJhZGRUYWciLCJkYXRhIiwidmFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsY0FBSjtBQUNBLElBQUlDLGVBQUo7O0FBRUFDLE9BQU9ELE1BQVAsR0FBZ0JFLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUNoQ0MsZ0JBQVksSUFEb0I7QUFFaENDLFdBQU8sSUFGeUI7QUFHaENDLFdBQU8sSUFIeUI7QUFJaENDLG1CQUFlLElBSmlCO0FBS2hDQyxlQUFXLElBTHFCO0FBTWhDQyxhQUFTLElBTnVCO0FBT2hDQyxRQVBnQyxnQkFPM0JDLFNBUDJCLEVBT2hCQyxJQVBnQixFQU9WQyxNQVBVLEVBT0Y7QUFDMUIsWUFBSUMsYUFBSjtBQUNBLFlBQUlDLGFBQUo7QUFDQSxZQUFJQyx3QkFBSjtBQUNBRixlQUFPLElBQVA7QUFDQSxhQUFLVixVQUFMLEdBQWtCTyxTQUFsQjtBQUNBLGFBQUtOLEtBQUwsR0FBYVksRUFBRUwsSUFBRixDQUFiO0FBQ0EsYUFBS04sS0FBTCxHQUFhLEtBQUtELEtBQUwsQ0FBV2EsSUFBWCxDQUFnQixPQUFoQixDQUFiO0FBQ0EsYUFBS1gsYUFBTCxHQUFxQlUsRUFBRSxvQ0FBRixDQUFyQjtBQUNBLGFBQUtYLEtBQUwsQ0FBV2EsTUFBWCxDQUFrQixLQUFLWixhQUF2QjtBQUNBUSxlQUFPLEVBQVA7O0FBRUFFLFVBQUVHLElBQUYsQ0FBT0gsRUFBRUksU0FBRixDQUFZLEtBQUtqQixVQUFMLENBQWdCa0IsT0FBNUIsQ0FBUCxFQUE2QyxVQUFDQyxDQUFELEVBQUlDLElBQUo7QUFBQSxtQkFBYVQsS0FBS1EsQ0FBTCxrQ0FBcUNDLEtBQUtDLEtBQTFDLHVCQUErREQsS0FBS0MsS0FBcEUsWUFBK0VELEtBQUtFLEtBQXBGLFdBQWI7QUFBQSxTQUE3Qzs7QUFFQVgsYUFBS1ksTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmO0FBQ0EsYUFBS3BCLGFBQUwsQ0FBbUJxQixJQUFuQixDQUF3QmIsSUFBeEI7O0FBRUFFLFVBQUVHLElBQUYsQ0FBTyxLQUFLaEIsVUFBTCxDQUFnQnlCLE9BQXZCLEVBQWdDLFVBQUNOLENBQUQsRUFBSUMsSUFBSixFQUFhO0FBQ3pDLGdCQUFJQSxLQUFLVCxJQUFULEVBQWU7QUFDWEQscUJBQUtOLFNBQUwsR0FBaUJnQixJQUFqQjtBQUNIO0FBQ0osU0FKRDs7QUFNQVIsMEJBQWtCLEtBQUtSLFNBQUwsQ0FBZXNCLElBQWYsQ0FBb0JDLE9BQXBCLENBQTRCLFNBQTVCLEVBQXVDLEdBQXZDLEVBQTRDQyxLQUE1QyxDQUFrRCxDQUFsRCxFQUFxRCxDQUFDLENBQXRELENBQWxCO0FBQ0EsYUFBS3ZCLE9BQUwsR0FBZVEsUUFBTUQsZUFBTixDQUFmOztBQUVBQyxVQUFFRyxJQUFGLENBQU8sS0FBS2IsYUFBTCxDQUFtQlcsSUFBbkIsQ0FBd0IsVUFBeEIsQ0FBUCxFQUE0QyxVQUFDSyxDQUFELEVBQUlDLElBQUo7QUFBQSxtQkFBYSxJQUFJMUIsS0FBSixDQUFVMEIsSUFBVixFQUFnQlYsS0FBS0wsT0FBckIsQ0FBYjtBQUFBLFNBQTVDO0FBQ0g7QUFsQytCLENBQXBCLENBQWhCOztBQXNDQVgsUUFBUUcsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3hCOEIsVUFBTSxJQURrQjtBQUV4QnhCLGFBQVMsSUFGZTs7QUFJeEJDLFFBSndCLGdCQUluQndCLEdBSm1CLEVBSWRyQixNQUpjLEVBSU47QUFDZCxhQUFLb0IsSUFBTCxHQUFZaEIsRUFBRWlCLEdBQUYsQ0FBWjtBQUNBLGFBQUt6QixPQUFMLEdBQWVJLE1BQWY7O0FBRUEsZUFBTyxLQUFLc0IsV0FBTCxDQUFpQixLQUFLRixJQUF0QixFQUE0QixPQUE1QixFQUFxQyxRQUFyQyxDQUFQO0FBQ0gsS0FUdUI7QUFXeEJHLFVBWHdCLG9CQVdmO0FBQ0wsWUFBSUYsWUFBSjtBQUNBQSxjQUFNLEtBQUtELElBQUwsQ0FBVUksSUFBVixDQUFlLEtBQWYsQ0FBTjs7QUFFQSxlQUFPLEtBQUs1QixPQUFMLENBQWE2QixHQUFiLENBQWlCLEtBQUs3QixPQUFMLENBQWE2QixHQUFiLEtBQXFCSixHQUF0QyxDQUFQO0FBQ0g7QUFoQnVCLENBQXBCLENBQVIsQyIsImZpbGUiOiIvcmVsZWFzZS9zcmMvd2ViL2Fzc2V0cy9qcy9maWVsZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODM2Nzg4OThhZTc3YjhmM2Y0ZTkiLCJsZXQgRmllbGQ7XG5sZXQgRmllbGRzO1xuXG53aW5kb3cuRmllbGRzID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICAkZm9ybTogbnVsbCxcbiAgICAkYm9keTogbnVsbCxcbiAgICAkdGFnQ29udGFpbmVyOiBudWxsLFxuICAgICR0YXJnZXRFbDogbnVsbCxcbiAgICAkdGFyZ2V0OiBudWxsLFxuICAgIGluaXQoY29udGFpbmVyLCBmb3JtLCB0YXJnZXQpIHtcbiAgICAgICAgbGV0IHNlbGY7XG4gICAgICAgIGxldCB0YWdzO1xuICAgICAgICBsZXQgdGFyZ2V0Q2xhc3NOYW1lO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLiRmb3JtID0gJChmb3JtKTtcbiAgICAgICAgdGhpcy4kYm9keSA9IHRoaXMuJGZvcm0uZmluZCgnLmJvZHknKTtcbiAgICAgICAgdGhpcy4kdGFnQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInRhZ3MtY29udGFpbmVyXCI+PC9kaXY+Jyk7XG4gICAgICAgIHRoaXMuJGJvZHkuYXBwZW5kKHRoaXMuJHRhZ0NvbnRhaW5lcik7XG4gICAgICAgIHRhZ3MgPSBbXTtcblxuICAgICAgICAkLmVhY2goJC5wYXJzZUpTT04odGhpcy4kY29udGFpbmVyLiRmaWVsZHMpLCAoaSwgaXRlbSkgPT4gdGFnc1tpXSA9IGA8ZGl2IGNsYXNzPSd0YWctYnRuIHRhZy0ke2l0ZW0udmFsdWV9JyBkYXRhLXRhZz0neyR7aXRlbS52YWx1ZX19Jz4ke2l0ZW0ubGFiZWx9PC9kaXY+YCk7XG4gICAgICAgIFxuICAgICAgICB0YWdzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgdGhpcy4kdGFnQ29udGFpbmVyLmh0bWwodGFncyk7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2godGhpcy4kY29udGFpbmVyLiRpbnB1dHMsIChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS50YWdzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi4kdGFyZ2V0RWwgPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0YXJnZXRDbGFzc05hbWUgPSB0aGlzLiR0YXJnZXRFbC5uYW1lLnJlcGxhY2UoL1tfXFxXXSsvZywgXCItXCIpLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdGhpcy4kdGFyZ2V0ID0gJChgLiR7dGFyZ2V0Q2xhc3NOYW1lfWApO1xuICAgICAgICBcbiAgICAgICAgJC5lYWNoKHRoaXMuJHRhZ0NvbnRhaW5lci5maW5kKCcudGFnLWJ0bicpLCAoaSwgaXRlbSkgPT4gbmV3IEZpZWxkKGl0ZW0sIHNlbGYuJHRhcmdldCkpO1xuICAgIH1cbn0pO1xuXG5cbkZpZWxkID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJHRhZzogbnVsbCxcbiAgICAkdGFyZ2V0OiBudWxsLFxuXG4gICAgaW5pdCh0YWcsIHRhcmdldCkge1xuICAgICAgICB0aGlzLiR0YWcgPSAkKHRhZyk7XG4gICAgICAgIHRoaXMuJHRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHRhZywgJ2NsaWNrJywgJ2FkZFRhZycpO1xuICAgIH0sXG5cbiAgICBhZGRUYWcoKSB7XG4gICAgICAgIGxldCB0YWc7XG4gICAgICAgIHRhZyA9IHRoaXMuJHRhZy5kYXRhKCd0YWcnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLiR0YXJnZXQudmFsKHRoaXMuJHRhcmdldC52YWwoKSArIHRhZyk7XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvZmllbGRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==