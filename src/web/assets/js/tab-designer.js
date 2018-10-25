var LD_Tabs = void 0;

LD_Tabs = {
    setup: function setup() {}
};

LD_Tabs = new (Garnish.Base.extend({
    tabs: null,
    options: null,

    init: function init() {
        this.tabs = {};
        this.options = {};
    },
    setup: function setup() {
        var self = void 0;
        var FLD = void 0;
        var FLD_tab = void 0;
        var FLD_addTab = void 0;
        var FLD_tabOptions = void 0;
        self = this;

        if (Craft.FieldLayoutDesigner) {
            FLD = Craft.FieldLayoutDesigner;
            FLD_init = FLD.prototype.init;
            FLD_tab = FLD.prototype.initTab;
            FLD_addTab = FLD.prototype.addTab;
            FLD_tabOptions = FLD.prototype.onFieldOptionSelect;

            FLD.prototype.init = function () {
                FLD_init.apply(this, arguments);
                this.tabEditor = new TabEditor(this);
            };

            FLD.prototype.initTab = function ($tab) {
                var $tabEl = void 0;
                var $preview = void 0;
                var $editBtn = void 0;
                var $html = void 0;
                var $menu = void 0;
                var $ul = void 0;
                var tabId = void 0;
                var menu = void 0;
                var menuBtn = void 0;

                FLD_tab.apply(this, arguments);

                tabId = $tab.find('.tab').data('id');

                if (tabId) {
                    $editBtn = $tab.find('.tabs .settings');
                    menuBtn = $editBtn.data('menubtn');
                    menu = menuBtn.menu;
                    $menu = menu.$container;
                    $ul = $menu.children('ul');
                    $html = $('<li><a data-action="taboptions">' + Craft.t('form-builder', 'Options') + '</a></li>').appendTo($ul);
                    console.log();

                    $preview = $(['<div class="field-options-preview">', '</div>'].join('')).appendTo($tab.find('.tabs'));

                    return menu.addOptions($html.children('a'));
                }
            }, FLD.prototype.onTabOptionSelect = function (option) {
                var $tab = void 0;
                var $option = void 0;
                var tabId = void 0;
                var action = void 0;

                FLD_tabOptions.apply(this, arguments);

                $option = $(option);
                $tab = $option.data('menu').$anchor.parent().parent().parent();
                action = $option.data('action');
                tabId = $tab.find('.tab').data('id');

                switch (action) {
                    case 'rename':
                        {
                            this.renameTab($tab);
                            this.trigger('tabRenamed', {
                                tabId: tabId
                            });
                            break;
                        }
                    case 'delete':
                        {
                            this.deleteTab($tab);
                            break;
                        }
                    case 'taboptions':
                        this.trigger('tabOptionsSelected', {
                            target: $option[0],
                            $target: $option,
                            $tab: $tab,
                            fld: this,
                            tabId: tabId
                        });
                        break;
                }
            };

            FLD.prototype.addTab = function () {
                return self.addTab(this);
            };
        }
    },
    addTab: function addTab(e) {
        if (!e.settings.customizableTabs) {
            return;
        }

        var $tab = $('<div class="fld-tab">' + '<div class="tabs">' + '<div class="tab sel draggable">' + '<span>Fieldset ' + (e.tabGrid.$items.length + 1) + '</span>' + '<a class="settings icon" title="' + Craft.t('app', 'Rename') + '"></a>' + '</div>' + '</div>' + '<div class="fld-tabcontent"></div>' + '</div>').appendTo(e.$tabContainer);

        e.tabGrid.addItems($tab);
        e.tabDrag.addItems($tab);

        e.initTab($tab);
    },
    getOptions: function getOptions(layoutId) {
        var options = void 0;
        options = {};

        $.each(this.options, function (key, item) {
            if (parseInt(item.layoutId) == layoutId) {
                options[item.tabId] = item.options;
            }
        });

        return options;
    }
}))();

TabEditor = Garnish.Base.extend({
    fld: null,
    options: null,
    layoutId: null,
    namespace: 'form-builder',

    init: function init(fld) {
        this.fld = fld;
        this.layoutId = LD.getLayoutId();
        this.options = LD_Tabs.getOptions(this.layoutId);

        this.fld.on('tabOptionsSelected', $.proxy(this.openOptionsModal, this));
        this.fld.on('tabRenamed', $.proxy(this.onTabRenamed, this));

        if (this.layoutId !== false) {
            this.applyOptions(this.layoutId);
        }
    },
    applyOptions: function applyOptions(layoutId) {
        var _this = this;

        var results = void 0;

        if (this.options) {
            results = [];

            $.each(this.options, function (key, value) {
                if (_this.options.hasOwnProperty(key)) {
                    options = JSON.parse(_this.options[key]);
                    results.push(_this.setFormData(key, JSON.parse(value)));
                } else {
                    results.push(void 0);
                }
            });

            return results;
        }
    },
    onTabRenamed: function onTabRenamed(e) {
        $tab = $('.tab-id-' + e.tabId);
        $input = $tab.parent().find('.tab-name-field');
        $labelSpan = $tab.find('span');
        tabName = $labelSpan.text();

        $input.val(tabName);
    },
    openOptionsModal: function openOptionsModal(e) {
        var self = void 0;
        self = this;
        var modal = void 0;
        var tabId = void 0;
        var $tab = e.$tab;
        var $labelSpan = void 0;

        $labelSpan = $tab.find('.tabs .tab span');
        tabName = $labelSpan.text();
        tabId = e.tabId;

        modal = new TabOptionsModal($tab);
        modal.on('setOptions', function (e) {
            return self.setFormData(tabId, e.options, tabName);
        });
        modal.show(this.options);
    },
    setFormData: function setFormData(tabId, options, tabName) {
        var self = void 0;
        var $container = void 0;
        var name = void 0;
        self = this;

        $container = $('[data-id="' + tabId + '"]').parent();
        name = this.namespace + '[tab][' + tabId + '][options]';

        $.each(options, function (key, item) {
            if ($container.children('input[name="' + name + '[' + key + ']"]').length > 0) {
                if (item) {
                    $container.children('input[name="' + name + '[' + key + ']"]').val(item);
                    self.updatePreview(tabId, $container, key, item);
                } else {
                    $container.children('input[name="' + name + '[' + key + ']"]').remove();
                    self.removePreview(tabId, $container, key, item);
                }
            } else {
                if (item) {
                    self.updatePreview(tabId, $container, key, item);
                    $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($container);
                }
            }
        });

        $container.find('.tab-name-field').val(tabName);
    },
    updatePreview: function updatePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        body = target.find('.field-options-preview');
        markup = $('<div class="field-' + type + '-preview"><span class="preview-type">' + type + '</span> ' + value + '</div>');
        oldMarkup = body.find('.field-' + type + '-preview');

        if (oldMarkup) {
            oldMarkup.remove();
        }

        markup.appendTo(body);
    },
    removePreview: function removePreview(tabId, tab, type, value) {
        target = $('[data-id="' + tabId + '"]').parent();
        target.find('.field-' + type + '-preview').remove();
    }
});

TabOptionsModal = Garnish.Modal.extend({
    tab: null,
    form: null,
    $formContainer: null,

    init: function init(tab) {
        var body = void 0;
        this.tab = tab;
        this.base();
        this.$formContainer = $('<form class="modal fitted formbuilder-modal">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);
        body = $(['<header>', '<span class="modal-title">', 'Attributes', '</span>', '<div class="instructions">', 'Custom tab attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth input-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth input-id">', '</div>', '</div>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$inputClass = body.find('.input-class');
        this.$inputId = body.find('.input-id');

        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    loadModalValues: function loadModalValues() {
        tabId = this.tab.find('.tab').data('id');
        $classInput = $('input[name="form-builder[tab][' + tabId + '][options][class]"]').val();
        $idInput = $('input[name="form-builder[tab][' + tabId + '][options][id]"]').val();

        if ($classInput) {
            this.$formContainer.find('.input-class').val($classInput);
        }

        if ($idInput) {
            this.$formContainer.find('.input-id').val($idInput);
        }
    },
    onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();

        if (!this.visible) {
            return;
        }

        this.trigger('setOptions', {
            options: {
                "class": this.$inputClass.val(),
                id: this.$inputId.val()
            }
        });

        this.hide();
    },
    onFadeOut: function onFadeOut() {
        this.base();
        this.destroy();
    },
    destroy: function destroy() {
        this.base();
        this.$container.remove();
        this.$shade.remove();
    },
    show: function show(options) {
        var self = void 0;
        var values = void 0;

        if (options.length > 0) {
            values = JSON.parse(options[this.tab.name]);
        }

        $.each(values, function (key, value) {
            if (key === 'class' && value) {
                self.$inputClass.val(value);
            }

            if (key === 'id' && value) {
                self.$inputId.val(value);
            }
        });

        if (!Garnish.isMobileBrowser()) {
            setTimeout($.proxy(function () {
                this.$inputClass.focus();
            }, this), 100);
        }

        this.base();
    }
});

window.LD_Tabs = LD_Tabs;