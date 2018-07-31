/**
 Description: This is controller used to fetch/delete address details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('addressCtrl', [
    '$scope', 'genericService', 'gso', '$anchorScroll', '$location','SharedDataService',
    function ($scope, genericService, gso, $anchorScroll, $location,SharedDataService) {
        /*if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }*/

        if (SharedDataService.getAppSharedData().countryCode === 'US') {
            $scope.isUSCountry = true;
        } else if (SharedDataService.getAppSharedData().countryCode === 'CA') {
            $scope.isCACountry = true;
        }

        var appUserId = $scope.appUserId,
            companyId = gso.getAppConfig().companyId;
        $scope.getLabelState = null;

        /*
         * Operations performed when user changes dates.
         */

        $scope.dateChange = function (label) {

            var result = gso.getUtilService().showHideDelete(label);
            $scope.changeDeleteLableAddress(result.hideDelete);
            $scope.getLabelState = label.effDateLabel;
            if ($scope.getLabelState !== 'undefined' && $scope.getLabelState !== null) {
                if ($scope.getLabelState.slice(0, 9) === "Effective") {
                    angular.forEach($scope.addressList, function (obj, index) {
                        if (obj.effDateLabel === $scope.getLabelState) {
                            result.index = index;
                            return;
                        }
                    });
                } else {
                    result.index = 0;
                }
            }

            $scope.selectedAddressData = $scope.addressList[result.index];

            gso.getAPIConfigDataService().getCountries().then(function(response) {
                $scope.countriesData = response;
                if ($scope.selectedAddressData !== undefined && $scope.selectedAddressData !== null) {
                    if (new Date($scope.selectedAddressData.effectiveDate).getTime() < new Date().getTime()) {
                        $scope.effectiveDate = gso.getUtilService().filterToDayDate();
                    } else {
                        $scope.effectiveDate = new Date($scope.selectedAddressData.effectiveDate);
                    }
                    angular.forEach($scope.countriesData, function (input) {
                        if (input.key === $scope.selectedAddressData.countryCode) {
                            $scope.selectedAddressData.country = input;
                            $scope.populateStates(input);
                        }
                    });
                }
            });
            SharedDataService.getAppSharedData().addressSelectedeffdate= result.index;
            $scope.selectedObject();

        };
        $scope.editAddress = function () {
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/personal/address/addressModelView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
            $scope.editSelectedData = angular.copy($scope.selectedAddressData);
            if ($scope.selectedAddressData.county === 'US') {
                $scope.isUSCountry = true;
                $scope.isCACountry = false;
            } else if ($scope.selectedAddressData.county === 'CA') {
                $scope.isCACountry = true;
                $scope.isUSCountry = false;
            }
        };

        /*
         * Show/Hide Time-line.
         */

        $scope.showHideTimeline = function () {
            $scope.showTimeline = !$scope.showTimeline;
        };

        /*
         * Selects object based on date drop-down.
         */

        $scope.selectedObject = function () {
            var addressDetails = [];
            if ($scope.selectedAddressData !== undefined) {
                if ($scope.addressData.activeAddressList) {
                    if ($scope.selectedAddressData.effDateLabel === undefined || $scope.selectedAddressData.effDateLabel === "Currently Effective") {
                        addressDetails.push($scope.addressData.activeAddressList[0]);
                    } else {
                        angular.forEach($scope.addressData.activeAddressList, function (obj, index) {
                            if (gso.getUtilService().checkTwoDates($scope.selectedAddressData.effectiveDate, obj.effectiveDate)) {
                                addressDetails.push($scope.addressData.activeAddressList[index]);
                            }
                        });
                        var firstObj = addressDetails.splice(0, 1)[0];
                        addressDetails.push(firstObj);
                    }
                }

                angular.forEach($scope.addressData.historyAddressList, function (input) {
                    addressDetails.push(input);
                });
                $scope.addressDetails = addressDetails;
                var addressDetailTimeline = angular.copy(addressDetails);
                for (var s = 0; s < addressDetailTimeline.length; s++) {
                    if (addressDetailTimeline[s].oldeffectiveDate !== undefined) {
                        addressDetailTimeline[s].effectiveDate = addressDetailTimeline[s].oldeffectiveDate;
                        break;
                    }
                }
                $scope.addressDetailTimeline = gso.getUtilService().effectiveDateCheck(addressDetailTimeline);
            }
        };

        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
            $scope.editSelectedData = angular.copy($scope.selectedAddressData);
            if ($scope.selectedAddressData.county === 'US') {
                $scope.isUSCountry = true;
                $scope.isCACountry = false;
            } else if ($scope.selectedAddressData.county === 'CA') {
                $scope.isCACountry = true;
                $scope.isUSCountry = false;
            }
        };

        $scope.confirm = {
            title: 'confirmation',
            message: profile.address.confirmDelete
        };

        /*
         * Deletes address.
         */

        $scope.deleteAddress = function () {
            $scope.confirmMessage = 'Are you sure you want to delete the address?';
            $scope.yes_btn = 'Delete';
            $scope.no_btn = 'Cancel';
            gso.getNGDialog().openConfirm({
                template: 'app/shared/views/confirmAlert.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            }).then(
                function () {
                    $scope.selectedAddressData.country = typeof $scope.selectedAddressData.country === 'object' ? $scope.selectedAddressData.country.key : $scope.selectedAddressData.country;
                    if (angular.isObject($scope.selectedAddressData.stateProvince)) {
                        $scope.selectedAddressData.stateProvince = $scope.selectedAddressData.stateProvince.key;
                    } else {
                        $scope.selectedAddressData.stateProvince = '';
                    }
                    delete $scope.selectedAddressData.effDateLabel;

                    gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                        companyId + '/' + appUserId + profileUrlConfig.resources.address + '/' + $scope.selectedAddressData.effectiveDate, $scope.selectedAddressData, function (response) {

                        SharedDataService.getAppSharedData().sMessage =JSON.stringify(response);
                        gso.getUtilService().routeReloadTimeOut();
                    }, function (data) {
                        SharedDataService.getAppSharedData().sMessage=  JSON.stringify(data);
                        gso.getUtilService().routeReloadTimeOut();
                    });
                });
        };
    }
]);
