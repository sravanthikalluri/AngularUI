'use strict';
trinetApp.directive('notification', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: "app/components/company/workInbox/notificationView.html"
    };
});