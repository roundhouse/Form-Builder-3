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

        if (_typeof(AssetManagement.storage[namespace]) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
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