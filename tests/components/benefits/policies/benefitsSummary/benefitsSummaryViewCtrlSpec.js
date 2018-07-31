/**
 * Created by Jayakrishna on 12/3/2015.
 */

describe('Benefits Summary View Controller Testing ', function () {

    var $rootScope,
        $httpBackend,
        $scope,
        appConfig;

    var quarterDataResponse = {
        "data": {
            "planStartDate": "1999-12-31",
            "quarter": "Q4"
        },
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var payFrquencyListResponse = {
        "data": {
            "benefitProgramList": [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }],
            "customIndicator": false,
            "employeeBenefitProgram": "FP2",
            "employeePayFrequency": "S",
            "groupDesc": null,
            "payFrequencyList": ["B"]
        },
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var benefitsSummaryResponse = {
        "data": [{
            "id": "1",
            "heading": "Benefit Program Description ",
            "apply": "",
            "label": "View a summary of all plans ",
            "sideLabel": "(available to your company with pay frequency weekly)",
            "path": "executiveSOAPWeekly",
            "key": "W",
            "type": "soap",
            "PlanCode": "",
            "subhead": ""
        }]
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
           $injector.get('$controller')('benefitsSummaryViewCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=clientoptions').respond(200, quarterDataResponse);


        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'plans').respond(200, payFrquencyListResponse);


        $httpBackend.whenGET('assets/data/benefits/policiesBenefitsSummaryLinks.json').respond(200, benefitsSummaryResponse);


        $httpBackend.flush();
    });

    describe('reOrderId function testing ', function () {
        it('reOrderId is defined ', function () {
            expect($scope.reOrderId).toBeDefined();
        });

        it('reOrderId function call ', function () {
            var benefitsSummaryNew = [{
                id: 1
            }, {
                id: 4
            }];
            $scope.reOrderId(benefitsSummaryNew);
        });
    });

    describe('callme function testing ', function () {
        it('callme is defined ', function () {
            expect($scope.callme).toBeDefined();
        });

        it('callme function call ', function () {
            var incomeDetails = {
                PlanCode: 312,
                key: 'S',
                type: 'cop'
            };
            $scope.callme(incomeDetails);

            expect($scope.planCode).toBeDefined();
            expect($scope.planKey).toBeDefined();
            expect($scope.planType).toBeDefined();
        });
    });

    describe('Test displayLinks function', function () {

        it('displayLinks is defined', function () {
            expect($scope.displayLinks).toBeDefined();
        });

        it('displayLinks function call with payFrequencyList value as A', function () {
            var benefitsSummaryData = [{
                "id": "1",
                "heading": "Benefit Program Description ",
                "apply": "",
                "label": "View a summary of all plans ",
                "sideLabel": "(available to your company with pay frequency weekly)",
                "path": "executiveSOAPWeekly",
                "key": "A",
                "type": "soap",
                "PlanCode": "",
                "subhead": ""
            }];

            var payFrquencyListArray = {
                "benefitProgramList": [{
                    "benefitProgram": "312",
                    "defaultProgram": null,
                    "description": "Program 1"
                }, {
                    "benefitProgram": "DSD",
                    "defaultProgram": "N",
                    "description": "7T1 K1"
                }],
                "customIndicator": false,
                "employeeBenefitProgram": "FP2",
                "employeePayFrequency": "S",
                "groupDesc": null,
                "payFrequencyList": ["A"]
            };
            var customindicator = false;
            var benefitProgramArray = [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }, {
                "benefitProgram": "DSD",
                "defaultProgram": "N",
                "description": "7T1 K1"
            }];
            $scope.displayLinks(benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray);
        });

        it('displayLinks function call with payFrequencyList value as M', function () {
            var benefitsSummaryData = [{
                "id": "1",
                "heading": "Benefit Program Description ",
                "apply": "",
                "label": "View a summary of all plans ",
                "sideLabel": "(available to your company with pay frequency weekly)",
                "path": "executiveSOAPWeekly",
                "key": "M",
                "type": "soap",
                "PlanCode": "",
                "subhead": ""
            }];

            var payFrquencyListArray = {
                "benefitProgramList": [{
                    "benefitProgram": "312",
                    "defaultProgram": null,
                    "description": "Program 1"
                }, {
                    "benefitProgram": "DSD",
                    "defaultProgram": "N",
                    "description": "7T1 K1"
                }],
                "customIndicator": false,
                "employeeBenefitProgram": "FP2",
                "employeePayFrequency": "S",
                "groupDesc": null,
                "payFrequencyList": ["M"]
            };
            var customindicator = false;
            var benefitProgramArray = [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }, {
                "benefitProgram": "DSD",
                "defaultProgram": "N",
                "description": "7T1 K1"
            }];
            $scope.displayLinks(benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray);
        });

        it('displayLinks function call with payFrequencyList value as S', function () {
            var benefitsSummaryData = [{
                "id": "1",
                "heading": "Benefit Program Description ",
                "apply": "",
                "label": "View a summary of all plans ",
                "sideLabel": "(available to your company with pay frequency weekly)",
                "path": "executiveSOAPWeekly",
                "key": "S",
                "type": "soap",
                "PlanCode": "",
                "subhead": ""
            }];

            var payFrquencyListArray = {
                "benefitProgramList": [{
                    "benefitProgram": "312",
                    "defaultProgram": null,
                    "description": "Program 1"
                }, {
                    "benefitProgram": "DSD",
                    "defaultProgram": "N",
                    "description": "7T1 K1"
                }],
                "customIndicator": false,
                "employeeBenefitProgram": "FP2",
                "employeePayFrequency": "S",
                "groupDesc": null,
                "payFrequencyList": ["S"]
            };
            var customindicator = false;
            var benefitProgramArray = [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }, {
                "benefitProgram": "DSD",
                "defaultProgram": "N",
                "description": "7T1 K1"
            }];
            $scope.displayLinks(benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray);
        });

        it('displayLinks function call with payFrequencyList value as W', function () {
            var benefitsSummaryData = [{
                "id": "1",
                "heading": "Benefit Program Description ",
                "apply": "",
                "label": "View a summary of all plans ",
                "sideLabel": "(available to your company with pay frequency weekly)",
                "path": "executiveSOAPWeekly",
                "key": "W",
                "type": "soap",
                "PlanCode": "",
                "subhead": ""
            }];

            var payFrquencyListArray = {
                "benefitProgramList": [{
                    "benefitProgram": "312",
                    "defaultProgram": null,
                    "description": "Program 1"
                }, {
                    "benefitProgram": "DSD",
                    "defaultProgram": "N",
                    "description": "7T1 K1"
                }],
                "customIndicator": false,
                "employeeBenefitProgram": "FP2",
                "employeePayFrequency": "S",
                "groupDesc": null,
                "payFrequencyList": ["W"]
            };
            var customindicator = false;
            var benefitProgramArray = [{
                "benefitProgram": "312",
                "defaultProgram": null,
                "description": "Program 1"
            }, {
                "benefitProgram": "DSD",
                "defaultProgram": "N",
                "description": "7T1 K1"
            }];
            $scope.displayLinks(benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray);
        });
    });
});
