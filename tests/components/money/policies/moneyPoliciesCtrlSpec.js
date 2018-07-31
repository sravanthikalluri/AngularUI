/**
 * Created by santosh on 12/5/2016.
 */
describe('Money Policies Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('moneyPoliciesCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });
    });


    describe('if statement testing ', function () {

        var $scope = {};
        var appConfig = {userId: '123'};
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }

        expect($scope.appUserId).toBeDefined();
    });

    describe('loadPolicies function testing ', function () {
        it('loadPolicies is defined ', function () {
            expect($scope.loadPolicies).toBeDefined();
        });

        it('loadPolicies function call with success response', function () {

            var response = {
                       data : {
                           forms : [{},{}]

                       },
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                 "/" + appConfig.companyId + "/" + $scope.appUserId +
                                 "/policiesprocedures?pfClient=" + appConfig.pfClient)
                .respond(200, response);
            $scope.loadPolicies();
            $httpBackend.flush();
        });


        it('loadPolicies function call with failure response', function () {

            var response = {
                data: [],
                _statusCode: "400",
                _statusText: "OOPs Error",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                 "/" + appConfig.companyId + "/" + $scope.appUserId +
                                 "/policiesprocedures?pfClient=" + appConfig.pfClient)
                .respond(400, response);
            $scope.loadPolicies();
            $httpBackend.flush();

        });


    });
});
