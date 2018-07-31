/**
 * Created by santosh on 18/5/2016.
 */
describe('Holiday Schedule Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('holidayScheduleCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });
    });


    describe('holidayService function testing ', function () {
        it('holidayService is defined ', function () {
            expect($scope.holidayService).toBeDefined();
        });

        it('holidayService function call with success response', function () {

            var response = {
                       data : {
                           forms : [{},{}]

                       },
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
                                  "/" + appConfig.companyId + "/holiday-schedule")
                .respond(200, response);
            $scope.holidayService();
            $httpBackend.flush();
        });


        it('holidayService function call with failure response', function () {

            var response = {
                data: [],
                _statusCode: "400",
                _statusText: "OOPs Error",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
                                 "/" + appConfig.companyId + "/holiday-schedule")
                .respond(400, response);
            $scope.holidayService();
            $httpBackend.flush();

        });


    });
});
