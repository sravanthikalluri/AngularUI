'use strict';
trinetApp.controller('editCtrl', ['$scope','gso','$filter','$timeout','SharedDataService',function ($scope,gso,$filter,$timeout,SharedDataService) {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        var appUserId = $scope.appUserId, single_object;
        $scope.maritalList = null;
        $scope.getmaritalList = null;
        $scope.maxlength = constants.maxlength;
        $scope.editFieldsDisabled = $scope.editStateFieldsDisabled = false;
        $scope.fedAmnt = 0;
        $scope.hideSP = true;

        /* payroll dates variables start */

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['MM/dd/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
       function setMinDate(){
         if($scope.date_label === constants.currentlyEffective){
            $scope.minDate =  $scope.nextEffectiveDate = new Date();
         }else{
            var effArray =  $scope.date_label.split(' ');
            $scope.minDate = $scope.nextEffectiveDate = effArray[1];
         }
       }

       setMinDate();

        /* payroll dates variables end */

        /**
         * change method
         * @param confirmed
         * @param index
         * @param type
         * @param obj
         */
        $scope.change = function (confirmed, index, type, obj) {

            if (obj) {
                if (confirmed === 'Yes' && type === 'F') {
                    if (index === 0) {
                        $scope.editFieldsDisabled = true;
                    }
                    else if (index === 1) {
                        $scope.editStateFieldsDisabled = true;
                    }

                    angular.element('.federalAllowancesReq_' + index).attr('disabled', 'disabled');

                    obj.additionalAmount = 0;
                    if(!$scope.disableStateAllowances(obj.payDedCode)){
                        obj.allowancesRequested = 0;
                        if (index === 0) {
                            $scope.setNEStateAllowancesRequestedData(index);
                        }
                        var maritalStatusURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                            moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/" + $scope.taxWithHolingDataObject[index].payDedCode;

                        gso.getCrudService().execute(constants.get, maritalStatusURL, null,
                            function (maritalStatus) {
                                $scope.maritalList = maritalStatus;
                                if ($scope.maritalList !== null) {
                                    $scope.maritalStatusData[index] = $scope.maritalList;
                                    single_object = $filter('filter')($scope.maritalStatusData[index], function (d) {
                                        return d.taxMaritalStat === 'S';
                                    })[0];
                                    obj.maritalStatusValue = single_object;
                                    if (index === 0) {
                                        $scope.setNEStateMaritalStatusData(index);

                                    }
                                }
                            },
                            function (data) {
                                $scope.$emit('alertEvent', data);

                            }
                        );
                    }


                }
                else if (confirmed === 'No' && type === 'F') {
                    $scope.editFieldsDisabled = false;
                    $scope.editStateFieldsDisabled = false;
                    angular.element('.federalAllowancesReq_' + index).attr('disabled', '');
                    if(!$scope.disableStateAllowances(obj.payDedCode)) {
                        obj.maritalStatusValue = $scope.taxWithHolingDataObject[index].maritalStatusList[0];
                        obj.allowancesRequested = obj.allowRequested;
                        if (index === 0) {
                            $scope.setNEStateAllowancesRequestedData(index);
                            $scope.setNEStateMaritalStatusData(index);
                        }
                    }

                }
                else if (confirmed === 'Yes' && type === 'S') {
                    angular.element('#state_tax_' + index).attr('disabled', 'disabled');
                    if(!$scope.disableStateAllowances(obj.payDedCode)) {
                        angular.element('#state_tax_mS_' + index).attr('disabled', 'disabled');
                        angular.element('.stateAllowancesReq_' + index).attr('disabled', 'disabled');

                        $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[index].maritalStatusList;
                        if(obj.payDedCode === 'AR'){
                            single_object = $filter('filter')($scope.maritalStatusData[index], function (d) {
                                return d.taxMaritalStat === 'T';
                            })[0];
                        }else{
                            single_object = $filter('filter')($scope.maritalStatusData[index], function (d) {
                                return d.taxMaritalStat === 'S';
                            })[0];
                        }
                        if(single_object){
                            obj.maritalStatusValue = single_object;
                        }
                        if($scope.havingGA){
                             angular.element('#state_tax_maritalAllowance_' + index).attr('disabled', 'disabled');
                             obj.maritalAllowance = 0;
                        }
                        obj.allowancesRequested = 0;
                    }
                    obj.additionalAmount = 0;

                }
                else if (confirmed === 'No' && type === 'S') {
                    if (document.getElementById('state_tax_' + index) !== null) {
                        document.getElementById('state_tax_' + index).removeAttribute('disabled');
                    }
                    angular.element('.stateAllowancesReq_' + index).attr('disabled', '');
                    if(!$scope.disableStateAllowances(obj.payDedCode)) {
                        if (document.getElementById('state_tax_mS_' + index) !== null) {
                            document.getElementById('state_tax_mS_' + index).removeAttribute('disabled');
                        }



                        obj.allowancesRequested = obj.allowRequested;
                        obj.maritalStatusValue = $scope.taxWithHolingDataObject[index].maritalStatusList[0];
                    }
                    if($scope.havingGA){
                        document.getElementById('state_tax_maritalAllowance_' + index).removeAttribute('disabled');
                    }
                }
            }
        };

        /**
         * tax with holdings save method
         */
        $scope.taxWithHoldingSaveData = function () {
            $scope.submitted = true;
            var isCheckMarriedFileSingle = true;
            $scope.message = money.taxWithHoldings.residentConfirmationMsg;
            if ($scope.nonResidentislDeclared === 'Y') {
                $scope.message = $scope.affirmationText1 + '<br/>' + $scope.affirmationText2;
            }

            angular.forEach($scope.taxWithHolingDataObject, function (input) {
                if (input.marriedFileSingle && input.maritalStatusValue.taxMaritalStat === 'M') {
                    isCheckMarriedFileSingle = false;
                }
            });

            if (isCheckMarriedFileSingle) {
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/taxWithholdingConfirmation.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            } else {
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: money.taxWithHoldings.marriedFillingSingleMsg
                };
                $scope.$emit('alertEvent', customIdAlert);


            }

        };

        $scope.hideSPTest = function () {
            $scope.hideSP = !$scope.hideSP;
        };

        $scope.openSPTest = function () {
            $scope.hideSP = false;
        };

        $scope.enableConfirm = function(){
            $scope.userForm = {};
            $scope.userForm.$pristine = false;
        };
        /**
         * cancel method
         */
        $scope.cancel = function () {
            if (!$scope.userForm.$pristine) {
                $scope.confirmMessage = money.defaultMessages.cancelChanges;
                $scope.yes_btn = "Yes, discard changes";
                $scope.no_btn = "No";
                gso.getNGDialog().openConfirm({
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(function () {
                    $scope.visibletaxWithholdingsNew = !$scope.visibletaxWithholdingsNew;
                    gso.getRoute().reload();

                }, function () {
                });
            } else {
                $scope.visibletaxWithholdingsNew = !$scope.visibletaxWithholdingsNew;
                gso.getRoute().reload();
            }


        };

        /**
         * save method
         */
        $scope.saveMethod = function () {
            var effDate = new Date(angular.element('#trinetTaxInputId').val());
            $scope.effDate = gso.getUtilService().filterDate(effDate, constants.dateFormat);

            $scope.range = '0';
            $scope.addamt = constants.zeroDoublePrecision;
            $scope.exempt = 'N';
            $scope.maritalState = '';
            $scope.taxWithHoldingNewObject = [];
            $scope.fedTaxWithHoldingNewObject = [];
            $scope.stateTaxWithHoldingNewObject = [];
            $scope.localTaxWithHoldingNewObject = [];
            $scope.itemsObject = [];
            var count = 0;

            angular.forEach($scope.taxWithHolingDataObject, function (input, i) {

                if (input.exempt === 'Yes') {
                    $scope.exempt = 'G';
                    if (input.type.indexOf('State') !== -1) {
                        $scope.itemsObject.push({
                            ind: i
                        });
                    }
                } else {
                    $scope.exempt = 'N';
                }


                $scope.range = input.allowancesRequested;
                $scope.addamt = input.additionalAmount;

                if (input.type.indexOf('Federal') !== -1) {
                    var federalAmount = angular.element('input#addamount_' + i).val().substring(1);

                    if (!federalAmount) {
                        federalAmount = null;
                    }else{
                        federalAmount = federalAmount.replace(',','');
                    }

                    $scope.maritalState = input.maritalStatusValue.taxMaritalStat;
                    $scope.fedTaxWithHoldingNewObject.push(
                        {
                            'addlAmount': federalAmount,
                            'addlExempts': '0',
                            'allowancesRequested': $scope.range,
                            'payDedCode': input.payDedCode,
                            'relatedEntity': input.relatedEntity,
                            'desc': input.desc,
                            'exempt': $scope.exempt,
                            'marriedFileSingle': input.marriedFileSingle,
                            'maritalStatus': $scope.maritalState,
                            'type': input.type,
                            'payControlOrg': gso.getAppConfig().companyId,
                            'nonResidentIsDeclared': null,
                            'exemptNoAppendTxt': null,
                            'dependentAllowances': input.dependentAllowances,
                            'maritalAllowance': input.maritalAllowance
                        }
                    );


                } else if (input.type.indexOf('State') !== -1) {
                    count ++;
                    var stateAmount = angular.element('input#state_tax_' + i).val().substring(1);
                    if (!stateAmount) {
                        stateAmount = null;
                    }else{
                        stateAmount = stateAmount.replace(',','');
                    }

                    $scope.maritalState = input.maritalStatusValue.taxMaritalStat;

                        $scope.stateTaxWithHoldingNewObject.push(
                            {
                                'addlAmount': stateAmount,
                                'addlExempts': '0',
                                'allowancesRequested': $scope.range,
                                'payDedCode': input.payDedCode,
                                'relatedEntity': input.relatedEntity,
                                'desc': input.desc,
                                'exempt': $scope.exempt,
                                'marriedFileSingle': input.marriedFileSingle,
                                'maritalStatus': $scope.maritalState,
                                'type': input.type,
                                'payControlOrg': gso.getAppConfig().companyId,
                                'nonResidentIsDeclared': null,
                                'exemptNoAppendTxt': null,
                                'dependentAllowances': input.dependentAllowances,
                                'percentageGross': input.percentageGross,
                                'annualExemptionAmount': input.annualExemptionAmount,
                                'maritalAllowance': input.maritalAllowance
                            });

                    var georgiaObj = $filter('filter')($scope.taxWithHolingDataObject, function (d) {
                        return d.payDedCode === 'GA';
                    })[0];

                    if(count > 1 && georgiaObj){
                        var otherThanGA = $filter('filter')($scope.stateTaxWithHoldingNewObject, function (d) {
                            return d.payDedCode !== 'GA';
                        })[0];

                        otherThanGA.addlExempts = otherThanGA.dependentAllowances;
                        otherThanGA.allowancesRequested = otherThanGA.maritalAllowance;
                    }

                } else if (input.type.indexOf('Local') !== -1) {

                    var localAmount = angular.element('label#localTax_allowancesRequested_' + i).text();

                    if (!localAmount) {
                        localAmount = null;
                    }else{
                        localAmount = localAmount.replace(',','');
                    }

                     $scope.localTaxWithHoldingNewObject.push(
                         {
                             'addlAmount': localAmount,
                             'addlExempts': '0',
                             'allowancesRequested': $scope.range,
                             'payDedCode': input.payDedCode,
                             'relatedEntity': input.relatedEntity,
                             'desc': input.desc,
                             'exempt': $scope.exempt,
                             'marriedFileSingle': input.marriedFileSingle,
                             'maritalStatus': null,
                             'type': input.type,
                             'payControlOrg': gso.getAppConfig().companyId,
                             'nonResidentIsDeclared': null,
                             'exemptNoAppendTxt': null,
                             'dependentAllowances': input.dependentAllowances,
                             'percentageGross': input.percentageGross,
                             'annualExemptionAmount': input.annualExemptionAmount,
                             'maritalAllowance': input.maritalAllowance
                         });
                }
            });
            if ($scope.fedTaxWithHoldingNewObject.length === 0) {
                $scope.fedTaxWithHoldingNewObject = null;
            }
            if ($scope.stateTaxWithHoldingNewObject.length === 0) {
                $scope.stateTaxWithHoldingNewObject = null;
            }
            if ($scope.localTaxWithHoldingNewObject.length === 0) {
                $scope.localTaxWithHoldingNewObject = null;
            }


            $scope.$emit('itemsObjectEvent', $scope.itemsObject);
            $scope.taxWithHoldingNewObject = {
                'effectiveDate': $scope.effDate,
                'FedTaxWithholdings': $scope.fedTaxWithHoldingNewObject,
                'StateTaxWithholdings': $scope.stateTaxWithHoldingNewObject,
                'LocalTaxWithholdings': $scope.localTaxWithHoldingNewObject
            };

            var updateURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + gso.getAppConfig().companyId + "/" +
                appUserId + moneyUrlConfig.resources.withHoldings;


            gso.getCrudService().execute(constants.put, updateURL, $scope.taxWithHoldingNewObject,
                function (response) {
                    $scope.$emit('dataLabelEvent', $scope.effDate);
                    SharedDataService.getAppSharedData().isLoaded = true;
                    SharedDataService.getAppSharedData().response = response;
                    gso.getNGDialog().closeAll('$closeButton');

                    gso.getRoute().reload();

                },
                function (data) {
                    $scope.$emit('alertEvent', data);
                    gso.getNGDialog().closeAll('$closeButton');
                }
            );

        };


        /**
         * edit fields disabled event
         */
        $scope.$on('editFieldsDisabledEvent', function (e, data) {
            $scope.change(data.exempt, 0, data.type, data);
        });


        /* payroll dates logic start */

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };


        $scope.disabled = function (date, mode, elem) {
            //Disable prev button in date picker
            $timeout(function () {
                var callHead = angular.element(elem + ' .cal-head'),
                    monthName = callHead.find('strong').text();

                if (typeof monthName !== 'undefined') {
                    var navDate = monthName.split(' '),
                        navMonth = new Date(Date.parse(navDate[0] + ' 1, '+navDate[1])).getMonth();
                    if (parseInt(navDate[1], 10) <= new Date().getFullYear() && navMonth <= new Date().getMonth()) {
                        angular.element(elem + ' .cal-head th:first').find('button').css('visibility', 'collapse');
                    } else {
                        angular.element(elem + ' .cal-head th:first').find('button').css('visibility', 'visible');
                    }
                }

            }, 250);

            return false;

        };



        /* payroll dates logic end */


        /**
         *
         * @param index
         */
        $scope.checkMarriedFileSingle = function (index) {
            var taxWithHoldingData = $scope.taxWithHolingDataObject[index];
            $scope.setNEStateMaritalStatusData(index);
            if (taxWithHoldingData.marriedFileSingle && taxWithHoldingData.maritalStatusValue.taxMaritalStat !== 'S') {
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: money.taxWithHoldings.marriedFillingSingleMsg
                };
                $scope.$emit('alertEvent', customIdAlert);
            }
            else{
                taxWithHoldingData.maritalStatusAllowance = taxWithHoldingData.maritalStatusValue.taxMaritalStat === 'M' ? [0,1,2] : [0,1];
            }
        };

        /**
         *
         * @param value
         * @param elemId
         */
        $scope.allowancesRequestedChange = function (value, elemId) {
            if (value.allowancesRequested === undefined) {
                value.allowancesRequested = 0;
            } else {
                angular.element('#' + elemId).val(value.allowancesRequested);
            }
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


    $scope.disableMaritalStatusAllowance = function(item) {
        var statesDisabled = {
            'TX': true,
            'TN': true,
            'True': true
        }
        if (item.exempt === 'Yes' && !statesDisabled[item.payDedCode]) {
            return true;
        }
        else {
            return statesDisabled[item.payDedCode] === true ? true : false;
        }
    }

    }]);
