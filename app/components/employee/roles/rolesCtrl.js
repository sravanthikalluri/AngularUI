'use strict';
trinetApp.controller('rolesCtrl', ['$scope', 'gso', '$routeParams','SharedDataService','$state',
    function ($scope, gso, $routeParams,SharedDataService,$state) {
            $scope.showAssign = $scope.noRolesAssigned = $scope.IsVisible = $scope.IsVisible1 = false;
            $scope.checkedMe = true;
            $scope.employId = 'Y';
            $scope.rolesData = {};
            $scope.roleRestrictions = {};
            $scope.ristictCheck = false;
            var roleArrayData = {};
            $scope.noRoll = false;
            $scope.enable=false;
            $scope.Show=false;
            $scope.displayDropdown = false;
            $scope.editlocations = false;
            $scope.totalSelected = [];
            $scope.selectedLocations = [];
            $scope.showDropDown=function() {
                this.Show=!this.Show;
            };
            $scope.showAssignRoles = function () {
                $scope.showAssign = !$scope.showAssign;
                $scope.noRolesAssigned = !$scope.noRolesAssigned;
                 rolesData();
            };

            $scope.closeAlert = function () {
                $scope.errorAlert = null;
            };
             var rolesData = function rolesData(){
                 gso.getCrudService()
                     .execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                         globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + "/" +
                         gso.getAppConfig().userId + manageEmpUrlConfig.resources.roles, null, function (response) {
                             $scope.allRolesData = response;
                             $scope.rolesData = addCheckedRolesFromCheckedList($scope.empRolesData, $scope.allRolesData);
                             $scope.rolesData = $scope.rolesData.map(function (obj) {
                                 if($scope.empRolesData !==undefined)
                                 {
                                     var res =  $scope.empRolesData.filter(function (selectItem) {
                                         return obj.role === selectItem.role;
                                     });

                                     obj['selectedDeptList'] = res.length>0&&res[0].departments && $scope.roleRestrictions.department===true ? $scope.getDeptList(res[0].departments) : [];
                                     obj['selectedLocationList']=res.length>0&&res[0].locations && $scope.roleRestrictions.location===true? $scope.getLocationList(res[0].locations):[];
                                     obj['selectedPayGroupList']=res.length>0&&res[0].payrollGroups && $scope.roleRestrictions.payrollGroup===true? $scope.getPayGroupList(res[0].payrollGroups):[];

                                 }
                                 else
                                 {
                                     obj['selectedDeptList'] =   $scope.roleRestrictions.department===true ? []:'';
                                     obj['selectedLocationList']= $scope.roleRestrictions.location===true? []:'';
                                     obj['selectedPayGroupList']= $scope.roleRestrictions.payrollGroup===true? []:'';
                                 }
                                 return obj;

                             });
                         },
                         function (data) {
                             $scope.childParentAlertMsg(data);
                         }
                     );
             };

            $scope.getDeptList = function (res) {

                var filteredDepts = [];
                if(res.filter(function(item){
                        return item.deptId === 'all';
                    }).length > 0){
                    filteredDepts = angular.copy($scope.departments);
                }
                else
                {
                    $scope.departments.forEach(function (dept) {
                        res.forEach(function (selectedDept) {
                            if (selectedDept.code === dept.deptId) {
                                filteredDepts.push(dept);
                            }
                        });
                    });
                }

                return filteredDepts;
            };

            $scope.getLocationList = function (res) {

                var filteredLocations = [];
                if(res.filter(function(item){
                        return item.locationId === 'all';
                    }).length > 0){
                    filteredLocations = angular.copy($scope.locations);
                }
                else
                {
                    $scope.locations.forEach(function (loc) {
                        res.forEach(function (selectedLoc) {
                            if (selectedLoc.code === loc.locationId) {
                                filteredLocations.push(loc);
                            }
                        });
                    });
                }

                return filteredLocations;
            };

            $scope.getPayGroupList = function (res) {

                var filteredPayGroups = [];
                if(res.filter(function(item){
                        return item.payrollGroupId === 'all';
                    }).length > 0){
                    filteredPayGroups = angular.copy($scope.payGroups);
                }
                else
                {
                    $scope.payGroups.forEach(function (pgroup) {
                        res.forEach(function (selectedPayGroup) {
                            if (selectedPayGroup.code === pgroup.payGroupId) {
                                filteredPayGroups.push(pgroup);
                            }
                        });
                    });
                }

                return filteredPayGroups;
            };

            $scope.selectedAllLocation = function(loc,selectedLoc){
                $scope.selectAll = selectedLoc.some(function (el) {
                    return el.locationId === "all";
                });
            };

            $scope.selectedAllDepartment = function(loc,selectedLoc){
                $scope.selectAll = selectedLoc.some(function (el) {
                    return el.deptId === "all";
                });
            };
            $scope.selectedAllPayroll = function(loc,selectedLoc){
                $scope.selectAll = selectedLoc.some(function (el) {
                    return el.payGroupId === "all";
                });
            };

            $scope.selectDept = function(dept,selectedDept){

                var isSelected = false;
                if(selectedDept.length > 0){
                    isSelected = selectedDept.filter(function(item){
                        $scope.selectedAllDepartment(dept,selectedDept);
                        return item.deptId === dept.deptId;
                    }).length > 0 ? true : false;
                }else{
                    $scope.selectAll = false;
                }
                return $scope.selectAll? $scope.selectAll: isSelected;
            };
            $scope.selectLocation = function(loc,selectedLoc,list){
                var isSelected = false;
                if(selectedLoc.length > 0){
                    isSelected = selectedLoc.filter(function(item){
                        $scope.selectedAllLocation(loc,selectedLoc);
                        return item.locationId === loc.locationId;
                    }).length > 0 ? true : false;
                }else{
                    $scope.selectAll = false;
                }
                return $scope.selectAll? $scope.selectAll: isSelected;
            };

            $scope.selectPayGroup = function(pay,selectedPay){
                var isSelected = false;
                if(selectedPay.length > 0){
                    isSelected = selectedPay.filter(function(item){
                        $scope.selectedAllPayroll(pay,selectedPay);
                        return item.payGroupId === pay.payGroupId;
                    }).length > 0 ? true : false;
                }else{
                    $scope.selectAll = false;
                }
                return $scope.selectAll? $scope.selectAll: isSelected;
            };

             var addCheckedRolesFromCheckedList = function (checkedroles, roles) {

                angular.forEach(roles, function (item) {
                    angular.forEach(checkedroles, function (checkedItem) {
                        if(item.role ==='HRAUTH' && checkedItem.role === 'HRAUTH_R'){
                            item.isChecked = true;
                        }else if (item.role === checkedItem.role) {
                            item.isChecked = true;
                        }
                    });
                    if (item.role === "HRAUTH" &&  item.isChecked === true ) {
                        $scope.editlocations = true;
                        if(!$scope.selectedLocations){
                            var loc = {
                                "locationCode": "All",
                                "locationId": "all",
                                "locationName": "All Locations",
                                "shortDesc": "short"
                            };
                            $scope.selectedLocations.push(loc);
                        }
                        angular.forEach($scope.selectedLocations, function (location, key) {
                            $scope.totalSelected.push(location);
                        });
                    }

                 });

                 return roles;

             };

            /** ****************Get call for All Roles based on the ID**************** */
            $scope.ShowHide = function () {
                $scope.IsVisible = !$scope.IsVisible;
                $scope.IsVisible1 = !$scope.IsVisible1;
                rolesData();
            };

            /** ****************Get call for employee  assign roles data**************** */

            $scope.empRolesDataService = gso.getCrudService()
                .execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.newRolesBaseUrl +
                    manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" +
                    $scope.appUserId + manageEmpUrlConfig.resources.rolesAll, null, function (response) {
                         getPayGroup();
                         getDepartment();
                         getLocation();
                        $scope.IsVisible = false;
                        $scope.IsVisible1 = true;
                        $scope.empRolesData = response;
                        angular.forEach($scope.empRolesData, function (value, key) {
                            if(value.role === 'HRAUTH'){
                                var loc = {
                                    "locationCode": "All",
                                    "locationId": "all",
                                    "locationName": "All Locations",
                                    "shortDesc": "short"
                                };
                                $scope.selectedLocations.push(loc);
                            }
                            if(value.role === 'HRAUTH_R'){
                                angular.forEach(value.locations,function (locationid) {
                                    var loc = {
                                        "locationId": locationid.code,
                                    };
                                    $scope.selectedLocations.push(loc);
                                });
                            }
                        });
                        var input = {duplicate: '', count: 0, deletedOne: {}};
                        $scope.empRolesData.map(function (obj, index) {
                            obj.isChecked = true;
                        });
                    },
                    function (data) {
                        getPayGroup();
                        getDepartment();
                        getLocation();
                        $scope.noRoll = true;
                        $scope.childParentAlertMsg(data);
                        $scope.noRolesAssigned = true;
                    }
                );



            $scope.update = function () {
                if ($scope.array.toString() !== $scope.array_.toString()) {
                    return "Changed";
                } else {
                    return "Not Changed";
                }
            };

          // ToDo: This is for the  to show the POP-UP on de-lecting the HR-Security Role
            $scope.openHrSecurity = function (robj) {
                if (robj.ischecked === true && (robj.role=== "EPTAG" || robj.role=== "EPHRS" || robj.role=== "EPHNA" || robj.role=== "HRAUTH_R") ) {
                    $scope.enable=true;
                }else{
                  $scope.enable=false;
                }
                if (robj.isChecked === false && robj.role === "HRSECURITY") {
                    gso.getNGDialog().open({
                        templateUrl: "app/components/employee/roles/rolesModelView.html",
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                }
                if (robj.isChecked === true && robj.role === "HRAUTH") {
                    $scope.selectedLocations = [];
                    $scope.editlocations = true;
                    var loc = {
                        "locationCode": "All",
                        "locationId": "all",
                        "locationName": "All Locations",
                        "shortDesc": "short"
                    };
                    $scope.selectedLocations.push(loc);
                    angular.forEach($scope.selectedLocations, function (location, key) {
                        $scope.totalSelected.push(location);
                    });
                }
                if (robj.isChecked === false && robj.role === "HRAUTH") {
                    $scope.totalSelected = [];
                    $scope.editlocations = false;
                    for (var i = 0; i < $scope.locations.length; i++) {
                        $scope.locations[i].value = false;
                    }
                }

            };

            //Todo: Function to read the location dropdown values
            $scope.sendDept = function (arr, department) {
                if ($scope.selectDept(department, arr)) {
                    var index = arr.findIndex(function (obj) {
                        return department.deptId === obj.deptId;
                    });
                    arr.splice(index, 1);
                } else {
                    department.deptId==="all" ?arr.length=0:null;
                    arr.push(department);
                }

            };


            //Todo: Function to read the location dropdown values
            $scope.sendLoc = function (obj,location) {
              if ($scope.selectLocation(location, obj)) {
                  var index = obj.findIndex(function (lObj) {
                      return location.locationId === lObj.locationId;
                  });
                  obj.splice(index, 1);
              } else {
                  location.locationId === "all" ? obj.length = 0: null;
                  obj.push(location);
              }
            };

           //Todo: Function to read the location dropdown values
            $scope.sendPay = function (obj, payGroup) {
                if ($scope.selectPayGroup(payGroup, obj)) {
                  var index = obj.findIndex(function (pobj) {
                      return payGroup.payGroupId === pobj.payGroupId;
                  });
                  obj.splice(index, 1);
               } else {
                    payGroup.payGroupId === "all" ? obj.length = 0: null;
                    obj.push(payGroup);
              }
            };

           // Todo :Save  functionality  for selected roles
            $scope.saveRolesDataObject = function () {
                 var payloadObj=[],data;
                 var saveObj = $scope.rolesData.filter(function (obj) {
                    return obj.isChecked;
                 });
                 if(saveObj.length)
                 {
                  saveObj.forEach(function (obj)
                  {
                      if (obj.role !== "EPTAG" && obj.role !== "EPHRS" && obj.role !== "EPHNA" && obj.role !== "EPHPR" && obj.role !=="EPNPI" && obj.role !== "HRAUTH_R" && obj.role !== "HRAUTH") {
                       roleArrayData = {
                           "role": obj.role
                       };
                       payloadObj.push(roleArrayData);
                   }else if(obj.role === "HRAUTH") {
                          if($scope.totalSelected[0].locationId==="all") {
                              roleArrayData = {
                                  "role": "HRAUTH"
                              };
                              payloadObj.push(roleArrayData);
                          }
                          if($scope.totalSelected.length>0 && $scope.totalSelected[0].locationId!=="all"){
                              $scope.selectedLocationsArray = [];
                              $scope.totalSelected.map(function (location) {
                                  $scope.selectedLocationsArray.push({"code": location.locationId })});
                              roleArrayData=  {
                                  "role": "HRAUTH_R",
                                  "departments": [{"code": "all"}],
                                  "locations":  $scope.selectedLocationsArray,
                                  "payrollGroups":[{"code": "all"}]
                              };
                              payloadObj.push(roleArrayData);
                          }
                      }else if (obj.isChecked && (obj.selectedDeptList.length===0 && obj.selectedLocationList.length===0 && obj.selectedPayGroupList.length===0) && (obj.role !== "HRAUTH" && obj.role !== "HRAUTH_R")){
                          roleArrayData={
                              "role": obj.role,
                              "departments": [{"code": "all"}],
                              "locations": [{ "code": "all"}],
                              "payrollGroups": [{"code": "all"}]
                          },
                          payloadObj.push(roleArrayData);
                      }else{
                          $scope.selectedDeptArray = [];$scope.selectedLocationArray=[];$scope.selectedPayrollArray=[];
                           obj.selectedDeptList.length>0 && obj.selectedDeptList[0].deptId!="all" ?obj.selectedDeptList.map(function (dept) {
                           $scope.selectedDeptArray.push({"code": dept.deptId })}):obj.selectedDeptList;

                            obj.selectedLocationList.length>0 && obj.selectedLocationList[0].locationId!="all" ?obj.selectedLocationList.map(function (loc) {
                            $scope.selectedLocationArray.push({"code": loc.locationId })}):obj.selectedLocationList;

                            obj.selectedPayGroupList.length>0 && obj.selectedPayGroupList[0].payGroupId!="all"?obj.selectedPayGroupList.map(function (payroll) {
                            $scope.selectedPayrollArray.push({"code": payroll.payGroupId});}):obj.selectedPayGroupList;

                          if((obj.role !== "HRAUTH" && obj.role !== "HRAUTH_R")){
                              roleArrayData=  {
                                  "role": obj.role,
                                  "departments": $scope.selectedDeptArray.length>0?$scope.selectedDeptArray:[{"code": "all"}],
                                  "locations": $scope.selectedLocationArray.length>0?$scope.selectedLocationArray:[{"code": "all"}],
                                  "payrollGroups":$scope.selectedPayrollArray.length>0?$scope.selectedPayrollArray:[{"code": "all"}],
                              };
                              payloadObj.push(roleArrayData);
                          }

                    }

                  });
                }
                gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.newRolesBaseUrl + manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId +
                    "/" + $scope.appUserId + manageEmpUrlConfig.resources.rolesAll, payloadObj,
                    function (response) {
                      SharedDataService.getAppSharedData().sMessage=JSON.stringify(response);
                      $state.reload();
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                    }
                );
            };

            var getDepartment = function getDepartment(){
            $scope.department = {};
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.departments, null,
                function (response) {

                    $scope.departments = {};
                    var x = {
                        "deptCode": "All",
                        "deptId": "all",
                        "deptName": "All Departments",
                        "shortDesc": "short"
                    };
                    $scope.departments = response;
                    $scope.departments.map(function (obj) {
                        obj.isSelected = false;
                    });
                    $scope.departments.unshift(x);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
              );
            };
            $scope.filterDept = function (deptId) {
                angular.forEach($scope.departments, function (item) {
                    if (item.deptId === deptId) {
                        deptId = item.deptName;
                    }
                });
                return deptId;
            };

           var getLocation = function getLocation(){
            $scope.location = {};
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.locations, null,
                function (response) {
                    $scope.locations = {};
                    var y = {
                        "locationCode": "All",
                        "locationId": "all",
                        "locationName": "All Locations",
                        "shortDesc": "short"
                    };
                    $scope.locations = response;
                    $scope.locations.map(function (obj, index) {
                        obj.isSelected = false;
                    });
                    $scope.locations.unshift(y);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
              );
            };


            $scope.filterLocation = function (location) {
                angular.forEach($scope.locations, function (item) {
                    if (item.locationId === location) {
                        location = item.locationName;
                    }
                });
                return location;
            };

            $scope.getKeyByValue=function(roleRestrictions) {
                $scope.selectRole = Object.keys(roleRestrictions).find(function(key) {
                    return roleRestrictions[key] === true;
                });
            };
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.rolesRestrict, null,
                function (response) {
                    $scope.roleRestrictions = response;
                    $scope.getKeyByValue($scope.roleRestrictions);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            var getPayGroup = function getPayGroup(){
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.payGroups, null,
                function (response) {
                    $scope.payGroups = {};
                    var z = {
                        "payGroupCode": "All",
                        "payGroupId": "all",
                        "payGroupDescription": "All Pay Groups",
                        "shortDesc": "short"
                    };
                    $scope.payGroups = response;
                    $scope.payGroups.map(function (obj, index) {
                        obj.isSelected = false;
                    });
                    $scope.payGroups.unshift(z);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
              );
            };
            $scope.filterPayGroup = function(paygroup){
                angular.forEach($scope.payGroups, function (item) {
                    if (item.payGroupId === paygroup) {
                        paygroup = item.payGroupDescription;
                    }
                });
                return paygroup;
            };

            $scope.selectListItem  = function() {
                $scope.displayDropdown = !$scope.displayDropdown;
            };

            $scope.toggleLocation = function (subCat) {
                subCat.isShowLocationDropDown = !subCat.isShowLocationDropDown;
            };

            $scope.toggleDepartment = function (subDept) {
                subDept.isShowDepartmentDropDown = !subDept.isShowDepartmentDropDown;
            };

            $scope.togglePayGroup = function (subPay) {
                subPay.isPayGroupDropDown = !subPay.isPayGroupDropDown;
            };
           $scope.toggle = function (subCat) {
               subCat.isShowDepartmentDropDown= false;
               subCat.isShowLocationDropDown=false;
               subCat.isPayGroupDropDown=false;

           };

            $scope.closePanel = function () {
                $scope.totalSelected =[];
                $scope.editlocations = false;
                if($scope.selectedLocations.length > 0){
                    angular.forEach($scope.selectedLocations, function (location, key) {
                        $scope.totalSelected.push(location);
                    });
                    $scope.editlocations = true;
                }
                gso.getNGDialog().closeAll();
                for (var i = 0; i < $scope.locations.length; i++) {
                    $scope.locations[i].value = false;
                    $scope.locations[i].disable = false;
                }

            };

            $scope.confirmHRAuthRestricted = function () {
                $scope.editlocations = true;
                gso.getNGDialog().closeAll();
            };

            $scope.stateChanged = function (selectedLocation, active, value) {
                if(selectedLocation.locationId === "all" && selectedLocation.value === true){
                    $scope.totalSelected = [];
                    for (var i = 0; i < $scope.locations.length; i++) {
                        if($scope.locations[i].locationId !== "all"){
                            $scope.locations[i].disable = true;
                            $scope.locations[i].value = false;
                        }
                    }
                }
                if(selectedLocation.locationId === "all" && selectedLocation.value === false){
                    for (var i = 0; i < $scope.locations.length; i++) {
                        for( var j= 0; j< $scope.selectedLocations.length; j++){
                            if($scope.selectedLocations[j].locationId !== "all") {
                                if ($scope.locations[i].locationId === $scope.selectedLocations[j].locationId) {
                                    $scope.stateChanged($scope.locations[i], false, 2);
                                }
                            }
                        }
                    }
                }
                if (selectedLocation.value && value === 0) {
                    $scope.totalSelected.push(selectedLocation);
                }
                else {
                    if (value === 0) {
                        if(selectedLocation.locationId === "all") {
                            for (var i = 0; i < $scope.locations.length; i++) {
                                if($scope.locations[i].locationId !== "all"){
                                    $scope.locations[i].disable = false;
                                }
                            }
                        }
                        $scope.totalSelected.splice($scope.totalSelected.indexOf(selectedLocation), 1);
                    } else if(value === 1)
                    {
                        if(selectedLocation.locationId === "all") {
                            for (var i = 0; i < $scope.locations.length; i++) {
                                if($scope.locations[i].locationId !== "all"){
                                    $scope.locations[i].disable = false;
                                }
                            }
                        }
                        selectedLocation.value = false;
                        $scope.totalSelected.splice($scope.totalSelected.indexOf(selectedLocation), 1);
                    } else if(value === 2){
                        if(selectedLocation.locationId === "all") {
                            for (var i = 0; i < $scope.locations.length; i++) {
                                if($scope.locations[i].locationId !== "all"){
                                    $scope.locations[i].disable = true;
                                }
                            }
                        }
                        selectedLocation.value = true;
                        $scope.totalSelected.push(selectedLocation);
                    }
                }
            };

            $scope.filterLocationName = function (location) {
                angular.forEach($scope.locations,function(item){
                    if (item.locationId === location.locationId) {
                        location.locationName = item.locationName;
                    }
                });
                return location.locationName;
            };

            $scope.hRAuthPopup = function(){
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/rolesModal.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: false,
                    className: 'tn-confirm-delete'
                }).then(function () {
                });
                if($scope.selectedLocations.length > 0) {
                    $scope.totalSelected =[];
                    for (var i = 0; i < $scope.locations.length; i++) {
                        $scope.locations[i].value = false;
                        $scope.locations[i].disable = false;
                    }
                    for (var i = 0; i < $scope.locations.length; i++) {
                        for( var j= 0; j< $scope.selectedLocations.length; j++){
                            if($scope.locations[i].locationId === $scope.selectedLocations[j].locationId){
                                $scope.stateChanged($scope.locations[i], false, 2);
                            }

                        }
                    }
                }
            };
    }]);
