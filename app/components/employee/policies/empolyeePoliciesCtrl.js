/*
 Program Description / functionality:
 1) Fetch all employee Policies tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('employeePoliciesCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        /*Fetching  employee policy information */
        gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
            companyUrlConfig.resources.policy + "/" + gso.getAppConfig().companyId + "/" +
            gso.getAppConfig().userId + "/" + gso.getAppConfig().countryCode + "/" + gso.getAppConfig().stateCode + "/policies?type=employee", null,
            function (response) {
                $scope.getManagerRsources(response);
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        $scope.openManageResources =function(PoliciesDataObject)
        {
            $scope.managerResourceData = PoliciesDataObject;
            gso.getNGDialog().open({
                templateUrl: 'app/components/employee/managerResources/managerResources.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
        };
        $scope.getManagerRsources=function(results){
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + gso.getAppConfig().companyId + "/" +
                gso.getAppConfig().userId + "/" + gso.getAppConfig().countryCode + "/" + gso.getAppConfig().stateCode + "/policies?pfClient="+ gso.getAppConfig().pfClient, null,
                function (response) {
                    $scope.companyPoliciesData = results.docMeta;
                    var managerResources =  response.forms.filter(function(forms){
                        return forms.title === "Manager Resources";
                    })[0];
                    (managerResources && managerResources.pdfs.length > 0) ? $scope.companyPoliciesData.push(managerResources) : null;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
    }
]);
