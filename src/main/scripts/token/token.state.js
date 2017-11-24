/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('token', {
                parent: 'site',
                url: '/token/{type}',
                views: {
                    'content@': {
                        templateUrl: 'scripts/token/token.html',
                        controller: 'TokenController'
                    }
                }
            });
    });