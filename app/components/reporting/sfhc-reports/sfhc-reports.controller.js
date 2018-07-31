
'use strict';
trinetApp.controller('sfhaReportsCtrl', ['$scope', 'gso','$filter',
    function ($scope, gso,$filter) {
        $scope.isSelectOption1 = true;
        $scope.pdfUrl = "";
        $scope.archivingRecords = [];
		$scope.errorAlert = null;
		$scope.noRecordsAlert = null;
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };
        $scope.getSfhcReports = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.reports + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.shfcReports, null,
                function (response) {
                    $scope.pdfUrl = response.pdf;
                    $scope.sfhcReportsData = response.sfhoReportes;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.initSfhcReports = function(){
            $scope.getSfhcReports();
        };


        $scope.initSfhcReports();



        $scope.archiveSelection = function(filename){
            var indexSelected = -1;
            if($scope.archivingRecords.length > 0) {
                var single_object = $filter('filter')($scope.archivingRecords, function (obj ,index) {
                    if(obj.fileName == filename){
                        indexSelected =  index;
                        return true;
                    }
                });
                if(single_object.length > 0){
                    $scope.archivingRecords.splice(indexSelected,1);
                }
                else{
                    $scope.archivingRecords.push({"fileName":filename});
                }
            }
            else{
                $scope.archivingRecords.push({"fileName":filename});
            }
        }


        $scope.commitArchive = function(){
            if($scope.archivingRecords.length > 0) {
                gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.reports + '/' +
                    gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.shfcReports, $scope.archivingRecords,
                    function (response) {
                        $scope.initSfhcReports();
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            }
        }



    }]);
