/**
 * Created by ganesh on 12/10/2015.
 */
(function () {

    "use strict";

    describe('Compensation Controller Testing', function () {


        var $rootScope,
            $scope;

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $injector.get('$controller')('compensationCtrl', {$scope: $scope});
            });

        });

        describe('togglePeriodType function testing', function () {
            it('togglePeriodType is defined', function () {
                expect($scope.togglePeriodType).toBeDefined();
            });

            it('togglePeriodType function call', function () {
                $scope.togglePeriodType();
                expect($scope.enableYearPeriodType).toBeFalsy();
            });
        });

        describe('viewReport function testing', function () {
            it('viewReport is defined', function () {
                expect($scope.viewReport).toBeDefined();
            });

            it('viewReport function call', function () {
                $scope.viewReport();
            });
        });
    });

}());
