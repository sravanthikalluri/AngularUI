/**
 * Created by ganesh on 10/19/2015.
 */
(function () {

    "use strict";


    describe('Testing Shared Translation Service', function () {
        var $rootScope,
            $scope,
            translationService;


        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                translationService = $injector.get('translationService');
                $injector.get('$controller')('i18nController', {$scope: $scope});
               $injector.get('$httpBackend');
            });


        });


        it('Translation Service must be defined', function () {
            expect(translationService).toBeDefined();
        });


        describe('translationService getTranslation testing', function () {

            it('Should be getTranslation defined', function () {
                expect(translationService.getTranslation).toBeDefined();
            });

        });


    });

})();