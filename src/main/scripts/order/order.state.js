/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('setting', {
                parent: 'site',
                url: '/order',
                views: {
                    'content@': {
                        templateUrl: 'scripts/order/order.html',
                        controller: 'OrderController'
                    }
                }
            });
    });