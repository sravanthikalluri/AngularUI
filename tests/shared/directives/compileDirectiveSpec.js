/**
 * Created by Jayakrishna on 3/11/2016.
 */
describe('Compile Directive Testing', function () {
    var rootScope,
        scope,
        compile,
        directiveElem;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            rootScope = $injector.get('$rootScope');
            scope = rootScope.$new();
            compile = $injector.get('$compile');

        });
        scope.sampleText = 'normalText';
        scope.message = '<p ng-model="sampleText"></p>';
        directiveElem = getCompiledElement();

    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<div compile="message">'))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('model watch function testing ', function () {
        scope.message = 'jk';
        var compiledDirective = compile(angular.element('<div delayed-model="delayedModel">'))(scope);
//        compiledDirective.scope().$apply();
    });

});
