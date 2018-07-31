'use strict';

trinetApp.controller('asiViewCtrl', ['gso',
    function (gso) {
        var env = "";
        var company ="";
        if(gso.getUtilService().getEnvironmentFromLocation()!== null){
            env = gso.getUtilService().getEnvironmentFromLocation().toLowerCase();
		}
        company = gso.getAppConfig().companyId;
        // relative path
        var asiUrl = '/ui-asi/#/company/'+company;
        window.open(asiUrl, 'Accounting Systems');
        history.go(-1);       
    }]);
