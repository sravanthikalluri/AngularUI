/**
 * Created by Jayakrishna on 1/5/2016.
 */
describe('Currency Format Directive Testing ', function () {
    var rootScope,
        scope,
        compile,
        element,
        compiled;

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        compile = $injector.get('$compile');
        $injector.get('$filter');

        scope.sample = 123;
    }));

    function getCompiledElement(template) {
        var compiledDirective = compile(angular.element(template))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('should work if ngModel is not specified', function () {
        expect(function () {
            getCompiledElement('<input type="text" format="currency" />');
        }).not.toThrow();
    });

    it('should fail if ng-model is specified', function () {
        expect(function () {
            getCompiledElement('<input type="text" format="currency" ng-model="234" />');
        }).toThrow();
    });

    it('formatter and blur events of format with dynamic scope', function () {
        element = angular.element("<input type='text' format='currency' ng-model='sample' format-on='blur' />");
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('blur');
    });
});
