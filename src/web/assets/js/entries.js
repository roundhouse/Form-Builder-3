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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),

/***/ 6:
/***/ (function(module, exports) {

var WriteNoteWidget = void 0;

WriteNoteWidget = Garnish.Base.extend({
    $widget: null,
    $btn: null,
    $list: null,
    $noteTextarea: null,
    $spinner: null,

    modal: null,
    note: null,
    entryId: null,

    init: function init(widget) {
        this.$widget = $(widget);
        this.$btn = this.$widget.find('#write-note-btn');
        this.$list = this.$widget.find('.list');
        this.$spinner = this.$widget.find('.loader');

        this.entryId = this.$widget.data('entry-id');

        this.addListener(this.$btn, 'click', 'openNoteModel');
    },
    openNoteModel: function openNoteModel(e) {
        e.preventDefault();

        if (this.modal) {
            this.modal.show();
        } else {
            this.modal = new NoteModal(this);
        }

        this.modal.on('save', $.proxy(this, 'updateNotes'));
    },
    updateNotes: function updateNotes(data) {
        var _this = this;

        this.$spinner.removeClass('hidden');

        data = {
            note: this.note,
            entryId: this.entryId
        };

        Craft.postActionRequest('form-builder/notes/save', data, $.proxy(function (response, textStatus) {
            console.log(response);

            if (textStatus === 'success') {
                Craft.cp.displayNotice(Craft.t('form-builder', 'Note added'));
                _this.$spinner.addClass('hidden');
                _this.updateNotesHtml(response.note);
            }
        }, this));

        this.modal.hide();
    },
    updateNotesHtml: function updateNotesHtml(data) {
        var author = void 0;
        var note = void 0;

        note = data.note;
        author = data.author.fullName;

        $markup = $('<div class="list-item pad">' + '<div class="item-meta">' + '<span class="item-meta-icon"><i class="far fa-user"></i></span>' + '<span class="item-meta-title">' + author + '</span>' + '<span class="item-meta-right">' + Craft.t('form-builder', 'Now') + '</span>' + '</div>' + '<div class="item-title">' + note + '</div>' + '</div>');

        this.$list.prepend($markup);
    }
});

NoteModal = Garnish.Modal.extend({
    widget: null,

    init: function init(widget) {
        var body, self;
        self = this;
        this.base();

        this.widget = widget;

        this.$form = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$form);

        body = $(['<header>', '<span class="modal-title">' + Craft.t('form-builder', 'Note') + '</span>', '<div class="instructions">' + Craft.t('form-builder', 'Leave a note for this entry') + '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">TEXT</div>', '<div class="input"><textarea id="note-text" rows="6"></textarea></div>', '</div>', '</div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Add') + '">', '</div>', '</footer>'].join('')).appendTo(this.$form);

        this.show();
        this.$saveBtn = body.find('.submit');
        this.$cancelBtn = body.find('.cancel');
        this.$noteTextarea = body.find('#note-text');

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$form, 'submit', 'save');
    },
    save: function save(e) {
        e.preventDefault();
        this.note = this.$noteTextarea.val();
        this.widget.note = this.note;

        if (this.note == '') {
            Garnish.shake(this.$container);
        } else {
            this.trigger('save', {
                note: this.note
            });
        }
    }
});

AssetManagement = Garnish.Base.extend({
    $container: null,
    $elements: null,

    init: function init(container) {
        this.$container = $(container);
        this.$elements = this.$container.find('.item-asset');

        this.$elements.each(function (i, el) {
            element = new AssetFile(el);
        });
    }
});

AssetFile = Garnish.Base.extend({
    element: null,

    init: function init(element) {
        this.element = $(element);

        console.log(this.element);
    }
});

Craft.FileUploadsIndex = Garnish.Base.extend({
    $container: $('.upload-details'),
    elementIndex: null,

    init: function init(elementIndex, container, settings) {
        var $elements = void 0;
        this.elementIndex = elementIndex;
        this.$container = $(container);
        this.setSettings(settings, Craft.BaseElementIndexView.defaults);
        this.$loadingMoreSpinner = $('<div class="centeralign hidden">' + '<div class="spinner loadingmore"></div>' + '</div>').insertAfter(this.$container);
        this.$elementContainer = this.getElementContainer();

        $elements = this.$elementContainer.children();

        if (this.settings.context === 'index') {
            this.addListener(this.$elementContainer, 'dblclick', function (ev) {
                var $element;
                var $target = void 0;
                $target = $(ev.target);

                if ($target.hasClass('element')) {
                    $element = $target;
                } else {
                    $element = $target.closest('.element');
                }

                if ($element.length) {
                    this.createElementEditor($element);
                }
            });
        }
    },
    getElementContainer: function getElementContainer() {
        this.$table = this.$container.find('table:first');
        this.$table.children('tbody:first');
    },
    createElementEditor: function createElementEditor($element) {
        new Craft.ElementEditor($element, {
            onSaveElement: $.proxy(function (response) {
                return Craft.cp.displayNotice(Craft.t('form-builder', 'Asset updated'));
            }, this)
        });
    }
});

Garnish.$doc.ready(function () {
    var ACTION_BTN_CONTAINER = $('.element-actions');
    var ACTION_ASSETS_DOWNLOAD_BTN = $('#download-all-assets');

    new WriteNoteWidget('.notes-widget');
    new AssetManagement('#content');

    $('.asset-select').each(function (i, el) {
        $(el).on('click', function (e) {
            $target = $(el);
            id = $target.data('asset-id');
            $target.toggleClass('active');

            ACTION_ASSETS_DOWNLOAD_BTN.removeClass('hidden');
        });
    });

    // $('.asset-select').on('click', (e) => {
    //     console.log(e)
    // })

    if (Craft.elementIndex) {
        Craft.elementIndex.on('updateElements', function (e) {
            var elementsCount = void 0;
            var selectedSource = void 0;
            var unreadItems = void 0;

            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
                if (response.success) {
                    window.FormBuilder.unreadCount = response.count;

                    if (response.count > 0) {
                        return $('.total-entry-count').html(response.count);
                    } else {
                        return $('.total-entry-count').html('');
                    }
                }
            }, this));

            selectedSource = e.target.instanceState.selectedSource;

            if (e.target.view._totalVisible === 0) {
                e.target.view.$elementContainer.html($('<tr><td colspan="6">' + Craft.t("form-builder", "No entries available") + '</td></tr>'));
            }

            // Update unread count utility nav
            Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    $('#sources .entry-count').html('');

                    $.each(response.grouped, function (key, entries) {
                        $('[data-key="form:' + key + '"]').find('.entry-count').html(entries.length);
                    });

                    if (response.totalCount > 0) {
                        $('.fb-unread-container .fb-badge').addClass('show');
                        $('.fb-unread-container .fb-badge .count').html(response.totalCount);
                        $('#unread-notifications').find('.body').html(response.template);
                    } else {
                        $('.fb-unread-container .fb-badge').removeClass('show');
                        $('.fb-unread-container .fb-badge .count').html('');
                        $('#unread-notifications').find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');
                    }
                }
            }, this));
        });
    }

    $('.submission-action-trigger').on('click', function (e) {
        e.preventDefault();

        var $menu = void 0;
        var entryId = void 0;
        var fileIds = void 0;
        var formId = void 0;
        var type = void 0;

        type = $(this).data('type');
        formId = $(this).data('form-id');
        entryId = $(this).data('entry-id');
        fileIds = $(this).data('file-ids');
        $menu = $('<div class="tout-dropdown"/>').html('<ul class="form-item-menu">' + '</ul>');

        if (type === 'submission') {
            $('<li><a href="#" class="delete-submission">Delete Submission</a></li>').appendTo($menu.find('ul'));
        } else if (type === 'form') {
            $('<li><a href="' + window.FormBuilder.adminUrl + '/forms/' + formId + '">View Form</a></li>').appendTo($menu.find('ul'));
        } else if (type === 'uploads') {
            $('<li><a href="' + window.FormBuilder.adminUrl + '/entries" class="delete-all-files">Delete All</a></li>').appendTo($menu.find('ul'));
            $('<li><a href="' + window.FormBuilder.adminUrl + '/entries" class="download-all-files">Download All</a></li>').appendTo($menu.find('ul'));
        }

        new Garnish.HUD($(this), $menu, {
            hudClass: 'hud fb-hud submissionhud',
            closeOtherHUDs: false
        });

        $menu.find('.delete-submission').on('click', function (e) {
            e.preventDefault();
            var data = void 0;
            data = {
                id: entryId
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete this entry?"))) {
                Craft.postActionRequest('form-builder/entries/delete', data, $.proxy(function (response, textStatus) {
                    if (textStatus === 'success') {
                        Craft.cp.displayNotice(Craft.t('form-builder', 'Entry deleted'));
                        window.location.href = window.FormBuilder.adminUrl + '/entries';
                    }
                }, this));
            }
        });

        $menu.find('.delete-all-files').on('click', function (e) {
            var data = void 0;
            e.preventDefault();
            data = {
                fileId: fileIds
            };

            if (confirm(Craft.t("form-builder", "Are you sure you want to delete all files?"))) {
                Craft.postActionRequest('assets/deleteFile', data, $.proxy(function (response, textStatus) {
                    var hudID = void 0;
                    if (response.success) {
                        for (hudID in Garnish.HUD.activeHUDs) {
                            Garnish.HUD.activeHUDs[hudID].hide();
                        }

                        $('.upload-details').parent().velocity('fadeOut', {
                            duration: '100'
                        });

                        return setTimeout(function () {
                            return $('.upload-details').parent().remove();
                        }, 100);
                    }
                }, this));
            }
        });

        $menu.find('.download-all-files').on('click', function (e) {
            e.preventDefault();
            var data = void 0;
            Craft.cp.displayNotice(Craft.t('form-builder', 'Downloading...'));
            data = {
                ids: fileIds,
                formId: formId
            };

            Craft.postActionRequest('form-builder/entries/downloadAllFiles', data, $.proxy(function (response, textStatus) {
                var hudID = void 0;
                var results = void 0;
                if (response.success) {
                    window.location = '/actions/form-builder/entries/downloadFiles?filePath=' + response.filePath;
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Download Successful'));
                } else {
                    Craft.cp.displayError(Craft.t('form-builder', response.message));
                }

                results = [];

                for (hudID in Garnish.HUD.activeHUDs) {
                    results.push(Garnish.HUD.activeHUDs[hudID].hide());
                }

                return results;
            }, this));
        });
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWYwNGY4ZjYyOTEzYWVkMTk4ZTgiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZW50cmllcy5qcyJdLCJuYW1lcyI6WyJXcml0ZU5vdGVXaWRnZXQiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiR3aWRnZXQiLCIkYnRuIiwiJGxpc3QiLCIkbm90ZVRleHRhcmVhIiwiJHNwaW5uZXIiLCJtb2RhbCIsIm5vdGUiLCJlbnRyeUlkIiwiaW5pdCIsIndpZGdldCIsIiQiLCJmaW5kIiwiZGF0YSIsImFkZExpc3RlbmVyIiwib3Blbk5vdGVNb2RlbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNob3ciLCJOb3RlTW9kYWwiLCJvbiIsInByb3h5IiwidXBkYXRlTm90ZXMiLCJyZW1vdmVDbGFzcyIsIkNyYWZ0IiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY3AiLCJkaXNwbGF5Tm90aWNlIiwidCIsImFkZENsYXNzIiwidXBkYXRlTm90ZXNIdG1sIiwiaGlkZSIsImF1dGhvciIsImZ1bGxOYW1lIiwiJG1hcmt1cCIsInByZXBlbmQiLCJNb2RhbCIsImJvZHkiLCJzZWxmIiwiYmFzZSIsIiRmb3JtIiwiYXBwZW5kVG8iLCIkYm9kIiwic2V0Q29udGFpbmVyIiwiam9pbiIsIiRzYXZlQnRuIiwiJGNhbmNlbEJ0biIsInNhdmUiLCJ2YWwiLCJzaGFrZSIsIiRjb250YWluZXIiLCJ0cmlnZ2VyIiwiQXNzZXRNYW5hZ2VtZW50IiwiJGVsZW1lbnRzIiwiY29udGFpbmVyIiwiZWFjaCIsImkiLCJlbCIsImVsZW1lbnQiLCJBc3NldEZpbGUiLCJGaWxlVXBsb2Fkc0luZGV4IiwiZWxlbWVudEluZGV4Iiwic2V0dGluZ3MiLCJzZXRTZXR0aW5ncyIsIkJhc2VFbGVtZW50SW5kZXhWaWV3IiwiZGVmYXVsdHMiLCIkbG9hZGluZ01vcmVTcGlubmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkZWxlbWVudENvbnRhaW5lciIsImdldEVsZW1lbnRDb250YWluZXIiLCJjaGlsZHJlbiIsImNvbnRleHQiLCJldiIsIiRlbGVtZW50IiwiJHRhcmdldCIsInRhcmdldCIsImhhc0NsYXNzIiwiY2xvc2VzdCIsImxlbmd0aCIsImNyZWF0ZUVsZW1lbnRFZGl0b3IiLCIkdGFibGUiLCJFbGVtZW50RWRpdG9yIiwib25TYXZlRWxlbWVudCIsIiRkb2MiLCJyZWFkeSIsIkFDVElPTl9CVE5fQ09OVEFJTkVSIiwiQUNUSU9OX0FTU0VUU19ET1dOTE9BRF9CVE4iLCJpZCIsInRvZ2dsZUNsYXNzIiwiZWxlbWVudHNDb3VudCIsInNlbGVjdGVkU291cmNlIiwidW5yZWFkSXRlbXMiLCJzdWNjZXNzIiwid2luZG93IiwiRm9ybUJ1aWxkZXIiLCJ1bnJlYWRDb3VudCIsImNvdW50IiwiaHRtbCIsImluc3RhbmNlU3RhdGUiLCJ2aWV3IiwiX3RvdGFsVmlzaWJsZSIsImdyb3VwZWQiLCJrZXkiLCJlbnRyaWVzIiwidG90YWxDb3VudCIsInRlbXBsYXRlIiwiJG1lbnUiLCJmaWxlSWRzIiwiZm9ybUlkIiwidHlwZSIsImFkbWluVXJsIiwiSFVEIiwiaHVkQ2xhc3MiLCJjbG9zZU90aGVySFVEcyIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJmaWxlSWQiLCJodWRJRCIsImFjdGl2ZUhVRHMiLCJwYXJlbnQiLCJ2ZWxvY2l0eSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsInJlbW92ZSIsImlkcyIsInJlc3VsdHMiLCJmaWxlUGF0aCIsImRpc3BsYXlFcnJvciIsIm1lc3NhZ2UiLCJwdXNoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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QW5CLG1CQUFPO0FBQ0xvSCxxQkFBS2xCLE9BREE7QUFFTEM7QUFGSyxhQUFQOztBQUtBeEYsa0JBQU1DLGlCQUFOLENBQXdCLHVDQUF4QixFQUFpRVosSUFBakUsRUFBdUVGLEVBQUVVLEtBQUYsQ0FBUyxVQUFDSyxRQUFELEVBQVdDLFVBQVgsRUFBMEI7QUFDdEcsb0JBQUkrRixjQUFKO0FBQ0Esb0JBQUlRLGdCQUFKO0FBQ0Esb0JBQUl4RyxTQUFTc0UsT0FBYixFQUFzQjtBQUNsQkMsMkJBQU9zQixRQUFQLDZEQUEwRTdGLFNBQVN5RyxRQUFuRjtBQUNBM0csMEJBQU1NLEVBQU4sQ0FBU0MsYUFBVCxDQUF1QlAsTUFBTVEsQ0FBTixDQUFRLGNBQVIsRUFBd0IscUJBQXhCLENBQXZCO0FBQ0gsaUJBSEQsTUFHTztBQUNIUiwwQkFBTU0sRUFBTixDQUFTc0csWUFBVCxDQUFzQjVHLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCTixTQUFTMkcsT0FBakMsQ0FBdEI7QUFDSDs7QUFFREgsMEJBQVUsRUFBVjs7QUFFQSxxQkFBS1IsS0FBTCxJQUFjNUgsUUFBUXFILEdBQVIsQ0FBWVEsVUFBMUIsRUFBc0M7QUFDbENPLDRCQUFRSSxJQUFSLENBQWF4SSxRQUFRcUgsR0FBUixDQUFZUSxVQUFaLENBQXVCRCxLQUF2QixFQUE4QnZGLElBQTlCLEVBQWI7QUFDSDs7QUFFRCx1QkFBTytGLE9BQVA7QUFDSCxhQWpCc0UsRUFpQm5FLElBakJtRSxDQUF2RTtBQWtCSCxTQTNCRDtBQTZCSCxLQXBHRDtBQXFHSCxDQXpLRCxFIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2VudHJpZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZjA0ZjhmNjI5MTNhZWQxOThlOCIsImxldCBXcml0ZU5vdGVXaWRnZXRcblxuXG5Xcml0ZU5vdGVXaWRnZXQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkd2lkZ2V0OiBudWxsLFxuICAgICRidG46IG51bGwsXG4gICAgJGxpc3Q6IG51bGwsXG4gICAgJG5vdGVUZXh0YXJlYTogbnVsbCxcbiAgICAkc3Bpbm5lcjogbnVsbCxcblxuICAgIG1vZGFsOiBudWxsLFxuICAgIG5vdGU6IG51bGwsXG4gICAgZW50cnlJZDogbnVsbCxcblxuICAgIGluaXQod2lkZ2V0KSB7XG4gICAgICAgIHRoaXMuJHdpZGdldCA9ICQod2lkZ2V0KVxuICAgICAgICB0aGlzLiRidG4gPSB0aGlzLiR3aWRnZXQuZmluZCgnI3dyaXRlLW5vdGUtYnRuJylcbiAgICAgICAgdGhpcy4kbGlzdCA9IHRoaXMuJHdpZGdldC5maW5kKCcubGlzdCcpXG4gICAgICAgIHRoaXMuJHNwaW5uZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLmxvYWRlcicpXG5cbiAgICAgICAgdGhpcy5lbnRyeUlkID0gdGhpcy4kd2lkZ2V0LmRhdGEoJ2VudHJ5LWlkJylcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGJ0biwgJ2NsaWNrJywgJ29wZW5Ob3RlTW9kZWwnKVxuXG4gICAgfSxcblxuICAgIG9wZW5Ob3RlTW9kZWwoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgTm90ZU1vZGFsKHRoaXMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubW9kYWwub24oJ3NhdmUnLCAkLnByb3h5KHRoaXMsICd1cGRhdGVOb3RlcycpKVxuICAgIH0sXG5cbiAgICB1cGRhdGVOb3RlcyhkYXRhKSB7XG4gICAgICAgIHRoaXMuJHNwaW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG5cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIG5vdGU6IHRoaXMubm90ZSxcbiAgICAgICAgICAgIGVudHJ5SWQ6IHRoaXMuZW50cnlJZFxuICAgICAgICB9XG5cbiAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9ub3Rlcy9zYXZlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcblxuICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdGUgYWRkZWQnKSlcbiAgICAgICAgICAgICAgICB0aGlzLiRzcGlubmVyLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTm90ZXNIdG1sKHJlc3BvbnNlLm5vdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSlcblxuICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKVxuICAgIH0sXG5cbiAgICB1cGRhdGVOb3Rlc0h0bWwoZGF0YSkge1xuICAgICAgICBsZXQgYXV0aG9yXG4gICAgICAgIGxldCBub3RlXG5cbiAgICAgICAgbm90ZSA9IGRhdGEubm90ZVxuICAgICAgICBhdXRob3IgPSBkYXRhLmF1dGhvci5mdWxsTmFtZVxuXG4gICAgICAgICRtYXJrdXAgPSAkKCc8ZGl2IGNsYXNzPVwibGlzdC1pdGVtIHBhZFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaXRlbS1tZXRhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIml0ZW0tbWV0YS1pY29uXCI+PGkgY2xhc3M9XCJmYXIgZmEtdXNlclwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIml0ZW0tbWV0YS10aXRsZVwiPicgKyBhdXRob3IgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpdGVtLW1ldGEtcmlnaHRcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdycpICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpdGVtLXRpdGxlXCI+JyArIG5vdGUgKyAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JylcblxuICAgICAgICB0aGlzLiRsaXN0LnByZXBlbmQoJG1hcmt1cClcbiAgICB9XG5cbn0pXG5cbk5vdGVNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICB3aWRnZXQ6IG51bGwsXG5cbiAgICBpbml0KHdpZGdldCkge1xuICAgICAgICB2YXIgYm9keSwgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLmJhc2UoKVxuXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0XG5cbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoJzxmb3JtIGNsYXNzPVwibW9kYWwgZml0dGVkIGZvcm1idWlsZGVyLW1vZGFsXCI+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKVxuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKVxuICAgICAgICBcbiAgICAgICAgYm9keSA9ICQoW1xuICAgICAgICAgICAgJzxoZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdGUnKSArICc8L3NwYW4+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnN0cnVjdGlvbnNcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0xlYXZlIGEgbm90ZSBmb3IgdGhpcyBlbnRyeScpICsgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvaGVhZGVyPicsIFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJib2R5XCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPlRFWFQ8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0XCI+PHRleHRhcmVhIGlkPVwibm90ZS10ZXh0XCIgcm93cz1cIjZcIj48L3RleHRhcmVhPjwvZGl2PicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidXR0b25zXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCInICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpICsgJ1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdBZGQnKSArICdcIj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9mb290ZXI+J10uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm0pXG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNhdmVCdG4gPSBib2R5LmZpbmQoJy5zdWJtaXQnKVxuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKVxuICAgICAgICB0aGlzLiRub3RlVGV4dGFyZWEgPSBib2R5LmZpbmQoJyNub3RlLXRleHQnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybSwgJ3N1Ym1pdCcsICdzYXZlJylcbiAgICB9LFxuXG4gICAgc2F2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLm5vdGUgPSB0aGlzLiRub3RlVGV4dGFyZWEudmFsKClcbiAgICAgICAgdGhpcy53aWRnZXQubm90ZSA9IHRoaXMubm90ZVxuXG4gICAgICAgIGlmICh0aGlzLm5vdGUgPT0gJycpIHtcbiAgICAgICAgICAgIEdhcm5pc2guc2hha2UodGhpcy4kY29udGFpbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdzYXZlJywge1xuICAgICAgICAgICAgICAgIG5vdGU6IHRoaXMubm90ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG59KVxuXG5Bc3NldE1hbmFnZW1lbnQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRlbGVtZW50czogbnVsbCxcblxuICAgIGluaXQoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoY29udGFpbmVyKVxuICAgICAgICB0aGlzLiRlbGVtZW50cyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuaXRlbS1hc3NldCcpXG5cbiAgICAgICAgdGhpcy4kZWxlbWVudHMuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBuZXcgQXNzZXRGaWxlKGVsKVxuICAgICAgICB9KTtcblxuICAgIH1cbn0pXG5cbkFzc2V0RmlsZSA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgIGVsZW1lbnQ6IG51bGwsXG5cbiAgICBpbml0KGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZWxlbWVudClcbiAgICB9XG59KVxuXG5DcmFmdC5GaWxlVXBsb2Fkc0luZGV4ID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogJCgnLnVwbG9hZC1kZXRhaWxzJyksXG4gICAgZWxlbWVudEluZGV4OiBudWxsLFxuXG4gICAgaW5pdChlbGVtZW50SW5kZXgsIGNvbnRhaW5lciwgc2V0dGluZ3MpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50cztcbiAgICAgICAgdGhpcy5lbGVtZW50SW5kZXggPSBlbGVtZW50SW5kZXg7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5zZXRTZXR0aW5ncyhzZXR0aW5ncywgQ3JhZnQuQmFzZUVsZW1lbnRJbmRleFZpZXcuZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLiRsb2FkaW5nTW9yZVNwaW5uZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2VudGVyYWxpZ24gaGlkZGVuXCI+JyArICc8ZGl2IGNsYXNzPVwic3Bpbm5lciBsb2FkaW5nbW9yZVwiPjwvZGl2PicgKyAnPC9kaXY+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudENvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudENvbnRhaW5lcigpO1xuICAgICAgICBcbiAgICAgICAgJGVsZW1lbnRzID0gdGhpcy4kZWxlbWVudENvbnRhaW5lci5jaGlsZHJlbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRleHQgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZWxlbWVudENvbnRhaW5lciwgJ2RibGNsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgbGV0ICR0YXJnZXQ7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5oYXNDbGFzcygnZWxlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJHRhcmdldDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICR0YXJnZXQuY2xvc2VzdCgnLmVsZW1lbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnRFZGl0b3IoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEVsZW1lbnRDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuJHRhYmxlID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJ3RhYmxlOmZpcnN0Jyk7XG4gICAgICAgIHRoaXMuJHRhYmxlLmNoaWxkcmVuKCd0Ym9keTpmaXJzdCcpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVFbGVtZW50RWRpdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIG5ldyBDcmFmdC5FbGVtZW50RWRpdG9yKCRlbGVtZW50LCB7XG4gICAgICAgICAgICBvblNhdmVFbGVtZW50OiAkLnByb3h5KChyZXNwb25zZSA9PiBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdBc3NldCB1cGRhdGVkJykpKSwgdGhpcylcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgY29uc3QgQUNUSU9OX0JUTl9DT05UQUlORVIgPSAkKCcuZWxlbWVudC1hY3Rpb25zJylcbiAgICBjb25zdCBBQ1RJT05fQVNTRVRTX0RPV05MT0FEX0JUTiA9ICQoJyNkb3dubG9hZC1hbGwtYXNzZXRzJylcbiAgICBcbiAgICBuZXcgV3JpdGVOb3RlV2lkZ2V0KCcubm90ZXMtd2lkZ2V0JylcbiAgICBuZXcgQXNzZXRNYW5hZ2VtZW50KCcjY29udGVudCcpXG5cbiAgICAkKCcuYXNzZXQtc2VsZWN0JykuZWFjaCgoaSwgZWwpID0+IHtcbiAgICAgICAgJChlbCkub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGVsKVxuICAgICAgICAgICAgaWQgPSAkdGFyZ2V0LmRhdGEoJ2Fzc2V0LWlkJylcbiAgICAgICAgICAgICR0YXJnZXQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEFDVElPTl9BU1NFVFNfRE9XTkxPQURfQlROLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgLy8gJCgnLmFzc2V0LXNlbGVjdCcpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGUpXG4gICAgLy8gfSlcblxuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCd1cGRhdGVFbGVtZW50cycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c0NvdW50O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU291cmNlO1xuICAgICAgICAgICAgbGV0IHVucmVhZEl0ZW1zO1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkZvcm1CdWlsZGVyLnVucmVhZENvdW50ID0gcmVzcG9uc2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbChyZXNwb25zZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZFNvdXJjZSA9IGUudGFyZ2V0Lmluc3RhbmNlU3RhdGUuc2VsZWN0ZWRTb3VyY2U7XG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52aWV3Ll90b3RhbFZpc2libGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52aWV3LiRlbGVtZW50Q29udGFpbmVyLmh0bWwoJChgPHRyPjx0ZCBjb2xzcGFuPVwiNlwiPiR7Q3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIk5vIGVudHJpZXMgYXZhaWxhYmxlXCIpfTwvdGQ+PC90cj5gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB1bnJlYWQgY291bnQgdXRpbGl0eSBuYXZcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9nZXQtdW5yZWFkLWVudHJpZXMnLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzb3VyY2VzIC5lbnRyeS1jb3VudCcpLmh0bWwoJycpXG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmdyb3VwZWQsIChrZXksIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWtleT1cImZvcm06JytrZXkrJ1wiXScpLmZpbmQoJy5lbnRyeS1jb3VudCcpLmh0bWwoZW50cmllcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UnKS5hZGRDbGFzcygnc2hvdycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UgLmNvdW50JykuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKHJlc3BvbnNlLnRlbXBsYXRlKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdW5yZWFkLW5vdGlmaWNhdGlvbnMnKS5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIHVucmVhZCBzdWJtaXNzaW9ucy4nKSsnPC9wPicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5zdWJtaXNzaW9uLWFjdGlvbi10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgJG1lbnU7XG4gICAgICAgIGxldCBlbnRyeUlkO1xuICAgICAgICBsZXQgZmlsZUlkcztcbiAgICAgICAgbGV0IGZvcm1JZDtcbiAgICAgICAgbGV0IHR5cGU7XG5cbiAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuICAgICAgICBmb3JtSWQgPSAkKHRoaXMpLmRhdGEoJ2Zvcm0taWQnKTtcbiAgICAgICAgZW50cnlJZCA9ICQodGhpcykuZGF0YSgnZW50cnktaWQnKTtcbiAgICAgICAgZmlsZUlkcyA9ICQodGhpcykuZGF0YSgnZmlsZS1pZHMnKTtcbiAgICAgICAgJG1lbnUgPSAkKCc8ZGl2IGNsYXNzPVwidG91dC1kcm9wZG93blwiLz4nKS5odG1sKCc8dWwgY2xhc3M9XCJmb3JtLWl0ZW0tbWVudVwiPicgKyAnPC91bD4nKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pc3Npb24nKSB7XG4gICAgICAgICAgICAkKCc8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImRlbGV0ZS1zdWJtaXNzaW9uXCI+RGVsZXRlIFN1Ym1pc3Npb248L2E+PC9saT4nKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZm9ybScpIHtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2Zvcm1zLyR7Zm9ybUlkfVwiPlZpZXcgRm9ybTwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1cGxvYWRzJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZGVsZXRlLWFsbC1maWxlc1wiPkRlbGV0ZSBBbGw8L2E+PC9saT5gKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNcIiBjbGFzcz1cImRvd25sb2FkLWFsbC1maWxlc1wiPkRvd25sb2FkIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IEdhcm5pc2guSFVEKCQodGhpcyksICRtZW51LCB7XG4gICAgICAgICAgICBodWRDbGFzczogJ2h1ZCBmYi1odWQgc3VibWlzc2lvbmh1ZCcsXG4gICAgICAgICAgICBjbG9zZU90aGVySFVEczogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1zdWJtaXNzaW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZDogZW50cnlJZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBlbnRyeT9cIikpKSB7XG4gICAgICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdFbnRyeSBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGZpbGVJZDogZmlsZUlkc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYWxsIGZpbGVzP1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnYXNzZXRzL2RlbGV0ZUZpbGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcudXBsb2FkLWRldGFpbHMnKS5wYXJlbnQoKS52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogJzEwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCgpID0+ICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnJlbW92ZSgpKSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRtZW51LmZpbmQoJy5kb3dubG9hZC1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Rvd25sb2FkaW5nLi4uJykpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgaWRzOiBmaWxlSWRzLFxuICAgICAgICAgICAgICBmb3JtSWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEFsbEZpbGVzJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGAvYWN0aW9ucy9mb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEZpbGVzP2ZpbGVQYXRoPSR7cmVzcG9uc2UuZmlsZVBhdGh9YDtcbiAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWQgU3VjY2Vzc2Z1bCcpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgcmVzcG9uc2UubWVzc2FnZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoaHVkSUQgaW4gR2FybmlzaC5IVUQuYWN0aXZlSFVEcykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9lbnRyaWVzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==