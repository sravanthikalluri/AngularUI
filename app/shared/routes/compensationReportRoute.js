/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/compensationReport', {
            templateUrl: 'app/components/employee/compensationReport/compensationReportView.html',
            controller: 'compensationReportViewCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('compensationReport', {
            url: '/compensationReport',
            templateUrl: 'app/components/employee/compensationReport/compensationReportView.html',
            controller: 'compensationReportViewCtrl'
        })
});
