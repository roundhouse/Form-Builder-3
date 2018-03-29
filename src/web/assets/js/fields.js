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

        tags.push("<div class='tag-btn tag-date' data-tag='{date}'>Date</div>");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZmllbGRzLmpzIl0sIm5hbWVzIjpbIkZpZWxkIiwiRmllbGRzIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJGZvcm0iLCIkYm9keSIsIiR0YWdDb250YWluZXIiLCIkdGFyZ2V0RWwiLCIkdGFyZ2V0IiwiaW5pdCIsImNvbnRhaW5lciIsImZvcm0iLCJ0YXJnZXQiLCJzZWxmIiwidGFncyIsInRhcmdldENsYXNzTmFtZSIsIiQiLCJmaW5kIiwiYXBwZW5kIiwiZWFjaCIsInBhcnNlSlNPTiIsIiRmaWVsZHMiLCJpIiwiaXRlbSIsInZhbHVlIiwibGFiZWwiLCJwdXNoIiwic3BsaWNlIiwiaHRtbCIsIiRpbnB1dHMiLCJuYW1lIiwicmVwbGFjZSIsInNsaWNlIiwiJHRhZyIsInRhZyIsImFkZExpc3RlbmVyIiwiYWRkVGFnIiwiZGF0YSIsInZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLGNBQUo7QUFDQSxJQUFJQyxlQUFKOztBQUVBQyxPQUFPRCxNQUFQLEdBQWdCRSxRQUFRQyxJ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cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NDQ0YTMyYzA4MzAyNGFlMGE5OCIsImxldCBGaWVsZDtcbmxldCBGaWVsZHM7XG5cbndpbmRvdy5GaWVsZHMgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRmb3JtOiBudWxsLFxuICAgICRib2R5OiBudWxsLFxuICAgICR0YWdDb250YWluZXI6IG51bGwsXG4gICAgJHRhcmdldEVsOiBudWxsLFxuICAgICR0YXJnZXQ6IG51bGwsXG4gICAgaW5pdChjb250YWluZXIsIGZvcm0sIHRhcmdldCkge1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgbGV0IHRhZ3M7XG4gICAgICAgIGxldCB0YXJnZXRDbGFzc05hbWU7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKGZvcm0pO1xuICAgICAgICB0aGlzLiRib2R5ID0gdGhpcy4kZm9ybS5maW5kKCcuYm9keScpO1xuICAgICAgICB0aGlzLiR0YWdDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwidGFncy1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kdGFnQ29udGFpbmVyKTtcbiAgICAgICAgdGFncyA9IFtdO1xuXG4gICAgICAgICQuZWFjaCgkLnBhcnNlSlNPTih0aGlzLiRjb250YWluZXIuJGZpZWxkcyksIChpLCBpdGVtKSA9PiB0YWdzW2ldID0gYDxkaXYgY2xhc3M9J3RhZy1idG4gdGFnLSR7aXRlbS52YWx1ZX0nIGRhdGEtdGFnPSd7JHtpdGVtLnZhbHVlfX0nPiR7aXRlbS5sYWJlbH08L2Rpdj5gKTtcbiAgICAgICAgXG4gICAgICAgIHRhZ3MucHVzaChcIjxkaXYgY2xhc3M9J3RhZy1idG4gdGFnLWRhdGUnIGRhdGEtdGFnPSd7ZGF0ZX0nPkRhdGU8L2Rpdj5cIik7XG4gICAgICAgIHRhZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICB0aGlzLiR0YWdDb250YWluZXIuaHRtbCh0YWdzKTtcbiAgICAgICAgXG4gICAgICAgICQuZWFjaCh0aGlzLiRjb250YWluZXIuJGlucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR0YXJnZXRFbCA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhcmdldENsYXNzTmFtZSA9IHRoaXMuJHRhcmdldEVsLm5hbWUucmVwbGFjZSgvW19cXFddKy9nLCBcIi1cIikuc2xpY2UoMCwgLTEpO1xuICAgICAgICB0aGlzLiR0YXJnZXQgPSAkKGAuJHt0YXJnZXRDbGFzc05hbWV9YCk7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2godGhpcy4kdGFnQ29udGFpbmVyLmZpbmQoJy50YWctYnRuJyksIChpLCBpdGVtKSA9PiBuZXcgRmllbGQoaXRlbSwgc2VsZi4kdGFyZ2V0KSk7XG4gICAgfVxufSk7XG5cblxuRmllbGQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkdGFnOiBudWxsLFxuICAgICR0YXJnZXQ6IG51bGwsXG5cbiAgICBpbml0KHRhZywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuJHRhZyA9ICQodGFnKTtcbiAgICAgICAgdGhpcy4kdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kdGFnLCAnY2xpY2snLCAnYWRkVGFnJyk7XG4gICAgfSxcblxuICAgIGFkZFRhZygpIHtcbiAgICAgICAgbGV0IHRhZztcbiAgICAgICAgdGFnID0gdGhpcy4kdGFnLmRhdGEoJ3RhZycpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRhcmdldC52YWwodGhpcy4kdGFyZ2V0LnZhbCgpICsgdGFnKTtcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9maWVsZHMuanMiXSwic291cmNlUm9vdCI6IiJ9