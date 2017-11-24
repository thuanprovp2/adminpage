/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('ClassService', function ($http, API_URL) {
        var classUrl = 'list';

        return {
            saveClass: saveClass,
            updateClass: updateClass,
            deleteClass: deleteClass
        };

        function deleteClass() {
            return $http.get([API_URL, 'delete'].join(''));
        }
        
        function saveClass(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }

        function updateClass(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }
    });