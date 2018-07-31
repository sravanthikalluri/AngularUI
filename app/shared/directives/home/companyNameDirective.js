(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name TrinetPassport.companyName
     */
    trinetApp.directive('companyName', ['companyNameService', CompanyName]);

    /**
     * @ngdoc directive
     * @name  companyName
     * @module TrinetPassport
     * @restrict E
     * @description
     * Company Selector is a UI component which implements these features:
     * - get the list of 'companies' associated with the the logged-in user
     * - track the selected company
     * - switch company
     *
     * @usage
     * Basic:
     * <hljs lang="html">
     *     <company-selector></company-selector>
     * </hljs>
     */
    function CompanyName(companyNameService){
        return {
            restrict: 'E',
            scope: false,
            controller: CompanyNameController,
            templateUrl: 'app/shared/views/companyNameView.html'
        };

        function CompanyNameController($scope,$window) {
            var companies = [];
            var companiesDropDown = [];

            angular.forEach($scope.companiesList.companyInfo, function (c) {
                companies.push({
                    companyDesc: c.companyDesc,
                    companyId: c.companyId,
                    peoId: c.peoId
                });
            });

            $scope.selectedCompany = companyNameService.getCurrentCompany(companies);
            var currentCompanyId = companyNameService.getCompanyId();


            if (!currentCompanyId) {
                currentCompanyId = companies[0].companyId;
            }


            angular.forEach($scope.companiesList.companyInfo, function (c) {

                if (c.companyId !== currentCompanyId) {
                    companiesDropDown.push({
                        companyDesc: c.companyDesc,
                        companyId: c.companyId,
                        peoId: c.peoId
                    });
                }
            });
            $scope.companies = companiesDropDown;

            $scope.selectCompany = function(company) {
                $scope.selectedCompany = company;
                $window.sessionStorage.setItem('companyName', company.companyDesc);
                companyNameService.switchCompany(company);
            };
        }
    }

})();
