/**
 Description: This is controller used to update name details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller(
    'namesModelCtrl', ['$scope', 'gso','SharedDataService',
        function ($scope, gso,SharedDataService) {
           /* if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
            }*/
            $scope.isModelNameSubmitted = false;
            //$scope.minDate = new Date(gso.getUtilService().convertToServerTimeZone());
            //$scope.minDate.setDate($scope.minDate.getDate() + 1);
            //$scope.primaryNameModelData.effectiveDate = $scope.minDate;
            var appUserId = $scope.appUserId,
                companyId = gso.getAppConfig().companyId;
            SharedDataService.getAppSharedData().myProfileNameListIndex = null;
            $scope.selectedTab = null;
            $scope.editData();
            $scope.updateData = function (formName) {
                $scope.isModelNameSubmitted = true;
                $scope.submitted = true;
                var fieldsArray = ['primaryNameFuturedate', 'primaryNamepastdate'];
                if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.preferredNameEdit.blur, fieldsArray)) {
                    gso.getUtilService().focusInvalidElement('form#primary_name_form');
                    $scope.onFocus('preferredNameEdit', $scope.validationPatterns.preferredNameEdit.focus);
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
                var foa = angular.isObject($scope.primaryNameModelData.formOfAddress) ? $scope.primaryNameModelData.formOfAddress.key : "";
                var suffix = angular.isObject($scope.primaryNameModelData.suffix) ? $scope.primaryNameModelData.suffix.key : "";
                if ($scope.primaryNameModelData.oldeffectiveDate !== undefined) {
                    delete $scope.primaryNameModelData.oldeffectiveDate;
                }
                delete $scope.primaryNameModelData.effDateLabel;
                var updatedData = angular.copy($scope.primaryNameModelData);

                updatedData.formOfAddress = foa;
                updatedData.suffix = suffix;
                updatedData.nameType = "PRI";
                updatedData.effectiveDate = gso.getUtilService().filterDate($scope.primaryNameModelData.effectiveDate, constants.dateFormat);


                gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.name, updatedData, function (response) {
                    $scope.primaryContact = true;
                    SharedDataService.getAppSharedData().sMessage=JSON.stringify(response);
                    SharedDataService.getAppSharedData().primNameSelectedeffdate= 1;
                    gso.getUtilService().routeReloadTimeOut();
                    $scope.closeThisDialog();
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });
            };

            $scope.cancel = function () {
                $scope.isModelNameSubmitted = false;
                $scope.togglePrimaryName();
            };

            $scope.submitForm = function () {
                $scope.submitted = true;
            };
            $scope.validationPatterns = {
                preferredNameEdit: {
                    blur: {
                        primaryNameFormeffDateRequired: null,
                        primarypastdate: null,
                        primaryNameFormfirstNameRequired: null,
                        primaryNameFormlastNameRequired: null,
                        primaryNamepastdate: null,
                        primaryNameFuturedate: null
                    },
                    focus: {
                        primaryNameFormeffDateRequired: null,
                        primarypastdate: null,
                        primaryNameFormfirstNameRequired: null,
                        primaryNameFormlastNameRequired: null,
                        primaryNamepastdate: null,
                        primaryNameFuturedate: null
                    }
                }
            };

            $scope.onFocus = function (name, object) {
                var temp = {};
                angular.forEach(object, function (value, key) {
                    temp[key] = false;
                });

                if (name === 'preferredNameEdit') {
                    $scope.validationPatterns.preferredNameEdit.focus = temp;
                }
            };

        }]);
