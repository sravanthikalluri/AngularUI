
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('sso', {
            url: '/ssowidget/:ssoId',
            templateUrl: 'app/components/sso/ssoView.html',
            controller: 'ssoCtrl'
        })
});
