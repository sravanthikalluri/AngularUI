/*
 Program Description / functionality:
 1) Fetch all Benefit Policies tiles information.
 2) Page Print Functionality
 */

'use strict';
trinetApp.controller('policiesViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.tab = 0;
        $scope.heading = 'testing';
        $scope.learn = false;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            gso.getUtilService().removeTitle();
        };
        $scope.selectedTile = function (value) {
            $scope.innerTileData = $scope.benefitsPoliciesData.legalNoticesList[value];
            $scope.tab = value + 1;
        };

        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        /*Fetching  benefit policy information */
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'summary-plan?requestType=benefits', null,
            function (response) {
                $scope.benefitsPoliciesData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        /*Fetching  benefit policy information from static json */
        gso.getCrudService().execute(constants.get, fileConfig.benefits.policiesData, null,
            function (response) {
                $scope.benefitsPoliciesJsonData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        $scope.closePanel = function () {
            $scope.tab = 0;
            gso.getUtilService().removeTitle();
        };
        $scope.getClass = function (value) {
            return value ? 'yes' : 'no';
        };
        /*Added this fn to read the errors from the child controller*/
        $scope.childParentAlertMsg = function (data) {
            $scope.errorAlert = data;
        };

        $scope.printAcaMarket = function (id) {
            gso.getUtilService().printSection(id);
        };
        $scope.selectedUrlLink = fileConfig.benefits.stateFederal;
        $scope.acaMarket = fileConfig.benefits.acaMarket;
    }]);
