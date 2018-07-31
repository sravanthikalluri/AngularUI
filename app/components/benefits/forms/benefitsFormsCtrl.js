/**
 * Description: This is controller is used to fetch benefits forms tile information
 * Author:Krishnam Raju Kollu
 */
'use strict';
trinetApp.controller('benefitsFormsCtrl', ['$scope', 'gso',
    function ($scope, gso) {

        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            gso.getUtilService().removeTitle();
        };
        $scope.closePanel = function () {
            $scope.tab = 0;
            gso.getUtilService().removeTitle();
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;

        };
        $scope.benefitFormData = gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
            "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + "/forms?countryCode=" + gso.getAppConfig().countryCode + "&module=benefits", null,
            function (response) {
                $scope.benefitFormData = response.forms;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

    }]);
