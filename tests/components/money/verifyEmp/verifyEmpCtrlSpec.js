/*Created by ganesh on 12/10/2015.*/

(function () {

    "use strict";

    describe('Verify Employee Controller Testing', function () {


        var $rootScope,
            $scope,
            $httpBackend,
            appConfig;

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $scope = $rootScope.$new();
                $injector.get('$controller')('verifyEmpCtrl', {$scope: $scope});
            });

        });


        describe('initVerificationDataFn function testing', function () {

            it('initVerificationDataFn is defined', function () {
                expect($scope.initVerificationDataFn).toBeDefined();
            });

            it('initVerificationDataFn function call with success response', function () {

                var verificationResponse = {
                    "data": {
                        "employeeVerification": {
                            "pdfUrl": "/api-content/v1/Help/docs/pdf/Employment_and_Income_Verification_Information.pdf/pdf",
                            "label": "Click here",
                            "subText": "For information on employment or income verification services please"
                        },
                        "text": "TriNet uses The Work Number, a service of TALX Corporation, to provide automated employment and income verifications. Your verifiers will benefit by receiving immediate access to information that is convenient, accurate and secure. The Work Number information you need to get started is listed below.",
                        "entityVerification": {
                            "pdfUrl": "/api-content/v1/Help/docs/pdf/Verifier_Response_Card.pdf/pdf",
                            "label": "Click here",
                            "subText": "To obtain instructions for the entity requesting verification of your income or employment please"
                        }
                    },
                    "_statusCode": "200",
                    "_statusText": "OK"
                };


                $httpBackend
                    .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                        moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/" +
                        appConfig.userId + moneyUrlConfig.resources.verification)
                    .respond(200, verificationResponse);


                $scope.initVerificationDataFn();

                $httpBackend.flush();

                expect($scope.verification).toBeDefined();
            });


            it('initVerificationDataFn function call with failure response', function () {

                var verificationResponse = {
                    "data": {},
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                };


                $httpBackend
                    .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                        moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/" +
                        appConfig.userId + moneyUrlConfig.resources.verification)
                    .respond(400, verificationResponse);


                $scope.initVerificationDataFn();

                $httpBackend.flush();


            });

        });


    });

}());
