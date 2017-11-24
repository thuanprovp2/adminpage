/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('SettingController', function ($scope) {
        $scope.status = {
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };
    });