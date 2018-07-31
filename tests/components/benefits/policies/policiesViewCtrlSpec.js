/**
 * Created by Santosh on 10/28/2015.
 */

'use strict';
describe('Policies View Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        benefitsPoliciesJsonDataRes = {
            "benefitPoliciesDetails": [
                {
                    "tags": "",
                    "id": "1",
                    "subHeading": "Look at your company's contributions for each plan in your company's benefits package.",
                    "description": "Benefits Overview",
                    "img-url": "",
                    "documentUrl": "/ui/PayrollPolicy/BenefitsOverview.htm"
                }
            ]
        },
        benefitsData = {
            "data": {
                "@id": 1,
                "ambText": null,
                "benefitAtGlance": null,
                "benefitAtGlancePrevYear": null,
                "benefitsCarrier": null,
                "criticalIllness": null,
                "dental": null,
                "disability": null,
                "employeeAssistancePlan": null,
                "flexibleSpendingAccounts": null,
                "legalServices": null,
                "life": null,
                "medical": null,
                "medicarePartDNotices": [
                    {
                        "text": "2013-2014 Medicare Part D Creditable Coverage Notice",
                        "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2013-2014MedicarePartDCreditableCoverageNotice.pdf"
                    }
                ],
                "medicalSummary": null,
                "planDescList": null,
                "prevPlanYearStartDate": "October   01, 2014",
                "prevPlanYearEndDate": "September 30, 2015",
                "stateFederalNotices": [
                    {
                        "description": "Learn about Creditable Coverage standards.",
                        "text": "Cigna Massachusetts Creditable Coverage Letter",
                        "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/CIGNA-Massachusetts-Creditable-Coverage-Letter.pdf"
                    }
                ],
                "summaryAnnualReports": [
                    {
                        "text": "2013 - 2014 Summary Annual Report",
                        "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2013-2014_Plan_SAR.pdf"
                    }
                ],
                "legalNoticesList": [
                    {
                        "text": "2013 - 2014 Summary Annual Report",
                        "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2013-2014_Plan_SAR.pdf"
                    }
                ],
                "quater": "Q4",
                "thisPlanYearStartDate": "October   01, 2015",
                "thisPlanYearEndDate": "September 30, 2016",
                "vision": null,
                "t2_PLAN_DT_START": "2014-12-01 00:00:00.0"
            },
            "_statusCode": "200",
            "_statusText": "OK",
            "_statusMessage": "Success"
        };

    var simpleHTML = ' <div class="row" id="printCurrentBenf"></div>',
        $compile,
        el,
        $body = $('body');

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
            $injector.get('$controller')('policiesViewCtrl', {$scope: $scope});

        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'summary-plan?requestType=benefits').respond(200, benefitsData);
        $httpBackend.whenGET("assets/data/benefits/policiesData.json").respond(200, benefitsPoliciesJsonDataRes);


        $httpBackend.flush();
    });

    describe('isSelected function testing', function () {

        it('isSelected is defined', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('isSelected function call', function () {

            expect($scope.isSelected(0)).toBeTruthy();
            expect($scope.isSelected(1)).toBeFalsy();

        });

    });

    describe('closePanel function testing', function () {

        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call', function () {

            expect($scope.hideDiv).toBeUndefined();

            $scope.closePanel();

            expect($scope.tab).toBe(0);
            expect($scope.hideDiv).toBeFalsy();
        });

    });

    describe('get class function testing',function(){

        it('get class function is defined', function () {
            expect($scope.getClass).toBeDefined();
        });

        it('when no value is passed to get class function', function () {
            var value = '';
            expect($scope.getClass(value)).toEqual('no');
        });

        it('when false is passed to get class function', function () {
            var value = false;
            expect($scope.getClass(value)).toEqual('no');
        });

        it('when true is passed to get class function', function () {
            var value = true;
            expect($scope.getClass(value)).toEqual('yes');
        });
   });

    describe('selectTab function testing ', function () {
        it('selectTab is defined ', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call ', function () {
            $scope.benefitsSelectedData = function () {
            }
            $scope.selectTab();
        });
    });

    describe('$on testing',function(){

        it('$on function testing ', function () {
            constants.emitBenefitAlert = {
                alert: 'message', evnt: function () {
                }
            };
            spyOn($scope, '$on');
        });
   });

    describe('childParentAlertMsg function testing', function () {
        it('childParentAlertMsg is defined', function () {
            expect($scope.childParentAlertMsg).toBeDefined();
        });

        it('childParentAlertMsg function call', function () {
            var data = "msg";
            $scope.childParentAlertMsg(data);
        });
    });

    describe('selectedTile function testing', function () {
        it('selectedTile is defined', function () {
            expect($scope.selectedTile).toBeDefined();
        });

        it('selectedTile function call', function () {
            var value = 0;
            $scope.selectedTile(value);
        });
    });

    describe('printAcaMarket function testing', function () {
        it('printAcaMarket is defined', function () {
            expect($scope.printAcaMarket).toBeDefined();
        });

        it('printAcaMarket function call', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();
            var id = 'printCurrentBenf';
            $scope.printAcaMarket(id);
        });
    });

});
