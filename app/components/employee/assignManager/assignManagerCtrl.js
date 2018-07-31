/**
 Description: This is controller used to do assign manager operations
 Author:Thaviti Naidu
 **/
'use strict';
trinetApp.controller('assignManagerCtrl', ['$scope', 'gso', 'ngDialog','$filter','$location','SharedDataService',
    function ($scope, gso, ngDialog, $filter,$location,SharedDataService) {
        $scope.offset = 0;
        $scope.activeLimit = 50;
        $scope.callback = false;
        $scope.totalDiv = false;
        $scope.allData = [];
        $scope.assignManagerData = [];
        $scope.title = {};
        $scope.globalCount = 1;
        $scope.selectdep = {};
        $scope.selectLoc = {};
        $scope.isTrue=false;
        $scope.directManger = {};
        $scope.workSupervisor = {};
        $scope.weekDay = gso.getUtilService().weekDays();
        $scope.currentDate = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
        $scope.newDate = new Date();
        $scope.sortType = 'emplyoeeName';
        $scope.sortReverse = $scope.showchangeReq = $scope.searchbox = false;
        $scope.sortTypeEmp = 'name';
        $scope.effectiveDate = $scope.newDate;
        $scope.emplist = [];
        $scope.isSelectedValue = true;
        $scope.selectedDepartments = [];
        $scope.selectedLocations = [];
        $scope.selectedPositions = [];
        $scope.selectedDirectManager=[];
        $scope.selectedWorkSupervisor=[];
        $scope.assignToMeSupervisor = false;
        $scope.assignToMeDirect = false;
        $scope.busy = false;
        var initialLoad = true;
        var initialAllEmployeeGet=true;
        //new changes for facets and API changes

        $scope.deptIdFilterList = [];
        $scope.deptIdFilterListStr = '';
        $scope.locationIdFilterList = [];
        $scope.locationIdFilterListStr = '';
        $scope.positionIdFilterList=[];
        $scope.positionIdFilterListStr='';
        $scope.directManagerIdFilterList=[];
        $scope.directManagerIdFilterListStr='';
        $scope.workSupervisorIdFilterList=[];
        $scope.workSupervisorIdFilterListStr='';
        $scope.sortFilter='';
        $scope.resetFilters = false;


        $scope.employmentStatus = 'active';
        $scope.nameFilter = '';
        $scope.sortFilter = '';
        $scope.allEmpUrl ='status=active&limit=10000&offset=1';
        $scope.urlQueryParams = 'status=active&limit=50&offset=1';
        $scope.defaultURL = '/api-employee/v2/company/' + gso.getAppConfig().companyId + '/assign-manager?';
        $scope.companyDirectoryURL ='/api-employee/v2/company/' + gso.getAppConfig().companyId + '/directory?';
        $scope.nextURL = $scope.defaultURL + $scope.urlQueryParams;
        $scope.resetFilters = false;

        $scope.filter = true;
        $scope.terminateOffSet = 0;
        $scope.employeeData = [];
        $scope.totalCount = null;
        $scope.unfilteredTotal = 1;
        $scope.depFilter = false;
        $scope.locFilter = false;
        $scope.showTotal = false;

        var json = {};
        if (SharedDataService.getAppSharedData().newDate) {
            SharedDataService.getAppSharedData().newDate='';
        }

        $scope.changeDate = function (date) {
            $scope.effectiveDate = gso.getUtilService().filterDate(date, constants.dateFormat);
        };

        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };
        $scope.formatDate = function (date) {
            var dateArray = date.split(' ');
            return gso.getUtilService().splitConcatDateString(dateArray[0]);
        };
        $scope.textboxhide = function () {
            $scope.searchbox = false;
        };
        $scope.resetData = function(){
            $scope.allData = [];
            $scope.assignManagerData =[];
            $scope.filterByData = [];
            $scope.showTotal = false;
            $scope.urlQueryParams = 'status=active&limit=50';
            $scope.urlQueryParams += '&offset=1'
            // if (nameFilter === '') {

            // }
        };
        $scope.setQueryParams = function(){
            if ($scope.deptIdFilterListStr !== '') {
                $scope.urlQueryParams += '&deptIds=' + $scope.deptIdFilterListStr;
            }
            if ($scope.locationIdFilterListStr !== '') {
                $scope.urlQueryParams += '&locationIds=' + $scope.locationIdFilterListStr;
            }
            if ($scope.positionIdFilterListStr !== '') {
                $scope.urlQueryParams += '&positionIds=' + $scope.positionIdFilterListStr;
            }
            if ($scope.directManagerIdFilterListStr !== '') {
                $scope.urlQueryParams += '&directMgrIds=' + $scope.directManagerIdFilterListStr;
            }
            if ($scope.workSupervisorIdFilterListStr !== '') {
                $scope.urlQueryParams += '&supervisorIds=' + $scope.workSupervisorIdFilterListStr;
            }
            if ($scope.nameFilter !== '') {
                $scope.urlQueryParams += '&searchTerm=' + $scope.nameFilter;
            }
            if ($scope.sortFilter !== '') { // per api we don't add order param if sorting by ASC
                if ($scope.sortFilter === 'DESC'){
                    $scope.urlQueryParams += '&sortOrder=' + $scope.sortFilter.toLowerCase();
                }
            }
        };
        $scope.sortResults = function (sortDirection) {
            $scope.sortFilter = sortDirection;
            $scope.invokeFilters();
        };
        $scope.showMore=function(){
            $scope.assignManagerGet();
        };
        $scope.$onInit = function () {
            $scope.searchBoxData = { value: '' };
            $scope.showModal = false;
            $scope.assignManagerGet();
        };
        $scope.closeFilter = function () {
            $scope.locFilter = false;
            $scope.depFilter = false;
        };
        $scope.searchFilter =function() {
            if($scope.search !== ""){
                $scope.nameFilter = $scope.search;
            }
            else {
                $scope.nameFilter = '';
                $scope.nextURL = $scope.defaultURL;
            }
            $scope.invokeFilters();
        };
        $scope.markDepartmentLocation=function()
        {
            angular.forEach($scope.departments,function(dep)
            {
                dep.departmentChecked=false;
            });
            angular.forEach($scope.locations,function(dep)
            {
                dep.locationChecked=false;
            })
            angular.forEach($scope.deptIdFilterList, function (item) {
                 angular.forEach($scope.departments,function(dep)
                {
                        if(item==dep.id)
                            {
                                dep.departmentChecked=true;
                            }
                })
            });
            angular.forEach($scope.locationIdFilterList, function (item) {
                angular.forEach($scope.locations,function(loc)
                {
                        if(item==loc.id)
                            {
                                loc.locationChecked=true;
                            }
                })
            });
        };
        $scope.invokeFilters = function() {
            $scope.resetFilters = true;
            $scope.resetData(); // reset activeData
            $scope.setQueryParams();
            $scope.assignManagerGet(); // call company directory api
        };
        $scope.filterLocations = function (loc, checked) {
            $scope.resetFilters = true;
            $scope.employeesByLocLoading = true;
            if(loc==='locCleared'){
                $scope.locationIdFilterList = [];
                angular.forEach($scope.locations, function (item) {
                    item.locationChecked=false;
                });
            }
            if (checked) {
                if ($scope.locationIdFilterList.indexOf(loc.id) < 0) {
                    $scope.locationIdFilterList.push(encodeURIComponent(loc.id));
                }
            } else {
                $scope.locationIdFilterList.splice($scope.locationIdFilterList.indexOf(loc.id), 1);
            }
            $scope.locationIdFilterListStr = ($scope.locationIdFilterList.join("&locationIds="));
            $scope.invokeFilters();
        };
        $scope.filterPositions =function(pos,checked)
        {
            $scope.resetFilters = true;
            $scope.employeesByPositionLoading = true;
            if(pos==='pocCleared'){
                $scope.positionIdFilterList = [];
                angular.forEach($scope.positions, function (item) {
                    item.positionChecked=false;
                });
            }
            if (checked) {
                if ($scope.positionIdFilterList.indexOf(pos.id) < 0) {
                    $scope.positionIdFilterList.push(encodeURIComponent(pos.id));
                }
            } else {
                $scope.positionIdFilterList.splice($scope.positionIdFilterList.indexOf(encodeURIComponent(pos.id)), 1);
            }
            $scope.positionIdFilterListStr = ($scope.positionIdFilterList.join("&positionIds="));
            $scope.invokeFilters();
        }
        $scope.filterDepartments = function (dept, checked) {
            $scope.resetFilters = true;
            $scope.employeesByDeptLoading = true;
            if(dept==='deptCleared'){
                $scope.deptIdFilterList = [];
                angular.forEach($scope.departments, function (item) {
                    item.departmentChecked=false;
                });
            }
            if (checked) {
                if ($scope.deptIdFilterList.indexOf(dept.id) < 0) {
                    $scope.deptIdFilterList.push(encodeURIComponent(dept.id));
                }
            } else {
                $scope.deptIdFilterList.splice($scope.deptIdFilterList.indexOf(dept.id), 1);
            }

            $scope.deptIdFilterListStr = $scope.deptIdFilterList.join("&deptIds=");
            $scope.invokeFilters();
        };

        $scope.filterDirectManagers = function (mngr, checked) {
            $scope.resetFilters = true;
            $scope.employeesByDeptLoading = true;
            if(mngr==='assignManagerCleared'){
                $scope.directManagerIdFilterList = [];
                angular.forEach($scope.directManagers, function (item) {
                    item.directManagerChecked=false;
                });
            }
            if (checked) {
                if ($scope.directManagerIdFilterList.indexOf(mngr.id) < 0) {
                    $scope.directManagerIdFilterList.push(encodeURIComponent(mngr.id));
                }
            } else {
                $scope.directManagerIdFilterList.splice($scope.directManagerIdFilterList.indexOf(mngr.id), 1);
            }

            $scope.directManagerIdFilterListStr = $scope.directManagerIdFilterList.join("&directMgrIds=");
            $scope.invokeFilters();
        };

        $scope.filterWorkSupervisors = function (wsup, checked) {
            $scope.resetFilters = true;
            $scope.employeesByDeptLoading = true;
            if(wsup==='workSupervisorCleared'){
                $scope.workSupervisorIdFilterList = [];
                angular.forEach($scope.workSupervisors, function (item) {
                    item.workSupervisorChecked=false;
                });
            }
            if (checked) {
                if ($scope.workSupervisorIdFilterList.indexOf(wsup.id) < 0) {
                    $scope.workSupervisorIdFilterList.push(encodeURIComponent(wsup.id));
                }
            } else {
                $scope.workSupervisorIdFilterList.splice($scope.workSupervisorIdFilterList.indexOf(wsup.id), 1);
            }

            $scope.workSupervisorIdFilterListStr = $scope.workSupervisorIdFilterList.join("&supervisorIds=");
            $scope.invokeFilters();
        };
        /*    Assign manager data fetching and parsing*/
        $scope.assignManagerGet = function () {
            if ($scope.resetFilters) {
                $scope.nextURL = $scope.defaultURL + $scope.urlQueryParams;
                $scope.resetFilters = false;
            }
            if($scope.nextURL !== '')
            {
            if (($scope.allData.length < parseInt($scope.unfilteredTotal, 10))) {
                gso.getCrudService().execute(constants.get,$scope.nextURL, null,
                    function (response) {
                        $scope.allData = $scope.allData.concat(response.employees);
                        $scope.assignManagerData = $scope.allData;
                        $scope.filterByData = $scope.assignManagerData;
                        if(response.facets)
                        {
                            if (initialLoad) {
                                $scope.departments =response.facets.departments? angular.copy(response.facets.departments):null;
                            }
                        }
                        if(response.facets)
                        {
                            if (initialLoad) {
                                $scope.locations =response.facets.locations? angular.copy(response.facets.locations):null;
                            }
                        }
                        if(response.facets)
                        {
                            if (initialLoad) {
                                $scope.directManagers =response.facets.directManagers? angular.copy(response.facets.directManagers):null;
                            }
                        }
                        if(response.facets)
                        {
                            if (initialLoad) {
                                $scope.positions =response.facets.positions? angular.copy(response.facets.positions):null;
                            }
                        }
                        if(response.facets)
                        {
                            if (initialLoad) {
                                $scope.workSupervisors =response.facets.workSupervisors? angular.copy(response.facets.workSupervisors):null;
                            }
                        }
                        // if (response.count !== 0) {
                        //     $scope.count = response.count;
                        // }
                        // else {
                        //     $scope.count = $scope.globalCount;
                        // }
                        // $scope.totalDiv = true;
                        // if ($scope.offset + $scope.activeLimit > $scope.count) {
                        //     $scope.activeLimit = $scope.activeLimit - (($scope.offset + $scope.activeLimit) - $scope.count);
                        // }
                        // if ($scope.allData.length > $scope.count) {
                        //     $scope.offset = $scope.count;
                        // }
                        // else {
                        //     $scope.offset = $scope.allData.length;
                        // }
                        if (response.pagination) {
                            $scope.totalCount = response.pagination.total;
                        }
                        else {
                            $scope.totalCount = response.employeeData.length;
                        }

                        if (initialLoad) {
                            $scope.unfilteredTotal = $scope.totalCount;
                            initialLoad = false;
                        }
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
                        }
                        else {
                            $scope.nextURL = '';
                        }

                    },

                    function (data) {
                        if ($scope.callback !== true) {
                            $scope.errorAlert = data;

                        }
                    }
                );
            }
        }

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
        $scope.changeReq = function (val, obj) {
            $scope.displayBlock = '';
            if(obj.employmentStatus === 'Pending Approval' && obj.workSupervisorStatus === 'Pending Approval'){
              return;
            }
            if(initialAllEmployeeGet)
            {
                $scope.getAllEmployeeNames(val, obj);
            }
            else{
            //Todo: Add this logic to remove the current manager and workSupervisor form the list
                $scope.populateUniqManagers(val, obj);
            }
            ngDialog.open({
                template: 'app/components/employee/assignManager/assignManagerChange.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                closeByDocument :false
            });
        };
        $scope.populateUniqManagers=function(val, obj)
        {
            $scope.uniqueDirectManagers=angular.copy($scope.uniqueManagers);
            $scope.uniqueSuperManagers=angular.copy($scope.uniqueManagers);
            var currentManagerIndex = $scope.uniqueDirectManagers.findIndex(function(item){
                return item.fullName ===obj.fullName;
            });
            if (currentManagerIndex !== -1) {
                $scope.uniqueDirectManagers.splice(currentManagerIndex, 1);
            }
            var currentSupermanagerIndex = $scope.uniqueSuperManagers.findIndex(function(item){
                return item.fullName ===obj.fullName;
            });
            if (currentSupermanagerIndex !== -1) {
                $scope.uniqueSuperManagers.splice(currentSupermanagerIndex, 1);
            }
            $scope.dataToSave = {};
            $scope.directMangerQuery = '';
            $scope.workSupervisorsQuery = '';
            $scope.effectiveDate = $scope.currentDate;
            $scope.dataToSave.employeeId = obj.employeeId;
            $scope.errorAlertAssignManger = null;
            $scope.assignManagerchangeData = obj;
            $scope.indexvalue = val;
            $scope.assignManagerchangeData.isValid = false;
            $scope.assignToMeSupervisor = false;
            $scope.assignToMeDirect = false;
            initialAllEmployeeGet=false;
        }
        $scope.getAllEmployeeNames=function(val, obj)
        {
            gso.getCrudService().execute(constants.get,$scope.companyDirectoryURL+$scope.allEmpUrl, null, function (response) {
                filterEmployees(response.employees);
                $scope.uniqueManagers= $filter('unique')($scope.dropDownList, 'fullName');
                $scope.populateUniqManagers(val, obj);
                },
                function (data) {
                }
           );
        }
        $scope.closeAlert = function () {
            $scope.errorCodeBool = false;
            $scope.errorAlert = null;
        };
        $scope.updateData = function () {

            $scope.dataToSave.effectiveDate = $filter('date')($scope.effectiveDate, "yyyy-MM-dd");

            gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.assignManager, JSON.stringify($scope.dataToSave),
                function (response, status) {
                    $scope.busy = false;
                    $scope.offset = 0;
                    $scope.activeLimit = 20;
                    $scope.allData = [];
                    $scope.errorAlert = {
                        _statusCode: status + '',
                        _statusPage: 'assignManager'
                    };
                    $scope.search = '';
                    ngDialog.closeAll();
                    $scope.invokeFilters();
                },
                function (data) {
                    ngDialog.closeAll();
                    $scope.errorAlert = {
                        _statusMessage: data._statusMessage
                    };


                }
            );
            $scope.showchangeReq = false;
            $scope.effectiveDate = null;
            $scope.format = null;
        };

        $scope.close = function () {
            ngDialog.closeAll();
        };
        $scope.redirect = function(){
            sessionStorage.setItem("assignManager",true);
            $location.path('/workInbox');
        };
        $scope.lengthProperty = function () {
            return angular.element(".lengthProperty").length;
        };

        // $scope.searchFilter = function () {
        //     if ($scope.search !== undefined && $scope.search.length > 0) {
        //         $scope.checkForSearchItem();
        //     } else {
        //         $scope.filterByData = $scope.assignManagerData;
        //     }
        // };

        $scope.checkForSearchItem = function () {
            var searchItem = $scope.search.toLowerCase();
            $scope.filterByData = $scope.filterSearchEmployees($scope.globalActiveEmp.assignManagerList, searchItem);
        };

        $scope.filterSearchEmployees = function (items, searchItem) {
            var stringMatch = new RegExp(searchItem, 'i');
            return items.filter(function(item){
                return stringMatch.test(item.fullName) || stringMatch.test(item.employeeId);
            });
        };

        $scope.getAllEmployees = function () {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.assignManager, null,
                function (response) {
                    $scope.globalActiveEmp = response;
                    $scope.globalCount = response.count;
                    $scope.emplist =  $scope.globalActiveEmp.assignManagerList;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        //ToDo: Function to load on page scroll:
        $scope.loadData = function () {
                $scope.assignManagerGet();
        };
       // ToDo: Getting the Employee Roles to the user:
         $scope.empRolesDataService = gso.getCrudService()
           .execute(constants.get,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                   manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.userRoles, null, function (response) {
                   $scope.empRolesData = response;
                   $scope.adminRole=$scope.empRolesData.some(function(item){ return (item ==="HRAdmin" || item ==="HRAUTH_R");});
                   if(!$scope.adminRole){
                     $scope.eTagRole=$scope.empRolesData.some(function(item){ return (item ==="MTAG" || item ==="STAFF_MGMT" || item ==="HRAUTH");});
                   }
               },
               function (data) {
               }
           );

         // ToDo: Calling the directory Data:

        function disableButton(){
           ($scope.dataToSave.directManagerEmployeeId || $scope.dataToSave.workSupervisorEmployeeId ) ? $scope.assignManagerchangeData.isValid = true : $scope.assignManagerchangeData.isValid = false ;
        }
        $scope.resetSelectedValue = function (state) {
            $scope.displayBlock = '';
            if(state === 'directManager'){
                $scope.direct = null;
                $scope.dataToSave.directManagerEmployeeId = null;
                $scope.directMangerQuery = null;
            }
            else if(state === 'supervisor'){
                $scope.supr = null;
                $scope.dataToSave.workSupervisorEmployeeId = null;
                $scope.workSupervisorsQuery = null;
            }
            disableButton();
        };

        $scope.changeValue = function (val, filterBy, disp) {
            $scope.displayBlock = '';
            if (val)
            {
               $scope.displayBlock = disp;
               if(disp === 'direct'){
                 $scope.directManagerData = $scope.uniqueDirectManagers.filter(function (manager) {
                   if (manager.fullName.toLowerCase().includes(val.toLowerCase())  && manager.employeeId !== $scope.dataToSave.employeeId){
                       return manager;
                   }
                 });
                  if($scope.directManagerData.length === 0){
                    $scope.displayBlock = '';
                    $scope.assignManagerchangeData.isValid = false;
                   }
               }
               if(disp === 'super'){
                     $scope.superDirectManagerData = $scope.uniqueSuperManagers.filter(function (manager) {
                     if (manager.fullName.toLowerCase().includes(val.toLowerCase()) && manager.employeeId !== $scope.dataToSave.employeeId) {
                         return manager;
                     }
                  });
                   if($scope.superDirectManagerData.length === 0){
                        $scope.displayBlock = '';
                        $scope.assignManagerchangeData.isValid = false;
                    }
               }


              disableButton();
            }
            else{
                if (disp === 'direct'){
                    $scope.dataToSave.directManagerEmployeeId = null;
                }
                else if(disp === 'super'){
                    $scope.dataToSave.workSupervisorEmployeeId = null;
                }
            }



        };

        var input = {
            'directManagerEmployeeId': null,
            'workSupervisorEmployeeId': null,
            'employeeId':null,
            'effectiveDate':null
        };

        $scope.selectedValue = function (obj, position, checked) {
          $scope.displayBlock = '';
          $scope.assignManagerchangeData.isValid = false;
          if (position === 'super') {
              $scope.supr = obj;
              $scope.dataToSave.workSupervisorEmployeeId = obj.employeeId;
              $scope.workSupervisorsQuery = obj.fullName;
          } else if(position === 'direct') {
              $scope.direct = obj;
              $scope.dataToSave.directManagerEmployeeId = obj.employeeId;
              $scope.directMangerQuery = obj.fullName;
          }
           disableButton();
      };

      $scope.assignToMeSelection=function(value){
          if(value === 'assignDirect') {
           $scope.assignToMeDirect= true;
           $scope.dataToSave.directManagerEmployeeId = gso.getAppConfig().userId;
        }else{
           $scope.assignToMeSupervisor= true;
           $scope.dataToSave.workSupervisorEmployeeId = gso.getAppConfig().userId;
        }
         disableButton();
     };

        $scope.assignManagerGet();
        //$scope.getAllEmployees();

        function filterEmployees(arr) {
            $scope.dropDownList = arr.filter(function (obj) {
                if (obj.employeeId && obj.fullName) {
                    return obj;
                }
            });
        }
         //ToDo: Filter the records from server side:
     $scope.filteredPositionData = function(position,positionChecked){
        var arr = [];
        position.position = (position.position === null) ? null : position.position.trim();
        if(positionChecked){
            $scope.selectedPositions.push(position.position);
        }else{
            var index = $scope.selectedPositions.indexOf(position.position);
            if (index !== -1) {
                $scope.selectedPositions.splice(index, 1);
            }
        }

        if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
            arr = $scope.assignManagerData;
        }else if($scope.selectedPositions.length > 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
             $scope.emplist.forEach(function (emp) {
                 $scope.selectedPositions.forEach(function (Pos) {
                   if (emp.position === Pos) {
                     arr.push(emp);
                   }
                });
             });
         }
         else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length > 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
             $scope.emplist.forEach(function (emp) {
                 $scope.selectedDepartments.forEach(function (dept) {
                   if (emp.departement === dept) {
                     arr.push(emp);
                   }
                });
             });
         }
         else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length > 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
             $scope.emplist.forEach(function (emp) {
                 $scope.selectedLocations.forEach(function (loc) {
                   if (emp.location === loc) {
                     arr.push(emp);
                   }
                });
             });
         }
         else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length > 0 && $scope.selectedWorkSupervisor.length===0){
             $scope.emplist.forEach(function (emp) {
                 $scope.selectedDirectManager.forEach(function (directManager) {
                   if (emp.directManagerName === directManager) {
                     arr.push(emp);
                   }
                });
             });
         }
         else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length > 0){
             $scope.emplist.forEach(function (emp) {
                 $scope.selectedWorkSupervisor.forEach(function (workSupervisorFilterData) {
                   if (emp.workSupervisorName === workSupervisorFilterData) {
                     arr.push(emp);
                   }
                });
             });
         }
        else{
            angular.forEach($scope.filterByData,function(emp){
                angular.forEach($scope.selectedPositions,function(pos){
                    if(emp.position === pos){
                        arr.push(emp);
                    }
                });
            });
        }
        $scope.filterByData = arr;
     };
     $scope.filteredDeptData = function(department,departmentChecked){
            var arr = [];
            department.departement = (department.departement === null) ? null : department.departement.trim();
            if(departmentChecked){
                $scope.selectedDepartments.push(department.departement);
            }else{
                var index = $scope.selectedDepartments.indexOf(department.departement);
                if (index !== -1) {
                    $scope.selectedDepartments.splice(index, 1);
                }
            }

            if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                arr = $scope.assignManagerData;
            }else if($scope.selectedPositions.length > 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedPositions.forEach(function (Pos) {
                       if (emp.position === Pos) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length > 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDepartments.forEach(function (dept) {
                       if (emp.departement === dept) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length > 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedLocations.forEach(function (loc) {
                       if (emp.location === loc) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length > 0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDirectManager.forEach(function (directManager) {
                       if (emp.directManagerName === directManager) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length > 0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedWorkSupervisor.forEach(function (workSupervisorFilterData) {
                       if (emp.workSupervisorName === workSupervisorFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
            else{
                angular.forEach($scope.filterByData,function(emp){
                    angular.forEach($scope.selectedDepartments,function(dept){
                        if(emp.departement === dept){
                            arr.push(emp);
                        }
                    });
                });
            }
            $scope.filterByData = arr;
            };
        $scope.filteredLocData = function(location,locationChecked){
            var arr = [];
             location.location = (location.location === null) ? null : location.location.trim();
            if(locationChecked){
                $scope.selectedLocations.push(location.location);
            }else{
                var index = $scope.selectedLocations.indexOf(location.location);
                if (index !== -1) {
                    $scope.selectedLocations.splice(index, 1);
                }
            }

            if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                arr = $scope.assignManagerData;
            }else if($scope.selectedPositions.length > 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedPositions.forEach(function (Pos) {
                       if (emp.position === Pos) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length > 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDepartments.forEach(function (dept) {
                       if (emp.departement === dept) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length > 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedLocations.forEach(function (loc) {
                       if (emp.location === loc) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length > 0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDirectManager.forEach(function (directManager) {
                       if (emp.directManagerName === directManager) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length > 0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedWorkSupervisor.forEach(function (workSupervisorFilterData) {
                       if (emp.workSupervisorName === workSupervisorFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
            else{
                angular.forEach($scope.filterByData,function(emp){
                    angular.forEach($scope.selectedLocations,function(loc){
                        if(emp.location === loc){
                            arr.push(emp);
                        }
                    });
                });
            }
            $scope.filterByData = arr;
            };
      $scope.filteredDirectManagerData = function(directManager,directChecked){
            var arr = [];
            directManager.directManagerName = (directManager.directManagerName === null) ? null : directManager.directManagerName.trim();
            if(directChecked){
                $scope.selectedDirectManager.push(directManager.directManagerName);
            }else{
                var index = $scope.selectedDirectManager.indexOf(directManager.directManagerName);
                if (index !== -1) {
                    $scope.selectedDirectManager.splice(index, 1);
                }
            }

            if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                arr = $scope.assignManagerData;
            }else if($scope.selectedPositions.length > 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedPositions.forEach(function (Pos) {
                       if (emp.position === Pos) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length > 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDepartments.forEach(function (dept) {
                       if (emp.departement === dept) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length > 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedLocations.forEach(function (loc) {
                       if (emp.location === loc) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length > 0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDirectManager.forEach(function (directManagerFilterData) {
                       if (emp.directManagerName === directManagerFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length > 0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedWorkSupervisor.forEach(function (workSupervisorFilterData) {
                       if (emp.workSupervisorName === workSupervisorFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
            else{
                angular.forEach($scope.filterByData,function(emp){
                    angular.forEach($scope.selectedDirectManager,function(directManager){
                        if(emp.directManagerName === directManager){
                            arr.push(emp);
                        }
                    });
                });
            }
            $scope.filterByData = arr;
            };
       $scope.filteredWorkSupervisorData = function(workSupervisor,WorkChecked){
            var arr = [];
            workSupervisor.workSupervisorName = (workSupervisor.workSupervisorName === null) ? null : workSupervisor.workSupervisorName.trim();
            if(WorkChecked){
                $scope.selectedWorkSupervisor.push(workSupervisor.workSupervisorName);
            }else{
                var index = $scope.selectedWorkSupervisor.indexOf(workSupervisor.workSupervisorName);
                if (index !== -1) {
                    $scope.selectedWorkSupervisor.splice(index, 1);
                }
            }

            if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                arr = $scope.assignManagerData;
            }else if($scope.selectedPositions.length > 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedPositions.forEach(function (Pos) {
                       if (emp.position === Pos) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length > 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDepartments.forEach(function (dept) {
                       if (emp.departement === dept) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length > 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedLocations.forEach(function (loc) {
                       if (emp.location === loc) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length > 0 && $scope.selectedWorkSupervisor.length===0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedDirectManager.forEach(function (directManagerFilterData) {
                       if (emp.directManagerName === directManagerFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else if($scope.selectedPositions.length === 0 && $scope.selectedDepartments.length === 0 && $scope.selectedLocations.length === 0 && $scope.selectedDirectManager.length===0 && $scope.selectedWorkSupervisor.length > 0){
                 $scope.emplist.forEach(function (emp) {
                     $scope.selectedWorkSupervisor.forEach(function (workSupervisorFilterData) {
                        /*emp.workSupervisorName = (emp.workSupervisorName == null) ? null : emp.workSupervisorName;*/
                        if (emp.workSupervisorName === workSupervisorFilterData) {
                         arr.push(emp);
                       }
                    });
                 });
             }
             else{
                angular.forEach($scope.filterByData,function(emp){
                    angular.forEach($scope.selectedWorkSupervisor,function(supervisorData){
                        if(emp.workSupervisorName === supervisorData){
                            arr.push(emp);
                        }
                    });
                });
            }
            $scope.filterByData = arr;
            };

    }]);
