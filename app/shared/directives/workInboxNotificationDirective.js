'use strict';
trinetApp.directive('workInboxNotification', ['$document', function ($document) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: "app/components/company/workInbox/workInboxNotificationView.html",
        link: function (scope, element) {
            scope.isPopupVisible = true;
            $document.bind('click', function (event) {

                var isClickedElementChildOfPopupIsVisible = element.find('div.notify-data').is(':visible'),
                    target = element.find(event.target),
                    isClickedElementChildOfPopup = target.closest('div.notify-data').length > 0;

                if (!isClickedElementChildOfPopupIsVisible && target.closest('div.icon-icon_workinbox').hasClass('icon-icon_workinbox')) {
                    angular.element('.notify-data').show();
                } else if (!isClickedElementChildOfPopup || target.hasClass('action-link')) {
                    angular.element('.notify-data').hide();
                }
            });


        }
    };
}]);