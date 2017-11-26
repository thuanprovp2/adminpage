angular.module('myApp')
    .controller('ArticleController', function ($scope, DataTable, Button, API_URL, Dialog, ArticleService) {
        $scope.status = {
            step: 1,
            select: [
                {name: 'Not set', value: 'noteset'},
                {name: 'True', value: "True"},
                {name: 'False', value: "False"}
            ]
        };
        $scope.article = {};

        $scope.changeView = function changeView(param) {
            $scope.status.step = param === 'back' ? $scope.status.step - 1 : $scope.status.step + 1;
            if (param === 'back') {
                $scope.article = {};
            }
        };

        $scope.saveArticle = function saveArticle() {
            var method = $scope.article._id ? ArticleService.updateArticle : ArticleService.saveArticle;
            method.call(null, $scope.article)
                .then(Dialog.onSuccess.bind(null, 'Success', 'Save article success', $scope.changeView.bind(null, 'back')))
                .catch(Dialog.onFailure.bind(null, 'Fail', 'Save article fail', null));
        };

        var reloadListArticle = function reloadListArticle() {
            angular.element(document.querySelector('#articleDataTable')).DataTable().ajax.reload(null, false);
        };

        $scope.deleteArticle = function deleteArticle(data) {
            Dialog.deleteDialog('Do you want delete this article?', ArticleService.deleteArticle.bind(null,data._id)
                , reloadListArticle.bind(null));
        };

        $scope.edit = function (data) {
            $scope.$apply(function () {
                $scope.changeView();
                $scope.article = data;
            });
        };

        var loadArticleList = function loadArticleList() {
            var options = {
                url: [API_URL, 'article/fetch'].join(''),
                columns: [
                    {'title': 'ID', 'data': null},
                    {'title': 'Title', 'data': 'title'},
                    {'title': 'Description', 'data': 'description'},
                    {'title': 'Image', 'data': 'image'},
                    {'title': 'Action'}
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
                        "targets": -2
                    }
                ]

            };

            options.delete = function (data) {
                $scope.deleteArticle(data);
            };
            options.edit = function (data) {
                $scope.edit(data);
            };
            DataTable.generateDataTable(options, angular.element(document.querySelector('#articleDataTable')));
        };

        $scope.$on('$includeContentLoaded', function (obj, url) {
            if (url === 'scripts/article/article.list.template.html') {
                loadArticleList();
            }
        });
    });