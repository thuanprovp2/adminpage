/**
 * Created by thuan on 11/25/2017.
 */
angular.module('myApp')
    .factory('RoleService', function ($http, API_URL) {
        var role = 'list';

        return {
            fetchAllRole: fetchAllRole,
            saveRole: saveRole,
            updateRole: updateRole,
            deleteRole: deleteRole
        };

        function fetchAllRole() {
            return $http.get([API_URL, role, '/fetch'].join(''));
        }

        function deleteRole(data) {
            return $http.get([API_URL, 'role/delete?id=',data].join(''));
        }

        function saveRole(data) {
            return $http.post([API_URL, 'role/create'].join(''), data);
        }

        function updateRole(data) {
            return $http.post([API_URL, 'role/update'].join(''), data);
        }
    });