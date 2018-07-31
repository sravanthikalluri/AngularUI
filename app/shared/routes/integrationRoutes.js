/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/ssoIntegration', {
            templateUrl: 'app/components/integration/ssoIntegration/ssoIntegrationView.html',
            controller: 'ssoIntegrationCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('ssoIntegration', {
            url: '/ssoIntegration',
            templateUrl: 'app/components/integration/ssoIntegration/ssoIntegrationView.html',
            controller: 'ssoIntegrationCtrl'
        })
});
