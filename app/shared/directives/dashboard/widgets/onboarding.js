'use strict';

trinetApp.directive('onboardingWidget', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/shared/views/onboardingWidget.html'
    };
});