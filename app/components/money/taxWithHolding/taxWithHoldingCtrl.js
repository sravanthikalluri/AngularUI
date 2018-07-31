'use strict';
trinetApp.controller('taxWithHoldingCtrl', ['$scope', 'gso', '$anchorScroll','$filter','$location','SharedDataService', function ($scope, gso, $anchorScroll,$filter,$location,SharedDataService) {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }

        $scope.dataLoading = true;
        $scope.noData = true;
        $scope.exemptValue = constants.exemptValue;
        $scope.check_index = constants.check_index;
        $scope.date_label = constants.currentlyEffective;
        $scope.fieldsDisabled = $scope.flag = $scope.editFieldsDisabled = $scope.confirm = $scope.i9DataValue = false;
        $scope.personResidentValue = 'Y';
        $scope.cnt = -1;
        $scope.confirmationPopup = $scope.checked = true;
        $scope.saveValue = false;
        $scope.dateMenuObject = [];
        $scope.len = 0;
        $scope.alert_data = [];
        $scope.taxWithHoldingDataLength = $scope.stateAllowanceRange = $scope.currentlyEffDate = $scope.effectiveDate = $scope.stateRange = $scope.fedRange = $scope.fedAllowanceRange = 0;
        $scope.taxWithholdingSavedAlert = false;
        $scope.fedAllowanceAdiAmt = $scope.stateAllowanceAdiAmt = '$0.00';
        $scope.stateExempt = $scope.fedExempt = false;
        $scope.maritalStatusData = $scope.maritalStatusValue = [];
        $scope.stateAllowanceMaritalStatus = $scope.fedAllowanceMaritalStatus = $scope.futureEffective = $scope.nonResidentislDeclared = 'N';
        $scope.taxWithHolingObject = '';
        $scope.taxWithHolingDataObject = [];
        $scope.recordsCnt = 0;
        $scope.temp_cnt = 0;
        $scope.visibletaxWithholdingsNew = false;
        $scope.fedCnt = 0;
        $scope.tmpVar = false;
        $scope.c = 0;
        $scope.inValue = null;
        var customIdAlert;
        $scope.affirmationText1 = null;
        $scope.affirmationText2 = null;
        $scope.payrollDates = [];
        $scope.docLocContext = constants.docLocContext;
        $scope.selectedIndex = 0;
        $scope.havingGA = false;
        var appUserId = $scope.appUserId;

      $scope.disableStateAllowances = function(stateCode){
          var isTrue = false;
          if(constants.taxWithHoldings.statesToDisableAllowances.indexOf(stateCode) !== -1){
              isTrue = true;
          }else{
              isTrue = false;
          }
          return isTrue;
      };

        $scope.disableStateSection = function(stateCode){
            var isTrue = false;
            if(constants.taxWithHoldings.statesToDisableStateSection.indexOf(stateCode) !== -1){
                isTrue = true;
            }else{
                isTrue = false;
            }
            return isTrue;
        };

        function generateFedTaxObjectData(index, type) {
            var input = null;

            if ($scope.fedTaxWithholdings[0]) {
                input = $scope.fedTaxWithholdings[0];
            } else if (!$scope.fedTaxWithholdings[0] && $scope.fedTaxWithholdings[1]) {
                input = $scope.fedTaxWithholdings[1];
            }

            if (input.maritalStatus === null) {
                input.maritalStatus = 'Single';
            }

            input.additionalAmount = input.addlAmount;
            input.allowRequested = input.allowancesRequested;
            input.exceedLimit = false;

            if (input.exempt === 'Yes') {
                $scope.editFieldsDisabled = true;
            } else {
                $scope.editFieldsDisabled = false;
            }
            $scope.itemCnt++;
            var code = input.payDedCode;


            var fedAllowanceMaritalStatusURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/" + code;

            gso.getCrudService().execute(constants.get, fedAllowanceMaritalStatusURL, null,
                function (response) {

                    input.maritalStatusList = response;
                    var single_object = $filter('filter')(response, function (d) {
                        return d.taxMarStatDesc === input.maritalStatus;
                    })[0];

                    input.maritalStatusValue = single_object;

                    $scope.taxWithHolingDataObject.push(input);

                    if (angular.isDefined($scope.stateTaxWithholdings) && $scope.stateTaxWithholdings.length > 0) {
                        generateStateTaxObjectData(index, type);
                    }

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        }

        function generateStateTaxObjectData(index, type) {

            angular.forEach($scope.stateTaxWithholdings, function (input, i) {
                if (input.maritalStatus === null) {
                    input.maritalStatus = 'Single, or Married with two or more incomes';

                }
                $scope.itemCnt++;

                var code = input.payDedCode;
                input.exceedLimit = false;

                var stateAllowanceMaritalStatusURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/" + code;

                gso.getCrudService().execute(constants.get, stateAllowanceMaritalStatusURL, null,
                    function (response) {
                        input.maritalStatusList = response;

                        var single_object = $filter('filter')(response, function (d) {
                            return d.taxMarStatDesc === input.maritalStatus;
                        })[0];

                        input.maritalStatusValue = single_object;
                        $scope.recordsCnt++;
                        input.additionalAmount = input.addlAmount;
                        input.allowRequested = input.allowancesRequested;

                        var georgiaObj = $filter('filter')($scope.stateTaxWithholdings, function (d) {
                            return d.payDedCode === 'GA';
                        })[0];

                        if(georgiaObj){
                            $scope.havingGA = true;
                        }

                        if(input.payDedCode === 'GA'){
                            if(input.maritalStatusValue){
                                input.maritalStatusAllowance = input.maritalStatusValue.taxMaritalStat === 'M' ? [0,1,2] : [0,1];
                            }
                            else{
                                input.maritalStatusAllowance =[0,1];
                            }

                        }

                        if($scope.stateTaxWithholdings.length > 1 &&  $scope.havingGA && input.payDedCode !== 'GA'){
                            if(georgiaObj.maritalStatusValue){
                                input.maritalStatusAllowance = georgiaObj.maritalStatusValue.taxMaritalStat === 'M' ? [0,1,2] : [0,1];
                                input.maritalAllowance = input.allowancesRequested;
                                input.dependentAllowances = input.addlExempts;
                                $scope.taxWithHolingDataObject.push(input);
                            }
                            else {
                                var url = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                                    moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/" + georgiaObj.payDedCode;

                                gso.getCrudService().execute(constants.get, url, null,
                                    function (response) {
                                        input.maritalStatusList = response;

                                        var obj = $filter('filter')(response, function (d) {
                                            return d.taxMarStatDesc === georgiaObj.maritalStatus;
                                        })[0];
                                        if (obj) {
                                            input.maritalStatusAllowance = obj.taxMaritalStat === 'M' ? [0, 1, 2] : [0, 1];
                                        }
                                        else {
                                            input.maritalStatusAllowance = [0, 1]
                                        }

                                        input.maritalAllowance = input.allowancesRequested;
                                        input.dependentAllowances = input.addlExempts;
                                        $scope.taxWithHolingDataObject.push(input);
                                    });
                            }

                        }
                        else{
                            $scope.taxWithHolingDataObject.push(input);
                        }

                        if ($scope.stateTaxWithholdings.length === i + 1) {
                            generateLocalTaxObjectData(index, type);
                        }
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            });
        }

        function generateLocalTaxObjectData(index, type) {
            angular.forEach($scope.localTaxWithholdings, function (input) {
                $scope.taxWithHolingDataObject.push(input);
            });

            $scope.taxWithHoldingDataLength = $scope.taxWithHolingDataObject.length;
            $scope.taxWithHoldingDateLength = $scope.taxWithHoldingDataDetails.length;
            $scope.dataLoading = false;


        }


        /**
         * object data abd values
         * @param index
         * @param type
         */
        $scope.objectDataValues = function (index, type) {
            $scope.taxWithHolingObject = [];
            $scope.taxWithHolingDataObject = [];
            $scope.recordsCnt = 0;
            $scope.itemCnt = 0;
            $scope.itemsObject = [];

            $scope.selectedIndex = index;

            $scope.fedTaxWithholdings = $scope.taxWithHoldingDataDetails[index].FedTaxWithholdings;
            $scope.stateTaxWithholdings = $scope.taxWithHoldingDataDetails[index].StateTaxWithholdings;
            $scope.localTaxWithholdings = $scope.taxWithHoldingDataDetails[index].LocalTaxWithholdings;
            $scope.date_label = constants.currentlyEffective;
            if (angular.isDefined($scope.fedTaxWithholdings) && $scope.fedTaxWithholdings.length > 0) {
                generateFedTaxObjectData(index, type);
            } else {

                gso.getUtilService().toggleDIV('visibleView', false);

                customIdAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: money.defaultMessages.noRecordsFound
                };
                $scope.errorAlert = customIdAlert;

            }

        };


        /**
         * reset the alert
         * @param index
         */
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        $scope.warnState = function (stateCode) {
            $scope.errorAlert = {
                _statusCode: constants.warning,
                _statusMessage: money.taxWithHoldings.warnStateMsg[stateCode]
            };

        };
        /**
         * initialize tax with holding data
         */
        $scope.initTaxWithHoldingDataFn = function () {
            $scope.closeAlert();
            if (gso.getAppConfig().countryCode === 'CA') {
                $location.path("/taxForms");
            } else {

                if (SharedDataService.getAppSharedData().isLoaded) {
                    SharedDataService.getAppSharedData().isLoaded = false;
                    if (SharedDataService.getAppSharedData().response) {
                        $scope.errorAlert = SharedDataService.getAppSharedData().response;
                        SharedDataService.getAppSharedData().response = null;
                    }

                }

                var taxWithHoldingURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.taxWithholding + "/" + gso.getAppConfig().companyId + "/" + appUserId + moneyUrlConfig.resources.withHoldings;


                var isUserCompletesI9URL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.i9Status + "/" + appUserId;


                gso.getCrudService().execute(constants.get, taxWithHoldingURL, null,
                    function (response) {
                        $scope.taxWithHoldingDataDetails = response.taxWithHoldings;
                        $scope.affirmationText1 = response.affirmationText;
                        $scope.affirmationText2 = response.substantialText;

                        if ($scope.affirmationText1 && $scope.affirmationText2) {
                            $scope.affirmationText2 = money.taxWithHoldings.NonResidentConfirmationMsg;
                            $scope.nonResidentislDeclared = 'Y';
                        }


                        $scope.taxWithHoldingDateLength = $scope.taxWithHoldingDataDetails.length;

                        $scope.effectiveDate = gso.getUtilService().filterDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), constants.dateFormatUS);
                        customIdAlert = {};
                        if ($scope.taxWithHoldingDateLength > 0) {
                            $scope.noData = false;

                            angular.forEach($scope.taxWithHoldingDataDetails,function(taxWithHoldingData,index){
                                if(index === 0){
                                    $scope.dateMenuObject.push(constants.currentlyEffective);
                                }else{
                                    $scope.dateMenuObject.push(constants.effective+''+ $filter('date')(taxWithHoldingData.effectiveDate, 'MM/dd/yyyy'));
                                }
                            });
                            $scope.objectDataValues(0, 'cureff');
                        } else {
                            $scope.noData = true;
                            customIdAlert = {
                                _statusCode: '404',
                                _statusMessage: money.defaultMessages.noRecordsFound
                            };
                            $scope.errorAlert = customIdAlert;
                        }


                    },
                    function (data) {
                        $scope.errorAlert = data;
                        $scope.noData = true;
                    }
                );


                gso.getCrudService().execute(constants.get, isUserCompletesI9URL, null,
                    function (response) {
                        $scope.isUserCompletesI9Data = response;
                        customIdAlert = {};
                        if ($scope.isUserCompletesI9Data === 'N') {
                            $scope.i9DataValue = false;

                            customIdAlert = {
                                _statusCode: constants.warning,
                                _statusMessage: money.taxWithHoldings.i9StatusCheckingMsg
                            };
                            $scope.errorAlert = customIdAlert;

                        } else {
                            $scope.i9DataValue = true;

                        }
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );

            }

        };

        /**
         * initialize tax with holding data calling
         */

        $scope.initTaxWithHoldingDataFn();


        /**
         * alert event
         */
        $scope.$on('alertEvent', function (evnt, alert) {
            $scope.errorAlert = alert;
        });

        /**
         * items object event
         */
        $scope.$on('itemsObjectEvent', function (evnt, itemsObject) {
            $scope.itemsObject = itemsObject;
        });


        /**
         * data label event
         */
        $scope.$on('dataLabelEvent', function (evnt, effectiveDate) {
            $scope.date_label = 'Effective:' + gso.getUtilService().filterDate(effectiveDate, constants.dateFormatUS);
            $scope.futureEffectiveDate = gso.getUtilService().filterDate(effectiveDate, constants.dateFormatUS);
            $scope.dateMenuObject[0] = constants.currentlyEffective;
            $scope.dateMenuObject[1] = 'Effective:' + $scope.futureEffectiveDate;
            $scope.taxWithHoldingDataDisplay(1);
        });

        /**
         * TaxWithHoldings edit form
         */
        $scope.taxWithHoldingsEditForm = function () {
            $scope.visibletaxWithholdingsNew = !$scope.visibletaxWithholdingsNew;
            angular.forEach($scope.taxWithHolingDataObject, function (input, i) {
                var fedAllowanceMaritalStatusURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/" + input.payDedCode;
                gso.getCrudService().execute(constants.get, fedAllowanceMaritalStatusURL, null,
                    function (response) {
                        input.maritalStatusList = response;

                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );


                if (input.exempt === 'Yes') {
                    angular.element('#stateFld_' + i).attr('disabled', 'disabled');
                    angular.element('#stateMSFld_' + i).attr('disabled', 'disabled');
                    angular.element('.stateAllowancesReq_' + i).attr('disabled', 'disabled');
                    input.addlAmount = 0;
                    input.allowancesRequested = 0;
                    if (input.maritalStatusList) {
                        var single_object = $filter('filter')(input.maritalStatusList, function (d) {
                            return d.taxMaritalStat === 'S';
                        })[0];
                        input.maritalStatusValue = single_object;
                    }
                }
            });

            if ($scope.editFieldsDisabled) {
                $scope.$broadcast('editFieldsDisabledEvent', {
                    exempt: 'Yes',
                    type: 'F'
                });
            } else {
                $scope.$broadcast('editFieldsDisabledEvent', {
                    exempt: 'No',
                    type: 'F'
                });
            }

            if ($scope.errorAlert) {
                $scope.closeAlert();
            }


        };

        $scope.setNEStateAllowancesRequestedData = function(index){
            var taxWithHoldingData = $scope.taxWithHolingDataObject[index];
            if(taxWithHoldingData.type === 'Federal tax'){
                var neIndex = gso.getUtilService().getNEStateIndex($scope.taxWithHolingDataObject);
                if(neIndex !== -1){
                    $scope.taxWithHolingDataObject[neIndex].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                }

            }
        };

        $scope.setNEStateMaritalStatusData = function(index){
            var taxWithHoldingData = $scope.taxWithHolingDataObject[index];
            if(taxWithHoldingData.type === 'Federal tax'){
                var neIndex = gso.getUtilService().getNEStateIndex($scope.taxWithHolingDataObject);
                if(neIndex !== -1){
                    $scope.taxWithHolingDataObject[neIndex].maritalStatusValue = $scope.taxWithHolingDataObject[index].maritalStatusValue;
                }

            }
        };

        /**
         * allowance increase method
         * @param index
         */
        $scope.allowanceIncrease = function (index) {
            $scope.closeAlert();
            var obj = $scope.taxWithHolingDataObject[index];
            if (!angular.isDefined($scope.taxWithHolingDataObject[index].allowancesRequested)) {
                $scope.taxWithHolingDataObject[index].allowancesRequested = 0;
            }

            if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1) === 99) {
                customIdAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: money.taxWithHoldings.stateLockedMsg
                };
                $scope.errorAlert = customIdAlert;


                $scope.taxWithHolingDataObject[index].allowancesRequested++;


                if (($scope.taxWithHolingDataObject.length - 1) > index) {
                    if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax'){
                        $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                    }
                }

                $scope.taxWithHolingDataObject[index].exceedLimit = false;
                $scope.exceedLimit = false;
            }
            else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1) > 99 ||
                (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1) < 0) {

                if ($scope.taxWithHolingDataObject[index].allowancesRequested + 1 <= 999) {
                    $scope.taxWithHolingDataObject[index].allowancesRequested++;
                }
                $scope.taxWithHolingDataObject[index].exceedLimit = true;
                $scope.exceedLimit = true;


            } else {
                $scope.taxWithHolingDataObject[index].allowancesRequested++;
                $scope.flag = true;
                /** increase local tax range src */
                $scope.taxWithHolingDataObject[index].exceedLimit = false;
                $scope.exceedLimit = false;
                if (($scope.taxWithHolingDataObject.length - 1) > index) {
                    if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax'){
                        $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                        $scope.warnState(obj.payDedCode);
                    }
                }
            }
        };

        /**
         * allowance decrease method
         * @param index
         */
        $scope.allowanceDecrease = function (index) {
            $scope.closeAlert();

            var obj = $scope.taxWithHolingDataObject[index];

            if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) === 99) {
                customIdAlert = {
                    _statusCode: constants.warning,
                    _statusMessage: money.taxWithHoldings.stateLockedMsg
                };
                $scope.errorAlert = customIdAlert;

                if ($scope.taxWithHolingDataObject[index].allowancesRequested - 1 >= 0) {
                    $scope.taxWithHolingDataObject[index].allowancesRequested--;
                }

                $scope.taxWithHolingDataObject[index].exceedLimit = false;
                $scope.exceedLimit = false;

                /** increase local tax range src */
                if (($scope.taxWithHolingDataObject.length - 1) > index) {
                    if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax'){
                            $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                        }
                }


            } else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) > 99 ||
                (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) < 0) {
                if ($scope.taxWithHolingDataObject[index].allowancesRequested - 1 >= 0) {
                    $scope.taxWithHolingDataObject[index].allowancesRequested--;
                }
            } else {
                $scope.taxWithHolingDataObject[index].exceedLimit = false;
                $scope.exceedLimit = false;
                $scope.taxWithHolingDataObject[index].allowancesRequested--;
                $scope.flag = true;
                /** increase local tax range src */
                if (($scope.taxWithHolingDataObject.length - 1) > index) {
                    if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax'){

                        $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                        $scope.warnState(obj.payDedCode);
                    }
                }
            }
        };

        /**
         * check key method
         * @param e
         * @param index
         */
        $scope.checkKey = function (e, index) {
            $scope.closeAlert();
            e = e || window.event;
            if (e.keyCode === 38) {
                // up arrow
                $scope.allowanceIncrease(index);
            }
            else if (e.keyCode === 40) {
                // down arrow
                $scope.allowanceDecrease(index);
            } else {
                var obj = $scope.taxWithHolingDataObject[index];
                if (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) === 99) {
                    customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.taxWithHoldings.stateLockedMsg
                    };
                    $scope.errorAlert = customIdAlert;
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;

                    /** increase local tax range src */
                    if (($scope.taxWithHolingDataObject.length - 1) > index) {
                        if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax') {
                            $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                        }
                    }


                } else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10)) > 99 ||
                    (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10)) < 0) {

                    $scope.taxWithHolingDataObject[index].exceedLimit = true;
                    $scope.exceedLimit = true;
                } else {
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;

                    /** increase local tax range src */
                    if (($scope.taxWithHolingDataObject.length - 1) > index) {
                        if (constants.taxWithHoldings.statesToUpdateLocalTax.indexOf(obj.payDedCode) !== -1 && $scope.taxWithHolingDataObject[index + 1].type === 'Local tax') {
                                $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                                $scope.warnState(obj.payDedCode);
                            }
                    }
                }

            }
        };

        /**
         * fedral check key method
         * @param e
         * @param index
         */
        $scope.fedCheckKey = function (e, index) {
            $scope.closeAlert();

            e = e || window.event;
            if (e.keyCode === '38') {
                // up arrow
                $scope.allowanceFedIncrease(index);
            }
            else if (e.keyCode === '40') {
                // down arrow
                $scope.allowanceFedDecrease(index);
            } else {
                if (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) === 99) {
                    customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.taxWithHoldings.lockedMsg
                    };
                    $scope.errorAlert = customIdAlert;
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;
                    $scope.setNEStateAllowancesRequestedData(index);

                } else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10)) > 99 ||
                    (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10)) < 0) {

                    $scope.taxWithHolingDataObject[index].exceedLimit = true;
                    $scope.exceedLimit = true;
                } else {
                    $scope.setNEStateAllowancesRequestedData(index);
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;
                }

            }
        };

        /**
         * state check key method
         * @param e
         * @param index
         */
        $scope.stateCheckKey = function (e) {
            e = e || window.event;
            if (e.keyCode === '38') {
                // up arrow
                $scope.allowanceStateIncrease();
            }
            else if (e.keyCode === '40') {
                // down arrow
                $scope.allowanceStateDecrease();
            }
        };

        /**
         * allowance federal increase
         * @param index
         */
        $scope.allowanceFedIncrease = function (index) {
            $scope.closeAlert();
            if ($scope.taxWithHoldingDataLength === 0) {
                if ((parseInt($scope.fedRange, 10) + 1) < 99 || (parseInt($scope.fedRange, 10) + 1) > 0) {
                    $scope.fedRange++;
                    if (parseInt($scope.taxWithHoldingDataLength, 10) === 0 && $scope.flag === false) {
                        $scope.stateRange++;
                    }

                }
            } else {
                if (!angular.isDefined($scope.taxWithHolingDataObject[index].allowancesRequested)) {
                    $scope.taxWithHolingDataObject[index].allowancesRequested = 0;
                }
                if (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1 === 99) {
                    customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.taxWithHoldings.lockedMsg
                    };
                    $scope.errorAlert = customIdAlert;

                    $scope.taxWithHolingDataObject[index].allowancesRequested++;
                    $scope.setNEStateAllowancesRequestedData(index);

                    if ($scope.flag === false) {
                        if (parseInt($scope.taxWithHolingDataObject[index + 1].allowancesRequested, 10) === 0) {
                            if (!$scope.taxWithHolingDataObject[index + 1].exempt) {
                                $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                            }

                            $scope.tmpVar = true;
                        } else {
                            if ($scope.tmpVar) {
                                if (!$scope.taxWithHolingDataObject[index + 1].exempt) {
                                    $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                                }
                            }
                        }
                    }

                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;
                }
                else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1) > 99 ||
                    (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) + 1) < 0) {
                    if ($scope.taxWithHolingDataObject[index].allowancesRequested + 1 <= 999) {
                        $scope.taxWithHolingDataObject[index].allowancesRequested++;
                    }

                    $scope.taxWithHolingDataObject[index].exceedLimit = true;
                    $scope.exceedLimit = true;
                } else {
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;
                    $scope.taxWithHolingDataObject[index].allowancesRequested++;
                    $scope.setNEStateAllowancesRequestedData(index);

                    if ($scope.flag === false && ($scope.disableStateAllowances($scope.taxWithHolingDataObject[index + 1].payDedCode) || $scope.disableStateSection($scope.taxWithHolingDataObject[index + 1].payDedCode))) {
                        if (parseInt($scope.taxWithHolingDataObject[index + 1].allowancesRequested, 10) === 0) {
                            if (!$scope.taxWithHolingDataObject[index + 1].exempt) {
                                $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                            }
                            $scope.tmpVar = true;
                        } else {
                            if ($scope.tmpVar) {
                                if (!$scope.taxWithHolingDataObject[index + 1].exempt) {
                                    $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                                }
                            }
                        }
                    }
                }
            }
        };


        /**
         * allowance federal decrease
         * @param index
         */
        $scope.allowanceFedDecrease = function (index) {
            $scope.closeAlert();
            if ($scope.taxWithHoldingDataLength === 0) {
                if ((parseInt($scope.fedRange, 10) - 1) < 99 || (parseInt($scope.fedRange, 10) - 1) > 0) {
                    $scope.fedRange--;
                    if (parseInt($scope.taxWithHoldingDataLength, 10) === 0 && $scope.flag === false) {
                        $scope.stateRange--;
                    }
                }
            } else {
                if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) === 99) {
                    if ($scope.taxWithHolingDataObject[index].allowancesRequested - 1 >= 0) {
                        $scope.taxWithHolingDataObject[index].allowancesRequested--;
                        $scope.setNEStateAllowancesRequestedData(index);
                    }

                    customIdAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.taxWithHoldings.lockedMsg
                    };
                    $scope.errorAlert = customIdAlert;

                    if ($scope.flag === false) {
                        if (parseInt($scope.taxWithHolingDataObject[index + 1].allowancesRequested, 10) === 0) {
                            $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                            $scope.tmpVar = true;
                        } else {
                            if ($scope.tmpVar) {
                                $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                            }
                        }
                    }
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;


                } else if ((parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) > 99 ||
                    (parseInt($scope.taxWithHolingDataObject[index].allowancesRequested, 10) - 1) < 0) {
                    if ($scope.taxWithHolingDataObject[index].allowancesRequested - 1 >= 0) {
                        $scope.taxWithHolingDataObject[index].allowancesRequested--;
                        $scope.setNEStateAllowancesRequestedData(index);
                    }

                } else {
                    $scope.taxWithHolingDataObject[index].exceedLimit = false;
                    $scope.exceedLimit = false;
                    $scope.taxWithHolingDataObject[index].allowancesRequested--;
                    $scope.setNEStateAllowancesRequestedData(index);
                    if ($scope.flag === false && ($scope.taxWithHolingDataObject[index].allowancesRequested === 0 && ( $scope.disableStateAllowances($scope.taxWithHolingDataObject[index + 1].payDedCode) || $scope.disableStateSection($scope.taxWithHolingDataObject[index + 1].payDedCode)))) {
                        $scope.taxWithHolingDataObject[index + 1].allowancesRequested = $scope.taxWithHolingDataObject[index].allowancesRequested;
                    }
                }
            }
        };

        /**
         * allowance state increase
         */
        $scope.allowanceStateIncrease = function () {
            if ((parseInt($scope.stateRange, 10) + 1) < 99 || (parseInt($scope.stateRange, 10) + 1) > 0) {
                $scope.stateRange++;
                $scope.flag = true;
            }
        };

        /**
         * allowance state decrease
         */
        $scope.allowanceStateDecrease = function () {
            if ((parseInt($scope.stateRange, 10) - 1) < 99 || (parseInt($scope.stateRange, 10) - 1) > 0) {
                $scope.stateRange--;
                $scope.flag = true;
            }
        };

        /**
         * close method
         */
        $scope.close = function () {
            gso.getNGDialog().closeAll('$closeButton');
        };

        /**
         * open new tab function
         * @param url
         */
        function openInNewTab(url) {
            window.open("http://" + window.location.hostname + url, '_blank');
        }


        /**
         * taxwith holdings data display method
         * @param val
         */
        $scope.taxWithHoldingDataDisplay = function (index) {

            $scope.objectDataValues(index, 'cureff');
            $scope.date_label = $scope.dateMenuObject[index];
        };

        /**
         * change the address method
         */
        $scope.changeAddress = function () {
            window.location = '#/profile/profile';
            setTimeout(function () {
                var newHash = 'homeAddress';
                if ($location.hash() !== newHash) {
                    $location.hash('homeAddress');
                } else {
                    $anchorScroll();
                }
            }, 500);
        };

    $scope.showAllStateForms = function (index) {
        $scope.stateData = {};
        var taxWithHoldingData = $scope.taxWithHolingDataObject[index];
        $scope.stateData = taxWithHoldingData;
        gso.getNGDialog().open({
            templateUrl: 'app/components/money/taxWithHolding/taxWithHoldingStateFormsModelView.html',
            scope: $scope,
            closeByDocument: false,
            closeByEscape: false
        });
    };

    $scope.georgiaSpecificFieldsVisibility = function(index){
        var georgiaObj = $filter('filter')($scope.stateTaxWithholdings, function (d) {
            return d.payDedCode === 'GA';
        })[0];

        if(georgiaObj) {
            return true;
        }
        else{
            return false;
        }
    }

    }]);
trinetApp.directive('onlyDigits', function () {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            function inputValue(val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');
                    if (digits !== val) {
                        digits = digits.trim();
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return digits;
                }
                return '';
            }

            ctrl.$parsers.push(inputValue);
        }
    };
});


trinetApp.directive('onlyDecimals', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                var clean = val.replace(/[^0-9.]/g, '');
                var decimalCheck = clean.split('.');


                if (!angular.isUndefined(decimalCheck[0])) {
                    // As to make parity with legacy for pre and post tax
                    if(attrs.name === "postFlatDollarAmt" || attrs.name === "flatDollarAmt") {
                        decimalCheck[0] = decimalCheck[0].slice(0, 6);
                        clean = decimalCheck[0];
                    }
                    else{
                        decimalCheck[0] = decimalCheck[0].slice(0, 5);
                        clean = decimalCheck[0];
                    }
                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

trinetApp.directive('onlyPercentageDecimals', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    val = '';
                }

                var clean = val.replace(/[^0-9.]/g, '');
                var decimalCheck = clean.split('.');


                if (!angular.isUndefined(decimalCheck[0])) {
                    decimalCheck[0] = decimalCheck[0].slice(0, 3);
                    clean = decimalCheck[0];
                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 3);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});
