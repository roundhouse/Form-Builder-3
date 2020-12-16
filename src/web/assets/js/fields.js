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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./development/js/fields.js":
/*!**********************************!*\
  !*** ./development/js/fields.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Field;\nvar Fields;\nwindow.Fields = Garnish.Base.extend({\n  $container: null,\n  $form: null,\n  $body: null,\n  $tagContainer: null,\n  $targetEl: null,\n  $target: null,\n  init: function init(container, form, target) {\n    var self;\n    var tags;\n    var targetClassName;\n    self = this;\n    this.$container = container;\n    this.$form = $(form);\n    this.$body = this.$form.find('.body');\n    this.$tagContainer = $('<div class=\"tags-container\"></div>');\n    this.$body.append(this.$tagContainer);\n    tags = [];\n    $.each($.parseJSON(this.$container.$fields), function (i, item) {\n      return tags[i] = \"<div class='tag-btn tag-\".concat(item.value, \"' data-tag='{\").concat(item.value, \"}'>\").concat(item.label, \"</div>\");\n    });\n    tags.splice(0, 1);\n    this.$tagContainer.html(tags);\n    $.each(this.$container.$inputs, function (i, item) {\n      if (item.tags) {\n        self.$targetEl = item;\n      }\n    });\n    targetClassName = this.$targetEl.name.replace(/[_\\W]+/g, \"-\").slice(0, -1);\n    this.$target = $(\".\".concat(targetClassName));\n    $.each(this.$tagContainer.find('.tag-btn'), function (i, item) {\n      return new Field(item, self.$target);\n    });\n  }\n});\nField = Garnish.Base.extend({\n  $tag: null,\n  $target: null,\n  init: function init(tag, target) {\n    this.$tag = $(tag);\n    this.$target = target;\n    return this.addListener(this.$tag, 'click', 'addTag');\n  },\n  addTag: function addTag() {\n    var tag;\n    tag = this.$tag.data('tag');\n    return this.$target.val(this.$target.val() + tag);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9qcy9maWVsZHMuanM/NWYxOSJdLCJuYW1lcyI6WyJGaWVsZCIsIkZpZWxkcyIsIndpbmRvdyIsIkdhcm5pc2giLCJCYXNlIiwiZXh0ZW5kIiwiJGNvbnRhaW5lciIsIiRmb3JtIiwiJGJvZHkiLCIkdGFnQ29udGFpbmVyIiwiJHRhcmdldEVsIiwiJHRhcmdldCIsImluaXQiLCJjb250YWluZXIiLCJmb3JtIiwidGFyZ2V0Iiwic2VsZiIsInRhZ3MiLCJ0YXJnZXRDbGFzc05hbWUiLCIkIiwiZmluZCIsImFwcGVuZCIsImVhY2giLCJwYXJzZUpTT04iLCIkZmllbGRzIiwiaSIsIml0ZW0iLCJ2YWx1ZSIsImxhYmVsIiwic3BsaWNlIiwiaHRtbCIsIiRpbnB1dHMiLCJuYW1lIiwicmVwbGFjZSIsInNsaWNlIiwiJHRhZyIsInRhZyIsImFkZExpc3RlbmVyIiwiYWRkVGFnIiwiZGF0YSIsInZhbCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsS0FBSjtBQUNBLElBQUlDLE1BQUo7QUFFQUMsTUFBTSxDQUFDRCxNQUFQLEdBQWdCRSxPQUFPLENBQUNDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUNoQ0MsWUFBVSxFQUFFLElBRG9CO0FBRWhDQyxPQUFLLEVBQUUsSUFGeUI7QUFHaENDLE9BQUssRUFBRSxJQUh5QjtBQUloQ0MsZUFBYSxFQUFFLElBSmlCO0FBS2hDQyxXQUFTLEVBQUUsSUFMcUI7QUFNaENDLFNBQU8sRUFBRSxJQU51QjtBQU9oQ0MsTUFQZ0MsZ0JBTzNCQyxTQVAyQixFQU9oQkMsSUFQZ0IsRUFPVkMsTUFQVSxFQU9GO0FBQzFCLFFBQUlDLElBQUo7QUFDQSxRQUFJQyxJQUFKO0FBQ0EsUUFBSUMsZUFBSjtBQUNBRixRQUFJLEdBQUcsSUFBUDtBQUNBLFNBQUtWLFVBQUwsR0FBa0JPLFNBQWxCO0FBQ0EsU0FBS04sS0FBTCxHQUFhWSxDQUFDLENBQUNMLElBQUQsQ0FBZDtBQUNBLFNBQUtOLEtBQUwsR0FBYSxLQUFLRCxLQUFMLENBQVdhLElBQVgsQ0FBZ0IsT0FBaEIsQ0FBYjtBQUNBLFNBQUtYLGFBQUwsR0FBcUJVLENBQUMsQ0FBQyxvQ0FBRCxDQUF0QjtBQUNBLFNBQUtYLEtBQUwsQ0FBV2EsTUFBWCxDQUFrQixLQUFLWixhQUF2QjtBQUNBUSxRQUFJLEdBQUcsRUFBUDtBQUVBRSxLQUFDLENBQUNHLElBQUYsQ0FBT0gsQ0FBQyxDQUFDSSxTQUFGLENBQVksS0FBS2pCLFVBQUwsQ0FBZ0JrQixPQUE1QixDQUFQLEVBQTZDLFVBQUNDLENBQUQsRUFBSUMsSUFBSjtBQUFBLGFBQWFULElBQUksQ0FBQ1EsQ0FBRCxDQUFKLHFDQUFxQ0MsSUFBSSxDQUFDQyxLQUExQywwQkFBK0RELElBQUksQ0FBQ0MsS0FBcEUsZ0JBQStFRCxJQUFJLENBQUNFLEtBQXBGLFdBQWI7QUFBQSxLQUE3QztBQUVBWCxRQUFJLENBQUNZLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZjtBQUNBLFNBQUtwQixhQUFMLENBQW1CcUIsSUFBbkIsQ0FBd0JiLElBQXhCO0FBRUFFLEtBQUMsQ0FBQ0csSUFBRixDQUFPLEtBQUtoQixVQUFMLENBQWdCeUIsT0FBdkIsRUFBZ0MsVUFBQ04sQ0FBRCxFQUFJQyxJQUFKLEVBQWE7QUFDekMsVUFBSUEsSUFBSSxDQUFDVCxJQUFULEVBQWU7QUFDWEQsWUFBSSxDQUFDTixTQUFMLEdBQWlCZ0IsSUFBakI7QUFDSDtBQUNKLEtBSkQ7QUFNQVIsbUJBQWUsR0FBRyxLQUFLUixTQUFMLENBQWVzQixJQUFmLENBQW9CQyxPQUFwQixDQUE0QixTQUE1QixFQUF1QyxHQUF2QyxFQUE0Q0MsS0FBNUMsQ0FBa0QsQ0FBbEQsRUFBcUQsQ0FBQyxDQUF0RCxDQUFsQjtBQUNBLFNBQUt2QixPQUFMLEdBQWVRLENBQUMsWUFBS0QsZUFBTCxFQUFoQjtBQUVBQyxLQUFDLENBQUNHLElBQUYsQ0FBTyxLQUFLYixhQUFMLENBQW1CVyxJQUFuQixDQUF3QixVQUF4QixDQUFQLEVBQTRDLFVBQUNLLENBQUQsRUFBSUMsSUFBSjtBQUFBLGFBQWEsSUFBSTFCLEtBQUosQ0FBVTBCLElBQVYsRUFBZ0JWLElBQUksQ0FBQ0wsT0FBckIsQ0FBYjtBQUFBLEtBQTVDO0FBQ0g7QUFsQytCLENBQXBCLENBQWhCO0FBc0NBWCxLQUFLLEdBQUdHLE9BQU8sQ0FBQ0MsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3hCOEIsTUFBSSxFQUFFLElBRGtCO0FBRXhCeEIsU0FBTyxFQUFFLElBRmU7QUFJeEJDLE1BSndCLGdCQUluQndCLEdBSm1CLEVBSWRyQixNQUpjLEVBSU47QUFDZCxTQUFLb0IsSUFBTCxHQUFZaEIsQ0FBQyxDQUFDaUIsR0FBRCxDQUFiO0FBQ0EsU0FBS3pCLE9BQUwsR0FBZUksTUFBZjtBQUVBLFdBQU8sS0FBS3NCLFdBQUwsQ0FBaUIsS0FBS0YsSUFBdEIsRUFBNEIsT0FBNUIsRUFBcUMsUUFBckMsQ0FBUDtBQUNILEdBVHVCO0FBV3hCRyxRQVh3QixvQkFXZjtBQUNMLFFBQUlGLEdBQUo7QUFDQUEsT0FBRyxHQUFHLEtBQUtELElBQUwsQ0FBVUksSUFBVixDQUFlLEtBQWYsQ0FBTjtBQUVBLFdBQU8sS0FBSzVCLE9BQUwsQ0FBYTZCLEdBQWIsQ0FBaUIsS0FBSzdCLE9BQUwsQ0FBYTZCLEdBQWIsS0FBcUJKLEdBQXRDLENBQVA7QUFDSDtBQWhCdUIsQ0FBcEIsQ0FBUiIsImZpbGUiOiIuL2RldmVsb3BtZW50L2pzL2ZpZWxkcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBGaWVsZDtcbmxldCBGaWVsZHM7XG5cbndpbmRvdy5GaWVsZHMgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRmb3JtOiBudWxsLFxuICAgICRib2R5OiBudWxsLFxuICAgICR0YWdDb250YWluZXI6IG51bGwsXG4gICAgJHRhcmdldEVsOiBudWxsLFxuICAgICR0YXJnZXQ6IG51bGwsXG4gICAgaW5pdChjb250YWluZXIsIGZvcm0sIHRhcmdldCkge1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgbGV0IHRhZ3M7XG4gICAgICAgIGxldCB0YXJnZXRDbGFzc05hbWU7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKGZvcm0pO1xuICAgICAgICB0aGlzLiRib2R5ID0gdGhpcy4kZm9ybS5maW5kKCcuYm9keScpO1xuICAgICAgICB0aGlzLiR0YWdDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwidGFncy1jb250YWluZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgdGhpcy4kYm9keS5hcHBlbmQodGhpcy4kdGFnQ29udGFpbmVyKTtcbiAgICAgICAgdGFncyA9IFtdO1xuXG4gICAgICAgICQuZWFjaCgkLnBhcnNlSlNPTih0aGlzLiRjb250YWluZXIuJGZpZWxkcyksIChpLCBpdGVtKSA9PiB0YWdzW2ldID0gYDxkaXYgY2xhc3M9J3RhZy1idG4gdGFnLSR7aXRlbS52YWx1ZX0nIGRhdGEtdGFnPSd7JHtpdGVtLnZhbHVlfX0nPiR7aXRlbS5sYWJlbH08L2Rpdj5gKTtcbiAgICAgICAgXG4gICAgICAgIHRhZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICB0aGlzLiR0YWdDb250YWluZXIuaHRtbCh0YWdzKTtcbiAgICAgICAgXG4gICAgICAgICQuZWFjaCh0aGlzLiRjb250YWluZXIuJGlucHV0cywgKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnRhZ3MpIHtcbiAgICAgICAgICAgICAgICBzZWxmLiR0YXJnZXRFbCA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRhcmdldENsYXNzTmFtZSA9IHRoaXMuJHRhcmdldEVsLm5hbWUucmVwbGFjZSgvW19cXFddKy9nLCBcIi1cIikuc2xpY2UoMCwgLTEpO1xuICAgICAgICB0aGlzLiR0YXJnZXQgPSAkKGAuJHt0YXJnZXRDbGFzc05hbWV9YCk7XG4gICAgICAgIFxuICAgICAgICAkLmVhY2godGhpcy4kdGFnQ29udGFpbmVyLmZpbmQoJy50YWctYnRuJyksIChpLCBpdGVtKSA9PiBuZXcgRmllbGQoaXRlbSwgc2VsZi4kdGFyZ2V0KSk7XG4gICAgfVxufSk7XG5cblxuRmllbGQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkdGFnOiBudWxsLFxuICAgICR0YXJnZXQ6IG51bGwsXG5cbiAgICBpbml0KHRhZywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuJHRhZyA9ICQodGFnKTtcbiAgICAgICAgdGhpcy4kdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kdGFnLCAnY2xpY2snLCAnYWRkVGFnJyk7XG4gICAgfSxcblxuICAgIGFkZFRhZygpIHtcbiAgICAgICAgbGV0IHRhZztcbiAgICAgICAgdGFnID0gdGhpcy4kdGFnLmRhdGEoJ3RhZycpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRhcmdldC52YWwodGhpcy4kdGFyZ2V0LnZhbCgpICsgdGFnKTtcbiAgICB9XG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./development/js/fields.js\n");

/***/ }),

/***/ 12:
/*!****************************************!*\
  !*** multi ./development/js/fields.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/js/fields.js */"./development/js/fields.js");


/***/ })

/******/ });