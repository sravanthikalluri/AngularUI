/*
 Program Description / functionality: To Fetch TriNet TCA Policy Information.
 */
'use strict';
trinetApp.controller('trinetTCAViewCtrl', ['$scope', 'gso', '$window',
    function ($scope, gso, $window) {
        $scope.empHandbookStatus = function () {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + "/" + gso.getAppConfig().countryCode + "/" + gso.getAppConfig().stateCode + companyUrlConfig.resources.companyPolicies, null,
                function (response) {
                    $scope.companyPoliciesData = companyUrlConfig.companyApi + constants.docLocContext + response.docMeta[2].url;
                    $window.open($scope.companyPoliciesData, 'Employee Guide Book', 'width=500,height=400');
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + companyUrlConfig.resources.eformsStatus, null, function (response) {
                    $scope.trinetTca = response;
                    $scope.empguidebook = $scope.companyPoliciesData;
                    if ($scope.trinetTca.eforms_data !== null && $scope.trinetTca.eforms_data[0] !== undefined || $scope.trinetTca.eforms_data.length !== 0) {
                        if ($scope.trinetTca.eforms_data[0].formStatus === "Accepted") {
                            $window.open($scope.empguidebook);
                        } else {
                            gso.getNGDialog().open({
                                templateUrl: 'app/components/company/policies/trinetTCA/handookRequest.html',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            });
                        }
                    } else {
                        $scope.errorAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: company.companyPoliciesAlertMessages.processYourReq
                        };
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.acceptReq = function () {
            var data = {
                "formStatus": "accepted",
                "formId": $scope.trinetTca.eforms_data[0].formId
            };
            gso.getCrudService().execute(constants.post, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + companyUrlConfig.resources.eformsStatus, data,
                function (response) {
                    $scope.errorAlert = response;
                    gso.getNGDialog().closeAll();
                    $window.open($scope.empguidebook);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        };
    }]);