'use strict';
trinetApp.directive('profileHeader',
    function () {
        return {
            restrict: 'AE',
            templateUrl: 'app/shared/views/headerView.html'
        };
    });