/**
 * Created by ganesh on 10/23/2015.
 */

(function () {

    "use strict";


    describe('Phone Directive Testing', function () {
        var $scope, userForm, element, ngModelCtrl;
        beforeEach(module('TrinetPassport'));
        beforeEach(inject(function ($compile, $rootScope, $controller) {
            $scope = $rootScope;
            ngModelCtrl = $controller;
            element = angular.element(
                '<form name="userForm">' +
                '<input ng-model="contact.telephoneNumber" name="telephoneNo" phone-input/>' +
                '</form>'
            );
            $scope.contact = {telephoneNumber: null}
            $compile(element)($scope);
            userForm = $scope.userForm;
        }));

        describe('integer', function () {
            it('should pass with integer', function () {
                userForm.telephoneNo.$setViewValue('3');
                $scope.$digest();
                expect($scope.contact.telephoneNumber).toEqual('3');
            });
            it('should change the string to empty', function () {
                userForm.telephoneNo.$setViewValue('a');
                $scope.$digest();
                expect($scope.contact.telephoneNumber).toEqual('');
            });
        });

        describe('Test change event', function () {
            it('should change event', function () {

                var ngModelController = element.find('input').controller('ngModel');
                ngModelController.$setViewValue('test');

                ngModelController.$render();

                element.find('input').triggerHandler('change');

                expect(element.find('input').val()).toEqual('')

            });


            it('should keydown event', function () {

                var ngModelController = element.find('input').controller('ngModel');
                ngModelController.$setViewValue('test');

                element.find('input').triggerHandler('keydown');

                expect(element.find('input').val()).toEqual('')
            });


            it('should keydown event keyCode 91', function () {

                var ngModelController = element.find('input').controller('ngModel');
                ngModelController.$setViewValue('test');

                var ev = jQuery.Event("keydown", {
                    keyCode: 91
                });


                element.find('input').trigger(ev);

                expect(element.find('input').val()).toEqual('')
            });


            it('should paste event', function () {

                var ngModelController = element.find('input').controller('ngModel');
                ngModelController.$setViewValue('test');

                element.find('input').triggerHandler('paste');
                expect(element.find('input').val()).toEqual('')


            });

            it('should cut event', function () {

                var ngModelController = element.find('input').controller('ngModel');
                ngModelController.$setViewValue('test');

                element.find('input').triggerHandler('cut');

                expect(element.find('input').val()).toEqual('')


            });


        });

    });

}());