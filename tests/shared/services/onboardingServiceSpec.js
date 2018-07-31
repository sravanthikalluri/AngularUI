(function () {
    "use strict";
    describe('Onboarding Service Testing', function () {
        var onboardingService;
        var fakeWindow;
        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                onboardingService = $injector.get('onboardingService');
                fakeWindow = $injector.get('$window');
            });

        });


        it('Onboarding Service is defined', function () {
            expect(onboardingService).toBeDefined();
        });

        describe('onboardingService goToOnboarding testing', function () {
            it('goToOnboarding is defined ', function () {
                expect(onboardingService.goToOnboarding).toBeDefined();
            });
            it('goToOnboarding opens a new window', function() {
                spyOn(fakeWindow, 'open').andCallFake(function (something) {
                    return true;
                });
                onboardingService.goToOnboarding("test");
                expect(fakeWindow.open).toHaveBeenCalled();
                expect(fakeWindow.open).toHaveBeenCalledWith("/ui-onboarding-newhire/#/employee/test");
            });
        });
    });

})();