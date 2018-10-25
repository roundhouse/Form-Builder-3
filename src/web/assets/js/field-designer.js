var LD_Fields = void 0;

LD_Fields = {
    setup: function setup() {}
};

LD_Fields = new (Garnish.Base.extend({
    fields: null,
    options: null,

    init: function init() {
        this.fields = {};
        this.options = {};
    },
    setup: function setup() {
        var self = void 0;
        var FLD = void 0;
        var FLD_init = void 0;
        var FLD_field = void 0;
        var FLD_fieldOptions = void 0;
        self = this;

        if (Craft.FieldLayoutDesigner) {
            FLD = Craft.FieldLayoutDesigner;
            FLD_init = FLD.prototype.init;
            FLD_field = FLD.prototype.initField;
            FLD_fieldOptions = FLD.prototype.onFieldOptionSelect;

            FLD.prototype.init = function () {
                FLD_init.apply(this, arguments);
                this.fieldEditor = new FieldEditor(this);
            };

            FLD.prototype.initField = function ($field) {
                var $preview = void 0;
                var $editBtn = void 0;
                var $html = void 0;
                var $menu = void 0;
                var $ul = void 0;
                var menu = void 0;
                var menuBtn = void 0;

                FLD_field.apply(this, arguments);

                $editBtn = $field.find('.settings');
                menuBtn = $editBtn.data('menubtn');
                menu = menuBtn.menu;
                $menu = menu.$container;
                $ul = $menu.children('ul');
                $html = $('<li><a data-action="fieldoptions">' + Craft.t('form-builder', 'Options') + '</a></li>').appendTo($ul);

                $preview = $(['<div class="field-options-preview">', '</div>'].join('')).appendTo($field);

                return menu.addOptions($html.children('a'));
            };

            FLD.prototype.onFieldOptionSelect = function (option) {
                var $field = void 0;
                var $option = void 0;
                var action = void 0;

                FLD_fieldOptions.apply(this, arguments);

                $option = $(option);
                $field = $option.data('menu').$anchor.parent();
                action = $option.data('action');

                switch (action) {
                    case 'fieldoptions':
                        this.trigger('fieldOptionsSelected', {
                            target: $option[0],
                            $target: $option,
                            $field: $field,
                            fld: this,
                            id: $field.data('id') | 0
                        });
                }
            };
        }
    },
    getOptions: function getOptions(layoutId) {
        var options = void 0;
        options = {};

        $.each(this.options, function (key, item) {
            if (parseInt(item.fieldLayoutId) == layoutId) {
                options[item.fieldId] = item.options;
            }
        });

        return options;
    }
}))();

FieldEditor = Garnish.Base.extend({
    fld: null,
    options: null,
    layoutId: null,
    namespace: 'form-builder',

    init: function init(fld) {
        this.fld = fld;
        this.layoutId = LD.getLayoutId();
        this.options = LD_Fields.getOptions(this.layoutId);

        this.fld.on('fieldOptionsSelected', $.proxy(this.openOptionsModal, this));

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
    openOptionsModal: function openOptionsModal(e) {
        var self = void 0;
        var formId = void 0;
        var modal = void 0;
        self = this;
        formId = e.id;

        modal = new FieldOptionsModal(e);
        modal.on('setOptions', function (e) {
            return self.setFormData(formId, e.options);
        });
        modal.show(this.options);
    },
    setFormData: function setFormData(fieldId, options) {
        var self = void 0;
        var $container = void 0;
        var $field = void 0;
        var name = void 0;
        self = this;

        $container = this.fld.$container;
        $field = $container.find('.fld-field[data-id="' + fieldId + '"]:not(".unused")');
        name = this.namespace + '[field][' + fieldId + '][options]';

        $.each(options, function (key, item) {
            if ($field.children('input[name="' + name + '[' + key + ']"]').length > 0) {
                if (item) {
                    $field.children('input[name="' + name + '[' + key + ']"]').val(item);
                    self.updatePreview($field, key, item);
                } else {
                    $field.children('input[name="' + name + '[' + key + ']"]').remove();
                    self.removePreview($field, key, item);
                }
            } else {
                if (item) {
                    self.updatePreview($field, key, item);
                    $('<input type="hidden" name="' + name + '[' + key + ']">').val(item).appendTo($field);
                }
            }
        });
    },
    updatePreview: function updatePreview(field, type, value) {
        body = field.find('.field-options-preview');
        markup = $('<div class="field-' + type + '-preview"><span class="preview-type">' + type + '</span> ' + value + '</div>');
        oldMarkup = body.find('.field-' + type + '-preview');

        if (oldMarkup) {
            oldMarkup.remove();
        }

        markup.appendTo(body);
    },
    removePreview: function removePreview(field, type, value) {
        field.find('.field-' + type + '-preview').remove();
    }
});

FieldOptionsModal = Garnish.Modal.extend({
    field: null,
    $formContainer: null,
    $classInput: null,
    $idInput: null,
    $templateInput: null,

    init: function init(field) {
        var body = void 0;
        this.field = field;
        this.base();

        this.$formContainer = $('<form class="modal fitted formbuilder-modal has-sidebar">').appendTo(Garnish.$bod);
        this.setContainer(this.$formContainer);

        body = $(['<section class="modal-container">', '<div class="modal-sidebar">', '<nav>', '<a href="#" class="modal-nav active" data-target="modal-content-styles"><i class="far fa-magic"></i> <span class="link-text">Styles</span></a>', '<a href="#" class="modal-nav" data-target="modal-content-settings"><i class="far fa-cog"></i> <span class="link-text">Settings</span></a>', '</nav>', '</div>', '<div class="modal-content-container">', '<div class="modal-content modal-content-styles active">', '<header>', '<span class="modal-title">', 'Attributes', '</span>', '<div class="instructions">', 'Custom field attributes', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'CLASS', '</div>', '<input type="text" class="text fullwidth input-class">', '</div>', '<div class="fb-field">', '<div class="input-hint">', 'ID', '</div>', '<input type="text" class="text fullwidth input-id">', '</div>', '</div>', '</div>', '<div class="modal-content modal-content-settings">', '<header>', '<span class="modal-title">', 'Settings', '</span>', '<div class="instructions">', 'Custom field settings', '</div>', '</header>', '<div class="body">', '<div class="fb-field">', '<div class="input-hint">', 'TEMPLATE', '</div>', '<input type="text" class="text fullwidth input-template">', '</div>', '</div>', '</div>', '</div>', '</section>', '<footer class="footer">', '<div class="buttons">', '<input type="button" class="btns btn-modal cancel" value="' + Craft.t('form-builder', 'Cancel') + '">', '<input type="submit" class="btns btn-modal submit" value="' + Craft.t('form-builder', 'Save') + '">', '</div>', '</footer>'].join('')).appendTo(this.$formContainer);

        this.$classInput = body.find('.input-class');
        this.$idInput = body.find('.input-id');
        this.$templateInput = body.find('.input-template');

        this.$navLink = body.find('.modal-nav');
        this.$cancelBtn = body.find('.cancel');

        this.loadModalValues();

        this.addListener(this.$cancelBtn, 'click', 'hide');
        this.addListener(this.$navLink, 'click', 'toggleModalContent');
        this.addListener(this.$formContainer, 'submit', 'onFormSubmit');
    },
    loadModalValues: function loadModalValues() {
        $classInput = $('input[name="form-builder[field][' + this.field.id + '][options][class]"]').val();
        $idInput = $('input[name="form-builder[field][' + this.field.id + '][options][id]"]').val();
        $templateInput = $('input[name="form-builder[field][' + this.field.id + '][options][template]"]').val();

        if ($classInput) {
            this.$formContainer.find('.input-class').val($classInput);
        }

        if ($idInput) {
            this.$formContainer.find('.input-id').val($idInput);
        }

        if ($templateInput) {
            this.$formContainer.find('.input-template').val($templateInput);
        }
    },
    toggleModalContent: function toggleModalContent(e) {
        var _this2 = this;

        e.preventDefault();
        var target = void 0;
        var link = void 0;
        var height = void 0;

        link = $(e.currentTarget);
        target = link.data('target');
        height = $('.' + target).height() + 53;

        $('.modal-nav').removeClass('active');
        $('.modal-content').removeClass('active');

        link.addClass('active');
        $('.' + target).addClass('active');

        this.$container.velocity('stop');
        this.$container.velocity({ height: height }, 'fast', function () {
            _this2.$container.css({
                height: height,
                minHeight: 'auto'
            });
        });
    },
    onFormSubmit: function onFormSubmit(e) {
        e.preventDefault();

        if (!this.visible) {
            return;
        }

        this.trigger('setOptions', {
            options: {
                "class": this.$classInput.val(),
                id: this.$idInput.val(),
                template: this.$templateInput.val()
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
        self = this;

        if (options.length > 0) {
            values = JSON.parse(options[this.field.id]);

            $.each(values, function (key, value) {
                if (key == 'class' && value) {
                    self.$classInput.val(value);
                }

                if (key == 'id' && value) {
                    self.$idInput.val(value);
                }
            });

            if (!Garnish.isMobileBrowser()) {
                setTimeout($.proxy(function () {
                    this.$classInput.focus();
                }));
            }
        }

        this.base();
    }
});

window.LD_Fields = LD_Fields;