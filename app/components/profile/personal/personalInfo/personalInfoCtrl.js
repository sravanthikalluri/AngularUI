'use strict';
trinetApp
    .controller(
    'personalInfoCtrl', ['$scope', 'genericService', 'gso','SharedDataService',
        function ($scope, genericService, gso,SharedDataService) {
            $scope.hideDelete = true;
            $scope.personalInfoSection = false;
            $scope.errorStatus = true;
            $scope.getLabelState = null;

            /*if (typeof $scope.appUserId === 'undefined') {
             $scope.appUserId = gso.getAppConfig().userId;
             }*/
            if ($scope.selectedInfoData !== undefined) {
                $scope.hideDelete = gso.getUtilService().showHideDelete($scope.selectedInfoData).hideDelete;
            }
            $scope.showTimeline = false;
            var appUserId = $scope.appUserId,
                companyId = gso.getAppConfig().companyId;
            $scope.activePersonalDataListLength = 0;
            var generateDOB = function () {
                gso.getAPIConfigDataService().getDateOfBirth().then(function(response) {
                    $scope.monthData = response.month;
                    $scope.dateData = response.date;
                    var yearData = [];
                    var currentDate = new Date();
                    for (var i = parseInt(currentDate.getFullYear(), 10); i >= parseInt(constants.yearStart, 10); i--) {
                        yearData.push(
                            {
                                key: i.toString(),
                                value: i.toString()
                            }
                        );
                    }
                    $scope.yearData = yearData;
                    if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                        var birthDate = $scope.selectedInfoData.birthDate.split('-');
                        $scope.effectiveDate = new Date($scope.selectedInfoData.effectiveDate);

                        angular.forEach($scope.monthData, function (input) {
                            if (input.id === parseInt(birthDate[1], 10)) {
                                $scope.selectedInfoData.month = input;
                            }
                        });

                        angular.forEach($scope.dateData, function (input) {
                            if (input.id === birthDate[2]) {
                                $scope.selectedInfoData.date = input;
                            }
                        });

                        angular.forEach($scope.yearData, function (input) {
                            if (input.key === parseInt(birthDate[0], 10)) {
                                $scope.selectedInfoData.year = input;
                            }
                        });

                    }
                });

            };

            $scope.editPersonalView = function () {
                gso.getNGDialog().open({
                    templateUrl: 'app/components/profile/personal/personalInfo/personalInfoModelView.html',
                    scope: $scope,
                    closeByDocument: false
                });
            };
            function getMilitaryStatusValue(key) {
                key = (typeof key === 'object') ? key.key : key;
                genericService.militaryStatus(gso.getAppConfig().countryCode).then(function (data) {
                    $scope.militaryStatusData = data.data.data;
                    var tempArr = $scope.militaryStatusData.filter(function (militaryObj) {
                        return militaryObj.key === key;
                    });
                    $scope.militaryStatusValue = (tempArr && tempArr[0] && tempArr[0].value) ? tempArr[0].value : '';
                });
            }

            function getMaritalStatusValue(key) {
                key = (typeof key === 'object') ? key.key : key;
                gso.getAPIConfigDataService().getMaritalStatus().then(function(response) {
                    $scope.maritalStatusData = response;
                    var tempArr = $scope.maritalStatusData.filter(function (maritalObj) {
                        return maritalObj.key === key;
                    });
                    $scope.maritalStatusValue = (tempArr && tempArr[0] && tempArr[0].value) ? tempArr[0].value : '';
                });
            }

            $scope.getPersonaInformation = function () {
                $scope.visible = false;

                $scope.section = constants.sectionInfo;

                $scope.personalInfoData = gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.personalInfo + '?effectivedate=', null, function (personalInfoData) {

                    if (!gso.getUtilService().isNull(personalInfoData)) {
                        $scope.personalInfoData = personalInfoData;
                        gso.getAPIConfigDataService().getMaritalStatus().then(function(response) {
                            $scope.maritalStatusData = response;
                            var tempArr = $scope.maritalStatusData.filter(function (maritalObj) {
                                return maritalObj.key === $scope.personalInfoData.activePersonalDataList[0].maritalStatus;
                            });
                            $scope.selectedInfoData.maritalStatus = angular.copy(tempArr[0]);
                            $scope.maritalStatusValue = (tempArr && tempArr[0] && tempArr[0].value) ? tempArr[0].value : '' ;
                        });

                        genericService.militaryStatus(gso.getAppConfig().countryCode).then(function (data) {
                            $scope.militaryStatusData = data.data.data;
                            var tempArr = $scope.militaryStatusData.filter(function (maritalObj) {
                                return maritalObj.key === $scope.personalInfoData.activePersonalDataList[0].militaryStatus;
                            });
                            $scope.selectedInfoData.militaryStatus = angular.copy(tempArr[0]);
                            $scope.militaryStatusValue = (tempArr && tempArr[0] && tempArr[0].value) ? tempArr[0].value : '' ;
                        });
                        genericService.ethnicity(gso.getAppConfig().countryCode).then(function (data) {
                            $scope.ethnicityData = data.data.data;
                            var tempArr = $scope.ethnicityData.filter(function (ethiniObj) {
                                return ethiniObj.key === $scope.personalInfoData.activePersonalDataList[0].ethnicity;
                            });
                            $scope.selectedInfoData.ethnicity = angular.copy(tempArr[0]);
                            $scope.ethnicityValue=(tempArr && tempArr[0] && tempArr[0].value) ? tempArr[0].value : '' ;
                        });
                        $scope.activePersonalDataListLength = personalInfoData.activePersonalDataList.length;
                        personalInfoData.activePersonalDataList = gso.getUtilService().sortData(personalInfoData.activePersonalDataList);
                        if ($scope.activePersonalDataListLength === 1) {
                            $scope.selectedInfoData = personalInfoData.activePersonalDataList[0];
                            var genderInfo = $scope.selectedInfoData.gender;
                            $scope.selectedInfoData.gender = {};
                            $scope.selectedInfoData.gender.value = genderInfo === 'M' ? 'Male' : (genderInfo === 'F' ? 'Female' : '');
                            $scope.selectedInfoData.gender.key = genderInfo;


                            $scope.personalInfoListLength = $scope.activePersonalDataListLength;
                        } else if (personalInfoData.activePersonalDataList.length > 1) {
                            var personalInfoArray = [];
                            angular.forEach(personalInfoData.activePersonalDataList, function (input) {
                                personalInfoArray.push(input);
                            });

                            var birthDate = [], month, date, year;
                            personalInfoArray = gso.getUtilService().sortData(personalInfoArray, true);
                            angular.forEach(personalInfoArray, function (obj, index) {
                                if (index === 0) {
                                    obj.effDateLabel = constants.currentlyEffective;
                                } else {
                                    obj.effDateLabel = constants.effective + gso.getUtilService().filterDate(obj.effectiveDate, constants.dateFormatUS);
                                }
                            });
                            $scope.personalInfoList = personalInfoArray;
                            var selectedVal = SharedDataService.getAppSharedData().personalInfoSelectedeffdate;
                            if (selectedVal === null || selectedVal === undefined || selectedVal === "undefined" || selectedVal === '') {
                                selectedVal = 0;
                            } else {
                                if (parseInt(selectedVal, 10) === 0) {
                                    $scope.hideDelete = true;
                                } else if (parseInt(selectedVal, 10) === 1) {
                                    $scope.hideDelete = false;
                                }
                            }
                            $scope.selectedInfoData = $scope.personalInfoList[selectedVal];

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
                            gso.getAPIConfigDataService().getGenders().then(function(response) {
                                $scope.gender = response;
                                if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                                    angular.forEach($scope.gender, function (input) {
                                        if (input.key === $scope.selectedInfoData.gender) {
                                            $scope.selectedInfoData.gender = input;
                                        }
                                    });
                                }
                            });

                            genericService.ethnicity(gso.getAppConfig().countryCode).then(function (data) {
                                $scope.ethnicityData = data.data.data;
                                angular.forEach($scope.ethnicityData,
                                    function (input) {
                                        if (input.key === $scope.selectedInfoData.ethnicity) {
                                            $scope.selectedInfoData.ethnicity = input.key;
                                        }
                                    });
                            });


                        } else {
                            $scope.activePersonalDataListLength = 0;
                        }
                        generateDOB();
						$scope.selectedObject();
                    }
                    else {
                        $scope.activePersonalDataListLength = 0;
                    }
                }, function (data) {
                    $scope.personalInfoSection = true;
                   // $scope.childParentAlertMsg(data);
                });
            };
            $scope.getPersonaInformation();
            $scope.dateChange = function (label) {
                var result = gso.getUtilService().showHideDelete(label);
                $scope.hideDelete = result.hideDelete;

                $scope.getLabelState = label.effDateLabel;

                if ($scope.getLabelState !== 'undefined' && $scope.getLabelState !== null) {
                    if ($scope.getLabelState.slice(0, 9) === "Effective") {
                        angular.forEach($scope.personalInfoData.activePersonalDataList, function (obj, index) {
                            if (obj.effDateLabel === $scope.getLabelState) {
                                result.index = index;
                                return;
                            }
                        });
                    } else {
                        result.index = $scope.personalInfoData.activePersonalDataList.length - 1;
                    }
                }

                $scope.selectedInfoData = $scope.personalInfoData.activePersonalDataList[result.index];
                getMaritalStatusValue($scope.selectedInfoData.maritalStatus);
                getMilitaryStatusValue($scope.selectedInfoData.militaryStatus);
                SharedDataService.getAppSharedData().personalInfoSelectedeffdate= result.index;
                generateDOB();

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

                gso.getAPIConfigDataService().getGenders().then(function(response) {
                    $scope.gender = response;
                    if ($scope.selectedInfoData !== undefined && $scope.selectedInfoData !== null) {
                        angular.forEach($scope.gender, function (input) {
                            if (typeof $scope.selectedInfoData.gender === 'object') {
                                if (input.key === $scope.selectedInfoData.gender.key) {
                                    $scope.selectedInfoData.gender = input;
                                }
                            } else if (input.key === $scope.selectedInfoData.gender) {
                                var obj = {};
                                obj.key = $scope.selectedInfoData.gender;
                                obj.value = ($scope.selectedInfoData.gender === 'M') ? 'Male' : 'Female';
                                $scope.selectedInfoData.gender = obj;
                            }

                        });
                    }
                });

                genericService.ethnicity(gso.getAppConfig().countryCode).then(function (data) {
                    $scope.ethnicityData = data.data.data;

                    angular.forEach($scope.ethnicityData,
                        function (input) {
                            if (input.key === $scope.selectedInfoData.ethnicity) {
                                $scope.selectedInfoData.ethnicity = input.key;
                            }
                        });
                });
                $scope.selectedObject();
            };


            $scope.toggle = function () {
                $scope.visible = !$scope.visible;
                var birthDate, month, date, year;
                if ($scope.selectedInfoData !== undefined) {
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

                    genericService.ethnicity(gso.getAppConfig().countryCode).then(function (data) {
                        $scope.ethnicityData = data.data.data;

                        angular.forEach($scope.ethnicityData,
                            function (input) {
                                if (input.key === $scope.selectedInfoData.ethnicity) {
                                    $scope.selectedInfoData.ethnicity = input;
                                    return;
                                }
                            });
                    });
                }
            };

            $scope.showHideTimeline = function () {
                $scope.showTimeline = !$scope.showTimeline;
            };
            $scope.deletePerson = function () {
                if (confirm(profile.personalInfo.personalInfoDeleteConfirm) === true) {
                    gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.personal, null, function (response) {
                        $scope.childParentAlertMsg(response);
                    }, function (data) {
                        $scope.childParentAlertMsg(data);
                    });
                }
            };

            $scope.selectedObject = function () {
                var personalInfoDetails = [];
                var personalInfoDetailTimeline = [];
                if ($scope.selectedInfoData !== undefined) {
                    if ($scope.selectedInfoData.effDateLabel === undefined || $scope.selectedInfoData.effDateLabel === "Currently Effective") {
                        personalInfoDetails.push($scope.personalInfoData.activePersonalDataList[$scope.personalInfoData.activePersonalDataList.length - 1]);
                    } else {
                        angular.forEach($scope.personalInfoData.activePersonalDataList, function (obj) {
                            if (gso.getUtilService().checkTwoDates($scope.selectedInfoData.effectiveDate, obj.effectiveDate)) {
                                personalInfoDetails.push(obj);
                            }
                        });
                        var firstObj = personalInfoDetails.splice(0, 1)[0];
                        personalInfoDetails.push(firstObj);
                    }

                    angular.forEach($scope.personalInfoData.historyPersonalDataList, function (input) {
                        personalInfoDetails.push(input);
                    });

                    $scope.personalInfoDetails = personalInfoDetails;
                    personalInfoDetailTimeline = angular.copy(personalInfoDetails);

                    angular.forEach(personalInfoDetailTimeline, function (input) {

                        var tempArrMari = $scope.maritalStatusData && $scope.maritalStatusData.filter(function (maritalObj) {
                            return maritalObj.key === ((typeof input.maritalStatus === 'object') ? input.maritalStatus.key : input.maritalStatus);
                        });
                        input.maritalStatus = (tempArrMari && tempArrMari[0] && tempArrMari[0].value) ? tempArrMari[0].value : '';

                        var tempArrMili = $scope.militaryStatusData && $scope.militaryStatusData.filter(function (militaryObj) {
                            return militaryObj.key === ((typeof input.militaryStatus === 'object') ? input.militaryStatus.key : input.militaryStatus);
                        });
                        input.militaryStatus = (tempArrMili && tempArrMili[0] && tempArrMili[0].value) ? tempArrMili[0].value : '';

                        if (angular.isObject(input.gender)) {
                            input.gender = input.gender.value;
                        } else if (input.gender === constants.genderMaleKey) {
                            input.gender = constants.genderMale;
                        } else {
                            input.gender = constants.genderFemale;
                        }
                    });

                    generateDOB();

                    $scope.personalInfoDetailTimeline = gso.getUtilService().effectiveDateCheck(personalInfoDetailTimeline);
                }
            };

            $scope.deletePersonalInfo = function () {
                $scope.confirmMessage = $scope.translation.profile_personal.personalInfo_confirm_message;
                $scope.yes_btn = $scope.translation.security.delete_message;
                $scope.no_btn = $scope.translation.options.cancel;
                $scope.selectedInfoData.effectiveDate = gso.getUtilService().filterDate($scope.selectedInfoData.effectiveDate, constants.dateFormat);
                gso.getNGDialog()
                    .openConfirm(
                    {
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope
                        // Pass the scope object if you need to
                        // access in the template
                    })
                    .then(function () {
                        gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                            companyId + '/' + appUserId + profileUrlConfig.resources.personalstatus + $scope.selectedInfoData.effectiveDate, null, function (response) {
                            SharedDataService.getAppSharedData().sMessage= JSON.stringify(response);
                            gso.getUtilService().routeReloadTimeOut();
                        }, function (data) {
                            $scope.childParentAlertMsg(data);
                        });
                    });
            };


        }]);
