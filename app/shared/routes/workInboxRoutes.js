/*'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/workInbox', {
            templateUrl: 'app/components/workInbox/workInboxView.html',
            controller: 'workInboxCtrl'
        });
});*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('workInbox', {
            url: '/workInbox',
            templateUrl: 'app/components/workInbox/workInboxView.html',
            controller: 'workInboxCtrl'
        })
});

