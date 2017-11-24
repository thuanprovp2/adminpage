/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('CategoryService', function ($http, API_URL) {
        var category = 'list';

        return {
            fetchAllCategories: fetchAllCategories,
            saveCategory: saveCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory
        };

        function fetchAllCategories() {
            return $http.get([API_URL, category, '/fetch'].join(''));
        }

        function deleteCategory(data) {
            return $http.get([API_URL, 'category/delete?id=',data].join(''));
        }

        function saveCategory(data) {
            return $http.post([API_URL, 'category/create'].join(''), data);
        }

        function updateCategory(data) {
            console.log(data);
            return $http.post([API_URL, 'category/update'].join(''), data);
        }
    });