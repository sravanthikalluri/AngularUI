/**
 * Description: This is controller is used to display the Affordable care Act page
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.controller('affordableCareActCtrl', ['$scope', 'gso',
    function ($scope, gso) {

        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.companyCode = gso.getAppConfig().companyId;

        $scope.affordableCareActData = gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'policies?type=affordablecareact', null,
        //$scope.affordableCareActData = gso.getCrudService().execute(constants.get, "assets/data/benefits/affordableCareAct.json", null,
            function (response) {
                $scope.affordableCareActData = response;
                $scope.ACAStatusData = $scope.affordableCareActData.acaLargeEmployerStatus;
                $scope.equifaxData = $scope.affordableCareActData.equiFaxPDF;
                $scope.ACAUploadData = $scope.affordableCareActData.acaHistoricalUpload;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    }]);
