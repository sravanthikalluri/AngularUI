/**
 * Created by npamala on 10/14/2015.
 */

describe('Company Routes Testing', function () {
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

    it('should navigate to organization chart', function () {

        $httpBackend.when('GET', 'app/components/company/orgChart/orgChartView.html').respond('/organizationalChart');

        $rootScope.$apply(function () {
            $location.path('/organizationalChart');
        });
        expect($location.path()).toBe('/organizationalChart');
        expect($route.current.templateUrl).toBe('app/components/company/orgChart/orgChartView.html');
        expect($route.current.controller).toBe('orgChartViewCtrl');
    });




    it('should navigate to organization chart view with selected tab', function () {

        $httpBackend.when('GET', 'app/components/company/orgChart/orgChartView.html').respond('/organizationalChart/:selectedTab?');

        $rootScope.$apply(function () {
            $location.path('/organizationalChart/:selectedTab?');
        });
        expect($location.path()).toBe('/organizationalChart/:selectedTab?');
        expect($route.current.templateUrl).toBe('app/components/company/orgChart/orgChartView.html');
        expect($route.current.controller).toBe('orgChartViewCtrl');
    });

    it('should navigate to organization chart view with selected tab, employee id and status', function () {

        $httpBackend.when('GET', 'app/components/company/orgChart/orgChartView.html').respond('/organizationalChart/:selectedTab/:empId/:status');

        $rootScope.$apply(function () {
            $location.path('/organizationalChart/:selectedTab/:empId/:status');
        });
        expect($location.path()).toBe('/organizationalChart/:selectedTab/:empId/:status');
        expect($route.current.templateUrl).toBe('app/components/company/orgChart/orgChartView.html');
        expect($route.current.controller).toBe('orgChartViewCtrl');
    });
});
