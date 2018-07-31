/*
 Program Description / functionality: To Fetch Benefits Carrier Contact Information.
 */
'use strict';
trinetApp.controller('benefitsCarrierContactsViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        /* To Fetch  benefit Carrier  information*/
        $scope.benefitsCarrierData = gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + '/' + benefitsUrlConfig.resources.benefitPolicy + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'carriers', null,
            function (response) {
                $scope.benefitsCarrierData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    }]);