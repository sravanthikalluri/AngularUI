/*
/!**
 * Created by ganesh on 10/29/2015.
 *!/
(function(){

    "use strict";

    describe('Extend Leave Request Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig;

        var $compile,$body = $('body');


        beforeEach(function() {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.toggleExtendLeaveRequest = function() {
                            $scope.extendedleave = true;
                            $scope.returnleave = false;
                            $scope.manageEmpProfile = !$scope.manageEmpProfile;
                            $scope.leaveFormDisplay = !$scope.leaveFormDisplay;
                        };
                 $scope.childParentAlertMsg = function (data) {
                            $scope.errorAlert = data;
                        };
                $injector.get('$controller')('extendLeaveRequestCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
            });


        });

        describe('showLearnMore function testing', function () {

            it('showLearnMore is defined',function(){
                expect($scope.showLearnMore).toBeDefined();
            });

            it('showLearnMore function call testing',function(){

                expect($scope.IsVisible).toBeFalsy();
                expect($scope.showLearn).toBeTruthy();

                $scope.showLearnMore();

                expect($scope.IsVisible).toBeTruthy();
                expect($scope.showLearn).toBeFalsy();

            });

        });

        describe('addAdditionalTime function testing', function () {

            it('addAdditionalTime is defined',function(){
                expect($scope.addAdditionalTime).toBeDefined();
            });

            it('addAdditionalTime function call testing',function(){

                var len = $scope.extendedLeaveObject.additionalTime.length;

                expect($scope.extendedLeaveObject.additionalTime.length).toBe(len);


                len = $scope.extendedLeaveObject.additionalTime.length;
                $scope.addAdditionalTime();


                expect($scope.extendedLeaveObject.additionalTime.length).toBe(len + 1);

                len = $scope.extendedLeaveObject.additionalTime.length;

                $scope.addAdditionalTime();

                expect($scope.extendedLeaveObject.additionalTime.length).toBe(len + 1);

            });

        });

        describe('removeAdditionalTime function testing', function () {

            it('removeAdditionalTime is defined',function(){
                expect($scope.removeAdditionalTime).toBeDefined();
            });

            it('removeAdditionalTime function call testing',function(){

                var len = $scope.extendedLeaveObject.additionalTime.length;

                expect($scope.extendedLeaveObject.additionalTime.length).toBe(len);

                $scope.removeAdditionalTime();

                expect($scope.extendedLeaveObject.additionalTime.length).toBe(len - 1);

            });

        });

        describe('dateValidate function testing', function () {

            it('dateValidate is defined',function(){
                expect($scope.dateValidate).toBeDefined();
            });

            it('dateValidate function call testing',function(){
                $scope.extendedLeaveObject = {};
                var HTML1 = '<input type="text" id="lastWorkedDate" class="no-bg no-border medium" value="05/20/2016"></input>';
                var HTML2 = '<input type="text" id="extendedLeaveStartDate" class="no-bg no-border medium" value="05/20/2016"></input>';
                var element1,element2;
                element1 = $compile(HTML1)($scope);
                $body.append(element1);
                $rootScope.$digest();
                element2 = $compile(HTML2)($scope);
                $body.append(element2);
                $rootScope.$digest();
                $scope.dateValidate($scope.extendedLeaveObject);
            });

            it('dateValidate function call testing',function(){
                $scope.extendedLeaveObject = {};
                var HTML1 = '<input type="text" id="lastWorkedDate" class="no-bg no-border medium" value="05/31/2020"></input>';
                var HTML2 = '<input type="text" id="extendedLeaveStartDate" class="no-bg no-border medium"></input>';
                var element1,element2;
                element1 = $compile(HTML1)($scope);
                $body.append(element1);
                $rootScope.$digest();
                element2 = $compile(HTML2)($scope);
                $body.append(element2);
                $rootScope.$digest();
                $scope.dateValidate($scope.extendedLeaveObject);
            });

        });

        describe('addSevenDays function testing', function () {

            it('addSevenDays is defined',function(){
                expect($scope.addSevenDays).toBeDefined();
            });

            it('addSevenDays function call testing',function(){
                $scope.extendedLeaveObject = {};
                $scope.extendedLeaveObject.extendedLeaveStartDate = "05/20/2016";
                $scope.extendedLeaveObject.estimatedReturnDate = "05/10/2016";

                $scope.addSevenDays($scope.extendedLeaveObject);
            });

            it('addSevenDays function call testing',function(){
                $scope.extendedLeaveObject = {};
                $scope.extendedLeaveObject.extendedLeaveStartDate = "05/20/2016";
                $scope.extendedLeaveObject.estimatedReturnDate = "05/24/2016";

                $scope.addSevenDays($scope.extendedLeaveObject);
            });

        });

        describe('submitLeaveRequest function testing',function(){

            it('submitLeaveRequest is defined',function(){

                expect($scope.submitLeaveRequest).toBeDefined();
            });

            it('submitLeaveRequest call testing with success response',function(){

                var response = {
                    _statusCode : '200'
                };
                $scope.empStatusChange = function () {};
                var url = '?enableValidation=true';
                 $httpBackend
                    .when('POST',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +manageEmpUrlConfig.resources.timeOff + "/" + appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.extLeave + url ,$scope.extendedLeaveObject)
                    .respond(200,response);

                var extendedLeaveObject = {acknowledge : true};

                $scope.submitLeaveRequest(extendedLeaveObject);


                $httpBackend.flush();

            });

            it('submitLeaveRequest call testing with failure response',function(){

                var response = {
                    _statusCode : '400',
                    "_error":{"detailMessage":"error"}

                };
                var url = '?enableValidation=true';
                $scope.empStatusChange = function () {};
                 $httpBackend
                    .when('POST',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +manageEmpUrlConfig.resources.timeOff + "/" + appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.extLeave + url ,$scope.extendedLeaveObject)
                    .respond(400,response);

                var extendedLeaveObject = {acknowledge : true};

                $scope.submitLeaveRequest(extendedLeaveObject);


                $httpBackend.flush();

            });

            it('submitLeaveRequest call testing with failure response and acknowledge as false',function(){

                var response = {
                    _statusCode : '400',
                    "_error":{"detailMessage":"error"}

                };
                var url = '?enableValidation=true';
                $scope.empStatusChange = function () {};
                 $httpBackend
                    .when('POST',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +manageEmpUrlConfig.resources.timeOff + "/" + appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.extLeave + url,$scope.extendedLeaveObject)
                    .respond(400,response);

                var extendedLeaveObject = {acknowledge : false};

                $scope.submitLeaveRequest(extendedLeaveObject);


                $httpBackend.flush();

            });

        });

        describe('onFocus function testing',function(){
            it('onFocus is defined',function(){
                expect($scope.onFocus).toBeDefined();
            });

            it('onFocus function call',function(){
                var name = 'extendLeave';
                var obj = {
                          extendLeave: {
                              blur: {
                                  extendLeaveFormlastWorkedDateRequired: null,
                                  extendLeaveFormStartDateRequired: null,
                                  extendLeaveFormSestimatedReturnDateRequired: null,
                                  extendLeaveFormfirstDayleaveUnpaidRequired: null
                              },
                              focus: {
                                  extendLeaveFormlastWorkedDateRequired: null,
                                  extendLeaveFormStartDateRequired: null,
                                  extendLeaveFormSestimatedReturnDateRequired: null,
                                  extendLeaveFormfirstDayleaveUnpaidRequired: null
                              }
                          }
                      };
                $scope.onFocus(name,obj.extendLeave.focus);
            });
        });

        afterEach(function(){
            $body.empty();
        });
    });

}());*/
