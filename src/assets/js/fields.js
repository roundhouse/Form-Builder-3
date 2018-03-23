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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),

/***/ 24:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI1NDQ2NjFmYTU3MzM3MjZkZGMiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZmllbGRzLmpzIl0sIm5hbWVzIjpbIkZpZWxkIiwiRmllbGRzIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJGZvcm0iLCIkYm9keSIsIiR0YWdDb250YWluZXIiLCIkdGFyZ2V0RWwiLCIkdGFyZ2V0IiwiaW5pdCIsImNvbnRhaW5lciIsImZvcm0iLCJ0YXJnZXQiLCJzZWxmIiwidGFncyIsInRhcmdldENsYXNzTmFtZSIsIiQiLCJmaW5kIiwiYXBwZW5kIiwiZWFjaCIsInBhcnNlSlNPTiIsIiRmaWVsZHMiLCJpIiwiaXRlbSIsInZhbHVlIiwibGFiZWwiLCJwdXNoIiwic3BsaWNlIiwiaHRtbCIsIiRpbnB1dHMiLCJuYW1lIiwicmVwbGFjZSIsInNsaWNlIiwiJHRhZyIsInRhZyIsImFkZExpc3RlbmVyIiwiYWRkVGFnIiwiZGF0YSIsInZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLGNBQUo7QUFDQSxJQUFJQyxlQUFKOztBQUVBQyxPQUFPRCxNQUFQLEdBQWdCRSxRQUFRQyxJ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Iiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkyNTQ0NjYxZmE1NzMzNzI2ZGRjIiwibGV0IEZpZWxkO1xubGV0IEZpZWxkcztcblxud2luZG93LkZpZWxkcyA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRjb250YWluZXI6IG51bGwsXG4gICAgJGZvcm06IG51bGwsXG4gICAgJGJvZHk6IG51bGwsXG4gICAgJHRhZ0NvbnRhaW5lcjogbnVsbCxcbiAgICAkdGFyZ2V0RWw6IG51bGwsXG4gICAgJHRhcmdldDogbnVsbCxcbiAgICBpbml0KGNvbnRhaW5lciwgZm9ybSwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBzZWxmO1xuICAgICAgICBsZXQgdGFncztcbiAgICAgICAgbGV0IHRhcmdldENsYXNzTmFtZTtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoZm9ybSk7XG4gICAgICAgIHRoaXMuJGJvZHkgPSB0aGlzLiRmb3JtLmZpbmQoJy5ib2R5Jyk7XG4gICAgICAgIHRoaXMuJHRhZ0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJ0YWdzLWNvbnRhaW5lclwiPjwvZGl2PicpO1xuICAgICAgICB0aGlzLiRib2R5LmFwcGVuZCh0aGlzLiR0YWdDb250YWluZXIpO1xuICAgICAgICB0YWdzID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQucGFyc2VKU09OKHRoaXMuJGNvbnRhaW5lci4kZmllbGRzKSwgKGksIGl0ZW0pID0+IHRhZ3NbaV0gPSBgPGRpdiBjbGFzcz0ndGFnLWJ0biB0YWctJHtpdGVtLnZhbHVlfScgZGF0YS10YWc9J3ske2l0ZW0udmFsdWV9fSc+JHtpdGVtLmxhYmVsfTwvZGl2PmApO1xuICAgICAgICBcbiAgICAgICAgdGFncy5wdXNoKFwiPGRpdiBjbGFzcz0ndGFnLWJ0biB0YWctZGF0ZScgZGF0YS10YWc9J3tkYXRlfSc+RGF0ZTwvZGl2PlwiKTtcbiAgICAgICAgdGFncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIHRoaXMuJHRhZ0NvbnRhaW5lci5odG1sKHRhZ3MpO1xuICAgICAgICBcbiAgICAgICAgJC5lYWNoKHRoaXMuJGNvbnRhaW5lci4kaW5wdXRzLCAoaSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udGFncykge1xuICAgICAgICAgICAgICAgIHNlbGYuJHRhcmdldEVsID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFyZ2V0Q2xhc3NOYW1lID0gdGhpcy4kdGFyZ2V0RWwubmFtZS5yZXBsYWNlKC9bX1xcV10rL2csIFwiLVwiKS5zbGljZSgwLCAtMSk7XG4gICAgICAgIHRoaXMuJHRhcmdldCA9ICQoYC4ke3RhcmdldENsYXNzTmFtZX1gKTtcbiAgICAgICAgXG4gICAgICAgICQuZWFjaCh0aGlzLiR0YWdDb250YWluZXIuZmluZCgnLnRhZy1idG4nKSwgKGksIGl0ZW0pID0+IG5ldyBGaWVsZChpdGVtLCBzZWxmLiR0YXJnZXQpKTtcbiAgICB9XG59KTtcblxuXG5GaWVsZCA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICR0YWc6IG51bGwsXG4gICAgJHRhcmdldDogbnVsbCxcblxuICAgIGluaXQodGFnLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy4kdGFnID0gJCh0YWcpO1xuICAgICAgICB0aGlzLiR0YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiR0YWcsICdjbGljaycsICdhZGRUYWcnKTtcbiAgICB9LFxuXG4gICAgYWRkVGFnKCkge1xuICAgICAgICBsZXQgdGFnO1xuICAgICAgICB0YWcgPSB0aGlzLiR0YWcuZGF0YSgndGFnJyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy4kdGFyZ2V0LnZhbCh0aGlzLiR0YXJnZXQudmFsKCkgKyB0YWcpO1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2ZpZWxkcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=