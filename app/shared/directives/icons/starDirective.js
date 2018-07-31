'use strict';
trinetApp.directive('buttonStar', function () {
    return {
        scope: {
            star: '=star'
        },
        restrict: 'E',
        template: '<button class="btn btn-icon no-bg no-border no-outline"><span class="glyphicon glyphicon-star" ng-class="{active: star}"></span></button>',
        link: function (scope, elem) {
            elem.bind('click', function () {
                scope.$apply(function () {
                    scope.star = !scope.star;
                });
            });
        }
    };
});
