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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

var FormBuilderSection = void 0;

window.FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    // $actionMenu: null,
    $collapserBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,
    type: null,
    $delete: null,

    init: function init(el, type) {
        var menuBtn = void 0;
        this.type = type;
        this.$container = $(el);
        this.$menuBtn = this.$container.find('.actions > .settings');
        this.$collapserBtn = this.$container.find('.actions > .bodytoggle');
        this.$sectionToggleInput = this.$container.find('.section-toggle');
        this.$titlebar = this.$container.find('.titlebar');
        this.$fieldsContainer = this.$container.find('.body');
        this.$optionsContainer = this.$container.find('.body-options');
        this.$previewContainer = this.$container.find('.preview');
        this.$status = this.$container.find('.actions > .status');
        this.$delete = this.$container.find('.delete-btn');

        // menuBtn = new Garnish.MenuBtn(this.$menuBtn);
        // this.$actionMenu = menuBtn.menu.$container;
        // menuBtn.menu.settings.onOptionSelect = $.proxy(this, 'onMenuOptionSelect');

        if (Garnish.hasAttr(this.$container, 'data-collapsed')) {
            this.collapse();
        }

        this._handleTitleBarClick = function (ev) {
            ev.preventDefault();
            return this.toggle();
        };

        this.addListener(this.$delete, 'click', this.delete);
        this.addListener(this.$collapserBtn, 'click', this.toggle);
        this.addListener(this.$titlebar, 'doubletap', this._handleTitleBarClick);
    },
    toggle: function toggle() {
        if (this.collapsed) {
            return this.expand();
        } else {
            this.$sectionToggleInput.prop('checked', true);
            return this.collapse(true);
        }
    },
    collapse: function collapse(animate) {
        var $customTemplates = void 0;
        var $fields = void 0;
        var previewHtml = void 0;
        var title = void 0;

        this.$sectionToggleInput.prop('checked', true);
        if (this.collapsed) {
            return;
        }

        this.$container.addClass('bodycollapsed');
        previewHtml = '';
        title = this.$titlebar.find('.tout-title').text();

        this.$previewContainer.html(previewHtml);
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');

        if (animate) {
            this.$fieldsContainer.velocity('fadeOut', {
                duration: 'fast'
            });

            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$previewContainer.show();
            this.$fieldsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
        //     return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        // }), this), 200);

        return this.collapsed = true;
    },
    expand: function expand() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        this.$sectionToggleInput.prop('checked', false);
        if (!this.collapsed) {
            return;
        }
        this.$container.removeClass('bodycollapsed');
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$fieldsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);

        this.$fieldsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });

        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy(function () {
            return this.$container.height('auto');
        }, this));

        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=collapse]:first').parent().removeClass('hidden');
        //     return this.$actionMenu.find('a[data-action=expand]:first').parent().addClass('hidden');
        // }), this), 200);

        return this.collapsed = false;
    },
    disable: function disable() {
        this.$fieldsContainer.find('.enable-integration-section').prop('checked', false);
        this.$status.removeClass('on');
        this.$status.addClass('off');
        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=disable]:first').parent().addClass('hidden');
        //     return this.$actionMenu.find('a[data-action=enable]:first').parent().removeClass('hidden');
        // }), this), 200);

        return this.collapse(true);
    },
    enable: function enable() {
        this.$fieldsContainer.find('.enable-integration-section').prop('checked', true);
        this.$status.removeClass('off');
        this.$status.addClass('on');
        // return setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=disable]:first').parent().removeClass('hidden');
        //     return this.$actionMenu.find('a[data-action=enable]:first').parent().addClass('hidden');
        // }), this), 200);
    },
    "delete": function _delete() {
        return this.$container.remove();
    },
    settings: function settings() {
        if (!this.modal) {
            return this.modal = new SettingsModal(this);
        } else {
            return this.modal.show();
        }
    },
    updateSectionSettings: function updateSectionSettings() {
        return $.each(this.modal.$modalInputs, $.proxy(function (i, input) {
            var value = void 0;
            value = $(input).val();
            if (value !== '') {
                return this.$container.prepend($(input).addClass('hidden'));
            }
        }, this));
    },
    onMenuOptionSelect: function onMenuOptionSelect(option) {
        var $option = void 0;
        $option = $(option);

        switch ($option.data('action')) {
            case 'collapse':
                return this.collapse(true);
            case 'expand':
                return this.expand();
            case 'disable':
                return this.disable();
            case 'enable':
                this.enable();
                return this.expand();
            case 'delete':
                return this["delete"]();
            case 'settings':
                return this.settings();
        }
    }
});

Garnish.$doc.ready(function () {
    $('.section-collapsible').each(function (i, el) {
        new window.FormBuilderSection(el, $(el).data('type'));
    });

    if (Craft.elementIndex) {
        Craft.elementIndex.on('selectSource', function (e) {
            var groupId = void 0;
            groupId = e.target.$source.data('id');

            if (groupId) {
                $('#new-form-btn').attr("href", Craft.getCpUrl() + ("/form-builder/forms/new?groupId=" + groupId));
            } else {
                $('#new-form-btn').attr('href', Craft.getCpUrl() + '/form-builder/forms/new?groupId=1');
            }
        });
    }

    if ($('.fb-forms').length > 0) {
        new Clipboard('.copy-handle', {
            target: function target(trigger) {
                var handle;
                handle = $(trigger).data('handle');
                Craft.cp.displayNotice(Craft.t("form-builder", "Form handle `" + handle + "` copied"));
            }
        });

        new Clipboard('.twig-snippet', {
            text: function text(trigger) {
                var handle, snippet;
                handle = $(trigger).data('handle');
                snippet = '{{ craft.fb.form("' + handle + '") }}';
                Craft.cp.displayNotice(snippet + Craft.t('form-builder', ' copied'));
                return snippet;
            }
        });
    }

    $('.delete-form').on('click', function (e) {
        var data = void 0;
        e.preventDefault();
        data = {
            id: $(this).data('id')
        };

        if (confirm(Craft.t('form-builder', "Are you sure you want to delete this form and all its entries?"))) {
            Craft.postActionRequest('form-builder/forms/delete', data, $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Form deleted'));
                    window.location.href = Craft.getCpUrl() + '/form-builder/forms';
                }
            }, this));
        }
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmVjM2JkYTRmNzIzZWIxZjFkOWQiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZm9ybXMuanMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXJTZWN0aW9uIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJHRpdGxlYmFyIiwiJGZpZWxkc0NvbnRhaW5lciIsIiRvcHRpb25zQ29udGFpbmVyIiwiJHByZXZpZXdDb250YWluZXIiLCIkY29sbGFwc2VyQnRuIiwiJHNlY3Rpb25Ub2dnbGVJbnB1dCIsIiRtZW51QnRuIiwiJHN0YXR1cyIsIm1vZGFsIiwiY29sbGFwc2VkIiwib3B0aW9uQ29sbGFwc2VkIiwidHlwZSIsIiRkZWxldGUiLCJpbml0IiwiZWwiLCJtZW51QnRuIiwiJCIsImZpbmQiLCJoYXNBdHRyIiwiY29sbGFwc2UiLCJfaGFuZGxlVGl0bGVCYXJDbGljayIsImV2IiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJhZGRMaXN0ZW5lciIsImRlbGV0ZSIsImV4cGFuZCIsInByb3AiLCJhbmltYXRlIiwiJGN1c3RvbVRlbXBsYXRlcyIsIiRmaWVsZHMiLCJwcmV2aWV3SHRtbCIsInRpdGxlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiaHRtbCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsImNzcyIsImNvbGxhcHNlZENvbnRhaW5lckhlaWdodCIsImV4cGFuZGVkQ29udGFpbmVySGVpZ2h0IiwicmVtb3ZlQ2xhc3MiLCJwcm94eSIsImRpc2FibGUiLCJlbmFibGUiLCJyZW1vdmUiLCJzZXR0aW5ncyIsIlNldHRpbmdzTW9kYWwiLCJ1cGRhdGVTZWN0aW9uU2V0dGluZ3MiLCJlYWNoIiwiJG1vZGFsSW5wdXRzIiwiaSIsImlucHV0IiwidmFsdWUiLCJ2YWwiLCJwcmVwZW5kIiwib25NZW51T3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImRhdGEiLCIkZG9jIiwicmVhZHkiLCJDcmFmdCIsImVsZW1lbnRJbmRleCIsIm9uIiwiZSIsImdyb3VwSWQiLCJ0YXJnZXQiLCIkc291cmNlIiwiYXR0ciIsImdldENwVXJsIiwibGVuZ3RoIiwiQ2xpcGJvYXJkIiwidHJpZ2dlciIsImhhbmRsZSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJzbmlwcGV0IiwiaWQiLCJjb25maXJtIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSwyQkFBSjs7QUFFQUMsT0FBT0Qsa0JBQVAsR0FBNEJFLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUM1Q0MsZ0JBQVksSUFEZ0M7QUFFNUNDLGVBQVcsSUFGaUM7QUFHNUNDLHNCQUFrQixJQUgwQjtBQUk1Q0MsdUJBQW1CLElBSnlCO0FBSzVDQyx1QkFBbUIsSUFMeUI7QUFNNUM7QUFDQUMsbUJBQWUsSUFQNkI7QUFRNUNDLHlCQUFxQixJQVJ1QjtBQVM1Q0MsY0FBVSxJQVRrQztBQVU1Q0MsYUFBUyxJQVZtQztBQVc1Q0MsV0FBTyxJQVhxQztBQVk1Q0MsZUFBVyxLQVppQztBQWE1Q0Ms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TzRGLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQTBCdkIsTUFBTVEsUUFBTixFQUExQjtBQUNIO0FBQ0osYUFMMEQsRUFLdkQsSUFMdUQsQ0FBM0Q7QUFNSDtBQUNKLEtBZkQ7QUFnQkgsQ0F0REQsRSIsImZpbGUiOiIvcmVsZWFzZS9zcmMvd2ViL2Fzc2V0cy9qcy9mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZWMzYmRhNGY3MjNlYjFmMWQ5ZCIsImxldCBGb3JtQnVpbGRlclNlY3Rpb247XG5cbndpbmRvdy5Gb3JtQnVpbGRlclNlY3Rpb24gPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICR0aXRsZWJhcjogbnVsbCxcbiAgICAkZmllbGRzQ29udGFpbmVyOiBudWxsLFxuICAgICRvcHRpb25zQ29udGFpbmVyOiBudWxsLFxuICAgICRwcmV2aWV3Q29udGFpbmVyOiBudWxsLFxuICAgIC8vICRhY3Rpb25NZW51OiBudWxsLFxuICAgICRjb2xsYXBzZXJCdG46IG51bGwsXG4gICAgJHNlY3Rpb25Ub2dnbGVJbnB1dDogbnVsbCxcbiAgICAkbWVudUJ0bjogbnVsbCxcbiAgICAkc3RhdHVzOiBudWxsLFxuICAgIG1vZGFsOiBudWxsLFxuICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgb3B0aW9uQ29sbGFwc2VkOiB0cnVlLFxuICAgIHR5cGU6IG51bGwsXG4gICAgJGRlbGV0ZTogbnVsbCxcblxuICAgIGluaXQoZWwsIHR5cGUpIHtcbiAgICAgICAgbGV0IG1lbnVCdG47XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChlbCk7XG4gICAgICAgIHRoaXMuJG1lbnVCdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuc2V0dGluZ3MnKTtcbiAgICAgICAgdGhpcy4kY29sbGFwc2VyQnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLmJvZHl0b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5zZWN0aW9uLXRvZ2dsZScpO1xuICAgICAgICB0aGlzLiR0aXRsZWJhciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcudGl0bGViYXInKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5ib2R5Jyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmJvZHktb3B0aW9ucycpO1xuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5wcmV2aWV3Jyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5zdGF0dXMnKTtcbiAgICAgICAgdGhpcy4kZGVsZXRlID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5kZWxldGUtYnRuJylcbiAgICAgICAgXG4gICAgICAgIC8vIG1lbnVCdG4gPSBuZXcgR2FybmlzaC5NZW51QnRuKHRoaXMuJG1lbnVCdG4pO1xuICAgICAgICAvLyB0aGlzLiRhY3Rpb25NZW51ID0gbWVudUJ0bi5tZW51LiRjb250YWluZXI7XG4gICAgICAgIC8vIG1lbnVCdG4ubWVudS5zZXR0aW5ncy5vbk9wdGlvblNlbGVjdCA9ICQucHJveHkodGhpcywgJ29uTWVudU9wdGlvblNlbGVjdCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKEdhcm5pc2guaGFzQXR0cih0aGlzLiRjb250YWluZXIsICdkYXRhLWNvbGxhcHNlZCcpKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGRlbGV0ZSwgJ2NsaWNrJywgdGhpcy5kZWxldGUpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNvbGxhcHNlckJ0biwgJ2NsaWNrJywgdGhpcy50b2dnbGUpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHRpdGxlYmFyLCAnZG91YmxldGFwJywgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayk7XG4gICAgfSxcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY29sbGFwc2UoYW5pbWF0ZSkge1xuICAgICAgICBsZXQgJGN1c3RvbVRlbXBsYXRlcztcbiAgICAgICAgbGV0ICRmaWVsZHM7XG4gICAgICAgIGxldCBwcmV2aWV3SHRtbDtcbiAgICAgICAgbGV0IHRpdGxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgcHJldmlld0h0bWwgPSAnJztcbiAgICAgICAgdGl0bGUgPSB0aGlzLiR0aXRsZWJhci5maW5kKCcudG91dC10aXRsZScpLnRleHQoKTtcblxuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyLmh0bWwocHJldmlld0h0bWwpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICB9LCAnZmFzdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcHJldmlld0NvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICAgIGxldCBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGxldCBleHBhbmRlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgZXhwYW5kZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCkudmVsb2NpdHkoJ2ZhZGVJbicsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgIGhlaWdodDogZXhwYW5kZWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgfSwgJ2Zhc3QnLCAkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICAgICAgLy8gc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9LFxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZW5hYmxlLWludGVncmF0aW9uLXNlY3Rpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLiRzdGF0dXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5hZGRDbGFzcygnb2ZmJyk7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZGlzYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWVuYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIC8vIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuZmluZCgnLmVuYWJsZS1pbnRlZ3JhdGlvbi1zZWN0aW9uJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB0aGlzLiRzdGF0dXMucmVtb3ZlQ2xhc3MoJ29mZicpO1xuICAgICAgICB0aGlzLiRzdGF0dXMuYWRkQ2xhc3MoJ29uJyk7XG4gICAgICAgIC8vIHJldHVybiBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWRpc2FibGVdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1lbmFibGVdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAvLyB9KSwgdGhpcyksIDIwMCk7XG4gICAgfSxcblxuICAgIFwiZGVsZXRlXCIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIHNldHRpbmdzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsID0gbmV3IFNldHRpbmdzTW9kYWwodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlU2VjdGlvblNldHRpbmdzKCkge1xuICAgICAgICByZXR1cm4gJC5lYWNoKHRoaXMubW9kYWwuJG1vZGFsSW5wdXRzLCAkLnByb3h5KChmdW5jdGlvbihpLCBpbnB1dCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgdmFsdWUgPSAkKGlucHV0KS52YWwoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLnByZXBlbmQoJChpbnB1dCkuYWRkQ2xhc3MoJ2hpZGRlbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHRoaXMpKTtcbiAgICB9LFxuXG4gICAgb25NZW51T3B0aW9uU2VsZWN0KG9wdGlvbikge1xuICAgICAgICBsZXQgJG9wdGlvbjtcbiAgICAgICAgJG9wdGlvbiA9ICQob3B0aW9uKTtcblxuICAgICAgICBzd2l0Y2ggKCRvcHRpb24uZGF0YSgnYWN0aW9uJykpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NvbGxhcHNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW1wiZGVsZXRlXCJdKCk7XG4gICAgICAgICAgICBjYXNlICdzZXR0aW5ncyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgIH0sXG59KVxuXG5HYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4ge1xuICAgICQoJy5zZWN0aW9uLWNvbGxhcHNpYmxlJykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgbmV3IHdpbmRvdy5Gb3JtQnVpbGRlclNlY3Rpb24oZWwsICQoZWwpLmRhdGEoJ3R5cGUnKSlcbiAgICB9KTtcblxuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCdzZWxlY3RTb3VyY2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBJZDtcbiAgICAgICAgICAgIGdyb3VwSWQgPSBlLnRhcmdldC4kc291cmNlLmRhdGEoJ2lkJyk7XG5cbiAgICAgICAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgICAgICAgICAgJCgnI25ldy1mb3JtLWJ0bicpLmF0dHIoXCJocmVmXCIsIENyYWZ0LmdldENwVXJsKCkgKyAoXCIvZm9ybS1idWlsZGVyL2Zvcm1zL25ldz9ncm91cElkPVwiICsgZ3JvdXBJZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3LWZvcm0tYnRuJykuYXR0cignaHJlZicsIENyYWZ0LmdldENwVXJsKCkgKyAnL2Zvcm0tYnVpbGRlci9mb3Jtcy9uZXc/Z3JvdXBJZD0xJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuZmItZm9ybXMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBDbGlwYm9hcmQoJy5jb3B5LWhhbmRsZScsIHtcbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGU7XG4gICAgICAgICAgICAgICAgaGFuZGxlID0gJCh0cmlnZ2VyKS5kYXRhKCdoYW5kbGUnKTtcbiAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoXCJmb3JtLWJ1aWxkZXJcIiwgXCJGb3JtIGhhbmRsZSBgXCIgKyBoYW5kbGUgKyBcImAgY29waWVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IENsaXBib2FyZCgnLnR3aWctc25pcHBldCcsIHtcbiAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlLCBzbmlwcGV0O1xuICAgICAgICAgICAgICAgIGhhbmRsZSA9ICQodHJpZ2dlcikuZGF0YSgnaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgc25pcHBldCA9ICd7eyBjcmFmdC5mYi5mb3JtKFwiJyArIGhhbmRsZSArICdcIikgfX0nO1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2Uoc25pcHBldCArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICcgY29waWVkJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmlwcGV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuZGVsZXRlLWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogJCh0aGlzKS5kYXRhKCdpZCcpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZm9ybSBhbmQgYWxsIGl0cyBlbnRyaWVzP1wiKSkpIHtcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZm9ybXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdGb3JtIGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7Q3JhZnQuZ2V0Q3BVcmwoKX0vZm9ybS1idWlsZGVyL2Zvcm1zYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9mb3Jtcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=