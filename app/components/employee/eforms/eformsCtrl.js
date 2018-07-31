/**
 Description: This is controller used to fetch EForm Data of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('eformsCtrl', ['$scope', 'gso', '$routeParams',
    function ($scope, gso, $routeParams) {
            $scope.eformDataTab = gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + gso.getAppConfig().companyId + "/" +
                $scope.appUserId + companyUrlConfig.resources.eformsStatus, null,
                function (response) {
                    $scope.eformDataTab = response;
                    $scope.childParentAlertMsg(response);
                },
                function (data) {
                    $scope.childParentAlertMsg(data);
                }
            );
    }]);
