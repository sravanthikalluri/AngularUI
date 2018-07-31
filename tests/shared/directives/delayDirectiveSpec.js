/**
 * Created by Jayakrishna on 1/4/2016.
 */
describe('Delay Directive Testing', function () {
    var rootScope,
        scope,
        compile,
        directiveElem,
        $timeout;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            rootScope = $injector.get('$rootScope');
            scope = rootScope.$new();
            compile = $injector.get('$compile');
            $timeout = $injector.get('$timeout');

        });
        scope.delayedModel = 'krishna';
        scope.delayedModel1 = 'krishna';
        directiveElem = getCompiledElement();

    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<div delayed-model="delayedModel">'))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('delayedModel on isolated scope should be two-way bound', function () {

        scope.delayedModel = 'jayakrishna';

        expect(scope.delayedModel).toEqual('jayakrishna');

    });

    it('$timeout function testing ', function () {
        $timeout.flush();
        $timeout.verifyNoPendingTasks();
    });

    it('model watch function testing ', function () {
        scope.delayedModel = 'jk';
        var compiledDirective = compile(angular.element('<div delayed-model="delayedModel">'))(scope);
//        compiledDirective.scope().$apply();
    });


});
