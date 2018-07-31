/*
 Program Description / functionality: To Fetch Company Required Policy Information.
 */
'use strict';
trinetApp
    .controller(
        'yourCompanyRequiredFormsCtrl', ['$scope', '$window', 'gso',
            function ($scope, $window, gso) {
                gso.getUtilService().hideDIVS(true);
                /*Fetching  benefit policy information */
                $scope.companyPoliciesData = "";
                $scope.empHandbookPDF = function () {
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
                };
                $scope.visible = false;
                $scope.buttonText = "I Agree";
                $scope.showDiv = function () {
                    $scope.empHandbookPDF();
                    $scope.visible = !$scope.visible;
                };
                $scope.visibleImage = false;

                gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/form-statuses', null,
                    function (response) {
                        $scope.yourCompanyFormsData = response;
                        if (response.eforms_data[0] === undefined || response.eforms_data[0] === null) {
                            $scope.errorAlert = {
                                _statusCode: constants.warning,
                                _statusMessage: company.companyPoliciesAlertMessages.processReq
                            };
                        } else {
                            if (response.eforms_data[0].formStatus === 'Accepted') {
                                angular.element("#checkmark").append('<span id="Right" class="icon-icon_approved medium green-icon"></span>');
                            }
                            else {
                                angular.element("#checkmark").append('<span id="Wrong" class="icon-icon_declined medium red-icon "></span>');
                            }
                        }
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );

                $scope.accepting = false;
                $scope.Iagrred = true;
                $scope.employeeAccept = function () {
                    $scope.buttonText = "Processing...";
                    $scope.accepting = true;
                    if ($scope.yourCompanyFormsData.eforms_data[0] === undefined) {
                        $scope.errorAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: company.companyPoliciesAlertMessages.processYourReq
                        };
                        $scope.childParentAlertMsg($scope.errorAlert);
                        $scope.buttonText = "I Agree";
                    }
                    $scope.visibleImage = true;
                    var myEl = null;
                    var getUrl = window.location;
                    var baseUrl = getUrl.protocol + "//" + getUrl.host + getUrl.pathname + "#/policies";
                    var data = {
                        "formStatus": "accepted",
                        "formId": $scope.yourCompanyFormsData.eforms_data[0].formId
                    };
                    gso.getCrudService().execute(constants.post, benefitsUrlConfig.policiesEmpApi + "/api-company/v1/eforms/" + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/form-statuses', data,
                        function (response) {
                            $scope.errorAlert = response;
                            $scope.buttonText = "Accepted";
                            angular.element("#agreeBtn").prop('disabled', true);
                            myEl = angular.element(document.querySelector('#thanksId'));
                            myEl.append('<p class="Trinet-blue inline"><strong>Thank you. You have completed this requirement. For your convenience, your handbook may be accessed through the Employee Handbook link under the My Company menu. <a class="inline Trinet-orange" href="' + baseUrl + '">Return</a></strong></p>');
                        },
                        function (data) {
                            $scope.buttonText = "Rejected";
                            angular.element("#agreeBtn").prop('disabled', true);
                            var myErrEl = angular.element(document.querySelector('#thanksId'));
                            myErrEl.append('<p class="Trinet-blue inline"><strong>Sorry. Your Request is not processed successfully. Try again.<a class="inline Trinet-orange" href="' + baseUrl + '">Return</a><strong></p>');
                            $scope.errorAlert = data;
                        }
                    );
                };
            }]);