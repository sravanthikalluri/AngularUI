/**
 * Created by Jayakrishna on 1/5/2016.
 */
describe('Submit Validation Directive Testing ', function () {
    var rootScope,
        scope,
        compile,
        element,
        form,
        compiled;

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        form = scope.form || {};
        compile = $injector.get('$compile');
        $injector.get('$parse');

        scope.condition = true;
        scope.msg = 'message';
    }));

    function getCompiledElement(template) {
        var compiledDirective = compile(angular.element(template))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('link function testing for submit-validation ', function () {
        var ele = '<form name="form_name" valid-submit="sendForm()"><input type="text" name="name" ng-required="true" /> </form>'
        expect(function () {
            getCompiledElement(ele);
        }).not.toThrow();
    });

    it('submit event handler testing ', function () {
        element = angular.element('<form name="form_name" valid-submit="sendForm()"><input type="text" name="name" class="ng-invalid" ng-required="true" format-on="submit"/> <input type="text" name="last_name" class="ng-invalid" ng-required="true" format-on="submit"/> </form>');
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('submit');
    });

    it('submit event handler else case testing ', function () {
        form.$valid = false;
        element = angular.element('<form name="myForm" valid-submit="sendForm()"><input type="text" name="name" value="firstName" class="ng-invalid" ng-required="false" format-on="submit"/> <input type="text" name="last_name" value="" class="ng-invalid" ng-required="false" format-on="submit"/> <input name="ccNumber" ng-model="ccNumber" value="33"><span ng-show="myForm.ccNumber.$error.minLength">A cc number should be minimum 10 chars</span></form>');
        compiled = compile(element)(rootScope);
        scope.myForm.ccNumber.$setValidity("minLength",false);
        compiled.triggerHandler('submit');
    });

    it('focus event handler testing ', function () {
        element = angular.element('<form name="form_name" valid-submit="sendForm()"><input type="text" name="name" class="ng-invalid" ng-required="true" format-on="focus"/> </form>');
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('focus');
    });

    it('click event handler testing ', function () {
        element = angular.element('<form name="form_name" valid-submit="sendForm()"><input type="text" name="name" class="ng-invalid" ng-required="true" format-on="click"/> </form>');
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('click');
    });
});
