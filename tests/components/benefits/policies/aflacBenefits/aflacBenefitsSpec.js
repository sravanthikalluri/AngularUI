/**
 * Created by Santosh on 10/26/2015.
 */

'use strict';
describe('Aflac Benefits Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {
            aflacAccountId: 1234,
            nationalId: 'IND12',
            timeLine: 'Test',
            keyHash: '12shah512'
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
        });

        $httpBackend
            .whenGET(benefitsUrlConfig.benefitApi + '/api-benefits/v1/benefit-policy/' + appConfig.companyId + '/' + appConfig.userId + '/policies?type=aflac')
            .respond(200, response);

        $httpBackend.flush();

    });


});
