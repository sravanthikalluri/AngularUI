/**
 Description: This is controller used to update address details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller(
    'addressModelCtrl', ['$scope', 'gso', 'genericService', '$location','utilService','SharedDataService',
        function ($scope, gso, genericService, $location,utilService,SharedDataService) {
            $scope.isAddressFormSubmitted = false;
            var oldStateData;
            $scope.getStates = function (country) {
                if (country !== undefined && country.key === 'US') {
                    $scope.isUSCountry = true;
                    $scope.isCACountry = false;
                } else if (country !== undefined && country.key === 'CA') {
                    $scope.isCACountry = true;
                    $scope.isUSCountry = false;
                }
                if (!angular.isDefined(country)) {
                    $scope.isUSCountry = true;
                    $scope.isCACountry = false;
                    return;
                }
                genericService.states(country.key).then(function (data) {
                    $scope.statesData = data.data.data;
                    angular.forEach($scope.statesData, function (state, index) {
                        if (state.key === ($scope.editSelectedData.state || $scope.editSelectedData.stateProvince)) {
                            $scope.editSelectedData.stateProvince = $scope.statesData[index];
                            oldStateData = angular.copy($scope.editSelectedData);
                            return;
                        }
                    });
                });

            };

            $scope.getDate = function (value) {
                $scope.editSelectedData.effectiveDate = value;
            };
            angular.forEach($scope.countriesData, function (country, index) {
                if (typeof $scope.editSelectedData.country === 'object' && country.key === $scope.editSelectedData.country.key) {
                    $scope.editSelectedData.country = $scope.countriesData[index];
                    $scope.getStates($scope.editSelectedData.country);
                }

                if (country.key === $scope.editSelectedData.country){
                    $scope.editSelectedData.country = $scope.countriesData[index];
                    $scope.getStates($scope.editSelectedData.country);
                }
            });
           /* if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
            }*/
            $scope.minDate = new Date();
            var appUserId = $scope.appUserId,
                companyId = gso.getAppConfig().companyId;
            /*
             * Updates Data.
             */

            $scope.updateData = function (formName) {
                $scope.isAddressFormSubmitted = true;
                $scope.$parent.visible = !$scope.$parent.visible;
                if (angular.element('#stateProvince')[0] && angular.element('#stateProvince')[0].value === "?") {
                    $scope.editSelectedData.stateProvince = null;
                }

                $scope.submitted = true;
                 var fieldsArray = ['addressFormFuturedate','addressFormpastdate'];

                if (angular.element('#address_edit_effective_date').val() === "" || !formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.addressEdit.blur,fieldsArray)) {
                    if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.addressEdit.blur,fieldsArray) ) {
                        gso.getUtilService().focusInvalidElement('form#address_form');
                        $scope.onFocus('addressEdit', $scope.validationPatterns.addressEdit.focus);
                        var customIdAlert = {
                            _statusCode: '400',
                            _statusMessage: 'This page contains errors. Please correct the errors below.'
                        };
                        $scope.childParentAlertMsg(customIdAlert);
                    }
                }
                else {
                    if (!formName.$valid && typeof $scope.editSelectedData.effectiveDate === 'string') {
                        gso.getUtilService().focusInvalidElement('form#address_form');
                    } else {
                        $scope.saveData();
                    }
                }

            };


            $scope.saveData = function () {
                if ($scope.editSelectedData.oldeffectiveDate !== undefined) {
                    delete $scope.editSelectedData.oldeffectiveDate;
                }
                var effectiveDate = gso.getUtilService().filterDate($scope.editSelectedData.effectiveDate, constants.dateFormat);
                var stateProvince = $scope.editSelectedData.stateProvince.key;
                var country = $scope.editSelectedData.country.key;
                var stateProvinceDesc= $scope.editSelectedData.stateProvince.value;
                var addressData = angular.copy($scope.editSelectedData);
                addressData.employeeId = appUserId;
                addressData.effectiveDate = effectiveDate;
                addressData.stateProvinceCodeDesc=stateProvinceDesc;
                addressData.county = country;
                addressData.country = country;
                addressData.stateProvince = stateProvince;
                addressData.state = stateProvince;
                addressData.approvalStatus = gso.getUtilService().isDefined(addressData.approvalStatus, 'F');
                addressData.primaryInd = gso.getUtilService().isDefined($scope.editSelectedData.primaryInd, 0);
                addressData.addressType = gso.getUtilService().isDefined($scope.editSelectedData.addressType, "HOME");
                addressData.uniqueId = gso.getUtilService().isDefined($scope.editSelectedData.uniqueId, "");
                addressData.stateProvince = gso.getUtilService().isDefined(addressData.stateProvince, null);
                addressData.oldState = oldStateData.stateProvince.key;
                addressData.oldStateDesc = oldStateData.stateProvince.value;
                delete addressData.effDateLabel;
                gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.address, addressData, function (response) {

                    SharedDataService.getAppSharedData().sMessage = JSON.stringify(response);
                    gso.getUtilService().routeReloadTimeOut();
                    SharedDataService.getAppSharedData().addressSelectedeffdate= 1;
                    $scope.closeThisDialog();
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });
            };

            $scope.cancel = function () {
                $scope.isAddressFormSubmitted = false;
                $scope.closeThisDialog();
            };
            $scope.submitForm = function () {
                $scope.submitted = true;
            };



            $scope.validationPatterns = {
                addressEdit: {
                    blur: {
                        addressFormeffectiveDateRequired: null,
                        addressFormpastdate: null,
                        addressFormstreetRequired: null,
                        addressFormcityRequired: null,
                        stateProvinceRequired: null,
                        addressFormpostalCodeRequired: null,
                        addressFormcountryRequired: null,
                        addressFormpostalCodePattern: null,
                        addressFormDateFormat:null,
                        addressFormFuturedate:null,
                        addressFormpostalCodeMinLength: null,
                        addressFormpostalCodeMaxLength: null
                    },
                    focus: {
                        addressFormeffectiveDateRequired: null,
                        addressFormpastdate: null,
                        addressFormstreetRequired: null,
                        addressFormcityRequired: null,
                        stateProvinceRequired: null,
                        addressFormpostalCodeRequired: null,
                        addressFormcountryRequired: null,
                        addressFormpostalCodePattern: null,
                        addressFormDateFormat:null,
                        addressFormFuturedate:null,
                        addressFormpostalCodeMinLength: null,
                        addressFormpostalCodeMaxLength: null
                    }
                }
            };

            $scope.onFocus = function (name, object) {
                var temp = {};
                angular.forEach(object, function (value, key) {
                    temp[key] = false;
                });

                if (name === 'addressEdit') {
                    $scope.validationPatterns.addressEdit.focus = temp;
                }
            };
            $scope.checkDateFormat = function(data){
                var dateBoolValue =  false;
                if(angular.element("#address_edit_effective_date").val() !== utilService.filterDate(new Date(data),'MM/dd/yyyy')){
                    dateBoolValue = true;
                }
                return dateBoolValue;
            };
        }]);
