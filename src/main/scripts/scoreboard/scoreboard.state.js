/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('scoreboard', {
                parent: 'site',
                url: '/scoreboard',
                views: {
                    'content@': {
                        templateUrl: 'scripts/scoreboard/scoreboard.html',
                        controller: 'ScoreboardController'
                    }
                }
            });
    });