/**
 Description: This is controller used to display
 1) Speak to contact section tabs
 2) Enter support case status
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('helpSupportCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.employee = true;
        $scope.tab = 0;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
            gso.getUtilService().setSidebarActive("help" + setTab);
        };

        $scope.closePanel = function () {
            $scope.tab = 0;
            $scope.hideDiv = gso.getUtilService().toggleDIV('support', false);
            $scope.hideDiv = !$scope.hideDiv;
        };

        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.selectedTab = gso.getRouteParams().selectedTab;
        if ($scope.selectedTab === "employee") {
            $scope.employee = true;
            $scope.hrfinance = false;
        } else if ($scope.selectedTab === "hrfinance") {
            $scope.employee = false;
            $scope.hrfinance = true;
        }
        $scope.getSrc = function () {
            $scope.todayDateTimeStamp = gso.getUtilService().filterDate(new Date(), constants.dateTimeFormatUS);
            $scope.speakUrl = "/ui/TriNetServiceTeam/TriNetServiceTeam.html?USERID=" +
                gso.getAppConfig().userId + "&USER_COMPANY=" +
                gso.getAppConfig().companyId + "&USER_POSITION=" +
                gso.getAppConfig().userId + "&LOGON_TIMESTAMP=" +
                $scope.todayDateTimeStamp;
            return $scope.speakUrl;
        };
    }]);