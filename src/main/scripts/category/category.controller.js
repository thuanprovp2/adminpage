/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('CategoryController', function ($scope, DataTable, Button, API_URL, Dialog, CategoryService) {
        $scope.status = {
            step: 1,
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };
        $scope.category = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.category = {};
            }
        };

        $scope.saveCategory = function saveCategory() {
            var method = $scope.category._id ? CategoryService.updateCategory : CategoryService.saveCategory;
            method.call(null, $scope.category)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save category success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save category fail', null));
        };

        var reloadListCategory = function reloadListCategory() {
            angular.element(document.querySelector('#categoryDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteCategory = function deleteCategory(data) {
            Dialog.deleteDialog('Do you want delete this category?', CategoryService.deleteCategory.bind(null,data._id)
                , reloadListCategory.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.category = data;
            });
        };

        var loadCategoriesList = function loadCategoriesList() {
            var options = {
                url: [API_URL, 'category/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'name'},
                    {'title': 'Type', 'data': 'type'},
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
                $scope.deleteCategory(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#categoryDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/category/category.list.template.html') {
                loadCategoriesList();
            }
        });
    });