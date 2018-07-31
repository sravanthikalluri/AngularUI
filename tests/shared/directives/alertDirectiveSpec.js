/**
 * Created by ganesh on 10/20/2015.
 */
(function () {

    "use strict";


    describe('Alerting Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<alert-view></alert-view>';

        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
            });

        });


        it('should contain alert-warning class', function () {

            $scope.alert = [{
                type: 'warning',
                msg: 'Additional Payment Transaction(s) Data Not Available'
            }];


            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var $alert = $('.orange-alert');

            var h5Element = el.find('h5.no-marg');
            expect(h5Element).toBeDefined();
            expect($.trim(h5Element.text())).toEqual($.trim(h5Element.text()));

            var closeAlert = el.find('i.cross-mark');
            expect(closeAlert).toBeDefined();

            closeAlert.click();
            $scope.alert.splice(0, 1);
            $rootScope.$digest();
            expect($alert.is(":visible")).toBe(false);

        });

        it('should contain alert-danger class', function () {

            $scope.alert = [{
                type: 'danger',
                msg: 'Additional Payment Transaction(s) Data Not Available'
            }];


            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var $alert = $('.red-alert');

            var closeAlert = el.find('i.cross-mark');
            expect(closeAlert).toBeDefined();

            closeAlert.click();
            $scope.alert.splice(0, 1);
            $rootScope.$digest();
            expect($alert.is(":visible")).toBe(false);

        });


        it('should contain alert-success class', function () {

            $scope.alert = [{
                type: 'success',
                msg: 'Employee Info Successfully changed'
            }];

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            var $alert = $('.green-alert');

            var closeAlert = el.find('i.cross-mark');
            expect(closeAlert).toBeDefined();

            closeAlert.click();
            $scope.alert.splice(0, 1);
            $rootScope.$digest();
            expect($alert.is(":visible")).toBe(false);
        });


        afterEach(function () {
            $body.empty();
        });

    });


}());
