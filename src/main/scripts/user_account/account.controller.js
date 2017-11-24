/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('AccountController', function ($scope, $stateParams, StringUtils, API_URL, Button, DateUtils
        , DataTable, Dialog, AccountService) {
        $scope.status = {
            step: 1,
            type: $stateParams.type
        };
        $scope.title = StringUtils.capitalize($scope.status.type);
        $scope.account = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.account = {};
            }
        };

        $scope.saveAccount = function saveAccount() {
            var method = $scope.account.id ? AccountService.updateAccount : AccountService.saveAccount;
            method.call(null, $scope.account)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save account success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save account fail', null));
        };

        var reloadListAccount = function reloadListAccount() {
            angular.element(document.querySelector('#accountDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteAccount = function deleteAccount(id) {
            Dialog.deleteDialog('Do you want delete this class?', AccountService.deleteAccount.bind(null, id)
                , reloadListAccount.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.account = data;
                $scope.account.dateOfBirth = DateUtils.convertMilToDate($scope.account.dateOfBirth);
            });
        };

        var loadAccountsList = function loadAccountsList() {
            var options = {
                url: [API_URL, 'account/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'name'},
                    {'title': 'Username', 'data': 'username'},
                    {'title': 'Address', 'data': 'address'},
                    {'title': 'Phone', 'data': 'phone'},
                    {'title': 'Email', 'data': 'email'},
                    {'title': 'Sex', 'data': 'sex'},
                    {'title': 'Role Id', 'data': 'roleId'},
                    {'title': 'Name', 'data': 'name'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function () {
                            return Button.groupButton([Button.editButton(), Button.deleteButton()]);
                        },
                        "targets": -1
                    },
                    {
                        "render": function (data) {
                            return DateUtils.convertMilToDate(data);
                        },
                        "targets": -3
                    }
                ]
            };

            options.delete = function (data) {
                $scope.deleteAccount(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#accountDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/user_account/account.list.template.html') {
                loadAccountsList();
            }
        });
    });