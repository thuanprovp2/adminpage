/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('ProductService', function ($http, API_URL) {
        var product = 'list';

        return {
            fetchAllProduct: fetchAllProduct,
            fetchAllCategory:fetchAllCategory,
            saveProduct: saveProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct
        };

        function fetchAllProduct() {
            return $http.get([API_URL, product, '/fetch'].join(''));
        }

        function deleteProduct(data) {
            return $http.get([API_URL, 'product/delete?id=',data].join(''));
        }

        function saveProduct(data) {
            return $http.post([API_URL, 'product/create'].join(''), data);
        }

        function updateProduct(data) {
            return $http.post([API_URL, 'product/update'].join(''), data);
        }
        function fetchAllCategory() {
            return $http.get([API_URL, 'category/fetch'].join(''));
        }
    });