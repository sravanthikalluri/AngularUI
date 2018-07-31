/**
 * Description: All the placeholders which are defined here is use to display benefits options information
 * Author:Raghavendra Kumar Bonthala
 */
var varSubstitute = {
    "companyName": "function($scope) { return $scope.companyName;}",
    "employeeMedicalPercent": "function($scope) {return $scope.benefitsOverview.employeeMedicalPercent;}",
    "employeeDentalPercent": "function($scope) { return $scope.benefitsOverview.employeeDentalPercent;}",
    "employeeVisionPercent": "function($scope) { return $scope.benefitsOverview.employeeVisionPercent;}",
    "employeeFamilyMedicalPercent": "function($scope) { return $scope.benefitsOverview.employeeFamilyMedicalPercent;}",
    "employeeFamilyDentalPercent": "function($scope) { return $scope.benefitsOverview.employeeFamilyDentalPercent;}",
    "employeeFamilyVisionPercent": "function($scope) { return $scope.benefitsOverview.employeeFamilyVisionPercent;}",
    "companyHealthInsuranceSupplementReturnPolicyVerbiage": "function($scope) { return $scope.getContent('companyHealthInsuranceSupplementReturnCompany') + $scope.getContent('companyHealthInsuranceSupplementReturnEmployee');}",
    "companyHealthInsuranceFixedPayPolicyVerbiage": "function($scope) { return $scope.getContent('companyHealthInsuranceFixedCompany') + $scope.getContent('companyHealthInsuranceFixedEmployee');}",
    "companyEmployeeHSAContributionVerbiage": "function($scope) { return $scope.getContent('companyEmployeeHSAContribution1') + $scope.getContent('companyEmployeeHSAContribution2') + $scope.getContent('companyEmployeeHSAContribution3');}",
    "companyEmployeeFamilyHSAContributionVerbiage": "function($scope) { return $scope.getContent('companyEmployeeFamilyHSAContribution1') + $scope.getContent('companyEmployeeFamilyHSAContribution2') + $scope.getContent('companyEmployeeFamilyHSAContribution3');}",
    "companyHealthInsuraceWaiverBenefitAllowance": "function($scope) { var allowance = parseFloat($scope.benefitsOverview.healthInsuraceWaiverBenefitAllowance); return allowance.toFixed(2);}",
    "companyHealthInsuraceWaiverBenefitAllowanceVerbiage": "function($scope) { return $scope.getContent('companyHealthInsuraceWaiverBenefitAllowance');}",
    "visionPercentVerbiage": "function($scope) {    return $scope.getContent('visionPercentVerbiage');}",
    "medicalSupVerbiage": "function($scope) {    return $scope.getContent('medicalSupVerbiage');}",
    "dentalSupVerbiage": "function($scope) {    return $scope.getContent('dentalSupVerbiage');}",
    "visionSupVerbiage": "function($scope) {    return $scope.getContent('visionSupVerbiage');}",
    "basicLifeInsurancePolicy": "function($scope) {  var basicLife =  $scope.getContent('basicLifePlanLIFE') + $scope.getContent('basicLifePlanG5') + $scope.getContent('basicLifePlan1XLIFE') + $scope.getContent('basicLifePlan2XLIFE') +" +
    "$scope.getContent('basicLifePlan3XLIFE') + $scope.getContent('basicLifePlan0005RS') + $scope.getContent('basicLifePlanNB2') + $scope.getContent('basicLifePlanNB3') + $scope.getContent('basicLifePlanNB4') +" +
    "$scope.getContent('basicLifePlanNB6') + $scope.getContent('basicLifePlanNB1') + $scope.getContent('basicLifePlanNB5') + $scope.getContent('basicLifePlan00097J') + $scope.getContent('basicLifePlan00098B') + $scope.getContent('basicLifePlan000D70');" +
    " if (basicLife === undefined || basicLife === null || basicLife.trim() === '')" +
    " basicLife = $scope.benefitsOverview.basicLifeInsurance;" +
    " return basicLife;}",
    "fsaPlanEndYear": "function($scope) { var benEndDate = new Date($scope.benefitsOverview.benefitPlanEndDate).getFullYear(); return benEndDate;}",
    "fsaPlanYears": "function($scope) { var fsaPlanYears = $scope.getContent('fsaPlanYears'); if (fsaPlanYears == undefined || fsaPlanYears == '') fsaPlanYears = $scope.getContent('fsaPlanYear'); return fsaPlanYears;}",
    "medicalVerbiage": "function($scope) {    return $scope.getContent('medicalVerbiage');}",
    "medicalPercentVerbiage": "function($scope) { return $scope.getContent('medicalPercentVerbiage');}",
    "dentalPercentVerbiage": "function($scope) { return $scope.getContent('dentalPercentVerbiage');}",
    "familyMedicalPercentVerbiage": "function($scope) { return $scope.getContent('familyMedicalPercentVerbiage');}",
    "familyDentalPercentVerbiage": "function($scope) { return $scope.getContent('familyDentalPercentVerbiage');}",
    "familyVisionPercentVerbiage": "function($scope) {  return $scope.getContent('familyVisionPercentVerbiage');}",
    "basicLifeInsurancePolicyValue": "function($scope) {   return $scope.benefitsOverview.basicLifeInsurance;}",
    "groupShortTermDisabilityInsuranceSalaryReplacementPercent": "function($scope) { return $scope.benefitsOverview.groupShortTermDisabilityInsuranceSalaryReplacementPercent;}",
    "groupShortTermDisabilityInsuraceMaxBenefitDays": "function($scope) { return ($scope.getContent('groupShortTermDisabilityMaxBenefitDays180') + $scope.getContent('groupShortTermDisabilityMaxBenefitDays90') + $scope.getContent('groupShortTermDisabilityMaxBenefitDaysDefault'));}",
    "groupLongTermDisabilityInsuranceSalaryReplacementPercent": "function($scope) {    return $scope.benefitsOverview.groupLongTermDisabilityInsuranceSalaryReplacementPercent;}",
    "retirementPlanContributionPercent": "function($scope) {    return $scope.benefitsOverview.retirementPlanContributionPercent;}",
    "retirementPlanContributionYearlyMax": "function($scope) {  return $scope.benefitsOverview.retirementPlanContributionYearlyMax;}",
    "benefitPlanStartDate": "function($scope,utilService) { return utilService.filterDate(utilService.getStandardDate($scope.benefitsOverview.benefitPlanStartDate), 'MMMM dd,yyyy');}",
    "benefitPlanEndDate": "function($scope, utilService) {    return utilService.filterDate(utilService.getStandardDate($scope.benefitsOverview.benefitPlanEndDate), 'MMMM dd,yyyy');}",
    "fsaPlanStartYear": "function($scope) {    var benStartDate = new Date($scope.benefitsOverview.benefitPlanStartDate).getFullYear();     return benStartDate;}",
    "groupLongTermDisabilityInsuraceWaitingPeriod": "function($scope) { return $scope.getContent('groupLongTermDisabilityInsuraceWaitingPeriod180') + $scope.getContent('groupLongTermDisabilityInsuraceWaitingPeriod90') + $scope.getContent('groupLongTermDisabilityInsuraceWaitingPeriodDefault');}",
    "verbiageSeparator2": "function($scope) {    var content = $scope.getContent('verbiageSeparator2');   var isDent = $scope.benefitsOverview.companyGroupDentalInsurance;  var isVis = $scope.benefitsOverview.companyGroupVisionInsurance;" +
    "var isMed = $scope.benefitsOverview.companyGroupMedicalInsurance; if (isVis) return content; return '';}",
    "verbiageSeparator3": "function($scope) { var content3 = $scope.getContent('verbiageSeparator3');  var content2 = $scope.getContent('verbiageSeparator2');  var isDent = $scope.benefitsOverview.companyGroupDentalInsurance;" +
    "var isVis = $scope.benefitsOverview.companyGroupVisionInsurance;  var isMed = $scope.benefitsOverview.companyGroupMedicalInsurance;  if (!isMed) return ''; if (isMed && isDent && isVis) return content3; if (isMed && isDent) return content2; return ''; }",
    "groupShortTermDisabilityInsurance": "function($scope) {  var groupShortTermDisabilityInsurance =" +
    "$scope.getContent('groupShortTermDisabilityInsurancePlanSTD1')+ $scope.getContent('groupShortTermDisabilityInsurancePlanSTD3') + $scope.getContent('groupShortTermDisabilityInsurancePlanSTD2') + $scope.getContent('groupShortTermDisabilityInsurancePlanNB7') +" +
    "$scope.getContent('groupShortTermDisabilityInsurancePlanNB8') +  $scope.getContent('groupShortTermDisabilityInsurancePlan00097Y') + $scope.getContent('groupShortTermDisabilityInsurancePlan000D8Y') + $scope.getContent('groupShortTermDisabilityInsurancePlan000D97') +" +
    "$scope.getContent('groupShortTermDisabilityInsurancePlan000E2E') + $scope.getContent('groupShortTermDisabilityInsurancePlan000E2A') + $scope.getContent('groupShortTermDisabilityInsurancePlan000E2C') + $scope.getContent('groupShortTermDisabilityInsurancePlan000E2G') +" +
    "$scope.getContent('groupShortTermDisabilityInsurancePlan000E2K') + $scope.getContent('groupShortTermDisabilityInsurancePlan000E2B') + $scope.getContent('groupShortTermDisabilityInsurancePlan000E2I') + $scope.getContent('groupShortTermDisabilityInsurancePlan000JNJ') +" +
    "$scope.getContent('groupShortTermDisabilityInsurancePlan000JNF') + $scope.getContent('groupShortTermDisabilityInsurancePlan000JNL') + $scope.getContent('groupShortTermDisabilityInsurancePlan000JNH');" +
    "if (groupShortTermDisabilityInsurance == undefined || groupShortTermDisabilityInsurance == null || groupShortTermDisabilityInsurance.trim() == '') {" +
    "groupShortTermDisabilityInsurance = $scope.benefitsOverview.groupShortTermDisabilityInsurance;" +
    "if (groupShortTermDisabilityInsurance.indexOf('%') > 0) {" +
    " groupShortTermDisabilityInsurance =  groupShortTermDisabilityInsurance.substring(0, groupShortTermDisabilityInsurance.indexOf('%') + 1);" +
    "}    }    return groupShortTermDisabilityInsurance;}",
    "groupLongTermDisabilityInsurance": "function($scope) { var groupLongTermDisabilityInsurance =" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlanOLTD') + $scope.getContent('groupLongTermDisabilityInsurancePlanLTD2') + $scope.getContent('groupLongTermDisabilityInsurancePlanLTD1') + $scope.getContent('groupLongTermDisabilityInsurancePlanLTD3') +" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlanNB4') + $scope.getContent('groupLongTermDisabilityInsurancePlanNB7') + $scope.getContent('groupLongTermDisabilityInsurancePlanNB6') + $scope.getContent('groupLongTermDisabilityInsurancePlanNB5') +" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlan00097O') + $scope.getContent('groupLongTermDisabilityInsurancePlan00097X') + $scope.getContent('groupLongTermDisabilityInsurancePlan000D94') + $scope.getContent('groupLongTermDisabilityInsurancePlan000D9D') +" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlan000E2T') + $scope.getContent('groupLongTermDisabilityInsurancePlan000E2U') + $scope.getContent('groupLongTermDisabilityInsurancePlan000E2S') + $scope.getContent('groupLongTermDisabilityInsurancePlan000E2Q') +" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlan000E2R') + $scope.getContent('groupLongTermDisabilityInsurancePlan000E2V') + $scope.getContent('groupLongTermDisabilityInsurancePlan000JND') + $scope.getContent('groupLongTermDisabilityInsurancePlan000JNB') +" +
    "$scope.getContent('groupLongTermDisabilityInsurancePlan000JNE') + $scope.getContent('groupLongTermDisabilityInsurancePlan000JNC');" +
    "if (groupLongTermDisabilityInsurance == undefined || groupLongTermDisabilityInsurance == null || groupLongTermDisabilityInsurance.trim() == '') {" +
    "groupLongTermDisabilityInsurance = $scope.benefitsOverview.groupLongTermDisabilityInsurance;" +
    "if (groupLongTermDisabilityInsurance.indexOf('%') > 0) {" +
    "groupLongTermDisabilityInsurance = groupLongTermDisabilityInsurance.substring(0, groupLongTermDisabilityInsurance.indexOf('%') + 1);" +
    "} } return groupLongTermDisabilityInsurance;}"
};
