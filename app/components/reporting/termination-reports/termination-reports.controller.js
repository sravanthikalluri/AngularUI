/**
 Description: This is controller used
 1) To fetch Termination and Add'l Begin/ENd Payment details and print
 2) Div Print Functionality
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('terminationReportsCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.autoWidth = 0;
		$scope.errorAlert = null;
		$scope.noRecordsAlert = null;
        /*    Termination report data fetching*/
        $scope.getTerminationReports = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                gso.getAppConfig().companyId + "/employees?report=" + manageEmpUrlConfig.resources.termReport, null,
                function (response) {
                    $scope.terminationReportsData = response;
                    $scope.autoWidth = 100/4;
                    $scope.loadData = true;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.initTerminationReports = function(){
            $scope.getTerminationReports();
        };

        $scope.initTerminationReports();

        $scope.viewTermReport = function (subjectId) {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId +
                '/' + subjectId + manageEmpUrlConfig.resources.allEmp + '?report=' + manageEmpUrlConfig.resources.termReport, null,
                function (response) {
                    $scope.viewTermReportData = response;
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/reporting/termination-reports/termination-report-details.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default tn-modal'
                    });
                },
                function (data) {
                   $scope.errorAlert = data;
                }
            );
        };

        $scope.PrintElem = function (printDiv) {
            $timeout(function(){
                 gso.getUtilService().printSection(printDiv);
            });
         };
    }]);
