/**
 * Created by lequanghiep on 1/20/2017.
 */
angular.module('myApp')
    .factory('StringUtils', function () {
        return {
            capitalize: capitalize
        };

        function capitalize(word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    });