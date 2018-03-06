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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

var Tag = void 0;

Tag = Garnish.Base.extend({
    $item: null,
    $deleteTag: null,
    init: function init(item) {
        this.$item = $(item);
        this.$deleteTag = this.$item.find('.option-result-delete');

        return this.addListener(this.$deleteTag, 'click', 'delete');
    },
    "delete": function _delete(e) {
        var self = void 0;
        e.preventDefault();
        self = this;
        this.$item.addClass('zap');
        setTimeout(function () {
            self.$item.remove();
            Craft.cp.displayNotice(Craft.t('form-builder', 'Item Removed'));
        }, 300);
    }
});

Garnish.$doc.ready(function () {
    return $('.result-item').each(function (i, el) {
        return new Tag(el);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9zcmMvanMvdGFncy5qcyJdLCJuYW1lcyI6WyJUYWciLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRpdGVtIiwiJGRlbGV0ZVRhZyIsImluaXQiLCJpdGVtIiwiJCIsImZpbmQiLCJhZGRMaXN0ZW5lciIsImUiLCJzZWxmIiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsInNldFRpbWVvdXQiLCJyZW1vdmUiLCJDcmFmdCIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCIkZG9jIiwicmVhZHkiLCJlYWNoIiwiaSIsImVsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsWUFBSjs7QUFFQUEsTUFBTUMsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3RCQyxXQUFPLElBRGU7QUFFdEJDLGdCQUFZLElBRlU7QUFHdEJDLFFBSHNCLGdCQUdqQkMsSUFIaUIsRUFHWDtBQUNQLGFBQUtILEtBQUwsR0FBYUksRUFBRUQsSUFBRixDQUFiO0FBQ0EsYUFBS0YsVUFBTCxHQUFrQixLQUFLRCxLQUFMLENBQVdLLElBQVgsQ0FBZ0IsdUJBQWhCLENBQWxCOztBQUVBLGVBQU8sS0FBS0MsV0FBTCxDQUFpQixLQUFLTCxVQUF0QixFQUFrQyxPQUFsQyxFQUEyQyxRQUEzQyxDQUFQO0FBQ0gsS0FScUI7QUFVdEIsWUFWc0IsbUJBVWJNLENBVmEsRUFVVjtBQUNSLFlBQUlDLGFBQUo7QUFDQUQsVUFBRUUsY0FBRjtBQUNBRCxlQUFPLElBQVA7QUFDQSxhQUFLUixLQUFMLENBQVdVLFFBQVgsQ0FBb0IsS0FBcEI7QUFDQUMsbUJBQVksWUFBTTtBQUNkSCxpQkFBS1IsS0FBTCxDQUFXWSxNQUFYO0FBQ0FDLGtCQUFNQyxFQUFOLENBQVNDLGFBQVQsQ0FBdUJGLE1BQU1HLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGNBQXhCLENBQXZCO0FBQ0gsU0FIRCxFQUdJLEdBSEo7QUFJSDtBQW5CcUIsQ0FBcEIsQ0FBTjs7QUFzQkFuQixRQUFRb0IsSUFBUixDQUFhQyxLQUFiLENBQW1CO0FBQUEsV0FBTWQsRUFBRSxjQUFGLEVBQWtCZSxJQUFsQixDQUF1QixVQUFDQyxDQUFELEVBQUlDLEVBQUo7QUFBQSxlQUFXLElBQUl6QixHQUFKLENBQVF5QixFQUFSLENBQVg7QUFBQSxLQUF2QixDQUFOO0FBQUEsQ0FBbkIsRSIsImZpbGUiOiIvc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9kaXN0L2pzL3RhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJsZXQgVGFnO1xuXG5UYWcgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkaXRlbTogbnVsbCxcbiAgICAkZGVsZXRlVGFnOiBudWxsLFxuICAgIGluaXQoaXRlbSkge1xuICAgICAgICB0aGlzLiRpdGVtID0gJChpdGVtKTtcbiAgICAgICAgdGhpcy4kZGVsZXRlVGFnID0gdGhpcy4kaXRlbS5maW5kKCcub3B0aW9uLXJlc3VsdC1kZWxldGUnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGRlbGV0ZVRhZywgJ2NsaWNrJywgJ2RlbGV0ZScpO1xuICAgIH0sXG5cbiAgICBcImRlbGV0ZVwiKGUpIHtcbiAgICAgICAgbGV0IHNlbGY7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGl0ZW0uYWRkQ2xhc3MoJ3phcCcpO1xuICAgICAgICBzZXRUaW1lb3V0KCgoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLiRpdGVtLnJlbW92ZSgpO1xuICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnSXRlbSBSZW1vdmVkJykpO1xuICAgICAgICB9KSwgMzAwKTtcbiAgICB9XG59KTtcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+ICQoJy5yZXN1bHQtaXRlbScpLmVhY2goKGksIGVsKSA9PiBuZXcgVGFnKGVsKSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9zcmMvanMvdGFncy5qcyJdLCJzb3VyY2VSb290IjoiIn0=