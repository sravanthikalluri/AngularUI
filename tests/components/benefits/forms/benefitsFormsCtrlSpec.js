/**
 * Created by Jayakrishna on 12/1/2015.
 */
describe('Benefits Forms Controller Testing ', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend;

    var benefitFormDataRes = {
        _statusCode: '200',
        _statusText: 'OK',
        data: {"forms": {}}
    };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('benefitsFormsCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });


    });

    describe('onload call testing', function () {
        it('onload call with success response', function () {
            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + appConfig.companyId + "/" + appConfig.userId +
                "/forms?countryCode=" + appConfig.countryCode + "&module=benefits";
            $httpBackend.whenGET(url).respond(200, benefitFormDataRes);

            $httpBackend.flush();
        });

        it('onload call with failure response', function () {
            var res = {"data": {}, "_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + appConfig.companyId + "/" + appConfig.userId +
                "/forms?countryCode=" + appConfig.countryCode + "&module=benefits";
            $httpBackend.whenGET(url).respond(400, res);
            $httpBackend.flush();
        });
    });

    describe('selectTab function testing', function () {
        it('selectTab is defined', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call', function () {
            var setTab = 0;
            $scope.selectTab(setTab);
        });
    });

    describe('closePanel function testing', function () {
        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call function', function () {
            $scope.closePanel();
        });
    });

    describe('isSelected function testing', function () {
        it('isSelected is defined', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('isSelected function call', function () {
            var checkTab = 1;
            $scope.isSelected(checkTab);
        });
    });


});
