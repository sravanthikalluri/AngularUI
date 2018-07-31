/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/compliance', {
            templateUrl: 'app/components/compliance/compliance.html',
            controller: 'complianceCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('compliance', {
            url: '/compliance',
            templateUrl: 'app/components/compliance/compliance.html',
            controller: 'complianceCtrl'
        })
});
