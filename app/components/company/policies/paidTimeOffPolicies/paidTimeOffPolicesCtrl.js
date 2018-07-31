'use strict';
trinetApp.controller('paidTimeOffPolicesCtrl', ['$scope', 'gso',
    function ($scope, gso) {
    $scope.paidTimeOffURL = "/Link2HR.eng?/HR/Admin/Redirect_gateway.htm~USERID=" + gso.getAppConfig().userId +
        "~TSESSIONID=AQIC5wM2LY4Sfcx3zQhOWmr-6YGbVUUduZjcwjmaxYupcPc.*AAJTSQACMDMAAlNLABQtNTgxMzYzMzEzOTM2ODg0Nzk1MQACUzEAAjAx*~USER_COMPANY=" +
        gso.getAppConfig().companyId + "~Path=ui/PayrollPolicy/PaidTimeOff.htm";
}]);