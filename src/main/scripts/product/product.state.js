/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('product', {
                parent: 'site',
                url: '/product',
                views: {
                    'content@': {
                        templateUrl: 'scripts/product/product.html',
                        controller: 'ProductController'
                    }
                }
            });
    });