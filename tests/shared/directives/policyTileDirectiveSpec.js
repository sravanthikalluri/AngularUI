/*Created by ganesh on 10/26/2015.*/

(function () {

    "use strict";


    describe('Policy Tile  Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            $httpBackend,
            appConfig,
            simpleHTML = '<tiles-list  ng-click="selectTab(benefitsPoliciesDataObject.id)" benefitsPoliciesDataObject="benefitsPoliciesDataObject"></tiles-list>',
            response = {
                "data": {
                    "docMeta": [{
                        "title": "BenefitsOverview",
                        "text": "Look at your company's contributions for each plan in your company's benefits package.",
                        "id": "1",
                        "url": null
                    }, {
                        "title": "Benefits Guide Book",
                        "text": "Information you need to explore all of your benefits options.",
                        "id": "2",
                        "url": null
                    }, {
                        "title": "MetLife Benefits",
                        "text": "Bolster your benefits with voluntary benefits options: Annuities, Auto, Critical Illness, Home, Pet Insurance, Variable Life, and much more.",
                        "id": "3",
                        "url": null
                    }, {
                        "title": "Aflac Benefits",
                        "text": ".",
                        "id": "4",
                        "url": null
                    }, {
                        "title": "State & Federal Notices",
                        "text": "Please review some important information about your rights.",
                        "id": "5",
                        "url": null
                    }, {
                        "title": "Additional Policies",
                        "text": "",
                        "id": "6",
                        "url": null
                    }, {
                        "title": "Summary Plan Description",
                        "text": "Contains in-depth information about your benefits coverage.",
                        "id": "7",
                        "url": null
                    }, {
                        "title": "Benefits Carrier Contacts",
                        "text": ".",
                        "id": "9",
                        "url": null
                    }],
                    generalInfo: {
                        generalMeta: []
                    }
                },
                "_statusCode": "200",
                "_statusText": "OK"
            },
            benefitsPoliciesJsonDataResponse = {
                "benefitPoliciesDetails": [
                    {
                        "tags": "",
                        "id": "1",
                        "subHeading": "Look at your company's contributions for each plan in your company's benefits package.",
                        "description": "Benefits Overview",
                        "img-url": "",
                        "documentUrl": "/ui/PayrollPolicy/BenefitsOverview.htm"
                    },
                    {
                        "tags": "",
                        "id": "2",
                        "subHeading": "Information you need to explore all of your benefits options.",
                        "description": "Benefits Guide Book",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/benefitsOverview/benefitsGuideBookView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "3",
                        "subHeading": "Look at the cost of each plan in your company's benefits package.",
                        "description": "Benefits Summary",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/benefitsSummary/benefitsSummaryView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "4",
                        "subHeading": "Contains in-depth information about your benefits coverage.",
                        "description": "Summary Plan Description",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/summaryPlanDescription/summaryPlanDescriptionView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "5",
                        "subHeading": "Please review some important information about your rights.",
                        "description": "State & Federal Notices",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/stateFederalNotices/stateFederalNoticesView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "6",
                        "subHeading": "",
                        "description": "Additional Policies",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/company/policies/additionalPolicies/additionalPoliciesView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "7",
                        "subHeading": "Provider Directories. Search for healthcare providers who serve your geographic area.",
                        "description": "Benefits Carrier Contacts",
                        "documentUrl": "/api-content/v1/benefits/policies/benefitsCarrierContacts/benefitsCarrierContactsView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "8",
                        "subHeading": "Bolster your benefits with voluntary benefits options: Annuities, Auto, Critical Illness, Home, Pet Insurance, Variable Life, and much more.",
                        "description": "MetLife Benefits",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/metlifeBenefits/metlifeBenefitsView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "9",
                        "subHeading": ".",
                        "description": "Aflac Benefits",
                        "img-url": "",
                        "documentUrl": "/api-content/v1/benefits/policies/aflacBenefits/aflacBenefitsView.html/fileSearch"
                    },
                    {
                        "tags": "",
                        "id": "10",
                        "subHeading": "",
                        "description": "null",
                        "imgurl": "assets/images/benefits/aetna.png",
                        "documentUrl": "http://aetna.com"
                    },
                    {
                        "tags": "",
                        "id": "11",
                        "subHeading": "",
                        "description": "null",
                        "imgurl": "assets/images/benefits/florida.png",
                        "documentUrl": "https://www.floridablue.com/hcr/what-health-care-reform"
                    },
                    {
                        "tags": "",
                        "id": "12",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/bluecross.png",
                        "documentUrl": "http://bcbs.com"
                    },
                    {
                        "tags": "",
                        "id": "13",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/california.png",
                        "documentUrl": "https://www.blueshieldca.com/"
                    },
                    {
                        "tags": "",
                        "id": "14",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/united-health-care.png",
                        "documentUrl": "http://www.unitedhealthgroup.com/"
                    },
                    {
                        "tags": "",
                        "id": "15",
                        "subHeading": ".",
                        "description": "",
                        "imgurl": "assets/images/benefits/metlife.png",
                        "documentUrl": "https://www.metlife.com/"
                    },
                    {
                        "tags": "",
                        "id": "16",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/kaiser.png",
                        "documentUrl": "https://kaiserpermanente.org/"
                    },
                    {
                        "tags": "",
                        "id": "17",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/Alfac.png",
                        "documentUrl": "https://www.aflac.com/"
                    },
                    {
                        "tags": "",
                        "id": "18",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/cigna.png",
                        "documentUrl": "http://www.cigna.com/"
                    },
                    {
                        "tags": "",
                        "id": "19",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/grouphealth.png",
                        "documentUrl": "https://ghc.org/"
                    },
                    {
                        "tags": "",
                        "id": "20",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/hmsa-blue-cross.png",
                        "documentUrl": "https://hmsa.com/"
                    },
                    {
                        "tags": "",
                        "id": "21",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/triple-s.png",
                        "documentUrl": "http://sssadvantage.com/"
                    },
                    {
                        "tags": "",
                        "id": "22",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/aetna.png",
                        "documentUrl": "http://aetna.com/"
                    },
                    {
                        "tags": "",
                        "id": "23",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/delta-dental.png",
                        "documentUrl": "https://www.deltadental.com/Public/index.jsp"
                    },
                    {
                        "tags": "",
                        "id": "24",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/guardian.png",
                        "documentUrl": "http://theguardian.com/"
                    },
                    {
                        "tags": "",
                        "id": "25",
                        "subHeading": ".",
                        "imgurl": "assets/images/benefits/metlife.png",
                        "documentUrl": "https://www.metlife.com/"
                    },
                    {
                        "tags": "",
                        "id": "26",
                        "subHeading": ".",
                        "description": "null",
                        "imgurl": "assets/images/benefits/vsp.png",
                        "documentUrl": "https://www.vsp.com/"
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
                        },
                        {
                            "text": "2012-2013 Medicare Part D Creditable Coverage Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2012-2013MedicarePartDCreditableCoverageNotice.pdf"
                        },
                        {
                            "text": "2011-2012 Medicare Part D Creditable Coverage Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2011-2012MedicarePartDCreditableCoverageNotice.pdf"
                        },
                        {
                            "text": "2010-2011 Medicare Part D Creditable Coverage Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2010-2011MedicarePartDCreditableCoverageNotice.pdf"
                        },
                        {
                            "text": "2009-2010 Medicare Part D Creditable Coverage Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2009-2010MedicareNotice_CreditableCoverage_ PrescriptionDrug.pdf"
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
                        },
                        {
                            "description": "Learn about professional employer organizations and Connecticut statutes.",
                            "text": "Connecticut Insurance Bulletin HC-61 Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/Aetna_Connecticut_letter.pdf"
                        },
                        {
                            "description": "Learn about COBRA coverage.",
                            "text": "General Notice of COBRA Continuation Coverage Rights",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/GENERAL_NOTICE_OF_COBRA_CONTINUATION_COVERAGE_RIGHTS.pdf"
                        },
                        {
                            "description": "Learn about your rights under GINA.",
                            "text": "Genetic Information Nondiscrimination Act Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/Genetic_Information_NondiscriminationRights_Act.pdf"
                        },
                        {
                            "description": "Learn how your medical information is used and disclosed.",
                            "text": "HIPAA Privacy Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/HIPAA_Privacy_Notice.pdf"
                        },
                        {
                            "description": "Learn about your rights for dependent child coverage.",
                            "text": "Michelle's Law Enrollment Rights Notice",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/Notification_of_Rights_under_Michelle_s_Law.pdf"
                        },
                        {
                            "description": "Learn about protections for mothers and their newborn children.",
                            "text": "Newborn's and Mother's Health Protection Act",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2008-2009NewbornsAnd MothersHealthProtectionAct.pdf"
                        },
                        {
                            "description": "Learn about your rights for coverage.",
                            "text": "Women's Health and Cancer Rights Act",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2008-2009WomensHealthAndCancerRightsAct.pdf"
                        }
                    ],
                    "summaryAnnualReports": [
                        {
                            "text": "2013 - 2014 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2013-2014_Plan_SAR.pdf"
                        },
                        {
                            "text": "2012 - 2013 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2012-2013_Plan_SAR.pdf"
                        },
                        {
                            "text": "2011 - 2012 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2011-2012_Plan_SAR.pdf"
                        },
                        {
                            "text": "2010 - 2011 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2010-2011_Plan_SAR.pdf"
                        },
                        {
                            "text": "2010 - 2010 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2010-2010_Plan_SAR.pdf"
                        },
                        {
                            "text": "2009 - 2010 Summary Annual Report",
                            "url": "/v1/extranet/Benefits/Spd/pdf/Annual_General_Notice/2009-2010_Plan_SAR.pdf"
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

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                $injector.get('$controller')('policiesViewCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');

            });


            $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                appConfig.companyId + '/' + appConfig.userId + '/' + 'summary-plan?requestType=benefits').respond(200, benefitsData);

            $httpBackend
                .whenGET('assets/data/benefits/policiesData.json').respond(200, benefitsPoliciesJsonDataResponse);

            $httpBackend.flush();

            $scope.benefitsPoliciesDataObject = response.data.docMeta[0];
            $scope.$index = 0;


        });

        it('Should contain benefits ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var benefits = el.find('div#benefits' + $scope.$index);
            expect(benefits.length).toEqual(0);
            expect(benefits.is(":visible")).toBe(false);

        });


        it('Should contain title-block ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var titleBlock = el.find('div.title-block');
            expect(titleBlock.length).toEqual(1);
            expect(titleBlock.is(":visible")).toBe(true);

            expect($(titleBlock).attr('id')).toEqual('sidebar' + $scope.benefitsPoliciesDataObject.id);


        });

        it('Should contain heading ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var h4 = el.find('h4');
            expect(h4.length).toEqual(1);
            expect(h4.is(":visible")).toBe(true);

        });

        it('Should contain sub heading ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var p = el.find('p.content-text');
            expect(p.length).toEqual(1);
            expect(p.is(":visible")).toBe(true);

        });

        it('click event testing', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var benefits = el.find('div#benefits' + $scope.$index);

            expect($scope.selectTab).toBeDefined();


        });


        afterEach(function () {
            $body.empty();
            $httpBackend.verifyNoOutstandingExpectation();

        });

    });


}());
