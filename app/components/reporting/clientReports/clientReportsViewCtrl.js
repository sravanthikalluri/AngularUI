'use strict';

trinetApp.controller('clientReportsViewCtrl', ['gso', 'sharedProperties', 
    function (gso, sharedProperties) {
      var reportingHost = sharedProperties.reportsuiBaseUrl;
      var clientReportsUrl = reportingHost+'/UIGateway.jsp';
      window.open(clientReportsUrl, 'Client Reports');
      history.go(-1);
    }]);