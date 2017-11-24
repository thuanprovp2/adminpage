/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('problem', {
                parent: 'site',
                url: '/problem',
                views: {
                    'content@': {
                        templateUrl: 'scripts/problem/problem.html',
                        controller: 'ProblemController'
                    }
                }
            });
    });