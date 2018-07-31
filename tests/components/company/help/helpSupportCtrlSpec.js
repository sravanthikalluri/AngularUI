/**
 * Created by ganesh on 10/28/2015.
 */
(function () {

    "use strict";

    describe('Help Support Controller Testing', function () {

        var $rootScope,
            $scope,
            $routeParams;


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $routeParams = $injector.get('$routeParams');
                $injector.get('$controller')('helpSupportCtrl', {$scope: $scope,$routeParams: {selectedTab: 'employee'}});
                $injector.get('appConfig');

            });

            $routeParams = {selectedTab: 'employee'};

            toggleSelectTab($routeParams, $scope);

        });

        it('selectedTab is equal to employee', function () {
            expect($scope.selectedTab).toEqual('employee')

        });

        it('selectedTab is equal to employee content', function () {

            $routeParams = {selectedTab: 'employee'};

            toggleSelectTab($routeParams, $scope);

            expect($scope.employee).toBeTruthy();
            expect($scope.hrfinance).toBeFalsy();


        });


        it('selectedTab is equal to hrfinance content', function () {

            $routeParams = {selectedTab: 'hrfinance'};

            toggleSelectTab($routeParams, $scope);


            expect($scope.employee).toBeFalsy();
            expect($scope.hrfinance).toBeTruthy();

        });

        describe('Test getSrc', function () {

            it('getSrc is defined', function () {
                expect($scope.getSrc).toBeDefined();
            });

            it('todayDateTimeStamp is defined', function () {
                expect($scope.todayDateTimeStamp).not.toBeDefined();
            });

            it('speakUrl is defined', function () {
                expect($scope.speakUrl).not.toBeDefined();
            });


            it('getSrc function testing', function () {
                var speakUrl = $scope.getSrc();
                expect($scope.todayDateTimeStamp).toBeDefined();
                expect($scope.speakUrl).toBeDefined();

                expect($scope.speakUrl).toEqual(speakUrl);


            });

        });


        describe('Test isSelected', function () {

            it('isSelected is defined', function () {
                expect($scope.isSelected).toBeDefined();
            });

            it('isSelected function testing', function () {

                expect($scope.isSelected(0)).toBeTruthy();
                expect($scope.isSelected(1)).toBeFalsy();

            });

        });

        describe('Test closePanel', function () {

            it('closePanel is defined', function () {
                expect($scope.closePanel).toBeDefined();
            });

            it('isSelected function testing', function () {

                expect($scope.hideDiv).toBeUndefined();

                $scope.closePanel();

                expect($scope.tab).toBe(0);
                expect($scope.hideDiv).toBeTruthy();
            });

        });

        describe('Test selectTab', function () {

            it('selectTab is defined', function () {
                expect($scope.selectTab).toBeDefined();
            });

            it('selectTab function testing', function () {

                var setTab = 1;
                expect($scope.tab).toBe(0);

                $scope.selectTab(setTab);

                expect($scope.tab).toBe(setTab);

            });

        });


    });

    function toggleSelectTab($routeParams, $scope) {
        $scope.selectedTab = $routeParams.selectedTab;

        if ($scope.selectedTab === "employee") {
            $scope.employee = true;
            $scope.hrfinance = false;
        } else if ($scope.selectedTab === "hrfinance") {
            $scope.employee = false;
            $scope.hrfinance = true;
        }
    }


}());