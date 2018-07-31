'use strict';
/*trinetApp.config(function ($routeProvider) {
    $routeProvider
        .when('/manageEmployee', {
            templateUrl: 'app/components/employee/manageEmployeeView.html',
            controller: 'manageEmployeeCtrl'
        })
        .when('/immigration', {
            templateUrl: 'app/components/employee/immigration/immigrationView.html',
            controller: 'immigrationCtrl'
        })
        .when('/managerforms', {
            templateUrl: 'app/components/employee/managerforms/managerFormsView.html',
            controller: 'managerFormViewCtrl'
        })
        .when('/announcements', {
            templateUrl: 'app/components/announcement/companyAnnouncement.html',
            controller: 'companyAnnouncementCtrl'
        })
        .when('/impNotices', {
        templateUrl: 'app/components/trinetlinks/noticesLink.html',
        controller: 'noticeLinkCtrl'
        })

        .when('/reportAnalytics', {
            templateUrl: 'app/components/employee/reportAnalytics/reportAnalyticsView.html',
            controller: 'reportAnalyticsCtrl'
        })
        .when('/reportAnalytics/:manageGroup', {
            templateUrl: 'app/components/employee/reportAnalytics/reportAnalyticsView.html',
            controller: 'reportAnalyticsCtrl'
        })

        .when('/assignManager', {
            templateUrl: 'app/components/employee/assignManager/assignManager.html',
            controller: 'assignManagerCtrl'
        })
        .when('/eeoAudit', {
            templateUrl: 'app/components/employee/eeoAudit/eeoAudit.html',
            controller: 'eeoAuditCtrl'
        })
        .when('/reports', {
            templateUrl: 'app/components/employee/reports/reportsView.html',
            controller: 'reportsCtrl'
        })
        .when('/manageGroups', {
            templateUrl: 'app/components/employee/manageGroups/manageGroupsView.html',
            controller: 'manageGroupsCtrl'
        })
        .when('/createGroupChangeView', {
            templateUrl: 'app/components/employee/manageGroups/createGroupChangeView.html',
            controller: 'manageGroupsCtrl'
        })
        .when('/assignedRoles', {
            templateUrl: 'app/components/employee/assignedRoles/assignedRoles.html',
            controller: 'assignedRolesCtrl'
        })
        .when('/employeePolicies', {
            templateUrl: 'app/components/employee/policies/employeePolicies.html',
            controller: 'employeePoliciesCtrl'
        })
        .when('/manageCustomFields', {
            templateUrl: 'app/components/employee/manageCustomFields/manageCustomFieldsView.html',
            controller: 'manageCustomFieldsCtrl'
        });

});*/
trinetApp.config(function ($stateProvider) {
    $stateProvider
        .state('manageEmployee', {
            url: '/manageEmployee',
            templateUrl: 'app/components/employee/manageEmployeeView.html',
            controller: 'manageEmployeeCtrl'
        })
        .state('immigration', {
            url: '/immigration',
            templateUrl: 'app/components/employee/immigration/immigrationView.html',
            controller: 'immigrationCtrl'
        })
        .state('managerforms', {
            url: '/managerforms',
            templateUrl: 'app/components/employee/managerforms/managerFormsView.html',
            controller: 'managerFormViewCtrl'
        })
        .state('announcements', {
            url: '/announcements',
            templateUrl: 'app/components/announcement/companyAnnouncement.html',
            controller: 'companyAnnouncementCtrl'
        })
        .state('impNotices', {
            url: '/impNotices',
            templateUrl: 'app/components/trinetlinks/noticesLink.html',
            controller: 'noticeLinkCtrl'
        })
        .state('reportAnalytics', {
            url: '/reportAnalytics',
            templateUrl: 'app/components/employee/reportAnalytics/reportAnalyticsView.html',
            controller: 'reportAnalyticsCtrl'
        })
        .state('reportAnalytics.manageGroup', {
            url: '/reportAnalytics/:manageGroup',
            templateUrl: 'app/components/employee/reportAnalytics/reportAnalyticsView.html',
            controller: 'reportAnalyticsCtrl'
        })
        .state('assignManager', {
            url: '/assignManager',
            templateUrl: 'app/components/employee/assignManager/assignManager.html',
            controller: 'assignManagerCtrl'
        })
        .state('eeoAudit', {
            url: '/eeoAudit',
            templateUrl: 'app/components/employee/eeoAudit/eeoAudit.html',
            controller: 'eeoAuditCtrl'
        })
        .state('reports', {
            url: '/reports',
            templateUrl: 'app/components/employee/reports/reportsView.html',
            controller: 'reportsCtrl'
        })
        .state('manageGroups', {
            url: '/manageGroups',
            templateUrl: 'app/components/employee/manageGroups/manageGroupsView.html',
            controller: 'manageGroupsCtrl'
        })
        .state('createGroupChangeView', {
            url: '/createGroupChangeView',
            templateUrl: 'app/components/employee/manageGroups/createGroupChangeView.html',
            controller: 'manageGroupsCtrl'
        })
        .state('assignedRoles', {
            url: '/assignedRoles',
            templateUrl: 'app/components/employee/assignedRoles/assignedRoles.html',
            controller: 'assignedRolesCtrl'
        })
        .state('employeePolicies', {
            url: '/employeePolicies',
            templateUrl: 'app/components/employee/policies/employeePolicies.html',
            controller: 'employeePoliciesCtrl'
        })
        .state('manageCustomFields', {
            url: '/manageCustomFields?isPassport&companyID',
            templateUrl: 'app/components/employee/manageCustomFields/manageCustomFieldsView.html',
            controller: 'manageCustomFieldsCtrl'
        });
});
