/**
 * Created by lequanghiep on 1/20/2017.
 */
angular.module('myApp')
    .factory('DateUtils', function ($filter) {
        var dateFormat = 'dd/MM/yyyy';
        var dateTimeFormat = 'dd/MM/yyyy HH:mm:ss';
        var timeZone = '+7';
        return {
            convertMilToDateTime: convertMilToDateTime,
            convertMilToDate: convertMilToDate,
            convertDateToMil: convertDateToMil
        };

        function convertMilToDateTime(data) {
            return $filter('date')(data, dateTimeFormat, timeZone);
        }

        function convertMilToDate(data) {
            return $filter('date')(data, dateFormat, timeZone);
        }

        function convertDateToMil(data) {
            return (new Date(data)).getTime();
        }
    });