/*
/!* Created by naveen on 10/30/2015.*!/


(function () {

    "use strict";

    describe('Names Model Controller Testing', function () {

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
                $injector.get('utilService');
                appConfig = $injector.get('appConfig');
                $scope.togglePrimaryName = function () {
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
                $scope.primaryNameModelData = {};
                $injector.get('$controller')('namesModelCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'profile'}
                });
                $httpBackend = $injector.get('$httpBackend');

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

            it('updateData primaryNameForm.$valid = true function testing', function () {

                var formName = {"$valid": true};
                spyOn($scope, 'saveData');

                $scope.primaryNameForm = {};

                $scope.primaryNameForm.$valid = true;


                $scope.updateData(formName);

                expect($scope.submitted).toBeTruthy();

                expect($scope.saveData).toHaveBeenCalled();

            });

            it('updateData primaryNameForm.$valid = false function testing', function () {


                var formName = {"$valid": true};
                spyOn($scope, 'saveData');
                $scope.primaryNameForm = {};

                $scope.primaryNameForm.$valid = false;
                $scope.primaryNameForm.$error = [];

                $scope.updateData(formName);

                expect($scope.submitted).toBeTruthy();

                expect($scope.saveData).toHaveBeenCalled();

            });

            it('updateData function testing with formName.$valid as false', function () {

                var formName = {"$valid": false};
                $scope.updateData(formName);
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

        describe('saveData function testing', function () {

            it('saveData is defined', function () {
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call with success response', function () {
                $scope.primaryNameModelData = {};
                $scope.primaryNameModelData.formOfAddress = 'abc';
                $scope.primaryNameModelData.suffix = 'Mr';
                var putUrl = '?enableValidation=true';
                var response = {"_statusCode": "200", "_statusText": "OK"}

                $httpBackend.when('PUT', profileUrlConfig.profileApi +
                    profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId +
                    profileUrlConfig.resources.name + putUrl, $scope.primaryNameData).respond(200, response);
                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call with failure response', function () {
                $scope.primaryNameModelData = {};
                $scope.primaryNameModelData.formOfAddress = 'abc';
                $scope.primaryNameModelData.suffix = 'Mr';
                var putUrl = '?enableValidation=true';
                var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}}

                $httpBackend.when('PUT', profileUrlConfig.profileApi +
                    profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId +
                    profileUrlConfig.resources.name + putUrl, $scope.primaryNameData).respond(400, response);
                $scope.saveData();
                $httpBackend.flush();
            });

            it('saveData function call testing', function () {
                $scope.primaryNameModelData = {};
                $scope.primaryNameModelData.formOfAddress = 'abc';
                $scope.primaryNameModelData.suffix = 'Mr';
                $scope.primaryNameModelData.oldeffectiveDate = '20-10-2015';
                var putUrl = '?enableValidation=true';
                var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}}

                $httpBackend.when('PUT', profileUrlConfig.profileApi +
                    profileUrlConfig.profileBase + appConfig.companyId + '/' + appConfig.userId +
                    profileUrlConfig.resources.name + putUrl, $scope.primaryNameData).respond(400, response);
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
