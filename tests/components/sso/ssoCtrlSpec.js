describe('SSO View Controller Assertions ', function () {
    var $rootScope,
        $scope;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('ssoCtrl', {
                $scope: $scope,
                $routeParams: {
                    ssoId: 'ta_PAS_001'
                }
            });
        });
    });

    it(' SSO Params should be defined', function () {
        expect($scope.ssoParams).toBeDefined();
    });

    it(' SSO Params JSON Object should be constructed', function () {
        expect($scope.ssoParams).toEqual({
            ssoId: 'ta_PAS_001'
        });
    });
});