/**
 * Created by jaya krishna on 11/5/2015.
 */
describe('Money Forms Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var $compile,
        $body = $('body'),
        el,
        simpleHTML = '<div class="form-content-block" id="manager"></div>' +
            '<div class="form-content-block" id="employee"></div>' +
            '<div class="form-content-block" id="payroll"></div>';

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('moneyFormsCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
        });

        var response = {
                           "data": {
                               "corporateBrand": "TRINET",
                               "manager": true,
                               "forms": [
                                   {
                                       "title": "Federal Tax",
                                       "category": null,
                                       "desc": null,
                                       "body": null,
                                       "urlType": "federalTax",
                                       "pdfs": {
                                           "sub": [],
                                           "urlType": "federalTax",
                                           "text": "Federal Tax Forms"
                                       },
                                       "additional-details": null,
                                       "docMeta": null
                                   },
                                   {
                                       "title": "Nonresident Alien",
                                       "category": null,
                                       "desc": null,
                                       "body": null,
                                       "urlType": "nonResidentAlien",
                                       "pdfs": {
                                           "sub": [],
                                           "urlType": "nonResidentAlien",
                                           "text": "Nonresident Alien Forms"
                                       },
                                       "additional-details": null,
                                       "docMeta": null
                                   },
                                   {
                                       "title": "State Withholding Forms",
                                       "category": null,
                                       "desc": null,
                                       "body": null,
                                       "urlType": "stateWithHolding",
                                       "pdfs": {},
                                       "additional-details": null,
                                       "docMeta": null
                                   }
                               ]
                           },
                           "_requestId": "9af04a59-1d9a-462c-b9e0-02e46c607775",
                           "_statusCode": "200",
                           "_statusText": "OK",
                           "_statusMessage": "Success"
                       };
        $httpBackend.whenGET( companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
            "/" + appConfig.companyId + "/" + $scope.appUserId +
            "/forms?countryCode=" + appConfig.countryCode+"&module=money")
            .respond(200,response);
        $scope.loadForms();
        $httpBackend.flush();
    });


    describe('if statement testing ', function () {

        var $scope = {};
        var appConfig = {userId: '123'};
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }

        expect($scope.appUserId).toBeDefined();
    });

    describe('loadForms function testing ', function () {
        it('loadForms is defined ', function () {
            expect($scope.loadForms).toBeDefined();
        });

        it('loadForms function call with success response', function () {

            var response = {
                data: {
                    forms: [{}, {}]

                },
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + $scope.appUserId +
                    "/forms?countryCode=" + appConfig.countryCode + "&module=money")
                .respond(200, response);
            $scope.loadForms();
            expect($scope.moneyFormData).toBeDefined();
        });

        it('loadForms function call with success response and data as null', function () {

            var response = {
                data: [],
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + $scope.appUserId +
                    "/forms?countryCode=" + appConfig.countryCode + "&module=money")
                .respond(200, response);
            $scope.loadForms();
            $httpBackend.flush();

        });

        it('loadForms function call with failure response', function () {

            var response = {
                data: [],
                _statusCode: "400",
                _statusText: "OOPs Error",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + $scope.appUserId +
                    "/forms?countryCode=" + appConfig.countryCode + "&module=money")
                .respond(400, response);
            $scope.loadForms();
            $httpBackend.flush();

        });


    });

    describe('getSelectedTabData  function testing', function () {
        it('getSelectedTabData  is defined', function () {
            expect($scope.getSelectedTabData).toBeDefined();
        });

        it('getSelectedTabData function call with url type as employee', function () {
            var urlType = 'employee';
            var response = {
                "data": {
                    "corporateBrand": "AMBROSE",
                    "manager": true,
                    "urlType": "payroll",
                    "forms": [
                        {
                            "title": "Employee Forms",
                            "category": null,
                            "desc": null,
                            "body": null,
                            "urlType": "employee",
                            "additional-details": null,
                            "docMeta": null
                        }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            if (el.children().length === 0) {

                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                        "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                    .respond(200, response);

                $scope.getSelectedTabData(urlType);

                $httpBackend.flush();

                expect($scope.checked).toEqual(urlType);

            }

        });

        it('getSelectedTabData function call with url type as payroll', function () {
            var urlType = 'payroll';
            var response = {
                "data": {
                    "corporateBrand": "AMBROSE",
                    "manager": true,
                    "urlType": "payroll",
                    "forms": [
                        {
                            "title": "Employee Forms",
                            "category": null,
                            "desc": null,
                            "body": null,
                            "urlType": "employee",
                            "additional-details": null,
                            "docMeta": null
                        }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            if (el.children().length === 0) {

                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                        "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                    .respond(200, response);

                $scope.getSelectedTabData(urlType);

                $httpBackend.flush();
                expect($scope.checked).toEqual(urlType);
            }
        });

        it('getSelectedTabData function call with url type as manager', function () {
            var urlType = 'manager';
            var response = {
                "data": {
                    "corporateBrand": "AMBROSE",
                    "manager": true,
                    "urlType": "manager",
                    "sub": [
                        {
                            "title": "Employee Forms",
                            "category": null,
                            "desc": null,
                            "body": null,
                            "urlType": "employee",
                            "additional-details": null,
                            "docMeta": null
                        }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            if (el.children().length === 0) {

                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                        "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                    .respond(200, response);

                $scope.getSelectedTabData(urlType);

                $httpBackend.flush();
                expect($scope.checked).toEqual(urlType);
            }
        });

        it('getSelectedTabData function call with failure response', function () {
            var urlType = 'manager';
            var response = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            if (el.children().length === 0) {

                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                        "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                    .respond(400, response);

                $scope.getSelectedTabData(urlType);

                $httpBackend.flush();
                expect($scope.checked).toEqual(urlType);
            }
        });
    });

    describe('toggleStates function testing',function(){
        it('toggleStates is defined',function(){
            expect($scope.toggleStates).toBeDefined();
        });

        it('toggleStates function call with value as close',function(){
            var value = 'close';
            var e = jQuery.Event("click");
            $scope.toggleStates(e,value);
        });

        it('toggleStates function call with value not as close and success response',function(){
            var value = 'open';
            var e = jQuery.Event("click");
            var stateResponse = {
                               "data": {
                                   "manager": false,
                                   "forms": [
                                       {
                                           "title": "State Withholding Forms",
                                           "category": null,
                                           "desc": null,
                                           "body": null,
                                           "urlType": "stateWithHolding",
                                           "pdfs": {
                                               "urlType": "stateWithHolding",
                                               "text": "State WithHolding Forms",
                                               "state": [
                                                   {
                                                       "sub": [
                                                           {
                                                               "description": "Calculate your state tax withholding.",
                                                               "label": "Alabama A-4",
                                                               "url": "/v1/extranet/Includes/Content/forms/PDF/StateWithholding/Alabama_A4.pdf"
                                                           }
                                                       ],
                                                       "count": "1",
                                                       "label": "Alabama"
                                                   }
                                               ]
                                           },
                                           "additional-details": null,
                                           "docMeta": null
                                       }
                                   ]
                               },
                               "_requestId": "abe59ad5-cc4f-4a22-a0af-e8931db04e6a",
                               "_statusCode": "200",
                               "_statusText": "OK",
                               "_statusMessage": "Success"
                           }
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                 "/" + $scope.companyId +"/" + $scope.appUserId +"/stateTaxForms").respond(200,stateResponse);
            $scope.toggleStates(e,value);
            $httpBackend.flush();
        });

        it('toggleStates function call with value not as close and failure response',function(){
            var value = 'open';
            var e = jQuery.Event("click");
            var stateFailureResponse = {
                                data : [],
                                _statusCode: "400",
                                _statusText : "OOPs Error",
                                "_error":{"detailMessage":"error"}};
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                 "/" + $scope.companyId +"/" + $scope.appUserId +"/stateTaxForms").respond(400,stateFailureResponse);
            $scope.toggleStates(e,value);
            $httpBackend.flush();
        });
    });

    describe('closePanel function testing', function () {
        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call', function () {
            var evt = {
                "currentTarget": ""
            };

            $scope.closePanel(evt);
        });
    });

    describe('selectTabAcc function testing', function () {
        it('selectTabAcc is defined', function () {
            expect($scope.selectTabAcc).toBeDefined();
        });

        it('selectTabAcc function call with value 2', function () {
            var value = 2;
            var acc;
            var evt = {
                "currentTarget": ""
            };
            $scope.selectTabAcc(value, acc, evt);
        });

        it('selectTabAcc function call with value 3', function () {
            var value = 3;
            var acc;
            var evt = {
                "currentTarget": ""
            };
            $scope.selectTabAcc(value, acc, evt);
        });
    });

    afterEach(function () {
        $body.empty();
    });


});
