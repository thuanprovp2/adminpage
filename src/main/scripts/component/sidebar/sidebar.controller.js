/**
 * Created by lequanghiep on 1/21/2017.
 */
'use strict';

angular.module('myApp')
    .controller('SidebarController', function ($rootScope, $scope, $state, $timeout) {
        $scope.state = {
            name: $state.current.name,
            url: window.location.hash
        };

        $rootScope.$on('$stateChangeSuccess', function () {
            $scope.state.name = $state.current.name;
            $timeout(function () {
                $scope.state.url = window.location.hash;
            }, 0);
        });
    });