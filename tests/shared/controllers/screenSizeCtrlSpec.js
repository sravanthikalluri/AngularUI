/*
 Created by Naveen Pamala
 */
describe('Screen size Controller Testing', function () {

    var $rootScope,
        $scope;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('screenSizeCtrl', {
                $scope: $scope
            });
            $injector.get('$window');
        });
    });

    describe('getWindowDimensions function testing ', function () {
        it('getWindowDimensions is defined ', function () {
            expect($scope.getWindowDimensions).toBeDefined();
        });

        it('getWindowDimensions funciton call ', function () {
            $scope.getWindowDimensions();
        });
    });
});