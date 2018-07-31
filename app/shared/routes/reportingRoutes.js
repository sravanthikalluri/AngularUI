/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/clientReports', {
            templateUrl: 'app/components/reporting/clientReports/clientReportsView.html',
            controller: 'clientReportsViewCtrl'
        })
        .when('/reportsAndAlertsSecurity', {
            templateUrl: 'app/components/reporting/reportsAndAlertsSecurity/reportsAndAlertsSecurity.html',
            controller: 'reportsAndAlertsSecurityCtrl'
        })
        .when('/termination-reports', {
            templateUrl: 'app/components/reporting/termination-reports/termination-reports.html',
            controller: 'terminationReportsCtrl'
        })
        .when('/eforms-reports', {
            templateUrl: 'app/components/reporting/eforms-reports/eforms-reports.html',
            controller: 'eformsReportsCtrl'
        })
        .when('/sfhc-reports', {
            templateUrl: 'app/components/reporting/sfhc-reports/sfhc-reports.html',
            controller: 'sfhaReportsCtrl'
        });
});*/

'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('clientReports', {
            url: '/clientReports',
            templateUrl: 'app/components/reporting/clientReports/clientReportsView.html',
            controller: 'clientReportsViewCtrl'
        })
        .state('reportsAndAlertsSecurity', {
            url: '/reportsAndAlertsSecurity',
            templateUrl: 'app/components/reporting/reportsAndAlertsSecurity/reportsAndAlertsSecurity.html',
            controller: 'reportsAndAlertsSecurityCtrl'
        })
        .state('terminationReports', {
            url: '/termination-reports',
            templateUrl: 'app/components/reporting/termination-reports/termination-reports.html',
            controller: 'terminationReportsCtrl'
        })
        .state('eformsReports', {
            url: '/eforms-reports',
            templateUrl: 'app/components/reporting/eforms-reports/eforms-reports.html',
            controller: 'eformsReportsCtrl'
        })
        .state('sfhcReports', {
            url: '/sfhc-reports',
            templateUrl: 'app/components/reporting/sfhc-reports/sfhc-reports.html',
            controller: 'sfhaReportsCtrl'
        })
});

