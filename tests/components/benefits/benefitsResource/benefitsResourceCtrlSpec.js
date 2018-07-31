/**
 * Created by Jayakrishna on 3/9/2016.
 */
describe('Benefits Resource Controller Testing ', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        response = {
            "data": [{
                "id": "1",
                "text": "See detailed information about TriNet benefit plans, such as benefits termination and COBRA coverage.",
                "title": "Benefits Guidebook",
                "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/CIGNA-Massachusetts-Creditable-Coverage-Letter.pdf"
            }, {
                "pdfurls": [{
                    "id": "6",
                    "text": "",
                    "title": "Understanding your Options, Portability and Conversion Brochure.",
                    "url": "/v1/extranet/Includes/Content/forms/PDF/MetLife/Enhanced_Port_Brochure.pdf"
                }]
            }], "_statusCode": "200", "_statusText": "OK", "_statusMessage": "Success"
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('benefitsResourceCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });


    });

    describe('onload call testing', function () {
        it('onload call with success response', function () {
            var url = "/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/resources?type=benefitResources";
            $httpBackend.whenGET(url).respond(200, response);
            $httpBackend.flush();
        });

        it('onload call with failure response', function () {
            var res = {"data": {}, "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            var url = "/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/resources?type=benefitResources";
            $httpBackend.whenGET(url).respond(400, res);
            $httpBackend.flush();
        });
    });

    describe('selectTab function testing ', function () {
        it('selectTab should be defined ', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call with failure response', function () {
            var setTab = {"id":0,"title":"Benefits Carrier Contact Information"};
            var failureResponse = {"data": {}, "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            var url = "/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/resources?type=benefitResources";
            $httpBackend.whenGET(url).respond(200, response);
            $httpBackend.whenGET("/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/carriers").respond(400,failureResponse);
            $scope.selectTab(setTab);
            $httpBackend.flush();
        });

        it('selectTab function call with success response', function () {
            var setTab = {"id":0,"title":"Benefits Carrier Contact Information"};
            var successResponse = {"data":[{"fiscalYear":"(October 01, 2015 - September 30, 2016)","url":"/v1/extranet/Benefits/Directories/pdf/Benefits_Carrier_Contact_Chart_Q4_2015-2016.pdf","urlName":"Benefits Carrier Contact Chart "},{"fiscalYear":"(October 01, 2014 - September 30, 2015)","url":"/v1/extranet/Benefits/Directories/pdf/Benefits_Carrier_Contact_Chart_Q4_2014-2015.pdf","urlName":"Benefits Carrier Contact Chart "}],"_requestId":"1a3114be-0544-45ca-8477-d938577cb53a","_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};
            var url = "/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/resources?type=benefitResources";
            $httpBackend.whenGET(url).respond(200, response);
            $httpBackend.whenGET("/api-benefits/v1/benefit-policy/" + appConfig.companyId + "/" + appConfig.userId + "/carriers").respond(200,successResponse);
            $scope.selectTab(setTab);
            $httpBackend.flush();
        });
    });

    describe('isSelected function testing ', function () {
        it('isSelected should be defined ', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('isSelected function call ', function () {
            $scope.isSelected(0);
        });
    });

    describe('closePanel function testing ', function () {
        it('closePanel should be defined ', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call ', function () {
            $scope.closePanel();
        });
    });
});
