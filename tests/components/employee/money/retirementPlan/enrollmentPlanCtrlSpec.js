/*
 /!*Created by jaya krishna on 12/22/2015.*!/

describe('Enrollment Plan Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend;

    var retirementDataRes = {
        "data": [{
            "approvalStatus": "F",
            "benefitPlan": " ",
            "coverageBeginDate": "2008-12-31",
            "coverageElect": "E",
            "coverageElectDate": "2009-03-30",
            "effectiveDate": "2009-01-01",
            "endDate": "2099-12-31",
            "flatDeductionAmnt": "0",
            "flatDeductionAmntAtax": "50",
            "goalAmount": "17982",
            "pctGross": "5",
            "pctGrossAtax": "0",
            "planType": "401(k)",
            "priorContributions": "0.00",
            "personId": "00001585490",
            "uniqueId": 1,
            "company": "7T1",
            "calendarYear": "2015",
            "limitType": "402",
            "limitExtType": "B",
            "totalYtd": "795",
            "currentYear": " January 1 , 2015- December 31 ,2015",
            "planTypeRoth": "Roth",
            "lastPayDeduction401k": "72.5",
            "lastPayDeductionRoth": "0.00",
            "federalAmount": "18000"
        }],
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var  fedAmountServiceRes = {
        data: "18000",
        _statusCode: "200",
        _statusText: "OK"
    };

    var eligibilityResponse = {data: true, _statusCode: "200", _statusText: "OK"};
    var $compile,
        $body = $('body'),eli,

        HTML = '<input type="text" id="retirement_plan_effective_date" class="no-bg no-border medium" value="0"></input>';


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function (alertMsg) {
                return alertMsg;
            }
            $injector.get('$controller')('enrollmentPlanCtrl', {$scope: $scope});
            $scope.childParentAlertMsg = function (alert) {
                return alert;
            };
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });


        appConfig.userId = "00001000483";
        appConfig.companyId = "31T";
        var appUserId = appConfig.userId,
            companyId = appConfig.companyId;


        $httpBackend.whenGET(moneyUrlConfig.moneyApi +
            moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.retirementPlan + '/' +
            companyId + '/' + appUserId +
            moneyUrlConfig.resources.contributions +
            moneyUrlConfig.resources.all).respond(200, retirementDataRes);

        $httpBackend.whenGET(moneyUrlConfig.moneyApi +
            moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.retirementPlan + '/' +
            companyId + '/' + appUserId + '/federal-amount').respond(200, fedAmountServiceRes);

        $httpBackend.whenGET(moneyUrlConfig.moneyApi + "/api-benefits/v1/" + moneyUrlConfig.resources.benefitPlan
            + '/' + companyId + '/' + appUserId + moneyUrlConfig.resources.eligibility).respond(200, eligibilityResponse);


        $httpBackend.flush();
    });

    describe('createNewRetirement function test', function () {
        it('createNewRetirement is defined', function () {
            expect($scope.createNewRetirement).toBeDefined();
        });

        it('createNewRetirement function call', function () {
            $scope.createNewRetirement();
        });

    });

    describe('enrollToggleClass function test', function () {
        it('enrollToggleClass is defined', function () {
            expect($scope.enrollToggleClass).toBeDefined();
        });

        it('enrollToggleClass function call', function () {
            var HTML2 = '<input type="text" id="enrollId" class="trinet-btn-dissable" value="0"></input>';
            var element1;
            element1 = $compile(HTML2)($scope);
            $body.append(element1);
            $rootScope.$digest();
            $scope.enrollToggleClass();
        });

        it('enrollToggleClass function call', function () {
            var HTML3 = '<input type="text" id="enrollId" class="" value="0"></input>';
            var element2;
            element2 = $compile(HTML3)($scope);
            $body.append(element2);
            $rootScope.$digest();
            $scope.checkValue = true;
            $scope.enrollToggleClass();
        });
    });

    describe('disableFlatGross function test', function () {
        it('disableFlatGross is defined', function () {
            expect($scope.disableFlatGross).toBeDefined();
        });

        it('disableFlatGross is called', function () {
            var HTML4 = '<input type="radio" id="flatDollarRadioId" checked="checked">';

            var HTML5 = '<input type="radio" id="grossWagesRadioId" checked="checked">';

            var element3, element4;

            element3 = $compile(HTML4)($scope);
            $body.append(element3);
            $rootScope.$digest();

            element4 = $compile(HTML5)($scope);
            $body.append(element4);
            $rootScope.$digest();

            $scope.disableFlatGross();


        });
    });

    describe('disableGoalLimit function test', function () {
        it('disableGoalLimit is defined', function () {
            expect($scope.disableGoalLimit).toBeDefined();
        });

        it('disableGoalLimit is called', function () {
            var HTML6 = '<input type="radio" id="goalAmountRadioId" checked="checked">';

            var HTML7 = '<input type="radio" id="limitAmountRadioId" checked="checked">';

            var element5, element6;

            element5 = $compile(HTML6)($scope);
            $body.append(element5);
            $rootScope.$digest();

            element6 = $compile(HTML7)($scope);
            $body.append(element6);
            $rootScope.$digest();

            $scope.disableGoalLimit();
        });
    });

    describe('maxContribution function test', function () {
        it('maxContribution is defined', function () {
            expect($scope.maxContribution).toBeDefined();
        });

        it('maxContribution function call', function () {
            $scope.maxContribution();

            expect($scope.maximumContributions).toBeDefined();
        });
    });

    describe('newEnroll function test', function () {
        it('newEnroll is defined', function () {
            expect($scope.newEnroll).toBeDefined();
        });

        it('newEnroll function call with enrollForm as false', function () {
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = false;
            $scope.newEnroll();
        });

        it('newEnroll function call yealding to success ', function () {
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var HTML8 = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML9 = '<input type="text" id="effectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML10 = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var HTML11 = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var HTML12 = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var HTML13 = '<input type="text" id="flatDollarInputId" value=0>';
            var HTML14 = '<input type="text" id="goalAmountInputId" value=0>';
            var HTML15 = '<input type="text" id="grossWagesInputId" value=0>';

            var element7, element8, element9, element10, element11, element12, element13, element14;

            element7 = $compile(HTML8)($scope);
            $body.append(element7);
            $rootScope.$digest();

            element8 = $compile(HTML9)($scope);
            $body.append(element8);
            $rootScope.$digest();

            element9 = $compile(HTML10)($scope);
            $body.append(element9);
            $rootScope.$digest();

            element10 = $compile(HTML11)($scope);
            $body.append(element10);
            $rootScope.$digest();

            element11 = $compile(HTML12)($scope);
            $body.append(element11);
            $rootScope.$digest();

            element12 = $compile(HTML13)($scope);
            $body.append(element12);
            $rootScope.$digest();

            element13 = $compile(HTML14)($scope);
            $body.append(element13);
            $rootScope.$digest();

            element14 = $compile(HTML15)($scope);
            $body.append(element14);
            $rootScope.$digest();

            var data = {
                           'effectiveDate': '2016-05-31',
                           'flatDeductionAmnt': 0,
                           'flatDeductionAmntAtax': 10,
                           'goalAmount': 0,
                           'pctGrossAtax': 10,
                           'pctGross': 0,
                           'planType': '4Q',
                           'limitType': '402',
                           'coverageElect': 'E',
                           'benefitPlan': 'Q',
                           'coverageBeginDate': '2016-05-31',
                           'coverageElectDate': '2016-05-31',
                           'limitExtType': 'E',
                           'calendarYear': '2016'
                       };
            var successResponse = {"_statusCode": "200","_statusText": "OK"};

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                                moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' +
                                appConfig.userId + moneyUrlConfig.resources.contributions+'?enableValidation=true', data).respond(200,successResponse);


            $scope.newEnroll();
            $httpBackend.flush();

        });
        it('newEnroll function call yealding to failure ', function () {
            spyOn($scope, 'windowReload');
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var HTML8 = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML9 = '<input type="text" id="effectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML10 = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var HTML11 = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var HTML12 = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var HTML13 = '<input type="text" id="flatDollarInputId" value=0>';
            var HTML14 = '<input type="text" id="goalAmountInputId" value=0>';
            var HTML15 = '<input type="text" id="grossWagesInputId" value=0>';

            var element7, element8, element9, element10, element11, element12, element13, element14;

            element7 = $compile(HTML8)($scope);
            $body.append(element7);
            $rootScope.$digest();

            element8 = $compile(HTML9)($scope);
            $body.append(element8);
            $rootScope.$digest();

            element9 = $compile(HTML10)($scope);
            $body.append(element9);
            $rootScope.$digest();

            element10 = $compile(HTML11)($scope);
            $body.append(element10);
            $rootScope.$digest();

            element11 = $compile(HTML12)($scope);
            $body.append(element11);
            $rootScope.$digest();

            element12 = $compile(HTML13)($scope);
            $body.append(element12);
            $rootScope.$digest();

            element13 = $compile(HTML14)($scope);
            $body.append(element13);
            $rootScope.$digest();

            element14 = $compile(HTML15)($scope);
            $body.append(element14);
            $rootScope.$digest();

            var data = {
                           'effectiveDate': '2016-05-31',
                           'flatDeductionAmnt': 0,
                           'flatDeductionAmntAtax': 10,
                           'goalAmount': 0,
                           'pctGrossAtax': 10,
                           'pctGross': 0,
                           'planType': '4Q',
                           'limitType': '402',
                           'coverageElect': 'E',
                           'benefitPlan': 'Q',
                           'coverageBeginDate': '2016-05-31',
                           'coverageElectDate': '2016-05-31',
                           'limitExtType': 'E',
                           'calendarYear': '2016'
                       };
            var failureResponse = {
                 "_statusCode": "400",
                 "_statusText": "OK",
                 "_error": {"detailMessage": "error"}
             };

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                                moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' +
                                appConfig.userId + moneyUrlConfig.resources.contributions+'?enableValidation=true', data).respond(400,failureResponse);


            $scope.newEnroll();
            $httpBackend.flush();
            expect($scope.windowReload).toHaveBeenCalled();

        });

        it('newEnroll function call ', function () {
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = true;
            $scope.checkDateValue = function () {
                return false;
            };
            var HTML8 = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML9 = '<input type="text" id="effectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var HTML10 = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var HTML11 = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var HTML12 = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var HTML13 = '<input type="text" id="flatDollarInputId" value="">';

            var element7, element8, element9, element10, element11, element12;

            element7 = $compile(HTML8)($scope);
            $body.append(element7);
            $rootScope.$digest();

            element8 = $compile(HTML9)($scope);
            $body.append(element8);
            $rootScope.$digest();

            element9 = $compile(HTML10)($scope);
            $body.append(element9);
            $rootScope.$digest();

            element10 = $compile(HTML11)($scope);
            $body.append(element10);
            $rootScope.$digest();

            element11 = $compile(HTML12)($scope);
            $body.append(element11);
            $rootScope.$digest();

            element12 = $compile(HTML13)($scope);
            $body.append(element12);
            $rootScope.$digest();

            $scope.newEnroll();
        });
    });

    describe('enrollSubmitForm function test', function () {
        it('enrollSubmitForm is defined', function () {
            expect($scope.enrollSubmitForm).toBeDefined();
        });

        it('enrollSubmitForm is called with enrollForm.$valid as true', function () {
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = true;
            $scope.enrollSubmitForm();
            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();

        });

        it('enrollSubmitForm is called enrollForm.$valid as false', function () {
            $scope.enrollForm = {};
            $scope.enrollForm.$valid = false;
            $scope.enrollSubmitForm();
            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();

        });
    });

    describe('closePanel function test', function () {
        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call', function () {
            $scope.closePanel();
        });
    });

    describe('editRetirement function test', function () {
        it('editRetirement is defined', function () {
            expect($scope.editRetirement).toBeDefined();
        });

        it('editRetirement is called', function () {
            $scope.coverageElect = 'W';
            $scope.flatDeductionAmnt = 10;
            $scope.editRetirement();
        });
    });

    describe('saveEditedData function test', function () {
        it('saveEditedData is defined', function () {
            expect($scope.saveEditedData).toBeDefined();
        });

        it('saveEditedData function is called when waivePlanchecked is true yealding success', function () {
            spyOn($scope, 'windowReload');
            $scope.waivePlanchecked = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var a = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var b = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var c = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var d = '<input type="radio" id="goalAmountRadioId" checked="checked">';

            var ela, elb, elc, eld;

            ela = $compile(a)($scope);
            $body.append(ela);
            $rootScope.$digest();

            elb = $compile(b)($scope);
            $body.append(elb);
            $rootScope.$digest();

            elc = $compile(c)($scope);
            $body.append(elc);
            $rootScope.$digest();

            eld = $compile(d)($scope);
            $body.append(eld);
            $rootScope.$digest();

            var waivePlan =  {
                    'effectiveDate': '2016-05-31',
                    'flatDeductionAmnt': 0,
                    'flatDeductionAmntAtax': 10,
                    'pctGrossAtax': 10,
                    'goalAmount': 0,
                    'pctGross': 0,
                    'planType': '4Q',
                    'limitType': '402',
                    'coverageElect': 'W',
                    'benefitPlan': 'Q',
                    'coverageBeginDate': '2016-05-31',
                    'coverageElectDate': '2016-05-31',
                    'limitExtType': 'E',
                    'calendarYear': '2016'
                };

            var successResponse = {"_statusCode": "200","_statusText": "OK"};

            $httpBackend.when('POST',moneyUrlConfig.moneyApi +moneyUrlConfig.moneyBaseUrl +
                             moneyUrlConfig.resources.retirementPlan + '/' +
                             appConfig.companyId + '/' + appConfig.userId +
                             moneyUrlConfig.resources.contributions+'?enableValidation=true', waivePlan).respond(200,successResponse);

            $scope.saveEditedData();
            $httpBackend.flush();
            expect($scope.windowReload).toHaveBeenCalled();
        });

        it('saveEditedData function is called when waivePlanchecked is true yealding failure', function () {
            $scope.waivePlanchecked = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var a = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var b = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var c = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var d = '<input type="radio" id="goalAmountRadioId" checked="checked">';

            var ela, elb, elc, eld;

            ela = $compile(a)($scope);
            $body.append(ela);
            $rootScope.$digest();

            elb = $compile(b)($scope);
            $body.append(elb);
            $rootScope.$digest();

            elc = $compile(c)($scope);
            $body.append(elc);
            $rootScope.$digest();

            eld = $compile(d)($scope);
            $body.append(eld);
            $rootScope.$digest();

            var waivePlan =  {
                    'effectiveDate': '2016-05-31',
                    'flatDeductionAmnt': 0,
                    'flatDeductionAmntAtax': 10,
                    'pctGrossAtax': 10,
                    'goalAmount': 0,
                    'pctGross': 0,
                    'planType': '4Q',
                    'limitType': '402',
                    'coverageElect': 'W',
                    'benefitPlan': 'Q',
                    'coverageBeginDate': '2016-05-31',
                    'coverageElectDate': '2016-05-31',
                    'limitExtType': 'E',
                    'calendarYear': '2016'
                };

            var failureResponse = {
                             "_statusCode": "400",
                             "_statusText": "OK",
                             "_error": {"detailMessage": "error"}
                         };

            $httpBackend.when('POST',moneyUrlConfig.moneyApi +moneyUrlConfig.moneyBaseUrl +
                             moneyUrlConfig.resources.retirementPlan + '/' +
                             appConfig.companyId + '/' + appConfig.userId +
                             moneyUrlConfig.resources.contributions+'?enableValidation=true', waivePlan).respond(400,failureResponse);

            $scope.saveEditedData();
            $httpBackend.flush();
        });

        it('saveEditedData function is called when waivePlanchecked is false and waiveCheckedTemp is true yealding success', function () {
            spyOn($scope, 'windowReload');
            $scope.waivePlanchecked = false;
            $scope.waiveCheckedTemp = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var e = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var f = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var g = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var h = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var i = '<input type="text" id="flatDollarInputId" value=0>';
            var j = '<input type="text" id="goalAmountInputId" value=0>';
            var k = '<input type="text" id="grossWagesInputId" value=0>';

            var ele, elf, elg, elh, eli, elj, elk;

            ele = $compile(e)($scope);
            $body.append(ele);
            $rootScope.$digest();

            elf = $compile(f)($scope);
            $body.append(elf);
            $rootScope.$digest();

            elg = $compile(g)($scope);
            $body.append(elg);
            $rootScope.$digest();

            elh = $compile(h)($scope);
            $body.append(elh);
            $rootScope.$digest();

            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();

            elj = $compile(j)($scope);
            $body.append(elj);
            $rootScope.$digest();

            elk = $compile(k)($scope);
            $body.append(elk);
            $rootScope.$digest();

            var addPlan =  {
                    'effectiveDate': '2016-05-31',
                    'flatDeductionAmnt': 0,
                    'flatDeductionAmntAtax': 10,
                    'pctGrossAtax': 10,
                    'goalAmount': 0,
                    'pctGross': 0,
                    'planType': '4Q',
                    'limitType': '402',
                    'coverageElect': 'E',
                    'benefitPlan': 'Q',
                    'coverageBeginDate': '2016-05-31',
                    'coverageElectDate': '2016-05-31',
                    'limitExtType': 'E',
                    'calendarYear': '2016'
                };
            var successResponse = {"_statusCode": "200","_statusText": "OK"};

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                              moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' + appConfig.userId +
                              moneyUrlConfig.resources.contributions+'?enableValidation=true', addPlan).respond(200,successResponse);
            $scope.saveEditedData();
            $httpBackend.flush();
            expect($scope.windowReload).toHaveBeenCalled();
        });

        it('saveEditedData function is called when waivePlanchecked is false and waiveCheckedTemp is true yealding failure', function () {
            $scope.waivePlanchecked = false;
            $scope.waiveCheckedTemp = true;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var e = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var f = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var g = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var h = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var i = '<input type="text" id="flatDollarInputId" value=0>';
            var j = '<input type="text" id="goalAmountInputId" value=0>';
            var k = '<input type="text" id="grossWagesInputId" value=0>';

            var ele, elf, elg, elh, eli, elj, elk;

            ele = $compile(e)($scope);
            $body.append(ele);
            $rootScope.$digest();

            elf = $compile(f)($scope);
            $body.append(elf);
            $rootScope.$digest();

            elg = $compile(g)($scope);
            $body.append(elg);
            $rootScope.$digest();

            elh = $compile(h)($scope);
            $body.append(elh);
            $rootScope.$digest();

            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();

            elj = $compile(j)($scope);
            $body.append(elj);
            $rootScope.$digest();

            elk = $compile(k)($scope);
            $body.append(elk);
            $rootScope.$digest();

            var addPlan =  {
                    'effectiveDate': '2016-05-31',
                    'flatDeductionAmnt': 0,
                    'flatDeductionAmntAtax': 10,
                    'pctGrossAtax': 10,
                    'goalAmount': 0,
                    'pctGross': 0,
                    'planType': '4Q',
                    'limitType': '402',
                    'coverageElect': 'E',
                    'benefitPlan': 'Q',
                    'coverageBeginDate': '2016-05-31',
                    'coverageElectDate': '2016-05-31',
                    'limitExtType': 'E',
                    'calendarYear': '2016'
                };
            var failureResponse = {
                 "_statusCode": "400",
                 "_statusText": "OK",
                 "_error": {"detailMessage": "error"}
             };

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                              moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' + appConfig.userId +
                              moneyUrlConfig.resources.contributions+'?enableValidation=true', addPlan).respond(400,failureResponse);
            $scope.saveEditedData();
            $httpBackend.flush();
        });

        it('saveEditedData function is called when waivePlanchecked is false  and waiveCheckedTemp is false yealding success', function () {
            $scope.waivePlanchecked = false;
            $scope.waiveCheckedTemp = false;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var i = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var j = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var k = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var l = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var m = '<input type="text" id="flatDollarInputId" value=0>';
            var n = '<input type="text" id="goalAmountInputId" value=0>';
            var o = '<input type="text" id="grossWagesInputId" value=0>';

            var eli, elj, elk, ell, elm, eln, elo;

            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();

            elj = $compile(j)($scope);
            $body.append(elj);
            $rootScope.$digest();

            elk = $compile(k)($scope);
            $body.append(elk);
            $rootScope.$digest();

            ell = $compile(l)($scope);
            $body.append(ell);
            $rootScope.$digest();

            elm = $compile(m)($scope);
            $body.append(elm);
            $rootScope.$digest();

            eln = $compile(n)($scope);
            $body.append(eln);
            $rootScope.$digest();

            elo = $compile(o)($scope);
            $body.append(elo);
            $rootScope.$digest();

            var updatePlan = {
                    effectiveDate: '2016-05-31',
                    flatDeductionAmnt: 0,
                    flatDeductionAmntAtax: 10,
                    pctGrossAtax: 10,
                    goalAmount: 0,
                    pctGross: 0,
                    planType: '4Q',
                    limitType: '402',
                    coverageElect: 'E',
                    benefitPlan: 'Q',
                    coverageBeginDate: '2016-05-31',
                    coverageElectDate: '2016-05-31',
                    limitExtType: 'E',
                    calendarYear: '2016'
                };

            var successResponse = {"_statusCode": "200","_statusText": "OK"};

            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                              moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' + appConfig.userId +
                              moneyUrlConfig.resources.contributions+'?enableValidation=true', updatePlan).respond(200,successResponse);

            $scope.saveEditedData();
            $httpBackend.flush();
        });

        it('saveEditedData function is called when waivePlanchecked is false  and waiveCheckedTemp is false yealding failure', function () {
            $scope.waivePlanchecked = false;
            $scope.waiveCheckedTemp = false;
            $scope.flatDeductionAmntAtax = 10;
            $scope.pctGrossAtax = 10;
            $scope.benefitPlan = 'Q';
            $scope.coverageBeginDate = '2016-05-31';
            $scope.coverageElectDate = '2016-05-31';
            $scope.limitExtType = 'E';

            var i = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var j = '<input type="radio" id="flatDollarRadioId" checked="checked">';
            var k = '<input type="radio" id="grossWagesRadioId" checked="checked">';
            var l = '<input type="radio" id="goalAmountRadioId" checked="checked">';
            var m = '<input type="text" id="flatDollarInputId" value=0>';
            var n = '<input type="text" id="goalAmountInputId" value=0>';
            var o = '<input type="text" id="grossWagesInputId" value=0>';

            var eli, elj, elk, ell, elm, eln, elo;

            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();

            elj = $compile(j)($scope);
            $body.append(elj);
            $rootScope.$digest();

            elk = $compile(k)($scope);
            $body.append(elk);
            $rootScope.$digest();

            ell = $compile(l)($scope);
            $body.append(ell);
            $rootScope.$digest();

            elm = $compile(m)($scope);
            $body.append(elm);
            $rootScope.$digest();

            eln = $compile(n)($scope);
            $body.append(eln);
            $rootScope.$digest();

            elo = $compile(o)($scope);
            $body.append(elo);
            $rootScope.$digest();

            var updatePlan = {
                    effectiveDate: '2016-05-31',
                    flatDeductionAmnt: 0,
                    flatDeductionAmntAtax: 10,
                    pctGrossAtax: 10,
                    goalAmount: 0,
                    pctGross: 0,
                    planType: '4Q',
                    limitType: '402',
                    coverageElect: 'E',
                    benefitPlan: 'Q',
                    coverageBeginDate: '2016-05-31',
                    coverageElectDate: '2016-05-31',
                    limitExtType: 'E',
                    calendarYear: '2016'
                };

            var failureResponse = {
                 "_statusCode": "400",
                 "_statusText": "OK",
                 "_error": {"detailMessage": "error"}
             };
            $httpBackend.when('POST',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                              moneyUrlConfig.resources.retirementPlan + '/' + appConfig.companyId + '/' + appConfig.userId +
                              moneyUrlConfig.resources.contributions+'?enableValidation=true', updatePlan).respond(400,failureResponse);

            $scope.saveEditedData();
            $httpBackend.flush();
        });
    });

    describe('editSubmitForm function test', function () {
        it('editSubmitForm is defined', function () {
            expect($scope.editSubmitForm).toBeDefined();
        });

        it('editSubmitForm is called with editEnrollForm.$valid as true', function () {
            $scope.editEnrollForm = {};
            $scope.editEnrollForm.$valid = true;
            $scope.editSubmitForm();
            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();
        });

        it('editSubmitForm is called with editEnrollForm.$valid as false', function () {
            $scope.editEnrollForm = {};
            $scope.editEnrollForm.$valid = false;
            $scope.editSubmitForm();
            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();
        });
    });


    describe('checkDateValue function test', function () {
        it('checkDateValue is defined', function () {
            expect($scope.checkDateValue).toBeDefined();
        });

        it('checkDateValue function call', function () {
            var HTML1 = '<input type="text" id="enrollEffectiveDate" class="no-bg no-border medium" value="05/31/2016"></input>';
            var element;
            element = $compile(HTML1)($scope);
            $body.append(element);
            $rootScope.$digest();
            $scope.checkDateValue();
        });
    });

    describe('dateChange function', function () {
        it('dateChange is defined', function () {
            expect($scope.dateChange).toBeDefined();
        });

        it('dateChange function call', function () {
            eli = $compile(HTML)($scope);
            $body.append(eli);
            $rootScope.$digest();
            var e;
            $scope.dateChange(e);
        });
    });

    describe('clearTextValues function', function () {
        it('clearTextValues is defined', function () {
            expect($scope.clearTextValues).toBeDefined();
        });

        it('clearTextValues function call with waivePlanchecked value as truthy value', function () {
            $scope.waivePlanchecked = true;
            $scope.clearTextValues();
        });

        it('clearTextValues function call with waivePlanchecked value as falsy value', function () {
            $scope.waivePlanchecked = false;
            $scope.clearTextValues();
        });
    });


    afterEach(function () {
        $body.empty();
    });
});
*/
