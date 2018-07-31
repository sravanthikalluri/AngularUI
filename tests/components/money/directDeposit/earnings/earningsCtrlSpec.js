/**
 * Created by jaya krishna on 10/29/2015.
 */


describe('Earnings Controller Testing', function () {
    var $rootScope;
    var $scope;
    var $route;
    var ngDialog;
    var appConfig;
    var $filter;
    var $localStorage;
    var $httpBackend;
    var utilService;
    var simpleHTML = ' <input  type="text" name="effDate" id="earningsView_edit_effective_date" />' +
            ' <select id="selected_effective_date" class="float col-md-12"> ' +
            '<option value="0"  selected></option>' +
            ' </select>',
        $compile,
        el,
        $body = $('body');

    var earningsCheckAmountResponse = {
        "data": {
            "nextCheckIssueDate": "2016-02-29",
            "nextCheckDt": "2016-02-29",
            "checkSummaries": [{
                "netPay": 2107.47,
                "checkIssueDate": "2015-07-15",
                "checkDt": "2015-07-15",
                "checkKey": {
                    "payGroup": "S0",
                    "payPeriodEndDate": "2015-07-15",
                    "payEndDt": "2015-07-15",
                    "pageNo": "1",
                    "lineNo": "2",
                    "sepChk": "0",
                    "offCycle": "N",
                    "effDt": "2014-12-01"
                },
                "checkNumber": "3129437",
                "link": null
            }],
            "link": null
        }, "_statusCode": "200", "_statusText": "OK", "_statusMessage": "Success"
    };


    var earningsDataResponse = {
        "data": {
            "suspended": false,
            "currentlyEffective": {
                "07/04/2016": [
                    {
                        "employeeId": "00001669553",
                        "effectiveDate": "2016-07-04",
                        "accountName": "Account Name",
                        "accountType": "Checking",
                        "routingNumber": "325070760",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "44444444444444444",
                        "priority": 1,
                        "netBalance": true,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": null,
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "employeeId": "00001669553",
                        "effectiveDate": "2016-07-04",
                        "accountName": "Account Name",
                        "accountType": "Checking",
                        "routingNumber": "325070760",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "22222222222222222",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": 2000,
                        "percent": null,
                        "uniqueId": 2
                    },
                    {
                        "employeeId": "00001669553",
                        "effectiveDate": "2016-07-04",
                        "accountName": "Account Name",
                        "accountType": "Checking",
                        "routingNumber": "325070760",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "33333333333333333",
                        "priority": 4,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": null,
                        "percent": 10,
                        "uniqueId": 3
                    },
                    {
                        "employeeId": "00001669553",
                        "effectiveDate": "2016-07-04",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "325070760",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "12345678901234567",
                        "priority": 3,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": 2,
                        "percent": null,
                        "uniqueId": 4
                    },
                    {
                        "employeeId": "00001669553",
                        "effectiveDate": "2016-07-04",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "325070760",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "34343434343434343",
                        "priority": 2,
                        "netBalance": false,
                        "fsaAccount": true,
                        "apAccount": true,
                        "amount": 1,
                        "percent": null,
                        "uniqueId": 5
                    }
                ]
            },
            "futureEffective": {"07/10/2016": [
                                                    {
                                                        "employeeId": "00001669553",
                                                        "effectiveDate": "2016-07-04",
                                                        "accountName": "Account Name",
                                                        "accountType": "Checking",
                                                        "routingNumber": "325070760",
                                                        "bankId": null,
                                                        "branchId": null,
                                                        "accountNumber": "44444444444444444",
                                                        "priority": 1,
                                                        "netBalance": true,
                                                        "fsaAccount": false,
                                                        "apAccount": false,
                                                        "amount": null,
                                                        "percent": null,
                                                        "uniqueId": 1
                                                    }]}
        },
        "_requestId": "362cf066-f650-4759-8ec1-8d6b53704295",
        "_statusCode": "200",
        "_statusText": "OK",
        "_statusMessage": "Success"
    };


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.makeNetBalanceAccount = function (earningsData) {
                return earningsData;
            };
            $scope.childParentAlertMsg = function (data) {
                $scope.errorAlert = data;
            };
            $scope.resetPriority = function(value){
                return value;
            };
            $scope.resetPriorityOrder = function(earningsData,index){
                return earningsData;
            };
            $scope.getNetBalanceAccountIndex = function (data) {
                var indexValue = 0;
                return indexValue;
            };
            $scope.translation = {"money":{"direct_deposit":{"addAccountFor":"Add Account for "}},"yes": "Yes"};
            $injector.get('$controller')('earningsCtrl', {
                $scope: $scope
            });
            $route = $injector.get('$route');
            ngDialog = $injector.get('ngDialog');
            appConfig = $injector.get('appConfig');
            utilService = $injector.get('utilService');
            $localStorage = $injector.get('$localStorage');
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
        });

        $localStorage.isDDLoaded = true;

        var todayDate =   new Date(),
            startDate =  utilService.filterDate(todayDate.setMonth(todayDate.getMonth() - 12), 'yyyy-MM-dd'),
            endDate =  utilService.filterDate(new Date(), 'yyyy-MM-dd');

        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.payChecks+'?startDate='+startDate+'&endDate='+endDate).respond(200, earningsCheckAmountResponse);

        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.directDeposit + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.accounts).respond(200, earningsDataResponse);

        $scope.initEarningsDataFn(false);

        $httpBackend.flush();


    });

    describe('addAccount function testing',function() {
        it('addAccount is defined', function () {
            expect($scope.addAccount).toBeDefined();
        });

        it('addAccount function op =  constants.directDeposit.opNew', function () {
            spyOn($scope, 'closeModal');
            spyOn($scope, 'checkChangesOnForm');

            $scope.newAccountData = {};
            $scope.newAccountData.accountNumber = '178945612';

            $scope.selectedObject = {};

            $scope.earningData = [{routingNumber: 0}];
            var op = constants.directDeposit.opNew;
            $scope.addAccount(op);

            expect($scope.closeModal).toHaveBeenCalled();
            expect($scope.checkChangesOnForm).toHaveBeenCalled();


        });

        it('addAccount function op =  constants.directDeposit.opNew with canadianFields', function () {
            spyOn($scope, 'closeModal');
            spyOn($scope, 'checkChangesOnForm');

            $scope.newAccountData = {};
            $scope.newAccountData.accountNumber = '178945612';

            $scope.selectedObject = {};

            $scope.earningData = [{routingNumber: 0}];
            var op = constants.directDeposit.opNew;
            var canadianFields = true;
            $scope.addAccount(op, canadianFields);

            expect($scope.closeModal).toHaveBeenCalled();
            expect($scope.checkChangesOnForm).toHaveBeenCalled();


        });

        it('addAccount function op !=  constants.directDeposit.opNew with canadianFields', function () {
            spyOn($scope, 'closeModal');
            spyOn($scope, 'checkChangesOnForm');

            $scope.addAccountData = {};
            $scope.addAccountData.accountNumber = '178945612';
            $scope.addAccountData.uniqueId = 1;
            $scope.addAccountData.accountType = {};
            $scope.addAccountData.accountType.accountTypeChanged = {};
            $scope.addAccountData.accountType.accountTypeChanged.key = 'Savings';


            $scope.selectedObject = {};

            $scope.earningData = [{
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": false,
                "fsaAccount": false,
                "apAccount": false,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            }];
            var op = 'old';
            var canadianFields = true;
            $scope.addAccount(op, canadianFields);

            expect($scope.closeModal).toHaveBeenCalled();
            expect($scope.checkChangesOnForm).toHaveBeenCalled();


        });

        it('addAccount function op !=  constants.directDeposit.opNew without canadianFields', function () {
            spyOn($scope, 'closeModal');
            spyOn($scope, 'checkChangesOnForm');

            $scope.addAccountData = {};
            $scope.addAccountData.accountNumber = '178945612';
            $scope.addAccountData.accountType = {};
            $scope.addAccountData.accountType.accountTypeChanged = {};
            $scope.addAccountData.accountType.accountTypeChanged.key = 'Savings';


            $scope.selectedObject = {};

            $scope.earningData = [{
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": false,
                "fsaAccount": false,
                "apAccount": false,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            }];
            var op = 'old';
            var canadianFields = false;
            $scope.addAccount(op, canadianFields);

            expect($scope.closeModal).toHaveBeenCalled();
            expect($scope.checkChangesOnForm).toHaveBeenCalled();


        });
    });


    describe('earningsCheckAmount function testing',function() {
        it('DefaultDoughnutData is defined', function () {
            expect($scope.DefaultDoughnutData).toBeDefined();
        });

        it('DefaultDoughnutData should equal to the array', function () {
            expect($scope.DefaultDoughnutData).toEqual({
                datasets : [
                    {
                        label: 'Pay Check Amount',
                        data: [ 2107.47 ],
                        backgroundColor: ['#084B8A']
                    }
                ],
                labels: []
            });
        });

    });

    describe('disabled funciton testing', function() {
        it('disabled is defined', function() {
            expect($scope.disabled).toBeDefined();
        });

        it('disabled function called without data', function() {
            var date = new Date();
            $scope.disabled(date, 'day');
            var today = utilService.filterDate(new Date());
            var dateCompare = utilService.filterDate(date);
            expect($scope.disabled(date, 'day')).toBeTruthy();
        });

        it('disabled function called with date', function() {
            var date = new Date("30-10-2015");
            $scope.disabled(date, 'daysdf');
            expect($scope.disabled(date, 'day')).toBeFalsy();
        });


    });


   describe('Func: onChange function testing', function() {
        it('onChange should be defined', function() {
            expect($scope.onChange).toBeDefined();
        });

        it('onChange function e.target.name = percent', function() {
            var e = jQuery.Event("click");
            e.target = {name : 'percent' };

            var data = [ { accountNumber : '123456789' }], estimatedPayCheck = true, inputvalue = 100, event = e, index = 0 , earning  = '';

            $scope.onChange(data, estimatedPayCheck, inputvalue, e, index, earning);
            expect($scope.onChange).toBeDefined();
        });

        it('onChange function e.target.name != percent', function() {
            var e = jQuery.Event("click");
            e.target = {name : 'test' };

            var data = [ { accountNumber : '123456789' }], estimatedPayCheck = true, inputvalue = 'test', event = e, index = 0 , earning  = '';

            $scope.onChange(data, estimatedPayCheck, inputvalue, e, index, earning);
            expect($scope.onChange).toBeDefined();
        });


    });


    describe('getAmountType funciton testing', function() {
        it('getAmountType is defined', function() {
            expect($scope.getAmountType).toBeDefined();
        });

        it('getAmountType function accountData is undefined and value is amount', function() {

            var value = 'amount',accountData = undefined;

            $scope.getAmountType(value,accountData);
        });


        it('getAmountType function accountData is not  undefined  and value is amount', function() {

            var value = 'amount',accountData = {};

            $scope.getAmountType(value,accountData);
        });


        it('getAmountType function accountData is not  undefined  and value is amount', function() {

            var value = 'amount',accountData = { amountOld : '20'};

            $scope.getAmountType(value,accountData);
        });


        it('getAmountType function accountData is not  undefined  and value is percentage percentOld is undefined', function() {

            var value = 'percentage',accountData = { };

            $scope.getAmountType(value,accountData);
        });

        it('getAmountType function accountData is not  undefined  and value is percentage percentOld have data', function() {

            var value = 'percentage',accountData = { percentOld  : '20'};

            $scope.getAmountType(value,accountData);
        });




    });

    describe('onDropComplete function testing', function() {

        it('onDropComplete is defined', function() {
            expect($scope.onDropComplete).toBeDefined();
        });

        it('onDropComplete function called ', function() {

            var index = 0;
            var obj = {
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": false,
                "fsaAccount": false,
                "apAccount": false,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            };

            $scope.earningData = [{
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": false,
                "fsaAccount": false,
                "apAccount": false,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            }];

            var otherObj = $scope.earningData[index];

        });

    });


    describe('getParsedVal function testing', function() {
        it('getParsedVal is defined', function() {
            expect($scope.getParsedVal).toBeDefined();
        });

        it('getParsedVal function value is number', function() {
            var value = '2';
            expect($scope.getParsedVal(value)).toEqual(2.00);
        });

        it('getParsedVal function value is string', function() {
            var value = 'a';
            expect($scope.getParsedVal(value)).toBeNaN();
        });


    });


    describe('checkAmountValidation function testing', function() {
        it('checkAmountValidation is defined', function() {
            expect($scope.checkAmountValidation).toBeDefined();
        });

        it('checkAmountValidation function call', function() {
            expect($scope.editDollorValueRequired).toBeUndefined();

            $scope.checkAmountValidation();

            expect($scope.editDollorValueRequired).toBeFalsy();


        });
    });


   describe('populateDoughnutData function testing', function() {
        it('populateDoughnutData is defined', function() {
            expect($scope.populateDoughnutData).toBeDefined();
        });

        it('populateDoughnutData  function call', function() {
            var data = { data : []};

            $scope.populateDoughnutData('first',data);
        });
    });

   describe('saveAccount function testing', function() {
        it('saveAccount is defined', function() {
            expect($scope.saveAccount).toBeDefined();
        });

        it('saveAccount  function saveData length > 1', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [{
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }, {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "117117117",
                        "bankId": null,
                        "branchId": null,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "accountNumber": "117117117",
                        "priority": 4,
                        "netBalance": false,
                        "fsaAcc ount": true,
                        "apAccount": false,
                        "amount": "1500",
                        "percent": null,
                        "uniqueId": 2
                    }, {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Checking",
                        "routingNumber": "767676767",
                        "bankId": null,
                        "branchId": null,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "accountNumber": "787878787",
                        "priority": 3,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 3
                    }, {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "343434454",
                        "bankId": null,
                        "branchId": null,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "accountNumber": "686868686",
                        "priority": 2,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": true,
                        "amount": null,
                        "percent": "12",
                        "uniqueId": 4
                    }, {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Checking",
                        "routingNumber": "334343434",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "454545455",
                        "priority": 1,
                        "netBalance": true,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": null,
                        "percent": null,
                        "uniqueId": 5
                    }],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;
            var data = {};
            var updateResponse = { _statusCode : '200'};


            el.attr('value','2015-09-23');

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                    moneyUrlConfig.resources.directDeposit + "/" + appConfig.companyId + "/" +
                    appConfig.userId + moneyUrlConfig.resources.accounts, data)

                .respond(200,updateResponse);

            $scope.saveAccount();
        });

        it('saveAccount  function saveData length = 1', function() {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [{
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;

            expect($scope.eff_date).toBeUndefined();
            $scope.saveAccount();


        });


        it('saveAccount  function saveData length >10', function() {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                        ,
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                    ],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;
            expect($scope.eff_date).toBeUndefined();
            $scope.saveAccount();



        });

    });

    describe('openAccount function testing', function() {
        it('openAccount is defined', function() {
            expect($scope.openAccount).toBeDefined();
        });

        it('openAccount  function call', function() {
            var index = 0,obj = {};

            var response = {
                "Currently Effective": [
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }
                ]
            };
            $scope.earningsList = {};
            $scope.earningsList['Currently Effective'] = response;
            var accountTypeChanged = {key :'',value:''};

            $scope.openAccount(index,obj,accountTypeChanged);

            expect($scope.selectedObject).toEqual(obj);


        });

        it('openAccount  function call with lenght != 0', function() {
            var index = 0,obj = {};
            var accountTypeChanged = {key :'',value:''};
            var response = {
                "Currently Effective": [
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }
                ]
            };
            $scope.earningsList = {};
            $scope.earningsList['Currently Effective'] = response;
            $scope.openAccount(index,obj,accountTypeChanged);

            expect($scope.selectedObject).toEqual(obj);


        });
    });




    describe('estCancel function testing', function() {
        it('estCancel is defined', function() {
            expect($scope.estCancel).toBeDefined();
        });

        it('estCancel  function $scope.earningsCheckAmount.checkAmount !== estimatedPayCheck ', function() {
            spyOn($scope,'closeModal');
            $scope.earningsCheckAmount = {};
            $scope.earningsCheckAmount.checkAmount = 20;

            $scope.estCancel(20);

            expect($scope.closeModal).toHaveBeenCalled();

        });


        it('estCancel  function $scope.earningsCheckAmount.checkAmount == estimatedPayCheck ', function() {
            $scope.earningsCheckAmount = {};
            $scope.earningsCheckAmount.checkAmount = 20;

            $scope.estCancel(40);

            expect($scope.yes_btn).toEqual('Yes');
            expect($scope.no_btn).toEqual('No');


        });

    });
    describe('cancel function testing', function() {
        it('cancel is defined', function() {
            expect($scope.cancel).toBeDefined();
        });

        it('cancel  function $scope.earningsEditView.$dirty = false', function() {
            spyOn($route,'reload');

            $scope.earningsEditView = {};
            $scope.earningsEditView.$dirty = false;

            $scope.cancel();

            expect($route.reload).toHaveBeenCalled();

        });


        it('cancel  function $scope.earningsEditView.$dirty = true', function() {

            $scope.earningsEditView = {};
            $scope.earningsEditView.$dirty = true;

            $scope.cancel();

            expect($scope.yes_btn).toEqual('Yes');
            expect($scope.no_btn).toEqual('No');



        });



    });

    describe('closeModal function testing', function() {
        it('closeModal is defined', function() {
            expect($scope.closeModal).toBeDefined();
        });

        it('closeModal  function $scope.earningsEditView.$dirty = false', function() {
            spyOn(ngDialog,'closeAll');
            $scope.closeModal();
            expect(ngDialog.closeAll).toHaveBeenCalled();

        });


    });

    describe('addAccountModal function testing', function() {
        it('addAccountModal is defined', function() {
            expect($scope.addAccountModal).toBeDefined();
        });

        it('addAccountModal  function saveData length > 10', function() {

            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                        ,
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                    ],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;


            $scope.addAccountModal();



        });

        it('addAccountModal  function saveData length < 10', function() {

            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                    ],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;


            $scope.addAccountModal();



        });

        it('addAccountModal  function saveData length < 10', function() {
            $scope.remainingAmount = 1;
            var response = {
                "data": {
                    "suspended": false,
                    "currentlyEffective": [
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        },
                        {
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "accountTypeChanged": {
                                key: "333333333",
                                routingNumber: "333333333",
                                accountType: "Savings",
                                value: "Savings**3333"

                            },
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }
                    ],
                    "futureEffective": []
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.earningData = response.data.currentlyEffective;


            $scope.addAccountModal();



        });




    });


    describe('checkChangesOnForm function testing', function() {
        it('checkChangesOnForm is defined', function() {
            expect($scope.checkChangesOnForm).toBeDefined();
        });

        it('checkChangesOnForm is defined', function() {
            $scope.initialCopy = {};
            $scope.initialCopy.data  = [];

            $scope.earningData = [ {},{}];

            $scope.checkChangesOnForm();

            expect($scope.formDetailsChanged).toBeFalsy();

        });

    });



    describe('toggleEdit function testing', function() {
        it('toggleEdit is defined', function() {
            expect($scope.toggleEdit).toBeDefined();
        });

        it('toggleEdit function error', function() {
            var item = "Currently Effective";
            var html = ' <select id="selected_effective_date" class="float col-md-12"> '+
                '<option value="1"  selected></option>'+
                ' </select>';

            el = $compile(html)($scope);
            $body.append(el);
            $rootScope.$digest();




            el.find('option').attr('value','1');


            $scope.toggleEdit(item);

            expect($scope.isEditStarted).toBeTruthy();
            expect($scope.formDetailsChanged ).toBeTruthy();

        });

        it('toggleEdit function success', function() {
            var item = "Currently Effective";
            var html = ' <select id="selected_effective_date" class="float col-md-12"> '+
                '<option value="0"  selected></option>'+
                ' </select>';

            el = $compile(html)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.toggleEdit(item);

            expect($scope.isEditStarted).toBeTruthy();
            expect($scope.formDetailsChanged ).toBeTruthy();

        });


    });



    describe('remove function testing', function() {
        it('remove is defined', function() {
            expect($scope.remove).toBeDefined();
        });

        it('remove function fsaAccount true', function() {
            $scope.earningData = [{}];
            $scope.remove(0,{},20);
            expect($scope.yes_btn).toEqual('Yes');


        });

        it('remove function apAccount true', function() {
            $scope.earningData = [{}];
            $scope.remove(0,{},20);
            expect($scope.yes_btn).toEqual('Yes');


        });
    });



    describe('populateData function testing', function() {
        it('populateData should be defined', function() {
            expect($scope.populateData).toBeDefined();
        });



        it('Test populateData function selected_effective_date == 0 ', function() {
            var item ="Currently Effective";
            var html = ' <select id="selected_effective_date" class="float col-md-12"> '+
                '<option value="0"  selected></option>'+
                ' </select>';

            el = $compile(html)($scope);
            $body.append(el);
            $rootScope.$digest();
            var response = {
                "Currently Effective": [
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }
                ]
            };
            $scope.earningsList = {};
            $scope.earningsList['Currently Effective'] = response;

            $scope.populateData(item);




        });



        it('Test populateData function selected_effective_date == 1', function() {
            var item = "Currently Effective";
            var html1 = ' <select id="selected_effective_date" class="float col-md-12"> '+
                '<option value="1"  selected></option>'+
                ' </select>';

            var ele = $compile(html1)($scope);
            $body.append(ele);
            $rootScope.$digest();
            var response = {
                "Currently Effective": [
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }
                ]
            };
            $scope.earningsList = {};
            $scope.earningsList['Currently Effective'] = response;;
            $scope.populateData(item);



        });

        it('Test populateData function call', function() {
            var item = "Future Effective";
            var html = ' <select id="selected_effective_date" class="float col-md-12"> '+
                '<option value="0"  selected></option>'+
                ' </select>';

            el = $compile(html)($scope);
            $body.append(el);
            $rootScope.$digest();


            var response = {
                "Future Effective": [
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    },
                    {
                        "effectiveDate": "2015-09-23",
                        "accountName": "Account Name",
                        "accountType": "Savings",
                        "routingNumber": "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 5,
                        "netBalance": false,
                        "accountTypeChanged": {
                            key: "333333333",
                            routingNumber: "333333333",
                            accountType: "Savings",
                            value: "Savings**3333"

                        },
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }
                ]
        };
            $scope.earningsList = {};
            $scope.earningsList['Future Effective'] = response;;

            $scope.populateData(item);


        });

    });


    describe('enableSaveButton function testing',function(){

        it('enableSaveButton function is defined',function(){
            expect($scope.enableSaveButton).toBeDefined();
        });

        it('enableSaveButton function call',function(){
            $scope.enableSaveButton();
        });
    });

    describe('initEarningsDataFn function testing',function(){
        it('initEarningsDataFn function call',function(){
            $scope.effectiveDateData = [ {data : [{remAmount : 1} ] } ,
                {data : [{remAmount : 2},{remAmount : 3} ] } ];
            $scope.initEarningsDataFn(true);
        });
    });

    describe('onFocus function testing',function(){
        it('onFocus is defined',function(){
            expect($scope.onFocus).toBeDefined();
        });

        it('onFocus function call with type as percent',function(){
            var value = 0;
            var type = 'percent';
            var index = 0;
            $scope.earningData = [{}];
            $scope.onFocus(index,value,type);
        });

        it('onFocus function call with type as dollar',function(){
            var value = 0;
            var type = 'dollar';
            var index = 0;
            $scope.earningData = [{}];
            $scope.onFocus(index,value,type);
        });
    });

    describe('Trail function call',function(){
        it('Trail is defined',function(){
            expect($scope.Trail).toBeDefined();
        });

        it('Trail function call',function(){
            var obj = 'Trail';
            $scope.Trail(obj);
        });
    });


    describe('getNetBalanceAccountIndex function testing',function(){
        it('getNetBalanceAccountIndex  is defined',function(){
            expect($scope.getNetBalanceAccountIndex).toBeDefined();
        });

        it('getNetBalanceAccountIndex function call',function(){
            $scope.earningData= [
                                                {
                                                    "effectiveDate": "2015-09-23",
                                                    "accountName": "Account Name",
                                                    "accountType": "Savings",
                                                    "routingNumber": "333333333",
                                                    "bankId": null,
                                                    "branchId": null,
                                                    "accountNumber": "333333333",
                                                    "priority": 5,
                                                    "netBalance": true,
                                                    "fsaAccount": false,
                                                    "apAccount": true,
                                                    "amount": "500",
                                                    "percent": null,
                                                    "uniqueId": 1
                                                }
                                            ];
            $scope.getNetBalanceAccountIndex();
        });
    });
    describe('addAccChange function testing', function () {
        it('addAccChange is defined', function () {
            expect($scope.addAccChange).toBeDefined();
        });

        it('addAccChange function is called with accountTypeChanged as savings', function () {
            var addAccountData = {accountTypeChanged:{key:"Savings"}};
            var index = 0;
            $scope.addAccChange(addAccountData,index);
        });

        it('addAccChange function is called with accountTypeChanged as test', function () {
            var addAccountData = {accountTypeChanged:{key:"test"},routingNumber:"320568",accountNumber:"77777",accountType:"Savings",amount:"100",uniqueId:1};
            var index = 0;
            $scope.addAccChange(addAccountData,index);
        });

        it('addAccChange function is called with accountTypeChanged as test', function () {
            var addAccountData = {accountTypeChanged:{key:"test"},routingNumber:"320568",accountNumber:"77777",accountType:"Savings",amount:"",uniqueId:1};
            var index = 0;
            $scope.addAccChange(addAccountData,index);
        });
    });


    describe('saveData function testing',function(){
        it('saveData is defined',function(){
            expect($scope.saveData).toBeDefined();
        });

        it('saveData function call',function(){
            $scope.remainingAmount = -1;
            $scope.saveData();
        });

        it('saveData function call with earningsEditView as false',function(){
            $scope.remainingAmount = -1;
            $scope.earningsEditView = false;
            $scope.saveData();
        });

        it('saveData function call with remainingAmount greater than 0',function(){
            $scope.remainingAmount = 1;
            $scope.earningData = [{
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": true,
                "fsaAccount": false,
                "apAccount": true,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            }];
            $scope.saveData();
        });

        it('saveData function call with earningData equal to 1',function(){
            $scope.remainingAmount = 1;
            $scope.earningData = [{
                                    "effectiveDate": "2015-09-23",
                                    "accountName": "Account Name",
                                    "accountType": "Savings",
                                    "routingNumber": "333333333",
                                    "bankId": null,
                                    "branchId": null,
                                    "accountNumber": "333333333",
                                    "priority": 5,
                                    "netBalance": true,
                                    "fsaAccount": false,
                                    "apAccount": true,
                                    "amount": "500",
                                    "percent": null,
                                    "uniqueId": 1
                                }];
            $scope.saveData();
        });
    });

    describe('disableSaveButton function call',function(){
        it('disableSaveButton is defined',function(){
            expect($scope.disableSaveButton).toBeDefined();
        });

        it('disableSaveButton function',function(){
            $scope.disableSaveButton();
        });
    });

    afterEach(function(){
        $body.empty();
    });

});
