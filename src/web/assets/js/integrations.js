var IntegrationsHud = Garnish.Base.extend({
    $listContainer: null,
    $container: null,

    type: null,
    hud: null,

    init: function init(payload) {
        this.$listContainer = $('#current-integrations-list');
        this.$container = $(payload.target);
        this.type = payload.type;

        this.getHud();
    },
    handleSubmitted: function handleSubmitted(data) {
        if ($(this.$listContainer[0].children[0]).hasClass('empty')) {
            $('#current-integrations-list').html(data.template);
        } else {
            $('#current-integrations-list').append(data.template);
        }

        // TODO: make sure you can delete items after they have been inserted

        this.hud.hide();
    },
    getHud: function getHud() {
        var data = {
            type: this.type
        };

        Craft.postActionRequest('form-builder/integrations/get-hud-modal', data, $.proxy(function (response, textStatus) {
            if (response.success) {
                this.createHud(response.template);
            }
        }, this));
    },
    createHud: function createHud(template) {
        var that = this;

        this.hud = new Garnish.HUD(this.$container, template, {
            hudClass: 'hud formbuilder-hud',
            bodyClass: 'body',
            closeOtherHUDs: false
        });

        this.hud.on('onSubmitted', $.proxy(this, 'handleSubmitted'));

        this.hud.on('hide', $.proxy(function () {
            delete this.hud;
            $('.hud-shade').remove();
            $('.formbuilder-hud').remove();
        }, this));

        this.hud.$body.find('input:first').trigger('focus');

        // Init handle generator
        new Craft.HandleGenerator('#integration-name', '#integration-handle');

        var $cancelBtn = this.hud.$footer.find('.cancel');

        this.addListener($cancelBtn, 'click', function () {
            this.hud.hide();
        });

        this.hud.on('submit', function (e) {
            var formData = that.hud.$body.serialize();

            Craft.postActionRequest('form-builder/integrations/save', formData, $.proxy(function (response, textStatus) {
                if (response.success) {
                    that.handleSubmitted(response);
                } else {
                    $.each(response.errors, function (i, item) {
                        $('#field-' + i).addClass('error');
                    });
                }
            }, this));
        });
    }
});

var IntegrationSelectionHud = Garnish.Base.extend({
    $container: null,
    $spinner: null,

    hud: null,

    init: function init(el) {
        this.$container = $(el);

        this.createHud();
    },
    createHud: function createHud() {
        var data = {
            type: this.type
        };

        $hud = $('<div class="hud-loader-body"/>');
        this.$spinner = $('<div class="loader"><svg width="25px" height="25px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#474747"><g fill="none" fill-rule="evenodd"><g transform="translate(4 3)" stroke-width="5"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>').prependTo($hud);

        this.hud = new Garnish.HUD(this.$container, $hud, {
            hudClass: 'hud formbuilder-hud',
            bodyClass: 'body',
            closeOtherHUDs: false
        });

        // Get Integrations
        Craft.postActionRequest('form-builder/integrations/get-integrations-hud', data, $.proxy(function (response, textStatus) {
            if (response.success) {
                this.updateBody(response.template);
            }
        }, this));
    },
    updateBody: function updateBody(template) {
        var that = this;

        this.hud.updateBody(template);

        this.hud.on('onSubmitted', $.proxy(this, 'handleSubmitted'));

        this.hud.on('hide', $.proxy(function () {
            delete this.hud;
            $('.hud-shade').remove();
            $('.formbuilder-hud').remove();
        }, this));

        var items = this.hud.$body.find('.integration-add-link');

        items.on('click', function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            var data = target[0].dataset;

            that.trigger('response', {
                data: data
            });
        });
    }
});

var IntegrationItem = Garnish.Base.extend({
    $container: null,
    formId: null,

    id: null,
    name: null,
    handle: null,
    type: null,
    status: null,

    init: function init(data) {

        this.$container = $('#formbuilder-integrations-container');

        var payload = {
            formId: data.formId,
            id: data.id,
            name: data.name,
            handle: data.handle,
            type: data.type,
            status: data.status
        };

        this.getIntegrationSection(payload);
    },
    getIntegrationSection: function getIntegrationSection(payload) {
        Craft.postActionRequest('form-builder/integrations/get-integration-section', payload, $.proxy(function (response, textStatus) {
            if (response.success) {
                this.appendIntegrationHtml(response);
            }
        }, this));
    },
    appendIntegrationHtml: function appendIntegrationHtml(response) {
        this.$container.append($(response.template));

        var container = $('#integration-' + response.type + '-' + response.index);

        container.find('.option-item').each(function (i, el) {
            new window.Option(el);
        });

        container.find('.delete-btn').on('click', function (e) {
            e.preventDefault();

            container.slideUp(300, function () {
                container.remove();
            });
        });
    }
});

Garnish.$doc.ready(function () {

    $('.add-integration').on('click', function (e) {
        e.preventDefault();

        var payload = {
            target: $(this),
            type: $(this).data('type')
        };

        new IntegrationsHud(payload);
    });

    $('.add-integrations-item').on('click', function (e) {
        e.preventDefault();
        var formId = $(this).data('form-id');

        var integrationSelection = new IntegrationSelectionHud($(this));

        integrationSelection.on('response', function (e) {
            var type = e.data.type;
            var allowMultiple = e.data.allowMultiple;
            e.data.formId = formId;
            e.target.hud.hide();

            if (allowMultiple === '1') {
                new IntegrationItem(e.data);
            } else {
                var needle = $('#integration-' + type + '-1');
                if (needle.length > 0) {
                    Craft.cp.displayError(Craft.t('form-builder', 'Only 1 integration is allowed for this type'));
                } else {
                    new IntegrationItem(e.data);
                }
            }
        });
    });

    $('#formbuilder-integrations-container .delete-btn').on('click', function (e) {
        e.preventDefault();
        var target = $(this).data('target');

        $('#' + target).slideUp(300, function () {
            $('#' + target).remove();
        });
    });

    $('.item-remove').on('click', function (e) {
        var id = $(this).data('id');
        var target = $(this).parent();
        var data = {
            id: id
        };

        Craft.postActionRequest('form-builder/integrations/delete', data, $.proxy(function (response, textStatus) {
            if (response.success) {
                target.velocity('slideUp', '300', function () {
                    target.remove();
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Integration deleted'));
                });
            } else {
                Craft.cp.displayNotice(Craft.t('form-builder', 'Cannot delete integration'));
            }
        }, this));
    });
});