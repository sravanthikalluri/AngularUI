/**
 * Created by ganesh on 10/20/2015.
 */
describe('Custom Iframe Directive Testing', function () {
    var $scope, $compile,element;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $scope = $injector.get('$rootScope').$new();
            $compile = $injector.get('$compile');
            $sce = $injector.get('$sce');
        });

        var inputURL = 'http://google.co.in';
        $scope.scrolling = true;
        $scope.customId = 'ciframe';

        $scope.url = $sce.trustAsResourceUrl(inputURL);
    });

    it('instance creation of custom iframe, compilation and digesting scope', function () {

        element = angular.element('<custom-iframe scrolling="true" url=' + $scope.url + '></custom-iframe>');
        $compile(element)($scope); // Compile the directive
        $scope.$digest(); // Update the HTML
    });

});