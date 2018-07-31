describe('Next Pay Day Directive Testing', function () {
    var rootScope,
        scope,
        compile,
        directiveElem,
        elem;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            rootScope = $injector.get('$rootScope');
            scope = rootScope.$new();
            compile = $injector.get('$compile');
        });
        directiveElem = getCompiledElement();
    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<next-pay-day-widget></next-pay-day-widget>'))(scope);
        scope.$digest();
        return compiledDirective;
    };


    it('no records found element using in html testing ', function () {
        elem = angular.element('<next-pay-day-widget></next-pay-day-widget>');
        compile(elem)(rootScope.$new());
        rootScope.$digest();
    });
});
