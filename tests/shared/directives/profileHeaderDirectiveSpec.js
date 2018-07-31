/**
 * Created by ganesh on 10/23/2015.
 */
(function () {

    "use strict";


    describe('Profile Header Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = "<profile-header userImage='userImage' monogram='monogram'  designation='appConfig.designation' headerAddress='headerAddress' headerEmail='headerEmail' headerPhno='headerPhno' userImageExist = 'userImageExist()'></profile-header>";


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');

            });

            $scope.userImage = null;
            $scope.monogram = 'Test';
            $scope.designation = 'Sr. Director';
            $scope.headerAddress = '';
            $scope.headerPhno = '';
            $scope.headerEmail = '';


        });


        it('Should contain not-title ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


        });


        afterEach(function () {
            $body.empty();

        });

    });


}());