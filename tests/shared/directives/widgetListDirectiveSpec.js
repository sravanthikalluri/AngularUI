/*
 Created by ganesh on 10/27/2015.
 */

(function () {

    "use strict";


    describe('Widget List Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<widget-list></widget-list>';

        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
            });

            $scope.header = "Test",
                $scope.panel_content = 'Sample Content';


        });

        it('Should contain panel-body class attribute ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var $main = el.find('div.panel-body');

            expect($main.text()).toEqual($scope.panel_content);

        });

        it('Should contain panel-title class attribute ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var $main = el.find('h4.panel-title');
            expect($main.text()).toEqual($scope.header);

        });


        afterEach(function () {
            $body.empty();
        });

    });


}());
