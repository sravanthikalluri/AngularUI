/**
 * Created by jaya krishna on 10/30/2015.
 */
describe('Reimbursements Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $localStorage;
    var $httpBackend;


    var reimbursementsData, response = {
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
            "futureEffective": {}
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
            $scope.makeNetBalanceAccount = function(earningsData){
                return earningsData;
            };
            $scope.childParentAlertMsg = function (data) {
                $scope.errorAlert = data;
            };
            $scope.resetPriority = function (data) {
                return data;
            };
            $scope.resetPriorityOrder = function(earningsData,index){
                return earningsData;
            };
            $scope.getNetBalanceAccountIndex = function (data) {
                var indexValue = 0;
                return indexValue;
            };
            $injector.get('$controller')('reimbursementsCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $localStorage = $injector.get('$localStorage');
        });

        timerCallback = jasmine.createSpy('timerCallback');

        $localStorage.isDDRLoaded = true;


        $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.directDeposit + "/" + appConfig.companyId + "/" +
            appConfig.userId + moneyUrlConfig.resources.accounts).respond(200, response);

        $scope.initReimbursementsDataFn(true);
        $httpBackend.flush();

        $scope.selectedReimbursmentData = $scope.reimbersmentAPEncryption = $scope.reimbersmentFSAEncryption =  [
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
        ];


    });


    describe('effectiveDetails function testing', function () {
        it('effectiveDetails is defined', function () {
            expect($scope.effectiveDetails).toBeDefined();
        });

        it('effectiveDetails function call with Future Effective and length not equal to 0',function(){
            var item = "Future Effective";
            $scope.effectiveDetails(item);
        });

        it('effectiveDetails function call with Future Effective and length equal to 0',function(){
            var item = "Future Effective";
            $scope.effectiveDetails(item);
        });

        it('effectiveDetails function call with Currently Effective and length not equal to 0',function(){
            var item = "Currently Effective";
            $scope.effectiveDetails(item);
        });

        it('effectiveDetails function call with Currently Effective and length equal to 0',function(){
            var item = "Currently Effective";
            $scope.effectiveDetails(item);
        });


    });

    describe('selectFSAAccount function testing', function () {
        it('selectFSAAccount is defined', function () {
            expect($scope.selectFSAAccount).toBeDefined();
        });

        it('selectFSAAccount function call with a parameter value as zero ', function () {
            var id = 0;
            $scope.dataSelect = "Currently Effective";
            $scope.selectFSAAccount(id,true);

            expect($scope.fsaSelected).toBeDefined();
            expect($scope.selectedFsa).toBeDefined();
        });

        it('selectFSAAccount function call with a parameter value as false ', function () {
            var id = 0;
            var isSelectAPAccount = false;
            $scope.dataSelect = "Currently Effective";
            $scope.selectFSAAccount(id,isSelectAPAccount);

            expect($scope.fsaSelected).toBeDefined();
            expect($scope.selectedFsa).toBeDefined();
        });

        it('selectFSAAccount function call with a parameter value as other than zero', function () {
            var id = 0;
            $scope.dataSelect = "Future Effective";
            $scope.selectFSAAccount(id,true);

            expect($scope.fsaSelected).toBeDefined();
            expect($scope.selectedFsa).toBeDefined();
        });
    });

   describe('selectAPAccount function testing', function () {
        it('selectAPAccount is defined', function () {
            expect($scope.selectAPAccount).toBeDefined();
        });

        it('selectAPAccount function call with a parameter value as zero ', function () {
            var id = 0;
            $scope.dataSelect = "Currently Effective";
            $scope.selectAPAccount(id,false);
            expect($scope.apSelected).toBeDefined();
            expect($scope.selectedAp).toBeDefined();
        });

        it('selectAPAccount function call with a parameter value as other than zero ', function () {
            var id = 0;
            $scope.dataSelect = 10;
            $scope.selectAPAccount(id);
            expect($scope.apSelected).toBeDefined();
            expect($scope.selectedAp).toBeDefined();
        });
    });


    describe('toggleEditReimbursement function testing', function () {
        it('toggleEditReimbursement is defined', function () {
            expect($scope.toggleEditReimbursement).toBeDefined();
        });

        it('toggleEditReimbursement function call having futureEffective data ', function () {
            var item = "Currently Effective";
            $scope.toggleEditReimbursement(item);
            expect($scope.visble).toBeDefined();

        });

        it('toggleEditReimbursement function call futureEffective data length > zero', function () {
            var item = "Currently Effective";
            $scope.toggleEditReimbursement(item);

            expect($scope.visble).toBeTruthy();
            expect($scope.hidden).toBeTruthy();
            expect($scope.enableSave).toBeFalsy();

        });

        it('toggleEditReimbursement function call futureEffective data length is zero', function () {
            var item = "Currently Effective";
            $scope.toggleEditReimbursement(item);
            expect($scope.visble).toBeTruthy();

        });

    });

    describe('openAccount function testing', function () {
        it('openAccount is defined', function () {
            expect($scope.openAccount).toBeDefined();
        });

        it('openAccount function called with two parameters as input', function () {
            var name = 'faa';
            var value = 'new';

            $scope.reimbursementsData = response.data;


            $scope.openAccount(value, name);
            expect($scope.newAccountData).toEqual({});
            expect($scope.selectedAccount).toEqual(name);
            expect($scope.title).toBeDefined();
            expect($scope.newAccountData).toBeDefined();
            expect($scope.selectedAccount).toBeDefined();


            var name = 'fsa';
            var value = 'new';
            $scope.openAccount(value, name);
            expect($scope.title).toBeDefined();
            expect($scope.newAccountData).toBeDefined();
            expect($scope.selectedAccount).toBeDefined();
            expect($scope.newAccountData).toEqual({});
            expect($scope.selectedAccount).toEqual(name);
        });

        it('openAccount function called with two parameters as input with length as 10', function () {
            $scope.reimbursmentList = [{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},{effectiveDate: "2015-09-23"},];
            var name = 'fsa';
            var value = 'new';
            $scope.openAccount(value, name);

        });
    });

    describe('addAccount function testing', function () {
        it('addAccount is defined', function () {
            expect($scope.addAccount).toBeDefined();
        });

        it('addAccount function call selectedAccount = fsa', function () {
            var op = 'new';
            $scope.reimbursmentList = [];
            $scope.newAccountData = {
                accountNumber: '333333333',
                accountType: 'Save'
            };
            $scope.selectedAccount = 'fsa';
            $scope.addAccount(op);

            expect($scope.fsaTrue).toBeFalsy();
            expect($scope.apTrue).toBeFalsy();
        });

        it('addAccount function call selectedAccount != fsa', function () {
            var op = 'new';
            $scope.reimbursmentList = [];
            $scope.newAccountData = {
                accountNumber: '333333333',
                accountType: 'Save'
            };
            $scope.selectedAccount = 'saf';
            $scope.addAccount(op);

            expect($scope.fsaTrue).toBeFalsy();
            expect($scope.apTrue).toBeFalsy();
        });

        it('addAccount function call selectedAccount != fsa with length > 0 and canadianFields as true', function () {
            var op = 'new';
            var canadianFields = true;
            $scope.reimbursmentList = [{effectiveDate: "2015-09-23"}];
            $scope.newAccountData = {
                accountNumber: '333333333',
                accountType: 'Save'
            };
            $scope.selectedAccount = 'saf';
            $scope.addAccount(op,canadianFields);

            expect($scope.fsaTrue).toBeFalsy();
            expect($scope.apTrue).toBeFalsy();
        });

    });
    describe('insertReimbursementAccount function testing', function () {



        it('insertReimbursementAccount is defined', function () {
            expect($scope.insertReimbursementAccount).toBeDefined();
        });

        it('insertReimbursementAccount function call selectedFsa = undefined and selectedAp = undefined ', function () {
            var res = {
                data: {
                    suspended: false,
                    currentlyEffective: [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                    , "futureEffective": []
                }, "_statusCode": "200", "_statusText": "OK"
            };

            $scope.reimbursementsData = {};
            $scope.reimbursementsData.currentlyEffective = res.data.currentlyEffective;
            $scope.reimbursementsData.futureEffective = res.data.futureEffective;



            $scope.insertReimbursementAccount();


            expect($scope.yes_btn).toEqual('Yes');
            expect($scope.no_btn).toEqual('No');



        });

        it('insertReimbursementAccount function call selectedFsa != undefined and selectedAp != undefined ', function () {
            var res = {
                data: {
                    suspended: false,
                    currentlyEffective: [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                    , "futureEffective": [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                }, "_statusCode": "200", "_statusText": "OK"
            };

            $scope.reimbursementsData = {};
            $scope.reimbursementsData.currentlyEffective = res.data.currentlyEffective;
            $scope.reimbursementsData.futureEffective = res.data.futureEffective;

            $scope.selectedFsa = {};
            $scope.selectedAp = {};
            $scope.tempReimbursmentList = [{
                                           effectiveDate: "2015-09-23",
                                           accountName: "Account Name",
                                           accountType: "Savings",
                                           routingNumber: "333333333",
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

            $scope.insertReimbursementAccount();


            expect($scope.selectedFsa.apAccount).toBeFalsy()
            expect($scope.selectedAp.fsaAccount ).toBeFalsy()



        });


        it('insertReimbursementAccount function call with success response', function () {
            var res = {
                data: {
                    suspended: false,
                    currentlyEffective: [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                    , "futureEffective": [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                }, "_statusCode": "200", "_statusText": "OK"
            };

            $scope.reimbursementsData = {};
            $scope.reimbursementsData.currentlyEffective = res.data.currentlyEffective;
            $scope.reimbursementsData.futureEffective = res.data.futureEffective;

            $scope.selectedFsa = {};
            $scope.selectedAp = {};

            var data = {
                "accountList": [
                    {
                        "effectiveDate": "0NaN-NaN-NaN",
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
                ]
                },
                res = {
                _statusCode: '200'
            };

            $httpBackend.when('POST', moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.directDeposit + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.accounts,data).respond(200, res);

            $scope.insertReimbursementAccount();




        });


        it('insertReimbursementAccount function call with failure response', function () {
            var res = {
                data: {
                    suspended: false,
                    currentlyEffective: [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
                        "bankId": null,
                        "branchId": null,
                        "accountNumber": "333333333",
                        "priority": 2,
                        "netBalance": false,
                        "fsaAccount": false,
                        "apAccount": false,
                        "amount": "500",
                        "percent": null,
                        "uniqueId": 1
                    }]
                    , "futureEffective": [{
                        effectiveDate: "2015-09-23",
                        accountName: "Account Name",
                        accountType: "Savings",
                        routingNumber: "333333333",
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
                    }]
                }, "_statusCode": "200", "_statusText": "OK"
            };

            $scope.reimbursementsData = {};
            $scope.reimbursementsData.currentlyEffective = res.data.currentlyEffective;
            $scope.reimbursementsData.futureEffective = res.data.futureEffective;

            $scope.selectedFsa = {};
            $scope.selectedAp = {};
            var data = {
                "accountList": [
                    {
                        "effectiveDate": "0NaN-NaN-NaN",
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
                ]
                },
            res = {
                _statusCode: '300'
            };

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.directDeposit + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.accounts,data).respond(400, res);

            $scope.insertReimbursementAccount();


        });


    });

    describe('cancelReimbursement function testing', function () {
        it('cancelReimbursement is defined', function () {
            expect($scope.cancelReimbursement).toBeDefined();
        });

        it('cancelReimbursement function call with confirmMessage', function () {
            $scope.reimbersmentForm = {};
            $scope.reimbersmentForm.$dirty = true;
            $scope.reimbursmentList = [
                                                      {
                                                          effectiveDate: "2015-09-23",
                                                          accountType: "Savings",
                                                          routingNumber: "333333333",
                                                          "bankId": null,
                                                          "branchId": null,
                                                          "accountNumber": "333333333",
                                                          "priority": 5,
                                                          "netBalance": false,
                                                          "fsaAccount": true,
                                                          "apAccount": true,
                                                          "amount": "500",
                                                          "percent": null,
                                                          "uniqueId": 1
                                                      },
                                                      {
                                                          effectiveDate: "2015-09-23",
                                                          accountType: "Savings",
                                                          routingNumber: "333333333",
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
                                                  ];
            $scope.enableReimburse = true;
            $scope.cancelReimbursement();
        });

        it('cancelReimbursement function call without confirmMessage', function () {
            $scope.reimbersmentForm = {};
            $scope.reimbersmentForm.$dirty = true;
            $scope.reimbursmentList = [
                                                      {
                                                          effectiveDate: "2015-09-23",
                                                          accountType: "Savings",
                                                          routingNumber: "333333333",
                                                          "bankId": null,
                                                          "branchId": null,
                                                          "accountNumber": "333333333",
                                                          "priority": 5,
                                                          "netBalance": false,
                                                          "fsaAccount": true,
                                                          "apAccount": true,
                                                          "amount": "500",
                                                          "percent": null,
                                                          "uniqueId": 1
                                                      },
                                                      {
                                                          effectiveDate: "2015-09-23",
                                                          accountType: "Savings",
                                                          routingNumber: "333333333",
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
                                                  ];
            $scope.details = {"futureEffective": [{
                                                      effectiveDate: "2015-09-23",
                                                      accountName: "Account Name",
                                                      accountType: "Savings",
                                                      routingNumber: "333333333",
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
                                                  }],"currentlyEffective": [{
                                                      effectiveDate: "2015-09-23",
                                                      accountName: "Account Name",
                                                      accountType: "Savings",
                                                      routingNumber: "333333333",
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
                                                  }]};
            $scope.cancelReimbursement();
        });

        it('cancelReimbursement function call ', function () {
            spyOn($scope,"effectiveDetails");
            $scope.reimbersmentForm = {};
            $scope.reimbersmentForm.$dirty = false;
            $scope.details = {"futureEffective": [{
                                                      effectiveDate: "2015-09-23",
                                                      accountName: "Account Name",
                                                      accountType: "Savings",
                                                      routingNumber: "333333333",
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
                                                  }]};
            $scope.reimbursmentList = [{
                                                                   effectiveDate: "2015-09-23",
                                                                   accountName: "Account Name",
                                                                   accountType: "Savings",
                                                                   routingNumber: "333333333",
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
            $scope.cancelReimbursement();
            expect($scope.effectiveDetails).toHaveBeenCalled();
        });

    });



    describe('Trail function testing ', function () {
        it('Trail is defined ', function () {
            expect($scope.Trail).toBeDefined();
        });

        it('Trail function call without a parameter ', function () {
            var str = 'string';
            var s = '**' + str.slice(-4);
            expect($scope.Trail(str)).toEqual('**ring');
        });

        it('if statements execution ', function () {
            $scope.fun = function () {
                if($scope.date < 10) {
                    $scope.date ='0'+ $scope.date;
                }
                if ($scope.month < 10) {
                    $scope.month ='0'+ $scope.month;
                }
            };
            $scope.data = 4;
            $scope.month = 3;

            $scope.fun();
        });

        /*describe('checkEffectiveValue function testing ', function () {
            it('checkEffectiveValue is defined ', function () {
                expect($scope.checkEffectiveValue).toBeDefined();
            });

            it('checkEffectiveValue function call ', function () {
                $scope.checkEffectiveValue();
            });
        });*/

    });
});
