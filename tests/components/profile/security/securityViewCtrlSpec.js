/*

/!* Created by JayaKrishna on 11/20/2015.*!/

describe('Security Controller Testing', function () {

    var $rootScope;
    var $httpBackend;
    var $scope;
    var appConfig;

    var customerInformationResponse = {
        "data": {
            "customId": null,
            "password": {
                "currentPassword": "gouri",
                "effectiveDate": "2015-11-18",
                "personId": "00001422390",
                "newPassword": null
            }
        },
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var allEmpResponse = {
                               "data": [
                                 {
                                   "name": "Kruger,Kurt  ",
                                   "employeeId": "00001552807",
                                   "posDesc": "Partner, Investment Banking",
                                   "emplymntStatus": "A",
                                   "deptDesc": "NY Investment Banking",
                                   "workShortLocDesc": "NewYorkNY",
                                   "serviceDt": "2014-06-16",
                                   "homePhone": null,
                                   "work_email": "kkruger@wrhambrecht.com",
                                   "supervisorName": "Hullar,John  ",
                                   "Partner, Investment Banking":"off",
                                   "NewYorkNY":"off",
                                   "NY Investment Banking":"off",
                                   "expectedStartDt": null,
                                   "expectedStopDt": null
                                 }
                               ],
                               "_requestId": "75809",
                               "_statusCode": "200",
                               "_statusText": "OK",
                               "_statusMessage": "Success"
                             };

    var seqListResponse = {
        "data": [{
            "question": "Where do you work"
        }, {
            "question": "test"
        }],
        "_statusCode": "200",
        "_statusText": "OK"
    };

    var proxyResponse = {
        "data": {
            "activeList": [],
            "historyList": [{
                "effectiveDate": "2015-12-18",
                "endDate": "2015-12-22",
                "firstName": "Erma",
                "lastName": "Almendarez",
                "personId": "2514300",
                "positionDesc": "Sr",
                "url": "test@test.com",
                "workPhone": "8888888888"
            }]
        }, "_statusCode": "200", "_statusText": "OK"
    };

    var mfaResponse = {data: "resources/css/app.css", status: 200, statusText: "OK"};

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function (alert) {
                return alert;
            };
            $scope.validatePasteAndFutureDates = function(obj,fieldsArray){
                var isTrue = false;
                  angular.forEach(fieldsArray,function(field){
                       if(obj[field]){
                         isTrue = false;
                       }
                  });
                  return isTrue;
            };
            $scope.appUserId = '00001000483';
            $injector.get('$controller')('securityViewCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'security'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        spyOn($scope, 'mfa');
        $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/custom-id').respond(200, customerInformationResponse);

        $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/secret').respond(200, seqListResponse);

        $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy').respond(200, proxyResponse);
        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                             manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId + '/' + appConfig.userId +
                             manageEmpUrlConfig.resources.allEmp+"?employmentStatus=active").respond(200, allEmpResponse);
        $httpBackend.whenGET("../ui/apps/mfa/security.jsp?personId="+ $scope.appUserId +"&employeeId="+ $scope.appUserId).respond(200, mfaResponse);
        $httpBackend.flush();
    });

    function ifFunc() {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }
    };

    describe('if statement testing ', function () {
        it('if function execution ', function () {
            $scope.appUserId = undefined;
            ifFunc();
            expect($scope.appUserId).toBeDefined();
            expect($scope.appUserId).toEqual(appConfig.userId);
        });
    });

    describe('init function testing ', function () {

        it('init is defined ', function () {
            expect($scope.init).toBeDefined();
        });


        it('init function call with failure response', function () {

            var response1 = {
                "data": {
                    "customId": 1,
                    "password": {
                        "currentPassword": "gouri",
                        "effectiveDate": "2015-11-18",
                        "personId": "00001422390",
                        "newPassword": null
                    }
                },
                "_statusCode": "400",
                "_statusText": "OK"
            };

            var response2 = {
                "data": [{
                    "question": "Where do you work"
                }, {
                    "question": "test"
                }],
                "_statusCode": "400",
                "_statusText": "OK"
            };
            var response3 = {
                "data": {
                    "activeList": [],
                    "historyList": [{
                        "effectiveDate": "2015-12-18",
                        "endDate": "2015-12-22",
                        "firstName": "Erma",
                        "lastName": "Almendarez",
                        "personId": "2514300",
                        "positionDesc": "Sr",
                        "url": "test@test.com",
                        "workPhone": "8888888888"
                    }]
                }, "_statusCode": "400", "_statusText": "OK"
            };
            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/custom-id').respond(200, response1);

            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/secret').respond(200, response2);

            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy').respond(200, response3);
            $httpBackend.whenGET("../ui/apps/mfa/security.jsp?personId="+ $scope.appUserId +"&employeeId="+ $scope.appUserId).respond(200, customerInformationResponse);
            $scope.init();
            $httpBackend.flush();

        });


    });

    describe('showCustomSetUp function testing ', function () {
        it('showCustomSetUp is defined ', function () {
            expect($scope.showCustomSetUp).toBeDefined();
        });

        it('showCustomSetUp function call ', function () {
            var e = jQuery.Event("click");
            $scope.showCustomSetUp(e);
            expect($scope.showEmployeeInfo).toBeDefined();
            expect($scope.showEmployeeInfo).toBeFalsy();
            expect($scope.customLoginInformation).toBeDefined();
            expect($scope.customLoginInformation).toBeTruthy();
        });
    });

    describe('removeCustomSetUp function testing ', function () {
        it('removeCustomSetUp is defined ', function () {
            expect($scope.removeCustomSetUp).toBeDefined();
        });

        it('removeCustomSetUp function call', function () {
            $scope.removeCustomSetUp();
            expect($scope.showEmployeeInfo).toBeDefined();
            expect($scope.showEmployeeInfo).toBeTruthy();
            expect($scope.customLoginInformation).toBeDefined();
            expect($scope.customLoginInformation).toBeFalsy();
        });
    });

    describe('saveCustomId function testing ', function () {
        it('saveCustomId should be defined ', function () {
            expect($scope.saveCustomId).toBeDefined();
        });

        it('saveCustomId function call with statuscode as 200 and showSetupButton as falsy', function () {
            var form_name = {"$valid": true};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = 1234;
            $scope.customerIdValidity = true;
            $scope.showSetupButton = false;

            var inputObject = {
                    "employeeId": appConfig.userId,
                    "customId": $scope.custIdInfo.customId,
                    "personKeyType": 5
                },
                saveCustInformationRes = {
                    "_statusCode": "200",
                    "_statusText": "OK"
                };

            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/custom-id?enableValidation=true', inputObject).respond(200, saveCustInformationRes);

            $scope.saveCustomId(form_name);
            $httpBackend.flush();

        });

        it('saveCustomId function call with statuscode as 400 and showSetupButton as falsy', function () {
            var form_name = {"$valid": true};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = 1234;
            $scope.customerIdValidity = true;
            $scope.showSetupButton = false;
            var inputObject = {
                "employeeId": appConfig.userId,
                "customId": $scope.custIdInfo.customId,
                "personKeyType": 5
            }, saveCustInformationRes = {
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/custom-id?enableValidation=true', inputObject).respond(400, saveCustInformationRes);

            $scope.saveCustomId(form_name);
            $httpBackend.flush();
        });

        it('saveCustomId function call with statuscode as 200 and showSetupButton as truthy', function () {
            var form_name = {"$valid": true};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = 1234;
            $scope.customerIdValidity = true;
            $scope.showSetupButton = true;
            var inputObject = {
                "employeeId": appConfig.userId,
                "customId": $scope.custIdInfo.customId,
                "personKeyType": 5
            }, saveCustInformationRes = {
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/custom-id?enableValidation=true', inputObject).respond(200, saveCustInformationRes);

            $scope.saveCustomId(form_name);
            $httpBackend.flush();
        });

        it('saveCustomId function call with statuscode as 400  and showSetupButton as truthy', function () {
            var form_name = {"$valid": true};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = 1234;
            $scope.customerIdValidity = true;
            $scope.showSetupButton = true;
            var inputObject = {
                "employeeId": appConfig.userId,
                "customId": $scope.custIdInfo.customId,
                "personKeyType": 5
            }, saveCustInformationRes = {
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/custom-id?enableValidation=true', inputObject).respond(400, saveCustInformationRes);

            $scope.saveCustomId(form_name);
            $httpBackend.flush();
        });
        it('saveCustomId function call with customId as undefined', function () {
            var form_name = {"$valid": true};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = '';

            $scope.saveCustomId(form_name);

        });

        it('saveCustomId function call with form_name.$valid as false', function () {
            var form_name = {"$valid": false};
            $scope.custIdInfo = {};
            $scope.custIdInfo.customId = '';

            $scope.saveCustomId(form_name);

        });
    });

    describe('editCustomSetUp function testing ', function () {
        it('editCustomSetUp is defined ', function () {
            expect($scope.editCustomSetUp).toBeDefined();
        });

        it('editCustomSetUp function call ', function () {
            var e = jQuery.Event("click");
            $scope.editCustomSetUp(e);
        });
    });

    describe('showPasswordSection function testing ', function () {
        it('showPasswordSection is defined ', function () {
            expect($scope.showPasswordSection).toBeDefined();
        });

        it('showPasswordSection function call ', function () {
            $scope.showPasswordSection();
            expect($scope.passwordInformation).toBeDefined();
            expect($scope.passwordInformation).toBeTruthy();
            expect($scope.showEmployeeInfo).toBeDefined();
            expect($scope.showEmployeeInfo).toBeFalsy();
            expect($scope.customLoginInformation).toBeDefined();
            expect($scope.customLoginInformation).toBeFalsy();
        });
    });

    describe('cancelChangePassword function testing ', function () {
        it('cancelChangePassword is defined ', function () {
            expect($scope.cancelChangePassword).toBeDefined();
        });

        it('cancelChangePassword function call ', function () {
            $scope.cancelChangePassword();
            expect($scope.showEmployeeInfo).toBeDefined();
            expect($scope.showEmployeeInfo).toBeTruthy();

            expect($scope.customLoginInformation).toBeDefined();
            expect($scope.customLoginInformation).toBeFalsy();

            expect($scope.passwordInformation).toBeDefined();
            expect($scope.passwordInformation).toBeFalsy();

            expect($scope.lenghtOfPassword).toBeDefined();
            expect($scope.lenghtOfPassword).toBeFalsy();

            expect($scope.oneUpperCaseLetter).toBeDefined();
            expect($scope.oneUpperCaseLetter).toBeFalsy();

            expect($scope.oneLowerCaseLetter).toBeDefined();
            expect($scope.oneLowerCaseLetter).toBeFalsy();

            expect($scope.oneNumber).toBeDefined();
            expect($scope.oneNumber).toBeFalsy();

            expect($scope.oneSpecialCharacter).toBeDefined();
            expect($scope.oneSpecialCharacter).toBeFalsy();

        });
    });

    describe('hasLength function testing ', function () {
        it('hasLength is defined ', function () {
            expect($scope.hasLength).toBeDefined();
        });

        it('hasLength function call without a parameter ', function () {
            $scope.hasLength();
        });

        it('hasLength function call with a parameter ', function () {
            var str = 'lsekjsdfsd';
            $scope.hasLength(str);
            expect($scope.hasLength).toBeTruthy();
        });
    });

    describe('hasSpecialCharacter function testing ', function () {
        it('hasSpecialCharacter is defined ', function () {
            expect($scope.hasSpecialCharacter).toBeDefined();
        });

        it('hasSpecialCharacter function call without a parameter ', function () {
            $scope.hasSpecialCharacter();
        });

        it('hasSpecialCharacter function call with a parameter ', function () {
            var str = 'string%^&';
            $scope.hasSpecialCharacter(str);
            expect($scope.hasSpecialCharacter).toBeTruthy();
        });
    });

    describe('hasLowerCase function testing ', function () {
        it('hasLowerCase is defined ', function () {
            expect($scope.hasLowerCase).toBeDefined();
        });

        it('hasLowerCase function call with a parameter ', function () {
            var str = 'string';
            $scope.hasLowerCase(str);
            expect($scope.hasLowerCase).toBeTruthy();
        });
    });

    describe('hasUpperCase function testing ', function () {
        it('hasUpperCase is defined ', function () {
            expect($scope.hasUpperCase).toBeDefined();
        });
        it('hasUpperCase function call with a parameter ', function () {
            var str = 'String';
            $scope.hasUpperCase(str);
            expect($scope.hasUpperCase(str)).toBeTruthy();
        });

        it('hasUpperCase function call with a parameter ', function () {
            var str = 'string';
            $scope.hasUpperCase(str);
            expect($scope.hasUpperCase(str)).toBeFalsy();
        });

    });

    describe('hasNumber function testing ', function () {
        it('hasNumber is defined ', function () {
            expect($scope.hasNumber).toBeDefined();
        });

        it('hasNumber function call with a parameter ', function () {
            var str = 'string';
            $scope.hasNumber(str);
            expect($scope.hasNumber(str)).toBeFalsy();
        });

        it('hasNumber function call with a parameter ', function () {
            var str = 'string012';
            $scope.hasNumber(str);
            expect($scope.hasNumber(str)).toBeTruthy();
        });
    });

    describe('watchChnagePassword function testing ', function () {
        it('watchChnagePassword is defined ', function () {
            expect($scope.watchChnagePassword).toBeDefined();
        });

        it('watchChnagePassword function call ', function () {
            $scope.watchChnagePassword();
        });
    });

    describe('checkNewPassword function testing ', function () {
        it('checkNewPassword is defined ', function () {
            expect($scope.checkNewPassword).toBeDefined();
        });

        it('checkNewPassword function call ', function () {
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'newPassword';
            $scope.checkNewPassword();

            expect($scope.lenghtOfPassword).toBeDefined();
            expect($scope.oneNumber).toBeDefined();
            expect($scope.oneUpperCaseLetter).toBeDefined();
            expect($scope.oneLowerCaseLetter).toBeDefined();
            expect($scope.oneSpecialCharacter).toBeDefined();

            expect($scope.passwordValidity).toBeDefined();
            expect($scope.passwordValidity).toBeTruthy();
        });

        it('checkNewPassword function call ', function () {
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'NewPassword@$%1223';
            $scope.checkNewPassword();

            expect($scope.lenghtOfPassword).toBeDefined();
            expect($scope.oneNumber).toBeDefined();
            expect($scope.oneUpperCaseLetter).toBeDefined();
            expect($scope.oneLowerCaseLetter).toBeDefined();
            expect($scope.oneSpecialCharacter).toBeDefined();

            expect($scope.passwordValidity).toBeDefined();
            expect($scope.passwordValidity).toBeTruthy();
        });
    });

    describe('changePassword function testing ', function () {
        it('changePassword is defined ', function () {
            expect($scope.changePassword).toBeDefined();
        });

        it('changePassword function call ', function () {
            var formName = {"$valid": "true"};
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = undefined;
            $scope.passwordInfo.currentPassword = undefined;
            $scope.passwordInfo.confirmNewPassword = undefined;
            $scope.changePassword(formName);
        });

        it('changePassword function call with formName.$valid as false', function () {
            var formName = {"$valid": false};

            $scope.changePassword(formName);
        });

        it('changePassword function call with $scope.passwordValidity value as falsy ', function () {
            var formName = {"$valid": "true"};
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'newPassword';
            $scope.passwordInfo.currentPassword = 'currentPassword';
            $scope.passwordInfo.confirmNewPassword = 'newPassword';
            $scope.passwordValidity = false;
            $scope.changePassword(formName);
        });

        it('changePassword function call with $scope.passwordValidity value as truthy and status code as 200 ', function () {
            var formName = {"$valid": "true"};
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'newPassword';
            $scope.passwordInfo.currentPassword = 'currentPassword';
            $scope.passwordInfo.confirmNewPassword = 'newPassword';
            $scope.passwordInfo.effectiveDate = '2015-11-18';
            $scope.passwordValidity = true;
            var inputObject = {
                "employeeId": appConfig.userId,
                "effectiveDate": $scope.passwordInfo.effectiveDate,
                "currentPassword": $scope.passwordInfo.currentPassword,
                "newPassword": $scope.passwordInfo.newPassword
            }, passwordInformationRes = {
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/password?enableValidation=true', inputObject).respond(200, passwordInformationRes);

            $scope.changePassword(formName);
            $httpBackend.flush();
        });

        it('changePassword function call with $scope.passwordValidity value as truthy and status code as 400 ', function () {
            var formName = {"$valid": "true"};
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'newPassword';
            $scope.passwordInfo.currentPassword = 'currentPassword';
            $scope.passwordInfo.confirmNewPassword = 'newPassword';
            $scope.passwordInfo.effectiveDate = '2015-11-18';
            $scope.passwordValidity = true;
            var inputObject = {
                "employeeId": appConfig.userId,
                "effectiveDate": $scope.passwordInfo.effectiveDate,
                "currentPassword": $scope.passwordInfo.currentPassword,
                "newPassword": $scope.passwordInfo.newPassword
            }, passwordInformationRes = {
                "_statusCode": "400",
                "_statusText": "OK", "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/password?enableValidation=true', inputObject).respond(400, passwordInformationRes);

            $scope.changePassword(formName);
            $httpBackend.flush();
        });

        it('changePassword function call with $scope.passwordValidity value as truthy and sttuscode as 400 and call yields failure response', function () {
            var formName = {"$valid": "true"};
            $scope.passwordInfo = {};
            $scope.passwordInfo.newPassword = 'newPassword';
            $scope.passwordInfo.currentPassword = 'currentPassword';
            $scope.passwordInfo.confirmNewPassword = 'newPassword';
            $scope.passwordValidity = true;
            var inputObject = {
                    "personId": appConfig.appUserId,
                    "effectiveDate": '2015-11-18',
                    "currentPassword": $scope.passwordInfo.currentPassword,
                    "newPassword": $scope.passwordInfo.newPassword
                },
                passwordInformationRes = {
                    "_statusCode": "400",
                    "_statusText": "OK"
                };

            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.appUserId + '/password?enableValidation=true', inputObject).respond(400, passwordInformationRes);
            $scope.changePassword(formName);
        });
    });

    describe('saveSecurityQuestionInfo function testing ', function () {
        it('saveSecurityQuestionInfo is defined ', function () {
            expect($scope.saveSecurityQuestionInfo).toBeDefined();
        });

        it('saveSecurityQuestionInfo function call with form_name.$valid as false', function () {
            var form_name = {"$valid": false};
            $scope.saveSecurityQuestionInfo(form_name);
        });

        it('saveSecurityQuestionInfo function call yielding success response with security question as own', function () {
            var form_name = {"$valid": true};
            $scope.questionsData = {};
            $scope.questionsData.secQuestion = "wat's ur pet name?";
            $scope.questionsData.answer = 'jk';
            $scope.questionsData.securityQuestion = 'own';
            var inputObject = {
                employeeId: appConfig.userId,
                question: $scope.questionsData.secQuestion,
                answer: $scope.questionsData.answer
            };
            var secResponse = {
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/secret?enableValidation=true', inputObject).respond(200, secResponse);

            $scope.saveSecurityQuestionInfo(form_name);
            $httpBackend.flush();
        });

        it('saveSecurityQuestionInfo function call yielding failure response with security question as own', function () {
            var form_name = {"$valid": true};
            $scope.questionsData = {};
            $scope.questionsData.secQuestion = "wat's ur pet name?";
            $scope.questionsData.answer = 'jk';
            $scope.questionsData.securityQuestion = 'own';
            var inputObject = {
                employeeId: appConfig.userId,
                question: $scope.questionsData.secQuestion,
                answer: $scope.questionsData.answer
            };
            var secFailureResponse = {
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.userId + '/secret?enableValidation=true', inputObject).respond(400, secFailureResponse);

            $scope.saveSecurityQuestionInfo(form_name);
            $httpBackend.flush();
        });

        it('saveSecurityQuestionInfo function call yielding success response with question as not own', function () {
            var form_name = {"$valid": true};
            $scope.questionsData = {};
            $scope.questionsData.secQuestion = "wat's ur pet name?";
            $scope.questionsData.answer = 'jk';
            $scope.questionsData.securityQuestion = "wat's ur pet name?";
            appConfig.appUserId = appConfig.userId;
            var inputObject = {
                    employeeId: appConfig.appUserId,
                    question: $scope.questionsData.secQuestion,
                    answer: $scope.questionsData.answer
                },
                saveSecurityQuestionsInformationnRes = {
                    "_statusCode": "200",
                    "_statusText": "OK"
                };
            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.appUserId + '/secret?enableValidation=true', inputObject).respond(200, saveSecurityQuestionsInformationnRes);

            $scope.saveSecurityQuestionInfo(form_name);
            $httpBackend.flush();
        });

        it('saveSecurityQuestionInfo function call yielding failure response with question as not own', function () {
            var form_name = {"$valid": true};
            $scope.questionsData = {};
            $scope.questionsData.secQuestion = "wat's ur pet name?";
            $scope.questionsData.answer = 'jk';
            $scope.questionsData.securityQuestion = "wat's ur pet name?";
            appConfig.appUserId = appConfig.userId;
            var inputObject = {
                    employeeId: appConfig.appUserId,
                    question: $scope.questionsData.secQuestion,
                    answer: $scope.questionsData.answer
                },
                saveSecurityQuestionsFailureRes = {
                   "_statusCode": "400",
                   "_statusText": "OK",
                   "_error": {"detailMessage": "error"}
               };
            $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + appConfig.appUserId + '/secret?enableValidation=true', inputObject).respond(400, saveSecurityQuestionsFailureRes);

            $scope.saveSecurityQuestionInfo(form_name);
            $httpBackend.flush();
        });
    });

    describe('addNewProxy function testing ', function () {
        it('addNewProxy is defined ', function () {
            expect($scope.addNewProxy).toBeDefined();
        });

        it('addNewProxy function call ', function () {
            $scope.addNewProxy();
            expect($scope.proxyInformation).toBeDefined();
            expect($scope.proxyInformation).toBeTruthy();
            expect($scope.noProxyInformation).toBeDefined();
            expect($scope.noProxyInformation).toBeTruthy();
        });
    });

    describe('cancelAddNewProxy function testing ', function () {
        it('cancelAddNewProxy is defined ', function () {
            expect($scope.cancelAddNewProxy).toBeDefined();
        });
        it('cancelAddNewProxy function call ', function () {
            $scope.cancelAddNewProxy();
            expect($scope.proxyInformation).toBeDefined();
            expect($scope.proxyInformation).toBeFalsy();
            expect($scope.noProxyInformation).toBeDefined();
            expect($scope.noProxyInformation).toBeFalsy();
        });
    });

    describe('saveProxy function testing ', function () {
        it('saveProxy is defined ', function () {
            expect($scope.saveProxy).toBeDefined();
        });

        it('saveProxy function call with success response', function () {
            var formName = {"$valid": "true"};
            $scope.proxy = {};
            $scope.proxy = {effectiveDate: "2016-07-10", endDate: "2016-07-21", fullName: "firstName,lastName surName 12312312312"};
            var tempName = $scope.proxy.fullName.split(',');
            var saveProxyResponse = {
                "_statusCode": "200"
            };
            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy?enableValidation=true', $scope.proxy).respond(200, saveProxyResponse);

            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy').respond(200, proxyResponse);

            $scope.saveProxy(formName);
            $httpBackend.flush();
        });

        it('saveProxy function call with failure response', function () {
            var formName = {"$valid": "true"};
            $scope.proxy = {};
            $scope.proxy = {effectiveDate: "2016-07-10", endDate: "2016-07-21", fullName: "firstName,lastName surName 12312312312"};
            var saveProxyFailureResponse = {
               "_statusCode": "400",
               "_statusText": "OK",
               "_error": {"detailMessage": "error"}
            };
            $httpBackend.when('POST', profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy?enableValidation=true', $scope.proxy).respond(400, saveProxyFailureResponse);

            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileSecurityCustomLogin + appConfig.companyId + '/' + $scope.appUserId + '/proxy').respond(400, saveProxyFailureResponse);
            $scope.saveProxy(formName);
            $httpBackend.flush();
        });

        it('saveProxy function call with formName as false', function () {
            var formName = {"$valid": false};

            $scope.saveProxy(formName);

        });
    });

    describe('checkFormat function testing ', function () {
        it('checkFormat is defined ', function () {
            expect($scope.checkFormat).toBeDefined();
        });

        it('checkFormat function call ', function () {
            $scope.checkFormat('2015-12-22');
        });
    });

    describe('compareDates function testing ', function () {
        it('compareDates is defined ', function () {
            expect($scope.compareDates).toBeDefined();
        });

        it('compareDates function call ', function () {
            $scope.compareDates(new Date());
        });
    });

    describe('onFocus function testing', function () {
        it('onFocus is defined', function () {
            expect($scope.onFocus).toBeDefined();
        });

        it('onFocus function call with proxy', function () {
            var name = 'proxy';
            var obj = {
                proxy: {
                    blur: {
                        securityFormfirstNameRequired: null,
                        securityFormlastNameRequired: null,
                        securityFormemployeeIdRequired: null,
                        securityFormeffectiveDateRequired: null,
                        securityFormendDateRequired: null
                    },
                    focus: {
                        securityFormfirstNameRequired: null,
                        securityFormlastNameRequired: null,
                        securityFormemployeeIdRequired: null,
                        securityFormeffectiveDateRequired: null,
                        securityFormendDateRequired: null
                    }
                }
            };
            $scope.onFocus(name, obj.proxy.focus);
        });

        it('onFocus function call with customId', function () {
            var name = 'customId';
            var obj = {
                customId: {
                    blur: {
                        customIdRequired: null,
                        customIdPattern: null
                    },
                    focus: {
                        customIdRequired: null,
                        customIdPattern: null
                    }
                }
            };
            $scope.onFocus(name, obj.customId.focus);
        });

        it('onFocus function call with password', function () {
            var name = 'password';
            var obj = {
                password: {
                    blur: {
                        securityFormcurrentPasswordRequired: null,
                        securityFormnewPasswordRequired: null,
                        newPasswordValidation: null,
                        securityFormconfirmNewPasswordRequired: null,
                        confirmNewPwdError: null

                    },
                    focus: {
                        securityFormcurrentPasswordRequired: null,
                        securityFormnewPasswordRequired: null,
                        newPasswordValidation: null,
                        securityFormconfirmNewPasswordRequired: null,
                        confirmNewPwdError: null
                    }
                }
            };
            $scope.onFocus(name, obj.password.focus);
        });
    });

    describe('deleteProxy function testing', function () {

        it('deleteProxy is defined', function () {
            expect($scope.deleteProxy).toBeDefined();
        });
        it('deleteProxy function call testing with success response', function () {
            var obj = {effectiveDate: '2015-12-25'};
            $scope.deleteProxy(obj);
        });

    });

    describe('onSelect function testing',function(){
        it('onSelect is defined',function(){
            expect($scope.onSelect).toBeDefined();
        });

        it('onSelect function call with middle name',function(){
            var item = {name:'John,Larry M',employeeId:'00001000485'};
            $scope.onSelect(item);
        });

        it('onSelect function call without middle name',function(){
            var item = {name:'John,Larry',employeeId:'00001000485'};
            $scope.onSelect(item);
        });
    });

});
*/
