/*
 Description: Provides option to ser change pwd $ preferences
 */
'use strict';
trinetApp.controller('optionsViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.preferences = {};
        $scope.emailOption = 'Yes';
        $scope.w2Label = "Electronic";
        $scope.w2BtnLabel = "Use Paper Delivery";
        $scope.noticeLabel = "Electronic";
        $scope.noticeBtnLabel = "Use Paper Delivery";
        $scope.pendingWorkFlow = 'Yes';
        $scope.savedPreferences = null;
        $scope.w2value = 'Y';
        $scope.notice = 'Y';
        $scope.presentPrefrences = null;
        $scope.optionDescion = null;
        $scope.presentPrefrences = null;

        if (gso.getAppConfig().countryCode === 'US') {
            $scope.w2HeaderName = 'W-2 Option';
        } else {
            if(gso.getAppConfig().workCity === 'Quebec'){
                $scope.w2HeaderName = 'RL-1';
            }else{
                $scope.w2HeaderName = 'T4 Option';
            }
        }
        /** ****************To Get  preferences from Data base**************** */
        $scope.presentPrefrences = function () {
            gso.getCrudService()
                .execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + "/preferences", null, function (response) {
                    $scope.savedPreferences = response;
                    angular.forEach($scope.savedPreferences, function (value) {
                        switch (value.preferenceType) {
                            case 'SEND_EMAIL':
                                if (value.preferenceValue === 'Y') {
                                    $scope.emailOption = 'Yes';
                                }
                                else {
                                    $scope.emailOption = 'No';
                                }
                                break;
                            case 'GEN_ONLINE':
                                if (value.preferenceValue === 'Y') {
                                    $scope.notice = value.preferenceValue;
                                    $scope.noticeLabel = "Electronic";
                                    $scope.noticeBtnLabel = "Use Paper Delivery";
                                }
                                else if (value.preferenceValue === 'N') {
                                    $scope.notice = value.preferenceValue;
                                    $scope.noticeLabel = "Paper";
                                    $scope.noticeBtnLabel = "Use Electronic Delivery";
                                }
                                else {
                                    $scope.notice = 'Y';
                                    $scope.noticeLabel = "Electronic";
                                    $scope.noticeBtnLabel = "Use Paper Delivery";
                                }
                                break;
                            case 'W2_ONLINE':
                                if (value.preferenceValue === 'Y') {
                                    $scope.w2value = value.preferenceValue;
                                    $scope.w2Label = "Electronic";
                                    $scope.w2BtnLabel = "Use Paper Delivery";
                                }
                                else if (value.preferenceValue === 'N') {
                                    $scope.w2value = value.preferenceValue;
                                    $scope.w2Label = "Paper";
                                    $scope.w2BtnLabel = "Use Electronic Delivery";
                                }
                                else {
                                    $scope.w2value = 'Y';
                                    $scope.w2Label = "Electronic";
                                    $scope.w2BtnLabel = "Use Paper Delivery";
                                }
                                break;
                            case 'WF_EMAIL':
                                if (value.preferenceValue === 'Y') {
                                    $scope.pendingWorkFlow = 'Yes';
                                }
                                else {
                                    $scope.pendingWorkFlow = 'No';
                                }
                                break;
                            default :
                        }
                    });
                },
                function (data) {
                    $scope.childParentAlertMsg(data);
                }
            );
        };
        /*open dialog for email option*/
        $scope.trinetServicesDialog = function (decision) {
            if (decision === 'No') {
                $scope.optionDescion = 'Yes';
                gso.getNGDialog().openConfirm({
                    template: 'app/components/profile/options/noAcknowledgement.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            }
            else {
                $scope.optionDescion = 'No';
                gso.getNGDialog().openConfirm({
                    template: 'app/components/profile/options/yesAcknowledgement.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            }
        };
        /*To save email prefrences*/
        $scope.saveEmailOption = function (optionDescion) {
            if (optionDescion === 'Yes') {
                $scope.preferenceType = "SEND_EMAIL";
                $scope.preferenceValue = "N";
            }
            else {
                $scope.preferenceType = "SEND_EMAIL";
                $scope.preferenceValue = "Y";
            }
            $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
        };
        $scope.close = function () {
            $scope.emailOption = $scope.optionDescion;
            gso.getNGDialog().closeAll();

        };
        /*open dialog for Other Notice delevery*/
        $scope.openNoticeDelivery = function () {
            if ($scope.notice === 'N') {
                gso.getNGDialog().openConfirm({
                    template: 'app/components/profile/options/electronicDelivery.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            }
            else {
                $scope.preferenceValue = $scope.notice = 'N';
                $scope.preferenceType = "GEN_ONLINE";
                $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
            }
        };
        /*save Other notices prefrences*/
        $scope.saveElectronicDelivery = function () {
            $scope.preferenceType = "GEN_ONLINE";
            $scope.preferenceValue = "Y";

            $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
        };
        /*change w2 prefrences view*/
        $scope.openW2Delivery = function () {
            $scope.preferenceType = "W2_ONLINE";
            if ($scope.w2value === 'Y') {
                $scope.w2value = $scope.preferenceValue = 'N';
            }
            else {
                $scope.w2value = $scope.preferenceValue = 'Y';
            }

            $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
        };
        /*change work flow notices*/
        $scope.pendingWorkFlowDialog = function (workflow) {
            if (workflow === 'Yes') {
                $scope.preferenceType = "WF_EMAIL";
                $scope.preferenceValue = "Y";
                $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
            }
            else {
                $scope.preferenceType = "WF_EMAIL";
                $scope.preferenceValue = "N";
                $scope.savePrefrerence($scope.preferenceType, $scope.preferenceValue);
            }
        };

        /** ****************To Save all the preferences**************** */
        $scope.savePrefrerence = function (preferenceType, preferenceValue) {
            $scope.preferences = {
                "preferenceType": preferenceType,
                "preferenceValue": preferenceValue
            };
            gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + "/preferences", $scope.preferences,
                function () {
                    var customIdAlert;
                    $scope.presentPrefrences();
                    if (preferenceType === 'WF_EMAIL') {
                        customIdAlert = {
                            _statusCode: "200",
                            _statusMessage: profile.Options.WF_EMAILSuccess
                        };
                        $scope.childParentAlertMsg(customIdAlert);
                    }
                    else if (preferenceType === 'SEND_EMAIL') {
                        customIdAlert = {
                            _statusCode: "200",
                            _statusMessage: profile.Options.SEND_EMAILSuccess
                        };
                        $scope.childParentAlertMsg(customIdAlert);
                    }
                    else if (preferenceType === 'W2_ONLINE') {
                        if (preferenceValue === 'N') {
                            customIdAlert = {
                                _statusCode: "200",
                                _statusMessage: profile.Options.W2_ONLINESuccess
                            };
                            $scope.childParentAlertMsg(customIdAlert);
                            $scope.w2Label = "Paper";
                            $scope.w2BtnLabel = "Use Electronic Delivery";
                        }
                        else {
                            customIdAlert = {
                                _statusCode: "200",
                                _statusMessage: profile.Options.W2_ONLINESuccess2
                            };
                            $scope.childParentAlertMsg(customIdAlert);
                            $scope.w2Label = "Electronic";
                            $scope.w2BtnLabel = "Use Paper Delivery";

                        }
                    }
                    else if (preferenceType === 'GEN_ONLINE') {
                        if (preferenceValue === 'Y') {
                            $scope.noticeLabel = "Electronic";
                            $scope.noticeBtnLabel = "Use Paper Delivery";
                            customIdAlert = {
                                _statusCode: "200",
                                _statusMessage: profile.Options.GEN_ONLINESuccess
                            };
                            $scope.childParentAlertMsg(customIdAlert);
                        }
                        if (preferenceValue === 'N') {
                            $scope.noticeLabel = "Paper";
                            $scope.noticeBtnLabel = "Use Electronic Delivery";
                            customIdAlert = {
                                _statusCode: "200",
                                _statusMessage: profile.Options.GEN_ONLINESuccess2
                            };
                            $scope.childParentAlertMsg(customIdAlert);

                        }
                    }
                    else {
                        customIdAlert = {
                            _statusCode: "200",
                            _statusMessage: profile.defaultMessages.Success
                        };
                        $scope.childParentAlertMsg(customIdAlert);
                    }
                    $scope.close();
                },
                function (data) {
                    $scope.childParentAlertMsg(data);
                }
            );
        };
        $scope.presentPrefrences();
    }]);
