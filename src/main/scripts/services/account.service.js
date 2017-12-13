/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('AccountService', function ($http, API_URL) {
        var user = 'list';

        return {
            fetchAllUser: fetchAllUser,
            fetchAllRole:fetchAllRole,
            saveAccount: saveAccount,
            updateAccount: updateAccount,
            deleteAccount: deleteAccount
        };

        function fetchAllUser() {
            return $http.get([API_URL, user, '/fetch'].join(''));
        }

        function deleteAccount(data) {
            return $http.get([API_URL, 'user/delete?id=',data].join(''));
        }

        function saveAccount(data) {
            console.log(data);
            return $http.post([API_URL, 'user/create'].join(''), data);
        }

        function updateAccount(data) {
            return $http.post([API_URL, 'user/update'].join(''), data);
        }
        function fetchAllRole() {
            return $http.get([API_URL, 'role/fetch'].join(''));
        }

    });