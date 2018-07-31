/**
 * Created by Santosh on 11/4/2015.
 */

'use strict';
describe('Your Company Required Forms Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend;

    var response = {
        "data": {
            "eforms_data": [{
                "formId": "1015",
                "formStatus": "Accept",
                "formDesc": "Employee Handbook",
                "formPath": "Employee_Handbook.htm",
                "timeStamp": "2015-10-07"
            }]
        }, "_statusCode": "200", "_statusText": "OK"
    };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('yourCompanyRequiredFormsCtrl', {$scope: $scope});

        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + appConfig.companyId + '/' + appConfig.userId + '/form-statuses').respond(200, response);

        $httpBackend.flush();

    });

    describe('showDiv function testing', function () {

        it('showDiv is defined', function () {
            expect($scope.showDiv).toBeDefined();
        });

        it('showDiv function call', function () {
            $scope.showDiv();
            expect($scope.visible).toBeTruthy();
        });
    });

    describe('employeeAccept function testing', function () {

        it('employeeAccept function is defined', function () {
            expect($scope.employeeAccept).toBeDefined();
        });

        it('employeeAccept function is called with success response', function () {
            var data = {
                "formStatus": "accepted",
                formId: "1015"
            };

            var yourCompanyFormsResponse = {
                _statusCode: "200",
                formId: "1015"
            };
            $httpBackend.expect('POST', benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + appConfig.companyId + '/' + appConfig.userId + '/form-statuses?enableValidation=true', data)
                .respond(200, yourCompanyFormsResponse);

            $scope.employeeAccept();

            $httpBackend.flush();
            expect($scope.buttonText).toEqual("Accepted");


        });

        it('employeeAccept function is called with failure response', function () {
            var data = {
                "formStatus": "accepted",
                formId: "1015"
            };

            var yourCompanyFormsResponse = {
                _statusCode: "400", "_error": {"detailMessage": "error"}
            };
            $httpBackend.expect('POST', benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + appConfig.companyId + '/' + appConfig.userId + '/form-statuses?enableValidation=true', data)
                .respond(400, yourCompanyFormsResponse);

            $scope.employeeAccept();

            $httpBackend.flush();
            expect($scope.buttonText).toEqual("Rejected");


        });

        it('employeeAccept function is called with error response', function () {
            var data = {
                "formStatus": "accepted",
                formId: "1015"
            };

            var yourCompanyFormsResponse = {};
            $httpBackend.expect('POST', benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + appConfig.companyId + '/' + appConfig.userId + '/form-statuses?enableValidation=true', data)
                .respond(200, yourCompanyFormsResponse);


            $scope.employeeAccept();

            $httpBackend.flush();

            expect($scope.buttonText).toBeDefined();
            expect($scope.accepting).toBeDefined();
            expect($scope.accepting).toBeTruthy();
            expect($scope.visibleImage).toBeDefined();
            expect($scope.visibleImage).toBeTruthy();

            expect($scope.buttonText).toEqual("Accepted");


        });
    });

    describe('empHandbookPDF function Testing', function () {

        it('empHandbookPDF function is defined', function () {
            expect($scope.empHandbookPDF).toBeDefined();
        });

        it('empHandbookPDF function is called with success response', function () {

            var responsedata = {
                "data": {"docMeta": [{"url": "/companyaddendum/pdf"}, {"url": "/companyaddendum/pdf"}, {"url": "/companyaddendum/pdf"}]},
                "_statusCode": "200", "_statusText": "OK"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies).respond(200, responsedata);

            $scope.empHandbookPDF();
            $httpBackend.flush();
        });

        it('empHandbookPDF function is called with failure response', function () {

            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies).respond(400, response);

            $scope.empHandbookPDF();
            $httpBackend.flush();


        });
    });
});