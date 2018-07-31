/**
 * Created by jaya krishna on 12/22/2015.
 */
describe('Eforms Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    var eformDataTabResponse = {
        "data": {
            "eforms_data": []
        }, "_statusCode": "200", "_statusText": "OK"
    };

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('eformsCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'eforms'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        window.frames = {};
        window.frames.frame1 = {};
        window.frames.frame1.focus = function () {
        };
        window.frames.frame1.print = function () {
        };
    });

    describe('formatDate funciton testing ', function () {
        it('formatDate is defined ', function () {
            expect($scope.formatDate).toBeDefined();
        });

        it('formatDate function call', function () {
            $scope.formatDate('2015-12-28');
        });
    });

    describe('onload call testing',function(){
        it('onload call with success response',function(){
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.eforms + "/" + appConfig.companyId + "/" +
                    $scope.appUserId + companyUrlConfig.resources.eformsStatus)
                .respond(200, eformDataTabResponse);
            $httpBackend.flush();
        });

        it('onload call with failure response',function(){
            var failureResponse = {
                                  data: [],
                                  _statusCode: "400",
                                  _statusText: "OOPs Error",
                                  "_error": {"detailMessage": "error"}
                              };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.eforms + "/" + appConfig.companyId + "/" +
                    $scope.appUserId + companyUrlConfig.resources.eformsStatus)
                .respond(400, failureResponse);
            $httpBackend.flush();
        });
    });
});
