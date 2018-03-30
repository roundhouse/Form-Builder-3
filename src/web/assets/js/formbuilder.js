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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var UtilityItem = void 0;

UtilityItem = Garnish.Base.extend({
    $container: null,
    $btn: null,
    $loader: null,
    $badgeContainer: null,
    $countContainer: null,
    $menuContainer: null,

    type: null,
    count: 0,

    init: function init(el) {
        this.$container = $(el);
        this.type = this.$container.data('type');
        this.$btn = this.$container.find('.icon');
        this.$loader = this.$container.find('.loader');
        this.$badgeContainer = this.$container.find('.fb-badge');
        this.$countContainer = this.$badgeContainer.find('.count');
        this.$menuContainer = this.$container.find('.utility-menu');

        if (this.type == 'unread') {
            this.getUnreadCount();
        }

        if (this.type == 'notifications') {
            this.getNotifications();
        }

        this.addListener(this.$btn, 'click', this.toggleMenu);
    },
    getUnreadCount: function getUnreadCount() {
        var _this = this;

        Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
            if (textStatus === 'success') {
                if (response.totalCount > 0) {
                    _this.$badgeContainer.addClass('show');
                    _this.$countContainer.html(response.totalCount);
                    _this.$menuContainer.find('.body').html(response.template);
                } else {
                    _this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');
                }
            }
        }, this));
    },
    getNotifications: function getNotifications() {
        this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No new notifications.') + '</p>');
    },
    toggleMenu: function toggleMenu() {
        if (this.$container.hasClass('active')) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().removeClass('active');
            this.$menuContainer.removeClass('active');
        } else {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().addClass('active');
            this.$menuContainer.addClass('active');
        }
    }
});

Garnish.$doc.ready(function () {
    var _this2 = this;

    $.each($('.fb-utility-btn'), function (i, el) {
        new UtilityItem(el);
    });

    $('.fb-mobile-nav').on('click', function (e) {
        $(_this2).toggleClass('active');
        $('body').toggleClass('show-fb-menu');
    });

    $('body').on('click', function (e) {
        target = $(e.target).closest('.utility-menu');
        btn = $(e.target).closest('.fb-utility-btn');

        if (target.length == 0 && btn.length == 0) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
        }
    });

    //     Craft.initUiElements();

    //     window.pluginStoreApp = new Vue({
    //         el: '#content'
    //     });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGI2ZWUwOTgzZDRjZmZhMDBlYjEiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZm9ybWJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvc2Nzcy9mb3JtYnVpbGRlci5zY3NzP2JlODIiXSwibmFtZXMiOlsiVXRpbGl0eUl0ZW0iLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRjb250YWluZXIiLCIkYnRuIiwiJGxvYWRlciIsIiRiYWRnZUNvbnRhaW5lciIsIiRjb3VudENvbnRhaW5lciIsIiRtZW51Q29udGFpbmVyIiwidHlwZSIsImNvdW50IiwiaW5pdCIsImVsIiwiJCIsImRhdGEiLCJmaW5kIiwiZ2V0VW5yZWFkQ291bnQiLCJnZXROb3RpZmljYXRpb25zIiwiYWRkTGlzdGVuZXIiLCJ0b2dnbGVNZW51IiwiQ3JhZnQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInByb3h5IiwicmVzcG9uc2UiLCJ0ZXh0U3RhdHVzIiwidG90YWxDb3VudCIsImFkZENsYXNzIiwiaHRtbCIsInRlbXBsYXRlIiwidCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJwYXJlbnQiLCIkZG9jIiwicmVhZHkiLCJlYWNoIiwiaSIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJ0YXJnZXQiLCJlIiwiY2xvc2VzdCIsImJ0biIsImxlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7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QUYsRUFBcUJrQixXQUFyQixDQUFpQyxRQUFqQztBQUNBbEIsY0FBRSxlQUFGLEVBQW1Ca0IsV0FBbkIsQ0FBK0IsUUFBL0I7QUFDSDtBQUNKLEtBUkQ7O0FBVUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0MsQ0ExQkQsRTs7Ozs7O0FDckVBLHlDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2Zvcm1idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGI2ZWUwOTgzZDRjZmZhMDBlYjEiLCJsZXQgVXRpbGl0eUl0ZW1cblxuVXRpbGl0eUl0ZW0gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRidG46IG51bGwsXG4gICAgJGxvYWRlcjogbnVsbCxcbiAgICAkYmFkZ2VDb250YWluZXI6IG51bGwsXG4gICAgJGNvdW50Q29udGFpbmVyOiBudWxsLFxuICAgICRtZW51Q29udGFpbmVyOiBudWxsLFxuXG4gICAgdHlwZTogbnVsbCxcbiAgICBjb3VudDogMCxcblxuICAgIGluaXQoZWwpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChlbCk7XG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMuJGNvbnRhaW5lci5kYXRhKCd0eXBlJylcbiAgICAgICAgdGhpcy4kYnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5pY29uJylcbiAgICAgICAgdGhpcy4kbG9hZGVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5sb2FkZXInKVxuICAgICAgICB0aGlzLiRiYWRnZUNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuZmItYmFkZ2UnKVxuICAgICAgICB0aGlzLiRjb3VudENvbnRhaW5lciA9IHRoaXMuJGJhZGdlQ29udGFpbmVyLmZpbmQoJy5jb3VudCcpXG4gICAgICAgIHRoaXMuJG1lbnVDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnV0aWxpdHktbWVudScpXG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAndW5yZWFkJykge1xuICAgICAgICAgICAgdGhpcy5nZXRVbnJlYWRDb3VudCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50eXBlID09ICdub3RpZmljYXRpb25zJykge1xuICAgICAgICAgICAgdGhpcy5nZXROb3RpZmljYXRpb25zKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kYnRuLCAnY2xpY2snLCB0aGlzLnRvZ2dsZU1lbnUpXG4gICAgfSxcblxuICAgIGdldFVucmVhZENvdW50KCkge1xuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGJhZGdlQ29udGFpbmVyLmFkZENsYXNzKCdzaG93JylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY291bnRDb250YWluZXIuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtZW51Q29udGFpbmVyLmZpbmQoJy5ib2R5JykuaHRtbChyZXNwb25zZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtZW51Q29udGFpbmVyLmZpbmQoJy5ib2R5JykuaHRtbCgnPHAgY2xhc3M9XCJuby1jb250ZW50XCI+JytDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTm8gdW5yZWFkIHN1Ym1pc3Npb25zLicpKyc8L3A+JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSlcbiAgICB9LFxuXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIG5ldyBub3RpZmljYXRpb25zLicpKyc8L3A+JylcbiAgICB9LFxuXG4gICAgdG9nZ2xlTWVudSgpIHtcbiAgICAgICAgaWYgKHRoaXMuJGNvbnRhaW5lci5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJy5mYi11dGlsaXR5LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgJCgnLnV0aWxpdHktbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kYnRuLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5mYi11dGlsaXR5LWJ0bicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgJCgnLnV0aWxpdHktbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kYnRuLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy4kbWVudUNvbnRhaW5lci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH0sXG59KVxuXG5cblxuXG5HYXJuaXNoLiRkb2MucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgJC5lYWNoKCQoJy5mYi11dGlsaXR5LWJ0bicpLCAoaSwgZWwpID0+IHtcbiAgICAgICAgIG5ldyBVdGlsaXR5SXRlbShlbClcbiAgICB9KVxuXG4gICAgJCgnLmZiLW1vYmlsZS1uYXYnKS5vbignY2xpY2snLCBlID0+IHtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdzaG93LWZiLW1lbnUnKVxuICAgIH0pXG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIHRhcmdldCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy51dGlsaXR5LW1lbnUnKVxuICAgICAgICBidG4gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZmItdXRpbGl0eS1idG4nKVxuXG4gICAgICAgIGlmICh0YXJnZXQubGVuZ3RoID09IDAgJiYgYnRuLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAkKCcuZmItdXRpbGl0eS1idG4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICQoJy51dGlsaXR5LW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgfVxuICAgIH0pXG5cbi8vICAgICBDcmFmdC5pbml0VWlFbGVtZW50cygpO1xuXG4vLyAgICAgd2luZG93LnBsdWdpblN0b3JlQXBwID0gbmV3IFZ1ZSh7XG4vLyAgICAgICAgIGVsOiAnI2NvbnRlbnQnXG4vLyAgICAgfSk7XG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2Zvcm1idWlsZGVyLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RldmVsb3BtZW50L3Njc3MvZm9ybWJ1aWxkZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9