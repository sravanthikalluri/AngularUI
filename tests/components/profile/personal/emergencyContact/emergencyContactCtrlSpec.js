/*
 /!*Created by ganesh on 10/29/2015.*!/


(function () {

    "use strict";

    describe('Emergency Contact Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            $routeParams,
            utilService,
            emergencyContactDataResponse = {
                                               "data": [
                                                   {
                                                       "name": {
                                                           "firstName": null,
                                                           "fullName": "Smith,John",
                                                           "middleName": null,
                                                           "lastName": "Smith,John"
                                                       },
                                                       "address": {
                                                           "address1": " ",
                                                           "address2": " ",
                                                           "address3": " ",
                                                           "address4": " ",
                                                           "city": " ",
                                                           "country": "US",
                                                           "county": " ",
                                                           "state": " ",
                                                           "postalCode": " "
                                                       },
                                                       "telephoneNumbers": {
                                                           "telephoneNumber1": " ",
                                                           "telephoneNumber2": null,
                                                           "telephoneNumber3": null,
                                                           "telephoneNumber4": null
                                                       },
                                                       "contactRelationship": "O",
                                                       "employeeId": "00001000485",
                                                       "primaryContactFlag": "Y",
                                                       "sameAddressPerson": "N",
                                                       "samePhonePerson": "N",
                                                       "uniqueId": 1
                                                   }
                                               ],
                                               "_statusCode": "200",
                                               "_statusText": "OK"
                                           },
            countriesDataResponse = {
                "data": [{
                    "key": "CA",
                    "value": "Canada"
                }, {
                    "key": "US",
                    "value": "United States of America"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            statesDataResponse = {
                "data": [{
                    "key": "AL",
                    "value": "Alabama"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            relationShipsDataResponse = {
                "data": [{
                    "key": "O",
                    "value": "Domestic Partner Adult"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000483';
                $injector.get('$controller')('emergencyContactCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $routeParams = $injector.get('$routeParams');
            });

            $scope.appUserId = appConfig.userId;

            var appUserId = $scope.appUserId,
                companyId = appConfig.companyId;


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(countriesDataResponse);


            $httpBackend
                .whenGET('/api-config/v1/global/countries/CA/states').respond(statesDataResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/relationships').respond(relationShipsDataResponse);


            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                    companyId + '/' + appUserId + profileUrlConfig.resources.emergencyContact).respond(emergencyContactDataResponse);

            $httpBackend.flush();


            $routeParams = {selectedTab: 'employee', empId: appConfig.userId};

            toggleSelectTab($routeParams, $scope);


        });

        it('empId != undefined content testing', function () {

            $routeParams = {selectedTab: 'employee', empId: appConfig.userId};

            toggleSelectTab($routeParams, $scope);

            expect($scope.appUserId).toEqual($routeParams.empId);
            expect($scope.notMeTab).toBeTruthy();


        });

        it('empId = undefined content testing', function () {

            $routeParams = {selectedTab: 'employee', empId: undefined};

            toggleSelectTab($routeParams, $scope);

            expect($scope.tab).toEqual($routeParams.selectedTab);


        });

        describe('$on function testing for saveEvent', function () {
            it('saveEvent function testing', function () {
                var obj = [{
                    "personId": "00001005514",
                    "fullName": "irfan",
                    "uniqueId": 1,
                    "primaryIndicator": "N",
                    "designeeRelation": "O",
                    "name": "irfan",
                    "middleName": null,
                    "firstName": "irfan",
                    "sameAdressPerson": "N",
                    "line1": "Main street",
                    "line2": "Mathew",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "county": "US",
                    "stateProvinceCode": "CA",
                    "postalCode": "94612",
                    "countryCode": "US",
                    "samePhonePerson": "N",
                    "telephoneNumber1": "2121231312",
                    "telephoneNumber2": null,
                    "telephoneNumber3": null,
                    "telephoneNumber4": null
                }];
                $rootScope.$broadcast('saveEvent', obj);
            });
        });

        describe('$on function testing for editSaveEvent', function () {
            it('editSaveEvent function testing', function () {
                var obj = [{
                    "personId": "00001005514",
                    "fullName": "irfan",
                    "uniqueId": 1,
                    "primaryIndicator": "N",
                    "designeeRelation": "O",
                    "name": "irfan",
                    "middleName": null,
                    "firstName": "irfan",
                    "sameAdressPerson": "N",
                    "line1": "Main street",
                    "line2": "Mathew",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "county": "US",
                    "stateProvinceCode": "CA",
                    "postalCode": "94612",
                    "countryCode": "US",
                    "samePhonePerson": "N",
                    "telephoneNumber1": "2121231312",
                    "telephoneNumber2": null,
                    "telephoneNumber3": null,
                    "telephoneNumber4": null
                }];
                $rootScope.$broadcast('editSaveEvent', obj);
            });
        });

        describe('showHideAddress function testing', function () {

            it('showHideAddress is defined', function () {
                expect($scope.showHideAddress).toBeDefined();
            });

            it('showHideAddress function call testing', function () {
                var type = "show";
                var index = 0;


                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(200, countriesDataResponse);

                $scope.showHideAddress(type, index);

            });

            it('showHideAddress function call testing', function () {
                var type = "hide";
                var index = 0;


                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(200, countriesDataResponse);

                $scope.showHideAddress(type, index);

            });
        });

        describe('populateStates function testing', function () {

            it('populateStates is defined', function () {
                expect($scope.populateStates).toBeDefined();
            });

            it('populateStates function call testing', function () {
                var country = {key: 'CA'};
                var index = 0;
                var statesResponse = {
                    "data": [{"key": "AL", "value": "Alabama"}, {
                        "key": "AK",
                        "value": "Alaska"
                    }, {"key": "AS", "value": "American Samoa"}, {"key": "AZ", "value": "Arizona"}, {
                        "key": "AR",
                        "value": "Arkansas"
                    }, {"key": "CA", "value": "California"}, {"key": "CO", "value": "Colorado"}, {
                        "key": "CT",
                        "value": "Connecticut"
                    }, {"key": "DE", "value": "Delaware"}, {"key": "DC", "value": "District of Columbia"}, {
                        "key": "FL",
                        "value": "Florida"
                    }, {"key": "GA", "value": "Georgia"}, {"key": "GU", "value": "Guam"}, {
                        "key": "HI",
                        "value": "Hawaii"
                    }, {"key": "ID", "value": "Idaho"}, {"key": "IL", "value": "Illinois"}, {
                        "key": "IN",
                        "value": "Indiana"
                    }, {"key": "IA", "value": "Iowa"}, {"key": "KS", "value": "Kansas"}, {
                        "key": "KY",
                        "value": "Kentucky"
                    }, {"key": "LA", "value": "Louisiana"}, {"key": "ME", "value": "Maine"}, {
                        "key": "MD",
                        "value": "Maryland"
                    }, {"key": "MA", "value": "Massachusetts"}, {"key": "MI", "value": "Michigan"}, {
                        "key": "MN",
                        "value": "Minnesota"
                    }, {"key": "MS", "value": "Mississippi"}, {"key": "MO", "value": "Missouri"}, {
                        "key": "MT",
                        "value": "Montana"
                    }, {"key": "NE", "value": "Nebraska"}, {"key": "NV", "value": "Nevada"}, {
                        "key": "NH",
                        "value": "New Hampshire"
                    }, {"key": "NJ", "value": "New Jersey"}, {"key": "NM", "value": "New Mexico"}, {
                        "key": "NY",
                        "value": "New York"
                    }, {"key": "NC", "value": "North Carolina"}, {"key": "ND", "value": "North Dakota"}, {
                        "key": "OH",
                        "value": "Ohio"
                    }, {"key": "OK", "value": "Oklahoma"}, {"key": "OR", "value": "Oregon"}, {
                        "key": "PA",
                        "value": "Pennsylvania"
                    }, {"key": "PR", "value": "Puerto Rico"}, {"key": "RI", "value": "Rhode Island"}, {
                        "key": "SC",
                        "value": "South Carolina"
                    }, {"key": "SD", "value": "South Dakota"}, {"key": "TN", "value": "Tennessee"}, {
                        "key": "TX",
                        "value": "Texas"
                    }, {"key": "UT", "value": "Utah"}, {"key": "VT", "value": "Vermont"}, {
                        "key": "VI",
                        "value": "Virgin Islands"
                    }, {"key": "VA", "value": "Virginia"}, {"key": "WA", "value": "Washington"}, {
                        "key": "WV",
                        "value": "West Virginia"
                    }, {"key": "WI", "value": "Wisconsin"}, {"key": "WY", "value": "Wyoming"}],
                    "_statusCode": "200",
                    "_statusText": "OK"
                };

                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + country.key + '/states').respond(200, statesResponse);
                $scope.populateStates(country, index);
            /!*    $httpBackend.flush();
                expect($scope.editStatesData).toBeDefined();

                expect($scope.statesData).toBeDefined();*!/



            });

            it('populateStates function call testing with country as undefined', function () {
                var country;
                var index = 0;
                $scope.populateStates(country, index);
            });
        });

        describe('starFn function testing', function () {

            it('starFn is defined', function () {
                expect($scope.starFn).toBeDefined();
            });

            it('starFn function call testing', function () {

                var type = 'star',
                    value = 'Y';

                expect($scope.starFn).toBeDefined();
                expect($scope.starFn(type, value)).toBeTruthy();

                var type1 = 'starr',
                    value1 = 'Y';
                expect($scope.starFn(type1, value1)).toBeTruthy();

                expect($scope.starFn(type1, 'N')).toBeFalsy();

                $scope.starFn(type1, value1);
                expect($scope.editSameAsAddress).toBeTruthy();


            });
        });

        describe('addNewEmergencyContact function testing',function(){
            it('addNewEmergencyContact is defined',function(){
                expect($scope.addNewEmergencyContact).toBeDefined();
            });

            it('addNewEmergencyContact function call',function(){
                $scope.addNewEmergencyContact();
            });
        });

        describe('saveData function testing ', function () {

            it('saveData is defined ', function () {
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call with success response', function () {
                var formName = {$valid:true};
                $scope.isEditEmergencyContact = false;
                $scope.createEmergencyContact = {};
                $scope.createEmergencyContact.county = {"Key": "US"};
                $scope.createEmergencyContact.state = {"Key": "CA"};
                $scope.createEmergencyContact.designeeRelation = {
                	key: 'key1'
                };
                $scope.createEmergencyContact.contactName = "John Cena";
                $scope.createEmergencyContact.address1 = "street1";
                $scope.createEmergencyContact.address2 = "street2";
                $scope.createEmergencyContact.address3 = "street3";
                $scope.createEmergencyContact.address4 = "street4";
                $scope.createEmergencyContact.city = "city";
                $scope.createEmergencyContact.postalCode = "123456";
                $scope.createEmergencyContact.county.key = "US";
                $scope.createEmergencyContact.state.key = "CA";
                $scope.createEmergencyContact.telephoneNumber1 = "123456789";
                $scope.createEmergencyContact.designeeRelation.key = "S";
                $scope.createEmergencyContact.samePhonePerson = "N";
                $scope.createEmergencyContact.uniqueId = 1;
                $scope.createEmergencyContact.employeeId = '00001000483';
                $scope.createEmergencyContact.sameAdressPerson = 'N';

                var createEmergencyContact = {
                                                 name:{
                                                     middleName: null,
                                                     fullName: 'John Cena'
                                                 },
                                                 address:{
                                                     address1: 'street1',
                                                     address2: 'street2',
                                                     address3: 'street3',
                                                     address4: 'street4',
                                                     city: 'city',
                                                     postalCode: '123456',
                                                     country: 'US',
                                                     state: 'CA'
                                                 },
                                                 telephoneNumbers:{
                                                     telephoneNumber1: '123456789',
                                                     telephoneNumber2: null,
                                                     telephoneNumber3: null,
                                                     telephoneNumber4: null
                                                 },
                                                 contactRelationship: 'S',
                                                 samePhonePerson: 'N',
                                                 uniqueId: 1,
                                                 employeeId: '00001000483',
                                                 sameAddressPerson: 'N',
                                                 primaryContactFlag: 'N'
                                             };

                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.emergencyContact + '?enableValidation=true';

                var updateResponse = {
                    "_statusCode": "200", "_statusText": "OK"
                };

                $httpBackend.when('POST', url, createEmergencyContact).respond(200, updateResponse);

                $scope.saveData(formName);
                $httpBackend.flush();

            });

            it('saveData function call with success response with inner call as failure', function () {
                var formName = {$valid:true};
                $scope.isEditEmergencyContact = false;
                $scope.createEmergencyContact = {};
                $scope.createEmergencyContact.county = {"Key": "US"};
                $scope.createEmergencyContact.state = {"Key": "CA"};
                $scope.createEmergencyContact.designeeRelation = {
                    key: 'key1'
                };
                $scope.createEmergencyContact.contactName = "John Cena";
                $scope.createEmergencyContact.address1 = "street1";
                $scope.createEmergencyContact.address2 = "street2";
                $scope.createEmergencyContact.address3 = "street3";
                $scope.createEmergencyContact.address4 = "street4";
                $scope.createEmergencyContact.city = "city";
                $scope.createEmergencyContact.postalCode = "123456";
                $scope.createEmergencyContact.county.key = "US";
                $scope.createEmergencyContact.state.key = "CA";
                $scope.createEmergencyContact.telephoneNumber1 = "123456789";
                $scope.createEmergencyContact.designeeRelation.key = "S";
                $scope.createEmergencyContact.samePhonePerson = "N";
                $scope.createEmergencyContact.uniqueId = 1;
                $scope.createEmergencyContact.employeeId = '00001000483';
                $scope.createEmergencyContact.sameAdressPerson = 'N';
                var createEmergencyContact = {
                                                 name:{
                                                     middleName: null,
                                                     fullName: 'John Cena'
                                                 },
                                                 address:{
                                                     address1: 'street1',
                                                     address2: 'street2',
                                                     address3: 'street3',
                                                     address4: 'street4',
                                                     city: 'city',
                                                     postalCode: '123456',
                                                     country: 'US',
                                                     state: 'CA'
                                                 },
                                                 telephoneNumbers:{
                                                     telephoneNumber1: '123456789',
                                                     telephoneNumber2: null,
                                                     telephoneNumber3: null,
                                                     telephoneNumber4: null
                                                 },
                                                 contactRelationship: 'S',
                                                 samePhonePerson: 'N',
                                                 uniqueId: 1,
                                                 employeeId: '00001000483',
                                                 sameAddressPerson: 'N',
                                                 primaryContactFlag: 'N'
                                             };

                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.emergencyContact + '?enableValidation=true';

                var updateResponse = {
                    "_statusCode": "200", "_statusText": "OK"
                };
                $httpBackend.when('POST', url, createEmergencyContact).respond(200, updateResponse);

                $scope.saveData(formName);
                $httpBackend.flush();

            });

            it('saveData function call with failure response ', function () {
                var formName = {$valid:true};
                $scope.isEditEmergencyContact = false;
                $scope.createEmergencyContact = {};
                $scope.createEmergencyContact.county = {"Key": "US"};
                $scope.createEmergencyContact.state = {"Key": "CA"};
                $scope.createEmergencyContact.designeeRelation = {
                    key: 'key1'
                };
                $scope.createEmergencyContact.contactName = "John Cena";
                $scope.createEmergencyContact.address1 = "street1";
                $scope.createEmergencyContact.address2 = "street2";
                $scope.createEmergencyContact.address3 = "street3";
                $scope.createEmergencyContact.address4 = "street4";
                $scope.createEmergencyContact.city = "city";
                $scope.createEmergencyContact.postalCode = "123456";
                $scope.createEmergencyContact.county.key = "US";
                $scope.createEmergencyContact.state.key = "CA";
                $scope.createEmergencyContact.telephoneNumber1 = "123456789";
                $scope.createEmergencyContact.designeeRelation.key = "S";
                $scope.createEmergencyContact.samePhonePerson = "N";
                $scope.createEmergencyContact.uniqueId = 1;
                $scope.createEmergencyContact.employeeId = '00001000483';
                $scope.createEmergencyContact.sameAdressPerson = 'N';
                var createEmergencyContact = {
                                                 name:{
                                                     middleName: null,
                                                     fullName: 'John Cena'
                                                 },
                                                 address:{
                                                     address1: 'street1',
                                                     address2: 'street2',
                                                     address3: 'street3',
                                                     address4: 'street4',
                                                     city: 'city',
                                                     postalCode: '123456',
                                                     country: 'US',
                                                     state: 'CA'
                                                 },
                                                 telephoneNumbers:{
                                                     telephoneNumber1: '123456789',
                                                     telephoneNumber2: null,
                                                     telephoneNumber3: null,
                                                     telephoneNumber4: null
                                                 },
                                                 contactRelationship: 'S',
                                                 samePhonePerson: 'N',
                                                 uniqueId: 1,
                                                 employeeId: '00001000483',
                                                 sameAddressPerson: 'N',
                                                 primaryContactFlag: 'N'
                                             };

                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.emergencyContact + '?enableValidation=true';

                var failureResponse = {
                                      "data": {},
                                      "_statusCode": "400",
                                      "_statusText": "OK",
                                      "_error": {"detailMessage": "error"}
                                  };

                $httpBackend.when('POST', url, createEmergencyContact).respond(400, failureResponse);

                $scope.saveData(formName);
                $httpBackend.flush();
            });

            it('saveData function call with form name as false',function(){
                var formName = {$valid:false};
                $scope.translation = {};
                $scope.translation.pageValidationMessage = 'message';
                $scope.saveData(formName);
            });

        });

        describe('cancel function testing',function(){
            it('cancel is defined',function(){
                expect($scope.cancel).toBeDefined();
            });

            it('cancel function call',function(){
                $scope.cancel();
            });
        });

        describe('deleteEmergencyContact function call',function(){
            it('deleteEmergencyContact is defined',function(){
                expect($scope.deleteEmergencyContact).toBeDefined();
            });

            it('deleteEmergencyContact function call with index as 0',function(){
                var index = 0;
                $scope.deleteEmergencyContact(index);
            });

            it('deleteEmergencyContact function call with index as 1',function(){
                var index = 1;
                $scope.deleteEmergencyContact(index);
            });
        });

        describe('changePrimaryContact function call',function(){
            it('changePrimaryContact is defined',function(){
                expect($scope.changePrimaryContact).toBeDefined();
            });

            it('changePrimaryContact function call with false',function(){
                var value = false;
                $scope.createEmergencyContact = {};
                $scope.createEmergencyContact.primaryIndicator = 'N';
                $scope.changePrimaryContact(value);
            });

            it('changePrimaryContact function call with true',function(){
                var value = true;
                $scope.createEmergencyContact = {};
                $scope.createEmergencyContact.primaryIndicator = 'Y';
                $scope.changePrimaryContact(value);
            });
        });

        describe('setPrimaryContact function call',function(){
            it('setPrimaryContact is defined',function(){
                expect($scope.setPrimaryContact).toBeDefined();
            });

            it('setPrimaryContact function call with true',function(){
                var value = true;
                $scope.setPrimaryContact(value);
            });

            it('setPrimaryContact function call with false',function(){
                $scope.translation = {};
                $scope.translation.profile_personal = {};
                $scope.translation.shared = {};
                $scope.translation.shared.Confirmation = 'Confirmation';
                var value = false;
                $scope.setPrimaryContact(value);
            });
        });

        describe('sameAsAddressFn function testing', function () {

            it('sameAsAddressFn is defined', function () {
                expect($scope.sameAsAddressFn).toBeDefined();
            });

            it('sameAsAddressFn checked with false function call testing', function () {

                var checked = false;

                $scope.duplicateContact = emergencyContactDataResponse.data[0];
                $scope.duplicateContact.address = {};
                $scope.duplicateContact.address.address1 = 'asdfsdf';
                $scope.duplicateContact.address.country = {};
                $scope.duplicateContact.address.country = {key: 'US', value: 'US'};

                $scope.createEmergencyContact = {};

                $scope.isEditEmergencyContact = true;

                $httpBackend.whenGET('/api-config/v1/global/countries/US/states').respond(statesDataResponse);

                $scope.sameAsAddressFn(checked);

                $httpBackend.flush();
            });

            it('sameAsAddressFn checked with false function call testing and country as CA', function () {

                var checked = false;

                $scope.duplicateContact = {
                                            telephoneNumbers: {
                                                telephoneNumber1: '23423423'
                                            },
                                            address: {
                                              address1: 'js-data'
                                            },
                                          "personId": "00001005514",
                                          "fullName": "irfan",
                                          "uniqueId": 1,
                                          "primaryIndicator": "Y",
                                          "designeeRelation": "O",
                                          "name": "irfan",
                                          "middleName": null,
                                          "firstName": "irfan",
                                          "sameAdressPerson": "N",
                                          "line1": "Main street",
                                          "line2": "Mathew",
                                          "line3": null,
                                          "line4": null,
                                          "city": "Anytown",
                                          "county": "US",
                                          "country":"CA",
                                          "state":"AL",
                                          "stateProvinceCode": "CA",
                                          "postalCode": "94612",
                                          "countryCode": "US",
                                          "samePhonePerson": "N",
                                          "telephoneNumber1": "2121231312",
                                          "telephoneNumber2": null,
                                          "telephoneNumber3": null,
                                          "telephoneNumber4": null
                                      };

                $scope.createEmergencyContact = {};

                $scope.isEditEmergencyContact = true;

                $scope.sameAsAddressFn(checked);
            });

            it('sameAsAddressFn checked with false function call testing and isEditEmergencyContact as false', function () {

                var checked = false;

                $scope.createEmergencyContact = {};

                $scope.isEditEmergencyContact = false;

                $scope.sameAsAddressFn(checked);
            });


            it('sameAsAddressFn checked with true function call testing', function () {

                var checked = true;

                $scope.appUserId = appConfig.userId;
                $scope.createEmergencyContact = {};
                $scope.addressData = {};
                $scope.addressData.activeAddressList = [{
                    "addressType": "HOME",
                    "approvalStatus": "F",
                    "line1": "123 Test",
                    "line2": "345 Test",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "country": "US",
                    "county": "US",
                    "employeeId": "00001005514",
                    "effectiveDate": "2015-09-26",
                    "postalCode": "94612",
                    "primaryInd": 0,
                    "state": "CA",
                    "stateProvince": "US",
                    "uniqueId": 7
                }];
                var response = {
                    "data": {
                        "activeAddressList": [{
                            "addressType": "HOME",
                            "approvalStatus": "F",
                            "line1": "123 Test",
                            "line2": "345 Test",
                            "line3": null,
                            "line4": null,
                            "city": "Anytown",
                            "country": "US",
                            "county": "US",
                            "employeeId": "00001005514",
                            "effectiveDate": "2015-09-26",
                            "postalCode": "94612",
                            "primaryInd": 0,
                            "state": "CA",
                            "stateProvince": "US",
                            "uniqueId": 7
                        }],
                        "historyAddressList": [{
                            "addressType": "HOME",
                            "approvalStatus": "F",
                            "address1": "123 Test",
                            "address2": "345 Test",
                            "address3": null,
                            "address4": null,
                            "city": "Anytown",
                            "country": "US",
                            "county": "US",
                            "employeeId": "00001005514",
                            "effectiveDate": "2015-09-25",
                            "postalCode": "94612",
                            "primaryInd": 0,
                            "state": "CA",
                            "stateProvince": null,
                            "uniqueId": 6
                        }]
                    }, "_statusCode": "200", "_statusText": "OK"
                };
                var res = {
                    "data": [{"key": "US", "value": "Alabama"}], "_statusCode": "200", "_statusText": "OK"
                };

                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.addresses).respond(200, response);
                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/US/states').respond(200, res);

                $scope.sameAsAddressFn(checked);
                //$httpBackend.flush();


            });

            it('sameAsAddressFn checked with true function call testing with failure response', function () {

                var checked = true;
                $scope.addressData = {};
                $scope.addressData.activeAddressList = [{
                    "addressType": "HOME",
                    "approvalStatus": "F",
                    "line1": "123 Test",
                    "line2": "345 Test",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "country": "US",
                    "county": "US",
                    "employeeId": "00001005514",
                    "effectiveDate": "2015-09-26",
                    "postalCode": "94612",
                    "primaryInd": 0,
                    "state": "CA",
                    "stateProvince": "US",
                    "uniqueId": 7
                }];
                $scope.appUserId = appConfig.userId;
                $scope.createEmergencyContact = {};

                var response = {
                    "data": {},
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                };
                var res = {
                    "data": [{"key": "AL", "value": "Alabama"}], "_statusCode": "200", "_statusText": "OK"
                };

                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.addresses).respond(400, response);
                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/US/states').respond(200, res);

                $scope.sameAsAddressFn(checked);
                //$httpBackend.flush();


            });


        });

        describe('editEmergencyContact function testing',function(){
            it('editEmergencyContact is defined',function(){
                expect($scope.editEmergencyContact).toBeDefined();
            });

            it('editEmergencyContact function call with country CA',function(){

                 var contact = {
                                telephoneNumbers: {
                                    telephoneNumber1: '234234234'
                                },
                                address: {
                                    country: 'CA'
                                },
                               "personId": "00001005514",
                               "fullName": "irfan",
                               "uniqueId": 1,
                               "primaryIndicator": "Y",
                               "designeeRelation": "O",
                               "name": "irfan",
                               "middleName": null,
                               "firstName": "irfan",
                               "sameAdressPerson": "N",
                               "line1": "Main street",
                               "line2": "Mathew",
                               "line3": null,
                               "line4": null,
                               "city": "Anytown",
                               "county": "US",
                               "country":"CA",
                               "state":"AL",
                               "stateProvinceCode": "CA",
                               "postalCode": "94612",
                               "countryCode": "US",
                               "samePhonePerson": "N",
                               "telephoneNumber1": "2121231312",
                               "telephoneNumber2": null,
                               "telephoneNumber3": null,
                               "telephoneNumber4": null
                           };
                 var index = 0;
                 $httpBackend.whenGET('/api-config/v1/global/countries/CA/states').respond(statesDataResponse);
                 $scope.editEmergencyContact(index,contact);
            });

            it('editEmergencyContact function call with country US',function(){

                 var contact = {
                     address: {
                         country: 'CA'
                     },
                     telephoneNumbers: {
                         telephoneNumber1: '234234234'
                     },
                               "personId": "00001005514",
                               "fullName": "irfan",
                               "uniqueId": 1,
                               "primaryIndicator": "Y",
                               "designeeRelation": "O",
                               "name": "irfan",
                               "middleName": null,
                               "firstName": "irfan",
                               "sameAdressPerson": "N",
                               "line1": "Main street",
                               "line2": "Mathew",
                               "line3": null,
                               "line4": null,
                               "city": "Anytown",
                               "county": "US",
                               "country":"US",
                               "state":"AL",
                               "stateProvinceCode": "CA",
                               "postalCode": "94612",
                               "countryCode": "US",
                               "samePhonePerson": "N",
                               "telephoneNumber1": "2121231312",
                               "telephoneNumber2": null,
                               "telephoneNumber3": null,
                               "telephoneNumber4": null
                           };
                 var index = 0;
                 $httpBackend.whenGET('/api-config/v1/global/countries/CA/states').respond(statesDataResponse);
                 $scope.editEmergencyContact(index,contact);
            });

            it('editEmergencyContact function call with country null',function(){

                 var contact = {
                     address: {
                         country: 'CA'
                     },
                     telephoneNumbers: {
                         telephoneNumber1: '234234234'
                     },
                               "personId": "00001005514",
                               "fullName": "irfan",
                               "uniqueId": 1,
                               "primaryIndicator": "Y",
                               "designeeRelation": "O",
                               "name": "irfan",
                               "middleName": null,
                               "firstName": "irfan",
                               "sameAdressPerson": "Y",
                               "line1": "Main street",
                               "line2": "Mathew",
                               "line3": null,
                               "line4": null,
                               "city": "Anytown",
                               "county": "US",
                               "country":null,
                               "state":"AL",
                               "stateProvinceCode": "CA",
                               "postalCode": "94612",
                               "countryCode": "US",
                               "samePhonePerson": "N",
                               "telephoneNumber1": "2121231312",
                               "telephoneNumber2": null,
                               "telephoneNumber3": null,
                               "telephoneNumber4": null
                           };
                 var index = 0;
                 $httpBackend.whenGET('/api-config/v1/global/countries/CA/states').respond(statesDataResponse);
                 $scope.editEmergencyContact(index,contact);
            });
        });

        function toggleSelectTab($routeParams, $scope) {
            if ($routeParams.empId !== undefined) {
                $scope.appUserId = $routeParams.empId;
                $scope.notMeTab = true;
            } else {
                $scope.appUserId = appConfig.userId;
                $scope.tab = $routeParams.selectedTab;
            }
        }
    });
}());
*/
