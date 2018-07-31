/*
/!*
 Created by Naveen on 10/30/2015.
*!/


(function () {

    "use strict";

    describe('Names Preferred Model Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig;
        var $compile,$body = $('body');

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();

                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $scope.preferredNameData = {};
                $scope.togglePreferredName = function () {
                    $scope.visible = !$scope.visible;
                    $scope.visibleName = !$scope.visibleName;
                };
                $scope.primaryPreferedNames = function () {
                    $scope.visible = !$scope.visible;
                    $scope.visibleName = !$scope.visibleName;
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
                $scope.translation = {};
                $scope.translation.pageValidationMessage = 'message';
                $injector.get('$controller')('namesPreferredModelCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });

            });


            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }


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

        describe('updateData function testing', function () {

            it('updateData is defined', function () {
                expect($scope.updateData).toBeDefined();
            });

            it('updateData primaryNameForm.$valid = true function call testing', function () {
                var formName = {"$valid": true};
                spyOn($scope, 'saveData');
                $scope.preferredNameForm = {};
                $scope.preferredNameForm.$valid = true;
                $scope.updateData(formName);
                expect($scope.submitted).toBeTruthy();
                expect($scope.saveData).toHaveBeenCalled();
            });


            it('Should test updateData primaryNameForm.$valid = false function call testing', function () {

                var formName = {"$valid": true};
                $scope.preferredNameForm = {};
                $scope.preferredNameForm.$valid = false;
                $scope.preferredNameForm.$error = [];
                spyOn($scope, 'saveData');
                $scope.updateData(formName);
                expect($scope.saveData).toHaveBeenCalled();
            });

            it('Should test updateData function call testing with formName.$valid as false', function () {
                var formName = {"$valid": false};
                $scope.updateData(formName);
                expect($scope.submitted).toBeTruthy();
            });


        });
        describe('cancelPreferred function testing', function () {

            it('cancelPreferred is defined', function () {
                expect($scope.cancelPreferred).toBeDefined();
            });

            it('cancelPreferred function call testing', function () {
                $scope.cancelPreferred();
            });
        });

        describe('saveData function testing', function () {

            it('saveData is defined', function () {
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call testing with success response', function () {
                $scope.preferredNameEditData = {};
                $scope.preferredNameEditData.formOfAddress = 'abc';
                $scope.preferredNameEditData.suffix = 'Mr';
                $scope.preferredNameEditData.middleName = 'xyz';
                $scope.preferredNameEditData.effectiveDate = '2016-06-30';
                $scope.preferredNameEditData.oldeffectiveDate = '2016-06-30';
                var putUrl = '?enableValidation=true';
                var data = {"formOfAddress":"","suffix":"","middleName":"xyz","effectiveDate":"2016-06-30","nameType":"PRF"};
                var response = {"_statusCode": "200", "_statusText": "OK"};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl,
                    data).respond(200, response);

                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call testing with failure response', function () {
                $scope.preferredNameEditData = {};
                $scope.preferredNameEditData.formOfAddress = 'abc';
                $scope.preferredNameEditData.suffix = 'Mr';
                $scope.preferredNameEditData.middleName = 'xyz';
                $scope.preferredNameEditData.effectiveDate = '2016-06-30';
                $scope.preferredNameEditData.oldeffectiveDate = '2016-06-30';
                var putUrl = '?enableValidation=true';
                var data = {"formOfAddress":"","suffix":"","middleName":"xyz","effectiveDate":"2016-06-30","nameType":"PRF"};
                var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl,
                    data).respond(400, response);

                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call testing', function () {
                $scope.preferredNameEditData = {};
                $scope.preferredNameEditData.formOfAddress = 'abc';
                $scope.preferredNameEditData.suffix = 'Mr';
                $scope.preferredNameEditData.oldeffectiveDate = '20-10-2015';
                $scope.preferredNameEditData.middleName = 'xyz';
                $scope.preferredNameEditData.effectiveDate = '2016-06-30';
                var putUrl = '?enableValidation=true';
                var data = {"formOfAddress":"","suffix":"","middleName":"xyz","effectiveDate":"2016-06-30","nameType":"PRF"};
                var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
                $httpBackend.when('PUT', profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId + profileUrlConfig.resources.name + putUrl,
                    data).respond(400, response);

                $scope.saveData();
                $httpBackend.flush();
            });
        });

        afterEach(function () {
            $body.empty();
        });

    });


}());
*/
