'use strict';

trinetApp.controller('requestTimeOffViewCtrl', ['$scope', 'gso', '$sce', 'urlBuilder',
    function ($scope, gso, $sce, urlBuilder) {
        // Lets pretend we already got the employee service data
        $scope.params = {
            'USERID': gso.getAppConfig().userId,
            'TSESSIONID': gso.getUtilService().getCookie(),
            'USER_COMPANY': gso.getAppConfig().companyId

        };
        var timeOffUrl = urlBuilder('../ui/apps/TimeOff');
        window.open(timeOffUrl, 'Request Time Off', 'width=800, height=600');
        history.go(-1);

    }]);

