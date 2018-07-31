'use strict';
trinetApp.controller('findEmployeeCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.isEmployeeViewVisible = true;
        $scope.findView = 'employee';
        $scope.findPlaceHolder = 'Enter a person’s name';
        $scope.toggleLoading = false;
        $scope.getView = function (value) {
            $scope.searchQuery = '';
            $scope.errorAlert = null;
            $scope.employeeData = [];
            $scope.deptData = [];
            if (value === 'department') {
                $scope.findPlaceHolder = 'Enter a department';
                $scope.searchDepartment('');
            }
            if (value === 'employee') {
                $scope.findPlaceHolder = "Enter a person's name";
            }
            $scope.isEmployeeViewVisible = !$scope.isEmployeeViewVisible;
        };
        $scope.search = function (requestType, searchQuery) {
            if (searchQuery !== null) {
                if (requestType === 'department') {
                    $scope.searchDepartment(searchQuery);
                } else {
                    $scope.searchEmployee(searchQuery);
                }
            }
        };
        /*Search function on entering letters start*/
        $scope.searchOnChange = function (requestType, searchQuery,event) {
            if (searchQuery !== '') {
                $scope.errorAlert = null;
                $scope.toggleLoading = true;
            }
            $scope.search(requestType, searchQuery);

        };
        /*Search function on entering letters end*/
        $scope.searchDepartment = function (searchQuery) {
            $scope.errorAlert = null;
            if (searchQuery === '') {
                $scope.toggleLoading = true;
            }
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId +
                globalUrlConfig.resources.departments + "?deptName=" + searchQuery, null,
                function (response) {
                    $scope.toggleLoading = false;
                    $scope.deptData = response;
                },
                function (data) {
                    $scope.deptData = {};
                    $scope.errorAlert = data;
                }
            );
        };
        /*Search function based on employee name start*/
        $scope.searchEmployee = function (searchQuery) {
            $scope.errorAlert = null;
            $scope.employeeData = {};
            if (searchQuery.trim() !== "") {
                gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.org + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +
                    companyUrlConfig.resources.orgChart + "?name=" + searchQuery, null,
                    function (response) {
                        $scope.employeeData = response;
                       angular.forEach($scope.employeeData, function (emp) {
                           if(emp.employeeDetails.phone !== null){
                               var phone = emp.employeeDetails.phone.replace(/[^A-Z0-9]/ig, "");
                               emp.employeeDetails.phone = gso.getUtilService().formatThePhoneNumber(phone,phone.length);
                           }

                       });
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            }else{
                $scope.employeeData = {};
            }
        };
        /*Search function based on employee name end*/
        $scope.getDepartmentEmployees = function (dept) {

            $scope.getDeptHead(dept);
        };
        $scope.getDeptHead = function (dept) {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.org + "/" + gso.getAppConfig().companyId +
                companyUrlConfig.resources.orgChart + "?deptId=" + dept.deptId, null,
                function (response) {
                    $scope.colleagueList = response;
                    $scope.getDeptDetails($scope.colleagueList,dept);
                    //$scope.closeAndUpdate1($scope.colleagueList[0].employeeId, $scope.colleagueList, dept.deptName);
                },
                function (data) {
                    $scope.deptData = {};
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        $scope.closeAndUpdate = function (id) {
            $scope.getManagerList(id);
        };
/*        $scope.closeAndUpdate1 = function (id, colleagueList, desc) {
            gso.getNGDialog().closeAll();

        };*/
    }]);
