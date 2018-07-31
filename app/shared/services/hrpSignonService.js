/*
 This class is needed to get the JSESSION ID setup for accessing the Web logic Server
 */
trinetApp.service('hrpSignonService', ['$http', '$q', 'gso','sharedProperties', function ($http, $q, gso, sharedProperties) {
    var service = {
        baseUrl: '/trinetGateway/services/v1.0/hrpsessionsignon',
        reqConfig: {
            transformResponse: function (data) {
                return {
                    hrpsession: data
                };
            }
        },
        signonComplete: false,
        seekerSignonData: {
            emplid: gso.getAppConfig().userId,
            company: gso.getAppConfig().companyId
        },
        gatewaySignonData: {
            companyId: "",
            personId: "",
            tSessionId: ""
        },

        login: function (companyId, personId, authToken) {
            service.gatewayLogin(companyId, personId, authToken);
        },
        logout: function (companyId, personId, authToken, isLogoutMsg) {
            service.gatewayLogout(companyId, personId, authToken, isLogoutMsg);
        },
        // We have to set the Person_Security record first
        seekerSessionLogin: function (companyId, personId, authToken) {

            var counter = 0;
            var signonResult = $q.defer();

            service.seekerSignonData.emplid = personId;
            service.seekerSignonData.company = companyId;

            function doSeekerSessionLogin() {
                // Please leave this as api-mock - the code is NOT in trinetAuth yet.
                $http.post('/api-mock/services/v1.0/authentication/hrpsessionsignon/' + authToken, JSON.stringify(service.seekerSignonData))
                    .success(function (body) {
                        signonResult.resolve(body);
                    })
                    .error(function () {
                        if (counter < 10) {
                            counter++;
                            setTimeout(doSeekerSessionLogin, 2000);
                        } else {
                            service.signonComplete = false;
                        }
                    });

            }

            doSeekerSessionLogin();

            return signonResult.promise;
        },

        gatewayLogin: function (companyId, personId, authToken) {

            var counter = 0;
            var gatewayLoginResult = $q.defer();

            service.gatewaySignonData.companyId = companyId;
            service.gatewaySignonData.tSessionId = authToken;
            service.gatewaySignonData.personId = personId;
            function doGatewayLogin() {
                $http.post('/trinetGateway/services/v1.0/hrpsessionsignon2', JSON.stringify(service.gatewaySignonData), service.reqConfig)
                    .success(function (body) {
                        gatewayLoginResult.resolve(body);
                        service.signonComplete = true;
                    })
                    .error(function () {
                    });
            }
            doGatewayLogin();

            return gatewayLoginResult.promise;

        },
        gatewayLogout: function (companyId, personId, authToken, isLogoutMsg) {
			
			var gatewayLogoutResult = $q.defer();
			service.gatewaySignonData.companyId = companyId;
			service.gatewaySignonData.tSessionId = authToken;
			service.gatewaySignonData.personId = personId;
			var cookieOptions = {
				path: '/',
				domain: '.hrpassport.com'
			};
			// Fire and forget URL
			function doGatewayLogout() {
				// Gateway apps get called from hrp<env>.hrpassport.com
				// or www.hrpassport.com, so sign off from that url.
				
				// read external properties
				var hrpURL = sharedProperties.hrpUrl;
				

				$http.post(hrpURL + '/trinetGateway/services/v1.0/hrpsessionsignoff2', JSON.stringify(service.gatewaySignonData), service.reqConfig)
					.success(function (body) {
						gatewayLogoutResult.resolve(body);

                        //Removed /api-cache/v1/cache/{employeeId}/flush-cache for 404 reductions
						
						gso.getUtilService().logout(isLogoutMsg);
					})
					.error(function () {
						gso.getUtilService().logout(isLogoutMsg);
					});
			}
			doGatewayLogout();
			return gatewayLogoutResult.promise;
		}
    };
    return service;
}]);
