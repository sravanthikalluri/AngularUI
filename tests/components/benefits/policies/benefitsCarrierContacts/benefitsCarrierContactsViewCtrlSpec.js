/**
 * Created by Santosh on 10/26/2015.
 */

'use strict';
describe('Benefits Carrier Contacts View Controller Testing', function () {
    var $rootScope,
        $scope,
        $httpBackend,
        appConfig,
        response = {
            data: [{
                planStartDate: '10/26/2015'
            }]
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('benefitsCarrierContactsViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    describe('onLoad call tesing', function () {
        it('onLoad call with success response', function () {
            var url = benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + '/' + benefitsUrlConfig.resources.benefitPolicy + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'carriers';
            $httpBackend.whenGET(url).respond(200, response);
            $httpBackend.flush();

        });

        it('onLoad call with failure response', function () {
            var response1 = {data: {}, "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            var url = benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + '/' + benefitsUrlConfig.resources.benefitPolicy + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'carriers';
            $httpBackend.whenGET(url).respond(400, response1);
            $httpBackend.flush();

        });
    });

});
