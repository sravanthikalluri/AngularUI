//HRSecurity pop up controller
trinetApp.controller('securityModelViewCtrl', ['$scope', 'gso','SharedDataService',
    function ($scope, gso,SharedDataService) {

        //to close the panel
        $scope.closePanel = function () {
            gso.getNGDialog().closeAll();
        };

        $scope.filtered = [];
        //Function to retrieve the Search tags
        $scope.searchEmployee = function (searchQuery) {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.org + "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId +
                companyUrlConfig.resources.orgChart + "?name=" + searchQuery, null,
                function (response) {
                    $scope.toggleLoading = false;
                    $scope.employeeData = [];
                    $scope.employeeData = response.data;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            return $scope.employeeData;
        };
        //Function to save the Seached Data
        $scope.saveHrsecurity = function (hrSecurity) {
            $scope.filteredarray = [];
            angular.forEach(hrSecurity, function (item) {
                $scope.filteredarray.push(item.employeeId);
            });
            $scope.assignRoleObject = {
                "employeeIds": $scope.filteredarray,
                "role": "HRSECURITY"
            };
            gso.getCrudService().execute(constants.post, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + manageEmpUrlConfig.resources.employeeRoles, $scope.assignRoleObject,
                function (response) {
                    $scope.errorAlert = response;
                    $scope.closePanel();
                    SharedDataService.getAppSharedData().sMessage=JSON.stringify(response);
                    gso.getRoute().reload();
                },
                function (data) {
                    $scope.errorAlert = data;
                    $scope.closePanel();
                    gso.getRoute().reload();

                }
            );

        };
    }]);
