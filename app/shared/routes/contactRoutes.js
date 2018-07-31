/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/contact', {
            templateUrl: 'app/components/contact/contactTriNet.html',
            controller: 'contactCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/components/contact/contactTriNet.html',
            controller: 'contactCtrl'
        })
});
