/**
 * Created by npamala on 10/14/2015.
 */

describe('Manage Employee Routes Testing', function () {
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

    it('should navigate to manageEmployee', function () {

        $httpBackend.when('GET', 'app/components/employee/manageEmployeeView.html').respond('/manageEmployee');

        $rootScope.$apply(function () {
            $location.path('/manageEmployee');
        });
        expect($location.path()).toBe('/manageEmployee');
        expect($route.current.templateUrl).toBe('app/components/employee/manageEmployeeView.html');
        expect($route.current.controller).toBe('manageEmployeeCtrl');
    });

    it('should navigate to managerforms', function () {

        $httpBackend.when('GET', 'app/components/employee/managerforms/managerFormsView.html').respond('/managerforms');

        $rootScope.$apply(function () {
            $location.path('/managerforms');
        });
        expect($location.path()).toBe('/managerforms');
        expect($route.current.templateUrl).toBe('app/components/employee/managerforms/managerFormsView.html');
    });

    it('should navigate to reports', function () {

        $httpBackend.when('GET', 'app/components/employee/reports/reportsView.html').respond('/reports');

        $rootScope.$apply(function () {
            $location.path('/reports');
        });
        expect($location.path()).toBe('/reports');
        expect($route.current.templateUrl).toBe('app/components/employee/reports/reportsView.html');
        expect($route.current.controller).toBe('reportsCtrl');
    });


    it('should navigate to manageGroups', function () {

        $httpBackend.when('GET', 'app/components/employee/manageGroups/manageGroupsView.html').respond('/manageGroups');

        $rootScope.$apply(function () {
            $location.path('/manageGroups');
        });
        expect($location.path()).toBe('/manageGroups');
        expect($route.current.templateUrl).toBe('app/components/employee/manageGroups/manageGroupsView.html');
        expect($route.current.controller).toBe('manageGroupsCtrl');
    });

    it('should navigate to createGroupChangeView', function () {

        $httpBackend.when('GET', 'app/components/employee/manageGroups/createGroupChangeView.html').respond('/createGroupChangeView');

        $rootScope.$apply(function () {
            $location.path('/createGroupChangeView');
        });
        expect($location.path()).toBe('/createGroupChangeView');
        expect($route.current.templateUrl).toBe('app/components/employee/manageGroups/createGroupChangeView.html');
        expect($route.current.controller).toBe('manageGroupsCtrl');
    });




});
