/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('TokenController', function ($scope, $stateParams, StringUtils, API_URL, Button, DateUtils
        , DataTable, Dialog, TokenService) {
        $scope.status = {
            step: 1,
            type: $stateParams.type
        };
        $scope.title = $scope.status.type === 'available' ? 'Available' : 'Non Available';
        $scope.token = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.token = {};
            }
        };

        $scope.saveToken = function saveToken() {
            var method = $scope.token.id ? TokenService.updateToken : TokenService.saveToken;
            method.call(null, $scope.token)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save token success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save token fail', null));
        };

        var reloadListToken = function reloadListToken() {
            angular.element(document.querySelector('#tokenDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteToken = function deleteToken(id) {
            Dialog.deleteDialog('Do you want delete this token?', TokenService.deleteToken.bind(null, id)
                , reloadListToken.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.token = data;
            });
        };

        var loadTokensList = function loadTokensList() {
            var options = {
                url: [API_URL, 'token/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Token Key', 'data': 'tokenKey'},
                    {'title': 'Created Date', 'data': 'createdDate'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function () {
                            return Button.groupButton([Button.deleteButton()]);
                        },
                        "targets": -1
                    },
                    {
                        "render": function (data) {
                            return DateUtils.convertMilToDate(data);
                        },
                        "targets": -2
                    }
                ]
            };

            options.delete = function (data) {
                $scope.deleteToken(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#tokenDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/token/token.list.template.html') {
                loadTokensList();
            }
        });
    });