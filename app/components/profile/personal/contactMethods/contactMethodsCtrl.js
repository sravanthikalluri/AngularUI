/**
 Description: This is controller used to fetch contact details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('contactMethodsCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        /*if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }*/
        $scope.visibleContact = false;
        $scope.toggleContact = function () {
            $scope.visibleContact = !$scope.visibleContact;
        };
        $scope.editView = function () {
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/personal/contactMethods/contactMethodsModelView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
        };
        $scope.$on(constants.broadcastContact, function (evnt, data) {
            $scope.visibleContact = data;
            if (data) {
                angular.element('div#profileSectionsScroll').animate({scrollTop: angular.element('div#profileSectionsScroll').scrollTop() + angular.element('#contactMethodsView').position().top + 80}, 'slow');
            }


        });
        $scope.selectPreferred = function (index) {
            $scope.preferredData = [];
            $scope.preferredData.push($scope.contactMethodData[index]);
        };
        $scope.converttophoneformat = function (phoneNumber) {
            if (angular.isDefined(phoneNumber)) {
                return phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6, 4);
            }
        };
    }
]);
