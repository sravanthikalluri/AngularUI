/**
 Description: This is controller used to fetch/delete the personal status details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('personalStatusCtrl', ['$scope', 'gso', 'genericService', 'SharedDataService',
    function ($scope, gso, genericService, SharedDataService) {
        $scope.personalStatusSection = false;
        /*if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }*/
        $scope.ssnAvailable = false;

        var appUserId = $scope.appUserId,
            companyId = gso.getAppConfig().companyId;
        $scope.hideDelete = true;

        $scope.init = function () {
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                companyId + '/' + appUserId + profileUrlConfig.resources.personalStatus, null, function (ssn) {
                $scope.snnOriginal=angular.copy(ssn.nationalIds.id);
                $scope.ssn = '';
                var ssnId = ssn.nationalIds.id;

                if (ssnId !== null && ssnId !== '' && ssnId !== undefined) {
                    $scope.ssn = '*****' + ssnId.substring(ssnId.length - 4, ssnId.length);
                    $scope.ssnAvailable = true;
                } else {
                    $scope.ssn = '';
                }

                if (ssn.nationalIds.country === 'CA') {
                    $scope.canadaCountrySSNStatus = true;
                } else if (ssn.nationalIds.country === 'US') {
                    $scope.usCountrySSNStatus = true;
                }

            }, function (data) {
                $scope.ssnAvailable = false;
                if(data._statusCode === '403'){
                    $scope.errorStatus = false;
                }
                //$scope.childParentAlertMsg(data);
            });

            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile + companyId + '/' + appUserId + profileUrlConfig.resources.citizenship, null, function (response) {
                $scope.citizenShipInfo = response.workEligibility;
            });

            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.personalstatus, null, function (personalStatusData) {
                $scope.personalStatusData = personalStatusData;
                $scope.personalStatusData.personalStatus = personalStatusData.activePersonalDataList;
                $scope.alternateId = $scope.personalStatusData.personalStatus[0].alternateId;
                gso.getAPIConfigDataService().getMaritalStatus().then(function(response) {
                        if (angular.isObject($scope.personalStatusData.personalStatus)) {
                            $scope.maritalStatusData = response;
                            angular.forEach($scope.maritalStatusData, function (input) {
                                if (input.key === $scope.personalStatusData.personalStatus[0].maritalStatus) {
                                    $scope.personalStatusData.personalStatus[0].maritalStatus = input;
                                    $scope.personalStatusData.activePersonalDataList[0].maritalStatus = input.value;
                                    return;
                                }
                                if (input.value === " " || input.value === null) {
                                    $scope.personalStatusData.activePersonalDataList[0].maritalStatus = "No Military Service";
                                }

                            });
                        }
                    });

                    genericService.militaryStatus(gso.getAppConfig().countryCode).then(function (data) {
                        if (angular.isObject($scope.personalStatusData.personalStatus)) {
                            $scope.militaryStatusData = data.data.data;
                            angular.forEach($scope.militaryStatusData, function (input) {
                                if (input.key === $scope.personalStatusData.personalStatus[0].militaryStatus) {
                                    $scope.personalStatusData.personalStatus.militaryStatus = input.value;
                                    $scope.personalStatusData.activePersonalDataList[0].militaryStatus = input.value;
                                    return;
                                }

                                if (input.value === " " || input.value === null) {
                                    $scope.personalStatusData.activePersonalDataList[0].militaryStatus = "No Military Service";
                                }

                            });
                        }
                    }, function (errorRes) {
                        $scope.personalStatusData.activePersonalDataList[0].militaryStatus = '---';
                    });
            }, function (data) {
                $scope.personalStatusSection = true;
                //$scope.childParentAlertMsg(data);
            });

        };

        $scope.init();

        $scope.dateChange = function () {
            var index = angular.element("#status_effective_date").val();
            $scope.selectedStatusData = $scope.personalStatusList[index];
            if (index > 0) {
                $scope.hideDelete = false;
            } else {
                $scope.hideDelete = true;
            }
        };

        $scope.showHideTimeline = function () {
            $scope.showTimeline = true;
        };

        $scope.visible = false;
        $scope.toggle = function () {
            $scope.isPersonalStatusFormSubmitted = false;
            $scope.visible = !$scope.visible;
        };

        $scope.editPersonalView = function () {
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/personal/personalStatus/personalStatusModelView.html',
                scope: $scope,
                closeByDocument: false
            });
        };
        $scope.deletePerson = function () {
            if (confirm(profile.personalStatus.deleteConfirm)) {
                gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.personal, null, function (response) {
                    $scope.childParentAlertMsg(response);
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });
            }
        };

        $scope.selectedObject = function () {
            var statusDetails = [];
            if ($scope.selectedStatusData !== undefined) {
                var selectedDate = $scope.selectedDate = new Date($scope.selectedStatusData.effectiveDate);
                angular.forEach($scope.personalStatusData.data.activeStatusList, function (input) {
                    var formatted = new Date(input.effectiveDate);
                    if (formatted.getTime() <= selectedDate.getTime()) {
                        statusDetails.push(input);
                    }
                });
                angular.forEach($scope.personalStatusData.data.historyStatusList, function (input) {
                    var formatted = new Date(input.effectiveDate);
                    if (formatted.getTime() <= selectedDate.getTime()) {
                        statusDetails.push(input);
                    }
                });
                $scope.statusDetails = statusDetails;
                var length = $scope.statusDetails.length;
                for (var i = 0; i < length; i++) {
                    $scope.date1 = new Date($scope.statusDetails[i].effectiveDate);
                    $scope.date2 = new Date($scope.selectedStatusData.effectiveDate);
                    if ((angular.isUndefined($scope.date1) && angular.isUndefined($scope.date2))) {
                        if ($scope.date1.getTime() >= $scope.date2.getTime()) {
                            $scope.effective = "effective since";
                        } else {
                            $scope.effective = "effective on";
                        }
                    } else {
                        $scope.effective = "effective since";
                    }
                }
            }
        };
    }]);
