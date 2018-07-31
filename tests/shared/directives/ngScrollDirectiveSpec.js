/**
 * Created by ganesh on 10/27/2015.
 */
(function () {

    "use strict";


    describe('Angular Scroll  Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<a id="toTop" scroll-to="policiesId"><span class="icon-icon_backtotop b2t"></span></a> ';

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                $injector.get('ScrollTo');
                $injector.get('ngScrollToOptions');

            });

        });

        it('Should contain toTop ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();
            expect(el.length).toEqual(1);
            expect(el.attr("id")).toEqual('toTop');

        });

        it('Scroll toTop Click Event', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            el.click();


        });


        afterEach(function () {
            $body.empty();


        });

    });


}());