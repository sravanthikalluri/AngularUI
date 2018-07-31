'use strict';
trinetApp.directive('tilesList', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: "app/shared/views/policyTileTemplate.html"
    };
});