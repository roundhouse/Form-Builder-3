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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),

/***/ 9:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0YnVuZGxlcy9ncm91cHMvc3JjL2pzL2dyb3Vwcy5qcyJdLCJuYW1lcyI6WyJHcm91cEl0ZW0iLCJHcm91cE1vZGFsIiwiR3JvdXBzIiwiR2FybmlzaCIsIkJhc2UiLCJleHRlbmQiLCIkZ3JvdXBzIiwiJHNlbGVjdGVkR3JvdXAiLCIkbmV3R3JvdXBCdG4iLCJtb2RhbCIsImluaXQiLCIkZ3JvdXBTZXR0aW5nc0J0biIsIm1lbnVCdG4iLCIkIiwiZmluZCIsImFkZExpc3RlbmVyIiwibGVuZ3RoIiwiZGF0YSIsInNldHRpbmdzIiwib25PcHRpb25TZWxlY3QiLCJwcm94eSIsImVsZW0iLCJhY3Rpb24iLCJyZW5hbWVTZWxlY3RlZEdyb3VwIiwiZGVsZXRlU2VsZWN0ZWRHcm91cCIsImFkZE5ld0dyb3VwIiwic2hvdyIsIm5ld05hbWUiLCJvbGROYW1lIiwidGV4dCIsInByb21wdEZvckdyb3VwTmFtZSIsImlkIiwibmFtZSIsIkNyYWZ0IiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJlcnJvcnMiLCJzdWNjZXNzIiwiZ3JvdXAiLCJjcCIsImRpc3BsYXlOb3RpY2UiLCJ0IiwiZmxhdHRlbkVycm9ycyIsImFsZXJ0Iiwiam9pbiIsImRpc3BsYXlFcnJvciIsInByb21wdCIsImNvbmZpcm0iLCJsb2NhdGlvbiIsImhyZWYiLCJnZXRVcmwiLCJyZXNwb25zZUVycm9ycyIsImF0dHJpYnV0ZSIsImNvbmNhdCIsIk1vZGFsIiwiJGdyb3VwTGlzdEl0ZW0iLCIkZ3JvdXAiLCIkZWRpdEdyb3VwQnRuIiwibGFiZWwiLCJpY29uTmFtZSIsImVsIiwiZWRpdCIsIiRmb3JtIiwiJG1vZGFsSW5wdXRzIiwiJGlucHV0IiwiJGlucHV0MiIsIiRpY29ucyIsImJvZHkiLCJ0aXRsZSIsInNlbGYiLCJiYXNlIiwiYXBwZW5kVG8iLCIkYm9kIiwic2V0Q29udGFpbmVyIiwicmVuZGVySW5wdXRzIiwiJHNhdmVCdG4iLCIkY2FuY2VsQnRuIiwidmFsdWUiLCJ0eXBlIiwiaGludCIsImNsYXNzTmFtZSIsInByZXBlbmQiLCJzYXZlIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ3JvdXBJY29uIiwiZ3JvdXBOYW1lIiwiaW5wdXRMZW5ndGgiLCJ2YWwiLCJpY29uIiwiY29uc29sZSIsImxvZyIsIiRkb2MiLCJyZWFkeSIsIkZvcm1Hcm91cHMiLCJlYWNoIiwiaSIsIml0ZW0iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQSxJQUFJQSxrQkFBSjtBQUNBLElBQUlDLG1CQUFKO0FBQ0EsSUFBSUMsZUFBSjs7QUFFQUEsU0FBU0MsUUFBUUMsSUFBUixDQUFhQyxNQUFiLENBQW9CO0FBQ3pCQyxhQUFTLElBRGdCO0FBRXpCQyxvQkFBZ0IsSUFGUztBQUd6QkMsa0JBQWMsSUFIVztBQUl6QkMsV0FBTyxJQUprQjs7QUFNekJDLFFBTnlCLGtCQU1sQjtBQUNILFlBQUlDLDBCQUFKO0FBQ0EsWUFBSUMsZ0JBQUo7O0FBRUEsYUFBS04sT0FBTCxHQUFlTyxFQUFFLFNBQUYsQ0FBZjtBQUNBLGFBQUtOLGNBQUwsR0FBc0IsS0FBS0QsT0FBTCxDQUFhUSxJQUFi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TixDQUFTTSxZQUFUO0FBQ0g7QUFDSjtBQUNKLGFBYnlELEVBYXRELElBYnNELENBQTFEO0FBY0g7QUFDSixLQTVHNkI7QUE4RzlCSCxpQkE5RzhCLHlCQThHaEJTLGNBOUdnQixFQThHQTtBQUMxQixZQUFJQyxrQkFBSjtBQUNBLFlBQUloQixlQUFKO0FBQ0FBLGlCQUFTLEVBQVQ7O0FBRUEsYUFBS2dCLFNBQUwsSUFBa0JELGNBQWxCLEVBQWtDO0FBQzlCZixxQkFBU0EsT0FBT2lCLE1BQVAsQ0FBY0YsZUFBZUMsU0FBZixDQUFkLENBQVQ7QUFDSDs7QUFFRCxlQUFPaEIsTUFBUDtBQUNIO0FBeEg2QixDQUFyQixDQUFiOztBQTJIQWxDLFFBQVEwRixJQUFSLENBQWFDLEtBQWIsQ0FBbUIsWUFBTTtBQUNyQixRQUFJQyxtQkFBSjtBQUNBQSxpQkFBYSxJQUFJN0YsTUFBSixFQUFiO0FBQ0FXLE1BQUVtRixJQUFGLENBQU9uRixFQUFFLGFBQUYsQ0FBUCxFQUF5QixVQUFDb0YsQ0FBRCxFQUFJQyxJQUFKO0FBQUEsZUFBYSxJQUFJbEcsU0FBSixDQUFja0csSUFBZCxDQUFiO0FBQUEsS0FBekI7QUFDSCxDQUpELEUiLCJmaWxlIjoiL3NyYy9hc3NldGJ1bmRsZXMvZ3JvdXBzL2Rpc3QvanMvZ3JvdXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzEzNjUyZWUyZmU0ZWU2NzE0ZGMiLCJsZXQgR3JvdXBJdGVtO1xubGV0IEdyb3VwTW9kYWw7XG5sZXQgR3JvdXBzO1xuXG5Hcm91cHMgPSBHYXJuaXNoLkJhc2UuZXh0ZW5kKHtcbiAgICAkZ3JvdXBzOiBudWxsLFxuICAgICRzZWxlY3RlZEdyb3VwOiBudWxsLFxuICAgICRuZXdHcm91cEJ0bjogbnVsbCxcbiAgICBtb2RhbDogbnVsbCxcblxuICAgIGluaXQoKSB7XG4gICAgICAgIGxldCAkZ3JvdXBTZXR0aW5nc0J0bjtcbiAgICAgICAgbGV0IG1lbnVCdG47XG5cbiAgICAgICAgdGhpcy4kZ3JvdXBzID0gJCgnI2dyb3VwcycpO1xuICAgICAgICB0aGlzLiRzZWxlY3RlZEdyb3VwID0gdGhpcy4kZ3JvdXBzLmZpbmQoJ2Euc2VsOmZpcnN0Jyk7XG4gICAgICAgIHRoaXMuJG5ld0dyb3VwQnRuID0gJCgnI25ld2dyb3VwYnRuJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kbmV3R3JvdXBCdG4sICdjbGljaycsICdhZGROZXdHcm91cCcpO1xuXG4gICAgICAgICRncm91cFNldHRpbmdzQnRuID0gJCgnI2dyb3Vwc2V0dGluZ3NidG4nKTtcblxuICAgICAgICBpZiAoJGdyb3VwU2V0dGluZ3NCdG4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBtZW51QnRuID0gJGdyb3VwU2V0dGluZ3NCdG4uZGF0YSgnbWVudWJ0bicpO1xuICAgICAgICAgICAgbWVudUJ0bi5zZXR0aW5ncy5vbk9wdGlvblNlbGVjdCA9ICQucHJveHkoKGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uO1xuICAgICAgICAgICAgICAgIGFjdGlvbiA9ICQoZWxlbSkuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW5hbWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5hbWVTZWxlY3RlZEdyb3VwKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNlbGVjdGVkR3JvdXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkTmV3R3JvdXAoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBHcm91cE1vZGFsKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuYW1lU2VsZWN0ZWRHcm91cCgpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBuZXdOYW1lO1xuICAgICAgICBsZXQgb2xkTmFtZTtcblxuICAgICAgICBvbGROYW1lID0gdGhpcy4kc2VsZWN0ZWRHcm91cC50ZXh0KCk7XG4gICAgICAgIG5ld05hbWUgPSB0aGlzLnByb21wdEZvckdyb3VwTmFtZShvbGROYW1lKTtcbiAgICAgIFxuICAgICAgICBpZiAobmV3TmFtZSAmJiBuZXdOYW1lICE9PSBvbGROYW1lKSB7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLiRzZWxlY3RlZEdyb3VwLmRhdGEoJ2lkJyksXG4gICAgICAgICAgICAgICAgbmFtZTogbmV3TmFtZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9ncm91cHMvc2F2ZScsIGRhdGEsICQucHJveHkoKGZ1bmN0aW9uKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9ycztcblxuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3RhdHVzID09PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHNlbGVjdGVkR3JvdXAudGV4dChyZXNwb25zZS5ncm91cC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlOb3RpY2UoQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0dyb3VwIHJlbmFtZWQuJykpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5mbGF0dGVuRXJyb3JzKHJlc3BvbnNlLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgJHtDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ291bGQgbm90IHJlbmFtZSB0aGUgZ3JvdXA6Jyl9XFxuXFxuJHtlcnJvcnMuam9pbignXFxuJyl9YCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvbXB0Rm9yR3JvdXBOYW1lKG9sZE5hbWUpIHtcbiAgICAgICAgcHJvbXB0KENyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdXaGF0IGRvIHlvdSB3YW50IHRvIG5hbWUgeW91ciBncm91cD8nKSwgb2xkTmFtZSk7XG4gICAgfSxcblxuICAgIGRlbGV0ZVNlbGVjdGVkR3JvdXAoKSB7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICB0aGlzLiRzZWxlY3RlZEdyb3VwID0gJCgnI2dyb3VwcyBhLnNlbCcpO1xuICAgICAgXG4gICAgICAgIGlmICh0aGlzLiRzZWxlY3RlZEdyb3VwLmRhdGEoJ2lkJykgPT09IDEpIHtcbiAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcihDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnQ2Fubm90IGRlbGV0ZSBEZWZhdWx0IGdyb3VwJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbmZpcm0oQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBncm91cCBhbmQgYWxsIGl0cyBmb3Jtcz8nKSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy4kc2VsZWN0ZWRHcm91cC5kYXRhKCdpZCcpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvZ3JvdXBzL2RlbGV0ZScsIGRhdGEsICQucHJveHkoKChyZXNwb25zZSwgdGV4dFN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dFN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBDcmFmdC5nZXRVcmwoJ2Zvcm0tYnVpbGRlci9mb3JtcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcmFmdC5jcC5kaXNwbGF5RXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCB0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmxhdHRlbkVycm9ycyhyZXNwb25zZUVycm9ycykge1xuICAgICAgICBsZXQgYXR0cmlidXRlO1xuICAgICAgICBsZXQgZXJyb3JzO1xuICAgICAgICBlcnJvcnMgPSBbXTtcblxuICAgICAgICBmb3IgKGF0dHJpYnV0ZSBpbiByZXNwb25zZUVycm9ycykge1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzLmNvbmNhdChyZXNwb25zZUVycm9yc1thdHRyaWJ1dGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxufSk7XG5cbkdyb3VwSXRlbSA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICAkZ3JvdXBMaXN0SXRlbTogbnVsbCxcbiAgICAkZ3JvdXA6IG51bGwsXG4gICAgJGVkaXRHcm91cEJ0bjogbnVsbCxcbiAgICBpZDogbnVsbCxcbiAgICBsYWJlbDogbnVsbCxcbiAgICBpY29uTmFtZTogbnVsbCxcbiAgICBtb2RhbDogbnVsbCxcblxuICAgIGluaXQoZWwpIHtcbiAgICAgICAgdGhpcy4kZ3JvdXBMaXN0SXRlbSA9ICQoZWwpO1xuICAgICAgICB0aGlzLiRncm91cCA9IHRoaXMuJGdyb3VwTGlzdEl0ZW0uZmluZCgnYScpO1xuICAgICAgICB0aGlzLiRlZGl0R3JvdXBCdG4gPSB0aGlzLiRncm91cC5maW5kKCcuZWRpdC1ncm91cCcpO1xuICAgICAgICB0aGlzLmlkID0gdGhpcy4kZ3JvdXAuZGF0YSgnaWQnKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuJGdyb3VwLmRhdGEoJ2xhYmVsJyk7XG4gICAgICAgIHRoaXMuaWNvbk5hbWUgPSB0aGlzLiRncm91cC5kYXRhKCdpY29uLW5hbWUnKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRlZGl0R3JvdXBCdG4sICdjbGljaycsICdlZGl0Jyk7XG4gICAgfSxcblxuICAgIGVkaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBHcm91cE1vZGFsKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuR3JvdXBNb2RhbCA9IEdhcm5pc2guTW9kYWwuZXh0ZW5kKHtcbiAgICBncm91cDogbnVsbCxcbiAgICAkZm9ybTogbnVsbCxcbiAgICAkbW9kYWxJbnB1dHM6IG51bGwsXG4gICAgaW5pdChncm91cCkge1xuICAgICAgICBsZXQgJGlucHV0O1xuICAgICAgICBsZXQgJGlucHV0MjtcbiAgICAgICAgbGV0ICRpY29ucztcbiAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgIGxldCBpY29uTmFtZTtcbiAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICBsZXQgdGl0bGU7XG4gICAgICAgIGxldCBzZWxmO1xuXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIHRoaXMuYmFzZSgpO1xuICAgICAgICB0aGlzLiRmb3JtID0gJCgnPGZvcm0gY2xhc3M9XCJtb2RhbCBmaXR0ZWQgZm9ybWJ1aWxkZXItbW9kYWxcIj4nKS5hcHBlbmRUbyhHYXJuaXNoLiRib2QpO1xuICAgICAgICB0aGlzLnNldENvbnRhaW5lcih0aGlzLiRmb3JtKTtcblxuICAgICAgICB0aXRsZSA9IHRoaXMuZ3JvdXAuaWQgPyBDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnRWRpdCBHcm91cCcpIDogQ3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ05ldyBHcm91cCcpO1xuICAgICAgICBib2R5ID0gJChbJzxoZWFkZXI+JywgYDxzcGFuIGNsYXNzPVwibW9kYWwtdGl0bGVcIj4ke3RpdGxlfTwvc3Bhbj5gLCAnPC9oZWFkZXI+JywgJzxkaXYgY2xhc3M9XCJib2R5XCI+PGRpdiBjbGFzcz1cImZvb3Rlci1ub3Rlc1wiPkdldCBpY29uIG5hbWVzIGF0IDxhIGhyZWY9XCJodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9pY29uc1wiIHRhcmdldD1cIl9ibGFua1wiPkZvbnRBd2Vzb21lPC9hPjwvZGl2PjwvZGl2PicsICc8Zm9vdGVyIGNsYXNzPVwiZm9vdGVyXCI+JywgJzxkaXYgY2xhc3M9XCJidXR0b25zXCI+JywgYDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5zIGJ0bi1tb2RhbCBjYW5jZWxcIiB2YWx1ZT1cIiR7Q3JhZnQudCgnZm9ybS1idWlsZGVyJywgJ0NhbmNlbCcpfVwiPmAsIGA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRucyBidG4tbW9kYWwgc3VibWl0XCIgdmFsdWU9XCIke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdTYXZlJyl9XCI+YCwgJzwvZGl2PicsICc8L2Zvb3Rlcj4nXS5qb2luKCcnKSkuYXBwZW5kVG8odGhpcy4kZm9ybSk7XG4gICAgICAgIGxhYmVsID0gdGhpcy5ncm91cC5sYWJlbCA/IHRoaXMuZ3JvdXAubGFiZWwgOiAnJztcbiAgICAgICAgaWNvbk5hbWUgPSB0aGlzLmdyb3VwLmljb25OYW1lID8gdGhpcy5ncm91cC5pY29uTmFtZSA6ICcnO1xuICAgICAgICAkaW5wdXQgPSBgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPSdncm91cE5hbWUnIHZhbHVlPScke2xhYmVsfScgZGF0YS1oaW50PSdOQU1FJyBkYXRhLW5hbWU9J2dyb3VwTmFtZScgLz5gO1xuICAgICAgICAkaW5wdXQyID0gYDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZ3JvdXBJY29uJyB2YWx1ZT0nJHtpY29uTmFtZX0nIGRhdGEtaGludD0nSUNPTicgZGF0YS1uYW1lPSdncm91cEljb24nIC8+YDtcbiAgICAgICAgLy8gJGljb25zID0gJ3tcImdsYXNzXCIsIFwibXVzaWNcIiwgXCJzZWFyY2hcIiwgXCJlbnZlbG9wZS1vXCIsIFwiaGVhcnRcIiwgXCJzdGFyXCIsIFwic3Rhci1vXCIsIFwidXNlclwiLCBcImZpbG1cIiwgXCJ0aC1sYXJnZVwiLCBcInRoXCIsIFwidGgtbGlzdFwiLCBcImNoZWNrXCIsIFwicmVtb3ZlXCIsIFwiY2xvc2VcIiwgXCJ0aW1lc1wiLCBcInNlYXJjaC1wbHVzXCIsIFwic2VhcmNoLW1pbnVzXCIsIFwicG93ZXItb2ZmXCIsIFwic2lnbmFsXCIsIFwiZ2VhclwiLCBcImNvZ1wiLCBcInRyYXNoLW9cIiwgXCJob21lXCIsIFwiZmlsZS1vXCIsIFwiY2xvY2stb1wiLCBcInJvYWRcIiwgXCJkb3dubG9hZFwiLCBcImFycm93LWNpcmNsZS1vLWRvd25cIiwgXCJhcnJvdy1jaXJjbGUtby11cFwiLCBcImluYm94XCIsIFwicGxheS1jaXJjbGUtb1wiLCBcInJvdGF0ZS1yaWdodFwiLCBcInJlcGVhdFwiLCBcInJlZnJlc2hcIiwgXCJsaXN0LWFsdFwiLCBcImxvY2tcIiwgXCJmbGFnXCIsIFwiaGVhZHBob25lc1wiLCBcInZvbHVtZS1vZmZcIiwgXCJ2b2x1bWUtZG93blwiLCBcInZvbHVtZS11cFwiLCBcInFyY29kZVwiLCBcImJhcmNvZGVcIiwgXCJ0YWdcIiwgXCJ0YWdzXCIsIFwiYm9va1wiLCBcImJvb2ttYXJrXCIsIFwicHJpbnRcIiwgXCJjYW1lcmFcIiwgXCJmb250XCIsIFwiYm9sZFwiLCBcIml0YWxpY1wiLCBcInRleHQtaGVpZ2h0XCIsIFwidGV4dC13aWR0aFwiLCBcImFsaWduLWxlZnRcIiwgXCJhbGlnbi1jZW50ZXJcIiwgXCJhbGlnbi1yaWdodFwiLCBcImFsaWduLWp1c3RpZnlcIiwgXCJsaXN0XCIsIFwiZGVkZW50XCIsIFwib3V0ZGVudFwiLCBcImluZGVudFwiLCBcInZpZGVvLWNhbWVyYVwiLCBcInBob3RvXCIsIFwiaW1hZ2VcIiwgXCJwaWN0dXJlLW9cIiwgXCJwZW5jaWxcIiwgXCJtYXAtbWFya2VyXCIsIFwiYWRqdXN0XCIsIFwidGludFwiLCBcImVkaXRcIiwgXCJwZW5jaWwtc3F1YXJlLW9cIiwgXCJzaGFyZS1zcXVhcmUtb1wiLCBcImNoZWNrLXNxdWFyZS1vXCIsIFwiYXJyb3dzXCIsIFwic3RlcC1iYWNrd2FyZFwiLCBcImZhc3QtYmFja3dhcmRcIiwgXCJiYWNrd2FyZFwiLCBcInBsYXlcIiwgXCJwYXVzZVwiLCBcInN0b3BcIiwgXCJmb3J3YXJkXCIsIFwiZmFzdC1mb3J3YXJkXCIsIFwic3RlcC1mb3J3YXJkXCIsIFwiZWplY3RcIiwgXCJjaGV2cm9uLWxlZnRcIiwgXCJjaGV2cm9uLXJpZ2h0XCIsIFwicGx1cy1jaXJjbGVcIiwgXCJtaW51cy1jaXJjbGVcIiwgXCJ0aW1lcy1jaXJjbGVcIiwgXCJjaGVjay1jaXJjbGVcIiwgXCJxdWVzdGlvbi1jaXJjbGVcIiwgXCJpbmZvLWNpcmNsZVwiLCBcImNyb3NzaGFpcnNcIiwgXCJ0aW1lcy1jaXJjbGUtb1wiLCBcImNoZWNrLWNpcmNsZS1vXCIsIFwiYmFuXCIsIFwiYXJyb3ctbGVmdFwiLCBcImFycm93LXJpZ2h0XCIsIFwiYXJyb3ctdXBcIiwgXCJhcnJvdy1kb3duXCIsIFwibWFpbC1mb3J3YXJkXCIsIFwic2hhcmVcIiwgXCJleHBhbmRcIiwgXCJjb21wcmVzc1wiLCBcInBsdXNcIiwgXCJtaW51c1wiLCBcImFzdGVyaXNrXCIsIFwiZXhjbGFtYXRpb24tY2lyY2xlXCIsIFwiZ2lmdFwiLCBcImxlYWZcIiwgXCJmaXJlXCIsIFwiZXllXCIsIFwiZXllLXNsYXNoXCIsIFwid2FybmluZ1wiLCBcImV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCIsIFwicGxhbmVcIiwgXCJjYWxlbmRhclwiLCBcInJhbmRvbVwiLCBcImNvbW1lbnRcIiwgXCJtYWduZXRcIiwgXCJjaGV2cm9uLXVwXCIsIFwiY2hldnJvbi1kb3duXCIsIFwicmV0d2VldFwiLCBcInNob3BwaW5nLWNhcnRcIiwgXCJmb2xkZXJcIiwgXCJmb2xkZXItb3BlblwiLCBcImFycm93cy12XCIsIFwiYXJyb3dzLWhcIiwgXCJiYXItY2hhcnQtb1wiLCBcImJhci1jaGFydFwiLCBcInR3aXR0ZXItc3F1YXJlXCIsIFwiZmFjZWJvb2stc3F1YXJlXCIsIFwiY2FtZXJhLXJldHJvXCIsIFwia2V5XCIsIFwiZ2VhcnNcIiwgXCJjb2dzXCIsIFwiY29tbWVudHNcIiwgXCJ0aHVtYnMtby11cFwiLCBcInRodW1icy1vLWRvd25cIiwgXCJzdGFyLWhhbGZcIiwgXCJoZWFydC1vXCIsIFwic2lnbi1vdXRcIiwgXCJsaW5rZWRpbi1zcXVhcmVcIiwgXCJ0aHVtYi10YWNrXCIsIFwiZXh0ZXJuYWwtbGlua1wiLCBcInNpZ24taW5cIiwgXCJ0cm9waHlcIiwgXCJnaXRodWItc3F1YXJlXCIsIFwidXBsb2FkXCIsIFwibGVtb24tb1wiLCBcInBob25lXCIsIFwic3F1YXJlLW9cIiwgXCJib29rbWFyay1vXCIsIFwicGhvbmUtc3F1YXJlXCIsIFwidHdpdHRlclwiLCBcImZhY2Vib29rLWZcIiwgXCJmYWNlYm9va1wiLCBcImdpdGh1YlwiLCBcInVubG9ja1wiLCBcImNyZWRpdC1jYXJkXCIsIFwiZmVlZFwiLCBcInJzc1wiLCBcImhkZC1vXCIsIFwiYnVsbGhvcm5cIiwgXCJiZWxsXCIsIFwiY2VydGlmaWNhdGVcIiwgXCJoYW5kLW8tcmlnaHRcIiwgXCJoYW5kLW8tbGVmdFwiLCBcImhhbmQtby11cFwiLCBcImhhbmQtby1kb3duXCIsIFwiYXJyb3ctY2lyY2xlLWxlZnRcIiwgXCJhcnJvdy1jaXJjbGUtcmlnaHRcIiwgXCJhcnJvdy1jaXJjbGUtdXBcIiwgXCJhcnJvdy1jaXJjbGUtZG93blwiLCBcImdsb2JlXCIsIFwid3JlbmNoXCIsIFwidGFza3NcIiwgXCJmaWx0ZXJcIiwgXCJicmllZmNhc2VcIiwgXCJhcnJvd3MtYWx0XCIsIFwiZ3JvdXBcIiwgXCJ1c2Vyc1wiLCBcImNoYWluXCIsIFwibGlua1wiLCBcImNsb3VkXCIsIFwiZmxhc2tcIiwgXCJjdXRcIiwgXCJzY2lzc29yc1wiLCBcImNvcHlcIiwgXCJmaWxlcy1vXCIsIFwicGFwZXJjbGlwXCIsIFwic2F2ZVwiLCBcImZsb3BweS1vXCIsIFwic3F1YXJlXCIsIFwibmF2aWNvblwiLCBcInJlb3JkZXJcIiwgXCJiYXJzXCIsIFwibGlzdC11bFwiLCBcImxpc3Qtb2xcIiwgXCJzdHJpa2V0aHJvdWdoXCIsIFwidW5kZXJsaW5lXCIsIFwidGFibGVcIiwgXCJtYWdpY1wiLCBcInRydWNrXCIsIFwicGludGVyZXN0XCIsIFwicGludGVyZXN0LXNxdWFyZVwiLCBcImdvb2dsZS1wbHVzLXNxdWFyZVwiLCBcImdvb2dsZS1wbHVzXCIsIFwibW9uZXlcIiwgXCJjYXJldC1kb3duXCIsIFwiY2FyZXQtdXBcIiwgXCJjYXJldC1sZWZ0XCIsIFwiY2FyZXQtcmlnaHRcIiwgXCJjb2x1bW5zXCIsIFwidW5zb3J0ZWRcIiwgXCJzb3J0XCIsIFwic29ydC1kb3duXCIsIFwic29ydC1kZXNjXCIsIFwic29ydC11cFwiLCBcInNvcnQtYXNjXCIsIFwiZW52ZWxvcGVcIiwgXCJsaW5rZWRpblwiLCBcInJvdGF0ZS1sZWZ0XCIsIFwidW5kb1wiLCBcImxlZ2FsXCIsIFwiZ2F2ZWxcIiwgXCJkYXNoYm9hcmRcIiwgXCJ0YWNob21ldGVyXCIsIFwiY29tbWVudC1vXCIsIFwiY29tbWVudHMtb1wiLCBcImZsYXNoXCIsIFwiYm9sdFwiLCBcInNpdGVtYXBcIiwgXCJ1bWJyZWxsYVwiLCBcInBhc3RlXCIsIFwiY2xpcGJvYXJkXCIsIFwibGlnaHRidWxiLW9cIiwgXCJleGNoYW5nZVwiLCBcImNsb3VkLWRvd25sb2FkXCIsIFwiY2xvdWQtdXBsb2FkXCIsIFwidXNlci1tZFwiLCBcInN0ZXRob3Njb3BlXCIsIFwic3VpdGNhc2VcIiwgXCJiZWxsLW9cIiwgXCJjb2ZmZWVcIiwgXCJjdXRsZXJ5XCIsIFwiZmlsZS10ZXh0LW9cIiwgXCJidWlsZGluZy1vXCIsIFwiaG9zcGl0YWwtb1wiLCBcImFtYnVsYW5jZVwiLCBcIm1lZGtpdFwiLCBcImZpZ2h0ZXItamV0XCIsIFwiYmVlclwiLCBcImgtc3F1YXJlXCIsIFwicGx1cy1zcXVhcmVcIiwgXCJhbmdsZS1kb3VibGUtbGVmdFwiLCBcImFuZ2xlLWRvdWJsZS1yaWdodFwiLCBcImFuZ2xlLWRvdWJsZS11cFwiLCBcImFuZ2xlLWRvdWJsZS1kb3duXCIsIFwiYW5nbGUtbGVmdFwiLCBcImFuZ2xlLXJpZ2h0XCIsIFwiYW5nbGUtdXBcIiwgXCJhbmdsZS1kb3duXCIsIFwiZGVza3RvcFwiLCBcImxhcHRvcFwiLCBcInRhYmxldFwiLCBcIm1vYmlsZS1waG9uZVwiLCBcIm1vYmlsZVwiLCBcImNpcmNsZS1vXCIsIFwicXVvdGUtbGVmdFwiLCBcInF1b3RlLXJpZ2h0XCIsIFwic3Bpbm5lclwiLCBcImNpcmNsZVwiLCBcIm1haWwtcmVwbHlcIiwgXCJyZXBseVwiLCBcImdpdGh1Yi1hbHRcIiwgXCJmb2xkZXItb1wiLCBcImZvbGRlci1vcGVuLW9cIiwgXCJzbWlsZS1vXCIsIFwiZnJvd24tb1wiLCBcIm1laC1vXCIsIFwiZ2FtZXBhZFwiLCBcImtleWJvYXJkLW9cIiwgXCJmbGFnLW9cIiwgXCJmbGFnLWNoZWNrZXJlZFwiLCBcInRlcm1pbmFsXCIsIFwiY29kZVwiLCBcIm1haWwtcmVwbHktYWxsXCIsIFwicmVwbHktYWxsXCIsIFwic3Rhci1oYWxmLWVtcHR5XCIsIFwic3Rhci1oYWxmLWZ1bGxcIiwgXCJzdGFyLWhhbGYtb1wiLCBcImxvY2F0aW9uLWFycm93XCIsIFwiY3JvcFwiLCBcImNvZGUtZm9ya1wiLCBcInVubGlua1wiLCBcImNoYWluLWJyb2tlblwiLCBcInF1ZXN0aW9uXCIsIFwiaW5mb1wiLCBcImV4Y2xhbWF0aW9uXCIsIFwic3VwZXJzY3JpcHRcIiwgXCJzdWJzY3JpcHRcIiwgXCJlcmFzZXJcIiwgXCJwdXp6bGUtcGllY2VcIiwgXCJtaWNyb3Bob25lXCIsIFwibWljcm9waG9uZS1zbGFzaFwiLCBcInNoaWVsZFwiLCBcImNhbGVuZGFyLW9cIiwgXCJmaXJlLWV4dGluZ3Vpc2hlclwiLCBcInJvY2tldFwiLCBcIm1heGNkblwiLCBcImNoZXZyb24tY2lyY2xlLWxlZnRcIiwgXCJjaGV2cm9uLWNpcmNsZS1yaWdodFwiLCBcImNoZXZyb24tY2lyY2xlLXVwXCIsIFwiY2hldnJvbi1jaXJjbGUtZG93blwiLCBcImh0bWw1XCIsIFwiY3NzM1wiLCBcImFuY2hvclwiLCBcInVubG9jay1hbHRcIiwgXCJidWxsc2V5ZVwiLCBcImVsbGlwc2lzLWhcIiwgXCJlbGxpcHNpcy12XCIsIFwicnNzLXNxdWFyZVwiLCBcInBsYXktY2lyY2xlXCIsIFwidGlja2V0XCIsIFwibWludXMtc3F1YXJlXCIsIFwibWludXMtc3F1YXJlLW9cIiwgXCJsZXZlbC11cFwiLCBcImxldmVsLWRvd25cIiwgXCJjaGVjay1zcXVhcmVcIiwgXCJwZW5jaWwtc3F1YXJlXCIsIFwiZXh0ZXJuYWwtbGluay1zcXVhcmVcIiwgXCJzaGFyZS1zcXVhcmVcIiwgXCJjb21wYXNzXCIsIFwidG9nZ2xlLWRvd25cIiwgXCJjYXJldC1zcXVhcmUtby1kb3duXCIsIFwidG9nZ2xlLXVwXCIsIFwiY2FyZXQtc3F1YXJlLW8tdXBcIiwgXCJ0b2dnbGUtcmlnaHRcIiwgXCJjYXJldC1zcXVhcmUtby1yaWdodFwiLCBcImV1cm9cIiwgXCJldXJcIiwgXCJnYnBcIiwgXCJkb2xsYXJcIiwgXCJ1c2RcIiwgXCJydXBlZVwiLCBcImluclwiLCBcImNueVwiLCBcInJtYlwiLCBcInllblwiLCBcImpweVwiLCBcInJ1YmxlXCIsIFwicm91YmxlXCIsIFwicnViXCIsIFwid29uXCIsIFwia3J3XCIsIFwiYml0Y29pblwiLCBcImJ0Y1wiLCBcImZpbGVcIiwgXCJmaWxlLXRleHRcIiwgXCJzb3J0LWFscGhhLWFzY1wiLCBcInNvcnQtYWxwaGEtZGVzY1wiLCBcInNvcnQtYW1vdW50LWFzY1wiLCBcInNvcnQtYW1vdW50LWRlc2NcIiwgXCJzb3J0LW51bWVyaWMtYXNjXCIsIFwic29ydC1udW1lcmljLWRlc2NcIiwgXCJ0aHVtYnMtdXBcIiwgXCJ0aHVtYnMtZG93blwiLCBcInlvdXR1YmUtc3F1YXJlXCIsIFwieW91dHViZVwiLCBcInhpbmdcIiwgXCJ4aW5nLXNxdWFyZVwiLCBcInlvdXR1YmUtcGxheVwiLCBcImRyb3Bib3hcIiwgXCJzdGFjay1vdmVyZmxvd1wiLCBcImluc3RhZ3JhbVwiLCBcImZsaWNrclwiLCBcImFkblwiLCBcImJpdGJ1Y2tldFwiLCBcImJpdGJ1Y2tldC1zcXVhcmVcIiwgXCJ0dW1ibHJcIiwgXCJ0dW1ibHItc3F1YXJlXCIsIFwibG9uZy1hcnJvdy1kb3duXCIsIFwibG9uZy1hcnJvdy11cFwiLCBcImxvbmctYXJyb3ctbGVmdFwiLCBcImxvbmctYXJyb3ctcmlnaHRcIiwgXCJhcHBsZVwiLCBcIndpbmRvd3NcIiwgXCJhbmRyb2lkXCIsIFwibGludXhcIiwgXCJkcmliYmJsZVwiLCBcInNreXBlXCIsIFwiZm91cnNxdWFyZVwiLCBcInRyZWxsb1wiLCBcImZlbWFsZVwiLCBcIm1hbGVcIiwgXCJnaXR0aXBcIiwgXCJncmF0aXBheVwiLCBcInN1bi1vXCIsIFwibW9vbi1vXCIsIFwiYXJjaGl2ZVwiLCBcImJ1Z1wiLCBcInZrXCIsIFwid2VpYm9cIiwgXCJyZW5yZW5cIiwgXCJwYWdlbGluZXNcIiwgXCJzdGFjay1leGNoYW5nZVwiLCBcImFycm93LWNpcmNsZS1vLXJpZ2h0XCIsIFwiYXJyb3ctY2lyY2xlLW8tbGVmdFwiLCBcInRvZ2dsZS1sZWZ0XCIsIFwiY2FyZXQtc3F1YXJlLW8tbGVmdFwiLCBcImRvdC1jaXJjbGUtb1wiLCBcIndoZWVsY2hhaXJcIiwgXCJ2aW1lby1zcXVhcmVcIiwgXCJ0dXJraXNoLWxpcmFcIiwgXCJ0cnlcIiwgXCJwbHVzLXNxdWFyZS1vXCIsIFwic3BhY2Utc2h1dHRsZVwiLCBcInNsYWNrXCIsIFwiZW52ZWxvcGUtc3F1YXJlXCIsIFwid29yZHByZXNzXCIsIFwib3BlbmlkXCIsIFwiaW5zdGl0dXRpb25cIiwgXCJiYW5rXCIsIFwidW5pdmVyc2l0eVwiLCBcIm1vcnRhci1ib2FyZFwiLCBcImdyYWR1YXRpb24tY2FwXCIsIFwieWFob29cIiwgXCJnb29nbGVcIiwgXCJyZWRkaXRcIiwgXCJyZWRkaXQtc3F1YXJlXCIsIFwic3R1bWJsZXVwb24tY2lyY2xlXCIsIFwic3R1bWJsZXVwb25cIiwgXCJkZWxpY2lvdXNcIiwgXCJkaWdnXCIsIFwicGllZC1waXBlclwiLCBcInBpZWQtcGlwZXItYWx0XCIsIFwiZHJ1cGFsXCIsIFwiam9vbWxhXCIsIFwibGFuZ3VhZ2VcIiwgXCJmYXhcIiwgXCJidWlsZGluZ1wiLCBcImNoaWxkXCIsIFwicGF3XCIsIFwic3Bvb25cIiwgXCJjdWJlXCIsIFwiY3ViZXNcIiwgXCJiZWhhbmNlXCIsIFwiYmVoYW5jZS1zcXVhcmVcIiwgXCJzdGVhbVwiLCBcInN0ZWFtLXNxdWFyZVwiLCBcInJlY3ljbGVcIiwgXCJhdXRvbW9iaWxlXCIsIFwiY2FyXCIsIFwiY2FiXCIsIFwidGF4aVwiLCBcInRyZWVcIiwgXCJzcG90aWZ5XCIsIFwiZGV2aWFudGFydFwiLCBcInNvdW5kY2xvdWRcIiwgXCJkYXRhYmFzZVwiLCBcImZpbGUtcGRmLW9cIiwgXCJmaWxlLXdvcmQtb1wiLCBcImZpbGUtZXhjZWwtb1wiLCBcImZpbGUtcG93ZXJwb2ludC1vXCIsIFwiZmlsZS1waG90by1vXCIsIFwiZmlsZS1waWN0dXJlLW9cIiwgXCJmaWxlLWltYWdlLW9cIiwgXCJmaWxlLXppcC1vXCIsIFwiZmlsZS1hcmNoaXZlLW9cIiwgXCJmaWxlLXNvdW5kLW9cIiwgXCJmaWxlLWF1ZGlvLW9cIiwgXCJmaWxlLW1vdmllLW9cIiwgXCJmaWxlLXZpZGVvLW9cIiwgXCJmaWxlLWNvZGUtb1wiLCBcInZpbmVcIiwgXCJjb2RlcGVuXCIsIFwianNmaWRkbGVcIiwgXCJsaWZlLWJvdXlcIiwgXCJsaWZlLWJ1b3lcIiwgXCJsaWZlLXNhdmVyXCIsIFwic3VwcG9ydFwiLCBcImxpZmUtcmluZ1wiLCBcImNpcmNsZS1vLW5vdGNoXCIsIFwicmFcIiwgXCJyZWJlbFwiLCBcImdlXCIsIFwiZW1waXJlXCIsIFwiZ2l0LXNxdWFyZVwiLCBcImdpdFwiLCBcInktY29tYmluYXRvci1zcXVhcmVcIiwgXCJ5Yy1zcXVhcmVcIiwgXCJoYWNrZXItbmV3c1wiLCBcInRlbmNlbnQtd2VpYm9cIiwgXCJxcVwiLCBcIndlY2hhdFwiLCBcIndlaXhpblwiLCBcInNlbmRcIiwgXCJwYXBlci1wbGFuZVwiLCBcInNlbmQtb1wiLCBcInBhcGVyLXBsYW5lLW9cIiwgXCJoaXN0b3J5XCIsIFwiY2lyY2xlLXRoaW5cIiwgXCJoZWFkZXJcIiwgXCJwYXJhZ3JhcGhcIiwgXCJzbGlkZXJzXCIsIFwic2hhcmUtYWx0XCIsIFwic2hhcmUtYWx0LXNxdWFyZVwiLCBcImJvbWJcIiwgXCJzb2NjZXItYmFsbC1vXCIsIFwiZnV0Ym9sLW9cIiwgXCJ0dHlcIiwgXCJiaW5vY3VsYXJzXCIsIFwicGx1Z1wiLCBcInNsaWRlc2hhcmVcIiwgXCJ0d2l0Y2hcIiwgXCJ5ZWxwXCIsIFwibmV3c3BhcGVyLW9cIiwgXCJ3aWZpXCIsIFwiY2FsY3VsYXRvclwiLCBcInBheXBhbFwiLCBcImdvb2dsZS13YWxsZXRcIiwgXCJjYy12aXNhXCIsIFwiY2MtbWFzdGVyY2FyZFwiLCBcImNjLWRpc2NvdmVyXCIsIFwiY2MtYW1leFwiLCBcImNjLXBheXBhbFwiLCBcImNjLXN0cmlwZVwiLCBcImJlbGwtc2xhc2hcIiwgXCJiZWxsLXNsYXNoLW9cIiwgXCJ0cmFzaFwiLCBcImNvcHlyaWdodFwiLCBcImF0XCIsIFwiZXllZHJvcHBlclwiLCBcInBhaW50LWJydXNoXCIsIFwiYmlydGhkYXktY2FrZVwiLCBcImFyZWEtY2hhcnRcIiwgXCJwaWUtY2hhcnRcIiwgXCJsaW5lLWNoYXJ0XCIsIFwibGFzdGZtXCIsIFwibGFzdGZtLXNxdWFyZVwiLCBcInRvZ2dsZS1vZmZcIiwgXCJ0b2dnbGUtb25cIiwgXCJiaWN5Y2xlXCIsIFwiYnVzXCIsIFwiaW94aG9zdFwiLCBcImFuZ2VsbGlzdFwiLCBcImNjXCIsIFwic2hla2VsXCIsIFwic2hlcWVsXCIsIFwiaWxzXCIsIFwibWVhbnBhdGhcIiwgXCJidXlzZWxsYWRzXCIsIFwiY29ubmVjdGRldmVsb3BcIiwgXCJkYXNoY3ViZVwiLCBcImZvcnVtYmVlXCIsIFwibGVhbnB1YlwiLCBcInNlbGxzeVwiLCBcInNoaXJ0c2luYnVsa1wiLCBcInNpbXBseWJ1aWx0XCIsIFwic2t5YXRsYXNcIiwgXCJjYXJ0LXBsdXNcIiwgXCJjYXJ0LWFycm93LWRvd25cIiwgXCJkaWFtb25kXCIsIFwic2hpcFwiLCBcInVzZXItc2VjcmV0XCIsIFwibW90b3JjeWNsZVwiLCBcInN0cmVldC12aWV3XCIsIFwiaGVhcnRiZWF0XCIsIFwidmVudXNcIiwgXCJtYXJzXCIsIFwibWVyY3VyeVwiLCBcImludGVyc2V4XCIsIFwidHJhbnNnZW5kZXJcIiwgXCJ0cmFuc2dlbmRlci1hbHRcIiwgXCJ2ZW51cy1kb3VibGVcIiwgXCJtYXJzLWRvdWJsZVwiLCBcInZlbnVzLW1hcnNcIiwgXCJtYXJzLXN0cm9rZVwiLCBcIm1hcnMtc3Ryb2tlLXZcIiwgXCJtYXJzLXN0cm9rZS1oXCIsIFwibmV1dGVyXCIsIFwiZ2VuZGVybGVzc1wiLCBcImZhY2Vib29rLW9mZmljaWFsXCIsIFwicGludGVyZXN0LXBcIiwgXCJ3aGF0c2FwcFwiLCBcInNlcnZlclwiLCBcInVzZXItcGx1c1wiLCBcInVzZXItdGltZXNcIiwgXCJob3RlbFwiLCBcImJlZFwiLCBcInZpYWNvaW5cIiwgXCJ0cmFpblwiLCBcInN1YndheVwiLCBcIm1lZGl1bVwiLCBcInljXCIsIFwieS1jb21iaW5hdG9yXCIsIFwib3B0aW4tbW9uc3RlclwiLCBcIm9wZW5jYXJ0XCIsIFwiZXhwZWRpdGVkc3NsXCIsIFwiYmF0dGVyeS00XCIsIFwiYmF0dGVyeS1mdWxsXCIsIFwiYmF0dGVyeS0zXCIsIFwiYmF0dGVyeS10aHJlZS1xdWFydGVyc1wiLCBcImJhdHRlcnktMlwiLCBcImJhdHRlcnktaGFsZlwiLCBcImJhdHRlcnktMVwiLCBcImJhdHRlcnktcXVhcnRlclwiLCBcImJhdHRlcnktMFwiLCBcImJhdHRlcnktZW1wdHlcIiwgXCJtb3VzZS1wb2ludGVyXCIsIFwiaS1jdXJzb3JcIiwgXCJvYmplY3QtZ3JvdXBcIiwgXCJvYmplY3QtdW5ncm91cFwiLCBcInN0aWNreS1ub3RlXCIsIFwic3RpY2t5LW5vdGUtb1wiLCBcImNjLWpjYlwiLCBcImNjLWRpbmVycy1jbHViXCIsIFwiY2xvbmVcIiwgXCJiYWxhbmNlLXNjYWxlXCIsIFwiaG91cmdsYXNzLW9cIiwgXCJob3VyZ2xhc3MtMVwiLCBcImhvdXJnbGFzcy1zdGFydFwiLCBcImhvdXJnbGFzcy0yXCIsIFwiaG91cmdsYXNzLWhhbGZcIiwgXCJob3VyZ2xhc3MtM1wiLCBcImhvdXJnbGFzcy1lbmRcIiwgXCJob3VyZ2xhc3NcIiwgXCJoYW5kLWdyYWItb1wiLCBcImhhbmQtcm9jay1vXCIsIFwiaGFuZC1zdG9wLW9cIiwgXCJoYW5kLXBhcGVyLW9cIiwgXCJoYW5kLXNjaXNzb3JzLW9cIiwgXCJoYW5kLWxpemFyZC1vXCIsIFwiaGFuZC1zcG9jay1vXCIsIFwiaGFuZC1wb2ludGVyLW9cIiwgXCJoYW5kLXBlYWNlLW9cIiwgXCJ0cmFkZW1hcmtcIiwgXCJyZWdpc3RlcmVkXCIsIFwiY3JlYXRpdmUtY29tbW9uc1wiLCBcImdnXCIsIFwiZ2ctY2lyY2xlXCIsIFwidHJpcGFkdmlzb3JcIiwgXCJvZG5va2xhc3NuaWtpXCIsIFwib2Rub2tsYXNzbmlraS1zcXVhcmVcIiwgXCJnZXQtcG9ja2V0XCIsIFwid2lraXBlZGlhLXdcIiwgXCJzYWZhcmlcIiwgXCJjaHJvbWVcIiwgXCJmaXJlZm94XCIsIFwib3BlcmFcIiwgXCJpbnRlcm5ldC1leHBsb3JlclwiLCBcInR2XCIsIFwidGVsZXZpc2lvblwiLCBcImNvbnRhb1wiLCBcIjUwMHB4XCIsIFwiYW1hem9uXCIsIFwiY2FsZW5kYXItcGx1cy1vXCIsIFwiY2FsZW5kYXItbWludXMtb1wiLCBcImNhbGVuZGFyLXRpbWVzLW9cIiwgXCJjYWxlbmRhci1jaGVjay1vXCIsIFwiaW5kdXN0cnlcIiwgXCJtYXAtcGluXCIsIFwibWFwLXNpZ25zXCIsIFwibWFwLW9cIiwgXCJtYXBcIiwgXCJjb21tZW50aW5nXCIsIFwiY29tbWVudGluZy1vXCIsIFwiaG91enpcIiwgXCJ2aW1lb1wiLCBcImJsYWNrLXRpZVwiLCBcImZvbnRpY29uc1wiLCBcInJlZGRpdC1hbGllblwiLCBcImVkZ2VcIiwgXCJjcmVkaXQtY2FyZC1hbHRcIiwgXCJjb2RpZXBpZVwiLCBcIm1vZHhcIiwgXCJmb3J0LWF3ZXNvbWVcIiwgXCJ1c2JcIiwgXCJwcm9kdWN0LWh1bnRcIiwgXCJtaXhjbG91ZFwiLCBcInNjcmliZFwiLCBcInBhdXNlLWNpcmNsZVwiLCBcInBhdXNlLWNpcmNsZS1vXCIsIFwic3RvcC1jaXJjbGVcIiwgXCJzdG9wLWNpcmNsZS1vXCIsIFwic2hvcHBpbmctYmFnXCIsIFwic2hvcHBpbmctYmFza2V0XCIsIFwiaGFzaHRhZ1wiLCBcImJsdWV0b290aFwiLCBcImJsdWV0b290aC1iXCIsIFwicGVyY2VudFwiLH0nO1xuICAgICAgICAvLyAkaW5wdXQyID0gYDxzZWxlY3QgY2xhc3M9J2dyb3VwSWNvbicgZGF0YS1oaW50PSdJQ09OJyBkYXRhLW5hbWU9J2dyb3VwSWNvbic+XG4gICAgICAgICAgICAgICAgLy8gPG9wdGlvbj48L29wdGlvbj5cbiAgICAgICAgICAgIC8vIDwvc2VsZWN0YDtcblxuICAgICAgICB0aGlzLnJlbmRlcklucHV0cygkaW5wdXQyLCAnJywgJ3NlbGVjdCcsICdncm91cEljb24nLCAnSUNPTicsICdpY29uTmFtZScpO1xuICAgICAgICB0aGlzLnJlbmRlcklucHV0cygkaW5wdXQsICcnLCAndGV4dCcsICdncm91cE5hbWUnLCAnTkFNRScsICdncm91cE5hbWUnKTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuJHNhdmVCdG4gPSBib2R5LmZpbmQoJy5zdWJtaXQnKTtcbiAgICAgICAgdGhpcy4kY2FuY2VsQnRuID0gYm9keS5maW5kKCcuY2FuY2VsJyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kY2FuY2VsQnRuLCAnY2xpY2snLCAnaGlkZScpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHRoaXMuJGZvcm0sICdzdWJtaXQnLCAnc2F2ZScpO1xuICAgIH0sXG5cbiAgICByZW5kZXJJbnB1dHMoZWwsIHZhbHVlLCB0eXBlLCBuYW1lLCBoaW50LCBjbGFzc05hbWUpIHtcbiAgICAgICAgbGV0ICRpbnB1dDtcbiAgICAgICAgJGlucHV0ID0gJChgPGRpdiBjbGFzcz1cImZiLWZpZWxkXCI+PGRpdiBjbGFzcz1cImlucHV0LWhpbnRcIj4ke2hpbnR9PC9kaXY+JHtlbH08L2Rpdj5gKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJGZvcm0uZmluZCgnLmJvZHknKS5wcmVwZW5kKCRpbnB1dCk7XG5cbiAgICAgICAgLy8gVE9ETzogYWxsb3cgdXNlcnMgdG8gZHluYW1pY2FsbHkgc2VhcmNoIGZvbnRhd2Vzb21lIGljb24gcmVwb3NpdG9yeVxuICAgICAgICAvLyBpZiAodHlwZSA9PSAnc2VsZWN0Jykge1xuICAgICAgICAvLyAgICAgJGlucHV0LnNlbGVjdDIoe1xuICAgICAgICAvLyAgICAgICAgIGFqYXg6IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdXJsOiBDcmFmdC5nZXRBY3Rpb25VcmwoKSArICcvZm9ybS1idWlsZGVyL2ljb25zL2dldC1hbGwtaWNvbnMnLFxuICAgICAgICAvLyAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAvLyAgICAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiBkYXRhLmljb25zXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAvLyAgICAgICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgIC8vICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWxlY3QgSWNvbicsXG4gICAgICAgIC8vICAgICAgICAgZXNjYXBlTWFya3VwOiBmdW5jdGlvbiAobWFya3VwKSB7IHJldHVybiBtYXJrdXA7IH0sXG4gICAgICAgIC8vICAgICAgICAgdGVtcGxhdGVSZXN1bHQ6IGZ1bmN0aW9uKGljb24pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG1hcmt1cCA9IGA8ZGl2IGNsYXNzPSdzZWxlY3QyLXJlc3VsdC1pY29uIGNsZWFyZml4Jz48ZGl2IGNsYXNzPSdzZWxlY3QyLXJlc3VsdC1pbWFnZSc+PGltZyBzcmM9JyR7aWNvbi5pY29ufScgLz48L2Rpdj48ZGl2IGNsYXNzPSdzZWxlY3QyLXJlc3VsdC1pY29uLWRldGFpbHMnPjxkaXYgY2xhc3M9J3NlbGVjdDItcmVzdWx0LW5hbWUnPiR7aWNvbi5uYW1lfTwvZGl2PmA7XG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBtYXJrdXA7XG4gICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIHNhdmUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgZ3JvdXBJY29uO1xuICAgICAgICBsZXQgZ3JvdXBOYW1lO1xuICAgICAgICBsZXQgaW5wdXRMZW5ndGg7XG4gICAgICAgIGxldCBzZWxmO1xuXG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICBncm91cE5hbWUgPSB0aGlzLiRmb3JtLmZpbmQoJy5ncm91cE5hbWUnKS52YWwoKTtcbiAgICAgICAgZ3JvdXBJY29uID0gdGhpcy4kZm9ybS5maW5kKCcuZ3JvdXBJY29uJykudmFsKCk7XG4gICAgICAgIGlucHV0TGVuZ3RoID0gdGhpcy4kZm9ybS5maW5kKCcuZ3JvdXBOYW1lJykudmFsKCkubGVuZ3RoO1xuICAgICAgICBpZiAoaW5wdXRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdyb3VwLmlkID8gdGhpcy5ncm91cC5pZCA6IG51bGwsXG4gICAgICAgICAgICAgICAgbmFtZTogZ3JvdXBOYW1lLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGdyb3VwSWNvblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ3JhZnQucG9zdEFjdGlvblJlcXVlc3QoJ2Zvcm0tYnVpbGRlci9ncm91cHMvc2F2ZScsIGRhdGEsICQucHJveHkoKGZ1bmN0aW9uKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9ycztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IENyYWZ0LmdldFVybCgnZm9ybS1idWlsZGVyL2Zvcm1zJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSB0aGlzLmZsYXR0ZW5FcnJvcnMocmVzcG9uc2UuZXJyb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGAke0NyYWZ0LnQoJ2Zvcm0tYnVpbGRlcicsICdDb3VsZCBub3QgY3JlYXRlIHRoZSBncm91cDonKX1cXG5cXG4ke2Vycm9ycy5qb2luKCdcXG4nKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENyYWZ0LmNwLmRpc3BsYXlFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksIHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmbGF0dGVuRXJyb3JzKHJlc3BvbnNlRXJyb3JzKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGU7XG4gICAgICAgIGxldCBlcnJvcnM7XG4gICAgICAgIGVycm9ycyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChhdHRyaWJ1dGUgaW4gcmVzcG9uc2VFcnJvcnMpIHtcbiAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQocmVzcG9uc2VFcnJvcnNbYXR0cmlidXRlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgIH1cbn0pO1xuICBcbkdhcm5pc2guJGRvYy5yZWFkeSgoKSA9PiB7XG4gICAgbGV0IEZvcm1Hcm91cHM7XG4gICAgRm9ybUdyb3VwcyA9IG5ldyBHcm91cHM7XG4gICAgJC5lYWNoKCQoJy5ncm91cC1pdGVtJyksIChpLCBpdGVtKSA9PiBuZXcgR3JvdXBJdGVtKGl0ZW0pKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NldGJ1bmRsZXMvZ3JvdXBzL3NyYy9qcy9ncm91cHMuanMiXSwic291cmNlUm9vdCI6IiJ9