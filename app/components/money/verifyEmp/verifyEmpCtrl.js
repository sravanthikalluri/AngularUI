'use strict';
trinetApp.controller('verifyEmpCtrl', ['$scope', 'gso',function ($scope, gso) {
        /**
         * initialize verification data method
         */
        $scope.initVerificationDataFn = function () {
            var verificationDataURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + moneyUrlConfig.resources.verification;

            gso.getCrudService().execute(constants.get, verificationDataURL, null,
                function (response) {
                    $scope.verification = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        /**
         * initialize verification data method calling
         */
        $scope.initVerificationDataFn();

    }]);