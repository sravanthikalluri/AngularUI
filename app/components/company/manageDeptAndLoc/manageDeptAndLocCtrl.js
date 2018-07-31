'use strict';
trinetApp.controller('manageDeptAndLocCtrl', ['$scope', 'gso', 'genericService','$http','$rootScope',
    function ($scope, gso, genericService,$http,$rootScope) {
        $scope.sortType = 'employeeName';
        $scope.sortReverse = false;
        $scope.sortTypeEmp = 'name';
        $scope.totalDiv = false;
        $scope.tab = 1;
        $scope.deptName = '';
        $scope.searchbox = false;
        $scope.isvisable = false;
        $scope.hideHeadQuaters=true;
        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };

        /**************This is to hide the flyout ***********/
        $scope.textboxhide = function () {
            $scope.searchbox = false;
            $scope.isvisable = false;
            $scope.showFlyout = false;
            $scope.mailFlyoutData = false;
            $scope.showManageEmpColList = false;
        };
        $scope.deptEffDate = new Date();
        $scope.locEffectiveDate = new Date();

        /**************This function is used to redirect to selected tab ***********/
        $scope.selectTab = function (newValue) {
            $scope.tab = newValue;
            if (newValue === 1) {
                 $scope.search ="";
                $scope.toGetDepartments();
            }
            else if (newValue === 2) {
                $scope.search ="";
                $scope.toGetLocations();
            }
        };

        $scope.selectMainDate = function (Date) {
            $scope.tab;
            if ($scope.tab === 1) {
                $scope.search ="";
                $scope.toGetDepartments(Date);
            }
            else if ($scope.tab === 2) {
                $scope.search ="";
                $scope.toGetLocations(Date);
            }

        };
        /** **************Department records data************** */
        $scope.toGetDepartments=function() {
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.allDepartments, null,
                function (response) {
                    $scope.departments = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        /** **************location records data************** */
        $scope.toGetLocations=function(effDate) {
            $scope.getLocations = gso.getCrudService()
                .execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                    "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.location, null,
                    function (response) {
                        $scope.locations = response;
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
        }

        /** **************To check ohioNotifications************** */
        function sendNotification() {
            gso.getCrudService()
                .execute(constants.post,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.managegroup + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId+ "/ohioemail", null, function (response) {
                    },
                    function (data) {
                    }
                );
        }

        /** **************This function is to edit the department record and save************** */
        $scope.editDepartmentFunc = function (dept) {
            $scope.errorAlert = null;
            angular.extend($scope.editDepartment, dept);
            gso.getNGDialog().open({
                templateUrl: fileConfig.company.editDept,
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            $scope.closeDialog = function () {
                dept.deptCode = $scope.editDepartment.deptCode;
                dept.deptName = $scope.editDepartment.deptName;
                dept.shortDesc = $scope.editDepartment.shortDesc;
                dept.effectiveDate = gso.getUtilService().filterDate($scope.editDepartment.effectiveDate, constants.dateFormat);
                dept.deptId = $scope.editDepartment.deptId;
                $scope.editDepart(dept);
                $scope.closePanel();
            };

        };

        $scope.childParentAlertMsg = function (data) {
                $scope.errorAlert = data;
        };

        /** **************This function is to add the department record and save************** */
        $scope.addDepartment = function () {
            $scope.errorAlert = null;
            $scope.condition = {
                invalidChar : false,
                isExistDept : false
            };
            gso.getNGDialog().open({
                templateUrl: fileConfig.company.addDept,
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                controller: ['$scope', function ($scope) {
                    $scope.addDepart = function (addDeptdata, isCreateOther) {
                        gso.getCrudService().execute(constants.post, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                                                        companyUrlConfig.resources.manageCompany + "/" + gso.getAppConfig().companyId +
                                                                        companyUrlConfig.resources.departments, addDeptdata,
                            function (response) {
                                if (isCreateOther) {
                                    $scope.childParentAlertMsg(response);
                                    $scope.department = {};
                                    $scope.toGetDepartments();
                                } else {
                                    $scope.toGetDepartments();
                                    $scope.childParentAlertMsg(response);
                                    gso.getNGDialog().closeAll();

                                }

                            },
                            function (data) {
                                var jobsAlert = {
                                    _statusCode: data._statusCode,
                                    _statusMessage: data._statusMessage
                                };
                                $scope.childParentAlertMsg(jobsAlert);
                            }
                        );
                    };
                    $scope.closeDialog = function (data, isCreateOther) {
                        var postData = {
                            deptCode: data.deptCode,
                            deptName: data.deptName,
                            shortDesc: data.shortDesc,
                            effectiveDate: gso.getUtilService().filterDate($scope.deptEffDate, constants.dateFormat),
                        };
                        $scope.addDepart(postData, isCreateOther);
                    };
                }]
            });
        };

        /** **************This function is to check the availability of the department code************** */
        $scope.checkCodeAvailability = function (code) {

            $scope.condition = {
                invalidChar : false,
                isExistDept : false
            };
            gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company+ "/" +
                gso.getAppConfig().companyId + globalUrlConfig.resources.departments+code,
                function () {
                    $scope.condition.isExistDept = true;
                },
                function (data) {
                    $scope.condition.isExistDept = false;
                }
            );
        };

        $scope.editDepart = function (editDeptdata) {
            gso.getCrudService().execute(constants.put, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                                        companyUrlConfig.resources.manageCompany + "/" + gso.getAppConfig().companyId +
                                                        companyUrlConfig.resources.departments + "/" + editDeptdata.deptId, editDeptdata,
                function (response) {
                    $scope.errorAlert = response;
                    gso.getNGDialog().closeAll();
                    $scope.toGetDepartments();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.addlocation = function () {
            $scope.errorAlert = null;
            $scope.closeAlert();
            $scope.getCountryList();
            $scope.getlocationId = gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +"/"+ gso.getAppConfig().companyId+ globalUrlConfig.resources.locationcode+"?cache=flush",
                null,
                function (response) {
                    $scope.addlocatn.locationId = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            gso.getNGDialog().open({
                templateUrl: fileConfig.company.addLoc,
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });

           $scope.closeDialog = function (data, valid) {
             var locationNameForm = "";
             data.effectiveDate= gso.getUtilService().filterDate($scope.locEffectiveDate, constants.dateFormat);
             if(data.remoteOffice === "N"){
               if(data.headquarters){
                 locationNameForm = data.locationName+"-HQ"
               }else{
                 locationNameForm = data.locationName;
               }
             }else{
               locationNameForm = data.locationName+"-REMOTE"
             }
             $scope.onStateChange(data);
                if (!valid ){
                        $scope.closeThisDialog({
                                locationName: locationNameForm,
                                locationId: data.locationId,
                                shortDesc: data.shortDesc,
                                address: data.address
                            });
                        }
                 };
        };

        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        $scope.editlocatn = function (location) {
            $scope.getCountryList();
            angular.extend($scope.editlocation, location);
            gso.getNGDialog().open({
                templateUrl: fileConfig.company.editLoc,
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            $scope.closeDialog = function (data, validdata) {
                if (!validdata) {
                    location.locationName = $scope.editlocation.locationName;
                    location.locationId = $scope.editlocation.locationId;
                    location.shortDesc = $scope.editlocation.shortDesc;
                    location.address = $scope.editlocation.address;
                    $scope.editLoc(location);
                    $scope.closePanel();
                }
            };
        };

        $scope.addLoc = function (addLocData) {
            gso.getCrudService().execute(constants.post, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                                            companyUrlConfig.resources.manageCompany + "/" + gso.getAppConfig().companyId +
                                                            companyUrlConfig.resources.locations, addLocData,
                function (response) {
                    $scope.errorAlert = response;
                    gso.getNGDialog().closeAll();
                    $scope.toGetLocations();
                },
                function (data) {
                    $scope.failed=true;
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.editLoc = function (editLocdata) {
            gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.editlocation + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId, editLocdata,
                function (response) {
                    $scope.errorAlert = response;
                    gso.getNGDialog().closeAll();
                    $scope.toGetLocations();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
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

        /** **************This function is to get the currentList************** */
        $scope.getCountryList = function () {
            gso.getAPIConfigDataService().getCountries().then(function(response) {
                $scope.countriesData = response;
                $scope.addlocatn = {address: {country: gso.getAppConfig().countryCode}};
                $scope.getStateCode(gso.getAppConfig().countryCode);
            });

        };


        /** **************To check if state is OH and policy number is set************** */
        $scope.onStateChange=function(data) {
         var state=data.address.state;
     		$scope.companyPolicyNbr=gso.getCrudService().execute(constants.get,globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                     gso.getAppConfig().companyId  + globalUrlConfig.resources.workersCompPolicies, null, function (companyPolicyNbr) {
             	   if  (state==="OH" && companyPolicyNbr.length === 0 ) {
                       sendNotification();
               	      $scope.errorCodeBool = true;
                      $scope.errorResp = "You cannot add a new work location for Ohio without an Ohio state insurance policy. Set up an Ohio state insurance policy and then add the new location. Please contact your Client Services Associate for further details.";
                   } else {
                    	$scope.closeAddLocation(data);
                   }
                },function (data) {
                	  $scope.errorCodeBool = true;
                      $scope.errorResp = data;
               });

       };

        $scope.closeAddLocation=function(data) {
           //$scope.locations.push(data);
           $scope.addLoc(data);
           $scope.locCount++;
           if($scope.failed)$scope.closePanel();
       };

        $scope.selectedDepDate=function(date){
            var effectiveDate= new Date(date);
            $scope.deptEffDate =  gso.getUtilService().filterDate(effectiveDate, constants.dateFormat);
        };

        $scope.selectedLocDate=function(date){
            var effectiveDate= new Date(date);
            $scope.locEffectiveDate =  gso.getUtilService().filterDate(effectiveDate, constants.dateFormat);
        };
        /** **************Retrieving the states data************** */
        $scope.getStateCode = function (countrycode) {
            genericService.states(countrycode).then(
                function (data) {
                    $scope.statesData = data.data.data;
                   $scope.addlocatn.address.state = $scope.statesData[0].key;
                }
            );
        };
        // code for getting states data end's here
        $scope.addressValidation=function (val,form) {
            val==="N"?$scope.hideHeadQuaters=false:$scope.hideHeadQuaters=true;
            if(val==="N" && !$scope.addlocatn.address.address1){
                form.$invalid=true;
            }
        };

        /** **************Retrieving the states data************** */
        $scope.checkCountry = function (countrycode) {
            if (countrycode === undefined) {
                $scope.alert = [{
                    type: constants.warning,
                    msg: "Select Country please"
                }];
            }
        };
        $scope.editDepartment = {};
        $scope.addlocatn = {"locationId": ""};
        $scope.editlocation = {"locationId": ""};
        $scope.closePanel = function () {
            gso.getNGDialog().closeAll();
        };
        $scope.isDisabled = function () {
            $scope.isvisable = true;
        };

        $scope.toGetDepartments();
    }]);
