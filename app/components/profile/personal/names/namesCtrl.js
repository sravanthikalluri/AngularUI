/**
 Description: This is controller used to fetch/delete the name details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp
    .controller(
        'namesCtrl', ['$scope', 'genericService', 'gso','$filter','SharedDataService',
            function ($scope, genericService, gso,$filter,SharedDataService) {
               /* if (typeof $scope.appUserId === 'undefined') {
                    $scope.appUserId = gso.getAppConfig().userId;
                }*/
                var appUserId = $scope.appUserId,
                    companyId = gso.getAppConfig().companyId;
                $scope.index = 0;
                $scope.headerName = "";
                $scope.getLabelState = null;
                $scope.storage = {};

                $scope.preferredDateChagne = function (obj) {
                    if (obj) {
                        var result = gso.getUtilService().showHideDelete(obj);
                        $scope.changeDeleteLablePreferred(result.hideDelete);

                        if (obj && obj.effDateLabel !== 'undefined') {
                            if (obj.effDateLabel.slice(0, 9) === "Effective") {
                                angular.forEach($scope.preferredNameDataList, function (prederredObject, index) {
                                    if (obj.effDateLabel === prederredObject.effDateLabel) {
                                        result.index = index;
                                        return;
                                    }
                                });
                            } else {
                                result.index = 0;
                            }
                        }
                        SharedDataService.getAppSharedData().preferredNameSelectedeffdate = result.index;
                        $scope.preferredNameData = $scope.preferredNameDataList[result.index];
                    }
                    $scope.selectedPreferredObject();
                };

                $scope.dateChange = function (label) {
                    SharedDataService.getAppSharedData().myProfileNameListIndex=label.effDateLabel;
                    var result = gso.getUtilService().showHideDelete(label);
                    $scope.changeDeleteLable(result.hideDelete);

                    $scope.getLabelState = SharedDataService.getAppSharedData().myProfileNameListIndex;

                    if ($scope.getLabelState !== 'undefined' && $scope.getLabelState !== null) {
                        if ($scope.getLabelState.slice(0, 9) === "Effective") {
                            angular.forEach($scope.primaryNameList, function (obj, index) {
                                if (obj.effDateLabel === $scope.getLabelState) {
                                    result.index = index;
                                    return;
                                }
                            });
                        } else {
                            result.index = 0;
                        }
                    }
                    SharedDataService.getAppSharedData().primNameSelectedeffdate= result.index;
                    $scope.primaryNameData = $scope.primaryNameList[result.index];

                    gso.getAPIConfigDataService().getSuffixes().then(function(response) {
                        $scope.suffixData = response;
                        if ($scope.primaryNameData !== undefined && $scope.primaryNameData !== null) {
                             if ($scope.primaryNameData.suffix !== null && $scope.primaryNameData.suffix !== "") {
                              angular.forEach($scope.suffixData, function (input, i) {
                                if (input.value === $scope.primaryNameData.suffix) {
                                    $scope.primaryNameData.suffix = $scope.suffixData[i];
                                    if ($scope.primaryNameModelData) {
                                        $scope.primaryNameModelData.suffix = $scope.suffixData[i];
                                    }
                                }
                            });
                         }
                      }
                    });
                    gso.getAPIConfigDataService().getTitles().then(function(response) {
                        $scope.formOfAddressData = response;
                        if ($scope.primaryNameData !== undefined && $scope.primaryNameData !== null) {
                            angular.forEach($scope.formOfAddressData, function (input, i) {
                                if ($scope.primaryNameData.formOfAddress !== null && $scope.primaryNameData.formOfAddress !== "") {
                                    if (input.value === $scope.primaryNameData.formOfAddress) {
                                        $scope.primaryNameData.formOfAddress = $scope.formOfAddressData[i];
                                    }
                                }
                            });
                        }
                    });
                    $scope.selectedObject();
                };
                $scope.showTimeline = true;
                $scope.toggleTimeline = function () {
                    $scope.showTimeline = !$scope.showTimeline;
                };
                $scope.preferred_showTimeline = true;
                $scope.togglePreferredTimeline = function () {
                    $scope.preferred_showTimeline = !$scope.preferred_showTimeline;
                };

                $scope.section = constants.sectionName;
                $scope.selectedObject = function () {
                    var length;
                    var primaryDetails = [];
                    if ($scope.primaryNameData !== undefined) {
                        if ($scope.primaryNameList !== undefined) {
                            if ($scope.primaryNameData.effDateLabel === undefined || $scope.primaryNameData.effDateLabel === "Currently Effective") {
                                primaryDetails.push($scope.primaryNameList[0]);
                            } else {
                                angular.forEach($scope.primaryNameList, function (obj) {
                                    if (gso.getUtilService().checkTwoDates($scope.primaryNameData.effectiveDate, obj.effectiveDate)) {
                                        primaryDetails.push(obj);
                                    }
                                });
                                var firstObj = primaryDetails.splice(0, 1)[0];
                                primaryDetails.push(firstObj);
                            }
                        }

                        angular.forEach($scope.nameData.priNamesHistoryList, function (input) {
                            primaryDetails.push(input);
                        });
                        $scope.primaryDetails = primaryDetails;

                        var primaryDetailTimeline = angular.copy(primaryDetails);
                        for (var s = 0; s < primaryDetailTimeline.length; s++) {
                            if (primaryDetailTimeline[s].oldeffectiveDate !== undefined) {
                                primaryDetailTimeline[s].effectiveDate = primaryDetailTimeline[s].oldeffectiveDate;
                                break;
                            }
                        }
                        primaryDetailTimeline = gso.getUtilService().effectiveDateCheck(primaryDetailTimeline);

                        $scope.primaryDetailTimeline = primaryDetailTimeline;

                        length = $scope.primaryDetails.length;
                        for (var i = 0; i < length; i++) {
                            $scope.date1 = new Date($scope.primaryDetails[i].effectiveDate);
                            $scope.date2 = new Date();
                        }
                    }

                };
                $scope.selectedPreferredObject = function () {
                    var preferredDetails = [],
                        length;
                    if ($scope.nameData.prfNamesCurrentList !== undefined) {
                        if ($scope.preferredNameData.effDateLabel === undefined || $scope.preferredNameData.effDateLabel === "Currently Effective") {
                            preferredDetails.push($scope.nameData.prfNamesCurrentList[0]);
                        } else {
                            //$scope.nameData.prfNamesCurrentList.splice(0, 1);
                            angular.forEach($scope.nameData.prfNamesCurrentList, function (input) {
                                if (gso.getUtilService().compareTwoDates($scope.preferredNameData.effectiveDate, input.effectiveDate)) {
                                    preferredDetails.push(input);
                                }
                            });
                        }
                    }
                    angular.forEach($scope.nameData.prfNamesHistoryList, function (input) {
                        preferredDetails.push(input);
                    });

                    $scope.preferredDetails = preferredDetails;


                    var preferredDetailTimeline = angular.copy(preferredDetails);
                    for (var z = 0; z < preferredDetailTimeline.length; z++) {
                        if (preferredDetailTimeline[z].oldeffectiveDate !== undefined) {
                            preferredDetailTimeline[z].effectiveDate = preferredDetailTimeline[z].oldeffectiveDate;
                            break;
                        }
                    }
                    preferredDetailTimeline = gso.getUtilService().effectiveDateCheck(preferredDetailTimeline);

                    $scope.preferredDetailTimeline = gso.getUtilService().sortData(preferredDetailTimeline);
                    length = $scope.preferredDetails.length;
                    for (var j = 0; j < length; j++) {
                        $scope.date1 = new Date($scope.preferredDetails[j].effectiveDate);
                        $scope.date2 = new Date();
                    }
                };

                $scope.visiblePreferredName = false;
                $scope.visibleCreateNewName = false;

                $scope.editPreferredName = function (value) {
                    $scope.preferredNameEditData = angular.copy(value);
                    var preferred_effectiveDate = Date.parse(gso.getUtilService().convertToServerTimeZone($scope.preferredNameData.effectiveDate));
                    preferred_effectiveDate.setDate(preferred_effectiveDate.getDate() + 1);
                    $scope.preferredNameEditData.effectiveDate = preferred_effectiveDate;
                    angular.forEach($scope.suffixData, function (obj) {
                        if (obj.key === $scope.preferredNameEditData.suffix) {
                            $scope.preferredNameEditData.suffix = obj;
                            return;
                        }
                    });
                };
                $scope.editData = function () {
                    $scope.primaryNameModelData = angular.copy($scope.primaryNameData);
                    $scope.primaryNameModelData.effectiveDate = Date.parse($scope.primaryNameData.effectiveDate);
                    if ($scope.formOfAddressData && !$scope.formOfAddressData.data && $scope.suffixData && !$scope.suffixData.data) {
                        $scope.formOfAddressData = $scope.formOfAddressData;
                        $scope.suffixData = $scope.suffixData;
                        angular.forEach($scope.suffixData, function (obj) {
                            if (obj.key === $scope.primaryNameData.suffix) {
                                $scope.primaryNameModelData.suffix = obj;
                                return;
                            }
                        });

                    }

                    if ($scope.formOfAddressData && $scope.formOfAddressData.data && $scope.suffixData && $scope.suffixData.data) {
                        $scope.formOfAddressData = $scope.formOfAddressData.data;
                        $scope.suffixData = $scope.suffixData.data;
                        angular.forEach($scope.suffixData, function (obj) {
                            if (obj.key === $scope.primaryNameData.suffix) {
                                $scope.primaryNameModelData.nameSuffix = obj;
                                return;
                            }
                        });
                    }
                };

                $scope.togglePrimaryName = function () {
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/personal/names/createNames.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: true
                    });

                };

                $scope.$on(
                    'togglePrefferredName',
                    function (evnt, data) {
                        $scope.visible = data.visible;
                        $scope.visiblePreferredName = data.visiblePreferredName;

                        if (data.visiblePreferredName) {
                            angular.element('div#profileSectionsScroll').animate({scrollTop: 0}, 'slow');
                        }
                    });

                $scope.$on('togglePrimaryName', function (evnt, data) {
                    $scope.visible = data.visible;
                    $scope.visibleName = data.visibleName;

                    if (data.visibleName) {
                        angular.element('div#profileSectionsScroll').animate({scrollTop: 0}, 'slow');
                    }

                });

                $scope.toggleCreateNew = function () {
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/personal/names/namesCreateNewView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: true
                    });
                };
                $scope.editNames = function () {
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/personal/names/namesModelView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: true
                    });
                };


                $scope.togglePreferredName = function () {
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/profile/personal/names/namesPreferredModelView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: true
                    });

                };

                $scope.deleteConfirm = function () {
                    $scope.confirmMessage = profile.names.deleteAlert;
                    $scope.yes_btn = $scope.translation.yesDelete;
                    $scope.no_btn = $scope.translation.cancel;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope
                    }).then(function () {
                        var foa = $scope.primaryNameData.formOfAddress !== null ? $scope.primaryNameData.formOfAddress : '';
                        var suffix = $scope.primaryNameData.suffix !== null ? $scope.primaryNameData.suffix : '';
                        $scope.primaryNameData.formOfAddress = foa.value;
                        $scope.primaryNameData.suffix = suffix;
                        $scope.primaryNameData.nameType = "PRI";
                        delete $scope.primaryNameData.effDateLabel;
                        $scope.primaryNameData.suffix = $scope.primaryNameData.suffix.value;
                        gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.name + '/' + $scope.primaryNameData.effectiveDate, $scope.primaryNameData,
                            function (response) {
                                SharedDataService.getAppSharedData().sMessage = JSON.stringify(response);
                                gso.getUtilService().routeReloadTimeOut();
                            },
                            function (data) {
                                SharedDataService.getAppSharedData().sMessage = JSON.stringify(data);
                                gso.getUtilService().routeReloadTimeOut();
                            }
                        );
                    });
                };

                $scope.confirm = {};
                $scope.confirm.title = $scope.translation.shared.confirmation;
                $scope.deletePreferredName = function () {
                    $scope.yes_btn = $scope.translation.yes;
                    $scope.no_btn = $scope.translation.no;
                    $scope.confirmMessage = $scope.translation.profile_personal.preferred_name_delete_message;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope
                    }).then(function () {
                        var foa = ($scope.preferredNameData.formOfAddress === null || $scope.preferredNameData.formOfAddress === " ") ? '' : $scope.preferredNameData.formOfAddress;
                        var suffix = ($scope.preferredNameData.suffix !== null || $scope.preferredNameData.suffix === " ") ? '' : $scope.preferredNameData.suffix;
                        $scope.preferredNameData.formOfAddress = foa.value;
                        $scope.preferredNameData.suffix = suffix;
                        $scope.preferredNameData.nameType = "PRF";
                        $scope.preferredNameData.effectiveDate=$filter('date')($scope.preferredNameData.effectiveDate, 'yyyy-MM-dd');
                        if ($scope.preferredNameData.oldeffectiveDate !== undefined) {
                            delete $scope.preferredNameData.oldeffectiveDate;
                        }
                        gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.name + '/' + $scope.preferredNameData.effectiveDate, $scope.preferredNameData,
                            function (response) {
                                SharedDataService.getAppSharedData().sMessage=JSON.stringify(response);
                                gso.getUtilService().routeReloadTimeOut();
                            },
                            function (data) {
                                $scope.childParentAlertMsg(data);
                            }
                        );
                    });
                };

            }
        ]);
