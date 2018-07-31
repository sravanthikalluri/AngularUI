/**
 * Created by ganesh on 10/26/2015.
 */
(function () {

    "use strict";


    describe('Print  Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            element,
            compiled,
            $rootScope,
            printElement = '<span id="printElementIdName">Print Section</span>',
            simpleHTML = '<button id="overPrint" class="print pull-right" ng-print print-element-id="@Model.benefitsoverview" value="Print"><span class="icon-icon_print_circle"></span>print</button>';


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');


            });

        });

        it('Should contain overPrint ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            expect($(el).attr('id')).toEqual('overPrint');
            expect($(el).hasClass('print')).toBe(true);


        });

        it('formatter and blur events of format with dynamic scope', function () {
            element = angular.element('<button ng-print-on="click" id="overPrint" class="print pull-right" ng-print print-element-id="@Model.accordion" value="Print"><span class="icon-icon_print_circle"></span>print</button>');
            compiled = $compile(element)($rootScope);
            window.onafterprint();
        });

        it('click event handler testing ', function () {
            element = angular.element('<div name="form_name" ng-print print-element-id="printElementIdName" format-on="click"></div>');
            compiled = $compile(element)($rootScope);
            el = $compile(printElement)($scope);
            $body.append(el);
            $rootScope.$digest();
            compiled.triggerHandler('click');
        });

        afterEach(function () {
            $body.empty();


        });

    });


}());