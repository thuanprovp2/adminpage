/**
 * Created by lequanghiep on 1/21/2017.
 */
'use strict';

angular.module('myApp')
    .factory('Dialog', function () {
        return {
            showDialog: showDialog,
            deleteDialog: deleteDialog,
            onSuccess: onSuccess,
            onFailure: onFailure
        };

        function onSuccess(title, content, callbackSuccess) {
            swal(title, content, "success");
            callbackSuccess.call(null);
        }

        function onFailure(title, content) {
            swal(title, content, "error");
        }

        function showDialog(title, content, type, messageSuccess, messageFailure, callback, callbackSuccess) {
            swal({
                    title: title,
                    text: content,
                    type: type,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        callback = callback || angular.noop;
                        callback.call(null)
                            .then(onSuccess.bind(this, 'Success', messageSuccess, callbackSuccess))
                            .catch(onFailure.bind(this, 'Failure', messageFailure));
                    }
                });
        }

        function deleteDialog(message, callback, callbackSuccess) {
            showDialog('Delete confirm', message, 'warning', 'Delete success', 'Delete fail', callback, callbackSuccess);
            $("button.cancel").before($("button.confirm"));
        }
    });