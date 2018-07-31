/**
 * Created by Jayakrishna on 12/02/2015.
 */

'use strict';
describe('MetLife Benefits Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {
            data: {
                companyID: '123'
            }
        };
    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('metlifeBenefitsViewCtrl', {$scope: $scope});

        });

    });

    describe('onload call', function () {
        it('with success response', function () {

            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=metlife').respond(200, response);


            $httpBackend.flush();
        });

        it('with failure response', function () {
            var failureResponse = {data: {companyID: '123'}, "_error": {"detailMessage": "error"}};
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=metlife').respond(400, failureResponse);


            $httpBackend.flush();
        });
    });
});
