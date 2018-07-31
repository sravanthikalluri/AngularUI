'use strict';
trinetApp.controller('adminEnrollmentPlanCtrl', ['$scope', 'gso','$filter',function ($scope, gso,$filter) {
    var appUserId = gso.getAppConfig().userId,
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

    $scope.effectiveDateisLess = null;
    $scope.isFlatDollarChecked = true;
    $scope.minDate = new Date();
    $scope.maximumContributions = '-----';

    $scope.sysDate = new Date();
    $scope.flatDollarRequiredText = false;
    $scope.pctGrossRequiredText = false;
    $scope.date = $scope.sysDate.getDate();
    $scope.month = $scope.sysDate.getMonth() + 1;
    $scope.year = $scope.sysDate.getFullYear();
    if ($scope.date < 10) {
        $scope.date = '0' + $scope.date;
    }
    if ($scope.month < 10) {
        $scope.month = '0' + $scope.month;
    }
    $scope.sysDate = $scope.year + '-' + $scope.month + '-' + $scope.date;
    $scope.placeHolder = $scope.month + '/' + $scope.date + '/' + $scope.year;



    $scope.initEnrollmentPlan = function(){

        // get contributions
        gso.getCrudService()
            .execute(constants.get, moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.savingPlans + '?filter=current,future', null,
                function (response) {
                    $scope.isLoadingCompleted = true;
                    $scope.fedAmount = parseFloat(response.federalAmount).toFixed(2);

                    if(response.contributions && response.contributions.length > 0){
                        $scope.noPlans = true;
                        response.contributions.map(function(item){
                            var totalEnrollDataObject = {};
                            totalEnrollDataObject[constants.currentlyEffective] = item.details;
                            item.future.map(function(obj){
                                totalEnrollDataObject[constants.effective + $filter('date')(obj.effectiveDate, 'MM/dd/yyyy')] = obj;
                            });
                            item.selectedPlan = {
                                planType:item.planType,
                                planDesc:item.planDesc,
                                benifitPlan:item.benifitPlan
                            };
                            item.effectiveLabel = Object.keys(totalEnrollDataObject)[0];
                            item.selectedEffectiveData = totalEnrollDataObject[item.effectiveLabel];
                            item.data = totalEnrollDataObject;

                        });
                        $scope.contributions = response.contributions;
                    }
                },
                function (data) {
                    if (data._statusCode == '404') {
                        $scope.getFedAmountOnNoEnrollments();
                    }
                    $scope.errorAlert = data;
                    $scope.isLoadingCompleted = true;
                }
            );

        // Get Plan Types
        gso.getCrudService().execute(constants.get,  moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.planTypes, null,
            function (response) {
                $scope.planTypes = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
    };


    $scope.initEnrollmentPlan();



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
    }

    $scope.createNewRetirement = function () {
        gso.getNGDialog().open({
            templateUrl: 'app/components/payroll/retirementPlan/newEnrollmentModalView.html',
            scope: $scope,
            closeByDocument: false,
            closeByEscape: false
        });
    };


    //setting the max contributions
    $scope.maxContribution = function () {
        var priorContri = $scope.formData.priorContributions ?  $scope.formData.priorContributions : parseFloat(constants.zeroDoublePrecision).toFixed(2);
        var maximumContributions = parseFloat($scope.fedAmount) - parseFloat(priorContri);
        $scope.maximumContributions = parseFloat(maximumContributions).toFixed(2);
    };

    //code for new enroll
    $scope.newEnroll = function (enrollForm) {
        $scope.submitted = true;
        $scope.isNewEnrollSave = true;
        if( ($scope.formData.flatDollar || $scope.formData.grossWages) ){
            if (!enrollForm.innerForm.$valid) {
                $scope.errorAlert =  {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
            } else if (!$scope.checkDateValue()) {
                var data,
                    flatDeductionAmnt,
                    goalAmount,
                    pctGross,
                    newEnroll_effectiveDate = angular.element(document.querySelector('#enrollEffectiveDate')).val(),
                    flatDollarRadioId = angular.element(document.querySelector('#flatDollarRadioId').checked),
                    grossWagesRadioId = angular.element(document.querySelector('#grossWagesRadioId').checked),
                    goalAmountRadioId = angular.element(document.querySelector('#goalAmountRadioId').checked);
                newEnroll_effectiveDate = newEnroll_effectiveDate.substring(6, 10) + '-' + newEnroll_effectiveDate.substring(0, 2) + '-' + newEnroll_effectiveDate.substring(3, 5);
                if (flatDollarRadioId[0]) {
                    flatDeductionAmnt = parseFloat(angular.element(document.querySelector('#flatDollarInputId')).val());
                    if (flatDeductionAmnt === '') {
                        flatDeductionAmnt = parseFloat(0.00).toFixed(2);
                    }
                    pctGross = parseFloat(0.00).toFixed(2);
                }
                if (grossWagesRadioId[0]) {
                    flatDeductionAmnt = parseFloat(0.00);
                    pctGross = parseFloat(angular.element(document.querySelector('#grossWagesInputId')).val());
                    if (pctGross === '') {
                        pctGross = parseFloat(0.00).toFixed(2);
                    }
                }
                if (goalAmountRadioId[0]) {
                    goalAmount = parseFloat(angular.element(document.querySelector('#goalAmountInputId')).val());
                    if (goalAmount === '') {
                        goalAmount = parseFloat(0.00).toFixed(2);
                    }
                } else {
                    goalAmount = $scope.maximumContributions;
                }
                data = {
                    'effectiveDate': newEnroll_effectiveDate,
                    'flatDeductionAmnt': flatDeductionAmnt,
                    "flatDeductionAmntAtax": $scope.flatDeductionAmntAtax,
                    'goalAmount': goalAmount,
                    "pctGrossAtax": $scope.pctGrossAtax,
                    'pctGross': pctGross,
                    'planType': '4Q',
                    'limitType': '402',
                    'coverageElect': 'E',
                    "benefitPlan": $scope.benefitPlan,
                    "coverageBeginDate": $scope.coverageBeginDate,
                    "coverageElectDate": $scope.coverageElectDate,
                    "limitExtType": $scope.limitExtType,
                    'calendarYear': newEnroll_effectiveDate.substring(0, 4)
                };

                gso.getCrudService().execute(constants.post, moneyUrlConfig.moneyApi +
                    moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.retirementPlan + '/' +
                    companyId + '/' + appUserId +
                    moneyUrlConfig.resources.contributions, data,
                    function (response) {
                        $scope.errorAlert = response;
                        gso.getNGDialog().closeAll();
                        gso.getRoute().reload();
                    },
                    function (data) {
                        gso.getNGDialog().closeAll();
                        $scope.windowReload();
                    }
                );
            }
        }else{
            $scope.errorAlert =  {
                _statusCode: '400',
                _statusMessage: 'Please enter one Payroll Deduction'
            };
        }

    };

    //to close the panel
    $scope.closePanel = function () {
        $scope.errorAlert = null;
        $scope.isNewEnrollSave = false;
        gso.getNGDialog().closeAll();

    };

    //code for edit plan
    $scope.editRetirement = function (index) {
        $scope.selectedItem = $scope.contributions[index];
        loadData();
        $scope.maxContribution();
        gso.getNGDialog().open({
            templateUrl: 'app/components/payroll/retirementPlan/editEnrollmentModalView.html',
            scope: $scope,
            closeByDocument: false,
            closeByEscape: false
        });
    };


    function generatePostData(){
        var effectiveDate = $filter('date')($scope.effectiveDate, 'yyyy-MM-dd'),
            selectedEffectiveData = $scope.selectedItem.selectedEffectiveData;

        return {
            "planType": $scope.selectedPlan.planType,
            "planDesc": $scope.selectedPlan.planDesc,
            "benefitPlan": $scope.selectedPlan.benifitPlan,
            "details": {
                "effectiveDate": effectiveDate,
                "coverageBeginDate": effectiveDate,
                "coverageElect": $scope.waivePlanchecked ? 'W' : 'E',
                "coverageElectDate": effectiveDate,
                "flatDeductionAmount": $scope.waivePlanchecked ? '0.00' : $scope.formData.flatDeductionAmnt,
                "percentGrossDeduction": $scope.waivePlanchecked ? '0.00' : $scope.formData.pctGross,
                "limitedAmount": $scope.formData.goalAmount ? $scope.formData.goalAmount : ($scope.waivePlanchecked ? '0.00' : $scope.maximumContributions),
                "catchupAmount": selectedEffectiveData.catchupAmount
            }
        };


    }
    //Saving the edited data
    $scope.saveEditedData = function (editEnrollForm) {
        $scope.isFormSubmited = true;
        if (!$scope.waivePlanchecked && !editEnrollForm.innerForm.$valid) {
            $scope.errorAlert = {
                _statusCode: '400',
                _statusMessage: $scope.translation.pageValidationMessage
            };

            return false;
        }

        var postData = generatePostData();
        console.log(postData);

        gso.getCrudService().execute(constants.post, moneyUrlConfig.moneyApi +
            moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.retirementPlan + '/' +
            companyId + '/' + appUserId +
            moneyUrlConfig.resources.contributions, postData,
            function (response) {
                $scope.errorAlert = response;
                gso.getNGDialog().closeAll();
                $scope.windowReload();
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

    };

    //code for displaying current and effective dates
    function loadData() {
        var selectedEffectiveData = $scope.selectedItem.selectedEffectiveData;
        $scope.selectedPlan = $scope.selectedItem.selectedPlan;
        $scope.waivePlanchecked = selectedEffectiveData.effectiveType === 'W' ? true : false;
        $scope.effectiveDate = $scope.selectedItem.effectiveLabel === constants.currentlyEffective ?  gso.getUtilService().filterNextDayDate() : selectedEffectiveData.effectiveDate;
        $scope.formData.payrollDeductions = selectedEffectiveData.flatDeductionAmount > 0 ? 'dollar' : 'percentage';
        $scope.formData.contributions = selectedEffectiveData.goalAmount > 0 ? 'setGoal' : 'useLimit';
        $scope.formData.flatDeductionAmnt = selectedEffectiveData.flatDeductionAmount;
        $scope.formData.pctGross = selectedEffectiveData.percentGrossDeduction;
        $scope.formData.goalAmount = selectedEffectiveData.goalAmount;
    }

    $scope.dateChange = function (index,item) {
        var selectedItem = $scope.contributions[index];
        selectedItem.effectiveLabel = item;
        selectedItem.selectedEffectiveData = selectedItem.data[selectedItem.effectiveLabel];
    };


    $scope.checkDateValue = function () {
        var newEnroll_effectiveDate = angular.element('#enrollEffectiveDate').val();
        var enterDate = gso.getUtilService().filterDate(new Date(newEnroll_effectiveDate), 'dd');
        var date = new Date().getDate() + 1;
        if (date < 10) {
            date = "0" + date;
        }
        if (enterDate >= date) {
            $scope.effectiveDateisLess = false;
        } else {
            $scope.effectiveDateisLess = true;
        }
        return $scope.effectiveDateisLess;
    };

    var tempFormData;
    $scope.clearTextValues = function () {
        $scope.waivePlanchecked = !$scope.waivePlanchecked;
        if ($scope.waivePlanchecked) {
            tempFormData = $scope.formData;
            $scope.formData = {};
        } else {
            $scope.formData = tempFormData;
        }
    };
    $scope.windowReload = function () {
        window.location.reload();
    };


    $scope.toggleEnrollmentTimeline = function () {
        $scope.enrollment_showTimeline = !$scope.enrollment_showTimeline;
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
                editSetupPayroll:null,
                grossWagesAmt:null,
                grossWagesExceed: null,
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
                editSetupPayroll:null,
                grossWagesAmt:null,
                grossWagesExceed: null,
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
                grossWagesAmt:null,
                grossWagesExceed: null,
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
                grossWagesAmt:null,
                grossWagesExceed: null,
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
