/*
/!**
 * Created by Jayakrishna on 10/29/2015.
 *!/

(function () {

    "use strict";

    describe('Contact Methods Model Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            contactMethodDataResponse = {
                "data": [{
                    "personId": "00001005514",
                    "uniqueId": 1,
                    "accessType": "Work",
                    "media": "Email",
                    "telephoneNumber": "456-456-9874",
                    "url": "john.gouri@trinet.com",
                    "notes": null,
                    "effectiveDate": "2005-01-01",
                    "actualAccessType": "Work"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                appConfig = $injector.get('appConfig');

                $scope.visibleContact = false;
                $scope.toggleContact = function () {
                    $scope.visibleContact = !$scope.visibleContact;
                };

                $scope.appUserId = appConfig.userId;


                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };

                $scope.converttophoneformat = function (phone){
                    return phone;
                };

                $injector.get('$controller')('contactMethodsModelCtrl', {
                    $scope: $scope
                });
                $httpBackend = $injector.get('$httpBackend');

            });


        });

        it('if condition testing', function () {
            function fun() {
                if (typeof $scope.appUserId === 'undefined') {
                    $scope.appUserId = appConfig.userId;
                }
            };
            $scope.appUserId = undefined;
            $scope.appUserId = appConfig.userId;
            fun();
        });

        describe('cancel function testing', function () {

            it('cancel is defined', function () {
                expect($scope.cancel).toBeDefined();
            });

            it('cancel function call testing', function () {

                spyOn($scope, 'toggleContact');

                $scope.cancel();

                expect($scope.toggleContact).toHaveBeenCalled();

                $scope.removeFields = [{
                    name: 'name'
                }, {
                    name: 'name1'
                }];
                $scope.contactMethodData = [];
                $scope.cancel();

            });

        });


        describe('addNewEmailField function testing', function () {

            it('addNewEmailField is defined', function () {
                expect($scope.addNewEmailField).toBeDefined();
            });

            it('addNewEmailField function call testing', function () {
                $scope.contactMethodData = contactMethodDataResponse.data;
                $scope.accessTypes = [{"key":"Work","value":"Work"},{"key":"Emerg","value":"Emergency"},
                            {"key":"Home","value":"Home"},{"key":"Other","value":"Other"},
                            {"key":"Work2","value":"Second Work"},{"key":"Campus","value":"Campus"},
                            {"key":"Dorm","value":"Dormitory"}];
                $scope.addNewEmailField();
                expect($scope.contactMethodData).toBeDefined();


            });

            it('addNewEmailField function call testing with null data', function () {
                $scope.contactMethodData = null;
                $scope.accessTypes = [{"key":"Work","value":"Work"},{"key":"Emerg","value":"Emergency"},
                                            {"key":"Home","value":"Home"},{"key":"Other","value":"Other"},
                                            {"key":"Work2","value":"Second Work"},{"key":"Campus","value":"Campus"},
                                            {"key":"Dorm","value":"Dormitory"}];
                $scope.addNewEmailField();
            });

        });


        describe('addNewPhoneField function testing', function () {

            it('addNewPhoneField is defined', function () {
                expect($scope.addNewPhoneField).toBeDefined();
            });

            it('addNewPhoneField function call testing', function () {
                $scope.contactMethodData = contactMethodDataResponse.data;
                $scope.accessTypes = [{"key":"Work","value":"Work"},{"key":"Emerg","value":"Emergency"},
                                            {"key":"Home","value":"Home"},{"key":"Other","value":"Other"},
                                            {"key":"Work2","value":"Second Work"},{"key":"Campus","value":"Campus"},
                                            {"key":"Dorm","value":"Dormitory"}];
                $scope.addNewPhoneField();
                expect($scope.contactMethodData).toBeDefined();


            });

            it('addNewPhoneField function call testing with null data', function () {
                $scope.contactMethodData = null;
                $scope.accessTypes = [{"key":"Work","value":"Work"},{"key":"Emerg","value":"Emergency"},
                                            {"key":"Home","value":"Home"},{"key":"Other","value":"Other"},
                                            {"key":"Work2","value":"Second Work"},{"key":"Campus","value":"Campus"},
                                            {"key":"Dorm","value":"Dormitory"}];
                $scope.addNewPhoneField();
            });

        });

        describe('updateData function testing ', function () {
            it('updateData is defined ', function () {
                expect($scope.updateData).toBeDefined();
            });

            it('updateData function call testing', function () {
                $scope.calculateLength = function () {
                    var length = {};
                    $scope.emailStart = -1;
                    $scope.phoneStart = -1;
                    length.emailLength = 0;
                    length.phoneLength = 0;


                    length.start = length.emailLength - 1;
                    if (length.start < 0) {
                        length.start = 0;
                    } else {
                        length.start = length.emailLength - 1;
                    }

                    return length;
                };
                $scope.contactMethodForm = {};
                $scope.contactMethodForm.$valid = false;
                $scope.contactMethodData = [{
                                           "personId": "00001005514",
                                           "uniqueId": 1,
                                           "accessType": "Work",
                                           "media": "Email",
                                           "telephoneNumber": "456-456-9874",
                                           "url": "john.gouri@trinet.com",
                                           "notes": null,
                                           "effectiveDate": "2005-01-01",
                                           "actualAccessType": "Work"
                                       }];
                $scope.updateData();

            });

            it('updateData function call with success response', function () {
                $scope.contactMethodForm = {};
                $scope.contactMethodForm.$valid = true;
                $scope.contactMethodData = [{
                                              "personId": "00001005514",
                                              "uniqueId": 1,
                                              "accessType": "Work",
                                              "media": "Email",
                                              "telephoneNumber": "9848072340",
                                              "url": "john.gouri@trinet.com",
                                              "notes": null,
                                              "emailType":{"key":"H"},
                                              "phoneType":{"key":"R"},
                                              "effectiveDate": "2005-01-01",
                                              "actualAccessType": "Work"
                                          }];
                $scope.removeFields = [{}];

                var data = {
                    "contactList": $scope.contactMethodData
                }, res = {
                    "contactList": [{
                        "personId": "00001023062",
                        "uniqueId": 1,
                        "accessType": "Work",
                        "media": "Email",
                        "telephoneNumber": null,
                        "countryCode": null,
                        "locationCode": null,
                        "url": "john.gouri9861@trinet.com",
                        "notes": null,
                        "effectiveDate": "2016-01-01",
                        "actualAccessType": "Work"
                    }],
                    "_statusCode": "200",
                    "_statusText": "OK"
                };
                $scope.calculateLength = function () {
                };
                var putUrl = '?operation=all&enableValidation=true';
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.contact + putUrl, data).respond(200, res);

                $scope.updateData();
                $httpBackend.flush();
            });

            it('updateData function call with failure response', function () {
                $scope.contactMethodForm = {};
                $scope.contactMethodForm.$valid = true;
                $scope.contactMethodData = [{
                                          "personId": "00001005514",
                                          "uniqueId": 1,
                                          "accessType": "Work",
                                          "media": "Email",
                                          "telephoneNumber": "9848072340",
                                          "url": "john.gouri@trinet.com",
                                          "notes": null,
                                          "emailType":{"key":"H"},
                                          "phoneType":{"key":"R"},
                                          "effectiveDate": "2005-01-01",
                                          "actualAccessType": "Work"
                                      }];
                $scope.removeFields = [{}];

                var data = {
                    "contactList": $scope.contactMethodData
                }, res = {
                    "contactList": [{
                        "personId": "00001023062",
                        "uniqueId": 1,
                        "accessType": "Work",
                        "media": "Email",
                        "telephoneNumber": null,
                        "countryCode": null,
                        "locationCode": null,
                        "url": "john.gouri9861@trinet.com",
                        "notes": null,
                        "effectiveDate": "2016-01-01",
                        "actualAccessType": "Work"
                    }],
                    "_errorCode": "400",
                    "_statusText": "NOT OK",
                    "_error": {"detailMessage": "error"}
                };
                $scope.calculateLength = function () {
                };
                var putUrl = '?operation=all&enableValidation=true';
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.contact + putUrl, data).respond(400, res);

                $scope.updateData();
                $httpBackend.flush();
            });

        });

        describe('removeField function testing ', function () {
            it('removeField is defined ', function () {
                expect($scope.removeField).toBeDefined();
            });

            it('removeField function call with success response', function () {
                $scope.contactMethodData = [];
                $scope.contactMethodData.push({
                    phone: '254654654',
                    url: 'jkahsdf',
                    telephoneNumber: '54546',
                    actualAccessType: 'sdfasdf',
                    media: 'asdf'
                });
                $scope.contactMethodData.push({phone: '254654654'});
                $scope.contactMethodData.push({url: ''});
                $scope.contactMethodData.push({telephoneNumber: ''});
                var index = 0;
                $scope.removeField(index);
            });

            it('removeField function call with success response and url as null', function () {
                $scope.contactMethodData = [];
                $scope.contactMethodData.push({
                    phone: '254654654',
                    url: '',
                    telephoneNumber: '54546',
                    actualAccessType: 'sdfasdf',
                    media: 'asdf'
                });
                $scope.contactMethodData.push({phone: '254654654'});
                $scope.contactMethodData.push({url: ''});
                $scope.contactMethodData.push({telephoneNumber: ''});
                var index = 0;
                $scope.removeField(index);
            });

            it('removeField function call with failure response', function () {
                $scope.contactMethodData = [];
                $scope.contactMethodData.push({
                    phone: '254654654',
                    url: 'jkahsdf',
                    telephoneNumber: '54546',
                    actualAccessType: 'sdfasdf',
                    media: 'asdf'
                });
                $scope.contactMethodData.push({phone: '254654654'});
                $scope.contactMethodData.push({url: ''});
                $scope.contactMethodData.push({telephoneNumber: ''});
                var index = 0;
                $scope.removeField(index);
            });
        });

    });


}());
*/
