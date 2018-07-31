'use strict';
trinetApp.directive('alertView',
    function () {
        return {
            restrict: 'AE',
            templateUrl: 'app/shared/views/alertView.html'
        };
    });