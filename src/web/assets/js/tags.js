var Tag = void 0;

window.Tag = Garnish.Base.extend({
    $item: null,
    $deleteTag: null,
    init: function init(item) {
        this.$item = $(item);
        this.$deleteTag = this.$item.find('.option-result-delete');

        return this.addListener(this.$deleteTag, 'click', 'delete');
    },
    "delete": function _delete(e) {
        var self = void 0;
        e.preventDefault();
        self = this;
        this.$item.addClass('zap');
        setTimeout(function () {
            self.$item.remove();
            Craft.cp.displayNotice(Craft.t('form-builder', 'Item Removed'));
        }, 300);
    }
});

Garnish.$doc.ready(function () {
    return $('.result-item').each(function (i, el) {
        return new window.Tag(el);
    });
});