/* This is the service using to do CRUD operations* */
'use strict';
trinetApp.service('crudService', ['operationFactory',
    function (operationFactory) {
        var svc = this;
        svc.execute = function (method, restUrl, data, successCb, errorCb) {
            // async call => need to use a callback to continue the work
            operationFactory(method, restUrl, data, successCb, errorCb);
        };

    }]);
