/**
 * Created by Jayakrishna on 1/4/2016.
 */
describe('Validation Directive Testing', function () {
    var rootScope,
        scope,
        compile,
        directiveElem,
        elem,
        controller;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector, $controller) {
            rootScope = $injector.get('$rootScope');
            scope = rootScope.$new();
            controller = $injector.get('$controller');
            compile = $injector.get('$compile');
            scope.condition = {
                prop: 'value'
            };
            scope.msg = true;
        });
        directiveElem = getCompiledElement();
    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<input type="text" name="name" class="ng-valid" ng-required="true" validation format-on="blur" /><p class="ng-show"><span class="ng-show"></span></p><span class="ng-show"></span>'))(scope);
        scope.$digest();
        return compiledDirective;
    };


    it('msg on isolated scope should be one-way bound', function () {
        var isolatedScope = directiveElem.isolateScope();

//        isolatedScope.msg = false;

        expect(scope.msg).toEqual(true);
    });

    it('change should be defined and function call testing ', function () {
        elem = angular.element('<input type="password" name="currentPassword" ng-model="passwordInfo.currentPassword" validation /><p class="ng-show"><span class="ng-show"></span></p><span class="ng-show"></span>');
        compile(elem)(rootScope.$new());
        rootScope.$digest();
        controller = elem.controller('validation');
        scope = elem.isolateScope() || elem.scope();
//        expect(scope.change).toBeDefined();
//        scope.change();
//        expect(scope.condition).toBeFalsy();
    });

    it('change should be defined and function call testing ', function () {
        elem = angular.element('<input type="password" name="currentPassword" ng-model="passwordInfo.currentPassword" validation /><p class="ng-show"><span class="ng-show"></span></p><span class="ng-show"></span>');
        compile(elem)(rootScope.$new());
        rootScope.$digest();
    });


    it('focus event handler testing ', function () {
        elem = angular.element('<input type="text" name="name" class="ng-invalid" ng-required="true" validation format-on="focus" /><p class="form"><span class="ng-hide"></span></p>');
        compiled = compile(elem)(rootScope.$new());
        rootScope.$digest();
        controller = elem.controller('validation');
        scope = elem.isolateScope() || elem.scope();
        compiled.triggerHandler('focus');
    });

    it('focus event handler else testing ', function () {
        elem = angular.element('<input type="text" name="name" class="ng-valid" ng-required="true" validation format-on="focus" /><p class="form"><span class="ng-hide"></span></p>');
        compiled = compile(elem)(rootScope.$new());
        rootScope.$digest();
        controller = elem.controller('validation');
        scope = elem.isolateScope() || elem.scope();
        compiled.triggerHandler('focus');
    });

    it('blur event handler testing ', function () {
        elem = angular.element('<input type="text" name="name" class="ng-valid" ng-required="true" validation format-on="blur" /><p class="ng-show"><span class="ng-show"></span></p>');
        compiled = compile(elem)(rootScope.$new());
        rootScope.$digest();
        controller = elem.controller('validation');
        scope = elem.isolateScope() || elem.scope();
        compiled.triggerHandler('blur');
    });

    it('blur event handler testing ', function () {
        elem = angular.element('<input type="text" name="name" class="ng-invalid" ng-required="true" validation format-on="blur" /><p class="ng-show"><span class="ng-show"></span></p>');
        compiled = compile(elem)(rootScope.$new());
        rootScope.$digest();
        controller = elem.controller('validation');
        scope = elem.isolateScope() || elem.scope();
        compiled.triggerHandler('blur');
    });

});
