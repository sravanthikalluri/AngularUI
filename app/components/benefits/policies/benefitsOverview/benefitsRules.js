/**
 * Description: All the rules which are defined here to display benefits options information
 * Author:Raghavendra Kumar Bonthala
 */
var rules = {
    "COBRAEligible": "function ($scope) { if ($scope.template.cobra_eligible) { return true; }}",
    "CompanyContribution_to_HSA": "function ($scope,company_hsa_contribution) {if (company_hsa_contribution === $scope.template.company_hsa_contribution) {return true;} else {return false;}};",
    "CompanyBenefitFundingStrategyMethod": "function($scope,fundingStrategyMethod) {if (fundingStrategyMethod === $scope.benefitsOverview.benefitFundingStrategyMethod) {return true;} else {return false;}};",
    "CompanyBenefitFundingStrategyMethodFixed": "function($scope) {if ($scope.benefitsOverview.benefitFundingStrategyMethod === 'EEC' || $scope.benefitsOverview.benefitFundingStrategyMethod === 'ERC') {return true;} else {return false;}};",
    "Med": "function($scope) {return !($scope.benefitsOverview.productLine === 'NOMD' || $scope.benefitsOverview.productLine === 'NOHW');}",
    "CompanyEmployeeMedicalInsurance": "function($scope) {return $scope.benefitsOverview.employeeMedicalPercent > 0;}",
    "CompanyEmployeeFamilyInsurance": "function ($scope) {return $scope.benefitsOverview.employeeFamilyMedicalPercent > 0 || $scope.benefitsOverview.employeeFamilyDentalPercent > 0 || $scope.benefitsOverview.employeeFamilyVisionPercent > 0;}",
    "MedicalWaiverCreditExistence": "function ($scope) {if ('Y' === $scope.template.medical_waiver_credit) { return true; } else { return false;}}",
    "NoGroup": "function ($scope) {  return $scope.benefitsOverview.noGroup;}",
    "Dent": "function ($scope) {return $scope.benefitsOverview.companyGroupDentalInsurance;}",
    "Vis": "function ($scope) {return $scope.benefitsOverview.companyGroupVisionInsurance;}",
    "Group": "function ($scope) {if ($scope.benefitsOverview.productLine === 'NOMD' && $scope.benefitsOverview.benefitFundingStrategyMethod === 'BS') { return false;} return !$scope.benefitsOverview.noGroup;};",
    "Company": "function ($scope,company) {if (company === $scope.appCompanyId) return true; return false;}",
    "CompanyEmployeeDentalInsurance": "function ($scope) {  return $scope.benefitsOverview.employeeDentalPercent > 0;}",
    "CompanyFamilyDentalInsurance": "function ($scope) {return $scope.benefitsOverview.employeeFamilyDentalPercent > 0;}",
    "CompanyEmployeeVisionInsurance": "function ($scope) {return $scope.benefitsOverview.employeeVisionPercent > 0;}",
    "CompanyEmployeeHSA": "function ($scope,hsaContribution) { if (hsaContribution === undefined) { return $scope.benefitsOverview.hsaContribution !== null && $scope.benefitsOverview.hsaContribution !== '0';} return hsaContribution === $scope.benefitsOverview.hsaContribution;}",
    "CompanyEmployeeFamilyHSA": "function ($scope,hsaContribution) { if (hsaContribution === undefined) {  return $scope.benefitsOverview.hsaContribution !== null && $scope.benefitsOverview.hsaContribution !== '0';} return hsaContribution == $scope.benefitsOverview.hsaContribution;}",
    "CompanyFamilyVisionInsurance": "function ($scope) { return $scope.benefitsOverview.employeeFamilyVisionPercent > 0;}",
    "CompanyNoGroupVisionInsurance": "function ($scope) { return !$scope.benefitsOverview.companyGroupVisionInsurance;}",
    "CompanyNoGroupDentalInsurance": "function ($scope) { return !$scope.benefitsOverview.companyGroupDentalInsurance;}",
    "basicLifeInsurancePlan": "function ($scope,basicLifeInsurancePlan) { return basicLifeInsurancePlan === $scope.benefitsOverview.basicLifeInsurancePlan;}",
    "GroupLongTermDisabilityInsurancePlan": "function ($scope,groupLongTermDisabilityInsurancePlan) { return groupLongTermDisabilityInsurancePlan === $scope.benefitsOverview.groupLongTermDisabilityInsurancePlan;}",
    "GroupShortTermDisabilityInsurancePlan": "function ($scope,groupShortTermDisabilityInsurancePlan) { return groupShortTermDisabilityInsurancePlan === $scope.benefitsOverview.groupShortTermDisabilityInsurancePlan;}",
    "CompanyBasicLifeInsurance": "function ($scope) {if ($scope.benefitsOverview.basicLifeInsurance !== null && $scope.benefitsOverview.basicLifeInsurance.trim() !== '') return true; return false;}",
    "CompanyHealthInsuranceFixedPayPolicy": "function ($scope,fixedPayPolicy) {if (fixedPayPolicy === $scope.benefitsOverview.healthInsuranceFixedPayPolicy) {return true;} else {return false;}}",
    "CompanyHealthInsuranceSupplementReturnPolicy": "function ($scope,supplementReturnPolicy) { if (supplementReturnPolicy === $scope.benefitsOverview.healthInsuranceSupplementReturnPolicy) {return true;} else {return false;}}",
    "CompanyHealthInsuranceWaiveBenefitAllowance": "function ($scope) { return $scope.benefitsOverview.healthInsuraceWaiverBenefitAllowance > 0;}",
    "CompanyHQCountry": "function ($scope,companyHQCountry) { if (companyHQCountry === $scope.template.hq_country) { return true; } else { return false;  }}",
    "CompanyHQState": "function ($scope,companyHQState) { if (companyHQState === $scope.template.hq_state) { return true;} else { return false; }}",
    "DisabilityTaxable": "function ($scope) { if ($scope.template.disability_taxiable) { return true; } else { return false; }}",
    "DPExistence": "function ($scope) { if ($scope.template.dp_existence) { return true; } else { return false; }}",
    "Event": "function ($scope,event) { if (event === $scope.template.event_class) { return true; } else { return false; }}",
    "PlanType": "function (planType) { return true; }",
    "ProductType": "function ($scope,productType) { if (productType === $scope.template.product_line) {  return true; } else { return false; }}",
    "ResidenceCountry": "function ($scope,residenceCountry) { if (residenceCountry === $scope.appCountryCode) { return true; } else { return false; }}",
    "ResidenceState": "function (residenceState) { if (residenceState === appStateCode) { return true; } else { return false; }}",
    "SpouseExistence": "function ($scope) { if ($scope.template.spouse_existence) { return true;  } else {  return false;  } }",
    "SuppLifeEnrolled": "function ($scope) { if ($scope.template.supp_life_enrolled) { return true; } else { return false; }}",
    "SuppLifeFlatDollar": "function ($scope) { if ($scope.template.supp_life_flat_dollar) { return true; } else { return false;  }}",
    "CompanyGroupShortTermDisabilityInsurance": "function ($scope) { return $scope.benefitsOverview.groupShortTermDisabilityInsurancePlan !== null && $scope.benefitsOverview.groupShortTermDisabilityInsurancePlan.trim() !== '' && !$scope.benefitsOverview.groupShortTermDisabilityInsuranceWaive; };",
    "CompanyGroupLongTermDisabilityInsurance": "function ($scope) {  return $scope.benefitsOverview.groupLongTermDisabilityInsurancePlan !== null && $scope.benefitsOverview.groupLongTermDisabilityInsurancePlan.trim() !== '' && !$scope.benefitsOverview.groupLongTermDisabilityInsuranceWaive;};",
    "CompanyRetirementPlan": "function ($scope) { return $scope.benefitsOverview.retirementPlan === 'Y'; };",
    "FSAPlanYears":"function ($scope) { var benEndDate = new Date($scope.benefitsOverview.benefitPlanEndDate).getFullYear();  var benStartDate = new Date($scope.benefitsOverview.benefitPlanStartDate).getFullYear(); if (benEndDate !== benStartDate) { return true;} return false;};",
    "FSAPlanYear":"function ($scope) { var benEndDate = new Date($scope.benefitsOverview.benefitPlanEndDate).getFullYear();  var benStartDate = new Date($scope.benefitsOverview.benefitPlanStartDate).getFullYear();  if (benEndDate === benStartDate) { return true;} return false;};",
    "CompanyHealthInsurancePercentCapped": "function($scope){" +
    " if($scope.benefitsOverview.benefitFundingPayPolicies !== null && $scope.benefitsOverview.benefitFundingPayPolicies.size > 0) {" +
    " if($scope.benefitsOverview.productLine === 'NOMD' || $scope.benefitsOverview.productLine === 'NOHW') {" +
    " var groupdc = false;" +
    " var groupvc = false;" +
    " angular.forEach($scope.benefitsOverview.benefitFundingPayPolicies," +
    " function (property) {" +
    " if (property.indexOf('groupDental') > 0)" +
    " groupdc = true;" +
    " if (property.indexOf('groupVision') > 0)" +
    " groupvc = true;" +
    " });" +
    " if(groupdc || groupvc) {" +
    " return true;" +
    " }" +
    " } else" +
    " return true;" +
    " }" +
    " return false;" +
    " };",
    "CompanyHealthInsuranceCapFundingStrategies": "function ($scope) {" +
    " if ($scope.benefitsOverview.benefitFundingPayPolicies !== null && $scope.benefitsOverview.benefitFundingPayPolicies.size > 0) {" +
    " if ($scope.benefitsOverview.productLine === 'NOMD' || $scope.benefitsOverview.productLine === 'NOHW') {" +
    " var groupdc = false;" +
    " var groupvc = false;" +
    " angular.forEach($scope.benefitsOverview.benefitFundingPayPolicies," +
    "  function (property) {" +
    "   if (property.indexOf('groupDental') > 0)" +
    "        groupdc = true;" +
    "   if (property.indexOf('groupVision') > 0)" +
    "      groupvc = true;" +
    " });" +
    " if (groupdc || groupvc)" +
    "   return true;" +
    " } else " +
    "   return true;" +
    " } " +
    " return false;" +
    "};"


};