/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('category', {
                parent: 'site',
                url: '/category',
                views: {
                    'content@': {
                        templateUrl: 'scripts/category/category.html',
                        controller: 'CategoryController'
                    }
                }
            });
    });