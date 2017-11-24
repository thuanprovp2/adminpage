/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('ScoreboardController', function ($scope, API_URL, DataTable) {
        var loadScoreboardList = function loadScoreboardList() {
            var options = {
                url: [API_URL, 'scoreboard/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Code', 'data': 'code'},
                    {'title': 'Status', 'data': 'status'},
                    {'title': 'Point', 'data': 'point'},
                    {'title': 'Time', 'data': 'time'}
                ],
                columnDefs: [
                    {
                        "render": function (data) {
                            return [data, 's'].join('');
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
            DataTable.generateDataTable(options, angular.element(document.querySelector('#scoreboardDataTable')));
        };

        loadScoreboardList();
    });