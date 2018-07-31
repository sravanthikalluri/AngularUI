'use strict';
trinetApp.controller('contactCtrl', ['$scope','$filter','gso','sharedProperties',
    function ($scope,$filter,gso,sharedProperties) {
        var pfClient = gso.getAppConfig().pfClient,
            peoId = gso.getAppConfig().peoId,
            userId = gso.getAppConfig().userId,
            trinetInfo = {
            "contactType":"Employee Solution Center",
            "phone":"800.638.0461",
            "hoursOfOperation": {
                "availDays": "Monday-Friday",
                "fromTime": ($scope.companyId) ? "8 a.m.":"4:30 a.m.",
                "toTime": ($scope.companyId) ? "5 p.m.":"9:00 p.m.",
                "timeZone": "PT"
            },
            "email": ($scope.companyId) ? "myhr@trinet.com" : "employees@trinet.com"
        },
        businessContactAMB = '';
        $scope.liveChatCode = gso.getAppConfig().liveChatCodeForHtml;
        $scope.showLiveChat = gso.getAppConfig().pfClient !== "0000";
        $scope.companyId = (gso.getAppConfig().companyId==="001" || gso.getAppConfig().companyId==="002");
        gso.getCrudService().execute(constants.get,'/api-company/v1/manage-company' +'/'+gso.getAppConfig().companyId+ '/support-contacts',null,
            function(data){
                data.filter(function (contact) {
				    if (contact.phoneNumber) {
					    contact.phoneNumber = contact.phoneNumber.replace(/[^\d]+/gi, ".");
				    }
			    });

                if(peoId === 'AMB'){
                    $scope.isAmbrose = true;
                    trinetInfo.email = 'hrserviceteam@trinet.com';
                    if ($filter('filter')(data, {contactType:"Human Capital Consultant"})[0]) {
                        businessContactAMB = $filter('filter')(data, {contactType:"Human Capital Consultant"});
                    }
                }
                $scope.contactDetails = {
                    businessContacts : peoId === 'AMB' ? businessContactAMB : data,
                    supportContact : trinetInfo
                };
            },
            function(error){
                $scope.errorAlert = error;
            }
        );
        if (userId !== null && $scope.companyId !== null) {
            var response = sharedProperties.getComponentPermissions();
            if (response !== undefined && response !== null) {
                if(response["140"] && response["140"][0].id === 58 && response["140"][0].permission.canView === true){
                    $scope.caseManagement = true;
                    response["140"][0].subComponents.map(function(data){
                        if(data){
                            if(data.id === 59 && data.permission.canView === true){ // Add a Case
                                $scope.addCase = true;
                            }
                            if(data.id === 60 && data.permission.canView === true){// Manage my Cases
                                $scope.managecases = true;
                            }
                            if(data.id === 61 && data.permission.canView === true){//View my case statistics
                                $scope.mystats = true;
                            }
                            if(data.id === 62 && data.permission.canView === true){//View Company Case Statistics
                                $scope.companystats = true;
                            }
                        }
                    });
                }
            }
        }
        $scope.getUrl = function(val){
            $scope.ssoURL = "/#/ssowidget/"+val;
        };

        $scope.createDynamicOnlickEvent = function(liveChatCode) {
            if(liveagent)
            {
                liveagent.startChat(liveChatCode);
            }
        }

    }]);
