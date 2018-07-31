/**
 Description: This is controller used to update preferred name details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('namesPreferredModelCtrl', ['$scope', 'gso','SharedDataService',
    function ($scope, gso,SharedDataService) {

        /*if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }*/
        $scope.isPreferredNameSubmitted = false;
        var appUserId = $scope.appUserId,
            companyId = gso.getAppConfig().companyId;

        /*$scope.minDate = new Date(gso.getUtilService().convertToServerTimeZone());
        $scope.minDate.setDate($scope.minDate.getDate() + 1);
        if ($scope.preferredNameData) {
            $scope.preferredNameData.effectiveDate = $scope.minDate;
        }*/

        function init() {
            if ((((typeof $scope.preferredNameEditData.suffix === 'object' && $scope.preferredNameEditData.suffix!==null) ? $scope.preferredNameEditData.suffix.key : $scope.preferredNameEditData.suffix) === $scope.primaryNameData.suffix) && ($scope.preferredNameEditData.lastName === $scope.primaryNameData.lastName) && ($scope.preferredNameEditData.middleName === $scope.primaryNameData.middleName) && ($scope.preferredNameEditData.firstName === $scope.primaryNameData.firstName)) {
                $scope.isPreferred = true;
            }
        }

        init();

        $scope.showPrimaryInfo = function () {
            var selectedSuffix = $scope.suffixData.filter(function (obj) {
                return obj.key === $scope.primaryNameData.suffix;
            });
            $scope.preferredNameEditData.suffix = selectedSuffix && selectedSuffix[0];
            $scope.preferredNameEditData.lastName = $scope.primaryNameData.lastName;
            $scope.preferredNameEditData.middleName = $scope.primaryNameData.middleName;
            $scope.preferredNameEditData.firstName = $scope.primaryNameData.firstName;
        };
        $scope.updateData = function (formName) {
            $scope.isPreferredNameSubmitted = true;
            $scope.$parent.visible = !$scope.$parent.visible;

            $scope.submitted = true;
            var fieldsArray = ['preferredNameFuturedate','preferredNamepastdate'];
            if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.primaryNameEdit.blur,fieldsArray)) {
                gso.getUtilService().focusInvalidElement('form#preferred_name_form');
                $scope.onFocus('primaryNameEdit', $scope.validationPatterns.primaryNameEdit.focus);
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
                $scope.childParentAlertMsg(customIdAlert);
            } else {
                $scope.saveData();
            }
        };

        $scope.saveData = function () {
            $scope.preferredNameData = angular.copy($scope.preferredNameEditData);
            if ($scope.preferredNameData.oldeffectiveDate !== undefined) {
                delete $scope.preferredNameData.oldeffectiveDate;
            }
            var foa = angular.isObject($scope.preferredNameData.formOfAddress) ? $scope.preferredNameData.formOfAddress.key : "";
            var suffix = angular.isObject($scope.preferredNameData.suffix) ? $scope.preferredNameData.suffix.key : "";
            var middleName = ($scope.preferredNameData.middleName === "" || $scope.preferredNameData.middleName === null) ? '' : $scope.preferredNameData.middleName;

            var updatedPreferredData = angular.copy($scope.preferredNameData);
            updatedPreferredData.suffix = suffix;
            updatedPreferredData.formOfAddress = foa;
            updatedPreferredData.middleName = middleName;
            updatedPreferredData.nameType = "PRF";
            updatedPreferredData.effectiveDate = gso.getUtilService().filterDate($scope.preferredNameData.effectiveDate, constants.dateFormat);

            gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                companyId + '/' + appUserId + profileUrlConfig.resources.name, updatedPreferredData, function (response) {
                SharedDataService.getAppSharedData().sMessage= JSON.stringify(response);
                gso.getUtilService().routeReloadTimeOut();
                $scope.closeThisDialog();
            }, function (data) {
                $scope.childParentAlertMsg(data);
            });
        };

        $scope.cancelPreferred = function () {
            $scope.isPreferredNameSubmitted = false;
            $scope.togglePreferredName();
        };

        $scope.submitForm = function () {
            $scope.submitted = true;
        };

        $scope.validationPatterns = {
            primaryNameEdit: {
                blur: {
                    preferredNameFormeffDateRequired: null,
                    preferredNameFormFirstNameRequired: null,
                    preferredNameFormLastNameRequired: null,
                    preferredNameFuturedate:null,
                    preferredNamepastdate: null
                },
                focus: {
                    preferredNameFormeffDateRequired: null,
                    preferredNameFormFirstNameRequired: null,
                    preferredNameFormLastNameRequired: null,
                    preferredNameFuturedate:null,
                    preferredNamepastdate: null
                }
            }
        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'primaryNameEdit') {
                $scope.validationPatterns.primaryNameEdit.focus = temp;
            }
        };

    }]);
