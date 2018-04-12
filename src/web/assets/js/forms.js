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
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Form deleted'));
                    window.location.href = Craft.getCpUrl() + '/form-builder/forms';
                }
            }, this));
        }
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODUzMjc0YzEwM2QzYjZjMmI2OWEiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZm9ybXMuanMiXSwibmFtZXMiOlsiRm9ybUJ1aWxkZXJTZWN0aW9uIiwid2luZG93IiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkY29udGFpbmVyIiwiJHRpdGxlYmFyIiwiJGZpZWxkc0NvbnRhaW5lciIsIiRvcHRpb25zQ29udGFpbmVyIiwiJHByZXZpZXdDb250YWluZXIiLCIkYWN0aW9uTWVudSIsIiRjb2xsYXBzZXJCdG4iLCIkc2VjdGlvblRvZ2dsZUlucHV0IiwiJG1lbnVCdG4iLCIkc3RhdHVzIiwibW9kYWwiLCJjb2xsYXBzZWQiLCJvcHRpb25Db2xsYXBzZWQiLCJ0eXBlIiwiaW5pdCIsImVsIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiTWVudUJ0biIsIm1lbnUiLCJzZXR0aW5ncyIsIm9uT3B0aW9uU2VsZWN0IiwicHJveHkiLCJoYXNBdHRyIiwiY29sbGFwc2UiLCJfaGFuZGxlVGl0bGVCYXJDbGljayIsImV2IiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJhZGRMaXN0ZW5lciIsImV4cGFuZCIsInByb3AiLCJhbmltYXRlIiwiJGN1c3RvbVRlbXBsYXRlcyIsIiRmaWVsZHMiLCJwcmV2aWV3SHRtbCIsInRpdGxlIiwiYWRkQ2xhc3MiLCJ0ZXh0IiwiaHRtbCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJoZWlnaHQiLCJzaG93IiwiaGlkZSIsImNzcyIsInNldFRpbWVvdXQiLCJwYXJlbnQiLCJyZW1vdmVDbGFzcyIsImNvbGxhcHNlZENvbnRhaW5lckhlaWdodCIsImV4cGFuZGVkQ29udGFpbmVySGVpZ2h0IiwiZGlzYWJsZSIsImVuYWJsZSIsInJlbW92ZSIsIlNldHRpbmdzTW9kYWwiLCJ1cGRhdGVTZWN0aW9uU2V0dGluZ3MiLCJlYWNoIiwiJG1vZGFsSW5wdXRzIiwiaSIsImlucHV0IiwidmFsdWUiLCJ2YWwiLCJwcmVwZW5kIiwib25NZW51T3B0aW9uU2VsZWN0Iiwib3B0aW9uIiwiJG9wdGlvbiIsImRhdGEiLCIkZG9jIiwicmVhZHkiLCJDcmFmdCIsImVsZW1lbnRJbmRleCIsIm9uIiwiZSIsImdyb3VwSWQiLCJ0YXJnZXQiLCIkc291cmNlIiwiYXR0ciIsImdldENwVXJsIiwibGVuZ3RoIiwiQ2xpcGJvYXJkIiwidHJpZ2dlciIsImhhbmRsZSIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJzbmlwcGV0IiwiaWQiLCJjb25maXJtIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSwyQkFBSjs7QUFFQUMsT0FBT0Qsa0JBQVAsR0FBNEJFLFFBQVFDLElBQVIsQ0FBYUMsTUFBYixDQUFvQjtBQUM1Q0MsZ0JBQVksSUFEZ0M7QUFFNUNDLGVBQVcsSUFGaUM7QUFHNUNDLHNCQUFrQixJQUgwQjtBQUk1Q0MsdUJBQW1CLElBSnlCO0FBSzVDQyx1QkFBbUIsSUFMeUI7QUFNNUNDLGlCQUFhLElBTitCO0FBTzVDQyxtQkFBZSxJQVA2QjtBQVE1Q0MseUJBQXFCLElBUnVCO0FBUzVDQyxjQUFVLElB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QixDQUFqQztBQUNBLHVCQUFPQyxPQUFQO0FBQ0g7QUFQMEIsU0FBL0I7QUFTSDs7QUFFRHJFLE1BQUUsY0FBRixFQUFrQnVELEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFVBQVNDLENBQVQsRUFBWTtBQUN0QyxZQUFJTixhQUFKO0FBQ0FNLFVBQUU3QyxjQUFGO0FBQ0F1QyxlQUFPO0FBQ0hvQixnQkFBSXRFLEVBQUUsSUFBRixFQUFRa0QsSUFBUixDQUFhLElBQWI7QUFERCxTQUFQOztBQUlBLFlBQUlxQixRQUFRbEIsTUFBTWUsQ0FBTixDQUFRLGNBQVIsRUFBd0IsZ0VBQXhCLENBQVIsQ0FBSixFQUF3RztBQUNwR2Ysa0JBQU1tQixpQkFBTixDQUF3QiwyQkFBeEIsRUFBcUR0QixJQUFyRCxFQUEyRGxELEVBQUVNLEtBQUYsQ0FBUyxVQUFDbUUsUUFBRCxFQUFXQyxVQUFYLEVBQTBCO0FBQzFGLG9CQUFJQSxlQUFlLFNBQW5CLEVBQThCO0FBQzFCckIsMEJBQU1hLEVBQU4sQ0FBU0MsYUFBVCxDQUF1QmQsTUFBTWUsQ0FBTixDQUFRLGNBQVIsRUFBd0IsY0FBeEIsQ0FBdkI7QUFDQXpGLDJCQUFPZ0csUUFBUCxDQUFnQkMsSUFBaEIsR0FBMEJ2QixNQUFNUSxRQUFOLEVBQTFCO0FBQ0g7QUFDSixhQUwwRCxFQUt2RCxJQUx1RCxDQUEzRDtBQU1IO0FBQ0osS0FmRDtBQWdCSCxDQXRERCxFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2Zvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg1MzI3NGMxMDNkM2I2YzJiNjlhIiwibGV0IEZvcm1CdWlsZGVyU2VjdGlvbjtcblxud2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbiA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRjb250YWluZXI6IG51bGwsXG4gICAgJHRpdGxlYmFyOiBudWxsLFxuICAgICRmaWVsZHNDb250YWluZXI6IG51bGwsXG4gICAgJG9wdGlvbnNDb250YWluZXI6IG51bGwsXG4gICAgJHByZXZpZXdDb250YWluZXI6IG51bGwsXG4gICAgJGFjdGlvbk1lbnU6IG51bGwsXG4gICAgJGNvbGxhcHNlckJ0bjogbnVsbCxcbiAgICAkc2VjdGlvblRvZ2dsZUlucHV0OiBudWxsLFxuICAgICRtZW51QnRuOiBudWxsLFxuICAgICRzdGF0dXM6IG51bGwsXG4gICAgbW9kYWw6IG51bGwsXG4gICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICBvcHRpb25Db2xsYXBzZWQ6IHRydWUsXG4gICAgdHlwZTogbnVsbCxcblxuICAgIC8vICRhZGRUZW1wbGF0ZUJ0bjogbnVsbCxcblxuICAgIGluaXQoZWwsIHR5cGUpIHtcbiAgICAgICAgbGV0IG1lbnVCdG47XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChlbCk7XG4gICAgICAgIHRoaXMuJG1lbnVCdG4gPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmFjdGlvbnMgPiAuc2V0dGluZ3MnKTtcbiAgICAgICAgdGhpcy4kY29sbGFwc2VyQnRuID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5hY3Rpb25zID4gLmJvZHl0b2dnbGUnKTtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0ID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5zZWN0aW9uLXRvZ2dsZScpO1xuICAgICAgICB0aGlzLiR0aXRsZWJhciA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcudGl0bGViYXInKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5ib2R5Jyk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnNDb250YWluZXIgPSB0aGlzLiRjb250YWluZXIuZmluZCgnLmJvZHktb3B0aW9ucycpO1xuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5wcmV2aWV3Jyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWN0aW9ucyA+IC5zdGF0dXMnKTtcblxuICAgICAgICAvLyB0aGlzLiRhZGRUZW1wbGF0ZUJ0biA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuYWRkLXRlbXBsYXRlLWJ0bicpXG4gICAgICAgIFxuICAgICAgICBtZW51QnRuID0gbmV3IEdhcm5pc2guTWVudUJ0bih0aGlzLiRtZW51QnRuKTtcbiAgICAgICAgdGhpcy4kYWN0aW9uTWVudSA9IG1lbnVCdG4ubWVudS4kY29udGFpbmVyO1xuICAgICAgICBtZW51QnRuLm1lbnUuc2V0dGluZ3Mub25PcHRpb25TZWxlY3QgPSAkLnByb3h5KHRoaXMsICdvbk1lbnVPcHRpb25TZWxlY3QnKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChHYXJuaXNoLmhhc0F0dHIodGhpcy4kY29udGFpbmVyLCAnZGF0YS1jb2xsYXBzZWQnKSkge1xuICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2hhbmRsZVRpdGxlQmFyQ2xpY2sgPSBmdW5jdGlvbihldikge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjb2xsYXBzZXJCdG4sICdjbGljaycsIHRoaXMudG9nZ2xlKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiR0aXRsZWJhciwgJ2RvdWJsZXRhcCcsIHRoaXMuX2hhbmRsZVRpdGxlQmFyQ2xpY2spO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnR5cGUgPT0gJ2VtYWlsJykge1xuICAgICAgICAvLyAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRhZGRUZW1wbGF0ZUJ0biwgJ2NsaWNrJywgdGhpcy5hZGRFbWFpbFRlbXBsYXRlTW9kYWwpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNlY3Rpb25Ub2dnbGVJbnB1dC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgY29sbGFwc2UoYW5pbWF0ZSkge1xuICAgICAgICBsZXQgJGN1c3RvbVRlbXBsYXRlcztcbiAgICAgICAgbGV0ICRmaWVsZHM7XG4gICAgICAgIGxldCBwcmV2aWV3SHRtbDtcbiAgICAgICAgbGV0IHRpdGxlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRjb250YWluZXIuYWRkQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgcHJldmlld0h0bWwgPSAnJztcbiAgICAgICAgdGl0bGUgPSB0aGlzLiR0aXRsZWJhci5maW5kKCcudG91dC10aXRsZScpLnRleHQoKTtcblxuICAgICAgICB0aGlzLiRwcmV2aWV3Q29udGFpbmVyLmh0bWwocHJldmlld0h0bWwpO1xuICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIudmVsb2NpdHkoJ3N0b3AnKTtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLiRjb250YWluZXIudmVsb2NpdHkoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgICAgICB9LCAnZmFzdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcHJldmlld0NvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLiRmaWVsZHNDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmNzcyh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICAgIGxldCBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGxldCBleHBhbmRlZENvbnRhaW5lckhlaWdodDtcbiAgICAgICAgdGhpcy4kc2VjdGlvblRvZ2dsZUlucHV0LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2JvZHljb2xsYXBzZWQnKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnZlbG9jaXR5KCdzdG9wJyk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci52ZWxvY2l0eSgnc3RvcCcpO1xuICAgICAgICBjb2xsYXBzZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgZXhwYW5kZWRDb250YWluZXJIZWlnaHQgPSB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5oZWlnaHQoY29sbGFwc2VkQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5oaWRlKCkudmVsb2NpdHkoJ2ZhZGVJbicsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kY29udGFpbmVyLnZlbG9jaXR5KHtcbiAgICAgICAgICAgIGhlaWdodDogZXhwYW5kZWRDb250YWluZXJIZWlnaHRcbiAgICAgICAgfSwgJ2Zhc3QnLCAkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuaGVpZ2h0KCdhdXRvJyk7XG4gICAgICAgIH0pLCB0aGlzKSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgkLnByb3h5KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1jb2xsYXBzZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWV4cGFuZF06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9LFxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuJGZpZWxkc0NvbnRhaW5lci5maW5kKCcuZW5hYmxlLW5vdGlmaWNhdGlvbi1zZWN0aW9uJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgdGhpcy4kc3RhdHVzLnJlbW92ZUNsYXNzKCdvbicpO1xuICAgICAgICB0aGlzLiRzdGF0dXMuYWRkQ2xhc3MoJ29mZicpO1xuICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWRpc2FibGVdOmZpcnN0JykucGFyZW50KCkuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFjdGlvbk1lbnUuZmluZCgnYVtkYXRhLWFjdGlvbj1lbmFibGVdOmZpcnN0JykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9KSwgdGhpcyksIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2UodHJ1ZSk7XG4gICAgfSxcblxuICAgIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy4kZmllbGRzQ29udGFpbmVyLmZpbmQoJy5lbmFibGUtbm90aWZpY2F0aW9uLXNlY3Rpb24nKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5yZW1vdmVDbGFzcygnb2ZmJyk7XG4gICAgICAgIHRoaXMuJHN0YXR1cy5hZGRDbGFzcygnb24nKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoJC5wcm94eSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRhY3Rpb25NZW51LmZpbmQoJ2FbZGF0YS1hY3Rpb249ZGlzYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kYWN0aW9uTWVudS5maW5kKCdhW2RhdGEtYWN0aW9uPWVuYWJsZV06Zmlyc3QnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0pLCB0aGlzKSwgMjAwKTtcbiAgICB9LFxuXG4gICAgXCJkZWxldGVcIigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgc2V0dGluZ3MoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWwgPSBuZXcgU2V0dGluZ3NNb2RhbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVTZWN0aW9uU2V0dGluZ3MoKSB7XG4gICAgICAgIHJldHVybiAkLmVhY2godGhpcy5tb2RhbC4kbW9kYWxJbnB1dHMsICQucHJveHkoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICB2YWx1ZSA9ICQoaW5wdXQpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250YWluZXIucHJlcGVuZCgkKGlucHV0KS5hZGRDbGFzcygnaGlkZGVuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgdGhpcykpO1xuICAgIH0sXG5cbiAgICBvbk1lbnVPcHRpb25TZWxlY3Qob3B0aW9uKSB7XG4gICAgICAgIGxldCAkb3B0aW9uO1xuICAgICAgICAkb3B0aW9uID0gJChvcHRpb24pO1xuXG4gICAgICAgIHN3aXRjaCAoJG9wdGlvbi5kYXRhKCdhY3Rpb24nKSkge1xuICAgICAgICAgICAgY2FzZSAnY29sbGFwc2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxhcHNlKHRydWUpO1xuICAgICAgICAgICAgY2FzZSAnZXhwYW5kJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2FibGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuYWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbXCJkZWxldGVcIl0oKTtcbiAgICAgICAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIGFkZEVtYWlsVGVtcGxhdGVNb2RhbCgpIHtcbiAgICAvLyAgICAgbmV3IHdpbmRvdy5FbWFpbFRlbXBsYXRlRWxlbWVudE1vZGFsKCdyb3VuZGhvdXNlXFxcXGVtYWlsYnVpbGRlclxcXFxlbGVtZW50c1xcXFxFbWFpbE5vdGlmaWNhdGlvbicsIHt9LCB0aGlzKVxuICAgIC8vIH1cbn0pXG5cblxuLy8gd2luZG93LkVtYWlsVGVtcGxhdGVFbGVtZW50TW9kYWwgPSBDcmFmdC5CYXNlRWxlbWVudFNlbGVjdG9yTW9kYWwuZXh0ZW5kKHtcbi8vICAgICAkdGVtcGxhdGVDb250YWluZXI6IG51bGwsXG4vLyAgICAgcGFyZW50OiBudWxsLFxuXG4vLyAgICAgaW5pdChlbGVtZW50VHlwZSwgc2V0dGluZ3MsIHBhcmVudCkge1xuLy8gICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuLy8gICAgICAgICB0aGlzLmJhc2UoZWxlbWVudFR5cGUsIHNldHRpbmdzKVxuLy8gICAgICAgICB0aGlzLiR0ZW1wbGF0ZUNvbnRhaW5lciA9IHBhcmVudC4kY29udGFpbmVyLmZpbmQoJy50ZW1wbGF0ZS1lbGVtZW50Jylcbi8vICAgICB9LFxuXG4vLyAgICAgb25TZWxlY3Rpb25DaGFuZ2UoKSB7XG4vLyAgICAgICAgIHRoaXMuYmFzZSgpXG4vLyAgICAgfSxcblxuLy8gICAgIG9uU2VsZWN0KGVsZW1lbnRJbmZvKSB7XG4vLyAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvaW50ZWdyYXRpb25zL2dldC10ZW1wbGF0ZS1odG1sJywge2VsZW1lbnRJZDogZWxlbWVudEluZm9bMF0uaWQsIHNpdGVJZDogZWxlbWVudEluZm9bMF0uc2l0ZUlkfSwgZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgICAgIHRoaXMuJHRlbXBsYXRlQ29udGFpbmVyLmh0bWwoZGF0YS5odG1sKVxuXG4vLyAgICAgICAgICAgICBuZXcgd2luZG93LkVtYWlsVGVtcGxhdGVFbGVtZW50KGVsZW1lbnRJbmZvWzBdLCBkYXRhLmh0bWwsIHRoaXMucGFyZW50KVxuXG4vLyAgICAgICAgIH0uYmluZCh0aGlzKSlcbi8vICAgICB9XG4vLyB9KVxuXG4vLyB3aW5kb3cuRW1haWxUZW1wbGF0ZUVsZW1lbnQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbi8vICAgICAkZWxlbWVudDogbnVsbCxcbi8vICAgICAkcHJldmlld0h0bWxCdG46IG51bGwsXG5cbi8vICAgICBlbGVtZW50SWQ6IG51bGwsXG4vLyAgICAgc2l0ZUlkOiBudWxsLFxuXG4vLyAgICAgaW5pdChlbGVtZW50LCBodG1sLCBwYXJlbnQpIHtcbi8vICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICQoaHRtbClcbi8vICAgICAgICAgdGhpcy4kcHJldmlld0h0bWxCdG4gPSBwYXJlbnQuJGNvbnRhaW5lci5maW5kKCcucHJldmlldy1odG1sJylcbi8vICAgICAgICAgdGhpcy5lbGVtZW50SWQgPSBlbGVtZW50LmlkXG4vLyAgICAgICAgIHRoaXMuc2l0ZUlkID0gZWxlbWVudC5zaXRlSWRcblxuLy8gICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRwcmV2aWV3SHRtbEJ0bilcblxuLy8gICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJHByZXZpZXdIdG1sQnRuLCAnY2xpY2snLCB0aGlzLnByZXZpZXdIdG1sVGVtcGxhdGUpO1xuLy8gICAgIH0sXG5cbi8vICAgICBwcmV2aWV3SHRtbFRlbXBsYXRlKGUpIHtcbi8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbi8vICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2VtYWlsLWJ1aWxkZXIvbm90aWZpY2F0aW9uL3ByZXZpZXctbm90aWZpY2F0aW9uJywge25vdGlmaWNhdGlvbklkOiB0aGlzLmVsZW1lbnRJZCwgc2l0ZUlkOiB0aGlzLnNpdGVJZH0sIGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZU1vZGFsID0gbmV3IFRlbXBsYXRlUHJldmlld01vZGVsKGRhdGEudGVtcGxhdGUpXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZU1vZGFsLnNob3coKVxuLy8gICAgICAgICB9LmJpbmQodGhpcykpXG4vLyAgICAgfVxuLy8gfSlcblxuLy8gVGVtcGxhdGVQcmV2aWV3TW9kZWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4vLyAgICAgJGlmcmFtZUNvbnRhaW5lcjogbnVsbCxcbi8vICAgICAkaWZyYW1lOiBudWxsLFxuXG4vLyAgICAgaW5pdCh0ZW1wbGF0ZSkge1xuLy8gICAgICAgICBsZXQgYm9keVxuLy8gICAgICAgICB0aGlzLmJhc2UoKVxuXG4vLyAgICAgICAgIHRoaXMuJGZvcm1Db250YWluZXIgPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbCBoYXMtc2lkZWJhclwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbi8vICAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybUNvbnRhaW5lcilcblxuLy8gICAgICAgICBib2R5ID0gJChbXG4vLyAgICAgICAgICAgICAnPGhlYWRlcj4nLCBcbi8vICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicsICdGb3JtIEF0dHJpYnV0ZXMnLCAnPC9zcGFuPicsIFxuLy8gICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JywgJ0dsb2JhbCBmb3JtIGF0dHJpYnV0ZXMnLCAnPC9kaXY+JywgXG4vLyAgICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4vLyAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbi8vICAgICAgICAgICAgICc8L2Rpdj4nLFxuLy8gICAgICAgICAgICAgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCBcbi8vICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBcbi8vICAgICAgICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpfVwiPmAsIFxuLy8gICAgICAgICAgICAgICAgICAgICBgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpfVwiPmAsIFxuLy8gICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbi8vICAgICAgICAgICAgICc8L2Zvb3Rlcj4nIFxuLy8gICAgICAgICBdLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtQ29udGFpbmVyKTtcblxuLy8gICAgICAgICAkYm9keUNvbnRhaW5lciA9IHRoaXMuJGZvcm1Db250YWluZXIuZmluZCgnLmJvZHknKVxuXG4vLyAgICAgICAgIHRoaXMuJGlmcmFtZUNvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJ0ZW1wbGF0ZS1pZnJhbWUtY29udGFpbmVyXCIvPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbi8vICAgICAgICAgdGhpcy4kaWZyYW1lID0gJCgnPGlmcmFtZSBjbGFzcz1cInRlbXBsYXRlLWlmcmFtZVwiIGZyYW1lYm9yZGVyPVwiMFwiLz4nKS5hcHBlbmRUbyh0aGlzLiRpZnJhbWVDb250YWluZXIpXG5cbi8vICAgICAgICAgdGhpcy4kaWZyYW1lWzBdLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub3BlbigpXG4vLyAgICAgICAgIHRoaXMuJGlmcmFtZVswXS5jb250ZW50V2luZG93LmRvY3VtZW50LndyaXRlKHRlbXBsYXRlKVxuLy8gICAgICAgICB0aGlzLiRpZnJhbWVbMF0uY29udGVudFdpbmRvdy5kb2N1bWVudC5jbG9zZSgpXG5cblxuLy8gICAgIH1cbi8vIH0pXG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgJCgnLnNlY3Rpb24tY29sbGFwc2libGUnKS5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICBuZXcgd2luZG93LkZvcm1CdWlsZGVyU2VjdGlvbihlbCwgJChlbCkuZGF0YSgndHlwZScpKVxuICAgIH0pO1xuXG4gICAgaWYgKENyYWZ0LmVsZW1lbnRJbmRleCkge1xuICAgICAgICBDcmFmdC5lbGVtZW50SW5kZXgub24oJ3NlbGVjdFNvdXJjZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBncm91cElkO1xuICAgICAgICAgICAgZ3JvdXBJZCA9IGUudGFyZ2V0LiRzb3VyY2UuZGF0YSgnaWQnKTtcblxuICAgICAgICAgICAgaWYgKGdyb3VwSWQpIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3LWZvcm0tYnRuJykuYXR0cihcImhyZWZcIiwgQ3JhZnQuZ2V0Q3BVcmwoKSArIChcIi9mb3JtLWJ1aWxkZXIvZm9ybXMvbmV3P2dyb3VwSWQ9XCIgKyBncm91cElkKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNuZXctZm9ybS1idG4nKS5hdHRyKCdocmVmJywgQ3JhZnQuZ2V0Q3BVcmwoKSArICcvZm9ybS1idWlsZGVyL2Zvcm1zL25ldz9ncm91cElkPTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCQoJy5mYi1mb3JtcycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmV3IENsaXBib2FyZCgnLmNvcHktaGFuZGxlJywge1xuICAgICAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZTtcbiAgICAgICAgICAgICAgICBoYW5kbGUgPSAkKHRyaWdnZXIpLmRhdGEoJ2hhbmRsZScpO1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkZvcm0gaGFuZGxlIGBcIiArIGhhbmRsZSArIFwiYCBjb3BpZWRcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgQ2xpcGJvYXJkKCcudHdpZy1zbmlwcGV0Jywge1xuICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUsIHNuaXBwZXQ7XG4gICAgICAgICAgICAgICAgaGFuZGxlID0gJCh0cmlnZ2VyKS5kYXRhKCdoYW5kbGUnKTtcbiAgICAgICAgICAgICAgICBzbmlwcGV0ID0gJ3t7IGNyYWZ0LmZvcm1CdWlsZGVyLmZvcm0oXCInICsgaGFuZGxlICsgJ1wiKSB9fSc7XG4gICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShzbmlwcGV0ICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJyBjb3BpZWQnKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuaXBwZXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5kZWxldGUtZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiAkKHRoaXMpLmRhdGEoJ2lkJylcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBmb3JtIGFuZCBhbGwgaXRzIGVudHJpZXM/XCIpKSkge1xuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9mb3Jtcy9kZWxldGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Zvcm0gZGVsZXRlZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHtDcmFmdC5nZXRDcFVybCgpfS9mb3JtLWJ1aWxkZXIvZm9ybXNgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2Zvcm1zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==