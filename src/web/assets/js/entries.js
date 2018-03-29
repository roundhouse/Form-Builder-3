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

    new WriteNoteWidget('.notes-widget');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTUxZmRjOGQ2MTE1MzI5ZjQzYWEiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZW50cmllcy5qcyJdLCJuYW1lcyI6WyJXcml0ZU5vdGVXaWRnZXQiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiR3aWRnZXQiLCIkYnRuIiwiJGxpc3QiLCIkbm90ZVRleHRhcmVhIiwiJHNwaW5uZXIiLCJtb2RhbCIsIm5vdGUiLCJlbnRyeUlkIiwiaW5pdCIsIndpZGdldCIsIiQiLCJmaW5kIiwiZGF0YSIsImFkZExpc3RlbmVyIiwib3Blbk5vdGVNb2RlbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNob3ciLCJOb3RlTW9kYWwiLCJvbiIsInByb3h5IiwidXBkYXRlTm90ZXMiLCJyZW1vdmVDbGFzcyIsIkNyYWZ0IiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiY3AiLCJkaXNwbGF5Tm90aWNlIiwidCIsImFkZENsYXNzIiwidXBkYXRlTm90ZXNIdG1sIiwiaGlkZSIsImF1dGhvciIsImZ1bGxOYW1lIiwiJG1hcmt1cCIsInByZXBlbmQiLCJNb2RhbCIsImJvZHkiLCJzZWxmIiwiYmFzZSIsIiRmb3JtIiwiYXBwZW5kVG8iLCIkYm9kIiwic2V0Q29udGFpbmVyIiwiam9pbiIsIiRzYXZlQnRuIiwiJGNhbmNlbEJ0biIsInNhdmUiLCJ2YWwiLCJzaGFrZSIsIiRjb250YWluZXIiLCJ0cmlnZ2VyIiwiRmlsZVVwbG9hZHNJbmRleCIsImVsZW1lbnRJbmRleCIsImNvbnRhaW5lciIsInNldHRpbmdzIiwiJGVsZW1lbnRzIiwic2V0U2V0dGluZ3MiLCJCYXNlRWxlbWVudEluZGV4VmlldyIsImRlZmF1bHRzIiwiJGxvYWRpbmdNb3JlU3Bpbm5lciIsImluc2VydEFmdGVyIiwiJGVsZW1lbnRDb250YWluZXIiLCJnZXRFbGVtZW50Q29udGFpbmVyIiwiY2hpbGRyZW4iLCJjb250ZXh0IiwiZXYiLCIkZWxlbWVudCIsIiR0YXJnZXQiLCJ0YXJnZXQiLCJoYXNDbGFzcyIsImNsb3Nlc3QiLCJsZW5ndGgiLCJjcmVhdGVFbGVtZW50RWRpdG9yIiwiJHRhYmxlIiwiRWxlbWVudEVkaXRvciIsIm9uU2F2ZUVsZW1lbnQiLCIkZG9jIiwicmVhZHkiLCJlbGVtZW50c0NvdW50Iiwic2VsZWN0ZWRTb3VyY2UiLCJ1bnJlYWRJdGVtcyIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJGb3JtQnVpbGRlciIsInVucmVhZENvdW50IiwiY291bnQiLCJodG1sIiwiaW5zdGFuY2VTdGF0ZSIsInZpZXciLCJfdG90YWxWaXNpYmxlIiwiZWFjaCIsImdyb3VwZWQiLCJrZXkiLCJlbnRyaWVzIiwidG90YWxDb3VudCIsInRlbXBsYXRlIiwiJG1lbnUiLCJmaWxlSWRzIiwiZm9ybUlkIiwidHlwZSIsImFkbWluVXJsIiwiSFVEIiwiaHVkQ2xhc3MiLCJjbG9zZU90aGVySFVEcyIsImlkIiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImZpbGVJZCIsImh1ZElEIiwiYWN0aXZlSFVEcyIsInBhcmVudCIsInZlbG9jaXR5IiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiaWRzIiwicmVzdWx0cyIsImZpbGVQYXRoIiwiZGlzcGxheUVycm9yIiwibWVzc2FnZSIsInB1c2giXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSx3QkFBSjs7QUFHQUEsa0JBQWtCQyxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDbENDLGFBQVMsSUFEeUI7QUFFbENDLFVBQU0sSUFGNEI7QUFHbENDLFdBQU8sSUFIMkI7QUFJbENDLG1CQUFlLElBSm1CO0FBS2xDQyxjQUFVLElBTHdCOztBQU9sQ0MsV0FBTyxJQVAyQjtBQVFsQ0MsVUFBTSxJQVI0QjtBQVNsQ0MsYUFBUyxJQVR5Qjs7QUFXbENDLFFBWGtDLGdCQVc3QkMsTUFYNkIsRUFXckI7QUFDVCxhQUFLVCxPQUFMLEdBQWVVLEVBQUVELE1BQUYsQ0FBZjtBQUNBLGFBQUtSLElBQUwsR0FBWSxLQUFLRCxPQUFMLENBQWFXLElBQWIsQ0FBa0IsaUJBQWxCLENBQVo7QUFDQSxhQUFLVCxLQUFMLEdBQWEsS0FBS0YsT0FBTCxDQUFhVyxJQUFiLENBQWtCLE9BQWxCLENBQWI7QUFDQSxhQUFLUCxRQUFMLEdBQWdCLEtBQUtKLE9BQUwsQ0FBYVcsSUFBYixDQUFrQixTQUFsQixDQUFoQjs7QUFFQSxhQUFLSixPQUFMLEdBQWUsS0FBS1AsT0FBTCxDQUFhWSxJQUFiLENBQWtCLFVBQWxCLENBQWY7O0FBRUEsYUFBS0MsV0FBTCxDQUFpQixLQUFLWixJQUF0QixFQUE0QixPQUE1QixFQUFxQyxlQUFyQztBQUVILEtBckJpQztBQXVCbENhLGlCQXZCa0MseUJBdUJwQkMsQ0F2Qm9CLEVBdUJqQjtBQUNiQSxVQUFFQyxjQUFGOztBQUVBLFlBQUksS0FBS1gsS0FBVCxFQUFnQjtBQUNaLGlCQUFLQSxLQUFMLENBQVdZLElBQVg7QUFDSCxTQUZELE1BRU87QUFDSCxpQkFBS1osS0FBTCxHQUFhLElBQUlhLFNBQUosQ0FBYyxJQUFkLENBQWI7QUFDSDs7QUFFRCxhQUFLYixLQUFMLENBQVdjLEVBQVgsQ0FBYyxNQUFkLEVBQXNCVCxFQUFFVSxLQUFGLENBQVEsSUFBUixFQUFjLGFBQWQsQ0FBdEI7QUFDSCxLQWpDaUM7QUFtQ2xDQyxlQW5Da0MsdUJBbUN0QlQsSUFuQ3NCLEVBbUNoQjtBQUFBOztBQUNkLGFBQUtSLFFBQUwsQ0FBY2tCLFdBQWQsQ0FBMEIsUUFBMUI7O0FBRUFWLGVBQU87QUFDSE4sa0JBQU0sS0FBS0EsSUFEUjtBQUVIQyxxQkFBUyxLQUFLQTtBQUZYLFNBQVA7O0FBS0FnQixjQUFNQyxpQkFBTixDQUF3Qix5QkFBeEIsRUFBbURaLElBQW5ELEVBQXlERixFQUFFVSxLQUFGLENBQVMsVUFBQ0ssUUFBRCxFQUFXQyxVQUFYLEVBQTBCO0FBQ3hGQyxvQkFBUUMsR0FBUixDQUFZSCxRQUFaOztBQUVBLGdCQUFJQyxlQUFlLFNBQW5CLEVBQThCO0FBQzFCSCxzQkFBTU0sRUFBTixDQUFTQyxhQUFULENBQXVCUCxNQUFNUSxDQUFOLENBQVEsY0FBUixFQUF3QixZQUF4QixDQUF2QjtBQUNBLHNCQUFLM0IsUUFBTCxDQUFjNEIsUUFBZCxDQUF1QixRQUF2QjtBQUNBLHNCQUFLQyxlQUFMLENBQXFCUixTQUFTbkIsSUFBOUI7QUFDSDtBQUNKLFNBUndELEVBUXJELElBUnFELENBQXpEOztBQVVBLGFBQUtELEtBQUwsQ0FBVzZCLElBQVg7QUFDSCxLQXREaUM7QUF3RGxDRCxtQkF4RGtDLDJCQXdEbEJyQixJQXhEa0IsRUF3RFo7QUFDbEIsWUFBSXVCLGVBQUo7QUFDQSxZQUFJN0IsYUFBSjs7QUFFQUEsZUFBT00sS0FBS04sSUFBWjtBQUNBNkIsaUJBQVN2QixLQUFLdUIsTUFBTCxDQUFZQyxRQUFyQjs7QUFFQUMsa0JBQVUzQixFQUFFLGdDQUNKLHlCQURJLEdBRUEsaUVBRkEsR0FHQSxnQ0FIQSxHQUdtQ3lCLE1BSG5DLEdBRzRDLFNBSDVDLEdBSUEsZ0NBSkEsR0FJbUNaLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLEtBQXhCLENBSm5DLEdBSW9FLFNBSnBFLEdBS0osUUFMSSxHQU1KLDBCQU5JLEdBTXlCekIsSUFOekIsR0FNZ0MsUUFOaEMsR0FPUixRQVBNLENBQVY7O0FBU0EsYUFBS0osS0FBTCxDQUFXb0MsT0FBWCxDQUFtQkQsT0FBbkI7QUFDSDtBQXpFaUMsQ0FBcEIsQ0FBbEI7O0FBNkVBbkIsWUFBWXJCLFFBQVEwQyxLQUFSLENBQWN4QyxNQUFkLENBQXFCO0FBQzdCVSxZQUFRLElBRHFCOztBQUc3QkQsUUFINkIsZ0JBR3hCQyxNQUh3QixFQUdoQjtBQUNULFlBQUkrQixJQUFKLEVBQVVDLElBQVY7QUFDQUEsZUFBTyxJQUFQO0FBQ0EsYUFBS0MsSUFBTDs7QUFFQSxhQUFLakMsTUFBTCxHQUFjQSxNQUFkOztBQUVBLGFBQUtrQyxLQUFMLEdBQWFqQyxFQUFFLCtDQUFGLEVBQW1Ea0MsUUFBbkQsQ0FBNEQvQyxRQUFRZ0QsSUFBcEUsQ0FBYjtBQUNBLGFBQUtDLFlBQUwsQ0FBa0IsS0FBS0gsS0FBdkI7O0FBRUFILGVBQU85QixFQUFFLENBQ0wsVUFESyxFQUVELCtCQUErQmEsTUFBTVEsQ0FBTixDQUFRLGNBQVIsRUFBd0IsTUFBeEIsQ0FBL0IsR0FBaUUsU0FGaEUsRUFHRCwrQkFBK0JSLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLDZCQUF4QixDQUEvQixHQUF3RixRQUh2RixFQUlMLFdBSkssRUFLTCxvQkFMSyxFQU1ELHdCQU5DLEVBT0csb0NBUEgsRUFRRyx3RUFSSCxFQVNELFFBVEMsRUFVTCxRQVZLLEVBV0wseUJBWEssRUFZRCx1QkFaQyxFQWFHLCtEQUErRFIsTUFBTVEsQ0FBTixDQUFRLGNBQVIsRUFBd0IsUUFBeEIsQ0FBL0QsR0FBbUcsSUFidEcsRUFjRywrREFBK0RSLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLEtBQXhCLENBQS9ELEdBQWdHLElBZG5HLEVBZUQsUUFmQyxFQWdCTCxXQWhCSyxFQWdCUWdCLElBaEJSLENBZ0JhLEVBaEJiLENBQUYsRUFnQm9CSCxRQWhCcEIsQ0FnQjZCLEtBQUtELEtBaEJsQyxDQUFQOztBQWtCQSxhQUFLMUIsSUFBTDtBQUNBLGFBQUsrQixRQUFMLEdBQWdCUixLQUFLN0IsSUFBTCxDQUFVLFNBQVYsQ0FBaEI7QUFDQSxhQUFLc0MsVUFBTCxHQUFrQlQsS0FBSzdCLElBQUwsQ0FBVSxTQUFWLENBQWxCO0FBQ0EsYUFBS1IsYUFBTCxHQUFxQnFDLEtBQUs3QixJQUFMLENBQVUsWUFBVixDQUFyQjs7QUFFQSxhQUFLRSxXQUFMLENBQWlCLEtBQUtvQyxVQUF0QixFQUFrQyxPQUFsQyxFQUEyQyxNQUEzQztBQUNBLGFBQUtwQyxXQUFMLENBQWlCLEtBQUs4QixLQUF0QixFQUE2QixRQUE3QixFQUF1QyxNQUF2QztBQUNILEtBdEM0QjtBQXdDN0JPLFFBeEM2QixnQkF3Q3hCbkMsQ0F4Q3dCLEVBd0NyQjtBQUNKQSxVQUFFQyxjQUFGO0FBQ0EsYUFBS1YsSUFBTCxHQUFZLEtBQUtILGFBQUwsQ0FBbUJnRCxHQUFuQixFQUFaO0FBQ0EsYUFBSzFDLE1BQUwsQ0FBWUgsSUFBWixHQUFtQixLQUFLQSxJQUF4Qjs7QUFFQSxZQUFJLEtBQUtBLElBQUwsSUFBYSxFQUFqQixFQUFxQjtBQUNqQlQsb0JBQVF1RCxLQUFSLENBQWMsS0FBS0MsVUFBbkI7QUFDSCxTQUZELE1BRU87QUFDSCxpQkFBS0MsT0FBTCxDQUFhLE1BQWIsRUFBcUI7QUFDakJoRCxzQkFBTSxLQUFLQTtBQURNLGFBQXJCO0FBR0g7QUFDSjtBQXBENEIsQ0FBckIsQ0FBWjs7QUF5REFpQixNQUFNZ0MsZ0JBQU4sR0FBeUIxRCxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDekNzRCxnQkFBWTNDLEVBQUUsaUJBQUYsQ0FENkI7QUFFekM4QyxrQkFBYyxJQUYyQjs7QUFJekNoRCxRQUp5QyxnQkFJcENnRCxZQUpvQyxFQUl0QkMsU0FKc0IsRUFJWEMsUUFKVyxFQUlEO0FBQ3BDLFlBQUlDLGtCQUFKO0FBQ0EsYUFBS0gsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxhQUFLSCxVQUFMLEdBQWtCM0MsRUFBRStDLFNBQUYsQ0FBbEI7QUFDQSxhQUFLRyxXQUFMLENBQWlCRixRQUFqQixFQUEyQm5DLE1BQU1zQyxvQkFBTixDQUEyQkMsUUFBdEQ7QUFDQSxhQUFLQyxtQkFBTCxHQUEyQnJELEVBQUUscUNBQXFDLHlDQUFyQyxHQUFpRixRQUFuRixFQUE2RnNELFdBQTdGLENBQXlHLEtBQUtYLFVBQTlHLENBQTNCO0FBQ0EsYUFBS1ksaUJBQUwsR0FBeUIsS0FBS0MsbUJBQUwsRUFBekI7O0FBRUFQLG9CQUFZLEtBQUtNLGlCQUFMLENBQXVCRSxRQUF2QixFQUFaOztBQUVBLFlBQUksS0FBS1QsUUFBTCxDQUFjVSxPQUFkLEtBQTBCLE9BQTlCLEVBQXVDO0FBQ25DLGlCQUFLdkQsV0FBTCxDQUFpQixLQUFLb0QsaUJBQXRCLEVBQXlDLFVBQXpDLEVBQXFELFVBQVNJLEVBQVQsRUFBYTtBQUM5RCxvQkFBSUMsUUFBSjtBQUNBLG9CQUFJQyxnQkFBSjtBQUNBQSwwQkFBVTdELEVBQUUyRCxHQUFHRyxNQUFMLENBQVY7O0FBRUEsb0JBQUlELFFBQVFFLFFBQVIsQ0FBaUIsU0FBakIsQ0FBSixFQUFpQztBQUM3QkgsK0JBQVdDLE9BQVg7QUFDSCxpQkFGRCxNQUVPO0FBQ0hELCtCQUFXQyxRQUFRRyxPQUFSLENBQWdCLFVBQWhCLENBQVg7QUFDSDs7QUFFRCxvQkFBSUosU0FBU0ssTUFBYixFQUFxQjtBQUNqQix5QkFBS0MsbUJBQUwsQ0FBeUJOLFFBQXpCO0FBQ0g7QUFDSixhQWREO0FBZUg7QUFDSixLQS9Cd0M7QUFpQ3pDSix1QkFqQ3lDLGlDQWlDbkI7QUFDbEIsYUFBS1csTUFBTCxHQUFjLEtBQUt4QixVQUFMLENBQWdCMUMsSUFBaEIsQ0FBcUIsYUFBckIsQ0FBZDtBQUNBLGFBQUtrRSxNQUFMLENBQVlWLFFBQVosQ0FBcUIsYUFBckI7QUFDSCxLQXBDd0M7QUFzQ3pDUyx1QkF0Q3lDLCtCQXNDckJOLFFBdENxQixFQXNDWDtBQUMxQixZQUFJL0MsTUFBTXVELGFBQVYsQ0FBd0JSLFFBQXhCLEVBQWtDO0FBQzlCUywyQkFBZXJFLEVBQUVVLEtBQUYsQ0FBUztBQUFBLHVCQUFZRyxNQUFNTSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJQLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGVBQXhCLENBQXZCLENBQVo7QUFBQSxhQUFULEVBQXdGLElBQXhGO0FBRGUsU0FBbEM7QUFHSDtBQTFDd0MsQ0FBcEIsQ0FBekI7O0FBNkNBbEMsUUFBUW1GLElBQVIsQ0FBYUMsS0FBYixDQUFtQixZQUFNOztBQUVyQixRQUFJckYsZUFBSixDQUFvQixlQUFwQjs7QUFFQSxRQUFJMkIsTUFBTWlDLFlBQVYsRUFBd0I7QUFDcEJqQyxjQUFNaUMsWUFBTixDQUFtQnJDLEVBQW5CLENBQXNCLGdCQUF0QixFQUF3QyxVQUFTSixDQUFULEVBQVk7QUFDaEQsZ0JBQUltRSxzQkFBSjtBQUNBLGdCQUFJQyx1QkFBSjtBQUNBLGdCQUFJQyxvQkFBSjs7QUFFQTdELGtCQUFNQyxpQkFBTixDQUF3Qix5Q0FBeEIsRUFBbUVkLEVBQUVVLEtBQUYsQ0FBUyxVQUFDSyxRQUFELEVBQVdDLFVBQVgsRUFBMEI7QUFDbEcsb0JBQUlELFNBQVM0RCxPQUFiLEVBQXNCO0FBQ2xCQywyQkFBT0MsV0FBUCxDQUFtQkMsV0FBbkIsR0FBaUMvRCxTQUFTZ0UsS0FBMUM7O0FBRUEsd0JBQUloRSxTQUFTZ0UsS0FBVCxHQUFpQixDQUFyQixFQUF3QjtBQUNwQiwrQkFBTy9FLEVBQUUsb0JBQUYsRUFBd0JnRixJQUF4QixDQUE2QmpFLFNBQVNnRSxLQUF0QyxDQUFQO0FBQ0gscUJBRkQsTUFFTztBQUNILCtCQUFPL0UsRUFBRSxvQkFBRixFQUF3QmdGLElBQXhCLENBQTZCLEVBQTdCLENBQVA7QUFDSDtBQUNKO0FBQ0osYUFWa0UsRUFVL0QsSUFWK0QsQ0FBbkU7O0FBWUFQLDZCQUFpQnBFLEVBQUV5RCxNQUFGLENBQVNtQixhQUFULENBQXVCUixjQUF4Qzs7QUFFQSxnQkFBSXBFLEVBQUV5RCxNQUFGLENBQVNvQixJQUFULENBQWNDLGFBQWQsS0FBZ0MsQ0FBcEMsRUFBdUM7QUFDbkM5RSxrQkFBRXlELE1BQUYsQ0FBU29CLElBQVQsQ0FBYzNCLGlCQUFkLENBQWdDeUIsSUFBaEMsQ0FBcUNoRiwyQkFBeUJhLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLHNCQUF4QixDQUF6QixnQkFBckM7QUFDSDs7QUFFRDtBQUNBUixrQkFBTUMsaUJBQU4sQ0FBd0IseUNBQXhCLEVBQW1FZCxFQUFFVSxLQUFGLENBQVMsVUFBQ0ssUUFBRCxFQUFXQyxVQUFYLEVBQTBCO0FBQ2xHLG9CQUFJQSxlQUFlLFNBQW5CLEVBQThCO0FBQzFCaEIsc0JBQUUsdUJBQUYsRUFBMkJnRixJQUEzQixDQUFnQyxFQUFoQzs7QUFFQWhGLHNCQUFFb0YsSUFBRixDQUFPckUsU0FBU3NFLE9BQWhCLEVBQXlCLFVBQUNDLEdBQUQsRUFBTUMsT0FBTixFQUFrQjtBQUN2Q3ZGLDBCQUFFLHFCQUFtQnNGLEdBQW5CLEdBQXVCLElBQXpCLEVBQStCckYsSUFBL0IsQ0FBb0MsY0FBcEMsRUFBb0QrRSxJQUFwRCxDQUF5RE8sUUFBUXRCLE1BQWpFO0FBQ0gscUJBRkQ7O0FBSUEsd0JBQUlsRCxTQUFTeUUsVUFBVCxHQUFzQixDQUExQixFQUE2QjtBQUN6QnhGLDBCQUFFLGdDQUFGLEVBQW9Dc0IsUUFBcEMsQ0FBNkMsTUFBN0M7QUFDQXRCLDBCQUFFLHVDQUFGLEVBQTJDZ0YsSUFBM0MsQ0FBZ0RqRSxTQUFTeUUsVUFBekQ7QUFDQXhGLDBCQUFFLHVCQUFGLEVBQTJCQyxJQUEzQixDQUFnQyxPQUFoQyxFQUF5QytFLElBQXpDLENBQThDakUsU0FBUzBFLFFBQXZEO0FBQ0gscUJBSkQsTUFJTztBQUNIekYsMEJBQUUsZ0NBQUYsRUFBb0NZLFdBQXBDLENBQWdELE1BQWhEO0FBQ0FaLDBCQUFFLHVDQUFGLEVBQTJDZ0YsSUFBM0MsQ0FBZ0QsRUFBaEQ7QUFDQWhGLDBCQUFFLHVCQUFGLEVBQTJCQyxJQUEzQixDQUFnQyxPQUFoQyxFQUF5QytFLElBQXpDLENBQThDLDJCQUF5Qm5FLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLHdCQUF4QixDQUF6QixHQUEyRSxNQUF6SDtBQUNIO0FBQ0o7QUFDSixhQWxCa0UsRUFrQi9ELElBbEIrRCxDQUFuRTtBQW1CSCxTQTNDRDtBQTRDSDs7QUFFRHJCLE1BQUUsNEJBQUYsRUFBZ0NTLEVBQWhDLENBQW1DLE9BQW5DLEVBQTRDLFVBQVNKLENBQVQsRUFBWTtBQUNwREEsVUFBRUMsY0FBRjs7QUFFQSxZQUFJb0YsY0FBSjtBQUNBLFlBQUk3RixnQkFBSjtBQUNBLFlBQUk4RixnQkFBSjtBQUNBLFlBQUlDLGVBQUo7QUFDQSxZQUFJQyxhQUFKOztBQUVBQSxlQUFPN0YsRUFBRSxJQUFGLEVBQVFFLElBQVIsQ0FBYSxNQUFiLENBQVA7QUFDQTBGLGlCQUFTNUYsRUFBRSxJQUFGLEVBQVFFLElBQVIsQ0FBYSxTQUFiLENBQVQ7QUFDQUwsa0JBQVVHLEVBQUUsSUFBRixFQUFRRSxJQUFSLENBQWEsVUFBYixDQUFWO0FBQ0F5RixrQkFBVTNGLEVBQUUsSUFBRixFQUFRRSxJQUFSLENBQWEsVUFBYixDQUFWO0FBQ0F3RixnQkFBUTFGLEVBQUUsOEJBQUYsRUFBa0NnRixJQUFsQyxDQUF1QyxnQ0FBZ0MsT0FBdkUsQ0FBUjs7QUFFQSxZQUFJYSxTQUFTLFlBQWIsRUFBMkI7QUFDdkI3RixjQUFFLHNFQUFGLEVBQTBFa0MsUUFBMUUsQ0FBbUZ3RCxNQUFNekYsSUFBTixDQUFXLElBQVgsQ0FBbkY7QUFDSCxTQUZELE1BRU8sSUFBSTRGLFNBQVMsTUFBYixFQUFxQjtBQUN4QjdGLGdDQUFrQjRFLE9BQU9DLFdBQVAsQ0FBbUJpQixRQUFyQyxlQUF1REYsTUFBdkQsMkJBQXFGMUQsUUFBckYsQ0FBOEZ3RCxNQUFNekYsSUFBTixDQUFXLElBQVgsQ0FBOUY7QUFDSCxTQUZNLE1BRUEsSUFBSTRGLFNBQVMsU0FBYixFQUF3QjtBQUMzQjdGLGdDQUFrQjRFLE9BQU9DLFdBQVAsQ0FBbUJpQixRQUFyQyw2REFBdUc1RCxRQUF2RyxDQUFnSHdELE1BQU16RixJQUFOLENBQVcsSUFBWCxDQUFoSDtBQUNBRCxnQ0FBa0I0RSxPQUFPQyxXQUFQLENBQW1CaUIsUUFBckMsaUVBQTJHNUQsUUFBM0csQ0FBb0h3RCxNQUFNekYsSUFBTixDQUFXLElBQVgsQ0FBcEg7QUFDSDs7QUFFRCxZQUFJZCxRQUFRNEcsR0FBWixDQUFnQi9GLEVBQUUsSUFBRixDQUFoQixFQUF5QjBGLEtBQXpCLEVBQWdDO0FBQzVCTSxzQkFBVSwwQkFEa0I7QUFFNUJDLDRCQUFnQjtBQUZZLFNBQWhDOztBQUtBUCxjQUFNekYsSUFBTixDQUFXLG9CQUFYLEVBQWlDUSxFQUFqQyxDQUFvQyxPQUFwQyxFQUE2QyxVQUFTSixDQUFULEVBQVk7QUFDckRBLGNBQUVDLGNBQUY7QUFDQSxnQkFBSUosYUFBSjtBQUNBQSxtQkFBTztBQUNMZ0csb0JBQUlyRztBQURDLGFBQVA7O0FBSUEsZ0JBQUlzRyxRQUFRdEYsTUFBTVEsQ0FBTixDQUFRLGNBQVIsRUFBd0IsNkNBQXhCLENBQVIsQ0FBSixFQUFxRjtBQUNqRlIsc0JBQU1DLGlCQUFOLENBQXdCLDZCQUF4QixFQUF1RFosSUFBdkQsRUFBNkRGLEVBQUVVLEtBQUYsQ0FBUyxVQUFDSyxRQUFELEVBQVdDLFVBQVgsRUFBMEI7QUFDNUYsd0JBQUlBLGVBQWUsU0FBbkIsRUFBOEI7QUFDMUJILDhCQUFNTSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJQLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGVBQXhCLENBQXZCO0FBQ0F1RCwrQkFBT3dCLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQTBCekIsT0FBT0MsV0FBUCxDQUFtQmlCLFFBQTdDO0FBQ0g7QUFDSixpQkFMNEQsRUFLekQsSUFMeUQsQ0FBN0Q7QUFNSDtBQUNKLFNBZkQ7O0FBaUJBSixjQUFNekYsSUFBTixDQUFXLG1CQUFYLEVBQWdDUSxFQUFoQyxDQUFtQyxPQUFuQyxFQUE0QyxVQUFTSixDQUFULEVBQVk7QUFDcEQsZ0JBQUlILGFBQUo7QUFDQUcsY0FBRUMsY0FBRjtBQUNBSixtQkFBTztBQUNMb0csd0JBQVFYO0FBREgsYUFBUDs7QUFJQSxnQkFBSVEsUUFBUXRGLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLDRDQUF4QixDQUFSLENBQUosRUFBb0Y7QUFDaEZSLHNCQUFNQyxpQkFBTixDQUF3QixtQkFBeEIsRUFBNkNaLElBQTdDLEVBQW1ERixFQUFFVSxLQUFGLENBQVMsVUFBQ0ssUUFBRCxFQUFXQyxVQUFYLEVBQTBCO0FBQ2xGLHdCQUFJdUYsY0FBSjtBQUNBLHdCQUFJeEYsU0FBUzRELE9BQWIsRUFBc0I7QUFDbEIsNkJBQUs0QixLQUFMLElBQWNwSCxRQUFRNEcsR0FBUixDQUFZUyxVQUExQixFQUFzQztBQUNsQ3JILG9DQUFRNEcsR0FBUixDQUFZUyxVQUFaLENBQXVCRCxLQUF2QixFQUE4Qi9FLElBQTlCO0FBQ0g7O0FBRUR4QiwwQkFBRSxpQkFBRixFQUFxQnlHLE1BQXJCLEdBQThCQyxRQUE5QixDQUF1QyxTQUF2QyxFQUFrRDtBQUM5Q0Msc0NBQVU7QUFEb0MseUJBQWxEOztBQUlGLCtCQUFPQyxXQUFZO0FBQUEsbUNBQU01RyxFQUFFLGlCQUFGLEVBQXFCeUcsTUFBckIsR0FBOEJJLE1BQTlCLEVBQU47QUFBQSx5QkFBWixFQUEyRCxHQUEzRCxDQUFQO0FBQ0Q7QUFDSixpQkFia0QsRUFhL0MsSUFiK0MsQ0FBbkQ7QUFjSDtBQUNKLFNBdkJEOztBQXlCQW5CLGNBQU16RixJQUFOLENBQVcscUJBQVgsRUFBa0NRLEVBQWxDLENBQXFDLE9BQXJDLEVBQThDLFVBQVNKLENBQVQsRUFBWTtBQUN0REEsY0FBRUMsY0FBRjtBQUNBLGdCQUFJSixhQUFKO0FBQ0FXLGtCQUFNTSxFQUFOLENBQVNDLGFBQVQsQ0FBdUJQLE1BQU1RLENBQU4sQ0FBUSxjQUFSLEVBQXdCLGdCQUF4QixDQUF2QjtBQUNBbkIsbUJBQU87QUFDTDRHLHFCQUFLbkIsT0FEQTtBQUVMQztBQUZLLGFBQVA7O0FBS0EvRSxrQkFBTUMsaUJBQU4sQ0FBd0IsdUNBQXhCLEVBQWlFWixJQUFqRSxFQUF1RUYsRUFBRVUsS0FBRixDQUFTLFVBQUNLLFFBQUQsRUFBV0MsVUFBWCxFQUEwQjtBQUN0RyxvQkFBSXVGLGNBQUo7QUFDQSxvQkFBSVEsZ0JBQUo7QUFDQSxvQkFBSWhHLFNBQVM0RCxPQUFiLEVBQXNCO0FBQ2xCQywyQkFBT3dCLFFBQVAsNkRBQTBFckYsU0FBU2lHLFFBQW5GO0FBQ0FuRywwQkFBTU0sRUFBTixDQUFTQyxhQUFULENBQXVCUCxNQUFNUSxDQUFOLENBQVEsY0FBUixFQUF3QixxQkFBeEIsQ0FBdkI7QUFDSCxpQkFIRCxNQUdPO0FBQ0hSLDBCQUFNTSxFQUFOLENBQVM4RixZQUFULENBQXNCcEcsTUFBTVEsQ0FBTixDQUFRLGNBQVIsRUFBd0JOLFNBQVNtRyxPQUFqQyxDQUF0QjtBQUNIOztBQUVESCwwQkFBVSxFQUFWOztBQUVBLHFCQUFLUixLQUFMLElBQWNwSCxRQUFRNEcsR0FBUixDQUFZUyxVQUExQixFQUFzQztBQUNsQ08sNEJBQVFJLElBQVIsQ0FBYWhJLFFBQVE0RyxHQUFSLENBQVlTLFVBQVosQ0FBdUJELEtBQXZCLEVBQThCL0UsSUFBOUIsRUFBYjtBQUNIOztBQUVELHVCQUFPdUYsT0FBUDtBQUNILGFBakJzRSxFQWlCbkUsSUFqQm1FLENBQXZFO0FBa0JILFNBM0JEO0FBNkJILEtBcEdEO0FBcUdILENBeEpELEUiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL3dlYi9hc3NldHMvanMvZW50cmllcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU1MWZkYzhkNjExNTMyOWY0M2FhIiwibGV0IFdyaXRlTm90ZVdpZGdldFxuXG5cbldyaXRlTm90ZVdpZGdldCA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICR3aWRnZXQ6IG51bGwsXG4gICAgJGJ0bjogbnVsbCxcbiAgICAkbGlzdDogbnVsbCxcbiAgICAkbm90ZVRleHRhcmVhOiBudWxsLFxuICAgICRzcGlubmVyOiBudWxsLFxuXG4gICAgbW9kYWw6IG51bGwsXG4gICAgbm90ZTogbnVsbCxcbiAgICBlbnRyeUlkOiBudWxsLFxuXG4gICAgaW5pdCh3aWRnZXQpIHtcbiAgICAgICAgdGhpcy4kd2lkZ2V0ID0gJCh3aWRnZXQpXG4gICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJHdpZGdldC5maW5kKCcjd3JpdGUtbm90ZS1idG4nKVxuICAgICAgICB0aGlzLiRsaXN0ID0gdGhpcy4kd2lkZ2V0LmZpbmQoJy5saXN0JylcbiAgICAgICAgdGhpcy4kc3Bpbm5lciA9IHRoaXMuJHdpZGdldC5maW5kKCcubG9hZGVyJylcblxuICAgICAgICB0aGlzLmVudHJ5SWQgPSB0aGlzLiR3aWRnZXQuZGF0YSgnZW50cnktaWQnKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kYnRuLCAnY2xpY2snLCAnb3Blbk5vdGVNb2RlbCcpXG5cbiAgICB9LFxuXG4gICAgb3Blbk5vdGVNb2RlbChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLnNob3coKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBOb3RlTW9kYWwodGhpcylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5tb2RhbC5vbignc2F2ZScsICQucHJveHkodGhpcywgJ3VwZGF0ZU5vdGVzJykpXG4gICAgfSxcblxuICAgIHVwZGF0ZU5vdGVzKGRhdGEpIHtcbiAgICAgICAgdGhpcy4kc3Bpbm5lci5yZW1vdmVDbGFzcygnaGlkZGVuJylcblxuICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgbm90ZTogdGhpcy5ub3RlLFxuICAgICAgICAgICAgZW50cnlJZDogdGhpcy5lbnRyeUlkXG4gICAgICAgIH1cblxuICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL25vdGVzL3NhdmUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuXG4gICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTm90ZSBhZGRlZCcpKVxuICAgICAgICAgICAgICAgIHRoaXMuJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOb3Rlc0h0bWwocmVzcG9uc2Uubm90ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIHRoaXMpKVxuXG4gICAgICAgIHRoaXMubW9kYWwuaGlkZSgpXG4gICAgfSxcblxuICAgIHVwZGF0ZU5vdGVzSHRtbChkYXRhKSB7XG4gICAgICAgIGxldCBhdXRob3JcbiAgICAgICAgbGV0IG5vdGVcblxuICAgICAgICBub3RlID0gZGF0YS5ub3RlXG4gICAgICAgIGF1dGhvciA9IGRhdGEuYXV0aG9yLmZ1bGxOYW1lXG5cbiAgICAgICAgJG1hcmt1cCA9ICQoJzxkaXYgY2xhc3M9XCJsaXN0LWl0ZW0gcGFkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpdGVtLW1ldGFcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaXRlbS1tZXRhLWljb25cIj48aSBjbGFzcz1cImZhciBmYS11c2VyXCI+PC9pPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiaXRlbS1tZXRhLXRpdGxlXCI+JyArIGF1dGhvciArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIml0ZW0tbWV0YS1yaWdodFwiPicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTm93JykgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4nICsgbm90ZSArICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nKVxuXG4gICAgICAgIHRoaXMuJGxpc3QucHJlcGVuZCgkbWFya3VwKVxuICAgIH1cblxufSlcblxuTm90ZU1vZGFsID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgIHdpZGdldDogbnVsbCxcblxuICAgIGluaXQod2lkZ2V0KSB7XG4gICAgICAgIHZhciBib2R5LCBzZWxmXG4gICAgICAgIHNlbGYgPSB0aGlzXG4gICAgICAgIHRoaXMuYmFzZSgpXG5cbiAgICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXRcblxuICAgICAgICB0aGlzLiRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpXG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm0pXG4gICAgICAgIFxuICAgICAgICBib2R5ID0gJChbXG4gICAgICAgICAgICAnPGhlYWRlcj4nLCBcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTm90ZScpICsgJzwvc3Bhbj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImluc3RydWN0aW9uc1wiPicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTGVhdmUgYSBub3RlIGZvciB0aGlzIGVudHJ5JykgKyAnPC9kaXY+JywgXG4gICAgICAgICAgICAnPC9oZWFkZXI+JywgXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJvZHlcIj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+JyxcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+VEVYVDwvZGl2PicsXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5wdXRcIj48dGV4dGFyZWEgaWQ9XCJub3RlLXRleHRcIiByb3dzPVwiNlwiPjwvdGV4dGFyZWE+PC9kaXY+JywgXG4gICAgICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzwvZGl2PicsIFxuICAgICAgICAgICAgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCBcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIicgKyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJykgKyAnXCI+JywgXG4gICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCInICsgQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0FkZCcpICsgJ1wiPicsIFxuICAgICAgICAgICAgICAgICc8L2Rpdj4nLCBcbiAgICAgICAgICAgICc8L2Zvb3Rlcj4nXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybSlcblxuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2F2ZUJ0biA9IGJvZHkuZmluZCgnLnN1Ym1pdCcpXG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpXG4gICAgICAgIHRoaXMuJG5vdGVUZXh0YXJlYSA9IGJvZHkuZmluZCgnI25vdGUtdGV4dCcpXG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjYW5jZWxCdG4sICdjbGljaycsICdoaWRlJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtLCAnc3VibWl0JywgJ3NhdmUnKVxuICAgIH0sXG5cbiAgICBzYXZlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMubm90ZSA9IHRoaXMuJG5vdGVUZXh0YXJlYS52YWwoKVxuICAgICAgICB0aGlzLndpZGdldC5ub3RlID0gdGhpcy5ub3RlXG5cbiAgICAgICAgaWYgKHRoaXMubm90ZSA9PSAnJykge1xuICAgICAgICAgICAgR2FybmlzaC5zaGFrZSh0aGlzLiRjb250YWluZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3NhdmUnLCB7XG4gICAgICAgICAgICAgICAgbm90ZTogdGhpcy5ub3RlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbn0pXG5cblxuXG5DcmFmdC5GaWxlVXBsb2Fkc0luZGV4ID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGNvbnRhaW5lcjogJCgnLnVwbG9hZC1kZXRhaWxzJyksXG4gICAgZWxlbWVudEluZGV4OiBudWxsLFxuXG4gICAgaW5pdChlbGVtZW50SW5kZXgsIGNvbnRhaW5lciwgc2V0dGluZ3MpIHtcbiAgICAgICAgbGV0ICRlbGVtZW50cztcbiAgICAgICAgdGhpcy5lbGVtZW50SW5kZXggPSBlbGVtZW50SW5kZXg7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5zZXRTZXR0aW5ncyhzZXR0aW5ncywgQ3JhZnQuQmFzZUVsZW1lbnRJbmRleFZpZXcuZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLiRsb2FkaW5nTW9yZVNwaW5uZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2VudGVyYWxpZ24gaGlkZGVuXCI+JyArICc8ZGl2IGNsYXNzPVwic3Bpbm5lciBsb2FkaW5nbW9yZVwiPjwvZGl2PicgKyAnPC9kaXY+JykuaW5zZXJ0QWZ0ZXIodGhpcy4kY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudENvbnRhaW5lciA9IHRoaXMuZ2V0RWxlbWVudENvbnRhaW5lcigpO1xuICAgICAgICBcbiAgICAgICAgJGVsZW1lbnRzID0gdGhpcy4kZWxlbWVudENvbnRhaW5lci5jaGlsZHJlbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRleHQgPT09ICdpbmRleCcpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZWxlbWVudENvbnRhaW5lciwgJ2RibGNsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgbGV0ICR0YXJnZXQ7XG4gICAgICAgICAgICAgICAgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5oYXNDbGFzcygnZWxlbWVudCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJHRhcmdldDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudCA9ICR0YXJnZXQuY2xvc2VzdCgnLmVsZW1lbnQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCRlbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnRFZGl0b3IoJGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEVsZW1lbnRDb250YWluZXIoKSB7XG4gICAgICAgIHRoaXMuJHRhYmxlID0gdGhpcy4kY29udGFpbmVyLmZpbmQoJ3RhYmxlOmZpcnN0Jyk7XG4gICAgICAgIHRoaXMuJHRhYmxlLmNoaWxkcmVuKCd0Ym9keTpmaXJzdCcpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVFbGVtZW50RWRpdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIG5ldyBDcmFmdC5FbGVtZW50RWRpdG9yKCRlbGVtZW50LCB7XG4gICAgICAgICAgICBvblNhdmVFbGVtZW50OiAkLnByb3h5KChyZXNwb25zZSA9PiBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdBc3NldCB1cGRhdGVkJykpKSwgdGhpcylcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG5cbiAgICBuZXcgV3JpdGVOb3RlV2lkZ2V0KCcubm90ZXMtd2lkZ2V0JylcblxuICAgIGlmIChDcmFmdC5lbGVtZW50SW5kZXgpIHtcbiAgICAgICAgQ3JhZnQuZWxlbWVudEluZGV4Lm9uKCd1cGRhdGVFbGVtZW50cycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50c0NvdW50O1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkU291cmNlO1xuICAgICAgICAgICAgbGV0IHVucmVhZEl0ZW1zO1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2VudHJpZXMvZ2V0LXVucmVhZC1lbnRyaWVzJywgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LkZvcm1CdWlsZGVyLnVucmVhZENvdW50ID0gcmVzcG9uc2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbChyZXNwb25zZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJCgnLnRvdGFsLWVudHJ5LWNvdW50JykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuXG4gICAgICAgICAgICBzZWxlY3RlZFNvdXJjZSA9IGUudGFyZ2V0Lmluc3RhbmNlU3RhdGUuc2VsZWN0ZWRTb3VyY2U7XG5cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52aWV3Ll90b3RhbFZpc2libGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52aWV3LiRlbGVtZW50Q29udGFpbmVyLmh0bWwoJChgPHRyPjx0ZCBjb2xzcGFuPVwiNlwiPiR7Q3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIk5vIGVudHJpZXMgYXZhaWxhYmxlXCIpfTwvdGQ+PC90cj5gKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB1bnJlYWQgY291bnQgdXRpbGl0eSBuYXZcbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9nZXQtdW5yZWFkLWVudHJpZXMnLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzb3VyY2VzIC5lbnRyeS1jb3VudCcpLmh0bWwoJycpXG5cbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmdyb3VwZWQsIChrZXksIGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ1tkYXRhLWtleT1cImZvcm06JytrZXkrJ1wiXScpLmZpbmQoJy5lbnRyeS1jb3VudCcpLmh0bWwoZW50cmllcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UnKS5hZGRDbGFzcygnc2hvdycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZmItdW5yZWFkLWNvbnRhaW5lciAuZmItYmFkZ2UgLmNvdW50JykuaHRtbChyZXNwb25zZS50b3RhbENvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3VucmVhZC1ub3RpZmljYXRpb25zJykuZmluZCgnLmJvZHknKS5odG1sKHJlc3BvbnNlLnRlbXBsYXRlKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZiLXVucmVhZC1jb250YWluZXIgLmZiLWJhZGdlIC5jb3VudCcpLmh0bWwoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdW5yZWFkLW5vdGlmaWNhdGlvbnMnKS5maW5kKCcuYm9keScpLmh0bWwoJzxwIGNsYXNzPVwibm8tY29udGVudFwiPicrQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05vIHVucmVhZCBzdWJtaXNzaW9ucy4nKSsnPC9wPicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoJy5zdWJtaXNzaW9uLWFjdGlvbi10cmlnZ2VyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgJG1lbnU7XG4gICAgICAgIGxldCBlbnRyeUlkO1xuICAgICAgICBsZXQgZmlsZUlkcztcbiAgICAgICAgbGV0IGZvcm1JZDtcbiAgICAgICAgbGV0IHR5cGU7XG5cbiAgICAgICAgdHlwZSA9ICQodGhpcykuZGF0YSgndHlwZScpO1xuICAgICAgICBmb3JtSWQgPSAkKHRoaXMpLmRhdGEoJ2Zvcm0taWQnKTtcbiAgICAgICAgZW50cnlJZCA9ICQodGhpcykuZGF0YSgnZW50cnktaWQnKTtcbiAgICAgICAgZmlsZUlkcyA9ICQodGhpcykuZGF0YSgnZmlsZS1pZHMnKTtcbiAgICAgICAgJG1lbnUgPSAkKCc8ZGl2IGNsYXNzPVwidG91dC1kcm9wZG93blwiLz4nKS5odG1sKCc8dWwgY2xhc3M9XCJmb3JtLWl0ZW0tbWVudVwiPicgKyAnPC91bD4nKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pc3Npb24nKSB7XG4gICAgICAgICAgICAkKCc8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImRlbGV0ZS1zdWJtaXNzaW9uXCI+RGVsZXRlIFN1Ym1pc3Npb248L2E+PC9saT4nKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZm9ybScpIHtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2Zvcm1zLyR7Zm9ybUlkfVwiPlZpZXcgRm9ybTwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1cGxvYWRzJykge1xuICAgICAgICAgICAgJChgPGxpPjxhIGhyZWY9XCIke3dpbmRvdy5Gb3JtQnVpbGRlci5hZG1pblVybH0vZW50cmllc1wiIGNsYXNzPVwiZGVsZXRlLWFsbC1maWxlc1wiPkRlbGV0ZSBBbGw8L2E+PC9saT5gKS5hcHBlbmRUbygkbWVudS5maW5kKCd1bCcpKTtcbiAgICAgICAgICAgICQoYDxsaT48YSBocmVmPVwiJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNcIiBjbGFzcz1cImRvd25sb2FkLWFsbC1maWxlc1wiPkRvd25sb2FkIEFsbDwvYT48L2xpPmApLmFwcGVuZFRvKCRtZW51LmZpbmQoJ3VsJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3IEdhcm5pc2guSFVEKCQodGhpcyksICRtZW51LCB7XG4gICAgICAgICAgICBodWRDbGFzczogJ2h1ZCBmYi1odWQgc3VibWlzc2lvbmh1ZCcsXG4gICAgICAgICAgICBjbG9zZU90aGVySFVEczogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1zdWJtaXNzaW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICBpZDogZW50cnlJZFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBlbnRyeT9cIikpKSB7XG4gICAgICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9lbnRyaWVzL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdFbnRyeSBkZWxldGVkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHt3aW5kb3cuRm9ybUJ1aWxkZXIuYWRtaW5Vcmx9L2VudHJpZXNgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJG1lbnUuZmluZCgnLmRlbGV0ZS1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgIGZpbGVJZDogZmlsZUlkc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudChcImZvcm0tYnVpbGRlclwiLCBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgYWxsIGZpbGVzP1wiKSkpIHtcbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnYXNzZXRzL2RlbGV0ZUZpbGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChodWRJRCBpbiBHYXJuaXNoLkhVRC5hY3RpdmVIVURzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcudXBsb2FkLWRldGFpbHMnKS5wYXJlbnQoKS52ZWxvY2l0eSgnZmFkZU91dCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogJzEwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCgpID0+ICQoJy51cGxvYWQtZGV0YWlscycpLnBhcmVudCgpLnJlbW92ZSgpKSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRtZW51LmZpbmQoJy5kb3dubG9hZC1hbGwtZmlsZXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Rvd25sb2FkaW5nLi4uJykpO1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgaWRzOiBmaWxlSWRzLFxuICAgICAgICAgICAgICBmb3JtSWRcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEFsbEZpbGVzJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGh1ZElEO1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHRzO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGAvYWN0aW9ucy9mb3JtLWJ1aWxkZXIvZW50cmllcy9kb3dubG9hZEZpbGVzP2ZpbGVQYXRoPSR7cmVzcG9uc2UuZmlsZVBhdGh9YDtcbiAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRG93bmxvYWQgU3VjY2Vzc2Z1bCcpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgcmVzcG9uc2UubWVzc2FnZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAoaHVkSUQgaW4gR2FybmlzaC5IVUQuYWN0aXZlSFVEcykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goR2FybmlzaC5IVUQuYWN0aXZlSFVEc1todWRJRF0uaGlkZSgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9lbnRyaWVzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==