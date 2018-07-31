'use strict';
trinetApp.controller('personalStatusModelCtrl', ['$scope', 'genericService', 'gso','SharedDataService',
    function ($scope, genericService, gso,SharedDataService) {
        $scope.personalModelStatusData = {};
        $scope.isPersonalStatusFormSubmitted = false;
        $scope.isSsnValid = false;
        var appUserId = $scope.appUserId;
        if ($scope.citizenShipInfo) {
            $scope.personalModelStatusData.citizenship = $scope.citizenShipInfo.citizenshipStatus;
        }

        $scope.changeSSN = function (val) {
            $scope.ssn = val;
            if($scope.ssn) {
                $scope.isSsnValid = !(/^\d+$/.test($scope.ssn));
                return $scope.isSsnValid;
            }
            else false;
        };

        $scope.updatePersonalStatus = function (formName) {
            $scope.isPersonalStatusFormSubmitted = true;

            if(formName.personalInfoSsn?formName.personalInfoSsn.$dirty:false)
            {
                $scope.isSsnValid = !(/^\d+$/.test($scope.ssn));
            }

            if (!formName.$valid || $scope.isSsnValid) {
                gso.getUtilService().focusInvalidElement('form#personalStatusForm');
                $scope.onFocus('personalStatus', $scope.validationPatterns.personalStatus.focus);
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: 'This page contains errors. Please correct the errors below.'
                };
                $scope.childParentAlertMsg(customIdAlert);
            } else {
                var updateData = {
                    employeeId: $scope.appUserId,
                    ssnId:formName.personalInfoSsn ?(formName.personalInfoSsn.$dirty?$scope.ssn :$scope.snnOriginal):null,
                    alternateId: $scope.alternateId,
                    country :SharedDataService.getAppSharedData().currentSelectedEmpCountrycode ?SharedDataService.getAppSharedData().currentSelectedEmpCountrycode :''
                };

                gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase + gso.getAppConfig().companyId + '/' + appUserId + profileUrlConfig.resources.personalStatusUpdate, updateData, function (response) {
                    SharedDataService.getAppSharedData().sMessage = JSON.stringify(response);
                    gso.getUtilService().routeReloadTimeOut();
                    $scope.closeThisDialog();
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });
            }

        };

        $scope.submitForm = function () {
            $scope.submitted = true;
        };

        $scope.validationPatterns = {
            personalStatus: {
                blur: {
                    personalStatusFormAlternateIdRequired: null,
                    personalStatusFormSSNRequired: null,
                    personalStatusFormAlternateIdPatternRequired: null,
                    ssnMinLength: null,
                    ssnMaxLength: null
                },
                focus: {
                    personalStatusFormAlternateIdRequired: null,
                    personalStatusFormSSNRequired: null,
                    personalStatusFormAlternateIdPatternRequired: null,
                    ssnMinLength: null,
                    ssnMaxLength: null
                }
            }
        };
        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'personalStatus') {
                $scope.validationPatterns.personalStatus.focus = temp;
            }
        };
    }]);
