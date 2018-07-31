/*trinetApp.config(function ($routeProvider) {
    $routeProvider
        /!*.when('/directDeposit/:selectedTab?', {
            templateUrl: 'app/components/money/directDeposit/directDepositView.html',
            controller: 'directDepositCtrl'
        })
        .when('/earning', {
            templateUrl: 'app/components/money/earningsStmts/earningsStmtsView.html',
            controller: ''
        })
        .when('/moneyforms', {
            templateUrl: 'app/components/money/forms/moneyFormsView.html',
            controller: 'moneyFormsCtrl'
        })
        .when('/payrollSchedule', {
            templateUrl: 'app/components/money/payrollSchedule/payrollScheduleView.html',
            controller: 'payrollScheduleCtrl'
        })
        .when('/taxWithHolding', {
            templateUrl: 'app/components/money/taxWithHolding/taxWithHoldingView.html',
            controller: ''
        })
        .when('/retirementPlan', {
            templateUrl: 'app/components/money/retirementPlan/retirementView.html',
            controller: 'retirementCtrl'
        })
        .when('/compensation', {
            templateUrl: 'app/components/money/earningsStmts/compensation/compensation.html',
            controller: 'compensationCtrl'
        })
        .when('/verifyEmp', {
            templateUrl: 'app/components/money/verifyEmp/verifyEmpView.html',
            controller: 'verifyEmpCtrl'
        })
        .when('/moneyPolicies', {
            templateUrl: 'app/components/money/policies/moneyPolicies.html',
            controller: 'moneyPoliciesCtrl'
        })
        *!/
        .when('/taxForms', {
            templateUrl: 'app/components/money/taxWithHolding/forms/taxWithHoldingForm.html',
            controller: 'taxWithHoldingFormCtrl'
        });
});*/

'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('taxForms', {
            url: '/taxForms',
            templateUrl: 'app/components/money/taxWithHolding/forms/taxWithHoldingForm.html',
            controller: 'taxWithHoldingFormCtrl'
        })
});

