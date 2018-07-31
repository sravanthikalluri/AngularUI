/*
/!**
 * Created by ganesh on 10/29/2015.
 *!/
(function () {

    "use strict";

    describe('Return From Leave Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig;

        var $compile, $body = $('body');


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.toggleReturnFromLeave = function () {
                    $scope.extendedleave = false;
                    $scope.returnleave = true;
                    $scope.manageEmpProfile = !$scope.manageEmpProfile;
                    $scope.returnFromLeave = !$scope.returnFromLeave;
                };
                $scope.empStatusChange = function () {
                    $scope.extendedleave = false;
                    $scope.returnleave = true;
                };
                $scope.childParentAlertMsg = function (data) {
                    $scope.errorAlert = data;
                };
                $injector.get('$controller')('returnFromLeaveCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
            });


        });

        describe('showLearnMore function testing', function () {

            it('showLearnMore is defined', function () {
                expect($scope.showLearnMore).toBeDefined();
            });

            it('showLearnMore function call tesing', function () {

                expect($scope.IsVisible).toBeFalsy();
                expect($scope.showLearn).toBeTruthy();

                $scope.showLearnMore();

                expect($scope.IsVisible).toBeTruthy();
                expect($scope.showLearn).toBeFalsy();


            });

        });

        describe('changeDate function testing', function () {

            it('changeDate is defined', function () {
                expect($scope.changeDate).toBeDefined();
            });

            it('changeDate function call testing', function () {
                var i = '<input type="text" id="returnToWorkDate" class="no-bg no-border medium" value="05/25/2016"></input>';
                var eli = $compile(i)($scope);
                $body.append(eli);
                $rootScope.$digest();
                $scope.changeDate();
            });

        });

        describe('submitReturnRequest function tesing', function () {

            it('submitReturnRequest is defined', function () {

                expect($scope.submitReturnRequest).toBeDefined();
            });

            it('submitReturnRequest function call with from as invalid', function () {
                $scope.returnLeaveForm = {};
                $scope.returnLeaveForm.$valid = false;
                var returnLeave = '06/11/2015';
                $scope.submitReturnRequest(returnLeave);
            });

            it('submitReturnRequest function call testing with success response', function () {
                var i = '<input type="text" id="returnToWorkDate" class="no-bg no-border medium" value="05/31/2016"></input>';
                var eli;
                eli = $compile(i)($scope);
                $body.append(eli);
                $rootScope.$digest();
                $scope.returnLeaveForm = {};
                $scope.returnLeaveForm.$valid = true;
                $scope.returnLeave = {};
                var url = '?enableValidation=true';
                var response = {
                    _statusCode: '200'
                };

                $httpBackend
                    .when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.timeOff + "/" + appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.returnLeave + url, $scope.returnLeave)
                    .respond(200, response);


                var returnLeave = '06/11/2015';

                $scope.submitReturnRequest(returnLeave);


                $httpBackend.flush();


            });

            it('submitReturnRequest function call testing with failure response', function () {
                var i = '<input type="text" id="returnToWorkDate" class="no-bg no-border medium" value="05/31/2016"></input>';
                var eli;
                eli = $compile(i)($scope);
                $body.append(eli);
                $scope.returnLeaveForm = {};
                $scope.returnLeaveForm.$valid = true;
                $scope.returnLeave = {};
                var url = '?enableValidation=true';
                var response = {
                    _statusCode: '400',
                    "_error": {"detailMessage": "error"}
                };

                $httpBackend
                    .when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.timeOff + "/" + appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.returnLeave + url, $scope.returnLeave)
                    .respond(400, response);


                var returnLeave = '06/11/2015';

                $scope.submitReturnRequest(returnLeave);
                $httpBackend.flush();

            });
        });

        afterEach(function () {
            $body.empty();
        });

    });


}());*/
