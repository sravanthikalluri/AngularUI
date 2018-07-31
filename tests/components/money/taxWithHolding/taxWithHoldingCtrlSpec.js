/*
/!**
 * Created by jaya krishna on 11/2/2015.
 *!/
describe('TaxWithHolding Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var utilService;

    var taxWithHoldingResponse = {
        "data": [{
            "StateTaxWithholdings": [{
                "addlAmount": "0",
                "addlExempts": "0",
                "allowancesRequested": "0",
                "payDedCode": "CA",
                "relatedEntity": "$$US",
                "desc": "California State Tax",
                "effectiveDate": "2015-10-17",
                "exempt": "Yes",
                "maritalStatus": "Single, or Married with two or more incomes",
                "type": "State tax",
                "payControlOrg": "31T"
            }],
            "FedTaxWithholdings": [{
                "addlExempts": "",
                "allowancesRequested": "0",
                "payDedCode": "$$US",
                "relatedEntity": "$$US",
                "desc": "Federal Tax",
                "effectiveDate": "2015-10-17",
                "exempt": "Yes",
                "maritalStatus": "Single",
                "type": "Federal tax",
                "payControlOrg": "31T"
            }],
            "LocalTaxWithholdings": [{
                "addlAmount": "0",
                "addlExempts": "0",
                "allowancesRequested": "0",
                "payDedCode": "CA",
                "relatedEntity": "$$US",
                "desc": "California State Tax",
                "effectiveDate": "2015-10-17",
                "exempt": "Yes",
                "maritalStatus": "Single, or Married with two or more incomes",
                "type": "State tax",
                "payControlOrg": "31T"
            }], "affirmationText1": true, "affirmationText2": "substantial presence test"
        }, {
            "StateTaxWithholdings": [{
                "addlExempts": "0",
                "allowancesRequested": "12",
                "payDedCode": "CA",
                "relatedEntity": "$$US",
                "desc": "California State Tax",
                "effectiveDate": "2015-10-01",
                "exempt": "Yes",
                "maritalStatus": "Single, or Married with two or more incomes",
                "type": "State tax",
                "payControlOrg": "7T1"
            }],
            "FedTaxWithholdings": [{
                "addlExempts": "",
                "allowancesRequested": "18",
                "payDedCode": "$$US",
                "relatedEntity": "$$US",
                "desc": "Federal Tax",
                "effectiveDate": "2015-10-01",
                "exempt": "Yes",
                "marriedFileSingle": "N",
                "maritalStatus": "Married",
                "type": "Federal tax",
                "payControlOrg": "7T1"
            }],
            "LocalTaxWithholdings": [{
                "addlAmount": "0",
                "addlExempts": "0",
                "allowancesRequested": "0",
                "payDedCode": "CA",
                "relatedEntity": "$$US",
                "desc": "California State Tax",
                "effectiveDate": "2015-10-17",
                "exempt": "Yes",
                "maritalStatus": "Single, or Married with two or more incomes",
                "type": "State tax",
                "payControlOrg": "31T"
            }]
        }],
        "_statusCode": "200",
        "_statusText": "OK"
    };

    var i9StatusResponse = {
        "data": "N",
        "_statusCode": "200",
        "_statusText": "OK",
        "_statusMessage": "Success"
    };

    var earningsCheckDateResponse = {
        "data": {
            "nextCheckIssueDate": "2016-01-15",
            "nextCheckDt": "2016-01-15",
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
            }, {
                "netPay": 432.06,
                "checkIssueDate": "2015-06-30",
                "checkDt": "2015-06-30",
                "checkKey": {
                    "payGroup": "S0",
                    "payPeriodEndDate": "2015-06-30",
                    "payEndDt": "2015-06-30",
                    "pageNo": "1",
                    "lineNo": "2",
                    "sepChk": "0",
                    "offCycle": "N",
                    "effDt": "2014-12-01"
                },
                "checkNumber": "3129436",
                "link": null
            }],
            "link": null
        }, "_statusCode": "200", "_statusText": "OK"
    };

    var fedAllowanceMaritalStatusUSResponse = {
        "data": [{
            "taxMaritalStat": "S",
            "taxMarStatDesc": "Single"
        }, {"taxMaritalStat": "M", "taxMarStatDesc": "Married"}], "_statusCode": "200", "_statusText": "OK"
    };

    var fedAllowanceMaritalStatusCAResponse = {
        "data": [{
            "taxMaritalStat": "S",
            "taxMarStatDesc": "Single"
        }, {"taxMaritalStat": "M", "taxMarStatDesc": "Married"}], "_statusCode": "200", "_statusText": "OK"
    };

    var taxWithHoldingPdfResponse = {
        data: {
            pdfUrl: "http://172.31.47.207/api-content/v1/money/state/StateWithholding/California_DE4.pdf/pdf",
            text: "California DE-4"
        },
        _statusCode: "200",
        _statusText: "OK"
    };



    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('taxWithHoldingCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });


        timerCallback = jasmine.createSpy('timerCallback');

        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }
        var appUserId = $scope.appUserId;


        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.payChecks)
            .respond(200, earningsCheckDateResponse);


        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/" + appUserId + moneyUrlConfig.resources.withHoldings)
            .respond(200, taxWithHoldingResponse);


        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.i9Status + "/" + appUserId)
            .respond(200, i9StatusResponse);


        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/$$US")
            .respond(200, fedAllowanceMaritalStatusUSResponse);


        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats + "/CA")
            .respond(200, fedAllowanceMaritalStatusCAResponse);

        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.forms + "/" + appConfig.countryCode + "/" + appConfig.stateCode)
            .respond(200, taxWithHoldingPdfResponse);


        $httpBackend.flush();



    });

    it('alertName Event testing', function () {
        var alert = [];
        $rootScope.$broadcast('alertName', alert);


    });

    it('itemsObjectEvent Event testing', function () {
        var itemsObject = {};
        $rootScope.$broadcast('itemsObjectEvent', itemsObject);
        expect($scope.itemsObject).toBeDefined();

    });

    describe('cancel fucnction test', function () {
        it('cancel is defined', function () {
            expect($scope.cancel).not.toBeDefined();

        });
    });

    describe('allowanceIncrease fucnction test', function () {
        it('allowanceIncrease is defined', function () {
            expect($scope.allowanceIncrease).toBeDefined();

        });
        it('allowanceIncrease function call', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "98",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                },
                    {
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "98",
                        "payDedCode": "CA",
                        "relatedEntity": "CA",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "Local tax",
                        "payControlOrg": "31T"
                    }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceIncrease(0);
        });

        it('allowanceIncrease function call', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "80",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                },
                    {
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "98",
                        "payDedCode": "CA",
                        "relatedEntity": "CA",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "Local tax",
                        "payControlOrg": "31T"
                    }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceIncrease(0);
        });

        it('allowanceIncrease function call with allowance requested as 100', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "99",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceIncrease(0);
        });

    });

    describe('allowanceDecrease function test', function () {
        it('allowanceDecrease is defined', function () {
            expect($scope.allowanceDecrease).toBeDefined();

        });
        it('allowanceDecrease function call', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "CA",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "Local tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceDecrease(0);
        });

        it('allowanceDecrease function call', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "99",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "CA",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "Local tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceDecrease(0);
        });

        it('allowanceDecrease function call', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "101",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.taxWithHoldingDataDetails = res.data[0];
            $scope.allowanceDecrease(0);
        });
    });

    describe('checkKey fucnction test with keycode 38', function () {
        it('checkKey is defined', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: 38};
            var index = 0;
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "98",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                },
                    {
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "98",
                        "payDedCode": "CA",
                        "relatedEntity": "CA",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "Local tax",
                        "payControlOrg": "31T"
                    }]
            };

            $scope.taxWithHolingDataObject = res.data;

            $scope.checkKey(e, index);
        });
        it('checkKey is defined with keycode 40', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: 40};
            var index = 0;

            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "CA",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "Local tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });

        it('checkKey is defined with keycode 50', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;

            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "99",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "CA",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "Local tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });

        it('checkKey is defined with keycode 50', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;

            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "98",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "CA",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "Local tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });

        it('checkKey is defined with keycode 50', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;

            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });
    });

    describe('checkKey fucnction test', function () {
        it('checkKey is  defined with keycode 38', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: '38'};
            var index = 0;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });
        it('checkKey is defined with keycode 40', function () {
            expect($scope.checkKey).toBeDefined();
            var e = {keyCode: '40'};
            var index = 0;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.checkKey(e, index);
        });
    });

    describe('fedCheckKey fucnction test', function () {
        it('fedCheckKey is defined with keycode 38', function () {
            expect($scope.fedCheckKey).toBeDefined();
            var e = {keyCode: '38'};
            var index = 0;
            $scope.fedCheckKey(e, index);
        });
        it('fedCheckKey is  defined with keycode 40', function () {
            expect($scope.fedCheckKey).toBeDefined();
            var e = {keyCode: '40'};
            var index = 0;
            $scope.fedCheckKey(e, index);
        });

        it('fedCheckKey is  defined with keycode 50', function () {
            expect($scope.fedCheckKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "99",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.fedCheckKey(e, index);
        });

        it('fedCheckKey is  defined with keycode 50', function () {
            expect($scope.fedCheckKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.fedCheckKey(e, index);
        });

        it('fedCheckKey is  defined with keycode 50', function () {
            expect($scope.fedCheckKey).toBeDefined();
            var e = {keyCode: 50};
            var index = 0;
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "98",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.fedCheckKey(e, index);
        });
    });

    describe('stateCheckKey fucnction test', function () {
        it('stateCheckKey is defined with keycode 38', function () {
            expect($scope.stateCheckKey).toBeDefined();
            var e = {keyCode: '38'};
            var index = 0;
            $scope.stateCheckKey(e, index);
        });

        it('stateCheckKey is  defined with keycode 40', function () {
            expect($scope.stateCheckKey).toBeDefined();
            var e = {keyCode: '40'};
            var index = 0;
            $scope.stateCheckKey(e, index);
        });
    });

    describe('allowanceFedIncrease fucnction test', function () {
        it('allowanceFedIncrease is defined', function () {
            expect($scope.allowanceFedIncrease).toBeDefined();
        });

        it('calling function ', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "98",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "0",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;

            $scope.allowanceFedIncrease(0);
        });

        it('calling function with input length is zero fedRange is 200', function () {
            $scope.taxWithHoldingDataLength = 0;
            $scope.fedRange = 200;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.allowanceFedIncrease(0);
        });

        it('calling function with input length is zero fedRange is 2', function () {
            $scope.taxWithHoldingDataLength = 0;
            $scope.fedRange = 1;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.allowanceFedIncrease(0);
        });
    });

    describe('allowanceFedDecrease function test', function () {
        it('allowanceFedDecrease is defined', function () {
            expect($scope.allowanceFedDecrease).toBeDefined();
        });

        it('calling function ', function () {
            var res = {
                "data": [{
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "100",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }, {
                    "addlAmount": "0",
                    "addlExempts": "0",
                    "allowancesRequested": "0",
                    "payDedCode": "CA",
                    "relatedEntity": "$$US",
                    "desc": "California State Tax",
                    "effectiveDate": "2015-10-17",
                    "exempt": "No",
                    "maritalStatus": "Single, or Married with two or more incomes",
                    "type": "State tax",
                    "payControlOrg": "31T"
                }]
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.allowanceFedDecrease(0);
        });

        it('calling function with input length is zero fedRange is 200', function () {
            $scope.taxWithHoldingDataLength = 0;
            $scope.fedRange = 200;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.allowanceFedDecrease(0);
        });

        it('calling function with input length is zero fedRange is 2', function () {
            $scope.taxWithHoldingDataLength = 0;
            $scope.fedRange = 2;
            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.taxWithHolingDataObject = res.data;
            $scope.allowanceFedDecrease(0);
        });
    });

    describe('allowanceStateIncrease function test', function () {
        it('allowanceStateIncrease is defined', function () {
            expect($scope.allowanceStateIncrease).toBeDefined();
        });

        it('allowanceStateIncrease function call stateRange is 12', function () {
            $scope.stateRange = 12;
            $scope.allowanceStateIncrease();

            expect($scope.flag).toBeTruthy();
        });

        it('allowanceStateIncrease function call stateRange is 200', function () {

            $scope.stateRange = 200;
            $scope.allowanceStateIncrease();
        });


    });

    describe('allowanceStateDecrease fucnction test', function () {
        it('allowanceStateDecrease is defined', function () {
            expect($scope.allowanceStateDecrease).toBeDefined();
        });

        it('allowanceStateDecrease function call stateRange is 12', function () {
            $scope.stateRange = 12;
            $scope.allowanceStateDecrease();

            expect($scope.flag).toBeTruthy();
        });

        it('allowanceStateDecrease function call stateRange is 200', function () {
            $scope.stateRange = 200;
            $scope.allowanceStateDecrease();
        });
    });

    describe('closeAlert fucnction test', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('closeAlert function called with a parameter', function () {
            $scope.alert = [
                {key1: 'value1'},
                {key2: 'value2'},
                {key3: 'value3'}
            ];
            $scope.closeAlert(0);

        });

        it('closeAlert function called with out a parameter', function () {
            $scope.alert = ['param1', 'param2'];
            $scope.closeAlert();

        });
    });

    describe('close fucnction test', function () {
        it('close is defined', function () {
            expect($scope.close).toBeDefined();
        });

        it('close function call', function () {
            $scope.close();
        });
    });

    describe('changeAddress function test', function () {
        it('changeAddress is defined', function () {
            expect($scope.changeAddress).toBeDefined();
        });

        it('changeAddress function call', function () {


            var res = {
                "data": [
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlAmount": "0",
                                "addlExempts": "0",
                                "allowancesRequested": "0",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "31T"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "0",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-17",
                                "exempt": "Yes",
                                "maritalStatus": "Single",
                                "type": "Federal tax",
                                "payControlOrg": "31T"
                            }
                        ]
                    },
                    {
                        "stateTaxWithholdings": [
                            {
                                "addlExempts": "0",
                                "allowancesRequested": "12",
                                "payDedCode": "CA",
                                "relatedEntity": "$$US",
                                "desc": "California State Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "maritalStatus": "Single, or Married with two or more incomes",
                                "type": "State tax",
                                "payControlOrg": "7T1"
                            }
                        ],
                        "fedTaxWithholdings": [
                            {
                                "addlExempts": "",
                                "allowancesRequested": "18",
                                "payDedCode": "$$US",
                                "relatedEntity": "$$US",
                                "desc": "Federal Tax",
                                "effectiveDate": "2015-10-01",
                                "exempt": "No",
                                "marriedFileSingle": "N",
                                "maritalStatus": "Married",
                                "type": "Federal tax",
                                "payControlOrg": "7T1"
                            }
                        ]
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.stateTaxWithholdings = res.data[0].stateTaxWithholdings;

            $scope.changeAddress();
        });
    });

    it('closeEvent Event testing', function () {
        var alert = [];
        $rootScope.$broadcast('closeEvent', alert);

    });

    it('alertEvent Event testing', function () {
        var alert = true;
        $rootScope.$broadcast('alertEvent', alert);

    });

    it('getObject Event testing', function () {
        var alert = [];
        $rootScope.$broadcast('getObject', alert);

    });

    it('dataLabelEvent Event testing', function () {
        var effectiveDate = '12/01/2015';
        $rootScope.$broadcast('dataLabelEvent', effectiveDate);

    });

    describe('taxWithHoldingDataDisplay function testing', function () {
        it('taxWithHoldingDataDisplay is defined', function () {
            expect($scope.taxWithHoldingDataDisplay).toBeDefined();
        });

        it('taxWithHoldingDataDisplay function call with value as 0 and success response', function () {
            var val = 0;
            var displayResponse = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "200", "_statusText": "OK"
            };
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/"
                + appConfig.userId + moneyUrlConfig.resources.withHoldings).respond(200, displayResponse);
            $scope.taxWithHoldingDataDisplay(val);
            $httpBackend.flush();

        });

        it('taxWithHoldingDataDisplay function call with value as 1 and success response', function () {
            var val = 1;
            var displayResponse = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "200", "_statusText": "OK"
            };
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/"
                + appConfig.userId + moneyUrlConfig.resources.withHoldings).respond(200, displayResponse);
            $scope.taxWithHoldingDataDisplay(val);
            $httpBackend.flush();

        });

        it('taxWithHoldingDataDisplay function call with failure response', function () {
            var val = 1;
            var displayResponse = {
                "data": [],
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/"
                + appConfig.userId + moneyUrlConfig.resources.withHoldings).respond(400, displayResponse);
            $scope.taxWithHoldingDataDisplay(val);
            $httpBackend.flush();

        });
    });

    describe('taxWithHoldingsEditForm function testing', function () {
        it('taxWithHoldingsEditForm is defined', function () {
            expect($scope.taxWithHoldingsEditForm).toBeDefined();
        });

        it('taxWithHoldingsEditForm function call with success response', function () {
            var payDedCode = "CA";
            var editResponse = {
                "data": [2],
                0: {
                    "taxMaritalStat": "S",
                    "taxMarStatDesc": "Single"
                },
                1: {
                    "taxMaritalStat": "M",
                    "taxMarStatDesc": "Married"
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats +
                "/" + payDedCode).respond(200, editResponse);

            $scope.taxWithHoldingsEditForm();
            $httpBackend.flush();
        });

        it('taxWithHoldingsEditForm function call with failure response', function () {
            var payDedCode = "CA";
            $scope.editFieldsDisabled = false;
            var editResponse = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats +
                "/" + payDedCode).respond(400, editResponse);

            $scope.taxWithHoldingsEditForm();
            $httpBackend.flush();
        });
    });

    describe('initTaxWithHoldingDataFn function testing', function () {
        it('initTaxWithHoldingDataFn function call with success response', function () {
            var taxWithHoldingResponse1 = {
                "data": [{
                    "StateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "FedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }],
                    "LocalTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }]
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            var i9StatusResponse1 = {"data": "N", "_statusCode": "200", "_statusText": "OK"};

            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/"
                + appConfig.userId + moneyUrlConfig.resources.withHoldings).respond(200, taxWithHoldingResponse1);
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.i9Status + "/"
                + appConfig.userId).respond(200, i9StatusResponse1);
            $scope.initTaxWithHoldingDataFn();
            $httpBackend.flush();
        });

        it('initTaxWithHoldingDataFn function call with failure response', function () {
            var taxWithHoldingResponse1 = {
                "data": [{
                    "StateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "FedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }],
                    "LocalTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }]
                }],
                "_statusCode": "400",
                "_statusText": "OK", "_error": {"detailMessage": "error"}
            };

            var i9StatusResponse1 = {
                "data": "N",
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/"
                + appConfig.userId + moneyUrlConfig.resources.withHoldings).respond(400, taxWithHoldingResponse1);
            $httpBackend.whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.i9Status + "/"
                + appConfig.userId).respond(400, i9StatusResponse1);
            $scope.initTaxWithHoldingDataFn();
            $httpBackend.flush();
        });
    });

    describe('warnState function testing', function () {
        it('warnState is defined', function () {
            expect($scope.warnState).toBeDefined();
        });

        it('warnState function call with state code as IN', function () {
            var stateCode = 'IN';
            $scope.warnState(stateCode);
        });

        it('warnState function call with state code as OH', function () {
            var stateCode = 'OH';
            $scope.warnState(stateCode);
        });

        it('warnState function call with state code as MD', function () {
            var stateCode = 'MD';
            $scope.warnState(stateCode);
        });
    });

    describe('setNEStateMaritalStatusData function testing',function(){
        it('setNEStateMaritalStatusData is defined',function(){
            expect($scope.setNEStateMaritalStatusData).toBeDefined();
        });

        it('setNEStateMaritalStatusData function call',function(){
            var index = 1;
            $scope.taxWithHolingDataObject = [{type:"Federal tax"},{type:"Federal tax"}]
            $scope.setNEStateMaritalStatusData(index);
        });
    });
});
*/
