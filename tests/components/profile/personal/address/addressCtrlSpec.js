/*
/!**
 * Created by ganesh on 10/29/2015.
 *!/

(function () {

    "use strict";

    describe('Address Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig;

        var simpleHTML = '<input type="text" id="address_effective_date" class="no-bg no-border medium" value="0"></input>',
            simpleHTM = '<input type="text" id="address_edit_effective_date" class="no-bg no-border medium"></input>',
            $compile,
            el, eli,
            $body = $('body');

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.populateStates = function (data) {
                    return data;
                };
                $scope.changeDeleteLableAddress = function(data){
                  return data;
                };
                $injector.get('$controller')('addressCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
            });


            $scope.selectedAddressData = {effectiveDate: new Date()};
        });

        describe('dateChange function testing', function () {
            it('dateChange is defined ', function () {
                expect($scope.dateChange).toBeDefined();
            });

            it('dateChange function call testing', function () {
                var label = {effDateLabel: constants.currentlyEffective};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                eli = $compile(simpleHTM)($scope);
                $body.append(eli);
                $rootScope.$digest();

                $scope.addressData = {
                    "activeAddressList": [{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "oldeffectiveDate": "2015-09-22",
                        "effDate": "2015-09-22",
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
                     "historyAddressList":[{
                         "personId": "00001005514",
                         "addressType": "HOME",
                         "uniqueId": 9,
                         "effectiveDate": "2015-09-22",
                         "oldeffectiveDate": "2015-09-22",
                         "effDate": "2015-09-22",
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
                     }]
                };

                $scope.addressList = [{
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 9,
                    "effectiveDate": "2099-03-19",
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
                    "approvalStatus": "F",
                    "effDateLabel": constants.currentlyEffective,
                    "oldeffectiveDate": "2015-09-22"
                }];
                var res = {
                    "data": [{"key": "CA", "value": "Canada"}, {
                        "key": "US",
                        "value": "United States of America"
                    }], "_statusCode": "200", "_statusText": "OK"
                };

                $scope.dateChange(label);
            });

            it('dateChange function call testing with effective data less than today date', function () {
                var label = {effDateLabel: constants.currentlyEffective};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                eli = $compile(simpleHTM)($scope);
                $body.append(eli);
                $rootScope.$digest();

                $scope.addressData = {
                    "activeAddressList": [{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "oldeffectiveDate": "2015-09-22",
                        "effDate": "2015-09-22",
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
                    },{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "oldeffectiveDate": "2015-09-22",
                        "effDate": "2015-09-22",
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
                    }]
                };

                $scope.addressList = [{
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 9,
                    "effectiveDate": "2016-03-10",
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
                    "approvalStatus": "F",
                    "effDateLabel": constants.currentlyEffective,
                    "oldeffectiveDate": "2015-09-22"
                },
                    {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 7,
                        "effectiveDate": "2015-09-26",
                        "line1": "456 Main street",
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
                        "approvalStatus": "F",
                        "effDateLabel": "Effective 09/26/2015"
                    },
                    {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 10,
                        "effectiveDate": "2016-05-18",
                        "line1": "1000 Gandhi Nagar",
                        "line2": "Appt 555",
                        "line3": "Gardens Square",
                        "line4": null,
                        "city": "San Francisco",
                        "county": "US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": "CA",
                        "postalCode": "12345",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }];
                var res = {
                    "data": [{"key": "CA", "value": "Canada"}, {
                        "key": "US",
                        "value": "United States of America"
                    }], "_statusCode": "200", "_statusText": "OK"
                };

                $scope.dateChange(label);
            });
            it('dateChange function call testing with effective data less than today date', function () {
                var label = {effDateLabel: "Effective Currently"};
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                eli = $compile(simpleHTM)($scope);
                $body.append(eli);
                $rootScope.$digest();

                $scope.addressData = {
                    "activeAddressList": [{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "oldeffectiveDate": "2015-09-22",
                        "effDate": "2015-09-22",
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
                    "historyAddressList":[{
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 9,
                        "effectiveDate": "2015-09-22",
                        "oldeffectiveDate": "2015-09-22",
                        "effDate": "2015-09-22",
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
                    }]
                };

                $scope.addressList = [{
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 9,
                    "effectiveDate": "2016-03-10",
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
                    "approvalStatus": "F",
                    "effDateLabel": constants.currentlyEffective,
                    "oldeffectiveDate": "2015-09-22"
                }];
                var res = {
                    "data": [{"key": "CA", "value": "Canada"}, {
                        "key": "US",
                        "value": "United States of America"
                    }], "_statusCode": "200", "_statusText": "OK"
                };

                $scope.dateChange(label);
            });
        });


        describe('toggle function testing', function () {

            it('toggle is defined', function () {
                expect($scope.toggle).toBeDefined();
            });

            it('toggle function call testing with us', function () {

                expect($scope.visible).toBeFalsy();

                $scope.selectedAddressData = {};
                $scope.selectedAddressData.county = 'US';

                $scope.toggle();

                expect($scope.visible).toBeTruthy();

            });

            it('toggle function call testing with ca', function () {

                expect($scope.visible).toBeFalsy();

                $scope.selectedAddressData = {};
                $scope.selectedAddressData.county = 'CA';

                $scope.toggle();

                expect($scope.visible).toBeTruthy();

            });

        });


        describe('showHideTimeline function testing', function () {

            it('showHideTimeline is defined', function () {
                expect($scope.showHideTimeline).toBeDefined();
            });

            it('showHideTimeline function call testing', function () {

                expect($scope.showTimeline).not.toBeDefined();

                $scope.showHideTimeline();

                expect($scope.showTimeline).toBeTruthy();

                $scope.showHideTimeline();

                expect($scope.showTimeline).toBeFalsy();
            });

        });


        describe('selectedObject function testing', function () {

            it('selectedObject is defined', function () {
                expect($scope.selectedObject).toBeDefined();
            });

            it('selectedObject function call testing', function () {

                expect($scope.addressDetails).toBeUndefined();
                $scope.addressData = {
                                    "activeAddressList": [{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2015-09-22",
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
                                    },{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2015-09-22",
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
                                    }]
                                };
                $scope.addressList = [{
                "personId": "00001005514",
                "addressType": "HOME",
                "uniqueId": 9,
                "effectiveDate": "2016-03-10",
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
                "approvalStatus": "F",
                "effDateLabel": constants.currentlyEffective,
                "oldeffectiveDate": "2015-09-22"
            },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 7,
                    "effectiveDate": "2015-09-26",
                    "line1": "456 Main street",
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
                    "approvalStatus": "F",
                    "effDateLabel": "Effective 09/26/2015"
                },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 10,
                    "effectiveDate": "2016-05-18",
                    "line1": "1000 Gandhi Nagar",
                    "line2": "Appt 555",
                    "line3": "Gardens Square",
                    "line4": null,
                    "city": "San Francisco",
                    "county": "US",
                    "stateProvinceCode": "CA",
                    "countryCode": "US",
                    "stateProvince": "CA",
                    "postalCode": "12345",
                    "primaryInd": 0,
                    "approvalStatus": "F"
                }];
                $scope.selectedObject();

                expect($scope.addressDetails).toBeDefined();


            });

            it('selectedObject function call testing with effdate', function () {

                expect($scope.addressDetails).toBeUndefined();
                $scope.addressData = {
                                    "activeAddressList": [{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2099-09-22",
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
                                    },{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2015-09-22",
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
                                    }]
                                };
                $scope.addressList = [{
                "personId": "00001005514",
                "addressType": "HOME",
                "uniqueId": 9,
                "effectiveDate": "2016-03-10",
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
                "approvalStatus": "F",
                "effDateLabel": constants.currentlyEffective,
                "oldeffectiveDate": "2015-09-22"
            },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 7,
                    "effectiveDate": "2015-09-26",
                    "line1": "456 Main street",
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
                    "approvalStatus": "F",
                    "effDateLabel": "Effective 09/26/2015"
                },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 10,
                    "effectiveDate": "2016-05-18",
                    "line1": "1000 Gandhi Nagar",
                    "line2": "Appt 555",
                    "line3": "Gardens Square",
                    "line4": null,
                    "city": "San Francisco",
                    "county": "US",
                    "stateProvinceCode": "CA",
                    "countryCode": "US",
                    "stateProvince": "CA",
                    "postalCode": "12345",
                    "primaryInd": 0,
                    "approvalStatus": "F"
                }];
                $scope.selectedObject();

                expect($scope.addressDetails).toBeDefined();


            });

           it('selectedObject function call testing with digest', function () {
                var element, HTML = '<input type="text" id="address_effective_date" class="no-bg no-border medium" value="10">';
                element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();
                expect($scope.addressDetails).toBeUndefined();
                $scope.addressData = {
                                    "activeAddressList": [{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2015-09-22",
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
                                    },{
                                        "personId": "00001005514",
                                        "addressType": "HOME",
                                        "uniqueId": 9,
                                        "effectiveDate": "2015-09-22",
                                        "oldeffectiveDate": "2015-09-22",
                                        "effDate": "2015-09-22",
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
                                    }]
                                };
                $scope.addressList = [{
                "personId": "00001005514",
                "addressType": "HOME",
                "uniqueId": 9,
                "effectiveDate": "2016-03-10",
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
                "approvalStatus": "F",
                "effDateLabel": constants.currentlyEffective,
                "oldeffectiveDate": "2015-09-22"
            },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 7,
                    "effectiveDate": "2015-09-26",
                    "line1": "456 Main street",
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
                    "approvalStatus": "F",
                    "effDateLabel": "Effective 09/26/2015"
                },
                {
                    "personId": "00001005514",
                    "addressType": "HOME",
                    "uniqueId": 10,
                    "effectiveDate": "2016-05-18",
                    "line1": "1000 Gandhi Nagar",
                    "line2": "Appt 555",
                    "line3": "Gardens Square",
                    "line4": null,
                    "city": "San Francisco",
                    "county": "US",
                    "stateProvinceCode": "CA",
                    "countryCode": "US",
                    "stateProvince": "CA",
                    "postalCode": "12345",
                    "primaryInd": 0,
                    "approvalStatus": "F"
                }];
                $scope.selectedObject();

                expect($scope.addressDetails).toBeDefined();


            });

        });

        describe('deleteAddress function testing', function () {
            it('deleteAddress is  defined ', function () {
                expect($scope.deleteAddress).toBeDefined();
            });

            it('deleteAddress function call testing', function () {
                $scope.deleteAddress();
                expect($scope.yes_btn).toBeDefined();
                expect($scope.no_btn).toBeDefined();
            });

            it('delete function call with success response and statuscode as 200', function () {
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.stateProvince = {key: 'value'};
                var deleteResponseRes = {
                    _statusCode: 200
                };
                $httpBackend.when('DELETE', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address, $scope.selectedAddressData).respond(200, deleteResponseRes);
            });

            it('delete function call with success response and statuscode as 400', function () {
                var deleteResponseRes = {
                    _statusCode: 400
                };
                $httpBackend.when('DELETE', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address, $scope.selectedAddressData).respond(200, deleteResponseRes);
            });

            it('delete function call with failure response', function () {
                var deleteResponseRes = {
                    _error: {message: 'Test', field: 'one'},
                    _statusCode: "400"
                };

                $httpBackend.when('DELETE', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.address).respond(400, deleteResponseRes);
            });

        });

        afterEach(function () {
            $body.empty();
        });
    });


}());
*/
