/**
 Description: This is controller used to do EEO Audit operations
 Author:Michael Liang
 **/
'use strict';
trinetApp.controller('eeoAuditCtrl', ['$scope', 'gso', 'ngDialog','$filter','$location', '$timeout',
    function ($scope, gso, ngDialog, $filter,$location,$timeout) {
        $scope.offset = 0;
        $scope.activeLimit = 20;
        $scope.callback = false;
        $scope.allData = [];
        $scope.assignEEOData = [];
        $scope.globalCount = 1;
        $scope.currentDate = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
        $scope.effectiveDate = new Date();
        $scope.effdt = $filter('date')($scope.effectiveDate, "yyyy-MM-dd");
        $scope.sortType = 'name';
        $scope.sortReverse = $scope.showchangeReq = $scope.searchbox = false;
        $scope.sortTypeEmp = 'lastName';
        $scope.emplist = [];
        $scope.selectedEthnicities = [];
        $scope.selectedJobs = [];
        $scope.selectedPositions = [];
        $scope.origEEOList = [];

        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };
        $scope.textboxhide = function () {
            $scope.searchbox = false;
        };

        gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
            globalUrlConfig.resources.global + globalUrlConfig.resources.usCountryCode + globalUrlConfig.resources.ethnicity, null,
            function(response) {
                $scope.ethnicityList = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase +
            globalUrlConfig.resources.company + "/" + gso.getAppConfig().companyId + globalUrlConfig.resources.jobs+"?getJobCosting=false", null,
            function(response) {
                $scope.jobClassList = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.preliminaryAuditReport + "?limit=" + $scope.activeLimit + "&offset=" + $scope.offset, null,
            function (response) {
                $scope.origEEOList = response;
            }
        );

        $scope.assignEEOGet = function () {
            if ($scope.busy) {
                return;
            }
            $scope.busy = true;
            if (($scope.allData.length < parseInt($scope.globalCount, 10))) {
                $scope.spinner = true;
                gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                    manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.preliminaryAuditReport + "?limit=" + $scope.activeLimit + "&offset=" + $scope.offset, null,
                    function (response) {
                        $scope.allData = $scope.allData.concat(response);
                        $scope.assignEEOData = $scope.allData;
                        $scope.filterByData = $scope.assignEEOData;
                        $scope.globalActiveEmp = response;
                        $scope.emplist =  $scope.globalActiveEmp;
                        $scope.count = response.length;
                        $scope.globalCount = response.length;
                        $scope.busy = false;

                        if ($scope.offset + $scope.activeLimit > $scope.count) {
                            $scope.activeLimit = $scope.activeLimit - (($scope.offset + $scope.activeLimit) - $scope.count);
                        }
                        if ($scope.allData.length > $scope.count) {
                            $scope.offset = $scope.count;
                        }
                        else {
                            $scope.offset = $scope.allData.length;
                        }
                        $scope.offSet = $scope.offset;
                        $scope.spinner = false;
                    },

                    function (data) {
                        if ($scope.callback !== true) {
                            $scope.errorAlert = data;
                            $scope.spinner = false;
                        }
                        $scope.busy = false;
                    }
                );
            }
            
        };

        $scope.changeReq = function (val, obj, changeJob) {
            $scope.isJobIdChange = false;
            $scope.isEthnicityChange = false;
            $scope.effectiveDate = $scope.currentDate;
            $scope.errorAlertAssignManger = null;
            $scope.assignEEOChangeData = obj;
            $scope.indexvalue = val;
            $scope.submitted = false;
            $scope.jobEffectiveDate;
            var endDt = new Date();
                endDt.setDate(endDt.getDate() + 60);
            var endDate = $filter('date')(endDt, "yyyy-MM-dd");
            gso.getCrudService().execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId +
                    moneyUrlConfig.resources.payrollschedule + "?startDate=" + $scope.effdt + "&endDate=" + endDate, null,
                function (response) {
                    $scope.jobEffectiveDate = response.payCalItems[1].periodBeginDate;
                },
                function (data) {
                }
            );
            if (changeJob) {
                $scope.jobDataToSave = {};
                gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                    manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId + manageEmpUrlConfig.resources.empChange + $scope.effdt, null,
                    function (response) {
                        if(response.workPhone !== null){
                            var workNumber =response.workPhone.trim();
                            response.workPhone = workNumber;
                            if(workNumber.length >0){
                                var workPhone = gso.getUtilService().changeWorkPhoneNumberFormat(response.workPhone);
                                response.workPhone = workPhone;
                            }else if(workNumber.length === 0){
                                response.workPhone = null;
                            }
                        }
                        $scope.jobDataToSave = {
                            "jobReclassification":  {
                                "jobId":response.jobReclassification.jobId,
                                "flsaStatus":response.jobReclassification.flsaStatus,
                                "temporaryInd":false,
                                "employeeType":response.jobReclassification.employeeType,
                                "standardHours":response.jobReclassification.standardHours,
                                "reasonId":"RST"
                            },
                            "departments":[
                                {
                                    "deptId":response.departments[0].deptId,
                                    "percentage":response.departments[0].percentage
                                }
                            ],
                            "businessTitle":response.businessTitle,
                            "managerId":response.managerId,
                            "workPhone":response.workPhone,
                            "workComp":null,
                            "effectiveDate":$scope.jobEffectiveDate,
                            "employeeId":$scope.assignEEOChangeData.employeeId,
                            "seniorityDate":response.seniorityDate,
                            "serviceDate":response.seniorityDate
                        };
                        //api-profile/v1/identity/IGW/00001610286/employment-info
                        gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                                "/" + gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId +
                                profileUrlConfig.resources.employment, null,
                            function (response) {
                                $scope.jobDataToSave.serviceDate = response.activeWorkProfileList[0].serviceDate;
                            },
                            function (data) {
                            }
                        );
                    },
                    function (data) {
                    }
                );
                ngDialog.open({
                    template: 'app/components/employee/eeoAudit/eeoJobChange.html',
                    className: 'ngdialog-theme-default custom-width-height',
                    scope: $scope,
                    closeByDocument :false
                });
            }
            else {
                $scope.ethnicDataToSave = {};
                //api-profile/v1/identity/G2Y/00001529203/personals?effectivedate=2017-08-31
                gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                        "/" + gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId +
                        profileUrlConfig.resources.personalstatus + $scope.effdt, null,
                    function (response) {
                        $scope.ethnicDataToSave = {
                            "birthDate": response.activePersonalDataList[0].birthDate,
                            "country": response.activePersonalDataList[0].country,
                            "effectiveDate": $scope.effectiveDate,
                            "employeeId": response.activePersonalDataList[0].employeeId,
                            "ethnicity": response.activePersonalDataList[0].ethnicity,
                            "gender": response.activePersonalDataList[0].gender,
                            "militaryStatus": response.activePersonalDataList[0].militaryStatus,
                            "uniqueId": response.activePersonalDataList[0].uniqueId,
                            "maritalStatus": response.activePersonalDataList[0].maritalStatus
                        };
                    },
                    function (data) {
                    }
                );
                ngDialog.open({
                    template: 'app/components/employee/eeoAudit/eeoEthnicityChange.html',
                    className: 'ngdialog-theme-default custom-width-height',
                    scope: $scope,
                    closeByDocument :false
                });
            }
      };

        $scope.updateData = function (form) {
            $scope.spinner = true;
            if (!$scope.submitted) {
                $scope.submitted = true;
                $scope.assignEEOChangeData.editDisabled = true;
                if (form === "job") {
                //api-employee/v1/manage-employee/JD2/00001667430/jobs?enableValidation=true
                    gso.getCrudService().execute(constants.put, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee +
                            "/" + gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId + manageEmpUrlConfig.resources.jobs, $scope.jobDataToSave,
                        function (response, status) {
                            $scope.busy = false;
                            $scope.offset = 0;
                            $scope.activeLimit = 20;
                            $scope.allData = [];
                            $scope.filterByData = $scope.assignEEOData;
                            $scope.search = '';
                            $scope.jobDataToSave = {};
                            ngDialog.closeAll();
                            $scope.assignEEOGet();
                        },
                        function (data) {
                            ngDialog.closeAll();
                        }
                    );
                }
                else if (form === "ethnicity") {
                //api-profile/v1/identity/36T/00001043392/personals?effectivedate=yyyy-mm-dd&enableValidation=true
                    gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                            gso.getAppConfig().companyId + '/' + $scope.assignEEOChangeData.employeeId +
                            profileUrlConfig.resources.personalstatus + $scope.effdt, $scope.ethnicDataToSave,
                        function (response, status) {
                            $scope.busy = false;
                            $scope.offset = 0;
                            $scope.activeLimit = 20;
                            $scope.allData = [];
                            $scope.filterByData = $scope.assignEEOData;
                            $scope.search = '';
                            $scope.ethnicDataToSave = {};
                            ngDialog.closeAll();
                            $scope.assignEEOGet();
                        },
                        function (data) {
                            ngDialog.closeAll();
                        }
                    );
                }
            }
            $scope.spinner = false;
        };

        $scope.close = function () {
            ngDialog.closeAll();
        };

        $scope.compareDate = function(dt){
            var jobEffDt = gso.getUtilService().filterDate(new Date(dt.effectiveDate), constants.dateFormat);
            return jobEffDt >= $scope.currentDate;
        };

        $scope.ethnicityUpdated = function (obj) {
            $scope.emplObj = $scope.filterSearchEmployees($scope.origEEOList,obj.employeeId);
            return ($scope.emplObj[0].ethnicity !== undefined && obj.ethnicity !== $scope.emplObj[0].ethnicity);
        };

        $scope.searchFilter = function () {
            if ($scope.search !== undefined && $scope.search.length > 0) {
                $scope.checkForSearchItem();
            } else {
                $scope.filterByData = $scope.assignEEOData;
            }
        };

        //this is for the employee search function
        $scope.checkForSearchItem = function () {
            var searchItem = $scope.search.toLowerCase();
            $scope.filterByData = $scope.filterSearchEmployees($scope.globalActiveEmp, searchItem);
        };

        $scope.filterSearchEmployees = function (items, searchItem) {
            var stringMatch = new RegExp(searchItem, 'i');
            return items.filter(function(item){
                return stringMatch.test(item.lastName) || stringMatch.test(item.firstName) || stringMatch.test(item.employeeId);
            });
        };

        //ToDo: Function to load on page scroll:
        $scope.loadData = function () {
            if ($scope.globalCount !== $scope.assignEEOData.length) {
                $scope.assignEEOGet();
            }
        };

        function disableButton(form) {
            if (form==='job'){
                ($scope.assignEEOChangeData.jobId !== $scope.jobDataToSave.jobReclassification.jobId) ? $scope.isJobIdChange = true : $scope.isJobIdChange = false;
            }
            else if (form==='ethnicity') {
                ($scope.assignEEOChangeData.ethnicity !== $scope.ethnicDataToSave.ethnicity) ? $scope.isEthnicityChange = true : $scope.isEthnicityChange = false;
            }
        }
        $scope.changeValue = function (val, disp) {
            if (val !== null)
            {
                if(disp === 'job'){
                    $scope.jobDataToSave.jobReclassification.jobId = val.key;
                }
                else if(disp === 'ethnicity'){
                    $scope.ethnicDataToSave.ethnicity = val.key;
                }
            }
            else {
                if (disp === 'job'){
                    $scope.jobDataToSave.jobReclassification.jobId = $scope.assignEEOChangeData.jobId;
                }
                else if(disp === 'ethnicity'){
                    $scope.ethnicDataToSave.ethnicity = $scope.assignEEOChangeData.ethnicity;
                }
            }
            disableButton(disp);
        };

        $scope.assignEEOGet();

        function filterEmployees(arr) {
            $scope.dropDownList = arr.filter(function (obj) {
                if (obj.employeeId && obj.name) {
                    return obj;
                }
            });
        }

/*************Working empStatus/ethnicity/job filter functions**************/
        $scope.filteredEmpStatusData = function(eeoList,empStatusChecked){
            var arr = [];
            var arr2 = [];
            var arr3 = [];
            eeoList.employmentStatus = (eeoList.employmentStatus === null) ? null : eeoList.employmentStatus.trim();
            if(empStatusChecked){
                $scope.selectedPositions.push(eeoList.employmentStatus);
            }else{
                var index = $scope.selectedPositions.indexOf(eeoList.employmentStatus);
                if (index !== -1) {
                    $scope.selectedPositions.splice(index, 1);
                }
            }

                if($scope.selectedPositions.length === 0 && $scope.selectedEthnicities.length === 0 && $scope.selectedJobs.length === 0){
                    arr = $scope.assignEEOData;
                    $scope.filterByData = arr;
                }
                else {
                    if($scope.selectedEthnicities.length > 0){
                        $scope.filterEthnicity($scope.emplist, arr2);

                        if($scope.selectedJobs.length > 0){
                            $scope.filterJob(arr2, arr3);

                            if($scope.selectedPositions.length > 0){
                                $scope.filterEmpStatus(arr3, arr);
                                $scope.filterByData = arr;
                            }
                            else {
                                $scope.filterByData = arr3;
                            }
                        }
                        else if ($scope.selectedPositions.length > 0){
                                $scope.filterEmpStatus(arr2, arr);
                                $scope.filterByData = arr;
                        }
                        else {
                            $scope.filterByData = arr2;
                        }
                    }
                    else if ($scope.selectedJobs.length > 0) {
                        $scope.filterJob($scope.emplist, arr3);

                        if($scope.selectedPositions.length > 0){
                            $scope.filterEmpStatus(arr3, arr);
                            $scope.filterByData = arr;
                        }
                        else {
                            $scope.filterByData = arr3;
                        }
                    }
                    else {
                        if($scope.selectedPositions.length > 0){
                            $scope.filterEmpStatus($scope.emplist, arr);
                            $scope.filterByData = arr;
                        }
                    }
                }
        };

        $scope.filteredEthnicData = function(eeoList,ethnicityChecked){
                var arr = [];
                var arr2 = [];
                var arr3 = [];
                eeoList.ethnicityCodeDesc = (eeoList.ethnicityCodeDesc === null) ? null : eeoList.ethnicityCodeDesc.trim();
                if(ethnicityChecked){
                    $scope.selectedEthnicities.push(eeoList.ethnicityCodeDesc);
                }else{
                    var index = $scope.selectedEthnicities.indexOf(eeoList.ethnicityCodeDesc);
                    if (index !== -1) {
                        $scope.selectedEthnicities.splice(index, 1);
                    }
                }

                if($scope.selectedPositions.length === 0 && $scope.selectedEthnicities.length === 0 && $scope.selectedJobs.length === 0){
                    arr = $scope.assignEEOData;
                    $scope.filterByData = arr;
                }
                else {
                    if($scope.selectedPositions.length > 0){
                        $scope.filterEmpStatus($scope.emplist, arr);

                        if($scope.selectedEthnicities.length > 0){
                            $scope.filterEthnicity(arr, arr2);

                            if($scope.selectedJobs.length > 0){
                                $scope.filterJob(arr2, arr3);
                                $scope.filterByData = arr3;
                            }
                            else {
                                $scope.filterByData = arr2;
                            }
                        }
                        else if ($scope.selectedEthnicities.length > 0){
                                $scope.filterEthnicity(arr, arr2);
                                $scope.filterByData = arr2;
                        }
                        else {
                            $scope.filterByData = arr;
                        }
                    }
                    else if ($scope.selectedJobs.length > 0) {
                        $scope.filterJob($scope.emplist, arr3);

                        if($scope.selectedEthnicities.length > 0){
                            $scope.filterEthnicity(arr3, arr2);
                            $scope.filterByData = arr2;
                        }
                        else {
                            $scope.filterByData = arr3;
                        }
                    }
                    else {
                        if($scope.selectedEthnicities.length > 0){
                            $scope.filterEthnicity($scope.emplist, arr);
                            $scope.filterByData = arr;
                        }
                    }
                }
        };

        $scope.filteredJobData = function(eeoList,jobChecked){
                var arr = [];
                var arr2 = [];
                var arr3 = [];
                eeoList.jobDesc = (eeoList.jobDesc === null) ? null : eeoList.jobDesc.trim();
                if(jobChecked){
                    $scope.selectedJobs.push(eeoList.jobDesc);
                }else{
                    var index = $scope.selectedJobs.indexOf(eeoList.jobDesc);
                    if (index !== -1) {
                        $scope.selectedJobs.splice(index, 1);
                    }
                }

                if($scope.selectedPositions.length === 0 && $scope.selectedEthnicities.length === 0 && $scope.selectedJobs.length === 0){
                    arr = $scope.assignEEOData;
                    $scope.filterByData = arr;
                }
                else {
                    if($scope.selectedPositions.length > 0){
                        $scope.filterEmpStatus($scope.emplist, arr);

                        if($scope.selectedEthnicities.length > 0){
                            $scope.filterEthnicity(arr, arr2);

                            if($scope.selectedJobs.length > 0){
                                $scope.filterJob(arr2, arr3);
                                $scope.filterByData = arr3;
                            }
                            else {
                                $scope.filterByData = arr2;
                            }
                        }
                        else if($scope.selectedJobs.length > 0){
                            $scope.filterJob(arr, arr3);
                            $scope.filterByData = arr3;
                        }
                        else {
                            $scope.filterByData = arr;
                        }
                    }
                    else if ($scope.selectedEthnicities.length > 0) {
                        $scope.filterEthnicity($scope.emplist, arr2);

                        if($scope.selectedJobs.length > 0){
                            $scope.filterJob(arr2, arr3);
                            $scope.filterByData = arr3;
                        }
                        else {
                            $scope.filterByData = arr2;
                        }
                    }
                    else {
                        if($scope.selectedJobs.length > 0){
                            $scope.filterJob($scope.emplist, arr3);
                            $scope.filterByData = arr3;
                        }
                    }
                }
            };

            $scope.filterEmpStatus = function(sourceArr,arr) {
                sourceArr.forEach(function (emp) {
                    $scope.selectedPositions.forEach(function (Pos) {
                        if (emp.employmentStatus === Pos) {
                                arr.push(emp);
                        }
                    });
                });
            };
            $scope.filterEthnicity = function(sourceArr, arr) {
                sourceArr.forEach(function (emp) {
                    $scope.selectedEthnicities.forEach(function (dept) {
                        if (emp.ethnicityCodeDesc === dept) {
                                arr.push(emp);
                        }
                    });
                });
            };
            $scope.filterJob = function(sourceArr, arr) {
                sourceArr.forEach(function (emp) {
                    $scope.selectedJobs.forEach(function (loc) {
                        if (emp.jobDesc === loc) {
                                arr.push(emp);
                        }
                    });
                });
            };

    }]);
