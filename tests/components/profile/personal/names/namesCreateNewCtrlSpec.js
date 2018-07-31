/* Created by ganesh on 10/30/2015.*/

/*(function () {

    "use strict";

    describe('Names Create New Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            utilService;

        var $compile,$body = $('body');

        var suffixesResponse = {
                "data": [{
                    "key": "II",
                    "value": "II"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            titlesResponse = {
                "data": [{
                    "key": "Mr",
                    "value": "Mr"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                utilService = $injector.get('utilService');
                appConfig = $injector.get('appConfig');

                $scope.visibleName = false;
                $scope.visible = false;
                $scope.visiblePreferredName = false;
                $scope.visibleCreateNewName = false;

                $scope.toggleCreateNew = function () {
                    $scope.visible = !$scope.visible;
                    $scope.visibleCreateNewName = !$scope.visibleCreateNewName;
                };
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000483';
                $scope.primaryPreferedNames = function (val) {
                    return val;
                }
                $injector.get('$controller')('namesCreateNewCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');

            });


            $scope.appUserId = appConfig.userId;


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/suffixes').respond(200, suffixesResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/titles').respond(200, titlesResponse);


            $httpBackend.flush();


        });


        describe('cancel function testing', function () {

            it('cancel is defined', function () {
                expect($scope.cancel).toBeDefined();
            });

            it('cancel function call testing', function () {

                spyOn($scope, 'toggleCreateNew');

                expect($scope.create).not.toBeNull();

                $scope.cancel();

                expect($scope.create).toBeNull();
                expect($scope.toggleCreateNew).toHaveBeenCalled();

            });

        });


        describe('saveData function testing', function () {

            it('saveData is defined', function () {
                expect($scope.saveData).toBeDefined();
            });


            it('saveData function call with success response in post call ', function () {
                var formName = {"$valid": true};
                $scope.appUserId = appConfig.userId;

                $scope.nameCreateNewForm = {};
                $scope.nameCreateNewForm.$valid = true;
                var putUrl = '?enableValidation=true';
                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl;

                $scope.create = {};
                $scope.create.approvalStatus = 'F';
                $scope.create.reasonChangeCode = null;
                $scope.create.nameFormat = '';
                $scope.create.personTitle = '';
                $scope.create.endDate = constants.endDate;
                $scope.create.effectiveDate = utilService.filterToDayDate();
                $scope.create.uniqueId = '';
                $scope.create.nameType = "PRF";
                $scope.create.personId = appConfig.userId;
                $scope.create.middleName = "asdf";
                $scope.create.formOfAddress = "asdf";
                $scope.create.suffix = "asdf";
                var createResponse = {"_statusCode": "200", "_statusText": "OK"};

                $httpBackend.when('POST', url, $scope.create).respond(200, createResponse);

                $scope.saveData(formName);
                $httpBackend.flush();

            });

            it('saveData function call with success  in post call ', function () {
                var formName = {"$valid": true};
                $scope.nameCreateNewForm = {};
                $scope.nameCreateNewForm.$valid = true;
                var putUrl = '?enableValidation=true';
                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl;

                $scope.create = {};
                $scope.create.approvalStatus = 'F';
                $scope.create.reasonChangeCode = null;
                $scope.create.nameFormat = '';
                $scope.create.personTitle = '';
                $scope.create.endDate = constants.endDate;
                $scope.create.effectiveDate = utilService.filterToDayDate();
                $scope.create.uniqueId = '';
                $scope.create.nameType = "PRF";
                $scope.create.personId = appConfig.userId;
                $scope.create.middleName = "asdf";
                $scope.create.formOfAddress = "asdf";
                $scope.create.suffix = "asdf";
                var createResponse = {"_statusCode": "200", "_statusText": "OK"};

                $httpBackend.when('POST', url, $scope.create).respond(200, createResponse);

                $scope.saveData(formName);
                $httpBackend.flush();
            });

            it('saveData function call with failure in post call ', function () {
                var formName = {"$valid": true};
                $scope.nameCreateNewForm = {};
                $scope.nameCreateNewForm.$valid = true;
                var putUrl = '?enableValidation=true';
                var url = profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl;

                $scope.create = {};
                $scope.create.approvalStatus = 'F';
                $scope.create.reasonChangeCode = null;
                $scope.create.nameFormat = '';
                $scope.create.personTitle = '';
                $scope.create.endDate = constants.endDate;
                $scope.create.effectiveDate = utilService.filterToDayDate();
                $scope.create.uniqueId = '';
                $scope.create.nameType = "PRF";
                $scope.create.personId = appConfig.userId;
                $scope.create.middleName = "asdf";
                $scope.create.formOfAddress = "asdf";
                $scope.create.suffix = "asdf";
                var createResponse = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};

                $httpBackend.when('POST', url, $scope.create).respond(400, createResponse);

                $scope.saveData(formName);
                $httpBackend.flush();
            });

            it('saveData function call with formName.$valid as false ', function () {
                var formName = {"$valid": false};
                $scope.saveData(formName);

            });


        });



        afterEach(function () {
            $body.empty();
        });


    });


}());*/
