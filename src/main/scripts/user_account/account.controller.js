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
        $scope.user = {};
        AccountService.fetchAllRole()
            .then(function (response) {
                $scope.roles = response.data.data;
            })
            .catch(function (err) {
                alert('Load role that bai' + {message: err});
            });

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.user = {};
                $scope.disableFormRole = false;
            }
        };

        $scope.saveAccount = function saveAccount() {
            var method = $scope.user._id ? AccountService.updateAccount : AccountService.saveAccount;
            method.call(null, $scope.user)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save account success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Please full fill information', null));
        };

        var reloadListAccount = function reloadListAccount() {
            angular.element(document.querySelector('#accountDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteAccount = function deleteAccount(data) {
            Dialog.deleteDialog('Do you want delete this class?', AccountService.deleteAccount.bind(null, data._id)
                , reloadListAccount.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.user = data;
                $scope.changeView();
                $scope.disableFormRole = true;
            });
        };

        var loadAccountsList = function loadAccountsList() {
            var options = {
                url: [API_URL, 'user/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'name'},
                    {'title': 'Username', 'data': 'username'},
                    {'title': 'Address', 'data': 'address'},
                    {'title': 'Phone', 'data': 'phone'},
                    {'title': 'Email', 'data': 'email'},
                    {'title': 'Sex', 'data': 'sex'},
                    {'title': 'Name', 'data': 'role.name'},
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