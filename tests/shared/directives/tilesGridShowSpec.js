/**
 * Created by ganesh on 10/26/2015.
 */
(function () {

    "use strict";


    describe('Tiles Grid Show  Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            appConfig,
            el,
            $rootScope,
            $httpBackend,
            simpleHTML = '<ul class="gridder">' +
                '<li ng-repeat="benefitsPoliciesDataObject in managerFormData" class="gridder-list" data-griddercontent="#gridder-content-{{$index+1}}" id="list{{$index+1}}" ng-model="x1" on-last-repeat>' +
                '<div class="title-block">' +
                '<h4>{{benefitsPoliciesDataObject.heading}}</h4>' +
                '<p class="form-content-text">{{benefitsPoliciesDataObject.subheading}}.</p>' +
                '</div>' +
                '</li>' +
                '</ul>',

            managerFormDataResponse = {
                "data": [
                    {
                        "text": "Employee Forms",
                        "sub": [
                            {
                                "url": "api-content/v1/benefits/eForms/Employee/ApplicationForEmployment.pdf/pdf",
                                "label": "Application for Employment"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/HIPAA_PHI_AuthForm.pdf/pdf",
                                "label": "Authorization to Use/Disclose Protected Health Information"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/ben_changeLSC.pdf/pdf",
                                "label": "Benefits Change Request Due to Life Status Change (LSC)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/TriNetMedCert.pdf/pdf",
                                "label": "Medical Certification from Health Care Provider"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/ExtendedLeaveOfAbsenceApplication.pdf/pdf",
                                "label": "Extended Leave of Absence Request "
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/TriNet_2013_HIPAA_Privacy_Notice_FINAL.pdf/pdf",
                                "label": "HIPAA Privacy Notice"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/TriNet_2013_HIPAA_Privacy_Notice_FINAL.pdf/pdf",
                                "label": "I-9's are now completed electronically, please refer to the Electronic I-9 Manual for instructions."
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/New_Employee_Info.pdf/pdf",
                                "label": "New Employee Personal Information and Conditions of Employment Statement"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/RequestforTimeOff.pdf/pdf",
                                "label": "Request for Time Off"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/SF_DesignatedPersonSickLeave.pdf/pdf",
                                "label": "San Francisco \"Designated Person\" for Paid Sick Leave "
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/I9-Manual_self_us_thr.pdf/pdf",
                                "label": "I-9's are now completed electronically, please refer to the Electronic I-9 Manual for instructions."
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/Section_152_Tax_Dependent_Certification_Form.pdf/pdf",
                                "label": "Section 152 Tax Dependent Certification Form"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Employee/Employee_Deduction_Authorization.pdf/pdf",
                                "label": "Employee Payroll Deduction Authorization"
                            }
                        ]
                    },
                    {
                        "text": "Nonresident Alien Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eforms/NonResident/taddstu.pdf/pdf",
                                "label": "Addendums to Form 8233 for Students1"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eforms/NonResident/fIHR001days.pdf/pdf",
                                "label": "Days of Presence"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eforms/NonResident/F-EE001_ForeignNatlTaxSetup.pdf/pdf",
                                "label": "Foreign National Tax Setup/Change form"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eforms/NonResident/Excerptp519.pdf/pdf",
                                "label": "Excerpt from Publication 519: resident vs. nonresident alien"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/fIHR001days.pdf/pdf",
                                "label": "Days of Presence"
                            },
                            {
                                "url": "http://www.irs.gov/Forms-&-Pubs",
                                "label": "Visit the IRS Forms for additional forms and information"
                            }
                        ]
                    },
                    {
                        "text": "Flex Spending Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/FlexSpending/CardholdersGuide.pdf/pdf",
                                "label": "BPS Cardholder�s Guide"
                            }
                        ]
                    },
                    {
                        "text": "Federal Tax Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/FederalTax/FW4.pdf/pdf",
                                "label": "Form W-4: 2015"
                            },
                            {
                                "url": "http://www.hacienda.gobierno.pr/downloads/pdf/formularios/499%20r-4.1.pdf/pdf",
                                "label": "Puerto Rico Form 499 R-4.1"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/FederalTax/fIHR001days.pdf/pdf",
                                "label": "Days of Presence"
                            }
                        ]
                    },
                    {
                        "text": "Payroll Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/Employee_Deduction_Authorization.pdf/pdf",
                                "label": "Employee Payroll Deduction Authorization"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/Addl_Tax_Withholding_On_Supplemental_Pay.pdf/pdf",
                                "label": "Additional Tax Withholding on Supplemental Pay"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Hourly_Employees_English.pdf/pdf",
                                "label": "New York Wage Notice for Hourly Employees (English)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Hourly_Employees_Chinese.pdf/pdf",
                                "label": "New York Wage Notice for Hourly Employees (Chinese)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Hourly_Employees_Korean.pdf/pdf",
                                "label": "New York Wage Notice for Hourly Employees (Korean)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Hourly_Employees_Spanish.pdf/pdf",
                                "label": "New York Wage Notice for Hourly Employees (Spanish)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Non-Exempt_Salaried_Employees_English.pdf/pdf",
                                "label": "New York Wage Notice for Salaried Non-Exempt Employees (English)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Non-Exempt_Salaried_Employees_Chinese.pdf/pdf",
                                "label": "New York Wage Notice for Salaried Non-Exempt Employees (Chinese)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Non-Exempt_Salaried_Employees_Korean.pdf/pdf",
                                "label": "New York Wage Notice for Salaried Non-Exempt Employees (Korean)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Non-Exempt_Salaried_Employees_Spanish.pdf/pdf",
                                "label": "New York Wage Notice for Salaried Non-Exempt Employees (Spanish)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Exempt_Employees_English.pdf/pdf",
                                "label": "New York Wage Notice for Exempt Employees (English)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Exempt_Employees_Chinese.pdf/pdf",
                                "label": "New York Wage Notice for Exempt Employees (Chinese)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Exempt_Employees_Korean.pdf/pdf",
                                "label": "New York Wage Notice for Exempt Employees (Korean)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/PayRoll/WTPA_Notice_and_Ack_Form_for_Exempt_Employees_Spanish.pdf/pdf",
                                "label": "New York Wage Notice for Exempt Employees (Spanish)"
                            }
                        ]
                    },
                    {
                        "text": "Manager Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/exit042.pdf/pdf",
                                "label": "Exit Interview"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/FACTSHEET_HawaiiCrimHistoryLawFactSheet.pdf/pdf",
                                "label": "Factsheet - Hawaii Criminal History Law Factsheet"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/Factsheet_PhiladelphiaCriminalHistory.pdf/pdf",
                                "label": "Factsheet - Philadelphia Criminal History Law Factsheet "
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/exit042.pdf/pdf",
                                "label": "Exit Interview"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/RepaymentAgreement.pdf/pdf",
                                "label": "Loan Repayment Agreement form"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/perform_rev.doc/doc",
                                "label": "Performance Review Form (PDF print to fill) MSWord auto fill form"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/record_of_counsel.pdf/pdf",
                                "label": "Record of Counseling Discussion"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/term_cklCHR039.pdf/pdf",
                                "label": "Termination Checklist"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/Retirement_Loan_Deduction_Form.xls/xls",
                                "label": "Retirement Loan Deduction Form"
                            }
                        ]
                    },
                    {
                        "text": "Flexible Spending Account Forms",
                        "sub": [
                            {
                                "url": "asp",
                                "label": "FSA FAQ (Frequently Asked Questions)"
                            }
                        ]
                    },
                    {
                        "text": "Health Plan Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/DeltaDentalClaimForm.pdf/pdf",
                                "label": "Delta Dental Claim Form"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/KaiserFlexibleChoiceOONClaImFormDC_MD_VA.pdf/pdf",
                                "label": "Kaiser Flexible Choice Out-of-Network Claim Form (DC/MD/VA)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/KaiserPPOClaimFormVA.pdf/pdf",
                                "label": "Kaiser PPO Claim Form (VA)"
                            }
                        ]
                    },
                    {
                        "text": "Benefit Forms",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/affidavit.pdf/pdf",
                                "label": "Affidavit of Domestic Partnership"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/ben_changeLSC.doc/doc",
                                "label": "Benefits Change Request Due to Life Status Change (LSC)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/met_conversion.pdf/pdf",
                                "label": "Conversion of Group Life Benefits to an Individual Policy"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/HIPAAInfoRelease.pdf/pdf",
                                "label": "HIPAA Authorization for Release, Use and/or Disclosure of Protected Health Information (PHI)"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/HIPAANoticetoEE.pdf/pdf",
                                "label": "HIPAA Privacy Notice dated April 14, 2003"
                            }
                        ]
                    },
                    {
                        "text": "State Unemployment",
                        "sub": [
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/de1857d.pdf/pdf",
                                "label": "California Unemployment Insurance Benefits"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/UC-61.pdf/pdf",
                                "label": "Connecticut Unemployment Notice"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/DOL-800.pdf/pdf",
                                "label": "Georgia Separation Notice"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/BEN-39.pdf/pdf",
                                "label": "Illinois Unemployment Insurance"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/77form.pdf/pdf",
                                "label": "Louisiana Separation Notice"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/uia_UC1711_76111_7.pdf/pdf",
                                "label": "Michigan Unemployment Compensation Notice"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/BC10.pdf/pdf",
                                "label": "New Jersey Instructions for Claiming Unemployment Benefits"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/ia12_3.pdf/pdf",
                                "label": "New York Record of Employment for UI"
                            },
                            {
                                "url": "file:///api-content/v1/benefits/eForms/Manager/LB-0489.pdf/pdf",
                                "label": "Tennessee Separation Notice"
                            }
                        ]
                    }
                ]
            };


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                $injector.get('$controller')('managerFormViewCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');

            });


            $httpBackend
                .whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                    "/" + appConfig.companyId + "/" + appConfig.userId + "/forms?countryCode=" + appConfig.countryCode)
                .respond(200, managerFormDataResponse);

            $httpBackend.flush();
            $scope.loadForms();

        });

        it('Should contain ul ', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            expect(el.length).toEqual(1);
            expect(el.is(":visible")).toBe(true);


        });

        it('Should contain li and count of li ', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var li = el.find('li');
            expect(li).toBeDefined();


        });


        afterEach(function () {
            $body.empty();


        });

    });


}());