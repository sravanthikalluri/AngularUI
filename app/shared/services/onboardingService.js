(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name TrinetPassport.onboardingService
     */
    trinetApp.service('onboardingService', ['$window', '$location', OnboardingService]);

    // Function opens a new tab and goes to onboarding and sends an event to google analytics
    function OnboardingService($window, $location) {

        this.goToEmployeeOnboarding = function (companyId, id) {
            $window.open(onboardingUrlConfig.uiOnboarding + companyId + "/stgid/" + id);
        };

        this.goToOnboarding = function (companyId, option) {
            var onboardingParam = "";
            switch (option) {
                case "k1":
                    onboardingParam = "K1"
                    break;
                case "newHire":
                    onboardingParam = "WSE";
                    break;
                case "trustedAdvisor":
                    onboardingParam = "TA";
                    break;
            }
            $window.open(onboardingUrlConfig.uiOnboarding + companyId + "/" + onboardingParam);
            // $window.ga('send', 'event', 'Onboarding', 'from GreenStack');
        };
    }

})();
