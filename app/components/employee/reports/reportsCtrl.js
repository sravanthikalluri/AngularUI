/**
 Description: This is controller used
 1) To fetch Termination and Add'l Begin/ENd Payment details and print
 2) Div Print Functionality
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('reportsCtrl', ['$scope', 'gso', '$timeout',
    function ($scope, gso, $timeout) {
        $scope.sortType = $scope.sortTypeSec = 'employeeName';
        $scope.sortReverse = $scope.sortReverseSec = false;
        $scope.tab = 0;
        $scope.reportData = $scope.reportPayData = [];
        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            gso.getUtilService().setSidebarActive('list' + setTab);
            if (setTab === 1) {
                $scope.reportPayDataFun();
                //$scope.termReport();
            } /*else {

            }*/
        };
        $scope.closePanel = function () {
            $scope.tab = 0;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        $scope.formatDate = function (date) {
            return gso.getUtilService().filterDate(new Date(date), constants.dateFormatUS);
        };
        /*    Termination report data fetching*/
        $scope.termReport = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                gso.getAppConfig().companyId + "/employees?report=" + manageEmpUrlConfig.resources.termReport, null,
                function (response) {
                    $scope.reportData = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        /* Add'l Begin/End report data fetching & parsing    */
        $scope.reportPayDataFun = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                gso.getAppConfig().companyId + "/employees?report=" + manageEmpUrlConfig.resources.payReport + "&cache=flush", null,
                function (response) {
                    $scope.reportPayData = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        /*    Termination detail report data fetching /parsing and mapping data to model window*/

        $scope.viewTermReport = function (termIndex) {
            var termEmpId = document.getElementById('spanTermId' + termIndex).innerHTML;
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId +
                '/' + termEmpId + manageEmpUrlConfig.resources.allEmp + '?report=' + manageEmpUrlConfig.resources.termReport, null,
                function (response) {
                    $scope.viewTermReportData = response;
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/employee/reports/reportsTermModelView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        /*    Pay detail report data fetching /parsing and mapping data to model window*/
        $scope.viewPayReport = function (payReport) {
            $scope.viewPayReportData = payReport;
            $timeout(function(){
                gso.getNGDialog().open({
                    templateUrl: 'app/components/employee/reports/reportsPayModelView.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            });
        };
        $scope.PrintElem = function (printDiv) {
            $timeout(function(){
                 gso.getUtilService().printSection(printDiv);
            });
         };
    }]);
