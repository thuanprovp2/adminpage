/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('class', {
                parent: 'site',
                url: '/class',
                views: {
                    'content@': {
                        templateUrl: 'scripts/class/class.html',
                        controller: 'ClassController'
                    }
                }
            });
    });