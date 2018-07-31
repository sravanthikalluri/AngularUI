/**
 * Created by Santosh on 10/28/2015.
 *//*

'use strict';
describe('Cobra Benefits Summary View Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        $filter,
        response = {
            data: {
                planStartDate: "1999-12-31",
                quarter: "Q4"
            },
            _statusCode: "200",
            _statusText: "OK"
        },
        res1 = {
            "data": {
                "dentalPlans": [{
                    "children": "$73.87",
                    "description": "Aetna Dental 100 Group",
                    "employee": "$36.05",
                    "family": "$111.72",
                    "spouse": "$73.90"
                }],
                "medicalPlans": [{
                    "children": "$832.32",
                    "description": "Aetna CPOS 20 PA",
                    "employee": "$416.16",
                    "family": "$1,248.48",
                    "spouse": "$915.96"
                }],
                "visionPlans": [{
                    "children": "$8.52",
                    "description": "Aetna Vision Plan Group",
                    "employee": "$4.26",
                    "family": "$12.53",
                    "spouse": "$8.10"
                }]
            },
            "_statusCode": "200",
            "_statusText": "OK"
        };
    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('cobraBenefitsSummaryViewCtrl', {
                $scope: $scope
            });
            $filter = $injector.get('$filter');

        });

        $scope.quarterstartDate = response.data.planStartDate;
        $scope.quarterstartDate = $filter('date')(new Date($scope.quarterstartDate),constants.dateFormat);
        $scope.quarterendDate = $filter('date')(new Date($scope.quarterstartDate).setMonth(new Date($scope.quarterstartDate).getMonth() + 3),constants.dateFormat);
        var url = benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=clientoptions';
        $httpBackend.whenGET(url).respond(200, response);
        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=cobra&startDate=' + $scope.quarterstartDate + '&endDate=' + $scope.quarterendDate).respond(200, res1);
        $httpBackend.flush();

    });

    describe('cobraData function testing ', function () {
        it('cobraData is defined ', function () {
            expect($scope.cobraData).toBeDefined();
        });

        it('cobraData function call with success response and data as not null', function () {
            var quarterstartDate = '1999-12-31',
                quarterendDate = '2000-03-31';
            var res = {
                "data": {
                    "dentalPlans": [{
                        "children": "$73.87",
                        "description": "Aetna Dental 100 Group",
                        "employee": "$36.05",
                        "family": "$111.72",
                        "spouse": "$73.90"
                    }],
                    "visionPlans": [{
                        "children": "$8.52",
                        "description": "Aetna Vision Plan Group",
                        "employee": "$4.26",
                        "family": "$12.53",
                        "spouse": "$8.10"
                    }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=cobra&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(200, res);
            $scope.cobraData(quarterstartDate, quarterendDate);

            $httpBackend.flush();
        });

        it('cobraData function call with success response and data as null', function () {
            var quarterstartDate = '1999-12-31',
                quarterendDate = '2000-03-31';
            var result = {
                "data": 'null',
                "_statusCode": "400",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=cobra&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(200, result);
            $scope.cobraData(quarterstartDate, quarterendDate);
            $httpBackend.flush();
        });

        it('cobraData function call with failure response', function () {
            var quarterstartDate = '1999-12-31',
                quarterendDate = '2000-03-31';
            var res1 = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/'
                + appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=cobra&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(400, res1);
            $scope.cobraData(quarterstartDate, quarterendDate);
            $httpBackend.flush();


        });
    });

});*/
