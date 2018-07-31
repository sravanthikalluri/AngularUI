'use strict';
trinetApp.directive('menuList', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: "app/components/menu/menu.html"
    };
});