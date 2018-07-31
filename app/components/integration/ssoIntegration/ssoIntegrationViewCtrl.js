'use strict';

trinetApp.controller('ssoIntegrationCtrl', ['gso',
    function (gso) {
        window.open('/ui-ssoselfservice/?companyId=' + gso.getAppConfig().companyId, 'Client Reports');
        history.go(-1);
    }]);
