/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('setting', {
                parent: 'site',
                url: '/setting',
                views: {
                    'content@': {
                        templateUrl: 'scripts/setting/setting.html',
                        controller: 'SettingController'
                    }
                }
            });
    });