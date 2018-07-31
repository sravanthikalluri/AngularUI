(function () {

    "use strict";

    describe('Request Time Off Controller Testing', function () {

        var $rootScope,
            $scope;


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $injector.get('$controller')('requestTimeOffViewCtrl', {$scope: $scope});

            });
        });

        it('params is defined', function () {
            expect($scope.params).toBeDefined();
        });

    });

}());