/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account', {
                parent: 'site',
                url: '/account/{type}',
                views: {
                    'content@': {
                        templateUrl: 'scripts/user_account/account.html',
                        controller: 'AccountController'
                    }
                }
            });
    });