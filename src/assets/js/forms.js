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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

var FormBuilderSection = void 0;

FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    $actionMenu: null,
    $collapserBtn: null,
    $optionBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,

    init: function init(el) {
        var menuBtn = void 0;
        this.$container = $(el);
        this.$menuBtn = this.$container.find('.actions > .settings');
        this.$collapserBtn = this.$container.find('.actions > .bodytoggle');
        this.$optionBtn = this.$container.find('.actions > .optionstoggle');
        this.$sectionToggleInput = this.$container.find('.section-toggle');
        this.$titlebar = this.$container.find('.titlebar');
        this.$fieldsContainer = this.$container.find('.body');
        this.$optionsContainer = this.$container.find('.body-options');
        this.$previewContainer = this.$container.find('.preview');
        this.$status = this.$container.find('.actions > .status');
        menuBtn = new Garnish.MenuBtn(this.$menuBtn);
        this.$actionMenu = menuBtn.menu.$container;
        menuBtn.menu.settings.onOptionSelect = $.proxy(this, 'onMenuOptionSelect');
        if (Garnish.hasAttr(this.$container, 'data-collapsed')) {
            this.collapse();
        }
        this._handleTitleBarClick = function (ev) {
            ev.preventDefault();
            return this.toggle();
        };
        this.addListener(this.$collapserBtn, 'click', this.toggle);
        this.addListener(this.$optionBtn, 'click', this.toggleOptions);
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
    toggleOptions: function toggleOptions() {
        if (this.optionCollapsed) {
            return this.expandOption();
        } else {
            return this.collapseOption(true);
        }
    },
    expandOption: function expandOption() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        if (!this.optionCollapsed) {
            return;
        }
        this.collapse(true);
        this.$container.removeClass('optionscollapsed');
        this.$optionsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$optionsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);
        this.$optionsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });
        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy(function () {
            return this.$container.height('auto');
        }, this));

        return this.optionCollapsed = false;
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
        if (title === 'Fields') {
            $fields = this.$fieldsContainer.find('.fld-field:not(.unused)').length;
            $customTemplates = this.$fieldsContainer.find('.custom-email:not(.unused)').length;

            if ($fields > 0) {
                previewHtml += '| ' + $fields + ' Total Fields';
            }

            if ($customTemplates > 0) {
                previewHtml += ' | ' + $customTemplates + ' Custom Templates';
            }
        }

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

        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        }, this), 200);

        return this.collapsed = true;
    },
    collapseOption: function collapseOption(animate) {
        if (this.optionCollapsed) {
            return;
        }
        this.$container.addClass('optionscollapsed');
        this.$optionsContainer.velocity('stop');
        this.$container.velocity('stop');
        if (animate) {
            this.$optionsContainer.velocity('fadeOut', {
                duration: 'fast'
            });
            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$optionsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        return this.optionCollapsed = true;
    },
    expand: function expand() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        this.$sectionToggleInput.prop('checked', false);
        if (!this.collapsed) {
            return;
        }
        this.collapseOption(true);
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

        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().addClass('hidden');
        }, this), 200);

        return this.collapsed = false;
    },
    disable: function disable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', false);
        this.$status.removeClass('on');
        this.$status.addClass('off');
        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=disable]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().removeClass('hidden');
        }, this), 200);

        return this.collapse(true);
    },
    enable: function enable() {
        this.$fieldsContainer.find('.enable-notification-section').prop('checked', true);
        this.$status.removeClass('off');
        this.$status.addClass('on');
        return setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=disable]:first').parent().removeClass('hidden');
            return this.$actionMenu.find('a[data-action=enable]:first').parent().addClass('hidden');
        }, this), 200);
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
        new FormBuilderSection(el);
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
                snippet = '{{ craft.formBuilder.form("' + handle + '") }}';
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
                    Craft.cp.displayNotice(Craft.t('Form deleted'));
                    window.location.href = window.FormBuilder.adminUrl + '/forms';
                }
            }, this));
        }
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0YnVuZGxlcy9mb3Jtcy9zcmMvanMvZm9ybXMuanMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXJTZWN0aW9uIiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJHRpdGxlYmFyIiwiJGZpZWxkc0NvbnRhaW5lciIsIiRvcHRpb25zQ29udGFpbmVyIiwiJHByZXZpZXdDb250YWluZXIiLCIkYWN0aW9uTWVudSIsIiRjb2xsYXBzZXJCdG4iLCIkb3B0aW9uQnRuIiwiJHNlY3Rpb25Ub2dnbGVJbnB1dCIsIiRtZW51QnRuIiwiJHN0YXR1cyIsIm1vZGFsIiwiY29sbGFwc2VkIiwib3B0aW9uQ29sbGFwc2VkIiwiaW5pdCIsImVsIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiTWVudUJ0biIsIm1lbnUiLCJzZXR0aW5ncyIsIm9uT3B0aW9uU2VsZWN0IiwicHJveHkiLCJoYXNBdHRyIiwiY29sbGFwc2UiLCJfaGFuZGxlVGl0bGVCYXJDbGljayIsImV2IiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJhZGRMaXN0ZW5lciIsInRvZ2dsZU9wdGlvbnMiLCJleHBhbmQiLCJwcm9wIiwiZXhwYW5kT3B0aW9uIiwiY29sbGFwc2VPcHRpb24iLCJjb2xsYXBzZWRDb250YWluZXJIZWlnaHQiLCJleHBhbmRlZENvbnRhaW5lckhlaWdodCIsInJlbW92ZUNsYXNzIiwidmVsb2NpdHkiLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsImR1cmF0aW9uIiwiYW5pbWF0ZSIsIiRjdXN0b21UZW1wbGF0ZXMiLCIkZmllbGRzIiwicHJldmlld0h0bWwiLCJ0aXRsZSIsImFkZENsYXNzIiwidGV4dCIsImxlbmd0aCIsImh0bWwiLCJjc3MiLCJzZXRUaW1lb3V0IiwicGFyZW50IiwiZGlzYWJsZSIsImVuYWJsZSIsInJlbW92ZSIsIlNldHRpbmdzTW9kYWwiLCJ1cGRhdGVTZWN0aW9uU2V0dGluZ3MiLCJlYWNoIiwiJG1vZGFsSW5wdXRzIiwiaSIsImlucHV0IiwidmFsdWUiLCJ2YWwiLCJwcmVwZW5kIiwib25NZW51T3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImRhdGEiLCIkZG9jIiwicmVhZHkiLCJDcmFmdCIsImVsZW1lbnRJbmRleCIsIm9uIiwiZSIsImdyb3VwSWQiLCJ0YXJnZXQiLCIkc291cmNlIiwiYXR0ciIsImdldENwVXJsIiwiQ2xpcGJvYXJkIiwidHJpZ2dlciIsImhhbmRsZSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJzbmlwcGV0IiwiaWQiLCJjb25maXJtIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJGb3JtQnVpbGRlciIsImFkbWluVXJsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsMkJBQUo7O0FBRUFBLHFCQUFxQkMsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3JDQyxnQkFBWSxJQUR5QjtBQUVyQ0MsZUFBVyxJQUYwQjtBQUdyQ0Msc0JBQWtCLElBSG1CO0FBSXJDQyx1QkFBbUIsSUFKa0I7QUFLckNDLHVC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cEdkLGtCQUFNa0IsaUJBQU4sQ0FBd0IsMkJBQXhCLEVBQXFEckIsSUFBckQsRUFBMkR0RCxFQUFFTSxLQUFGLENBQVMsVUFBQ3NFLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUMxRixvQkFBSUEsZUFBZSxTQUFuQixFQUE4QjtBQUMxQnBCLDBCQUFNWSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJiLE1BQU1jLENBQU4sQ0FBUSxjQUFSLENBQXZCO0FBQ0FPLDJCQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUEwQkYsT0FBT0csV0FBUCxDQUFtQkMsUUFBN0M7QUFDSDtBQUNKLGFBTDBELEVBS3ZELElBTHVELENBQTNEO0FBTUg7QUFDSixLQWZEO0FBZ0JILENBdERELEUiLCJmaWxlIjoiL3NyYy9hc3NldGJ1bmRsZXMvZm9ybXMvZGlzdC9qcy9mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MTM2NTJlZTJmZTRlZTY3MTRkYyIsImxldCBGb3JtQnVpbGRlclNlY3Rpb247XG5cbkZvcm1CdWlsZGVyU2VjdGlvbiA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRjb250YWluZXI6IG51bGwsXG4gICAgJHRpdGxlYmFyOiBudWxsLFxuICAgICRmaWVsZHNDb250YWluZXI6IG51bGwsXG4gICAgJG9wdGlvbnNDb250YWluZXI6IG51bGwsXG4gICAgJHByZXZpZXdDb250YWluZXI6IG51bGwsXG4gICAgJGFjdGlvbk1lbnU6IG51bGwsXG4gICAgJGNvbGxhcHNlckJ0bjogbnVsbCxcbiAgICAkb3B0aW9uQnRuOiBudWxsLFxuICAgICRzZWN0aW9uVG9nZ2xlSW5wdXQ6IG51bGwsXG4gICAgJG1lbnVCdG46IG51bGwsXG4gICAgJHN0YXR1czogbnVsbCxcbiAgICBtb2RhbDogbnVsbCxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIG9wdGlvbkNvbGxhcHNlZDogdHJ1ZSxcblxuICAgIGluaXQoZWwpIHtcbiAgICAgICAgbGV0IG1lbnVCdG47XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoZWwpO1xuICAgICAgICB0aGlzLiRtZW51QnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLnNldHRpbmdzJyk7XG4gICAgICAgIHRoaXMuJGNvbGxhcHNlckJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5ib2R5dG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbkJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5vcHRpb25zdG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dCA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuc2VjdGlvbi10b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kdGl0bGViYXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnRpdGxlYmFyJyk7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYm9keScpO1xuICAgICAgICB0aGlzLiRvcHRpb25zQ29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5ib2R5LW9wdGlvbnMnKTtcbiAgICAgICAgdGhpcy4kcHJldmlld0NvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcucHJldmlldycpO1xuICAgICAgICB0aGlzLiRzdGF0dXMgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuc3RhdHVzJyk7XG4gICAgICAgIG1lbnVCdG4gPSBuZXcgR2FybmlzaC5NZW51QnRuKHRoaXMuJG1lbnVCdG4pO1xuICAgICAgICB0aGlzLiRhY3Rpb25NZW51ID0gbWVudUJ0bi5tZW51LiRjb250YWluZXI7XG4gICAgICAgIG1lbnVCdG4ubWVudS5zZXR0aW5ncy5vbk9wdGlvblNlbGVjdCA9ICQucHJveHkodGhpcywgJ29uTWVudU9wdGlvblNlbGVjdCcpO1xuICAgICAgICBpZiAoR2FybmlzaC5oYXNBdHRyKHRoaXMuJGNvbnRhaW5lciwgJ2RhdGEtY29sbGFwc2VkJykpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjb2xsYXBzZXJCdG4sICdjbGljaycsIHRoaXMudG9nZ2xlKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRvcHRpb25CdG4sICdjbGljaycsIHRoaXMudG9nZ2xlT3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kdGl0bGViYXIsICdkb3VibGV0YXAnLCB0aGlzLl9oYW5kbGVUaXRsZUJhckNsaWNrKTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICB0b2dnbGVPcHRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25Db2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuZE9wdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2VPcHRpb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZXhwYW5kT3B0aW9uKCkge1xuICAgICAgICBsZXQgY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0O1xuICAgICAgICBsZXQgZXhwYW5kZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25Db2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ29wdGlvbnNjb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0ID0gdGhpcy4kY29udGFpbmVyLmhlaWdodCgpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIuc2hvdygpO1xuICAgICAgICBleHBhbmRlZENvbnRhaW5lckhlaWdodCA9IHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmhlaWdodChjb2xsYXBzZWRDb250YWluZXJIZWlnaHQpO1xuICAgICAgICB0aGlzLiRvcHRpb25zQ29udGFpbmVyLmhpZGUoKS52ZWxvY2l0eSgnZmFkZUluJywge1xuICAgICAgICAgICAgZHVyYXRpb246ICdmYXN0J1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgIGhlaWdodDogZXhwYW5kZWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgfSwgJ2Zhc3QnLCAkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIGNvbGxhcHNlKGFuaW1hdGUpIHtcbiAgICAgICAgbGV0ICRjdXN0b21UZW1wbGF0ZXM7XG4gICAgICAgIGxldCAkZmllbGRzO1xuICAgICAgICBsZXQgcHJldmlld0h0bWw7XG4gICAgICAgIGxldCB0aXRsZTtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgcHJldmlld0h0bWwgPSAnJztcbiAgICAgICAgdGl0bGUgPSB0aGlzLiR0aXRsZWJhci5maW5kKCcudG91dC10aXRsZScpLnRleHQoKTtcbiAgICAgICAgaWYgKHRpdGxlID09PSAnRmllbGRzJykge1xuICAgICAgICAgICAgJGZpZWxkcyA9IHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZmxkLWZpZWxkOm5vdCgudW51c2VkKScpLmxlbmd0aDtcbiAgICAgICAgICAgICRjdXN0b21UZW1wbGF0ZXMgPSB0aGlzLiRmaWVsZHNDb250YWluZXIuZmluZCgnLmN1c3RvbS1lbWFpbDpub3QoLnVudXNlZCknKS5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCRmaWVsZHMgPiAwKSB7XG4gICAgICAgICAgICAgIHByZXZpZXdIdG1sICs9IGB8ICR7JGZpZWxkc30gVG90YWwgRmllbGRzYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRjdXN0b21UZW1wbGF0ZXMgPiAwKSB7XG4gICAgICAgICAgICAgIHByZXZpZXdIdG1sICs9IGAgfCAkeyRjdXN0b21UZW1wbGF0ZXN9IEN1c3RvbSBUZW1wbGF0ZXNgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kcHJldmlld0NvbnRhaW5lci5odG1sKHByZXZpZXdIdG1sKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogJ2Zhc3QnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgfSwgJ2Zhc3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHByZXZpZXdDb250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5jc3Moe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249Y29sbGFwc2VdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1leHBhbmRdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgY29sbGFwc2VPcHRpb24oYW5pbWF0ZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25Db2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ29wdGlvbnNjb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246ICdmYXN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICB9LCAnZmFzdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Db2xsYXBzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICAgIGxldCBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGxldCBleHBhbmRlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbGxhcHNlT3B0aW9uKHRydWUpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgZXhwYW5kZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCkudmVsb2NpdHkoJ2ZhZGVJbicsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgIGhlaWdodDogZXhwYW5kZWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgfSwgJ2Zhc3QnLCAkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9LFxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZW5hYmxlLW5vdGlmaWNhdGlvbi1zZWN0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB0aGlzLiRzdGF0dXMuYWRkQ2xhc3MoJ29mZicpO1xuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWRpc2FibGVdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1lbmFibGVdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UodHJ1ZSk7XG4gICAgfSxcblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmZpbmQoJy5lbmFibGUtbm90aWZpY2F0aW9uLXNlY3Rpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5yZW1vdmVDbGFzcygnb2ZmJyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZGlzYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWVuYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcbiAgICB9LFxuXG4gICAgXCJkZWxldGVcIigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgc2V0dGluZ3MoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWwgPSBuZXcgU2V0dGluZ3NNb2RhbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVTZWN0aW9uU2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiAkLmVhY2godGhpcy5tb2RhbC4kbW9kYWxJbnB1dHMsICQucHJveHkoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZSA9ICQoaW5wdXQpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIucHJlcGVuZCgkKGlucHV0KS5hZGRDbGFzcygnaGlkZGVuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBvbk1lbnVPcHRpb25TZWxlY3Qob3B0aW9uKSB7XG4gICAgICAgIGxldCAkb3B0aW9uO1xuICAgICAgICAkb3B0aW9uID0gJChvcHRpb24pO1xuXG4gICAgICAgIHN3aXRjaCAoJG9wdGlvbi5kYXRhKCdhY3Rpb24nKSkge1xuICAgICAgICAgICAgY2FzZSAnY29sbGFwc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICAgICAgY2FzZSAnZXhwYW5kJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuYWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbXCJkZWxldGVcIl0oKTtcbiAgICAgICAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgJCgnLnNlY3Rpb24tY29sbGFwc2libGUnKS5lYWNoKGZ1bmN0aW9uKGksZWwpe1xuICAgICAgICBuZXcgRm9ybUJ1aWxkZXJTZWN0aW9uKGVsKTtcbiAgICB9KTtcblxuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCdzZWxlY3RTb3VyY2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXBJZDtcbiAgICAgICAgICAgIGdyb3VwSWQgPSBlLnRhcmdldC4kc291cmNlLmRhdGEoJ2lkJyk7XG5cbiAgICAgICAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgICAgICAgICAgJCgnI25ldy1mb3JtLWJ0bicpLmF0dHIoXCJocmVmXCIsIENyYWZ0LmdldENwVXJsKCkgKyAoXCIvZm9ybS1idWlsZGVyL2Zvcm1zL25ldz9ncm91cElkPVwiICsgZ3JvdXBJZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3LWZvcm0tYnRuJykuYXR0cignaHJlZicsIENyYWZ0LmdldENwVXJsKCkgKyAnL2Zvcm0tYnVpbGRlci9mb3Jtcy9uZXc/Z3JvdXBJZD0xJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICgkKCcuZmItZm9ybXMnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5ldyBDbGlwYm9hcmQoJy5jb3B5LWhhbmRsZScsIHtcbiAgICAgICAgICAgIHRhcmdldDogZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGU7XG4gICAgICAgICAgICAgICAgaGFuZGxlID0gJCh0cmlnZ2VyKS5kYXRhKCdoYW5kbGUnKTtcbiAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoXCJmb3JtLWJ1aWxkZXJcIiwgXCJGb3JtIGhhbmRsZSBgXCIgKyBoYW5kbGUgKyBcImAgY29waWVkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IENsaXBib2FyZCgnLnR3aWctc25pcHBldCcsIHtcbiAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlLCBzbmlwcGV0O1xuICAgICAgICAgICAgICAgIGhhbmRsZSA9ICQodHJpZ2dlcikuZGF0YSgnaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgc25pcHBldCA9ICd7eyBjcmFmdC5mb3JtQnVpbGRlci5mb3JtKFwiJyArIGhhbmRsZSArICdcIikgfX0nO1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2Uoc25pcHBldCArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICcgY29waWVkJykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmlwcGV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcuZGVsZXRlLWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogJCh0aGlzKS5kYXRhKCdpZCcpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZm9ybSBhbmQgYWxsIGl0cyBlbnRyaWVzP1wiKSkpIHtcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZm9ybXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ0Zvcm0gZGVsZXRlZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2Zvcm1zYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRidW5kbGVzL2Zvcm1zL3NyYy9qcy9mb3Jtcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=