'use strict';
trinetApp
    .controller('earningsCtrl', ['$scope','gso','$timeout','SharedDataService',function ($scope,gso,$timeout,SharedDataService) {
            $scope.percentageShould = parseInt(100, 10);
            $scope.nextCheckIssueDate = null;
            /* variable for first time use who don't have any pay checks. it will be false*/
            $scope.checkPriority = $scope.addAccountData = [];
            $scope.listData = $scope.isNotDisabled = $scope.isEditStarted = $scope.noCurrData = $scope.suspend = $scope.modalShown = $scope.isDeletedFSAAccount = $scope.isDeletedAPAccount = false;
            $scope.isLastPaycheck = $scope.isEditBtnDisabled = $scope.isEditViewable = $scope.checkCurEffCond = $scope.addAccountData.isAmountType = $scope.noData = true;
            $scope.remainingAmount = $scope.payCheckAmount = 0;
            $scope.earningsCheckPayAmount = '0';
            $scope.addAccountData.amountType = 'amount';
            $scope.isLoading = false;

            $scope.checkTypeObj = [{
                key: 'Check',
                value: 'Check'
            }, {
                key: 'New Account',
                value: 'New Account'
            }];

            $scope.addAccountsList = [
               /* {
                    "accountTypeChanged": {
                        "key": "",
                        "value": "Select an account type"
                    }
                },*/

                {
                    "accountTypeChanged": {
                        "key": "Checking",
                        "value": "New Checking Account"
                    }
                },
                {
                    "accountTypeChanged": {
                        "key": "Savings",
                        "value": "New Savings Account"
                    }
                }
            ];

        $scope.DefaultDoughnutData = {
            datasets : [
                {
                    label: 'Pay Check Amount',
                    data: [ 1000 ],
                    backgroundColor: [constants.retirementPlanGoalAmountColorCode]
                }
            ],
            labels: []
        };

            $scope.options = {
                responsive: true,
                cutoutPercentage : 55,
                legend: {
                    display: false
                },
                tooltips:{
                    enabled:false
                }
            };
            var colorArray = ['#657d97', '#52af80', '#32a1c6', '#ad5b5b', '#9f9f9f', '#dd7c46', '#d65b5b', '#ffd65b', '#7b32c3', '#d684ad'];
            var num;

            var todayDate =   new Date(),
                startDate =  gso.getUtilService().filterDate(todayDate.setMonth(todayDate.getMonth() - 12), constants.dateFormat),
                endDate =  gso.getUtilService().filterDate(new Date(), constants.dateFormat);
            /**
             * disable method
             * @param date
             * @param mode
             * @returns {boolean}
             */
            $scope.disabled = function (date, mode) {
                var today = gso.getUtilService().filterDate(new Date()),
                    dateCompare = gso.getUtilService().filterDate(date);
                return ( (mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 )) ||
                (new Date(today).getTime() === new Date(dateCompare).getTime()) );
            };
            /** initialize earnings data method */
            $scope.initEarningsDataFn = function (isDDRLoaded) {
                var isDDLoaded = isDDRLoaded;
                $scope.errorAlert = null;
                if (isDDRLoaded) {
                    SharedDataService.getAppSharedData().isDDLoaded = false;

                    var customIdAlert = {
                        _statusCode: '200',
                        _statusMessage: money.directDeposit.successSaveMsg
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                }

                var payChecksURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + moneyUrlConfig.resources.payChecks+'?startDate='+startDate+'&endDate='+endDate;
                gso.getCrudService().execute(constants.get, payChecksURL, null,
                    function (earningsCheckAmount) {
                        if (earningsCheckAmount !== null) {
                            $scope.earningsCheckAmount = earningsCheckAmount;
                            $scope.$emit(constants.emitNoData, $scope.noData);
                            if ($scope.earningsCheckAmount.nextCheckIssueDate !== 'undefined' && $scope.earningsCheckAmount.nextCheckIssueDate !== null) {
                                $scope.nextCheckIssueDate = gso.getUtilService().splitConcatDateString($scope.earningsCheckAmount.nextCheckIssueDate);
                            }
                            if ($scope.earningsCheckAmount.checkSummaries !== undefined && $scope.earningsCheckAmount.checkSummaries !== null && $scope.earningsCheckAmount.checkSummaries.length !== 0) {
                                $scope.earningsCheckAmount.checkAmount = $scope.earningsCheckAmount.checkSummaries[0].netPay;
                                var checkAmount = parseFloat($scope.earningsCheckAmount.checkAmount,10);

                                if(checkAmount && checkAmount > 0){

                                    $scope.DefaultDoughnutData = {
                                        datasets : [
                                            {
                                                label: 'Pay Check Amount',
                                                data: [ $scope.earningsCheckAmount.checkAmount ],
                                                backgroundColor: [constants.retirementPlanGoalAmountColorCode]
                                            }
                                        ],
                                        labels: []
                                    };
                                }
                                $scope.checkRemAmount = checkAmount;
                                $scope.earningsCheckAmount.estimatedPayCheck = $scope.earningsCheckAmount.checkAmount;
                                $scope.noPayChecks = false;

                                getData(isDDLoaded);
                            }
                            else {
                                $scope.noPayChecks = true;
                                $scope.isLoading = true;
                            }
                        } else {
                            $scope.noPayChecks = true;
                            $scope.isLoading = true;
                        }
                    },
                    function (data) {
                        if(data._statusMessage === 'No paychecks'){
                            $scope.childParentAlertMsg(data);
                        }else{
                            $scope.isLoading = true;
                            var nextPayDate = SharedDataService.getAppSharedData().nextPayDate;
                            if(nextPayDate && nextPayDate !== 'null'){
                                $scope.nextCheckIssueDate = gso.getUtilService().splitConcatDateString(nextPayDate);
                            }else{
                                $scope.nextCheckIssueDate = null;
                            }
                        }
                        $scope.noPayChecks = true;

                    }
                );
            };
            $scope.initEarningsDataFn(SharedDataService.getAppSharedData().isDDLoaded);


            /**
             * get the earnings data method
             */
            function getData(isDDLoaded) {
                var earningsDataURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.directDeposit + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + moneyUrlConfig.resources.accounts;
                gso.getCrudService().execute(constants.get, earningsDataURL, null,
                    function (earningsData) {
                        $scope.noData = false;
                        $scope.listData = true;
                        $scope.isDisabled = false;
                        $scope.noCurrData = false;
                        $scope.validPayCheckAmount = true;
                        var totalEarningsDataObject = {};

                        angular.forEach(earningsData.currentlyEffective, function (value, key) {
                            var currentlyEffectiveNetBalanceAccountIndex = $scope.getNetBalanceAccountIndex(value);
                            if(currentlyEffectiveNetBalanceAccountIndex !== 0){
                                value = $scope.resetPriorityOrder(value,currentlyEffectiveNetBalanceAccountIndex);
                            }
                            value = $scope.resetPriority(value);
                            totalEarningsDataObject[constants.currentlyEffective] = populateObject(value, $scope.earningsCheckAmount.checkAmount);
                        });
                        angular.forEach(earningsData.futureEffective, function (value, key) {
                            var futureEffectiveNetBalanceAccountIndex = $scope.getNetBalanceAccountIndex(value);
                            if(futureEffectiveNetBalanceAccountIndex !== 0){
                                value = $scope.resetPriorityOrder(value,futureEffectiveNetBalanceAccountIndex);
                            }
                            value = $scope.resetPriority(value);
                            totalEarningsDataObject[constants.effective + key] = populateObject(value, $scope.earningsCheckAmount.checkAmount);
                        });

                        $scope.isLoading = true;

                        if (Object.keys(totalEarningsDataObject).length  === 0 ) {
                            $scope.selectedEffectiveDate =  constants.currentlyEffective;
                            var newData = {}, accountData;
                            $scope.noData = true;
                            $scope.listData = false;
                            $scope.isDisabled = true;
                            var date = gso.getUtilService().filterNextDayDate();

                            accountData = [{
                                'accountType': 'Checking',
                                'accountTypeChanged':{
                                    key: 'Check',
                                    value: 'Check'
                                },
                                'routingNumber': null,
                                'accountNumber': null,
                                'netBalance': true,
                                'fsaAccount': true,
                                'priority': 700,
                                'amount': null,
                                'accountName': 'Full Amount',
                                'percent': null,
                                'apAccount': true,
                                'effectiveDate': date,
                                'uniqueId': null
                            }];
                            $scope.earningData = populateObject(accountData,$scope.earningsCheckAmount.checkAmount);

                        }
                        else{
                            totalEarningsDataObject = $scope.makeNetBalanceAccount(totalEarningsDataObject);
                            $scope.earningsList = totalEarningsDataObject;
                            $scope.selectedEffectiveDate =  Object.keys(totalEarningsDataObject)[0];
                            $scope.earningData = populateObject(totalEarningsDataObject[$scope.selectedEffectiveDate],$scope.earningsCheckAmount.checkAmount);

                        }

                        var checkAmount = parseFloat($scope.earningsCheckAmount.checkAmount,10);

                        if(checkAmount <=  0){
                            $scope.validPayCheckAmount = false;
                        }
                        $scope.dataLength = $scope.earningData.length;
                        $scope.populateDoughnutData('first',$scope.earningData);

                    },
                    function (data) {
                        $scope.isLoading = true;
                        $scope.noPayChecks = true;
                        $scope.errorAlert = data;
                    }
                );
            }
            /**
             * populate the data method
             */

            $scope.populateData = function (item) {
                if (item === constants.currentlyEffective && $scope.earningsList[item].length === 0) {
                     $scope.noCurrData = true;
                } else {
                    $scope.dftrue = false;
                    $scope.noData = false;
                    $scope.noCurrData = false;
                }
                $scope.selectedEffectiveDate = item;
                $scope.earningData = $scope.earningsList[item];
                $scope.populateDoughnutData('first', $scope.earningsList[item]);
            };
            /**
             * remove method
             * @param index
             * @param data
             * @param estimatedPayCheck
             */
            $scope.remove = function (index, data, estimatedPayCheck) {
                var localIndex = index + 1;

                $scope.yes_btn = $scope.translation.yes;
                $scope.no_btn = $scope.translation.no;
                $scope.confirmMessage = money.directDeposit.confDelete;
                if ($scope.earningData[index].fsaAccount) {
                    $scope.yes_btn = $scope.translation.yesDelete;
                    $scope.confirmMessage = money.directDeposit.confFSA;
                } else if ($scope.earningData[index].apAccount) {
                    $scope.yes_btn = $scope.translation.yesDelete;
                    $scope.confirmMessage = money.directDeposit.confAP;
                }
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                    if ($scope.earningData[index].fsaAccount) {
                        $scope.isDeletedFSAAccount = true;
                    }
                    if ($scope.earningData[index].apAccount) {
                        $scope.isDeletedAPAccount = true;
                    }
                    $scope.earningData.splice(index, 1);
                    $scope.enableSaveButton();
                    $scope.earningData = populateObject(data, estimatedPayCheck);
                    $scope.checkChangesOnForm();
                    $scope.earningsEditView.$dirty = true;
                });
            };
            /**
             * on change method
             * @param data
             * @param estimatedPayCheck
             * @param inputvalue
             * @param event
             * @param index
             * @param earning
             */
            $scope.onChange = function (data, estimatedPayCheck, inputvalue, event, index, earning) {
                if (event.target.name === 'percent' || event.target.name === 'percentage') {
                    if (inputvalue !== '' && parseFloat(inputvalue,10) <= 100) {
                        $scope.earningData = populateObject(data, estimatedPayCheck, inputvalue);
                        $scope.enableSaveButton();
                    }else if(parseFloat(inputvalue,10) > 100){
                        var customIdAlert = {
                            _statusCode: constants.error,
                            _statusMessage: money.directDeposit.invalidPercentage
                        };
                        $scope.earningData = populateObject(data, estimatedPayCheck, inputvalue);
                        $scope.disableSaveButton();
                        $scope.childParentAlertMsg(customIdAlert);
                    } else {
                        angular.element('#percentof_' + index).val(parseFloat(0, 10));
                        earning.percent = 0;
                        $scope.enableSaveButton();
                    }
                }
                else {
                    if (inputvalue !== '') {
                        $scope.earningData = populateObject(data, estimatedPayCheck, inputvalue);
                    } else {
                        angular.element('#dollarinput_' + index).val(parseFloat(0, 10));
                        earning.amount = 0;
                    }
                    $scope.enableSaveButton();
                }

            };
            /** toggle the edit button method */
            $scope.toggleEdit = function (item) {
                $scope.isEditViewable = !$scope.isEditViewable;
                $scope.checkCurEffCond = !$scope.checkCurEffCond;
                $scope.isEditStarted = true;
                $scope.formDetailsChanged = true;


                $scope.populateDoughnutData('first',$scope.earningData);
                $scope.generateCheckTypes(item);
            };

            $scope.generateCheckTypes = function(item){
                $scope.checkTypeObj.splice(0, 1);
                angular.forEach($scope.earningData,function(earning){
                    var num = earning.accountNumber,
                        checkComboData = {
                            key: num,
                            routingNumber :  earning.routingNumber,
                            accountType :  earning.accountType,
                            value: earning.accountType + '**' + num.substring(num.length - 4, num.length)
                        };
                        $scope.checkTypeObj.push(checkComboData);
                });

                if(item === constants.currentlyEffective){
                    $scope.calSelectedEffectiveDate = gso.getUtilService().filterNextDayDate();
                    $scope.earnMinDate = gso.getUtilService().filterNextDayDate();
                }else{
                    var effArray =  item.split(' ');
                    $scope.calSelectedEffectiveDate = effArray[1];
                    $scope.earnMinDate = effArray[1];
                }

            };
            /** check the changes on form method */
            $scope.checkChangesOnForm = function () {
                if ($scope.initialCopy !== undefined) {
                    if (!angular.equals($scope.earningData, $scope.initialCopy) || $scope.earningData.length !== $scope.initialCopy.data.length) {
                        $scope.formDetailsChanged = false;
                    }
                }
            };
            /** opens the add account model method */
            $scope.addAccountModal = function () {
                $scope.closeAlert();
                var saveData = angular.extend($scope.earningData);
                if (saveData.length >= 10) {
                    var customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.directDeposit.addAccountLimit
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                    return false;
                }
                $scope.addAccountData = [];
                var newScope = $scope.$new();
                if ($scope.earningsList === null) {
                    gso.getNGDialog()
                        .open({
                            template: 'app/components/money/directDeposit/earnings/directDepositAccount.html',
                            scope: newScope,
                            closeByDocument: false
                        });
                } else {
                    var body = angular.element('body');
                    body.addClass('addAccountPopup');

                    $scope.addAccountsListData = [];

                    angular.forEach($scope.addAccountsList, function (obj) {
                        $scope.addAccountsListData.push(obj);
                    });

                    angular.forEach($scope.earningData,function(obj){
                        if(!obj.netBalance){
                            if(obj.accountTypeChanged.key === 'New Account'){
                                var num = obj.accountNumber;
                                obj.accountTypeChanged = {
                                    key: num,
                                    routingNumber: obj.routingNumber,
                                    accountType: obj.accountType,
                                    value: obj.accountType + '**' + num.substring(num.length - 4, num.length)
                                };
                            }

                            $scope.addAccountsListData.push(obj);
                        }


                    });


                    var dialog = gso.getNGDialog()
                        .open({
                            template: 'app/components/money/directDeposit/earnings/addAccount.html',
                            scope: newScope,
                            closeByDocument: false,
                            trapFocus: false
                        });
                    dialog.closePromise.then(function () {
                        body.removeClass('addAccountPopup');
                    });
                }
            };
            /** close the model method */
            $scope.closeModal = function () {
                gso.getNGDialog().closeAll();
            };
            /**
             * reset the alert
             */
            $scope.closeAlert = function () {
                $scope.errorAlert = false;
            };

            /** Cancel model method */
            $scope.cancel = function () {
                if ($scope.earningsEditView && $scope.earningsEditView.$dirty) {
                    $scope.yes_btn = 'Yes';
                    $scope.no_btn = 'No';
                    $scope.confirmMessage = money.taxWithHoldings.wantToClose;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function () {
                        $scope.earningData = $scope.refreshData;
                        gso.getRoute().reload();
                    });
                } else {
                    $scope.earningData = $scope.refreshData;
                    gso.getRoute().reload();
                }
            };
            /** est cancel model  method
             * @param estimatedPayCheck
             */
            $scope.estCancel = function (estimatedPayCheck) {
                if ($scope.earningsCheckAmount.checkAmount !== estimatedPayCheck) {
                    $scope.yes_btn = 'Yes';
                    $scope.no_btn = 'No';
                    $scope.confirmMessage = money.taxWithHoldings.wantToClose;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function () {
                        $scope.earningsCheckAmount.estimatedPayCheck = $scope.payCheckAmount;
                        $scope.closeModal();
                    });
                } else {
                    $scope.closeModal();
                }
            };
            /** add account model method
             * @param op
             * @param canadianFields
             */
            $scope.addAccount = function (op, canadianFields) {
                $scope.isNewAccount = false;
                var index,routingNumber,bankId,branchId,temp,data,  date = gso.getUtilService().filterNextDayDate();
                if (op === constants.directDeposit.opNew) {
                    /** create account fun */
                    $scope.isNewAccount = true;
                    num = $scope.newAccountData.accountNumber;
                    $scope.checkComboData = [{
                        key: num,
                        routingNumber: $scope.newAccountData.routingNumber,
                        accountType: $scope.newAccountData.accountType,
                        value: $scope.newAccountData.accountType + '**' + num.substring(num.length - 4, num.length)
                    }];
                    $scope.checkTypeObj.push($scope.checkComboData[0]);
                    $scope.copyFutureEffective = angular.extend($scope.earningData);
                    $scope.selectedObject.accountTypeChanged = {
                        key: num,
                        routingNumber: $scope.newAccountData.routingNumber,
                        accountType: $scope.newAccountData.accountType,
                        value: $scope.newAccountData.accountType + '**' + num.substring(num.length - 4, num.length)
                    };
                    $scope.selectedObject.accountNumber = num;
                    index = $scope.getNetBalanceAccountIndex($scope.earningData);
                    if (canadianFields) {
                        routingNumber = null;
                        bankId = $scope.newAccountData.bankId;
                        branchId = $scope.newAccountData.branchId;
                    } else {
                        routingNumber = $scope.newAccountData.routingNumber;
                        bankId = null;
                        branchId = null;
                    }
                    $scope.earningData[index].routingNumber = routingNumber;
                    $scope.earningData[index].bankId = bankId;
                    $scope.earningData[index].branchId = branchId;
                    $scope.formDetailsChanged = false;
                    $scope.checkChangesOnForm();
                }
                else {
                    /* add account fun */


                    $scope.checkPriority = $scope.checkPriority.sort();
                    $scope.priority = $scope.checkPriority[$scope.checkPriority.length - 1] - 25;

                    if (canadianFields) {
                        routingNumber = null;
                        bankId = $scope.addAccountData.bankId;
                        branchId = $scope.addAccountData.branchId;
                    } else {
                        routingNumber = $scope.addAccountData.routingNumber;
                        bankId = null;
                        branchId = null;
                    }

                   if($scope.addAccountData.uniqueId){
                       $scope.addAccountData.accountType = $scope.accountType;
                       index = getAccountIndex($scope.addAccountData.uniqueId);
                       //$scope.earningData[index] = $scope.addAccountData;
                       $scope.earningData[index].percent = $scope.addAccountData.percentage;
                       $scope.earningData[index].routingNumber = routingNumber;
                       $scope.earningData[index].accountNumber = $scope.addAccountData.accountNumber;
                       $scope.earningData[index].amountType = $scope.addAccountData.amountType;
                       $scope.earningData[index].amount = $scope.addAccountData.amount;
                       $scope.earningData[index].accountName = $scope.addAccountData.accountName;
                       $scope.earningData[index].bankId = bankId;
                       $scope.earningData[index].branchId = branchId;
                       $scope.earningData[index].effectiveDate = date;


                        num = $scope.addAccountData.accountNumber;
                        $scope.checkTypeObj[index + 1] = {
                            key: num,
                            routingNumber: $scope.addAccountData.routingNumber,
                            accountType: $scope.addAccountData.accountType,
                            value: $scope.addAccountData.accountType + '**' + num.substring(num.length - 4, num.length)
                        };

                       populateObject($scope.earningData, $scope.earningsCheckAmount.checkAmount);


                        $scope.enableSaveButton();
                        $scope.checkChangesOnForm();

                    } else {
                        $scope.addAccountData.accountType = $scope.addAccountData.accountType.accountTypeChanged.key;
                        if ($scope.addAccountData.amountType === 'dollar' && ( $scope.addAccountData.amount === null || $scope.addAccountData.amount === '')) {
                            $scope.addAccountData.amount = 0;
                        }

                        if ($scope.addAccountData.amountType === 'percentage' && ($scope.addAccountData.percentage === null || $scope.addAccountData.percentage === '')) {
                            $scope.addAccountData.percentage = 0;
                        }

                        data = {
                            'accountType': $scope.addAccountData.accountType,
                            'routingNumber': routingNumber,
                            'accountNumber': $scope.addAccountData.accountNumber,
                            'amountType': $scope.addAccountData.amountType,
                            'bankId': bankId,
                            'branchId': branchId,
                            'netBalance': false,
                            'fsaAccount': false,
                            'priority': 675,
                            'amount': $scope.addAccountData.amount,
                            'accountName': $scope.addAccountData.accountName,
                            'percent': $scope.addAccountData.percentage,
                            'apAccount': false,
                            'effectiveDate': date,
                            'uniqueId': null
                        };
                        num = $scope.addAccountData.accountNumber;
                        $scope.checkComboData = [{
                            key: num,
                            routingNumber: $scope.addAccountData.routingNumber,
                            accountType: $scope.addAccountData.accountType,
                            value: $scope.addAccountData.accountType + '**' + num.substring(num.length - 4, num.length)
                        }];
                        $scope.checkTypeObj.splice($scope.checkTypeObj.length - 1, 0, $scope.checkComboData[0]);
                        $scope.checkTypeObj.push($scope.checkComboData[0]);

                       $scope.earningData.sort(function (fromObj, toObj) {
                           return parseInt(toObj.priority, 10) - parseInt(fromObj.priority, 10);
                       });
                       temp = $scope.earningData;
                       temp.splice(1, 0, data);
                       $scope.earningData = temp;
                       $scope.earningData = $scope.resetPriority($scope.earningData);
                       populateObject($scope.earningData, $scope.earningsCheckAmount.checkAmount);

                        $scope.enableSaveButton();
                        $scope.checkChangesOnForm();
                    }

                }
                $scope.closeModal();
            };
            /**
             * open account model method
             * @param index
             * @param obj
             */
            $scope.openAccount = function (index, obj, accountTypeChanged) {
                $scope.selectedObject = obj;
                $scope.newAccountData = {};
                $scope.closeAlert();

                if ($scope.earningsList[constants.currentlyEffective].length !== 0) {
                    $scope.title = $scope.translation.money.direct_deposit.addAccountFor + obj.accountName;
                } else {
                    $scope.title = $scope.translation.money.direct_deposit.createDirectDepositAccount;
                }
                var comboId = '#checkTypeId_' + index,
                    value = angular.element(comboId).val();


                if (value === 'New Account') {
                    var body = angular.element('body');
                    body.addClass('addAccountPopup');
                    var dialog = gso.getNGDialog()
                        .openConfirm({
                            template: 'app/components/money/directDeposit/earnings/newAccount.html',
                            scope: $scope,
                            closeByDocument: false,
                            trapFocus: false
                        });
                    dialog.closePromise.then(function () {
                        body.removeClass('addAccountPopup');
                    });
                }

                if (accountTypeChanged.key !== 'New Account') {
                    $scope.enableSaveButton();
                }


            };
            /**
             * save data method
             */
            $scope.saveData = function () {
                if ($scope.remainingAmount < 0) {
                    if ($scope.earningsEditView) {
                        $scope.earningsEditView.$dirty = true;
                    } else {
                        $scope.earningsEditView = {};
                        $scope.earningsEditView.$dirty = true;
                    }

                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: money.directDeposit.exceedLastPayCheck
                    };
                    $scope.childParentAlertMsg(customIdAlert);

                } else {
                    if ($scope.earningData.length === 1) {
                        $scope.yes_btn = 'Proceed';
                        $scope.no_btn = 'Cancel';
                        $scope.confirmMessage = 'If you continue, FSA reimbursements will also be deposited in account ' + $scope.Trail($scope.earningData[0].accountNumber) + '. Would you like to continue? Yes, continue	No';
                        gso.getNGDialog().openConfirm({
                            template: 'app/shared/views/confirmAlert.html',
                            scope: $scope,
                            closeByDocument: false,
                            closeByEscape: false
                        }).then(function () {
                            $scope.saveAccount();
                        });
                    } else {
                        $scope.saveAccount();
                    }
                }
            };
            /**
             * trail method
             * @param obj
             * @returns {*}
             * @constructor
             */
            $scope.Trail = function (obj) {
                var str = obj,
                    trailingCharsIntactCount = 4;
                str = '**' + str.slice(-trailingCharsIntactCount);
                return str;
            };
            function havingFSAAccount(acounts){
                var isHavingFSAAccount = false;
                angular.forEach(acounts, function (input) {
                    if(input.fsaAccount) {
                        isHavingFSAAccount = true;
                    }
                });

                return isHavingFSAAccount;
            }
            /** save account method */
            $scope.saveAccount = function () {
                var saveData = angular.extend($scope.earningData),
                    totalPercentage = 0,
                    totalAmount = 0,
                    nBOject = {},
                    flag = true,
                    selectDate = new Date(angular.element('#earningsView_edit_effective_date').val()),
                    effectiveDate = gso.getUtilService().filterDate(selectDate, constants.dateFormat),
                    data,
                    customIdAlert;

                if (saveData.length === 1) {
                    saveData[0].fsaAccount = true;
                    saveData[0].apAccount = true;
                    saveData[0].priority = 700;
                }
                if (saveData.length > 10) {
                    customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.directDeposit.addAccountLimit
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                    return;
                }
                var isHavingFSAAccount = havingFSAAccount(saveData);
                if(!isHavingFSAAccount){
                    $scope.isDeletedFSAAccount = true;
                }

                angular.forEach(saveData, function (input) {
                    if (input.percent === null) {
                        input.percent = 0;
                    }
                    if (flag) {
                        flag = false;
                    }
                    if (input.netBalance) {
                        input.priority = 700;
                        nBOject = input;
                        if ($scope.isDeletedFSAAccount) {
                            input.fsaAccount = true;
                        } else if ($scope.isDeletedAPAccount) {
                            input.apAccount = true;
                        }
                    }
                    if (input.priority) {
                        totalPercentage = totalPercentage + parseFloat(input.percent);
                        totalAmount = totalAmount + parseFloat(input.remAmount);
                    }

                    input.effectiveDate = effectiveDate;
                    input.accountNumber = input.accountTypeChanged.key;
                    input.accountType = input.accountTypeChanged.accountType;
                    input.routingNumber = input.accountTypeChanged.routingNumber;

                });


                data = {
                    'accountList': saveData
                };
                var updateURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.directDeposit + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + moneyUrlConfig.resources.accounts;
                gso.getCrudService().execute(constants.post, updateURL, data,
                    function () {
                        gso.getNGDialog().closeAll('$closeButton');
                        SharedDataService.getAppSharedData().isDDLoaded = true;
                        gso.getRoute().reload();
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                        gso.getNGDialog().closeAll('$closeButton');
                    }
                );
                $scope.resetFSAAPFlags();
            };
            /** reset FSA/AP flags method */
            $scope.resetFSAAPFlags = function () {
                $scope.isDeletedFSAAccount = false;
                $scope.isDeletedAPAccount = false;
            };
            /**
             * get amount type method
             * @param value
             * @param accountData
             */
            $scope.getAmountType = function (value, accountData) {
                var data;
                if (angular.isUndefined(accountData)) {
                    data = $scope.addAccountData;
                } else {
                    data = accountData;
                }
                if (value === 'amount' || value === 'dollar') {
                    data.isAmountType = false;
                    data.percentOld = data.percent;
                    data.percent = null;
                    if (data.amountOld !== undefined && data.amountOld !== '') {
                        data.amount = data.amountOld;
                    } else {
                        data.amount = 0;
                    }
                    data.amountType = 'dollar';

                } else if (value === 'percentage') {
                    data.isAmountType = true;
                    data.amountOld = data.amount;
                    if (data.percentOld !== undefined && data.percentOld !== '') {
                        data.percent = data.percentOld;
                    } else {
                        data.percent = 0;
                    }
                    data.amount = null;
                    data.amountType = 'percentage';
                }
                $scope.addAccountData.amount = null;
                $scope.addAccountData.percentage = null;

            };


            /**
             * populate object method
             * @param data
             * @param payCheck
             * @param inputvalue
             * @returns {*}
             */
             function populateObject(data, payCheck) {
                var remPayCheck = 0;
                $scope.colorObject = [];
                $scope.payCheckOriginal = payCheck;
                $scope.otheraccountTotal = 0;
                if (!angular.isDefined(data.length)) {
                    data.color = '#' + ((1 < 24) * Math.random()).toString(16);
                    if (data.amount !== null && data.amount !== '') {
                        data.remAmount = data.amount;
                        data.amountType = 'dollar';
                        payCheck = payCheck - data.remAmount;
                        remPayCheck = angular.extend(payCheck - data.remAmount);
                        data.isAmountType = false;
                        data.payCheck = remPayCheck;
                    } else {
                        if (data.percent !== null && data.percent !== '' && data.percent !== '0') {
                            data.remAmount = parseFloat(((data.percent / 100) * payCheck)).toFixed(2);
                            data.amountType = 'percentage';
                            data.isAmountType = true;
                            payCheck = payCheck - data.remAmount;
                            remPayCheck = angular.extend(payCheck - data.remAmount);
                            data.payCheck = remPayCheck;
                        }
                    }
                }
                else {

                    data.sort(function (fromObj, toObj) {
                        return parseInt(fromObj.priority, 10) - parseInt(toObj.priority, 10);
                    });
                    $scope.previous = [];
                    var count = 0;
                    angular.forEach(data, function (input,index) {
                        input.color = colorArray[index];
                        if (data.length > 1) {
                            input.accountName = constants.directDeposit.accountName;
                        }
                        if (input.accountNumber !== null && input.accountNumber !== '') {
                            input.accountTypeChanged = {
                                'key': input.accountNumber,
                                routingNumber: input.routingNumber,
                                accountType: input.accountType,
                                'value': input.accountType + '**' + input.accountNumber.substr(input.accountNumber.length - 4, input.accountNumber.length)
                            };
                        }
                        if (input.amount !== null && input.amount !== '' && !input.netBalance) {
                            input.amountType = 'dollar';
                            input.isAmountType = false;
                            input.remAmount = parseFloat(input.amount);
                            remPayCheck = angular.extend(payCheck - input.remAmount);
                            payCheck = parseFloat(payCheck) - parseFloat(input.remAmount);
                            payCheck = parseFloat(payCheck);
                            input.payCheck = remPayCheck;
                            if (input.payCheck < 0) {
                                resetEditView();
                            }
                        } else {
                            if (input.percent !== null && input.percent !== '' && !input.netBalance) {
                                input.amountType = 'percentage';
                                input.isAmountType = true;
                                //Calculating the values
                                payCheck = parseFloat(payCheck).toFixed(2);
                                input.percAmout = payCheck;
                                input.remAmount = parseFloat(((input.percent / 100) * payCheck).toFixed(2));
                                remPayCheck = payCheck = angular.extend(payCheck - parseFloat((input.remAmount.toFixed(2))));
                                input.payCheck = parseFloat(remPayCheck.toFixed(2));
                                input.payCheck = parseFloat(input.payCheck.toFixed(2));
                            } else {
                                if ((input.percent === null || input.percent === 0) && (input.amount === 0 || input.amount === null) && !input.netBalance) {
                                    input.payCheck = input.remAmount = parseFloat(payCheck.toFixed(2));
                                    input.amountType = 'dollar';
                                    input.isAmountType = false;
                                    if (input.amountOld !== undefined) {
                                        input.amount = input.amountOld;
                                    } else {
                                        input.amount = 0.00;
                                    }
                                    input.remAmount = 0.00;
                                } else {
                                    input.payCheck = input.remAmount = payCheck;
                                    $scope.remainingAmount = parseFloat(payCheck);
                                    input.amountType = null;
                                    input.isAmountType = null;
                                    if (data.length >= 1 && input.netBalance === true && input.accountNumber !== null) {
                                        input.accountName = constants.directDeposit.remainingAmount;
                                        $scope.suspend = true;
                                    } else if (data.length < 1) {
                                        input.accountName = constants.directDeposit.fullAmount;
                                    }
                                }
                            }
                        }
                        count++;
                        $scope.colorObject.push(input);
                    });
                }
                if ($scope.colorObject.length === 0) {
                    $scope.effectiveAccounts = angular.extend(data);
                    return data;
                } else {
                    $scope.effectiveAccounts = angular.extend($scope.colorObject);
                    $scope.populateDoughnutData('get', $scope.colorObject);
                    return $scope.colorObject;
                }
            }
            /** populate doughnut data
             * @param value
             * @param data
             * @returns {Array}
             */
            $scope.populateDoughnutData = function (value, data) {
               /* if (value === 'first') {
                    data = data.data;
                }*/

                $scope.doughnutData = {
                    datasets :[
                        {
                            label: '',
                            data: [],
                            backgroundColor: []
                        }
                    ],
                    labels: []
                };

                angular.forEach(data, function (input) {

                    $scope.doughnutData.datasets[0].data.push(input.remAmount);
                    $scope.doughnutData.datasets[0].backgroundColor.push(input.color);
                });
                return $scope.doughnutData;
            };

            function resetAmountPercentageButtons(amountType,index){
                angular.element('#'+amountType+index).prop('checked',true);
            }
            /** on drop complete method
             * @param index
             * @param obj
             * @param evt
             */
            $scope.onDropComplete = function (index, obj) {
                $scope.enableSave = false;
                $scope.formDetailsChanged = false;
                var otherObj = $scope.earningData[index],
                    otherIndex = $scope.earningData.indexOf(obj),
                    dataPriority = $scope.earningData[index].priority,
                    dropData = $scope.earningData;

                if(otherIndex > index){
                    $scope.earningData[index].priority = $scope.earningData[otherIndex].priority;
                    $scope.earningData[otherIndex].priority = dataPriority;
                    $scope.earningData[index] = obj;
                    $scope.earningData[otherIndex] = otherObj;
                    populateObject(dropData, $scope.earningsCheckAmount.checkAmount, otherObj.payCheck);
                    $scope.earningData = angular.extend($scope.earningData);

                    $timeout(function(){
                        resetAmountPercentageButtons(otherObj.amountType,otherIndex);
                        resetAmountPercentageButtons(obj.amountType,index);
                    }, 250);
                }

            };
            /** check amount validation method
             * @param dollarAmountId
             */
            $scope.checkAmountValidation = function (dollarAmountId) {
                var dollarAmount = angular.element('#dollorinput_' + dollarAmountId).val();
                $scope.editDollorValueRequired = parseFloat(dollarAmount) > $scope.checkRemAmount;
            };
            /** get parsed float value method
             * @param val
             * @returns {Number}
             */
            $scope.getParsedVal = function (val) {
                return parseFloat(val);
            };

            function resetEditView(){
                $scope.earningsEditView = {};
                $scope.earningsEditView.$dirty = true;
            }

             $scope.disableSaveButton = function () {
                $scope.formDetailsChanged = true;
                $scope.earningsEditView = {};
                $scope.earningsEditView.$dirty = false;
            };

            /**
             * enable save account method
             */
            $scope.enableSaveButton = function () {
                $scope.formDetailsChanged = false;
                resetEditView();

            };

            $scope.onFocus = function(index,value,type){
                if(value === 0 && type === 'percent'){
                    $scope.earningData[index].percent = '';
                }
                if(value === 0 && type === 'dollar'){
                    $scope.earningData[index].amount = '';
                }
            };


            /**
             * add account change method
             */
            $scope.addAccChange = function (addAccountData,index) {
                if(addAccountData.accountTypeChanged.key === 'Checking' || addAccountData.accountTypeChanged.key === 'Savings'){
                    $scope.showImg = false;
                    $scope.dollarRadioChecked = true;
                    $scope.percentRadioChecked = false;
                    $scope.addAccountData.isAmountType = false;

                    $scope.addAccountData.routingNumber = '';
                    $scope.addAccountData.accountNumber = '';
                    $scope.addAccountData.amount = '';
                    $scope.addAccountData.percentage = '';
                    $scope.addAccountData.bankId = '';
                    $scope.addAccountData.branchId = '';
                    $scope.addAccountData.uniqueId = null;
                    $scope.addAccountData.amountType = 'dollar';

                } else if (addAccountData.accountTypeChanged.key !== '' && addAccountData.accountTypeChanged.key !== 'Checking' && addAccountData.accountTypeChanged.key !== 'Savings') {
                    $scope.addAccountData.accountName = 'Test';
                    $scope.addAccountData.routingNumber = addAccountData.routingNumber;
                    $scope.addAccountData.accountNumber = addAccountData.accountNumber;
                    $scope.accountType = addAccountData.accountType;
                    $scope.addAccountData.bankId = addAccountData.bankId;
                    $scope.addAccountData.branchId = addAccountData.branchId;
                    if (addAccountData.amount) {
                        $scope.getAmountType('amount');
                        $scope.dollarRadioChecked = true;
                        $scope.percentRadioChecked = false;
                        $scope.addAccountData.amount = addAccountData.amount;
                        $scope.addAccountData.isAmountType = false;
                        $scope.addAccountData.uniqueId = addAccountData.uniqueId;
                        $scope.addAccountData.amountType = 'dollar';

                    } else {
                        $scope.getAmountType('percentage');
                        $scope.percentRadioChecked = true;
                        $scope.dollarRadioChecked = false;
                        $scope.addAccountData.percentage = addAccountData.percent;
                        $scope.addAccountData.isAmountType = true;
                        $scope.addAccountData.uniqueId = addAccountData.uniqueId;
                        $scope.addAccountData.amountType = 'percentage';


                    }

                }

            };

            function getAccountIndex(uniqueId){
                var index = 0;
                angular.forEach($scope.earningData, function (obj, i) {
                    if (obj.uniqueId === uniqueId) {
                        index = i;
                    }

                });
                return index;

            }
        }]);
