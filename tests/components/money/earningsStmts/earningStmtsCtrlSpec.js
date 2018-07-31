describe('Earning Stmts Controller Testing', function () {

    var $rootScope, $scope, $httpBackend, appConfig, val, currentDate, dd, yyyy, lastmm, mm, months, valToString;
    var $routeParams;
    var earningResource = {
        "nextCheckIssueDate": "2015-10-15",
        "nextCheckDt": "2015-10-15",
        "checkSummaries": [{
            "netPay": 2782.32,
            "checkIssueDate": "2015-06-15",
            "checkDt": "2015-06-15",
            "checkKey": {
                "payGroup": "S0",
                "payPeriodEndDate": "2015-06-15",
                "payEndDt": "2015-06-15",
                "pageNo": "3",
                "lineNo": "1",
                "sepChk": "0",
                "offCycle": "N",
                "effDt": "2014-10-01"
            },
            "checkNumber": "17220457",
            "link": {
                "rel": "paycheck",
                "href": "http://172.31.47.207/api-money/v1/paychecks/paycheck?payGroup=S0&payEndDate=2015-06-15&pageNo=3&lineNo=1&sepChk=0&offCycle=N&effDate=2014-10-01"
            }
        }],
        "link": null
    };
    var viewDetails = {
        "header": {
            "peoDesc": "For payroll inquiries contact the TriNet Solution Center at (800)638-0461",
            "companyObj": "TriNet, 1100 San Leandro Blvd., Suite 300, San Leandro, CA 94577",
            "companyId": "7T1",
            "payGroup": "S0-XWINERY S0",
            "earnsBegDt": "2015-06-01",
            "earnsEndDt": "2015-06-15",
            "payEndDt": "2015-06-15",
            "checkDt": "2015-06-15",
            "checkNumber": "17220450",
            "employerName": "XWINERY",
            "employerAddress1": "122 Camino Oruga",
            "employerAddress2": "Napa, CA  94558",
            "employerAddress3": " ",
            "employerCountry": "USA",
            "payCurrencyCd": "USD",
            "employerPhone": "7072049522",
            "name": "Stuart Henry ",
            "address1": "1407 Sherman Ave.",
            "address2": "Napa , CA  94558-",
            "address3": " ",
            "employeeId": "00001654384",
            "ssn": " ",
            "department": "922FUADEPT",
            "location": "XWINERY-HQ",
            "businessTitle": "Director of Winemaking",
            "payRate": 108000.00,
            "payRateDesc": "Annual",
            "netPay": 2567.59,
            "link": {
                "rel": "header",
                "href": "http://172.31.47.207/api-money/v1/paychecks/paycheck/header?payGroup=S0&payEndDate=2015-06-15&pageNo=1&lineNo=6&sepChk=0&offCycle=N&effDate=2014-10-01"
            }
        },
        "detail": {
            "key": {
                "payGroup": "S0",
                "payPeriodEndDate": null,
                "payEndDt": "2015-06-15",
                "pageNo": "1",
                "lineNo": "6",
                "sepChk": "0",
                "offCycle": "N",
                "effDt": "2014-10-01"
            },
            "taxData": [{
                "taxWithHolding": "CA State",
                "maritalStatus": "S/M-2 inc",
                "allowances": 0,
                "addlPct": 0.00,
                "addlAmt": 0.00,
                "netClaimAmt": null,
                "splLetters": null
            }, {
                "taxWithHolding": "Federal",
                "maritalStatus": "Single",
                "allowances": 0,
                "addlPct": 0.00,
                "addlAmt": 0.00,
                "netClaimAmt": null,
                "splLetters": null
            }],
            "earns": [{
                "curEarnsDesc": "Regular",
                "curEarnsRate": 0.000,
                "curEarnsHours": 0.00,
                "curEarnsEarn": 4500.00,
                "ytdEarnsHours": 240.00,
                "ytdEarnsEarn": 12675.53,
                "earnsBegDt": null,
                "earnsEndDt": null
            }],
            "taxWithholdings": [{
                "taxDesc": "Fed Withholdng",
                "curTaxes": 800.30,
                "ytdTaxes": 2295.39
            }],
            "preTaxDedns": [{
                "desc": "Kaiser HMO Northern CA",
                "curDedns": 726.00,
                "ytdDedns": 2178.00,
                "pytdDedns": 0.00
            }, {
                "desc": "Aetna Dental Optional",
                "curDedns": 88.89,
                "ytdDedns": 266.67,
                "pytdDedns": 0.00
            }],
            "postTaxDedns": [],
            "employerBenefits": [{
                "desc": "Life and AD&D",
                "curEmpBenf": 1.26,
                "ytdEmpBenf": 3.78
            }],
            "employerBenefitsTaxable": [],
            "employerBenefitsNonTaxable": [{
                "desc": "Life and AD&D",
                "curEmpBenf": 1.26,
                "ytdEmpBenf": 3.78
            }],
            "totals": {
                "curHour": 0.00,
                "curGross": 4800.00,
                "ytdHrsEarn": 248.00,
                "ytdGross": 14115.91,
                "curTaxes": 1417.52,
                "ytdTaxes": 4070.22,
                "curPreDedn": 814.89,
                "ytdPreDedn": 2444.67,
                "ytdPreDDedn": 0.00,
                "curPostDedn": 0.00,
                "ytdPostDedn": 0.00,
                "ytdTotalDedn": 2444.67,
                "curTotalDedn": 814.89,
                "curEmpBenf": 1.26,
                "ytdEmpBenf": 3.78,
                "curFedTaxableGross": 3985.11,
                "ytdFedTaxableGross": 11546.24,
                "curNetPay": 2567.59,
                "ytdNetPay": 7601.02
            },
            "ptos": [],
            "netPayDistributions": [],
            "directDepositDistributions": [],
            "link": {
                "rel": "detail",
                "href": "http://172.31.47.207/api-money/v1/paychecks/paycheck/detail?payGroup=S0&payEndDate=2015-06-15&pageNo=1&lineNo=6&sepChk=0&offCycle=N&effDate=2014-10-01"
            }
        },
        "link": {
            "rel": "paycheck",
            "href": "http://172.31.47.207/api-money/v1/earningstatements/00001654384/paychecks/S0_2015-06-15_1_6_0_N_2014-10-01"
        }
    };
    var compensationResponse = {
        "data": [
            {
                "label": "To access your 2015 Total Compensation Statement, please click here",
                "url": "TCS2015_30Q_00002453002_PASS.pdf"
            }],
        "_statusCode": "200",
        "_statusText": "OK",
        "_statusMessage": "Success"
    };

    var paycheckCityResponse ={
        "data": {
            "calculationResults": null,
                "optionalDeductions": [],
                "optionalROTH401KDeduction": null,
                "optionalRatesAndHours": [],
                "localData": [],
                "optional401KDeduction": null,
                "taxableWages": {
                "annualized": false
            },
            "roundFederalWithholding": null,
                "netPay": null,
                "ficaexemptStatus": null,
                "companyName": "Killer Bee, Inc.",
                "checkDate": 1468555200000,
                "id": null,
                "locale": {
                "address1": "15807 brickman court",
                    "address2": "houston , TX  77084-",
                    "city": null,
                    "zip": null,
                    "zip4": null,
                    "isResident": null,
                    "isExempt": null
            },
            "voluntaryDeductions": [
                {
                    "employerLimitAmount": null,
                    "employerMatchAmount": null,
                    "employerMatchAmountType": null,
                    "employeeAge": null,
                    "deductionName": "Aetna PPO",
                    "deductionAmount": 316.1,
                    "deductionMethodType": null,
                    "exemptFederal": null,
                    "exemptState": null,
                    "exemptFica": null,
                    "exemptLocal": null
                }
            ],
                "otherIncome": [
                {
                    "name": "Life and AD&D",
                    "amount": 5.75,
                    "amountType": null,
                    "imputedIncome": null,
                    "exemptFederal": null,
                    "exemptState": null,
                    "exemptFica": null,
                    "exemptLocal": null
                }
            ],
                "payFrequency": "Annual",
                "returnpathURL": null,
                "state": "TX",
                "stateValues": [
                {
                    "allowanceCertificateData": {},
                    "roundStateWithholding": null,
                    "exemptState": null,
                    "FILINGSTATUS": "n/a",
                    "TOTALALLOWANCES": 0,
                    "additionalStateWithholding": null
                }
            ],
                "federalFilingStatusType": "SINGLE",
                "federalAllowances": 0,
                "exemptFederal": null,
                "exemptFica": null,
                "additionalFederalWithholding": null,
                "grossPay": 5083.33,
                "grossPayType": "Annual",
                "grossPayYTD": 66958.29
        },
        "_requestId": "ace5e682-8513-4c6b-9c78-3bd1d6199945",
            "_statusCode": "200",
            "_statusText": "OK",
            "_statusMessage": "Success"
    };

    var $compile,
        $body = $('body');


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector, $route) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $route = $route;
            $route.current = {$$route: {originalPath: '/earning'}};
            $injector.get('$controller')('earningStmtsCtrl', {
                $scope: $scope
            });
            $scope.translation = {money:{earnings_statements:{
                "sal-paycheck-cal" : "Symmetry Salary Calculator",
                "sal-paycheck-cal-desc": "Enter the gross pay and estimate the net (take-home) pay after state and local taxes and deductions.",
                "hour-paycheck-cal" : "Symmetry Hourly Calculator",
                "hour-paycheck-cal-desc": "Enter different hourly rates and estimate the net amount after state and local taxes and deductions.",
                "bonus-cal" : "Symmetry Bonus Pay Aggregate Calculator",
                "bonus-cal-desc": "Enter a gross bonus amount and estimate the net bonus amount after state and local taxes and deductions.",
                "bonus-percent-cal" : "Symmetry Bonus Pay Percent Calculator",
                "bonus-percent-cal-desc": "Enter a gross bonus amount and estimate the net bonus amount after state and local taxes and deductions.",
                "gross-up-cal" : "Symmetry Gross-Up Calculator",
                "gross-up-cal-desc": "Use this form when you have a desired net pay in mind. Enter the net (take-home) pay and the tax withholding to estimate the gross pay necessary to equal the net pay amount.",
            }}}
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $routeParams = $injector.get('$routeParams');
            $compile = $injector.get('$compile');
        });
        $scope.currentDate = new Date();
        var dateStringData = $scope.dateString;
        var response1 = {
            "nextCheckIssueDate": "2015-10-15",
            "nextCheckDt": "2015-10-15",
            "checkSummaries": [{
                "netPay": 2782.32,
                "checkIssueDate": "2015-06-15",
                "checkDt": "2015-06-15",
                "checkKey": {
                    "payGroup": "S0",
                    "payPeriodEndDate": "2015-06-15",
                    "payEndDt": "2015-06-15",
                    "pageNo": "3",
                    "lineNo": "1",
                    "sepChk": "0",
                    "offCycle": "N",
                    "effDt": "2014-10-01"
                },
                "checkNumber": "17220457",
                "link": {
                    "rel": "paycheck",
                    "href": "http://172.31.43.242/api-money/v1/paychecks/paycheck?payGroup=S0&payEndDate=2015-06-15&pageNo=3&lineNo=1&sepChk=0&offCycle=N&effDate=2014-10-01"
                }
            }],
            "link": null
        };
        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.payChecks + "?" + dateStringData).respond(200, response1);
        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.payChecks).respond(200, response1);
        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.compensationStatement).respond(200, compensationResponse);
        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.payCheckCity).respond(200,paycheckCityResponse);
        $httpBackend.flush();


    });

    describe('onOFF is called and defined', function () {
        it('onOFF is defined', function () {
            expect($scope.onOFF).toBeDefined();
        });
        it('onOFF is called', function () {
            $scope.onOFF();
            expect($scope.isToolTipVisible).toBeTruthy();
        });

        it('onOFF is called', function () {
            $scope.isToolTipVisible = false;
            $scope.onOFF();
            expect($scope.isToolTipVisible).toBeFalsy();
        });

    });

    describe('chooseOptions testing', function () {

        it('chooseOptions is defined', function () {
            expect($scope.chooseOptions).toBeDefined();
        });
        it('chooseOptions should equal to the array of data', function () {
            expect($scope.chooseOptions).toEqual([{
                name: 'All',
                value: 'all'
            }, {
                name: 'This Year',
                value: '1'
            }, {
                name: 'Last 3 Months',
                value: '3'
            }, {
                name: 'Last 6 Months',
                value: '6'
            }, {
                name: 'Last Year',
                value: '-1'
            }, {
                name: 'Date Range',
                value: 'date'
            }]);
        });
        it('chooseOption should equal to the second object of chooseOptions', function () {
            expect($scope.chooseOption).toEqual({
                name: 'Last 3 Months',
                value: '3'
            });
        });

    });

    describe('selectValue function testing', function () {
        it('selectValue is defined', function () {
            expect($scope.selectValue).toBeDefined();
        });

        it('selectValue function is called with param as 3', function () {
            val = 3;
            currentDate = $scope.currentDate;
            dd = currentDate.getDate();
            yyyy = currentDate.getFullYear();
            lastmm = (currentDate.getMonth() + 1) - 1, mm, months;
            valToString = val.toString();
            $scope.selectValue(val);
            expect($scope.effectiveDate).toBeDefined();
            expect($scope.effectiveSecDate).toBeDefined();
            expect($scope.currentDate).toBeDefined();
            expect($scope.value).toEqual(valToString);
            expect(currentDate).toEqual($scope.currentDate);
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.payChecks + "?" + $scope.dateString).respond(200, earningResource);
            $httpBackend.flush();

        });

        it('selectValue function is called with param as all', function () {
            val = 'all';
            $scope.selectValue(val);
            expect($scope.result).toEqual(val);
        });

        it('selectValue function is called with param as 1', function () {
            val = '1';
            $scope.selectValue(val);
            expect($scope.value).toEqual(val);
        });

        it('selectValue function is called with param as 6', function () {
            val = '6';
            $scope.selectValue(val);
            expect($scope.value).toEqual(val);
        });

        it('selectValue function is called with param as -1', function () {
            val = '-1';
            $scope.selectValue(val);
            expect($scope.value).toEqual(val);
        });

        it('selectValue function is called with param as date', function () {
            val = 'date';
            $scope.selectValue(val);
            expect($scope.value).toEqual(val);
        });


    });

    describe('runDateRange function testing', function () {

        it('runDateRange is defined', function () {
            expect($scope.runDateRange).toBeDefined();
        });

        it('runDateRange function is error called', function () {

            $scope.runDateRange();
        });

        it('runDateRange function is error val called', function () {

            var simpleHTML = ' <input type="text" class="form-control" id="earning_effectivefrom" name="effDate" value="2016-03-06"/> ' +
                    ' <input type="text" class="form-control" id="earning_effectiveto" name="effDate" value="2016-03-04"/>',

                el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.runDateRange();
        });


        it('runDateRange function is error val called', function () {

            var simpleHTML = ' <input type="text" class="form-control" id="earning_effectivefrom" name="effDate" value="2016-03-06"/> ' +
                    ' <input type="text" class="form-control" id="earning_effectiveto" name="effDate" value="2016-03-11"/>',

                el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.runDateRange();
        });
    });

    describe('w2URL defined', function () {
        it('w2Url is defined', function () {
            expect($scope.w2Url).toBeDefined();
        });
        it('w2Url is non Null and equals sso route', function () {
            expect($scope.w2Url).toEqual("#/ssowidget/jat");
        });

    });

    describe('setw2LableName function testing', function () {

        it('setw2LableName is defined', function () {
            expect($scope.setw2LableName).toBeDefined();
        });

        it('setw2LableName function is CA called', function () {
            $scope.setw2LableName('CA');
            expect($scope.w2LableName).toEqual('View T4');
        });

        it('setw2LableName function US is called', function () {
            $scope.setw2LableName('US');
            expect($scope.w2LableName).toEqual('View W-2');
        });
    });

    describe('setUserId function testing', function () {

        it('setUserId is defined', function () {
            expect($scope.setUserId).toBeDefined();
        });

        it('setUserId function is undefinedcalled', function () {
            $routeParams = {empId: undefined}
            $scope.setUserId($routeParams.empId);
        });

        it('setUserId function is undefinedcalled', function () {
            $routeParams = {empId: '0012134556'}
            $scope.setUserId($routeParams.empId);
        });

    });

    describe('viewDetails function testing', function () {

        it('viewDetails is defined', function () {
            expect($scope.viewDetails).toBeDefined();
        });
        it('when dialog is opened and get call sucess is made', function () {

            var indexvalue = 0;


            $scope.earningData = earningResource.checkSummaries;


            $scope.earningpayGroup = $scope.earningData[indexvalue].checkKey.payGroup;
            $scope.earningpayoffCycle = $scope.earningData[indexvalue].checkKey.offCycle;
            $scope.earningpaysepChk = $scope.earningData[indexvalue].checkKey.sepChk;
            $scope.earningpaylineNo = $scope.earningData[indexvalue].checkKey.lineNo;
            $scope.earningpaypageNo = $scope.earningData[indexvalue].checkKey.pageNo;
            $scope.earningpaypayEndDt = $scope.earningData[indexvalue].checkKey.payEndDt;
            $scope.earningpayeffDt = $scope.earningData[indexvalue].checkKey.effDt;

            var viewDetailsData = $scope.earningpayGroup + '_' +
                $scope.earningpayoffCycle + '_' +
                $scope.earningpaypayEndDt + '_' +
                $scope.earningpaypageNo + '_' +
                $scope.earningpaylineNo + '_' +
                $scope.earningpaysepChk + '_' +
                $scope.earningpayeffDt;


            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.payCheckDetails + "/" + viewDetailsData).respond(200, viewDetails);


            $scope.viewDetails(indexvalue);

            $httpBackend.flush();
        });

        it('when dialog is opened and get call error is made', function () {

            var indexvalue = 0;

            var response = {
                _statusCode: '400',
                _statusText: 'OK',
                "_error": {"detailMessage": "error"},
                data: {}
            };
            $scope.earningData = earningResource.checkSummaries;


            $scope.earningpayGroup = $scope.earningData[indexvalue].checkKey.payGroup;
            $scope.earningpayoffCycle = $scope.earningData[indexvalue].checkKey.offCycle;
            $scope.earningpaysepChk = $scope.earningData[indexvalue].checkKey.sepChk;
            $scope.earningpaylineNo = $scope.earningData[indexvalue].checkKey.lineNo;
            $scope.earningpaypageNo = $scope.earningData[indexvalue].checkKey.pageNo;
            $scope.earningpaypayEndDt = $scope.earningData[indexvalue].checkKey.payEndDt;
            $scope.earningpayeffDt = $scope.earningData[indexvalue].checkKey.effDt;

            var viewDetailsData = $scope.earningpayGroup + '_' +
                $scope.earningpayoffCycle + '_' +
                $scope.earningpaypayEndDt + '_' +
                $scope.earningpaypageNo + '_' +
                $scope.earningpaylineNo + '_' +
                $scope.earningpaysepChk + '_' +
                $scope.earningpayeffDt;


            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.payCheckDetails + "/" + viewDetailsData).respond(404, response);


            $scope.viewDetails(indexvalue);

            $httpBackend.flush();


        });

        describe('hideCalc function testing', function () {
            it('hideCalc is defined', function () {
                expect($scope.hideCalc).toBeDefined();
            });

            it('hideCalc function call', function () {
                $scope.hideCalc();
            });
        });

        describe('$on testing',function(){
            it('$on event testing',function(){
                $rootScope.$broadcast('ngDialog.closed');
            });
        });

        describe('$scope.onOFF function testing',function(){
            it('$scope.onOFF function call with true',function(){
                var html1 = '<input type="text" id="myonoffswitch1" value="true"/> ';
                var element = $compile(html1)($scope);
                $body.append(element);
                $rootScope.$digest();
                $scope.onOFF();
            });

            it('$scope.onOFF function call with false',function(){
                var html1 = '<input type="text" id="myonoffswitch1" value="false"/> ';
                var element = $compile(html1)($scope);
                $body.append(element);
                $rootScope.$digest();
                $scope.onOFF();
            });
        });

    });

    describe('keyboardPress function testing',function(){
        it('keyboardPress is defined',function(){
            expect($scope.keyboardPress).toBeDefined();
        });

        it('keyboardPress function call',function(){
            var event = {keyCode:67};
            $scope.keyboardPress(event);
        });
    });

    afterEach(function () {
        $body.empty();
    });

});
