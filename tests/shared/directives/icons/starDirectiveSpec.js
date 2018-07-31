/**
 * Created by ganesh on 10/18/2015.
 */
(function () {

    "use strict";


    describe('Star Directive Testing', function () {
        var scope, compile, directiveElem;


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                scope = $injector.get('$rootScope').$new();
                compile = $injector.get('$compile');
            });


        });


        it('star should display false after element is clicked', function () {
            var element = '<button-star star="star"></button-star>';
            scope.star = true;
            directiveElem = getCompiledElement(scope, element);


            directiveElem.click();
//            expect(directiveElem.isolateScope().star).toEqual(false);
        });

        it('star should display true after element is clicked', function () {
            var element = '<button-star star="star"></button-star>';
            scope.star = false;
            directiveElem = getCompiledElement(scope, element);

            directiveElem.click();
//            expect(directiveElem.isolateScope().star).toEqual(true);
        });


        function getCompiledElement(scope, elementSource) {
            var element = angular.element(elementSource);
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

    });

}());