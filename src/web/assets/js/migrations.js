Garnish.$doc.ready(function () {
    $('.item-body-header').on('click', function () {
        var toggler = $(this).find('.toggle-section');
        var target = $(this).data('target');

        $('#' + target).slideToggle('fast', function () {
            toggler.toggleClass('active');
            $(this).toggleClass('active');
        });
    });
});