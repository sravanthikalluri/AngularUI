/* This is the Factory using to do CRUD operations* */
'use strict';

trinetApp.service('timeOffService', ['$http', '$cookies', 'utilService', 'gso', function ($http, $cookies, utilService, gso) {
    var me = this;
    var alert = {};
    var currentCompanyIdCookieName = 'CurrentCompanyId';
    var cookieOptions = {
        path   : '/',
        domain : '.hrpassport.com'
    };

    me.createCurrentCompanyIdCookie = function functionName(companyId) {
        $cookies.put(currentCompanyIdCookieName, companyId, cookieOptions);
    };

    me.deleteCurrentCompanyIdCookie = function functionName() {
        $cookies.remove(currentCompanyIdCookieName, cookieOptions);
    };

    me.getTimeOffWidgetData = function (method, restUrl, data, successCallback, errorCallback) {
        var currentCompanyId = gso.getAppConfig().companyId;
        // Time Off API requires CurrentCompanyId cookie when user works for multiple companies
        me.createCurrentCompanyIdCookie(currentCompanyId);

        $http({
            url: restUrl,//"/trinetGateway/timeoff/services/v1.0/LeaveRequest/LeaveType",
            data: data,
            method: method,
            async: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            crossDomain: true
        })
            .success(function (response) {
                successCallback(response);
            })
            .error(function (response) {
                errorCallback(response);
            });
    };

}]);
