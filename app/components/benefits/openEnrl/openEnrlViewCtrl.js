'use strict';

trinetApp.controller('openEnrlViewCtrl', ['$scope', 'gso', '$sce', 'passportUrlBuilder','sharedProperties',
    function ($scope, gso, $sce, passportUrlBuilder,sharedProperties) {
        $scope.openEnrollWindow = function () {
            var gatewayUrl = fileConfig.gatewayRedirect.proxyUrl;
            gatewayUrl = gatewayUrl.replace("companyId",gso.getAppConfig().companyId);
            gatewayUrl = gatewayUrl.replace("personId",gso.getAppConfig().personId);
            gatewayUrl = sharedProperties.hrpUrl + gatewayUrl + "/ui/OE/oenew.html";
            window.open(gatewayUrl, '_gatewayWindow');

        };

        var verifyOpenWindow = function () {
            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
            }
            var notInWindowAlert = {
                _statusCode: '400',
                _statusMessage: "You have already elected your benefits. To review your current elections, see <a href='#/currentbenefits'>Current Benefits</a>"
            };
            var appUserId = $scope.appUserId;
            $scope.currentBenefits = gso.getCrudService().execute(constants.get,
                benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + appUserId + '/' + 'current-benefits',
                null,
                function (response) {
                    if (response && response.enrollment && response.enrollment.enrollmentDeadlineData) {
                        var enrollmentDeadlineData = response.enrollment.enrollmentDeadlineData,
                            enrollBeginDt = enrollmentDeadlineData.enrollBeginDt,
                            enrollEndDt = enrollmentDeadlineData.enrollEndDt,
                            timestamp = response.enrollment.content.timestamp,
                            beginDate = new Date(enrollBeginDt),
                            endDate = new Date(enrollEndDt),
                            now = new Date(timestamp);
                        if (now.between(beginDate, endDate)) {
                            $scope.openEnrollWindow();
                        } else {
                            $scope.errorAlert = notInWindowAlert;
                        }
                    } else {
                        $scope.errorAlert = notInWindowAlert;
                    }

                },
                function () {
                    $scope.errorAlert = notInWindowAlert;
                }
            );

        };
        verifyOpenWindow();

    }]);
