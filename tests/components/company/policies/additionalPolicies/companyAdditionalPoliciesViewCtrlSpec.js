/**
 * Created by Santosh on 11/2/2015.
 */
'use strict';
describe('Company Additional Policies View Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend;


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('companyAdditionalPoliciesViewCtrl', {
                $scope: $scope
            });

        });

        window.location.hash = "#/companyAdditionalPoliciesView";
    });

    describe('onload call testing',function(){
        it('Http Back End Call with success response', function () {

            var response = {
                "data": {
                    "additionalFormsMenuId": "4",
                    "benefitsMenuId": "86266",
                    "benefitIndicator": false,
                    "managerMenuId": "3",
                    "policyMenuId": "2"
                }, "_statusCode": "200", "_statusText": "OK"
            };

            var additiondata = {
                "additionalData": [
                    {
                        "id": "policyMenuId",
                        "link": "app/components/benefits/policies/additionalPolicies/policiesAndProcedures/policiesAndProceduresView.html",
                        "title": "Policies and Procedures",
                        "desc": "Find out what your company policies and procedures are.",
                        "viewDesc": "Need a look at the rules your company lives by? Check out your company's additional Policies and Procedures not found in other places.",
                        "baseUrl": "additionalPolicies/policies"
                    }
                ]
            };


            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient).respond(200, response);

            $httpBackend.whenGET("assets/data/benefits/benefitAdditionalData.json").respond(200, additiondata);

            $httpBackend.flush();
            expect($scope.additionalPoliciesData).toEqual(response.data);

        });

        it('Http Back End Call with failure response', function () {

            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            var additiondata = {
                "additionalData": [], "_error": {"detailMessage": "error"}
            };


            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'additional-policies?pfClient=' + appConfig.pfClient).respond(400, response);

            $httpBackend.whenGET("assets/data/benefits/benefitAdditionalData.json").respond(400, additiondata);

            $httpBackend.flush();


        });
    });
});