'use strict';

trinetApp.directive('holidayCalendarWidget', function() {
    return {
        restrict : 'E',
        scope : false,
        templateUrl : 'app/shared/views/holidayCalendarWidget.html'
    };
 });