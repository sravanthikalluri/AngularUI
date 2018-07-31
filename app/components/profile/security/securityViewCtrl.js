/*
 * Description : It provides functionality to change security options
 * Author:Jaya Krishna Pulipati
 */
trinetApp.controller('securityViewCtrl', ['$scope', 'gso', '$routeParams', 'urlBuilder', '$http',
    function ($scope, gso, $routeParams, urlBuilder, $http) {
            $scope.passwordInfo = {};
            $scope.custIdInfo = {};
            $scope.questionsData = {};
            $scope.proxy = {};
            $scope.proxysList = [];
            $scope.historyList = [];
            $scope.activeList = [];
            // Employee Information
            $scope.showEmployeeInfo = true;
            $scope.customLoginInformation = false;
            $scope.passwordInformation = false;
            $scope.proxyInformation = false;
            $scope.noProxyInformation = false;
            $scope.lenghtOfPassword = false;
            $scope.oneUpperCaseLetter = false;
            $scope.oneLowerCaseLetter = false;
            $scope.oneNumber = false;
            $scope.oneSpecialCharacter = false;
            $scope.passwordValidity = true;
            $scope.proxyContent = false;
            $scope.showCloseSection = false;
            $scope.customerInformattionSection = false;
            $scope.securityQuestionsInformattionSection = false;
            $scope.proxysInformationSection = false;
            $scope.minDate = new Date();
            $scope.minDate.setDate($scope.minDate.getDate() + 1);
            $scope.customIdSubmitted = false;
            $scope.isChangePasswordFormSubmitted = false;
            $scope.isSecQuesFormSubmitted = false;
            $scope.isProxyFormSubmitted = false;

            $scope.getMFAPage = function () {
                $scope.mfaURL = urlBuilder("../ui/apps/mfa/security.jsp?personId=" + gso.getAppConfig().userId + "&employeeId=" + gso.getAppConfig().userId);
                $http.get($scope.mfaURL).then(function (response) {
                    if (response.data) {
                        $scope.mfa(response.data);
                    }
                }, function (data) {
                    $scope.childParentAlertMsg(data);
                });
            };

            $scope.mfa = function (data) {
                var regex = new RegExp("resources/", 'g');
                var pathData = data;
                pathData = pathData.replace(regex, '/ui/apps/mfa/resources/');
                angular.element("#mfaLoadFrame").append(pathData);
            };
            /**
             *
             * @param dateVal
             * @returns {*}
             *
             * Func: formatting the date for showing it in proxy's section.
             */
            $scope.checkFormat = function (dateVal) {
                var dt = gso.getUtilService().filterDate(new Date(dateVal), constants.dateFormatUS);
                return dt;
            };

            /**
             *
             * @param date
             * @returns {*}
             *
             *  Func: Date Comparison function.
             */
            $scope.compareDates = function (date) {
                var date2 = gso.getUtilService().filterDate(new Date(), 'MM-dd-yyyy');
                var date1 = gso.getUtilService().filterDate(new Date(date), 'MM-dd-yyyy');
                return gso.getUtilService().compareTwoDates(date1, date2);
            };

            $scope.secQuestionsList = [];

            /*// employee id from gso.getAppConfig().
            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
            }*/

            /**
             * Func: initialization function
             */
            $scope.init = function () {
                $scope.customerInformation = gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/custom-id', null, function (response) {
                        $scope.passwordInfo.currentPassword = response.password.currentPassword;
                        $scope.passwordInfo.effectiveDate = response.password.effectiveDate;
                        $scope.formattedDate = gso.getUtilService().filterDate(response.password.effectiveDate, 'MMM. dd, yyyy');
                        if (response.customId === null) {
                            $scope.showSetupButton = false;
                        } else {
                            $scope.showSetupButton = true;
                            $scope.custIdInfo.customerId = response.customId;
                        }
                    },
                    function (data) {
                        $scope.customerInformattionSection = true;
                        $scope.childParentAlertMsg(data);
                    }
                );

                $scope.allEmpData = gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                                                manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId +
                                                                manageEmpUrlConfig.resources.allEmp + "?employmentStatus=active", null, function (response) {
                        $scope.deptData = response.empLst;
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                    }
                );

                $scope.secList = gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/secret', null, function (response) {
                        $scope.secQuestionsList = response;
                    },
                    function (data) {
                        $scope.securityQuestionsInformattionSection = true;
                        $scope.childParentAlertMsg(data);
                    }
                );

                if (gso.getRouteParams().empId) {
                    $scope.proxyList = gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/proxy', null, function (response) {
                            $scope.activeList = response.activeList;
                            $scope.historyList = response.historyList;
                            $scope.proxysList = $scope.activeList.concat($scope.activeList);
                        },
                        function (data) {
                            $scope.proxysInformationSection = true;
                            $scope.childParentAlertMsg(data);
                        }
                    );
                }
                /* As part of R2 it is commented*/
                //$scope.getMFAPage();
            };
            $scope.init();

            $scope.showCustomSetUp = function (event) {
                event.preventDefault();
                $scope.showEmployeeInfo = false;
                $scope.customLoginInformation = true;
            };

            $scope.removeCustomSetUp = function () {
                $scope.customIdSubmitted = false;
                $scope.showEmployeeInfo = true;
                $scope.customLoginInformation = false;
                $scope.onFocus('customId', $scope.validationPatterns.customId.focus);
            };

            /** ****************To Save Customer Data**************** */

            $scope.innerFunc = function (input) {
                var inputObject = {
                    "employeeId": $scope.appUserId,
                    "customId": $scope.custIdInfo.customId,
                    "personKeyType": 5
                };
                gso.getCrudService().execute(input, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin +
                    gso.getAppConfig().companyId + '/' + $scope.appUserId + '/custom-id', inputObject, function (response) {
                        $scope.custIdInfo.customerId = $scope.custIdInfo.customId;
                        $scope.showSetupButton = true;
                        $scope.customLoginInformation = false;
                        $scope.showEmployeeInfo = true;
                        $scope.childParentAlertMsg(response);
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                    }
                );
            };
            $scope.saveCustomId = function (form_name) {
                $scope.customIdSubmitted = true;
                if (!form_name.$valid) {
                    gso.getUtilService().focusInvalidElement('form#custom_id_form');
                    $scope.onFocus('customId', $scope.validationPatterns.customId.focus);
                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: 'This page contains errors. Please correct the errors below.'
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                } else {
                    if (!$scope.showSetupButton) {
                        $scope.innerFunc(constants.post);
                    } else {
                        $scope.innerFunc(constants.put);
                    }
                }
            };

            $scope.editCustomSetUp = function (event) {
                event.preventDefault();
                $scope.customIdSubmitted = false;
                $scope.custIdInfo.customId = $scope.custIdInfo.customerId;
                $scope.showCustomSetUp(event);
            };

            $scope.showPasswordSection = function () {
                $scope.passwordInformation = true;
                $scope.showEmployeeInfo = false;
                $scope.customLoginInformation = false;
            };

            $scope.cancelChangePassword = function () {
                $scope.isChangePasswordFormSubmitted = false;

                $scope.showEmployeeInfo = true;
                $scope.customLoginInformation = false;
                $scope.passwordInformation = false;
                $scope.passwordInfo.newPassword = null;
                $scope.passwordInfo.confirmNewPassword = null;

                $scope.lenghtOfPassword = false;
                $scope.oneUpperCaseLetter = false;
                $scope.oneLowerCaseLetter = false;
                $scope.oneNumber = false;
                $scope.oneSpecialCharacter = false;
            };

            $scope.hasLength = function (str) {
                if (str !== undefined) {
                    return (str.length >= 8);
                }
            };

            $scope.hasSpecialCharacter = function (str) {
                return (/[!@#%^&*.:;'`/_]/.test(str));
            };

            $scope.hasLowerCase = function (str) {
                return (/[a-z]/.test(str));
            };

            $scope.hasUpperCase = function (str) {
                return (/[A-Z]/.test(str));
            };

            $scope.hasNumber = function (str) {
                return (/[0-9]/.test(str));
            };

            $scope.watchChnagePassword = function () {
                $scope.checkNewPassword();
            };

            $scope.checkNewPassword = function () {
                if ($scope.passwordInfo.newPassword !== undefined) {
                    $scope.lenghtOfPassword = $scope.hasLength($scope.passwordInfo.newPassword);
                    $scope.oneNumber = $scope.hasNumber($scope.passwordInfo.newPassword);
                    $scope.oneUpperCaseLetter = $scope.hasUpperCase($scope.passwordInfo.newPassword);
                    $scope.oneLowerCaseLetter = $scope.hasLowerCase($scope.passwordInfo.newPassword);
                    $scope.oneSpecialCharacter = $scope.hasSpecialCharacter($scope.passwordInfo.newPassword);
                    if ($scope.lenghtOfPassword && $scope.oneNumber && $scope.oneUpperCaseLetter) {
                        if ($scope.oneLowerCaseLetter && $scope.oneSpecialCharacter) {
                            $scope.passwordValidity = true;
                        } else {
                            $scope.passwordValidity = false;
                        }
                    }

                } else {
                    $scope.lenghtOfPassword = false;
                    $scope.oneUpperCaseLetter = false;
                    $scope.oneLowerCaseLetter = false;
                    $scope.oneNumber = false;
                    $scope.oneSpecialCharacter = false;
                }
            };

            /** ****************To Change the pwd of Customer Data**************** */
            $scope.changePassword = function (formName) {
                $scope.isChangePasswordFormSubmitted = true;
                if (!formName.$valid) {
                    gso.getUtilService().focusInvalidElement('form#password_form');
                    $scope.onFocus('customId', $scope.validationPatterns.focus);
                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: 'This page contains errors. Please correct the errors below.'
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                    return;
                } else {
                    if ($scope.passwordValidity) {
                        var inputObject = {
                            "employeeId": $scope.appUserId,
                            "effectiveDate": $scope.passwordInfo.effectiveDate,
                            "currentPassword": $scope.passwordInfo.currentPassword,
                            "newPassword": $scope.passwordInfo.newPassword
                        };
                        gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/password', inputObject, function (response) {
                                $scope.childParentAlertMsg(response);
                                $scope.passwordInfo.currentPassword = $scope.passwordInfo.newPassword;
                                $scope.cancelChangePassword();

                            },
                            function (data) {
                                $scope.childParentAlertMsg(data);
                            }
                        );
                    }
                }
            };

            /** ****************To Save Security Data of the Customer**************** */
            $scope.saveSecurityQuestionInfo = function (form_name) {
                $scope.isSecQuesFormSubmitted = true;
                var fieldsArray = ['proxypastdate', 'proxyFuturedate'];
                if (!form_name.$valid || $scope.validatePasteAndFutureDates($scope.validationPatterns.proxy.blur, fieldsArray)) {
                    gso.getUtilService().focusInvalidElement('form#sec_ques_form');
                    $scope.onFocus('secQuestion', $scope.validationPatterns.focus);
                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: 'This page contains errors. Please correct the errors below.'
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                } else {
                    var inputObject = {
                        employeeId: $scope.appUserId,
                        question: $scope.questionsData.securityQuestion,
                        answer: $scope.questionsData.answer
                    };

                    if ($scope.questionsData.securityQuestion === 'own') {
                        inputObject.question = $scope.questionsData.secQuestion;
                        gso.getCrudService().execute(constants.post, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/secret', inputObject, function (response) {
                                $scope.childParentAlertMsg(response);
                                $scope.secQuestionsList.push({question: $scope.questionsData.secQuestion});
                                $scope.questionsData = {};
                            },
                            function (data) {
                                $scope.childParentAlertMsg(data);
                            }
                        );
                    } else {
                        gso.getCrudService().execute(constants.put, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/secret', inputObject, function (response) {
                                $scope.childParentAlertMsg(response);
                                $scope.questionsData = {};
                            },
                            function (data) {
                                $scope.childParentAlertMsg(data);
                            }
                        );
                    }
                }
            };
            // proxies adding form should be shown here.
            $scope.addNewProxy = function () {
                $scope.proxyInformation = true;
                $scope.noProxyInformation = true;
                $scope.proxysInformationSection = false;
                $scope.proxy = {};
            };

            // proxies adding form should hide here.
            $scope.cancelAddNewProxy = function () {
                $scope.isProxyFormSubmitted = false;
                $scope.proxyInformation = false;
                $scope.noProxyInformation = false;
            };

            $scope.onSelect = function (item) {
                $scope.proxy.firstName = item.firstName;
                $scope.proxy.lastName = item.lastName;
                $scope.proxy.employeeId = $scope.appUserId;
                $scope.proxy.proxyId = item.employeeId;
            };
            // saving proxies functionality.
            $scope.saveProxy = function (formName) {
                $scope.isProxyFormSubmitted = true;
                if (!formName.$valid) {
                    $scope.alertMessage = true;
                    gso.getUtilService().focusInvalidElement('form#proxy_form');
                    $scope.onFocus('proxy', $scope.validationPatterns.focus);
                    var customIdAlert = {
                        _statusCode: '400',
                        _statusMessage: 'This page contains errors. Please correct the errors below.'
                    };
                    $scope.childParentAlertMsg(customIdAlert);
                } else {
                    $scope.proxy.effectiveDate = gso.getUtilService().filterDate(new Date($scope.proxy.effectiveDate), constants.dateFormat);
                    $scope.proxy.endDate = gso.getUtilService().filterDate(new Date($scope.proxy.endDate), constants.dateFormat);

                    gso.getCrudService().execute(constants.post, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/proxy', $scope.proxy, function (response) {
                            $scope.proxyInformation = false;
                            $scope.getProxyData();
                            $scope.childParentAlertMsg(response);
                        },
                        function (data) {
                            $scope.childParentAlertMsg(data);
                        }
                    );
                    $scope.proxyContent = true;
                }
            };
            $scope.getProxyData = function(){
                 gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/proxy', null, function (response) {
                            $scope.historyList = response.historyList;
                            $scope.activeList = response.activeList;
                            $scope.proxysList = $scope.activeList.concat($scope.activeList);
                        },
                        function (data) {
                            $scope.proxysInformationSection = true;
                            $scope.childParentAlertMsg(data);
                            $scope.activeList = "";
                        });
            };

            /**
             * @param obj
             * Func: Proxy deletion function.
             */
            $scope.deleteProxy = function (obj) {
                $scope.yes_btn = 'OK';
                $scope.no_btn = 'Cancel';
                $scope.confirmMessage = profile.securityTabInfo.deleteConfirm;
                gso.getNGDialog().openConfirm({
                template: 'app/shared/views/confirmAlert.html',
                scope: $scope
            }).then(function () {
                gso.getCrudService().execute(constants.remove, profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + gso.getAppConfig().companyId + '/' + $scope.appUserId + '/proxy?effectivedate=' + obj.effectiveDate, null, function (response) {
                        $scope.childParentAlertMsg(response);
                        $scope.getProxyData();
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                    }
                );
              });
            };

            $scope.validationPatterns = {
                proxy: {
                    blur: {
                        securityFormfirstNameRequired: null,
                        securityFormlastNameRequired: null,
                        securityFormemployeeIdRequired: null,
                        securityFormeffectiveDateRequired: null,
                        securityFormendDateRequired: null,
                        proxypastdate: null,
                        proxyFuturedate: null
                    },
                    focus: {
                        securityFormfirstNameRequired: null,
                        securityFormlastNameRequired: null,
                        securityFormemployeeIdRequired: null,
                        securityFormeffectiveDateRequired: null,
                        securityFormendDateRequired: null,
                        proxypastdate: null,
                        proxyFuturedate: null
                    }
                },
                customId: {
                    blur: {
                        customIdRequired: null,
                        customIdPattern: null
                    },
                    focus: {
                        customIdRequired: null,
                        customIdPattern: null
                    }
                },
                secQuestion: {
                    blur: {
                        securityFormsecQuestionRequired: null,
                        securityFormsecAnswerRequired: null,
                        securityFormquestionRequired: null
                    },
                    focus: {
                        securityFormsecQuestionRequired: null,
                        securityFormsecAnswerRequired: null,
                        securityFormquestionRequired: null
                    }
                },
                password: {
                    blur: {
                        securityFormcurrentPasswordRequired: null,
                        securityFormnewPasswordRequired: null,
                        newPasswordValidation: null,
                        securityFormconfirmNewPasswordRequired: null,
                        confirmNewPwdError: null,
                        pwdminlength:null,
                        pwdmaxlength:null

                    },
                    focus: {
                        securityFormcurrentPasswordRequired: null,
                        securityFormnewPasswordRequired: null,
                        newPasswordValidation: null,
                        securityFormconfirmNewPasswordRequired: null,
                        confirmNewPwdError: null,
                        pwdminlength:null,
                        pwdmaxlength:null
                    }
                }
            };

            $scope.onFocus = function (name, object) {
                var temp = {};
                angular.forEach(object, function (value, key) {
                    temp[key] = false;
                });

                if (name === 'proxy') {
                    $scope.validationPatterns.proxy.focus = temp;
                }

                if (name === 'customId') {
                    $scope.validationPatterns.customId.focus = temp;
                }

                if (name === 'password') {
                    $scope.validationPatterns.password.focus = temp;
                }
            };

            $scope.securityQuestioninfo = function(){
                $scope.securityQuestionsInformattionSection = false;
            };
        }
]);
