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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
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

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGI4MGVhYmZmNWJiMTlkYTA1NDUiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvZ3JvdXBzLmpzIl0sIm5hbWVzIjpbIkdyb3VwSXRlbSIsIkdyb3VwTW9kYWwiLCJHcm91cHMiLCJHYXJuaXNoIiwiQmFzZSIsImV4dGVuZCIsIiRncm91cHMiLCIkc2VsZWN0ZWRHcm91cCIsIiRuZXdHcm91cEJ0biIsIm1vZGFsIiwiaW5pdCIsIiRncm91cFNldHRpbmdzQnRuIiwibWVudUJ0biIsIiQiLCJmaW5kIiwiYWRkTGlzdGVuZXIiLCJsZW5ndGgiLCJkYXRhIiwic2V0dGluZ3MiLCJvbk9wdGlvblNlbGVjdCIsInByb3h5IiwiZWxlbSIsImFjdGlvbiIsInJlbmFtZVNlbGVjdGVkR3JvdXAiLCJkZWxldGVTZWxlY3RlZEdyb3VwIiwiYWRkTmV3R3JvdXAiLCJzaG93IiwibmV3TmFtZSIsIm9sZE5hbWUiLCJ0ZXh0IiwicHJvbXB0Rm9yR3JvdXBOYW1lIiwiaWQiLCJuYW1lIiwiQ3JhZnQiLCJwb3N0QWN0aW9uUmVxdWVzdCIsInJlc3BvbnNlIiwidGV4dFN0YXR1cyIsImVycm9ycyIsInN1Y2Nlc3MiLCJncm91cCIsImNwIiwiZGlzcGxheU5vdGljZSIsInQiLCJmbGF0dGVuRXJyb3JzIiwiYWxlcnQiLCJqb2luIiwiZGlzcGxheUVycm9yIiwicHJvbXB0IiwiY29uZmlybSIsImxvY2F0aW9uIiwiaHJlZiIsImdldFVybCIsInJlc3BvbnNlRXJyb3JzIiwiYXR0cmlidXRlIiwiY29uY2F0IiwiTW9kYWwiLCIkZ3JvdXBMaXN0SXRlbSIsIiRncm91cCIsIiRlZGl0R3JvdXBCdG4iLCJsYWJlbCIsImljb25OYW1lIiwiZWwiLCJlZGl0IiwiJGZvcm0iLCIkbW9kYWxJbnB1dHMiLCIkaW5wdXQiLCIkaW5wdXQyIiwiJGljb25zIiwiYm9keSIsInRpdGxlIiwic2VsZiIsImJhc2UiLCJhcHBlbmRUbyIsIiRib2QiLCJzZXRDb250YWluZXIiLCJyZW5kZXJJbnB1dHMiLCIkc2F2ZUJ0biIsIiRjYW5jZWxCdG4iLCJ2YWx1ZSIsInR5cGUiLCJoaW50IiwiY2xhc3NOYW1lIiwicHJlcGVuZCIsInNhdmUiLCJlIiwicHJldmVudERlZmF1bHQiLCJncm91cEljb24iLCJncm91cE5hbWUiLCJpbnB1dExlbmd0aCIsInZhbCIsImljb24iLCJjb25zb2xlIiwibG9nIiwiJGRvYyIsInJlYWR5IiwiRm9ybUdyb3VwcyIsImVhY2giLCJpIiwiaXRlbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQSxJQUFJQSxrQkFBSjtBQUNBLElBQUlDLG1CQUFKO0FBQ0EsSUFBSUMsZUFBSjs7QUFFQUEsU0FBU0MsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3pCQyxhQUFTLElBRGdCO0FBRXpCQyxvQkFBZ0IsSUFGUztBQUd6QkMsa0JBQWMsSUFIVztBQUl6QkMsV0FBTyxJQUprQjs7QUFNekJDLFFBTnlCLGtCQU1sQjtBQUNILFlBQUlDLDBCQUFKO0FBQ0EsWUFBSUMsZ0JBQUo7O0FBRUEsYUFBS04sT0FBTCxHQUFlTyxFQUFFLFNBQUYsQ0FBZjtBQUNBLGFBQUtOLGNBQUwsR0FBc0IsS0FBS0QsT0FBTCxDQUFhUSxJQUFiLENBQWtCLGFBQWxCLENBQXRCO0FBQ0Es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QUNKLGFBYnlELEVBYXRELElBYnNELENBQTFEO0FBY0g7QUFDSixLQTVHNkI7QUE4RzlCSCxpQkE5RzhCLHlCQThHaEJTLGNBOUdnQixFQThHQTtBQUMxQixZQUFJQyxrQkFBSjtBQUNBLFlBQUloQixlQUFKO0FBQ0FBLGlCQUFTLEVBQVQ7O0FBRUEsYUFBS2dCLFNBQUwsSUFBa0JELGNBQWxCLEVBQWtDO0FBQzlCZixxQkFBU0EsT0FBT2lCLE1BQVAsQ0FBY0YsZUFBZUMsU0FBZixDQUFkLENBQVQ7QUFDSDs7QUFFRCxlQUFPaEIsTUFBUDtBQUNIO0FBeEg2QixDQUFyQixDQUFiOztBQTJIQWxDLFFBQVEwRixJQUFSLENBQWFDLEtBQWIsQ0FBbUIsWUFBTTtBQUNyQixRQUFJQyxtQkFBSjtBQUNBQSxpQkFBYSxJQUFJN0YsTUFBSixFQUFiO0FBQ0FXLE1BQUVtRixJQUFGLENBQU9uRixFQUFFLGFBQUYsQ0FBUCxFQUF5QixVQUFDb0YsQ0FBRCxFQUFJQyxJQUFKO0FBQUEsZUFBYSxJQUFJbEcsU0FBSixDQUFja0csSUFBZCxDQUFiO0FBQUEsS0FBekI7QUFDSCxDQUpELEUiLCJmaWxlIjoiL3JlbGVhc2Uvc3JjL2Fzc2V0cy9qcy9ncm91cHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4YjgwZWFiZmY1YmIxOWRhMDU0NSIsImxldCBHcm91cEl0ZW07XG5sZXQgR3JvdXBNb2RhbDtcbmxldCBHcm91cHM7XG5cbkdyb3VwcyA9IEdhcm5pc2guQmFzZS5leHRlbmQoe1xuICAgICRncm91cHM6IG51bGwsXG4gICAgJHNlbGVjdGVkR3JvdXA6IG51bGwsXG4gICAgJG5ld0dyb3VwQnRuOiBudWxsLFxuICAgIG1vZGFsOiBudWxsLFxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0ICRncm91cFNldHRpbmdzQnRuO1xuICAgICAgICBsZXQgbWVudUJ0bjtcblxuICAgICAgICB0aGlzLiRncm91cHMgPSAkKCcjZ3JvdXBzJyk7XG4gICAgICAgIHRoaXMuJHNlbGVjdGVkR3JvdXAgPSB0aGlzLiRncm91cHMuZmluZCgnYS5zZWw6Zmlyc3QnKTtcbiAgICAgICAgdGhpcy4kbmV3R3JvdXBCdG4gPSAkKCcjbmV3Z3JvdXBidG4nKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRuZXdHcm91cEJ0biwgJ2NsaWNrJywgJ2FkZE5ld0dyb3VwJyk7XG5cbiAgICAgICAgJGdyb3VwU2V0dGluZ3NCdG4gPSAkKCcjZ3JvdXBzZXR0aW5nc2J0bicpO1xuXG4gICAgICAgIGlmICgkZ3JvdXBTZXR0aW5nc0J0bi5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lbnVCdG4gPSAkZ3JvdXBTZXR0aW5nc0J0bi5kYXRhKCdtZW51YnRuJyk7XG4gICAgICAgICAgICBtZW51QnRuLnNldHRpbmdzLm9uT3B0aW9uU2VsZWN0ID0gJC5wcm94eSgoZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb247XG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJChlbGVtKS5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbmFtZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmFtZVNlbGVjdGVkR3JvdXAoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlU2VsZWN0ZWRHcm91cCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGROZXdHcm91cCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IEdyb3VwTW9kYWwodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5hbWVTZWxlY3RlZEdyb3VwKCkge1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IG5ld05hbWU7XG4gICAgICAgIGxldCBvbGROYW1lO1xuXG4gICAgICAgIG9sZE5hbWUgPSB0aGlzLiRzZWxlY3RlZEdyb3VwLnRleHQoKTtcbiAgICAgICAgbmV3TmFtZSA9IHRoaXMucHJvbXB0Rm9yR3JvdXBOYW1lKG9sZE5hbWUpO1xuICAgICAgXG4gICAgICAgIGlmIChuZXdOYW1lICYmIG5ld05hbWUgIT09IG9sZE5hbWUpIHtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuJHNlbGVjdGVkR3JvdXAuZGF0YSgnaWQnKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBuZXdOYW1lXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2dyb3Vwcy9zYXZlJywgZGF0YSwgJC5wcm94eSgoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2VsZWN0ZWRHcm91cC50ZXh0KHJlc3BvbnNlLmdyb3VwLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheU5vdGljZShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnR3JvdXAgcmVuYW1lZC4nKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmZsYXR0ZW5FcnJvcnMocmVzcG9uc2UuZXJyb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGAke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDb3VsZCBub3QgcmVuYW1lIHRoZSBncm91cDonKX1cXG5cXG4ke2Vycm9ycy5qb2luKCdcXG4nKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwcm9tcHRGb3JHcm91cE5hbWUob2xkTmFtZSkge1xuICAgICAgICBwcm9tcHQoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1doYXQgZG8geW91IHdhbnQgdG8gbmFtZSB5b3VyIGdyb3VwPycpLCBvbGROYW1lKTtcbiAgICB9LFxuXG4gICAgZGVsZXRlU2VsZWN0ZWRHcm91cCgpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIHRoaXMuJHNlbGVjdGVkR3JvdXAgPSAkKCcjZ3JvdXBzIGEuc2VsJyk7XG4gICAgICBcbiAgICAgICAgaWYgKHRoaXMuJHNlbGVjdGVkR3JvdXAuZGF0YSgnaWQnKSA9PT0gMSkge1xuICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheUVycm9yKENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDYW5ub3QgZGVsZXRlIERlZmF1bHQgZ3JvdXAnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29uZmlybShDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGdyb3VwIGFuZCBhbGwgaXRzIGZvcm1zPycpKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLiRzZWxlY3RlZEdyb3VwLmRhdGEoJ2lkJylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9ncm91cHMvZGVsZXRlJywgZGF0YSwgJC5wcm94eSgoKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IENyYWZ0LmdldFVybCgnZm9ybS1idWlsZGVyL2Zvcm1zJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmbGF0dGVuRXJyb3JzKHJlc3BvbnNlRXJyb3JzKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGU7XG4gICAgICAgIGxldCBlcnJvcnM7XG4gICAgICAgIGVycm9ycyA9IFtdO1xuXG4gICAgICAgIGZvciAoYXR0cmlidXRlIGluIHJlc3BvbnNlRXJyb3JzKSB7XG4gICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHJlc3BvbnNlRXJyb3JzW2F0dHJpYnV0ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICB9XG59KTtcblxuR3JvdXBJdGVtID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgICRncm91cExpc3RJdGVtOiBudWxsLFxuICAgICRncm91cDogbnVsbCxcbiAgICAkZWRpdEdyb3VwQnRuOiBudWxsLFxuICAgIGlkOiBudWxsLFxuICAgIGxhYmVsOiBudWxsLFxuICAgIGljb25OYW1lOiBudWxsLFxuICAgIG1vZGFsOiBudWxsLFxuXG4gICAgaW5pdChlbCkge1xuICAgICAgICB0aGlzLiRncm91cExpc3RJdGVtID0gJChlbCk7XG4gICAgICAgIHRoaXMuJGdyb3VwID0gdGhpcy4kZ3JvdXBMaXN0SXRlbS5maW5kKCdhJyk7XG4gICAgICAgIHRoaXMuJGVkaXRHcm91cEJ0biA9IHRoaXMuJGdyb3VwLmZpbmQoJy5lZGl0LWdyb3VwJyk7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLiRncm91cC5kYXRhKCdpZCcpO1xuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy4kZ3JvdXAuZGF0YSgnbGFiZWwnKTtcbiAgICAgICAgdGhpcy5pY29uTmFtZSA9IHRoaXMuJGdyb3VwLmRhdGEoJ2ljb24tbmFtZScpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGVkaXRHcm91cEJ0biwgJ2NsaWNrJywgJ2VkaXQnKTtcbiAgICB9LFxuXG4gICAgZWRpdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsID0gbmV3IEdyb3VwTW9kYWwodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5Hcm91cE1vZGFsID0gR2FybmlzaC5Nb2RhbC5leHRlbmQoe1xuICAgIGdyb3VwOiBudWxsLFxuICAgICRmb3JtOiBudWxsLFxuICAgICRtb2RhbElucHV0czogbnVsbCxcbiAgICBpbml0KGdyb3VwKSB7XG4gICAgICAgIGxldCAkaW5wdXQ7XG4gICAgICAgIGxldCAkaW5wdXQyO1xuICAgICAgICBsZXQgJGljb25zO1xuICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgbGV0IGljb25OYW1lO1xuICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgIGxldCB0aXRsZTtcbiAgICAgICAgbGV0IHNlbGY7XG5cbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcbiAgICAgICAgdGhpcy5iYXNlKCk7XG4gICAgICAgIHRoaXMuJGZvcm0gPSAkKCc8Zm9ybSBjbGFzcz1cIm1vZGFsIGZpdHRlZCBmb3JtYnVpbGRlci1tb2RhbFwiPicpLmFwcGVuZFRvKEdhcm5pc2guJGJvZCk7XG4gICAgICAgIHRoaXMuc2V0Q29udGFpbmVyKHRoaXMuJGZvcm0pO1xuXG4gICAgICAgIHRpdGxlID0gdGhpcy5ncm91cC5pZCA/IENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdFZGl0IEdyb3VwJykgOiBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnTmV3IEdyb3VwJyk7XG4gICAgICAgIGJvZHkgPSAkKFsnPGhlYWRlcj4nLCBgPHNwYW4gY2xhc3M9XCJtb2RhbC10aXRsZVwiPiR7dGl0bGV9PC9zcGFuPmAsICc8L2hlYWRlcj4nLCAnPGRpdiBjbGFzcz1cImJvZHlcIj48ZGl2IGNsYXNzPVwiZm9vdGVyLW5vdGVzXCI+R2V0IGljb24gbmFtZXMgYXQgPGEgaHJlZj1cImh0dHBzOi8vZm9udGF3ZXNvbWUuY29tL2ljb25zXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Rm9udEF3ZXNvbWU8L2E+PC9kaXY+PC9kaXY+JywgJzxmb290ZXIgY2xhc3M9XCJmb290ZXJcIj4nLCAnPGRpdiBjbGFzcz1cImJ1dHRvbnNcIj4nLCBgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bnMgYnRuLW1vZGFsIGNhbmNlbFwiIHZhbHVlPVwiJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2FuY2VsJyl9XCI+YCwgYDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBzdWJtaXRcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ1NhdmUnKX1cIj5gLCAnPC9kaXY+JywgJzwvZm9vdGVyPiddLmpvaW4oJycpKS5hcHBlbmRUbyh0aGlzLiRmb3JtKTtcbiAgICAgICAgbGFiZWwgPSB0aGlzLmdyb3VwLmxhYmVsID8gdGhpcy5ncm91cC5sYWJlbCA6ICcnO1xuICAgICAgICBpY29uTmFtZSA9IHRoaXMuZ3JvdXAuaWNvbk5hbWUgPyB0aGlzLmdyb3VwLmljb25OYW1lIDogJyc7XG4gICAgICAgICRpbnB1dCA9IGA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9J2dyb3VwTmFtZScgdmFsdWU9JyR7bGFiZWx9JyBkYXRhLWhpbnQ9J05BTUUnIGRhdGEtbmFtZT0nZ3JvdXBOYW1lJyAvPmA7XG4gICAgICAgICRpbnB1dDIgPSBgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPSdncm91cEljb24nIHZhbHVlPScke2ljb25OYW1lfScgZGF0YS1oaW50PSdJQ09OJyBkYXRhLW5hbWU9J2dyb3VwSWNvbicgLz5gO1xuICAgICAgICAvLyAkaWNvbnMgPSAne1wiZ2xhc3NcIiwgXCJtdXNpY1wiLCBcInNlYXJjaFwiLCBcImVudmVsb3BlLW9cIiwgXCJoZWFydFwiLCBcInN0YXJcIiwgXCJzdGFyLW9cIiwgXCJ1c2VyXCIsIFwiZmlsbVwiLCBcInRoLWxhcmdlXCIsIFwidGhcIiwgXCJ0aC1saXN0XCIsIFwiY2hlY2tcIiwgXCJyZW1vdmVcIiwgXCJjbG9zZVwiLCBcInRpbWVzXCIsIFwic2VhcmNoLXBsdXNcIiwgXCJzZWFyY2gtbWludXNcIiwgXCJwb3dlci1vZmZcIiwgXCJzaWduYWxcIiwgXCJnZWFyXCIsIFwiY29nXCIsIFwidHJhc2gtb1wiLCBcImhvbWVcIiwgXCJmaWxlLW9cIiwgXCJjbG9jay1vXCIsIFwicm9hZFwiLCBcImRvd25sb2FkXCIsIFwiYXJyb3ctY2lyY2xlLW8tZG93blwiLCBcImFycm93LWNpcmNsZS1vLXVwXCIsIFwiaW5ib3hcIiwgXCJwbGF5LWNpcmNsZS1vXCIsIFwicm90YXRlLXJpZ2h0XCIsIFwicmVwZWF0XCIsIFwicmVmcmVzaFwiLCBcImxpc3QtYWx0XCIsIFwibG9ja1wiLCBcImZsYWdcIiwgXCJoZWFkcGhvbmVzXCIsIFwidm9sdW1lLW9mZlwiLCBcInZvbHVtZS1kb3duXCIsIFwidm9sdW1lLXVwXCIsIFwicXJjb2RlXCIsIFwiYmFyY29kZVwiLCBcInRhZ1wiLCBcInRhZ3NcIiwgXCJib29rXCIsIFwiYm9va21hcmtcIiwgXCJwcmludFwiLCBcImNhbWVyYVwiLCBcImZvbnRcIiwgXCJib2xkXCIsIFwiaXRhbGljXCIsIFwidGV4dC1oZWlnaHRcIiwgXCJ0ZXh0LXdpZHRoXCIsIFwiYWxpZ24tbGVmdFwiLCBcImFsaWduLWNlbnRlclwiLCBcImFsaWduLXJpZ2h0XCIsIFwiYWxpZ24tanVzdGlmeVwiLCBcImxpc3RcIiwgXCJkZWRlbnRcIiwgXCJvdXRkZW50XCIsIFwiaW5kZW50XCIsIFwidmlkZW8tY2FtZXJhXCIsIFwicGhvdG9cIiwgXCJpbWFnZVwiLCBcInBpY3R1cmUtb1wiLCBcInBlbmNpbFwiLCBcIm1hcC1tYXJrZXJcIiwgXCJhZGp1c3RcIiwgXCJ0aW50XCIsIFwiZWRpdFwiLCBcInBlbmNpbC1zcXVhcmUtb1wiLCBcInNoYXJlLXNxdWFyZS1vXCIsIFwiY2hlY2stc3F1YXJlLW9cIiwgXCJhcnJvd3NcIiwgXCJzdGVwLWJhY2t3YXJkXCIsIFwiZmFzdC1iYWNrd2FyZFwiLCBcImJhY2t3YXJkXCIsIFwicGxheVwiLCBcInBhdXNlXCIsIFwic3RvcFwiLCBcImZvcndhcmRcIiwgXCJmYXN0LWZvcndhcmRcIiwgXCJzdGVwLWZvcndhcmRcIiwgXCJlamVjdFwiLCBcImNoZXZyb24tbGVmdFwiLCBcImNoZXZyb24tcmlnaHRcIiwgXCJwbHVzLWNpcmNsZVwiLCBcIm1pbnVzLWNpcmNsZVwiLCBcInRpbWVzLWNpcmNsZVwiLCBcImNoZWNrLWNpcmNsZVwiLCBcInF1ZXN0aW9uLWNpcmNsZVwiLCBcImluZm8tY2lyY2xlXCIsIFwiY3Jvc3NoYWlyc1wiLCBcInRpbWVzLWNpcmNsZS1vXCIsIFwiY2hlY2stY2lyY2xlLW9cIiwgXCJiYW5cIiwgXCJhcnJvdy1sZWZ0XCIsIFwiYXJyb3ctcmlnaHRcIiwgXCJhcnJvdy11cFwiLCBcImFycm93LWRvd25cIiwgXCJtYWlsLWZvcndhcmRcIiwgXCJzaGFyZVwiLCBcImV4cGFuZFwiLCBcImNvbXByZXNzXCIsIFwicGx1c1wiLCBcIm1pbnVzXCIsIFwiYXN0ZXJpc2tcIiwgXCJleGNsYW1hdGlvbi1jaXJjbGVcIiwgXCJnaWZ0XCIsIFwibGVhZlwiLCBcImZpcmVcIiwgXCJleWVcIiwgXCJleWUtc2xhc2hcIiwgXCJ3YXJuaW5nXCIsIFwiZXhjbGFtYXRpb24tdHJpYW5nbGVcIiwgXCJwbGFuZVwiLCBcImNhbGVuZGFyXCIsIFwicmFuZG9tXCIsIFwiY29tbWVudFwiLCBcIm1hZ25ldFwiLCBcImNoZXZyb24tdXBcIiwgXCJjaGV2cm9uLWRvd25cIiwgXCJyZXR3ZWV0XCIsIFwic2hvcHBpbmctY2FydFwiLCBcImZvbGRlclwiLCBcImZvbGRlci1vcGVuXCIsIFwiYXJyb3dzLXZcIiwgXCJhcnJvd3MtaFwiLCBcImJhci1jaGFydC1vXCIsIFwiYmFyLWNoYXJ0XCIsIFwidHdpdHRlci1zcXVhcmVcIiwgXCJmYWNlYm9vay1zcXVhcmVcIiwgXCJjYW1lcmEtcmV0cm9cIiwgXCJrZXlcIiwgXCJnZWFyc1wiLCBcImNvZ3NcIiwgXCJjb21tZW50c1wiLCBcInRodW1icy1vLXVwXCIsIFwidGh1bWJzLW8tZG93blwiLCBcInN0YXItaGFsZlwiLCBcImhlYXJ0LW9cIiwgXCJzaWduLW91dFwiLCBcImxpbmtlZGluLXNxdWFyZVwiLCBcInRodW1iLXRhY2tcIiwgXCJleHRlcm5hbC1saW5rXCIsIFwic2lnbi1pblwiLCBcInRyb3BoeVwiLCBcImdpdGh1Yi1zcXVhcmVcIiwgXCJ1cGxvYWRcIiwgXCJsZW1vbi1vXCIsIFwicGhvbmVcIiwgXCJzcXVhcmUtb1wiLCBcImJvb2ttYXJrLW9cIiwgXCJwaG9uZS1zcXVhcmVcIiwgXCJ0d2l0dGVyXCIsIFwiZmFjZWJvb2stZlwiLCBcImZhY2Vib29rXCIsIFwiZ2l0aHViXCIsIFwidW5sb2NrXCIsIFwiY3JlZGl0LWNhcmRcIiwgXCJmZWVkXCIsIFwicnNzXCIsIFwiaGRkLW9cIiwgXCJidWxsaG9yblwiLCBcImJlbGxcIiwgXCJjZXJ0aWZpY2F0ZVwiLCBcImhhbmQtby1yaWdodFwiLCBcImhhbmQtby1sZWZ0XCIsIFwiaGFuZC1vLXVwXCIsIFwiaGFuZC1vLWRvd25cIiwgXCJhcnJvdy1jaXJjbGUtbGVmdFwiLCBcImFycm93LWNpcmNsZS1yaWdodFwiLCBcImFycm93LWNpcmNsZS11cFwiLCBcImFycm93LWNpcmNsZS1kb3duXCIsIFwiZ2xvYmVcIiwgXCJ3cmVuY2hcIiwgXCJ0YXNrc1wiLCBcImZpbHRlclwiLCBcImJyaWVmY2FzZVwiLCBcImFycm93cy1hbHRcIiwgXCJncm91cFwiLCBcInVzZXJzXCIsIFwiY2hhaW5cIiwgXCJsaW5rXCIsIFwiY2xvdWRcIiwgXCJmbGFza1wiLCBcImN1dFwiLCBcInNjaXNzb3JzXCIsIFwiY29weVwiLCBcImZpbGVzLW9cIiwgXCJwYXBlcmNsaXBcIiwgXCJzYXZlXCIsIFwiZmxvcHB5LW9cIiwgXCJzcXVhcmVcIiwgXCJuYXZpY29uXCIsIFwicmVvcmRlclwiLCBcImJhcnNcIiwgXCJsaXN0LXVsXCIsIFwibGlzdC1vbFwiLCBcInN0cmlrZXRocm91Z2hcIiwgXCJ1bmRlcmxpbmVcIiwgXCJ0YWJsZVwiLCBcIm1hZ2ljXCIsIFwidHJ1Y2tcIiwgXCJwaW50ZXJlc3RcIiwgXCJwaW50ZXJlc3Qtc3F1YXJlXCIsIFwiZ29vZ2xlLXBsdXMtc3F1YXJlXCIsIFwiZ29vZ2xlLXBsdXNcIiwgXCJtb25leVwiLCBcImNhcmV0LWRvd25cIiwgXCJjYXJldC11cFwiLCBcImNhcmV0LWxlZnRcIiwgXCJjYXJldC1yaWdodFwiLCBcImNvbHVtbnNcIiwgXCJ1bnNvcnRlZFwiLCBcInNvcnRcIiwgXCJzb3J0LWRvd25cIiwgXCJzb3J0LWRlc2NcIiwgXCJzb3J0LXVwXCIsIFwic29ydC1hc2NcIiwgXCJlbnZlbG9wZVwiLCBcImxpbmtlZGluXCIsIFwicm90YXRlLWxlZnRcIiwgXCJ1bmRvXCIsIFwibGVnYWxcIiwgXCJnYXZlbFwiLCBcImRhc2hib2FyZFwiLCBcInRhY2hvbWV0ZXJcIiwgXCJjb21tZW50LW9cIiwgXCJjb21tZW50cy1vXCIsIFwiZmxhc2hcIiwgXCJib2x0XCIsIFwic2l0ZW1hcFwiLCBcInVtYnJlbGxhXCIsIFwicGFzdGVcIiwgXCJjbGlwYm9hcmRcIiwgXCJsaWdodGJ1bGItb1wiLCBcImV4Y2hhbmdlXCIsIFwiY2xvdWQtZG93bmxvYWRcIiwgXCJjbG91ZC11cGxvYWRcIiwgXCJ1c2VyLW1kXCIsIFwic3RldGhvc2NvcGVcIiwgXCJzdWl0Y2FzZVwiLCBcImJlbGwtb1wiLCBcImNvZmZlZVwiLCBcImN1dGxlcnlcIiwgXCJmaWxlLXRleHQtb1wiLCBcImJ1aWxkaW5nLW9cIiwgXCJob3NwaXRhbC1vXCIsIFwiYW1idWxhbmNlXCIsIFwibWVka2l0XCIsIFwiZmlnaHRlci1qZXRcIiwgXCJiZWVyXCIsIFwiaC1zcXVhcmVcIiwgXCJwbHVzLXNxdWFyZVwiLCBcImFuZ2xlLWRvdWJsZS1sZWZ0XCIsIFwiYW5nbGUtZG91YmxlLXJpZ2h0XCIsIFwiYW5nbGUtZG91YmxlLXVwXCIsIFwiYW5nbGUtZG91YmxlLWRvd25cIiwgXCJhbmdsZS1sZWZ0XCIsIFwiYW5nbGUtcmlnaHRcIiwgXCJhbmdsZS11cFwiLCBcImFuZ2xlLWRvd25cIiwgXCJkZXNrdG9wXCIsIFwibGFwdG9wXCIsIFwidGFibGV0XCIsIFwibW9iaWxlLXBob25lXCIsIFwibW9iaWxlXCIsIFwiY2lyY2xlLW9cIiwgXCJxdW90ZS1sZWZ0XCIsIFwicXVvdGUtcmlnaHRcIiwgXCJzcGlubmVyXCIsIFwiY2lyY2xlXCIsIFwibWFpbC1yZXBseVwiLCBcInJlcGx5XCIsIFwiZ2l0aHViLWFsdFwiLCBcImZvbGRlci1vXCIsIFwiZm9sZGVyLW9wZW4tb1wiLCBcInNtaWxlLW9cIiwgXCJmcm93bi1vXCIsIFwibWVoLW9cIiwgXCJnYW1lcGFkXCIsIFwia2V5Ym9hcmQtb1wiLCBcImZsYWctb1wiLCBcImZsYWctY2hlY2tlcmVkXCIsIFwidGVybWluYWxcIiwgXCJjb2RlXCIsIFwibWFpbC1yZXBseS1hbGxcIiwgXCJyZXBseS1hbGxcIiwgXCJzdGFyLWhhbGYtZW1wdHlcIiwgXCJzdGFyLWhhbGYtZnVsbFwiLCBcInN0YXItaGFsZi1vXCIsIFwibG9jYXRpb24tYXJyb3dcIiwgXCJjcm9wXCIsIFwiY29kZS1mb3JrXCIsIFwidW5saW5rXCIsIFwiY2hhaW4tYnJva2VuXCIsIFwicXVlc3Rpb25cIiwgXCJpbmZvXCIsIFwiZXhjbGFtYXRpb25cIiwgXCJzdXBlcnNjcmlwdFwiLCBcInN1YnNjcmlwdFwiLCBcImVyYXNlclwiLCBcInB1enpsZS1waWVjZVwiLCBcIm1pY3JvcGhvbmVcIiwgXCJtaWNyb3Bob25lLXNsYXNoXCIsIFwic2hpZWxkXCIsIFwiY2FsZW5kYXItb1wiLCBcImZpcmUtZXh0aW5ndWlzaGVyXCIsIFwicm9ja2V0XCIsIFwibWF4Y2RuXCIsIFwiY2hldnJvbi1jaXJjbGUtbGVmdFwiLCBcImNoZXZyb24tY2lyY2xlLXJpZ2h0XCIsIFwiY2hldnJvbi1jaXJjbGUtdXBcIiwgXCJjaGV2cm9uLWNpcmNsZS1kb3duXCIsIFwiaHRtbDVcIiwgXCJjc3MzXCIsIFwiYW5jaG9yXCIsIFwidW5sb2NrLWFsdFwiLCBcImJ1bGxzZXllXCIsIFwiZWxsaXBzaXMtaFwiLCBcImVsbGlwc2lzLXZcIiwgXCJyc3Mtc3F1YXJlXCIsIFwicGxheS1jaXJjbGVcIiwgXCJ0aWNrZXRcIiwgXCJtaW51cy1zcXVhcmVcIiwgXCJtaW51cy1zcXVhcmUtb1wiLCBcImxldmVsLXVwXCIsIFwibGV2ZWwtZG93blwiLCBcImNoZWNrLXNxdWFyZVwiLCBcInBlbmNpbC1zcXVhcmVcIiwgXCJleHRlcm5hbC1saW5rLXNxdWFyZVwiLCBcInNoYXJlLXNxdWFyZVwiLCBcImNvbXBhc3NcIiwgXCJ0b2dnbGUtZG93blwiLCBcImNhcmV0LXNxdWFyZS1vLWRvd25cIiwgXCJ0b2dnbGUtdXBcIiwgXCJjYXJldC1zcXVhcmUtby11cFwiLCBcInRvZ2dsZS1yaWdodFwiLCBcImNhcmV0LXNxdWFyZS1vLXJpZ2h0XCIsIFwiZXVyb1wiLCBcImV1clwiLCBcImdicFwiLCBcImRvbGxhclwiLCBcInVzZFwiLCBcInJ1cGVlXCIsIFwiaW5yXCIsIFwiY255XCIsIFwicm1iXCIsIFwieWVuXCIsIFwianB5XCIsIFwicnVibGVcIiwgXCJyb3VibGVcIiwgXCJydWJcIiwgXCJ3b25cIiwgXCJrcndcIiwgXCJiaXRjb2luXCIsIFwiYnRjXCIsIFwiZmlsZVwiLCBcImZpbGUtdGV4dFwiLCBcInNvcnQtYWxwaGEtYXNjXCIsIFwic29ydC1hbHBoYS1kZXNjXCIsIFwic29ydC1hbW91bnQtYXNjXCIsIFwic29ydC1hbW91bnQtZGVzY1wiLCBcInNvcnQtbnVtZXJpYy1hc2NcIiwgXCJzb3J0LW51bWVyaWMtZGVzY1wiLCBcInRodW1icy11cFwiLCBcInRodW1icy1kb3duXCIsIFwieW91dHViZS1zcXVhcmVcIiwgXCJ5b3V0dWJlXCIsIFwieGluZ1wiLCBcInhpbmctc3F1YXJlXCIsIFwieW91dHViZS1wbGF5XCIsIFwiZHJvcGJveFwiLCBcInN0YWNrLW92ZXJmbG93XCIsIFwiaW5zdGFncmFtXCIsIFwiZmxpY2tyXCIsIFwiYWRuXCIsIFwiYml0YnVja2V0XCIsIFwiYml0YnVja2V0LXNxdWFyZVwiLCBcInR1bWJsclwiLCBcInR1bWJsci1zcXVhcmVcIiwgXCJsb25nLWFycm93LWRvd25cIiwgXCJsb25nLWFycm93LXVwXCIsIFwibG9uZy1hcnJvdy1sZWZ0XCIsIFwibG9uZy1hcnJvdy1yaWdodFwiLCBcImFwcGxlXCIsIFwid2luZG93c1wiLCBcImFuZHJvaWRcIiwgXCJsaW51eFwiLCBcImRyaWJiYmxlXCIsIFwic2t5cGVcIiwgXCJmb3Vyc3F1YXJlXCIsIFwidHJlbGxvXCIsIFwiZmVtYWxlXCIsIFwibWFsZVwiLCBcImdpdHRpcFwiLCBcImdyYXRpcGF5XCIsIFwic3VuLW9cIiwgXCJtb29uLW9cIiwgXCJhcmNoaXZlXCIsIFwiYnVnXCIsIFwidmtcIiwgXCJ3ZWlib1wiLCBcInJlbnJlblwiLCBcInBhZ2VsaW5lc1wiLCBcInN0YWNrLWV4Y2hhbmdlXCIsIFwiYXJyb3ctY2lyY2xlLW8tcmlnaHRcIiwgXCJhcnJvdy1jaXJjbGUtby1sZWZ0XCIsIFwidG9nZ2xlLWxlZnRcIiwgXCJjYXJldC1zcXVhcmUtby1sZWZ0XCIsIFwiZG90LWNpcmNsZS1vXCIsIFwid2hlZWxjaGFpclwiLCBcInZpbWVvLXNxdWFyZVwiLCBcInR1cmtpc2gtbGlyYVwiLCBcInRyeVwiLCBcInBsdXMtc3F1YXJlLW9cIiwgXCJzcGFjZS1zaHV0dGxlXCIsIFwic2xhY2tcIiwgXCJlbnZlbG9wZS1zcXVhcmVcIiwgXCJ3b3JkcHJlc3NcIiwgXCJvcGVuaWRcIiwgXCJpbnN0aXR1dGlvblwiLCBcImJhbmtcIiwgXCJ1bml2ZXJzaXR5XCIsIFwibW9ydGFyLWJvYXJkXCIsIFwiZ3JhZHVhdGlvbi1jYXBcIiwgXCJ5YWhvb1wiLCBcImdvb2dsZVwiLCBcInJlZGRpdFwiLCBcInJlZGRpdC1zcXVhcmVcIiwgXCJzdHVtYmxldXBvbi1jaXJjbGVcIiwgXCJzdHVtYmxldXBvblwiLCBcImRlbGljaW91c1wiLCBcImRpZ2dcIiwgXCJwaWVkLXBpcGVyXCIsIFwicGllZC1waXBlci1hbHRcIiwgXCJkcnVwYWxcIiwgXCJqb29tbGFcIiwgXCJsYW5ndWFnZVwiLCBcImZheFwiLCBcImJ1aWxkaW5nXCIsIFwiY2hpbGRcIiwgXCJwYXdcIiwgXCJzcG9vblwiLCBcImN1YmVcIiwgXCJjdWJlc1wiLCBcImJlaGFuY2VcIiwgXCJiZWhhbmNlLXNxdWFyZVwiLCBcInN0ZWFtXCIsIFwic3RlYW0tc3F1YXJlXCIsIFwicmVjeWNsZVwiLCBcImF1dG9tb2JpbGVcIiwgXCJjYXJcIiwgXCJjYWJcIiwgXCJ0YXhpXCIsIFwidHJlZVwiLCBcInNwb3RpZnlcIiwgXCJkZXZpYW50YXJ0XCIsIFwic291bmRjbG91ZFwiLCBcImRhdGFiYXNlXCIsIFwiZmlsZS1wZGYtb1wiLCBcImZpbGUtd29yZC1vXCIsIFwiZmlsZS1leGNlbC1vXCIsIFwiZmlsZS1wb3dlcnBvaW50LW9cIiwgXCJmaWxlLXBob3RvLW9cIiwgXCJmaWxlLXBpY3R1cmUtb1wiLCBcImZpbGUtaW1hZ2Utb1wiLCBcImZpbGUtemlwLW9cIiwgXCJmaWxlLWFyY2hpdmUtb1wiLCBcImZpbGUtc291bmQtb1wiLCBcImZpbGUtYXVkaW8tb1wiLCBcImZpbGUtbW92aWUtb1wiLCBcImZpbGUtdmlkZW8tb1wiLCBcImZpbGUtY29kZS1vXCIsIFwidmluZVwiLCBcImNvZGVwZW5cIiwgXCJqc2ZpZGRsZVwiLCBcImxpZmUtYm91eVwiLCBcImxpZmUtYnVveVwiLCBcImxpZmUtc2F2ZXJcIiwgXCJzdXBwb3J0XCIsIFwibGlmZS1yaW5nXCIsIFwiY2lyY2xlLW8tbm90Y2hcIiwgXCJyYVwiLCBcInJlYmVsXCIsIFwiZ2VcIiwgXCJlbXBpcmVcIiwgXCJnaXQtc3F1YXJlXCIsIFwiZ2l0XCIsIFwieS1jb21iaW5hdG9yLXNxdWFyZVwiLCBcInljLXNxdWFyZVwiLCBcImhhY2tlci1uZXdzXCIsIFwidGVuY2VudC13ZWlib1wiLCBcInFxXCIsIFwid2VjaGF0XCIsIFwid2VpeGluXCIsIFwic2VuZFwiLCBcInBhcGVyLXBsYW5lXCIsIFwic2VuZC1vXCIsIFwicGFwZXItcGxhbmUtb1wiLCBcImhpc3RvcnlcIiwgXCJjaXJjbGUtdGhpblwiLCBcImhlYWRlclwiLCBcInBhcmFncmFwaFwiLCBcInNsaWRlcnNcIiwgXCJzaGFyZS1hbHRcIiwgXCJzaGFyZS1hbHQtc3F1YXJlXCIsIFwiYm9tYlwiLCBcInNvY2Nlci1iYWxsLW9cIiwgXCJmdXRib2wtb1wiLCBcInR0eVwiLCBcImJpbm9jdWxhcnNcIiwgXCJwbHVnXCIsIFwic2xpZGVzaGFyZVwiLCBcInR3aXRjaFwiLCBcInllbHBcIiwgXCJuZXdzcGFwZXItb1wiLCBcIndpZmlcIiwgXCJjYWxjdWxhdG9yXCIsIFwicGF5cGFsXCIsIFwiZ29vZ2xlLXdhbGxldFwiLCBcImNjLXZpc2FcIiwgXCJjYy1tYXN0ZXJjYXJkXCIsIFwiY2MtZGlzY292ZXJcIiwgXCJjYy1hbWV4XCIsIFwiY2MtcGF5cGFsXCIsIFwiY2Mtc3RyaXBlXCIsIFwiYmVsbC1zbGFzaFwiLCBcImJlbGwtc2xhc2gtb1wiLCBcInRyYXNoXCIsIFwiY29weXJpZ2h0XCIsIFwiYXRcIiwgXCJleWVkcm9wcGVyXCIsIFwicGFpbnQtYnJ1c2hcIiwgXCJiaXJ0aGRheS1jYWtlXCIsIFwiYXJlYS1jaGFydFwiLCBcInBpZS1jaGFydFwiLCBcImxpbmUtY2hhcnRcIiwgXCJsYXN0Zm1cIiwgXCJsYXN0Zm0tc3F1YXJlXCIsIFwidG9nZ2xlLW9mZlwiLCBcInRvZ2dsZS1vblwiLCBcImJpY3ljbGVcIiwgXCJidXNcIiwgXCJpb3hob3N0XCIsIFwiYW5nZWxsaXN0XCIsIFwiY2NcIiwgXCJzaGVrZWxcIiwgXCJzaGVxZWxcIiwgXCJpbHNcIiwgXCJtZWFucGF0aFwiLCBcImJ1eXNlbGxhZHNcIiwgXCJjb25uZWN0ZGV2ZWxvcFwiLCBcImRhc2hjdWJlXCIsIFwiZm9ydW1iZWVcIiwgXCJsZWFucHViXCIsIFwic2VsbHN5XCIsIFwic2hpcnRzaW5idWxrXCIsIFwic2ltcGx5YnVpbHRcIiwgXCJza3lhdGxhc1wiLCBcImNhcnQtcGx1c1wiLCBcImNhcnQtYXJyb3ctZG93blwiLCBcImRpYW1vbmRcIiwgXCJzaGlwXCIsIFwidXNlci1zZWNyZXRcIiwgXCJtb3RvcmN5Y2xlXCIsIFwic3RyZWV0LXZpZXdcIiwgXCJoZWFydGJlYXRcIiwgXCJ2ZW51c1wiLCBcIm1hcnNcIiwgXCJtZXJjdXJ5XCIsIFwiaW50ZXJzZXhcIiwgXCJ0cmFuc2dlbmRlclwiLCBcInRyYW5zZ2VuZGVyLWFsdFwiLCBcInZlbnVzLWRvdWJsZVwiLCBcIm1hcnMtZG91YmxlXCIsIFwidmVudXMtbWFyc1wiLCBcIm1hcnMtc3Ryb2tlXCIsIFwibWFycy1zdHJva2UtdlwiLCBcIm1hcnMtc3Ryb2tlLWhcIiwgXCJuZXV0ZXJcIiwgXCJnZW5kZXJsZXNzXCIsIFwiZmFjZWJvb2stb2ZmaWNpYWxcIiwgXCJwaW50ZXJlc3QtcFwiLCBcIndoYXRzYXBwXCIsIFwic2VydmVyXCIsIFwidXNlci1wbHVzXCIsIFwidXNlci10aW1lc1wiLCBcImhvdGVsXCIsIFwiYmVkXCIsIFwidmlhY29pblwiLCBcInRyYWluXCIsIFwic3Vid2F5XCIsIFwibWVkaXVtXCIsIFwieWNcIiwgXCJ5LWNvbWJpbmF0b3JcIiwgXCJvcHRpbi1tb25zdGVyXCIsIFwib3BlbmNhcnRcIiwgXCJleHBlZGl0ZWRzc2xcIiwgXCJiYXR0ZXJ5LTRcIiwgXCJiYXR0ZXJ5LWZ1bGxcIiwgXCJiYXR0ZXJ5LTNcIiwgXCJiYXR0ZXJ5LXRocmVlLXF1YXJ0ZXJzXCIsIFwiYmF0dGVyeS0yXCIsIFwiYmF0dGVyeS1oYWxmXCIsIFwiYmF0dGVyeS0xXCIsIFwiYmF0dGVyeS1xdWFydGVyXCIsIFwiYmF0dGVyeS0wXCIsIFwiYmF0dGVyeS1lbXB0eVwiLCBcIm1vdXNlLXBvaW50ZXJcIiwgXCJpLWN1cnNvclwiLCBcIm9iamVjdC1ncm91cFwiLCBcIm9iamVjdC11bmdyb3VwXCIsIFwic3RpY2t5LW5vdGVcIiwgXCJzdGlja3ktbm90ZS1vXCIsIFwiY2MtamNiXCIsIFwiY2MtZGluZXJzLWNsdWJcIiwgXCJjbG9uZVwiLCBcImJhbGFuY2Utc2NhbGVcIiwgXCJob3VyZ2xhc3Mtb1wiLCBcImhvdXJnbGFzcy0xXCIsIFwiaG91cmdsYXNzLXN0YXJ0XCIsIFwiaG91cmdsYXNzLTJcIiwgXCJob3VyZ2xhc3MtaGFsZlwiLCBcImhvdXJnbGFzcy0zXCIsIFwiaG91cmdsYXNzLWVuZFwiLCBcImhvdXJnbGFzc1wiLCBcImhhbmQtZ3JhYi1vXCIsIFwiaGFuZC1yb2NrLW9cIiwgXCJoYW5kLXN0b3Atb1wiLCBcImhhbmQtcGFwZXItb1wiLCBcImhhbmQtc2Npc3NvcnMtb1wiLCBcImhhbmQtbGl6YXJkLW9cIiwgXCJoYW5kLXNwb2NrLW9cIiwgXCJoYW5kLXBvaW50ZXItb1wiLCBcImhhbmQtcGVhY2Utb1wiLCBcInRyYWRlbWFya1wiLCBcInJlZ2lzdGVyZWRcIiwgXCJjcmVhdGl2ZS1jb21tb25zXCIsIFwiZ2dcIiwgXCJnZy1jaXJjbGVcIiwgXCJ0cmlwYWR2aXNvclwiLCBcIm9kbm9rbGFzc25pa2lcIiwgXCJvZG5va2xhc3NuaWtpLXNxdWFyZVwiLCBcImdldC1wb2NrZXRcIiwgXCJ3aWtpcGVkaWEtd1wiLCBcInNhZmFyaVwiLCBcImNocm9tZVwiLCBcImZpcmVmb3hcIiwgXCJvcGVyYVwiLCBcImludGVybmV0LWV4cGxvcmVyXCIsIFwidHZcIiwgXCJ0ZWxldmlzaW9uXCIsIFwiY29udGFvXCIsIFwiNTAwcHhcIiwgXCJhbWF6b25cIiwgXCJjYWxlbmRhci1wbHVzLW9cIiwgXCJjYWxlbmRhci1taW51cy1vXCIsIFwiY2FsZW5kYXItdGltZXMtb1wiLCBcImNhbGVuZGFyLWNoZWNrLW9cIiwgXCJpbmR1c3RyeVwiLCBcIm1hcC1waW5cIiwgXCJtYXAtc2lnbnNcIiwgXCJtYXAtb1wiLCBcIm1hcFwiLCBcImNvbW1lbnRpbmdcIiwgXCJjb21tZW50aW5nLW9cIiwgXCJob3V6elwiLCBcInZpbWVvXCIsIFwiYmxhY2stdGllXCIsIFwiZm9udGljb25zXCIsIFwicmVkZGl0LWFsaWVuXCIsIFwiZWRnZVwiLCBcImNyZWRpdC1jYXJkLWFsdFwiLCBcImNvZGllcGllXCIsIFwibW9keFwiLCBcImZvcnQtYXdlc29tZVwiLCBcInVzYlwiLCBcInByb2R1Y3QtaHVudFwiLCBcIm1peGNsb3VkXCIsIFwic2NyaWJkXCIsIFwicGF1c2UtY2lyY2xlXCIsIFwicGF1c2UtY2lyY2xlLW9cIiwgXCJzdG9wLWNpcmNsZVwiLCBcInN0b3AtY2lyY2xlLW9cIiwgXCJzaG9wcGluZy1iYWdcIiwgXCJzaG9wcGluZy1iYXNrZXRcIiwgXCJoYXNodGFnXCIsIFwiYmx1ZXRvb3RoXCIsIFwiYmx1ZXRvb3RoLWJcIiwgXCJwZXJjZW50XCIsfSc7XG4gICAgICAgIC8vICRpbnB1dDIgPSBgPHNlbGVjdCBjbGFzcz0nZ3JvdXBJY29uJyBkYXRhLWhpbnQ9J0lDT04nIGRhdGEtbmFtZT0nZ3JvdXBJY29uJz5cbiAgICAgICAgICAgICAgICAvLyA8b3B0aW9uPjwvb3B0aW9uPlxuICAgICAgICAgICAgLy8gPC9zZWxlY3RgO1xuXG4gICAgICAgIHRoaXMucmVuZGVySW5wdXRzKCRpbnB1dDIsICcnLCAnc2VsZWN0JywgJ2dyb3VwSWNvbicsICdJQ09OJywgJ2ljb25OYW1lJyk7XG4gICAgICAgIHRoaXMucmVuZGVySW5wdXRzKCRpbnB1dCwgJycsICd0ZXh0JywgJ2dyb3VwTmFtZScsICdOQU1FJywgJ2dyb3VwTmFtZScpO1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgdGhpcy4kc2F2ZUJ0biA9IGJvZHkuZmluZCgnLnN1Ym1pdCcpO1xuICAgICAgICB0aGlzLiRjYW5jZWxCdG4gPSBib2R5LmZpbmQoJy5jYW5jZWwnKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRjYW5jZWxCdG4sICdjbGljaycsICdoaWRlJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kZm9ybSwgJ3N1Ym1pdCcsICdzYXZlJyk7XG4gICAgfSxcblxuICAgIHJlbmRlcklucHV0cyhlbCwgdmFsdWUsIHR5cGUsIG5hbWUsIGhpbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBsZXQgJGlucHV0O1xuICAgICAgICAkaW5wdXQgPSAkKGA8ZGl2IGNsYXNzPVwiZmItZmllbGRcIj48ZGl2IGNsYXNzPVwiaW5wdXQtaGludFwiPiR7aGludH08L2Rpdj4ke2VsfTwvZGl2PmApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kZm9ybS5maW5kKCcuYm9keScpLnByZXBlbmQoJGlucHV0KTtcblxuICAgICAgICAvLyBUT0RPOiBhbGxvdyB1c2VycyB0byBkeW5hbWljYWxseSBzZWFyY2ggZm9udGF3ZXNvbWUgaWNvbiByZXBvc2l0b3J5XG4gICAgICAgIC8vIGlmICh0eXBlID09ICdzZWxlY3QnKSB7XG4gICAgICAgIC8vICAgICAkaW5wdXQuc2VsZWN0Mih7XG4gICAgICAgIC8vICAgICAgICAgYWpheDoge1xuICAgICAgICAvLyAgICAgICAgICAgICB1cmw6IENyYWZ0LmdldEFjdGlvblVybCgpICsgJy9mb3JtLWJ1aWxkZXIvaWNvbnMvZ2V0LWFsbC1pY29ucycsXG4gICAgICAgIC8vICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIC8vICAgICAgICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IGRhdGEuaWNvbnNcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH07XG4gICAgICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICBwbGFjZWhvbGRlcjogJ1NlbGVjdCBJY29uJyxcbiAgICAgICAgLy8gICAgICAgICBlc2NhcGVNYXJrdXA6IGZ1bmN0aW9uIChtYXJrdXApIHsgcmV0dXJuIG1hcmt1cDsgfSxcbiAgICAgICAgLy8gICAgICAgICB0ZW1wbGF0ZVJlc3VsdDogZnVuY3Rpb24oaWNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbWFya3VwID0gYDxkaXYgY2xhc3M9J3NlbGVjdDItcmVzdWx0LWljb24gY2xlYXJmaXgnPjxkaXYgY2xhc3M9J3NlbGVjdDItcmVzdWx0LWltYWdlJz48aW1nIHNyYz0nJHtpY29uLmljb259JyAvPjwvZGl2PjxkaXYgY2xhc3M9J3NlbGVjdDItcmVzdWx0LWljb24tZGV0YWlscyc+PGRpdiBjbGFzcz0nc2VsZWN0Mi1yZXN1bHQtbmFtZSc+JHtpY29uLm5hbWV9PC9kaXY+YDtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIG1hcmt1cDtcbiAgICAgICAgLy8gICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgIHRlbXBsYXRlU2VsZWN0aW9uOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgc2F2ZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBncm91cEljb247XG4gICAgICAgIGxldCBncm91cE5hbWU7XG4gICAgICAgIGxldCBpbnB1dExlbmd0aDtcbiAgICAgICAgbGV0IHNlbGY7XG5cbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIGdyb3VwTmFtZSA9IHRoaXMuJGZvcm0uZmluZCgnLmdyb3VwTmFtZScpLnZhbCgpO1xuICAgICAgICBncm91cEljb24gPSB0aGlzLiRmb3JtLmZpbmQoJy5ncm91cEljb24nKS52YWwoKTtcbiAgICAgICAgaW5wdXRMZW5ndGggPSB0aGlzLiRmb3JtLmZpbmQoJy5ncm91cE5hbWUnKS52YWwoKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbnB1dExlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuZ3JvdXAuaWQgPyB0aGlzLmdyb3VwLmlkIDogbnVsbCxcbiAgICAgICAgICAgICAgICBuYW1lOiBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZ3JvdXBJY29uXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBDcmFmdC5wb3N0QWN0aW9uUmVxdWVzdCgnZm9ybS1idWlsZGVyL2dyb3Vwcy9zYXZlJywgZGF0YSwgJC5wcm94eSgoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gQ3JhZnQuZ2V0VXJsKCdmb3JtLWJ1aWxkZXIvZm9ybXMnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IHRoaXMuZmxhdHRlbkVycm9ycyhyZXNwb25zZS5lcnJvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYCR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NvdWxkIG5vdCBjcmVhdGUgdGhlIGdyb3VwOicpfVxcblxcbiR7ZXJyb3JzLmpvaW4oJ1xcbicpfWApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQ3JhZnQuY3AuZGlzcGxheUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcykpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZsYXR0ZW5FcnJvcnMocmVzcG9uc2VFcnJvcnMpIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZTtcbiAgICAgICAgbGV0IGVycm9ycztcbiAgICAgICAgZXJyb3JzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGF0dHJpYnV0ZSBpbiByZXNwb25zZUVycm9ycykge1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChyZXNwb25zZUVycm9yc1thdHRyaWJ1dGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxufSk7XG4gIFxuR2FybmlzaC4kZG9jLnJlYWR5KCgpID0+IHtcbiAgICBsZXQgRm9ybUdyb3VwcztcbiAgICBGb3JtR3JvdXBzID0gbmV3IEdyb3VwcztcbiAgICAkLmVhY2goJCgnLmdyb3VwLWl0ZW0nKSwgKGksIGl0ZW0pID0+IG5ldyBHcm91cEl0ZW0oaXRlbSkpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvZ3JvdXBzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==