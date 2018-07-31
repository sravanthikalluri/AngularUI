'use strict';
trinetApp.directive('linksList', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: "app/shared/views/hyperlinkTemplate.html"
    };
});