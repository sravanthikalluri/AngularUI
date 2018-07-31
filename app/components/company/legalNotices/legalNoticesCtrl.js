'use strict';
trinetApp.controller('legalNoticesViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.legalNotices = function () {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
                "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + companyUrlConfig.resources.legalNotices, null,
                function (response) {
                    $scope.legalData = response.data;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.legalNotices();
    }]);