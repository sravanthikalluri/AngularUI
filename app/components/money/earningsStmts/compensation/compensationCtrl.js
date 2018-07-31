/**
 * Created by ganesh on 2/22/2016.
 */
'use strict';
trinetApp.controller('compensationCtrl', ['$scope',
    function ($scope) {
        $scope.enableYearPeriodType = true;
        $scope.compensationDataForm = {};
        $scope.compensationDataForm.reportType = "html";
        $scope.compensationDataForm.periodType = "custom";
        $scope.years = [
            {name: '2016', value: '2016'},
            {name: '2015', value: '2015'},
            {name: '2014', value: '2014'},
            {name: '2013', value: '2013'}
        ];
        $scope.compensationDataForm.year = $scope.years[0];

        /**
         * toggle period type method
         */
        $scope.togglePeriodType = function () {
            $scope.enableYearPeriodType = !$scope.enableYearPeriodType;
            $scope.compensationDataForm.fromDate = null;
            $scope.compensationDataForm.toDate = null;
            $scope.compensationDataForm.year = null;

        };

        $scope.viewReport = function () {

        };
    }]);