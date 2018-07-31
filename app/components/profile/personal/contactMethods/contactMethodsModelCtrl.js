/**
 Description: This is controller used to update contact details of employee
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp
    .controller(
    'contactMethodsModelCtrl', ['$scope', 'gso','SharedDataService',
        function ($scope, gso,SharedDataService) {
            $scope.star = false;
            $scope.formSubmitted = false;
            $scope.effectiveDateCurrent = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
            /*if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
            }*/
            var appUserId = $scope.appUserId,
                companyId = gso.getAppConfig().companyId;
            $scope.contactMethods();
            $scope.updateEffectiveDate = function ($index) {
                $scope.contactMethodData[$index].effectiveDate = $scope.effectiveDateCurrent;
            };
            $scope.updateData = function () {
                $scope.formSubmitted = true;
                if (!$scope.contactMethodForm.$valid) {
                    var length = $scope.calculateLength($scope.contactMethodData),
                        validEmail = gso.getUtilService().emailValidity(length.emailLength),
                        validPhone = gso.getUtilService().phoneValidity(length.start, length.phoneLength);
                    if (!validEmail || !validPhone) {
                        gso.getUtilService().focusInvalidElement('form#contactMethodForm');
                        $scope.onFocus('emailData', $scope.validationPatterns.emailData.focus);
                        var alert = {
                            _statusCode: '400',
                            _statusMessage: 'This page contains errors. Please correct the errors below.'
                        };
                        $scope.childParentAlertMsg(alert);
                    }
                    return;
                }

                //Deleting extra UI JSON attribute from contactMethodData
                angular.forEach($scope.contactMethodData, function (input) {
                    input.telephoneNumber= input.telephoneNumber===null ? '':input.telephoneNumber.trim();
                    delete input.phone;

                    if (input.emailType !== undefined) {
                        input.accessType = input.emailType.key;
                    }
                    /*if (input.phoneType !== undefined) {
                        input.accessType = input.phoneType.key;
                    }*/
                });

                var data = {
                    "contactList": $scope.contactMethodData
                };

                gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.contact + '?operation=all', data, function (response) {

                    SharedDataService.getAppSharedData().sMessage = JSON.stringify(response);
                    var contactListTemp = angular.copy(data.contactList);
                    angular.forEach(contactListTemp, function (object) {
                        if (object.media === constants.mediaTypePhone) {
                            object.phone = object.telephoneNumber;
                        }
                    });
                    $scope.calculateLength(contactListTemp);
                    $scope.toggleContact();
                    gso.getUtilService().routeReloadTimeOut();
                    $scope.closeThisDialog();
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });

            };

            $scope.cancel = function () {
                $scope.contactMethods();
                $scope.closeThisDialog();
            };

            $scope.addNewEmailField = function () {
                $scope.formSubmitted = false;
                var date;
                if (!angular.isDefined($scope.contactMethodData) || gso.getUtilService().isNull($scope.contactMethodData)) {
                    $scope.contactMethodData = [];
                    date = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                } else {
                    date = $scope.contactMethodData[0].effectiveDate;
                }

                $scope.contactMethodData.push({
                    employeeId: appUserId,
                    uniqueId: "",
                    accessType: "Home",
                    media: "Email",
                    telephoneNumber: null,
                    url: "",
                    notes: null,
                    effectiveDate: $scope.effectiveDateCurrent,
                    actualAccessType: null,
                    emailType: $scope.emailAccessTypes[0]
                });

            };

            $scope.changePhone = function (contact) {
                contact.accessType = contact.phoneType.accessType;
                contact.media = contact.phoneType.media;
                contact.effectiveDate = $scope.effectiveDateCurrent;
            };

            $scope.checkPhoneMedia = function (media) {
                return $scope.phoneAccessTypes.filter(function (obj) {
                    return obj.media === media;
                }).length;
            };

            $scope.addNewPhoneField = function () {
                $scope.formSubmitted = false;
                var date;
                if (!angular.isDefined($scope.contactMethodData) || gso.getUtilService().isNull($scope.contactMethodData)) {
                    $scope.contactMethodData = [];
                    date = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                } else {
                    date = $scope.contactMethodData[0].effectiveDate;
                }
                $scope.contactMethodData.push({
                    employeeId: appUserId,
                    uniqueId: "",
                    accessType: "Campus",
                    media: "Phone",
                    telephoneNumber: "",
                    url: null,
                    notes: null,
                    effectiveDate: $scope.effectiveDateCurrent,
                    actualAccessType: null,
                    phoneType: $scope.phoneAccessTypes[0]
                });
            };

            $scope.removeField = function (index) {
                delete $scope.contactMethodData[index].phone;
                if ($scope.contactMethodData[index].url === "" || $scope.contactMethodData[index].telephoneNumber === "") {
                    $scope.contactMethodData.splice(index, 1);
                    return;
                }
                $scope.contactMethodData.splice(index, 1);
            };
            $scope.validationPatterns = {
                emailData: {
                    blur: {
                        emailRequired: null,
                        emailPattern: null,
                        phoneRequired: null,
                        phonePattern: null
                    },
                    focus: {
                        emailRequired: null,
                        emailPattern: null,
                        phoneRequired: null,
                        phonePattern: null
                    }
                }
            };
            $scope.onFocus = function (name, object) {
                var temp = {};
                angular.forEach(object, function (value, key) {
                    temp[key] = false;
                });

                if (name === 'emailData') {
                    $scope.validationPatterns.emailData.focus = temp;
                }
            };

        }]);
