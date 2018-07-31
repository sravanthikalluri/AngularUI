'use strict';
trinetApp.controller(
    'groupChangeRequestCtrl', ['$scope', 'gso', '$http','$timeout',
        function ($scope, gso, $http,$timeout) {
            $scope.isGroupChangeEdit = false;
            $scope.disableSave = true;
            $scope.selectedCount = 0;
            $scope.isGroupChangeEditClick = function () {
                $scope.isGroupChangeEdit = true;
            };
            $scope.createGroupChangeRequest = true;
            $scope.checked = false;
            $scope.closeAlert = function () {
                $scope.errorAlert = null;
            };
            //code to get department data
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                gso.getAppConfig().companyId + "/" + profileUrlConfig.resources.departments, null,
                function (response) {
                    $scope.departmentsData = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            //code to get locations data
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                gso.getAppConfig().companyId + globalUrlConfig.resources.locations, null,
                function (response) {
                    $scope.locationsData = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

            $scope.childParentAlertMsg = function (data) {
                if(data && data._statusCode  && data._statusCode !== '404'){
                    $scope.errorAlert = data;
                }else{
                    $scope.noRecordsAlert = data;
                }

            };

            $scope.ChangedDate = function (val) {
                $scope.effectiveDate = gso.getUtilService().filterDate(new Date(val), constants.dateFormat);
            };

            $scope.singleCheck = function (val) {
                var count = 0;
                angular.forEach($scope.groupChangeData.groupChangesDetails, function (item) {
                    if (item.selected) {
                        count += 1;
                    }
                    $scope.selectedCount = count;
                });
               if(count>0){
                   $scope.disableSave = false;
               }else{
               $scope.disableSave = true;
               }
               if ($scope.groupChangeData.groupChangesDetails.length === count) {
                  $scope.selectedAll=true;
                   angular.element('#gcr_selectAllgroupChangeEdit').prev().removeClass('icon-icon_checkmark_emptybox').addClass('icon-icon_checkmarkwithbox');
                   angular.element('#gcr_selectAllgroupChangeEdit').attr('checked', true);               }
               else {
                   $scope.selectedAll=false;
                   angular.element('#gcr_selectAllgroupChangeEdit').prev().removeClass('icon-icon_checkmarkwithbox').addClass('icon-icon_checkmark_emptybox');
                   angular.element('#gcr_selectAllgroupChangeEdit').attr('checked', false);
               }
            };

            $scope.selectAll = function (val) {
                $scope.disableSave = !val;
                $scope.SelectAll = val;
                angular.forEach($scope.groupChangeData.groupChangesDetails, function (item) {
                    item.selected = val;
                });
                var checkAllicon = $scope.selectedCount = $scope.groupChangeData.groupChangesDetails.length;
                if(checkAllicon) {
                    angular.element('#gcr_selectAllgroupChangeEdit').prev().removeClass('icon-icon_checkmark_emptybox').addClass('icon-icon_checkmarkwithbox');
                }
                if(val === true){
                    $scope.selectedAll = true;
                    $scope.selectedCount = $scope.groupChangeData.groupChangesDetails.length;
                }
                else {
                    $scope.selectedCount = 0;
                    $scope.selectedAll = false;
                }

            };
            $scope.changeall = function (key, val) {
                $scope.disableSave = false;
                angular.forEach($scope.groupChangeData.groupChangesDetails, function (groupChange) {
                    if (key === 'selloc') {
                        groupChange.locationNewId = val;
                    }
                    if (key === 'DEP') {
                        groupChange.deptNewId = val;
                    }
                });
            };
            $scope.selectedEmp = {"changeType": "", "effectiveDate": "", "employees": []};
            $scope.selectedEmpDepData = function (employeeSelected, type) {
                $scope.disableSave = false;
                $scope.selectedsingleEmployee = true;
                $scope.selectedEmp.changeType = type;
                $scope.selectedEmp.effectiveDate = gso.getUtilService().filterDate(new Date($scope.effectiveDate), constants.dateFormat);

            };

              function getData(employeeSelected,isDepartment,isLocation,isLeavePlan){
                  $scope.selectedEmp.effectiveDate = $scope.effectiveDate;
                  if (isDepartment) {
                          $scope.selectedEmp.changeType = 'DEP';
                          $scope.selectedEmp.employees.push(
                              {
                                  "deptId": employeeSelected.deptNewId,
                                   "employeeId": employeeSelected.employeeId

                              });
                      } else if (isLocation) {
                         $scope.selectedEmp.changeType = 'LOC';
                          $scope.selectedEmp.employees.push(
                              {
                                  "locationId": employeeSelected.locationNewId,
                                  "employeeId": employeeSelected.employeeId

                              });
                      } else {
                          $scope.selectedEmp.changeType = 'LPC';
                          $scope.selectedEmp.employees.push({
                               "employeeId": employeeSelected.employeeId,
                              "leavePlan50Id": (employeeSelected.leavePlan50NewId==="" || employeeSelected.leavePlan50NewId=== undefined)?null:employeeSelected.leavePlan50NewId,
                              "leavePlan51Id": (employeeSelected.leavePlan51NewId==="" || employeeSelected.leavePlan51NewId=== undefined)?null:employeeSelected.leavePlan51NewId,
                              "leavePlan52Id": (employeeSelected.leavePlan52NewId==="" || employeeSelected.leavePlan52NewId=== undefined)?null:employeeSelected.leavePlan52NewId,
                              "leavePlan5XId": (employeeSelected.leavePlan5XNewId==="" || employeeSelected.leavePlan5XNewId=== undefined)?null:employeeSelected.leavePlan5XNewId,
                              "leavePlan5YId": (employeeSelected.leavePlan5YNewId==="" || employeeSelected.leavePlan5YNewId=== undefined)?null:employeeSelected.leavePlan5YNewId

                          });
                     }
                 }
            function gettingSelectedData(item)
            {
                if($scope.selection.length > 0){
                    angular.forEach($scope.selection,function (selection) {
                        if(item.position === selection && item.selected) {
                            getData(item,$scope.isDepartment,$scope.isLocation,$scope.isLeavePlan);
                        }
                    });
                }else{
                    if(item.selected){
                        getData(item,$scope.isDepartment,$scope.isLocation,$scope.isLeavePlan);
                    }
                }
            }
            $scope.saveGroupChangeData = function () {
                 if ($scope.validationPatterns.editGroupChange.blur.groupChangepastdate || $scope.validationPatterns.editGroupChange.blur.groupChangeFuturedate) {
                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: $scope.translation.pageValidationMessage
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                 } else {
                     angular.forEach($scope.groupChangeData.groupChangesDetails, function (item) {
                         if($scope.selectedAllEmployees){
                             gettingSelectedData(item);
                         }else{
                             gettingSelectedData(item);
                         }
                     });

                        gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                            manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId, $scope.selectedEmp,
                            function (response) {
                                $scope.errorAlert = response;
                                $timeout(function(){
                                    gso.getUtilService().routeReloadTimeOut();
                                 },3000);

                            },
                            function (data) {
                                $scope.errorAlert = data;
                            }
                        );
                 }


            };
            $scope.settingData =
                [
                    {show: true, title: 'Employee Name'},
                    {show: true, title: 'Position'},
                    {show: true, title: 'Direct Manager'},
                    {show: true, title: 'Department'},
                    {show: true, title: 'Location'}];
            $scope.cancel = function () {
                $scope.isGroupChangeEdit = !$scope.isGroupChangeEdit;
                $scope.selectedAll = false;
                $scope.checked = !$scope.selectedAll;
                $scope.showglobaldrpdown = $scope.selectedAll;
                $scope.showglobaldrpdownloc = $scope.selectedAll;
                $scope.showglobaldrpdownleave = $scope.selectedAll;
                $scope.showglobaldrpdownleavesick = $scope.selectedAll;
                $scope.selectedCount = 0;
                angular.element('input[name=selectAllgroupChangeEdit]').attr('checked', false);
                angular.forEach($scope.groupChangeData.groupChangesDetails, function (item) {
                     item.selected=false;
                  });
            };

            $scope.validationPatterns = {
                editGroupChange: {
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

                if (name === 'editGroupChange') {
                    $scope.validationPatterns.editGroupChange.focus = temp;
                }
            };
        }]);
