/*
 Program Description / functionality: To Fetch Metlife Benefits Information.
 */
'use strict';
trinetApp.controller('metlifeBenefitsViewCtrl', ['$scope', 'gso', '$location',
    function ($scope, gso, $location) {
        /* To Retrieve the met life Benefits information */
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'policies?type=metlife', null,
            function (response) {
                $scope.metlifeBenefitsData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        $scope.metlifeLoc = $location.path().split('/')[2];

    }]);