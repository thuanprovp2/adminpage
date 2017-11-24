/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('ProblemController', function ($scope, API_URL, DataTable, Button, CategoryService) {
        $scope.status = {
            step: 1,
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            $scope.status.action = param;
            if (param === 'create') {
                $scope.fetchListCategories();
            }
            else if (param === 'back') {
                $scope.problem = {};
            }
        };

        $scope.view = function () {
            $scope.$apply(function () {
                $scope.changeView();
            });
        };

        $scope.fetchListCategories = function fetchListCategories() {
            CategoryService.fetchAllCategories().then(onFetchListCategoriesSuccess.bind(null));
        };

        var onFetchListCategoriesSuccess = function onFetchListCategoriesSuccess(res) {
            $scope.categories = res.data || [];
        };

        var loadCategoryList = function loadCategoryList() {
            var options = {
                url: [API_URL, 'category/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Category', 'data': 'name'},
                    {'title': 'Status', 'data': 'status'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function () {
                            return Button.groupButton([Button.viewButton()]);
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

            options.view = function (data) {
                $scope.view(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#categoryDataTable')));
        };

        var loadProblemList = function loadProblemList() {
            var options = {
                url: [API_URL, 'problem/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Problem', 'data': 'problem'},
                    {'title': 'Status', 'data': 'status'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function () {
                            return Button.groupButton([Button.viewButton()]);
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

            options.view = function (data) {
                $scope.view(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#problemDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/problem/problem.category.list.template.html') {
                loadCategoryList();
            }
            else if (url === 'scripts/problem/problem.list.template.html') {
                loadProblemList();
            }
        });
    });