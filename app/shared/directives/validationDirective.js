'use strict';
trinetApp.directive('validation',
    function () {
        return {
            restrict: 'AE',
            scope: {
                condition: "=",
                msg: "@"
            },
            controller: function ($scope, $element) {
                $scope.change = function () {
                    $scope.condition = false;
                    if ($element.next().children().hasClass('ng-show')) {
                        $element.next().children().removeClass('ng-show');
                        $element.next().children().addClass('ng-hide');
                    }
                    if (!$scope.condition) {
                        var $previousPanel = $element.prev();
                    }

                };
                $element.bind('blur', function () {
                    if ($element.hasClass('ng-valid')) {
                        $element.removeClass('error-warning');

                        if ($element.next().children().hasClass('ng-show')) {
                            $element.next().children().removeClass('ng-show');
                            $element.next().children().addClass('ng-hide');
                        }

                    }

                });
            },
            templateUrl: 'app/shared/views/validation.html'
        };
    });
