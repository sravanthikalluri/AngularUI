/**
 * Created by Jayakrishna on 12/01/2015.
 */

'use strict';
describe('Benefits Guide Book View Controller Testing ', function () {
    var $rootScope,
        $scope,
        $httpBackend,
        appConfig;


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('benefitsGuideBookViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
        });


    });


    describe('initBenefitsGuideBookData function testing', function () {

        it('initBenefitsGuideBookData function is defined', function () {
            expect($scope.initBenefitsGuideBookData).toBeDefined();
        });

        it('initBenefitsGuideBookData function is called with success response', function () {

            var benefitsGuideBookDataResponse = {
                "data": {
                    "quater": null,
                    "canadian": true,
                    "thisPlanYearStartDate": null,
                    "thisPlanYearEndDate": null,
                    "prevPlanYearStartDate": null,
                    "prevPlanYearEndDate": null,
                    "guideBookLinks": null,
                    "guideBookDesc": [
                        {
                            "url": "/TSB_display/CANADA/AXA_Vol_AD&D_Booklet.pdf",
                            "text": "Click here to download a PDF of the AXA Voluntary AD&D Booklet.",
                            "date": null
                        }
                    ],
                    "t2_PLAN_DT_START": null
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'guide-book')
                .respond(200, benefitsGuideBookDataResponse);


            $scope.initBenefitsGuideBookData();

            $httpBackend.flush();

            expect($scope.benefitGuideBookPdfData).toBeDefined();
        });

        it('initBenefitsGuideBookData function is called with success response and data as null', function () {

            var benefitsGuideBookDataResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'guide-book')
                .respond(200, benefitsGuideBookDataResponse);


            $scope.initBenefitsGuideBookData();

            $httpBackend.flush();


        });


        it('initBenefitsGuideBookData function is called with success response  and canadian as false', function () {

            var benefitsGuideBookDataResponse = {
                "data": {
                    "quater": null,
                    "canadian": false,
                    "thisPlanYearStartDate": null,
                    "thisPlanYearEndDate": null,
                    "prevPlanYearStartDate": null,
                    "prevPlanYearEndDate": null,
                    "guideBookLinks": null,
                    "guideBookDesc": [
                        {
                            "url": "/TSB_display/CANADA/AXA_Vol_AD&D_Booklet.pdf",
                            "text": "Click here to download a PDF of the AXA Voluntary AD&D Booklet.",
                            "date": null
                        }
                    ],
                    "t2_PLAN_DT_START": null
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'guide-book')
                .respond(200, benefitsGuideBookDataResponse);


            $scope.initBenefitsGuideBookData();

            $httpBackend.flush();

            expect($scope.hidecandian).toBeTruthy();
        });


        it('initBenefitsGuideBookData function is called with failure response', function () {

            var benefitsGuideBookDataResponse = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"},
                "type": "warning"
            };

            $httpBackend
                .whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                    appConfig.companyId + '/' + appConfig.userId + '/' + 'guide-book')
                .respond(400, benefitsGuideBookDataResponse);


            $scope.initBenefitsGuideBookData();

            $httpBackend.flush();


        });


    });

});
