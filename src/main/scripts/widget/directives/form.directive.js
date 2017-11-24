/**
 * Created by lequanghiep on 1/20/2017.
 */
angular.module('myApp')
    .directive('multiSelect', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (scope.$last) {
                    $timeout(function () {
                        var select = element.parent();
                        select.chosen({allow_single_deselect: true});

                        //resize the chosen on window resize
                        $(window)
                            .off('resize.chosen')
                            .on('resize.chosen', function () {
                                select.each(function () {
                                    var $this = $(this);
                                    $this.next().css({'width': $this.parent().width()});
                                })
                            }).trigger('resize.chosen');
                        //resize chosen on sidebar collapse/expand
                        $(document).on('settings.ace.chosen', function (e, event_name, event_val) {
                            if (event_name != 'sidebar_collapsed') return;
                            select.each(function () {
                                var $this = $(this);
                                $this.next().css({'width': $this.parent().width()});
                            })
                        });


                        $('#chosen-multiple-style .btn').on('click', function (e) {
                            var target = $(this).find('input[type=radio]');
                            var which = parseInt(target.val());
                            if (which == 2) element.addClass('tag-input-style');
                            else select.removeClass('tag-input-style');
                        });
                    });
                }
            }
        }
    })
    .directive('dateTimePicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (!ace.vars['old_ie']) {
                    element.datetimepicker({
                        format: 'dd/MM/yyyy',//use this option to display seconds
                        icons: {
                            time: 'fa fa-clock-o',
                            date: 'fa fa-calendar',
                            up: 'fa fa-chevron-up',
                            down: 'fa fa-chevron-down',
                            previous: 'fa fa-chevron-left',
                            next: 'fa fa-chevron-right',
                            today: 'fa fa-arrows ',
                            clear: 'fa fa-trash',
                            close: 'fa fa-times'
                        }
                    }).next().on(ace.click_event, function () {
                        $(this).prev().focus();
                    });
                }
            }
        }
    })
    .directive('inputMask', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.mask(attr.inputMask);
            }
        }
    })
    .directive('fileInput', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.ace_file_input({
                    no_file: 'No File ...',
                    btn_choose: 'Choose',
                    btn_change: 'Change',
                    droppable: false,
                    onchange: null,
                    thumbnail: false //| true | large
                    //whitelist:'gif|png|jpg|jpeg'
                    //blacklist:'exe|php'
                    //onchange:''
                    //
                });
            }
        }
    })
    .directive('wysiwygEditor', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                function showErrorAlert(reason, detail) {
                    var msg = '';
                    if (reason === 'unsupported-file-type') {
                        msg = "Unsupported format " + detail;
                    }
                    else {
                        //console.log("error uploading file", reason, detail);
                    }
                    $('<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>File upload error</strong>' + msg + '</div>').prependTo('#alerts');
                }

                element.ace_wysiwyg({
                    toolbar: [
                        'font',
                        null,
                        'fontSize',
                        null,
                        {name: 'bold', className: 'btn-info'},
                        {name: 'italic', className: 'btn-info'},
                        {name: 'strikethrough', className: 'btn-info'},
                        {name: 'underline', className: 'btn-info'},
                        null,
                        {name: 'insertunorderedlist', className: 'btn-success'},
                        {name: 'insertorderedlist', className: 'btn-success'},
                        {name: 'outdent', className: 'btn-purple'},
                        {name: 'indent', className: 'btn-purple'},
                        null,
                        {name: 'justifyleft', className: 'btn-primary'},
                        {name: 'justifycenter', className: 'btn-primary'},
                        {name: 'justifyright', className: 'btn-primary'},
                        {name: 'justifyfull', className: 'btn-inverse'},
                        null,
                        {name: 'createLink', className: 'btn-pink'},
                        {name: 'unlink', className: 'btn-pink'},
                        null,
                        {name: 'insertImage', className: 'btn-success'},
                        null,
                        'foreColor',
                        null,
                        {name: 'undo', className: 'btn-grey'},
                        {name: 'redo', className: 'btn-grey'}
                    ],
                    'wysiwyg': {
                        fileUploadError: showErrorAlert
                    }
                }).prev().addClass('wysiwyg-style2');

                $('[data-toggle="buttons"] .btn').on('click', function (e) {
                    var target = $(this).find('input[type=radio]');
                    var which = parseInt(target.val());
                    var toolbar = $('#editor1').prev().get(0);
                    if (which >= 1 && which <= 4) {
                        toolbar.className = toolbar.className.replace(/wysiwyg\-style(1|2)/g, '');
                        if (which == 1) $(toolbar).addClass('wysiwyg-style1');
                        else if (which == 2) $(toolbar).addClass('wysiwyg-style2');
                        if (which == 4) {
                            $(toolbar).find('.btn-group > .btn').addClass('btn-white btn-round');
                        } else $(toolbar).find('.btn-group > .btn-white').removeClass('btn-white btn-round');
                    }
                });
            }
        }
    });