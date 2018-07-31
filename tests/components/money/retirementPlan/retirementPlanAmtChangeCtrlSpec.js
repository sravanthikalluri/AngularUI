/**
 * Created by Santosh on 10/30/2015.
 */


'use strict';
describe('Retirement Plan Amt Change Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        utilService,
        $httpBackend;


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('goalAmtChangeCtrl', {$scope: $scope});
            $scope.translation = {"pageValidationMessage":"This page contains errors. Please correct the errors below."};

        });
        $scope.alert = [
            {key1: 'value1'},
            {key2: 'value2'},
            {key3: 'value3'}
        ];

        $scope.retirementData = [{}];
        $scope.update = {};

    });


    it('closeAlert function called with a parameter', function () {

        $scope.closeAlert(0);
        expect($scope.alert).toEqual([{key1: 'value1'}, {key2: 'value2'}, {key3: 'value3'}]);
    });

    describe('priorChangeFn function testing', function () {
        it('priorChangeFn function call', function () {
            var priorAmount = 500;
            $scope.federalAmount = 1000;
            $scope.priorChangeFn(priorAmount);

            expect($scope.tempTotal).toBeDefined();

            expect($scope.federalAmount).toBeDefined();

            expect($scope.tempTotal).toEqual(500);

        });
    });

    it('goalChangeFn function is called', function () {
        var setGoal = 200;
        $scope.goalChangeFn(setGoal);
        expect($scope.setGoal).toEqual(setGoal);
    });

    describe('radioClickFn function testing', function () {
        it('radioClickFn function call without goal amount', function () {
            $scope.radioClickFn(0);

            expect($scope.radioType).toBeDefined();
            expect($scope.totalAmt).toBeDefined();
            expect($scope.priorAmount).toBeDefined();
            expect($scope.radioType).toEqual(0);
        });

        it('radioClickFn function call with goal amount', function () {
            $scope.radioClickFn('setGoalAmt');
            expect($scope.radioType).toEqual('setGoalAmt');
            expect($scope.radioType).toBeDefined();
            expect($scope.totalAmt).toBeDefined();
            expect($scope.setGoal).toBeDefined();


        });


    });

    describe('saveMethod function testing',function(){

        it('saveMethod function is called $scope.innerForm.$valid == true success', function () {

            $scope.innerForm = {};
            expect($scope.innerForm.$valid).toBeUndefined();
            $scope.innerForm.$valid = true;

            $scope.radioType = 'setGoalAmt';

            var response = {
                _statusCode: '200'
            };


        $scope.retirementData = [
            {
                "approvalStatus": "F",
                "benefitPlan": "0006YZ",
                "coverageBeginDate": "2007-01-01",
                "coverageElect": "E",
                "coverageElectDate": "2007-01-05",
                "effectiveDate": "2007-01-01",
                "endDate": "2099-12-31",
                "goalAmount": "0",
                "priorContributions": 0,
                "employeeId": "00001043131",
                "uniqueId": 4,
                "company": "4PF",
                "calendarYear": "2007",
                "limitType": "402",
                "currentYear": " January 1 ,2016- December 31 ,2016",
                "emplRcd": 0,
                "PreTax": {
                    "flatDeductionAmnt": 3333.34,
                    "pctGross": 0,
                    "planType": "40",
                    "limitExtType": "B",
                    "lastPayDeduction401k": 0,
                    "federalAmount": 18000
                },
                "Roth": {
                    "flatDeductionAmntAtax": 12.12,
                    "pctGrossAtax": 0,
                    "lastPayDeductionRoth": 0
                }
            }
        ];

            $httpBackend
                .when('PUT', moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + "/" + appConfig.companyId + "/" + appConfig.userId + moneyUrlConfig.resources.contributions+'?enableValidation=true', $scope.retirementPlanObject)
                .respond(200, response);

            $scope.saveMethod();

            $httpBackend.flush();


            expect($scope.totalAmt).toEqual($scope.setGoal);

        });


        it('saveMethod function is called $scope.innerForm.$valid == true success and  $scope.radioType != SetGoalAmount', function () {

            $scope.innerForm = {};
            expect($scope.innerForm.$valid).toBeUndefined();
            $scope.innerForm.$valid = true;

            $scope.radioType = 'Amount';

            var response = {
                _statusCode: '200'
            };


        $scope.retirementData = [{
            "approvalStatus": "F",
            "benefitPlan": "0006YZ",
            "coverageBeginDate": "2007-01-01",
            "coverageElect": "E",
            "coverageElectDate": "2007-01-05",
            "effectiveDate": "2007-01-01",
            "endDate": "2099-12-31",
            "goalAmount": "0",
            "priorContributions": 0,
            "employeeId": "00001043131",
            "uniqueId": 4,
            "company": "4PF",
            "calendarYear": "2007",
            "limitType": "402",
            "currentYear": " January 1 ,2016- December 31 ,2016",
            "emplRcd": 0,
            "PreTax": {
                "flatDeductionAmnt": 3333.34,
                "pctGross": 0,
                "planType": "40",
                "limitExtType": "B",
                "lastPayDeduction401k": 0,
                "federalAmount": 18000
            },
            "Roth": {
                "flatDeductionAmntAtax": 12.12,
                "pctGrossAtax": 0,
                "lastPayDeductionRoth": 0
            }
        }];

            $httpBackend
                .when('PUT', moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + "/" + appConfig.companyId + "/" + appConfig.userId + moneyUrlConfig.resources.contributions+'?enableValidation=true', $scope.retirementPlanObject)
                .respond(200, response);

            $scope.saveMethod();

            $httpBackend.flush();


            expect($scope.totalAmt).toEqual($scope.setGoal);

        });


        it('saveMethod function is called $scope.innerForm.$valid == true error', function () {

            $scope.innerForm = {};
            expect($scope.innerForm.$valid).toBeUndefined();
            $scope.innerForm.$valid = true;

            $scope.radioType = 'setGoalAmt';

            var response = { _statusCode: "400",_statusText : "OOPs Error","_error":{"detailMessage":"error"}};

        $scope.retirementData = [{
            "approvalStatus": "F",
            "benefitPlan": "0006YZ",
            "coverageBeginDate": "2007-01-01",
            "coverageElect": "E",
            "coverageElectDate": "2007-01-05",
            "effectiveDate": "2007-01-01",
            "endDate": "2099-12-31",
            "goalAmount": "0",
            "priorContributions": 0,
            "employeeId": "00001043131",
            "uniqueId": 4,
            "company": "4PF",
            "calendarYear": "2007",
            "limitType": "402",
            "currentYear": " January 1 ,2016- December 31 ,2016",
            "emplRcd": 0,
            "PreTax": {
                "flatDeductionAmnt": 3333.34,
                "pctGross": 0,
                "planType": "40",
                "limitExtType": "B",
                "lastPayDeduction401k": 0,
                "federalAmount": 18000
            },
            "Roth": {
                "flatDeductionAmntAtax": 12.12,
                "pctGrossAtax": 0,
                "lastPayDeductionRoth": 0
            }
        }];

            $httpBackend
                .when('PUT', moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + "/" + appConfig.companyId + "/" + appConfig.userId + moneyUrlConfig.resources.contributions+'?enableValidation=true', $scope.retirementPlanObject)
                .respond(400, response);

            $scope.saveMethod();

            $httpBackend.flush();


            expect($scope.alert).toEqual([{key1: 'value1'}, {key2: 'value2'}, {key3: 'value3'}]);

        });


        it('saveMethod function is called $scope.innerForm.$valid == true and $scope.radioType === setGoalAmt', function () {

            $scope.innerForm = {};

            $scope.innerForm.$valid = true;

            $scope.radioType = 'setGoalAmt';
            $scope.totalAmt = '';
            $scope.priorAmount = '';

        $scope.retirementData = [{
            "approvalStatus": "F",
            "benefitPlan": "0006YZ",
            "coverageBeginDate": "2007-01-01",
            "coverageElect": "E",
            "coverageElectDate": "2007-01-05",
            "effectiveDate": "2007-01-01",
            "endDate": "2099-12-31",
            "goalAmount": "0",
            "priorContributions": 0,
            "employeeId": "00001043131",
            "uniqueId": 4,
            "company": "4PF",
            "calendarYear": "2007",
            "limitType": "402",
            "currentYear": " January 1 ,2016- December 31 ,2016",
            "emplRcd": 0,
            "PreTax": {
                "flatDeductionAmnt": 3333.34,
                "pctGross": 0,
                "planType": "40",
                "limitExtType": "B",
                "lastPayDeduction401k": 0,
                "federalAmount": 18000
            },
            "Roth": {
                "flatDeductionAmntAtax": 12.12,
                "pctGrossAtax": 0,
                "lastPayDeductionRoth": 0
            }
        }];
        $scope.saveMethod();

            expect($scope.alert).toEqual([{key1: 'value1'}, {key2: 'value2'}, {key3: 'value3'}]);


        });


        it('saveMethod function is called $scope.innerForm.$valid == true and $scope.radioType != setGoalAmt', function () {

            $scope.innerForm = {};

            $scope.innerForm.$valid = true;

            $scope.radioType = 'Amount';
            $scope.setGoal = '';

            $scope.saveMethod();

            expect($scope.alert).toEqual([{key1: 'value1'}, {key2: 'value2'}, {key3: 'value3'}]);


        });


        it('saveMethod function is called $scope.innerForm.$valid == true and $scope.totalAmt = 0.00 and $scope.setGoal = 0.00', function () {

            $scope.innerForm = {};

            $scope.innerForm.$valid = true;

            $scope.radioType = 'Amount';
            $scope.federalAmount = '1.00';
            $scope.priorAmount = '2.00';

            $scope.$apply();


        $scope.retirementData = [{
            "approvalStatus": "F",
            "benefitPlan": "0006YZ",
            "coverageBeginDate": "2007-01-01",
            "coverageElect": "E",
            "coverageElectDate": "2007-01-05",
            "effectiveDate": "2007-01-01",
            "endDate": "2099-12-31",
            "goalAmount": "0",
            "priorContributions": 0,
            "employeeId": "00001043131",
            "uniqueId": 4,
            "company": "4PF",
            "calendarYear": "2007",
            "limitType": "402",
            "currentYear": " January 1 ,2016- December 31 ,2016",
            "emplRcd": 0,
            "PreTax": {
                "flatDeductionAmnt": 3333.34,
                "pctGross": 0,
                "planType": "40",
                "limitExtType": "B",
                "lastPayDeduction401k": 0,
                "federalAmount": 18000
            },
            "Roth": {
                "flatDeductionAmntAtax": 12.12,
                "pctGrossAtax": 0,
                "lastPayDeductionRoth": 0
            }
        }];

           /* $scope.goal_amt = $scope.setGoal;
            $scope.retirementData[0].goalAmount = $scope.totalAmt;
            $scope.retirementData[0].coverageBeginDate = utilService.filterDate($scope.retirementData[0].coverageBeginDate, constants.retirementPlanDateFormat);
            $scope.retirementData[0].coverageElectDate = utilService.filterDate($scope.retirementData[0].coverageElectDate, constants.retirementPlanDateFormat);
            $scope.retirementData[0].effectiveDate = utilService.filterDate($scope.retirementData[0].effectiveDate, constants.retirementPlanDateFormat);
            $scope.retirementData[0].endDate = utilService.filterDate($scope.retirementData[0].endDate, constants.retirementPlanDateFormat);
            $scope.retirementData[0].personId = appConfig.userId;
            $scope.retirementPlanObject = $scope.retirementData[0];*/


            $scope.saveMethod();



        });


        it('saveMethod function $scope.innerForm.$valid == false', function () {
            $scope.radioType = 'setGoalAmttt';
            $scope.innerForm = {};
            $scope.innerForm.$valid = false;

            expect($scope.submitted).toBeUndefined();
            $scope.saveMethod();

            expect($scope.submitted).toBeTruthy();
        });

        it('saveMethod function $scope.innerForm.$valid == false and $scope.update.priorAmount = 0', function () {
            $scope.radioType = 'setGoalAmttt';
            $scope.innerForm = {};
            $scope.innerForm.$valid = false;
            $scope.update = {};
            $scope.update.priorAmount = 0;
            $scope.saveMethod();
        });

    });

    describe('getFloatValue function testing', function () {
        it('getFloatValue is defined', function () {
            expect($scope.getFloatValue).toBeDefined();
        });

        it('getFloatValue function call with value as null', function () {
            var amount = "";
            $scope.getFloatValue(amount);
        });

        it('getFloatValue function call with value as not null', function () {
            var amount = 100;
            $scope.getFloatValue(amount);
        });
    });

    describe('onBlur function testing', function () {
        it('onBlur is defined', function () {
            expect($scope.onBlur).toBeDefined();
        });

        it('onBlur function call', function () {
            var data = {
                update: {
                    blur: {
                        setGoalAmtRequired: null,
                        setGoalAmtPattern: null,
                        setGoalAmtNotZero: null,
                        setGoalAmtCondi: null,
                        priorAmountRequired: null,
                        priorAmountPattern: null,
                        priorAmountNotZero: null,
                        priorAmountCondi: null
                    }
                }
            };
            var name = 'update';
            $scope.onBlur(name, data);
        });
    });


});