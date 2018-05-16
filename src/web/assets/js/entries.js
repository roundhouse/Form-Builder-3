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
            entryId: entryId
        };

        if (confirm(Craft.t("form-builder", "Deleting entry will remove all relevant assets and notes, are you sure?"))) {
            Craft.postActionRequest('form-builder/entries/delete', data, $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Deleting entry...'));

                    setTimeout(function () {
                        window.location.href = Craft.getCpUrl() + '/form-builder/entries';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjRhYjBiMzJlZmZlYTlmYjdhZTYiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZW50cmllcy5qcyJdLCJuYW1lcyI6WyJXcml0ZU5vdGVXaWRnZXQiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiR3aWRnZXQiLCIkYnRuIiwiJGxpc3QiLCIkbm90ZVRleHRhcmVhIiwiJHNwaW5uZXIiLCJtb2RhbCIsIm5vdGUiLCJlbnRyeUlkIiwiaW5pdCIsIndpZGdldCIsIiQiLCJmaW5kIiwiZGF0YSIsImFkZExpc3RlbmVyIiwib3Blbk5vdGVNb2RlbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIk5vdGVNb2RhbCIsIm9uIiwicHJveHkiLCJ1cGRhdGVOb3RlcyIsInJlbW92ZUNsYXNzIiwiQ3JhZnQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJhZGRDbGFzcyIsInVwZGF0ZU5vdGVzSHRtbCIsImhpZGUiLCJhdXRob3IiLCJmdWxsTmFtZSIsIiRtYXJrdXAiLCJwcmVwZW5kIiwicmVtb3ZlIiwiTW9kYWwiLCJib2R5Iiwic2VsZiIsImJhc2UiLCIkZm9ybSIsImFwcGVuZFRvIiwiJGJvZCIsInNldENvbnRhaW5lciIsImpvaW4iLCJzaG93IiwiJHNhdmVCdG4iLCIkY2FuY2VsQnRuIiwic2F2ZSIsInZhbCIsInNoYWtlIiwiJGNvbnRhaW5lciIsInRyaWdnZXIiLCJBc3NldE1hbmFnZW1lbnQiLCIkZWxlbWVudHMiLCIkdHJpZ2dlciIsImRvd25sb2FkQ291bnQiLCJjb250YWluZXIiLCIkc3RhdHVzIiwiZWFjaCIsImkiLCJlbCIsImVsZW1lbnQiLCJBc3NldEZpbGUiLCJ1cGRhdGVEb3dubG9hZEJ0biIsIml0ZW1zIiwiT2JqZWN0Iiwia2V5cyIsInN0b3JhZ2UiLCJsZW5ndGgiLCJodG1sIiwib25TdWJtaXQiLCJoYXNDbGFzcyIsInByb2dyZXNzQmFyIiwiUHJvZ3Jlc3NCYXIiLCJyZXNldFByb2dyZXNzQmFyIiwiJHByb2dyZXNzQmFyIiwidmVsb2NpdHkiLCJvcGFjaXR5IiwiY29tcGxldGUiLCJwb3N0RGF0YSIsImdldFBvc3REYXRhIiwicGFyYW1zIiwiZXhwYW5kUG9zdEFycmF5IiwiYXNzZXRzIiwiYWN0aW9uIiwiZXJyb3IiLCJhbGVydCIsInVwZGF0ZVByb2dyZXNzQmFyIiwiZG93bmxvYWRGaWxlIiwiJGlmcmFtZSIsImdldEFjdGlvblVybCIsImFwcGVuZCIsInNldFRpbWVvdXQiLCJkaXNwbGF5RXJyb3IiLCJvbkNvbXBsZXRlIiwibm9vcCIsIiRhbGxEb25lIiwiY3NzIiwid2lkdGgiLCJzZXRQcm9ncmVzc1BlcmNlbnRhZ2UiLCJzaG93QWxsRG9uZSIsImR1cmF0aW9uIiwic2V0U3RvcmFnZSIsIm5hbWVzcGFjZSIsImtleSIsInZhbHVlIiwidW5kZWZpbmVkIiwiZ2V0U3RvcmFnZSIsIiRzZWxlY3RCdG4iLCJwYXJlbnQiLCJpZCIsInRvZ2dsZVNlbGVjdGlvbiIsIiRkb2MiLCJyZWFkeSIsImVsZW1lbnRJbmRleCIsImVsZW1lbnRzQ291bnQiLCJzZWxlY3RlZFNvdXJjZSIsInVucmVhZEl0ZW1zIiwic3VjY2VzcyIsIndpbmRvdyIsIkZvcm1CdWlsZGVyIiwidW5yZWFkQ291bnQiLCJjb3VudCIsInRhcmdldCIsImluc3RhbmNlU3RhdGUiLCJ2aWV3IiwiX3RvdGFsVmlzaWJsZSIsIiRlbGVtZW50Q29udGFpbmVyIiwiZ3JvdXBlZCIsImVudHJpZXMiLCJ0b3RhbENvdW50IiwidGVtcGxhdGUiLCJjdXJyZW50VGFyZ2V0IiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImdldENwVXJsIiwiJG1lbnUiLCJmaWxlSWRzIiwiZm9ybUlkIiwidHlwZSIsImFkbWluVXJsIiwiSFVEIiwiaHVkQ2xhc3MiLCJjbG9zZU90aGVySFVEcyIsImZpbGVJZCIsImh1ZElEIiwiYWN0aXZlSFVEcyIsImlk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Y0FBUixFQUF3QkosU0FBU2lJLE9BQWpDLENBQXRCO0FBQ0g7O0FBRURGLDBCQUFVLEVBQVY7O0FBRUEscUJBQUtILEtBQUwsSUFBY3ZKLFFBQVFtSixHQUFSLENBQVlLLFVBQTFCLEVBQXNDO0FBQ2xDRSw0QkFBUUcsSUFBUixDQUFhN0osUUFBUW1KLEdBQVIsQ0FBWUssVUFBWixDQUF1QkQsS0FBdkIsRUFBOEJySCxJQUE5QixFQUFiO0FBQ0g7O0FBRUQsdUJBQU93SCxPQUFQO0FBQ0gsYUFqQnNFLEVBaUJuRSxJQWpCbUUsQ0FBdkU7QUFrQkgsU0EzQkQ7QUE2QkgsS0FwR0Q7QUFxR0gsQ0E3S0QsRSIsImZpbGUiOiIvcmVsZWFzZS9zcmMvd2ViL2Fzc2V0cy9qcy9lbnRyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjRhYjBiMzJlZmZlYTlmYjdhZTYiLCJsZXQgV3JpdGVOb3RlV2lkZ2V0XG5cbldyaXRlTm90ZVdpZGdldCA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICR3aWRnZXQ6IG51bGwsXG4gICAgJGJ0bjogbnVsbCxcbiAgICAkbGlzdDogbnVsbCxcbiAgICAkbm90ZVRleHRhcmVhOiBudWxsLFxuICAgICRzcGlubmVyOiBudWxsLFxuXG4gICAgbW9kYWw6IG51bGwsXG4gICAgbm90ZTogbnVsbCxcbiAgICBlbnRyeUlkOiBudWxsLFxuXG4gICAgaW5pdCh3aWRnZXQpIHtcbiAgICAgICAgdGhpcy4kd2lkZ2V0ID0gJCh3aWRnZXQpXG4gICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJHdpZGdldC5maW5kKCcjd3JpdGUtbm90ZS1idG4nKVxuICAgICAgICB0aGlzLiRsaXN0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5saXN0JylcbiAgICAgICAgdGhpcy4kc3Bpbm5lciA9IHRoaXMuJHdpZGdldC5maW5kKCcubG9hZGVyJylcblxuICAgICAgICB0aGlzLmVudHJ5SWQgPSB0aGlzLiR3aWRnZXQuZGF0YSgnZW50cnktaWQnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kYnRuLCAnY2xpY2snLCAnb3Blbk5vdGVNb2RlbCcpXG4gICAgfSxcblxuICAgIG9wZW5Ob3RlTW9kZWwoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMubW9kYWxcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgTm90ZU1vZGFsKHRoaXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IE5vdGVNb2RhbCh0aGlzKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vZGFsLm9uKCdzYXZlJywgJC5wcm94eSh0aGlzLCAndXBkYXRlTm90ZXMnKSlcbiAgICB9LFxuXG4gICAgdXBkYXRlTm90ZXMoZGF0YSkge1xuICAgICAgICB0aGlzLiRzcGlubmVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBub3RlOiB0aGlzLm5vdGUsXG4gICAgICAgICAgICBlbnRyeUlkOiB0aGlzLmVudHJ5SWRcbiAgICAgICAgfVxuXG4gICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvbm90ZXMvc2F2ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdGUgYWRkZWQnKSlcbiAgICAgICAgICAgICAgICB0aGlzLiRzcGlubmVyLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTm90ZXNIdG1sKHJlc3BvbnNlLm5vdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLCB0aGlzKSlcblxuICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKVxuICAgIH0sXG5cbiAgICB1cGRhdGVOb3Rlc0h0bWwoZGF0YSkge1xuICAgICAgICBsZXQgYXV0aG9yXG4gICAgICAgIGxldCBub3RlXG5cbiAgICAgICAgbm90ZSA9IGRhdGEubm90ZVxuICAgICAgICBhdXRob3IgPSBkYXRhLmF1dGhvci5mdWxsTmFtZVxuXG4gICAgICAgICRtYXJrdXAgPSAkKCc8ZGl2IGNsYXNzPVwibGlzdC1pdGVtIHBhZFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaXRlbS1tZXRhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIml0ZW0tbWV0YS1pY29uXCI+PGkgY2xhc3M9XCJmYXIgZmEtdXNlclwiPjwvaT48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIml0ZW0tbWV0YS10aXRsZVwiPicgKyBhdXRob3IgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpdGVtLW1ldGEtcmlnaHRcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdycpICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpdGVtLXRpdGxlXCI+JyArIG5vdGUgKyAnPC9kaXY+JyArXG4gICAgICAgICAgICAnPC9kaXY+JylcblxuICAgICAgICB0aGlzLiRsaXN0LnByZXBlbmQoJG1hcmt1cClcbiAgICAgICAgJCgnLm5vLWl0ZW1zJykucmVtb3ZlKClcbiAgICB9XG5cbn0pXG5cbk5vdGVNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICB3aWRnZXQ6IG51bGwsXG5cbiAgICBpbml0KHdpZGdldCkge1xuICAgICAgICB2YXIgYm9keSwgc2VsZlxuICAgICAgICBzZWxmID0gdGhpc1xuICAgICAgICB0aGlzLmJhc2UoKVxuXG4gICAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0XG5cbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoJzxmb3JtIGNsYXNzPVwibW9kYWwgZml0dGVkIGZvcm1idWlsZGVyLW1vZGFsXCI+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKVxuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKVxuICAgICAgICBcbiAgICAgICAgYm9keSA9ICQoW1xuICAgICAgICAgICAgJzxoZWFkZXI+JywgXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vdGUnKSArICc8L3NwYW4+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnN0cnVjdGlvbnNcIj4nICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0xlYXZlIGEgbm90ZSBmb3IgdGhpcyBlbnRyeScpICsgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvaGVhZGVyPicsIFxuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJib2R5XCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPicsXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPlRFWFQ8L2Rpdj4nLFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImlucHV0XCI+PHRleHRhcmVhIGlkPVwibm90ZS10ZXh0XCIgcm93cz1cIjZcIj48L3RleHRhcmVhPjwvZGl2PicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+JywgXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJidXR0b25zXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCInICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpICsgJ1wiPicsIFxuICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJyArIENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdBZGQnKSArICdcIj4nLCBcbiAgICAgICAgICAgICAgICAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9mb290ZXI+J10uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm0pXG5cbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNhdmVCdG4gPSBib2R5LmZpbmQoJy5zdWJtaXQnKVxuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKVxuICAgICAgICB0aGlzLiRub3RlVGV4dGFyZWEgPSBib2R5LmZpbmQoJyNub3RlLXRleHQnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybSwgJ3N1Ym1pdCcsICdzYXZlJylcbiAgICB9LFxuXG4gICAgc2F2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLm5vdGUgPSB0aGlzLiRub3RlVGV4dGFyZWEudmFsKClcbiAgICAgICAgdGhpcy53aWRnZXQubm90ZSA9IHRoaXMubm90ZVxuXG4gICAgICAgIGlmICh0aGlzLm5vdGUgPT0gJycpIHtcbiAgICAgICAgICAgIEdhcm5pc2guc2hha2UodGhpcy4kY29udGFpbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdzYXZlJywge1xuICAgICAgICAgICAgICAgIG5vdGU6IHRoaXMubm90ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG59KVxuXG5Bc3NldE1hbmFnZW1lbnQgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkY29udGFpbmVyOiBudWxsLFxuICAgICRlbGVtZW50czogbnVsbCxcbiAgICAkZm9ybTogbnVsbCxcbiAgICAkdHJpZ2dlcjogbnVsbCxcbiAgICBcbiAgICBkb3dubG9hZENvdW50OiBudWxsLFxuXG4gICAgaW5pdChjb250YWluZXIpIHtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyID0gJChjb250YWluZXIpXG4gICAgICAgIHRoaXMuJGVsZW1lbnRzID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJy5pdGVtLWFzc2V0JylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZvcm0gPSB0aGlzLiRjb250YWluZXIuZmluZCgnI2Rvd25sb2FkLWFsbC1hc3NldHMnKVxuICAgICAgICB0aGlzLiR0cmlnZ2VyID0gdGhpcy4kZm9ybS5maW5kKCdidXR0b24nKVxuICAgICAgICB0aGlzLmRvd25sb2FkQ291bnQgPSB0aGlzLiRmb3JtLmZpbmQoJy5hc3NldC1jb3VudCcpXG4gICAgICAgIHRoaXMuJHN0YXR1cyA9ICQoJy5kb3dubG9hZC1zdGF0dXMnLCB0aGlzLiRmb3JtKVxuXG4gICAgICAgIHRoaXMuJGVsZW1lbnRzLmVhY2goKGksIGVsKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50ID0gbmV3IEFzc2V0RmlsZShlbCwgdGhpcylcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm0sICdzdWJtaXQnLCAnb25TdWJtaXQnKVxuICAgIH0sXG5cbiAgICB1cGRhdGVEb3dubG9hZEJ0bigpIHtcbiAgICAgICAgaXRlbXMgPSBPYmplY3Qua2V5cyhBc3NldE1hbmFnZW1lbnQuc3RvcmFnZSkubGVuZ3RoXG5cbiAgICAgICAgaWYgKGl0ZW1zID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kb3dubG9hZENvdW50Lmh0bWwoaXRlbXMpXG4gICAgICAgICAgICB0aGlzLiR0cmlnZ2VyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kdHJpZ2dlci5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRDb3VudC5odG1sKCcwJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGlmICghdGhpcy4kdHJpZ2dlci5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhciA9IG5ldyBDcmFmdC5Qcm9ncmVzc0Jhcih0aGlzLiRzdGF0dXMpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucmVzZXRQcm9ncmVzc0JhcigpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuJHByb2dyZXNzQmFyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKVxuXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLiRwcm9ncmVzc0Jhci52ZWxvY2l0eSgnc3RvcCcpLnZlbG9jaXR5KHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICQucHJveHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3N0RGF0YSA9IEdhcm5pc2guZ2V0UG9zdERhdGEodGhpcy4kZm9ybSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IENyYWZ0LmV4cGFuZFBvc3RBcnJheShwb3N0RGF0YSlcblxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuYXNzZXRzID0gaXRlbXMgPSBBc3NldE1hbmFnZW1lbnQuc3RvcmFnZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KHBhcmFtcy5hY3Rpb24sIGRhdGEsICQucHJveHkoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzcG9uc2UuZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZG93bmxvYWRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaWZyYW1lID0gJCgnPGlmcmFtZS8+JywgeydzcmMnOiBDcmFmdC5nZXRBY3Rpb25VcmwoJ2Zvcm0tYnVpbGRlci9hc3NldHMvZG93bmxvYWQtZmlsZScsIHsnZmlsZW5hbWUnOiByZXNwb25zZS5kb3dubG9hZEZpbGV9KX0pLmhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLmFwcGVuZCgkaWZyYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLCAnb25Db21wbGV0ZScpLCAzMDApXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheUVycm9yKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdUaGVyZSB3YXMgYSBwcm9ibGVtIGRvd25sb2FkaW5nIGFzc2V0cy4gUGxlYXNlIGNoZWNrIHRoZSBDcmFmdCBsb2dzLicpKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogJC5ub29wXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRhbGxEb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYWxsRG9uZS5jc3MoJ29wYWNpdHknLCAwKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLiR0cmlnZ2VyLmFkZENsYXNzKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICB0aGlzLiR0cmlnZ2VyLnRyaWdnZXIoJ2JsdXInKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVByb2dyZXNzQmFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gMTAwXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIuc2V0UHJvZ3Jlc3NQZXJjZW50YWdlKHdpZHRoKVxuICAgIH0sXG5cbiAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbihzaG93QWxsRG9uZSkge1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLiRwcm9ncmVzc0Jhci52ZWxvY2l0eSh7b3BhY2l0eTogMH0sIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiAnZmFzdCcsIFxuICAgICAgICAgICAgY29tcGxldGU6ICQucHJveHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdHJpZ2dlci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuJHRyaWdnZXIudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgfSlcbiAgICB9XG5cbn0sIHtcbiAgICBzdG9yYWdlOiB7fSxcblxuICAgIHNldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXksIHZhbHVlLCByZW1vdmUgPSBmYWxzZSkge1xuICAgICAgICBpZiAodHlwZW9mIEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV0gPT0gdHlwZW9mIHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VbbmFtZXNwYWNlXSA9IHt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVtb3ZlKSB7XG4gICAgICAgICAgICBkZWxldGUgQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VbbmFtZXNwYWNlXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VbbmFtZXNwYWNlXVtrZXldID0gdmFsdWVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGdldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXkpIHtcbiAgICAgICAgaWYgKEFzc2V0TWFuYWdlbWVudC5zdG9yYWdlW25hbWVzcGFjZV0gJiYgQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VbbmFtZXNwYWNlXVtrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gQXNzZXRNYW5hZ2VtZW50LnN0b3JhZ2VbbmFtZXNwYWNlXVtrZXldXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH0sXG59KVxuXG5Bc3NldEZpbGUgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICBlbGVtZW50OiBudWxsLFxuICAgICRzZWxlY3RCdG46IG51bGwsXG5cbiAgICBwYXJlbnQ6IG51bGwsXG4gICAgaWQ6IG51bGwsXG5cbiAgICBpbml0KGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICAgICAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgICAgIHRoaXMuJHNlbGVjdEJ0biA9IHRoaXMuZWxlbWVudC5maW5kKCcuYXNzZXQtc2VsZWN0JylcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuJHNlbGVjdEJ0bi5kYXRhKCdhc3NldC1pZCcpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRzZWxlY3RCdG4sICdjbGljaycsICd0b2dnbGVTZWxlY3Rpb24nKVxuICAgIH0sXG5cbiAgICB0b2dnbGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRzZWxlY3RCdG4uaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICB0aGlzLiRzZWxlY3RCdG4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlbWVudC5zZXRTdG9yYWdlKHRoaXMuaWQsICdhc3NldCcsIHRoaXMuaWQsIHRydWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgIHRoaXMuJHNlbGVjdEJ0bi5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgIEFzc2V0TWFuYWdlbWVudC5zZXRTdG9yYWdlKHRoaXMuaWQsICdhc3NldCcsIHRoaXMuaWQpXG4gICAgICAgIH0gICBcblxuICAgICAgICB0aGlzLnBhcmVudC51cGRhdGVEb3dubG9hZEJ0bigpXG4gICAgfVxufSlcblxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+IHtcblxuICAgIG5ldyBXcml0ZU5vdGVXaWRnZXQoJy5ub3Rlcy13aWRnZXQnKVxuICAgIG5ldyBBc3NldE1hbmFnZW1lbnQoJyNtYWluJylcblxuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCd1cGRhdGVFbGVtZW50cycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c0NvdW50O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU291cmNlO1xuICAgICAgICAgICAgbGV0IHVucmVhZEl0ZW1zO1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkZvcm1CdWlsZGVyLnVucmVhZENvdW50ID0gcmVzcG9uc2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbChyZXNwb25zZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZFNvdXJjZSA9IGUudGFyZ2V0Lmluc3RhbmNlU3RhdGUuc2VsZWN0ZWRTb3VyY2U7XG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52aWV3Ll90b3RhbFZpc2libGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52aWV3LiRlbGVtZW50Q29udGFpbmVyLmh0bWwoJChgPHRyPjx0ZCBjb2xzcGFuPVwiNlwiPiR7Q3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIk5vIGVudHJpZXMgYXZhaWxhYmxlXCIpfTwvdGQ+PC90cj5gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB1bnJlYWQgY291bnQgdXRpbGl0eSBuYXZcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9nZXQtdW5yZWFkLWVudHJpZXMnLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzb3VyY2VzIC5lbnRyeS1jb3VudCcpLmh0bWwoJycpXG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmdyb3VwZWQsIChrZXksIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWtleT1cImZvcm06JytrZXkrJ1wiXScpLmZpbmQoJy5lbnRyeS1jb3VudCcpLmh0bWwoZW50cmllcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UnKS5hZGRDbGFzcygnc2hvdycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UgLmNvdW50JykuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKHJlc3BvbnNlLnRlbXBsYXRlKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdW5yZWFkLW5vdGlmaWNhdGlvbnMnKS5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIHVucmVhZCBzdWJtaXNzaW9ucy4nKSsnPC9wPicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBUT0RPOiBkZWxldGUgZW50cnkgYW5kIGFsbCBhc3NldHMgYW5kIG5vdGVzXG4gICAgJCgnI2RlbGV0ZS1lbnRyeScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGxldCBlbnRyeUlkID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2VudHJ5LWlkJylcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBlbnRyeUlkOiBlbnRyeUlkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiRGVsZXRpbmcgZW50cnkgd2lsbCByZW1vdmUgYWxsIHJlbGV2YW50IGFzc2V0cyBhbmQgbm90ZXMsIGFyZSB5b3Ugc3VyZT9cIikpKSB7XG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdEZWxldGluZyBlbnRyeS4uLicpKVxuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHtDcmFmdC5nZXRDcFVybCgpfS9mb3JtLWJ1aWxkZXIvZW50cmllc2BcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJCgnLnN1Ym1pc3Npb24tYWN0aW9uLXRyaWdnZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCAkbWVudTtcbiAgICAgICAgbGV0IGVudHJ5SWQ7XG4gICAgICAgIGxldCBmaWxlSWRzO1xuICAgICAgICBsZXQgZm9ybUlkO1xuICAgICAgICBsZXQgdHlwZTtcblxuICAgICAgICB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG4gICAgICAgIGZvcm1JZCA9ICQodGhpcykuZGF0YSgnZm9ybS1pZCcpO1xuICAgICAgICBlbnRyeUlkID0gJCh0aGlzKS5kYXRhKCdlbnRyeS1pZCcpO1xuICAgICAgICBmaWxlSWRzID0gJCh0aGlzKS5kYXRhKCdmaWxlLWlkcycpO1xuICAgICAgICAkbWVudSA9ICQoJzxkaXYgY2xhc3M9XCJ0b3V0LWRyb3Bkb3duXCIvPicpLmh0bWwoJzx1bCBjbGFzcz1cImZvcm0taXRlbS1tZW51XCI+JyArICc8L3VsPicpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnc3VibWlzc2lvbicpIHtcbiAgICAgICAgICAgICQoJzxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiZGVsZXRlLXN1Ym1pc3Npb25cIj5EZWxldGUgU3VibWlzc2lvbjwvYT48L2xpPicpLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdmb3JtJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZm9ybXMvJHtmb3JtSWR9XCI+VmlldyBGb3JtPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VwbG9hZHMnKSB7XG4gICAgICAgICAgICAkKGA8bGk+PGEgaHJlZj1cIiR7d2luZG93LkZvcm1CdWlsZGVyLmFkbWluVXJsfS9lbnRyaWVzXCIgY2xhc3M9XCJkZWxldGUtYWxsLWZpbGVzXCI+RGVsZXRlIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZG93bmxvYWQtYWxsLWZpbGVzXCI+RG93bmxvYWQgQWxsPC9hPjwvbGk+YCkuYXBwZW5kVG8oJG1lbnUuZmluZCgndWwnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBuZXcgR2FybmlzaC5IVUQoJCh0aGlzKSwgJG1lbnUsIHtcbiAgICAgICAgICAgIGh1ZENsYXNzOiAnaHVkIGZiLWh1ZCBzdWJtaXNzaW9uaHVkJyxcbiAgICAgICAgICAgIGNsb3NlT3RoZXJIVURzOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLXN1Ym1pc3Npb24nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGlkOiBlbnRyeUlkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGVudHJ5P1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0VudHJ5IGRlbGV0ZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc2A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkbWVudS5maW5kKCcuZGVsZXRlLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgZmlsZUlkOiBmaWxlSWRzXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KFwiZm9ybS1idWlsZGVyXCIsIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgZmlsZXM/XCIpKSkge1xuICAgICAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdhc3NldHMvZGVsZXRlRmlsZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGh1ZElEIGluIEdhcm5pc2guSFVELmFjdGl2ZUhVRHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnZlbG9jaXR5KCdmYWRlT3V0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAnMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoKCkgPT4gJCgnLnVwbG9hZC1kZXRhaWxzJykucGFyZW50KCkucmVtb3ZlKCkpLCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRvd25sb2FkLWFsbC1maWxlcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWRpbmcuLi4nKSk7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZHM6IGZpbGVJZHMsXG4gICAgICAgICAgICAgIGZvcm1JZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkQWxsRmlsZXMnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaHVkSUQ7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gYC9hY3Rpb25zL2Zvcm0tYnVpbGRlci9lbnRyaWVzL2Rvd25sb2FkRmlsZXM/ZmlsZVBhdGg9JHtyZXNwb25zZS5maWxlUGF0aH1gO1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdEb3dubG9hZCBTdWNjZXNzZnVsJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcihDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCByZXNwb25zZS5tZXNzYWdlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChHYXJuaXNoLkhVRC5hY3RpdmVIVURzW2h1ZElEXS5oaWRlKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RldmVsb3BtZW50L2pzL2VudHJpZXMuanMiXSwic291cmNlUm9vdCI6IiJ9