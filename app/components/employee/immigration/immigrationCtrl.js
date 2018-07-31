'use strict';
trinetApp.controller('immigrationCtrl', ['$scope', 'gso', function ($scope, gso) {
    $scope.employeeName = $scope.headerName;
    $scope.initImmigrationProjects = function(){
        $scope.isLoading = true;
        // get cases
        gso.getInternationalApiService().execute(constants.get, '/projects?filter[status]=ready', null,
                function (response) {
                    $scope.isLoading = false;
                    $scope.allProjects = response.projects;
                    $scope.hasProjects = $scope.allProjects.length != 0;
                },
                function (data, status) {
                    $scope.hasProjects = false;
                    $scope.errorAlert = data;
                    $scope.isLoading = false;
                }
            );
        };
    $scope.hasProjects = true;
    $scope.initImmigrationProjects();

    $scope.goToImmigration = function () {
        gso.getInternationalApiService().goToImmigration();
    };
}]);
