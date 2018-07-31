'use strict';

trinetApp.controller('openEnrollmentStatsCtrl', ['$scope','gso',function ($scope, gso) {
    $scope.currentYear = new Date().getFullYear();

    $scope.currentBenefits = gso.getCrudService().execute(constants.get,
        benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/oe-stats',
        null,
        function (response) {
            $scope.openEnrollmentStatusItems = response;
            $scope.submittedDetails = response.submittedDetails;
            $scope.notSubmittedDetails = response.notSubmittedDetails;
            $scope.notLoggedInDetails = response.notLoggedInDetails;
            $scope.eligibleCount = response.eligibleCount;
            $scope.submissionsCount = response.submissionsCount;
            $scope.loggedInCount = response.loggedInCount;
        },
        function (data) {
            $scope.errorAlert = data;
        }
    );

}]);


