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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

var FormBuilderSection = void 0;

window.FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    $actionMenu: null,
    $collapserBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,
    type: null,

    // $addTemplateBtn: null,

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

        // this.$addTemplateBtn = this.$container.find('.add-template-btn')

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
        this.addListener(this.$titlebar, 'doubletap', this._handleTitleBarClick);

        // if (this.type == 'email') {
        //     this.addListener(this.$addTemplateBtn, 'click', this.addEmailTemplateModal);
        // }
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

        setTimeout($.proxy(function () {
            this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
            return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        }, this), 200);

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

// window.EmailTemplateElementModal = Craft.BaseElementSelectorModal.extend({
//     $templateContainer: null,
//     parent: null,

//     init(elementType, settings, parent) {
//         this.parent = parent
//         this.base(elementType, settings)
//         this.$templateContainer = parent.$container.find('.template-element')
//     },

//     onSelectionChange() {
//         this.base()
//     },

//     onSelect(elementInfo) {
//         Craft.postActionRequest('form-builder/integrations/get-template-html', {elementId: elementInfo[0].id, siteId: elementInfo[0].siteId}, function (data) {
//             this.$templateContainer.html(data.html)

//             new window.EmailTemplateElement(elementInfo[0], data.html, this.parent)

//         }.bind(this))
//     }
// })

// window.EmailTemplateElement = Garnish.Base.extend({
//     $element: null,
//     $previewHtmlBtn: null,

//     elementId: null,
//     siteId: null,

//     init(element, html, parent) {
//         this.$element = $(html)
//         this.$previewHtmlBtn = parent.$container.find('.preview-html')
//         this.elementId = element.id
//         this.siteId = element.siteId

//         console.log(this.$previewHtmlBtn)

//         this.addListener(this.$previewHtmlBtn, 'click', this.previewHtmlTemplate);
//     },

//     previewHtmlTemplate(e) {
//         e.preventDefault()

//         Craft.postActionRequest('email-builder/notification/preview-notification', {notificationId: this.elementId, siteId: this.siteId}, function (data) {
//             templateModal = new TemplatePreviewModel(data.template)
//             templateModal.show()
//         }.bind(this))
//     }
// })

// TemplatePreviewModel = Garnish.Modal.extend({
//     $iframeContainer: null,
//     $iframe: null,

//     init(template) {
//         let body
//         this.base()

//         this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod)
//         this.setContainer(this.$formContainer)

//         body = $([
//             '<header>', 
//                 '<span class="modal-title">', 'Form Attributes', '</span>', 
//                 '<div class="instructions">', 'Global form attributes', '</div>', 
//             '</header>', 
//             '<div class="body">', 
//             '</div>',
//             '<footer class="footer">', 
//                 '<div class="buttons">', 
//                     `<input type="button" class="btns btn-modal cancel" value="${Craft.t('form-builder', 'Cancel')}">`, 
//                     `<input type="submit" class="btns btn-modal submit" value="${Craft.t('form-builder', 'Save')}">`, 
//                 '</div>', 
//             '</footer>' 
//         ].join('')).appendTo(this.$formContainer);

//         $bodyContainer = this.$formContainer.find('.body')

//         this.$iframeContainer = $('<div class="template-iframe-container"/>').appendTo(Garnish.$bod)
//         this.$iframe = $('<iframe class="template-iframe" frameborder="0"/>').appendTo(this.$iframeContainer)

//         this.$iframe[0].contentWindow.document.open()
//         this.$iframe[0].contentWindow.document.write(template)
//         this.$iframe[0].contentWindow.document.close()


//     }
// })

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjQ3ZDMxZjlhMTRhZGNlODUwMGIiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZm9ybXMuanMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXJTZWN0aW9uIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJHRpdGxlYmFyIiwiJGZpZWxkc0NvbnRhaW5lciIsIiRvcHRpb25zQ29udGFpbmVyIiwiJHByZXZpZXdDb250YWluZXIiLCIkYWN0aW9uTWVudSIsIiRjb2xsYXBzZXJCdG4iLCIkc2VjdGlvblRvZ2dsZUlucHV0IiwiJG1lbnVCdG4iLCIkc3RhdHVzIiwibW9kYWwiLCJjb2xsYXBzZWQiLCJvcHRpb25Db2xsYXBzZWQiLCJ0eXBlIiwiaW5pdCIsImVsIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiTWVudUJ0biIsIm1lbnUiLCJzZXR0aW5ncyIsIm9uT3B0aW9uU2VsZWN0IiwicHJveHkiLCJoYXNBdHRyIiwiY29sbGFwc2UiLCJfaGFuZGxlVGl0bGVCYXJDbGljayIsImV2IiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJhZGRMaXN0ZW5lciIsImV4cGFuZCIsInByb3AiLCJhbmltYXRlIiwiJGN1c3RvbVRlbXBsYXRlcyIsIiRmaWVsZHMiLCJwcmV2aWV3SHRtbCIsInRpdGxlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiaHRtbCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsImNzcyIsInNldFRpbWVvdXQiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsImNvbGxhcHNlZENvbnRhaW5lckhlaWdodCIsImV4cGFuZGVkQ29udGFpbmVySGVpZ2h0IiwiZGlzYWJsZSIsImVuYWJsZSIsInJlbW92ZSIsIlNldHRpbmdzTW9kYWwiLCJ1cGRhdGVTZWN0aW9uU2V0dGluZ3MiLCJlYWNoIiwiJG1vZGFsSW5wdXRzIiwiaSIsImlucHV0IiwidmFsdWUiLCJ2YWwiLCJwcmVwZW5kIiwib25NZW51T3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImRhdGEiLCIkZG9jIiwicmVhZHkiLCJDcmFmdCIsImVsZW1lbnRJbmRleCIsIm9uIiwiZSIsImdyb3VwSWQiLCJ0YXJnZXQiLCIkc291cmNlIiwiYXR0ciIsImdldENwVXJsIiwibGVuZ3RoIiwiQ2xpcGJvYXJkIiwidHJpZ2dlciIsImhhbmRsZSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJzbmlwcGV0IiwiaWQiLCJjb25maXJtIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJsb2NhdGlvbiIsImhyZWYiLCJGb3JtQnVpbGRlciIsImFkbWluVXJsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsMkJBQUo7O0FBRUFDLE9BQU9ELGtCQUFQLEdBQTRCRSxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDNUNDLGdCQUFZLElBRGdDO0FBRTVDQyxlQUFXLElBRmlDO0FBRzVDQyxzQkFBa0IsSUFIMEI7QUFJNUNDLHVCQUFtQixJQUp5QjtBQUs1Q0MsdUJBQW1CLElBTHlCO0FBTTVDQyxpQkFBYSxJQU4rQjtBQU81Q0MsbUJBQWUsSUFQNkI7QUFRNUNDLHlC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Q0FBTixDQUFRLGNBQVIsRUFBd0IsU0FBeEIsQ0FBakM7QUFDQSx1QkFBT0MsT0FBUDtBQUNIO0FBUDBCLFNBQS9CO0FBU0g7O0FBRURyRSxNQUFFLGNBQUYsRUFBa0J1RCxFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFTQyxDQUFULEVBQVk7QUFDdEMsWUFBSU4sYUFBSjtBQUNBTSxVQUFFN0MsY0FBRjtBQUNBdUMsZUFBTztBQUNIb0IsZ0JBQUl0RSxFQUFFLElBQUYsRUFBUWtELElBQVIsQ0FBYSxJQUFiO0FBREQsU0FBUDs7QUFJQSxZQUFJcUIsUUFBUWxCLE1BQU1lLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGdFQUF4QixDQUFSLENBQUosRUFBd0c7QUFDcEdmLGtCQUFNbUIsaUJBQU4sQ0FBd0IsMkJBQXhCLEVBQXFEdEIsSUFBckQsRUFBMkRsRCxFQUFFTSxLQUFGLENBQVMsVUFBQ21FLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUMxRixvQkFBSUEsZUFBZSxTQUFuQixFQUE4QjtBQUMxQnJCLDBCQUFNYSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJkLE1BQU1lLENBQU4sQ0FBUSxjQUFSLENBQXZCO0FBQ0F6RiwyQkFBT2dHLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQTBCakcsT0FBT2tHLFdBQVAsQ0FBbUJDLFFBQTdDO0FBQ0g7QUFDSixhQUwwRCxFQUt2RCxJQUx1RCxDQUEzRDtBQU1IO0FBQ0osS0FmRDtBQWdCSCxDQXRERCxFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy9hc3NldHMvanMvZm9ybXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjQ3ZDMxZjlhMTRhZGNlODUwMGIiLCJsZXQgRm9ybUJ1aWxkZXJTZWN0aW9uO1xuXG53aW5kb3cuRm9ybUJ1aWxkZXJTZWN0aW9uID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICAkdGl0bGViYXI6IG51bGwsXG4gICAgJGZpZWxkc0NvbnRhaW5lcjogbnVsbCxcbiAgICAkb3B0aW9uc0NvbnRhaW5lcjogbnVsbCxcbiAgICAkcHJldmlld0NvbnRhaW5lcjogbnVsbCxcbiAgICAkYWN0aW9uTWVudTogbnVsbCxcbiAgICAkY29sbGFwc2VyQnRuOiBudWxsLFxuICAgICRzZWN0aW9uVG9nZ2xlSW5wdXQ6IG51bGwsXG4gICAgJG1lbnVCdG46IG51bGwsXG4gICAgJHN0YXR1czogbnVsbCxcbiAgICBtb2RhbDogbnVsbCxcbiAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIG9wdGlvbkNvbGxhcHNlZDogdHJ1ZSxcbiAgICB0eXBlOiBudWxsLFxuXG4gICAgLy8gJGFkZFRlbXBsYXRlQnRuOiBudWxsLFxuXG4gICAgaW5pdChlbCwgdHlwZSkge1xuICAgICAgICBsZXQgbWVudUJ0bjtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZVxuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKGVsKTtcbiAgICAgICAgdGhpcy4kbWVudUJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5zZXR0aW5ncycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzZXJCdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuYm9keXRvZ2dsZScpO1xuICAgICAgICB0aGlzLiRzZWN0aW9uVG9nZ2xlSW5wdXQgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnNlY3Rpb24tdG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuJHRpdGxlYmFyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy50aXRsZWJhcicpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmJvZHknKTtcbiAgICAgICAgdGhpcy4kb3B0aW9uc0NvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYm9keS1vcHRpb25zJyk7XG4gICAgICAgIHRoaXMuJHByZXZpZXdDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLnByZXZpZXcnKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLnN0YXR1cycpO1xuXG4gICAgICAgIC8vIHRoaXMuJGFkZFRlbXBsYXRlQnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hZGQtdGVtcGxhdGUtYnRuJylcbiAgICAgICAgXG4gICAgICAgIG1lbnVCdG4gPSBuZXcgR2FybmlzaC5NZW51QnRuKHRoaXMuJG1lbnVCdG4pO1xuICAgICAgICB0aGlzLiRhY3Rpb25NZW51ID0gbWVudUJ0bi5tZW51LiRjb250YWluZXI7XG4gICAgICAgIG1lbnVCdG4ubWVudS5zZXR0aW5ncy5vbk9wdGlvblNlbGVjdCA9ICQucHJveHkodGhpcywgJ29uTWVudU9wdGlvblNlbGVjdCcpO1xuICAgICAgICBcbiAgICAgICAgaWYgKEdhcm5pc2guaGFzQXR0cih0aGlzLiRjb250YWluZXIsICdkYXRhLWNvbGxhcHNlZCcpKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNvbGxhcHNlckJ0biwgJ2NsaWNrJywgdGhpcy50b2dnbGUpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHRpdGxlYmFyLCAnZG91YmxldGFwJywgdGhpcy5faGFuZGxlVGl0bGVCYXJDbGljayk7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMudHlwZSA9PSAnZW1haWwnKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGFkZFRlbXBsYXRlQnRuLCAnY2xpY2snLCB0aGlzLmFkZEVtYWlsVGVtcGxhdGVNb2RhbCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBjb2xsYXBzZShhbmltYXRlKSB7XG4gICAgICAgIGxldCAkY3VzdG9tVGVtcGxhdGVzO1xuICAgICAgICBsZXQgJGZpZWxkcztcbiAgICAgICAgbGV0IHByZXZpZXdIdG1sO1xuICAgICAgICBsZXQgdGl0bGU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRzZWN0aW9uVG9nZ2xlSW5wdXQucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5hZGRDbGFzcygnYm9keWNvbGxhcHNlZCcpO1xuICAgICAgICBwcmV2aWV3SHRtbCA9ICcnO1xuICAgICAgICB0aXRsZSA9IHRoaXMuJHRpdGxlYmFyLmZpbmQoJy50b3V0LXRpdGxlJykudGV4dCgpO1xuXG4gICAgICAgIHRoaXMuJHByZXZpZXdDb250YWluZXIuaHRtbChwcmV2aWV3SHRtbCk7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ2ZhZGVPdXQnLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246ICdmYXN0J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0sICdmYXN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWNvbGxhcHNlXTpmaXJzdCcpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZXhwYW5kXTpmaXJzdCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSksIHRoaXMpLCAyMDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIGV4cGFuZCgpIHtcbiAgICAgICAgbGV0IGNvbGxhcHNlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgbGV0IGV4cGFuZGVkQ29udGFpbmVySGVpZ2h0O1xuICAgICAgICB0aGlzLiRzZWN0aW9uVG9nZ2xlSW5wdXQucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDbGFzcygnYm9keWNvbGxhcHNlZCcpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIGNvbGxhcHNlZENvbnRhaW5lckhlaWdodCA9IHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmhlaWdodCgnYXV0bycpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuc2hvdygpO1xuICAgICAgICBleHBhbmRlZENvbnRhaW5lckhlaWdodCA9IHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmhlaWdodChjb2xsYXBzZWRDb250YWluZXJIZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmhpZGUoKS52ZWxvY2l0eSgnZmFkZUluJywge1xuICAgICAgICAgICAgZHVyYXRpb246ICdmYXN0J1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe1xuICAgICAgICAgICAgaGVpZ2h0OiBleHBhbmRlZENvbnRhaW5lckhlaWdodFxuICAgICAgICB9LCAnZmFzdCcsICQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgfSksIHRoaXMpKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWNvbGxhcHNlXTpmaXJzdCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZXhwYW5kXTpmaXJzdCcpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSksIHRoaXMpLCAyMDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgIH0sXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmZpbmQoJy5lbmFibGUtbm90aWZpY2F0aW9uLXNlY3Rpb24nKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLiRzdGF0dXMucmVtb3ZlQ2xhc3MoJ29uJyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5hZGRDbGFzcygnb2ZmJyk7XG4gICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZGlzYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWVuYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICB9LFxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuZmluZCgnLmVuYWJsZS1ub3RpZmljYXRpb24tc2VjdGlvbicpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLnJlbW92ZUNsYXNzKCdvZmYnKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLmFkZENsYXNzKCdvbicpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1kaXNhYmxlXTpmaXJzdCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZW5hYmxlXTpmaXJzdCcpLnBhcmVudCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfSksIHRoaXMpLCAyMDApO1xuICAgIH0sXG5cbiAgICBcImRlbGV0ZVwiKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0sXG5cbiAgICBzZXR0aW5ncygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbCA9IG5ldyBTZXR0aW5nc01vZGFsKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVNlY3Rpb25TZXR0aW5ncygpIHtcbiAgICAgICAgcmV0dXJuICQuZWFjaCh0aGlzLm1vZGFsLiRtb2RhbElucHV0cywgJC5wcm94eSgoZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIHZhbHVlID0gJChpbnB1dCkudmFsKCk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lci5wcmVwZW5kKCQoaW5wdXQpLmFkZENsYXNzKCdoaWRkZW4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSk7XG4gICAgfSxcblxuICAgIG9uTWVudU9wdGlvblNlbGVjdChvcHRpb24pIHtcbiAgICAgICAgbGV0ICRvcHRpb247XG4gICAgICAgICRvcHRpb24gPSAkKG9wdGlvbik7XG5cbiAgICAgICAgc3dpdGNoICgkb3B0aW9uLmRhdGEoJ2FjdGlvbicpKSB7XG4gICAgICAgICAgICBjYXNlICdjb2xsYXBzZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICBjYXNlICdleHBhbmQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuZCgpO1xuICAgICAgICAgICAgY2FzZSAnZGlzYWJsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgICAgY2FzZSAnZW5hYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV4cGFuZCgpO1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tcImRlbGV0ZVwiXSgpO1xuICAgICAgICAgICAgY2FzZSAnc2V0dGluZ3MnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gYWRkRW1haWxUZW1wbGF0ZU1vZGFsKCkge1xuICAgIC8vICAgICBuZXcgd2luZG93LkVtYWlsVGVtcGxhdGVFbGVtZW50TW9kYWwoJ3JvdW5kaG91c2VcXFxcZW1haWxidWlsZGVyXFxcXGVsZW1lbnRzXFxcXEVtYWlsTm90aWZpY2F0aW9uJywge30sIHRoaXMpXG4gICAgLy8gfVxufSlcblxuXG4vLyB3aW5kb3cuRW1haWxUZW1wbGF0ZUVsZW1lbnRNb2RhbCA9IENyYWZ0LkJhc2VFbGVtZW50U2VsZWN0b3JNb2RhbC5leHRlbmQoe1xuLy8gICAgICR0ZW1wbGF0ZUNvbnRhaW5lcjogbnVsbCxcbi8vICAgICBwYXJlbnQ6IG51bGwsXG5cbi8vICAgICBpbml0KGVsZW1lbnRUeXBlLCBzZXR0aW5ncywgcGFyZW50KSB7XG4vLyAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4vLyAgICAgICAgIHRoaXMuYmFzZShlbGVtZW50VHlwZSwgc2V0dGluZ3MpXG4vLyAgICAgICAgIHRoaXMuJHRlbXBsYXRlQ29udGFpbmVyID0gcGFyZW50LiRjb250YWluZXIuZmluZCgnLnRlbXBsYXRlLWVsZW1lbnQnKVxuLy8gICAgIH0sXG5cbi8vICAgICBvblNlbGVjdGlvbkNoYW5nZSgpIHtcbi8vICAgICAgICAgdGhpcy5iYXNlKClcbi8vICAgICB9LFxuXG4vLyAgICAgb25TZWxlY3QoZWxlbWVudEluZm8pIHtcbi8vICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9pbnRlZ3JhdGlvbnMvZ2V0LXRlbXBsYXRlLWh0bWwnLCB7ZWxlbWVudElkOiBlbGVtZW50SW5mb1swXS5pZCwgc2l0ZUlkOiBlbGVtZW50SW5mb1swXS5zaXRlSWR9LCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICAgICAgdGhpcy4kdGVtcGxhdGVDb250YWluZXIuaHRtbChkYXRhLmh0bWwpXG5cbi8vICAgICAgICAgICAgIG5ldyB3aW5kb3cuRW1haWxUZW1wbGF0ZUVsZW1lbnQoZWxlbWVudEluZm9bMF0sIGRhdGEuaHRtbCwgdGhpcy5wYXJlbnQpXG5cbi8vICAgICAgICAgfS5iaW5kKHRoaXMpKVxuLy8gICAgIH1cbi8vIH0pXG5cbi8vIHdpbmRvdy5FbWFpbFRlbXBsYXRlRWxlbWVudCA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuLy8gICAgICRlbGVtZW50OiBudWxsLFxuLy8gICAgICRwcmV2aWV3SHRtbEJ0bjogbnVsbCxcblxuLy8gICAgIGVsZW1lbnRJZDogbnVsbCxcbi8vICAgICBzaXRlSWQ6IG51bGwsXG5cbi8vICAgICBpbml0KGVsZW1lbnQsIGh0bWwsIHBhcmVudCkge1xuLy8gICAgICAgICB0aGlzLiRlbGVtZW50ID0gJChodG1sKVxuLy8gICAgICAgICB0aGlzLiRwcmV2aWV3SHRtbEJ0biA9IHBhcmVudC4kY29udGFpbmVyLmZpbmQoJy5wcmV2aWV3LWh0bWwnKVxuLy8gICAgICAgICB0aGlzLmVsZW1lbnRJZCA9IGVsZW1lbnQuaWRcbi8vICAgICAgICAgdGhpcy5zaXRlSWQgPSBlbGVtZW50LnNpdGVJZFxuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHByZXZpZXdIdG1sQnRuKVxuXG4vLyAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kcHJldmlld0h0bWxCdG4sICdjbGljaycsIHRoaXMucHJldmlld0h0bWxUZW1wbGF0ZSk7XG4vLyAgICAgfSxcblxuLy8gICAgIHByZXZpZXdIdG1sVGVtcGxhdGUoZSkge1xuLy8gICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuLy8gICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZW1haWwtYnVpbGRlci9ub3RpZmljYXRpb24vcHJldmlldy1ub3RpZmljYXRpb24nLCB7bm90aWZpY2F0aW9uSWQ6IHRoaXMuZWxlbWVudElkLCBzaXRlSWQ6IHRoaXMuc2l0ZUlkfSwgZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgICAgIHRlbXBsYXRlTW9kYWwgPSBuZXcgVGVtcGxhdGVQcmV2aWV3TW9kZWwoZGF0YS50ZW1wbGF0ZSlcbi8vICAgICAgICAgICAgIHRlbXBsYXRlTW9kYWwuc2hvdygpXG4vLyAgICAgICAgIH0uYmluZCh0aGlzKSlcbi8vICAgICB9XG4vLyB9KVxuXG4vLyBUZW1wbGF0ZVByZXZpZXdNb2RlbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbi8vICAgICAkaWZyYW1lQ29udGFpbmVyOiBudWxsLFxuLy8gICAgICRpZnJhbWU6IG51bGwsXG5cbi8vICAgICBpbml0KHRlbXBsYXRlKSB7XG4vLyAgICAgICAgIGxldCBib2R5XG4vLyAgICAgICAgIHRoaXMuYmFzZSgpXG5cbi8vICAgICAgICAgdGhpcy4kZm9ybUNvbnRhaW5lciA9ICQoJzxmb3JtIGNsYXNzPVwibW9kYWwgZml0dGVkIGZvcm1idWlsZGVyLW1vZGFsIGhhcy1zaWRlYmFyXCI+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKVxuLy8gICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtQ29udGFpbmVyKVxuXG4vLyAgICAgICAgIGJvZHkgPSAkKFtcbi8vICAgICAgICAgICAgICc8aGVhZGVyPicsIFxuLy8gICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JywgJ0Zvcm0gQXR0cmlidXRlcycsICc8L3NwYW4+JywgXG4vLyAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnN0cnVjdGlvbnNcIj4nLCAnR2xvYmFsIGZvcm0gYXR0cmlidXRlcycsICc8L2Rpdj4nLCBcbi8vICAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbi8vICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuLy8gICAgICAgICAgICAgJzwvZGl2PicsXG4vLyAgICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuLy8gICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuLy8gICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgXG4vLyAgICAgICAgICAgICAgICAgICAgIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgXG4vLyAgICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuLy8gICAgICAgICAgICAgJzwvZm9vdGVyPicgXG4vLyAgICAgICAgIF0uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm1Db250YWluZXIpO1xuXG4vLyAgICAgICAgICRib2R5Q29udGFpbmVyID0gdGhpcy4kZm9ybUNvbnRhaW5lci5maW5kKCcuYm9keScpXG5cbi8vICAgICAgICAgdGhpcy4kaWZyYW1lQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cInRlbXBsYXRlLWlmcmFtZS1jb250YWluZXJcIi8+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKVxuLy8gICAgICAgICB0aGlzLiRpZnJhbWUgPSAkKCc8aWZyYW1lIGNsYXNzPVwidGVtcGxhdGUtaWZyYW1lXCIgZnJhbWVib3JkZXI9XCIwXCIvPicpLmFwcGVuZFRvKHRoaXMuJGlmcmFtZUNvbnRhaW5lcilcblxuLy8gICAgICAgICB0aGlzLiRpZnJhbWVbMF0uY29udGVudFdpbmRvdy5kb2N1bWVudC5vcGVuKClcbi8vICAgICAgICAgdGhpcy4kaWZyYW1lWzBdLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQud3JpdGUodGVtcGxhdGUpXG4vLyAgICAgICAgIHRoaXMuJGlmcmFtZVswXS5jb250ZW50V2luZG93LmRvY3VtZW50LmNsb3NlKClcblxuXG4vLyAgICAgfVxuLy8gfSlcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+IHtcbiAgICAkKCcuc2VjdGlvbi1jb2xsYXBzaWJsZScpLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgIG5ldyB3aW5kb3cuRm9ybUJ1aWxkZXJTZWN0aW9uKGVsLCAkKGVsKS5kYXRhKCd0eXBlJykpXG4gICAgfSk7XG5cbiAgICBpZiAoQ3JhZnQuZWxlbWVudEluZGV4KSB7XG4gICAgICAgIENyYWZ0LmVsZW1lbnRJbmRleC5vbignc2VsZWN0U291cmNlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgbGV0IGdyb3VwSWQ7XG4gICAgICAgICAgICBncm91cElkID0gZS50YXJnZXQuJHNvdXJjZS5kYXRhKCdpZCcpO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgICAgICAgICAgICQoJyNuZXctZm9ybS1idG4nKS5hdHRyKFwiaHJlZlwiLCBDcmFmdC5nZXRDcFVybCgpICsgKFwiL2Zvcm0tYnVpbGRlci9mb3Jtcy9uZXc/Z3JvdXBJZD1cIiArIGdyb3VwSWQpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI25ldy1mb3JtLWJ0bicpLmF0dHIoJ2hyZWYnLCBDcmFmdC5nZXRDcFVybCgpICsgJy9mb3JtLWJ1aWxkZXIvZm9ybXMvbmV3P2dyb3VwSWQ9MScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoJCgnLmZiLWZvcm1zJykubGVuZ3RoID4gMCkge1xuICAgICAgICBuZXcgQ2xpcGJvYXJkKCcuY29weS1oYW5kbGUnLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlO1xuICAgICAgICAgICAgICAgIGhhbmRsZSA9ICQodHJpZ2dlcikuZGF0YSgnaGFuZGxlJyk7XG4gICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiRm9ybSBoYW5kbGUgYFwiICsgaGFuZGxlICsgXCJgIGNvcGllZFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBDbGlwYm9hcmQoJy50d2lnLXNuaXBwZXQnLCB7XG4gICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZSwgc25pcHBldDtcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSAkKHRyaWdnZXIpLmRhdGEoJ2hhbmRsZScpO1xuICAgICAgICAgICAgICAgIHNuaXBwZXQgPSAne3sgY3JhZnQuZm9ybUJ1aWxkZXIuZm9ybShcIicgKyBoYW5kbGUgKyAnXCIpIH19JztcbiAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKHNuaXBwZXQgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnIGNvcGllZCcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25pcHBldDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJCgnLmRlbGV0ZS1mb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6ICQodGhpcykuZGF0YSgnaWQnKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maXJtKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZvcm0gYW5kIGFsbCBpdHMgZW50cmllcz9cIikpKSB7XG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2Zvcm1zL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdGb3JtIGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7d2luZG93LkZvcm1CdWlsZGVyLmFkbWluVXJsfS9mb3Jtc2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvZm9ybXMuanMiXSwic291cmNlUm9vdCI6IiJ9