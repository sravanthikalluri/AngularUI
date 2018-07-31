'use strict';
trinetApp
    .controller(
    'workInfoCtrl', ['$scope', 'genericService', 'gso', '$timeout','SharedDataService','$filter',
        function ($scope, genericService, gso, $timeout,SharedDataService,$filter) {
            $scope.employeeDetailsSection = false;
            $scope.isEmpGenerateFormSubmitted = false;
            $scope.hideVacation=true;
            $scope.conditionCheck=false;
            $scope.keepGoing=true;
            $scope.showTipped=false;
            $scope.hideSick=true;
            $scope.hidePerformance=true;
            $scope.hidePersonal=false;
            $scope.hideFloatingHoliday = false;
            $scope.hideEibRepsonse = false;
            $scope.employeeDetailsView = false;
            $scope.compensationView = false;
            $scope.hideVariableHour=false;
            $scope.viewdate = "current";
            $scope.workInfoArray = [];
            $scope.employments = [];
            $scope.compensations = [];
            $scope.showTimeline = true;
            $scope.displayChangehistorydata = {"effectivestatus": ""};
            $scope.employeeGenerateFormbutton = true;
            $scope.employmentChangeData = {};
            $scope.effective = {};
            $scope.effectiveDate = new Date(gso.getUtilService().filterNextDayDate());
            $scope.employmentChangeData.workComp = {"workCompCode": "", "workCompState": ""};
            $scope.counter = 1;
            $scope.employmentChangeData.departments = [{deptId: '', percentage: 0}];
            $scope.num = 0;
            $scope.empTransferTotalpercent = 0;
            $scope.jobReclassificationTotalpercent = 0;
            $scope.employmentChangeData.employeeTransfer = {"reasonId": undefined};
            $scope.employmentChangeData.jobReclassification = {"reasonId": undefined};
            $scope.employmentChangeData.promotion = {"reasonId": undefined};
            $scope.employmentChangeData.payChange = {"reasonId": undefined};
            $scope.employmentChangeData.demotion = {"reasonId": undefined};
            // code for fetching whole employee change data start's here
            $scope.fetchEmpChangeData = {};
            $scope.dateDropDown = [{"name": "current", "value": constants.currentlyEffective}];
            $scope.isCanadianWSE = (gso.getAppConfig().countryCode === 'CA') ? true : false;
            $scope.employeeStatusFlag = false;
            $scope.employeeClass = SharedDataService.getAppSharedData().employeeClass;
            $scope.employeeStatusFlagForK1D = false;
            $scope.restrictedlocations = false;
            $scope.minWageFlag = false;
            empRolesDataService();

            var empChangeWorkerComp;
            var companyId = gso.getAppConfig().companyId;
            var empUpdateSuccessAlert;
            var specialEmploymentChangeOptions = ['chooseEmpChangePromotion','chooseEmpChangeEPC','chooseEmpChangeDemotion'];

                if($scope.employeeClass === "K1E"){
                    $scope.employeeStatusFlag = true;
                }else if($scope.employeeClass === "K1D"){
                    $scope.employeeStatusFlagForK1D = true;
                }

            // Checking for HRAuth_R


            function empRolesDataService() { gso.getCrudService()
                .execute(constants.get,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                    manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.userRoles, null, function (response) {
                        $scope.empRolesData = response;
                        $scope.restrictedlocations=$scope.empRolesData.some(function(item){ return (item ==="HRAUTH_R");});
                        if($scope.restrictedlocations === true){
                            hrAuthRestrictedRole();
                        }
                    },
                    function (data) {
                    }
                )};




            //code to get Restricted locations data
            function hrAuthRestrictedRole() {
                gso.getCrudService().execute(constants.get,'/api-config/v1/company/'+gso.getAppConfig().companyId+ "/" +gso.getAppConfig().userId+'/locations',null,
                    function (response) {
                        $scope.locationsData = response;
                    },
                    function (data) {
                    }
                );

            }


            //code for view of workinfo on basis of date selection start's here
                $scope.selecteddate = function (viewdate) {
                    if (viewdate === "current") {
                        $scope.workInfoData = $scope.workInfoArray[0];
                    } else {
                        angular.forEach($scope.workInfoArray, function (input, index) {
                            if (input.effectiveDate === viewdate) {
                                $scope.workInfoData = $scope.workInfoArray[index];
                            }
                        });
                    }

                };

                function getLocation(locationId){
                    return $scope.locationsData.filter(function(item){
                        return item.locationId === locationId;
                    });
                }

                $scope.worksCompService = function (locationId) {
                       var location = getLocation(locationId);
                       $scope.workState = location.length > 0 ? location[0].address.state : angular.noop();


                       $scope.companyPolicyNbr=gso.getCrudService().execute(constants.get,globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                            gso.getAppConfig().companyId  + globalUrlConfig.resources.workersCompPolicies, null, function (companyPolicyNbr) {

                    	   if ($scope.workState === 'OH' && (companyPolicyNbr.length === 0 || companyPolicyNbr[0].policyNumber === " ")) {
                    		   $scope.oHWorkerComp = true;

                           } else {
                        	   $scope.oHWorkerComp = false;
                           }
                       },function (data) {
                        $scope.oHWorkerComp = false;
                      });

                    $scope.workersCompLookUpData = null;
                    $scope.workersCompLookUp = gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/" + $scope.workState + globalUrlConfig.resources.workersCompLookUp, null, function (workersCompLookUp) {
                        if (workersCompLookUp.length === 0) {
                            var workersAlert = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.workersCompLookUpLength
                            };
                            $scope.childParentAlertMsg(workersAlert);
                        } else {
                            $scope.employmentChangeWorkerComp="Y";
                            empChangeWorkerComp="Y";
                            $scope.workersCompLookUpData = workersCompLookUp;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                };

                $scope.toggleTimeline = function () {
                    $scope.showTimeline = !$scope.showTimeline;
                    $scope.showHistoryTag = !$scope.showHistoryTag;
                };


                function setEmploymentChangeOptions() {
                    $scope.employmentChangeOptions = [{
                        title : $scope.translation.work_info.cec_business_title_change_only,
                        description : $scope.translation.work_info.cec_busniness_title_change_only_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeBTC'
                    },{
                        title : $scope.translation.work_info.cec_employee_transfer,
                        description : $scope.translation.work_info.cec_employee_transfer_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeET'
                    },{
                        title : $scope.translation.work_info.cec_job_reclassification,
                        description : $scope.translation.work_info.cec_job_reclassification_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeJC'
                    },{
                        title : $scope.translation.work_info.cec_employee_pay_change,
                        description : $scope.translation.work_info.cec_employee_pay_change_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeEPC'
                    },{
                        title : $scope.translation.work_info.cec_promotion,
                        description : $scope.translation.work_info.cec_promotion_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangePromotion'
                    },{
                        title : $scope.translation.work_info.cec_demotion,
                        description : $scope.translation.work_info.cec_demotion_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeDemotion'
                    },{
                        title : $scope.translation.work_info.cec_optional_groupings,
                        description : $scope.translation.work_info.cec_optional_groupings_description,
                        isSelected : false,
                        isInActive : false,
                        id : 'chooseEmpChangeOptionalGroupings'
                    }];
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

                // Intialization logic.
                $scope.init = function () {
                    $scope.$on(empUpdateSuccessAlert, function (evnt, data) {
                        $scope.alert = data;
                    });
                    gso.getCrudService().execute(constants.get,profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                             companyId + '/' + $scope.appUserId + profileUrlConfig.resources.employment, null, function (employment) {
                        $scope.employeeDetailsView = true;
                        $scope.employment = employment.activeWorkProfileList;
                        angular.forEach($scope.employment, function (employmentData, index) {
                            employmentData.workSupervisor = employmentData.workSupervisor.trim();
                            employmentData.supervisorId = employmentData.supervisorId.trim();
                            employmentData.workSupervisor = (!employmentData.workSupervisor || employmentData.workSupervisor === "") ? '---' : employmentData.workSupervisor;
                            employmentData.supervisorId = (!employmentData.supervisorId || employmentData.supervisorId === "") ? '---' : employmentData.supervisorId;
                            var superVisorDate = employmentData.serviceDate.split('-');
                            var workEffectiveDate = employmentData.effectiveDate.split('-');
                            employmentData.serviceDate = gso.getUtilService().filterDate(new Date(parseInt(superVisorDate[0], 10), (parseInt(superVisorDate[1], 10) - 1), superVisorDate[2]), constants.dateFormatUS);
                            var date = "Effective " + gso.getUtilService().filterDate(new Date(parseInt(workEffectiveDate[0], 10), (parseInt(workEffectiveDate[1], 10) - 1), workEffectiveDate[2]), constants.dateFormatUS);
                            var dateObj = {};
                            dateObj.name = employmentData.effectiveDate;
                            dateObj.value = date;
                            if (index !== 0) {
                                $scope.dateDropDown.push(dateObj);
                            }
                            $scope.employments.push(employmentData);
                        });
                         $scope.loadData();
                    }, function (errorRes) {
                        $scope.loadData();
                        $scope.childParentAlertMsg(errorRes);
                        $scope.employeeDetailsView = false;
                        $scope.employeeDetailsSection = true;
                    });
                    gso.getCrudService().execute(constants.get,profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                          companyId + '/' + $scope.appUserId + profileUrlConfig.resources.compensation, null, function (compensation) {
                       $scope.compensationView = true;
                        $scope.compensation = compensation.compensationList;
                        angular.forEach($scope.compensation, function (compensationData, index) {
                            $scope.compensations.push(compensationData);
                         });
                            $scope.loadData();
                        }, function (errorRes) {
                            $scope.loadData();
                            $scope.childParentAlertMsg(errorRes);
                            $scope.compensationView = false;
                       });

                    // ToDo: Getting the Employee Roles to the user:
                    gso.getCrudService().execute(constants.get,companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + '/manage-company' + '/' + gso.getAppConfig().companyId + '/'+'org-details?viewType=all', null, function (response) {
                               $scope.acaStatus = response.acaLargeEmployer;
                                $scope.acaStatus===true? $scope.hideVariableHour= true: $scope.hideVariableHour=false;
                       },
                       function (data) {
                       }
                     );

                };
                //to inactivate Some Field

                function inActivateField() {

                    $scope.employmentChangeOptions.map(function (item) {

                        if ( $scope.employeeClass === 'K1E' || $scope.employeeClass === 'K1D') {

                            if (item.id === 'chooseEmpChangeEPC') {
                                item.isInActive = true;
                            }
                            if (item.id === 'chooseEmpChangePromotion') {
                                item.isInActive = true;
                            }
                            if (item.id === 'chooseEmpChangeDemotion') {
                                item.isInActive = true;
                            }

                        }
                    });
                }

               $scope.loadData = function(){
               $scope.workInfoArray = [];
                   if($scope.compensationView && $scope.employeeDetailsView){

                       $scope.employments.map(function (employmentsData, index) {
                           $scope.compensations.map(function (compensationsData, i) {
                              if (index === i) {
                                $scope.workInfoArray.push($scope.mergeObjs(employmentsData, compensationsData));
                              }
                           });
                       });
                        $scope.workinfo = $scope.workInfoArray;
                        $scope.selecteddate($scope.viewdate);
                   }
                   else if($scope.compensationView && !$scope.employeeDetailsView){
                        $scope.workInfoArray = $scope.compensations;
                        $scope.workinfo = $scope.workInfoArray;
                        $scope.selecteddate($scope.viewdate);
                   }
                   else if(!$scope.compensationView && $scope.employeeDetailsView){
                        $scope.workInfoArray = $scope.employments;
                        $scope.workinfo = $scope.workInfoArray;
                        $scope.selecteddate($scope.viewdate);
                   }
                };
                $scope.mergeObjs=function(obj1,obj2)
                {
                    var objs =new Array();
                    objs .push(obj1);
                    objs .push(obj2);
                   var result =  objs.reduce(function (r, o) {
                        Object.keys(o).forEach(function (k) {
                            r[k] = o[k];
                        });
                        return r;
                    }, {});
                    return result;
                }
                $scope.displayChangeHistory = function(){
                    gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                        gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.displaychangehistory, null, function (displayChangehistory) {
                        if (displayChangehistory.length === 0) {
                            var alert = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.displayChangehistoryLength
                            };
                            $scope.childParentAlertMsg(alert);
                        } else {
                            $scope.showHistoryTag = true;
                            $scope.displayChangehistorydata = displayChangehistory;

                            // Removing the whitespaces between words
                            $scope.displayChangehistorydataBackup=angular.forEach($scope.displayChangehistorydata, function (entry) {
                                entry.action=entry.action.replace(/ +/g, "");
                            });
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });
                };



                $scope.selectedObject = function (details) {
                    $scope.details = details;
                    var length = $scope.displayChangehistorydata.length;
                    var i;
                    for (i = 0; i < length; i++) {
                        $scope.date1 = new Date(
                            $scope.displayChangehistorydata[i].effectiveDate);
                        $scope.date2 = new Date();

                        if ($scope.date1.getTime() >= $scope.date2
                                .getTime()) {
                            $scope.effective = "effective on";
                        } else {
                            $scope.effective = "effective since";
                        }

                        $scope.displayChangehistorydata[i].effectivestatus = $scope.effective;
                        $scope.displayChangehistorydata[i].effec = 'Effective';

                    }
                    SharedDataService.getAppSharedData().displayHistoryUserId= $scope.appUserId;

                };

                $scope.employeeChangeRequest = function () {
                    setEmploymentChangeOptions();
                    inActivateField();
                    angular.element('.earningStmtbody').addClass(
                        'employment-change-request');
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/workinfo/empChange/chooseEmpChange.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });
                };

                function isEnableSection(id){
                    return $scope.employmentChangeOptions.filter(function(item){
                            return item.id === id && item.isSelected;
                        }).length > 0;
                }

                $scope.employeeGenerateForm = function () {
                    empRolesDataService();
                    empChangeWorkerComp=undefined;
                    $scope.employmentChangeWorkerComp=null;
                    $scope.closeAlert();
                    $scope.oHWorkerComp=false;
                    $scope.employmentChangeOptions.map(function(item,index){
                        $scope.selectedCount=0;
                        var isEnable =  isEnableSection(item.id);
                        item.id === 'chooseEmpChangeBTC' ? $scope.businessTitleChange = isEnable  : angular.noop();
                        item.id === 'chooseEmpChangeET' ? $scope.EmployeeTransfer = isEnable : angular.noop();
                        item.id === 'chooseEmpChangeJC' ? $scope.JobReclassification = isEnable : angular.noop();
                        item.id === 'chooseEmpChangeEPC' ? $scope.EmployeePayChange = isEnable : angular.noop();
                        item.id === 'chooseEmpChangePromotion' ? $scope.Promotion = isEnable : angular.noop();
                        item.id === 'chooseEmpChangeDemotion' ? $scope.Demotion = isEnable : angular.noop();
                        item.id === 'chooseEmpChangeOptionalGroupings' ? $scope.OptionalGroupings = isEnable : angular.noop();

                        item.id === 'chooseEmpChangeBTC' && isEnable ?  $scope.WorkersComp = false : angular.noop();
                        item.id !== 'chooseEmpChangeBTC' && isEnable ?  $scope.WorkersComp = false : angular.noop();

                        angular.forEach($scope.employmentChangeOptions, function (option) {
                            option.isSelected ? $scope.selectedCount += 1 : angular.noop();
                            if($scope.selectedCount===1 && option.id === 'chooseEmpChangeOptionalGroupings' && option.isSelected) {
                                empChangeWorkerComp='N';
                                item.id === 'chooseEmpChangeOptionalGroupings' ? $scope.WorkersComp = true : angular.noop();
                            }
                        });

                    });

                    var isShow = $scope.employmentChangeOptions.filter(function(item){
                        return (item.id === 'chooseEmpChangeET' && item.isSelected) || (item.id === 'chooseEmpChangeJC' && item.isSelected);
                    }).length > 0;

                    $scope.errorAlert = null;
                    $scope.empTransferTotalpercent = 0;
                    $scope.jobReclassificationTotalpercent = 0;
                    $scope.fillEmployeeChangeData($scope.effectiveDate);

                    if (isShow) {
                        $scope.enable = false;
                    } else {
                        $scope.enable = true;
                    }

                    if($scope.JobReclassification){
                        $scope.jobs();
                    }
                    /*$scope.employmentChangeData.jobReclassification.standardHours = parseInt($scope.workInfoArray[0].standardHours);*/
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/workinfo/empChange/empGenerateFormView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        className: 'ngdialog-theme-default employee-genarate-modal'

                    });
                    gso.getNGDialog().close();

                };
                $scope.closePanel = function () {
                    gso.getNGDialog().closeAll();
                    $scope.employeeGenerateFormbutton = true;
                };

                    $scope.jobs = function () {
                        gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                            gso.getAppConfig().companyId + "/" + profileUrlConfig.resources.jobs + "?getJobCosting=false", null, function (jobs) {
                            if (jobs.length === 0) {
                                var jobsAlert = {
                                    _statusCode: constants.warning,
                                    _statusMessage: profile.workInfo.jobsAlert
                                };
                                $scope.childParentAlertMsg(jobsAlert);
                            } else {
                                $scope.jobsData = jobs;
                            }
                        }, function (data) {
                            $scope.childParentAlertMsg(data);
                        });
                    };

                $scope.fillEmployeeChangeData = function (effectiveDate) {
                    var currentDate = new Date();
                    var effectiveDate= new Date(effectiveDate);
                    $scope.currDate=  gso.getUtilService().filterDate(currentDate, constants.dateFormat);
                    $scope.effdate =  gso.getUtilService().filterDate(effectiveDate, constants.dateFormat);
					getDepartments($scope.effdate);
					getLocations($scope.effdate);
					getDirectManagers($scope.effdate);
                    if($scope.effdate > $scope.currDate){
                        $scope.futureMessage = true;
                    }else{
                        $scope.futureMessage = false;
                    }
                    gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                        gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.empChange + $scope.effdate, null, function (employmentChange) {
                        $scope.minWageFlag = false;
                        $scope.empTransferTotalpercent = 0;
                        $scope.jobReclassificationTotalpercent = 0;
                        $scope.employmentChangeData = employmentChange;
                        // Added this condition for check null condition
                        if($scope.employmentChangeData.departments===null){$scope.employmentChangeData.departments=[];$scope.financialSplit = 'No';};
                        //Added this condition temporarily untill GS-25902 is ready
                        $scope.employmentChangeData.jobReclassification.temporaryInd===true?$scope.tempDisable=true:$scope.tempDisable=false;
                        // removing all non numeric characters from phone number
                        if($scope.employmentChangeData.workPhone){
                            $scope.employmentChangeData.workPhone = $scope.employmentChangeData.workPhone !=null?$scope.employmentChangeData.workPhone.replace(/\D/g,''):$scope.employmentChangeData.workPhone;
                            $scope.employmentChangeData.ext = ($scope.employmentChangeData.workPhone > 10) ? $scope.employmentChangeData.workPhone.substring(10): '';
                            $scope.employmentChangeData.workPhone = ($scope.employmentChangeData.workPhone.length > 10) ? $scope.employmentChangeData.workPhone.substring(1) : $scope.employmentChangeData.workPhone.substring(0, 10);
                        }


                        $scope.updateSingleDepartmentPercentage();
                        $scope.orginalLocation = getLocation($scope.employmentChangeData.employeeTransfer.locationId);
                        $scope.orginalWorkstate= $scope.orginalLocation.length > 0 ? $scope.orginalLocation[0].address.state : angular.noop();
                        if($scope.employeeClass === "K1E"){
                            $scope.employmentChangeData.jobReclassification.variableHour = false;
                            $scope.employmentChangeData.jobReclassification.temporaryInd = false
                        }
                        if($scope.employeeClass === "K1D"){
                            $scope.employmentChangeData.jobReclassification.temporaryInd = true;
                        }
                        $scope.employmentChangeData.jobReclassification.standardHours = parseInt($scope.employmentChangeData.jobReclassification.standardHours);
                        //$scope.employmentChangeData.jobReclassification.standardHours = parseInt($scope.workInfoArray[0].standardHours);
                        angular.forEach($scope.vacationsData,function(vaction){
                            if(vaction.benefitPlan === $scope.employmentChangeData.jobReclassification.vacationPto){
                                $scope.employmentChangeData.jobReclassification.vacationPto = vaction;
                            }
                        });
                        angular.forEach($scope.sickData,function(sick){
                            if(sick.benefitPlan === $scope.employmentChangeData.jobReclassification.sick){
                                $scope.employmentChangeData.jobReclassification.sick = sick;
                            }
                        });
                        angular.forEach($scope.eibRepsonse,function(eib){
                            if(eib.benefitPlan === $scope.employmentChangeData.jobReclassification.eib){
                                $scope.employmentChangeData.jobReclassification.eib = eib;
                            }
                        });
                        angular.forEach($scope.personalData,function(personal){
                            if(personal.benefitPlan === $scope.employmentChangeData.jobReclassification.personal){
                                $scope.employmentChangeData.jobReclassification.personal = personal;
                            }
                        });
                        angular.forEach($scope.floatingHoliday,function(fHoliday){
                            if(fHoliday.benefitPlan === $scope.employmentChangeData.jobReclassification.floatingHoliday){
                                $scope.employmentChangeData.jobReclassification.floatingHoliday = fHoliday;
                            }
                        });
                        /*if(!$scope.employmentChangeData.jobReclassification.variableHour){
                            $scope.hideVariableHour = false;
                        }*/

                            if (employmentChange.departments.length === 0) {
                                $scope.financialSplit = 'No';
                            } else {
                                var total = 0;
                                $scope.financialSplit = 'Yes';
                                angular.forEach($scope.employmentChangeData.departments, function (value) {
                                    if (value.percentage !== undefined && value.percentage !== "") {
                                        var temp = parseFloat(value.percentage, 10);
                                        total += temp;
                                    }
                                });
                                $scope.empTransferTotalpercent = total;
                            }

                    }, function (data) {

                    });
                };


                // code for deselecting all on selection of bussiness title
                // start's here
                $scope.selectEmploymentChangeOption = function (id) {

                    $scope.employmentChangeOptions.map(function(item){
                        if(id === 'chooseEmpChangeBTC' && item.id !== id && item.isSelected){
                            item.isSelected = false;
                        }else if(id !== 'chooseEmpChangeBTC' && item.id === 'chooseEmpChangeBTC'){
                            item.isSelected = false;
                        }
                    });

                    $scope.employmentChangeOptions.filter(function(item){
                        return specialEmploymentChangeOptions.indexOf(item.id) >= 0;
                    }).map(function(item){
                        if(specialEmploymentChangeOptions.indexOf(id) >= 0 && item.id !== id ){
                             item.isSelected = false;
                        }

                        return item;
                    });

                    $scope.employeeGenerateFormbutton = $scope.employmentChangeOptions.filter(function(item){
                        return item.isSelected === true;
                    }).length > 0 ? false : true;


                };
                // code for effective date selection alert start's here
                $scope.effectiveDateselectAlert = function (effectiveDate,val) {
                     //val==="N"?$scope.employmentChangeWorkerComp='N':angular.noop();
                    $scope.employmentChangeData.jobReclassification.temporaryInd===true?$scope.tempDisable=true:$scope.tempDisable=false;
                    if(val){
                        empChangeWorkerComp = val;
                    }
                    if (effectiveDate === "" || effectiveDate === undefined) {
                        var effectiveDateselectAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: profile.workInfo.effectiveDateselectAlert
                        };
                        $scope.childParentAlertMsg(effectiveDateselectAlert);
                    }

                };
                // code for effective date selection alert start's here

                // code for adding department start's here


                $scope.addRow = function () {
                    if ($scope.counter < 12) {
                        $scope.employmentChangeData.departments.push({
                            deptId: '',
                            percentage: 0
                        });
                        $scope.counter++;
                    }
                };

                $scope.checkFinancialSplit = function (indication) {
                    if(indication==="Yes"){
                        $scope.financialSplit='Yes';
                        $scope.conditionCheck=false;
                        $scope.employmentChangeData.departments.push({
                            deptId: $scope.employmentChangeData.deptId,
                            percentage: 0
                        },{
                            deptId: '',
                            percentage: 0
                        });
                    }else{
                        $scope.confirmMessage = "The financial split that was added will be deleted. Do you want to continue";
                        $scope.yes_btn = "Yes";
                        $scope.no_btn = "No";
                        gso.getNGDialog().openConfirm({
                            template: 'app/shared/views/confirmAlert.html',
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false
                        }).then(function () {
                            $scope.financialSplit='No';
                            $scope.conditionCheck=true;
                            $scope.employmentChangeData.departments=[];
                            gso.getNGDialog().close();
                        },function () {
                            $scope.financialSplit='Yes';
                            document.getElementById('DefineFinancialSplit').checked='Yes';
                        });
                    }
               };

                // code for removing department start's here
                $scope.removeRow = function ($index, totalpercentage) {
                    $scope.index = $index;
                    var data = $scope.employmentChangeData.departments;
                    if ($scope.employmentChangeData.departments) {
                        data.splice($scope.index, 1);
                        if(data.length==0){ $scope.financialSplit='No';$scope.conditionCheck=true;};
                        $scope.empTransferTotalpercent -= parseFloat(totalpercentage, 10);
                        $scope.jobReclassificationTotalpercent -= parseFloat(totalpercentage, 10);
                    }
                    //$scope.warningCodeBool = true;
                    $scope.departmentTotal();
                };
                // code for removing department end's here



                $scope.departmentTotal = function () {
                    $scope.updateSingleDepartmentPercentage();
                    var total = 0;
                    angular.forEach($scope.employmentChangeData.departments, function (value) {
                        if (value.percentage !== undefined && value.percentage !== "") {
                            var temp = parseFloat(value.percentage, 10);
                            total += temp;
                        }
                    });
                    if ( total!= 100) {
                        var jobReclassificationTotalpercentAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: "Total Department Allocation should be 100%"
                        };
                       // $scope.warningCodeBool = true;
                        $scope.errorRespForDept = jobReclassificationTotalpercentAlert._statusMessage;
                    }
                    $scope.empTransferTotalpercent = total;
                    $scope.jobReclassificationTotalpercent = total;
                };

                $scope.clearPercentValue = function (value) {
                    if (value.percentage === 0) {
                        value.percentage = '';
                    }
                };
                $scope.setCurrentDep = function(index) {
                    $scope.currentDep = index;
                }
                // code for checking num range in department start's here
                $scope.maximumRange = function (num, $index) {
                    $scope.num = num;
                    $scope.percentchangeindex = $index;
                    if ($scope.num === undefined) {
                        $scope.empChangeData.departments[$scope.percentchangeindex].percentage = 0;
                    }
                    if ($scope.num > 100) {
                        var maximumRangeAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: profile.workInfo.maximumRangeAlert
                        };
                        $scope.childParentAlertMsg(maximumRangeAlert);
                    }

                };
                // code for decreasing total start's here
                $scope.totalOfPercentageEmpTransferBefore = function (totalpercentage) {
                    if (totalpercentage === undefined) {
                        totalpercentage = '0';
                    }
                    $scope.empTransferTotalpercent -= parseFloat(totalpercentage, 10);
                };


                $scope.onWorkLocationChange = function (locationId) {
                    // code for  opening worker's comp on change of location start's here
                    $scope.workerComp = true;
                    $scope.employmentChangeData.workComp.workCompCode=undefined;
                    $scope.worksCompService(locationId);

                };
                // validations
                $scope.changeLabel = function () {
                    var label = $scope.translation.work_info.change_details;
                    if ($scope.employeeChangeRequestPopUpButton) {
                        label = $scope.translation.edit;
                    }
                    return label;
                };

                $scope.closeAlert = function () {
                    $scope.errorCodeBool = false;
                    $scope.warningCodeBool=false;
                };
                $scope.validationPatterns = {
                    empChangeRequest: {
                        blur: {
                            bussinessTitlePositionRequired: null,
                            bussinessTitlePositionPattern: null,
                            bussinessTitleChngPhoneRequired: null,
                            bussinessTitleChngPhonePattern: null,
                            promotionWorkPhonePattern: null,
                            DemotionWorkPhonePattern: null,
                            effectiveDateRequired: null,
                            seniorityDateRequired: null,
                            empTransfBusinessTitleRequired: null,
                            empTransfBusinessTitlePattern: null,
                            empTransferReasonRequired: null,
                            empTransferDirectManagerRequired: null,
                            empTranserferWorkPhoneRequired: null,
                            empTranserferWorkPhonePattern: null,
                            jobReclassificationReasonRequired: null,
                            empTransferWorkPhoneExtRequired: null,
                            jobReclassificationDeptRequired: null,
                            jobReclassificationPertDynRequired: null,
                            jobReclassifBusinessTitleRequired: null,
                            jobReclassifBusinessTitlePattern: null,
                            jobReclassifWorkPhoneExtRequired: null,
                            earnTypeRequired: null,
                            earnTypeStatusRequired: null,
                            jobReclassifStnddHoursRequired: null,
                            earnTypeVacationRequired: null,
                            earnTypeSickRequired: null,
                            earnTypePerfJobCodeRequired: null,
                            promotionReasonRequired: null,
                            earnTypecompBasisRequired: null,
                            promotionPeriodicRateRequired: null,
                            promotionPeriodicRatePattern: null,
                            employeePayChangeReasonRequired: null,
                            earnTypePayCompBasisRequired: null,
                            empPayChangePeriodicRateRequired: null,
                            demotionReasonRequired: null,
                            earnTypeDemotionCompBasisRequired: null,
                            demotionPeriodicRateRequired: null,
                            DemotionPeriodicRatePattern: null,
                            demotionBusinessTitleRequired: null,
                            demotionBusinessTitlePattern: null,
                            promotionBusinessTitleRequired: null,
                            promotionBusinessTitlePattern: null,
                            jobReclassificationDMRequired: null,
                            optionalGroupingALevelRequired: null,
                            optionalGroupingsBSponsorRequired: null,
                            employeeTransferWorkLocationRequired: null,
                            employeeTransferWorkLocation:null,
                            effectiveFormpastdate: null,
                            effectiveFormFuturedate: null,
                            empMinWageValidationRequired : null
                        },
                        focus: {
                            bussinessTitlePositionRequired: null,
                            bussinessTitlePositionPattern: null,
                            bussinessTitleChngPhoneRequired: null,
                            bussinessTitleChngPhonePattern: null,
                            promotionWorkPhonePattern: null,
                            DemotionWorkPhonePattern: null,
                            effectiveDateRequired: null,
                            seniorityDateRequired: null,
                            empTransfBusinessTitleRequired: null,
                            empTransfBusinessTitlePattern: null,
                            empTransferReasonRequired: null,
                            empTransferDirectManagerRequired: null,
                            empTranserferWorkPhoneRequired: null,
                            empTranserferWorkPhonePattern: null,
                            jobReclassificationReasonRequired: null,
                            empTransferWorkPhoneExtRequired: null,
                            jobReclassificationDeptRequired: null,
                            jobReclassificationPertDynRequired: null,
                            jobReclassifBusinessTitleRequired: null,
                            jobReclassifBusinessTitlePattern: null,
                            jobReclassifWorkPhoneExtRequired: null,
                            earnTypeRequired: null,
                            earnTypeStatusRequired: null,
                            jobReclassifStnddHoursRequired: null,
                            earnTypeVacationRequired: null,
                            earnTypeSickRequired: null,
                            earnTypePerfJobCodeRequired: null,
                            promotionReasonRequired: null,
                            earnTypecompBasisRequired: null,
                            promotionPeriodicRateRequired: null,
                            promotionPeriodicRatePattern: null,
                            employeePayChangeReasonRequired: null,
                            earnTypePayCompBasisRequired: null,
                            empPayChangePeriodicRateRequired: null,
                            demotionReasonRequired: null,
                            earnTypeDemotionCompBasisRequired: null,
                            demotionPeriodicRateRequired: null,
                            DemotionPeriodicRatePattern: null,
                            demotionBusinessTitleRequired: null,
                            demotionBusinessTitlePattern: null,
                            promotionBusinessTitleRequired: null,
                            promotionBusinessTitlePattern: null,
                            jobReclassificationDMRequired: null,
                            optionalGroupingALevelRequired: null,
                            optionalGroupingsBSponsorRequired: null,
                            employeeTransferWorkLocation:null,
                            employeeTransferWorkLocationRequired: null,
                            effectiveFormpastdate: null,
                            effectiveFormFuturedate: null,
                            empMinWageValidationRequired : null
                        }
                    }
                };
                $scope.onFocus = function (name, object) {
                    var temp = {};
                    angular.forEach(object, function (value, key) {
                        temp[key] = false;
                    });

                    if (name === 'empChangeRequest') {
                        $scope.validationPatterns.empChangeRequest.focus = temp;
                    }
                };

                $scope.validateDepartmentsPercent=function()
                {
                    var total = 0;
                    angular.forEach($scope.employmentChangeData.departments, function (value) {
                        if (value.percentage !== undefined && value.percentage !== "") {
                            var temp = parseFloat(value.percentage, 10);
                            total += temp;
                        }
                    });
                    if ( total!= 100) {
                        return true;
                    }
                    else{
                        return false;
                    }
                };

                $scope.updateSingleDepartmentPercentage=function()
                {
                    if($scope.employmentChangeData)
                    {
                        if($scope.employmentChangeData.departments && $scope.employmentChangeData.departments.length==1)
                        {
                            $scope.employmentChangeData.departments[0].percentage=100;
                        }
                    }
                };
                $scope.validateDuplicateDepartments=function()
                {
                    if($scope.employmentChangeData)
                    {
                        if($scope.employmentChangeData.departments)
                        {
                            var valueArr = $scope.employmentChangeData.departments.map(function(item){ return item.deptId });
                            var isDuplicate = valueArr.some(function(item, idx){
                                return valueArr.indexOf(item) != idx
                            });
                        }
                        return isDuplicate;
                    }

                };
                $scope.changeEmployeeDetails = function (formName) {

                    var customIdAlert = null,companyLeavePlanList;
                    if (!formName.$valid) {
                        gso.getUtilService().focusInvalidElement('form#empChangeRequestForm');
                        $scope.onFocus('empChangeRequest', $scope.validationPatterns.empChangeRequest.focus);
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'This page contains errors. Please correct the errors below.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;
                        $scope.isEmpGenerateFormSubmitted = true;
                        return;
                    }

                    if($scope.employeeClass === "K1E" && $scope.employmentChangeData.jobReclassification.standardHours <= 30){
                        gso.getUtilService().focusInvalidElement('form#empChangeRequestForm');
                        $scope.onFocus('empChangeRequest', $scope.validationPatterns.empChangeRequest.focus);
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Hours must be ≥ 30.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;
                        return;
                    }

                    if($scope.employeeClass === "K1D" && $scope.employmentChangeData.jobReclassification.standardHours > 29){
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Hours must be ≤ 29.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;
                        return;
                    }


                    if($scope.oHWorkerComp){
                        sendOhioNotification();
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Please select valid work location.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;

                        return;
                    }

                    if(!empChangeWorkerComp && !$scope.isCanadianWSE){
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Please indicate whether or not the employees job duties have changed.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;

                        return;
                    }

                    if($scope.employmentChangeData.workComp.workCompCode ===undefined && empChangeWorkerComp==='Y') {

                        if($scope.workState != $scope.orginalWorkstate) {
                            customIdAlert = {
                                _statusCode: '400',
                                _statusMessage: 'This update includes a location change. Please select the appropriate Workers\' Compensation code for the employee\'s new location, then click Update.'
                            };
                            $scope.errorCodeBool = true;
                            $scope.errorResp = customIdAlert._statusMessage;
                        }
                        else {
                            customIdAlert = {
                                _statusCode: '400',
                                _statusMessage: 'Please select a Workers\' Compensation code'
                            };
                            $scope.errorCodeBool = true;
                            $scope.errorResp = customIdAlert._statusMessage;
                        }
                        return;
                    }

                    if(!$scope.WorkersComp) {
                        if (($scope.employmentChangeData.workComp.jobDuties === undefined || $scope.employmentChangeData.workComp.jobDuties === '') && empChangeWorkerComp === "Y") {
                            customIdAlert = {
                                _statusCode: '400',
                                _statusMessage: 'Please enter a description of the employee\'s job duties.'
                            };
                            $scope.errorCodeBool = true;
                            $scope.errorResp = customIdAlert._statusMessage;

                            return;
                        }
                    }
                    if(!$scope.WorkersComp) {
                        if($scope.employmentChangeData.workComp.jobDuties) {
                            if ($scope.employmentChangeData.workComp.jobDuties.length > 0 && !($scope.employmentChangeData.workComp.jobDuties.length < 2000)) {
                                customIdAlert = {
                                    _statusCode: '400',
                                    _statusMessage: 'You have exceeded this text box\'s limit of 2000 characters, please reduce the length of your notes.'
                                };
                                $scope.errorCodeBool = true;
                                $scope.errorResp = customIdAlert._statusMessage;

                                return;
                            }
                        }
                    }



                    if(($scope.employmentChangeData.minWageRate >$scope.employmentChangeData.payChange.compRate) && $scope.employmentChangeData.payChange.compBasis === 'H'){
                        $scope.minWageFlag = true;
                        gso.getUtilService().focusInvalidElement('form#empChangeRequestForm');
                        $scope.onFocus('empChangeRequest', $scope.validationPatterns.empChangeRequest.focus);
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Amount must meet the minimum wage.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;
                        return;
                    }

                    if(($scope.employmentChangeData.minWageRateAnl >$scope.employmentChangeData.payChange.compRate)  && $scope.employmentChangeData.payChange.compBasis === 'A'){
                        $scope.minWageFlag = true;
                        gso.getUtilService().focusInvalidElement('form#empChangeRequestForm');
                        $scope.onFocus('empChangeRequest', $scope.validationPatterns.empChangeRequest.focus);
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Amount must meet the minimum wage.'
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = customIdAlert._statusMessage;
                        return;
                    }

                    if($scope.validateDepartmentsPercent() && $scope.financialSplit==="Yes")
                    {
                        var jobReclassificationTotalpercentAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: "Total Department Allocation should be 100%"
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = jobReclassificationTotalpercentAlert._statusMessage;
                        return;
                    }
                    if($scope.validateDuplicateDepartments())
                    {
                        var jobReclassificationTotalpercentAlert = {
                            _statusCode: constants.warning,
                            _statusMessage:  "Duplicate department selections. Please review."
                        };
                        $scope.errorCodeBool = true;
                        $scope.errorResp = jobReclassificationTotalpercentAlert._statusMessage;
                        return;
                    }

                   if ($scope.JobReclassification === true && $scope.acaStatus)
                   {
                      var emplType=$scope.employmentChangeData.jobReclassification.employeeType;
                      var varHour=$scope.employmentChangeData.jobReclassification.variableHour;

                      if(emplType!==null && varHour === undefined)
                      {
                        if(emplType==="P")
                        {
                         if(!varHour)
                         {
                          $scope.warningCodeBool=true;
                          var Alert =
                          {
                           _statusCode: constants.warning,
                           _statusMessage:"In order to properly track hours worked during your company's measurement period, TriNet strongly recommends that you designate all part-time and temporary employees who are currently not eligible for benefits as \"variable hour\" employees. As for variable hour employees who are currently in a stability period and are eligible for benefits, they should be entered as Employment Type full-time as well as \"variable hour\" (for the remainder of the stability period"
                          };
                           $scope.statusMessage=Alert._statusMessage;
                           return;
                         }
                        }
                      }
                    }
                    var comp = {};
                    if (angular.isDate($scope.employmentChangeData.seniorityDate)) {
                        $scope.employmentChangeData.seniorityDate = gso.getUtilService().filterDate($scope.employmentChangeData.seniorityDate, constants.dateFormat);
                    }
                    var data = angular.copy($scope.employmentChangeData);
                        companyLeavePlanList = [];
                        if(angular.isObject($scope.employmentChangeData.jobReclassification.vacationPto)){
                            companyLeavePlanList.push($scope.employmentChangeData.jobReclassification.vacationPto);
                            delete data.jobReclassification.vacationPto;
                        }
                        if(angular.isObject($scope.employmentChangeData.jobReclassification.sick)){
                            companyLeavePlanList.push($scope.employmentChangeData.jobReclassification.sick);
                            delete data.jobReclassification.sick;
                        }
                        if(angular.isObject($scope.employmentChangeData.jobReclassification.eib)){
                            companyLeavePlanList.push($scope.employmentChangeData.jobReclassification.eib);
                            delete data.jobReclassification.eib;
                        }
                        if(angular.isObject($scope.employmentChangeData.jobReclassification.personal)){
                        companyLeavePlanList.push($scope.employmentChangeData.jobReclassification.personal);
                        delete data.jobReclassification.personal;
                        }
                        if(angular.isObject($scope.employmentChangeData.jobReclassification.floatingHoliday)){
                            companyLeavePlanList.push($scope.employmentChangeData.jobReclassification.floatingHoliday);
                            delete data.jobReclassification.floatingHoliday;
                        }


                    if($scope.hidePerformance === false){
                        delete data.jobReclassification.performanceMgmtJobCode;
                    }


                    if (data.workComp.workCompState === undefined || data.workComp.workCompState === "") {
                        data.workComp.workCompState = gso.getAppConfig().stateCode;
                    }else{
                        data.workComp.workCompState=$scope.workState;
                    }
                    if (data.workComp.workCompCode === "Unknown") {
                        comp.jobDuties = data.workComp.jobDuties;
                        comp.workCompCode = null;
                        comp.workCompState = data.workComp.workCompState;
                    }
                    // Condition to set null value to backend instead of ""
                    data.workPhone=data.workPhone===""?null:data.workPhone;
                    if ($scope.businessTitleChange === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'businessTitle': data.businessTitle,
                                    'workPhone': data.workPhone,
                                    'workComp': comp,
                                    'seniorityDate': $scope.employmentChangeData.seniorityDate,
                                    'effectiveDate': $scope.effdate
                                });
                            } else {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'businessTitle': data.businessTitle,
                                    'workPhone': data.workPhone,
                                    'workComp': data.workComp,
                                    'seniorityDate': $scope.employmentChangeData.seniorityDate,
                                    'effectiveDate': $scope.effdate
                                });
                            }
                        }else{
                            angular.extend($scope.fetchEmpChangeData, {
                                'businessTitle': data.businessTitle,
                                'workPhone': data.workPhone,
                                'workComp': null,
                                'seniorityDate': $scope.employmentChangeData.seniorityDate,
                                'effectiveDate': $scope.effdate
                            });
                        }
                    }
                    if ($scope.EmployeeTransfer === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'employeeTransfer': data.employeeTransfer,
                                    'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'workComp': comp,
                                    'effectiveDate': $scope.effdate,
                                    "deptId" : data.deptId,
                                });
                            } else {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'employeeTransfer': data.employeeTransfer,
                                    'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'workComp': data.workComp,
                                    'effectiveDate': $scope.effdate,
                                    "deptId" : data.deptId,
                                });
                            }
                        }else{
                            angular.extend($scope.fetchEmpChangeData, {
                                'employeeTransfer': data.employeeTransfer,
                                'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                'businessTitle': data.businessTitle,
                                'managerId': data.managerId,
                                'workPhone': data.workPhone,
                                'workComp':  null,
                                'effectiveDate': $scope.effdate,
                                "deptId" : data.deptId,
                            });
                        }
                    }
                    if ($scope.JobReclassification === true) {
                        var jobEffectiveResult=gso.getUtilService().GroupByItem($scope.displayChangehistorydataBackup,'action');
                        if(jobEffectiveResult.JobReclassification) {
                            var jobEffectiveResultSortedArray = $filter('orderBy')(jobEffectiveResult.JobReclassification, 'effectiveDate');
                            var FutureEffectiveJobResultData = jobEffectiveResultSortedArray.filter(function (obj) {
                                return obj.effectiveDate > $scope.currDate;
                            });
                            if (FutureEffectiveJobResultData) {
                                angular.forEach(FutureEffectiveJobResultData, function (value, key) {
                                    $scope.hasFutureDate = gso.getUtilService().checkTwoDates(value.effectiveDate, $scope.effdate);
                                });
                            }
                        }
                        if($scope.hasFutureDate) {
                            $scope.keepGoing=false;
                            $scope.confirmMessage = "There was a future plan record already exists with effective date, do you want to continue ?";
                            $scope.yes_btn = 'OK';
                            $scope.no_btn = 'Cancel';
                            gso.getNGDialog().openConfirm({
                                template: 'app/shared/views/confirmAlert.html',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            }).then(function () {
                                $scope.keepGoing=true;
                                $scope.addFutureRecord();

                            }, function () {
                                $scope.keepGoing=true;

                            });
                        }
                        $scope.addFutureRecord=function () {
                                $scope.fetchEmpChangeData.employeeId = $scope.appUserId;
                                $scope.fetchEmpChangeData.seniorityDate = $scope.employmentChangeData.seniorityDate;
                                if ($scope.workinfo && Array.isArray($scope.workinfo) && $scope.workinfo[0].serviceDate) {
                                    $scope.fetchEmpChangeData.serviceDate = gso.getUtilService().filterDate(new Date($scope.workinfo[0].serviceDate), constants.dateFormat);
                                }
                                gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                    manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.jobs, $scope.fetchEmpChangeData, function (response) {
                                    $scope.employeeChangeRequestPopUpButton = true;
                                    gso.getNGDialog().closeAll();
                                    $scope.init();
                                    $scope.childParentAlertMsg(response);
                                    gso.getRoute().reload();
                                }, function (data) {
                                    $scope.errorResp = data._statusMessage;
                                    $scope.errorCodeBool = true;
                                });
                        };
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                data.jobReclassification.temporaryInd = data.jobReclassification.temporaryInd;
                                data.jobReclassification.directlyTipped = data.jobReclassification.directlyTipped === undefined ? "N" : data.jobReclassification.directlyTipped.key;
                                if($scope.hideVariableHour === true){
                                    data.jobReclassification.variableHour = data.jobReclassification.variableHour;
                                }
                                data.jobReclassification.companyLeavePlanList = companyLeavePlanList;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'jobReclassification': data.jobReclassification,
                                    'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'workComp': comp,
                                    'effectiveDate': $scope.effdate,
                                    "deptId" : data.deptId,
                                });
                            } else {
                                data.jobReclassification.temporaryInd = data.jobReclassification.temporaryInd;
                                data.jobReclassification.directlyTipped = data.jobReclassification.directlyTipped == undefined ? "N" : data.jobReclassification.directlyTipped.key;
                                if($scope.hideVariableHour === true){
                                    data.jobReclassification.variableHour = data.jobReclassification.variableHour;
                                }
                                data.jobReclassification.companyLeavePlanList = companyLeavePlanList;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'jobReclassification': data.jobReclassification,
                                    'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'workComp': data.workComp,
                                    'effectiveDate': $scope.effdate,
                                    "deptId" : data.deptId,
                                });
                            }
                        }else{
                            data.jobReclassification.temporaryInd = data.jobReclassification.temporaryInd;
                            data.jobReclassification.directlyTipped = data.jobReclassification.directlyTipped == undefined ? "N" : data.jobReclassification.directlyTipped;
                            if($scope.hideVariableHour === true){
                                data.jobReclassification.variableHour = data.jobReclassification.variableHour;
                            }
                            data.jobReclassification.companyLeavePlanList = companyLeavePlanList;
                            angular.extend($scope.fetchEmpChangeData, {
                                'jobReclassification': data.jobReclassification,
                                'departments': $scope.financialSplit==='Yes'?data.departments:$scope.conditionCheck?[]:null,
                                'businessTitle': data.businessTitle,
                                'managerId': data.managerId,
                                'workPhone': data.workPhone,
                                'workComp': null,
                                'effectiveDate': $scope.effdate,
                                "deptId" : data.deptId,
                            });

                        }


                    }

                    if ($scope.Promotion === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                data.promotion.compBasis = data.payChange.compBasis;
                                data.promotion.compRate = data.payChange.compRate;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'promotion': data.promotion,
                                    'workComp': comp,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'effectiveDate': $scope.effdate
                                });
                            } else {
                                data.promotion.compBasis = data.payChange.compBasis;
                                data.promotion.compRate = data.payChange.compRate;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'promotion': data.promotion,
                                    'workComp': data.workComp,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'effectiveDate': $scope.effdate
                                });
                            }
                        }else{
                            data.promotion.compBasis = data.payChange.compBasis;
                            data.promotion.compRate = data.payChange.compRate;
                            angular.extend($scope.fetchEmpChangeData, {
                                'promotion': data.promotion,
                                'workComp': null,
                                'businessTitle': data.businessTitle,
                                'managerId': data.managerId,
                                'workPhone': data.workPhone,
                                'effectiveDate': $scope.effdate
                            });

                        }
                    }
                    if ($scope.EmployeePayChange === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'payChange': data.payChange,
                                    'workComp': comp,
                                    'effectiveDate': $scope.effdate
                                });
                            } else {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'payChange': data.payChange,
                                    'workComp': data.workComp,
                                    'effectiveDate': $scope.effdate
                                });
                            }
                        }else{
                            angular.extend($scope.fetchEmpChangeData, {
                                'payChange': data.payChange,
                                'workComp': null,
                                'effectiveDate': $scope.effdate
                            });
                        }
                    }
                    if ($scope.Demotion === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                data.demotion.compBasis = data.payChange.compBasis;
                                data.demotion.compRate = data.payChange.compRate;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'demotion': data.demotion,
                                    'workComp': comp,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'effectiveDate': $scope.effdate
                                });
                            } else {
                                data.demotion.compBasis = data.payChange.compBasis;
                                data.demotion.compRate = data.payChange.compRate;
                                angular.extend($scope.fetchEmpChangeData, {
                                    'demotion': data.demotion,
                                    'workComp': data.workComp,
                                    'businessTitle': data.businessTitle,
                                    'managerId': data.managerId,
                                    'workPhone': data.workPhone,
                                    'effectiveDate': $scope.effdate
                                });
                            }
                        }else{
                            data.demotion.compBasis = data.payChange.compBasis;
                            data.demotion.compRate = data.payChange.compRate;
                            angular.extend($scope.fetchEmpChangeData, {
                                'demotion': data.demotion,
                                'workComp': null,
                                'businessTitle': data.businessTitle,
                                'managerId': data.managerId,
                                'workPhone': data.workPhone,
                                'effectiveDate': $scope.effdate
                            });
                        }
                    }
                    if ($scope.OptionalGroupings === true) {
                        if(empChangeWorkerComp === 'Y'){
                            if (data.workComp.workCompCode === "Unknown") {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'optionalGrouping': data.optionalGrouping,
                                    'workComp': comp,
                                    'effectiveDate': $scope.effdate
                                });
                            } else {
                                angular.extend($scope.fetchEmpChangeData, {
                                    'optionalGrouping': data.optionalGrouping,
                                    'workComp': data.workComp,
                                    'effectiveDate': $scope.effdate
                                });
                            }
                        }else{
                            angular.extend($scope.fetchEmpChangeData, {
                                'optionalGrouping': data.optionalGrouping,
                                'workComp': null,
                                'effectiveDate': $scope.effdate
                            });
                        }
                    }

                    $scope.fetchEmpChangeData.employeeId = $scope.appUserId;
                    $scope.fetchEmpChangeData.seniorityDate = $scope.employmentChangeData.seniorityDate;
                    if ($scope.workinfo && Array.isArray($scope.workinfo) && $scope.workinfo[0].serviceDate) {
                        $scope.fetchEmpChangeData.serviceDate = gso.getUtilService().filterDate(new Date($scope.workinfo[0].serviceDate), constants.dateFormat);
                    }
                    if($scope.keepGoing) {
                        gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                            manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.jobs, $scope.fetchEmpChangeData, function (response) {
                            $scope.employeeChangeRequestPopUpButton = true;
                            gso.getNGDialog().closeAll();
                            $scope.init();
                            $scope.childParentAlertMsg(response);
                            gso.getRoute().reload();
                        }, function (data) {
                            $scope.errorResp = data._statusMessage;
                            $scope.errorCodeBool = true;
                        });
                    }



                };

                function getLocations(date) {
					gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
						gso.getAppConfig().companyId + globalUrlConfig.resources.locations+'?include=address&effectiveDate='+date, null, function (locations) {
						if (locations.length === 0) {
							locations = {
								_statusCode: constants.warning,
								_statusMessage: profile.workInfo.locations
							};
							$scope.childParentAlertMsg(locations);
						} else {
							$scope.locationsData = locations;
						}
					}, function (data) {
						$scope.childParentAlertMsg(data);
					});
				}

			function getDirectManagers(date) {
				gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
					gso.getAppConfig().companyId + "/" + globalUrlConfig.resources.directManager + '?effectiveDate='+date, null, function (directManager) {
					if (directManager.length === 0) {
						directManager = {
							_statusCode: constants.warning,
							_statusMessage: profile.workInfo.directManager
						};
						$scope.childParentAlertMsg(directManager);
					} else {
						$scope.directManagerData = directManager;
					}
				}, function (data) {
					$scope.childParentAlertMsg(data);
				});
			}

			function getDepartments(date) {
				gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
					gso.getAppConfig().companyId + "/" + profileUrlConfig.resources.departments + '?effectiveDate=' + date, null, function (departments) {
					if (departments.length === 0) {
						var departmentsAlert = {
							_statusCode: constants.warning,
							_statusMessage: profile.workInfo.departmentsAlert
						};
						$scope.childParentAlertMsg(departmentsAlert);
					} else {
						$scope.departmentsData = departments;
					}
				}, function (data) {
					$scope.childParentAlertMsg(data);
				});
			}

                $scope.initAPICalls = function(){

                    // vacation service call
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/leave-plans?leave=vacation&employeeId="+ $scope.appUserId, null, function (result) {
                        if(result.length === 0){
                            $scope.hideVacation=false;
                        }else{
                            $scope.vacationsData=result;
                        }

                    }, function (data) {
                        $scope.hideVacation=false;
                    });

                    // EIB service call
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/leave-plans?leave=EIB&employeeId="+ $scope.appUserId, null, function (result) {
                        if(result.length === 0){
                            $scope.hideEibRepsonse=false;
                        }else{
                            $scope.hideEibRepsonse=true;
                            $scope.eibRepsonse=result;
                        }

                    }, function (data) {
                        $scope.hideEibRepsonse=false;
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/leave-plans?leave=floatingHoliday&employeeId="+ $scope.appUserId, null, function (result) {
                        if(result.length === 0){
                            $scope.hideFloatingHoliday=false;
                        }else{
                            $scope.hideFloatingHoliday=true;
                            $scope.floatingHoliday= result
                        }

                    }, function (data) {
                        $scope.hideFloatingHoliday=false;
                    });

                    // service call fill the Sick dropdown
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/leave-plans?leave=sick&employeeId="+ $scope.appUserId, null, function (result) {
                        if(result.length === 0){
                            $scope.hideSick=false;
                        }else{
                            $scope.sickData=result;
                        }
                    }, function (data) {
                        $scope.hideSick=false;
                    });

                    // service call fill the personal dropdown
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/leave-plans?leave=Personal&employeeId="+ $scope.appUserId, null, function (result) {
                        if(result.length === 0){
                            $scope.hidePersonal=false;
                        }else{
                            $scope.hidePersonal=true;
                            $scope.personalData=result;
                        }
                    }, function (data) {
                        $scope.hidePersonal=false;
                    });
                    // service call fill the performance mgmt job code dropdown
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + "/performance-mgmt-job-codes", null, function (result) {
                        if(result.length === 0){
                            $scope.hidePerformance=false;
                        }else{
                            $scope.performanceMgmtData=result;
                        }
                    }, function (data) {
                        $scope.hidePerformance=false;
                    });

                    gso.getAPIConfigDataService().getChooseOption().then(function(response) {
                        $scope.avaliableOptions = response.chooseOptions;
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.promotionReasons, null, function (promotionReasons) {
                        if (promotionReasons.length === 0) {
                            promotionReasons = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.promotionReasons
                            };
                            $scope.childParentAlertMsg(promotionReasons);
                        } else {
                            $scope.promotionReasonsData = promotionReasons;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.demotionReasons, null, function (demotionReasons) {
                        if (demotionReasons.length === 0) {
                            demotionReasons = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.demotionReasons
                            };
                            $scope.childParentAlertMsg(demotionReasons);
                        } else {
                            $scope.demotionReasonsData = demotionReasons;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global + globalUrlConfig.resources.compensationTypes, null, function (compensationtypes) {
                        if (compensationtypes.length === 0) {
                            compensationtypes = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.compensationtypes
                            };
                            $scope.childParentAlertMsg(compensationtypes);
                        } else {
                            $scope.compensationtypesData = compensationtypes;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });


                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.payChangeReasons, null, function (payChangeReasons) {
                        if (payChangeReasons.length === 0) {
                            payChangeReasons = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.payChangeReasons
                            };
                            $scope.childParentAlertMsg(payChangeReasons);
                        } else {
                            $scope.payChangeReasonsData = payChangeReasons;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.jobRecReasons, null, function (jobRecReasons) {
                        if (jobRecReasons.length === 0) {
                            jobRecReasons = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.jobRecReasons
                            };
                            $scope.childParentAlertMsg(jobRecReasons);
                        } else {
                            $scope.jobRecReasonsData = jobRecReasons;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global +
                        globalUrlConfig.resources.flsa, null, function (flsa) {
                        if (flsa.length === 0) {
                            flsa = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.flsa
                            };
                            $scope.childParentAlertMsg(flsa);
                        } else {
                            $scope.flsaData = flsa;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global +
                        globalUrlConfig.resources.countries + "/" + gso.getAppConfig().countryCode + globalUrlConfig.resources.states + "/" + gso.getAppConfig().stateCode, null, function (stateName) {
                        if (stateName.length === 0) {
                            stateName = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.stateName
                            };
                            $scope.childParentAlertMsg(stateName);
                        } else {
                            $scope.stateNameData = stateName.data;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });


					getLocations(gso.getUtilService().filterDate(gso.getUtilService().filterToServerDateTimeStamp(new Date()), constants.dateFormat));
					getDepartments(gso.getUtilService().filterDate(gso.getUtilService().filterToServerDateTimeStamp(new Date()), constants.dateFormat));
					getDirectManagers(gso.getUtilService().filterDate(gso.getUtilService().filterToServerDateTimeStamp(new Date()), constants.dateFormat));

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.transferReasons, null, function (transferReasons) {
                        if (transferReasons.length === 0) {
                            transferReasons = {
                                _statusCode: constants.warning,
                                _statusMessage: profile.workInfo.transferReasons
                            };
                            $scope.childParentAlertMsg(transferReasons);
                        } else {
                            $scope.transferReasonsData = transferReasons;
                        }
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });

                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                        gso.getAppConfig().companyId + globalUrlConfig.resources.tippedCodes, null, function (tippedCodes) {
                        $scope.showTipped = true;
                        $scope.tippedCodesData = tippedCodes;

                    }, function (data) {
                        if (data._statusCode === "404") {
                            $scope.showTipped = false;
                        }
                    });
                };


                $scope.initWorkInfo = function(){
                    setEmploymentChangeOptions();
                    $scope.init();
                    $scope.displayChangeHistory();
                    $scope.initAPICalls();
                };


              $scope.initWorkInfo();
        }]);
