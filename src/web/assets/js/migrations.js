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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./development/js/migrations.js":
/*!**************************************!*\
  !*** ./development/js/migrations.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("Garnish.$doc.ready(function () {\n  $('.item-body-header').on('click', function () {\n    var toggler = $(this).find('.toggle-section');\n    var target = $(this).data('target');\n    $('#' + target).slideToggle('fast', function () {\n      toggler.toggleClass('active');\n      $(this).toggleClass('active');\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9qcy9taWdyYXRpb25zLmpzPzliNmEiXSwibmFtZXMiOlsiR2FybmlzaCIsIiRkb2MiLCJyZWFkeSIsIiQiLCJvbiIsInRvZ2dsZXIiLCJmaW5kIiwidGFyZ2V0IiwiZGF0YSIsInNsaWRlVG9nZ2xlIiwidG9nZ2xlQ2xhc3MiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYUMsS0FBYixDQUFtQixZQUFNO0FBQ3JCQyxHQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QkMsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBVztBQUMxQyxRQUFJQyxPQUFPLEdBQUdGLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUcsSUFBUixDQUFhLGlCQUFiLENBQWQ7QUFDQSxRQUFJQyxNQUFNLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUssSUFBUixDQUFhLFFBQWIsQ0FBYjtBQUVBTCxLQUFDLENBQUMsTUFBSUksTUFBTCxDQUFELENBQWNFLFdBQWQsQ0FBMEIsTUFBMUIsRUFBa0MsWUFBVztBQUN6Q0osYUFBTyxDQUFDSyxXQUFSLENBQW9CLFFBQXBCO0FBQ0FQLE9BQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU8sV0FBUixDQUFvQixRQUFwQjtBQUNILEtBSEQ7QUFJSCxHQVJEO0FBU0gsQ0FWRCIsImZpbGUiOiIuL2RldmVsb3BtZW50L2pzL21pZ3JhdGlvbnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJHYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4ge1xuICAgICQoJy5pdGVtLWJvZHktaGVhZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB0b2dnbGVyID0gJCh0aGlzKS5maW5kKCcudG9nZ2xlLXNlY3Rpb24nKTtcbiAgICAgICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XG5cbiAgICAgICAgJCgnIycrdGFyZ2V0KS5zbGlkZVRvZ2dsZSgnZmFzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdG9nZ2xlci50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgfSlcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./development/js/migrations.js\n");

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** multi ./development/js/migrations.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/js/migrations.js */"./development/js/migrations.js");


/***/ })

/******/ });