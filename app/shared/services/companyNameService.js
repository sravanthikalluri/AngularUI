(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name TrinetPassport.companyNameService
     */
    trinetApp.service('companyNameService', ['$q', '$window', 'gso', '$location','$timeout','SharedDataService' ,CompanyNameService]);

    /**
     * @ngdoc service
     * @name CompanyNameService
     * @module TrinetPassport
     *
     * @description
     * This service provides the following APIs:
     * - `getCompanies`: get the list of companies for the logged-in user
     * - `getCompanyId`: get the current companyId
     * - `getCurrentCompany`: get the current company object
     * - `switchCompany`: switch the companyId in the app context
     *
     * @usage
     * <hljs lang="js">
     *     angular.controller('myCtrl', function(companyNameService) {
     *         var companies = companyNameService.getCompanies();
     *         var newCompany = companyNameService.switchCompany('ABC');
     *     })
     * </hljs>
     *
     */
    function CompanyNameService($q, $window, gso, $location,$timeout,SharedDataService) {
        var companies = null;
        var companyId = null;

        // APIs
        return {
            getCompanies:       getCompanies,
            getCompanyId:       getCompanyId,
            getCurrentCompany:  getCurrentCompany,
            switchCompany:      switchCompany,
            getPeoId:			getPeoId
        };

        // functions
        function setCompanyId(companyId) {
            $window.sessionStorage.setItem('companyId', companyId);
        }

        function getCompanyId() {
            return $window.sessionStorage.getItem('companyId');
        }

        function setPeoId(peoId) {
            $window.sessionStorage.setItem('peoId', peoId);
        }

        function getPeoId() {
            return $window.sessionStorage.getItem('peoId');
        }

        function getCurrentCompany(companies) {
            if (companies.length === 1) {
                return companies[0];
            }

            // find the company using companyId
            companyId = getCompanyId();

            if (companyId) {
                var filtered = companies.filter(function (company) {
                    return company.companyId === companyId;
                });

                return filtered[0];
            }

            return companies[0];
        }

        function getCompanies() {
            if (companies) {
                // return the cached promise
                return companies;
            }

            var dataCompanies = [];
            var deferred = $q.defer();

            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile + gso.getAppConfig().userId + '/' + profileUrlConfig.resources.companies, null,
                function (response) {
                    response.companyInfo.forEach(function(c) {
                        dataCompanies.push({
                            companyDesc: c.companyDesc,
                            companyId: c.companyId,
                            peoId: c.peoId
                        });
                    });

                    deferred.resolve(dataCompanies);

                    // cache the promise
                    companies = deferred.promise;
                },
                function () {
                    // TODO: error handling
                }
            );

            return deferred.promise;
        }

        function switchCompany(company, isLegacy) {
            // store companyId
            setCompanyId(company.companyId);
            setPeoId(company.peoId);
            SharedDataService.getAppSharedData().navigationsProfile = null;
            SharedDataService.getAppSharedData().navigationsProfileMenuId = null;
            SharedDataService.getAppSharedData().navigationSide = null;
            SharedDataService.getAppSharedData().nextPayDate = null;
            // reload the app

            if(isLegacy){
                $timeout(function(){
                    $window.location = $window.location.origin + "/admin/#/manageCustomFields";
                });
            }else{
                $timeout(function(){
                    $window.location = $window.location.origin;
                });
            }
        }
    }

    trinetApp.service('companiesService', CompanyNameService);

})();
