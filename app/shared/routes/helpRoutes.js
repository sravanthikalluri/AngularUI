/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/browsers', {
            templateUrl: 'app/components/help/browserSupport.html'
            /!*controller: 'browserSupportCtrl'*!/
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('browsers', {
            url: '/browsers',
            templateUrl: 'app/components/help/browserSupport.html'
            /*controller: 'browserSupportCtrl'*/
        })
});
