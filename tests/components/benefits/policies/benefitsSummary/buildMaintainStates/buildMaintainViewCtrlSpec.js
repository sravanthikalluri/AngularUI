/**
 * Created by Jayakrishna on 12/3/2015.
 */
describe('Build Maintain View Controller Testing ', function () {

    var $rootScope,
        $httpBackend,
        $scope,
        appConfig,
        $filter;
    var $compile,
        $body = $('body'),
        el,
        simpleHTML = '<table class="buildMaintainView medium">' +
            '<tbody>' +
            '<tr>' +
            '<td class="bodytext">' +
            '<input id="stateAL" type="checkbox" value="AL" class="states">' +
            '<span ng-bind="translation.my_benefits.policies.alabama"></span>' +
            '</td>' +
            '<td class="bodytext">' +
            '<input id="stateFLS" type="checkbox" value="FLS" class="states">' +
            '<span ng-bind="translation.my_benefits.policies.florida_south"></span>' +
            '</td>' +
            '<td class="bodytext">' +
            '<input id="stateMA" type="checkbox" value="MA" class="states">' +
            '<span ng-bind="translation.my_benefits.policies.massachusetts"></span>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>';

    var buildmaintainData1Response = {
        "data": {"company": "31T", "payFrequency": "S", "states": []},
        "_statusCode": "200",
        "_statusText": "OK"
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('buildMaintainViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
            $filter = $injector.get('$filter');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'benefit-states?payFrequency=S').respond(200, buildmaintainData1Response);

        $httpBackend.flush();
    });

    describe('submitForm function testing ', function () {
        it('submitForm should be defined ', function () {
            expect($scope.submitForm).toBeDefined();
        });
        it('submitForm function call with success response', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();
            appConfig.companyId = "31T";
            appConfig.userId = "00001000483";
            var data = {
                company: appConfig.companyId,
                states: [],
                payFrequency: 'S'
            };

            data = JSON.stringify(data);

            var res = {"_statusCode": "200", "_statusText": "OK"};

            var clientResponse = {
                "data": {"planStartDate": "1999-12-31", "quarter": "Q4"},
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $scope.quarterstartDate = clientResponse.data.planStartDate;
            $scope.quarterstartDate = $filter('date')(new Date($scope.quarterstartDate), constants.dateFormat);
            $scope.quarterendDate = $filter('date')(new Date($scope.quarterstartDate).setMonth(new Date($scope.quarterstartDate).getMonth() + 3), constants.dateFormat);

            var payFrequencyType = 'S',
                quarterstartDate = $scope.quarterstartDate,
                quarterendDate = $scope.quarterendDate,
                benefitProgram = 'FP2';

            var plansResponse = {
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

            var res1 = {
                "errorCode": null,
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
                    }, {"planType": "31", "planDescription": "50% LTD Employee Paid", "benefitPlan": "000E2V"}]
                },
                "statusCode": "200",
                "statusMessage": "Success"
            };

            $httpBackend.when('PUT', benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'benefit-states?enableValidation=true', data).respond(200, res);

            $httpBackend.whenGET('/api-benefits/v1/benefit-policy/31T/00001000483/policies?type=clientoptions').respond(200, clientResponse);

            $httpBackend.whenGET('/api-benefits/v1/benefit-plan/31T/00001000483/plans').respond(200, plansResponse);

            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=custom&benefitPlanId=' + benefitProgram + '&payFrequency=' + payFrequencyType + '&startDate=' + quarterstartDate + '&endDate=' + quarterendDate).respond(200, res1);

            $scope.submitForm();
            $httpBackend.flush();
        });

        it('submitForm function call with failure response', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var data = {
                company: appConfig.companyId,
                states: [],
                payFrequency: 'S'
            };
            data = JSON.stringify(data);
            var res = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};

            $httpBackend.when('PUT', benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'benefit-states?enableValidation=true', data).respond(400, res);

            $scope.submitForm();
            $httpBackend.flush();
        });
    });

});
