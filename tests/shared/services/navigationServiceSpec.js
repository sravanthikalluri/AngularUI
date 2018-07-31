
(function () {

    "use strict";


    describe('Navigation Service Testing', function () {
        var navigationService;

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                navigationService = $injector.get('navigationService');

            });

        });


        it('Navigation Service is defined', function () {
            expect(navigationService).toBeDefined();
        });


        describe('navigationService selectSection testing', function () {

            it('selectSection is defined ', function () {
                expect(navigationService.selectSection).toBeDefined();
            });

            it('selectSection is called',function(){
                var section = 'section';
                navigationService.selectSection(section);
            });

        });

        describe('navigationService toggleSelectSection testing', function () {

            it('toggleSelectSection is defined', function () {
                expect(navigationService.toggleSelectSection).toBeDefined();
            });

            it('toggleSelectSection function is called', function () {
                var section = 'section';
                navigationService.toggleSelectSection(section);
            });

        });

        describe('navigationService isSectionSelected testing', function () {

            it('isSectionSelected is defined', function () {
                expect(navigationService.isSectionSelected).toBeDefined();
            });

            it('isSectionSelected function is called', function () {
                var section = 'section';
                navigationService.isSectionSelected(section);
            });

        });

        describe('navigationService selectPage testing', function () {

            it('selectPage is defined', function () {
                expect(navigationService.selectPage).toBeDefined();
            });

            it('selectPage function is called', function () {
                var section = 'section';
                var page = 'page';
                navigationService.selectPage(section,page);
            });

        });

        describe('navigationService isPageSelected testing', function () {

            it('isPageSelected is defined', function () {
                expect(navigationService.isPageSelected).toBeDefined();
            });

            it('isPageSelected function is called', function () {
                var section = 'section';
                navigationService.isPageSelected(section);
            });

        });

    });

})();