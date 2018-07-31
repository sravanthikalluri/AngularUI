'use strict';
trinetApp.directive('noRecords',
    function () {
        return {
            scope: {
                errorAlert : '=',
                noRecordsAlert: '='
            },
            restrict: 'AE',
            templateUrl: 'app/shared/views/noRecordMessage.html'
        };
    });
