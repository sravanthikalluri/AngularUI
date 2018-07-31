/**
 * Created by Jayakrishna on 12/02/2015.
 *//*


'use strict';
describe('Executive Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        utilService,
        $filter,
        response = {
            "data": {
                "planStartDate": "1999-12-31",
                "quarter": "Q4"
            },
            "_statusCode": "200",
            "_statusText": "OK"
        },
        response1 = {
            "data": {
                "planStartDate": "1999-12-31",
                "quarter": "Q4"
            },
            "_statusCode": "200",
            "_statusText": "OK"
        };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('executiveCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            utilService = $injector.get('utilService');
            appConfig = $injector.get('appConfig');
            $filter = $injector.get('$filter');
        });
        $scope.planType = "cop";
        $scope.planCode = "312";
        $scope.planKey = "S";

        var type = "custom";

        $scope.quarterStartDate = response.data.planStartDate;
        $scope.quarterFromDate = $filter('date')(new Date($scope.quarterStartDate).setYear(new Date().getFullYear()), constants.dateFormat);
        $scope.quarterToDate = $filter('date')(new Date($scope.quarterStartDate).setMonth(new Date($scope.quarterStartDate).getFullYear() + 3), constants.fullDateFormat);
        $scope.fromDate = utilService.filterDate($scope.quarterStartDate, constants.dateFormat);
        $scope.toDate = new Date().moveToLastDayOfMonth().toString(constants.dateFormat);

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            appConfig.companyId + '/' + appConfig.userId + '/' + 'policies?type=clientoptions').respond(200, response);

        $httpBackend.whenGET(benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan +
            '/' + appConfig.companyId + '/' + appConfig.userId + '/' + 'plan-details?type=' + type + '&benefitPlanId=' +
            $scope.planCode + '&payFrequency=' + $scope.planKey + '&startDate=' + $scope.fromDate + '&endDate=' + $scope.toDate).respond(200, response1);
        $httpBackend.flush();

    });

    it('if condition testing', function () {
        $scope.planCode = localStorage.getItem('planCode');
        $scope.planKey = localStorage.getItem('planKey');
        $scope.planType = localStorage.getItem('planType');
        var fun = function () {
            if ((angular.isDefined($scope.planCode) && $scope.planCode !== null) && (angular.isDefined($scope.planKey) && $scope.planKey !== null) && (angular.isDefined($scope.planType) && $scope.planType !== null)) {
                $scope.fetchData($scope.planCode, $scope.planKey, $scope.planType);
            }
        };
        fun();
        expect($scope.fetchData).toBeDefined();
    });


});
*/
