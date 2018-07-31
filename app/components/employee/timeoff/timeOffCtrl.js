/**
 Description: This is controller used to used to prepare timeOff URL
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('timeOffCtrl', ['$scope', 'gso',
    function ($scope, gso) {
            var planTypes = {
                '50': 'Sick',
                '51': 'Vacation',
                '52': 'Personal Time',
                '5Y': 'Restricted Floating Holiday'
            };
			$scope.errorAlert = null;
			$scope.noRecordsAlert = null;
            $scope.tabValue = 0;
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.timeOff + '/' + gso.getAppConfig().companyId + '/' + $scope.appUserId + "/timeoff-history", null,
                function (response) {
                    response.map(function (obj) {
                        if (!obj.planTypeDesc) {
                            obj.planTypeDesc = planTypes[obj.planType];
                        }
                    });
                    $scope.timeOffSlickData = response;
                    $scope.autoWidth = 100/6;
                    $scope.selectTab($scope.tabValue);
                },
                function (data) {
					$scope.errorAlert = data;
                }
            );
            $scope.selectTab = function (value) {
                $scope.tabValue = value;
                $scope.val = $scope.timeOffSlickData[value];
            };

    }]);
