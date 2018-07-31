/**
 Description: This is controller used to fetch/update reporting analytics information
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('reportAnalyticsCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.routvalue = gso.getRouteParams().manageGroup;
        /* coming Manage Group confirmation model popup */
        if ($scope.routvalue === 'manageGroup') {
            $scope.reportAnalyticValue = true;
        } else {
            $scope.reportAnalyticValue = false;
        }
        $scope.totalDiv = $scope.sortReverse = $scope.showchangeReq = false;
        $scope.analyticData = [];
        $scope.sortTypeEmp = 'employeeName';
        /*setting functionality */
        $scope.settingData = [
            {show: true, title: 'Employee Name'},
            {show: true, title: 'Position'},
            {show: true, title: 'Direct Manager'},
            {show: true, title: 'Alerts'},
            {show: true, title: 'Dashboards'},
            {show: true, title: 'Report User'},
            {show: true, title: 'Standard Reports'}
        ];

        /** for filter **/
        $scope.searchbox = false;
        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };

        $scope.selection = [];
        $scope.toggleSelection = function (data) {
            var idx = $scope.selection.indexOf(data);
            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection.push(data);
            }
        };

        $scope.textboxhide = function () {
            $scope.searchbox = false;
            $scope.showManageEmpColList = false;
        };


        /* Reporting Analytics data fetching  & parsing  */

        gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.reportsAnalytics, null,
            function (response) {
                $scope.analyticDataCount = response;
                $scope.totalDiv = true;
                $scope.analyticData = response.employeeDetails;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        /* Model Popup */
        $scope.openSelectRow = function (index) {
            $scope.showchangeReq = true;

            $scope.headeremployeeName = $scope.analyticData[index].employeeName;
            $scope.alertvalue = $scope.analyticData[index].alerts;
            $scope.dashboards = $scope.analyticData[index].dashboards;
            $scope.reportuser = $scope.analyticData[index].reportuser;
            $scope.standardReports = $scope.analyticData[index].standardReports;
            $scope.empID = $scope.analyticData[index].employeeId;

            /* PUT update Functionality*/
            $scope.saveReportAnalytic = function () {

                var role = [],
                    data = [];

                if (angular.element('#standardReportsId').val() === 'true') {
                    role.push({role: 'STD_RPTS'});
                }
                if (angular.element('#alertValueId').val() === 'true') {
                    role.push({role: 'BI_ALERTS'});
                }
                if (angular.element('#dashboardsId').val() === 'true') {
                    role.push({role: 'BI_DASH'});
                }
                if (angular.element('#reportuserId').val() === 'true') {
                    role.push({role: 'BI_USER'});
                }
                data.push({employeeId: $scope.empID, roles: role});
                gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                    manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" + $scope.empID +
                    manageEmpUrlConfig.resources.reportsAnalyticsPut, data,
                    function (response) {
                        $scope.showchangeReq = false;
                        $scope.errorAlert = response;
                        $scope.analyticData[index].alerts = $scope.alertvalue;
                        $scope.analyticData[index].dashboards = $scope.dashboards;
                        $scope.analyticData[index].reportuser = $scope.reportuser;
                        $scope.analyticData[index].standardReports = $scope.standardReports;

                    },
                    function (data) {
                        $scope.showchangeReq = false;
                        $scope.errorAlert = data;
                    }
                );
            };
        };

        $scope.submitMultipleReportAnalytic = function () {

            var data = [];
            angular.forEach($scope.analyticData, function (analytic) {

                var roles = [];

                if (analytic.alerts) {
                    roles.push({role: 'BI_ALERTS'});
                }

                if (analytic.dashboards) {
                    roles.push({role: 'BI_DASH'});
                }

                if (analytic.reportuser) {
                    roles.push({role: 'BI_USER'});
                }

                if (analytic.standardReports) {
                    roles.push({role: 'STD_RPTS'});
                }


                this.push({employeeId: analytic.employeeId, roles: roles});
            }, data);

            gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" + $scope.empID +
                manageEmpUrlConfig.resources.reportsAnalyticsPut, data,
                function (response) {
                    $scope.errorAlert = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            $scope.showchangeReq = false;
        };
    }]);