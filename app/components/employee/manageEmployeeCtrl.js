/**
 * Description: This is controller is used to fetch Employees, departments,location and Eforms data
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.controller('manageEmployeeCtrl', ['$scope', 'gso', '$log', '$location', '$filter', 'SharedDataService', '$state', function ($scope, gso, $log, $location, $filter, SharedDataService, $state) {

    var companyId = gso.getAppConfig().companyId;
    var deptIdFilterListStr = '';
    var locationIdFilterListStr = '';
    var positionIdFilterListStr = '';
    var nameFilter = '';
    var sortFilter = '';
    var limit = 20;
    var employmentStatusFilter = 'active'
    var urlQueryParams = 'status=active&limit=' + limit + '&offset=1';
    var resetFilters = false;
    var initialLoad = true;
    var terminatedEmployeeToggled = false;
    var defaultURL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.newManageBaseUrl +
        manageEmpUrlConfig.resources.company + '/' + companyId +
        manageEmpUrlConfig.resources.manageEmployees + "?";

    $scope.nextURL = urlQueryParams;
    $scope.previousURL = urlQueryParams;
    $scope.sortAsc = true;
    $scope.employeeData = [];
    $scope.departments = [];
    $scope.locations = [];
    $scope.positions = [];
    $scope.callback = false;
    $scope.tab = 1;
    $scope.searchbox = false;
    $scope.isvisable = false;
    $scope.flyout = true;
    $scope.onoffswitchEmp = false;
    $scope.selectedDepartments = [];
    $scope.selectedLocations = [];
    $scope.selectedPositions = [];
    $scope.totalCount = 0;
    $scope.autoWidth = 0;
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.httpInProgress=false;
    $scope.totalPages = 0

    if (SharedDataService.getAppSharedData().isShowManageEmpSearch != undefined) {
        if (SharedDataService.getAppSharedData().isShowManageEmpSearch !== null && JSON.parse(SharedDataService.getAppSharedData().isShowManageEmpSearch)) {
            $scope.isShowManageEmpSearch = true;
            $scope.directReport = SharedDataService.getAppSharedData().userName;
        }
    }

    $scope.resetData = function(){
        $scope.employeeData = [];
        urlQueryParams = 'limit=' + limit + '&offset=1';
        $scope.totalCount = 0;
        $scope.previousURL = '';
        $scope.nextURL = '';
        $scope.currentPage = 0;
    };

    $scope.setQueryParams = function(){
        if (deptIdFilterListStr !== '') {
            urlQueryParams += '&deptIds=' + deptIdFilterListStr;
        }
        if (locationIdFilterListStr !== '') {
            urlQueryParams += '&locationIds=' + locationIdFilterListStr;
        }
        if (positionIdFilterListStr !== '') {
            urlQueryParams += '&positionIds=' + positionIdFilterListStr;
        }
        if (nameFilter !== '') {
            urlQueryParams += '&searchTerm=' + nameFilter;
        }
        if (sortFilter !== '') {
            urlQueryParams += '&sortOrder=' + sortFilter;
        }
        if (employmentStatusFilter !== '') {
            urlQueryParams += '&status=' + employmentStatusFilter;
        }
    };

    $scope.clearQueryParams = function(){
        deptIdFilterListStr = '';
        locationIdFilterListStr = '';
        positionIdFilterListStr = '';
        nameFilter = '';
        sortFilter = '';
        employmentStatusFilter = 'active';
    }

    $scope.searchPos = function (value) {
        $scope.searchbox = value;
    };

    $scope.textboxhide = function () {
        $scope.searchbox = false;
        $scope.isvisable = false;
        $scope.showFlyout = false;
        $scope.mailFlyoutData = false;
        $scope.showManageEmpColList = false;
    };

    $scope.flyout = function (val) {
        $scope.showFlyout = val;
    };
    $scope.sortNames = function(sortDirection){
        resetFilters = true;
        sortFilter = sortDirection;
        $scope.sortAsc = !$scope.sortAsc;
        $scope.invokeFilters();
    };

    $scope.formatDate = function (date) {
        var dateArray = date.split(' ');
        return gso.getUtilService().splitConcatDateString(dateArray[0]);
    };

    $scope.mailFlyout = function (val) {
        $scope.mailFlyoutData = val;
    };

    $scope.getEmployeePermissions = function (empId) {
        SharedDataService.getAppSharedData().permissionId = 2;
        var permURL = homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + companyId + '/' + empId + homeUrlConfig.resources.perm+'/'+gso.getAppConfig().userId;
        $scope.httpInProgress=true;
        gso.getCrudService().execute(constants.get, permURL, null,
            function (response) {
                $scope.httpInProgress=false;
                if (response !== undefined && response !== null) {
                    $scope.$parent.selectedEmpMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(response[SharedDataService.getAppSharedData().permissionId]);
                    $scope.redirectToProfile(empId, $scope.$parent.selectedEmpMenuComponentPermissions[0].name);
                }
            }, function (data) {
                $scope.httpInProgress=false;
                $scope.errorAlert = data;
            });
    };
    $scope.stopclick = function (event, empId, empStatus) {
        if(!$scope.httpInProgress)
        {
            $scope.errorAlert = null;
            if (event.target.id === 'phone' || event.target.id === 'mail') {
                $log.debug("");
            }
            else {
                $scope.getEmployeePermissions(empId);
            }
        }
    };
     $scope.closeAlert=function () {
        $scope.errorAlert = null;
     };

    $scope.getEmployees = function (previousOrNext) {
        var requestURL = defaultURL + urlQueryParams;

        if (resetFilters) {
            $scope.nextURL = requestURL;
            resetFilters = false;
        }

        if (previousOrNext === 'previous') {
            requestURL = $scope.previousURL;
        }
        else if (previousOrNext === 'next'){
            requestURL = $scope.nextURL;
        }

        $scope.autoWidth = 100/$scope.settingData.length;

        if($scope.nextURL !== '' || $scope.previousURL !== '') {
            gso.getCrudService().
                execute(constants.get, requestURL, null, function (response) {
                    $scope.employeeData = $scope.employeeData.concat(response.employees);

                    //Todo: Logic to show the direct-report data to Logged in user
                    if ($scope.isShowManageEmpSearch) {
                        angular.forEach($scope.employeeData, function (item) {
                            if (item.supervisorName === $scope.directReport) {
                                item.checked = true;
                            }
                        });
                    }

                    if (response.pagination) {
                        $scope.totalCount = response.pagination.total;
                    }
                    else {
                        $scope.totalCount = $scope.employeeData.length;
                    }

                    $scope.totalPages = Math.ceil($scope.totalCount / limit);

                    if (initialLoad) {
                        $scope.departments = response.facets.departments;
                        $scope.locations = response.facets.locations;
                        $scope.positions = response.facets.positions;
                        $scope.unfilteredTotal = $scope.totalCount;
                        initialLoad = false;
                    }

                    $scope.getPermissions(SharedDataService.getAppSharedData().permissionId);

                    if (response.pageLinks) {
                        var nextURLObj = response.pageLinks.filter(function (pagelink) {
                            return pagelink.rel === 'next';
                        });

                        if (nextURLObj.length > 0) {
                            $scope.nextURL = nextURLObj[0].href;
                        }
                        else {
                            $scope.nextURL = '';
                        }
                        var previousURLObj = response.pageLinks.filter(function (pagelink) {
                            return pagelink.rel === 'prev';
                        });

                        if (previousURLObj.length > 0) {
                            $scope.previousURL = previousURLObj[0].href;
                        }
                        else {
                            $scope.previousURL = '';
                        }
                    }
                    else {
                        $scope.nextURL = '';
                        $scope.previousURL = '';
                    }
                    $scope.employeesByDeptLoading = false;
                    $scope.employeesByLocLoading = false;
                    $scope.employeesByPositionLoading = false;
                    $scope.isFullDataLoaded = true;
                },
                function (data) {
                    if ($scope.callback !== true) {
                        $scope.errorAlert = data;
                    }
                    $scope.busy = false;
                }
            );
        }
        $scope.busy = false;
    };

    $scope.pageNext = function (){
        $scope.invokeFilters('next');
        $scope.currentPage = $scope.currentPage + 1;
    };

    $scope.pagePrevious = function (){
        $scope.invokeFilters('previous');
        $scope.currentPage = $scope.currentPage - 1;
    };

    $scope.redirectToProfile = function (employeeId,tab) {
        if(tab==="personal"){
            tab="profile"
        }
        var redirectUrl = '/profile/'+tab+'/' + employeeId;
        SharedDataService.getAppSharedData().isFromSetTab = false;
        $state.go('profile.profile', {selectedTab: tab, empId: employeeId});
    };

    $scope.invokeFilters = function(previousOrNext) {
        if (resetFilters){
            $scope.resetData();
            $scope.setQueryParams();
        }
        $scope.getEmployees(previousOrNext);
    };

    $scope.clearAllFilters = function () {
        resetFilters = true;
        $scope.search = '';
        $scope.selectedDepartments = [];
        $scope.selectedLocations = [];
        $scope.selectedPositions = [];
        $scope.onoffswitchEmp = false;
        angular.forEach($scope.departments, function (item) {
            item.isDepartmentChecked=false;
        });
        angular.forEach($scope.locations, function (item) {
            item.isLocationChecked=false;
        });
        angular.forEach($scope.positions, function (item) {
            item.isPositionChecked=false;
        });
        $scope.clearQueryParams();
        $scope.invokeFilters();
    };

    $scope.searchFilter = function () {
        resetFilters = true;
        if($scope.search !== undefined && $scope.search.length >0){
            nameFilter = $scope.search;
        }
        else {
            nameFilter = '';
        }
        $scope.invokeFilters('');
    };

    $scope.toggleTerminatedEmployees =function() {
        resetFilters = true;
        terminatedEmployeeToggled = true;
        if($scope.onoffswitchEmp ){
            employmentStatusFilter = 'all';
        }
        else {
            employmentStatusFilter = 'active';
        }
        $scope.invokeFilters('');
    }

    $scope.filteredDeptData = function (department, departmentChecked) {
        $scope.busy = false;
        resetFilters = true;
        $scope.employeesByDeptLoading = true;
        if (departmentChecked) {
            $scope.selectedDepartments.push(encodeURIComponent(department.id));
        } else {
            var index = $scope.selectedDepartments.indexOf(encodeURIComponent(department.id));
            if (index !== -1) {
                $scope.selectedDepartments.splice(index, 1);
            }
        }
        if ($scope.selectedDepartments.length > 0){
            deptIdFilterListStr = $scope.selectedDepartments.join("&deptIds=");
        }
        else {
            deptIdFilterListStr = '';
        }
        $scope.invokeFilters('');
       };

    $scope.filteredLocData = function (location, locationChecked) {
        resetFilters = true;
        $scope.employeesByLocLoading = true;

        if (locationChecked) {
            $scope.selectedLocations.push(encodeURIComponent(location.id));
        } else {
            var index = $scope.selectedLocations.indexOf(encodeURIComponent(location.id));
            if (index !== -1) {
                $scope.selectedLocations.splice(index, 1);
            }
        }
        if ($scope.selectedLocations.length > 0) {
            locationIdFilterListStr = $scope.selectedLocations.join("&locationIds=");
        }
        else {
            locationIdFilterListStr = '';
        }
        $scope.invokeFilters('');
     };


    $scope.filteredPositionData = function (position, positionChecked) {
        resetFilters = true;
        $scope.employeesByPositionLoading = true;
        if (positionChecked) {
            $scope.selectedPositions.push(encodeURIComponent(position.id));
        } else {
            var index = $scope.selectedPositions.indexOf(encodeURIComponent(position.id));
            if (index !== -1) {
                $scope.selectedPositions.splice(index, 1);
            }
        }
        if ($scope.selectedPositions.length > 0){
            positionIdFilterListStr = $scope.selectedPositions.join("&positionIds=");
        }
        else {
            positionIdFilterListStr = '';
        }
        $scope.invokeFilters('');
    };

    $scope.settingData =
        [
            {show: true, title: 'Employee Name'},
            {show: true, title: 'Position'},
            {show: true, title: 'Status'},
            {show: true, title: 'Department'},
            {show: true, title: 'Location'},
            {show: true, title: 'Service Date'},
            {show: true, title: 'Direct Manager'},
            {show: true, title: 'Contacts'}
        ];

    $scope.changeGrid = function(item){ // sets visibility of columns
        $scope.gridLength = $scope.settingData.filter(function (data) {
            return data.show;
        }).length;
        $scope.autoWidth = 100/$scope.gridLength;
    };

    $scope.getEmployees('');

}]);
