/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('ClassController', function ($scope, DataTable, Button, API_URL, DateUtils, AccountService
        , CategoryService, ClassService, Dialog) {
        $scope.status = {
            step: 1,
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };
        $scope.class = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.class = {};
            }
            if (param === 'create') {
                $scope.fetchListTeacher();
                $scope.fetchListCategories();
            }
        };

        $scope.saveClass = function saveClass() {
            var method = $scope.class.id ? ClassService.updateClass : ClassService.saveClass;
            method.call(null, $scope.class)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save class success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save class fail', null));
        };

        var reloadListClass = function reloadListClass() {
            angular.element(document.querySelector('#classDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteClass = function deleteClass(id) {
            Dialog.deleteDialog('Do you want delete this class?', ClassService.deleteClass.bind(null, id)
                , reloadListClass.bind(null));
        };

        $scope.fetchListTeacher = function fetchListTeacher() {
            AccountService.fetchAllTeacher().then(onFetchListTeachersSuccess.bind(null));
        };

        var onFetchListTeachersSuccess = function onFetchListTeachersSuccess(res) {
            $scope.teachers = res.data || [];
        };

        $scope.fetchListCategories = function fetchListCategories() {
            CategoryService.fetchAllCategories().then(onFetchListCategoriesSuccess.bind(null));
        };

        var onFetchListCategoriesSuccess = function onFetchListCategoriesSuccess(res) {
            $scope.categories = res.data || [];
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.fetchListTeacher();
                $scope.fetchListCategories();
                $scope.class = data;
                $scope.class.startDate = DateUtils.convertMilToDate($scope.class.startDate);
                $scope.class.endDate = DateUtils.convertMilToDate($scope.class.endDate);
            });
        };

        var loadClassesList = function loadClassesList() {
            var options = {
                url: [API_URL, 'class/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'name'},
                    {'title': 'Code', 'data': 'code'},
                    {'title': 'Start Date', 'data': 'startDate'},
                    {'title': 'End Date', 'data': 'endDate'},
                    {'title': 'Semester', 'data': 'semester'},
                    {'title': 'Class Year', 'data': 'classYear'},
                    {'title': 'Status', 'data': 'status'},
                    {'title': 'Email', 'data': 'email'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function (data) {
                            return DateUtils.convertMilToDate(data);
                        },
                        "targets": 3
                    },
                    {
                        "render": function (data) {
                            return DateUtils.convertMilToDate(data);
                        },
                        "targets": 4
                    },
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
                        "targets": -3
                    }
                ]
            };

            options.delete = function (data) {
                $scope.deleteClass(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#classDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/class/class.list.template.html') {
                loadClassesList();
            }
        });
    });