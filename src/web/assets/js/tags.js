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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./development/js/tags.js":
/*!********************************!*\
  !*** ./development/js/tags.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var Tag;\nwindow.Tag = Garnish.Base.extend({\n  $item: null,\n  $deleteTag: null,\n  init: function init(item) {\n    this.$item = $(item);\n    this.$deleteTag = this.$item.find('.option-result-delete');\n    return this.addListener(this.$deleteTag, 'click', 'delete');\n  },\n  \"delete\": function _delete(e) {\n    var self;\n    e.preventDefault();\n    self = this;\n    this.$item.addClass('zap');\n    setTimeout(function () {\n      self.$item.remove();\n      Craft.cp.displayNotice(Craft.t('form-builder', 'Item Removed'));\n    }, 300);\n  }\n});\nGarnish.$doc.ready(function () {\n  return $('.result-item').each(function (i, el) {\n    return new window.Tag(el);\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9qcy90YWdzLmpzPzAyMDciXSwibmFtZXMiOlsiVGFnIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkaXRlbSIsIiRkZWxldGVUYWciLCJpbml0IiwiaXRlbSIsIiQiLCJmaW5kIiwiYWRkTGlzdGVuZXIiLCJlIiwic2VsZiIsInByZXZlbnREZWZhdWx0IiwiYWRkQ2xhc3MiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiQ3JhZnQiLCJjcCIsImRpc3BsYXlOb3RpY2UiLCJ0IiwiJGRvYyIsInJlYWR5IiwiZWFjaCIsImkiLCJlbCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsR0FBSjtBQUVBQyxNQUFNLENBQUNELEdBQVAsR0FBYUUsT0FBTyxDQUFDQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDN0JDLE9BQUssRUFBRSxJQURzQjtBQUU3QkMsWUFBVSxFQUFFLElBRmlCO0FBRzdCQyxNQUg2QixnQkFHeEJDLElBSHdCLEVBR2xCO0FBQ1AsU0FBS0gsS0FBTCxHQUFhSSxDQUFDLENBQUNELElBQUQsQ0FBZDtBQUNBLFNBQUtGLFVBQUwsR0FBa0IsS0FBS0QsS0FBTCxDQUFXSyxJQUFYLENBQWdCLHVCQUFoQixDQUFsQjtBQUVBLFdBQU8sS0FBS0MsV0FBTCxDQUFpQixLQUFLTCxVQUF0QixFQUFrQyxPQUFsQyxFQUEyQyxRQUEzQyxDQUFQO0FBQ0gsR0FSNEI7QUFVN0IsVUFWNkIsbUJBVXBCTSxDQVZvQixFQVVqQjtBQUNSLFFBQUlDLElBQUo7QUFDQUQsS0FBQyxDQUFDRSxjQUFGO0FBQ0FELFFBQUksR0FBRyxJQUFQO0FBQ0EsU0FBS1IsS0FBTCxDQUFXVSxRQUFYLENBQW9CLEtBQXBCO0FBQ0FDLGNBQVUsQ0FBRSxZQUFNO0FBQ2RILFVBQUksQ0FBQ1IsS0FBTCxDQUFXWSxNQUFYO0FBQ0FDLFdBQUssQ0FBQ0MsRUFBTixDQUFTQyxhQUFULENBQXVCRixLQUFLLENBQUNHLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGNBQXhCLENBQXZCO0FBQ0gsS0FIUyxFQUdOLEdBSE0sQ0FBVjtBQUlIO0FBbkI0QixDQUFwQixDQUFiO0FBc0JBbkIsT0FBTyxDQUFDb0IsSUFBUixDQUFhQyxLQUFiLENBQW1CO0FBQUEsU0FBTWQsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQmUsSUFBbEIsQ0FBdUIsVUFBQ0MsQ0FBRCxFQUFJQyxFQUFKO0FBQUEsV0FBVyxJQUFJekIsTUFBTSxDQUFDRCxHQUFYLENBQWUwQixFQUFmLENBQVg7QUFBQSxHQUF2QixDQUFOO0FBQUEsQ0FBbkIiLCJmaWxlIjoiLi9kZXZlbG9wbWVudC9qcy90YWdzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFRhZztcblxud2luZG93LlRhZyA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRpdGVtOiBudWxsLFxuICAgICRkZWxldGVUYWc6IG51bGwsXG4gICAgaW5pdChpdGVtKSB7XG4gICAgICAgIHRoaXMuJGl0ZW0gPSAkKGl0ZW0pO1xuICAgICAgICB0aGlzLiRkZWxldGVUYWcgPSB0aGlzLiRpdGVtLmZpbmQoJy5vcHRpb24tcmVzdWx0LWRlbGV0ZScpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZGVsZXRlVGFnLCAnY2xpY2snLCAnZGVsZXRlJyk7XG4gICAgfSxcblxuICAgIFwiZGVsZXRlXCIoZSkge1xuICAgICAgICBsZXQgc2VsZjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kaXRlbS5hZGRDbGFzcygnemFwJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuJGl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdJdGVtIFJlbW92ZWQnKSk7XG4gICAgICAgIH0pLCAzMDApO1xuICAgIH1cbn0pO1xuXG5HYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4gJCgnLnJlc3VsdC1pdGVtJykuZWFjaCgoaSwgZWwpID0+IG5ldyB3aW5kb3cuVGFnKGVsKSkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./development/js/tags.js\n");

/***/ }),

/***/ 11:
/*!**************************************!*\
  !*** multi ./development/js/tags.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/js/tags.js */"./development/js/tags.js");


/***/ })

/******/ });