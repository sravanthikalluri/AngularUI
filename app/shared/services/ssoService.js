'use strict';
trinetApp.service('ssoService', ['$http', '$resource', 'appConfig','SharedDataService', function ($http, $resource, appConfig,SharedDataService) {
    return {

        construtURLforGetSSOArtifactForID: function (resourceBaseUrl, resource, urlParams) {
            return resourceBaseUrl + appConfig.companyId + "/" +
                appConfig.userId + resource + urlParams.ssoId+"?peoId="+appConfig.peoId;
        },

        getSSOResponseFromLocalStorage: function (storageKey) {
            var ssoResponseAsJson = SharedDataService.getAppSharedData().storageKey;
            if (ssoResponseAsJson) {
                return angular.fromJson(ssoResponseAsJson);
            }
            return null;
        },

        cacheSSOResponseToLocalStorage: function (values, storageKey) {
            if (!angular.equals(values, this.getSSOResponseFromLocalStorage(storageKey))) {
                SharedDataService.getAppSharedData().storageKey= angular.toJson(values);
            }
        }
    };
}]);


