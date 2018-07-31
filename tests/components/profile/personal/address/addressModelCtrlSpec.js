/*
/!*Created by ganesh on 10/29/2015.*!/


(function () {

    "use strict";

    describe('Address Model Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            $compile,
            $body = $('body'),
            statesDataResponse = {
                "data": [{
                    "key": "AL",
                    "value": "Alabama"
                }],
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
            el,
            simpleHTML = '<select ng-model="selectedAddressData.stateProvince" class="form-control" id="stateProvince" name="stateProvince" ng-options="foa.value for foa in statesData track by foa.value" ng-required="true"> </select>',
            addressDataResponse = {
                "data": {
                    "activeAddressList": [{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "line1": "Main street",
                        "line2": "Mathew",
                        "line3": null,
                        "line4": null,
                        "city": "Anytown",
                        "county": "US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }],
                    "historyAddressList": [{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 6,
                        "effectiveDate": "2015-09-25",
                        "line1": "123 Main Street",
                        "line2": "testing 0518",
                        "line3": null,
                        "line4": null,
                        "city": "Anytown",
                        "county": "US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();

                $scope.visible = false;
                $scope.toggle = function () {
                    $scope.visible = !$scope.visible;
                };
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000483';
                $scope.validatePasteAndFutureDates = function(obj,fieldsArray){
                    var isTrue = false;
                      angular.forEach(fieldsArray,function(field){
                           if(obj[field]){
                             isTrue = false;
                           }
                      });
                      return isTrue;
                };
                $scope.getAddressData = function () {
                    $scope.visible = false;
                };
                $scope.countriesData = [{
                    "key": "CA",
                    "value": "Canada"
                }, {
                    "key": "US",
                    "value": "United States of America"
                }];
                $scope.editSelectedData = {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 9,
                    "effectiveDate": "2015-09-22",
                    "line1": "Main street",
                    "line2": "Mathew",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "country": "CA",
                    "stateProvinceCode": "CA",
                    "countryCode": "US",
                    "stateProvince": "AL",
                    "postalCode": "94612",
                    "primaryInd": 0,
                    "approvalStatus": "F"
                };
                $injector.get('$controller')('addressModelCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
            });

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/CA/states').respond(statesDataResponse);
            $scope.getStates({key: 'CA', value: 'CANADA'});
            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(countriesDataResponse);
            $httpBackend.flush();

        });


        describe('submitForm function testing', function () {

            it('submitForm is defined', function () {
                expect($scope.submitForm).toBeDefined();
            });

            it('submitForm function call tetsing', function () {

                expect($scope.submitted).toBeUndefined();

                $scope.submitForm();

                expect($scope.submitted).toBeTruthy();

            });

        });


        describe('cancel function testing', function () {

            it('cancel is defined', function () {
                expect($scope.cancel).toBeDefined();
            });

            it('cancel function call testing', function () {

                spyOn($scope, 'toggle');

                $scope.cancel();

                expect($scope.toggle).toHaveBeenCalled();

            });

        });


        describe('updateData function testing', function () {

            it('updateData is defined', function () {
                expect($scope.updateData).toBeDefined();
            });

            it('updateData function call testing with addressForm as valid', function () {
                var form_name = {"$valid": true};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                spyOn($scope, 'saveData');

                $scope.addressForm = {};

                $scope.addressForm.$valid = true;

                $scope.editSelectedData.stateProvince = {"key": "CA", "value": "California"};

                $scope.$digest();

                $scope.updateData(form_name);

                expect($scope.submitted).toBeTruthy();

                expect($scope.saveData).toHaveBeenCalled();

            });

            it('updateData function call testing with addressForm as invalid', function () {
                var form_name = {"$valid": false};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                $scope.addressForm = {};

                $scope.addressForm.$valid = false;
                $scope.addressForm.$error = [];

                $scope.editSelectedData.stateProvince = {"key": "CA", "value": "California"};

                $scope.$digest();

                $scope.updateData(form_name);

                expect($scope.submitted).toBeTruthy();

            });

            it('updateData function call testing with addressForm as valid and with effective date', function () {
                var form_name = {"$valid": false};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                var HTML = '<input type="text" id="address_edit_effective_date" class="no-bg no-border medium" value="05/31/2016"></input>';
                var element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();

                $scope.addressForm = {};

                $scope.addressForm.$valid = false;
                $scope.addressForm.$error = [];
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.stateProvince = {"key": "CA", "value": "California"};

                $scope.$digest();

                $scope.updateData(form_name);

                expect($scope.submitted).toBeTruthy();

            });
        });


        describe('saveData function testing', function () {

            it('saveData is defined', function () {
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call with yielding success response ', function () {

                $scope.selectedAddressData = {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 9,
                    "effectiveDate": "2015-09-22",
                    "line1": "Main street",
                    "line2": "Mathew",
                    "line3": null,
                    "line4": null,
                    "city": "Anytown",
                    "country": {"key": "US"},
                    "stateProvinceCode": "CA",
                    "countryCode": "US",
                    "stateProvince": {"key": "CA"},
                    "postalCode": "94612",
                    "primaryInd": 0,
                    "approvalStatus": "F"
                };
                var putUrl = '?enableValidation=true';
                var updateResponse = {"data": "", "_statusCode": "200", "_statusText": "OK"};
                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + putUrl;

                $httpBackend.when('PUT', url).respond(200, updateResponse);

                $httpBackend
                    .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                        appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + '?effectivedate=').respond(200, addressDataResponse);

                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with response is not equal to 200', function () {
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.oldeffectiveDate = new Date();
                $scope.selectedAddressData.stateProvince = {key: "CA"};
                $scope.selectedAddressData.country = {key: 'CA'};
                var putUrl = '?enableValidation=true';
                var updateResponse = {"data": "", "_statusCode": "400", "_statusText": "OK"};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + putUrl).respond(200, updateResponse);


                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with response is not equal to 200', function () {
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.oldeffectiveDate = new Date();
                $scope.selectedAddressData.stateProvince = {key: "CA"};
                $scope.selectedAddressData.country = {key: 'CA'};
                var putUrl = '?enableValidation=true';
                var updateResponse = {"data": "", "_statusCode": "400", "_statusText": "OK"};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + putUrl).respond(200, updateResponse);


                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with  failure response ', function () {
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.oldeffectiveDate = new Date();
                $scope.selectedAddressData.stateProvince = {key: "CA"};
                $scope.selectedAddressData.country = {key: 'CA'};
                var putUrl = '?enableValidation=true';
                var updateResponse = {
                    "data": {},
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                };
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + putUrl).respond(400, updateResponse);

                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with if condition function testing', function () {
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.oldeffectiveDate = new Date();
                $scope.selectedAddressData.stateProvince = {key: "CA"};
                $scope.selectedAddressData.country = {key: 'CA'};
                $scope.getAddressData = function () {
                };
                var putUrl = '?enableValidation=true';
                var updateResponse1 = {"data": {"_statusCode": "200", "_statusText": "OK"}};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address + putUrl).respond(200, updateResponse1);

                $scope.saveData();
                $httpBackend.flush();
            });

        });

        describe('getDate function testing', function () {
            it('getDate is defined', function () {
                expect($scope.getDate).toBeDefined();
            });

            it('getDate function call', function () {
                var val = '2016-02-23';
                $scope.getDate(val);
            });
        });

        describe('onFocus function testing', function () {
            it('onFocus is defined', function () {
                expect($scope.onFocus).toBeDefined();
            });

            it('onFocus function call', function () {
                var name = 'addressEdit';
                var obj = {
                    addressEdit: {
                        blur: {
                            addressFormeffectiveDateRequired: null,
                            addressFormpastdate: null,
                            addressFormstreetRequired: null,
                            addressFormcityRequired: null,
                            stateProvinceRequired: null,
                            addressFormpostalCodeRequired: null,
                            addressFormcountryRequired: null
                        },
                        focus: {
                            addressFormeffectiveDateRequired: null,
                            addressFormpastdate: null,
                            addressFormstreetRequired: null,
                            addressFormcityRequired: null,
                            stateProvinceRequired: null,
                            addressFormpostalCodeRequired: null,
                            addressFormcountryRequired: null
                        }
                    }
                };
                $scope.onFocus(name, obj.addressEdit.focus);
            });
        });

        describe('getStates function testing',function() {
            it('getStates is defined',function(){
                expect($scope.getStates).toBeDefined();
            });

            it('getStates function call with country as US',function(){
                var country = {key:"US"};
                $scope.getStates(country);
            });

            it('getStates function call with country as CA',function(){
                var country = {key:"CA"};
                $scope.getStates(country);
            });
        });

        afterEach(function () {
            $body.empty();
        });


    });


}());
*/
