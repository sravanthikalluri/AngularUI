/*
 * Program Description / functionality: To Fetch Weekly Custom list of Plans Information.
 */
'use strict';
trinetApp.controller('executiveCtrl', ['$scope', 'gso','SharedDataService',
    function ($scope, gso,SharedDataService) {
        $scope.planCode = SharedDataService.getAppSharedData().planCode;
        $scope.planKey = SharedDataService.getAppSharedData().planKey;
        $scope.planType = SharedDataService.getAppSharedData().planType;
        $scope.fromDate = SharedDataService.getAppSharedData().fromDate;
        $scope.toDate = SharedDataService.getAppSharedData().toDate;
        $scope.fetchData = null;
        $scope.dateList = {};
        $scope.fetchData = function (planCode, planKey, planType) {
            /**
             *  getting plan start date & quarter start [Begin]
             */
           var type = null;
             if (planType === 'cop') {
                type = "custom";
             }
             else if (planType === 'soap') {
                type = "all";
             }
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan +
                   '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plan-details?type=' + type + '&benefitPlanId=' + planCode + '&payFrequency=' + planKey + '&startDate=' + $scope.fromDate + '&endDate=' + $scope.toDate, null,
                   function (response) {
                       $scope.executiveData = response;
                   },
                   function (data) {
                       $scope.errorAlert = data;
                   }
            );
            SharedDataService.getAppSharedData().planCode=null
            SharedDataService.getAppSharedData().planKey=null
            SharedDataService.getAppSharedData().planType=null
        };

        if ($scope.planCode !== null && $scope.planKey !== null && $scope.planType !== null) {
            $scope.fetchData($scope.planCode, $scope.planKey, $scope.planType);
        }
    }]);
