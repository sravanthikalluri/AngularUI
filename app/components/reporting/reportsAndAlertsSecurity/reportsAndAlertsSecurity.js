'use strict';

trinetApp.controller('reportsAndAlertsSecurityCtrl', ['$scope','gso','$timeout', 'sharedProperties' ,function ($scope, gso, $timeout, sharedProperties) {
    var offset = 0;
    var activeLimit = 25;
    $scope.offset = 0;
    $scope.activeLimit = 25;
    $scope.callback = false;
    $scope.totalDiv = false;
    $scope.allData = [];
    $scope.title = {};
    $scope.globalCount = 1;
    $scope.activeData = [];
    $scope.selection = [];
    $scope.totalCount = 1;
    $scope.uneditedData = [];
    $scope.editMode = [];

    $scope.activeEmpGet = function () {
        $scope.allData = [];
        if ($scope.busy) {
            return;
        }
        $scope.busy = true;

        if($scope.activeData.length < parseInt($scope.globalCount,10)){
            gso.getCrudService().
                execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/'+ "employee-roles?roleType=reports&limit=" + activeLimit + "&offset="+ offset, null, function (response) {
                    $scope.activeData = $scope.activeData.concat(response.employeeDetails);

                    $scope.allEmpData=$scope.activeData;
                    $scope.filterByData = $scope.allEmpData;
                    $scope.change($scope.allEmpData);
                    $scope.count=$scope.allEmpData.length;
                    $scope.totalCount = response.employeeCount;
                    $scope.busy = false;
                    $scope.callback=true;

                    if ($scope.activeData.length > $scope.totalCount){
                        offset = $scope.totalCount;
                    }
                    else{
                        offset = $scope.activeData.length;
                    }

                    if (offset + activeLimit > $scope.totalCount){
                        activeLimit = activeLimit - ((offset + activeLimit) - $scope.totalCount);
                    }
                    $scope.offSet = offset;
                },
                function (data) {
                    if($scope.callback !== true){
                        $scope.errorAlert = data;
                    }
                    $scope.busy = false;
                }
            );
        }
    };

    $scope.getAllEmployees = function () {
        gso.getCrudService().
            execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + "employee-roles?roleType=reports", null,
            function (response) {
                $scope.globalActiveEmp = response.employeeDetails;
                $scope.uneditedData = angular.copy($scope.globalActiveEmp);
                $scope.globalCount=response.employeeCount;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    };

    $scope.loadData = function(){
        $scope.activeEmpGet();
    };

    $scope.change = function (data) {
        return $scope.changeFormat(data);
    };
    var has = function(obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);
    };
    // memoization or memoisation is an optimization technique used primarily to speed up computer programs
    // by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
    var memoizeFunc = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!has(cache, address)) {
                cache[address] = func.apply(this, arguments);
            }

            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };
    $scope.changeFormat = memoizeFunc(function (data) {
        angular.forEach(data, function (item) {
            if (item.name && (item.name.indexOf(',') >= 0)) {
                var arr = item.name.split(',');
                item.name = arr[0] + ',' + ' ' + arr[1];
            }
        });
        return data;
    });

    $scope.searchFilter =function() {
        if($scope.search !== undefined && $scope.search.length >0){
            $scope.checkForSearchItem();
        }else{
            $scope.filterByData=$scope.globalActiveEmp;
        }
    };

    $scope.checkForSearchItem = function(){
        var searchItem = $scope.search.toLowerCase();
        var stringMatch = new RegExp(searchItem, 'i');

        $scope.filterByData = $scope.globalActiveEmp.filter(function(item){
            return stringMatch.test(item.employeeName) || stringMatch.test(item.employeeId);
        });
    };

    $scope.toggleSaveButton = function (editedEmployee, index){

        var originalEmployee = $scope.uneditedData.filter(function(e){
                return e.employeeId === editedEmployee.employeeId;}
        );

        var settingsHaveChanged = (originalEmployee[0].alerts === editedEmployee.alerts)&& (originalEmployee[0].dashboards === editedEmployee.dashboards)&& (originalEmployee[0].reportuser === editedEmployee.reportuser)&& (originalEmployee[0].standardReports === editedEmployee.standardReports);

            $scope.editMode[index] = !settingsHaveChanged;
    };

    $scope.saveEmployeePermissions = function (employee, index){
        // https://platformqeb.hrpassport.com/api-employee/v1/manage-employee/32L/00000325075/employee-roles?roleType=reports
        var payloadObj=[];

        if (employee.alerts) { payloadObj.push({"role" : "BI_ALERTS"});}
        if (employee.dashboards) { payloadObj.push({"role" : "BI_DASH"});}
        if (employee.reportuser) { payloadObj.push({"role" : "BI_USER"});}
        if (employee.standardReports) { payloadObj.push({"role" : "STD_RPTS"});}

        $scope.saveRolesData =
        {
            "employeeRoleCreateList":
                [{
                    "employeeId":  employee.employeeId,
                    "roles"     :   payloadObj
                }]
        };

        gso.getCrudService().
            execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + "employee-roles/report", $scope.saveRolesData,
            function (response) {
                $scope.response = response;
                $scope.appendMessage = "Changes saved successfully. Next step: Click Define User Access and define the data this person can view in reports.";
                if ($scope.response._statusCode === "200"){

                    if (payloadObj.length === 0){
                        $scope.appendMessage = "Permissions removed successfully.";
                    }
                    $scope.response._statusMessage = $scope.appendMessage;

                    $scope.updatedEmployee = $scope.uneditedData.filter(function(e){
                            return e.employeeId === employee.employeeId;});
                    $scope.updatedEmployee[0].alerts = employee.alerts;
                    $scope.updatedEmployee[0].dashboards = employee.dashboards;
                    $scope.updatedEmployee[0].reportuser = employee.reportuser;
                    $scope.updatedEmployee[0].standardReports = employee.standardReports;
                }

                $scope.errorAlert = $scope.response;
                $scope.editMode[index] = false;

                $timeout(function(){
                    $scope.closeAlert();
                },6000);
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    };

    $scope.closeAlert = function(){
        if ($scope.errorAlert !== null) {
            $scope.errorAlert = null;
            $scope.response = null;
        }
    };

    $scope.cancelEdit = function (index, employee){
        //need to angular.copy, so we don't change the state of $scope.uneditedData array
        $scope.currentEmployee = angular.copy($scope.uneditedData.filter(function(e){
            return e.employeeId === employee.employeeId;}
        ));
        if ($scope.currentEmployee.length !== 0){
            $scope.filterByData[index] = $scope.currentEmployee[0];
        }

        $scope.editMode[index] = false;
    };


    $scope.launchDefineUserAccess = function(){
        var reportingHost = sharedProperties.reportsuiBaseUrl;
        var clientReportsUrl = reportingHost+'/UIGateway.jsp?source=UserAccess';
        window.open(clientReportsUrl, 'Client Reports');
    };
    $scope.activeEmpGet();
    $scope.getAllEmployees();

}]);
