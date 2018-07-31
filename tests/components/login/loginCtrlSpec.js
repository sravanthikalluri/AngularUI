/**
 * Created by Santosh on 10/23/2015.
 */

describe('Login Controller Testing', function () {

    var $rootScope,
        $scope,
        $httpBackend;

    var windowObj = {location: {href: ''}};

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $scope = $rootScope.$new();
            $injector.get('$controller')('loginController', {$scope: $scope, window: windowObj});
        });
    });

    describe('sendData function testing', function () {

        it('sendData is defined', function () {
            expect($scope.sendData).toBeDefined();
        });

        it('sendData function call with success response', function () {

            spyOn($scope, 'sendHome');

            var loginResponse = {
                _statusCode: "200"
            };

            $scope.empId = '00001000483';
            $scope.userpassword = '31T';

            var credentials = {
                emplid: $scope.empId,
                userpassword: $scope.userpassword
            };

            var URL = loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signon + "?realm=sw_hrp&enableValidation=true";


            $httpBackend
                .when('POST', URL, credentials)
                .respond(200, loginResponse);


            $scope.sendData();

            $httpBackend.flush();

            expect($scope.empId).toEqual('00001000483');
            expect($scope.sendHome).toHaveBeenCalled();
        });


        it('Test sendData error function ', function () {

            var loginResponse = {_statusCode: "400", "_error": {"detailMessage": "error"}};

            $scope.empID = '00001000483';
            $scope.companyId = '31T';

            var credentials = {
                emplid: $scope.empId,
                userpassword: $scope.userpassword
            };

            var URL = loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signon + "?realm=sw_hrp&enableValidation=true";


            $httpBackend
                .when('POST', URL, credentials)
                .respond(400, loginResponse);


            $scope.sendData();
            $httpBackend.flush();

        });


    });

});


