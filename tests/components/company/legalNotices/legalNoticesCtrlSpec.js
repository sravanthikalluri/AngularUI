/**
 * Created by Santosh on 11/3/2015.
 */
'use strict';
describe('Legal Notices Controller Testing', function () {
    var $rootScope,
        $scope,
        $httpBackend,
        appConfig;

    var response = {
        "data": [{
            "header": "Legal Developments",
            "urlData": [{
                "text": "Federal (and State) Tax Rates and Limits Fact Sheet",
                "url": "assets/pdf/legalNotices/RatesandLimitsFactSheet.pdf"
            }]
        }],
        "_statusCode": "200",
        "_statusText": "OK"
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
            $injector.get('$controller')('legalNoticesViewCtrl', {$scope: $scope});

        });

    });

    describe('legalNotices function testing', function () {

        it('legalNotices is defined', function () {
            expect($scope.legalNotices).toBeDefined();
        });

        it('legalNotices function call with success response', function () {

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
                "/" + appConfig.companyId + "/" + appConfig.userId + companyUrlConfig.resources.legalNotices).respond(200, response);

            $scope.legalNotices();
            $httpBackend.flush();
        });

        it('legalNotices function call with failure response', function () {
            var res = {
                "data": [],
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
                "/" + appConfig.companyId + "/" + appConfig.userId + companyUrlConfig.resources.legalNotices).respond(400, res);

            $scope.legalNotices();
            $httpBackend.flush();
        });
    });


});