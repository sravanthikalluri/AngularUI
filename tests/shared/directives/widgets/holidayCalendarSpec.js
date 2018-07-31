describe('Holiday Calender Widget Directive Testing', function () {
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
        var compiledDirective = compile(angular.element('<holiday-calendar-widget></holiday-calendar-widget>'))(scope);
        scope.$digest();
        return compiledDirective;
    };


    it('holiday calendar widget element using in html testing ', function () {
        elem = angular.element('<holiday-calendar-widget></holiday-calendar-widget>');
        compile(elem)(rootScope.$new());
        rootScope.$digest();
    });
});
