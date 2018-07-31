'use strict';

trinetApp.directive('timeOffWidget', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/shared/views/timeOffWidget.html'
    };
});
