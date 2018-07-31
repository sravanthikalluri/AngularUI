/**
 * Created by Jayakrishna on 12/02/2015.
 */

'use strict';
describe('Summary Plan Description View Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend;

    var summaryPlanDataResponse = {
        "data": {
            "@id": 1,
            "ambText": null,
            "quater": "Q4",
            "thisPlanYearStartDate": "October   01, 2015",
            "thisPlanYearEndDate": "September 30, 2016",
            "prevPlanYearStartDate": "October   01, 2014",
            "prevPlanYearEndDate": "September 30, 2015",
            "medicalSummary": {
                "url": "/api-content/v1/benefits/policies/TriNetWhatsChangingQ4_Client.pdf/pdf",
                "text": "2016 What's Changing"
            },
            "benefitAtGlance": {
                "date": "October 1, 2015 - September 30, 2016",
                "url": ["/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-AllPlans.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Dental-Vision.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Life-Disability.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Florida.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Mountain-West.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-BCBSNC.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Northeast-Midwest.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Northwest.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-NY-Tri-State.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-SouthCentral.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2016-Q4-BAAG-Southeast.pdf/pdf"],
                "text": ["Benefits At-A-Glance All Plans", "Benefits At-A-Glance Dental and Vision", "Benefits At-A-Glance Life and Disability", "Benefits At-A-Glance Florida", "Benefits At-A-Glance Mountain West", "Benefits At-A-Glance North Carolina", "Benefits At-A-Glance Northeast and Midwest", "Benefits At-A-Glance Northwest", "Benefits At-A-Glance NY/TriState", "Benefits At-A-Glance South Central", "Benefits At-A-Glance Southeast"]
            },
            "benefitAtGlancePrevYear": {
                "date": "October 1, 2014 - September 30, 2015",
                "url": ["/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-AllPlans.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-LifeDisability.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-Florida.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-Mountain-West.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-BCBSNC.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-Northeast-and-Midwest.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-Northwest.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-NY-Tri-State.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-SouthCentral.pdf/pdf", "/api-content/v1/benefits/policies/BAAG/2015-Q4-BAAG-Southeast.pdf/pdf"],
                "text": ["Benefits At-A-Glance All Plans", "Benefits At-A-Glance Life and Disability", "Benefits At-A-Glance Florida", "Benefits At-A-Glance Mountain West", "Benefits At-A-Glance North Carolina", "Benefits At-A-Glance Northeast and Midwest", "Benefits At-A-Glance Northwest", "Benefits At-A-Glance NY/TriState", "Benefits At-A-Glance South Central", "Benefits At-A-Glance Southeast"]
            },
            "planDesc": [{
                "url": "/api-content/v1/benefits/policies/benefit_guide/TriNet-Benefit-Guidebook_Prev_Q4.pdf/pdf",
                "text": "TriNet Benefits Guidebook and Summary Plan Description",
                "date": "(October   01, 2014 - September 30, 2015)"
            }],
            "medical": [{text: 'text'}],
            "dental": [{text: 'text'}],
            "vision": [{text: 'text'}],
            "life": [{
                text: 'text',
                "MetLife": {
                    "data": [{
                        "CCPrevYear": {
                            "text": "CC",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/MetLifeBasicLife_AD&D_20K.pdf/pdf"
                        },
                        "label": "MetLifeBasicLifeAD&D20K",
                        "CCCurYear": {
                            "text": "CC",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/MetLifeBasicLife_AD&D_20K.pdf/pdf"
                        }
                    }], "h1": "MetLife", "h2": "CarrierCertificates(CC)"
                }
            }],
            "disability": [{
                "Aetna": [{
                    "Aetna Short-Term Disability - Nationwide except Louisiana": [{
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaSTD1EmployerPaid6623_NationwideExcept_LA.pdf/pdf"
                            },
                            "label": "Disability Option 1 - 67% of pay (weekly max $2308) Coupled w/Group LTD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaSTD1EmployerPaid6623_NationwideExcept_LA.pdf/pdf"
                            }
                        }], "h1": "Employer-Paid Coverage - Group", "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaSTD4EmployeePaid60_NationwideExcept_LA.pdf/pdf"
                            },
                            "label": "Disability Option 4 - 60% of pay (weekly max $2308) Coupled w/Group LTD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaSTD4EmployeePaid60_NationwideExcept_LA.pdf/pdf"
                            }
                        }], "h1": "Employee-Paid Coverage - Optional", "h2": "Carrier Certificates (CC)"
                    }]
                }, {
                    "Aetna Short-Term Disability - Louisiana Only": [{
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaSTD1EmployerPaid6623_LA.pdf/pdf"
                            },
                            "label": "Disability Option 1 - 67% of pay (weekly max $2308) Coupled w/Group LTD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaSTD1EmployerPaid6623_LA.pdf/pdf"
                            }
                        }], "h1": "Employer-Paid Coverage - Group", "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaSTD4EmployeePaid60_LA.pdf/pdf"
                            },
                            "label": "Disability Option 4 - 60% of pay (weekly max $2308) Coupled w/Group LTD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaSTD4EmployeePaid60_LA.pdf/pdf"
                            }
                        }], "h1": "Employee-Paid Coverage - Optional", "h2": "Carrier Certificates (CC)"
                    }]
                }, {
                    "Aetna Long-Term Disability - Nationwide except Louisiana": [{
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD1EmployerPaid6623_NationwideExcept_LA.pdf/pdf"
                            },
                            "label": "Disability Option 1 - 67% of pay (monthly max $10K) Coupled w/Group STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD1EmployerPaid6623_NationwideExcept_LA.pdf/pdf"
                            }
                        }], "h1": "Employer-Paid Coverage - Group", "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD2iEmployerPaid60_NationwideExcept_LA.pdf/pdf"
                            },
                            "label": "Disability Option 2i - 60% of pay (monthly max $10K) Coupled w/Group STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD2iEmployerPaid60_NationwideExcept_LA.pdf/pdf"
                            }
                        }],
                        "h1": "Employer-Paid Coverage - Group (Non-taxable benefit)",
                        "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD6EmployeePaid50_NationwideExcept_LA.pdf/pdf"
                            },
                            "label": "Disability Option 6 - 50% of pay (monthly max $10K) Coupled w/Optional STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD6EmployeePaid50_NationwideExcept_LA.pdf/pdf"
                            }
                        }], "h1": "Employee-Paid Coverage - Optional", "h2": "Carrier Certificates (CC)"
                    }]
                }, {
                    "Aetna Long-Term Disability - Louisiana only": [{
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD1EmployerPaid6623_LA.pdf/pdf"
                            },
                            "label": "Disability Option 1 - 67% of pay (monthly max $10K) Coupled w/Group STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD1EmployerPaid6623_LA.pdf/pdf"
                            }
                        }], "h1": "Employer-Paid Coverage - Group", "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD2iEmployerPaid60_LA.pdf/pdf"
                            },
                            "label": "Disability Option 2i - 60% of pay (monthly max $10K) Coupled w/Group STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD2iEmployerPaid60_LA.pdf/pdf"
                            }
                        }],
                        "h1": "Employer-Paid Coverage - Group (Non-taxable benefit)",
                        "h2": "Carrier Certificates (CC)"
                    }, {
                        "data": [{
                            "CCPrevYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/AetnaLTD6EmployeePaid50_LA.pdf/pdf"
                            },
                            "label": "Disability Option 6 - 50% of pay (monthly max $10K) Coupled w/Optional STD",
                            "CCCurYear": {
                                "text": "CC",
                                "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/AetnaLTD6EmployeePaid50_LA.pdf/pdf"
                            }
                        }], "h1": "Employee-Paid Coverage - Optional", "h2": "Carrier Certificates (CC)"
                    }]
                }]
            }],
            "employeeAssistancePlan": [{
                "Employee Assistance Plan": {
                    "data": [{
                        "SBCPrevYear": {
                            "text": "SBC",
                            "url": "http://172.31.47.207/api-content/v1/benefits/policies/SBC_CurrentYear/TriNet_SBC.pdf/pdf"
                        },
                        "SBCCurYear": {"text": "NA", "url": "N/A"},
                        "CCPrevYear": {
                            "text": "CC",
                            "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_PreviousYear/EmployeeAssistancePlan.pdf/pdf"
                        },
                        "label": "Employee Assistance Plan (FEI)",
                        "CCCurYear": {
                            "text": "CC",
                            "url": "http://172.31.47.207/api-content/v1/benefits/policies/SPD_CurrentYear/EmployeeAssistancePlan.pdf/pdf"
                        }
                    }],
                    "h1": "Employee Assistance Plan",
                    "h2": "CARRIER CERTIFICATES (CC)",
                    "h3": "SUMMARY OF BENEFITS AND COVERAGE (SBC)"
                },
                "sub": [{subpanes: 'subpanes'}]
            }],
            "annualNotices": [{
                "MedicarePartDNotices": {
                    "data": [{
                        "SBCPrevYear": {
                            "text": "2009-2010MedicarePartDCreditableCoverageNotice",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2009-2010MedicareNotice_CreditableCoverage_%20PrescriptionDrug.pdf/pdf"
                        },
                        "SBCCurYear": {
                            "text": "2011-2012MedicarePartDCreditableCoverageNotice",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2011-2012MedicarePartDCreditableCoverageNotice.pdf/pdf"
                        },
                        "CCPrevYear": {
                            "text": "2012-2013MedicarePartDCreditableCoverageNotice",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2012-2013MedicarePartDCreditableCoverageNotice.pdf/pdf"
                        },
                        "CCCurYear": {
                            "text": "2013-2014MedicarePartDCreditableCoverageNotice",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2013-2014MedicarePartDCreditableCoverageNotice.pdf/pdf"
                        }
                    }]
                }
            }, {
                "SummaryAnnualReports(SummaryofTriNet‘sWelfarePlan5500s)": {
                    "data": [{
                        "SBCPrevYear": {
                            "text": "2009-2010SummaryAnnualReport",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2009-2010_Plan_SAR.pdf/pdf"
                        },
                        "SBCCurYear": {
                            "text": "2011-2012SummaryAnnualReport",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2011-2012_Plan_SAR.pdf/pdf"
                        },
                        "CCPrevYear": {
                            "text": "2012-2013SummaryAnnualReport",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2012-2013_Plan_SAR.pdf/pdf"
                        },
                        "CCCurYear": {
                            "text": "2013-2014SummaryAnnualReport",
                            "url": "http: //172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2013-2014_Plan_SAR.pdf/pdf"
                        }
                    }]
                }
            }],
            "generalNotices": [{
                "data": [{
                    "SBCPrevYear": {
                        "text": "Women’s Health and Cancer Rights Act",
                        "url": "http://172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/2008-2009WomensHealthAndCancerRightsAct.pdf/pdf"
                    },
                    "SBCCurYear": {
                        "text": "General Notice of COBRA Continuation Coverage Rights",
                        "url": "http://172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/GENERAL_NOTICE_OF_COBRA_CONTINUATION_COVERAGE_RIGHTS.pdf/pdf"
                    },
                    "CCPrevYear": {
                        "text": "Connecticut Insurance Bulletin HC-61 Notice",
                        "url": "http://172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/Aetna_Connecticut_letter.pdf/pdf"
                    },
                    "CCCurYear": {
                        "text": "Cigna Massachusetts Creditable Coverage Letter",
                        "url": "http://172.31.47.207/api-content/v1/benefits/policies/Annual_General_Notice/CIGNA-Massachusetts-Creditable-Coverage-Letter.pdf/pdf"
                    }
                }]
            }],
            "t2_PLAN_DT_START": "1999-12-31 00:00:00.0"
        }, "_statusCode": "200", "_statusText": "OK"
    };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('summaryPlanDescriptionViewCtrl', {$scope: $scope});
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'summary-plan').respond(200, summaryPlanDataResponse);


        $httpBackend.flush();
    });

    describe('atenaPopUp function testing ', function () {
        it('atenaPopUp is defined ', function () {
            expect($scope.atenaPopUp).toBeDefined();
        });

        it('atenaPopUp funciton call with type as medical', function () {
            var type = 'medical',
                index = 0;
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as vision', function () {
            var type = 'vision',
                index = 0;
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as life', function () {
            var type = 'life',
                index = 0;
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as dental', function () {
            var type = 'dental',
                index = 0;
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as disability', function () {
            var type = 'disability',
                index = 0;
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as criticalIllness', function () {
            var type = 'criticalIllness',
                index = 0;
            $scope.criticalIllnessData = [{text: 'text'}];
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as legalServices', function () {
            var type = 'legalServices',
                index = 0;
            $scope.legalServicesData = [{text: 'text'}];
            $scope.atenaPopUp(index, type);
        });

        it('atenaPopUp funciton call with type as flexibleSpendingAccounts', function () {
            var type = 'flexibleSpendingAccounts',
                index = 0;
            $scope.flexibleSpendingAmountsData = [{text: 'text'}];
            $scope.atenaPopUp(index, type);
        });
    });

    describe('bindImgUrl function testing ', function () {
        it('bindImgUrl is defined ', function () {
            expect($scope.bindImgUrl).toBeDefined();
        });

        it('bindImgUrl function call with a parameter ', function () {
            var data = 0;
            $scope.bindImgUrl(data);
        });
    });
});