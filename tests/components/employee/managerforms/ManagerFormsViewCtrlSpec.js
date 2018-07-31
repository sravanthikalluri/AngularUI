/**
 * Created by jaya krishna on 10/29/2015.
 */
describe('manager forms view controller testing', function () {

    var $scope;
    var $rootScope;
    var appConfig;
    var $httpBackend;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('managerFormViewCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');

        });

        var response = {
            "data": {
                "corporateBrand": "TRINET",
                "manager": true,
                "forms": [{
                    "title": "Employee Forms",
                    "category": null,
                    "desc": null,
                    "body": null,
                    "additional-details": null,
                    "doc-meta": null
                }]
            }, "_statusCode": "200", "_statusText": "OK"
        };
        $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?countryCode=" + appConfig.countryCode)
            .respond(200, response);
        $httpBackend.flush();
    });

    describe('selectTab function testing ', function () {
        it("selectTab is defined", function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call with out a parameter ', function () {
            $scope.selectTab();

            expect($scope.tab).not.toBeDefined();
        });

        it('selectTab function call with a parameter ', function () {
            var setTab = 1;
            $scope.selectTab(setTab);

            expect($scope.tab).toBeDefined();
            expect($scope.tab).toBe(setTab);

        });
    });

    describe('isSelected function testing ', function () {
        it("isSelected is defined", function () {
            expect($scope.isSelected).toBeDefined();
        });

        it("when isSelected function called with a parameter", function () {
            $scope.tab = 1;
            expect($scope.tab).toEqual(1);
            expect($scope.isSelected(1)).toBeTruthy();
        });

        it("when isSelected function called without a parameter", function () {
            $scope.tab = 1;
            expect($scope.tab).toEqual(1);
            expect($scope.isSelected()).toBeFalsy();
        });
    });

    describe('countMe function testing ', function () {
        it("countMe is defined", function () {
            expect($scope.countMe).toBeDefined();
        });

        it('countMe function is called with success response and data = 0', function () {
            var urlType = 'employee';
            var response = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                .respond(200, response);

            $scope.countMe(urlType);

            $httpBackend.flush();
            expect($scope.checked).toEqual(urlType);
        });

        it('countMe function is called with failure response ', function () {
            var urlType = 'employee';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                .respond(400, response);

            $scope.countMe(urlType);

            $httpBackend.flush();
            expect($scope.checked).toEqual(urlType);
        });

        it('countMe function is called with success response and urlType as payroll ', function () {
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
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                .respond(200, response);

            $scope.countMe(urlType);

            $httpBackend.flush();
            expect($scope.checked).toEqual(urlType);
        });

        it('countMe function is called with success response and urlType as employee ', function () {
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
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                .respond(200, response);

            $scope.countMe(urlType);

            $httpBackend.flush();
            expect($scope.checked).toEqual(urlType);
        });

        it('countMe function is called with success response and urlType as manager ', function () {
            var urlType = 'manager';
            var response = {
                "data": {
                    "corporateBrand": "AMBROSE",
                    "manager": true,
                    "urlType": "payroll",
                    "sub": [
                        {
                            "title": "Employee Forms",
                            "category": null,
                            "desc": null,
                            "body": null,
                            "urlType": "employee",
                            "additional-details": null,
                            "docMeta": null
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?formType=" + urlType + "&countryCode=" + appConfig.countryCode)
                .respond(200, response);

            $scope.countMe(urlType);

            $httpBackend.flush();
            expect($scope.checked).toEqual(urlType);
        });


    });

    describe('closePanel function testing ', function () {
        it("closePanel is defined", function () {
            expect($scope.closePanel).toBeDefined();
        });

        it("closePanel function call with out a parameter ", function () {
            $scope.closePanel();
            expect($scope.tab).toEqual(0);
        });

        it("closePanel function call with a parameter ", function () {
            var setTab = 1;
            $scope.closePanel(setTab);
            expect($scope.tab).toEqual(0);
        });
    });

    describe("loadForms function testing", function () {

        it('loadForms is defined', function () {
            expect($scope.loadForms).toBeDefined();
        });

        it('loadForms function is called with success response and length > 0', function () {
            var response = {
                "data": {
                    "corporateBrand": "TRINET",
                    "manager": true,
                    "forms": [{
                        "title": "Employee Forms",
                        "category": null,
                        "desc": null,
                        "body": null,
                        "additional-details": null,
                        "doc-meta": null
                    }]
                }, "_statusCode": "200", "_statusText": "OK"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?countryCode=" + appConfig.countryCode)
                .respond(200, response);
            $scope.loadForms();
            $httpBackend.flush();

        });

        it('loadForms function is called with success response and length = 0', function () {
            var response = {"data": [], "_statusCode": "200", "_statusText": "OK"};
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?countryCode=" + appConfig.countryCode)
                .respond(200, response);
            $scope.loadForms();
            $httpBackend.flush();

        });

        it('loadForms function is called with failure response', function () {
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?countryCode=" + appConfig.countryCode)
                .respond(400, response);
            $scope.loadForms();
            $httpBackend.flush();

        });


    });

    describe('iconType function testing',function(){
        it('iconType is defined',function(){
            expect($scope.iconType).toBeDefined();
        });

        it('iconType function call with value as pdf',function(){
            var value = 'pdf';
            $scope.iconType(value);
        });

        it('iconType function call with value as excel',function(){
            var value = 'excel';
            $scope.iconType(value);
        });
    });


});