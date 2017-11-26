/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article', {
                parent: 'site',
                url: '/article',
                views: {
                    'content@': {
                        templateUrl: 'scripts/article/article.html',
                        controller: 'ArticleController'
                    }
                }
            });
    });