/**
 * Created by SEEMA on 10/12/2015.
 */

(function () {

    "use strict";

    describe('i18n Controller Testing', function () {

        var $rootScope,
            $scope,
            $controller,
            $location;

        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $location = $injector.get('$location');
                $injector.get('$controller')('i18nController', {
                    $scope: $scope,
                    $location: $location
                });
                $injector.get('translationService');
            });


            $scope.selectedLanguage = navigator.userLanguage || navigator.language;


            $scope.translate();


        });


        describe('selectedLanguage testing', function () {

            it('selectedLanguage is defined', function () {
                expect($scope.selectedLanguage).toBeDefined();
            });

            it('selectedLanguage is equal to language', function () {
                expect($scope.selectedLanguage).toEqual(navigator.userLanguage || navigator.language);
            });

        });

        describe('currentTime testing', function () {

            it('currentTime is defined', function () {
                expect($scope.currentTime).toBeDefined();
            });


        });


        describe('translate testing', function () {

            it('translate is defined', function () {
                expect($scope.translate).toBeDefined();
            });


        });


        describe('preferece  Object and keys are defined', function () {

            it('preferece is defined', function () {
                expect($scope.preferece).toBeDefined();
                expect($scope.preferece.topWindow).toBeDefined();
            });
        });


        describe('should be falsy for /#', function () {
            beforeEach(function () {

                inject(function ($injector) {
                    spyOn($location, 'path').andCallFake(function () {
                        return "/#";
                    });
                    $controller = $injector.get('$controller')('i18nController', {
                        $scope: $scope,
                        $location: $location
                    });

                });
            });
            it('should be falsy for root ', function () {
                expect($scope.preferece.topWindow).toBeFalsy();

            });
        });

        describe('should be falsy only for random urls', function () {
            beforeEach(function () {

                inject(function ($injector) {
                    spyOn($location, 'path').andCallFake(function () {
                        return "#/something/somethingelse/ssowidget";
                    });
                    $controller = $injector.get('$controller')('i18nController', {
                        $scope: $scope,
                        $location: $location
                    });

                });
            });
            it('should be falsy for random urls ', function () {
                expect($scope.preferece.topWindow).toBeFalsy();

            });

        });

        describe('should be true only for ssoWidget requests', function () {

            beforeEach(function () {

                inject(function ($injector) {
                    spyOn($location, 'path').andCallFake(function () {
                        return "/ssowidget/ta_PAS_001";
                    });
                    $controller = $injector.get('$controller')('i18nController', {
                        $scope: $scope,
                        $location: $location
                    });

                });
            });

            it('should be truthy for ssoWidget url ', function () {
                expect($scope.preferece.topWindow).toBeTruthy();

            });

        });
    });


}());