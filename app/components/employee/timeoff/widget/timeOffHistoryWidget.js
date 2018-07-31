'use strict';

trinetApp.directive('timeOffHistoryWidget', function (gso) {
    return {
        restrict: 'E',
        scope: {
            accruableLeaves: '=data',
            translation: "=translation",
        },
        controller: function ($scope) {
            $scope.showTimeOffChart = function (accruableLeaves) {
                return accruableLeaves && accruableLeaves.length > 0;
            };

            // chart data
            $scope.getRoundedTotalHours = function (accrual) {
                return Math.floor($scope.getTotalHours(accrual));
            };

            $scope.getRoundedHoursLeft = function (accrual) {
                return Math.floor($scope.getHoursLeft(accrual));
            };

            $scope.getTotalHours = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                var total = lastAccrual.balanceHrs + lastAccrual.hrsTakenYTD + lastAccrual.carryoverHrs - lastAccrual.hrsAdjustedYTD;
                return total | 0;
            };

            $scope.getHoursLeft = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                return lastAccrual.balanceHrs;
            };

            $scope.getAccrued = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                return lastAccrual.hrsEarnedYTD + lastAccrual.carryoverHrs;
            };

            $scope.getTaken = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                return lastAccrual.hrsTakenYTD - lastAccrual.hrsAdjustedYTD;
            };

            $scope.showAccrualRate = function (accrual) {
                // we don't have 'accrualRate' in the payload
                return false;
            }

            $scope.showMaximumBalance = function (accrual) {
                // we don't have 'accrualCap' in the payload
                return false;
            }

            $scope.getAccrualRate = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                return lastAccrual.accrualRate;
            };

            $scope.getMaximumBalance = function (accrual) {
                var lastAccrual = accrual.accrualList[0];
                return lastAccrual.accrualCap;
            };

            $scope.formatNumber = function (number) {
                return Number(Math.floor(number * 100) / 100).toFixed(2);
            };

        },
        templateUrl: 'app/components/employee/timeoff/widget/timeOffHistoryWidget.html'
    };
});
