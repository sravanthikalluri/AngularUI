'use strict';
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('lifestatuschange', {
            url: '/lifestatuschange',
            templateUrl: 'app/components/benefits/lifeStatusChange/lifeStatusChangeView.html',
            controller: 'lifeStatusChangeViewCtrl'
        })
        .state('affordableCareAct', {
            url: '/affordableCareAct',
            templateUrl: 'app/components/benefits/affordableCareAct/affordableCareActView.html',
            controller: 'affordableCareActCtrl'
        })
        .state('currentbenefits', {
            url: '/currentbenefits',
            templateUrl: 'app/components/benefits/currentBenefits/currentBenefitsView.html',
            controller: ''
        })
        .state('openEnrollmentStatus', {
            url: '/openEnrollmentStatus',
            templateUrl: 'app/components/benefits/openEnrollmentStats/openEnrollmentStats.html',
            controller: 'openEnrollmentStatsCtrl'
        })
        .state('resources', {
            url: '/resources',
            templateUrl: 'app/components/benefits/benefitsResource/benefitsResource.html',
            controller: 'benefitsResourceCtrl'
        })
});

/*trinetApp.config(function ($routeProvider) {
    $routeProvider
        /!*.when('/legalnotices', {
            templateUrl: 'app/components/benefits/policies/benefitsPoliciesView.html',
            controller: 'policiesViewCtrl'
        })
        .when('/yourCompanyRequired', {
            templateUrl: 'app/components/benefits/policies/additionalPolicies/yourCompanyRequiredForms/yourCompanyRequiredFormsView.html',
            controller: 'yourCompanyRequiredFormsCtrl'
        })

        .when('/cobraBenefitsSummaryView', {

            templateUrl: 'app/components/benefits/policies/benefitsSummary/cobraBenefitsSummary/cobraBenefitsSummaryView.html',
            controller: 'cobraBenefitsSummaryViewCtrl'
        })
        .when('/buildMaintainView', {

            templateUrl: 'app/components/benefits/policies/benefitsSummary/buildMaintainStates/buildMaintainView.html',
            controller: 'buildMaintainViewCtrl'
        })
        /!*employee hand book url mapping*!/
        .when('/employeeHandBookView', {

            templateUrl: 'app/components/company/policies/additionalPolicies/yourCompanyRequiredForms/employeeHandBook/employeeHandBookView.html',
            controller: 'yourCompanyRequiredFormsCtrl'
        })
        .when('/benefitsForms', {
            templateUrl: 'app/components/benefits/forms/benefitsFormsView.html',
            controller: 'benefitsFormsCtrl'
        })

        .when('/additionalPolicies/forms/:menuId', {
            templateUrl: 'app/components/company/policies/additionalPolicies/additionalForms/additionalFormsView.html',
            controller: 'additionalFormsViewCtrl'
        })
        .when('/additionalPolicies/manager/:menuId', {
            templateUrl: 'app/components/company/policies/additionalPolicies/manageResources/manageResourcesView.html',
            controller: 'manageResourceViewCtrl'
        })
        .when('/additionalPolicies/policies/:menuId', {

            templateUrl: 'app/components/company/policies/additionalPolicies/policiesAndProcedures/policiesAndProceduresView.html',
            controller: 'policiesAndProceduresCtrl'
        })
        .when('/additionalPolicies/yourCompany/:menuId', {

            templateUrl: 'app/components/company/policies/additionalPolicies/yourCompanyRequiredForms/yourCompanyRequiredFormsView.html',
            controller: 'yourCompanyRequiredFormsCtrl'
        })
        .when('/commuterbenefits', {

            templateUrl: 'app/components/benefits/commuter/commuterView.html',
            controller: 'commuterViewCtrl'
        })*!/
        .when('/lifestatuschange', {
            templateUrl: 'app/components/benefits/lifeStatusChange/lifeStatusChangeView.html',
            controller: 'lifeStatusChangeViewCtrl'
        })
        .when('/affordableCareAct', {
            templateUrl: 'app/components/benefits/affordableCareAct/affordableCareActView.html',
            controller: 'affordableCareActCtrl'
        })
        .when('/currentbenefits', {
            templateUrl: 'app/components/benefits/currentBenefits/currentBenefitsView.html',
            controller: ''
        }).when('/openEnrollmentStatus', {
            templateUrl: 'app/components/benefits/openEnrollmentStats/openEnrollmentStats.html',
            controller: 'openEnrollmentStatsCtrl'
        }).when('/resources', {
            templateUrl: 'app/components/benefits/benefitsResource/benefitsResource.html',
            controller: 'benefitsResourceCtrl'
        })

        /!*.when('/openenrollment', {


            templateUrl: 'app/components/benefits/openEnrl/openEnrlView.html',
            controller: 'openEnrlViewCtrl'
        }).when('/healthsavingaccount', {

            templateUrl: 'app/components/benefits/healthSavings/healthSavingsView.html',
            controller: ''
        }).when('/executive', {

            templateUrl: 'app/components/benefits/policies/benefitsSummary/executive/executiveTemplate.html',
            controller: 'executiveCtrl'
        }).when('/plansandcarriers', {
            templateUrl: 'app/components/benefits/planCarriers/planCarriers.html',
            controller: 'planCarriersCtrl'
        }).when('/mybenefitoptions', {
            templateUrl: 'app/components/benefits/policies/benefitsOverview/benefitsOverviewView.html',
            controller: 'benefitsOverviewViewCtrl'
        }).when('/askbenefits', {
            templateUrl: 'app/components/benefits/askBenefits/askBenefitsView.html',
            controller: 'askBenefitsViewCtrl'
        }).when('/mybenefitoptions/stateplan', {
            templateUrl: 'app/components/benefits/policies/benefitsSummary/buildMaintainStates/statesBuildData/stateBuildBenfOpt.html',
            controller: 'statesBuildDataCtrl'
        }).when('/mybenefitoptions/metLifeBenefits', {
            templateUrl: 'app/components/benefits/policies/metlifeBenefits/metlifeBenefitsView.html'
        }).when('/mybenefitoptions/aflacBenefits', {
            templateUrl: 'app/components/benefits/policies/aflacBenefits/aflacBenefitsView.html'
        }).when('/legalnotices/acaMarketPlaceView', {
            templateUrl: 'app/components/company/policies/acaMarketPlace/acaMarketPlaceView.html'
        })*!/;

});*/
