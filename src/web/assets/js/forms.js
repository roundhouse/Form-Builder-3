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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODQ0NGEzMmMwODMwMjRhZTBhOTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZm9ybXMuanMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXJTZWN0aW9uIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJHRpdGxlYmFyIiwiJGZpZWxkc0NvbnRhaW5lciIsIiRvcHRpb25zQ29udGFpbmVyIiwiJHByZXZpZXdDb250YWluZXIiLCIkYWN0aW9uTWVudSIsIiRjb2xsYXBzZXJCdG4iLCIkc2VjdGlvblRvZ2dsZUlucHV0IiwiJG1lbnVCdG4iLCIkc3RhdHVzIiwibW9kYWwiLCJjb2xsYXBzZWQiLCJvcHRpb25Db2xsYXBzZWQiLCJ0eXBlIiwiaW5pdCIsImVsIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiTWVudUJ0biIsIm1lbnUiLCJzZXR0aW5ncyIsIm9uT3B0aW9uU2VsZWN0IiwicHJveHkiLCJoYXNBdHRyIiwiY29sbGFwc2UiLCJfaGFuZGxlVGl0bGVCYXJDbGljayIsImV2IiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJhZGRMaXN0ZW5lciIsImV4cGFuZCIsInByb3AiLCJhbmltYXRlIiwiJGN1c3RvbVRlbXBsYXRlcyIsIiRmaWVsZHMiLCJwcmV2aWV3SHRtbCIsInRpdGxlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiaHRtbCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsImNzcyIsInNldFRpbWVvdXQiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsImNvbGxhcHNlZENvbnRhaW5lckhlaWdodCIsImV4cGFuZGVkQ29udGFpbmVySGVpZ2h0IiwiZGlzYWJsZSIsImVuYWJsZSIsInJlbW92ZSIsIlNldHRpbmdzTW9kYWwiLCJ1cGRhdGVTZWN0aW9uU2V0dGluZ3MiLCJlYWNoIiwiJG1vZGFsSW5wdXRzIiwiaSIsImlucHV0IiwidmFsdWUiLCJ2YWwiLCJwcmVwZW5kIiwib25NZW51T3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImRhdGEiLCIkZG9jIiwicmVhZHkiLCJDcmFmdCIsImVsZW1lbnRJbmRleCIsIm9uIiwiZSIsImdyb3VwSWQiLCJ0YXJnZXQiLCIkc291cmNlIiwiYXR0ciIsImdldENwVXJsIiwibGVuZ3RoIiwiQ2xpcGJvYXJkIiwidHJpZ2dlciIsImhhbmRsZSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJzbmlwcGV0IiwiaWQiLCJjb25maXJtIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJsb2NhdGlvbiIsImhyZWYiLCJGb3JtQnVpbGRlciIsImFkbWluVXJsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsMkJBQUo7O0FBRUFDLE9BQU9ELGtCQUFQLEdBQTRCRSxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDNUNDLGdCQUFZLElBRGdDO0FBRTVDQyxlQUFXLElBRmlDO0FBRzVDQyxzQkFBa0IsSUFIMEI7QUFJNUNDLHVCQUFtQixJQUp5QjtBQUs1Q0MsdUJBQW1CLElBTHlCO0FBTTVDQyxpQkFBYSxJQU4rQjtBQU81Q0MsbUJBQWUsSUFQNkI7QUFRNUNDLHlC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Q0FBTixDQUFRLGNBQVIsRUFBd0IsU0FBeEIsQ0FBakM7QUFDQSx1QkFBT0MsT0FBUDtBQUNIO0FBUDBCLFNBQS9CO0FBU0g7O0FBRURyRSxNQUFFLGNBQUYsRUFBa0J1RCxFQUFsQixDQUFxQixPQUFyQixFQUE4QixVQUFTQyxDQUFULEVBQVk7QUFDdEMsWUFBSU4sYUFBSjtBQUNBTSxVQUFFN0MsY0FBRjtBQUNBdUMsZUFBTztBQUNIb0IsZ0JBQUl0RSxFQUFFLElBQUYsRUFBUWtELElBQVIsQ0FBYSxJQUFiO0FBREQsU0FBUDs7QUFJQSxZQUFJcUIsUUFBUWxCLE1BQU1lLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGdFQUF4QixDQUFSLENBQUosRUFBd0c7QUFDcEdmLGtCQUFNbUIsaUJBQU4sQ0FBd0IsMkJBQXhCLEVBQXFEdEIsSUFBckQsRUFBMkRsRCxFQUFFTSxLQUFGLENBQVMsVUFBQ21FLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUMxRixvQkFBSUEsZUFBZSxTQUFuQixFQUE4QjtBQUMxQnJCLDBCQUFNYSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJkLE1BQU1lLENBQU4sQ0FBUSxjQUFSLENBQXZCO0FBQ0F6RiwyQkFBT2dHLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQTBCakcsT0FBT2tHLFdBQVAsQ0FBbUJDLFFBQTdDO0FBQ0g7QUFDSixhQUwwRCxFQUt2RCxJQUx1RCxDQUEzRDtBQU1IO0FBQ0osS0FmRDtBQWdCSCxDQXRERCxFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2Zvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg0NDRhMzJjMDgzMDI0YWUwYTk4IiwibGV0IEZvcm1CdWlsZGVyU2VjdGlvbjtcblxud2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbiA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRjb250YWluZXI6IG51bGwsXG4gICAgJHRpdGxlYmFyOiBudWxsLFxuICAgICRmaWVsZHNDb250YWluZXI6IG51bGwsXG4gICAgJG9wdGlvbnNDb250YWluZXI6IG51bGwsXG4gICAgJHByZXZpZXdDb250YWluZXI6IG51bGwsXG4gICAgJGFjdGlvbk1lbnU6IG51bGwsXG4gICAgJGNvbGxhcHNlckJ0bjogbnVsbCxcbiAgICAkc2VjdGlvblRvZ2dsZUlucHV0OiBudWxsLFxuICAgICRtZW51QnRuOiBudWxsLFxuICAgICRzdGF0dXM6IG51bGwsXG4gICAgbW9kYWw6IG51bGwsXG4gICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICBvcHRpb25Db2xsYXBzZWQ6IHRydWUsXG4gICAgdHlwZTogbnVsbCxcblxuICAgIC8vICRhZGRUZW1wbGF0ZUJ0bjogbnVsbCxcblxuICAgIGluaXQoZWwsIHR5cGUpIHtcbiAgICAgICAgbGV0IG1lbnVCdG47XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChlbCk7XG4gICAgICAgIHRoaXMuJG1lbnVCdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuc2V0dGluZ3MnKTtcbiAgICAgICAgdGhpcy4kY29sbGFwc2VyQnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLmJvZHl0b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5zZWN0aW9uLXRvZ2dsZScpO1xuICAgICAgICB0aGlzLiR0aXRsZWJhciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcudGl0bGViYXInKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5ib2R5Jyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmJvZHktb3B0aW9ucycpO1xuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5wcmV2aWV3Jyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5zdGF0dXMnKTtcblxuICAgICAgICAvLyB0aGlzLiRhZGRUZW1wbGF0ZUJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWRkLXRlbXBsYXRlLWJ0bicpXG4gICAgICAgIFxuICAgICAgICBtZW51QnRuID0gbmV3IEdhcm5pc2guTWVudUJ0bih0aGlzLiRtZW51QnRuKTtcbiAgICAgICAgdGhpcy4kYWN0aW9uTWVudSA9IG1lbnVCdG4ubWVudS4kY29udGFpbmVyO1xuICAgICAgICBtZW51QnRuLm1lbnUuc2V0dGluZ3Mub25PcHRpb25TZWxlY3QgPSAkLnByb3h5KHRoaXMsICdvbk1lbnVPcHRpb25TZWxlY3QnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChHYXJuaXNoLmhhc0F0dHIodGhpcy4kY29udGFpbmVyLCAnZGF0YS1jb2xsYXBzZWQnKSkge1xuICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hhbmRsZVRpdGxlQmFyQ2xpY2sgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjb2xsYXBzZXJCdG4sICdjbGljaycsIHRoaXMudG9nZ2xlKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiR0aXRsZWJhciwgJ2RvdWJsZXRhcCcsIHRoaXMuX2hhbmRsZVRpdGxlQmFyQ2xpY2spO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnR5cGUgPT0gJ2VtYWlsJykge1xuICAgICAgICAvLyAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRhZGRUZW1wbGF0ZUJ0biwgJ2NsaWNrJywgdGhpcy5hZGRFbWFpbFRlbXBsYXRlTW9kYWwpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY29sbGFwc2UoYW5pbWF0ZSkge1xuICAgICAgICBsZXQgJGN1c3RvbVRlbXBsYXRlcztcbiAgICAgICAgbGV0ICRmaWVsZHM7XG4gICAgICAgIGxldCBwcmV2aWV3SHRtbDtcbiAgICAgICAgbGV0IHRpdGxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgcHJldmlld0h0bWwgPSAnJztcbiAgICAgICAgdGl0bGUgPSB0aGlzLiR0aXRsZWJhci5maW5kKCcudG91dC10aXRsZScpLnRleHQoKTtcblxuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyLmh0bWwocHJldmlld0h0bWwpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICB9LCAnZmFzdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcHJldmlld0NvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICAgIGxldCBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGxldCBleHBhbmRlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgZXhwYW5kZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCkudmVsb2NpdHkoJ2ZhZGVJbicsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgIGhlaWdodDogZXhwYW5kZWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgfSwgJ2Zhc3QnLCAkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9LFxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZW5hYmxlLW5vdGlmaWNhdGlvbi1zZWN0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB0aGlzLiRzdGF0dXMuYWRkQ2xhc3MoJ29mZicpO1xuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWRpc2FibGVdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1lbmFibGVdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UodHJ1ZSk7XG4gICAgfSxcblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmZpbmQoJy5lbmFibGUtbm90aWZpY2F0aW9uLXNlY3Rpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5yZW1vdmVDbGFzcygnb2ZmJyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZGlzYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWVuYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcbiAgICB9LFxuXG4gICAgXCJkZWxldGVcIigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgc2V0dGluZ3MoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWwgPSBuZXcgU2V0dGluZ3NNb2RhbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVTZWN0aW9uU2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiAkLmVhY2godGhpcy5tb2RhbC4kbW9kYWxJbnB1dHMsICQucHJveHkoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZSA9ICQoaW5wdXQpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIucHJlcGVuZCgkKGlucHV0KS5hZGRDbGFzcygnaGlkZGVuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBvbk1lbnVPcHRpb25TZWxlY3Qob3B0aW9uKSB7XG4gICAgICAgIGxldCAkb3B0aW9uO1xuICAgICAgICAkb3B0aW9uID0gJChvcHRpb24pO1xuXG4gICAgICAgIHN3aXRjaCAoJG9wdGlvbi5kYXRhKCdhY3Rpb24nKSkge1xuICAgICAgICAgICAgY2FzZSAnY29sbGFwc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICAgICAgY2FzZSAnZXhwYW5kJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuYWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbXCJkZWxldGVcIl0oKTtcbiAgICAgICAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGFkZEVtYWlsVGVtcGxhdGVNb2RhbCgpIHtcbiAgICAvLyAgICAgbmV3IHdpbmRvdy5FbWFpbFRlbXBsYXRlRWxlbWVudE1vZGFsKCdyb3VuZGhvdXNlXFxcXGVtYWlsYnVpbGRlclxcXFxlbGVtZW50c1xcXFxFbWFpbE5vdGlmaWNhdGlvbicsIHt9LCB0aGlzKVxuICAgIC8vIH1cbn0pXG5cblxuLy8gd2luZG93LkVtYWlsVGVtcGxhdGVFbGVtZW50TW9kYWwgPSBDcmFmdC5CYXNlRWxlbWVudFNlbGVjdG9yTW9kYWwuZXh0ZW5kKHtcbi8vICAgICAkdGVtcGxhdGVDb250YWluZXI6IG51bGwsXG4vLyAgICAgcGFyZW50OiBudWxsLFxuXG4vLyAgICAgaW5pdChlbGVtZW50VHlwZSwgc2V0dGluZ3MsIHBhcmVudCkge1xuLy8gICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuLy8gICAgICAgICB0aGlzLmJhc2UoZWxlbWVudFR5cGUsIHNldHRpbmdzKVxuLy8gICAgICAgICB0aGlzLiR0ZW1wbGF0ZUNvbnRhaW5lciA9IHBhcmVudC4kY29udGFpbmVyLmZpbmQoJy50ZW1wbGF0ZS1lbGVtZW50Jylcbi8vICAgICB9LFxuXG4vLyAgICAgb25TZWxlY3Rpb25DaGFuZ2UoKSB7XG4vLyAgICAgICAgIHRoaXMuYmFzZSgpXG4vLyAgICAgfSxcblxuLy8gICAgIG9uU2VsZWN0KGVsZW1lbnRJbmZvKSB7XG4vLyAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvaW50ZWdyYXRpb25zL2dldC10ZW1wbGF0ZS1odG1sJywge2VsZW1lbnRJZDogZWxlbWVudEluZm9bMF0uaWQsIHNpdGVJZDogZWxlbWVudEluZm9bMF0uc2l0ZUlkfSwgZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgICAgIHRoaXMuJHRlbXBsYXRlQ29udGFpbmVyLmh0bWwoZGF0YS5odG1sKVxuXG4vLyAgICAgICAgICAgICBuZXcgd2luZG93LkVtYWlsVGVtcGxhdGVFbGVtZW50KGVsZW1lbnRJbmZvWzBdLCBkYXRhLmh0bWwsIHRoaXMucGFyZW50KVxuXG4vLyAgICAgICAgIH0uYmluZCh0aGlzKSlcbi8vICAgICB9XG4vLyB9KVxuXG4vLyB3aW5kb3cuRW1haWxUZW1wbGF0ZUVsZW1lbnQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbi8vICAgICAkZWxlbWVudDogbnVsbCxcbi8vICAgICAkcHJldmlld0h0bWxCdG46IG51bGwsXG5cbi8vICAgICBlbGVtZW50SWQ6IG51bGwsXG4vLyAgICAgc2l0ZUlkOiBudWxsLFxuXG4vLyAgICAgaW5pdChlbGVtZW50LCBodG1sLCBwYXJlbnQpIHtcbi8vICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICQoaHRtbClcbi8vICAgICAgICAgdGhpcy4kcHJldmlld0h0bWxCdG4gPSBwYXJlbnQuJGNvbnRhaW5lci5maW5kKCcucHJldmlldy1odG1sJylcbi8vICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSBlbGVtZW50LmlkXG4vLyAgICAgICAgIHRoaXMuc2l0ZUlkID0gZWxlbWVudC5zaXRlSWRcblxuLy8gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRwcmV2aWV3SHRtbEJ0bilcblxuLy8gICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHByZXZpZXdIdG1sQnRuLCAnY2xpY2snLCB0aGlzLnByZXZpZXdIdG1sVGVtcGxhdGUpO1xuLy8gICAgIH0sXG5cbi8vICAgICBwcmV2aWV3SHRtbFRlbXBsYXRlKGUpIHtcbi8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbi8vICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2VtYWlsLWJ1aWxkZXIvbm90aWZpY2F0aW9uL3ByZXZpZXctbm90aWZpY2F0aW9uJywge25vdGlmaWNhdGlvbklkOiB0aGlzLmVsZW1lbnRJZCwgc2l0ZUlkOiB0aGlzLnNpdGVJZH0sIGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZU1vZGFsID0gbmV3IFRlbXBsYXRlUHJldmlld01vZGVsKGRhdGEudGVtcGxhdGUpXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZU1vZGFsLnNob3coKVxuLy8gICAgICAgICB9LmJpbmQodGhpcykpXG4vLyAgICAgfVxuLy8gfSlcblxuLy8gVGVtcGxhdGVQcmV2aWV3TW9kZWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4vLyAgICAgJGlmcmFtZUNvbnRhaW5lcjogbnVsbCxcbi8vICAgICAkaWZyYW1lOiBudWxsLFxuXG4vLyAgICAgaW5pdCh0ZW1wbGF0ZSkge1xuLy8gICAgICAgICBsZXQgYm9keVxuLy8gICAgICAgICB0aGlzLmJhc2UoKVxuXG4vLyAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIgPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbCBoYXMtc2lkZWJhclwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbi8vICAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybUNvbnRhaW5lcilcblxuLy8gICAgICAgICBib2R5ID0gJChbXG4vLyAgICAgICAgICAgICAnPGhlYWRlcj4nLCBcbi8vICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsICdGb3JtIEF0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuLy8gICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0dsb2JhbCBmb3JtIGF0dHJpYnV0ZXMnLCAnPC9kaXY+JywgXG4vLyAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4vLyAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbi8vICAgICAgICAgICAgICc8L2Rpdj4nLFxuLy8gICAgICAgICAgICAgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCBcbi8vICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBcbi8vICAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpfVwiPmAsIFxuLy8gICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpfVwiPmAsIFxuLy8gICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbi8vICAgICAgICAgICAgICc8L2Zvb3Rlcj4nIFxuLy8gICAgICAgICBdLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtQ29udGFpbmVyKTtcblxuLy8gICAgICAgICAkYm9keUNvbnRhaW5lciA9IHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmJvZHknKVxuXG4vLyAgICAgICAgIHRoaXMuJGlmcmFtZUNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJ0ZW1wbGF0ZS1pZnJhbWUtY29udGFpbmVyXCIvPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbi8vICAgICAgICAgdGhpcy4kaWZyYW1lID0gJCgnPGlmcmFtZSBjbGFzcz1cInRlbXBsYXRlLWlmcmFtZVwiIGZyYW1lYm9yZGVyPVwiMFwiLz4nKS5hcHBlbmRUbyh0aGlzLiRpZnJhbWVDb250YWluZXIpXG5cbi8vICAgICAgICAgdGhpcy4kaWZyYW1lWzBdLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub3BlbigpXG4vLyAgICAgICAgIHRoaXMuJGlmcmFtZVswXS5jb250ZW50V2luZG93LmRvY3VtZW50LndyaXRlKHRlbXBsYXRlKVxuLy8gICAgICAgICB0aGlzLiRpZnJhbWVbMF0uY29udGVudFdpbmRvdy5kb2N1bWVudC5jbG9zZSgpXG5cblxuLy8gICAgIH1cbi8vIH0pXG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgJCgnLnNlY3Rpb24tY29sbGFwc2libGUnKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICBuZXcgd2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbihlbCwgJChlbCkuZGF0YSgndHlwZScpKVxuICAgIH0pO1xuXG4gICAgaWYgKENyYWZ0LmVsZW1lbnRJbmRleCkge1xuICAgICAgICBDcmFmdC5lbGVtZW50SW5kZXgub24oJ3NlbGVjdFNvdXJjZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBncm91cElkO1xuICAgICAgICAgICAgZ3JvdXBJZCA9IGUudGFyZ2V0LiRzb3VyY2UuZGF0YSgnaWQnKTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwSWQpIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3LWZvcm0tYnRuJykuYXR0cihcImhyZWZcIiwgQ3JhZnQuZ2V0Q3BVcmwoKSArIChcIi9mb3JtLWJ1aWxkZXIvZm9ybXMvbmV3P2dyb3VwSWQ9XCIgKyBncm91cElkKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNuZXctZm9ybS1idG4nKS5hdHRyKCdocmVmJywgQ3JhZnQuZ2V0Q3BVcmwoKSArICcvZm9ybS1idWlsZGVyL2Zvcm1zL25ldz9ncm91cElkPTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5mYi1mb3JtcycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IENsaXBib2FyZCgnLmNvcHktaGFuZGxlJywge1xuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZTtcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSAkKHRyaWdnZXIpLmRhdGEoJ2hhbmRsZScpO1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkZvcm0gaGFuZGxlIGBcIiArIGhhbmRsZSArIFwiYCBjb3BpZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgQ2xpcGJvYXJkKCcudHdpZy1zbmlwcGV0Jywge1xuICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUsIHNuaXBwZXQ7XG4gICAgICAgICAgICAgICAgaGFuZGxlID0gJCh0cmlnZ2VyKS5kYXRhKCdoYW5kbGUnKTtcbiAgICAgICAgICAgICAgICBzbmlwcGV0ID0gJ3t7IGNyYWZ0LmZvcm1CdWlsZGVyLmZvcm0oXCInICsgaGFuZGxlICsgJ1wiKSB9fSc7XG4gICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShzbmlwcGV0ICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJyBjb3BpZWQnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuaXBwZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5kZWxldGUtZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAkKHRoaXMpLmRhdGEoJ2lkJylcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBmb3JtIGFuZCBhbGwgaXRzIGVudHJpZXM/XCIpKSkge1xuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9mb3Jtcy9kZWxldGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnRm9ybSBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZm9ybXNgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2Zvcm1zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==