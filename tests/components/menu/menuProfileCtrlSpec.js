'use strict';

describe('Menu Profile Controller Testing', function () {
    var $rootScope,
        $scope;


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.navigations = {};
            $injector.get('$controller')('menuProfileCtrl', {$scope: $scope});
        });

    });


    describe('$on function testing',function(){
        it('$on function call with company',function(){
            $rootScope.$broadcast('navToggled', 'Company');
        });

        it('$on function call with employee',function(){
            $rootScope.$broadcast('navToggled', 'employee');
        });
    });

});

