/**
 * Description: This is controller is used to fetch the employee benefits options information
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.controller('benefitsOverviewViewCtrl', ['$scope', '$filter', 'gso', 'sharedProperties',
    function ($scope, $filter, gso, sharedProperties) {
        $scope.fromDate = null;
        $scope.toDate = null;
        $scope.paymentCapTableTitle = "";
        $scope.companyName = gso.getAppConfig().companyName;
        if (window.location.hash === "#/benefitsOverviewView") {
            gso.getUtilService().hideDIVS(true);
        }
        function benefitData() {
            $scope.appCompanyId = gso.getAppConfig().companyId;
            $scope.appCountryCode = gso.getAppConfig().countryCode;
            $scope.appStateCode = gso.getAppConfig().stateCode;
            $scope.documentTitle = $scope.getContent("benefitOverviewTitle");
            $scope.sponserInfo = $scope.getContent("benefitSponseredCompany") + $scope.getContent("benefitSponseredCompanyTriNet");
            $scope.benefitsCompanyQuote = $scope.getContent("benefitsCompanyQuote");
            $scope.benefitsPlanTitle = $scope.getContent("benefitsPlanTitle");
            $scope.trinetBenefitPlanPhrase = $scope.getContent("trinetBenefitPlanPhrase");
            $scope.benefitsElectWaivePhrase = $scope.getContent("benefitsElectWaivePhrase");
            $scope.medical = $scope.getContent("medical");
            $scope.trinetMedicalCarrierInfo = $scope.getContent("trinetMedicalCarrierInfo");
            $scope.dental = $scope.getContent("dental");
            $scope.trinetDentalCarrierInfo = $scope.getContent("trinetDentalCarrierInfo");
            $scope.vision = $scope.getContent("vision");
            $scope.trinetVisionCarrierInfo = $scope.getContent("trinetVisionCarrierInfo");
            $scope.benefitsFundingInfo = $scope.getContent("employeeHeathPercentageContribution") +
                $scope.getContent("employeeFamilyHeathPercentageContribution") +
                $scope.getContent("companyContributionCaps") +
                $scope.getContent("companyHealthInsuranceSupplementCoverage") +
                $scope.getContent("companyHealthInsuranceSupplementContributions") +
                $scope.getContent("companyHealthInsuranceFixedCoverage") +
                $scope.getContent("companyHealthInsuranceFixedContributions") +
                $scope.getContent("companyHealthInsuranceCapFundingStrategies");
            $scope.employeeContributionInfo = $scope.getContent("employeeHealthInsuranceContribution");
            $scope.hsaContribution = $scope.getContent("companyHSAContribution");
            $scope.hsaContributionNote = $scope.getContent("companyHSAContributionNote");
            $scope.waiverBenefit = $scope.getContent("companyHealthInsuranceWaiverBenefit");
            $scope.basicLifeInsuranceHeading = $scope.getContent("basicLifeInsuranceHeading");
            $scope.basicLifeInsuranceCoverage = $scope.getContent("basicLifeInsuranceCoverage");
            $scope.groupShortTermDisabilityInsuranceHeading = $scope.getContent("groupShortTermDisabilityInsuranceHeading");
            $scope.groupShortTermDisabilityInsuranceCoverage = $scope.getContent("groupShortTermDisabilityInsuranceCoverage");
            $scope.groupLongTermDisabilityInsuranceHeading = $scope.getContent("groupLongTermDisabilityInsuranceHeading");
            $scope.groupLongTermDisabilityInsuranceCoverage = $scope.getContent("groupLongTermDisabilityInsuranceCoverage");
            $scope.trinetOptionalPlansTitle = $scope.getContent("trinetOptionalPlansTitle");
            $scope.dentalHeading = $scope.getContent("dentalHeading");
            $scope.optionDentalPlan = $scope.getContent("optionDentalPlan");
            $scope.visionSubTitle = $scope.getContent("visionSubTitle");
            $scope.optionalVisionPlan = $scope.getContent("optionalVisionPlan");
            $scope.fsaPlanSubTitle = $scope.getContent("fsaPlanSubTitle");
            $scope.fsaPlan = $scope.getContent("fsaPlan");
            $scope.supplementalLifeInsuranceHeading = $scope.getContent("supplementalLifeInsuranceHeading");
            $scope.supplementalLifeInsurance = $scope.getContent("supplementalLifeInsurance");
            $scope.supplementalADAndDInsuranceHeading = $scope.getContent("supplementalADAndDInsuranceHeading");
            $scope.supplementalADAndDInsurance = $scope.getContent("supplementalADAndDInsurance");
            $scope.shortTermLongTermDisabilityHeading = $scope.getContent("shortTermLongTermDisabilityHeading");
            $scope.shortTermLongTermDisability = $scope.getContent("shortTermLongTermDisability");
            $scope.trinetBenefitProgramsTitle = $scope.getContent("trinetBenefitProgramsTitle");
            $scope.commuterBenefitSubTitle = $scope.getContent("commuterBenefitSubTitle");
            $scope.commuterBenefit = $scope.getContent("commuterBenefit");
            $scope.trinetPerksSubTitle = $scope.getContent("trinetPerksSubTitle");
            $scope.trinetPerks = $scope.getContent("trinetPerks");
            $scope.trinetEmployeeAssistanceProgramSubTitle = $scope.getContent("trinetEmployeeAssistanceProgramSubTitle");
            $scope.trinetEmployeeAssistanceProgram = $scope.getContent("trinetEmployeeAssistanceProgram");
            $scope.companyRetirementPlanTitle = $scope.getContent("companyRetirementPlanTitle");
            $scope.companyRetirementPlan = $scope.getContent("companyRetirementPlan");
            $scope.voluntaryInsuranceTitle = $scope.getContent("voluntaryInsuranceTitle");
            $scope.metLifeVoluntaryInsuranceSubTitle = $scope.getContent("metLifeVoluntaryInsuranceSubTitle");
            $scope.metLifeVoluntaryInsurance = $scope.getContent("metLifeVoluntaryInsurance");
            $scope.aflacSupplementalInsuranceSubTitle = $scope.getContent("aflacSupplementalInsuranceSubTitle");
            $scope.aflacSupplementalInsurance = $scope.getContent("aflacSupplementalInsurance");
            $scope.benefitPlanPeriodInfo = $scope.getContent("benefitPlanPeriodInfo");
        }

        function tableDataDisplay() {
            if ($scope.benefitsOverview.benefitFundingStrategyMethod === 'PCT') {
                $scope.paymentCapTableTitle = "Contribution  Amounts Cap";
            } else {
                $scope.paymentCapTableTitle = "Contribution  Amounts";
            }
            if (($scope.benefitsOverview.productLine === "NOMD" || $scope.benefitsOverview.productLine === "NOHW") && !$scope.benefitsOverview.companyGroupMedicalInsurance) {
                $scope.noMedCaps = true;
            }
        }

        /* Benefits overview service call*/
        $scope.overview = function () {
            /*gso.getCrudService().execute(constants.get, "assets/data/benefits/overview.json", null,*/
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'policies?type=overview', null,
                function (response) {
                    $scope.benefitsOverview = response.benefitsOverview;
                    gso.getCrudService().execute(constants.get, "assets/data/benefits/benefitsOverViewTemplate.json", null,
                        function (response) {
                            $scope.template = response;
                            benefitData();
                            tableDataDisplay();
                        },
                        function (data) {
                            $scope.errorAlert = data;
                        });
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

         //  Return a String that is the "content" for the tagId.  Else, return a zero-length String.
        //  Meant to be used "publicly" to put content onto a page.
        $scope.getContent = function (tagId) {
            var contentObject = $scope.template[tagId];
            //  If the timestamp from the server is after the "publishDate" and is before the "expireDate", then continue processing.
            //  If not, then do not show this content.
            if (contentObject.hasOwnProperty('publishDate') && (new Date(getVariable("timestamp"))) < (new Date(contentObject.publishDate))) {
                return "";
            }
            if (contentObject.hasOwnProperty('expireDate') && (new Date(getVariable("timestamp"))) > (new Date(contentObject.expireDate))) {
                return "";
            }
            if (contentObject.hasOwnProperty('rule') && !evaluateRule(contentObject.rule)) {
                return "";
            }
            //  If there are variable names in the "content", then substitute the appropriate values.
            return contentObject.content.replace(/{(.+?)}/g, function (match, name) {
                return getVariable(name);
            });
        };

        //  Get the value (from the data object) which should be used in place of the "variableName".
        //  If there is no matching value for "variableName", then return a zero-length string.
        function getVariable(variableName) {
            if (varSubstitute.hasOwnProperty(variableName) && varSubstitute[variableName].indexOf("function") === 0) {
                /*jshint -W054 */
                var value = new Function('return ' + varSubstitute[variableName])($scope);
                return value($scope, gso.getUtilService());
            }
            return $scope.benefitsOverview[variableName];
        }

        function evaluateRule(rule) {
            if (rule instanceof Object) {
                if (rule.hasOwnProperty('And') && rule.And instanceof Array) {
                    return evaluateAnd(rule.And);
                }
                else if (rule.hasOwnProperty('Or') && rule.Or instanceof Array) {
                    return evaluateOr(rule.Or);
                }
                else if (rule.hasOwnProperty('Not')) {
                    return !evaluateAnd(rule.Not);
                }
                return false;
            }
            //  If this "rule" is NOT an object, then it is NOT a compound statement, so now try to evaluate it.
            //  Any rule with a "." is actually a "rule" plus the value to which that "rule" should be compared.
            var parts = rule.split('.');
            if (rules.hasOwnProperty(parts[0]) && rules[parts[0]].indexOf("function") === 0) {
                /*jshint -W054 */
                var value = new Function('return ' + rules[parts.shift()])($scope);
                return value($scope, parts[0]);
            }
            return false;
        }

        function evaluateAnd(rules) {/*jshint -W089 */
            for (var rule in rules) {
                if (!evaluateRule(rules[rule])) {
                    return false;
                }
            }
            return true;
        }

        function evaluateOr(rules) {
            for (var rule in rules) {
                if (evaluateRule(rules[rule])) {
                    return true;
                }
            }
            return false;
        }

        $scope.viewPlanType = function (string) {
            sharedProperties.setStringValue(string);
        };
        $scope.overview();
    }]);

