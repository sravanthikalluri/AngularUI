'use strict';
/*trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/companyDashboard', {
            templateUrl: 'app/components/dashboard/companyDashboardView.html',
            controller: 'dashboardCtrl'
        })
        .when('/manageDeptAndLoc', {
            templateUrl: 'app/components/company/manageDeptAndLoc/manageDeptAndLocView.html',
            controller: 'manageDeptAndLocCtrl'
        })
        .when('/organizationalChart', {
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .when('/organizationalChart/:selectedTab?', {
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .when('/organizationalChart/:selectedTab/:empId/:status', {
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .when('/organizationalChart/:selectedTab/:empId', {
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .when('/holidaySchedule', {
            templateUrl: 'app/components/company/policies/holidaySchedule/holidayScheduleView.html',
            controller: 'holidayScheduleCtrl'
        })
        .when('/specialstateaddenda', {
            templateUrl: 'app/components/company/manageCompany/specialStateAddenda/specialStateAddenda.html',
            controller: 'specialStateAddendaViewCtrl'
        })
        /!*.when('/companyPolicies', {
            templateUrl: 'app/components/company/policies/companyPoliciesView.html',
            controller: 'companyPoliciesViewCtrl'
        })
        .when('/hoursInfo', {
            templateUrl: 'app/components/company/hoursInfo/hoursInfoView.html',
            controller: 'hoursInformationCtrl'
        })
        .when('/holidaySchedule', {
            templateUrl: 'app/components/company/policies/holidaySchedule/holidayScheduleView.html',
            controller: 'holidayScheduleCtrl'
        })

        .when('/benefitsOverviewView', {
            templateUrl: 'app/components/benefits/policies/benefitsOverview/benefitsOverviewView.html',
            controller: 'benefitsOverviewViewCtrl'
        })
        .when('/companyAdditionalPoliciesView', {
            templateUrl: 'app/components/company/policies/additionalPolicies/companyAdditionalPoliciesView.html',
            controller: 'companyAdditionalPoliciesViewCtrl'
        })
        .when('/support/:selectedTab?', {
            templateUrl: 'app/components/company/help/help.html',
            controller: 'helpSupportCtrl'
        })
        .when('/companyForms', {
            templateUrl: 'app/components/company/forms/companyFormsView.html',
            controller: 'companyFormsCtrl'
        })
        .when('/legalNotices', {
            templateUrl: 'app/components/company/legalNotices/legalNotices.html',
            controller: 'legalNoticesViewCtrl'
        })
        .when('/workinbox', {
            templateUrl: 'app/components/company/workInbox/workInboxView.html',
            controller: 'workInboxCtrl'
        })
        .when('/directory', {
            templateUrl: 'app/components/company/directory/directoryView.html',
            controller: 'directoryViewCtrl'
        })*!/;
});*/

trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/companyDashboard',
            templateUrl: 'app/components/dashboard/companyDashboardView.html',
            controller: 'dashboardCtrl'
        })
        .state('manageDeptAndLoc', {
            url: '/manageDeptAndLoc',
            templateUrl: 'app/components/company/manageDeptAndLoc/manageDeptAndLocView.html',
            controller: 'manageDeptAndLocCtrl'
        })
        .state('organizationalChart', {
            url: '/organizationalChart',
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .state('organizationalChartSelectedTab', {
            url: '/organizationalChart/:selectedTab?',
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .state('organizationalChartSelectedTabEmpIDStatus', {
            url: '/organizationalChart/:selectedTab/:empId/:status',
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .state('organizationalChartSelectedTabEmpID', {
            url: '/organizationalChart/:selectedTab/:empId',
            templateUrl: 'app/components/company/orgChart/orgChartView.html',
            controller: 'orgChartViewCtrl'
        })
        .state('holidaySchedule', {
            url: '/holidaySchedule',
            templateUrl: 'app/components/company/policies/holidaySchedule/holidayScheduleView.html',
            controller: 'holidayScheduleCtrl'
        })
        .state('specialstateaddenda', {
            url: '/specialstateaddenda',
            templateUrl: 'app/components/company/manageCompany/specialStateAddenda/specialStateAddenda.html',
            controller: 'specialStateAddendaViewCtrl'
        })
        .state('featuresAndSettings', {
            url: '/featuresAndSettings',
            templateUrl: 'app/components/company/featuresAndSettings/featuresAndSettings.html',
            controller: 'featuresAndSettingsCtrl'
        })
});
