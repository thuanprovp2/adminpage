/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard', {
                parent: 'site',
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'scripts/dashboard/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            });
    });