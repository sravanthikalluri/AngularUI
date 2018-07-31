/*
 Program Description / functionality:
 1) Fetch all Benefit Policies tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('companyPoliciesViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.tab = 0;
        $scope.selectTab = function(value,data){
            $scope.tab = value;
            $scope.tileData = data;
            setTimeout(function () {
                angular.element('#guidebook_section').focus();
            }, 100);
        };
        $scope.tileAction = function (setTab, title, url, obj) {
            $scope.tab = setTab;
            $scope.selectedObjectData = obj;
            angular.element('.title-block').on('click', function () {
                angular.element('.title-block').removeClass('active');
                angular.element(this).addClass('active');
            });
            $scope.companyTileSelectedData(setTab, title, url);

        };
        $scope.$on(constants.emitCompanyAlert, function (evnt, alert) {
            $scope.errorAlert = alert;
        });
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };
        /*Fetching  benefit policy information */
        gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
            companyUrlConfig.resources.policy + "/" + gso.getAppConfig().companyId + "/" +
            gso.getAppConfig().userId + "/" + gso.getAppConfig().countryCode + "/" + gso.getAppConfig().stateCode + companyUrlConfig.resources.companyPolicies+"?pfClient="+gso.getAppConfig().pfClient, null,
            function (response) {
                $scope.companyPoliciesData = response;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        function getTemplate(title) {
            var response = null;
            angular.forEach($scope.htmlTemplates, function (data) {
                if (title === data.name) {
                    response = data;
                }
            });
            return response;
        }
        $scope.companyTileSelectedData = function (index, title, url) {
            var data = getTemplate(title);
            $scope.contentId = data.id;
            $scope.url = url;
            if (data.name === 'ACA Lrg Employer Status') {
                gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.policy + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/" + gso.getAppConfig().countryCode + "/" +
                    gso.getAppConfig().stateCode + companyUrlConfig.resources.companyPolicies + "?type=acaEmpStatus", null,
                    function (response) {
                        $scope.acaLrgEmployerStatusViewData = response;
                        $scope.acaLrgEmployerStatusViewData.effectiveDate = gso.getUtilService().splitConcatDateString($scope.acaLrgEmployerStatusViewData.effectiveDate);
                        $scope.selectedURL = data.url;
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            } else {
                $scope.selectedURL = data.url;
            }
        };
        $scope.closePanel = function () {
            $scope.tab = 0;
            gso.getUtilService().removeTitle();
        };
        $scope.htmlTemplates = [{
            name: 'Company Addendum',
            url: 'app/components/company/policies/companyAddendum/companyAddendumView.html'
        }, {
            name: 'Additional Policies',
            url: 'app/components/company/policies/additionalPolicies/companyAdditionalPoliciesView.html'
        }, {
            name: 'Employee Handbook',
            url: 'app/components/company/policies/employeeHandBook/employeHandBookView.html'
        }, {
            name: 'TriNet TCA',
            url: 'app/components/company/policies/trinetTCA/trinetTCAView.html'
        }, {
            name: 'ACA Lrg Employer Status',
            url: 'app/components/company/policies/acaLrgEmployerStatus/acaLrgEmployerStatusView.html'
        }, {
            name: 'California Required Notifications',
            url: 'app/components/company/policies/californiaRequiredNotifications/californiaRequiredNotificationsView.html'
        }, {
            name: 'Holiday Schedule',
            url: 'app/components/company/policies/holidaySchedule/holidayScheduleView.html'
        }, {
            name: 'Information for Veterans',
            url: 'app/components/company/policies/informationForVeterans/informationForVeteransView.html'
        }, {
            name: 'Paid Time Off Policies',
            url: 'app/components/company/policies/paidTimeOffPolicies/paidTimeOffPolices.html'
        }, {
            name: 'Federal Contractors',
            url: 'app/components/company/policies/federalContractors/federalContractorsView.html'
        }, {
            name: 'Schedule of Due Dates and Special Fees',
            url: 'app/components/company/policies/scheduleDueDatesSpecialFees/scheduleDueDatesSpecialFeesView.html'
        }, {
            name: 'California',
            url: 'app/components/company/policies/california/california.html'
        }, {
            name: 'Coventry Texas Healthcare Network Employee Notification Packet (English)',
            url: 'app/components/company/policies/coventryTexasHealthcareNetworkEmployeeNotificationPacket(English)/coventryTexasHealthcareNetworkEmployeeNotificationPacket(English).html'
        }, {
            name: 'Coventry Texas Healthcare Network Employee Notification Packet (Spanish)',
            url: 'app/components/company/policies/coventryTexasHealthcareNetworkEmployeeNotificationPacket(Spanish)/coventryTexasHealthcareNetworkEmployeeNotificationPacket(Spanish).html'
        }, {
            name: 'Texas Healthcare Letter to Clients',
            url: 'app/components/company/policies/texasHealthcareLetterClients/texasHealthcareLetterClientsView.html'
        }, {
            name: 'Equifax Reporting Guide',
            url: 'app/components/company/policies/equiFoxReportingGuide/equiFoxReportingGuideView.html'
        },
        {
            name: 'Texas Required Notification',
            url: 'app/components/company/policies/texasRequiredNotifications/texasRequiredNotificationsView.html'
        }];
    }
]);