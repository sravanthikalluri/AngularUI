/**
 * Created by jaya krishna on 11/2/2015.
 */
describe('Only Digits Directive Testing', function () {
    var $scope;
    var digitsForm;
    var element;

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element(
            '<form name="digitsForm">' +
            '<input ng-model="taxWithHoldingData.onlyDigits" name="state_range" only-digits/>' +
            '</form>'
        );

        $scope.taxWithHoldingData = {onlyDigits: null};
        $compile(element)($scope);
        digitsForm = $scope.digitsForm;

    }));

    describe('integer', function () {

        it('should change string to integer', function () {
            digitsForm.state_range.$setViewValue('1217');
            $scope.$digest();
            expect($scope.taxWithHoldingData.onlyDigits).toEqual('1217');
        });

        it('should change the string to empty', function () {
            digitsForm.state_range.$setViewValue('a');
            $scope.$digest();
            expect($scope.taxWithHoldingData.onlyDigits).toEqual('');
        });

        it('should change the string to number', function () {
            digitsForm.state_range.$setViewValue('a234234');
            $scope.$digest();
            expect($scope.taxWithHoldingData.onlyDigits).toEqual('234234');
        });

    });
});
