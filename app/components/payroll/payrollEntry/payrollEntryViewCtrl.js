/**
 * Description: This is controller is used to load Payroll entry page
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';

trinetApp.controller('payrollEntryViewCtrl', ['$scope', 'gso', '$sce', 'urlBuilder', 'hrpSignonService',
    function ($scope, gso, $sce, urlBuilder, hrpSignonService) {
        // Lets pretend we already got the employee service data
        $scope.params = {
            'USERID': gso.getAppConfig().userId,
            'TSESSIONID': gso.getUtilService().getCookie(),
            'USER_COMPANY': gso.getAppConfig().companyId
        };
        $scope.payrollLoaded = false;

        hrpSignonService.gatewayLogin(gso.getAppConfig().companyId, gso.getAppConfig().userId, gso.getUtilService().getCookie()).then(function () {
            $scope.payrollLoaded = true;
            $scope.url = $sce.trustAsResourceUrl(urlBuilder('../ui/apps/PayrollEntry/index.html'));
        });

    }]);
