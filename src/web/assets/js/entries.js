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
/***/ (function(module, exports, __webpack_require__) {

var _this3 = this;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            delete this.modal;
            this.modal = new NoteModal(this);
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
        $('.no-items').remove();
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
    $form: null,
    $trigger: null,

    downloadCount: null,

    init: function init(container) {
        var _this2 = this;

        this.$container = $(container);
        this.$elements = this.$container.find('.item-asset');

        this.$form = this.$container.find('#download-all-assets');
        this.$trigger = this.$form.find('button');
        this.downloadCount = this.$form.find('.asset-count');
        this.$status = $('.download-status', this.$form);

        this.$elements.each(function (i, el) {
            element = new AssetFile(el, _this2);
        });

        this.addListener(this.$form, 'submit', 'onSubmit');
    },
    updateDownloadBtn: function updateDownloadBtn() {
        items = Object.keys(AssetManagement.storage).length;

        if (items > 0) {
            this.downloadCount.html(items);
            this.$trigger.removeClass('hidden');
        } else {
            this.$trigger.addClass('hidden');
            this.downloadCount.html('0');
        }
    },
    onSubmit: function onSubmit(e) {
        e.preventDefault();

        if (!this.$trigger.hasClass('disabled')) {
            if (!this.progressBar) {
                this.progressBar = new Craft.ProgressBar(this.$status);
            } else {
                this.progressBar.resetProgressBar();
            }

            this.progressBar.$progressBar.removeClass('hidden');

            this.progressBar.$progressBar.velocity('stop').velocity({
                opacity: 1
            }, {
                complete: $.proxy(function () {
                    var postData = Garnish.getPostData(this.$form);
                    var params = Craft.expandPostArray(postData);

                    params.assets = items = AssetManagement.storage;

                    var data = {
                        params: params
                    };

                    Craft.postActionRequest(params.action, data, $.proxy(function (response, textStatus) {
                        if (textStatus === 'success') {
                            if (response && response.error) {
                                alert(response.error);
                            }

                            this.updateProgressBar();

                            if (response && response.downloadFile) {
                                var $iframe = $('<iframe/>', { 'src': Craft.getActionUrl('form-builder/assets/download-file', { 'filename': response.downloadFile }) }).hide();
                                this.$form.append($iframe);
                            }

                            setTimeout($.proxy(this, 'onComplete'), 300);
                        } else {
                            Craft.cp.displayError(Craft.t('form-builder', 'There was a problem downloading assets. Please check the Craft logs.'));

                            this.onComplete(false);
                        }
                    }, this), {
                        complete: $.noop
                    });
                }, this)
            });

            if (this.$allDone) {
                this.$allDone.css('opacity', 0);
            }

            this.$trigger.addClass('disabled');
            this.$trigger.trigger('blur');
        }
    },


    updateProgressBar: function updateProgressBar() {
        var width = 100;
        this.progressBar.setProgressPercentage(width);
    },

    onComplete: function onComplete(showAllDone) {
        this.progressBar.$progressBar.velocity({ opacity: 0 }, {
            duration: 'fast',
            complete: $.proxy(function () {
                this.$trigger.removeClass('disabled');
                this.$trigger.trigger('focus');
            }, this)
        });
    }

}, {
    storage: {},

    setStorage: function setStorage(namespace, key, value) {
        var remove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (_typeof(AssetManagement.storage[namespace]) == ( true ? 'undefined' : _typeof(undefined))) {
            AssetManagement.storage[namespace] = {};
        }

        if (remove) {
            delete AssetManagement.storage[namespace];
        } else {
            AssetManagement.storage[namespace][key] = value;
        }
    },
    getStorage: function getStorage(namespace, key) {
        if (AssetManagement.storage[namespace] && AssetManagement.storage[namespace][key]) {
            return AssetManagement.storage[namespace][key];
        }

        return null;
    }
});

AssetFile = Garnish.Base.extend({
    element: null,
    $selectBtn: null,

    parent: null,
    id: null,

    init: function init(element, parent) {
        this.parent = parent;
        this.element = $(element);
        this.$selectBtn = this.element.find('.asset-select');
        this.id = this.$selectBtn.data('asset-id');

        this.addListener(this.$selectBtn, 'click', 'toggleSelection');
    },
    toggleSelection: function toggleSelection() {
        if (this.$selectBtn.hasClass('active')) {
            this.$selectBtn.removeClass('active');
            this.element.removeClass('selected');
            AssetManagement.setStorage(this.id, 'asset', this.id, true);
        } else {
            this.element.addClass('selected');
            this.$selectBtn.addClass('active');
            AssetManagement.setStorage(this.id, 'asset', this.id);
        }

        this.parent.updateDownloadBtn();
    }
});

Garnish.$doc.ready(function () {

    new WriteNoteWidget('.notes-widget');
    new AssetManagement('#main');

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
    // TODO: delete entry and all assets and notes
    $('#delete-entry').on('click', function (e) {
        var entryId = $(e.currentTarget).data('entry-id');
        var data = {
            id: entryId
        };

        if (confirm(Craft.t("form-builder", "Deleting entry will remove all relevant assets and notes, are you sure?"))) {
            Craft.postActionRequest('form-builder/entries/delete', data, $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Deleting entry...'));

                    setTimeout(function () {
                        window.location.href = window.FormBuilder.adminUrl + '/entries';
                    }, 2000);
                }
            }, _this3));
        }
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGM3OTFhZGVkYWIxMmRlMDI2NzUiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZW50cmllcy5qcyJdLCJuYW1lcyI6WyJXcml0ZU5vdGVXaWRnZXQiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiR3aWRnZXQiLCIkYnRuIiwiJGxpc3QiLCIkbm90ZVRleHRhcmVhIiwiJHNwaW5uZXIiLCJtb2RhbCIsIm5vdGUiLCJlbnRyeUlkIiwiaW5pdCIsIndpZGdldCIsIiQiLCJmaW5kIiwiZGF0YSIsImFkZExpc3RlbmVyIiwib3Blbk5vdGVNb2RlbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIk5vdGVNb2RhbCIsIm9uIiwicHJveHkiLCJ1cGRhdGVOb3RlcyIsInJlbW92ZUNsYXNzIiwiQ3JhZnQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJhZGRDbGFzcyIsInVwZGF0ZU5vdGVzSHRtbCIsImhpZGUiLCJhdXRob3IiLCJmdWxsTmFtZSIsIiRtYXJrdXAiLCJwcmVwZW5kIiwicmVtb3ZlIiwiTW9kYWwiLCJib2R5Iiwic2VsZiIsImJhc2UiLCIkZm9ybSIsImFwcGVuZFRvIiwiJGJvZCIsInNldENvbnRhaW5lciIsImpvaW4iLCJzaG93IiwiJHNhdmVCdG4iLCIkY2FuY2VsQnRuIiwic2F2ZSIsInZhbCIsInNoYWtlIiwiJGNvbnRhaW5lciIsInRyaWdnZXIiLCJBc3NldE1hbmFnZW1lbnQiLCIkZWxlbWVudHMiLCIkdHJpZ2dlciIsImRvd25sb2FkQ291bnQiLCJjb250YWluZXIiLCIkc3RhdHVzIiwiZWFjaCIsImkiLCJlbCIsImVsZW1lbnQiLCJBc3NldEZpbGUiLCJ1cGRhdGVEb3dubG9hZEJ0biIsIml0ZW1zIiwiT2JqZWN0Iiwia2V5cyIsInN0b3JhZ2UiLCJsZW5ndGgiLCJodG1sIiwib25TdWJtaXQiLCJoYXNDbGFzcyIsInByb2dyZXNzQmFyIiwiUHJvZ3Jlc3NCYXIiLCJyZXNldFByb2dyZXNzQmFyIiwiJHByb2dyZXNzQmFyIiwidmVsb2NpdHkiLCJvcGFjaXR5IiwiY29tcGxldGUiLCJwb3N0RGF0YSIsImdldFBvc3REYXRhIiwicGFyYW1zIiwiZXhwYW5kUG9zdEFycmF5IiwiYXNzZXRzIiwiYWN0aW9uIiwiZXJyb3IiLCJhbGVydCIsInVwZGF0ZVByb2dyZXNzQmFyIiwiZG93bmxvYWRGaWxlIiwiJGlmcmFtZSIsImdldEFjdGlvblVybCIsImFwcGVuZCIsInNldFRpbWVvdXQiLCJkaXNwbGF5RXJyb3IiLCJvbkNvbXBsZXRlIiwibm9vcCIsIiRhbGxEb25lIiwiY3NzIiwid2lkdGgiLCJzZXRQcm9ncmVzc1BlcmNlbnRhZ2UiLCJzaG93QWxsRG9uZSIsImR1cmF0aW9uIiwic2V0U3RvcmFnZSIsIm5hbWVzcGFjZSIsImtleSIsInZhbHVlIiwidW5kZWZpbmVkIiwiZ2V0U3RvcmFnZSIsIiRzZWxlY3RCdG4iLCJwYXJlbnQiLCJpZCIsInRvZ2dsZVNlbGVjdGlvbiIsIiRkb2MiLCJyZWFkeSIsImVsZW1lbnRJbmRleCIsImVsZW1lbnRzQ291bnQiLCJzZWxlY3RlZFNvdXJjZSIsInVucmVhZEl0ZW1zIiwic3VjY2VzcyIsIndpbmRvdyIsIkZvcm1CdWlsZGVyIiwidW5yZWFkQ291bnQiLCJjb3VudCIsInRhcmdldCIsImluc3RhbmNlU3RhdGUiLCJ2aWV3IiwiX3RvdGFsVmlzaWJsZSIsIiRlbGVtZW50Q29udGFpbmVyIiwiZ3JvdXBlZCIsImVudHJpZXMiLCJ0b3RhbENvdW50IiwidGVtcGxhdGUiLCJjdXJyZW50VGFyZ2V0IiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImFkbWluVXJsIiwiJG1lbnUiLCJmaWxlSWRzIiwiZm9ybUlkIiwidHlwZSIsIkhVRCIsImh1ZENsYXNzIiwiY2xvc2VPdGhlckhVRHMiLCJmaWxlSWQiLCJodWRJRCIsImFjdGl2ZUhVRHMiLCJpZHMiLCJyZXN1bHRz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QVIsRUFBd0JKLFNBQVNnSSxPQUFqQyxDQUF0QjtBQUNIOztBQUVERiwwQkFBVSxFQUFWOztBQUVBLHFCQUFLSCxLQUFMLElBQWN0SixRQUFRa0osR0FBUixDQUFZSyxVQUExQixFQUFzQztBQUNsQ0UsNEJBQVFHLElBQVIsQ0FBYTVKLFFBQVFrSixHQUFSLENBQVlLLFVBQVosQ0FBdUJELEtBQXZCLEVBQThCcEgsSUFBOUIsRUFBYjtBQUNIOztBQUVELHVCQUFPdUgsT0FBUDtBQUNILGFBakJzRSxFQWlCbkUsSUFqQm1FLENBQXZFO0FBa0JILFNBM0JEO0FBNkJILEtBcEdEO0FBcUdILENBN0tELEUiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRjNzkxYWRlZGFiMTJkZTAyNjc1IiwibGV0IFdyaXRlTm90ZVdpZGdldFxuXG5Xcml0ZU5vdGVXaWRnZXQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkd2lkZ2V0OiBudWxsLFxuICAgICRidG46IG51bGwsXG4gICAgJGxpc3Q6IG51bGwsXG4gICAgJG5vdGVUZXh0YXJlYTogbnVsbCxcbiAgICAkc3Bpbm5lcjogbnVsbCxcblxuICAgIG1vZGFsOiBudWxsLFxuICAgIG5vdGU6IG51bGwsXG4gICAgZW50cnlJZDogbnVsbCxcblxuICAgIGluaXQod2lkZ2V0KSB7XG4gICAgICAgIHRoaXMuJHdpZGdldCA9ICQod2lkZ2V0KVxuICAgICAgICB0aGlzLiRidG4gPSB0aGlzLiR3aWRnZXQuZmluZCgnI3dyaXRlLW5vdGUtYnRuJylcbiAgICAgICAgdGhpcy4kbGlzdCA9IHRoaXMuJHdpZGdldC5maW5kKCcubGlzdCcpXG4gICAgICAgIHRoaXMuJHNwaW5uZXIgPSB0aGlzLiR3aWRnZXQuZmluZCgnLmxvYWRlcicpXG5cbiAgICAgICAgdGhpcy5lbnRyeUlkID0gdGhpcy4kd2lkZ2V0LmRhdGEoJ2VudHJ5LWlkJylcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGJ0biwgJ2NsaWNrJywgJ29wZW5Ob3RlTW9kZWwnKVxuICAgIH0sXG5cbiAgICBvcGVuTm90ZU1vZGVsKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1vZGFsXG4gICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IE5vdGVNb2RhbCh0aGlzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBOb3RlTW9kYWwodGhpcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbC5vbignc2F2ZScsICQucHJveHkodGhpcywgJ3VwZGF0ZU5vdGVzJykpXG4gICAgfSxcblxuICAgIHVwZGF0ZU5vdGVzKGRhdGEpIHtcbiAgICAgICAgdGhpcy4kc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgbm90ZTogdGhpcy5ub3RlLFxuICAgICAgICAgICAgZW50cnlJZDogdGhpcy5lbnRyeUlkXG4gICAgICAgIH1cblxuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL25vdGVzL3NhdmUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdOb3RlIGFkZGVkJykpXG4gICAgICAgICAgICAgICAgdGhpcy4kc3Bpbm5lci5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vdGVzSHRtbChyZXNwb25zZS5ub3RlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSwgdGhpcykpXG5cbiAgICAgICAgdGhpcy5tb2RhbC5oaWRlKClcbiAgICB9LFxuXG4gICAgdXBkYXRlTm90ZXNIdG1sKGRhdGEpIHtcbiAgICAgICAgbGV0IGF1dGhvclxuICAgICAgICBsZXQgbm90ZVxuXG4gICAgICAgIG5vdGUgPSBkYXRhLm5vdGVcbiAgICAgICAgYXV0aG9yID0gZGF0YS5hdXRob3IuZnVsbE5hbWVcblxuICAgICAgICAkbWFya3VwID0gJCgnPGRpdiBjbGFzcz1cImxpc3QtaXRlbSBwYWRcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIml0ZW0tbWV0YVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpdGVtLW1ldGEtaWNvblwiPjxpIGNsYXNzPVwiZmFyIGZhLXVzZXJcIj48L2k+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpdGVtLW1ldGEtdGl0bGVcIj4nICsgYXV0aG9yICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaXRlbS1tZXRhLXJpZ2h0XCI+JyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdOb3cnKSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPicgKyBub3RlICsgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicpXG5cbiAgICAgICAgdGhpcy4kbGlzdC5wcmVwZW5kKCRtYXJrdXApXG4gICAgICAgICQoJy5uby1pdGVtcycpLnJlbW92ZSgpXG4gICAgfVxuXG59KVxuXG5Ob3RlTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgd2lkZ2V0OiBudWxsLFxuXG4gICAgaW5pdCh3aWRnZXQpIHtcbiAgICAgICAgdmFyIGJvZHksIHNlbGZcbiAgICAgICAgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5iYXNlKClcblxuICAgICAgICB0aGlzLndpZGdldCA9IHdpZGdldFxuXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbFwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZClcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybSlcbiAgICAgICAgXG4gICAgICAgIGJvZHkgPSAkKFtcbiAgICAgICAgICAgICc8aGVhZGVyPicsIFxuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdOb3RlJykgKyAnPC9zcGFuPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5zdHJ1Y3Rpb25zXCI+JyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdMZWF2ZSBhIG5vdGUgZm9yIHRoaXMgZW50cnknKSArICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2hlYWRlcj4nLCBcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYm9keVwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj5URVhUPC9kaXY+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dFwiPjx0ZXh0YXJlYSBpZD1cIm5vdGUtdGV4dFwiIHJvd3M9XCI2XCI+PC90ZXh0YXJlYT48L2Rpdj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsIFxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKSArICdcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQWRkJykgKyAnXCI+JywgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZm9vdGVyPiddLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtKVxuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLiRzYXZlQnRuID0gYm9keS5maW5kKCcuc3VibWl0JylcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJylcbiAgICAgICAgdGhpcy4kbm90ZVRleHRhcmVhID0gYm9keS5maW5kKCcjbm90ZS10ZXh0JylcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2hpZGUnKVxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm0sICdzdWJtaXQnLCAnc2F2ZScpXG4gICAgfSxcblxuICAgIHNhdmUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5ub3RlID0gdGhpcy4kbm90ZVRleHRhcmVhLnZhbCgpXG4gICAgICAgIHRoaXMud2lkZ2V0Lm5vdGUgPSB0aGlzLm5vdGVcblxuICAgICAgICBpZiAodGhpcy5ub3RlID09ICcnKSB7XG4gICAgICAgICAgICBHYXJuaXNoLnNoYWtlKHRoaXMuJGNvbnRhaW5lcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignc2F2ZScsIHtcbiAgICAgICAgICAgICAgICBub3RlOiB0aGlzLm5vdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxufSlcblxuQXNzZXRNYW5hZ2VtZW50ID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogbnVsbCxcbiAgICAkZWxlbWVudHM6IG51bGwsXG4gICAgJGZvcm06IG51bGwsXG4gICAgJHRyaWdnZXI6IG51bGwsXG4gICAgXG4gICAgZG93bmxvYWRDb3VudDogbnVsbCxcblxuICAgIGluaXQoY29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoY29udGFpbmVyKVxuICAgICAgICB0aGlzLiRlbGVtZW50cyA9IHRoaXMuJGNvbnRhaW5lci5maW5kKCcuaXRlbS1hc3NldCcpXG4gICAgICAgIFxuICAgICAgICB0aGlzLiRmb3JtID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJyNkb3dubG9hZC1hbGwtYXNzZXRzJylcbiAgICAgICAgdGhpcy4kdHJpZ2dlciA9IHRoaXMuJGZvcm0uZmluZCgnYnV0dG9uJylcbiAgICAgICAgdGhpcy5kb3dubG9hZENvdW50ID0gdGhpcy4kZm9ybS5maW5kKCcuYXNzZXQtY291bnQnKVxuICAgICAgICB0aGlzLiRzdGF0dXMgPSAkKCcuZG93bmxvYWQtc3RhdHVzJywgdGhpcy4kZm9ybSlcblxuICAgICAgICB0aGlzLiRlbGVtZW50cy5lYWNoKChpLCBlbCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudCA9IG5ldyBBc3NldEZpbGUoZWwsIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtLCAnc3VibWl0JywgJ29uU3VibWl0JylcbiAgICB9LFxuXG4gICAgdXBkYXRlRG93bmxvYWRCdG4oKSB7XG4gICAgICAgIGl0ZW1zID0gT2JqZWN0LmtleXMoQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2UpLmxlbmd0aFxuXG4gICAgICAgIGlmIChpdGVtcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRDb3VudC5odG1sKGl0ZW1zKVxuICAgICAgICAgICAgdGhpcy4kdHJpZ2dlci5yZW1vdmVDbGFzcygnaGlkZGVuJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHRyaWdnZXIuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkQ291bnQuaHRtbCgnMCcpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25TdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAoIXRoaXMuJHRyaWdnZXIuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIgPSBuZXcgQ3JhZnQuUHJvZ3Jlc3NCYXIodGhpcy4kc3RhdHVzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnJlc2V0UHJvZ3Jlc3NCYXIoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLiRwcm9ncmVzc0Jhci5yZW1vdmVDbGFzcygnaGlkZGVuJylcblxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci4kcHJvZ3Jlc3NCYXIudmVsb2NpdHkoJ3N0b3AnKS52ZWxvY2l0eSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAkLnByb3h5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zdERhdGEgPSBHYXJuaXNoLmdldFBvc3REYXRhKHRoaXMuJGZvcm0pXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSBDcmFmdC5leHBhbmRQb3N0QXJyYXkocG9zdERhdGEpXG5cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmFzc2V0cyA9IGl0ZW1zID0gQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdChwYXJhbXMuYWN0aW9uLCBkYXRhLCAkLnByb3h5KGZ1bmN0aW9uKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3BvbnNlLmVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRvd25sb2FkRmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlmcmFtZSA9ICQoJzxpZnJhbWUvPicsIHsnc3JjJzogQ3JhZnQuZ2V0QWN0aW9uVXJsKCdmb3JtLWJ1aWxkZXIvYXNzZXRzL2Rvd25sb2FkLWZpbGUnLCB7J2ZpbGVuYW1lJzogcmVzcG9uc2UuZG93bmxvYWRGaWxlfSl9KS5oaWRlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZm9ybS5hcHBlbmQoJGlmcmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCQucHJveHkodGhpcywgJ29uQ29tcGxldGUnKSwgMzAwKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcihDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnVGhlcmUgd2FzIGEgcHJvYmxlbSBkb3dubG9hZGluZyBhc3NldHMuIFBsZWFzZSBjaGVjayB0aGUgQ3JhZnQgbG9ncy4nKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZShmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ICQubm9vcFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAodGhpcy4kYWxsRG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsbERvbmUuY3NzKCdvcGFjaXR5JywgMClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy4kdHJpZ2dlci5hZGRDbGFzcygnZGlzYWJsZWQnKVxuICAgICAgICAgICAgdGhpcy4kdHJpZ2dlci50cmlnZ2VyKCdibHVyJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IDEwMFxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnNldFByb2dyZXNzUGVyY2VudGFnZSh3aWR0aClcbiAgICB9LFxuXG4gICAgb25Db21wbGV0ZTogZnVuY3Rpb24oc2hvd0FsbERvbmUpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci4kcHJvZ3Jlc3NCYXIudmVsb2NpdHkoe29wYWNpdHk6IDB9LCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogJ2Zhc3QnLCBcbiAgICAgICAgICAgIGNvbXBsZXRlOiAkLnByb3h5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHRyaWdnZXIucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgICAgICB0aGlzLiR0cmlnZ2VyLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgIH0pXG4gICAgfVxuXG59LCB7XG4gICAgc3RvcmFnZToge30sXG5cbiAgICBzZXRTdG9yYWdlKG5hbWVzcGFjZSwga2V5LCB2YWx1ZSwgcmVtb3ZlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBBc3NldE1hbmFnZW1lbnQuc3RvcmFnZVtuYW1lc3BhY2VdID09IHR5cGVvZiB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV0gPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgZGVsZXRlIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSA9IHZhbHVlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBnZXRTdG9yYWdlKG5hbWVzcGFjZSwga2V5KSB7XG4gICAgICAgIGlmIChBc3NldE1hbmFnZW1lbnQuc3RvcmFnZVtuYW1lc3BhY2VdICYmIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV1ba2V5XVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9LFxufSlcblxuQXNzZXRGaWxlID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgZWxlbWVudDogbnVsbCxcbiAgICAkc2VsZWN0QnRuOiBudWxsLFxuXG4gICAgcGFyZW50OiBudWxsLFxuICAgIGlkOiBudWxsLFxuXG4gICAgaW5pdChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KVxuICAgICAgICB0aGlzLiRzZWxlY3RCdG4gPSB0aGlzLmVsZW1lbnQuZmluZCgnLmFzc2V0LXNlbGVjdCcpXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLiRzZWxlY3RCdG4uZGF0YSgnYXNzZXQtaWQnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kc2VsZWN0QnRuLCAnY2xpY2snLCAndG9nZ2xlU2VsZWN0aW9uJylcbiAgICB9LFxuXG4gICAgdG9nZ2xlU2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy4kc2VsZWN0QnRuLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgdGhpcy4kc2VsZWN0QnRuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpXG4gICAgICAgICAgICBBc3NldE1hbmFnZW1lbnQuc2V0U3RvcmFnZSh0aGlzLmlkLCAnYXNzZXQnLCB0aGlzLmlkLCB0cnVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdzZWxlY3RlZCcpXG4gICAgICAgICAgICB0aGlzLiRzZWxlY3RCdG4uYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICBBc3NldE1hbmFnZW1lbnQuc2V0U3RvcmFnZSh0aGlzLmlkLCAnYXNzZXQnLCB0aGlzLmlkKVxuICAgICAgICB9ICAgXG5cbiAgICAgICAgdGhpcy5wYXJlbnQudXBkYXRlRG93bmxvYWRCdG4oKVxuICAgIH1cbn0pXG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG5cbiAgICBuZXcgV3JpdGVOb3RlV2lkZ2V0KCcubm90ZXMtd2lkZ2V0JylcbiAgICBuZXcgQXNzZXRNYW5hZ2VtZW50KCcjbWFpbicpXG5cbiAgICBpZiAoQ3JhZnQuZWxlbWVudEluZGV4KSB7XG4gICAgICAgIENyYWZ0LmVsZW1lbnRJbmRleC5vbigndXBkYXRlRWxlbWVudHMnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZWxlbWVudHNDb3VudDtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFNvdXJjZTtcbiAgICAgICAgICAgIGxldCB1bnJlYWRJdGVtcztcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2dldC11bnJlYWQtZW50cmllcycsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5Gb3JtQnVpbGRlci51bnJlYWRDb3VudCA9IHJlc3BvbnNlLmNvdW50O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJy50b3RhbC1lbnRyeS1jb3VudCcpLmh0bWwocmVzcG9uc2UuY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJy50b3RhbC1lbnRyeS1jb3VudCcpLmh0bWwoJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRTb3VyY2UgPSBlLnRhcmdldC5pbnN0YW5jZVN0YXRlLnNlbGVjdGVkU291cmNlO1xuXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmlldy5fdG90YWxWaXNpYmxlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmlldy4kZWxlbWVudENvbnRhaW5lci5odG1sKCQoYDx0cj48dGQgY29sc3Bhbj1cIjZcIj4ke0NyYWZ0LnQoXCJmb3JtLWJ1aWxkZXJcIiwgXCJObyBlbnRyaWVzIGF2YWlsYWJsZVwiKX08L3RkPjwvdHI+YCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdW5yZWFkIGNvdW50IHV0aWxpdHkgbmF2XG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjc291cmNlcyAuZW50cnktY291bnQnKS5odG1sKCcnKVxuXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5ncm91cGVkLCAoa2V5LCBlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdbZGF0YS1rZXk9XCJmb3JtOicra2V5KydcIl0nKS5maW5kKCcuZW50cnktY291bnQnKS5odG1sKGVudHJpZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS50b3RhbENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykuYWRkQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwocmVzcG9uc2UudG90YWxDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN1bnJlYWQtbm90aWZpY2F0aW9ucycpLmZpbmQoJy5ib2R5JykuaHRtbChyZXNwb25zZS50ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYi11bnJlYWQtY29udGFpbmVyIC5mYi1iYWRnZScpLnJlbW92ZUNsYXNzKCdzaG93JylcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mYi11bnJlYWQtY29udGFpbmVyIC5mYi1iYWRnZSAuY291bnQnKS5odG1sKCcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKCc8cCBjbGFzcz1cIm5vLWNvbnRlbnRcIj4nK0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdObyB1bnJlYWQgc3VibWlzc2lvbnMuJykrJzwvcD4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVE9ETzogZGVsZXRlIGVudHJ5IGFuZCBhbGwgYXNzZXRzIGFuZCBub3Rlc1xuICAgICQoJyNkZWxldGUtZW50cnknKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBsZXQgZW50cnlJZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdlbnRyeS1pZCcpXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6IGVudHJ5SWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maXJtKENyYWZ0LnQoXCJmb3JtLWJ1aWxkZXJcIiwgXCJEZWxldGluZyBlbnRyeSB3aWxsIHJlbW92ZSBhbGwgcmVsZXZhbnQgYXNzZXRzIGFuZCBub3RlcywgYXJlIHlvdSBzdXJlP1wiKSkpIHtcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9kZWxldGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0RlbGV0aW5nIGVudHJ5Li4uJykpXG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc2BcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJCgnLnN1Ym1pc3Npb24tYWN0aW9uLXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCAkbWVudTtcbiAgICAgICAgbGV0IGVudHJ5SWQ7XG4gICAgICAgIGxldCBmaWxlSWRzO1xuICAgICAgICBsZXQgZm9ybUlkO1xuICAgICAgICBsZXQgdHlwZTtcblxuICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG4gICAgICAgIGZvcm1JZCA9ICQodGhpcykuZGF0YSgnZm9ybS1pZCcpO1xuICAgICAgICBlbnRyeUlkID0gJCh0aGlzKS5kYXRhKCdlbnRyeS1pZCcpO1xuICAgICAgICBmaWxlSWRzID0gJCh0aGlzKS5kYXRhKCdmaWxlLWlkcycpO1xuICAgICAgICAkbWVudSA9ICQoJzxkaXYgY2xhc3M9XCJ0b3V0LWRyb3Bkb3duXCIvPicpLmh0bWwoJzx1bCBjbGFzcz1cImZvcm0taXRlbS1tZW51XCI+JyArICc8L3VsPicpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3VibWlzc2lvbicpIHtcbiAgICAgICAgICAgICQoJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiZGVsZXRlLXN1Ym1pc3Npb25cIj5EZWxldGUgU3VibWlzc2lvbjwvYT48L2xpPicpLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZm9ybXMvJHtmb3JtSWR9XCI+VmlldyBGb3JtPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VwbG9hZHMnKSB7XG4gICAgICAgICAgICAkKGA8bGk+PGEgaHJlZj1cIiR7d2luZG93LkZvcm1CdWlsZGVyLmFkbWluVXJsfS9lbnRyaWVzXCIgY2xhc3M9XCJkZWxldGUtYWxsLWZpbGVzXCI+RGVsZXRlIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZG93bmxvYWQtYWxsLWZpbGVzXCI+RG93bmxvYWQgQWxsPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXcgR2FybmlzaC5IVUQoJCh0aGlzKSwgJG1lbnUsIHtcbiAgICAgICAgICAgIGh1ZENsYXNzOiAnaHVkIGZiLWh1ZCBzdWJtaXNzaW9uaHVkJyxcbiAgICAgICAgICAgIGNsb3NlT3RoZXJIVURzOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLXN1Ym1pc3Npb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGlkOiBlbnRyeUlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGVudHJ5P1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0VudHJ5IGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc2A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlSWRzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgZmlsZXM/XCIpKSkge1xuICAgICAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdhc3NldHMvZGVsZXRlRmlsZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGh1ZElEIGluIEdhcm5pc2guSFVELmFjdGl2ZUhVRHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKCkgPT4gJCgnLnVwbG9hZC1kZXRhaWxzJykucGFyZW50KCkucmVtb3ZlKCkpLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRvd25sb2FkLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWRpbmcuLi4nKSk7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZHM6IGZpbGVJZHMsXG4gICAgICAgICAgICAgIGZvcm1JZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkQWxsRmlsZXMnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYC9hY3Rpb25zL2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkRmlsZXM/ZmlsZVBhdGg9JHtyZXNwb25zZS5maWxlUGF0aH1gO1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdEb3dubG9hZCBTdWNjZXNzZnVsJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcihDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCByZXNwb25zZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2VudHJpZXMuanMiXSwic291cmNlUm9vdCI6IiJ9