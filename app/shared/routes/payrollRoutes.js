/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/adminPayrollSchedule', {
            templateUrl: 'app/components/payroll/payrollSchedule/payrollScheduleView.html',
            controller: 'adminPayrollScheduleCtrl'
        })
        .when('/savingsRetirement', {
            templateUrl: 'app/components/payroll/retirementPlan/enrollmentPlan.html',
            controller: 'adminEnrollmentPlanCtrl'
        })
        .when('/payrollEntry', {
            templateUrl: 'app/components/payroll/payrollEntry/payrollEntryView.html',
            controller: 'payrollEntryViewCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('adminPayrollSchedule', {
            url: '/adminPayrollSchedule',
            templateUrl: 'app/components/payroll/payrollSchedule/payrollScheduleView.html',
            controller: 'adminPayrollScheduleCtrl'
        })
        .state('savingsRetirement', {
            url: '/savingsRetirement',
            templateUrl: 'app/components/payroll/retirementPlan/enrollmentPlan.html',
            controller: 'adminEnrollmentPlanCtrl'
        })
        .state('payrollEntry', {
            url: '/payrollEntry',
            templateUrl: 'app/components/payroll/payrollEntry/payrollEntryView.html',
            controller: 'payrollEntryViewCtrl'
        })
});
