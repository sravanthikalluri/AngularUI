/**
 Description: This is controller used to do display assigned Roles information on Screen
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('assignedRolesCtrl', ['$scope', 'gso',
    function ($scope, gso) {
            var offset = 0;
            var activeLimit = 20;
            $scope.allData = [];
            $scope.totalCount = 1;
            $scope.autoWidth = 0;

            $scope.errorAlert = null;
            $scope.noRecordsAlert = null;
            /* Fetch assigned Roles*/
            $scope.assignedRoles = function () {
                $scope.spinner = true;
                if ($scope.busy) {
                    return;
                }
                $scope.busy = true;
                if($scope.allData.length < parseInt($scope.totalCount,10)) {
                     gso.getCrudService().execute(constants.get,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                         manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.assignedRole + "?limit=" + activeLimit + "&offset="+ offset, null,
                    function (response) {
                            $scope.allData = $scope.allData.concat(response.employeeRoleList);
                            $scope.assignedRolesData = $scope.allData;
                            $scope.totalCount = response.count;
                            $scope.busy = false;
                            $scope.callback = true;

                            if ($scope.allData.length > $scope.totalCount) {
                                offset = $scope.totalCount;
                            }
                            else {
                                offset = $scope.allData.length;
                            }

                            if (offset + activeLimit > $scope.totalCount) {
                                activeLimit = activeLimit - ((offset + activeLimit) - $scope.totalCount);
                            }
                            $scope.offSet = offset;
                            $scope.rolesRestrict();
                        },
                        function (data) {
                            if ($scope.callback !== true) {
                                $scope.errorAlert = data;
                            }
                            $scope.busy = false;
                            $scope.spinner = false;
                        }
                    );
                }
            };
            $scope.rolesRestrict = function () {
                $scope.rolesRestrictData = gso.getCrudService().execute(constants.get,globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                    globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.rolesRestrict, null,
                    function (response) {
                        $scope.rolesRestrictData = response;
                        var count = 0;
                        var a = 0;
                        Object.keys($scope.rolesRestrictData).map(function (value) {
                           $scope.rolesRestrictData[value] ? count++ : a++;
                        });
                        $scope.autoWidth = 100/((count-1) + 2);
                        $scope.loadData = true;
                        $scope.spinner = false;
                    },
                    function (data) {
                        $scope.autoWidth = 100/2;
                        $scope.spinner = false;
                    }
                );
            };

        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        $scope.assignedRoles();
    }]);

