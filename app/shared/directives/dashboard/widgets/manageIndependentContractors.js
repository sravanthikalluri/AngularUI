'use strict';

trinetApp.directive('manageOnDemandWorkersWidget', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/shared/views/manageIndependentContractors.html'
    };
});
