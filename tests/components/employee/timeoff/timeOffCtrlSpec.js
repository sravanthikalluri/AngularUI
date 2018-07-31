/**
 * Created by jaya krishna on 10/27/2015.
 */
describe('Time off Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var $routeParams;
    var date = new Date();

    var timeoffResponse = {
        data: {
            "timeoffHistoryList": [
                {
                    "planTypeDesc": "Sick",
                    "accrualList": [
                        {
                            "accrualDate": "2015-10-09",
                            "carryoverHrs": "0.00",
                            "serviceHrsTotal": "5,480.00",
                            "serviceHrsPeriod": "88.00",
                            "hrsEarnedYTD": "80.00",
                            "hrsEarnedPeriod": "0.00",
                            "hrsTakenPeriod": "0.00",
                            "hrsAdjustedPeriod": "0.00",
                            "balanceHrs": "32.00",
                            "hrsTakenYTD": "48.00",
                            "hrsAdjustedYTD": "0.00"
                        }
                    ]
                }

            ]
        }

    };

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('timeOffCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'timeoff'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $routeParams = $injector.get('$routeParams');
        });

        $routeParams.selectedTab === 'timeoff'
        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.timeOff + '/' + appConfig.companyId + '/' + $scope.appUserId + "/timeoff-history").respond(200, timeoffResponse);

        $httpBackend.flush();


    });

    describe('selectTab function testing ', function () {
        it('selectTab is defined ', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call with out a parameter ', function () {
            $scope.selectTab();
            expect($scope.tabValue).not.toBeDefined();
        });

        it('selectTab function call with a parameter ', function () {
            var setTab = 0;
            $scope.selectTab(setTab);
            expect($scope.tabValue).toBe(setTab);
        });
    });

});
