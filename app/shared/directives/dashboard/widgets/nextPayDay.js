'use strict';

trinetApp.directive('nextPayDayWidget', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/shared/views/nextPayDayWidget.html'
    };
});
