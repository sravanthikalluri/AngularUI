/**
 * Created by jaya krishna on 12/22/2015.
 */
describe('Current Benfits Controller Testing', function () {
    var $scope,
        $rootScope,
        $httpBackend,
        appConfig,
        $http;

    var simpleHTML = ' <div class="row" id="printCurrentBenf"></div>',
        $compile,
        el,
        $body = $('body');

    var response = {
        data: {
            "enrollment": {
                "status": {
                    "code": 200,
                    "description": "OK",
                    "error": null
                },
                "basPartic": null,
                "employee": null,
                "enrollmentDeadlineData": {
                    "emplId": "00000000001",
                    "emplRcd": 0,
                    "enrollStatus": 0,
                    "schedId": "001O16",
                    "benefitRcd": 0,
                    "eventId": 0,
                    "benProgram": "TNB",
                    "eventClass": "OE",
                    "eventDt": "2015-10-01",
                    "eventStatus": "C",
                    "covrgBeginDt": "2015-10-01",
                    "enrollBeginDt": "2015-07-29",
                    "enrollEndDt": "2015-09-26",
                    "planYearBeginDt": "2015-10-01",
                    "planYearEndDt": "2016-09-30",
                    "confirmId": null,
                    "confirmDt": "1900-01-01",
                    "systemDefaultedElection": "N",
                    "currentDate": null
                },
                "curBenefits": {
                    "currentBenefits": [{
                        "planType": "10",
                        "planTypeDescr": "Medical",
                        "planDesc": "BS-CA HMO 20 CA North",
                        "groupNbr": "W0051486",
                        "coverage": {
                            "employeeName": "John Doe",
                            "amount": null,
                            "btax": null,
                            "atax": null,
                            "beneficiaries": [{
                                "name": "Doe,Jennifer T",
                                "benefit": null,
                                "planType": "10",
                                "primary": true
                            }],
                            "plantype": "10"
                        }
                    }],
                    "dependentDetails": [{
                        "emplid": "00000000001",
                        "dependentName": "Doe,Mary D",
                        "address1": "5568 Gibraltar DR",
                        "address2": " ",
                        "address3": " ",
                        "address4": " ",
                        "city": "Pleasanton",
                        "county": " ",
                        "state": "CA",
                        "postal": "95014",
                        "country": "USA",
                        "nationalId": "XXX-XX-9291",
                        "dependentBeneficiaryType": "Dependent and Beneficiary",
                        "relationship": "Spouse",
                        "birthdate": "08/30/1971",
                        "sex": "F",
                        "maritalStatus": "M",
                        "student": "N"
                    }]
                },
                "uidependents": null,
                "benefits": null,
                "options": null,
                "healthcosts": null,
                "lifecosts": null,
                "disabilitycosts": null,
                "stdWaiveLtdPlans": null,
                "fsacosts": null,
                "hsacosts": null,
                "cureeplans": null,
                "histeeplans": null,
                "histdpplans": null,
                "legends": null,
                "content": {
                    "company": null,
                    "effDt": null,
                    "benefit_program": null,
                    "company_name": null,
                    "hq_state": null,
                    "hq_country": null,
                    "product_line": null,
                    "company_hsa_contribution": null,
                    "medical_waiver_credit": null,
                    "t2_funding_optn": null,
                    "cobra_eligible": false,
                    "confirm_id": null,
                    "confirm_dt": null,
                    "dp_existence": false,
                    "spouse_existence": false,
                    "event_class": null,
                    "supp_life_enrolled": false,
                    "supp_life_flat_dollar": null,
                    "med_waiver_credit": null,
                    "event_class_descr": null,
                    "timestamp": "2015-10-06T15:07:06-0400",
                    "disability_taxiable": false,
                    "definition": null,
                    "plan_comparison_den": "http://www.hrpassport.com/",
                    "plan_comparison_med": "http://www.hrpassport.com/",
                    "base_url": "http://www.hrpassport.com/",
                    "event_dt": null,
                    "period_end_dt": null
                },
                "selections": null,
                "ages": null,
                "providers": null,
                "curLifeBenPlans": null,
                "uiErrorMsgs": null,
                "histexcreditplans": null,
                "countries": null,
                "states": null,
                "authoriaServer": null,
                "dualCoverage": null
            }
        }
    };
    var res = {"data": false, "_statusCode": "200", "_statusText": "OK", "_statusMessage": "Success"};
    var genderResponse = {
                        "data": [{"key": "F", "value": "Female"}, {"key": "M", "value": "Male"}],
                        "_statusCode": "200",
                        "_statusText": "OK"
                    },
         maritalStatusDataResponse = {
                        "data": [{
                            "key": "M",
                            "value": "Common Law"
                        }],
                        "_statusCode": "200",
                        "_statusText": "OK"
                    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector, $route) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $route = $route;
            $route.current = {$$route: {originalPath: '/currentbenefits'}};
            $injector.get('$controller')('currBenefitsCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'benefits'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $http = $injector.get('$http');
            $compile = $injector.get('$compile');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'current-benefits').respond(200, response);
        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'current-future-benefits').respond(200, response);
        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'benefit-elections').respond(200, res);
        $http.get(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'current-benefits');
        $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/genders').respond(200, genderResponse);
        $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/marital-statuses').respond(200, maritalStatusDataResponse);

        $httpBackend.flush();

    });
    describe('openPersonalDetails function testing', function () {
        it('openPersonalDetails is defined', function () {
            expect($scope.openPersonalDetails).toBeDefined();
        });

        it('openPersonalDetails function call', function () {
            $scope.openPersonalDetails(0);
            $rootScope.$broadcast('ngDialog.closed');
        });
    });

    describe('splitKeyValue function testing', function () {
        it('splitKeyValue is defined', function () {
            expect($scope.splitKeyValue).toBeDefined();
        });

        it('splitKeyValue function call', function () {
            var value = 'somethingandgood';
            var index = 0;
            $scope.splitKeyValue(value, index);
        });
    });

    describe('getFlatIconName function testing', function () {
        it('getFlatIconName is defined', function () {
            expect($scope.getFlatIconName).toBeDefined();
        });

        it('getFlatIconName function call without a parameter', function () {
            $scope.getFlatIconName();
        });

        it('getFlatIconName function call with a parameter', function () {
            $scope.getFlatIconName(10);
        });

        it('getFlatIconName function call with a different parameter', function () {
            $scope.getFlatIconName(60);
        });
    });

    describe('printCurrentBenf function testing', function () {
        it('printCurrentBenf is defined', function () {
            expect($scope.printCurrentBenf).toBeDefined();
        });

        it('printCurrentBenf function call', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();
            var id = 'printCurrentBenf';
            $scope.printCurrentBenf(id);
        });
    });

});
