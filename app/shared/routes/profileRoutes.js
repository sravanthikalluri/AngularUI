/*
'use strict';
trinetApp.config(function ($routeProvider) {
    $routeProvider
        /!*.when('/profile/:selectedTab', {
            templateUrl: 'app/components/profile/profileLandingPage.html',
            controller: 'profileLandingPageCtrl'
        })*!/
        .when('/profile/:selectedTab/:empId', {
            templateUrl: 'app/components/profile/profileLandingPage.html',
            controller: 'profileLandingPageCtrl'
        })
        .when('/profile/company/:empId/:empStatus', {
            templateUrl: 'app/components/profile/profileLandingPage.html',
            controller: 'profileLandingPageCtrl'
        })
        .when('/profile/company/:empId', {
            templateUrl: 'app/components/profile/profileLandingPage.html',
            controller: 'profileLandingPageCtrl'
        });
});
*/
'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            abstract: true,
            controller: 'profileLandingPageCtrl',
            templateUrl: 'app/components/profile/profileLandingPage.html'
        })
        .state('profile.profile', {
            url: '/:selectedTab/:empId',
            views: {
                'mainContent': {
                    templateUrl: function (stateParams){
                        return loadTemplates(stateParams);
                    }
                }
            }
        });
});

var templateURLS = {
    profile: 'app/components/profile/personal/personal.html',
    workinfo: 'app/components/profile/workinfo/workinfo.html',
    money: 'app/components/employee/money/money.html',
    timeoff: 'app/components/employee/timeoff/timeOff.html',
    benefits: 'app/components/benefits/currentBenefits/currentBenefitsView.html',
    permissions: 'app/components/employee/roles/roles.html',
    eforms: 'app/components/employee/eforms/eforms.html',
    customFields: 'app/components/employee/manageCustomFields/customFields.html'
};

function loadTemplates(stateParams) {
    return templateURLS[stateParams.selectedTab];
}
