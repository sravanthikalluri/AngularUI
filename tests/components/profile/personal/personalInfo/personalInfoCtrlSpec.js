/*
 /!*Created by ganesh on 10/30/2015.*!/

(function () {

    "use strict";

    describe('Personal Info Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            personalInfoDataResponse = {
                "data": {
                    "activePersonalDataList": [
                        {
                            "personId": "00001005514",
                            "uniqueId": 2,
                            "effectiveDate": "2015-09-26",
                            "gender": "M",
                            "marriageStatus": "S",
                            "birthDate": "1957/07/17",
                            "militaryStatus": "%#12",
                            "ethinicity": "GREEN",
                            "countryCode": "US"
                        }, {
                            "personId": "00001005514",
                            "uniqueId": 2,
                            "effectiveDate": "2015-09-26",
                            "gender": "M",
                            "marriageStatus": "S",
                            "birthDate": "1957/07/17",
                            "militaryStatus": "%#12",
                            "ethinicity": "GREEN",
                            "countryCode": "US"
                        }
                    ],
                    "historyPersonalDataList": [
                        {
                            "personId": "00001005514",
                            "uniqueId": 1,
                            "effectiveDate": "2007-08-03",
                            "gender": "M",
                            "marriageStatus": "M",
                            "birthDate": "1957-07-17",
                            "militaryStatus": "6",
                            "ethinicity": "GREEN",
                            "countryCode": "US"
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            },
            ssnResponse = {
                              "data": {
                                  "alternateId": "12345",
                                  "employeeId": "00001000485",
                                  "employmentStatus": "L",
                                  "nationalIds": {
                                      "country": "US",
                                      "idType": null,
                                      "id": "287980098"
                                  }
                              },
                              "_requestId": "6ca069a1-99f7-48c2-aa41-6f621a964f26",
                              "_statusCode": "200",
                              "_statusText": "OK",
                              "_statusMessage": "Retrieved Person Identity Successfully !!"
                          },
            ethnicityDataResponse = {
                "data": [{
                    "key": "HISPA",
                    "value": "Hispanic/Latino"
                }, {
                    "key": "WHITE",
                    "value": "White (Not Hispanic or Latino)"
                }, {
                    "key": "BLACK",
                    "value": "Black/African American (Not Hispanic or Latino)"
                }, {
                    "key": "PACIF",
                    "value": "Native Hawaiian/Other Pac Island (Not Hispanic or Latino)"
                }, {
                    "key": "ASIAN",
                    "value": "Asian (Not Hispanic or Latino)"
                }, {
                    "key": "AMIND",
                    "value": "American Indian/Alaska Native (Not Hispanic or Latino)"
                }, {
                    "key": "TWO",
                    "value": "Two or More Races (Not Hispanic or Latino)"
                }, {
                    "key": "NSPEC",
                    "value": "Decline to Specify"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            genderResponse = {
                "data": [{"key": "F", "value": "Female"}, {"key": "M", "value": "Male"}],
                "_statusCode": "200",
                "_statusText": "OK"
            },

            personinfoResponse = {
                "month": [
                    {
                        "id": 1,
                        "key": "January",
                        "value": "January"
                    },
                    {
                        "id": 2,
                        "key": "February",
                        "value": "February"
                    },
                    {
                        "id": 3,
                        "key": "March",
                        "value": "March"
                    },
                    {
                        "id": 4,
                        "key": "April",
                        "value": "April"
                    },
                    {
                        "id": 5,
                        "key": "May",
                        "value": "May"
                    },
                    {
                        "id": 6,
                        "key": "June",
                        "value": "June"
                    },
                    {
                        "id": 7,
                        "key": "July",
                        "value": "July"
                    },
                    {
                        "id": 8,
                        "key": "August",
                        "value": "August"
                    },
                    {
                        "id": 9,
                        "key": "September",
                        "value": "September"
                    },
                    {
                        "id": 10,
                        "key": "October",
                        "value": "October"
                    },
                    {
                        "id": 11,
                        "key": "November",
                        "value": "November"
                    },
                    {
                        "id": 12,
                        "key": "December",
                        "value": "December"
                    }
                ],
                "date": [
                    {
                        "id": 1
                    },
                    {
                        "id": 2
                    },
                    {
                        "id": 3
                    },
                    {
                        "id": 4
                    },
                    {
                        "id": 5
                    },
                    {
                        "id": 6
                    },
                    {
                        "id": 7
                    },
                    {
                        "id": 8
                    },
                    {
                        "id": 9
                    },
                    {
                        "id": 10
                    },
                    {
                        "id": 11
                    },
                    {
                        "id": 12
                    },
                    {
                        "id": 13
                    },
                    {
                        "id": 14
                    },
                    {
                        "id": 15
                    },
                    {
                        "id": 16
                    },
                    {
                        "id": 17
                    },
                    {
                        "id": 18
                    },
                    {
                        "id": 19
                    },
                    {
                        "id": 20
                    },
                    {
                        "id": 21
                    },
                    {
                        "id": 22
                    },
                    {
                        "id": 23
                    },
                    {
                        "id": 24
                    },
                    {
                        "id": 25
                    },
                    {
                        "id": 26
                    },
                    {
                        "id": 27
                    },
                    {
                        "id": 28
                    },
                    {
                        "id": 29
                    },
                    {
                        "id": 30
                    },
                    {
                        "id": 31
                    }
                ],
                "year": [
                    {
                        "key": 2011,
                        "value": 2011
                    },
                    {
                        "value": 2010,
                        "key": 2010
                    },
                    {
                        "value": 2009,
                        "key": 2009
                    },
                    {
                        "value": 2008,
                        "key": 2008
                    },
                    {
                        "value": 2007,
                        "key": 2007
                    },
                    {
                        "value": 2006,
                        "key": 2006
                    },
                    {
                        "value": 2005,
                        "key": 2005
                    },
                    {
                        "value": 2004,
                        "key": 2004
                    },
                    {
                        "value": 2003,
                        "key": 2003
                    },
                    {
                        "value": 2002,
                        "key": 2002
                    },
                    {
                        "value": 2001,
                        "key": 2001
                    },
                    {
                        "value": 2000,
                        "key": 2000
                    },
                    {
                        "value": 1999,
                        "key": 1999
                    },
                    {
                        "value": 1998,
                        "key": 1998
                    },
                    {
                        "value": 1997,
                        "key": 1997
                    },
                    {
                        "value": 1996,
                        "key": 1996
                    },
                    {
                        "value": 1995,
                        "key": 1995
                    },
                    {
                        "value": 1994,
                        "key": 1994
                    },
                    {
                        "value": 1993,
                        "key": 1993
                    },
                    {
                        "value": 1992,
                        "key": 1992
                    },
                    {
                        "value": 1991,
                        "key": 1991
                    },
                    {
                        "value": 1990,
                        "key": 1990
                    },
                    {
                        "value": 1989,
                        "key": 1989
                    }, {
                        "value": 3089,
                        "key": 3089
                    }
                ]
            }
            ;

        var $compile,
            $body = $('body'),
            el,
            simpleHTML = '<select id = "personal_info_effective_date"  class="pull-left medium no-bg no-border" ng-model="selectedInfoData" ng-options="foa.effDateLabel for foa in personalInfoList"  ></select>';


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $compile = $injector.get('$compile');
                $scope = $rootScope.$new();
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000483';
                $injector.get('$controller')('personalInfoCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
            });


            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }

            var appUserId = $scope.appUserId,
                companyId = appConfig.companyId;

                $scope.monthData = personinfoResponse.month;
                $scope.dateData = personinfoResponse.date;
                $scope.yearData = personinfoResponse.year;

                $scope.selectedInfoData = {};


            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.personalInfo + '?effectivedate=')
                .respond(200, personalInfoDataResponse);


            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    companyId + '/' + appUserId + profileUrlConfig.resources.personalStatus)
                .respond(200, ssnResponse);

            $httpBackend
                .whenGET('assets/data/personal/personinfo.json')
                .respond(200, personinfoResponse);

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/genders').respond(200, genderResponse);

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/' + appConfig.countryCode + '/ethnicities').respond(200, ethnicityDataResponse);

            $httpBackend.flush();


        });

        describe('showHideTimeline function testing', function () {

            it('showHideTimeline is defined', function () {
                expect($scope.showHideTimeline).toBeDefined();
            });

            it('showHideTimeline function call testing', function () {

                $scope.showHideTimeline();

                expect($scope.showTimeline).toBeTruthy();

            });

        });

        describe('toggle function testing', function () {

            it('toggle is defined', function () {
                expect($scope.toggle).toBeDefined();
            });

            it('toggle function call testing', function () {

                expect($scope.visible).toBeFalsy();

                $scope.toggle();

                expect($scope.visible).toBeTruthy();

                $scope.toggle();

                expect($scope.visible).toBeFalsy();

            });

        });


        describe('selectedObject function testing', function () {

            it('selectedObject is defined', function () {
                expect($scope.selectedObject).toBeDefined();
            });

            it('selectedObject function call testing', function () {
                expect($scope.personalInfoDetailTimeline).toBeUndefined();

                $scope.selectedObject();

                expect($scope.personalInfoDetailTimeline).toBeDefined();
            });


        });


        describe('deletePerson function testing', function () {

            it('deletePerson is defined', function () {
                expect($scope.deletePerson).toBeDefined();
            });
            it(' deletePerson function call testing', function () {
                spyOn(window, 'confirm').andCallFake(function () {
                    return true;
                });
                var putUrl = '&enableValidation=true';
                var deletedResponse = {"_statusText": "deleted successfully"};
                $httpBackend.when('DELETE', profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.personal + putUrl).respond(200, deletedResponse);
                $scope.deletePerson();
                $httpBackend.flush();
            });

            it(' deletePerson function call testing', function () {
                spyOn(window, 'confirm').andCallFake(function () {
                    return true;
                });
                var putUrl = '&enableValidation=true';
                var deletedFailureResponse = {"_error": {"detailMessage": "error"}};
                $httpBackend.when('DELETE', profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.personal + putUrl).respond(400, deletedFailureResponse);
                $scope.deletePerson();
                $httpBackend.flush();


            });


        });

        describe('deletePersonalInfo function testing', function () {

            it('deletePersonalInfo is defined', function () {
                expect($scope.deletePersonalInfo).toBeDefined();
            });

            it('deletePersonalInfo function call with success response', function () {
                $scope.translation = {};
                $scope.translation.profile_personal = {};
                $scope.translation.profile_personal.personalInfo_confirm_message = 'message';
                $scope.translation.security = {};
                $scope.translation.security.delete_message = 'message';
                $scope.translation.options = {};
                $scope.translation.options.cancel = 'message';
                $scope.deletePersonalInfo();
            });

        });

        describe('dateChange function testing',function(){
            it('dateChange is defined',function(){
                expect($scope.dateChange).toBeDefined();
            });

            it('dateChange function call',function(){
                var label = {"effDateLabel": "Effective 09/26/2015"};
                $scope.dateChange(label);
            });
        });
    });


}());
*/
