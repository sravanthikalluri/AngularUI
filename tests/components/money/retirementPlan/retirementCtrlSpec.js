/**
 * Created by jaya krishna on 10/30/2015.
 */
describe(' Retirement Controller Testing', function () {
    var $rootScope;
    var $scope;
    var $httpBackend;
    var ngDialog;
    var appConfig;
    var utilService;
    var  earningsCheckDateRes = { data : ["2015-10-15"]};
    var  retirementDataRes = {
        "data": [
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
        ],
        "_requestId": "16929",
        "_statusCode": "200",
        "_statusText": "OK",
        "_statusMessage": "Success"
    };


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            $injector.get('$controller')('retirementCtrl', {$scope: $scope});
            ngDialog = $injector.get('ngDialog');
            appConfig = $injector.get('appConfig');
        });
        
        localStorage.setItem("nextPayDate", '2016-03-01');
        $httpBackend
            .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan + "/" + appConfig.companyId + "/" + appConfig.userId + moneyUrlConfig.resources.contributions)
            .respond(200, retirementDataRes);


        $httpBackend.flush();

        $scope.alert = [
            {key1: 'value1'},
            {key2: 'value2'},
            {key3: 'value3'}
        ];


    });


    describe('setGoal variable testing', function () {
        it('setGoal is defiend', function () {
            expect($scope.setGoal).toBeDefined();
        });
        it('setGoal is equal to specified constant', function () {
            expect($scope.setGoal).toEqual(constants.zeroDoublePrecision);
        });

    });

    describe('closeAlert function testing', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('closeAlert function call with a parameter', function () {

            $scope.closeAlert(0);
            expect($scope.alert).toEqual([{key1: 'value1'}, {key2: 'value2'}, {key3: 'value3'}]);
        });

        it('closeAlert function call with out a parameter', function () {
            $scope.alert = ['param1', 'param2'];
            $scope.closeAlert();
            expect($scope.alert).toEqual(['param1', 'param2']);
        });
    });


    describe('totalAmt variable testing', function () {
        it('totalAmt is defiend', function () {
            expect($scope.totalAmt).toBeDefined();
        });
        it('totalAmt is equal to specified constant', function () {
            expect($scope.totalAmt).toEqual(constants.zeroDoublePrecision);
        });

    });

    describe('priorAmount variable testing', function () {
        it('priorAmount is defiend', function () {
            expect($scope.priorAmount).toBeDefined();
        });
        it('priorAmount is equal to specified constant', function () {
            expect($scope.priorAmount).toEqual(constants.zeroDoublePrecision);
        });

    });


    describe('showTimeline variable testing', function () {

        it('showTimeline is defined', function () {
            expect($scope.showTimeline).toBeDefined();
        });

        it('showTimeline is truthy', function () {
            expect($scope.showTimeline).toBeTruthy();
        });


    });

    describe('changeGoalAmount function testing', function () {
        it('changeGoalAmount is defined', function () {
            expect($scope.changeGoalAmount).toBeDefined();
        });

        it('changeGoalAmount function call', function () {
            $scope.errorAlert = true;
            $scope.alert = ['param1', 'param2'];
            $scope.changeGoalAmount();

            expect($scope.alert).toEqual(['param1', 'param2']);

            expect($scope.totalAmt).toEqual(constants.zeroDoublePrecision);
        });
    });


    describe('cancel function testing', function () {
        it('cancel is defined', function () {
            expect($scope.cancel).toBeDefined();
        });
        it('cancel function call', function () {
            spyOn(ngDialog, 'closeAll');

            $scope.cancel();

            expect(ngDialog.closeAll).toHaveBeenCalled();
        });

    });

    it('Retirement Data testing', function () {
        var response;
        $rootScope.$broadcast('goalEvent', 20, true, 100, 200, response);
        expect($scope.goal_amt).toEqual(20);

    });

    it('ngDialog.opened $on testing with true', function () {
        $rootScope.$broadcast('ngDialog.opened');
    });

    it('ngDialog.opened $on testing with false', function () {
        localStorage.setItem('isSetGoal', false);
        $rootScope.$broadcast('ngDialog.opened');
    });

    describe('toggleTimeLine function testing', function () {
        it('toggleTimeLine is defined', function () {
            expect($scope.toggleTimeLine).toBeDefined();
        });

        it('toggleTimeLine function call', function () {
            $scope.toggleTimeLine();
        });
    });

    describe('ssoURl is defined and constrcuted ', function () {
        it('ssoURL is defined', function () {
            expect($scope.ssoURL).toBeDefined();
        });

        it('ssoURL constructed from emplId and companyID and ssoID ta', function () {
            expect($scope.ssoURL).toEqual("/ssowidget/ta_pass_001");
        });
    });

    describe('401Klabel method ', function () {
        it(' get401KLabel defined', function () {
            expect($scope.get401KLabel).toBeDefined();
        });
        
        it('401KMethod returns GetStarted when coverageElect is Not E', function () {

            $scope.translation= {};
            $scope.translation.get_started = "Get Started";
            $scope.translation.request_change = "Get Started";

            $scope.get401KLabel();
        });
    });
});