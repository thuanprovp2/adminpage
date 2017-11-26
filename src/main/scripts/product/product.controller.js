/**
 * Created by lequanghiep on 1/16/2017.
 */
'use strict';

angular.module('myApp')
    .controller('ProductController', function ($scope, $stateParams, StringUtils, API_URL, Button, DateUtils
        , DataTable, Dialog, ProductService) {
        $scope.status = {
            step: 1,
            type: $stateParams.type
        };
        $scope.title = $scope.status.type === 'available' ? 'Available' : 'Non Available';
        $scope.product = {};

        ProductService.fetchAllCategory()
            .then(function (response) {
                $scope.categories = response.data;
            })
            .catch(function (err) {
                alert('Load category that bai' + {message: err});
            });

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.product = {};
            }
        };

        $scope.saveProduct = function saveProduct() {
            var method = $scope.product._id ? ProductService.updateProduct : ProductService.saveProduct;
            method.call(null, $scope.product)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save product success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Please fill full information', null));
        };

        var reloadListProduct = function reloadListProduct() {
            angular.element(document.querySelector('#productDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteProduct = function deleteProduct(data) {
            Dialog.deleteDialog('Do you want delete this product?', ProductService.deleteProduct.bind(null, data._id)
                , reloadListProduct.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.product = data;
            });
        };

        var loadProductsList = function loadProductsList() {
            var options = {
                url: [API_URL, 'product/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'name'},
                    {'title': 'Description', 'data': 'description'},
                    {'title': 'Price', 'data': 'price'},
                    {'title': 'Quantity', 'data': 'quantity'},
                    {'title': 'Image url', 'data': 'image'},
                    {'title': 'Category Name', 'data': 'category.name'},
                    {'': ''}
                ],
                columnDefs: [
                    {
                        "render": function () {
                            return Button.groupButton([Button.editButton(), Button.deleteButton()]);
                        },
                        "targets": -1
                    },
                    {
                        "render": function (data) {
                            var className = data === 'True' ? 'label-success' : 'label-danger';
                            return ['<span class="label label-sm ', className, '">', data, '</span>'].join('');
                        },
                        "targets": -3
                    }
                ]
            };

            options.delete = function (data) {
                $scope.deleteProduct(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#productDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/product/product.list.template.html') {
                loadProductsList();
            }
        });
    });