angular.module('myApp')
    .controller('OrderController', function ($scope, $stateParams, StringUtils, API_URL, Button, DateUtils
        , DataTable, Dialog, OrderService) {
        $scope.status = {
            step: 1,
            type: $stateParams.type
        };
        $scope.title = $scope.status.type === 'available' ? 'Available' : 'Non Available';
        $scope.order = {};

        OrderService.fetchAllCategory()
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

        $scope.saveOrder = function saveOrder() {
            var method = $scope.order._id ? OrderService.updateOrder : OrderService.saveOrder;
            method.call(null, $scope.order)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save order success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Please fill full information', null));
        };

        var reloadListOrder = function reloadListOrder() {
            angular.element(document.querySelector('#orderDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteOrder = function deleteOrder(data) {
            Dialog.deleteDialog('Do you want delete this order?', OrderService.deleteOrder.bind(null, data._id)
                , reloadListOrder.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.order = data;
            });
        };

        var loadOrdersList = function loadOrdersList() {
            var options = {
                url: [API_URL, 'order/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Name', 'data': 'user.name'},
                    {'title': 'Address', 'data': 'user.address'},
                    {'title': 'Phone', 'data': 'user.phone'},
                    {'title': 'Email', 'data': 'user.email'},
                    {'title': 'Sex', 'data': 'user.sex'},
                    {'title': 'Product Name', 'data': 'product.name'},
                    {'title': 'Quantity', 'data': 'product.quantity'},
                    {'title': 'Price', 'data': 'product.price'},
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
                $scope.deleteOrder(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#orderDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/order/order.list.template.html') {
                loadOrdersList();
            }
        });
    });