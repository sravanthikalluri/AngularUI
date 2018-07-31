/*
/!* Created by Naveen on 10/29/2015.*!/

(function () {

    "use strict";

    describe('Profile Landing Page Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            utilService,
            $routeParams,
            $location,
            $timeout,
            accessTypesResponse = {
                "data": [
                    {
                        "key": "Work",
                        "value": "Work"
                    },
                    {
                        "key": "Emerg",
                        "value": "Emergency"
                    },
                    {
                        "key": "Home",
                        "value": "Home"
                    },
                    {
                        "key": "Other",
                        "value": "Other"
                    },
                    {
                        "key": "Work2",
                        "value": "Second Work"
                    },
                    {
                        "key": "Campus",
                        "value": "Campus"
                    },
                    {
                        "key": "Dorm",
                        "value": "Dormitory"
                    }
                ],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            employeeStatusDataResponse = {
                "data": [{
                    "emplymntStatus": true,
                    "name": "care,fanty",
                    "empId": "00001023839",
                    "beginDate": "2006-05-16",
                    "endDate": "2023-10-30",
                    "payFrequency": "2nd payroll of Month",
                    "earnAmount": 300,
                    "beginEndDetails": {
                        "payTo": "00001023839",
                        "effectiveDate": "2015-10-26",
                        "submittedByName": "00001023839",
                        "submittedByTimestamp": "2015-10-26 00:00:00",
                        "payToEmpId": "00001023839",
                        "empInfo": {
                            "department": "Finance",
                            "location": "Belmont,CA",
                            "company": "31T",
                            "pfClient": "0417"
                        },
                        "payDetails": {
                            "beginDate": "2006-05-16",
                            "endDate": "2023-10-30",
                            "actionDate": "2015-10-26",
                            "action": "End",
                            "goalAmount": "null",
                            "earnType": "CAR",
                            "earnAmount": "300",
                            "payFrequency": "2nd payroll of Month"
                        }
                    }
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            employeeStatusEmptyResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            employeeStatusNot200Response = {
              "_statusCode": "400",
              "_statusText": "OK",
              "_error": {"detailMessage": "error"}
          };


        var nameDataResponse = {
            "data": {
                "priNamesActiveList": [
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 4,
                        "name": "Albert",
                        "effectiveDate": "2015-10-07",
                        "endDate": "2015-10-22",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paul",
                        "middleName": "ttt",
                        "nameSuffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 5,
                        "name": "Albert",
                        "effectiveDate": "2015-10-23",
                        "endDate": "2099-12-31",
                        "formOfAddress": "Mr",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paulhghfg",
                        "middleName": "ttt",
                        "nameSuffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 6,
                        "name": "Albert",
                        "effectiveDate": "2015-11-07",
                        "endDate": "2099-12-31",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paul",
                        "middleName": "ttt",
                        "nameSuffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }
                ],
                "priNamesHistoryList": [
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 3,
                        "name": "Albert",
                        "effectiveDate": "2015-09-16",
                        "endDate": "2015-10-06",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paul",
                        "middleName": "ttt",
                        "nameSuffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 2,
                        "name": "Albert",
                        "effectiveDate": "2015-09-08",
                        "endDate": "2015-09-15",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Paul",
                        "middleName": "Thomson",
                        "nameSuffix": "Senior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRI",
                        "uniqueId": 1,
                        "name": "Albro",
                        "effectiveDate": "2003-09-25",
                        "endDate": "2015-09-07",
                        "formOfAddress": " ",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Cletus",
                        "middleName": "D",
                        "nameSuffix": " ",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }
                ],
                "prfNamesActiveList": [
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 1,
                        "name": "Albro",
                        "effectiveDate": "2003-09-25",
                        "endDate": "2015-09-14",
                        "formOfAddress": " ",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Cletus",
                        "middleName": "D",
                        "nameSuffix": " ",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }
                 ],
                "prfNamesHistoryList": [
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 1,
                        "name": "Albro",
                        "effectiveDate": "2003-09-25",
                        "endDate": "2015-09-14",
                        "formOfAddress": " ",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "Cletus",
                        "middleName": "D",
                        "nameSuffix": " ",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }
                ],
                "prfNamesCurrentList": [
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 5,
                        "name": "hfgh",
                        "effectiveDate": "2015-10-09",
                        "endDate": "2099-12-31",
                        "formOfAddress": "Mr",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "hg",
                        "middleName": "hfg",
                        "nameSuffix": "Junior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 4,
                        "name": "jghj",
                        "effectiveDate": "2015-10-09",
                        "endDate": "2099-12-31",
                        "formOfAddress": "Mr",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "hj",
                        "middleName": "hjgh",
                        "nameSuffix": "Junior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 3,
                        "name": "fgdfgdf",
                        "effectiveDate": "2015-10-09",
                        "endDate": "2099-12-31",
                        "formOfAddress": "Mr",
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "fgdfg",
                        "middleName": "fgdfg",
                        "nameSuffix": "Junior",
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    },
                    {
                        "personId": "00001005514",
                        "nameType": "PRF",
                        "uniqueId": 6,
                        "name": "fghfghfg",
                        "effectiveDate": "2015-10-09",
                        "endDate": "2099-12-31",
                        "formOfAddress": null,
                        "personTitle": null,
                        "nameFormat": null,
                        "firstName": "hfghgf",
                        "middleName": "gfh",
                        "nameSuffix": null,
                        "reasonChangeCode": null,
                        "approvalStatus": "F"
                    }
                ]
            },
            "_statusCode": "200",
            "_statusText": "OK"
        };

        var contactMethodDataResponse = {
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
            }, {
                "personId": "00001005514",
                "uniqueId": 1,
                "accessType": "Home",
                "media": "Phone",
                "telephoneNumber": "510-875-7533",
                "url": "mathew@trinet.com",
                "notes": null,
                "effectiveDate": "2005-01-01",
                "actualAccessType": "Home"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        };

        var countriesDataResponse = {
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
                }, {
                    "key": "AK",
                    "value": "Alaska"
                }, {
                    "key": "AS",
                    "value": "American Samoa"
                }, {
                    "key": "AZ",
                    "value": "Arizona"
                }, {
                    "key": "AR",
                    "value": "Arkansas"
                }, {
                    "key": "CA",
                    "value": "California"
                }, {
                    "key": "CO",
                    "value": "Colorado"
                }, {
                    "key": "CT",
                    "value": "Connecticut"
                }, {
                    "key": "DE",
                    "value": "Delaware"
                }, {
                    "key": "DC",
                    "value": "District of Columbia"
                }, {
                    "key": "FL",
                    "value": "Florida"
                }, {
                    "key": "GA",
                    "value": "Georgia"
                }, {
                    "key": "GU",
                    "value": "Guam"
                }, {
                    "key": "HI",
                    "value": "Hawaii"
                }, {
                    "key": "ID",
                    "value": "Idaho"
                }, {
                    "key": "IL",
                    "value": "Illinois"
                }, {
                    "key": "IN",
                    "value": "Indiana"
                }, {
                    "key": "IA",
                    "value": "Iowa"
                }, {
                    "key": "KS",
                    "value": "Kansas"
                }, {
                    "key": "KY",
                    "value": "Kentucky"
                }, {
                    "key": "LA",
                    "value": "Louisiana"
                }, {
                    "key": "ME",
                    "value": "Maine"
                }, {
                    "key": "MD",
                    "value": "Maryland"
                }, {
                    "key": "MA",
                    "value": "Massachusetts"
                }, {
                    "key": "MI",
                    "value": "Michigan"
                }, {
                    "key": "MN",
                    "value": "Minnesota"
                }, {
                    "key": "MS",
                    "value": "Mississippi"
                }, {
                    "key": "MO",
                    "value": "Missouri"
                }, {
                    "key": "MT",
                    "value": "Montana"
                }, {
                    "key": "NE",
                    "value": "Nebraska"
                }, {
                    "key": "NV",
                    "value": "Nevada"
                }, {
                    "key": "NH",
                    "value": "New Hampshire"
                }, {
                    "key": "NJ",
                    "value": "New Jersey"
                }, {
                    "key": "NM",
                    "value": "New Mexico"
                }, {
                    "key": "NY",
                    "value": "New York"
                }, {
                    "key": "NC",
                    "value": "North Carolina"
                }, {
                    "key": "ND",
                    "value": "North Dakota"
                }, {
                    "key": "OH",
                    "value": "Ohio"
                }, {
                    "key": "OK",
                    "value": "Oklahoma"
                }, {
                    "key": "OR",
                    "value": "Oregon"
                }, {
                    "key": "PA",
                    "value": "Pennsylvania"
                }, {
                    "key": "PR",
                    "value": "Puerto Rico"
                }, {
                    "key": "RI",
                    "value": "Rhode Island"
                }, {
                    "key": "SC",
                    "value": "South Carolina"
                }, {
                    "key": "SD",
                    "value": "South Dakota"
                }, {
                    "key": "TN",
                    "value": "Tennessee"
                }, {
                    "key": "TX",
                    "value": "Texas"
                }, {
                    "key": "UT",
                    "value": "Utah"
                }, {
                    "key": "VT",
                    "value": "Vermont"
                }, {
                    "key": "VI",
                    "value": "Virgin Islands"
                }, {
                    "key": "VA",
                    "value": "Virginia"
                }, {
                    "key": "WA",
                    "value": "Washington"
                }, {
                    "key": "WV",
                    "value": "West Virginia"
                }, {
                    "key": "WI",
                    "value": "Wisconsin"
                }, {
                    "key": "WY",
                    "value": "Wyoming"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
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
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
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
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
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
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": "CA",
                        "postalCode": "12345",
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
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 5,
                        "effectiveDate": "2015-09-12",
                        "line1": null,
                        "line2": null,
                        "line3": "city",
                        "line4": null,
                        "city": "123456",
                        "county": "US",
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 4,
                        "effectiveDate": "2014-05-18",
                        "line1": "123 Main Street",
                        "line2": "testing 0518",
                        "line3": null,
                        "line4": null,
                        "city": "Anytown",
                        "county": "US",
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 3,
                        "effectiveDate": "2009-04-01",
                        "line1": "123 Main Street",
                        "line2": null,
                        "line3": null,
                        "line4": null,
                        "city": "Anytown",
                        "county": "US",
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 2,
                        "effectiveDate": "2009-03-26",
                        "line1": "123 Main Street",
                        "line2": null,
                        "line3": null,
                        "line4": null,
                        "city": "Anytown",
                        "county": "US",
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94612",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }, {
                        "personId": "00001005514",
                        "addressType": "HOME",
                        "uniqueId": 1,
                        "effectiveDate": "2007-08-03",
                        "line1": "123 Main Street",
                        "line2": " ",
                        "line3": " ",
                        "line4": " ",
                        "city": "Anytown",
                        "county": "US",
                        "country":"US",
                        "stateProvinceCode": "CA",
                        "countryCode": "US",
                        "stateProvince": null,
                        "postalCode": "94111",
                        "primaryInd": 0,
                        "approvalStatus": "F"
                    }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

        var suffixesResponse = {
                "data": [{
                    "key": "II",
                    "value": "II"
                }, {
                    "key": "Jr",
                    "value": "Junior"
                }, {
                    "key": "III",
                    "value": "III"
                }, {
                    "key": "Sr",
                    "value": "Senior"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            titlesResponse = {
                "data": [{
                    "key": "Mr",
                    "value": "Mr"
                }, {
                    "key": "Mrs",
                    "value": "Mrs"
                }, {
                    "key": "Ms",
                    "value": "Ms"
                }, {
                    "key": "Miss",
                    "value": "Miss"
                }, {
                    "key": "Dr",
                    "value": "Dr"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };

        var response1 = {
            "data": {"emplymntStatus": "Active", "name": "John", "posDesc": "Manager","workState":"AZ"},
            "_statusCode": "200",
            "_statusText": "OK"
        };

        var empPermisions = {
                                "data": {
                                    "2": [
                                        {
                                            "id": 3,
                                            "name": "personal",
                                            "url": "#",
                                            "type": "tab",
                                            "external": "N",
                                            "permission": {
                                                "canView": true,
                                                "canAdd": false,
                                                "canEdit": true,
                                                "canDelete": false,
                                                "canPreliminaryApprove": false,
                                                "canFinalApprove": false
                                            },
                                            "subComponents": [
                                                {
                                                    "id": 13,
                                                    "name": "names",
                                                    "url": "#",
                                                    "type": "section",
                                                    "external": "N",
                                                    "permission": {
                                                        "canView": true,
                                                        "canAdd": false,
                                                        "canEdit": true,
                                                        "canDelete": false,
                                                        "canPreliminaryApprove": false,
                                                        "canFinalApprove": false
                                                    },
                                                    "subComponents": []
                                                }

                                            ]
                                        }],
                                    "35": [
                                        {
                                            "id": 36,
                                            "name": "payrollDueDate",
                                            "url": "#",
                                            "type": "label",
                                            "external": "N",
                                            "permission": {
                                                "canView": false,
                                                "canAdd": false,
                                                "canEdit": false,
                                                "canDelete": false,
                                                "canPreliminaryApprove": false,
                                                "canFinalApprove": false
                                            },
                                            "subComponents": []
                                        }
                                    ]
                                },
                                "_requestId": "425ab09b-c0bc-4773-93fb-f9c42dfb264e",
                                "_statusCode": "200",
                                "_statusText": "OK",
                                "_statusMessage": "Success"
                            };


        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.getPermissions = function(id){
                    return id;
                };
                $injector.get('$controller')('profileLandingPageCtrl', {
                    $scope: $scope
                });
                $httpBackend = $injector.get('$httpBackend');
                utilService = $injector.get('utilService');
                $routeParams = $injector.get('$routeParams');
                appConfig = $injector.get('appConfig');
                $timeout = $injector.get('$timeout');
            });


            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }

            var appUserId = $scope.appUserId,
                companyId = appConfig.companyId;

            $routeParams = {
                selectedTab: null,
                empId: 123
            };

            localStorage.setItem("addressSelectedeffdate", 0);

            $scope.tab = $routeParams.selectedTab;

            $scope.addressSelectedeffdate = utilService.filterDate(new Date(), constants.dateFormat);

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/access-types')
                .respond(200, accessTypesResponse);

            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.name + '?effectivedate=').respond(200, nameDataResponse);

            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.contact + '?excludehistory=true').respond(contactMethodDataResponse);

            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.address + '?effectivedate=').respond(200, addressDataResponse);

            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(countriesDataResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + countriesDataResponse.data[1].key + '/states').respond(statesDataResponse);

            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/suffixes').respond(200, suffixesResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/titles').respond(200, titlesResponse);


            $scope.initProfileLanding();

            $httpBackend.flush();

        });

        describe('setTab function testing ', function () {

            it('setTab is defined', function () {
                expect($scope.setTab).toBeDefined();
            });

            it('setTab function call with options as a parameter ', function () {
                var newValue = 'options';

                $scope.setTab(newValue);

                expect($scope.redirectFunction).toBeDefined();

            });

            it('setTab function call with security as a parameter ', function () {
                var newValue = 'security';

                $scope.setTab(newValue);

                expect($scope.redirectFunction).toBeDefined();

            });

            it('setTab function call with profile as a parameter ', function () {
                var newValue = 'profile';

                $scope.setTab(newValue);

                expect($scope.redirectFunction).toBeDefined();

            });

            it('setTab function call with workinfo as a parameter ', function () {
                var newValue = 'workinfo';

                $scope.setTab(newValue);

                expect($scope.redirectFunction).toBeDefined();

            });

        });


        describe('isSet function testing', function () {

            it('isSet is defined', function () {
                expect($scope.isSet).toBeDefined();
            });

            it('isSet function call', function () {

                var tabName = "profile";

                $scope.isSet(tabName);


            });

        });


        describe('userImageExist function testing', function () {

            it('Should userImageExist defined', function () {
                expect($scope.userImageExist).toBeDefined();
            });

            it('userImageExist function call', function () {

                expect($scope.userImageExist()).toBeFalsy();

                $scope.userImage = 'img/kaiser.png';

                expect($scope.userImageExist()).toBeTruthy();


            });

        });


        describe('toggleExtendLeaveRequest function testing', function () {

            it('toggleExtendLeaveRequest is defined', function () {
                expect($scope.toggleExtendLeaveRequest).toBeDefined();
            });

            it('toggleExtendLeaveRequest function call', function () {

                $scope.toggleExtendLeaveRequest();

                expect($scope.extendedleave).toBeTruthy();
                expect($scope.returnleave).toBeFalsy();


                expect($scope.manageEmpProfile).toBeTruthy();
                expect($scope.leaveFormDisplay).toBeTruthy();


                $scope.toggleExtendLeaveRequest();


                expect($scope.manageEmpProfile).toBeFalsy();
                expect($scope.leaveFormDisplay).toBeFalsy();


            });

        });


        describe('toggleReturnFromLeave function testing', function () {

            it('toggleReturnFromLeave is defined', function () {
                expect($scope.toggleReturnFromLeave).toBeDefined();
            });

            it('toggleReturnFromLeave function call', function () {

                $scope.toggleReturnFromLeave();

                expect($scope.extendedleave).toBeFalsy();
                expect($scope.returnleave).toBeTruthy();


                expect($scope.manageEmpProfile).toBeTruthy();
                expect($scope.returnFromLeave).toBeTruthy();


                $scope.toggleReturnFromLeave();

                expect($scope.manageEmpProfile).toBeFalsy();
                expect($scope.returnFromLeave).toBeFalsy();


            });

        });


        describe('if statement testing ', function () {
            it('$routeParams.empId testing with employee id as undefined ', function () {
                $routeParams.empId = '123';
                $routeParams.empStatus = 'ok';
                $routeParams.selectedTab = 'security';


                expect($scope.appUserId).toEqual(appConfig.userId);
            });

            it('$routeParams.empId testing with employee id is defined ', function () {
                $routeParams.empId = '122';
                $routeParams.empStatus = 'ok';
                $routeParams.selectedTab = 'security';

            });

            it('func function call ', function () {
                var func = function () {
                    if (typeof $location.search().leave !== "undefined") {
                        if ($location.search().leave === 'A') {
                            $scope.toggleExtendLeaveRequest();
                        } else if ($location.search().leave === 'L') {
                            $scope.toggleReturnFromLeave();
                        }
                    }
                };
                $location = {};
                $location.search = function () {
                    return {
                        leave: 'A'
                    };
                };
                func();

                $location = {};
                $location.search = function () {
                    return {
                        leave: 'L'
                    };
                };
                func();
            });
        });

        describe('redirectToProfile function testing ', function () {
            it('redirectToProfile function call ', function () {
                var personId = '00001654384',
                    empStatus = '';
                $scope.redirectToProfile(personId, empStatus);
            });
        });

        /!*describe('closeAlert function testing', function () {
            it('closeAlert is defined ', function () {
                expect($scope.closeAlert).toBeDefined();
            });

            it('closeAlert function call ', function () {
                var index = 0;
                $scope.closeAlert(index);
            });
        });*!/

        describe('disabled function testing ', function () {
            it('disabled is defined ', function () {
                expect($scope.disabled).toBeDefined();
            });

            it('disabled funciton call ', function () {
                $scope.disabled(new Date(), 'day');
            });
        });

        describe('broadcastPrimaryName function testing ', function () {
            it('broadcastPrimaryName is defined ', function () {
                expect($scope.broadcastPrimaryName).toBeDefined();
            });

            it('broadcastPrimaryName funciton call ', function () {
                $scope.nameType = 'PRF';
                $scope.broadcastPrimaryName();

                $scope.nameType = 'PRFF';
                $scope.broadcastPrimaryName();
            });
        });

        describe('broadcastContact function testing ', function () {
            it('broadcastContact is defined ', function () {
                expect($scope.broadcastContact).toBeDefined();
            });

            it('broadcastContact funciton call ', function () {
                $scope.nameType = 'PRF';
                $scope.broadcastContact();

                $scope.nameType = 'PRFF';
                $scope.broadcastContact();
            });
        });

        describe('empStatusChange function testing', function () {

            it('empStatusChange is defined ', function () {
                expect($scope.empStatusChange).toBeDefined();
            });

            it('empStatusChange function call with success response', function () {
                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.employmentDetails + "?include=emplymntStatus,name,posDesc,workState").respond(200, response1);
                $scope.empStatusChange();
                $httpBackend.flush();
                expect($scope.empStatus).toBeDefined();
                expect($scope.empName).toBeDefined();
                expect($scope.empName).toEqual("John");
                expect($scope.empStatus).toEqual('Active');
            });

            it('empStatusChange function call with empty response', function () {
                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.employmentDetails + "?include=emplymntStatus,name,posDesc,workState").respond(200, employeeStatusEmptyResponse);
                $scope.empStatusChange();
                $httpBackend.flush();

            });

            it('empStatusChange function call with statuscode other than 200', function () {
                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.employmentDetails + "?include=emplymntStatus,name,posDesc,workState").respond(400, employeeStatusNot200Response);
                $scope.empStatusChange();
                $httpBackend.flush();
            });

            it('empStatusChange function call with failure response', function () {
                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.employmentDetails + "?include=emplymntStatus,name,posDesc,workState").respond(400, employeeStatusNot200Response);
                $scope.empStatusChange();
                $httpBackend.flush();
            });
        });

        describe('broadcastContact function testing ', function () {
            it('broadcastContact is defined ', function () {
                expect($scope.broadcastContact).toBeDefined();
            });

            it('broadcastContact function call ', function () {
                $scope.broadcastContact();
            });
        });

        describe('childParentAlertMsg function testing ', function () {
            it('childParentAlertMsg is defined ', function () {
                expect($scope.childParentAlertMsg).toBeDefined();
            });

            it('childParentAlertMsg function call ', function () {
                var data = "msg";
                $scope.childParentAlertMsg(data);
            });
        });

        it("$timeout function testing", function () {
            var headerName = "John Teddy";
            var nameType = "header";
            $timeout.flush(200);
            $rootScope.$broadcast(constants.emitName, headerName, nameType);
        });

        describe('changeDeleteLable function testing',function(){
            it('changeDeleteLable is defined',function(){
                expect($scope.changeDeleteLable).toBeDefined();
            });

            it('changeDeleteLable function call',function(){
                var hideDelete = true;
                $scope.changeDeleteLable(hideDelete);
            });
        });

        describe('changeDeleteLableAddress function testing',function(){
            it('changeDeleteLableAddress is defined',function(){
                expect($scope.changeDeleteLableAddress).toBeDefined();
            });

            it('changeDeleteLableAddress function call',function(){
                var hideDelete = true;
                $scope.changeDeleteLableAddress(hideDelete);
            });
        });

        describe('canEdit function testing',function(){
            it('canEdit is defined',function(){
                expect($scope.canEdit).toBeDefined();
            });

            it('canEdit function call',function(){
                var name = "workinfo";
                $scope.selectedMenuComponentPermissions = [{
                        "id": 4,
                        "name": "workinfo",
                        "url": "#",
                        "type": "tab",
                        "external": "N",
                        "permission": {
                            "canView": true,
                            "canAdd": false,
                            "canEdit": false,
                            "canDelete": false,
                            "canPreliminaryApprove": false,
                            "canFinalApprove": false
                        },
                        "subComponents": []
                    },
                    {
                        "id": 5,
                        "name": "money",
                        "url": "#",
                        "type": "tab",
                        "external": "N",
                        "permission": {
                            "canView": true,
                            "canAdd": false,
                            "canEdit": true,
                            "canDelete": false,
                            "canPreliminaryApprove": false,
                            "canFinalApprove": false
                        },
                        "subComponents": [
                            {
                                "id": 17,
                                "name": "payrollEstimates",
                                "url": "#",
                                "type": "section",
                                "external": "N",
                                "permission": {
                                    "canView": true,
                                    "canAdd": false,
                                    "canEdit": true,
                                    "canDelete": false,
                                    "canPreliminaryApprove": false,
                                    "canFinalApprove": false
                                },
                                "subComponents": []
                            }
                        ]
                    }];
                $scope.canEdit(name);
            });
        });

        describe('populateStates function testing',function(){
            it('populateStates is defined',function(){
                expect($scope.populateStates).toBeDefined();
            });

            it('populateStates function call',function(){
                var statesResponse = {
                                     "data": [{
                                         "key": "AL",
                                         "value": "Alabama"
                                     }, {
                                         "key": "AK",
                                         "value": "Alaska"
                                     }, {
                                         "key": "AS",
                                         "value": "American Samoa"
                                     }],
                                     "_statusCode": "200",
                                     "_statusText": "OK"
                                 };
                var country = {"key": "US","value": "United States of America"};
                $scope.selectedAddressData = {};
                $scope.selectedAddressData.state = "AL";
                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + country.key + '/states').respond(statesResponse);
                $scope.populateStates(country);
            });
        });

        describe('checkRoute function testing',function(){
            it('checkRoute is defined',function(){
                expect($scope.checkRoute).toBeDefined();
            });

            it('checkRoute function call',function(){
                var newValue = 1;
                var selectedMenuComponentPermissions = [{
                                        "id": 4,
                                        "name": "workinfo",
                                        "url": "#",
                                        "type": "tab",
                                        "external": "N",
                                        "permission": {
                                            "canView": true,
                                            "canAdd": false,
                                            "canEdit": false,
                                            "canDelete": false,
                                            "canPreliminaryApprove": false,
                                            "canFinalApprove": false
                                        },
                                        "subComponents": []
                                    },
                                    {
                                        "id": 5,
                                        "name": "money",
                                        "url": "#",
                                        "type": "tab",
                                        "external": "N",
                                        "permission": {
                                            "canView": true,
                                            "canAdd": false,
                                            "canEdit": true,
                                            "canDelete": false,
                                            "canPreliminaryApprove": false,
                                            "canFinalApprove": false
                                        },
                                        "subComponents": [
                                            {
                                                "id": 17,
                                                "name": "payrollEstimates",
                                                "url": "#",
                                                "type": "section",
                                                "external": "N",
                                                "permission": {
                                                    "canView": true,
                                                    "canAdd": false,
                                                    "canEdit": true,
                                                    "canDelete": false,
                                                    "canPreliminaryApprove": false,
                                                    "canFinalApprove": false
                                                },
                                                "subComponents": []
                                            }
                                        ]
                                    }];
                $scope.checkRoute(newValue,selectedMenuComponentPermissions);
            });
        });

        describe('primaryPreferedNames function testing',function(){
            it('primaryPreferedNames is defined',function(){
                expect($scope.primaryPreferedNames).toBeDefined();
            });

            it('primaryPreferedNames function call',function(){
                $scope.primaryPreferedNames(true);
            });
        });

        describe('validatePasteAndFutureDates function testing',function(){
            it('validatePasteAndFutureDates is defined',function(){
                expect($scope.validatePasteAndFutureDates).toBeDefined();
            });

            it('validatePasteAndFutureDates function call with true',function(){
                var obj = {
                          securityFormfirstNameRequired: null,
                          securityFormlastNameRequired: null,
                          securityFormemployeeIdRequired: null,
                          securityFormeffectiveDateRequired: null,
                          securityFormendDateRequired: null,
                          proxypastdate:null,
                          proxyFuturedate:null
                      };
                 var fieldsArray = ['proxypastdate','proxyFuturedate'];
                 $scope.validatePasteAndFutureDates(obj,fieldsArray);
            });

            it('validatePasteAndFutureDates function call with false',function(){
                var obj = {
                          securityFormfirstNameRequired: null,
                          securityFormlastNameRequired: null,
                          securityFormemployeeIdRequired: null,
                          securityFormeffectiveDateRequired: null,
                          securityFormendDateRequired: null
                      };
                 var fieldsArray = ['proxypastdate','proxyFuturedate'];
                 $scope.validatePasteAndFutureDates(obj,fieldsArray);
            });
        });

        describe('closeAlert function testing',function(){
            it('closeAlert is defined',function(){
                expect($scope.closeAlert).toBeDefined();
            });

            it('closeAlert function call',function(){
                $scope.closeAlert();
            });
        });

        describe('getEmployeePermissions function testing',function(){
            it('getEmployeePermissions is defined',function(){
                expect($scope.getEmployeePermissions).toBeDefined();
            });

            it('getEmployeePermissions function call with success response',function(){
                var empId = '00000325075';
                $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' + empId + homeUrlConfig.resources.perm)
                            .respond(200,empPermisions);
                $scope.getEmployeePermissions(empId);
                $httpBackend.flush();
            });

            it('getEmployeePermissions function call with failure response',function(){
                var empId = '00000325075';
                var failureResponse = {
                                      "_statusCode": "400",
                                      "_statusText": "OK",
                                      "_error": {"detailMessage": "error"}
                                  };
                $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' + empId + homeUrlConfig.resources.perm)
                            .respond(400,failureResponse);
                $scope.getEmployeePermissions(empId);
                $httpBackend.flush();
            });
        });
    });



}());
*/
