'use strict';
trinetApp.controller('personalInfoModelCtrl', ['$scope', 'genericService', 'gso','SharedDataService',
    function ($scope, genericService, gso,SharedDataService) {
        if (SharedDataService.getAppSharedData().countryCode === 'CA') {
            $scope.canadaCountrySSNStatus = true;
        } else if (SharedDataService.getAppSharedData().countryCode=== 'US') {
            $scope.usCountrySSNStatus = true;
        }
        /*if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }*/
        $scope.isPersonalInforSubmitted = false;
        $scope.minDate = new Date();
        $scope.minDate.setDate($scope.minDate.getDate());
        $scope.selectedInfoData.effectiveDate = $scope.minDate;
        var appUserId = $scope.appUserId,
            companyId = gso.getAppConfig().companyId;
        $scope.declineEthinicity = false;

        gso.getAPIConfigDataService().getMaritalStatus().then(function(response) {
            $scope.maritalStatusData = response;
            var key = $scope.selectedInfoData.maritalStatus || 'U';
            key = (typeof key === 'object') ? key.key : key;
            var tempArr = $scope.maritalStatusData.filter(function (maritalObj) {
                return maritalObj.key === key;
            });
            $scope.selectedInfoData.maritalStatus = angular.copy(tempArr[0]);
        });

        genericService.militaryStatus(gso.getAppConfig().countryCode).then(function (data) {
            $scope.militaryStatusData = data.data.data;
            var key = $scope.selectedInfoData.militaryStatus || '1';
            key = (typeof key === 'object') ? key.key : key;
            var tempArr = $scope.militaryStatusData.filter(function (maritalObj) {
                return maritalObj.key === key;
            });
            $scope.selectedInfoData.militaryStatus = angular.copy(tempArr[0]);
        });

        gso.getAPIConfigDataService().getDateOfBirth().then(function(response) {
            $scope.monthData = response.month;
            $scope.dateData = response.date;
            var yearData = [];
            var currentDate = new Date();

            for (var i = constants.yearStart; i <= currentDate.getFullYear(); i++) {
                yearData.push(
                    {
                        key: i.toString(),
                        value: i.toString()
                    }
                );
            }
            $scope.yearData = yearData;
            if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                var birthDate, month, date, year;
                if ($scope.selectedInfoData.birthDate.indexOf('/') > -1) {
                    birthDate = $scope.selectedInfoData.birthDate.split('/');
                } else {
                    birthDate = $scope.selectedInfoData.birthDate.split('-');
                }
                $scope.effectiveDate = new Date($scope.selectedInfoData.effectiveDate);
                month = parseInt(birthDate[1], 10) + '';
                date = parseInt(birthDate[2], 10);
                year = birthDate[0];
                angular.forEach($scope.monthData, function (input) {

                    if (input.id === parseInt(month, 10)) {
                        $scope.selectedInfoData.month = input;
                    }
                });

                angular.forEach($scope.dateData, function (input) {
                    if (input.id === date) {
                        $scope.selectedInfoData.date = input;
                    }
                });

                angular.forEach($scope.yearData, function (input) {
                    if (input.key === year) {
                        $scope.selectedInfoData.year = input;
                    }
                });
            }
        });

        gso.getAPIConfigDataService().getGenders().then(function(response) {
            $scope.gender = response;
            if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                angular.forEach($scope.gender, function (input) {
                    if (input.key === $scope.selectedInfoData.gender) {
                        $scope.selectedInfoData.gender = input;
                        $scope.selectedInfoData.selectedGender = input.key;
                    }
                });
            }
        });
        genericService.ethnicity(gso.getAppConfig().countryCode).then(function (data) {
                $scope.ethnicityData = data.data.data;
                var index = $scope.ethnicityData.findIndex(function (index, obj) {
                    return obj.key === 'NSPEC';
                });
                $scope.ethnicityData.splice(index, 1);
                if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                    angular.forEach($scope.ethnicityData, function (input) {
                        if (input.key === $scope.selectedInfoData.ethinicity) {
                            $scope.selectedInfoData.ethnicity = input;
                        }
                    });
                }
            }
        );

        $scope.updatePersonalInfo = function (formName) {
            $scope.isPersonalInforSubmitted = true;
            var fieldsArray = ['personalInfoPastdate','personalInfoFormFuturedate'];
            if (!formName.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.personalInfo.blur,fieldsArray) ) {
                gso.getUtilService().focusInvalidElement('form#personal_info_form');
                $scope.onFocus('personalInfo', $scope.validationPatterns.personalInfo.focus);
                var customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: 'This page contains errors. Please correct the errors below.'
                };
                $scope.childParentAlertMsg(customIdAlert);
            } else {
                $scope.saveData();
            }

        };

        $scope.saveData = function () {
            var date = new Date(angular.element('#info_edit_effective_date').val());
            var effectiveDate = gso.getUtilService().filterDate(date, constants.dateFormat);
            SharedDataService.getAppSharedData().personalInfoSelectedeffdate= 1;
            var ageLimit = 14;
            if ($scope.selectedInfoData.month === undefined ||
                $scope.selectedInfoData.date === undefined ||
                $scope.selectedInfoData.year === undefined) {

                var alert = {
                    _statusCode: constants.warning,
                    _statusMessage: profile.personalInfo.birthDateAlert
                };
                $scope.childParentAlertMsg(alert);
            }
            if (parseInt((new Date().getFullYear() - ageLimit), 10) < $scope.selectedInfoData.year.key) {
                var invalidBirthDateAlert = {
                    _statusCode: "400",
                    _statusMessage: profile.personalInfo.invalidBirthDateAlert
                };
                $scope.childParentAlertMsg(invalidBirthDateAlert);
                return;
            }
            var birthDate = $scope.selectedInfoData.month.id + '/' +
                $scope.selectedInfoData.date.id + '/' +
                $scope.selectedInfoData.year.key;

            var saveData = {};
            saveData.gender = $scope.selectedInfoData.gender.key;
            saveData.birthDate = gso.getUtilService().filterDate(new Date(birthDate), constants.dateFormat);
            saveData.effectiveDate = effectiveDate;
            saveData.ethnicity = $scope.selectedInfoData.ethnicity.key;
            saveData.employeeId = appUserId;
            saveData.uniqueId = gso.getUtilService().isDefined($scope.selectedInfoData.uniqueId, 1);
            if ($scope.selectedInfoData.militaryStatus) {
                saveData.militaryStatus = $scope.selectedInfoData.militaryStatus.key;
            }
            if ($scope.selectedInfoData.maritalStatus) {
                saveData.maritalStatus = $scope.selectedInfoData.maritalStatus.key;
            }

            if (!$scope.selectedInfoData.militaryStatus) {
                saveData.militaryStatus = '2';
            }

            saveData.country = gso.getUtilService().isDefined($scope.selectedInfoData.country, "US");

            gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                companyId + '/' + appUserId + profileUrlConfig.resources.personalInfo + '?effectivedate=', saveData, function (response) {
                SharedDataService.getAppSharedData().sMessage= JSON.stringify(response);
                gso.getUtilService().routeReloadTimeOut();
                $scope.closeThisDialog();
                $scope.getPersonaInformation();
            }, function (data) {
                $scope.childParentAlertMsg(data);
            });
        };

        $scope.submitForm = function () {
            $scope.submitted = true;
        };

        $scope.disableEthinicity = function () {
            $scope.confirmMessage = $scope.translation.profile_personal.ethnicity_msg;
            $scope.yes_btn = 'OK';
            $scope.no_btn = 'Cancel';
            gso.getNGDialog().openConfirm({
                template: 'app/shared/views/confirmAlert.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            }).then(function () {
                $scope.declineEthinicity = true;
                $scope.checked = true;
            }, function () {
                $scope.declineEthinicity = false;
                $scope.checked = false;
            });
        };

        $scope.cancel = function () {
            $scope.isPersonalInforSubmitted = false;
            $scope.toggle();
            gso.getUtilService().routeReloadTimeOut();
        };
        $scope.checkDate = function (date) {
            if (new Date().setDate(new Date().getDate()) >= new Date(date)) {
                return true;
            }
            return false;
        };

        $scope.validationPatterns = {
            personalInfo: {
                blur: {
                    personalInfoFormeffectiveDateRequired: null,
                    personalInfoFormbirthdateRequired: null,
                    personalInfoFormdateinfoRequired: null,
                    personalInfoFormyearinfoRequired: null,
                    personalInfoFormethnicityRequired: null,
                    personalInfoPastdate:null,
                    personalInfoFormFuturedate:null,
                    personalInfoFormssnRequired:null,
                    personalInfoFormalternateIdRequired:null,
                    personalInfoFormalternateIdPatternRequired:null,
                    personalInfoFormmaritalstsRequired:null,
                    personalInfoFormMilitarystsRequired:null
                },
                focus: {
                    personalInfoFormeffectiveDateRequired: null,
                    personalInfoFormbirthdateRequired: null,
                    personalInfoFormdateinfoRequired: null,
                    personalInfoFormyearinfoRequired: null,
                    personalInfoFormethnicityRequired: null,
                    personalInfoFormssnRequired: null,
                    personalInfoFormalternateIdRequired: null,
                    personalInfoFormalternateIdPatternRequired:null,
                    personalInfoFormmaritalstsRequired:null,
                    personalInfoFormMilitarystsRequired:null
                }
            }
        };
        $scope.changeSSN = function () {
            gso.getNGDialog().openConfirm(
                {
                    template: 'app/shared/views/confirmAlert.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                }).then(
                function () {
                }
            );
        };
        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'personalInfo') {
                $scope.validationPatterns.personalInfo.focus = temp;
            }
        };

    }]);
