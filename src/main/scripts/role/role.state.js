/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('role', {
                parent: 'site',
                url: '/role',
                views: {
                    'content@': {
                        templateUrl: 'scripts/role/role.html',
                        controller: 'RoleController'
                    }
                }
            });
    });