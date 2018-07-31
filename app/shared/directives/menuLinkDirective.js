'use strict';

/**
 * @ngdoc directive
 * @name TrinetPassport.menuLink
 */

trinetApp.directive('menuLink', ['$location','$mdSidenav', 'gso','passportUrlBuilder','$rootScope', '$http', '$window', 'sharedProperties','SharedDataService', MenuLink]);

/**
 * @ngdoc directive
 * @name  menuLink
 * @module TrinetPassport
 *
 * @restrict E
 * @description
 * Menu Link is a link button that takes a config param and creates a button
 * ported from https://material.angularjs.org
 *
 * @param section
 * section: {
 *     name: 'Page Name',
 *     url : 'url',
 *     type: 'link',
 *     icon : 'tn-icon icon-icon_dashboard' // optional
 * }
 *
 * @usage
 * Basic:
 * <hljs lang="html">
 *     <menu-link section="child" ng-if="child.type === 'link'"></menu-link>
 * </hljs>
 */

function MenuLink($location, $mdSidenav, gso,passportUrlBuilder, $rootScope, $http, $window, sharedProperties,SharedDataService){

    return {
        scope: {
            section: '='
        },
        templateUrl: 'app/shared/views/menuLinkView.html',
        link: function ($scope) {

            $scope.isSelected = function () {
                if ($scope.section.url === "/ui-onboarding-newhire/#/employee/{companyId}") {
                    $scope.section.url = $scope.section.url.replace("{companyId}", gso.getAppConfig().companyId);
                } else if ($scope.section.url === "/ui/apps/PayrollEntry/index.html") {
                    // call gateway proxy to initialize JSESSION data for payroll.
                    var gatewayUrl = fileConfig.gatewayRedirect.proxyUrl;
                    gatewayUrl = gatewayUrl.replace("companyId", gso.getAppConfig().companyId);
                    gatewayUrl = gatewayUrl.replace("personId", gso.getAppConfig().personId);
                    $scope.section.url = sharedProperties.hrpUrl + gatewayUrl + $scope.section.url + "&header=false";
                }
                var path = $scope.section.url;
                return ('#' + $location.path() === path) ? true : false;
            };

            // Function broadcasts to all listeners to do onboardingOptionView
            $scope.openView = function (section, event) {
                $window.ga('send', 'event', 'buttons', 'click', section ? section.menuIdAttribute+"AdminView" :"");
                if (section.menuIdAttribute === "Hire/RehireEmployees") {
                    $rootScope.$broadcast("onboardingOptionView", "");
                }
                if (section.menuIdAttribute === 'HolidaySchedule') {
                    $scope.checkActiveForHolidayCalendar(event);
                }
                if (section.menuIdAttribute === 'TriNetReports') {
                    event.preventDefault();
                    var reportingHost = sharedProperties.reportsuiBaseUrl;
                    var clientReportsUrl = reportingHost+'/UIGateway.jsp';
                    window.open(clientReportsUrl, 'Client Reports');
                }
                if (section.menuIdAttribute === 'WorkforceAnalytics') {
                    event.preventDefault();
                    var url = sharedProperties.getWfaUrl();
                    window.open(url, 'Workforce Analytics');
                }

                if (section.menuIdAttribute == 'BenefitsStrategyandFunding' && gso.getUtilService().getEnvironmentFromLocation() !== null) {
                    var gatewayUrl = fileConfig.gatewayRedirect.proxyUrl;
                    gatewayUrl = gatewayUrl.replace("companyId",gso.getAppConfig().companyId);
                    gatewayUrl = gatewayUrl.replace("personId",gso.getAppConfig().personId);
                    gatewayUrl = sharedProperties.hrpUrl + gatewayUrl + "/ui/apps/BIS";
                    window.open(gatewayUrl, '_gatewayWindow');
                }
            };

            $scope.setPermissions = function (menuId) {
                SharedDataService.getAppSharedData().permissionId=menuId;
            };

            $scope.setMenuState = function (data) {
                SharedDataService.getAppSharedData().menuId= data.menuId;
                $mdSidenav('left').toggle();
            };

            // Function stops href from happening for special occassions
            $scope.stopRedirect = function (event, section) {
                if (section.menuIdAttribute === "Hire/RehireEmployees") {
                    event.preventDefault();
                }
            }

            $scope.checkActiveForHolidayCalendar = function (event){
                event.preventDefault();
                var isActiveCompany = false;

                var token= gso.getUtilService().getCookie();
                $http({
                    url: '/api-company-holiday-calendar/v1/holidaycalendar/'+ gso.getAppConfig().companyId + '/Y/activeCompany',
                    method: 'GET',
                    headers: {
                        'Authorization':'Bearer '+ token,
                        'X-Company-ID': gso.getAppConfig().companyId,
                        'Content-Type': 'application/json;charset=UTF-8'}
                })
                    .success(function (response) {
                        isActiveCompany = response.data;
                    })
                    .error(function () {
                    })
                    .then ( function (){
                        if (isActiveCompany) {
                            window.open('/holidaycalendar?Company=' + gso.getAppConfig().companyId, '_blank');
                        }
                        else{
                            $window.location.href = '#/holidaySchedule';
                        }
                    });
            };

            $scope.redirectURL = function (data) {
                if (data.external === "Y" && data.url === "#") {

                    var requestTerminationURL;
                    var empId;
                    var itemName = data.menuIdAttribute;
                    var asOfDate = gso.getUtilService().filterDate(new Date(), constants.dateFormatUS);
                    var thirdPartyUrl = constants[itemName];

                    empId = gso.getRouteParams().empId;
                    requestTerminationURL = '//' + sharedProperties.hrpUrl + '/Link2HR.eng?' + thirdPartyUrl + '~asofdate=' + asOfDate + '~company=' + gso.getAppConfig().companyId + '~positionid=' + empId + '~personid=' + empId;


                    requestTerminationURL = passportUrlBuilder(requestTerminationURL);
                
                    return requestTerminationURL;
                }
                else {
                    return data.url;
                }
            };

        }
    };
}
