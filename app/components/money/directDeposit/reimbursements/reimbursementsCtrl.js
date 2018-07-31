'use strict';
trinetApp.controller('reimbursementsCtrl', ['$scope','gso', 'sharedProperties', function ($scope, gso, sharedProperties) {

        $scope.selectedAccount = '';
        $scope.enableReimburse = false;
        $scope.enableSave = true;
        $scope.isViewable = true;

        /*In non editable mode*/
        angular.element('.icon-icon_Dropdown_Arrow').hide();


        /**
         * Trail methoed
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


        /**
         * initialize reimbursements data method
         */
        $scope.initReimbursementsDataFn = function (isDDRLoaded) {
            var isDDLoaded = isDDRLoaded;
            if (isDDRLoaded) {
                SharedDataService.getAppSharedData().isDDRLoaded = false;
                var customIdAlert = {
                    _statusCode: '200',
                    _statusMessage: money.directDeposit.successSaveMsg
                };
                $scope.childParentAlertMsg(customIdAlert);


            }

            var reimbursementsDataURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.directDeposit + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + moneyUrlConfig.resources.accounts;

            gso.getCrudService().execute(constants.get, reimbursementsDataURL, null,
                function (reimbursementsData) {
                    var totalReimbursementsDataObject = {};

                    angular.forEach(reimbursementsData.currentlyEffective, function (value, key) {
                        var currentlyEffectiveNetBalanceAccountIndex = $scope.getNetBalanceAccountIndex(value);
                        if(currentlyEffectiveNetBalanceAccountIndex !== 0){
                            value = $scope.resetPriorityOrder(value,currentlyEffectiveNetBalanceAccountIndex);
                        }
                        value = $scope.resetPriority(value);
                        totalReimbursementsDataObject[constants.currentlyEffective] = value;
                    });
                    angular.forEach(reimbursementsData.futureEffective, function (value, key) {
                        var futureEffectiveNetBalanceAccountIndex = $scope.getNetBalanceAccountIndex(value);
                        if(futureEffectiveNetBalanceAccountIndex !== 0){
                            value = $scope.resetPriorityOrder(value,futureEffectiveNetBalanceAccountIndex);
                        }
                        value = $scope.resetPriority(value);
                        totalReimbursementsDataObject[constants.effective + key] = value;
                    });
                    $scope.reimbursementsList = totalReimbursementsDataObject;
                    if (Object.keys(totalReimbursementsDataObject).length  === 0 ) {
                        $scope.selectedEffectiveDate =  constants.currentlyEffective;
                        $scope.fsaSelected = $scope.apSelected = 'Check';
                        $scope.reimbursementsList[constants.currentlyEffective] = [];
                    }
                    else{
                        totalReimbursementsDataObject = $scope.makeNetBalanceAccount(totalReimbursementsDataObject);
                        if(!isDDLoaded){
                            $scope.selectedEffectiveDate =  Object.keys(totalReimbursementsDataObject)[0];
                            $scope.reimbursementsData = $scope.details = totalReimbursementsDataObject[$scope.selectedEffectiveDate];
                            $scope.effectiveDetails($scope.selectedEffectiveDate);
                        }

                    }


                    if(isDDLoaded){
                        $scope.selectedEffectiveDate = SharedDataService.getAppSharedData().selectedEffectiveDate;
                        $scope.effectiveDetails($scope.selectedEffectiveDate);
                    }


                } ,
                function (data) {
                    $scope.errorAlert = data;
                }
            );



        };

        /**
         * initialize reimbursements data method calling
         */
        $scope.initReimbursementsDataFn(SharedDataService.getAppSharedData().isDDRLoaded);

        /**
         * effective details method
         * @param id
         */
        $scope.effectiveDetails = function (item) {
            $scope.selectedReimbursmentData = $scope.reimbursementsList[item];
            $scope.reimbersmentAPEncryption = $scope.reimbersmentFSAEncryption = angular.copy($scope.selectedReimbursmentData);
            $scope.fsaSelected = $scope.apSelected = 'Check';
            if ($scope.selectedReimbursmentData && $scope.selectedReimbursmentData.length > 0) {
                var str;
                angular.forEach($scope.selectedReimbursmentData,function(reimbursment){
                    if (reimbursment.fsaAccount === true) {
                        str = $scope.Trail(reimbursment.accountNumber);
                        $scope.fsaSelected = reimbursment.accountName + ' ' + reimbursment.accountType + ' ' + str;
                    }
                    if (reimbursment.apAccount === true) {
                        str = $scope.Trail(reimbursment.accountNumber);
                        $scope.apSelected = reimbursment.accountName + ' ' + reimbursment.accountType + '' + str;
                    }

                });

            }
        };



        function selectAccount(id,isSelectAPAccount){
            $scope.enableReimburse = true;
            $scope.dropDownchnage = true;
            sharedProperties.setboolValue($scope.dropDownchnage);

            var str = $scope.Trail($scope.selectedReimbursmentData[id].accountNumber);
            if(isSelectAPAccount){
                $scope.reimbersmentFSAEncryption[id].fsaAccount = true;
                $scope.fsaSelected = $scope.selectedReimbursmentData[id].accountName + ' ' + $scope.selectedReimbursmentData[id].accountType + ' ' +str;

                $scope.selectedFsa = $scope.selectedReimbursmentData[id];
            }else{
                $scope.reimbersmentAPEncryption[id].apAccount = true;
                $scope.apSelected = $scope.selectedReimbursmentData[id].accountName + ' ' + $scope.selectedReimbursmentData[id].accountType + ' ' +str;

                $scope.selectedAp = $scope.selectedReimbursmentData[id];
            }

        }
        /**
         * select fsa account method
         * @param id
         */
        $scope.selectFSAAccount = function (id) {
            selectAccount(id,true);
        };

        /**
         * select ap account method
         * @param id
         */
        $scope.selectAPAccount = function (id) {
            selectAccount(id,false);
        };

        /**
         *  toggle edit reimbursements method
         */
        $scope.toggleEditReimbursement = function (item) {

            var i, str;
            angular.element('.icon-icon_Dropdown_Arrow').show();
            angular.element('.rembersement-list-drop').removeAttr('style');
            $scope.visble = $scope.hidden = true;
            $scope.enableSave = false;
            $scope.enableReimburse = false;


            if(item === constants.currentlyEffective){
                $scope.calSelectedEffectiveDate = gso.getUtilService().filterNextDayDate();
                $scope.reimMinDate = gso.getUtilService().filterNextDayDate();
            }else{
                var effArray =  item.split(' ');
                $scope.calSelectedEffectiveDate = effArray[1];
                $scope.reimMinDate = effArray[1];
            }


        };

        /**
         * open account method
         * @param value
         * @param name
         */
        $scope.openAccount = function (value, name) {
            $scope.errorAlert = null;
            if ($scope.selectedReimbursmentData.length === 10) {
                var customIdAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: money.directDeposit.addAccountLimit
                };


                $scope.childParentAlertMsg(customIdAlert);
            }
            else {
                $scope.newAccountData = {};
                $scope.selectedAccount = name;


                if (name === 'fsa') {
                    $scope.title = money.directDeposit.addAccountFSATitle;
                } else {
                    $scope.title = money.directDeposit.addAccountApTitle;
                }

                if (value === 'new') {
                    gso.getNGDialog()
                        .openConfirm({
                            template: 'app/components/money/directDeposit/earnings/newAccount.html',
                            scope: $scope,
                            closeByDocument: false,
                            trapFocus: false
                        });
                }

            }
        };

        /**
         * add account method
         * @param op
         * @param canadianFields
         */
        $scope.addAccount = function (op, canadianFields) {
            $scope.enableReimburse = true;
            $scope.isnewAccountData = false;
            var selectDate = new Date(angular.element('#name_edit_effective_date').val()),
                selectedDate = gso.getUtilService().filterDate(selectDate, constants.dateFormat), str, data;
            if (op === constants.directDeposit.opNew) {
                var routingNumber,
                    bankId,
                    branchId,
                    netBalance,
                    fsa,
                    ap,
                    priority;

                str = $scope.Trail($scope.newAccountData.accountNumber);

                if ($scope.selectedReimbursmentData.length === 0) {
                    netBalance = true;
                    fsa = true;
                    ap = true;
                    $scope.fsaSelected = $scope.apSelected = 'Account Name ' + $scope.newAccountData.accountType + ' ' + str;
                    priority = 700;
                } else {

                    if ($scope.selectedAccount === 'fsa') {
                        fsa = true;
                        ap = false;
                        $scope.fsaSelected = 'Account Name ' + $scope.newAccountData.accountType + ' ' + str;
                    } else {
                        fsa = false;
                        ap = true;
                        $scope.apSelected = 'Account Name ' + $scope.newAccountData.accountType + ' ' + str;
                    }
                    netBalance = false;
                    priority = 675;
                }
                gso.getNGDialog().closeAll();
                $scope.isNewAccountData = true;
                if (canadianFields) {
                    routingNumber = null;
                    bankId = $scope.newAccountData.bankId;
                    branchId = $scope.newAccountData.branchId;
                } else {
                    routingNumber = $scope.newAccountData.routingNumber;
                    bankId = null;
                    branchId = null;
                }

                data = {
                    'accountName': 'Account Name',
                    'accountNumber': $scope.newAccountData.accountNumber,
                    'accountType': $scope.newAccountData.accountType,
                    'amount': null,
                    'apAccount': ap,
                    'effectiveDate': selectedDate,
                    'fsaAccount': fsa,
                    'netBalance': netBalance,
                    'percent': null,
                    'priority': priority,
                    'routingNumber': routingNumber,
                    'bankId': bankId,
                    'branchId': branchId,
                    'uniqueId': null
                };


                if ($scope.selectedAccount === 'fsa') {
                    $scope.selectedFsa = data;
                } else {
                    $scope.selectedAp = data;
                }
                var temp = $scope.selectedReimbursmentData;
                temp.splice(1, 0, data);
                $scope.selectedReimbursmentData = temp;

                $scope.selectedReimbursmentData = $scope.resetPriority($scope.selectedReimbursmentData);
                $scope.reimbersmentAPEncryption.futureEffective = $scope.reimbersmentFSAEncryption.futureEffective = $scope.selectedReimbursmentData;

            }
        };


        /**
         * insert reimbursement account method
         */
        $scope.insertReimbursementAccount = function () {
            $scope.visble = false;
            $scope.hidden = false;
            $scope.enableSave = true;
            var selectDate = new Date(angular.element('#name_edit_effective_date').val()),
                selectedDate = gso.getUtilService().filterDate(selectDate, constants.dateFormat);
            if (!angular.isDefined($scope.selectedFsa) && !angular.isDefined($scope.selectedAp)) {
                $scope.yes_btn = 'Yes';
                $scope.no_btn = 'No';
                $scope.confirmMessage = money.directDeposit.noChange;
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                    gso.getNGDialog().closeAll();
                    gso.getRoute().reload();
                });
            } else {

                var data = {};
                data.accountList = [];

                angular.forEach($scope.selectedReimbursmentData, function (reimbursment, key) {
                    if (angular.isDefined($scope.selectedFsa)) {
                        if ($scope.selectedFsa.priority === reimbursment.priority) {
                            reimbursment.fsaAccount = true;
                        } else {
                            reimbursment.fsaAccount = false;
                        }
                    }
                    if (angular.isDefined($scope.selectedAp)) {
                        if ($scope.selectedAp.priority === reimbursment.priority) {
                            reimbursment.apAccount = true;
                        } else {
                            reimbursment.apAccount = false;
                        }
                    }
                    if(reimbursment.netBalance){
                        reimbursment.priority = 700;
                    }
                    reimbursment.effectiveDate = selectedDate;
                });


                data.accountList = $scope.selectedReimbursmentData;

                var updateURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.directDeposit + "/" + gso.getAppConfig().companyId + "/" +
                    gso.getAppConfig().userId + moneyUrlConfig.resources.accounts;

                gso.getCrudService().execute(constants.post, updateURL, data,
                    function () {
                        SharedDataService.getAppSharedData().isDDRLoaded = true;
                        SharedDataService.getAppSharedData().selectedEffectiveDate = $scope.selectedEffectiveDate;
                        gso.getRoute().reload();
                        gso.getNGDialog().closeAll();

                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                        gso.getNGDialog().closeAll();
                        gso.getNGDialog().closeAll('$closeButton');
                    }
                );


            }
        };


        /**
         * cancel reimbursement method
         */
        $scope.cancelReimbursement = function () {
            angular.element('.icon-icon_Dropdown_Arrow').hide();
            angular.element('.rembersement-list-drop').css('border', 'none');
            $scope.selectedEffectiveDate =  constants.currentlyEffective;
            $scope.effectiveDate = $scope.resetEffectiveDate;
            if ($scope.enableReimburse ) {
                $scope.yes_btn = 'Yes';
                $scope.no_btn = 'No';
                $scope.confirmMessage = 'You have made changes, are you sure you want to cancel it?';
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                    $scope.visble = false;
                    $scope.hidden = false;
                    $scope.enableSave = true;
                });
            }
            else {
                $scope.visble = false;
                $scope.hidden = false;
                $scope.enableSave = true;
                $scope.effectiveDetails($scope.selectedEffectiveDate);
            }
        };

    }]);

