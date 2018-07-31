'use strict';

trinetApp.controller('compensationReportViewCtrl', ['gso','$location','sharedProperties',
    function (gso,$location,sharedProperties) {

        var reportingHost = sharedProperties.reportsuiBaseUrl;
        var compensationReportUrl = reportingHost+'/UIGateway.jsp?source=Compensation';
        window.open(compensationReportUrl, '_blank');
        $location.path('/companyDashboard');
    }]);
