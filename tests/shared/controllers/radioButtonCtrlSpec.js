/**
 * Created by SEEMA on 10/12/2015.
 */
describe('Radio Button Controller Testing', function () {

    var $rootScope,
        $scope;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('radioButtonCtrl', {$scope: $scope});
        });
    });


    it('checked is defined', function () {

        expect($scope.checked()).toBeDefined();
    });

    it('checked is equal to $scope.model', function () {

        expect($scope.value).toEqual($scope.model);
    });


});