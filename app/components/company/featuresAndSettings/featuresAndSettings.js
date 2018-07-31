'use strict';
trinetApp.controller('featuresAndSettingsCtrl', ['$scope', 'gso',
    function ($scope, gso) {

        var companyId = gso.getAppConfig().companyId;
        var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.featuresAndSettings + '/' + companyId + '/features';
        $scope.featuresAndSettingsresopnseData = [];

        //Load features and settings details
        var settingsRecords = ["companyDirectory", "organizationChart", "timeAndAttendance", "goalsAndReview", "workchat"];
        $scope.featuresAndSettingsRecords = settingsRecords.map(function (setting) {
            return {
                "title": $scope.translation.featuresAndSettings[setting],
                "description": $scope.translation.featuresAndSettings[setting+"Description"],
                "preferenceType": $scope.translation.featuresAndSettings[setting+"Payload"],
                "isChecked": true
            }
        });

        //get data for features and settings
        $scope.featuresAndSettingsGetData = function () {
            gso.getCrudService().execute(constants.get, url, null,
                function (response) {
                    $scope.featuresAndSettingsresopnseData = response;
                    response.map(function (data) {
                        var index = $scope.featuresAndSettingsRecords.findIndex(function (indexValue) {
                            return data.preferenceType === indexValue.preferenceType;
                        });
                        if (index !== -1) {
                            $scope.featuresAndSettingsRecords[index].isChecked = (data.preferenceValue === "Y");
                        }
                    });
                    $scope.featuresAndSettingsPutData();
                },
                function (data) {
                    $scope.errorDetails = data;
                    $scope.featuresAndSettingsPutData();
                }
            );
        };

        //post data when no records for features and settings
        $scope.featuresAndSettingsPutData = function () {
            if (($scope.errorDetails && $scope.errorDetails._statusCode === '404') || ($scope.featuresAndSettingsresopnseData.length < $scope.featuresAndSettingsRecords.length)) {
                var postOnLoadData = [], data = {};
                if ($scope.featuresAndSettingsresopnseData.length) {
                    var preferenceTypeList = $scope.featuresAndSettingsresopnseData.map(function (itemfromresponse) {
                        return  itemfromresponse.preferenceType;
                    });
                    postOnLoadData = $scope.featuresAndSettingsRecords.reduce(function (list,item) {
                        if (preferenceTypeList.indexOf(item.preferenceType) === -1) {
                            list.push({
                                "preferenceType": item.preferenceType,
                                "preferenceValue": "Y"
                            });
                        }
                        return list;
                    },[]);
                }
                else {
                    postOnLoadData = $scope.featuresAndSettingsRecords.map(function (item) {
                        return {
                            "preferenceType": item.preferenceType,
                            "preferenceValue": "Y"
                        };
                    });
                }
                gso.getCrudService().execute(constants.put, url, postOnLoadData,
                    function (response) {
                    })
            }
        };

        //form a payload and post data for features and settings
        $scope.settingsChanged = function (data) {
            var changedValue = data.isChecked ? 'Y' : 'N',
                postData = [{
                    "preferenceType": data.preferenceType,
                    "preferenceValue": changedValue
                }];
            gso.getCrudService().execute(constants.put, url, postData,
                function (response) {
                    $scope.errorAlert = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        //close alert data
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        //get data for features and settings
        $scope.featuresAndSettingsGetData();
    }]);
