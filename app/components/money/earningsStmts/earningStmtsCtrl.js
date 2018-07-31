'use strict';
trinetApp.controller('earningStmtsCtrl', ['$scope','gso', '$http','sharedProperties', 
    function ($scope, gso, $http,sharedProperties) {
            $scope.errorAlert = null;
            $scope.noRecordsAlert = null;
            $scope.payFrame = false;
            $scope.w2Url = "#/ssowidget/jat";
            var successRes=[];
            $scope.noPercentStates = ['CT', 'DC', 'DE', 'HI', 'KY', 'LA', 'MA', 'MS', 'NJ', 'PR', 'UT'];
            $scope.symmetryPaycheckCityInfo = {
                "style": {"body": {"background-color": "#ebebec"}, "labels": {"color": "#f47b2a"}},
                "model": {}
            };

            var appUserId = '', resultTo = '', resultFrom = '', keyCode;
            var env = "";

            $scope.setUserId = function (empId) {
                if (empId !== undefined) {
                    appUserId = gso.getRouteParams().empId;
                } else {
                    appUserId = gso.getAppConfig().userId;
                }
            };

            $scope.setUserId(gso.getRouteParams().empId);
            //Added if condition to check null expression.
            if (gso.getUtilService().getEnvironmentFromLocation() !== null) {
                env = gso.getUtilService().getEnvironmentFromLocation().toLowerCase();
            }
            $scope.currentDate = new Date();
            $scope.isToolTipVisible = true;
            $scope.compensationPriYear = "https://hrpbib.hrpassport.com/apps/docviewer/docviewer.aspx?UserPersonid=" + appUserId + "&Company=" + gso.getAppConfig().companyId + "&Sessionid=" + gso.getUtilService().getCookie() + "&appIdentifier=TCSYearly&yearRequested=" + $scope.currentDate.getFullYear + "&fileIdentifier=" + appUserId + "&fileType=.pdf";
            $scope.compensationSecYear = "https://hrpbib.hrpassport.com/apps/docviewer/docviewer.aspx?UserPersonid=" + appUserId + "&Company=" + gso.getAppConfig().companyId + "&Sessionid=" + gso.getUtilService().getCookie() + "&appIdentifier=TCSDocPath&fileIdentifier=" + appUserId + "&fileType=.pdf";
            $scope.runAsCustom = sharedProperties.reportsuiBaseUrl + "/UIGateway.jsp?params=" + gso.getUtilService().getCookie() + "&reportserver=https://reporting" + env + ".hrpassport.com&rSvr=" + sharedProperties.platformUrl + "&tsession=" + gso.getUtilService().getCookie() + "&cid=" + gso.getAppConfig().companyId + "&source=TCS";

            $scope.chooseOptions = [
                {
                    name: 'All',
                    value: 'all'
                },
                {
                    name: 'This Year',
                    value: '1'
                },
                {
                    name: 'Last 3 Months',
                    value: '3'
                },
                {
                    name: 'Last 6 Months',
                    value: '6'
                },
                {
                    name: 'Last Year',
                    value: '-1'
                },
                {
                    name: 'Date Range',
                    value: 'date'
                }
            ];
            $scope.chooseOption = $scope.chooseOptions[2];
            $scope.lastYear = $scope.currentDate.getFullYear() - 1;
            $scope.secondlastYear = $scope.currentDate.getFullYear() - 2;
            $scope.w2LableName = null;

            $scope.setw2LableName = function (countryCode) {
                if (countryCode === 'CA') {
                    $scope.w2LableName = 'View T4';
                } else {
                    $scope.w2LableName = 'View W-2';
                }
            };

            $scope.setw2LableName(gso.getAppConfig().countryCode);


            /**
             * key board press event
             * @param $event
             */
            $scope.keyboardPress = function ($event) {
                $scope.errorAlert = null;

                keyCode = $event.which || $event.keyCode;
                if (keyCode === 67) {
                    $scope.errorAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: money.defaultMessages.copyMsg
                    };
                }
            };


            /**
             * toggle the on/off
             */
            $scope.onOFF = function () {
                if (angular.element('#myonoffswitch1').val() === 'true') {
                    angular.element('.main-tools-block').addClass('Trinet-tool-tip');
                    angular.element('.earning-statement-document table').addClass('blue-hover');
                } else {
                    angular.element('.main-tools-block').removeClass('Trinet-tool-tip');
                    angular.element('.earning-statement-document table').removeClass('blue-hover');
                }
            };

            /**
             * fetch the earning statements data
             */
            $scope.fetchEarnStmtData = function () {
                var dateStringData = $scope.dateString;
                $scope.earningData = [];
                $scope.closeAlert();
                var URL;
                if ($scope.value !== 'all') {

                    URL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                        moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                        appUserId + moneyUrlConfig.resources.payChecks + "?" + dateStringData;

                } else {
                    URL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                        moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                        appUserId + moneyUrlConfig.resources.payChecks;
                }

                gso.getCrudService().execute(constants.get, URL, null,
                    function (response) {
                        if (response._statusCode && response._statusCode === '404') {
                            $scope.errorAlert = response;
                        }
                        $scope.earningData = response.checkSummaries;
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );

            };


            /***
             *  Func: An api call for getting compensation statements.
             */
            $scope.getCompensationStatements = function () {
                var getCompensationStatements = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                    appUserId + moneyUrlConfig.resources.compensationStatement;

                gso.getCrudService().execute(constants.get, getCompensationStatements, null, function (successRes) {
                    if (successRes._statusCode==="200")
                    {
                        var obj = {
                            label: 'Custom Statement',
                            url: '#/compensation'
                        };
                        successRes.push(obj);
                        $scope.compensationStatementsData = successRes;
                    }
                }, function (errRes) {
                    $scope.errorAlert = errRes;
                });
            };


            /**
             * fetch the earning statements data based on param
             * @param val
             */
            $scope.selectValue = function (val) {
                $scope.effectiveDate = '';
                $scope.effectiveSecDate = '';
                $scope.value = val.toString();
                var currentDate = $scope.currentDate,
                    yyyy = currentDate.getFullYear(),
                    endDate = new Date(),
                    startDate = new Date();
                switch ($scope.value) {
                    case 'all' :
                        $scope.result = 'all';
                        break;
                    case '1' :
                        yyyy = currentDate.getFullYear();
                        resultTo = yyyy + '-' + '12' + '-' + '31';
                        resultFrom = yyyy + '-' + '01' + '-' + '01';
                        break;
                    case '3' :
                        // Month to Month to calculation
                        /*endDate.setMonth(new Date().getMonth()-1);
                         startDate.setMonth(new Date().getMonth()-3);

                         resultTo = endDate.moveToLastDayOfMonth().toString("yyyy-MM-dd");
                         resultFrom = startDate.moveToFirstDayOfMonth().toString("yyyy-MM-dd");*/

                        // Date to date calculation

                        resultTo = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                        var lastDateThree = new Date().setMonth(new Date().getMonth() - 3);
                        resultFrom = gso.getUtilService().filterDate(lastDateThree, constants.dateFormat);

                        break;
                    case '6' :
                        // Month to Month to calculation
                        /*endDate.setMonth(new Date().getMonth()-1);
                         startDate.setMonth(new Date().getMonth()-6);

                         resultTo = endDate.moveToLastDayOfMonth().toString("yyyy-MM-dd");
                         resultFrom = startDate.moveToFirstDayOfMonth().toString("yyyy-MM-dd");*/

                        // Date to date calculation
                        resultTo = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                        var lastDateSix = new Date().setMonth(new Date().getMonth() - 6);
                        resultFrom = gso.getUtilService().filterDate(lastDateSix, constants.dateFormat);

                        break;
                    case '-1' :
                        yyyy = currentDate.getFullYear() - 1;
                        resultTo = yyyy + '-' + '12' + '-' + '31';
                        resultFrom = yyyy + '-' + '01' + '-' + '01';
                        break;
                    case 'date' :
                        $scope.earningData = '';
                        resultFrom = '';
                        resultTo = '';
                        break;
                    default:
                }
                $scope.dateString = 'endDate' + '=' + resultTo + '&' + 'startDate=' + resultFrom;
                if ($scope.value !== 'date') {
                    $scope.fetchEarnStmtData();
                }
            };

            $scope.checkStartAndEndDateValidation = function (startDate, endDate) {
                var errMessage = '';

                if (new Date(startDate) > new Date(endDate)) {
                    errMessage = 'End Date should be greater than start date';
                }
                return errMessage;
            };


            $scope.closeAlert = function () {
                $scope.errorAlert = null;
            };

            /**
             * date range function
             */
            $scope.runDateRange = function () {
                $scope.closeAlert();
                var resultFrom,
                    resultTo,
                    effectiveDateFrom = angular.element('#earning_effectivefrom').val(),
                    effectiveDateTo = angular.element('#earning_effectiveto').val(),
                    customIdAlert;


                if (effectiveDateFrom && effectiveDateTo) {
                    var message = $scope.checkStartAndEndDateValidation(effectiveDateFrom, effectiveDateTo);
                    if (message.length > 0) {
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: message
                        };
                        $scope.errorAlert = customIdAlert;
                    } else {
                        resultFrom = gso.getUtilService().filterDate(new Date(effectiveDateFrom), constants.dateFormat);
                        resultTo = gso.getUtilService().filterDate(new Date(effectiveDateTo), constants.dateFormat);
                        $scope.dateString = 'endDate' + '=' + resultTo + '&' + 'startDate' + '=' + resultFrom;
                        $scope.fetchEarnStmtData();
                    }


                } else {

                    if (!effectiveDateFrom) {
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Please enter start date'
                        };
                        $scope.errorAlert = customIdAlert;
                    }

                    if (!effectiveDateTo) {
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Please enter end date'
                        };
                        $scope.errorAlert = customIdAlert;
                    }

                    if (!effectiveDateFrom && !effectiveDateTo) {
                        customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'Please enter start and end dates'
                        };
                        $scope.errorAlert = customIdAlert;
                    }


                }

            };

            $scope.$on('ngDialog.closed', function () {
                angular.element('body').removeClass('earningStmtPopup');
            });

            /**
             * view the details of earning statements
             * @param indexValue
             */
            $scope.viewDetails = function (indexValue) {

                var body = angular.element('body');

                body.addClass('earningStmtPopup');

                gso.getNGDialog()
                    .open({
                        template: 'app/components/money/earningsStmts/earningStmtsModelView.html',
                        scope: $scope,
                        closeByDocument: false
                    });

                $scope.index = indexValue;
                $scope.earningpayGroup = $scope.earningData[$scope.index].checkKey.payGroup;
                $scope.earningpayoffCycle = $scope.earningData[$scope.index].checkKey.offCycle;
                $scope.earningpaysepChk = $scope.earningData[$scope.index].checkKey.sepChk;
                $scope.earningpaylineNo = $scope.earningData[$scope.index].checkKey.lineNo;
                $scope.earningpaypageNo = $scope.earningData[$scope.index].checkKey.pageNo;
                $scope.earningpaypayEndDt = $scope.earningData[$scope.index].checkKey.payEndDt;
                $scope.earningpayeffDt = $scope.earningData[$scope.index].checkKey.effDt;

                var viewDetailsData = $scope.earningpayGroup + '_' +
                    $scope.earningpayoffCycle + '_' +
                    $scope.earningpaypayEndDt + '_' +
                    $scope.earningpaypageNo + '_' +
                    $scope.earningpaylineNo + '_' +
                    $scope.earningpaysepChk + '_' +
                    $scope.earningpayeffDt;


                var viewDetailsURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                    appUserId + moneyUrlConfig.resources.payCheckDetails + "/" + viewDetailsData;

                gso.getCrudService().execute(constants.get, viewDetailsURL, null,
                    function (response) {
                        $scope.earningvalueData = response;
                        var peoAddress = "";
                        if($scope.earningvalueData.header.companyObj == null ){
                            peoAddress = "TriNet HR Corporation, 1100 San Leandro Blvd, Suite #400, San Leandro, CA 94577";
                        }else{
                            peoAddress = $scope.earningvalueData.header.companyObj;
                        }
                        $scope.earningvalueData['peoAddress'] = peoAddress.split(",");
                        // peoAddress[1] for example like Inc or Inc. or Ltd then return true else false
                        $scope.earningvalueData['peoAbbreviateName'] = $scope.earningvalueData['peoAddress'][1].length <= 4 ? true : false;
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            };


            /**
             * print the pdf
             */
            $scope.printPdf = function () {
                $http.get("/api-money/v1/payroll/" + gso.getAppConfig().companyId + "/" + appUserId + "/paycheck-details-pdf/" + $scope.earningpayGroup + '_' + $scope.earningpayoffCycle + '_' + $scope.earningpaypayEndDt + '_' + $scope.earningpaypageNo + '_' +
                    $scope.earningpaylineNo + '_' + $scope.earningpaysepChk + '_' + $scope.earningpayeffDt, {responseType: 'arraybuffer'})
                    .success(function (data) {
                        var file = new Blob([data], {type: 'application/pdf'});
                        var fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    });
            };

            $scope.getPaycheckCity = function () {

                var getCompensationStatements = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                    appUserId + moneyUrlConfig.resources.payCheckCity;

                gso.getCrudService().execute(constants.get, getCompensationStatements, null, function (successRes) {
                    $scope.isShowPayrollEstimate = true;
                    /* Removing the special characters from deductionName */
                    if(successRes.voluntaryDeductions && successRes.voluntaryDeductions.length > 0){
                        successRes.voluntaryDeductions.map(function(item){
                            item.deductionName = item.deductionName.replace(/[^a-zA-Z0-9 ]/g,'');
                            return item;
                        });
                    }
                   (successRes.voluntaryDeductions && successRes.voluntaryDeductions.length > 0)  ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.voluntaryDeductions,'voluntaryDeductions',false))   : angular.noop();
                   (successRes.stateValues && successRes.stateValues.length > 0 ) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.stateValues,'stateValues',true))   : angular.noop();
                   successRes.locale ? angular.extend(successRes,gso.getUtilService().mapData(successRes.locale,'locale'))   : angular.noop();
                   successRes.print ? angular.extend(successRes,gso.getUtilService().mapData(successRes.print,'print'))   : angular.noop();
                   (successRes.otherIncome && successRes.otherIncome.length > 0) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.otherIncome,'otherIncome',false))   : angular.noop();
                   (successRes.rates && successRes.rates.length > 0) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.rates,'rates',false))   : angular.noop();

                   successRes['voluntaryDeductions'] ? delete successRes['voluntaryDeductions'] : angular.noop();
                   successRes['stateValues'] ? delete successRes['stateValues'] : angular.noop();
                   successRes['locale'] ? delete successRes['locale'] : angular.noop();
                   successRes['otherIncome'] ? delete successRes['otherIncome'] : angular.noop();
                   successRes['print'] ? delete successRes['print'] : angular.noop();
                   successRes['rates'] ? delete successRes['rates'] : angular.noop();

                    $scope.symmetryPaycheckCityInfo["model"] = successRes;

                    var currentState = $scope.symmetryPaycheckCityInfo.model.state;
                    $scope.symmetryCalculators = [
                        {name: 'symmetry-salary', title: $scope.translation.money.earnings_statements['sal-paycheck-cal']},
                        {name: 'symmetry-hourly', title: $scope.translation.money.earnings_statements['hour-paycheck-cal']},
                        {name: 'symmetry-gross-up', title: $scope.translation.money.earnings_statements['gross-up-cal']}
                    ];

                    $scope.isBonusPayAggregate = $scope.noPercentStates.indexOf(currentState) >= 0 ? true : false;
                    $scope.isBonusPayAggregate ? $scope.symmetryCalculators.splice(2, 0, {
                            name: 'symmetry-bonus-pay-aggregate',
                            title: $scope.translation.money.earnings_statements['bonus-cal']
                        })
                        : $scope.symmetryCalculators.splice(2, 0, {
                            name: 'symmetry-bonus-pay-percent',
                            title: $scope.translation.money.earnings_statements['bonus-percent-cal']
                        });

                },function (data) {
                    $scope.isShowPayrollEstimate = false;
                    });
            };


            /**
             * fetch the earning statements data based on param function calling
             */
            $scope.selectValue(3);
            $scope.getCompensationStatements();
            $scope.getPaycheckCity();

            $scope.hideCalc = function () {
                $scope.payFrame = !$scope.payFrame;
            };


            /**
             * Func: An api call for getting estimated pays urls.
             */

            $scope.toggleSymmetryVisibility = function (selectedSymmetry, event) {
                event.preventDefault();
                $scope.payFrame = true;
                $scope.selectedSymmetryCalc = selectedSymmetry;
            };

    }]);
