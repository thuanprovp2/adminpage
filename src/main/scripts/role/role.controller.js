/**
 * Created by thuan on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('RoleController', function ($scope, DataTable, Button, API_URL, Dialog, RoleService) {
        $scope.status = {
            step: 1,
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };
        $scope.role = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.role = {};
            }
        };

        $scope.saveRole = function saveRole() {
            var method = $scope.role._id ? RoleService.updateRole : RoleService.saveRole;
            method.call(null, $scope.role)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save role success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save role fail', null));
        };

        var reloadListRole = function reloadListRole() {
            angular.element(document.querySelector('#roleDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteRole = function deleteRole(data) {
            Dialog.deleteDialog('Do you want delete this role?', RoleService.deleteRole.bind(null,data._id)
                , reloadListRole.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.role = data;
            });
        };

        var loadRoleList = function loadRoleList() {
            var options = {
                url: [API_URL, 'role/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Role', 'data': 'name'},
                    {'title': 'Action'}
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
                            var className = data === 'True' ? 'label-success' : 'label-danger';
                            return ['<span class="label label-sm ', className, '">', data, '</span>'].join('');
                        },
                        "targets": -2
                    }
                ]

            };

            options.delete = function (data) {
                $scope.deleteRole(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#roleDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/role/role.list.template.html') {
                loadRoleList();
            }
        });
    });