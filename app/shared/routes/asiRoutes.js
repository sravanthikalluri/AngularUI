'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('asi', {
            url: '/asi',
            templateUrl: 'app/components/asi/asiView.html',
            controller: 'asiViewCtrl'
        })
});
