/*
*
 * Created by Jayakrishna on 12/3/2015.
describe('States Build Data Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        $filter;


    var quarterDataResponse = {
        "data": {"planStartDate": "1999-12-31", "quarter": "Q4"},
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var payFrequencyDataResponse = {
        "data": {
            "benefitProgram": [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }, {"benefitProgram": "DSD", "defaultProgram": "N", "description": "7T1 K1"}],
            "customIndicator": false,
            "employeeBenefitProgram": "FP2",
            "employeePayFrequency": "S",
            "groupDesc": null,
            "payFrequency": ["B"]
        }, "_statusCode": "200", "_statusText": "OK"
    };

    var payFrequencyType = 'S',
        benefitProgram = 'FP2';
    var statesBuildDataResponse = {
        "errorCode": null,
        "data": [],
        "resource": {
            "employeeHSA": "$2000.00",
            "employee1HSA": "$4000.00",
            "fundingOption": "PCT",
            "benefitSupplement": null,
            "medicalPlans": [{
                "description": "Aetna Dental DMO Group",
                "employee": "$0.00",
                "spouse": "$0.00",
                "children": "$0.00",
                "family": "$0.00"
            }],
            "dentalPlans": [{
                "description": "Aetna Dental 100 Group",
                "employee": "$0.00",
                "spouse": "$0.00",
                "children": "$0.00",
                "family": "$0.00"
            }],
            "visionPlans": [{
                "description": "Aetna PPO 750 Northeast",
                "employee": "$0.00",
                "spouse": "$0.00",
                "children": "$0.00",
                "family": "$0.00"
            }],
            "optionalDentalPlans": [],
            "optionalVisionPlans": [],
            "lifePlan": "fully paid by company",
            "lifeDescription": "$50,000 Basic Life & AD&D",
            "optionalSupplementalADD": {
                "description": "Voluntary AD&D (Per $1,000)",
                "employee": "$0.02",
                "spouse": "$0.04",
                "children": "$0.04",
                "family": "$0.04"
            },
            "medicalWaiverAllowance": "$200.00",
            "otherPlans": [{
                "planType": "30",
                "planDescription": "50% STD Employee Paid",
                "benefitPlan": "000E2K"
            }]
        },
        "statusCode": "200",
        "statusMessage": "Success"
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('statesBuildDataCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
            $filter = $injector.get('$filter');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=clientoptions').respond(200, quarterDataResponse);


        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'plans').respond(200, payFrequencyDataResponse);


        $scope.quarterstartDate = quarterDataResponse.data.planStartDate;
        $scope.quarterstartDate = $filter('date')(new Date($scope.quarterstartDate), constants.dateFormat);
        $scope.quarterendDate = $filter('date')(new Date($scope.quarterstartDate).setMonth(new Date($scope.quarterstartDate).getMonth() + 3), constants.dateFormat);


        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=custom&benefitPlanId=' + benefitProgram + '&payFrequency=' + payFrequencyType + '&startDate=' + $scope.quarterstartDate + '&endDate=' + $scope.quarterendDate).respond(200, statesBuildDataResponse);

        $httpBackend.flush();
    });

    describe('callPayFrequency function testing', function () {
        it('callPayFrequency is defined ', function () {
            expect($scope.callPayFrequency).toBeDefined();
        });

        it('callPayFrequency function call ', function () {
            var payFrequencyDataResponse1 = {
                "data": [], "_statusCode": "200", "_statusText": "OK"
            };

            var payFrequencyType = 'S',
                quarterstartDate = $scope.quarterstartDate,
                quarterendDate = $scope.quarterendDate,
                benefitProgram = 'FP2';
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plans').respond(200, payFrequencyDataResponse1);


            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=custom&benefitPlanId=' + benefitProgram + '&payFrequency=' + payFrequencyType + '&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(200, statesBuildDataResponse);


            $scope.callPayFrequency(quarterstartDate, quarterendDate);
            $httpBackend.flush();
        });

        it('callPayFrequency function call with failure response', function () {
            var payFrequencyDataResponse1 = {
                "data": [], "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}
            };

            var payFrequencyType = 'S',
                quarterstartDate = $scope.quarterstartDate,
                quarterendDate = $scope.quarterendDate,
                benefitProgram = 'FP2';
            var statesBuildDataResponse1 = {
                "errorCode": null,
                "data": [],
                "statusCode": "200",
                "statusMessage": "Success",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plans').respond(400, payFrequencyDataResponse1);


            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=custom&benefitPlanId=' + benefitProgram + '&payFrequency=' + payFrequencyType + '&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(400, statesBuildDataResponse1);


            $scope.callPayFrequency(quarterstartDate, quarterendDate);
            $httpBackend.flush();
        });
    });
});
*/
