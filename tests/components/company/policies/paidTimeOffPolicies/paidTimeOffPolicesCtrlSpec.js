/**
 * Created by Santosh on 11/3/2015.
 */

'use strict';
describe('Paid Time Off Policies Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            appConfig = $injector.get('appConfig');
            $injector.get('$controller')('paidTimeOffPolicesCtrl', {$scope: $scope});

        });
    });


    it('paidTimeOffURL is defined', function () {
        expect($scope.paidTimeOffURL).toBeDefined();
    });

    it('paidTimeOffURL is equal to specified url', function () {
        expect($scope.paidTimeOffURL).toEqual("/Link2HR.eng?/HR/Admin/Redirect_gateway.htm~USERID=" + appConfig.userId +
            "~TSESSIONID=AQIC5wM2LY4Sfcx3zQhOWmr-6YGbVUUduZjcwjmaxYupcPc.*AAJTSQACMDMAAlNLABQtNTgxMzYzMzEzOTM2ODg0Nzk1MQACUzEAAjAx*~USER_COMPANY=" +
            appConfig.companyId + "~Path=ui/PayrollPolicy/PaidTimeOff.htm");
    });


});