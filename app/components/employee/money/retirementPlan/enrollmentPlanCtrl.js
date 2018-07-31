'use strict';
trinetApp.controller('enrollmentPlanCtrl', ['$scope', 'gso','$filter','$q',function ($scope, gso,$filter,$q) {
    if (typeof $scope.appUserId === 'undefined') {
        $scope.appUserId = gso.getAppConfig().userId;
    }

    var appUserId = $scope.appUserId,
        companyId = gso.getAppConfig().companyId;

        $scope.noPlans = false;
        $scope.isLoadingCompleted = false;
        $scope.isFormSubmited = false;
        $scope.enrollment_showTimeline = true;
        $scope.isAgree = false;
        $scope.waivePlanchecked = false;
        $scope.formData = {};
        $scope.employeeName = $scope.headerName;
        $scope.appUserId = appUserId;
        $scope.formData.priorContributions = constants.zeroDoublePrecision;
        $scope.newEffdate = $filter('date')(new Date(gso.getUtilService().filterNextDayDate()),'MM/dd/yyyy');
        $scope.section = 'retirement';
        $scope.flatDollarRequiredText = false;
        $scope.pctGrossRequiredText = false;
        $scope.minDate = new Date();
        $scope.enrolledPlans = [];
        $scope.uniquePlantypes  = [];
        $scope.errorAlert = null;
        $scope.remindersOpen = $scope.savingsPlanFeatures = false;
        $scope.planCategoryObj ={"AfterTax":"A","BeforeTax":"B","CommonTax":"C"};
        $scope.isThirdPartyEnrolled=true;
        var thirdPartyCompanies = ['TRANSA','MASSMU','SLAVIC','PLNRIGHT'];
        var planTypesToRestrict  = ['43'];
        // get history
        $scope.getHistory = function(){
            gso.getCrudService().execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.displayHistory, null,
                function (response) {
                    response.map(function(item){
                        item.changePlanList.map(function(changedPlans){
                            item[changedPlans.field] = changedPlans.currentValue;
                        });
                        if(item.effectiveDate){
                            item['effectiveStatus'] = gso.getUtilService().checkTwoDates($filter('date')(new Date(), 'yyyy-MM-dd'), item.effectiveDate) ? false : true;
                        }

                        return item;
                    });

                    $scope.allhistory = response;

                    $scope.history = $scope.allhistory;

                });
        };

        //get reminder data
        $scope.getReminder = function () {
            gso.getCrudService().execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + manageEmpUrlConfig.resources.RemindersRequest, null,
                function (response) {
                    $scope.isReminderLoadingCompleted = true;
                    $scope.reminderData = response;
                },
                function (data) {
                    $scope.isReminderLoadingCompleted = true;

                });
        };

        // Get Plan Types
        $scope.getPlanTypes = function(){
            gso.getCrudService().execute(constants.get,  moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.planTypes, null,
                function (response) {
                    $scope.planTypes = response;
                    angular.forEach($scope.planTypes, function (value, key) {
                        value['showContributions'] = planTypesToRestrict.indexOf(value.planType) >= 0 ? true : value.isEmployerOnly;
                    });
                    $scope.getEnrolledContributions();

                },function (error) {
                    $scope.planTypes = [];
                    $scope.isLoadingCompleted = true;

                });


        };

        // Get 401K Vendors
        $scope.get401KVendors = function(){
            gso.getCrudService().execute(constants.get,  moneyUrlConfig.moneyApi + '/api-config/v1/company/' +  companyId + '/' + '401K-vendors', null,
                function (response) {
                    $scope.isThirdPartyEnrolled = response.filter(function(item){
                        return thirdPartyCompanies.indexOf(item.vendorId) >= 0;
                    }).length <= 0;
                },
                function (error) {
                    /*data._statusCode=="404"? ($scope.isThirdPartyEnrolled =false): ($scope.isThirdPartyEnrolled = true);*/
                }
            );
        };

        $scope.getEnrolledContributions = function(callback){
            // get contributions
            gso.getCrudService()
                .execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/'+ companyId +'/' + appUserId + moneyUrlConfig.resources.savingPlans + '?filter=current,future', null,
                    function (response) {
                        $scope.isLoadingCompleted = true;

                        $scope.fedAmount = parseFloat(response.federalAmount).toFixed(2);
                        $scope.resContributions = angular.copy(response.contributions);
                        if (response.contributions && response.contributions.length > 0) {
                            $scope.noPlans = true;
                            $scope.enrolledPlans = [];

                            var validContributions = angular.copy(response.contributions);
                            angular.forEach(validContributions, function (value, index) {
                                var validPlan = $scope.planTypes.filter(function (plan) {
                                    return plan.planType === value.planType;
                                });
                                if(validPlan.length === 0){
                                    response.contributions.splice(index, 1);
                                }
                            });

                            // merging contributions by plan-type
                            var res = [];
                            response.contributions.map(function (contribution) {
                                var index = res.findIndex(function (obj) {
                                    return obj.planType === contribution.planType;
                                });

                                if (index === -1) {
                                    res.push(contribution);
                                } else {
                                    var new_obj = res[index];
                                    contribution.details = contribution.details ? contribution.details : [];

                                    if (contribution.details.length > 0) {
                                        new_obj['details'] = contribution.details;
                                    }

                                    contribution['future'] = contribution['future'] ? contribution['future'] : [];
                                    new_obj['future'] = new_obj['future'] ? new_obj['future'] : [];
                                    new_obj['future'] = new_obj['future'].concat(contribution['future']);
                                    res[index] = new_obj;
                                }
                            });

                            response.contributions = res;

                            response.contributions.sort(function (a) {
                                if (a.details){
                                    if (a.details.effectiveType === 'T') {
                                        return 1;
                                    }

                                    if (a.details.effectiveType !== 'T') {
                                        return -1;
                                    }
                                }
                                return 0;
                            }).map(function (item) {
                                var totalEnrollDataObject = {};

                                if (item.details) {
                                    totalEnrollDataObject[constants.currentlyEffective] = item.details;
                                }

                                if (item.future) {
                                    item.future.map(function (obj) {
                                        totalEnrollDataObject[constants.effective + $filter('date')(obj.effectiveDate, 'MM/dd/yyyy')] = obj;
                                    });
                                }

                                item.effectiveLabel = Object.keys(totalEnrollDataObject)[0];
                                item.selectedEffectiveData = totalEnrollDataObject[item.effectiveLabel];
                                item.data = totalEnrollDataObject;

                                for (var property in item.data) {
                                    if(item.data[property].effectiveType !== 'W'){
                                        var selectedPlan = $scope.planTypes.filter(function (plan) {
                                            return plan.planType === item.planType;
                                        });

                                        $scope.enrolledPlans.push(selectedPlan[0]);
                                         // remove duplicates
                                         var resArr = [];
                                         $scope.enrolledPlans.filter(function(item){
                                             var i = resArr.findIndex(function (x) {
                                                 return ((x.planType === item.planType));
                                             });
                                             if(i <= -1) {
                                                 resArr.push(item);
                                             }
                                         });
                                         $scope.enrolledPlans = resArr;
                                        item.selectedPlan = selectedPlan[0];
                                        break;
                                    }
                                    else {
                                        var selectedPlan = $scope.planTypes.filter(function (plan) {
                                            return plan.planType === item.planType;
                                        });
                                        item.selectedPlan = selectedPlan[0];
                                    }
                                }

                                // hide add additional pay
                                $scope.uniquePlantypes  = [];
                                $scope.planTypes.map(function (plan) {
                                    var index = $scope.uniquePlantypes.findIndex(function (obj) {
                                        return obj.planType === plan.planType;
                                    });

                                    if (index === -1) {
                                        $scope.uniquePlantypes.push(plan);
                                    }
                                });


                            });
                            $scope.contributions = response.contributions;

                            $scope.contributions.map(function (contributionObj) {
                                var keys = Object.keys(contributionObj.data);
                                contributionObj['dataAsArray'] = [];
                                keys.map(function (keyName) {
                                    var obj = {
                                      key: keyName,
                                      value:  contributionObj.data[keyName]
                                    };
                                    contributionObj['dataAsArray'].push(obj);
                                })
                            });

                            $scope.contributions.map(function (contributionObject) {
                                contributionObject.dataAsArray = sortDates(contributionObject.dataAsArray);
                            });

                            callback ? callback() : '';
                        }
                    },
                    function (error) {
                        if (error._statusCode == '404') {
                            $scope.getFedAmountOnNoEnrollments();
                            $scope.noPlans = false;
                        }
                        $scope.isLoadingCompleted = true;

                    }
                );
        };

    // sort the future effective records
    function sortDates(arr) {
        return arr.sort(function(a,b) {
            return new Date(a.value.effectiveDate).getTime() - new Date(b.value.effectiveDate).getTime();
        });
    }

        //code for new enrollment
        //open new enrollmen modal window

        $scope.getFedAmountOnNoEnrollments = function(){
            gso.getCrudService()
                .execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.fedAmount, null,
                    function (response) {
                        $scope.fedAmount = response;
                    }),
                function (data) {
                    $scope.errorAlert = data;
                }
        };

        $scope.initEnrollmentPlan = function(){
            $scope.getPlanTypes();
            $scope.getHistory();
            $scope.getReminder();
            $scope.get401KVendors();

        };


        $scope.initEnrollmentPlan();



        //open new enrollment modal window
        $scope.createNewRetirement = function () {
            $scope.formData = {};
            $scope.notEnrolledPlans = angular.merge($scope.planTypes);
            $scope.selectedPlan = $scope.notEnrolledPlans[0];
            $scope.formData.payrollDeductions = 'dollar';
            $scope.formData.postPayrollDeductions = 'dollar';
            $scope.formData.flatDeductionAmountPreTax = '';
            $scope.formData.flatDeductionAmountPostTax = '';
            $scope.formData.percentGrossDeductionPreTax = '';
            $scope.formData.percentGrossDeductionPostTax = '';
            $scope.formData.contributions = 'useLimit';
            $scope.maxContribution();
            var newEnroll = gso.getNGDialog().open({
                templateUrl: 'app/components/employee/money/retirementPlan/newEnrollmentModalView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });

            newEnroll.closePromise.then(function (data) {
                $scope.closePanel();
            });

        };


        //setting the max contributions
        $scope.maxContribution = function (amount) {
            var priorContri = amount ?  amount : parseFloat(constants.zeroDoublePrecision).toFixed(2);
            var maximumContributions = parseFloat($scope.fedAmount) - parseFloat(priorContri);
            $scope.maximumContributions = parseFloat(maximumContributions).toFixed(2);
        };

        //code for new enroll
        $scope.newEnroll = function (enrollForm) {
            $scope.submitted = true;
            $scope.isNewEnrollSave = true;
            if( ($scope.formData.payrollDeductions) ){
                if (!enrollForm.innerForm.$valid) {
                    $scope.errorAlert =  {
                        _statusCode: '400',
                        _statusMessage: $scope.translation.pageValidationMessage
                    };
                }else if(($scope.formData.payrollDeductions === 'percentage') && !(parseFloat($scope.formData.percentGrossDeductionPreTax) <= 100)){
                    $scope.errorAlert = {
                        _statusCode: '400',
                        _statusMessage: '401K Election Percentage of Gross Wages should not exceed 100%'
                    };
                }else if(($scope.formData.postPayrollDeductions === 'percentage') && !(parseFloat($scope.formData.percentGrossDeductionPostTax) <= 100)){
                    $scope.errorAlert = {
                        _statusCode: '400',
                        _statusMessage: 'Roth Election Percentage of Gross Wages should not exceed 100%'
                    };
                }else if(parseInt($scope.formData.flatDeductionAmountPreTax,10) === 0 && parseInt($scope.formData.percentGrossDeductionPreTax,10) === 0){
                    $scope.errorAlert = {
                        _statusCode: '400',
                        _statusMessage: 'please enter atleast one Payroll Deduction'
                    };
                } else{

                    var effectiveDate = $filter('date')((new Date(angular.element('#enrollEffectiveDate').val())), 'yyyy-MM-dd'),
                     postData =  {
                                        "planType": $scope.selectedPlan.planType,
                                        "planDesc": $scope.selectedPlan.planDesc,
                                        "benefitPlan": $scope.selectedPlan.benefitPlan,
                                        "details": {
                                            "effectiveDate": effectiveDate,
                                            "effectiveType": 'E',
                                            "goalAmount": planTypesToRestrict.indexOf($scope.selectedPlan.planType) >= 0 ? null : $scope.formData.goalAmount ? $scope.formData.goalAmount :  $scope.formData.priorContributions ? $scope.maximumContributions : '0'
                                        }
                                    };


                    $scope.selectedPlan.beforeTaxPercent > 0 ? angular.merge(postData["details"], {
                            "flatDeductionAmountPreTax":  $scope.formData.flatDeductionAmountPreTax,
                            "percentGrossDeductionPreTax":  $scope.formData.percentGrossDeductionPreTax ? $scope.formData.percentGrossDeductionPreTax : 0
                        })
                        : angular.noop();

                    $scope.selectedPlan.afterTaxPercent > 0 ? angular.merge(postData["details"],{
                            "flatDeductionAmountPostTax": $scope.waivePlanchecked ? '0.00' : $scope.formData.flatDeductionAmountPostTax,
                            "percentGrossDeductionPostTax": $scope.waivePlanchecked ? '0.00' : $scope.formData.percentGrossDeductionPostTax
                        })
                        : angular.noop();


                    gso.getCrudService().execute(constants.post, moneyUrlConfig.moneyApi +
                        moneyUrlConfig.moneyBaseUrl +
                        moneyUrlConfig.resources.retirementPlan + '/' +
                        companyId + '/' + appUserId +
                        moneyUrlConfig.resources.contributions, postData,
                        function (response) {
                            $scope.getEnrolledContributions(successMessageFunction(response._statusMessage));
                            gso.getNGDialog().closeAll();
                        },
                        function (data) {
                            $scope.errorAlert = data;
                        }
                    );
                }
            }else{
                $scope.errorAlert =  {
                    _statusCode: '400',
                    _statusMessage: 'Please select any one of Payroll Deductions'
                };
             }

        };

        //to close the panel
        $scope.closePanel = function (enrollForm) {
            if (enrollForm && !enrollForm.$pristine) {
                $scope.confirmMessage = money.defaultMessages.cancelChanges;
                $scope.yes_btn = "Yes, discard changes";
                $scope.no_btn = "No";
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                    $scope.errorAlert = null;
                    $scope.isNewEnrollSave = false;
                    gso.getNGDialog().closeAll();

                });
            } else {
                $scope.errorAlert = null;
                $scope.isNewEnrollSave = false;
                gso.getNGDialog().closeAll();
            }



        };

        //code for edit plan
        $scope.editRetirement = function (index) {
            $scope.errorAlert = null;
            $scope.formData = [];
            $scope.selectedItem = $scope.contributions[index];
            $scope.initialEffDate = $scope.selectedItem.effectiveLabel === constants.currentlyEffective ?  gso.getUtilService().filterNextDayDate() : $scope.selectedItem.selectedEffectiveData.effectiveDate;

            $scope.editEnrolledPlans = $scope.planTypes.filter(function(notEnroll){
                return ($scope.selectedItem.planType === notEnroll.planType) && (notEnroll.benefitPlan === $scope.selectedItem.benefitPlan);
            });
            $scope.selectedPlan = $scope.editEnrolledPlans[0];

            /*if($scope.selectedItem.details && $scope.selectedItem.details.effectiveType !== 'W'){
                $scope.editEnrolledPlans = [];
                $scope.editEnrolledPlans.push($scope.selectedItem.selectedPlan);
                $scope.selectedPlan = $scope.editEnrolledPlans[0];
            }else{
                $scope.editEnrolledPlans = [];
                if ($scope.selectedItem.selectedPlan) {
                    $scope.editEnrolledPlans.push($scope.selectedItem.selectedPlan);
                }
                $scope.selectedPlan = $scope.editEnrolledPlans[0];
            }*/
            $scope.isFormSubmited = false;


            loadData();
            $scope.maxContribution();
           var editEnroll =  gso.getNGDialog().open({
                templateUrl: 'app/components/employee/money/retirementPlan/editEnrollmentModalView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            editEnroll.closePromise.then(function (data) {
                $scope.closePanel();
            });

        };


       function generatePostData(){
           var effectiveDate = $filter('date')(new Date(angular.element('#enrollEffectiveDate').val()), 'yyyy-MM-dd'),
               selectedEffectiveData = $scope.selectedItem.selectedEffectiveData;
           $scope.formData.goalAmount = $scope.formData.goalAmount === ''?null:$scope.formData.goalAmount ;
           $scope.formData.priorContributions = $scope.formData.priorContributions === ''?null:$scope.formData.priorContributions;
           var postData = {
               "planType": $scope.selectedPlan.planType,
               "planDesc": $scope.selectedPlan.planDesc,
               "benefitPlan": $scope.selectedPlan.benefitPlan,
               "details": {
                   "effectiveDate": effectiveDate,
                   "effectiveType": $scope.waivePlanchecked ? 'W' : 'E',
                   "goalAmount": planTypesToRestrict.indexOf($scope.selectedPlan.planType) >= 0 ? null : ($scope.formData.goalAmount || $scope.formData.goalAmount === 0) &&  ($scope.formData.contributions === 'useLimit' && $scope.formData.priorContributions) ? $scope.maximumContributions : ($scope.waivePlanchecked ? '0.00' : $scope.selectedPlan.isEmployerOnly == true ? null :  $scope.formData.goalAmount ? $scope.formData.goalAmount : $scope.formData.priorContributions ? $scope.maximumContributions : null),
               }
           };

          $scope.selectedPlan.beforeTaxPercent > 0 ? angular.merge(postData["details"], {
                                                             "flatDeductionAmountPreTax": $scope.waivePlanchecked ? '0.00' : $scope.formData.flatDeductionAmountPreTax,
                                                             "percentGrossDeductionPreTax": $scope.waivePlanchecked ? '0.00' : parseFloat($scope.formData.percentGrossDeductionPreTax)
                                                            })
                                                    : angular.noop();

           $scope.selectedPlan.afterTaxPercent > 0 ? angular.merge(postData["details"],{
                                                                     "flatDeductionAmountPostTax": $scope.waivePlanchecked ? '0.00' : $scope.formData.flatDeductionAmountPostTax,
                                                                     "percentGrossDeductionPostTax": $scope.waivePlanchecked ? '0.00' : parseFloat($scope.formData.percentGrossDeductionPostTax)
                                                                    })
                                                                  : angular.noop();

           return postData;



       }

       $scope.canSave = false;
        //Saving the edited data
        $scope.saveEditedData = function (editEnrollForm) {
            $scope.isFormSubmited = true;
            var latestEffDate = $filter('date')(new Date(angular.element('#enrollEffectiveDate').val()), 'yyyy-MM-dd');
            if (!$scope.waivePlanchecked && !editEnrollForm.innerForm.$valid) {
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };

                return false;
            }else if(!$scope.selectedPlan){
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: 'please select plan type'
                };
            }else if(!$scope.waivePlanchecked && !$scope.selectedPlan.isEmployerOnly && parseInt($scope.formData.flatDeductionAmountPreTax,10) === 0 && parseInt($scope.formData.percentGrossDeductionPreTax,10) === 0 && parseInt($scope.formData.flatDeductionAmountPostTax,10) === 0  && parseInt($scope.formData.percentGrossDeductionPostTax,10) === 0){
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: 'please enter atleast one Payroll Deduction or select "Waive"'
                };

                return false;

            }else if(($scope.formData.percentGrossDeductionPreTax) && ($scope.formData.percentGrossDeductionPreTax > $scope.selectedPlan.beforeTaxPercent)){
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: '401K Election Percentage of Gross Wages should not exceed '+$scope.selectedPlan.beforeTaxPercent+'%'
                };
                return false;
            }
            else if( $scope.formData.percentGrossDeductionPostTax && ($scope.formData.percentGrossDeductionPostTax > $scope.selectedPlan.afterTaxPercent)){
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: 'Roth Election Percentage of Gross Wages should not exceed '+$scope.selectedPlan.afterTaxPercent+'%'
                };
                return false;
            }else if(($scope.formData.goalAmount || $scope.formData.priorContributions) && ((parseInt($scope.formData.goalAmount) > parseInt($scope.fedAmount)) || (parseInt($scope.formData.priorContributions) > parseInt($scope.fedAmount)) )){
                $scope.errorAlert = {
                    _statusCode: '400',
                    _statusMessage: 'Limited amount must be less than federal amount'
                };
                return false;
            }else if($scope.selectedItem.future){
                var keepGoing = true;
                angular.forEach($scope.selectedItem.future, function (value, key) {
                    if(keepGoing) {
                        var hasFutureDate = gso.getUtilService().checkTwoDates(value.effectiveDate, $filter('date')(new Date(angular.element('#enrollEffectiveDate').val()), 'yyyy-MM-dd'));
                        if (hasFutureDate) {
                            keepGoing = false;
                            $scope.confirmMessage = $scope.translation.profile_personal.enrollmentFutureDateMessage;//+ value.effectiveDate +
                            $scope.yes_btn =  $scope.translation.profile_personal.ok;
                            $scope.no_btn = $scope.translation.profile_personal.cancel;
                            gso.getNGDialog().openConfirm({
                                template: 'app/shared/views/confirmAlert.html',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            }).then(function () {
                                $scope.finalSave();
                            }, function () {

                            });
                        }
                    }
                });
                if(keepGoing){
                    $scope.finalSave();
                }
            }
            else{
                $scope.finalSave();
            }
        };
        function successMessageFunction(msg) {
            $scope.successMessage = msg;
            $scope.errorAlert ={
                _statusCode: '200',
                _statusMessage: $scope.successMessage

            }
            $scope.initEnrollmentPlan();
        }
        $scope.finalSave = function(){
            var postData = generatePostData();

            gso.getCrudService().execute(constants.post, moneyUrlConfig.moneyApi +
                moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.retirementPlan + '/' +
                companyId + '/' + appUserId +
                moneyUrlConfig.resources.contributions, postData,
                function (response) {
                    $scope.getEnrolledContributions(successMessageFunction(response._statusMessage));
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

            gso.getNGDialog().closeAll();
        };

        $scope.deletePlan = function(data){
            var deleteData = {
                "planType": data.selectedPlan.planType,
                "planDesc": data.selectedPlan.planDesc,
                "benefitPlan": data.selectedPlan.benefitPlan,
                "details": data.data[data.effectiveLabel]
            };




            gso.getCrudService().execute(constants.remove, moneyUrlConfig.moneyApi +
                moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.retirementPlan + '/' +
                companyId + '/' + appUserId +
                moneyUrlConfig.resources.contributions, deleteData,
                function (response) {
                    $scope.childParentAlertMsg(response);
                    gso.getNGDialog().closeAll();
                    $scope.initEnrollmentPlan();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            gso.getNGDialog().closeAll();
        };

        //code for displaying current and effective dates
        function loadData() {
            var selectedEffectiveData = $scope.selectedItem.selectedEffectiveData;
            // $scope.selectedPlan = angular.copy($scope.selectedItem.selectedPlan);
            $scope.waivePlanchecked = selectedEffectiveData.effectiveType === 'W' ? true : false;
            $scope.effectiveDate = $scope.selectedItem.effectiveLabel === constants.currentlyEffective ?  $filter('date')(new Date(gso.getUtilService().filterNextDayDate()),'MM/dd/yyyy') : selectedEffectiveData.effectiveDate;
            $scope.formData.prePayrollDeductions = (selectedEffectiveData.flatDeductionAmountPreTax !== null && selectedEffectiveData.percentGrossDeductionPreTax === 0 ) ? 'dollar' : 'percentage';
            $scope.formData.postPayrollDeductions = (selectedEffectiveData.flatDeductionAmountPostTax !== null && selectedEffectiveData.percentGrossDeductionPostTax === 0 ) ? 'dollar' : 'percentage';
            //$scope.formData.contributions = selectedEffectiveData.goalAmount > 0 ? 'setGoal' : 'useLimit';
            $scope.formData.contributions = 'useLimit';
            $scope.formData.flatDeductionAmountPreTax = selectedEffectiveData.flatDeductionAmountPreTax == 0 ? '' : selectedEffectiveData.flatDeductionAmountPreTax;
            $scope.formData.percentGrossDeductionPreTax = selectedEffectiveData.percentGrossDeductionPreTax == 0 ? '' : selectedEffectiveData.percentGrossDeductionPreTax;
            $scope.formData.flatDeductionAmountPostTax = selectedEffectiveData.flatDeductionAmountPostTax == 0 ? '' : selectedEffectiveData.flatDeductionAmountPostTax;
            $scope.formData.percentGrossDeductionPostTax = selectedEffectiveData.percentGrossDeductionPostTax == 0 ? '' : selectedEffectiveData.percentGrossDeductionPostTax;
            $scope.formData.goalAmount = selectedEffectiveData.goalAmount;
        }

        $scope.newEffectiveDateChange = function(){
            var currentDate = new Date();
            var effectiveDate = $filter('date')((new Date(angular.element('#enrollEffectiveDate').val())), 'yyyy-MM-dd');
            var currDate=  gso.getUtilService().filterDate(currentDate, constants.dateFormat);
            var effdate =  gso.getUtilService().filterDate(effectiveDate, constants.dateFormat);
            if(effdate > currDate){
                $scope.newfutureMessage = true;
                $scope.newPastMessage = false;
            }else if(effdate < currDate){
                $scope.newfutureMessage = false;
                $scope.newPastMessage = true;
            }else{
                $scope.newfutureMessage = false;
                $scope.newPastMessage = false;
            }
        }

        $scope.editEffectiveDateChange = function(){
            var currentDate = new Date();
            var effectiveDate = $filter('date')((new Date(angular.element('#enrollEffectiveDate').val())), 'yyyy-MM-dd');
            var currDate=  gso.getUtilService().filterDate(currentDate, constants.dateFormat);
            var effdate =  gso.getUtilService().filterDate(effectiveDate, constants.dateFormat);
            if(effdate > currDate){
                $scope.editfutureMessage = true;
                $scope.editPastMessage = false;
            }else if(effdate < currDate){
                $scope.editfutureMessage = false;
                $scope.editPastMessage = true;
            }else{
                $scope.editfutureMessage = false;
                $scope.editPastMessage = false;
            }
        }
        $scope.dateChange = function (index,item) {
            var selectedItem = $scope.contributions[index];
            selectedItem.effectiveLabel = item;
            $scope.contributions[index].benefitPlanDesc = item.indexOf("Currently") > -1 ? $scope.resContributions[0].benefitPlanDesc : $scope.resContributions[1].benefitPlanDesc;
            selectedItem.selectedEffectiveData = selectedItem.data[selectedItem.effectiveLabel];


            var data = angular.copy($scope.allhistory),
                effectiveDate =  item === constants.currentlyEffective ?  $filter('date')(new Date(), 'yyyy-MM-dd') : selectedItem.selectedEffectiveData.effectiveDate;

            // if(data && data.length > 0){
            //     $scope.history = data.filter(function(obj){
            //         return obj.benefitPlan === selectedItem.benefitPlan ? (gso.getUtilService().checkTwoDates(effectiveDate, obj.effectiveDate) ? obj : null) : (gso.getUtilService().checkTwoDates(getPlanEffectiveDate(obj), obj.effectiveDate));
            //     });
            // }
        };

       $scope.closeAlert = function(){
        $scope.errorAlert = null;
       };
        function getPlanEffectiveDate(plan){
             var benefitPlan = plan.benefitPlan;
             var selectedPlan = $scope.contributions.filter(function(item){
                return item.benefitPlan === benefitPlan;
            });
            if(selectedPlan.length >  0){
                selectedPlan = selectedPlan[0];
                return  selectedPlan.effectiveLabel === constants.currentlyEffective ?  $filter('date')(new Date(), 'yyyy-MM-dd') : selectedPlan.selectedEffectiveData.effectiveDate;
            }else{
                return $filter('date')(new Date(), 'yyyy-MM-dd');
            }
        }

        var tempFormData;
        $scope.clearTextValues = function () {
            $scope.waivePlanchecked = !$scope.waivePlanchecked;
            if ($scope.waivePlanchecked) {
                tempFormData = $scope.formData;
                $scope.formData = {};
            } else {
                tempFormData['flatDeductionAmountPreTax'] = '';
                tempFormData['percentGrossDeductionPreTax'] = '';
                tempFormData['flatDeductionAmountPostTax'] = '';
                tempFormData['percentGrossDeductionPostTax'] = '';
                $scope.formData = tempFormData ? tempFormData : {flatDeductionAmountPreTax : 0,percentGrossDeductionPreTax :  0,flatDeductionAmountPostTax:0,percentGrossDeductionPostTax:0};
            }
        };
        $scope.windowReload = function () {
            window.location.reload();
        };


        $scope.toggleEnrollmentTimeline = function () {
            $scope.enrollment_showTimeline = !$scope.enrollment_showTimeline;
        };
        $scope.checkPlanTypeExits=function (planType,planCategory) {

            var Temp=_.filter($scope.planTypes,function (item)
            {
                return ((angular.lowercase(item.planType)===angular.lowercase(planType))&& (angular.lowercase(item.planCategory)===angular.lowercase(planCategory)));
            });
            if(Temp)
            {
               return Temp.length>0;
            }
        };
        $scope.priorAmountValid = function(setGoal,type){
            if(type === 'setGoalAmt') {
                return setGoal > parseInt($scope.fedAmount,10) ? true : false;
            }
            else{
                return setGoal >= parseInt($scope.fedAmount,10) ? true : false;
            }
        };

        $scope.addAdditionalPlan = function(){


            $scope.notEnrolledPlans = $scope.planTypes.filter(function(notEnroll){
                return $scope.enrolledPlans.filter(function(enroll){
                        return enroll.planType === notEnroll.planType;
                    }).length === 0;
            });

            $scope.selectedPlan = $scope.notEnrolledPlans[0];
            $scope.formData = {};
            $scope.maxContribution();
            $scope.formData.payrollDeductions = 'dollar';
            $scope.formData.postPayrollDeductions = 'dollar';
            $scope.formData.contributions = 'useLimit';
            $scope.formData.flatDeductionAmountPreTax = '';
            $scope.formData.flatDeductionAmountPostTax = '';
            $scope.formData.percentGrossDeductionPreTax = '';
            $scope.formData.percentGrossDeductionPostTax = '';
            // pre-populate goal amount if available
            if ($scope.contributions) {
                $scope.contributions.map(function (obj) {
                    if (obj.details) {
                        $scope.formData.goalAmount = obj.details.goalAmount;
                    } else if (obj.future && obj.future.length) {
                        $scope.formData.goalAmount = obj.future[0].goalAmount;
                    }
                });
            }
            gso.getNGDialog().open({
                templateUrl: 'app/components/employee/money/retirementPlan/newEnrollmentModalView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                preCloseCallback:function(){
                    $scope.isFormSubmited = false;
                    $scope.errorAlert = null;
                }
            });
        };


        $scope.validationPatterns = {
            update: {
                blur: {
                    setGoalAmtRequired: null,
                    setGoalAmtNotZero: null,
                    setGoalAmtCondi: null,
                    priorAmountPattern: null,
                    priorAmountNotZero: null,
                    priorAmountCondi: null,
                    flatDollarRequiredText: null,
                    postFlatDollarRequiredText: null,
                    editSetupPayroll:null,
                    grossWagesAmt:null,
                    grossWagesExceed: null,
                    postGrossWagesAmt:null,
                    postGrossWagesExceed: null,
                    goalAmountIsMore:null,
                    effectiveDate : null
                },
                focus: {
                    setGoalAmtRequired: null,
                    setGoalAmtCondi: null,
                    priorAmountPattern: null,
                    priorAmountNotZero: null,
                    priorAmountCondi: null,
                    flatDollarRequiredText: null,
                    postFlatDollarRequiredText: null,
                    editSetupPayroll:null,
                    grossWagesAmt:null,
                    grossWagesExceed: null,
                    postGrossWagesAmt:null,
                    postGrossWagesExceed: null,
                    goalAmountIsMore:null,
                    effectiveDate : null
                }

            },
            create: {
                blur: {
                    setGoalAmtRequired: null,
                    setGoalAmtNotZero: null,
                    setGoalAmtCondi: null,
                    priorAmountPattern: null,
                    priorAmountNotZero: null,
                    priorAmountCondi: null,
                    flatDollarRequiredText: null,
                    postFlatDollarRequiredText: null,
                    grossWagesAmt:null,
                    grossWagesExceed: null,
                    postGrossWagesAmt:null,
                    postGrossWagesExceed: null,
                    goalAmountIsMore:null,
                    effectiveDate : null
                },
                focus: {
                    setGoalAmtRequired: null,
                    setGoalAmtCondi: null,
                    priorAmountPattern: null,
                    priorAmountNotZero: null,
                    priorAmountCondi: null,
                    flatDollarRequiredText: null,
                    postFlatDollarRequiredText: null,
                    grossWagesAmt:null,
                    grossWagesExceed: null,
                    postGrossWagesAmt:null,
                    postGrossWagesExceed: null,
                    goalAmountIsMore:null,
                    effectiveDate : null

                }

            }
        };

        $scope.onBlur = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });
            if (name === 'update') {
                $scope.validationPatterns.update.blur = temp;
            }

        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });
            if (name === 'update') {
                $scope.validationPatterns.update.focus = temp;
            }
        };


    }]);
