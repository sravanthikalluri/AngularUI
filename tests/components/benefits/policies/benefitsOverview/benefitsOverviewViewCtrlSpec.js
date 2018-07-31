/**
 * Created by Jayakrishna on 12/3/2015.
 */

describe('Benefits Overview Controller Testing ', function () {

    var $rootScope,
        $httpBackend,
        $scope,
        appConfig;

    var benefitsOverViewResponse = {
        "data": {
            "benefitsOverview": {
                "basicLifeInsurance": "Leapfrog",
                "basicLifeInsurancePlan": "LIFE",
                "benefitFundingPayPolicies": {
                    "a1_medicalEmployeeOnly": 470.0,
                    "a2_medicalEmployeeSpouse": 667.05,
                    "a3_medicalEmployeeChildren": 634.15,
                    "a4_medicalEmployeeFamily": 798.65,
                    "b1_groupDentalEmployeeOnly": 35.34,
                    "b2_groupDentalEmployeeSpouse": 48.33,
                    "b3_groupDentalEmployeeChildren": 48.32,
                    "b4_groupDentalEmployeeFamily": 61.31
                },
                "benefitFundingStrategyMethod": "PCT",
                "benefitPlanEndDate": "2016-09-30",
                "benefitPlanStartDate": "2015-08-01",
                "benefitsSupplimentAll": 0.0,
                "benefitsSupplimentContribCoverage": "Medical and Dental",
                "companyGroupMedicalInsurance": true,
                "companyGroupDentalInsurance": true,
                "companyGroupVisionInsurance": false,
                "employeeDentalPercent": 100.0,
                "employeeFamilyDentalPercent": 35.0,
                "employeeFamilyMedicalPercent": 36.0,
                "employeeFamilyVisionPercent": 0.0,
                "employeeMedicalPercent": 100.0,
                "employeeVisionPercent": 0.0,
                "enrollmentQuarter": "8Y",
                "groupLongTermDisabilityInsurance": "Leapfrog",
                "groupLongTermDisabilityInsurancePlan": "000E2V",
                "groupLongTermDisabilityInsuranceWaive": true,
                "groupShortTermDisabilityInsurance": "Leapfrog",
                "groupShortTermDisabilityInsuraceMaxBenefitDays": null,
                "groupShortTermDisabilityInsurancePlan": "000E2K",
                "groupShortTermDisabilityInsuranceWaive": true,
                "healthInsuranceSupplementReturnPolicy": null,
                "healthInsuranceFixedPayPolicy": null,
                "hsaContribution": "0",
                "healthInsuraceWaiverBenefitAllowance": 0.0,
                "noGroup": false,
                "retirementPlan": "Y"
            }
        }, "_statusCode": "200", "_statusText": "OK", "_statusMessage": "Success"
    };
    var templateResponse = {
        "data": {
            "medicalEmployeeOnly": {
                "content": "Medical Employee Only"
            },
            "medicalEmployeeSpouse": {
                "content": "Medical Employee + Spouse"
            },
            "medicalEmployeeChildren": {
                "content": "Medical Employee + Child(ren)"
            },
            "medicalEmployeeFamily": {
                "content": "Medical Employee + Family"
            },
            "groupDentalEmployeeOnly": {
                "content": "Group Dental Employee Only"
            },
            "groupDentalEmployeeSpouse": {
                "content": "Group Dental Employee + Spouse"
            },
            "groupDentalEmployeeChildren": {
                "content": "Group Dental Employee + Child(ren)"
            },
            "groupDentalEmployeeFamily": {
                "content": "Group Dental Employee + Family"
            },
            "groupVisionEmployeeOnly": {
                "content": "Group Vision Employee Only"
            },
            "groupVisionEmployeeSpouse": {
                "content": "Group Vision Employee + Spouse"
            },
            "groupVisionEmployeeChildren": {
                "content": "Group Vision Employee + Child(ren)"
            },
            "groupVisionEmployeeFamily": {
                "content": "Group Vision Employee + Family"
            },
            "employeeOnly": {
                "content": "Employee Only"
            },
            "employeeSpouse": {
                "content": "Employee + Spouse"
            },
            "employeeChildren": {
                "content": "Employee + Child(ren)"
            },
            "employeeFamily": {
                "content": "Employee + Family"
            },
            "benefitOverviewTitle": {
                "content": "Benefits Overview"
            },
            "benefitSponseredCompany": {
                "content": "Sponsored by TriNet<br/>Contact <a href='mailto:MYHR@trinet.com'><u>MYHR@trinet.com</u></a> with questions",
                "rule": {
                    "Or": [
                        "Company.001",
                        "Company.002"
                    ]
                }
            },
            "benefitSponseredCompanyTriNet": {
                "content": "Sponsored by TriNet<br/>Phone: 1-800-638-0461 Email: <a href='mailto:employees@trinet.com'><u>employees@trinet.com</u></a>",
                "rule": {
                    "Not": [{
                        "Or": [
                            "Company.001",
                            "Company.002"
                        ]
                    }]
                }
            },
            "benefitsCompanyQuote": {
                "content": "{companyName} (the \"Company\") is proud to have selected the following comprehensive TriNet benefits package to meet your personal and family needs."
            },
            "benefitsPlanTitle": {
                "content": "TriNet Benefits Plan"
            },
            "trinetBenefitPlanPhrase": {
                "content": "TriNet is the single employer sponsor of all its benefit plans. TriNet makes these plans available to qualifying worksite employees (\"WSEs\"), with whom TriNet has established an employment relationship, and who perform services for customers of TriNet in a Professional Employer Organization (\"PEO\") service model. Please refer to the TriNet Benefits Guidebook for further details regarding benefits eligibility."
            },
            "benefitsElectWaivePhrase": {
                "content": "It is very important that you waive or elect those benefits that best suit the needs of your family. If you do not make a benefits election during your 30-day election period, TriNet will automatically enroll you in employee only default medical coverage, which is generally the lowest cost PPO medical plan available in your geographic area. The default medical coverage in which you automatically are enrolled because you failed to make a timely benefits election may not be the coverage you want. If you already have group medical coverage, you may choose to waive or opt out of TriNet's medical benefits.",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "medical": {
                "content": "Medical ",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "trinetMedicalCarrierInfo": {
                "content": "TriNet partners with leading carriers, like Aetna, Florida Blue, Blue Shield of California and Kaiser, to offer a broad range of medical plans, including high-deductible health plans, PPOs and HMOs. Medical plan options vary by state, and may also include regional carriers.",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "dental": {
                "content": "Dental",
                "rule": {
                    "And": [
                        "Dent",
                        "Group"
                    ]
                }
            },
            "trinetDentalCarrierInfo": {
                "content": "TriNet's four dental carriers - Delta Dental, Aetna, Guardian Dental, and MetLife - offer a high and a low national dental PPO plan. Aetna and Delta Dental also will make available a DMO plan in many states.",
                "rule": {
                    "And": [
                        "Dent",
                        "Group"
                    ]
                }
            },
            "vision": {
                "content": "Vision",
                "rule": {
                    "And": [
                        "Vis",
                        "Group"
                    ]
                }
            },
            "trinetVisionCarrierInfo": {
                "content": "TriNet also offers a high and a low vision plan nationally through two different carriers: Aetna and Vision Service Plan (VSP). These plan options ensure that you can choose the best plan and carrier for your individual vision needs.",
                "rule": {
                    "And": [
                        "Vis",
                        "Group"
                    ]
                }
            },
            "employeeHeathPercentageContribution": {
                "content": "The Company pays {medicalPercentVerbiage}{verbiageSeparator3}{dentalPercentVerbiage}{verbiageSeparator2}{visionPercentVerbiage} coverage for employee.",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.PCT",
                        "Group"
                    ]
                }
            },
            "medicalPercentVerbiage": {
                "content": "{employeeMedicalPercent}% of premiums for medical",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "dentalPercentVerbiage": {
                "content": "{employeeDentalPercent}% of premiums for dental",
                "rule": {
                    "And": [
                        "Dent",
                        "Group"
                    ]
                }
            },
            "visionPercentVerbiage": {
                "content": "{employeeVisionPercent}% of premiums for vision",
                "rule": {
                    "And": [
                        "Vis",
                        "Group"
                    ]
                }
            },
            "familyMedicalPercentVerbiage": {
                "content": "{employeeFamilyMedicalPercent}% of premiums for medical",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "familyDentalPercentVerbiage": {
                "content": "{employeeFamilyDentalPercent}% of premiums for dental",
                "rule": {
                    "And": [
                        "Dent",
                        "Group"
                    ]
                }
            },
            "familyVisionPercentVerbiage": {
                "content": "{employeeFamilyVisionPercent}% of premiums for vision",
                "rule": {
                    "And": [
                        "Vis",
                        "Group"
                    ]
                }
            },
            "verbiageSeparator3": {
                "content": ", "
            },
            "verbiageSeparator2": {
                "content": " and "
            },
            "medicalSupVerbiage": {
                "content": "medical",
                "rule": {
                    "And": [
                        "Med",
                        "Group"
                    ]
                }
            },
            "dentalSupVerbiage": {
                "content": "dental",
                "rule": {
                    "And": [
                        "Dent",
                        "Group"
                    ]
                }
            },
            "visionSupVerbiage": {
                "content": "vision",
                "rule": {
                    "And": [
                        "Vis",
                        "Group"
                    ]
                }
            },
            "employeeFamilyHeathPercentageContribution": {
                "content": "&nbsp;In addition, the Company funds {familyMedicalPercentVerbiage}{verbiageSeparator3}{familyDentalPercentVerbiage}{verbiageSeparator2}{familyVisionPercentVerbiage} coverage for spouse, dependent and domestic partner.",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.PCT",
                        "CompanyEmployeeFamilyInsurance",
                        "Group"
                    ]
                }
            },
            "companyContributionCaps": {
                "content": "&nbsp;These contribution amounts are capped at:",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.PCT",
                        "CompanyHealthInsurancePercentCapped",
                        "Group"
                    ]
                }
            },
            "employeeHealthInsuranceContribution": {
                "content": "You are responsible for the remainder of the premium cost, if any.",
                "rule": {
                    "And": [
                        {
                            "Or": [
                                "CompanyBenefitFundingStrategyMethod.PCT",
                                "CompanyBenefitFundingStrategyMethod.BS",
                                "CompanyBenefitFundingStrategyMethod.EEC",
                                "CompanyBenefitFundingStrategyMethod.ERC"
                            ]
                        },
                        "Group"
                    ]
                }
            },
            "companyHSAContribution": {
                "content": "The Company also provides a {companyEmployeeHSAContributionVerbiage} HSA contribution for employee only HDHP coverage and {companyEmployeeFamilyHSAContributionVerbiage} for employee + 1 or more eligible dependent(s) HDHP coverage. Please refer to the TriNet Benefits Guidebook for more information about HSA.",
                "rule": {
                    "And": [
                        "Med",
                        "CompanyEmployeeHSA",
                        "CompanyEmployeeFamilyHSA",
                        "Group"
                    ]
                }
            },
            "companyEmployeeHSAContribution1": {
                "content": "$50.00/month ($600/plan year maximum*)",
                "rule": "CompanyEmployeeHSA.1"
            },
            "companyEmployeeHSAContribution2": {
                "content": "$166.66/month ($2,000/ plan year maximum*)",
                "rule": "CompanyEmployeeHSA.2"
            },
            "companyEmployeeHSAContribution3": {
                "content": "$258.34/month ($3,100/plan year maximum*)",
                "rule": "CompanyEmployeeHSA.3"
            },
            "companyEmployeeFamilyHSAContribution1": {
                "content": "$100.00/month ($1,200/plan year maximum*)",
                "rule": "CompanyEmployeeFamilyHSA.1"
            },
            "companyEmployeeFamilyHSAContribution2": {
                "content": "$333.33/month ($4,000/plan year maximum*)",
                "rule": "CompanyEmployeeFamilyHSA.2"
            },
            "companyEmployeeFamilyHSAContribution3": {
                "content": "$520.84/month ($6,250/plan year maximum*)",
                "rule": "CompanyEmployeeFamilyHSA.3"
            },
            "companyHSAContributionNote": {
                "content": "*To receive the maximum plan year contribution, an individual must have the same qualifying coverage during the entire plan year. For example, if an individual is not enrolled in a qualified high-deductible health plan for three months ending on March 31, he or she has disqualifying coverage and is said to be ineligible. However, the individual may receive the remaining nine months, or 9/12 of the HSA contribution limit (at any time).",
                "rule": {
                    "And": [
                        "Med",
                        "CompanyEmployeeHSA",
                        "CompanyEmployeeFamilyHSA",
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceSupplementCoverage": {
                "content": "The Company pays a benefits supplement that covers a significant portion of the premium for employee, spouse/domestic partner, dependent health plans including {medicalSupVerbiage}{verbiageSeparator3}{dentalSupVerbiage}{verbiageSeparator2}{visionSupVerbiage} coverage. Any portion of the supplement remaining after {medicalSupVerbiage}{verbiageSeparator3}{dentalSupVerbiage}{verbiageSeparator2}{visionSupVerbiage} premiums have been paid will be {companyHealthInsuranceSupplementReturnPolicyVerbiage}.",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.BS",
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceSupplementContributions": {
                "content": "&nbsp;The benefit supplement amounts are:",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.BS",
                        "CompanyHealthInsurancePercentCapped",
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceSupplementReturnCompany": {
                "content": "returned to the Company",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.BS",
                        "CompanyHealthInsuranceSupplementReturnPolicy.F"
                    ]
                }
            },
            "companyHealthInsuranceSupplementReturnEmployee": {
                "content": "paid to you as taxable income",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethod.BS",
                        "CompanyHealthInsuranceSupplementReturnPolicy.C"
                    ]
                }
            },
            "companyHealthInsuranceFixedCoverage": {
                "content": "For all health benefits, {companyHealthInsuranceFixedPayPolicyVerbiage} a fixed dollar amount each month towards the plan you elect.",
                "rule": {
                    "And": [
                        {
                            "Or": [
                                "CompanyBenefitFundingStrategyMethod.EEC",
                                "CompanyBenefitFundingStrategyMethod.ERC"
                            ]
                        },
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceFixedContributions": {
                "content": "&nbsp;Those amounts are based on the number of covered people:",
                "rule": {
                    "And": [
                        "CompanyBenefitFundingStrategyMethodFixed",
                        "CompanyHealthInsurancePercentCapped",
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceFixedCompany": {
                "content": "the Company contributes",
                "rule": "CompanyHealthInsuranceFixedPayPolicy.ERC"
            },
            "companyHealthInsuranceFixedEmployee": {
                "content": "you contribute",
                "rule": "CompanyHealthInsuranceFixedPayPolicy.EEC"
            },
            "companyHealthInsuranceCapFundingStrategies": {
                "content": "<div id='policyPaymentDetail'></div>",
                "rule": {
                    "And": ["CompanyHealthInsuranceCapFundingStrategies",
                        "Group"
                    ]
                }
            },
            "companyHealthInsuranceWaiverBenefit": {
                "content": "If you already have current group {medicalVerbiage}coverage, you may choose to waive or opt out of TriNet's group health benefits. If you choose to waive health coverage, you {companyHealthInsuraceWaiverBenefitAllowanceVerbiage}will still be able to enroll in optional plans and flexible spending accounts.",
                "rule": "Med"
            },
            "companyHealthInsuraceWaiverBenefitAllowance": {
                "content": "will receive a ${companyHealthInsuraceWaiverBenefitAllowance} monthly benefit allowance and&nbsp;",
                "rule": "CompanyHealthInsuranceWaiveBenefitAllowance"
            },
            "basicLifeInsuranceHeading": {
                "content": "Basic Life Insurance & AD&D",
                "rule": "CompanyBasicLifeInsurance"
            },
            "medicalVerbiage": {
                "content": "medical ",
                "rule": "Med"
            },
            "basicLifePlanLIFE": {
                "content": "$20,000",
                "rule": "basicLifeInsurancePlan.LIFE"
            },
            "basicLifePlanG5": {
                "content": "$50,000",
                "rule": "basicLifeInsurancePlan.G5"
            },
            "basicLifePlan1XLIFE": {
                "content": "1X Earnings",
                "rule": "basicLifeInsurancePlan.1XLIFE"
            },
            "basicLifePlan2XLIFE": {
                "content": "2X Earnings",
                "rule": "basicLifeInsurancePlan.2XLIFE"
            },
            "basicLifePlan3XLIFE": {
                "content": "3X Earnings",
                "rule": "basicLifeInsurancePlan.3XLIFE"
            },
            "basicLifePlan0005RS": {
                "content": "$100,000",
                "rule": "basicLifeInsurancePlan.0005RS1"
            },
            "basicLifePlanNB2": {
                "content": "1 Times Salary",
                "rule": "basicLifeInsurancePlan.NB2"
            },
            "basicLifePlanNB3": {
                "content": "2 Times Salary",
                "rule": "basicLifeInsurancePlan.NB3"
            },
            "basicLifePlanNB4": {
                "content": "3 Times Salary",
                "rule": "basicLifeInsurancePlan.NB4"
            },
            "basicLifePlanNB6": {
                "content": "$10,000",
                "rule": "basicLifeInsurancePlan.NB6"
            },
            "basicLifePlanNB1": {
                "content": "$100,000",
                "rule": "basicLifeInsurancePlan.NB1"
            },
            "basicLifePlanNB5": {
                "content": "$50,000",
                "rule": "basicLifeInsurancePlan.NB5"
            },
            "basicLifePlan00097J": {
                "content": "$20,000",
                "rule": "basicLifeInsurancePlan.00097J"
            },
            "basicLifePlan00098B": {
                "content": "1X Salary plus 20k",
                "rule": "basicLifeInsurancePlan.00098B"
            },
            "basicLifePlan000D70": {
                "content": "<b>TEST</b>",
                "rule": "basicLifeInsurancePlan.000D70"
            },
            "basicLifeInsuranceCoverage": {
                "content": "TriNet offers company-paid basic life and accidental death and dismemberment (AD&D) plans. The Company pays for basic life insurance coverage valued at {basicLifeInsurancePolicy}, which includes an equal amount of AD&D coverage.",
                "rule": "CompanyBasicLifeInsurance"
            },
            "groupShortTermDisabilityMaxBenefitDays180": {
                "content": "180",
                "rule": {
                    "Or": [
                        "GroupShortTermDisabilityInsurancePlan.STD1",
                        "GroupShortTermDisabilityInsurancePlan.NB7"
                    ]
                }
            },
            "groupShortTermDisabilityMaxBenefitDays90": {
                "content": "90",
                "rule": {
                    "Or": [
                        "GroupShortTermDisabilityInsurancePlan.STD3",
                        "GroupShortTermDisabilityInsurancePlan.STD2",
                        "GroupShortTermDisabilityInsurancePlan.NB8"
                    ]
                }
            },
            "groupShortTermDisabilityMaxBenefitDaysDefault": {
                "content": "180",
                "rule": {
                    "Or": [
                        "GroupShortTermDisabilityInsurancePlan.00097Y",
                        "GroupShortTermDisabilityInsurancePlan.000D8Y",
                        "GroupShortTermDisabilityInsurancePlan.000D97",
                        "GroupShortTermDisabilityInsurancePlan.000E2E",
                        "GroupShortTermDisabilityInsurancePlan.000E2A",
                        "GroupShortTermDisabilityInsurancePlan.000E2C",
                        "GroupShortTermDisabilityInsurancePlan.000E2G",
                        "GroupShortTermDisabilityInsurancePlan.000E2K",
                        "GroupShortTermDisabilityInsurancePlan.000E2B",
                        "GroupShortTermDisabilityInsurancePlan.000E2I",
                        "GroupShortTermDisabilityInsurancePlan.000JNJ",
                        "GroupShortTermDisabilityInsurancePlan.000JNF",
                        "GroupShortTermDisabilityInsurancePlan.000JNL",
                        "GroupShortTermDisabilityInsurancePlan.000JNH"
                    ]
                }
            },
            "groupShortTermDisabilityInsurancePlanSTD1": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.STD1"
            },
            "groupShortTermDisabilityInsurancePlanSTD3": {
                "content": "66.67%",
                "rule": "GroupShortTermDisabilityInsurancePlan.STD3"
            },
            "groupShortTermDisabilityInsurancePlanSTD2": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.STD2"
            },
            "groupShortTermDisabilityInsurancePlanNB7": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.NB7"
            },
            "groupShortTermDisabilityInsurancePlanNB8": {
                "content": "66.67%",
                "rule": "GroupShortTermDisabilityInsurancePlan.NB8"
            },
            "groupShortTermDisabilityInsurancePlan00097Y": {
                "content": "Grp %",
                "rule": "GroupShortTermDisabilityInsurancePlan.00097Y"
            },
            "groupShortTermDisabilityInsurancePlan000D8Y": {
                "content": "STD SDI Opt 1%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000D8Y"
            },
            "groupShortTermDisabilityInsurancePlan000D97": {
                "content": "STD SDI Opt 1%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000D97"
            },
            "groupShortTermDisabilityInsurancePlan000E2E": {
                "content": "50%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2E"
            },
            "groupShortTermDisabilityInsurancePlan000E2A": {
                "content": "66.67%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2A"
            },
            "groupShortTermDisabilityInsurancePlan000E2C": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2C"
            },
            "groupShortTermDisabilityInsurancePlan000E2G": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2G"
            },
            "groupShortTermDisabilityInsurancePlan000E2K": {
                "content": "50%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2K"
            },
            "groupShortTermDisabilityInsurancePlan000E2B": {
                "content": "66.67%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2B"
            },
            "groupShortTermDisabilityInsurancePlan000E2I": {
                "content": "50%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000E2I"
            },
            "groupShortTermDisabilityInsurancePlan000JNJ": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000JNJ"
            },
            "groupShortTermDisabilityInsurancePlan000JNF": {
                "content": "60%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000JNF"
            },
            "groupShortTermDisabilityInsurancePlan000JNL": {
                "content": "50%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000JNL"
            },
            "groupShortTermDisabilityInsurancePlan000JNH": {
                "content": "50%",
                "rule": "GroupShortTermDisabilityInsurancePlan.000JNH"
            },
            "groupShortTermDisabilityInsuranceHeading": {
                "content": "Group Short-Term Disability Insurance",
                "rule": "CompanyGroupShortTermDisabilityInsurance"
            },
            "groupShortTermDisabilityInsuranceCoverage": {
                "content": "The Company provides a policy that may replace up to {groupShortTermDisabilityInsurance} of your salary, up to a maximum benefit of $2,308 per week, for qualifying disabilities, for up to a maximum benefit of {groupShortTermDisabilityInsuraceMaxBenefitDays} days.",
                "rule": "CompanyGroupShortTermDisabilityInsurance"
            },
            "groupLongTermDisabilityInsuraceWaitingPeriod90": {
                "content": "90",
                "rule": {
                    "Or": [
                        "GroupLongTermDisabilityInsurancePlan.LTD2",
                        "GroupLongTermDisabilityInsurancePlan.LTD3",
                        "GroupLongTermDisabilityInsurancePlan.NB6",
                        "GroupLongTermDisabilityInsurancePlan.NB5"
                    ]
                }
            },
            "groupLongTermDisabilityInsuraceWaitingPeriod180": {
                "content": "180",
                "rule": {
                    "Or": [
                        "GroupLongTermDisabilityInsurancePlan.LTD1",
                        "GroupLongTermDisabilityInsurancePlan.NB4"
                    ]
                }
            },
            "groupLongTermDisabilityInsuraceWaitingPeriodDefault": {
                "content": "180",
                "rule": {
                    "Or": [
                        "GroupLongTermDisabilityInsurancePlan.OLTD",
                        "GroupLongTermDisabilityInsurancePlan.NB7",
                        "GroupLongTermDisabilityInsurancePlan.00097O",
                        "GroupLongTermDisabilityInsurancePlan.00097X",
                        "GroupLongTermDisabilityInsurancePlan.000D94",
                        "GroupLongTermDisabilityInsurancePlan.000D9D",
                        "GroupLongTermDisabilityInsurancePlan.000E2T",
                        "GroupLongTermDisabilityInsurancePlan.000E2U",
                        "GroupLongTermDisabilityInsurancePlan.000E2S",
                        "GroupLongTermDisabilityInsurancePlan.000E2Q",
                        "GroupLongTermDisabilityInsurancePlan.000E2R",
                        "GroupLongTermDisabilityInsurancePlan.000E2V",
                        "GroupLongTermDisabilityInsurancePlan.000JND",
                        "GroupLongTermDisabilityInsurancePlan.000JNB",
                        "GroupLongTermDisabilityInsurancePlan.000JNE",
                        "GroupLongTermDisabilityInsurancePlan.000JNC"
                    ]
                }
            },
            "groupLongTermDisabilityInsurancePlanOLTD": {
                "content": "OLTD%",
                "rule": "GroupLongTermDisabilityInsurancePlan.OLTD"
            },
            "groupLongTermDisabilityInsurancePlanLTD2": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.LTD2"
            },
            "groupLongTermDisabilityInsurancePlanLTD1": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.LTD1"
            },
            "groupLongTermDisabilityInsurancePlanLTD3": {
                "content": "66.67%",
                "rule": "GroupLongTermDisabilityInsurancePlan.LTD3"
            },
            "groupLongTermDisabilityInsurancePlanNB4": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.NB4"
            },
            "groupLongTermDisabilityInsurancePlanNB7": {
                "content": "Optional NB7%",
                "rule": "GroupLongTermDisabilityInsurancePlan.NB7"
            },
            "groupLongTermDisabilityInsurancePlanNB6": {
                "content": "66.67%",
                "rule": "GroupLongTermDisabilityInsurancePlan.NB6"
            },
            "groupLongTermDisabilityInsurancePlanNB5": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.NB5"
            },
            "groupLongTermDisabilityInsurancePlan00097O": {
                "content": "Vol 00097O%",
                "rule": "GroupLongTermDisabilityInsurancePlan.00097O"
            },
            "groupLongTermDisabilityInsurancePlan00097X": {
                "content": "Grp 00097X%",
                "rule": "GroupLongTermDisabilityInsurancePlan.00097X"
            },
            "groupLongTermDisabilityInsurancePlan000D94": {
                "content": "LTD Opt 1 EE paid 000D94%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000D94"
            },
            "groupLongTermDisabilityInsurancePlan000D9D": {
                "content": "LTD Opt 1 ER paid 000D9D%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000D9D"
            },
            "groupLongTermDisabilityInsurancePlan000E2T": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2T"
            },
            "groupLongTermDisabilityInsurancePlan000E2U": {
                "content": "50%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2U"
            },
            "groupLongTermDisabilityInsurancePlan000E2S": {
                "content": "50%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2S"
            },
            "groupLongTermDisabilityInsurancePlan000E2Q": {
                "content": "66.67%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2Q"
            },
            "groupLongTermDisabilityInsurancePlan000E2R": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2R"
            },
            "groupLongTermDisabilityInsurancePlan000E2V": {
                "content": "50%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000E2V"
            },
            "groupLongTermDisabilityInsurancePlan000JND": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000JND"
            },
            "groupLongTermDisabilityInsurancePlan000JNB": {
                "content": "60%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000JNB"
            },
            "groupLongTermDisabilityInsurancePlan000JNE": {
                "content": "50%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000JNE"
            },
            "groupLongTermDisabilityInsurancePlan000JNC": {
                "content": "50%",
                "rule": "GroupLongTermDisabilityInsurancePlan.000JNC"
            },
            "groupLongTermDisabilityInsuranceHeading": {
                "content": "Group Long-Term Disability Insurance",
                "rule": "CompanyGroupLongTermDisabilityInsurance"
            },
            "groupLongTermDisabilityInsuranceCoverage": {
                "content": "The Company provides a policy that may replace up to  {groupLongTermDisabilityInsurance} of your salary, up to a maximum benefit of $10,000 per month, for qualifying disabilities. A waiting period of 180 days will apply.",
                "rule": "CompanyGroupLongTermDisabilityInsurance"
            },
            "trinetOptionalPlansTitle": {
                "content": "Optional TriNet Plans Available at Employee Expense"
            },
            "dentalHeading": {
                "content": "Dental",
                "rule": "CompanyNoGroupDentalInsurance"
            },
            "optionDentalPlan": {
                "content": "TriNet's four dental carriers - Delta Dental, Aetna, Guardian Dental and MetLife - offer a high and a low national dental PPO plan. Aetna and Delta Dental also will make available a DMO plan in many states",
                "rule": "CompanyNoGroupDentalInsurance"
            },
            "visionSubTitle": {
                "content": "Vision",
                "rule": "CompanyNoGroupVisionInsurance"
            },
            "optionalVisionPlan": {
                "content": "TriNet offers a high and a low vision plan nationally through two different carriers: Aetna and Vision Service Plan (VSP). These plan options ensure that you can choose the best plan and carrier for your individual vision needs.",
                "rule": "CompanyNoGroupVisionInsurance"
            },
            "fsaPlanSubTitle": {
                "content": "Flexible Spending Account (FSA) Plans"
            },
            "fsaPlan": {
                "content": "FSAs help you pay for eligible out-of-pocket health care and dependent day care expenses on a pre-tax basis. You determine your projected expenses for the Plan Year and then elect to set aside a portion of each paycheck into your FSA. For the 2014-2015 Plan Year you may contribute from $200 to $2,500 to each FSA"
            },
            "fsaPlanYears": {
                "content": "{fsaPlanStartYear}-{fsaPlanEndYear}",
                "rule": "FSAPlanYears"
            },
            "fsaPlanYear": {
                "content": "{fsaPlanStartYear}",
                "rule": "FSAPlanYear"
            },
            "supplementalLifeInsuranceHeading": {
                "content": "Supplemental Life Insurance"
            },
            "supplementalLifeInsurance": {
                "content": "If you want extra protection for yourself and your eligible dependents, you have the option to elect supplemental life insurance. You may request coverage yourself for one to six times your annual salary, with a maximum benefit of $2,000,000. Spousal coverage is also available in increments of $10,000 up to $150,000, and child coverage for $10,000. Note that amounts above guaranteed issue ($300,000 for you and $30,000 for your spouse) and certain coverage increases must be approved by the insurance carrier."
            },
            "supplementalADAndDInsuranceHeading": {
                "content": "Supplemental Accidental Death and Dismemberment Insurance"
            },
            "supplementalADAndDInsurance": {
                "content": "AD&D covers death or dismemberment from an accident only. You may elect supplemental AD&D coverage in amounts of $25,000, $50,000, $100,000, $250,000, $500,000 or $750,000"
            },
            "shortTermLongTermDisabilityHeading": {
                "content": "Short- and Long-Term Disability Insurance"
            },
            "shortTermLongTermDisability": {
                "content": "Disability insurance plans are designed to provide income protection while you recover from a disability. This coverage not only ensures that you are able to receive some income while out on disability; it also provides absence management support that helps facilitate your return to work. TriNet offers several short- and long-term disability plan options."
            },
            "trinetBenefitProgramsTitle": {
                "content": "Additional TriNet Benefits Programs"
            },
            "commuterBenefitSubTitle": {
                "content": "Pre-Tax Commuter Benefits:"
            },
            "commuterBenefit": {
                "content": "The commuter benefit plan allows you to set aside pre-tax dollars to pay for eligible commuting costs, such as expenses for parking, public transit and alternative forms of transportation. Passes can be delivered right to your home, or you can simply submit monthly receipts for reimbursement."
            },
            "trinetPerksSubTitle": {
                "content": "TriNet Perks:"
            },
            "trinetPerks": {
                "content": "Discounts are available for vacation destinations, hotels, food, restaurants, car rentals, retail, and much more. You will be able to explore what's available under the \"TriNet Perks\" section of TriNet's TriNet Passport."
            },
            "trinetEmployeeAssistanceProgramSubTitle": {
                "content": "Employee Assistance Program (EAP)"
            },
            "trinetEmployeeAssistanceProgram": {
                "content": "The EAP is available at no cost, even if you don't enroll in TriNet group benefits. You and your family members may access free, confidential counseling and referral services. This program provides 24-hour confidential assistance with personal, family and work-related concerns - plus online resources. The toll-free, dedicated EAP phone number is 1-888-893-5893."
            },
            "companyRetirementPlanTitle": {
                "content": "Retirement Plan",
                "rule": "CompanyRetirementPlan"
            },
            "companyRetirementPlan": {
                "content": "The company offers a retirement plan in which you may make voluntary pre-tax contributions toward your retirement. Please contact your retirement plan administrator for details on eligibility and matching contributions, if applicable.",
                "rule": "CompanyRetirementPlan"
            },
            "voluntaryInsuranceTitle": {
                "content": "Voluntary Insurance Plans"
            },
            "metLifeVoluntaryInsuranceSubTitle": {
                "content": "MetLife Voluntary Benefits:"
            },
            "metLifeVoluntaryInsurance": {
                "content": "These programs are offered at group rates with the convenience of automatic payroll deductions. Enrollment in Critical Illness Insurance and the Group Legal Services Plan is restricted to the 30-day enrollment period after your initial TriNet benefits eligibility date and during TriNet's annual Open Enrollment. Benefits options include:<ul id='bulleted_list'><li> Critical Illness Insurance </li><li> Group Legal Services Plan </li><li> Group Variable Universal Life Insurance (GVUL) </li><li> Auto, Home, and Renters Insurance </li><li> Pet Insurance </li><li> Lifelong Income Annuity Options </li></ul>"
            },
            "aflacSupplementalInsuranceSubTitle": {
                "content": "Aflac Supplemental Insurance"
            },
            "aflacSupplementalInsurance": {
                "content": "Aflac has a range of products including accident insurance, cancer insurance, hospital confinement and intensive care insurance and specified disease insurance. Enrollment in Aflac voluntary benefits is restricted to the 30-day enrollment period after you're initially eligible for TriNet benefits and TriNet's annual Open Enrollment."
            },
            "benefitPlanPeriodInfo": {
                "content": "Benefits Overview information is good from {benefitPlanStartDate} through {benefitPlanEndDate}."
            },
            "error_NOT_FOUND": {
                "content": "Your Employee Benefits Information not found in the system. Please contact your benefits administrator for more information."
            },
            "error_NO_FUND_OPT": {
                "content": "The funding option setup for your employee benefits is not available. Please contact your benefits administrator for more information."
            },
            "error_SERVICE": {
                "content": "System is unable to process your request at this time. Please try again later."
            }
        }
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('benefitsOverviewViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=overview').respond(200, benefitsOverViewResponse);
        $httpBackend.whenGET('assets/data/benefits/benefitsOverViewTemplate.json').respond(200, templateResponse);

        $httpBackend.flush();

    });


    describe('getContent function testing', function () {
        it('getContent is defined', function () {
            expect($scope.getContent).toBeDefined();
        });

        it('getContent function call', function () {
            var tagId = "benefitOverviewTitle";
            $scope.template = templateResponse.data;
            $scope.getContent(tagId);
        });
    });

    describe('viewPlanType function testing',function(){
        it('viewPlanType is defined',function(){
            expect($scope.viewPlanType).toBeDefined();
        });

        it('viewPlanType function call',function(){
            var string = "benefitsOverview";
            $scope.viewPlanType(string);
        });
    });


});
