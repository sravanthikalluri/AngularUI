/*

/!*Created by ganesh on 10/30/2015.*!/





(function () {

    "use strict";

    describe('Personal Info Model Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            $compile,
            $body = $('body'),
            el,
            simpleHTML = '<input type="checkbox" id="declineEthinicity" class="radio-label-info" ng-bind=""/>',
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
            },
            genderResponse = {
                "data": [{
                    "key": "F",
                    "value": "Female"
                }, {
                    "key": "M",
                    "value": "Male"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            ethnicityResponse = {
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
            };


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
                $scope.visible = false;
                $scope.toggle = function () {
                    $scope.visible = !$scope.visible;
                };
                $scope.getPersonaInformation = function () {
                    $scope.visible = !$scope.visible;
                };
                $scope.$digest();
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000483';
                $scope.translation = {"profile_personal":{"ethnicity_msg": "Ethnicity is required for U.S. Equal Employment Opportunity Commission reporting. If you decline to state your ethnicity, your company may select your ethnicity based on visual observation."}};
                $scope.selectedInfoData = {};
                $injector.get('$controller')('personalInfoModelCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });


            });


            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }


            $scope.selectedInfoData = {
                "birthDate": "23/02/2016",
                "effectiveDate": "2016-02-23",
                "month": "February",
                "date": "23",
                "year": "2016"
            };

            $httpBackend
                .whenGET('assets/data/personal/personinfo.json')
                .respond(200, personinfoResponse);

            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/genders')
                .respond(200, genderResponse);

            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/' + appConfig.countryCode + '/ethnicities')
                .respond(200, ethnicityResponse);

            $httpBackend.flush();


        });

        describe('submitForm function testing', function () {

            it('submitForm is defined', function () {
                expect($scope.submitForm).toBeDefined();
            });

            it('submitForm function call testing', function () {

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
                $scope.cancel();
            });
        });

        describe('disableEthinicity function testing', function () {

            it('disableEthinicity is defined', function () {
                expect($scope.disableEthinicity).toBeDefined();
            });

            it('disableEthinicity function call testing', function () {
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                $scope.disableEthinicity();

                expect($scope.declineEthinicity).toBeFalsy();

                $body.empty();

                simpleHTML = '<input type="checkbox" checked  id="declineEthinicity" class="radio-label-info" />'
                el = $compile(simpleHTML)($scope);
                $body.append(el);
                $rootScope.$digest();

                $scope.disableEthinicity();

                expect($scope.declineEthinicity).toBeFalsy();


            });

        });


        describe('updatePersonalInfo function testing', function () {

            it('updatePersonalInfo is defined', function () {
                expect($scope.updatePersonalInfo).toBeDefined();
            });

            it('updatePersonalInfo personalInfoForm as false function testing', function () {


                var formName = {$valid: false};
                $scope.updatePersonalInfo(formName);

            });

        });

        describe('checkDate function testing', function () {

            it('checkDate is defined', function () {
                expect($scope.checkDate).toBeDefined();
            });

            it('checkDate function call testing', function () {
                var date = '05-01-2016';
                $scope.checkDate(date);
            });
        });

        describe('saveData function testing', function () {

            it('saveData function is defined', function () {
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call with success response', function () {
                var i = '<input type="text" id="info_edit_effective_date" class="no-bg no-border medium" value="05/31/2016"></input>';
                var eli;
                eli = $compile(i)($scope);
                $body.append(eli);
                $rootScope.$digest();
                $scope.selectedInfoData = {}
                $scope.selectedInfoData.month = {};
                $scope.selectedInfoData.month.id = 4;
                $scope.selectedInfoData.date = {};
                $scope.selectedInfoData.date.id = 12;
                $scope.selectedInfoData.year = {};
                $scope.selectedInfoData.year.key = 2016;
                $scope.selectedInfoData.gender = {};
                $scope.selectedInfoData.gender.key = 'M';
                $scope.selectedInfoData.ethnicity = {};
                $scope.selectedInfoData.ethnicity.key = 'F';
                var saveData = {gender: 'M', birthDate: '2016-04-12', effectiveDate: '2016-05-31', ethnicity: 'F', employeeId: '00001000483', uniqueId: 1, marriageStatus: 'M',
                               militaryStatus: '6', country: 'US'};
                var response = {"_statusCode": "200", "_statusText": "OK"};

                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + $scope.appUserId + profileUrlConfig.resources.personalInfo
                    + '?effectivedate=&enableValidation=true', saveData).respond(200, response);
                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with failure response', function () {
                var i = '<input type="text" id="info_edit_effective_date" class="no-bg no-border medium" value="05/31/2016"></input>';
                var eli;
                eli = $compile(i)($scope);
                $body.append(eli);
                $rootScope.$digest();
                $scope.selectedInfoData = {}
                $scope.selectedInfoData.month = {};
                $scope.selectedInfoData.month.id = 4;
                $scope.selectedInfoData.date = {};
                $scope.selectedInfoData.date.id = 12;
                $scope.selectedInfoData.year = {};
                $scope.selectedInfoData.year.key = 2016;
                $scope.selectedInfoData.gender = {};
                $scope.selectedInfoData.gender.key = 'M';
                $scope.selectedInfoData.ethnicity = {};
                $scope.selectedInfoData.ethnicity.key = 'F';
                var saveData = {gender: 'M', birthDate: '2016-04-12', effectiveDate: '2016-05-31', ethnicity: 'F', employeeId: '00001000483', uniqueId: 1, marriageStatus: 'M',
                                militaryStatus: '6', country: 'US'};
                var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};

                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + $scope.appUserId + profileUrlConfig.resources.personalInfo
                    + '?effectivedate=&enableValidation=true', saveData).respond(400, response);
                $scope.saveData();
                $httpBackend.flush();
            });
        });

        describe('changeSSN function testing',function(){
            it('changeSSN is defined',function(){
                expect($scope.changeSSN).toBeDefined();
            });

            it('changeSSN function call',function(){
                $scope.changeSSN();
            });
        });

        afterEach(function () {
            $body.empty();
        });
    });


}());
*/
