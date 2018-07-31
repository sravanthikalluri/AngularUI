/*
/!* Created by ganesh on 10/29/2015.*!/

(function () {

    "use strict";

    describe('Personal Status Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            personalStatusDataResponse = {
                "data": {
                    "activePersonalDataList": [{
                        "personId": "00001005514",
                        "uniqueId": 2,
                        "effectiveDate": "2015-09-26",
                        "gender": "M",
                        "maritalStatus": "C",
                        "birthDate": "1957-07-17",
                        "militaryStatus": "1",
                        "ethinicity": "GREEN",
                        "countryCode": "US"
                    }],
                    "historyPersonalDataList": [{
                        "personId": "00001005514",
                        "uniqueId": 1,
                        "effectiveDate": "2007-08-03",
                        "gender": "M",
                        "maritalStatus": "M",
                        "birthDate": "1957-07-17",
                        "militaryStatus": "6",
                        "ethinicity": "GREEN",
                        "countryCode": "US"
                    }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            },
            statusDataResponse = {
                "data": {
                    "activePersonalDataList": [{
                        "personId": "00001005514",
                        "uniqueId": 2,
                        "effectiveDate": "2015-09-26",
                        "gender": "M",
                        "maritalStatus": "S",
                        "birthDate": "1957-07-17",
                        "militaryStatus": "%#12",
                        "ethinicity": "GREEN",
                        "countryCode": "US"
                    }],
                    "historyPersonalDataList": [{
                        "personId": "00001005514",
                        "uniqueId": 1,
                        "effectiveDate": "2007-08-03",
                        "gender": "M",
                        "maritalStatus": "M",
                        "birthDate": "1957-07-17",
                        "militaryStatus": "6",
                        "ethinicity": "GREEN",
                        "countryCode": "US"
                    }]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            },
            militaryStatusDataResponse = {
                "data": [{
                    "key": "1",
                    "value": "Not indicated"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            maritalStatusDataResponse = {
                "data": [{
                    "key": "C",
                    "value": "Common Law"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            deletedResponse = {
                "_statusText": "deleted successfully"
            },
            citizenShipResponse = {
                "data": {
                    "employeeId": "00001632553",
                    "alternateId": null,
                    "workEligibility": {
                        "citizenshipStatus": "A citizen or national of the United States",
                        "effectiveDate": "2015-03-02",
                        "visa": null,
                        "USWorkEligibility": "Y"
                    }
                },
                "_requestId": "439b8e2f-1cfc-46e8-a3fe-8087da4a08d3",
                "_statusCode": "200",
                "_statusText": "OK",
                "_statusMessage": "Retrieved Employee CitizenShip Successfully "
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
                $injector.get('$controller')('personalStatusCtrl', {
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

            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.personalstatus).respond(200, personalStatusDataResponse);


            $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.personalstatus).respond(200, statusDataResponse);


            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/marital-statuses').respond(200, maritalStatusDataResponse);


            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/' + appConfig.countryCode + '/military-statuses').respond(200, militaryStatusDataResponse);

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-profile/v1/profile/' + companyId + '/' + appUserId + '/citizenship').respond(200, citizenShipResponse);


            $httpBackend.flush();


        });

        describe('showHideTimeline function testing', function () {

            it('showHideTimeline is defined', function () {
                expect($scope.showHideTimeline).toBeDefined();
            });

            it('showHideTimeline function call testing', function () {

                expect($scope.showTimeline).not.toBeDefined();

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

                expect($scope.selectedStatusData).toBeUndefined();
                $scope.selectedStatusData = {effectiveDate: new Date()};
                $scope.personalStatusData = {};
                $scope.personalStatusData.data = {};
                $scope.personalStatusData.data.activeStatusList = [{effectiveDate: new Date()}, {effectiveDate: new Date()}];
                $scope.personalStatusData.data.historyStatusList = [{effectiveDate: new Date()}, {effectiveDate: new Date()}];

                $scope.selectedObject();

                if ($scope.selectedStatusData !== undefined) {
                    $scope.selectedStatusData = {effectiveDate: new Date()};
                    $scope.personalStatusData = {};
                    $scope.personalStatusData.data = {};
                    $scope.personalStatusData.data.activeStatusList = [{effectiveDate: new Date()}, {effectiveDate: new Date()}];
                    $scope.selectedObject();

                    expect($scope.statusDetails).toBeDefined();
                } else {
                    $scope.selectedObject();
                    expect($scope.statusDetails).toBeUndefined();
                }


            });

        });

        describe('dateChange function testing', function () {

            it('dateChange is defined', function () {
                expect($scope.dateChange).toBeDefined();
            });

            it('dateChange function call testing', function () {
                $scope.personalStatusList = [];
                $scope.dateChange();
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


    });


}());
*/
