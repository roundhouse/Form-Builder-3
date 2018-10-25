var UtilityItem = void 0;

UtilityItem = Garnish.Base.extend({
    $container: null,
    $btn: null,
    $loader: null,
    $badgeContainer: null,
    $countContainer: null,
    $menuContainer: null,

    type: null,
    count: 0,

    init: function init(el) {
        this.$container = $(el);
        this.type = this.$container.data('type');
        this.$btn = this.$container.find('.icon');
        this.$loader = this.$container.find('.loader');
        this.$badgeContainer = this.$container.find('.fb-badge');
        this.$countContainer = this.$badgeContainer.find('.count');
        this.$menuContainer = this.$container.find('.utility-menu');

        if (this.type == 'unread') {
            this.getUnreadCount();
        }

        if (this.type == 'notifications') {
            this.getNotifications();
        }

        this.addListener(this.$btn, 'click', this.toggleMenu);
    },
    getUnreadCount: function getUnreadCount() {
        var _this = this;

        Craft.postActionRequest('form-builder/entries/get-unread-entries', $.proxy(function (response, textStatus) {
            if (textStatus === 'success') {
                if (response.totalCount > 0) {
                    _this.$badgeContainer.addClass('show');
                    _this.$countContainer.html(response.totalCount);
                    _this.$menuContainer.find('.body').html(response.template);
                } else {
                    _this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No unread submissions.') + '</p>');
                }
            }
        }, this));
    },
    getNotifications: function getNotifications() {
        this.$menuContainer.find('.body').html('<p class="no-content">' + Craft.t('form-builder', 'No new notifications.') + '</p>');
    },
    toggleMenu: function toggleMenu() {
        if (this.$container.hasClass('active')) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().removeClass('active');
            this.$menuContainer.removeClass('active');
        } else {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
            this.$btn.parent().addClass('active');
            this.$menuContainer.addClass('active');
        }
    }
});

Garnish.$doc.ready(function () {
    var _this2 = this;

    $.each($('.fb-utility-btn'), function (i, el) {
        new UtilityItem(el);
    });

    $('.fb-mobile-nav').on('click', function (e) {
        $(_this2).toggleClass('active');
        $('body').toggleClass('show-fb-menu');
    });

    $('body').on('click', function (e) {
        target = $(e.target).closest('.utility-menu');
        btn = $(e.target).closest('.fb-utility-btn');

        if (target.length == 0 && btn.length == 0) {
            $('.fb-utility-btn').removeClass('active');
            $('.utility-menu').removeClass('active');
        }
    });
});