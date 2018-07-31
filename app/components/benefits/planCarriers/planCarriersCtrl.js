/**
 * Description: This is controller is used to fetch plan and carrier tile information
 * Author:Krishnam Raju Kollu
 */
'use strict';
trinetApp.controller('planCarriersCtrl', ['$scope', 'gso', '$window',
    function ($scope, gso, $window) {
        $scope.tab = 0;
        $scope.planCarriersCtrldocMeta = [];
        $scope.planCarriersCtrlGeneral = [];
        $scope.benefitsGuideUrl = fileConfig.benefits.benefitsGuide;
        $scope.summaryPlanUrl = fileConfig.benefits.summaryDesc;
        $scope.genaralTab = function (setValue) {
            $scope.seletedValue = setValue;
            $scope.selectOptional(setValue);
            gso.getUtilService().removeTitle();
        };
        $scope.selectTab = function (setTab) {
            if(setTab === 2){
                $window.open($scope.planCarriersCtrldocMeta[setTab - 1].url);
                return;
            }
            $scope.tab = setTab;
            gso.getUtilService().removeTitle();
            $scope.innerTileDatadocMeta = $scope.planCarriersCtrldocMeta[setTab - 1];

        };
        $scope.selectOptional = function (setValue) {
            if (setValue === 1) {
                $scope.selectTabURl = fileConfig.benefits.metLifeBenefits;
            } else {
                $scope.selectTabURl = fileConfig.benefits.askBenefits;
            }
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        $scope.isSelectedGeneral = function (checkTab) {
            return $scope.seletedValue === checkTab;
        };
        $scope.closePanel = function () {
            $scope.tab = 0;
            $scope.seletedValue = 0;
            gso.getUtilService().removeTitle();
        };
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/links", null,
            function (response) {
                $scope.planCarriersCtrldocMeta = response.docMeta;
                $scope.planCarriersCtrlGeneral = response.generalInfo.generalMeta;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        gso.getCrudService().execute(constants.get, fileConfig.benefits.policiesData, null,
            function (response) {
                $scope.benefitsPoliciesJsonData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        $scope.getPdfLink = function (num) {
            return new Array(num);
        };
    }]);