/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('AccountService', function ($http, API_URL) {
        var account = 'list';

        return {
            fetchAllTeacher: fetchAllTeacher,
            saveAccount: saveAccount,
            updateAccount: updateAccount,
            deleteAccount: deleteAccount
        };

        function fetchAllTeacher() {
            return $http.get([API_URL, account, '/fetch/all'].join(''));
        }

        function deleteAccount() {
            return $http.get([API_URL, 'delete'].join(''));
        }

        function saveAccount(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }

        function updateAccount(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }
    });