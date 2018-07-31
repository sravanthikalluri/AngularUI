/* This is the service used to communicate with the trinet international API */

'use strict';
trinetApp.service('internationalApiService', ['$http', '$window', 'appConfig', 'utilService',
     function ($http, $window, appConfig, utilService) {
        var svc = this;

        svc.execute = function (method, restUrl, data, successCb, errorCb) {
            // async call => need to use a callback to continue the work

            var headers = {
                'Content-Type': 'application/json',
                'X-Trinet-Auth': utilService.getCookie(),
                'X-Trinet-User': appConfig.userId,
                'X-Trinet-Company': appConfig.companyId
            };
            // call ajax service
            $http({
                url: svc.apiHost() + restUrl,
                data: data,
                method: method,
                async: false,
                headers: headers,
                crossDomain: true
            })
            .success(function (response, status) {
                successCb(response, status)
                // To stop the loader after success
                utilService.toggleDIV('appLoader', false);
            })
            .error(function (data, status) {
                errorCb(data, status);
                utilService.toggleDIV('appLoader', false);
            });
        };

        svc.apiHost = function() {
            if (utilService.getEnvironmentFromLocation() === null) {
                // production URL
                return 'https://app.trinetinternational.com/api/v1';
            }
            else {
                return 'https://teleborder-staging.herokuapp.com/api/v1';
            }
        };

        svc.goToImmigration = function() {
            $window.open("#/ssowidget/immigrnsvs");
        }
    }]);
