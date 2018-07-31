/**
 * Created by Nikitha Jayam on 26-05-2017.
 */
trinetApp.controller('myBulkController',['$scope','$http','$rootScope', '$timeout','gso','SharedDataService', function($scope,$http,$rootScope,$timeout,gso,SharedDataService){

    $scope.$on('uploadFile', function () {
        gso.getNGDialog().closeAll();
        $rootScope.fileValue = true;
        $rootScope.fileResponse = {};
        $scope.uploadDone = false;
        $rootScope.import_success_message = false;
        var file = $scope.myFile;
        $rootScope.fileName = file.name;
        $rootScope.fileSize = file.size;
        $rootScope.successLength=0;
        var uploadUrl =  manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" + SharedDataService.getAppSharedData().selectedCompany + "/" + manageEmpUrlConfig.resources.customFields + "/" + manageEmpUrlConfig.resources.uploadCustomChanges ;
        var fd = new FormData();
        fd.append('fileUpload', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(response){
                $rootScope.fileValue = response.data;
                $rootScope.progressPopup = !$rootScope.progressPopup;
                $rootScope.importFile = !$rootScope.importFile;
                angular.forEach(response.data, function (item) {
                    if (item.errorMessage === null) {
                        $rootScope.successLength = $rootScope.successLength+1;
                    }
                });
            })
            .error(function(){
                $scope.BulkUploadSection= false;
            });
    });
    $scope.firstTab = true;
    $scope.firstClass="selected";
    $scope.secondTab = false;
    $scope.next= function(){
        $scope.firstClass="";
        $scope.secondClass="selected";
        $scope.firstTab = false;
        $scope.secondTab = true;
    };
    $scope.firstTabClick = function(){
        $scope.firstClass="selected";
        $scope.secondClass="";
        $scope.firstTab = true ;
        $scope.secondTab = false;

    };
    $scope.secondTabClick = function(){
        $scope.firstClass="";
        $scope.secondClass="selected";
        $scope.firstTab = false;
        $scope.secondTab = true;
    };
    $scope.storeUploadData = function(fileValues){
        $scope.errorAlert = '';
        $scope.fileItems = fileValues;
        var url =  manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" + SharedDataService.getAppSharedData().selectedCompany + "/" + manageEmpUrlConfig.resources.customFields ;
        $http({
            method : 'POST',
            url : url,
            data : fileValues,
            transformResponse : function(data, headersGetter, status) {
                return {
                    data : data
                };
            }
        }).success(function(response) {
            var message = JSON.parse(JSON.stringify(response)).data;
            if(response){
                gso.getNGDialog().closeAll();
                var data = {
                    _statusMessage: 'Custom field successfully Updated.',
                    _statusCode: '200'
                };
                $scope.childParentAlertMsg(data);
                $rootScope.importFile= false;
                $scope.init();
                $timeout( function(){
                    $rootScope.import_success_message=false;
                    $scope.import_success_message = false;
                }, 20000);
            }
        }).error(function() {
            // Some error function
        });
    };

}]);
