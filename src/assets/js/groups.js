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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var GroupItem = void 0;
var GroupModal = void 0;
var Groups = void 0;

Groups = Garnish.Base.extend({
    $groups: null,
    $selectedGroup: null,
    $newGroupBtn: null,
    modal: null,

    init: function init() {
        var $groupSettingsBtn = void 0;
        var menuBtn = void 0;

        this.$groups = $('#groups');
        this.$selectedGroup = this.$groups.find('a.sel:first');
        this.$newGroupBtn = $('#newgroupbtn');
        this.addListener(this.$newGroupBtn, 'click', 'addNewGroup');

        $groupSettingsBtn = $('#groupsettingsbtn');

        if ($groupSettingsBtn.length) {
            menuBtn = $groupSettingsBtn.data('menubtn');
            menuBtn.settings.onOptionSelect = $.proxy(function (elem) {
                var action = void 0;
                action = $(elem).data('action');

                switch (action) {
                    case 'rename':
                        this.renameSelectedGroup();
                    case 'delete':
                        this.deleteSelectedGroup();
                }
            }, this);
        }
    },
    addNewGroup: function addNewGroup() {
        if (!this.modal) {
            this.modal = new GroupModal(this);
        } else {
            this.modal.show();
        }
    },
    renameSelectedGroup: function renameSelectedGroup() {
        var data = void 0;
        var newName = void 0;
        var oldName = void 0;

        oldName = this.$selectedGroup.text();
        newName = this.promptForGroupName(oldName);

        if (newName && newName !== oldName) {
            data = {
                id: this.$selectedGroup.data('id'),
                name: newName
            };

            Craft.postActionRequest('form-builder/groups/save', data, $.proxy(function (response, textStatus) {
                var errors = void 0;

                if (textStatus === 'success') {
                    if (response.success) {
                        this.$selectedGroup.text(response.group.name);
                        Craft.cp.displayNotice(Craft.t('form-builder', 'Group renamed.'));
                    } else if (response.errors) {
                        errors = this.flattenErrors(response.errors);
                        alert(Craft.t('form-builder', 'Could not rename the group:') + '\n\n' + errors.join('\n'));
                    } else {
                        Craft.cp.displayError();
                    }
                }
            }, this));
        }
    },
    promptForGroupName: function promptForGroupName(oldName) {
        prompt(Craft.t('form-builder', 'What do you want to name your group?'), oldName);
    },
    deleteSelectedGroup: function deleteSelectedGroup() {
        var data = void 0;
        this.$selectedGroup = $('#groups a.sel');

        if (this.$selectedGroup.data('id') === 1) {
            Craft.cp.displayError(Craft.t('form-builder', 'Cannot delete Default group'));
        } else {
            if (confirm(Craft.t('form-builder', 'Are you sure you want to delete this group and all its forms?'))) {
                data = {
                    id: this.$selectedGroup.data('id')
                };

                Craft.postActionRequest('form-builder/groups/delete', data, $.proxy(function (response, textStatus) {
                    if (textStatus === 'success') {
                        if (response.success) {
                            location.href = Craft.getUrl('form-builder/forms');
                        } else {
                            Craft.cp.displayError();
                        }
                    }
                }, this));
            }
        }
    },
    flattenErrors: function flattenErrors(responseErrors) {
        var attribute = void 0;
        var errors = void 0;
        errors = [];

        for (attribute in responseErrors) {
            errors = errors.concat(responseErrors[attribute]);
        }

        return errors;
    }
});

GroupItem = Garnish.Modal.extend({
    $groupListItem: null,
    $group: null,
    $editGroupBtn: null,
    id: null,
    label: null,
    iconName: null,
    modal: null,

    init: function init(el) {
        this.$groupListItem = $(el);
        this.$group = this.$groupListItem.find('a');
        this.$editGroupBtn = this.$group.find('.edit-group');
        this.id = this.$group.data('id');
        this.label = this.$group.data('label');
        this.iconName = this.$group.data('icon-name');
        this.addListener(this.$editGroupBtn, 'click', 'edit');
    },
    edit: function edit() {
        if (!this.modal) {
            this.modal = new GroupModal(this);
        } else {
            this.modal.show();
        }
    }
});

GroupModal = Garnish.Modal.extend({
    group: null,
    $form: null,
    $modalInputs: null,
    init: function init(group) {
        var $input = void 0;
        var $input2 = void 0;
        var $icons = void 0;
        var body = void 0;
        var iconName = void 0;
        var label = void 0;
        var title = void 0;
        var self = void 0;

        self = this;
        this.group = group;
        this.base();
        this.$form = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$form);

        title = this.group.id ? Craft.t('form-builder', 'Edit Group') : Craft.t('form-builder', 'New Group');
        body = $(['<header>', '<span class="modal-title">' + title + '</span>', '</header>', '<div class="body"><div class="footer-notes">Get icon names at <a href="https://fontawesome.com/icons" target="_blank">FontAwesome</a></div></div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$form);
        label = this.group.label ? this.group.label : '';
        iconName = this.group.iconName ? this.group.iconName : '';
        $input = '<input type=\'text\' class=\'groupName\' value=\'' + label + '\' data-hint=\'NAME\' data-name=\'groupName\' />';
        $input2 = '<input type=\'text\' class=\'groupIcon\' value=\'' + iconName + '\' data-hint=\'ICON\' data-name=\'groupIcon\' />';
        // $icons = '{"glass", "music", "search", "envelope-o", "heart", "star", "star-o", "user", "film", "th-large", "th", "th-list", "check", "remove", "close", "times", "search-plus", "search-minus", "power-off", "signal", "gear", "cog", "trash-o", "home", "file-o", "clock-o", "road", "download", "arrow-circle-o-down", "arrow-circle-o-up", "inbox", "play-circle-o", "rotate-right", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag", "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "dedent", "outdent", "indent", "video-camera", "photo", "image", "picture-o", "pencil", "map-marker", "adjust", "tint", "edit", "pencil-square-o", "share-square-o", "check-square-o", "arrows", "step-backward", "fast-backward", "backward", "play", "pause", "stop", "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-circle", "minus-circle", "times-circle", "check-circle", "question-circle", "info-circle", "crosshairs", "times-circle-o", "check-circle-o", "ban", "arrow-left", "arrow-right", "arrow-up", "arrow-down", "mail-forward", "share", "expand", "compress", "plus", "minus", "asterisk", "exclamation-circle", "gift", "leaf", "fire", "eye", "eye-slash", "warning", "exclamation-triangle", "plane", "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder", "folder-open", "arrows-v", "arrows-h", "bar-chart-o", "bar-chart", "twitter-square", "facebook-square", "camera-retro", "key", "gears", "cogs", "comments", "thumbs-o-up", "thumbs-o-down", "star-half", "heart-o", "sign-out", "linkedin-square", "thumb-tack", "external-link", "sign-in", "trophy", "github-square", "upload", "lemon-o", "phone", "square-o", "bookmark-o", "phone-square", "twitter", "facebook-f", "facebook", "github", "unlock", "credit-card", "feed", "rss", "hdd-o", "bullhorn", "bell", "certificate", "hand-o-right", "hand-o-left", "hand-o-up", "hand-o-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-circle-down", "globe", "wrench", "tasks", "filter", "briefcase", "arrows-alt", "group", "users", "chain", "link", "cloud", "flask", "cut", "scissors", "copy", "files-o", "paperclip", "save", "floppy-o", "square", "navicon", "reorder", "bars", "list-ul", "list-ol", "strikethrough", "underline", "table", "magic", "truck", "pinterest", "pinterest-square", "google-plus-square", "google-plus", "money", "caret-down", "caret-up", "caret-left", "caret-right", "columns", "unsorted", "sort", "sort-down", "sort-desc", "sort-up", "sort-asc", "envelope", "linkedin", "rotate-left", "undo", "legal", "gavel", "dashboard", "tachometer", "comment-o", "comments-o", "flash", "bolt", "sitemap", "umbrella", "paste", "clipboard", "lightbulb-o", "exchange", "cloud-download", "cloud-upload", "user-md", "stethoscope", "suitcase", "bell-o", "coffee", "cutlery", "file-text-o", "building-o", "hospital-o", "ambulance", "medkit", "fighter-jet", "beer", "h-square", "plus-square", "angle-double-left", "angle-double-right", "angle-double-up", "angle-double-down", "angle-left", "angle-right", "angle-up", "angle-down", "desktop", "laptop", "tablet", "mobile-phone", "mobile", "circle-o", "quote-left", "quote-right", "spinner", "circle", "mail-reply", "reply", "github-alt", "folder-o", "folder-open-o", "smile-o", "frown-o", "meh-o", "gamepad", "keyboard-o", "flag-o", "flag-checkered", "terminal", "code", "mail-reply-all", "reply-all", "star-half-empty", "star-half-full", "star-half-o", "location-arrow", "crop", "code-fork", "unlink", "chain-broken", "question", "info", "exclamation", "superscript", "subscript", "eraser", "puzzle-piece", "microphone", "microphone-slash", "shield", "calendar-o", "fire-extinguisher", "rocket", "maxcdn", "chevron-circle-left", "chevron-circle-right", "chevron-circle-up", "chevron-circle-down", "html5", "css3", "anchor", "unlock-alt", "bullseye", "ellipsis-h", "ellipsis-v", "rss-square", "play-circle", "ticket", "minus-square", "minus-square-o", "level-up", "level-down", "check-square", "pencil-square", "external-link-square", "share-square", "compass", "toggle-down", "caret-square-o-down", "toggle-up", "caret-square-o-up", "toggle-right", "caret-square-o-right", "euro", "eur", "gbp", "dollar", "usd", "rupee", "inr", "cny", "rmb", "yen", "jpy", "ruble", "rouble", "rub", "won", "krw", "bitcoin", "btc", "file", "file-text", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-numeric-asc", "sort-numeric-desc", "thumbs-up", "thumbs-down", "youtube-square", "youtube", "xing", "xing-square", "youtube-play", "dropbox", "stack-overflow", "instagram", "flickr", "adn", "bitbucket", "bitbucket-square", "tumblr", "tumblr-square", "long-arrow-down", "long-arrow-up", "long-arrow-left", "long-arrow-right", "apple", "windows", "android", "linux", "dribbble", "skype", "foursquare", "trello", "female", "male", "gittip", "gratipay", "sun-o", "moon-o", "archive", "bug", "vk", "weibo", "renren", "pagelines", "stack-exchange", "arrow-circle-o-right", "arrow-circle-o-left", "toggle-left", "caret-square-o-left", "dot-circle-o", "wheelchair", "vimeo-square", "turkish-lira", "try", "plus-square-o", "space-shuttle", "slack", "envelope-square", "wordpress", "openid", "institution", "bank", "university", "mortar-board", "graduation-cap", "yahoo", "google", "reddit", "reddit-square", "stumbleupon-circle", "stumbleupon", "delicious", "digg", "pied-piper", "pied-piper-alt", "drupal", "joomla", "language", "fax", "building", "child", "paw", "spoon", "cube", "cubes", "behance", "behance-square", "steam", "steam-square", "recycle", "automobile", "car", "cab", "taxi", "tree", "spotify", "deviantart", "soundcloud", "database", "file-pdf-o", "file-word-o", "file-excel-o", "file-powerpoint-o", "file-photo-o", "file-picture-o", "file-image-o", "file-zip-o", "file-archive-o", "file-sound-o", "file-audio-o", "file-movie-o", "file-video-o", "file-code-o", "vine", "codepen", "jsfiddle", "life-bouy", "life-buoy", "life-saver", "support", "life-ring", "circle-o-notch", "ra", "rebel", "ge", "empire", "git-square", "git", "y-combinator-square", "yc-square", "hacker-news", "tencent-weibo", "qq", "wechat", "weixin", "send", "paper-plane", "send-o", "paper-plane-o", "history", "circle-thin", "header", "paragraph", "sliders", "share-alt", "share-alt-square", "bomb", "soccer-ball-o", "futbol-o", "tty", "binoculars", "plug", "slideshare", "twitch", "yelp", "newspaper-o", "wifi", "calculator", "paypal", "google-wallet", "cc-visa", "cc-mastercard", "cc-discover", "cc-amex", "cc-paypal", "cc-stripe", "bell-slash", "bell-slash-o", "trash", "copyright", "at", "eyedropper", "paint-brush", "birthday-cake", "area-chart", "pie-chart", "line-chart", "lastfm", "lastfm-square", "toggle-off", "toggle-on", "bicycle", "bus", "ioxhost", "angellist", "cc", "shekel", "sheqel", "ils", "meanpath", "buysellads", "connectdevelop", "dashcube", "forumbee", "leanpub", "sellsy", "shirtsinbulk", "simplybuilt", "skyatlas", "cart-plus", "cart-arrow-down", "diamond", "ship", "user-secret", "motorcycle", "street-view", "heartbeat", "venus", "mars", "mercury", "intersex", "transgender", "transgender-alt", "venus-double", "mars-double", "venus-mars", "mars-stroke", "mars-stroke-v", "mars-stroke-h", "neuter", "genderless", "facebook-official", "pinterest-p", "whatsapp", "server", "user-plus", "user-times", "hotel", "bed", "viacoin", "train", "subway", "medium", "yc", "y-combinator", "optin-monster", "opencart", "expeditedssl", "battery-4", "battery-full", "battery-3", "battery-three-quarters", "battery-2", "battery-half", "battery-1", "battery-quarter", "battery-0", "battery-empty", "mouse-pointer", "i-cursor", "object-group", "object-ungroup", "sticky-note", "sticky-note-o", "cc-jcb", "cc-diners-club", "clone", "balance-scale", "hourglass-o", "hourglass-1", "hourglass-start", "hourglass-2", "hourglass-half", "hourglass-3", "hourglass-end", "hourglass", "hand-grab-o", "hand-rock-o", "hand-stop-o", "hand-paper-o", "hand-scissors-o", "hand-lizard-o", "hand-spock-o", "hand-pointer-o", "hand-peace-o", "trademark", "registered", "creative-commons", "gg", "gg-circle", "tripadvisor", "odnoklassniki", "odnoklassniki-square", "get-pocket", "wikipedia-w", "safari", "chrome", "firefox", "opera", "internet-explorer", "tv", "television", "contao", "500px", "amazon", "calendar-plus-o", "calendar-minus-o", "calendar-times-o", "calendar-check-o", "industry", "map-pin", "map-signs", "map-o", "map", "commenting", "commenting-o", "houzz", "vimeo", "black-tie", "fonticons", "reddit-alien", "edge", "credit-card-alt", "codiepie", "modx", "fort-awesome", "usb", "product-hunt", "mixcloud", "scribd", "pause-circle", "pause-circle-o", "stop-circle", "stop-circle-o", "shopping-bag", "shopping-basket", "hashtag", "bluetooth", "bluetooth-b", "percent",}';
        // $input2 = `<select class='groupIcon' data-hint='ICON' data-name='groupIcon'>
        // <option></option>
        // </select`;

        this.renderInputs($input2, '', 'select', 'groupIcon', 'ICON', 'iconName');
        this.renderInputs($input, '', 'text', 'groupName', 'NAME', 'groupName');
        this.show();
        this.$saveBtn = body.find('.submit');
        this.$cancelBtn = body.find('.cancel');
        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$form, 'submit', 'save');
    },
    renderInputs: function renderInputs(el, value, type, name, hint, className) {
        var $input = void 0;
        $input = $('<div class="fb-field"><div class="input-hint">' + hint + '</div>' + el + '</div>');

        this.$form.find('.body').prepend($input);

        // TODO: allow users to dynamically search fontawesome icon repository
        // if (type == 'select') {
        //     $input.select2({
        //         ajax: {
        //             url: Craft.getActionUrl() + '/form-builder/icons/get-all-icons',
        //             dataType: 'json',
        //             processResults: function(data) {
        //                 return {
        //                     results: data.icons
        //                 };
        //             },
        //         },
        //         placeholder: 'Select Icon',
        //         escapeMarkup: function (markup) { return markup; },
        //         templateResult: function(icon) {
        //             let markup = `<div class='select2-result-icon clearfix'><div class='select2-result-image'><img src='${icon.icon}' /></div><div class='select2-result-icon-details'><div class='select2-result-name'>${icon.name}</div>`;
        //             return markup;
        //         },
        //         templateSelection: function(data) {
        //         }
        //     });
        // }
    },
    save: function save(e) {
        e.preventDefault();
        var data = void 0;
        var groupIcon = void 0;
        var groupName = void 0;
        var inputLength = void 0;
        var self = void 0;

        self = this;
        groupName = this.$form.find('.groupName').val();
        groupIcon = this.$form.find('.groupIcon').val();
        inputLength = this.$form.find('.groupName').val().length;
        if (inputLength > 0) {
            data = {
                id: this.group.id ? this.group.id : null,
                name: groupName,
                settings: {
                    icon: {
                        name: groupIcon
                    }
                }
            };

            Craft.postActionRequest('form-builder/groups/save', data, $.proxy(function (response, textStatus) {
                var errors = void 0;
                console.log(response);
                if (textStatus === 'success') {
                    if (response.success) {
                        location.href = Craft.getUrl('form-builder/forms');
                    } else if (response.errors) {
                        errors = this.flattenErrors(response.errors);
                        alert(Craft.t('form-builder', 'Could not create the group:') + '\n\n' + errors.join('\n'));
                    } else {
                        Craft.cp.displayError();
                    }
                }
            }, this));
        }
    },
    flattenErrors: function flattenErrors(responseErrors) {
        var attribute = void 0;
        var errors = void 0;
        errors = [];

        for (attribute in responseErrors) {
            errors = errors.concat(responseErrors[attribute]);
        }

        return errors;
    }
});

Garnish.$doc.ready(function () {
    var FormGroups = void 0;
    FormGroups = new Groups();
    $.each($('.group-item'), function (i, item) {
        return new GroupItem(item);
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTI1NDQ2NjFmYTU3MzM3MjZkZGMiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZ3JvdXBzLmpzIl0sIm5hbWVzIjpbIkdyb3VwSXRlbSIsIkdyb3VwTW9kYWwiLCJHcm91cHMiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRncm91cHMiLCIkc2VsZWN0ZWRHcm91cCIsIiRuZXdHcm91cEJ0biIsIm1vZGFsIiwiaW5pdCIsIiRncm91cFNldHRpbmdzQnRuIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiYWRkTGlzdGVuZXIiLCJsZW5ndGgiLCJkYXRhIiwic2V0dGluZ3MiLCJvbk9wdGlvblNlbGVjdCIsInByb3h5IiwiZWxlbSIsImFjdGlvbiIsInJlbmFtZVNlbGVjdGVkR3JvdXAiLCJkZWxldGVTZWxlY3RlZEdyb3VwIiwiYWRkTmV3R3JvdXAiLCJzaG93IiwibmV3TmFtZSIsIm9sZE5hbWUiLCJ0ZXh0IiwicHJvbXB0Rm9yR3JvdXBOYW1lIiwiaWQiLCJuYW1lIiwiQ3JhZnQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsImVycm9ycyIsInN1Y2Nlc3MiLCJncm91cCIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJmbGF0dGVuRXJyb3JzIiwiYWxlcnQiLCJqb2luIiwiZGlzcGxheUVycm9yIiwicHJvbXB0IiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImdldFVybCIsInJlc3BvbnNlRXJyb3JzIiwiYXR0cmlidXRlIiwiY29uY2F0IiwiTW9kYWwiLCIkZ3JvdXBMaXN0SXRlbSIsIiRncm91cCIsIiRlZGl0R3JvdXBCdG4iLCJsYWJlbCIsImljb25OYW1lIiwiZWwiLCJlZGl0IiwiJGZvcm0iLCIkbW9kYWxJbnB1dHMiLCIkaW5wdXQiLCIkaW5wdXQyIiwiJGljb25zIiwiYm9keSIsInRpdGxlIiwic2VsZiIsImJhc2UiLCJhcHBlbmRUbyIsIiRib2QiLCJzZXRDb250YWluZXIiLCJyZW5kZXJJbnB1dHMiLCIkc2F2ZUJ0biIsIiRjYW5jZWxCdG4iLCJ2YWx1ZSIsInR5cGUiLCJoaW50IiwiY2xhc3NOYW1lIiwicHJlcGVuZCIsInNhdmUiLCJlIiwicHJldmVudERlZmF1bHQiLCJncm91cEljb24iLCJncm91cE5hbWUiLCJpbnB1dExlbmd0aCIsInZhbCIsImljb24iLCJjb25zb2xlIiwibG9nIiwiJGRvYyIsInJlYWR5IiwiRm9ybUdyb3VwcyIsImVhY2giLCJpIiwiaXRlbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBLElBQUlBLGtCQUFKO0FBQ0EsSUFBSUMsbUJBQUo7QUFDQSxJQUFJQyxlQUFKOztBQUVBQSxTQUFTQyxRQUFRQyxJQUFSLENBQWFDLE1BQWIsQ0FBb0I7QUFDekJDLGFBQVMsSUFEZ0I7QUFFekJDLG9CQUFnQixJQUZTO0FBR3pCQyxrQkFBYyxJQUhXO0FBSXpCQyxXQUFPLElBSmtCOztBQU16QkMsUUFOeUIsa0JBTWxCO0FBQ0gsWUFBSUMsMEJBQUo7QUFDQSxZQUFJQyxnQkFBSjs7QUFFQSxhQUFLTixPQUFMLEdBQWVPLEVBQUUsU0FBRixDQUFmO0FBQ0EsYUFBS04sY0FBTCxHQUFzQixLQUFLRCxPQUFMLENBQWFRLElBQWIsQ0FBa0IsYUFBbEIsQ0FB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SDtBQUNKO0FBQ0osYUFieUQsRUFhdEQsSUFic0QsQ0FBMUQ7QUFjSDtBQUNKLEtBNUc2QjtBQThHOUJILGlCQTlHOEIseUJBOEdoQlMsY0E5R2dCLEVBOEdBO0FBQzFCLFlBQUlDLGtCQUFKO0FBQ0EsWUFBSWhCLGVBQUo7QUFDQUEsaUJBQVMsRUFBVDs7QUFFQSxhQUFLZ0IsU0FBTCxJQUFrQkQsY0FBbEIsRUFBa0M7QUFDOUJmLHFCQUFTQSxPQUFPaUIsTUFBUCxDQUFjRixlQUFlQyxTQUFmLENBQWQsQ0FBVDtBQUNIOztBQUVELGVBQU9oQixNQUFQO0FBQ0g7QUF4SDZCLENBQXJCLENBQWI7O0FBMkhBbEMsUUFBUTBGLElBQVIsQ0FBYUMsS0FBYixDQUFtQixZQUFNO0FBQ3JCLFFBQUlDLG1CQUFKO0FBQ0FBLGlCQUFhLElBQUk3RixNQUFKLEVBQWI7QUFDQVcsTUFBRW1GLElBQUYsQ0FBT25GLEVBQUUsYUFBRixDQUFQLEVBQXlCLFVBQUNvRixDQUFELEVBQUlDLElBQUo7QUFBQSxlQUFhLElBQUlsRyxTQUFKLENBQWNrRyxJQUFkLENBQWI7QUFBQSxLQUF6QjtBQUNILENBSkQsRSIsImZpbGUiOiIvcmVsZWFzZS9zcmMvYXNzZXRzL2pzL2dyb3Vwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkyNTQ0NjYxZmE1NzMzNzI2ZGRjIiwibGV0IEdyb3VwSXRlbTtcbmxldCBHcm91cE1vZGFsO1xubGV0IEdyb3VwcztcblxuR3JvdXBzID0gR2FybmlzaC5CYXNlLmV4dGVuZCh7XG4gICAgJGdyb3VwczogbnVsbCxcbiAgICAkc2VsZWN0ZWRHcm91cDogbnVsbCxcbiAgICAkbmV3R3JvdXBCdG46IG51bGwsXG4gICAgbW9kYWw6IG51bGwsXG5cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgJGdyb3VwU2V0dGluZ3NCdG47XG4gICAgICAgIGxldCBtZW51QnRuO1xuXG4gICAgICAgIHRoaXMuJGdyb3VwcyA9ICQoJyNncm91cHMnKTtcbiAgICAgICAgdGhpcy4kc2VsZWN0ZWRHcm91cCA9IHRoaXMuJGdyb3Vwcy5maW5kKCdhLnNlbDpmaXJzdCcpO1xuICAgICAgICB0aGlzLiRuZXdHcm91cEJ0biA9ICQoJyNuZXdncm91cGJ0bicpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJG5ld0dyb3VwQnRuLCAnY2xpY2snLCAnYWRkTmV3R3JvdXAnKTtcblxuICAgICAgICAkZ3JvdXBTZXR0aW5nc0J0biA9ICQoJyNncm91cHNldHRpbmdzYnRuJyk7XG5cbiAgICAgICAgaWYgKCRncm91cFNldHRpbmdzQnRuLmxlbmd0aCkge1xuICAgICAgICAgICAgbWVudUJ0biA9ICRncm91cFNldHRpbmdzQnRuLmRhdGEoJ21lbnVidG4nKTtcbiAgICAgICAgICAgIG1lbnVCdG4uc2V0dGluZ3Mub25PcHRpb25TZWxlY3QgPSAkLnByb3h5KChmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbjtcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSAkKGVsZW0pLmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVuYW1lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuYW1lU2VsZWN0ZWRHcm91cCgpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVTZWxlY3RlZEdyb3VwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkZE5ld0dyb3VwKCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgR3JvdXBNb2RhbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmFtZVNlbGVjdGVkR3JvdXAoKSB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgbmV3TmFtZTtcbiAgICAgICAgbGV0IG9sZE5hbWU7XG5cbiAgICAgICAgb2xkTmFtZSA9IHRoaXMuJHNlbGVjdGVkR3JvdXAudGV4dCgpO1xuICAgICAgICBuZXdOYW1lID0gdGhpcy5wcm9tcHRGb3JHcm91cE5hbWUob2xkTmFtZSk7XG4gICAgICBcbiAgICAgICAgaWYgKG5ld05hbWUgJiYgbmV3TmFtZSAhPT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy4kc2VsZWN0ZWRHcm91cC5kYXRhKCdpZCcpLFxuICAgICAgICAgICAgICAgIG5hbWU6IG5ld05hbWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZ3JvdXBzL3NhdmUnLCBkYXRhLCAkLnByb3h5KChmdW5jdGlvbihyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnM7XG5cbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzZWxlY3RlZEdyb3VwLnRleHQocmVzcG9uc2UuZ3JvdXAubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5Tm90aWNlKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdHcm91cCByZW5hbWVkLicpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IHRoaXMuZmxhdHRlbkVycm9ycyhyZXNwb25zZS5lcnJvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYCR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NvdWxkIG5vdCByZW5hbWUgdGhlIGdyb3VwOicpfVxcblxcbiR7ZXJyb3JzLmpvaW4oJ1xcbicpfWApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHByb21wdEZvckdyb3VwTmFtZShvbGROYW1lKSB7XG4gICAgICAgIHByb21wdChDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnV2hhdCBkbyB5b3Ugd2FudCB0byBuYW1lIHlvdXIgZ3JvdXA/JyksIG9sZE5hbWUpO1xuICAgIH0sXG5cbiAgICBkZWxldGVTZWxlY3RlZEdyb3VwKCkge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgdGhpcy4kc2VsZWN0ZWRHcm91cCA9ICQoJyNncm91cHMgYS5zZWwnKTtcbiAgICAgIFxuICAgICAgICBpZiAodGhpcy4kc2VsZWN0ZWRHcm91cC5kYXRhKCdpZCcpID09PSAxKSB7XG4gICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0Nhbm5vdCBkZWxldGUgRGVmYXVsdCBncm91cCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb25maXJtKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZ3JvdXAgYW5kIGFsbCBpdHMgZm9ybXM/JykpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuJHNlbGVjdGVkR3JvdXAuZGF0YSgnaWQnKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2dyb3Vwcy9kZWxldGUnLCBkYXRhLCAkLnByb3h5KCgocmVzcG9uc2UsIHRleHRTdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gQ3JhZnQuZ2V0VXJsKCdmb3JtLWJ1aWxkZXIvZm9ybXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZsYXR0ZW5FcnJvcnMocmVzcG9uc2VFcnJvcnMpIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IGVycm9ycztcbiAgICAgICAgZXJyb3JzID0gW107XG5cbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gcmVzcG9uc2VFcnJvcnMpIHtcbiAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQocmVzcG9uc2VFcnJvcnNbYXR0cmlidXRlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgIH1cbn0pO1xuXG5Hcm91cEl0ZW0gPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgJGdyb3VwTGlzdEl0ZW06IG51bGwsXG4gICAgJGdyb3VwOiBudWxsLFxuICAgICRlZGl0R3JvdXBCdG46IG51bGwsXG4gICAgaWQ6IG51bGwsXG4gICAgbGFiZWw6IG51bGwsXG4gICAgaWNvbk5hbWU6IG51bGwsXG4gICAgbW9kYWw6IG51bGwsXG5cbiAgICBpbml0KGVsKSB7XG4gICAgICAgIHRoaXMuJGdyb3VwTGlzdEl0ZW0gPSAkKGVsKTtcbiAgICAgICAgdGhpcy4kZ3JvdXAgPSB0aGlzLiRncm91cExpc3RJdGVtLmZpbmQoJ2EnKTtcbiAgICAgICAgdGhpcy4kZWRpdEdyb3VwQnRuID0gdGhpcy4kZ3JvdXAuZmluZCgnLmVkaXQtZ3JvdXAnKTtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuJGdyb3VwLmRhdGEoJ2lkJyk7XG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLiRncm91cC5kYXRhKCdsYWJlbCcpO1xuICAgICAgICB0aGlzLmljb25OYW1lID0gdGhpcy4kZ3JvdXAuZGF0YSgnaWNvbi1uYW1lJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZWRpdEdyb3VwQnRuLCAnY2xpY2snLCAnZWRpdCcpO1xuICAgIH0sXG5cbiAgICBlZGl0KCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSBuZXcgR3JvdXBNb2RhbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbkdyb3VwTW9kYWwgPSBHYXJuaXNoLk1vZGFsLmV4dGVuZCh7XG4gICAgZ3JvdXA6IG51bGwsXG4gICAgJGZvcm06IG51bGwsXG4gICAgJG1vZGFsSW5wdXRzOiBudWxsLFxuICAgIGluaXQoZ3JvdXApIHtcbiAgICAgICAgbGV0ICRpbnB1dDtcbiAgICAgICAgbGV0ICRpbnB1dDI7XG4gICAgICAgIGxldCAkaWNvbnM7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBsZXQgaWNvbk5hbWU7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgbGV0IHRpdGxlO1xuICAgICAgICBsZXQgc2VsZjtcblxuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5ncm91cCA9IGdyb3VwO1xuICAgICAgICB0aGlzLmJhc2UoKTtcbiAgICAgICAgdGhpcy4kZm9ybSA9ICQoJzxmb3JtIGNsYXNzPVwibW9kYWwgZml0dGVkIGZvcm1idWlsZGVyLW1vZGFsXCI+JykuYXBwZW5kVG8oR2FybmlzaC4kYm9kKTtcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXIodGhpcy4kZm9ybSk7XG5cbiAgICAgICAgdGl0bGUgPSB0aGlzLmdyb3VwLmlkID8gQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0VkaXQgR3JvdXAnKSA6IENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdOZXcgR3JvdXAnKTtcbiAgICAgICAgYm9keSA9ICQoWyc8aGVhZGVyPicsIGA8c3BhbiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+JHt0aXRsZX08L3NwYW4+YCwgJzwvaGVhZGVyPicsICc8ZGl2IGNsYXNzPVwiYm9keVwiPjxkaXYgY2xhc3M9XCJmb290ZXItbm90ZXNcIj5HZXQgaWNvbiBuYW1lcyBhdCA8YSBocmVmPVwiaHR0cHM6Ly9mb250YXdlc29tZS5jb20vaWNvbnNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Gb250QXdlc29tZTwvYT48L2Rpdj48L2Rpdj4nLCAnPGZvb3RlciBjbGFzcz1cImZvb3RlclwiPicsICc8ZGl2IGNsYXNzPVwiYnV0dG9uc1wiPicsIGA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgY2FuY2VsXCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5jZWwnKX1cIj5gLCBgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIHN1Ym1pdFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnU2F2ZScpfVwiPmAsICc8L2Rpdj4nLCAnPC9mb290ZXI+J10uam9pbignJykpLmFwcGVuZFRvKHRoaXMuJGZvcm0pO1xuICAgICAgICBsYWJlbCA9IHRoaXMuZ3JvdXAubGFiZWwgPyB0aGlzLmdyb3VwLmxhYmVsIDogJyc7XG4gICAgICAgIGljb25OYW1lID0gdGhpcy5ncm91cC5pY29uTmFtZSA/IHRoaXMuZ3JvdXAuaWNvbk5hbWUgOiAnJztcbiAgICAgICAgJGlucHV0ID0gYDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZ3JvdXBOYW1lJyB2YWx1ZT0nJHtsYWJlbH0nIGRhdGEtaGludD0nTkFNRScgZGF0YS1uYW1lPSdncm91cE5hbWUnIC8+YDtcbiAgICAgICAgJGlucHV0MiA9IGA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9J2dyb3VwSWNvbicgdmFsdWU9JyR7aWNvbk5hbWV9JyBkYXRhLWhpbnQ9J0lDT04nIGRhdGEtbmFtZT0nZ3JvdXBJY29uJyAvPmA7XG4gICAgICAgIC8vICRpY29ucyA9ICd7XCJnbGFzc1wiLCBcIm11c2ljXCIsIFwic2VhcmNoXCIsIFwiZW52ZWxvcGUtb1wiLCBcImhlYXJ0XCIsIFwic3RhclwiLCBcInN0YXItb1wiLCBcInVzZXJcIiwgXCJmaWxtXCIsIFwidGgtbGFyZ2VcIiwgXCJ0aFwiLCBcInRoLWxpc3RcIiwgXCJjaGVja1wiLCBcInJlbW92ZVwiLCBcImNsb3NlXCIsIFwidGltZXNcIiwgXCJzZWFyY2gtcGx1c1wiLCBcInNlYXJjaC1taW51c1wiLCBcInBvd2VyLW9mZlwiLCBcInNpZ25hbFwiLCBcImdlYXJcIiwgXCJjb2dcIiwgXCJ0cmFzaC1vXCIsIFwiaG9tZVwiLCBcImZpbGUtb1wiLCBcImNsb2NrLW9cIiwgXCJyb2FkXCIsIFwiZG93bmxvYWRcIiwgXCJhcnJvdy1jaXJjbGUtby1kb3duXCIsIFwiYXJyb3ctY2lyY2xlLW8tdXBcIiwgXCJpbmJveFwiLCBcInBsYXktY2lyY2xlLW9cIiwgXCJyb3RhdGUtcmlnaHRcIiwgXCJyZXBlYXRcIiwgXCJyZWZyZXNoXCIsIFwibGlzdC1hbHRcIiwgXCJsb2NrXCIsIFwiZmxhZ1wiLCBcImhlYWRwaG9uZXNcIiwgXCJ2b2x1bWUtb2ZmXCIsIFwidm9sdW1lLWRvd25cIiwgXCJ2b2x1bWUtdXBcIiwgXCJxcmNvZGVcIiwgXCJiYXJjb2RlXCIsIFwidGFnXCIsIFwidGFnc1wiLCBcImJvb2tcIiwgXCJib29rbWFya1wiLCBcInByaW50XCIsIFwiY2FtZXJhXCIsIFwiZm9udFwiLCBcImJvbGRcIiwgXCJpdGFsaWNcIiwgXCJ0ZXh0LWhlaWdodFwiLCBcInRleHQtd2lkdGhcIiwgXCJhbGlnbi1sZWZ0XCIsIFwiYWxpZ24tY2VudGVyXCIsIFwiYWxpZ24tcmlnaHRcIiwgXCJhbGlnbi1qdXN0aWZ5XCIsIFwibGlzdFwiLCBcImRlZGVudFwiLCBcIm91dGRlbnRcIiwgXCJpbmRlbnRcIiwgXCJ2aWRlby1jYW1lcmFcIiwgXCJwaG90b1wiLCBcImltYWdlXCIsIFwicGljdHVyZS1vXCIsIFwicGVuY2lsXCIsIFwibWFwLW1hcmtlclwiLCBcImFkanVzdFwiLCBcInRpbnRcIiwgXCJlZGl0XCIsIFwicGVuY2lsLXNxdWFyZS1vXCIsIFwic2hhcmUtc3F1YXJlLW9cIiwgXCJjaGVjay1zcXVhcmUtb1wiLCBcImFycm93c1wiLCBcInN0ZXAtYmFja3dhcmRcIiwgXCJmYXN0LWJhY2t3YXJkXCIsIFwiYmFja3dhcmRcIiwgXCJwbGF5XCIsIFwicGF1c2VcIiwgXCJzdG9wXCIsIFwiZm9yd2FyZFwiLCBcImZhc3QtZm9yd2FyZFwiLCBcInN0ZXAtZm9yd2FyZFwiLCBcImVqZWN0XCIsIFwiY2hldnJvbi1sZWZ0XCIsIFwiY2hldnJvbi1yaWdodFwiLCBcInBsdXMtY2lyY2xlXCIsIFwibWludXMtY2lyY2xlXCIsIFwidGltZXMtY2lyY2xlXCIsIFwiY2hlY2stY2lyY2xlXCIsIFwicXVlc3Rpb24tY2lyY2xlXCIsIFwiaW5mby1jaXJjbGVcIiwgXCJjcm9zc2hhaXJzXCIsIFwidGltZXMtY2lyY2xlLW9cIiwgXCJjaGVjay1jaXJjbGUtb1wiLCBcImJhblwiLCBcImFycm93LWxlZnRcIiwgXCJhcnJvdy1yaWdodFwiLCBcImFycm93LXVwXCIsIFwiYXJyb3ctZG93blwiLCBcIm1haWwtZm9yd2FyZFwiLCBcInNoYXJlXCIsIFwiZXhwYW5kXCIsIFwiY29tcHJlc3NcIiwgXCJwbHVzXCIsIFwibWludXNcIiwgXCJhc3Rlcmlza1wiLCBcImV4Y2xhbWF0aW9uLWNpcmNsZVwiLCBcImdpZnRcIiwgXCJsZWFmXCIsIFwiZmlyZVwiLCBcImV5ZVwiLCBcImV5ZS1zbGFzaFwiLCBcIndhcm5pbmdcIiwgXCJleGNsYW1hdGlvbi10cmlhbmdsZVwiLCBcInBsYW5lXCIsIFwiY2FsZW5kYXJcIiwgXCJyYW5kb21cIiwgXCJjb21tZW50XCIsIFwibWFnbmV0XCIsIFwiY2hldnJvbi11cFwiLCBcImNoZXZyb24tZG93blwiLCBcInJldHdlZXRcIiwgXCJzaG9wcGluZy1jYXJ0XCIsIFwiZm9sZGVyXCIsIFwiZm9sZGVyLW9wZW5cIiwgXCJhcnJvd3MtdlwiLCBcImFycm93cy1oXCIsIFwiYmFyLWNoYXJ0LW9cIiwgXCJiYXItY2hhcnRcIiwgXCJ0d2l0dGVyLXNxdWFyZVwiLCBcImZhY2Vib29rLXNxdWFyZVwiLCBcImNhbWVyYS1yZXRyb1wiLCBcImtleVwiLCBcImdlYXJzXCIsIFwiY29nc1wiLCBcImNvbW1lbnRzXCIsIFwidGh1bWJzLW8tdXBcIiwgXCJ0aHVtYnMtby1kb3duXCIsIFwic3Rhci1oYWxmXCIsIFwiaGVhcnQtb1wiLCBcInNpZ24tb3V0XCIsIFwibGlua2VkaW4tc3F1YXJlXCIsIFwidGh1bWItdGFja1wiLCBcImV4dGVybmFsLWxpbmtcIiwgXCJzaWduLWluXCIsIFwidHJvcGh5XCIsIFwiZ2l0aHViLXNxdWFyZVwiLCBcInVwbG9hZFwiLCBcImxlbW9uLW9cIiwgXCJwaG9uZVwiLCBcInNxdWFyZS1vXCIsIFwiYm9va21hcmstb1wiLCBcInBob25lLXNxdWFyZVwiLCBcInR3aXR0ZXJcIiwgXCJmYWNlYm9vay1mXCIsIFwiZmFjZWJvb2tcIiwgXCJnaXRodWJcIiwgXCJ1bmxvY2tcIiwgXCJjcmVkaXQtY2FyZFwiLCBcImZlZWRcIiwgXCJyc3NcIiwgXCJoZGQtb1wiLCBcImJ1bGxob3JuXCIsIFwiYmVsbFwiLCBcImNlcnRpZmljYXRlXCIsIFwiaGFuZC1vLXJpZ2h0XCIsIFwiaGFuZC1vLWxlZnRcIiwgXCJoYW5kLW8tdXBcIiwgXCJoYW5kLW8tZG93blwiLCBcImFycm93LWNpcmNsZS1sZWZ0XCIsIFwiYXJyb3ctY2lyY2xlLXJpZ2h0XCIsIFwiYXJyb3ctY2lyY2xlLXVwXCIsIFwiYXJyb3ctY2lyY2xlLWRvd25cIiwgXCJnbG9iZVwiLCBcIndyZW5jaFwiLCBcInRhc2tzXCIsIFwiZmlsdGVyXCIsIFwiYnJpZWZjYXNlXCIsIFwiYXJyb3dzLWFsdFwiLCBcImdyb3VwXCIsIFwidXNlcnNcIiwgXCJjaGFpblwiLCBcImxpbmtcIiwgXCJjbG91ZFwiLCBcImZsYXNrXCIsIFwiY3V0XCIsIFwic2Npc3NvcnNcIiwgXCJjb3B5XCIsIFwiZmlsZXMtb1wiLCBcInBhcGVyY2xpcFwiLCBcInNhdmVcIiwgXCJmbG9wcHktb1wiLCBcInNxdWFyZVwiLCBcIm5hdmljb25cIiwgXCJyZW9yZGVyXCIsIFwiYmFyc1wiLCBcImxpc3QtdWxcIiwgXCJsaXN0LW9sXCIsIFwic3RyaWtldGhyb3VnaFwiLCBcInVuZGVybGluZVwiLCBcInRhYmxlXCIsIFwibWFnaWNcIiwgXCJ0cnVja1wiLCBcInBpbnRlcmVzdFwiLCBcInBpbnRlcmVzdC1zcXVhcmVcIiwgXCJnb29nbGUtcGx1cy1zcXVhcmVcIiwgXCJnb29nbGUtcGx1c1wiLCBcIm1vbmV5XCIsIFwiY2FyZXQtZG93blwiLCBcImNhcmV0LXVwXCIsIFwiY2FyZXQtbGVmdFwiLCBcImNhcmV0LXJpZ2h0XCIsIFwiY29sdW1uc1wiLCBcInVuc29ydGVkXCIsIFwic29ydFwiLCBcInNvcnQtZG93blwiLCBcInNvcnQtZGVzY1wiLCBcInNvcnQtdXBcIiwgXCJzb3J0LWFzY1wiLCBcImVudmVsb3BlXCIsIFwibGlua2VkaW5cIiwgXCJyb3RhdGUtbGVmdFwiLCBcInVuZG9cIiwgXCJsZWdhbFwiLCBcImdhdmVsXCIsIFwiZGFzaGJvYXJkXCIsIFwidGFjaG9tZXRlclwiLCBcImNvbW1lbnQtb1wiLCBcImNvbW1lbnRzLW9cIiwgXCJmbGFzaFwiLCBcImJvbHRcIiwgXCJzaXRlbWFwXCIsIFwidW1icmVsbGFcIiwgXCJwYXN0ZVwiLCBcImNsaXBib2FyZFwiLCBcImxpZ2h0YnVsYi1vXCIsIFwiZXhjaGFuZ2VcIiwgXCJjbG91ZC1kb3dubG9hZFwiLCBcImNsb3VkLXVwbG9hZFwiLCBcInVzZXItbWRcIiwgXCJzdGV0aG9zY29wZVwiLCBcInN1aXRjYXNlXCIsIFwiYmVsbC1vXCIsIFwiY29mZmVlXCIsIFwiY3V0bGVyeVwiLCBcImZpbGUtdGV4dC1vXCIsIFwiYnVpbGRpbmctb1wiLCBcImhvc3BpdGFsLW9cIiwgXCJhbWJ1bGFuY2VcIiwgXCJtZWRraXRcIiwgXCJmaWdodGVyLWpldFwiLCBcImJlZXJcIiwgXCJoLXNxdWFyZVwiLCBcInBsdXMtc3F1YXJlXCIsIFwiYW5nbGUtZG91YmxlLWxlZnRcIiwgXCJhbmdsZS1kb3VibGUtcmlnaHRcIiwgXCJhbmdsZS1kb3VibGUtdXBcIiwgXCJhbmdsZS1kb3VibGUtZG93blwiLCBcImFuZ2xlLWxlZnRcIiwgXCJhbmdsZS1yaWdodFwiLCBcImFuZ2xlLXVwXCIsIFwiYW5nbGUtZG93blwiLCBcImRlc2t0b3BcIiwgXCJsYXB0b3BcIiwgXCJ0YWJsZXRcIiwgXCJtb2JpbGUtcGhvbmVcIiwgXCJtb2JpbGVcIiwgXCJjaXJjbGUtb1wiLCBcInF1b3RlLWxlZnRcIiwgXCJxdW90ZS1yaWdodFwiLCBcInNwaW5uZXJcIiwgXCJjaXJjbGVcIiwgXCJtYWlsLXJlcGx5XCIsIFwicmVwbHlcIiwgXCJnaXRodWItYWx0XCIsIFwiZm9sZGVyLW9cIiwgXCJmb2xkZXItb3Blbi1vXCIsIFwic21pbGUtb1wiLCBcImZyb3duLW9cIiwgXCJtZWgtb1wiLCBcImdhbWVwYWRcIiwgXCJrZXlib2FyZC1vXCIsIFwiZmxhZy1vXCIsIFwiZmxhZy1jaGVja2VyZWRcIiwgXCJ0ZXJtaW5hbFwiLCBcImNvZGVcIiwgXCJtYWlsLXJlcGx5LWFsbFwiLCBcInJlcGx5LWFsbFwiLCBcInN0YXItaGFsZi1lbXB0eVwiLCBcInN0YXItaGFsZi1mdWxsXCIsIFwic3Rhci1oYWxmLW9cIiwgXCJsb2NhdGlvbi1hcnJvd1wiLCBcImNyb3BcIiwgXCJjb2RlLWZvcmtcIiwgXCJ1bmxpbmtcIiwgXCJjaGFpbi1icm9rZW5cIiwgXCJxdWVzdGlvblwiLCBcImluZm9cIiwgXCJleGNsYW1hdGlvblwiLCBcInN1cGVyc2NyaXB0XCIsIFwic3Vic2NyaXB0XCIsIFwiZXJhc2VyXCIsIFwicHV6emxlLXBpZWNlXCIsIFwibWljcm9waG9uZVwiLCBcIm1pY3JvcGhvbmUtc2xhc2hcIiwgXCJzaGllbGRcIiwgXCJjYWxlbmRhci1vXCIsIFwiZmlyZS1leHRpbmd1aXNoZXJcIiwgXCJyb2NrZXRcIiwgXCJtYXhjZG5cIiwgXCJjaGV2cm9uLWNpcmNsZS1sZWZ0XCIsIFwiY2hldnJvbi1jaXJjbGUtcmlnaHRcIiwgXCJjaGV2cm9uLWNpcmNsZS11cFwiLCBcImNoZXZyb24tY2lyY2xlLWRvd25cIiwgXCJodG1sNVwiLCBcImNzczNcIiwgXCJhbmNob3JcIiwgXCJ1bmxvY2stYWx0XCIsIFwiYnVsbHNleWVcIiwgXCJlbGxpcHNpcy1oXCIsIFwiZWxsaXBzaXMtdlwiLCBcInJzcy1zcXVhcmVcIiwgXCJwbGF5LWNpcmNsZVwiLCBcInRpY2tldFwiLCBcIm1pbnVzLXNxdWFyZVwiLCBcIm1pbnVzLXNxdWFyZS1vXCIsIFwibGV2ZWwtdXBcIiwgXCJsZXZlbC1kb3duXCIsIFwiY2hlY2stc3F1YXJlXCIsIFwicGVuY2lsLXNxdWFyZVwiLCBcImV4dGVybmFsLWxpbmstc3F1YXJlXCIsIFwic2hhcmUtc3F1YXJlXCIsIFwiY29tcGFzc1wiLCBcInRvZ2dsZS1kb3duXCIsIFwiY2FyZXQtc3F1YXJlLW8tZG93blwiLCBcInRvZ2dsZS11cFwiLCBcImNhcmV0LXNxdWFyZS1vLXVwXCIsIFwidG9nZ2xlLXJpZ2h0XCIsIFwiY2FyZXQtc3F1YXJlLW8tcmlnaHRcIiwgXCJldXJvXCIsIFwiZXVyXCIsIFwiZ2JwXCIsIFwiZG9sbGFyXCIsIFwidXNkXCIsIFwicnVwZWVcIiwgXCJpbnJcIiwgXCJjbnlcIiwgXCJybWJcIiwgXCJ5ZW5cIiwgXCJqcHlcIiwgXCJydWJsZVwiLCBcInJvdWJsZVwiLCBcInJ1YlwiLCBcIndvblwiLCBcImtyd1wiLCBcImJpdGNvaW5cIiwgXCJidGNcIiwgXCJmaWxlXCIsIFwiZmlsZS10ZXh0XCIsIFwic29ydC1hbHBoYS1hc2NcIiwgXCJzb3J0LWFscGhhLWRlc2NcIiwgXCJzb3J0LWFtb3VudC1hc2NcIiwgXCJzb3J0LWFtb3VudC1kZXNjXCIsIFwic29ydC1udW1lcmljLWFzY1wiLCBcInNvcnQtbnVtZXJpYy1kZXNjXCIsIFwidGh1bWJzLXVwXCIsIFwidGh1bWJzLWRvd25cIiwgXCJ5b3V0dWJlLXNxdWFyZVwiLCBcInlvdXR1YmVcIiwgXCJ4aW5nXCIsIFwieGluZy1zcXVhcmVcIiwgXCJ5b3V0dWJlLXBsYXlcIiwgXCJkcm9wYm94XCIsIFwic3RhY2stb3ZlcmZsb3dcIiwgXCJpbnN0YWdyYW1cIiwgXCJmbGlja3JcIiwgXCJhZG5cIiwgXCJiaXRidWNrZXRcIiwgXCJiaXRidWNrZXQtc3F1YXJlXCIsIFwidHVtYmxyXCIsIFwidHVtYmxyLXNxdWFyZVwiLCBcImxvbmctYXJyb3ctZG93blwiLCBcImxvbmctYXJyb3ctdXBcIiwgXCJsb25nLWFycm93LWxlZnRcIiwgXCJsb25nLWFycm93LXJpZ2h0XCIsIFwiYXBwbGVcIiwgXCJ3aW5kb3dzXCIsIFwiYW5kcm9pZFwiLCBcImxpbnV4XCIsIFwiZHJpYmJibGVcIiwgXCJza3lwZVwiLCBcImZvdXJzcXVhcmVcIiwgXCJ0cmVsbG9cIiwgXCJmZW1hbGVcIiwgXCJtYWxlXCIsIFwiZ2l0dGlwXCIsIFwiZ3JhdGlwYXlcIiwgXCJzdW4tb1wiLCBcIm1vb24tb1wiLCBcImFyY2hpdmVcIiwgXCJidWdcIiwgXCJ2a1wiLCBcIndlaWJvXCIsIFwicmVucmVuXCIsIFwicGFnZWxpbmVzXCIsIFwic3RhY2stZXhjaGFuZ2VcIiwgXCJhcnJvdy1jaXJjbGUtby1yaWdodFwiLCBcImFycm93LWNpcmNsZS1vLWxlZnRcIiwgXCJ0b2dnbGUtbGVmdFwiLCBcImNhcmV0LXNxdWFyZS1vLWxlZnRcIiwgXCJkb3QtY2lyY2xlLW9cIiwgXCJ3aGVlbGNoYWlyXCIsIFwidmltZW8tc3F1YXJlXCIsIFwidHVya2lzaC1saXJhXCIsIFwidHJ5XCIsIFwicGx1cy1zcXVhcmUtb1wiLCBcInNwYWNlLXNodXR0bGVcIiwgXCJzbGFja1wiLCBcImVudmVsb3BlLXNxdWFyZVwiLCBcIndvcmRwcmVzc1wiLCBcIm9wZW5pZFwiLCBcImluc3RpdHV0aW9uXCIsIFwiYmFua1wiLCBcInVuaXZlcnNpdHlcIiwgXCJtb3J0YXItYm9hcmRcIiwgXCJncmFkdWF0aW9uLWNhcFwiLCBcInlhaG9vXCIsIFwiZ29vZ2xlXCIsIFwicmVkZGl0XCIsIFwicmVkZGl0LXNxdWFyZVwiLCBcInN0dW1ibGV1cG9uLWNpcmNsZVwiLCBcInN0dW1ibGV1cG9uXCIsIFwiZGVsaWNpb3VzXCIsIFwiZGlnZ1wiLCBcInBpZWQtcGlwZXJcIiwgXCJwaWVkLXBpcGVyLWFsdFwiLCBcImRydXBhbFwiLCBcImpvb21sYVwiLCBcImxhbmd1YWdlXCIsIFwiZmF4XCIsIFwiYnVpbGRpbmdcIiwgXCJjaGlsZFwiLCBcInBhd1wiLCBcInNwb29uXCIsIFwiY3ViZVwiLCBcImN1YmVzXCIsIFwiYmVoYW5jZVwiLCBcImJlaGFuY2Utc3F1YXJlXCIsIFwic3RlYW1cIiwgXCJzdGVhbS1zcXVhcmVcIiwgXCJyZWN5Y2xlXCIsIFwiYXV0b21vYmlsZVwiLCBcImNhclwiLCBcImNhYlwiLCBcInRheGlcIiwgXCJ0cmVlXCIsIFwic3BvdGlmeVwiLCBcImRldmlhbnRhcnRcIiwgXCJzb3VuZGNsb3VkXCIsIFwiZGF0YWJhc2VcIiwgXCJmaWxlLXBkZi1vXCIsIFwiZmlsZS13b3JkLW9cIiwgXCJmaWxlLWV4Y2VsLW9cIiwgXCJmaWxlLXBvd2VycG9pbnQtb1wiLCBcImZpbGUtcGhvdG8tb1wiLCBcImZpbGUtcGljdHVyZS1vXCIsIFwiZmlsZS1pbWFnZS1vXCIsIFwiZmlsZS16aXAtb1wiLCBcImZpbGUtYXJjaGl2ZS1vXCIsIFwiZmlsZS1zb3VuZC1vXCIsIFwiZmlsZS1hdWRpby1vXCIsIFwiZmlsZS1tb3ZpZS1vXCIsIFwiZmlsZS12aWRlby1vXCIsIFwiZmlsZS1jb2RlLW9cIiwgXCJ2aW5lXCIsIFwiY29kZXBlblwiLCBcImpzZmlkZGxlXCIsIFwibGlmZS1ib3V5XCIsIFwibGlmZS1idW95XCIsIFwibGlmZS1zYXZlclwiLCBcInN1cHBvcnRcIiwgXCJsaWZlLXJpbmdcIiwgXCJjaXJjbGUtby1ub3RjaFwiLCBcInJhXCIsIFwicmViZWxcIiwgXCJnZVwiLCBcImVtcGlyZVwiLCBcImdpdC1zcXVhcmVcIiwgXCJnaXRcIiwgXCJ5LWNvbWJpbmF0b3Itc3F1YXJlXCIsIFwieWMtc3F1YXJlXCIsIFwiaGFja2VyLW5ld3NcIiwgXCJ0ZW5jZW50LXdlaWJvXCIsIFwicXFcIiwgXCJ3ZWNoYXRcIiwgXCJ3ZWl4aW5cIiwgXCJzZW5kXCIsIFwicGFwZXItcGxhbmVcIiwgXCJzZW5kLW9cIiwgXCJwYXBlci1wbGFuZS1vXCIsIFwiaGlzdG9yeVwiLCBcImNpcmNsZS10aGluXCIsIFwiaGVhZGVyXCIsIFwicGFyYWdyYXBoXCIsIFwic2xpZGVyc1wiLCBcInNoYXJlLWFsdFwiLCBcInNoYXJlLWFsdC1zcXVhcmVcIiwgXCJib21iXCIsIFwic29jY2VyLWJhbGwtb1wiLCBcImZ1dGJvbC1vXCIsIFwidHR5XCIsIFwiYmlub2N1bGFyc1wiLCBcInBsdWdcIiwgXCJzbGlkZXNoYXJlXCIsIFwidHdpdGNoXCIsIFwieWVscFwiLCBcIm5ld3NwYXBlci1vXCIsIFwid2lmaVwiLCBcImNhbGN1bGF0b3JcIiwgXCJwYXlwYWxcIiwgXCJnb29nbGUtd2FsbGV0XCIsIFwiY2MtdmlzYVwiLCBcImNjLW1hc3RlcmNhcmRcIiwgXCJjYy1kaXNjb3ZlclwiLCBcImNjLWFtZXhcIiwgXCJjYy1wYXlwYWxcIiwgXCJjYy1zdHJpcGVcIiwgXCJiZWxsLXNsYXNoXCIsIFwiYmVsbC1zbGFzaC1vXCIsIFwidHJhc2hcIiwgXCJjb3B5cmlnaHRcIiwgXCJhdFwiLCBcImV5ZWRyb3BwZXJcIiwgXCJwYWludC1icnVzaFwiLCBcImJpcnRoZGF5LWNha2VcIiwgXCJhcmVhLWNoYXJ0XCIsIFwicGllLWNoYXJ0XCIsIFwibGluZS1jaGFydFwiLCBcImxhc3RmbVwiLCBcImxhc3RmbS1zcXVhcmVcIiwgXCJ0b2dnbGUtb2ZmXCIsIFwidG9nZ2xlLW9uXCIsIFwiYmljeWNsZVwiLCBcImJ1c1wiLCBcImlveGhvc3RcIiwgXCJhbmdlbGxpc3RcIiwgXCJjY1wiLCBcInNoZWtlbFwiLCBcInNoZXFlbFwiLCBcImlsc1wiLCBcIm1lYW5wYXRoXCIsIFwiYnV5c2VsbGFkc1wiLCBcImNvbm5lY3RkZXZlbG9wXCIsIFwiZGFzaGN1YmVcIiwgXCJmb3J1bWJlZVwiLCBcImxlYW5wdWJcIiwgXCJzZWxsc3lcIiwgXCJzaGlydHNpbmJ1bGtcIiwgXCJzaW1wbHlidWlsdFwiLCBcInNreWF0bGFzXCIsIFwiY2FydC1wbHVzXCIsIFwiY2FydC1hcnJvdy1kb3duXCIsIFwiZGlhbW9uZFwiLCBcInNoaXBcIiwgXCJ1c2VyLXNlY3JldFwiLCBcIm1vdG9yY3ljbGVcIiwgXCJzdHJlZXQtdmlld1wiLCBcImhlYXJ0YmVhdFwiLCBcInZlbnVzXCIsIFwibWFyc1wiLCBcIm1lcmN1cnlcIiwgXCJpbnRlcnNleFwiLCBcInRyYW5zZ2VuZGVyXCIsIFwidHJhbnNnZW5kZXItYWx0XCIsIFwidmVudXMtZG91YmxlXCIsIFwibWFycy1kb3VibGVcIiwgXCJ2ZW51cy1tYXJzXCIsIFwibWFycy1zdHJva2VcIiwgXCJtYXJzLXN0cm9rZS12XCIsIFwibWFycy1zdHJva2UtaFwiLCBcIm5ldXRlclwiLCBcImdlbmRlcmxlc3NcIiwgXCJmYWNlYm9vay1vZmZpY2lhbFwiLCBcInBpbnRlcmVzdC1wXCIsIFwid2hhdHNhcHBcIiwgXCJzZXJ2ZXJcIiwgXCJ1c2VyLXBsdXNcIiwgXCJ1c2VyLXRpbWVzXCIsIFwiaG90ZWxcIiwgXCJiZWRcIiwgXCJ2aWFjb2luXCIsIFwidHJhaW5cIiwgXCJzdWJ3YXlcIiwgXCJtZWRpdW1cIiwgXCJ5Y1wiLCBcInktY29tYmluYXRvclwiLCBcIm9wdGluLW1vbnN0ZXJcIiwgXCJvcGVuY2FydFwiLCBcImV4cGVkaXRlZHNzbFwiLCBcImJhdHRlcnktNFwiLCBcImJhdHRlcnktZnVsbFwiLCBcImJhdHRlcnktM1wiLCBcImJhdHRlcnktdGhyZWUtcXVhcnRlcnNcIiwgXCJiYXR0ZXJ5LTJcIiwgXCJiYXR0ZXJ5LWhhbGZcIiwgXCJiYXR0ZXJ5LTFcIiwgXCJiYXR0ZXJ5LXF1YXJ0ZXJcIiwgXCJiYXR0ZXJ5LTBcIiwgXCJiYXR0ZXJ5LWVtcHR5XCIsIFwibW91c2UtcG9pbnRlclwiLCBcImktY3Vyc29yXCIsIFwib2JqZWN0LWdyb3VwXCIsIFwib2JqZWN0LXVuZ3JvdXBcIiwgXCJzdGlja3ktbm90ZVwiLCBcInN0aWNreS1ub3RlLW9cIiwgXCJjYy1qY2JcIiwgXCJjYy1kaW5lcnMtY2x1YlwiLCBcImNsb25lXCIsIFwiYmFsYW5jZS1zY2FsZVwiLCBcImhvdXJnbGFzcy1vXCIsIFwiaG91cmdsYXNzLTFcIiwgXCJob3VyZ2xhc3Mtc3RhcnRcIiwgXCJob3VyZ2xhc3MtMlwiLCBcImhvdXJnbGFzcy1oYWxmXCIsIFwiaG91cmdsYXNzLTNcIiwgXCJob3VyZ2xhc3MtZW5kXCIsIFwiaG91cmdsYXNzXCIsIFwiaGFuZC1ncmFiLW9cIiwgXCJoYW5kLXJvY2stb1wiLCBcImhhbmQtc3RvcC1vXCIsIFwiaGFuZC1wYXBlci1vXCIsIFwiaGFuZC1zY2lzc29ycy1vXCIsIFwiaGFuZC1saXphcmQtb1wiLCBcImhhbmQtc3BvY2stb1wiLCBcImhhbmQtcG9pbnRlci1vXCIsIFwiaGFuZC1wZWFjZS1vXCIsIFwidHJhZGVtYXJrXCIsIFwicmVnaXN0ZXJlZFwiLCBcImNyZWF0aXZlLWNvbW1vbnNcIiwgXCJnZ1wiLCBcImdnLWNpcmNsZVwiLCBcInRyaXBhZHZpc29yXCIsIFwib2Rub2tsYXNzbmlraVwiLCBcIm9kbm9rbGFzc25pa2ktc3F1YXJlXCIsIFwiZ2V0LXBvY2tldFwiLCBcIndpa2lwZWRpYS13XCIsIFwic2FmYXJpXCIsIFwiY2hyb21lXCIsIFwiZmlyZWZveFwiLCBcIm9wZXJhXCIsIFwiaW50ZXJuZXQtZXhwbG9yZXJcIiwgXCJ0dlwiLCBcInRlbGV2aXNpb25cIiwgXCJjb250YW9cIiwgXCI1MDBweFwiLCBcImFtYXpvblwiLCBcImNhbGVuZGFyLXBsdXMtb1wiLCBcImNhbGVuZGFyLW1pbnVzLW9cIiwgXCJjYWxlbmRhci10aW1lcy1vXCIsIFwiY2FsZW5kYXItY2hlY2stb1wiLCBcImluZHVzdHJ5XCIsIFwibWFwLXBpblwiLCBcIm1hcC1zaWduc1wiLCBcIm1hcC1vXCIsIFwibWFwXCIsIFwiY29tbWVudGluZ1wiLCBcImNvbW1lbnRpbmctb1wiLCBcImhvdXp6XCIsIFwidmltZW9cIiwgXCJibGFjay10aWVcIiwgXCJmb250aWNvbnNcIiwgXCJyZWRkaXQtYWxpZW5cIiwgXCJlZGdlXCIsIFwiY3JlZGl0LWNhcmQtYWx0XCIsIFwiY29kaWVwaWVcIiwgXCJtb2R4XCIsIFwiZm9ydC1hd2Vzb21lXCIsIFwidXNiXCIsIFwicHJvZHVjdC1odW50XCIsIFwibWl4Y2xvdWRcIiwgXCJzY3JpYmRcIiwgXCJwYXVzZS1jaXJjbGVcIiwgXCJwYXVzZS1jaXJjbGUtb1wiLCBcInN0b3AtY2lyY2xlXCIsIFwic3RvcC1jaXJjbGUtb1wiLCBcInNob3BwaW5nLWJhZ1wiLCBcInNob3BwaW5nLWJhc2tldFwiLCBcImhhc2h0YWdcIiwgXCJibHVldG9vdGhcIiwgXCJibHVldG9vdGgtYlwiLCBcInBlcmNlbnRcIix9JztcbiAgICAgICAgLy8gJGlucHV0MiA9IGA8c2VsZWN0IGNsYXNzPSdncm91cEljb24nIGRhdGEtaGludD0nSUNPTicgZGF0YS1uYW1lPSdncm91cEljb24nPlxuICAgICAgICAgICAgICAgIC8vIDxvcHRpb24+PC9vcHRpb24+XG4gICAgICAgICAgICAvLyA8L3NlbGVjdGA7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJJbnB1dHMoJGlucHV0MiwgJycsICdzZWxlY3QnLCAnZ3JvdXBJY29uJywgJ0lDT04nLCAnaWNvbk5hbWUnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJJbnB1dHMoJGlucHV0LCAnJywgJ3RleHQnLCAnZ3JvdXBOYW1lJywgJ05BTUUnLCAnZ3JvdXBOYW1lJyk7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB0aGlzLiRzYXZlQnRuID0gYm9keS5maW5kKCcuc3VibWl0Jyk7XG4gICAgICAgIHRoaXMuJGNhbmNlbEJ0biA9IGJvZHkuZmluZCgnLmNhbmNlbCcpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGNhbmNlbEJ0biwgJ2NsaWNrJywgJ2hpZGUnKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRmb3JtLCAnc3VibWl0JywgJ3NhdmUnKTtcbiAgICB9LFxuXG4gICAgcmVuZGVySW5wdXRzKGVsLCB2YWx1ZSwgdHlwZSwgbmFtZSwgaGludCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGxldCAkaW5wdXQ7XG4gICAgICAgICRpbnB1dCA9ICQoYDxkaXYgY2xhc3M9XCJmYi1maWVsZFwiPjxkaXYgY2xhc3M9XCJpbnB1dC1oaW50XCI+JHtoaW50fTwvZGl2PiR7ZWx9PC9kaXY+YCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRmb3JtLmZpbmQoJy5ib2R5JykucHJlcGVuZCgkaW5wdXQpO1xuXG4gICAgICAgIC8vIFRPRE86IGFsbG93IHVzZXJzIHRvIGR5bmFtaWNhbGx5IHNlYXJjaCBmb250YXdlc29tZSBpY29uIHJlcG9zaXRvcnlcbiAgICAgICAgLy8gaWYgKHR5cGUgPT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgLy8gICAgICRpbnB1dC5zZWxlY3QyKHtcbiAgICAgICAgLy8gICAgICAgICBhamF4OiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHVybDogQ3JhZnQuZ2V0QWN0aW9uVXJsKCkgKyAnL2Zvcm0tYnVpbGRlci9pY29ucy9nZXQtYWxsLWljb25zJyxcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgLy8gICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogZGF0YS5pY29uc1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgIHBsYWNlaG9sZGVyOiAnU2VsZWN0IEljb24nLFxuICAgICAgICAvLyAgICAgICAgIGVzY2FwZU1hcmt1cDogZnVuY3Rpb24gKG1hcmt1cCkgeyByZXR1cm4gbWFya3VwOyB9LFxuICAgICAgICAvLyAgICAgICAgIHRlbXBsYXRlUmVzdWx0OiBmdW5jdGlvbihpY29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBtYXJrdXAgPSBgPGRpdiBjbGFzcz0nc2VsZWN0Mi1yZXN1bHQtaWNvbiBjbGVhcmZpeCc+PGRpdiBjbGFzcz0nc2VsZWN0Mi1yZXN1bHQtaW1hZ2UnPjxpbWcgc3JjPScke2ljb24uaWNvbn0nIC8+PC9kaXY+PGRpdiBjbGFzcz0nc2VsZWN0Mi1yZXN1bHQtaWNvbi1kZXRhaWxzJz48ZGl2IGNsYXNzPSdzZWxlY3QyLXJlc3VsdC1uYW1lJz4ke2ljb24ubmFtZX08L2Rpdj5gO1xuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gbWFya3VwO1xuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgdGVtcGxhdGVTZWxlY3Rpb246IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICBzYXZlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IGdyb3VwSWNvbjtcbiAgICAgICAgbGV0IGdyb3VwTmFtZTtcbiAgICAgICAgbGV0IGlucHV0TGVuZ3RoO1xuICAgICAgICBsZXQgc2VsZjtcblxuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgZ3JvdXBOYW1lID0gdGhpcy4kZm9ybS5maW5kKCcuZ3JvdXBOYW1lJykudmFsKCk7XG4gICAgICAgIGdyb3VwSWNvbiA9IHRoaXMuJGZvcm0uZmluZCgnLmdyb3VwSWNvbicpLnZhbCgpO1xuICAgICAgICBpbnB1dExlbmd0aCA9IHRoaXMuJGZvcm0uZmluZCgnLmdyb3VwTmFtZScpLnZhbCgpLmxlbmd0aDtcbiAgICAgICAgaWYgKGlucHV0TGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5ncm91cC5pZCA/IHRoaXMuZ3JvdXAuaWQgOiBudWxsLFxuICAgICAgICAgICAgICAgIG5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBpY29uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBncm91cEljb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZ3JvdXBzL3NhdmUnLCBkYXRhLCAkLnByb3h5KChmdW5jdGlvbihyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnM7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBDcmFmdC5nZXRVcmwoJ2Zvcm0tYnVpbGRlci9mb3JtcycpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5mbGF0dGVuRXJyb3JzKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ291bGQgbm90IGNyZWF0ZSB0aGUgZ3JvdXA6Jyl9XFxuXFxuJHtlcnJvcnMuam9pbignXFxuJyl9YCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxhdHRlbkVycm9ycyhyZXNwb25zZUVycm9ycykge1xuICAgICAgICBsZXQgYXR0cmlidXRlO1xuICAgICAgICBsZXQgZXJyb3JzO1xuICAgICAgICBlcnJvcnMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoYXR0cmlidXRlIGluIHJlc3BvbnNlRXJyb3JzKSB7XG4gICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHJlc3BvbnNlRXJyb3JzW2F0dHJpYnV0ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICB9XG59KTtcbiAgXG5HYXJuaXNoLiRkb2MucmVhZHkoKCkgPT4ge1xuICAgIGxldCBGb3JtR3JvdXBzO1xuICAgIEZvcm1Hcm91cHMgPSBuZXcgR3JvdXBzO1xuICAgICQuZWFjaCgkKCcuZ3JvdXAtaXRlbScpLCAoaSwgaXRlbSkgPT4gbmV3IEdyb3VwSXRlbShpdGVtKSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kZXZlbG9wbWVudC9qcy9ncm91cHMuanMiXSwic291cmNlUm9vdCI6IiJ9