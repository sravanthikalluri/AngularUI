/**
 * Created by Jayakrishna on 12/1/2015.
 */
describe('LifeStatusChange View Controller Testing ', function () {
    var $rootScope,
        $scope,
        $httpBackend,
        utilService,
        appConfig;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('lifeStatusChangeViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            utilService = $injector.get('utilService');
        });
    });

    it('$timeout testing', function () {
        var response = {};
        var service = {};
        service.gatewaySignonData = {};
        service.gatewaySignonData.companyId = appConfig.companyId;
        service.gatewaySignonData.tSessionId = utilService.getCookie();
        $httpBackend.when("POST", "/trinetGateway/services/v1.0/hrpsessionsignon2", JSON.stringify(service.gatewaySignonData)).respond(200, response);

        $httpBackend.flush();
    });

    it('params is defined',function(){
        expect($scope.params).toBeDefined();
    });
});
