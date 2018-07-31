/*Created by ganesh on 10/27/2015.*/

(function () {

    "use strict";


    describe('Add Widget Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<add-widget></add-widget>';

        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
            });

            $scope.widget_length = 1;


        });

        it('Should contain panel-body class attribute ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var $main = el.find('div.panel-body');

            expect($main).toBeDefined();

        });

        afterEach(function () {
            $body.empty();
        });

    });


}());
