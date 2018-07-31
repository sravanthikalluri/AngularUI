/*
 Program Description / functionality: To Fetch Additional Policy Information.
 Parameter: companyId
 */
'use strict';
trinetApp.controller('manageResourceViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {

    gso.getUtilService().hideDIVS(true);
    $scope.menuId = null;
    gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
        gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'additional-policies?pfClient=' + gso.getAppConfig().pfClient, null,
        function (response) {
            $scope.menuId = parseInt(response.managerMenuId, 10);
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'additional-policy-details?pfClient=' + gso.getAppConfig().pfClient + '&menuId=' + $scope.menuId, null,
                function (response) {
                    $scope.additionalPoliciesManageData = response;

                    if ($scope.additionalPoliciesManageData.length > 0) {
                        $scope.isAdditionalPoliciesData = true;
                    } else {
                        $scope.isAdditionalPoliciesData = false;
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        },
        function (data) {
            $scope.errorAlert = data;
        }
    );
}]);