describe('ACA Large Employer Status View Controller Testing', function () {

    var $rootScope, $scope;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('acaLrgEmployerStatusViewCtrl', {
                $scope: $scope
            });
        });
    });


});