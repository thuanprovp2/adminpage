/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('TokenService', function ($http, API_URL) {
        var token = 'list';

        return {
            saveToken: saveToken,
            updateToken: updateToken,
            deleteToken: deleteToken
        };

        function deleteToken() {
            return $http.get([API_URL, 'delete'].join(''));
        }

        function saveToken(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }

        function updateToken(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }
    });