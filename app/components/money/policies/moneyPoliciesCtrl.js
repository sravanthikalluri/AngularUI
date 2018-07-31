/*
 Program Description / functionality:
 1) Fetch all My Money Form tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('moneyPoliciesCtrl', ['$scope', 'gso',function ($scope, gso) {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.loadPolicies = function () {
            var formURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId +
                "/policiesprocedures?pfClient=" + gso.getAppConfig().pfClient;
            gso.getCrudService().execute(constants.get, formURL, null,
                function (response) {
                    $scope.moneyPoliciesData = response.forms;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        };

        $scope.loadPolicies();

    }]);