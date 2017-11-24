/**
 * Created by lequanghiep on 1/20/2017.
 */
'use strict';

angular.module('myApp')
    .factory('SettingService', function ($http, API_URL) {
        var setting = 'list';

        return {
            updateSetting: updateSetting
        };

        function updateSetting(data) {
            return $http.post([API_URL, 'save'].join(''), data);
        }
    });