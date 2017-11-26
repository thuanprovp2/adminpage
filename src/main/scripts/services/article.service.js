/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('ArticleService', function ($http, API_URL) {
        var article = 'list';

        return {
            fetchAllArticle: fetchAllArticle,
            saveArticle: saveArticle,
            updateArticle: updateArticle,
            deleteArticle: deleteArticle
        };

        function fetchAllArticle() {
            return $http.get([API_URL, article, 'article/fetch'].join(''));
        }

        function deleteArticle(data) {
            return $http.get([API_URL, 'article/delete?id=',data].join(''));
        }

        function saveArticle(data) {
            return $http.post([API_URL, 'article/create'].join(''), data);
        }

        function updateArticle(data) {
            return $http.post([API_URL, 'article/update'].join(''), data);
        }
    });