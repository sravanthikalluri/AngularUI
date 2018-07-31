/**
 * Created by Santosh on 11/3/2015.
 */

'use strict';
describe('Policies And Procedures Controller Testing ', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {
            "data": {
                "additionalFormsMenuId": "2",
                "benefitsMenuId": "86266",
                "benefitIndicator": false,
                "managerMenuId": "3",
                "policyMenuId": "2"
            }, "_statusCode": "200", "_statusText": "OK"
        },
        res = {
            "data": [{
                "linkUrl": "/CustomFolders/Objects/Company/31T/ADDL_POLC/policy/pdf_doc/New_Customer_Advisements_Mktg_Approved.pdf",
                "linkName": "New File44444"
            }], "_statusCode": "200", "_statusText": "OK"
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('policiesAndProceduresCtrl', {$scope: $scope});

        });


    });

    describe('onload call', function () {
        it('with success response', function () {
            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient)
                .respond(200, response);

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policy-details?pfClient=' + appConfig.pfClient + '&menuId=2')
                .respond(200, res);


            $httpBackend.flush();
        });

        it('with success response and data as 0 for inner service', function () {
            var res = {
                            "data": [], "_statusCode": "200", "_statusText": "OK"
                        };
            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient)
                .respond(200, response);

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policy-details?pfClient=' + appConfig.pfClient + '&menuId=2')
                .respond(200, res);


            $httpBackend.flush();
        });

        it('with failure response for inner service', function () {
            var res = {
                            "data": [], "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}
                        };
            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient)
                .respond(200, response);

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policy-details?pfClient=' + appConfig.pfClient + '&menuId=2')
                .respond(400, res);


            $httpBackend.flush();
        });

        it('with failure response', function () {
            var failureResponse = {
                "data": {}, "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}
            };
            var failureRes = {
                "data": [], "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}
            };
            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient)
                .respond(400, failureResponse);

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policy-details?pfClient=' + appConfig.pfClient + '&menuId=2')
                .respond(400, failureRes);


            $httpBackend.flush();
        });
    });


});