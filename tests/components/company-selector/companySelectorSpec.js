/**
 * Created by jli on 06/15/2016
 */

describe('Company Selector Directive Testing', function () {
    var scope, compile, el, ctrl;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            scope = $injector.get('$rootScope').$new();
            compile = $injector.get('$compile');
        });
    });

    // TODO: need to implement mocked service 

    // it('should load the html template', function () {
    //     el = getCompiledElement(scope, '<tn-company-selector></tn-company-selector>');
    //     console.log('el: ' + el);
    //     var menu = el.find('.tn-company-selector');

    //     expect(menu).toBeDefined();
    // });


    // it('should pass the "companies" attribute', function() {
    //     var template = '\
    //         <tn-company-selector></tn-company-selector>\
    //     ';
    //     el = getCompiledElement(scope, template);
    //     ctrl = el.controller("tnCompanySelector");
    //     scope = el.isolateScope() || el.scope();

    //     expect(scope.companies).toBeDefined();
    // });


    function getCompiledElement(scope, elementSource) {
        var compiledElement = compile(elementSource)(scope);
        scope.$digest();
        return compiledElement;
    }

});
