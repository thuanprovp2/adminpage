'use strict';

angular.module('myApp', ['ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('site', {
                views: {
                    'navbar@': {
                        templateUrl: 'scripts/component/navbar/navbar.html'
                    },
                    'sidebar@': {
                        templateUrl: 'scripts/component/sidebar/sidebar.html',
                        controller: 'SidebarController'
                    },
                    'footer@': {
                        templateUrl: 'scripts/component/footer/footer.html'
                    }
                }
            });
    })
    .run(function ($rootScope) {
        $rootScope.message = 'My name is rootScope';
    });
