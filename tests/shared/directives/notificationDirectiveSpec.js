/**
 * Created by ganesh on 10/23/2015.
 */
(function () {

    "use strict";


    describe('Notification Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            $httpBackend,
            simpleHTML = '<notification></notification>',
            myTasksData;


        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                $httpBackend = $injector.get('$httpBackend');
                $injector.get('appConfig');
            });


        });


        it('Should contain not-title ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.myTasksData = myTasksData;

            var notTitle = el.find('div.not-title');
            expect(notTitle.length).toEqual(0);
            expect(notTitle.is(":visible")).toBe(false);


        });

        it('Should contain no-notification', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.myTasksData = myTasksData;

            var noNotification = el.find('div.no-notification');
            expect(noNotification.length).toEqual(0);
            expect(noNotification.is(":visible")).toBe(false);


        });


        afterEach(function () {
            $body.empty();
            $httpBackend.verifyNoOutstandingExpectation();
        });

    });


}());