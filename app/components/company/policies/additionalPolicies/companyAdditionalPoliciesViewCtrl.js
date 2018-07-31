/*
 Program Description / functionality: To Fetch Additional Policy Information.
 Parameter: companyId
 */
'use strict';
trinetApp.controller('companyAdditionalPoliciesViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        if (window.location.hash === "#/companyAdditionalPoliciesView") {
            gso.getUtilService().hideDIVS(true);
        }
        if (window.location.hash === "#/companyPolicies") {
            gso.getUtilService().showDIVS(true);
        }
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'additional-policies?pfClient=' + gso.getAppConfig().pfClient, null,
            function (response) {
                $scope.additionalPoliciesData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        gso.getCrudService().execute(constants.get, "assets/data/benefits/benefitAdditionalData.json", null,
            function (response) {
                $scope.addition = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    }]);