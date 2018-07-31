/**
 * Created by ganesh on 10/20/2015.
 */
(function () {

    "use strict";


    describe('Hyper Link Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<links-list summaryData="summaryData" ng-click="selectLink($index)"></links-list>',
            summaryData = {
                "id": "1",
                "heading": "Benefit Program Description ",
                "apply": "",
                "label": "View a summary of all plans ",
                "sideLabel": "(available to your company with pay frequency weekly)",
                "path": "executiveSOAPWeekly",
                "key": "W",
                "type": "soap"
            };


        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
            });

            $scope.$index = 0;
            $scope.summaryData = summaryData;

        });

        it('should contain list-title-adjustment in paragraph tag and check heading text', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var $p = el.find('p.list-title-adjustment');

            expect($p.length).toEqual(0);
            expect($p.text()).not.toBeNull();

        });


        it('should contain summary id and check the text of anchor and span tags', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var $summary = $('#summary' + $scope.$index);

            expect($summary.length).toEqual(1);
            expect($summary.is(":visible")).toBe(true);
            expect($summary.text()).toEqual(summaryData.label);
            expect($summary.attr('href')).not.toBeNull();


            var $span = el.find('span.trinet-grey');

            expect($span.length).toEqual(1);

        });


        afterEach(function () {
            $body.empty();
        });

    });


}());
