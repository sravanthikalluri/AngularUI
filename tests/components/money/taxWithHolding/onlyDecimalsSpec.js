/**
 * Created by jaya krishna on 11/2/2015.
 */
describe('Only Decimals Directive Testing', function () {
    var $scope;
    var decimalForm;
    var element;

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        element = angular.element(
            '<form name="decimalForm">' +
            '<input ng-model="taxWithHoldingData.onlyDecimals" name="state_range" only-decimals/>' +
            '</form>'
        );

        $scope.taxWithHoldingData = {onlyDecimals: null};
        $compile(element)($scope);
        decimalForm = $scope.decimalForm;

    }));

    describe('decimal', function () {

        it('should change string to integer', function () {
            decimalForm.state_range.$setViewValue('1217');
            $scope.$digest();
        });

        it('should change the string to empty', function () {
            decimalForm.state_range.$setViewValue('a');
            $scope.$digest();
        });

        it('should change the string to number', function () {
            decimalForm.state_range.$setViewValue('a234234');
            $scope.$digest();
        });

    });
});
