describe('Confirm Password Directive Testing', function () {

    var element,
        scope,
        passwordForm,
        compiled,
        compile,
        rootScope,
        html = '<form name="passwordForm" id="password_form" novalidate><input name="newPassword" id="newPassword" ng-model="passwordInfo.newPassword" /><input name="confirmNewPassword" ng-model="passwordInfo.confirmNewPassword" pw-check="newPassword" /><div ng-show="passwordForm.$error"><span class="text-danger" ng-show="passwordForm.$error.passwordMatch">Passwords don\'t match.</span></div></form>';

    beforeEach(module('TrinetPassport'));

    beforeEach(inject(function ($rootScope, $compile, $injector) {
        scope = $rootScope;
        element = angular.element(html);
        rootScope = $injector.get('$rootScope');
        compile = $injector.get('$compile');
        $compile(element)(scope);
        scope.$digest();
        passwordForm = scope.passwordForm;
    }));

    it('should show the text from the album template', function () {
        expect(passwordForm.$valid).toBe(true);
        passwordForm.newPassword.$setViewValue('a');
    });

    it('formatter and add events of format with dynamic scope', function () {
        var html = '<form name="passwordForm" id="password_form" novalidate><input name="newPassword" id="newPassword" ng-model="passwordInfo.newPassword" format-on="keyup"/><input name="confirmNewPassword" ng-model="passwordInfo.confirmNewPassword" pw-check="newPassword" format-on="keyup"/><div ng-show="passwordForm.$error"><span class="text-danger" ng-show="passwordForm.$error.passwordMatch">Passwords don\'t match.</span></div></form>';
        element = angular.element(html);
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('keyup');
    });

    it('keyup event handler testing ', function () {
        element = angular.element('<div name="form_name" pw-check="idName" ng-model="name" value="password" format-on="keyup"></div>');
        compiled = compile(element)(rootScope);
        compiled.triggerHandler('keyup');
    });

});