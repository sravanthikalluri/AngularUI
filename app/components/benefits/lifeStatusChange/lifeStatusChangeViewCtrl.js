/**
 * Description: This is controller is used to load Life status Change page
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';

trinetApp.controller('lifeStatusChangeViewCtrl', ['$scope', 'gso', '$sce', 'urlBuilder', 'hrpSignonService',
    function ($scope, gso, $sce, urlBuilder, hrpSignonService) {
        // Lets pretend we already got the employee service data
        $scope.params = {
            'USERID': gso.getAppConfig().userId,
            'TSESSIONID': gso.getUtilService().getCookie(),
            'USER_COMPANY': gso.getAppConfig().companyId

        };
        $scope.lscLoaded = false;
        // having to do a relative parent reference because we are now
        // running the app at platformbib.hrpassport.com/unifiedux/
        hrpSignonService.gatewayLogin(gso.getAppConfig().companyId, gso.getAppConfig().userId, gso.getUtilService().getCookie()).then(function () {
            $scope.lscLoaded = true;
            $scope.url = $sce.trustAsResourceUrl(urlBuilder('../ui/LSC/LSC.html'));
        });

    }]);
