/**
 * Created by jaya krishna on 10/28/2015.
 */




describe('Addtional Payment Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    var $compile,
        $body = $('body'),
        el,
        simpleHTML = '<input type="text" class="form-control no-border" name="beginDate" id="pay_begin_date" />' +
            '<input type="text" class="form-control no-border" name="endDate"  id="pay_end_date" />' +
            '<input type="text" class="form-control no-border" name="minDate"  id="pay_effective_date" />';
    var e3, simpleHTML2 = '<input type="text" class="form-control no-border" name="minDate" value="17/3/2016" id="pay_effective_date"/>';


    var moneyPayDataRes = {
        "data": [{
            "action": "Begin",
            "auditKey": 5136792,
            "beginDate": "2002-10-30",
            "company": "31T",
            "earnAmount": null,
            "earnType": "CMS",
            "endDate": "2003-10-30",
            "goalAmount": "$100,000.00",
            "paymentFrequency": "Every Payroll",
            "pfClient": "0417",
            "subjectId": "00001000483",
            "subjectName": "Darrick Ambres",
            "submitById": "00001005514",
            "submitByName": "Cletus Albro",
            "submitDate": "2015-08-23"
        }], "errorCode": null, "_statusCode": "200", "_statusMessage": "Success"
    };

    var payFreqDataRes = {
        "data": [{"key": "First", "value": "1st payroll of Month"}, {
            "key": "Second",
            "value": "2nd payroll of Month"
        }, {"key": "FirstSecond", "value": "1st & 2nd payrolls of Month"}, {"key": "Every", "value": "Every Payroll"}],
        "errorCode": null,
        "_statusCode": "200",
        "_statusMessage": "Success"
    };

    var earnTypeDataRes = {
        data: [
            {
                "key": "10M",
                "value": "10 Month Election"
            },
            {
                "key": "22",
                "value": "hone-Non Taxable"
            }
        ],
        errorCode: null,
        _statusCode: 200,
        _statusMessage: "Success",
        "_error": {
            message: 'error'
        }
    };

    beforeEach(function () {
        module('TrinetPassport');


        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function (data) {
                $scope.alert = data;
            };
            $injector.get('$controller')('addlPaymentCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });

        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }


        var appUserId = $scope.appUserId;

        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay).respond(200, moneyPayDataRes);


        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            appConfig.companyId + globalUrlConfig.resources.payFreq).respond(200, payFreqDataRes);


        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            appConfig.companyId + globalUrlConfig.resources.earnType).respond(200, earnTypeDataRes);


        $httpBackend.flush();
    });

    describe('closeAlert function test', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('calling closeAlert function with out a prameter', function () {
            $scope.alert = [];
            $scope.closeAlert();
        });

        it('calling closeAlert function with a prameter', function () {
            $scope.alert = [];
            $scope.createNewPaymentPopUp = {};
            $scope.createNewPaymentPopUp.id = 123;
            $scope.closeAlert(0, 'success');
        });

        it('calling closeAlert function with a prameter', function () {
            $scope.alert = [];
            $scope.viewTransDetailsPopUp = {};
            $scope.viewTransDetailsPopUp.id = 123;
            $scope.closeAlert(0, 'success');
        });
    });


    describe('onOFF function test', function () {
        it('onOFF is defined', function () {
            expect($scope.onOFF).toBeDefined();
        });
    });

    describe('closePanel function test', function () {
        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });
    });

    describe('viewTransDetails function test', function () {
        it('viewTransDetails is defined', function () {
            expect($scope.viewTransDetails).toBeDefined();
        });
        it('viewTransDetails function call', function () {
           var rowId = 1,
               event = {currentTarget : {nodeName :'TD'}};
           $scope.viewTransDetails(rowId,event);
        });
    });

    describe('submitTransDetails function test', function () {
        it('submitTransDetails is defined', function () {
            expect($scope.submitTransDetails).toBeDefined();
        });

        it('submitTransDetails function call', function () {
            $scope.submitTransDetails();

            expect($scope.onSelectedPaymentRow).toBeDefined();
        });
    });

    describe('createPaymentDetails function testing', function () {
        it('createPaymentDetails is defined', function () {
            expect($scope.createPaymentDetails).toBeDefined();
        });

        it('createPaymentDetails function call', function () {
            $scope.createPaymentDetails();
        });
    });

    describe('validateData function testing', function () {
        it('validateData is defined', function () {
            expect($scope.validateData).toBeDefined();
        });

        it('validateData createPayForm is invalid  function call', function () {
            var formName = {$valid:false};
            $scope.validateData(formName);

            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();
        });


        it('validateData createPayForm is valid  function call', function () {
            spyOn($scope, 'createPayData');

            var formName = {$valid:true};
            $scope.validateData(formName);

            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();

            expect($scope.createPayData).toHaveBeenCalled();
        });

    });

    /*describe('createPayData function testing', function () {


        it('createPayData is defined', function () {
            expect($scope.createPayData).toBeDefined();
        });

        it('createPayData with status code = 200 function call', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.pay = {};

            $scope.pay.company = appConfig.companyId;
            $scope.pay.subjectId = appUserId;
            $scope.pay.submitById = appConfig.userId;

            var beginDate = angular.element('#pay_begin_date').val(),
                endDate = angular.element('#pay_end_date').val();
            beginDate = beginDate.substring(6, 10) + '-' + beginDate.substring(0, 2) + '-' + beginDate.substring(3, 5);
            endDate = endDate.substring(6, 10) + '-' + endDate.substring(0, 2) + '-' + endDate.substring(3, 5);
            $scope.pay.beginDate = beginDate;
            $scope.pay.endDate = endDate;
            $scope.pay.earnType = angular.isObject($scope.pay.earnType) ? $scope.pay.earnType.key : '';
            $scope.pay.paymentFrequency = angular.isObject($scope.pay.paymentFrequency) ? $scope.pay.paymentFrequency.key : '';


            var createPayResponse = {
                _statusCode: "200"
            };
            var appUserId = $scope.appUserId;

            $httpBackend
                .when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay+'?enableValidation=true', $scope.pay)
                .respond(200, createPayResponse);


            $scope.createPayData();

            $httpBackend.flush();

            expect($scope.pay).toBeDefined();

        });


        it('createPayData with status code != 200 function call', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.pay = {};

            $scope.pay.company = appConfig.companyId;
            $scope.pay.subjectId = appUserId;
            $scope.pay.submitById = appConfig.userId;

            var beginDate = angular.element('#pay_begin_date').val(),
                endDate = angular.element('#pay_end_date').val();
            beginDate = beginDate.substring(6, 10) + '-' + beginDate.substring(0, 2) + '-' + beginDate.substring(3, 5);
            endDate = endDate.substring(6, 10) + '-' + endDate.substring(0, 2) + '-' + endDate.substring(3, 5);
            $scope.pay.beginDate = beginDate;
            $scope.pay.endDate = endDate;
            $scope.pay.earnType = angular.isObject($scope.pay.earnType) ? $scope.pay.earnType.key : '';
            $scope.pay.paymentFrequency = angular.isObject($scope.pay.paymentFrequency) ? $scope.pay.paymentFrequency.key : '';


            var createPayResponse = {
                _statusCode: "400",
                _statusText: 'Opps Error',
                "_error": {"detailMessage": "error"}
            };
            var appUserId = $scope.appUserId;


            $httpBackend
                .when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay+'?enableValidation=true', $scope.pay)
                .respond(400, createPayResponse);


            $scope.createPayData();

            $httpBackend.flush();
            expect($scope.pay).toBeDefined();


        });
    });*/

    describe('savePayData  function testing', function () {


        it('savePayData is defined', function () {
            expect($scope.savePayData).toBeDefined();
        });

        it('savePayData with status code = 200 function call', function () {
            $scope.submitTransactionData = {};

            e3 = $compile(simpleHTML2)($scope);
            $body.append(e3);
            $rootScope.$digest();
            var data = {
                'auditKey': $scope.submitTransactionData.auditKey,
                'company': $scope.submitTransactionData.company,
                'endDate': "016-17-3/",
                'subjectId': $scope.submitTransactionData.subjectId,
                'submitById': $scope.submitTransactionData.submitById
            };


            var updateResponse = {
                _statusCode: "200"
            };
            var appUserId = $scope.appUserId;


            $httpBackend
                .when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay+'?enableValidation=true', data)
                .respond(200, updateResponse);

            $scope.savePayData();

            $httpBackend.flush();
        });


        it('Test savePayData with status code != 200 function call', function () {
            $scope.submitTransactionData = {};


            e3 = $compile(simpleHTML2)($scope);
            $body.append(e3);
            $rootScope.$digest();

            var data = {
                'auditKey': $scope.submitTransactionData.auditKey,
                'company': $scope.submitTransactionData.company,
                'endDate': '016-17-3/',
                'subjectId': $scope.submitTransactionData.subjectId,
                'submitById': $scope.submitTransactionData.submitById
            };


            var updateResponse = {
                _statusCode: "400",
                _statusText: 'Opps Error',
                "_error": {"detailMessage": "error"}
            };
            var appUserId = $scope.appUserId;


            $httpBackend
                .when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay+'?enableValidation=true', data)
                .respond(400, updateResponse);

            $scope.savePayData();

            $httpBackend.flush();
        });

        it('Test savePayData with status code != 200 function call', function () {
            $scope.submitTransactionData = {};

            var simpleHTML3 = '<input type="text" class="form-control no-border" name="minDate" id="pay_effective_date"/>';

            var e4 = $compile(simpleHTML3)($scope);
            $body.append(e4);
            $rootScope.$digest();
            var data = {
                'auditKey': $scope.submitTransactionData.auditKey,
                'company': $scope.submitTransactionData.company,
                'endDate': "",
                'subjectId': $scope.submitTransactionData.subjectId,
                'submitById': $scope.submitTransactionData.submitById
            };


            var updateResponse = {
                _statusCode: "400",
                _statusText: 'Opps Error',
                "_error": {"detailMessage": "error"}
            };
            var appUserId = $scope.appUserId;


            $httpBackend
                .when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay+'?enableValidation=true', data)
                .respond(400, updateResponse);

            $scope.savePayData();

            $httpBackend.flush();
        });


    });

    describe('windowReload function testing', function () {
        it('windowReload is defined', function () {
            expect($scope.windowReload).toBeDefined();
        });

        it('windowReload function call', function () {
            $scope.windowReload();
        });
    });

    describe('onFocus function testing', function () {
        it('onFocus is defined', function () {
            expect($scope.onFocus).toBeDefined();
        });

        it('onFocus function call', function () {
            var name = 'createPayment';
            var obj = {
                createPayment: {
                    blur: {
                        beginDateRequired: null,
                        endDateRequired: null
                    },
                    focus: {
                        beginDateRequired: null,
                        endDateRequired: null
                    }
                }
            };
            $scope.onFocus(name, obj.createPayment.focus);
        });
    });

    describe('closeCreatePanel function call',function(){
        it('closeCreatePanel is defined',function(){
            expect($scope.closeCreatePanel).toBeDefined();
        });

        it('closeCreatePanel function call',function(){
            $scope.closeCreatePanel();
        });
    });

    afterEach(function () {
        $body.empty();
    });
});

