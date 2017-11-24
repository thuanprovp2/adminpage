/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('language', {
                parent: 'site',
                url: '/language',
                views: {
                    'content@': {
                        templateUrl: 'scripts/language/language.html',
                        controller: 'LanguageController'
                    }
                }
            });
    });