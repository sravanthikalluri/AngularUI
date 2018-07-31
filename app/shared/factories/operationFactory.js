/* This is the Factory using to do CRUD operations* */
'use strict';

trinetApp.service('operationFactory', ['$http', 'utilService','$timeout', function ($http, utilService,$timeout) {
    var factory = this,
        alert = {};

    factory.doExecute = function (method, restUrl, data, successCb, errorCb) {
        utilService.toggleDIV('appLoader', true);
        restUrl = utilService.enableValidationAndCache(method,restUrl);
        factory.doCallExecute(method, restUrl, data, successCb, errorCb);

    };

    factory.doCallExecute = function (method, restUrl, data, successCb, errorCb) {
        // call ajax service
        $http({
            url: restUrl,
            data: data,
            method: method,
            async: false,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true,
                'X-Custom-Header': 'greenstack-timeoff'
            },
            crossDomain: true
        })
            .success(
                function (response, status) {
                  // To stop the loader after success
                    if (document.readyState === 'complete') {
                        utilService.toggleDIV('appLoader', false);
                    }
                    // To check the condition
                    if (response.data !== undefined && response.data !== null) {
                        successCb(response.data, status);
                    } else if (restUrl.contains(loginUrlConfig.resources.empDetails) ||
                            restUrl.contains(fileConfig.microservices.config) ||
                            restUrl.contains(fileConfig.mfa.personSecurityUrl)
                        ) {
                        successCb(response, status);
                    } else {
                        alert = {
                            _statusCode: response._statusCode,
                            _statusMessage: response._statusMessage
                        };
                        successCb(alert, status);
                    }
                    utilService.toggleDIV('appLoader', false);
                })
            .error(function (data, status) {

                if (data !== null) {
                    if (data._statusCode === undefined && (status === 503 || status === 502)) {
                        alert = {
                            _statusCode: status,
                            _statusMessage: data
                        };
                    }
                    else if (data._statusCode === 500 || data._statusCode === 504 || data._statusCode === 401) {
                        utilService.logout(false);
                    }
                    else if (data._error.detailMessage !== undefined && data._error.detailMessage !== "" && data._error.detailMessage.fieldErrors) {
                        alert = {
                            _statusCode: data._statusCode,
                            _statusMessage: utilService.filedErrorIterator(data._error.detailMessage.fieldErrors)
                        };
                    } else if (data._error.detailMessage !== undefined && data._error.detailMessage !== "") {
                        alert = {
                            _statusCode: data._statusCode,
                            _statusMessage: data._error.detailMessage
                        };
                    }else {

                        alert = {
                            _statusCode: data._statusCode,
                            _statusMessage: data._error.message
                        };

                    }
                    errorCb && errorCb(alert, status);
                    utilService.toggleDIV('appLoader', false);
                }
            });
    };


    return factory.doExecute;

}]);
