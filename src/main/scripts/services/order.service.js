/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('OrderService', function ($http, API_URL) {
        var order = 'list';

        return {
            fetchAllOrder: fetchAllOrder,
            fetchAllCategory:fetchAllCategory,
            saveOrder: saveOrder,
            updateOrder: updateOrder,
            deleteOrder: deleteOrder,
            fetchAllRole:fetchAllRole
        };

        function fetchAllOrder() {
            return $http.get([API_URL, order, '/fetch'].join(''));
        }

        function deleteOrder(data) {
            return $http.get([API_URL, 'order/delete?id=',data].join(''));
        }

        function saveOrder(data) {
            return $http.post([API_URL, 'order/create'].join(''), data);
        }

        function updateOrder(data) {
            return $http.post([API_URL, 'order/update'].join(''), data);
        }
        function fetchAllRole() {
            return $http.get([API_URL, 'role/fetch'].join(''));
        }
        function fetchAllCategory() {
            return $http.get([API_URL, 'category/fetch'].join(''));
        }
    });