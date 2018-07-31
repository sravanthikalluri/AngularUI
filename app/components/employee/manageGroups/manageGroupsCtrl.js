
'use strict';
trinetApp
    .controller(
        'manageGroupsCtrl', ['$scope', 'gso','$timeout','$window', '$filter','SharedDataService',
            function ($scope, gso,$timeout,$window, $filter,SharedDataService) {
                var companyName = $window.sessionStorage.getItem('companyName');
                $scope.companyName = companyName ? companyName : gso.getAppConfig().companyName;
                $scope.sortType = $scope.sortTypeChange = 'employeeName';
                $scope.sortReverse = $scope.sortReverseChange = $scope.showManageEmpColList = $scope.filtercond = $scope.locationfiltercond = $scope.selectedsingleEmployee = false;
                $scope.notSelectedAllEmployees = $scope.groupChangeRequest = $scope.manageGroupRequest = $scope.createGroupChangeRequest = $scope.selectedAllEmployes = false;
                $scope.sortTypeEmp = $scope.sortTypeEmpChange = 'name';
                var isDateChanged = false;
                $scope.selectedEmployee = false;
                $scope.offset= 0;
                $scope.depOffset=0;
                $scope.locOffset=0;
                $scope.LpcOffset =0;
                $scope.depLocLpc=0;
                $scope.depLoc=0;
                $scope.locLpc=0;
                $scope.depLpc=0;
                $scope.activeLimit=20;
                var count=0;
                var employeeCount=1;
                $scope.disableSave  = true;
                $scope.test=false;
                $scope.activeData = [];
                $scope.batchData=[];
                $scope.sick = false;
                $scope.vacation = false;
                $scope.pto =false;
                $scope.eib = false;
                $scope.restricted = false;
                $scope.showLeavePlan = false;
                $scope.viewDropDown = false;
                $scope.loadGropChangeData = false;
                var noOhioPolicyNumber = false;
                var individualsSelected = [];
                getRoleData();
                $scope.restrictedlocations = false;

                $scope.currentDate = gso.getUtilService().filterToDayDate();
                // Todo: Function to load the BatchSummary page
                $scope.activeManagerGroups = function () {
                    $scope.allData = [];
                    if ($scope.busy) {
                        return;
                    }
                    $scope.busy = true;
                    gso.getCrudService().
                        execute(constants.get,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId+ "/group-changes?limit=20&offset="+   $scope.offset, null, function (response) {
                                $scope.manageGroupRequest = true;
                                $scope.selection=[];
                                $scope.createGroupChangeRequest = false;
                                $scope.groupChangeRequest = false;
                                $scope.batchData = $scope.batchData.concat(response);
                                $scope.manageGroupData = $scope.batchData;
                                $scope.count=$scope.manageGroupData.length;
                                $scope.totalCount = response.count;
                                $scope.totalDiv = true;
                                $scope.busy = false;
                                $scope.callback=true;
                                $scope.offset = $scope.batchData.length;
                            },
                            function (data) {
                                 if($scope.callback !== true){
                                 $scope.errorAlert = data;
                                }
                                $scope.busy = false;
                            }
                        );
                  };

                //service to get leave plans.
                function getLeavePlans(){
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                                gso.getAppConfig().companyId + "/leave-plans", null,
                       function (response) {
                           if(response.length > 0){
                               $scope.showLeavePlan = true;
                           }
                       },
                       function (data) {
                           $scope.errorAlert = data;
                       }
                   );
                }

                function getDepartmentData(date){
                 gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    gso.getAppConfig().companyId + "/" + profileUrlConfig.resources.departments+ "?effectiveDate="+ date , null,
                    function (response) {
                        $scope.departmentsData = response;
                    },
                    function (data) {

                    }
                  );
                }
                // Checking for HRAuth_R

                function getRoleData(){
                    gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee +
                        '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.employeeRoles, null,
                        function (response) {
                            for (var i = 0; i < response.length; i++) {
                                if ((response[i].role === "HRAUTH_R"))
                                {
                                    $scope.restrictedlocations = true;
                                }
                            }
                            if($scope.restrictedlocations === true){
                                hrAuthRole();
                            }
                        },
                        null
                    );}


                //Added this logic for showing search employees
                $scope.searchFilter =function(batchSearchItem) {
                    if(batchSearchItem!== undefined && batchSearchItem.length >0){
                        $scope.checkForSearchItem(batchSearchItem);
                        $scope.isSearch = true;
                    }else{
                        $scope.setLimit = 20;
                        $scope.filterByData = $scope.createGroupChangeData.employees.slice(0,$scope.setLimit);
                    }
                };
                $scope.checkForSearchItem = function(batchSearchItem){
                    var searchItem = batchSearchItem.toLowerCase();
                    $scope.searchData = gso.getUtilService().sortArrayWithEmpname($scope.totalBatchChangesData,searchItem, $scope.onoffswitchEmp);
                    $scope.filterByData = $scope.searchData.slice(0,$scope.setLimit);
                };

                function  getBatchChangesBulk(){
                    var URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=DEP,LOC,LPC";
                    gso.getCrudService().execute(constants.get,URL, null, function (result) {
                        $scope.totalBatchChangesData= result.employees

                    }, function (data) {
                    });
                }



                //code to get Restricted locations data
                function hrAuthRole() {
                    gso.getCrudService().execute(constants.get,'/api-config/v1/company/'+gso.getAppConfig().companyId+ "/" +gso.getAppConfig().userId+'/locations',null,
                        function (response) {
                            $scope.locationsData = response;
                        },
                        function (data) {
                        }
                    );

                }
                //code to get locations data
                function getLocationData(date){
                gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    gso.getAppConfig().companyId + globalUrlConfig.resources.locations+ "?effectiveDate="+ date, null,
                    function (response) {
                        $scope.locationsData = response;
                    },
                    function (data) {
                    }
                  );
                }
                //service call for leavetype sick
                function getSickData(){
                gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                     gso.getAppConfig().companyId + "/leave-plans?leave=Sick", null, function (result) {
                     result.unshift({
                           "benefitPlan": "NOPLAN",
                           "benefitPlanDescription": "-No Plan-"
                       });
                     $scope.sickData=result;

                 }, function (data) {

                 });
                 }

                //service call for leavetype vacation
                function getVacationData(){
                 gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                       gso.getAppConfig().companyId + "/leave-plans?leave=Vacation", null, function (result) {
                       result.unshift({
                           "benefitPlan": "NOPLAN",
                           "benefitPlanDescription": "-No Plan-"
                        });
                       $scope.vacationsData=result;
                   }, function (data) {

                   });
                  }
                   //service call for leavetype personal
                  function getPersonalData(){
                   gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                      gso.getAppConfig().companyId + "/leave-plans?leave=Personal", null, function (result) {
                       result.unshift({
                           "benefitPlan": "NOPLAN",
                           "benefitPlanDescription": "-No Plan-"
                       });
                      $scope.ptoData=result;
                  }, function (data) {

                  });
                  }

                   //service call for leavetype EIB
                   function getEIBData(){
                     gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                      gso.getAppConfig().companyId + "/leave-plans?leave=EIB", null, function (result) {
                       result.unshift({
                             "benefitPlan": "NOPLAN",
                             "benefitPlanDescription": "-No Plan-"
                       });
                      $scope.eibData=result;
                     }, function (data) {
                  });
                  }

                  //service call for leave type restricted
                  function getRestrictedData(){
                   gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                      gso.getAppConfig().companyId + "/leave-plans?leave=floatingHoliday", null, function (result) {
                       result.unshift({
                           "benefitPlan": "NOPLAN",
                           "benefitPlanDescription": "-No Plan-"
                       });
                      $scope.restrictedData=result;
                   }, function (data) {
                        $scope.errorAlert = data;
                  });
                  }

                //Todo:Adding the Data Dynamically
                 function getPlanTypeData(plan){
                      if(plan === "Sick"){
                         $scope.sick = true;
                          getSickData();
                      }else if(plan === "Vacation"){
                          $scope.vacation = true;
                          getVacationData();
                      }else if(plan === "Personal"){
                          $scope.pto =true;
                          getPersonalData();
                       }else if(plan === "EIB"){
                         $scope.eib = true;
                         getEIBData();
                       }else if(plan.indexOf("Restricted") > -1){
                         $scope.restricted = true;
                         getRestrictedData();
                      }
                 }
                //Todo:Route the correct URL
                $scope.parseUrl=function(data){
                    $scope.scrollData = data;
                    $scope.groupChangeList = {
                        "department": "Department Change",
                        "location": "Location Change",
                        "leavePlan": "Leave Plan Change"
                    };
                    $scope.selectedList = [];
                    Object.keys(data).map(function(keys){
                        if(data[keys]){
                            $scope.selectedList.push($scope.groupChangeList[keys]);
                        }
                    });
                    $scope.selectedList = $scope.selectedList.join(', ') + ' for '+ gso.getUtilService().filterDate($scope.currentDate, constants.fullDateFormat);

                    if (angular.isDefined(data)) {
                    if (isDateChanged === false) {
                        $scope.selectedDate = gso.getUtilService().filterToDayDate();
                    }
                    switch (data !== null || data !== undefined) {

                        case data.department === true && data.location === undefined && data.leavePlan===undefined :
                            $scope.isDepartment = true;
                            $scope.isLocation = false;
                            $scope.isLeavePlan = false;
                            $scope.changetp = "DEP";
                            getDepartmentData($scope.currentDate);
                            var URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=DEP&limit=" + $scope.activeLimit + "&offset="+$scope.depOffset+"&sortBy=name&sortOrder=asc";
                            break;

                        case data.department === undefined && data.location === true && data.leavePlan===undefined :
                            $scope.isLocation = true;
                            $scope.isDepartment = false;
                            $scope.isLeavePlan = false;
                            $scope.changetp = "LOC";
                            checkNoOhioPolicyNbr();
                            if($scope.restrictedlocations === true){
                                hrAuthRole();
                            }else {
                                getLocationData($scope.currentDate);
                            }
                            URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=LOC&limit=" + $scope.activeLimit + "&offset="+$scope.locOffset+"&sortBy=name&sortOrder=asc";
                            break;

                        case data.department === true && data.location === true && data.leavePlan === undefined:
                            $scope.isDepartment = true;
                            $scope.isLocation = true;
                            $scope.isLeavePlan = false;
                            $scope.changetp = "DEP,LOC";
                            getDepartmentData($scope.currentDate);
                            checkNoOhioPolicyNbr();
                            if($scope.restrictedlocations === true){
                                hrAuthRole();
                            }else {
                                getLocationData($scope.currentDate);
                            }
                            URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=DEP,LOC&limit=" + $scope.activeLimit + "&offset="+$scope.depLoc+"&sortBy=name&sortOrder=asc";
                            break;

                         case data.department === true && data.location === true && data.leavePlan === true:
                              $scope.isDepartment = true;
                              $scope.isLocation = true;
                              $scope.isLeavePlan = true;
                              $scope.changetp = "DEP,LOC,LPC";
                              getDepartmentData($scope.currentDate);
                              checkNoOhioPolicyNbr();
                             if($scope.restrictedlocations === true){
                                 hrAuthRole();
                             }else {
                                 getLocationData($scope.currentDate);
                             }
                              URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=DEP,LOC,LPC&limit=" + $scope.activeLimit + "&offset="+$scope.depLocLpc+"&sortBy=name&sortOrder=asc";
                             break;

                         case data.department === undefined && data.location === true && data.leavePlan === true:
                               $scope.isDepartment = false;
                               $scope.isLocation = true;
                               $scope.isLeavePlan = true;
                               $scope.changetp = "LOC,LPC";
                               checkNoOhioPolicyNbr();
                             if($scope.restrictedlocations === true){
                                 hrAuthRole();
                             }else {
                                 getLocationData($scope.currentDate);
                             }
                               URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=LOC,LPC&limit=" + $scope.activeLimit + "&offset="+$scope.locLpc+"&sortBy=name&sortOrder=asc";
                             break;

                         case data.department === true && data.location === undefined && data.leavePlan === true:
                               $scope.isDepartment = true;
                               $scope.isLocation = false;
                               $scope.isLeavePlan = true;
                               $scope.changetp = "DEP,LPC";
                               getDepartmentData($scope.currentDate);
                               URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +"?include=DEP,LPC&limit=" + $scope.activeLimit + "&offset="+$scope.depLpc+"&sortBy=name&sortOrder=asc";
                               break;

                        case data.department === undefined && data.location === undefined && data.leavePlan==true:
                            $scope.isLeavePlan = true;
                            $scope.isDepartment = false;
                            $scope.isLocation = false;
                            $scope.changetp = "LPC";
                            URL = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId+"?include=LPC&limit=" + $scope.activeLimit + "&offset="+$scope.LpcOffset+"&sortBy=name&sortOrder=asc";
                            break;

                         default:
                         break;

                    }
                    $scope.allData = [];
                     if ($scope.busy) {
                           return;
                     }
                    $scope.busy = true;
                    if(count < employeeCount) {
                        gso.getCrudService().execute(constants.get,URL + '&effectiveDate='+ $scope.currentDate, null,
                            function (response) {
                                $scope.selection = [];
                                $scope.createGroupChangeRequest = true;
                                $scope.manageGroupRequest = false;
                                $scope.groupChangeRequest = false;
                                if ($scope.isLeavePlan) {
                                    response.planTypes ? $scope.x = response.planTypes.length + 4 : angular.noop();
                                    if($scope.isDepartment === true &&  $scope.isLocation === true){
                                        $scope.x = $scope.x+2;
                                    }else if($scope.isDepartment === true ||  $scope.isLocation === true) {
                                        $scope.x = $scope.x+1;
                                    }
                                    angular.forEach(response.employees, function (item) {
                                        gso.getUtilService().employeeLeaveType(item);
                                    });
                                }
                                $scope.activeData = $scope.activeData.concat(response.employees);
                                if($scope.isLeavePlan){
                                   angular.forEach(response.planTypes,function(plan){
                                      getPlanTypeData(plan);
                                   });
                                }
                                response.employees = $scope.activeData;
                                $scope.manageGroupData = $scope.activeData;
                                $scope.count = $scope.manageGroupData.length;
                                count = $scope.manageGroupData.length;
                                $scope.employeeCount = response.employeesCount;
                                $scope.totalCount = response.employeesCount;
                                employeeCount = response.employeesCount;
                                $scope.totalDiv = true;
                                $scope.busy = false;
                                $scope.callback = true;
                                $scope.createGroupChangeData = response;
                                $scope.filterByData=response.employees;

                                switch(data!==null) {

                                    case data.department === true && data.location === undefined && data.leavePlan===undefined :
                                        $scope.depOffset = $scope.activeData.length;
                                         break;

                                    case data.department === undefined && data.location === true && data.leavePlan===undefined :
                                        $scope.locOffset = $scope.activeData.length;
                                        break;

                                    case data.department === true && data.location === true && data.leavePlan === undefined:
                                        $scope.depLoc = $scope.activeData.length;
                                        break;

                                    case data.department === true && data.location === true && data.leavePlan === true:
                                        $scope.depLocLpc = $scope.activeData.length;
                                        break;

                                    case data.department === undefined && data.location === true && data.leavePlan === true:
                                        $scope.locLpc = $scope.activeData.length;
                                        break;

                                    case data.department === true && data.location === undefined && data.leavePlan === true:
                                        $scope.depLpc = $scope.activeData.length;
                                        break;

                                    case data.department === undefined && data.location === undefined && data.leavePlan==true:
                                        $scope.LpcOffset = $scope.activeData.length;
                                        break;
                                    default:

                                }
                                $scope.loaderSpinner = false;
                                gso.getNGDialog().closeAll();
                            },
                            function (data) {
                                gso.getNGDialog().closeAll();
                                if ($scope.callback !== true) {
                                    $scope.errorAlert = data;
                                }
                                $scope.busy = false;
                            }
                        );
                    }

                  }
                };


                // Todo" Logic to show the CreateGroupChangeData on selecting the checkbox
                $scope.requestGroupChange = function () {
                   // $scope.selectedDate = gso.getUtilService().filterToDayDate();

                    $scope.requestGroupChangeFlag = true;
                    var dialog = gso.getNGDialog().open({
                        templateUrl: 'app/components/employee/manageGroups/groupChange.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        controller: ['$scope', function ($scope) {

                            $scope.closeDialog = function (formName) {
                                var fieldsArray = ['groupChangepastdate', 'groupChangeFuturedate'];
                                $scope.isModelNameSubmitted = true;
                                if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.createGroupChange.blur, fieldsArray)) {
                                    gso.getUtilService().focusInvalidElement('form#group_chnage_form');
                                    $scope.onFocus('createGroupChange', $scope.validationPatterns.createGroupChange.focus);
                                    $scope.customIdAlert = {
                                        _statusCode: '400',
                                        _statusMessage: $scope.translation.pageValidationMessage
                                    };
                                    $scope.showErrorMessage = true;
                                } else {
                                    $scope.loaderSpinner = true;
                                    var data= {
                                        department: $scope.department,
                                        location: $scope.loc,
                                        leavePlan: $scope.leavePlan
                                    };
                                    $scope.parseUrl(data);
                                }
                            };
                        }]
                    });
                    dialog.closePromise.then(function () {
                        $scope.selectedCount = 0;
                        $scope.validationPatterns.createGroupChange.focus.groupChangeFuturedate = false;
                        $scope.validationPatterns.createGroupChange.blur.groupChangeFuturedate = false;
                        $scope.validationPatterns.createGroupChange.focus.groupChangepastdate = false;
                        $scope.validationPatterns.createGroupChange.blur.groupChangepastdate = false;
                        $scope.isModelNameSubmitted = false;
                        $scope.busy = false;
                    });
                    $scope.effectiveNewDate = $scope.sysDate;
                };


                $scope.validatePasteAndFutureDates = function(obj,fieldsArray){
                    var isTrue = false;
                      angular.forEach(fieldsArray,function(field){
                           if(obj[field]){
                             isTrue = true;
                           }
                      });
                      return isTrue;
                };
                //Todo: AllGroup change Data*****************/
                function getGroupChnageData(value){
                    gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                        manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + '/group-changes/'+value, null,
                        function (response) {
                            $scope.loadGropChangeData = true;
                            angular.forEach(response.planTypes,function(plan){
                                getPlanTypeData(plan);
                            });
                           /* angular.forEach(response.groupChangesDetails, function (item) {
                                gso.getUtilService().employeeLeaveType(item);
                            });*/
                            if ($scope.isLeave) {
                                $scope.y = response.planTypes.length + 4;
                                if($scope.isDepartment === true &&  $scope.isLocation === true){
                                    $scope.y = $scope.y+2;
                                }else if($scope.isDepartment === true ||  $scope.isLocation === true) {
                                    $scope.y = $scope.y+1;
                                }
                            }
                           /* if( $scope.isLeave){
                                angular.forEach(response.groupChangesDetails, function (item) {
                                    gso.getUtilService().employeeLeaveType(item);
                                });
                            }
                            if($scope.isLeavePlan){
                               angular.forEach(response.planTypes,function(plan){
                                  getPlanTypeData(plan);
                               });
                            }*/
                            $scope.groupChangeData = response;
                            $scope.selection = [];
                            //$scope.$apply;
                        },
                        function (data) {
                            $scope.errorAlert = data;
                        }
                    );
                }

                $scope.visibleGroupChange = function (data) {
                    $scope.submittedBy = data.submittedBy;
                    $scope.submittedOn = data.submittedOn;
                    $scope.effectiveDate = data.effectiveDate;
                    $scope.status = data.status;
                    $scope.changeTypes = data.changeTypes;
                    $scope.effectiveDate = data.effectiveDate;
                    $scope.changeTypeCode = data.changeTypeCode;
                    $scope.batchID=data.batchId;
                    $scope.isStatus = false;
                    if ($scope.status === 'Completed') {
                        $scope.isStatus = true;
                        getGroupChnageData($scope.batchID);
                    }
                    $scope.isDepartment = false;
                    $scope.isLocation = false;
                    $scope.isLeave = false;
                      if ($scope.changeTypeCode==="DEP") {
                               $scope.isDepartment = true;
                               $scope.changetp = "DEP";
                               //getGroupChnageData(manageEmpUrlConfig.resources.groupchangesdep );
                           }
                           if ($scope.changeTypeCode ==="LOC") {
                               $scope.isLocation = true;
                               $scope.changetp = "LOC";
                               //getGroupChnageData(manageEmpUrlConfig.resources.groupchangesloc );
                           }
                           if ($scope.changeTypeCode ==="LPC") {
                               $scope.isLeave = true;
                               $scope.changetp = "LPC";
                              // getGroupChnageData( manageEmpUrlConfig.resources.groupchangeslpc );
                           }
                           if ($scope.changeTypeCode ==="DEP, LOC, LPC") {
                                $scope.isDepartment = true;
                                $scope.isLocation = true;
                                $scope.isLeave = true;
                                $scope.changetp = "DEP,LOC,LPC";
                               //getGroupChnageData( manageEmpUrlConfig.resources.groupchangesdeploclpc );
                           }
                           if ($scope.changeTypeCode.indexOf('DEP, LPC') > -1) {
                               $scope.isLeave = true;
                               $scope.isDepartment = true;
                               $scope.changetp = "DEP,LPC";
                               //getGroupChnageData( manageEmpUrlConfig.resources.groupchangeslpc );
                           }
                           if ($scope.changeTypeCode.indexOf('DEP, LOC') > -1) {
                               $scope.isDepartment = true;
                               $scope.isLocation = true;
                               $scope.changetp = "DEP,LPC";
                               //getGroupChnageData( manageEmpUrlConfig.resources.groupchangeslpc );
                           }
                    $scope.manageGroupRequest = false;
                    $scope.createGroupChangeRequest = false;
                    $scope.groupChangeRequest = !$scope.groupChangeRequest;
                };


                $scope.closePanel = function () {
                    gso.getNGDialog().closeAll();
                    $scope.busy = false;
                };

                $scope.searchPos = function (value , e) {
                    $scope.searchbox = value;
                    if (typeof  e !== 'undefined') {
                        var $this = angular.element(e.currentTarget);
                        var parenet = $this.parent().width();
                        var currnetPosition = $this.position();
                        var filter = $this.next('.group-change-filter-list').css('left',currnetPosition.left - parenet);
                    }
                };
                $scope.dropdownfun = function (e) {
                    $scope.filtercond = true;
                    if (typeof  e !== 'undefined') {
                        var $this = angular.element(e.currentTarget);
                        var parenet = $this.parent().parent().width();
                        var currnetPosition = $this.position();
                        var filter = $this.next('.group-change-filter-list').css('left',currnetPosition.left - parenet);
                    }

                };
                $scope.showManageEmpColListfun = function () {
                    $scope.showManageEmpColList = !$scope.showManageEmpColList;
                };

                // Hiding the filter
                $scope.textboxhide = function () {
                    $scope.searchbox = false;
                    $scope.dropdown = false;
                    $scope.filtercond = false;
                    $scope.locationfiltercond = false;
                    $scope.showManageEmpColList = false;

                };
                $scope.dropdownlocationfun = function (e) {
                    $scope.locationfiltercond = true;
                    if (typeof  e !== 'undefined') {
                        var $this = angular.element(e.currentTarget);
                        var parenet = $this.parent().parent().width();
                        var currnetPosition = $this.position();
                        var filter = $this.next('.group-change-filter-list').css('left',currnetPosition.left - parenet);
                    }
                };
                $scope.settingData =
                    [
                    {show: true, title: 'Employee Name'},
                    {show: true, title: 'Position'},
                    {show: true, title: 'Direct Manager'},
                    {show: true, title: 'Department'},
                    {show: true, title: 'Location'}];

                //Todo:Toggle the data based on the user selection
                $scope.selection = [];
                $scope.filteredByCheckbox = false;
                $scope.toggleSelection = function (data) {
                    var idx = $scope.selection.indexOf(data);
                    if (idx > -1) {
                        $scope.selection.splice(idx, 1);
                    }
                    else {
                        $scope.selection.push(data);
                    }
                    if ($scope.selection.length > 0) {
                        $scope.filteredByCheckbox = true;
                        $scope.selectedCount = 0;
                        $scope.filteredEmployees = $filter('SearchCheckboxFilter')($scope.createGroupChangeData.employees, $scope.selection);
                        selectedFilterCountValue($scope.filteredEmployees,'filter');
                    }
                    else{
                        $scope.filteredByCheckbox = false;
                        $scope.selectedCount = 0;
                        selectedFilterCountValue($scope.createGroupChangeData.employees,'filter');
                        getRowselected(false);
                    }
                    if ($scope.selectedAllEmployees === true){
                        $scope.checkAllEmployees(true);
                    }

                };

                $scope.leavePlanSetValue = function (id,values) {
                    var item ;
                    if(values.length > 0){
                        angular.forEach(values,function (value) {
                            if(id === value.key){
                                item = value;
                            }else if(id==="NO PLAN"){
                                item=values[0];
                            }
                        });
                    }else{
                        id = '';
                        item = [{key:'',value:'Not Avaliable'}];
                    }

                    return item;
                };

                // To setting back to ManageGroup
                $scope.visibleManageGroups = function () {
                    $scope.createGroupChangeRequest = false;
                    $scope.manageGroupRequest = true;
                    $scope.groupChangeRequest = false;
                    $scope.offset= 0;
                    $scope.depOffset=0;
                    $scope.locOffset=0;
                    $scope.LpcOffset =0;
                    gso.getUtilService().routeReloadTimeOut();
                };

                // To set the default next date to the user


                $scope.dateChangeFunc = function(){

                    if(!$scope.currentDate){
                        $scope.dataSelectChange = gso.getUtilService().filterToDayDate();
                    }else{
                        $scope.dataSelectChange = $scope.currentDate;
                        $scope.dataSelectChangeCopy = $scope.currentDate;
                    }


                };

                $scope.dateChanged = function (val) {
                    isDateChanged = true;
                    $scope.currentDate = gso.getUtilService().filterDate(new Date(val), constants.dateFormat);

                };
                $scope.dateChangedGroup = function (val) {
                    isDateChanged = true;
                    $scope.dataSelectChange = gso.getUtilService().filterDate(new Date(val), constants.dateFormat);

                };

                // Converting the date in the format which back end accepts
                $scope.sysDate = new Date();
                var dd = $scope.sysDate.getDate(),
                    mm = $scope.sysDate.getMonth() + 1,
                    yyyy = $scope.sysDate.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                $scope.sysDate = yyyy + '-' + mm + '-' + dd;
                $scope.isGroupChangeEditClick = function () {
                    $scope.isGroupChangeEdit = true;
                };
                $scope.checked = true;


                function ohioAlertMsg() {
                    var noOhioPolicyAlert = null;
                        noOhioPolicyAlert = {
                            _statusCode: '400',
                            _statusMessage: $scope.translation.validation.workLocationChangeToOhio
                        };
                        $scope.childParentAlertMsg(noOhioPolicyAlert);
                }

                //code to send Ohio email notification
                function sendOhioNotification() {
                    gso.getCrudService()
                        .execute(constants.post,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId+ "/ohioemail", null, function (response) {
                        },
                        function (data) {
                        }
                    );

                }

                // checks if a company has Ohio state insurance policy number
                function checkNoOhioPolicyNbr() {
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.workersCompPolicies, null, function (wcPolicies) {
                            if (wcPolicies.length === 0 || wcPolicies[0].policyNumber === " ") {
                                noOhioPolicyNumber = true;
                            } else {
                                noOhioPolicyNumber = false;
                            }
                    });
                }

                function getLocation(locationId){
                    return $scope.locationsData.filter(function(item){
                        return item.locationId === locationId;
                    });
                }

                // Raises an alert message if
                // Ohio location dropdown is selected for ALL WSEs and if company doesn't have Ohio Insurance Policy
                $scope.checkOhio = function(val) {
                    var locationObj = getLocation(val);
                    if (noOhioPolicyNumber && locationObj[0].state === 'OH') {
                            $scope.invalidOhioLocation = true;
                            ohioAlertMsg();
                    }
                    else { $scope.invalidOhioLocation = false; }
                };


                // This fn is to bind the dropdown values
                $scope.changeallCG = function (key, val) {
                    $scope.selectedCount = 0;
                    $scope.selectedAllEmployes = true;
                    angular.forEach($scope.createGroupChangeData.employees, function (groupChange) {
                        if (key === 'selloc' && val!== groupChange.prevLocationId) {
                            groupChange.locationId = val;
                            groupChange.Selected = true;
                            groupChange.dropdownSelected=true;
                        } else if(key === 'DEP' && val!==groupChange.prevDeptId) {
                            groupChange.deptId = val;
                            groupChange.Selected = true;
                            groupChange.dropdownSelected=true;
                        }else{
                            groupChange.Selected = false;
                        }
                        if(key === 'Sick'){
                            if(val===groupChange.leavePlan50Id||groupChange.leavePlan50Id ===''){
                                groupChange.Selected = false;
                                groupChange.dropdownSelected=false;
                            }else {
                                groupChange.leavePlan50Id = val;
                                groupChange.Selected = true;
                                groupChange.dropdownSelected=true;
                            }
                        }
                        if(key === 'Vacation'){
                            if(val===groupChange.leavePlan51Id ||groupChange.leavePlan51Id ==='' ){
                                groupChange.Selected = false;
                                groupChange.dropdownSelected=false;
                            }else{
                                groupChange.Selected = true;
                                groupChange.leavePlan51Id = val;
                                groupChange.dropdownSelected=true;
                            }
                        }
                        if(key === 'Personal'){
                            if(val===groupChange.leavePlan52Id ||groupChange.leavePlan52Id ===''){
                                groupChange.Selected = false;
                                groupChange.dropdownSelected=false;
                            }else{
                                groupChange.Selected = true;
                                groupChange.leavePlan52Id = val;
                                groupChange.dropdownSelected=true;
                            }
                        }
                        if(key === 'EIB'){
                            if(val===groupChange.leavePlan5XId ||groupChange.leavePlan5XId ===''){
                                groupChange.Selected = false;
                                groupChange.dropdownSelected=false;
                            }else{
                                groupChange.Selected = true;
                                groupChange.leavePlan5XId = val;
                                groupChange.dropdownSelected=true;
                            }
                        }
                        if(key.indexOf('Restricted') > -1){
                            if(val===groupChange.leavePlan5YId ||groupChange.leavePlan5YId ===''){
                                groupChange.Selected = false;
                                groupChange.dropdownSelected=false;
                            }else{
                                groupChange.Selected = true;
                                groupChange.leavePlan5YId = val;
                                groupChange.dropdownSelected=true;
                            }
                        }
                    });
                    angular.forEach($scope.createGroupChangeData.employees, function (groupChange) {
                        groupChange.Selected ? $scope.selectedCount += 1 : getRowselected(false);
                    });

                    if (noOhioPolicyNumber) {
                        individualsSelected = [];
                        var locationObj;
                        var prevOhioLoc = false;
                        angular.forEach($scope.createGroupChangeData.employees, function (employee) {
                            locationObj = getLocation(employee.prevLocationId);
                            prevOhioLoc = (locationObj[0].state === 'OH');
                            if (!prevOhioLoc) {
                                individualsSelected.push({
                                    "employeeId": employee.employeeId,
                                    "locationId": employee.locationId
                                });
                            }
                        });
                    }

                };

                $scope.selectedEmp = {"changeType": "", "effectiveDate": "", "employees": []};

                // ToDo: Forming the Payload for multiple selection:
                function getData(employeeSelected,isDepartment,isLocation,isLeavePlan){

                    $scope.selectedEmp.effectiveDate = $scope.currentDate;
                    switch (employeeSelected !== null) {
                            case isDepartment === true && isLocation === false && isLeavePlan===false :
                                 $scope.selectedEmp.changeType = 'DEP';
                                 $scope.selectedEmp.employees.push(
                                    {
                                        "deptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.deptId,
                                        "prevDeptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.prevDeptId,
                                        "employeeId": employeeSelected.employeeId

                                    });
                                break;

                            case isDepartment === false && isLocation === true && isLeavePlan===false :
                                 $scope.selectedEmp.changeType = 'LOC';
                                 $scope.selectedEmp.employees.push(
                                    {
                                        "locationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.locationId,
                                        "prevLocationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.prevLocationId,
                                        "employeeId": employeeSelected.employeeId

                                    });
                                break;

                            case isDepartment === true && isLocation === true && isLeavePlan === false:
                                $scope.selectedEmp.changeType = 'DEP,LOC';
                                $scope.selectedEmp.employees.push(
                                    {
                                        "employeeId": employeeSelected.employeeId,
                                        "deptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.deptId,
                                        "locationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.locationId,
                                        "prevDeptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.prevDeptId,
                                        "prevLocationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.prevLocationId
                                    });
                                break;

                            case isDepartment === true && isLocation === true && isLeavePlan === true:

                                 $scope.selectedEmp.changeType = 'DEP,LOC,LPC';
                                 $scope.selectedEmp.employees.push({
                                     "employeeId": employeeSelected.employeeId,
                                     "deptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.deptId,
                                     "locationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.locationId,
                                     "prevDeptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.prevDeptId,
                                     "prevLocationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.prevLocationId,
                                     "prevLeavePlan50Id":employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.prevLeavePlan50Id,
                                     "prevLeavePlan51Id":employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.prevLeavePlan51Id,
                                     "prevLeavePlan52Id":employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.prevLeavePlan52Id,
                                     "prevLeavePlan5XId":employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.prevLeavePlan5XId,
                                     "prevLeavePlan5YId":employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.prevLeavePlan5YId,
                                     "leavePlan50Id": employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.leavePlan50Id,
                                     "leavePlan51Id": employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.leavePlan51Id,
                                     "leavePlan52Id": employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.leavePlan52Id,
                                     "leavePlan5XId": employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.leavePlan5XId,
                                     "leavePlan5YId": employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.leavePlan5YId
                                });
                                break;

                            case isDepartment === false && isLocation === true && isLeavePlan === true:
                                $scope.selectedEmp.changeType = 'LOC,LPC';
                                $scope.selectedEmp.employees.push(
                                    {
                                        "employeeId": employeeSelected.employeeId,
                                        "locationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.locationId,
                                        "prevLocationId": employeeSelected.locationId===employeeSelected.prevLocationId?null:employeeSelected.prevLocationId,
                                        "prevLeavePlan50Id":employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.prevLeavePlan50Id,
                                        "prevLeavePlan51Id":employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.prevLeavePlan51Id,
                                        "prevLeavePlan52Id":employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.prevLeavePlan52Id,
                                        "prevLeavePlan5XId":employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.prevLeavePlan5XId,
                                        "prevLeavePlan5YId":employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.prevLeavePlan5YId,
                                        "leavePlan50Id": employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.leavePlan50Id,
                                        "leavePlan51Id": employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.leavePlan51Id,
                                        "leavePlan52Id": employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.leavePlan52Id,
                                        "leavePlan5XId": employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.leavePlan5XId,
                                        "leavePlan5YId": employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.leavePlan5YId

                                    });
                                break;

                            case isDepartment === true && isLocation=== false && isLeavePlan === true:
                                $scope.selectedEmp.changeType = 'DEP,LPC';
                                $scope.selectedEmp.employees.push(
                                    {
                                        "employeeId": employeeSelected.employeeId,
                                        "deptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.deptId,
                                        "prevDeptId": employeeSelected.deptId===employeeSelected.prevDeptId?null:employeeSelected.prevDeptId,
                                        "prevLeavePlan50Id":employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.prevLeavePlan50Id,
                                        "prevLeavePlan51Id":employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.prevLeavePlan51Id,
                                        "prevLeavePlan52Id":employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.prevLeavePlan52Id,
                                        "prevLeavePlan5XId":employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.prevLeavePlan5XId,
                                        "prevLeavePlan5YId":employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.prevLeavePlan5YId,
                                        "leavePlan50Id": employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.leavePlan50Id,
                                        "leavePlan51Id": employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.leavePlan51Id,
                                        "leavePlan52Id": employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.leavePlan52Id,
                                        "leavePlan5XId": employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.leavePlan5XId,
                                        "leavePlan5YId": employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.leavePlan5YId

                                    });
                                break;

                            case isDepartment === false && isLocation=== false :

                                 $scope.selectedEmp.changeType = 'LPC';
                                 $scope.selectedEmp.employees.push({
                                    "employeeId": employeeSelected.employeeId,
                                     "prevLeavePlan50Id":employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.prevLeavePlan50Id,
                                     "prevLeavePlan51Id":employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.prevLeavePlan51Id,
                                     "prevLeavePlan52Id":employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.prevLeavePlan52Id,
                                     "prevLeavePlan5XId":employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.prevLeavePlan5XId,
                                     "prevLeavePlan5YId":employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.prevLeavePlan5YId,
                                     "leavePlan50Id": employeeSelected.leavePlan50Id===employeeSelected.prevLeavePlan50Id?null:employeeSelected.leavePlan50Id,
                                     "leavePlan51Id": employeeSelected.leavePlan51Id===employeeSelected.prevLeavePlan51Id?null:employeeSelected.leavePlan51Id,
                                     "leavePlan52Id": employeeSelected.leavePlan52Id===employeeSelected.prevLeavePlan52Id?null:employeeSelected.leavePlan52Id,
                                     "leavePlan5XId": employeeSelected.leavePlan5XId===employeeSelected.prevLeavePlan5XId?null:employeeSelected.leavePlan5XId,
                                     "leavePlan5YId": employeeSelected.leavePlan5YId===employeeSelected.prevLeavePlan5YId?null:employeeSelected.leavePlan5YId

                                 });
                                break;

                            default:
                                break;

                        }
                }


                $scope.selectedEmpDepData = function (employeeSelected, type) {
                  $scope.selectedsingleEmployee = true;
                  employeeSelected.dropdownSelected=true;

                    // Checks if Ohio location dropdown is selected for a WSE
                    if (type === "LOC"  && noOhioPolicyNumber) {
                        checkIfAnySelectedWseInOhio(employeeSelected,true);
                    }
                };


                $scope.cancelRequest = function () {
                    angular.element('input[name=createGroupChangeCheck]').attr('checked', false);
                    SharedDataService.getAppSharedData().date=null;
                    $scope.visibleManageGroups();

                };

                $scope.childParentAlertMsg = function (data) {
                    if(data && data._statusCode  && data._statusCode !== '404'){
                        $scope.errorAlert = data;
                    }else{
                        $scope.noRecordsAlert = data;
                    }

                };
                function gettingSelectedData(item)
                {
                    if($scope.selection.length > 0){
                        angular.forEach($scope.selection,function (selection) {
                            if( item.Selected && item.dropdownSelected &&(item.position === selection || item.deptName===selection ||item.locationName===selection)) {
                                getData(item,$scope.isDepartment,$scope.isLocation,$scope.isLeavePlan);
                            }
                        });
                    }else{
                        if(item.Selected && item.dropdownSelected){
                            getData(item,$scope.isDepartment,$scope.isLocation,$scope.isLeavePlan);
                        }
                    }
                }
                // Todo: Function to save the data
                $scope.saveData = function (formName) {
                    var customIdAlert;
                    $scope.isModelNameSubmitted = true;
                    var fieldsArray = ['groupChangepastdate', 'groupChangeFuturedate'];
                    if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.createGroupChange.blur, fieldsArray)) {
                        gso.getUtilService().focusInvalidElement('form#group_chnage_form');
                        $scope.onFocus('createGroupChange', $scope.validationPatterns.createGroupChange.focus);
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: $scope.translation.pageValidationMessage
                        };
                        $scope.childParentAlertMsg(customIdAlert);
                    } else if ($scope.invalidOhioLocation) {
                        ohioAlertMsg();
                    } else {
                        angular.forEach($scope.filterByData, function (item) {
                            if($scope.selectedAllEmployees){
                                gettingSelectedData(item);
                            }else{
                                gettingSelectedData(item);
                            }
                        });
                        //logic to not to sent empty object
                        $scope.selectedEmp.employees =   $scope.selectedEmp.employees.filter(function(value,index){
                            var selectedCount = 0;
                            angular.forEach(value,function(key){
                                (key) ? selectedCount +=1: '';
                            });
                            return selectedCount !== 1;
                        });

                        if ($scope.selectedEmp.employees.length > 0) {
                            gso.getCrudService().execute(constants.post, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId, $scope.selectedEmp,
                                function (response) {
                                    $scope.errorAlert = response;
                                    $timeout(function () {
                                        gso.getUtilService().routeReloadTimeOut();
                                    }, 3000);
                                },
                                function (data) {
                                    $scope.errorAlert = data;
                                }
                            );
                            SharedDataService.getAppSharedData().date=null;
                        }else{
                            customIdAlert = {
                                _statusCode: '400',
                                _statusMessage: "You did not make any changes"
                            };
                            $scope.childParentAlertMsg(customIdAlert);
                        }
                    }
                };

                function getCountValue(isValue) {
                    (isValue)? $scope.selectedCount += 1 :  $scope.selectedCount -= 1;
                    ($scope.selectedCount > 0) ? $scope.test = true: $scope.test = false;
                }

                function getRowselected(isBoolean){
                    isBoolean ? angular.element('#mgcreateGroupChangeCheckId').prev()
                                .removeClass('icon-icon_checkmark_emptybox').addClass('icon-icon_checkmarkwithbox') :
                                angular.element('#mgcreateGroupChangeCheckId').prev()
                                    .removeClass('icon-icon_checkmarkwithbox').addClass('icon-icon_checkmark_emptybox');
                    angular.element('#mgcreateGroupChangeCheckId').attr('checked', isBoolean);
                    $scope.selectedAllEmployees = isBoolean;
                    $scope.notSelectedAllEmployees = isBoolean;
                    $scope.viewDropDown = isBoolean;


                }

                function selectedFilterCountValue(filterEmployee,type){
                    angular.forEach(filterEmployee,function (filterCount) {
                        if(type){
                            (filterCount.Selected) ? $scope.selectedCount +=1 : angular.noop();
                        }
                    });
                    filterEmployee ?  (filterEmployee.length === $scope.selectedCount ? getRowselected(true): angular.noop()): angular.noop();
                }


                function idxOf(eeId) {
                    for ( var i=0; i<individualsSelected.length; i++) {
                        if( individualsSelected[i].employeeId === eeId) {
                            return i;
                        }
                    }
                    return -1;
                }

                // checks if anyone selected Ohio Work Location if yes then display error message
                function checkIfAnySelectedWseInOhio(empSelected, rowselected){
                        var locationObj = getLocation(empSelected.prevLocationId);
                        var prevOhioLoc = (locationObj[0].state === 'OH');
                        var idx = idxOf(empSelected.employeeId);
                        if (idx > -1) {
                            if (!rowselected) {
                                individualsSelected.splice(idx, 1);
                            }
                            else {
                                individualsSelected.splice(idx, 1);
                                individualsSelected.push({
                                    "employeeId": empSelected.employeeId,
                                    "locationId": empSelected.locationId
                                });
                            }
                        }
                        else if (!prevOhioLoc) {
                            individualsSelected.push({
                                "employeeId": empSelected.employeeId,
                                "locationId": empSelected.locationId
                            });
                        }

                        // Loop through each WSE selected to see if anyone is being placed into Ohio Location
                        $scope.invalidOhioLocation = false;
                        angular.forEach(individualsSelected, function (wse) {
                            locationObj = getLocation(wse.locationId);
                            if (locationObj[0].state === 'OH') {
                                $scope.invalidOhioLocation = true;
                            }
                        });

                        if ($scope.invalidOhioLocation) {
                            sendOhioNotification();
                            ohioAlertMsg();
                        }
                }


                $scope.singleCheck = function (item,isTrue) {
                    /**/
                    if(isTrue){
                        item.prevDeptId=item.deptId;
                        item.prevLocationId=item.locationId;
                        item.prevLeavePlan50Id=item.leavePlan50Id;
                        item.prevLeavePlan51Id=item.leavePlan51Id;
                        item.prevLeavePlan52Id=item.leavePlan52Id;
                        item.prevLeavePlan5XId=item.leavePlan5XId;
                        item.prevLeavePlan5YId=item.leavePlan5YId;
                        getCountValue('add');

                        //Todo:Added the condition for to get filterd count data
                        if($scope.filteredByCheckbox){
                            $scope.filteredEmployees = $filter('SearchCheckboxFilter')($scope.createGroupChangeData.employees, $scope.selection);
                        }
                        if($scope.filteredEmployees){
                            ($scope.createGroupChangeData.employees.length ===  $scope.selectedCount ||  $scope.filteredEmployees.length ===  $scope.selectedCount) ?  getRowselected(true) : getRowselected(false);
                        }
                    }else{
                        item.deptId =item.prevDeptId;
                        item.locationId= item.prevLocationId;
                        item.leavePlan50Id= item.prevLeavePlan50Id;
                        item.leavePlan51Id= item.prevLeavePlan51Id;
                        item.leavePlan52Id= item.prevLeavePlan52Id;
                        item.leavePlan5XId= item.prevLeavePlan5XId;
                        item.leavePlan5YId=item.prevLeavePlan5YId;
                        getCountValue();
                        getRowselected(false);
                        selectedFilterCountValue($scope.filteredEmployees);

                        if (noOhioPolicyNumber) {
                            checkIfAnySelectedWseInOhio(item,false);
                        }
                    }

                };


                $scope.getMoreData = function () {
                    $scope.activeManagerGroups();
                };

                $scope.loadData=function(){
                    // $scope.depOffset=$scope.depOffset+20;
                    // $scope.locOffset=$scope.locOffset+20;
                    // $scope.depLoc=$scope.depLoc+20;
                    // $scope.depLocLpc=$scope.depLocLpc+20;
                    // $scope.locLpc= $scope.locLpc+20;
                    // $scope.depLpc=$scope.depLpc+20;
                    //$scope.LpcOffset=$scope.LpcOffset=20;
                 $scope.parseUrl($scope.scrollData);
                };
                // Check All to check all the check boxes
                $scope.checkAllEmployees = function (all) {
                    var checkAllicon = null;
                    $scope.viewDropDown = false;
                    if(all === true){
                        if (!$scope.filteredByCheckbox) {
                            $scope.viewDropDown = true;
                            $scope.selectedCount = $scope.createGroupChangeData.employees.length;
                            checkAllicon = $scope.selectedCount = $scope.createGroupChangeData.employees.length;
                            if(checkAllicon){
                                angular.element('#mgcreateGroupChangeCheckId').prev().removeClass('icon-icon_checkmark_emptybox').addClass('icon-icon_checkmarkwithbox');
                            }
                            angular.forEach($scope.createGroupChangeData.employees, function (createGroupChange) {
                                createGroupChange.Selected = all;
                                $scope.selectedAllEmployees = true;
                                createGroupChange.prevDeptId=createGroupChange.deptId;
                                createGroupChange.prevLocationId=createGroupChange.locationId;
                                createGroupChange.prevLeavePlan50Id=createGroupChange.leavePlan50Id;
                                createGroupChange.prevLeavePlan51Id=createGroupChange.leavePlan51Id;
                                createGroupChange.prevLeavePlan52Id=createGroupChange.leavePlan52Id;
                                createGroupChange.prevLeavePlan5XId=createGroupChange.leavePlan5XId;
                                createGroupChange.prevLeavePlan5YId=createGroupChange.leavePlan5YId;
                            });
                        }
                        else if($scope.filteredByCheckbox){
                            $scope.filteredEmployees = $filter('SearchCheckboxFilter')($scope.createGroupChangeData.employees, $scope.selection);
                            $scope.selectedCount = $scope.filteredEmployees.length;
                            checkAllicon = $scope.selectedCount = $scope.filteredEmployees.length;
                            if(checkAllicon){
                                angular.element('#mgcreateGroupChangeCheckId').prev().removeClass('icon-icon_checkmark_emptybox').addClass('icon-icon_checkmarkwithbox');
                            }
                            angular.forEach($scope.filteredEmployees, function (createGroupChange) {
                                createGroupChange.Selected = all;
                                $scope.selectedAllEmployees = true;
                                $scope.viewDropDown = true;
                            });
                        }
                    }
                    else {
                        angular.forEach($scope.createGroupChangeData.employees, function (createGroupChange) {
                            createGroupChange.Selected = all;
                            $scope.selectedCount = 0;
                            $scope.selectedAllEmployees = false;
                            createGroupChange.deptId = createGroupChange.prevDeptId;
                            createGroupChange.locationId = createGroupChange.prevLocationId;
                            createGroupChange.leavePlan50Id = createGroupChange.prevLeavePlan50Id;
                            createGroupChange.leavePlan51Id = createGroupChange.prevLeavePlan51Id;
                            createGroupChange.leavePlan52Id = createGroupChange.prevLeavePlan52Id;
                            createGroupChange.leavePlan5XId = createGroupChange.prevLeavePlan5XId;
                            createGroupChange.leavePlan5YId = createGroupChange.prevLeavePlan5YId;
                        });
                    }

                    if (noOhioPolicyNumber) {
                        individualsSelected = [];
                        $scope.invalidOhioLocation = false;
                    }
                };

                 $scope.activeManagerGroups();
                 getLeavePlans();
                 // Calling bulk data:
                 getBatchChangesBulk();
                 $scope.validationPatterns = {
                    createGroupChange: {
                        blur: {
                            groupChangeEffDateRequired: null,
                            groupChangepastdate: null,
                            groupChangeFuturedate: null
                        },
                        focus: {
                            groupChangeEffDateRequired: null,
                            groupChangepastdate: null,
                            groupChangeFuturedate: null
                        }
                    }
                };

                $scope.onFocus = function (name, object) {
                    var temp = {};
                    angular.forEach(object, function (value, key) {
                        temp[key] = false;
                    });

                    if (name === 'createGroupChange') {
                        $scope.validationPatterns.createGroupChange.focus = temp;
                    }
                };
                $scope.closeAlert = function () {
                    $scope.errorAlert = null;
                };

           }

   ]);
