/**
 Description: This is controller used to do required operations for Money tab page
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('moneyCtrl', ['$scope',
    function ($scope) {
            $scope.$parent.isopen = true;
            $scope.estimateAlert = function (value, event) {
                $scope.errorAlert = null;
                var element = angular.element(event.target),
                    panelHeading = element.closest('div.panel-heading');
                if (value && panelHeading.length > 0) {
                    $scope.errorAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: $scope.translation.moneyTab.payroll_est
                    };
                    $scope.childParentAlertMsg($scope.errorAlert);
                }
            };

    }]);
