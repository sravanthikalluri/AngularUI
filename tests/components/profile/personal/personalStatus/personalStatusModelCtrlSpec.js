/*
/!* Created by ganesh on 10/29/2015.*!/

(function () {

    "use strict";

    describe('Personal Status Model Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
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
                    "key": "S",
                    "value": "Common Law"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            personalStatusDataResponse = {
                "data": {
                    "activePersonalDataList": [
                        {
                            "personId": "00001005514",
                            "uniqueId": 2,
                            "effectiveDate": "2015-09-26",
                            "gender": "M",
                            "maritalStatus": "Common Law",
                            "birthDate": "1957-07-17",
                            "militaryStatus": "Not indicated",
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
            };


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.citizenShipInfo = {};
                $scope.citizenShipInfo.citizenshipStatus = 'Citizen or national of the united states';
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.toggle = function(){
                    return true;
                };
                $scope.init = function(){
                    return true;
                };
                $scope.appUserId = '00001000483';
                $injector.get('$controller')('personalStatusModelCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $injector.get('genericService');
                $injector.get('$routeParams');
            });

            $scope.appUserId = appConfig.userId;

            $scope.selectedStatusData = {key: 'value'};
            $scope.personalStatusData = personalStatusDataResponse.data;

            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/marital-statuses').respond(200, maritalStatusDataResponse);
            $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/' + appConfig.countryCode + '/military-statuses').respond(200, militaryStatusDataResponse);

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


        describe('updatePersonalStatus function testing', function () {

            it('updatePersonalStatus is defined', function () {
                expect($scope.updatePersonalStatus).toBeDefined();
            });

            it('updatePersonalStatus function call testing with success response', function () {

                var updateData = {
                    employeeId: $scope.appUserId,
                    militaryStatus: '1',
                    maritalStatus: 'S'
                };
                $scope.personalModelStatusData.maritalStatus = maritalStatusDataResponse.data[0];
                var putUrl = '?enableValidation=true';
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.personalStatusUpdate + putUrl, updateData).respond(200, {status: 'success'});

                $scope.updatePersonalStatus();

                $httpBackend.flush();


            });

            it('updatePersonalStatus function call testing with failure response', function () {

                var updateData = {
                    employeeId: $scope.appUserId,
                    militaryStatus: '1',
                    maritalStatus: 'S'
                };
                var putUrl = '?enableValidation=true';
                $scope.personalModelStatusData.maritalStatus = maritalStatusDataResponse.data[0];
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.personalStatusUpdate + putUrl, updateData).respond(400, {"_error": {"detailMessage": "error"}});

                $scope.updatePersonalStatus();

                $httpBackend.flush();


            });

        });


    });


}());
*/
