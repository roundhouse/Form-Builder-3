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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./development/js/formbuilder.js":
/*!***************************************!*\
  !*** ./development/js/formbuilder.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var UtilityItem;\nUtilityItem = Garnish.Base.extend({\n  $container: null,\n  $btn: null,\n  $loader: null,\n  $badgeContainer: null,\n  $countContainer: null,\n  $menuContainer: null,\n  type: null,\n  count: 0,\n  init: function init(el) {\n    this.$container = $(el);\n    this.type = this.$container.data('type');\n    this.$btn = this.$container.find('.icon');\n    this.$loader = this.$container.find('.loader');\n    this.$badgeContainer = this.$container.find('.fb-badge');\n    this.$countContainer = this.$badgeContainer.find('.count');\n    this.$menuContainer = this.$container.find('.utility-menu');\n\n    if (this.type == 'unread') {\n      this.getUnreadCount();\n    }\n\n    if (this.type == 'notifications') {\n      this.getNotifications();\n    }\n\n    this.addListener(this.$btn, 'click', this.toggleMenu);\n  },\n  getUnreadCount: function getUnreadCount() {\n    var _this = this;\n\n    Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {\n      if (textStatus === 'success') {\n        if (response.totalCount > 0) {\n          _this.$badgeContainer.addClass('show');\n\n          _this.$countContainer.html(response.totalCount);\n\n          _this.$menuContainer.find('.body').html(response.template);\n        } else {\n          _this.$menuContainer.find('.body').html('<p class=\"no-content\">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');\n        }\n      }\n    }, this));\n  },\n  getNotifications: function getNotifications() {\n    this.$menuContainer.find('.body').html('<p class=\"no-content\">' + Craft.t('form-builder', 'No new notifications.') + '</p>');\n  },\n  toggleMenu: function toggleMenu() {\n    if (this.$container.hasClass('active')) {\n      $('.fb-utility-btn').removeClass('active');\n      $('.utility-menu').removeClass('active');\n      this.$btn.parent().removeClass('active');\n      this.$menuContainer.removeClass('active');\n    } else {\n      $('.fb-utility-btn').removeClass('active');\n      $('.utility-menu').removeClass('active');\n      this.$btn.parent().addClass('active');\n      this.$menuContainer.addClass('active');\n    }\n  }\n});\nGarnish.$doc.ready(function () {\n  var _this2 = this;\n\n  $.each($('.fb-utility-btn'), function (i, el) {\n    new UtilityItem(el);\n  });\n  $('.fb-mobile-nav').on('click', function (e) {\n    $(_this2).toggleClass('active');\n    $('body').toggleClass('show-fb-menu');\n  });\n  $('body').on('click', function (e) {\n    target = $(e.target).closest('.utility-menu');\n    btn = $(e.target).closest('.fb-utility-btn');\n\n    if (target.length == 0 && btn.length == 0) {\n      $('.fb-utility-btn').removeClass('active');\n      $('.utility-menu').removeClass('active');\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9qcy9mb3JtYnVpbGRlci5qcz85ODcxIl0sIm5hbWVzIjpbIlV0aWxpdHlJdGVtIiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJGJ0biIsIiRsb2FkZXIiLCIkYmFkZ2VDb250YWluZXIiLCIkY291bnRDb250YWluZXIiLCIkbWVudUNvbnRhaW5lciIsInR5cGUiLCJjb3VudCIsImluaXQiLCJlbCIsIiQiLCJkYXRhIiwiZmluZCIsImdldFVucmVhZENvdW50IiwiZ2V0Tm90aWZpY2F0aW9ucyIsImFkZExpc3RlbmVyIiwidG9nZ2xlTWVudSIsIkNyYWZ0IiwicG9zdEFjdGlvblJlcXVlc3QiLCJwcm94eSIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsInRvdGFsQ291bnQiLCJhZGRDbGFzcyIsImh0bWwiLCJ0ZW1wbGF0ZSIsInQiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwicGFyZW50IiwiJGRvYyIsInJlYWR5IiwiZWFjaCIsImkiLCJvbiIsImUiLCJ0b2dnbGVDbGFzcyIsInRhcmdldCIsImNsb3Nlc3QiLCJidG4iLCJsZW5ndGgiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFdBQUo7QUFFQUEsV0FBVyxHQUFHQyxPQUFPLENBQUNDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUM5QkMsWUFBVSxFQUFFLElBRGtCO0FBRTlCQyxNQUFJLEVBQUUsSUFGd0I7QUFHOUJDLFNBQU8sRUFBRSxJQUhxQjtBQUk5QkMsaUJBQWUsRUFBRSxJQUphO0FBSzlCQyxpQkFBZSxFQUFFLElBTGE7QUFNOUJDLGdCQUFjLEVBQUUsSUFOYztBQVE5QkMsTUFBSSxFQUFFLElBUndCO0FBUzlCQyxPQUFLLEVBQUUsQ0FUdUI7QUFXOUJDLE1BWDhCLGdCQVd6QkMsRUFYeUIsRUFXckI7QUFDTCxTQUFLVCxVQUFMLEdBQWtCVSxDQUFDLENBQUNELEVBQUQsQ0FBbkI7QUFDQSxTQUFLSCxJQUFMLEdBQVks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cyIsInNvdXJjZXNDb250ZW50IjpbImxldCBVdGlsaXR5SXRlbTtcblxuVXRpbGl0eUl0ZW0gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRidG46IG51bGwsXG4gICAgJGxvYWRlcjogbnVsbCxcbiAgICAkYmFkZ2VDb250YWluZXI6IG51bGwsXG4gICAgJGNvdW50Q29udGFpbmVyOiBudWxsLFxuICAgICRtZW51Q29udGFpbmVyOiBudWxsLFxuXG4gICAgdHlwZTogbnVsbCxcbiAgICBjb3VudDogMCxcblxuICAgIGluaXQoZWwpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChlbCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuJGNvbnRhaW5lci5kYXRhKCd0eXBlJylcbiAgICAgICAgdGhpcy4kYnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5pY29uJylcbiAgICAgICAgdGhpcy4kbG9hZGVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5sb2FkZXInKVxuICAgICAgICB0aGlzLiRiYWRnZUNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuZmItYmFkZ2UnKVxuICAgICAgICB0aGlzLiRjb3VudENvbnRhaW5lciA9IHRoaXMuJGJhZGdlQ29udGFpbmVyLmZpbmQoJy5jb3VudCcpXG4gICAgICAgIHRoaXMuJG1lbnVDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnV0aWxpdHktbWVudScpXG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAndW5yZWFkJykge1xuICAgICAgICAgICAgdGhpcy5nZXRVbnJlYWRDb3VudCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdub3RpZmljYXRpb25zJykge1xuICAgICAgICAgICAgdGhpcy5nZXROb3RpZmljYXRpb25zKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kYnRuLCAnY2xpY2snLCB0aGlzLnRvZ2dsZU1lbnUpXG4gICAgfSxcblxuICAgIGdldFVucmVhZENvdW50KCkge1xuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGJhZGdlQ29udGFpbmVyLmFkZENsYXNzKCdzaG93JylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY291bnRDb250YWluZXIuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtZW51Q29udGFpbmVyLmZpbmQoJy5ib2R5JykuaHRtbChyZXNwb25zZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtZW51Q29udGFpbmVyLmZpbmQoJy5ib2R5JykuaHRtbCgnPHAgY2xhc3M9XCJuby1jb250ZW50XCI+JytDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTm8gdW5yZWFkIHN1Ym1pc3Npb25zLicpKyc8L3A+JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSlcbiAgICB9LFxuXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIG5ldyBub3RpZmljYXRpb25zLicpKyc8L3A+JylcbiAgICB9LFxuXG4gICAgdG9nZ2xlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJy5mYi11dGlsaXR5LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgJCgnLnV0aWxpdHktbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kYnRuLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5mYi11dGlsaXR5LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgJCgnLnV0aWxpdHktbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kYnRuLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuR2FybmlzaC4kZG9jLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIFxuICAgICQuZWFjaCgkKCcuZmItdXRpbGl0eS1idG4nKSwgKGksIGVsKSA9PiB7XG4gICAgICAgICBuZXcgVXRpbGl0eUl0ZW0oZWwpXG4gICAgfSk7XG5cbiAgICAkKCcuZmItbW9iaWxlLW5hdicpLm9uKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3Nob3ctZmItbWVudScpXG4gICAgfSlcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgdGFyZ2V0ID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLnV0aWxpdHktbWVudScpXG4gICAgICAgIGJ0biA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5mYi11dGlsaXR5LWJ0bicpXG5cbiAgICAgICAgaWYgKHRhcmdldC5sZW5ndGggPT0gMCAmJiBidG4ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICQoJy5mYi11dGlsaXR5LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgJCgnLnV0aWxpdHktbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB9XG4gICAgfSlcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./development/js/formbuilder.js\n");

/***/ }),

/***/ "./development/scss/formbuilder.scss":
/*!*******************************************!*\
  !*** ./development/scss/formbuilder.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9zY3NzL2Zvcm1idWlsZGVyLnNjc3M/ZWYyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuL2RldmVsb3BtZW50L3Njc3MvZm9ybWJ1aWxkZXIuc2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./development/scss/formbuilder.scss\n");

/***/ }),

/***/ "./development/scss/pages/dashboard.scss":
/*!***********************************************!*\
  !*** ./development/scss/pages/dashboard.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kZXZlbG9wbWVudC9zY3NzL3BhZ2VzL2Rhc2hib2FyZC5zY3NzPzQ4MDYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiLi9kZXZlbG9wbWVudC9zY3NzL3BhZ2VzL2Rhc2hib2FyZC5zY3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./development/scss/pages/dashboard.scss\n");

/***/ }),

/***/ 0:
/*!*************************************************************************************************************************!*\
  !*** multi ./development/js/formbuilder.js ./development/scss/pages/dashboard.scss ./development/scss/formbuilder.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/js/formbuilder.js */"./development/js/formbuilder.js");
__webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/scss/pages/dashboard.scss */"./development/scss/pages/dashboard.scss");
module.exports = __webpack_require__(/*! /Users/owldesign/Formbuilder/plugins/formbuilder/development/scss/formbuilder.scss */"./development/scss/formbuilder.scss");


/***/ })

/******/ });