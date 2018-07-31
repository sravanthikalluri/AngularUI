/**
 * Created by Raghavendra on 10/14/2015.
 */
describe('Profile Routes Testing', function () {
    var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');


        });
    });

    it('should navigate to /profile/company/:empId', function () {

        $httpBackend.when('GET', 'app/components/profile/profileLandingPage.html')
            .respond('/profile/company/:empId');


        // navigate using $apply to safely run the $digest cycle
        $rootScope.$apply(function () {
            $location.path('/profile/company/:empId');
        });
        expect($location.path()).toBe('/profile/company/:empId');
        expect($route.current.templateUrl).toBe('app/components/profile/profileLandingPage.html');
        expect($route.current.controller).toBe('profileLandingPageCtrl');
    });
});
