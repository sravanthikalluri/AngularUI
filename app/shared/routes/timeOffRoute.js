'use strict';
trinetApp.config(function ($stateProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
   /* $routeProvider
        .when('/requestTimeOff', {
            templateUrl: 'app/components/timeoff/requestTimeOff/requestTimeOffView.html',
            controller: 'requestTimeOffViewCtrl'
        });*/
});
