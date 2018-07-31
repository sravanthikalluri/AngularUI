'use strict';

describe('Menu Controller Testing', function () {
    var $rootScope,
        $scope;


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.navigations = {};
            $injector.get('$controller')('menuCtrl', {$scope: $scope});
        });

        localStorage.setItem("navigationsSide",null);
    });

    describe('selectMainMenu function testing',function(){
        it('selectMainMenu is defined',function(){
            expect($scope.selectMainMenu).toBeDefined();
        });

        it('selectMainMenu function call',function(){
            var menuId = "123";
            $scope.selectMainMenu(menuId);
        });

        it('selectMainMenu function call',function(){
            var menuId;
            $scope.navigations = {"side":"left"};
            $scope.selectMainMenu(menuId);
        });
    });

    describe('toggleNav function testing',function(){
        it('toggleNav is defined',function(){
            expect($scope.toggleNav).toBeDefined();
        });

        it('toggleNav function call',function(){
            var menuName = "profile";
            var menuIndex = "81";
            $scope.toggleNav(menuName,menuIndex);
        });
    });

    describe('setMyselfOrCompany function testing',function(){
        it('setMyselfOrCompany is defined',function(){
            expect($scope.setMyselfOrCompany).toBeDefined();
        });

        it('setMyselfOrCompany function call',function(){
            var myselfOrCompany = "Company";
            $scope.setMyselfOrCompany(myselfOrCompany);
        });
    });

    describe('$on function testing',function(){
        it('$on function call with company',function(){
            $rootScope.$broadcast('toggleAdminView', 'Company');
        });

        it('$on function call with employee',function(){
            $rootScope.$broadcast('toggleAdminView', 'employee');
        });
    });
});

