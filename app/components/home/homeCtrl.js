/**
 Description: This is controller covered functions like fetch employee details, security permissions, load menu component and sign out
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('homeController', ['$rootScope','$scope', '$timeout', 'gso', '$window', '$mdSidenav', 'companyNameService','$location','apiConfigService','passportUrlBuilder','hrpSignonService', 'onboardingService', 'timeOffService','$http','$cookies','sharedProperties', 'SharedDataService','$stateParams',
    function ($rootScope, $scope, $timeout, gso, $window, $mdSidenav, companyNameService, $location,apiConfigService, passportUrlBuilder, hrpSignonService, onboardingService, timeOffService,$http,$cookies, sharedProperties, SharedDataService, $stateParams) {
        $scope.isFirstLogin  = !localStorage.getItem('notFirstLogin');
        $scope.profilePicture = "";
        $scope.setContentBackground = function () {
            var contentBackground = '';
            var formattedPath = $location.path().toLowerCase().replace('/', '');
            if ((formattedPath.indexOf('dashboard') > -1) || formattedPath === '') {
                contentBackground = 'tn-dashboard-grey';
            }
            return contentBackground;
        };

        var companyId = companyNameService.getCompanyId();
        var peoId = companyNameService.getPeoId();
        timeOffService.deleteCurrentCompanyIdCookie();


        $scope.isSetUserDetails = false;
        $scope.hideLogo = false;
        var searchImage = true;
        $scope.termEmployeeId = '';


        $scope.getCompanyLogo = function (imageSrc) {
            if (imageSrc === undefined || imageSrc === null) {
                imageSrc = $scope.companyLogoUrl;
            }
            else {
                if (searchImage) {
                    var image = new Image();
                    image.src = imageSrc;
                    image.onerror = function () {
                        searchImage = false;
                        $scope.hideLogo = true;
                    };
                    image.onload = function () {
                        searchImage = false;
                        $scope.hideLogo = false;
                    };
                }
            }
            return imageSrc;
        };
        setTimeout(function () {
            $scope.$on(constants.emitLogoName, function (evnt, obj) {
                // $scope.monogrom = obj;
                $scope.monogrom = SharedDataService.getAppSharedData().userName;
            });
        }, 200);
        // Uncomment the below code snippet if you want to run the app using AWS
        /*  $scope.localDevLogin = function () {
              //With authentication
              var credentials = {
                  emplid: '00001669553',
                  userpassword: '1234'
              };
              /!** local login functionality for dev *!/
              gso.getCrudService().execute(constants.post, loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signon + "?realm=sw_hrp", credentials,
                  function () {
                  }
              );
          };*/
        /** **************To Get the User Details************** */

        $scope.addDynamicNav = function () {
            angular.element('div#sideNavigation').html(gso.getCompile()('<menu-list></menu-list>')($scope));
            /* Un comment below code when notification icon required to display */
            //angular.element('#submenu').after(gso.getCompile()('<span><work-inbox-notification></work-inbox-notification></span><span><notification></notification></span>')($scope));
        };

        $scope.addDynamicCompanyName = function () {
            angular.element('div#companyName').html(gso.getCompile()('<company-name></company-name>')($scope));
        };

        $scope.initializeUserData = function () {
            gso.getCrudService().execute(constants.get, fileConfig.microservices.config, null,
                function (data) {
                    sharedProperties.cookieName = data.cookieName;
                    sharedProperties.hrpUrl = data.hrpUrl;
                    sharedProperties.platformUrl = data.platformUrl;
                    sharedProperties.ssoUrl = data.ssoUrl;
                    sharedProperties.validateAllSessions = data.validateAllSessions;
                    sharedProperties.reportsuiBaseUrl = data.reportsuiBaseUrl;
                    sharedProperties.setWfaUrl(data.wfaUrl);


                    $scope.trinetLiveChat=data.trinetLiveChat;
                    $scope.walkmeUrl =data.walkmeUrl;
                    $scope.injectWalkMe($scope.walkmeUrl);

                    // No timer is needed, if cookie is not available , logout
                    var cookie = sharedProperties.cookieName;
                    var authCookie = $cookies.get(cookie);
                    if ( authCookie ) {
                        if(authCookie.length === 0){
                            gso.getUtilService().logout(false);
                        }
                    }
                    else{
                        gso.getUtilService().logout(false);
                    }
                    if (($window.sessionStorage.getItem('empId') === null) || ($window.sessionStorage.getItem('personId') === null) ) {
                        $scope.toUserDetails();
                    } else {
                        $scope.getCurrentCompany();
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.injectWalkMe = function(walkmeUrl) {
            // inject wow walkme files with cache busting
            var myElements = document.getElementsByTagName('head')[0];
            var wowElement = null;
            // cache bust
            var uiNum = new Date().getTime();
            var strUrlPostfix = '?cb=' + uiNum;
            wowElement = document.createElement('script');
            wowElement.type = 'text/javascript';
            wowElement.src = walkmeUrl + strUrlPostfix;
            wowElement.innerHTML = 'var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })();'
            myElements.appendChild(wowElement);
        }

        $scope.injectSalesForceLiveChat = function(trinetLiveChat)
        {
           if(SharedDataService.getAppSharedData().liveChatInjected ){
                return;
            }
            //live chat codes
            var myElements = document.getElementsByTagName ( 'head')[ 0 ];
            var wowElement = null;

            var code1 = trinetLiveChat.init1;
            var code2 = trinetLiveChat.init2;
            var code3 = trinetLiveChat.online;
            var code4 = trinetLiveChat.url1;
            var code5 = trinetLiveChat.url2;
            gso.getAppConfig().liveChatCodeForHtml = code3;
            gso.getAppConfig().trinetLiveChat = trinetLiveChat;
            //--------------------
            liveagent.addCustomDetail("Emp ID", gso.getAppConfig().userId);
            liveagent.findOrCreate("Contact").map("Employee_ID__c", "Emp ID", true,true,false);
            liveagent.setName((gso.getAppConfig().firstName?gso.getAppConfig().firstName:"")+" "+(gso.getAppConfig().lastName?gso.getAppConfig().lastName :""));
            // -----------------
            liveagent.addCustomDetail("LiveChat Field", gso.getAppConfig().companyId ?gso.getAppConfig().companyId :"");
            liveagent.findOrCreate("Contact").map("Client_ID_for_Live_Chat__c", "LiveChat Field", true,true,false);
            //
            wowElement = document.createElement ( 'script' );
            wowElement.type = 'text/javascript';
            wowElement.innerHTML = "liveagent.init('https://"+code5+"/chat', '"+code1+"', '"+code2+"')";
            myElements.appendChild ( wowElement );
            // -----------------
            wowElement = document.createElement ( 'script' );
            wowElement.type = 'text/javascript';
            wowElement.innerHTML = "if (!window._laq){window._laq = []; }" +
                                    "window._laq.push(function(){" +
                                       "liveagent.showWhenOnline('"+code3+"', document.getElementById('liveagent_button_online_"+code3+"'));" +
                                       "liveagent.showWhenOffline('"+code3+"', document.getElementById('liveagent_button_offline_"+code3+"'));" +
                                    "});"
            myElements.appendChild ( wowElement );
            SharedDataService.getAppSharedData().liveChatInjected = true;
        }

        $scope.toUserDetails = function () {
            // Uncomment the below code snippet if you want to run the app using AWS
            /*if (document.location.hostname.startsWith("local")) {
                $scope.localDevLogin();
            }*/
            gso.getCrudService().execute(constants.get, loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.empDetails + gso.getUtilService().getCookie() + "?realm=sw_hrp", null,
                function (data) {
                    $window.sessionStorage.setItem('empId', data.emplid);
                    gso.getAppConfig().userId = gso.getAppConfig().positionId = $window.sessionStorage.getItem('empId');
                    gso.getAppConfig().personId = data.personid;
                    $window.sessionStorage.setItem('personId', data.personid);
                    // Must be called only once to initialize person security table.
                    $scope.getHRPSession();
                    $scope.getCurrentCompany();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.getProfilePicture = function () {
            var url = profileUrlConfig.profileApi + profileUrlConfig.profilePictureBaseUrl + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + profileUrlConfig.resources.picture;
            $http.get(url, { responseType: 'arraybuffer' })
                .success(function (data) {
                    var showImage = (data.byteLength <= 1000) ? false : true;
                    if (showImage) {
                        var arrayBufferView = new Uint8Array(data);
                        var blob = new Blob([arrayBufferView], { type: "image/jpeg, image/png" });
                        var imageUrl = URL.createObjectURL(blob);
                        $scope.profilePicture = imageUrl;
                        gso.getAppConfig().profilePicture = imageUrl;
                    }
                });
        };

        $scope.getCurrentCompany = function () {
            gso.getAppConfig().userId = gso.getAppConfig().positionId = $window.sessionStorage.getItem('empId');
            gso.getAppConfig().personId = $window.sessionStorage.getItem('personId');

            // This is for checking for openAM login
            // both Employee and Admin view use this to let you in or logout
            if ( sharedProperties != null && sharedProperties.validateAllSessions ) {

                var firstTimeLogin = $window.sessionStorage.getItem('firstTimeLogin');

                if ( firstTimeLogin == null || firstTimeLogin === undefined ) {
                    $scope.validateOpenAMTokenForAllSessions();
                }
            }
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.platform + gso.getAppConfig().userId + '/' + profileUrlConfig.resources.companies, null,
                function (response) {
                    $scope.companiesList = response;
                    gso.getAppConfig().authToken = gso.getUtilService().getCookie();
                    gso.getAppConfig().companyId = companyId || response.companyInfo[0].companyId;
                    timeOffService.createCurrentCompanyIdCookie(gso.getAppConfig().companyId);
                    $scope.companyLogoUrl = '/CustomFolders/Objects/Company/' + gso.getAppConfig().companyId + '/Gifs/Logo.gif';

                    if (!peoId || peoId === null || peoId === "undefined") {
                        peoId = response.companyInfo[0].peoId;
                    }
                    gso.getAppConfig().peoId = peoId;
                    gso.getAppConfig().positionId = gso.getAppConfig().userId;
                    gso.getAppConfig().companyName = $scope.companyName = response.companyInfo[0].companyDesc;
                    var currentCompany = $stateParams.companyID;

                    $scope.selectCompany = function(company) {
                        $scope.selectedCompany = company;
                        $window.sessionStorage.setItem('companyName', company.companyDesc);
                        companyNameService.switchCompany(company, true);
                    };

                    if(currentCompany){
                        var selectedCompany=[];
                        angular.forEach($scope.companiesList.companyInfo, function (c) {
                            if (c.companyId === currentCompany) {
                                gso.getAppConfig().companyId = currentCompany;
                                selectedCompany.push({
                                    companyCode: c.companyCode,
                                    companyDesc: c.companyDesc,
                                    companyId: c.companyId,
                                    parentOrg: c.parentOrg,
                                    peoId: c.peoId,
                                    peoName: c.peoName,
                                    shortDesc: c.shortDesc
                                });
                                $scope.selectCompany(selectedCompany);
                            }
                        });

                    }

                    // We need to set the initial values in the sessionStorage
                    // in case we had to use the default.
                    $window.sessionStorage.setItem('companyId', gso.getAppConfig().companyId);
                    $window.sessionStorage.setItem('peoId', gso.getAppConfig().peoId);

                    $scope.isSetUserDetails = true;
                    $scope.getInterstitialData();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.validateOpenAMTokenForAllSessions = function () {
            var trinetGatewayAPIEndPoint = fileConfig.mfa.personSecurityUrl + gso.getAppConfig().personId + "/personsecurity";

            gso.getCrudService().execute(constants.get, trinetGatewayAPIEndPoint, null,
            function (response) {
            /*
                Use case
                1. should prompt for new credential when a user logs in after closing the browser window
                OpenAM is still valid after closing the browser.
                2. User cannot skip MFA by typing a URL in another tab or opening a window
                3. Ensure to start with a valid session ( openam, Legacy, Weblogic )
                4. Should allow switching betweeen Legacy and GS
                5. Should allow switching between Empl and Admin view
                6. Should allow reloading or back button

                // check if token id is same as person_security table
                // This check should be removed once we decommision seeker/Web logic apps
                Local dev : in bib, config.json,  set the flag to false
                validateAllSessions : false
            */

                // Weblogic must have
                if ( gso.getUtilService().getCookie() ==  response.encryptedSession) {
                    // We cannot have gso in util service, so signoff weblogic
                    // Which update person security table
                    hrpSignonService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie(), false);
                } else {
                    $window.sessionStorage.setItem('firstTimeLogin', true);
                }
            }, function ( data)  {
                hrpSignonService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie(), false);
                console.log('Check all sessions:error is' + error);
            } );

		};
        $scope.getInterstitialData= function() {
          gso.getCrudService().execute(constants.get,
              homeUrlConfig.homeApi + homeUrlConfig.homeBase +
              homeUrlConfig.resources.interstitial + '/' + gso.getAppConfig().companyId + '/' +
              gso.getAppConfig().userId + homeUrlConfig.resources.page, null,
              function (response) {
                    // Check to see if there are any required interstitial pages.
                    if (response.componentName) {
                        // We need to redirect to the interstitial service
                        $window.location.href = '/ui-interstitial/#';
                        return;
                    }


                    $scope.empDetails();
                    $scope.addDynamicCompanyName();
                    $scope.addDynamicNav();
                    $scope.getComponentsPermissions();
                    $scope.getProfilePicture();
                    apiConfigService.execAll();
                },
                function (data) {
                    $scope.errorAlert = data;
                });
        };

        $scope.getHRPSession = function () {
            // Initial setup does not need company Id, subsequent UI apps need to pass the companyId
            hrpSignonService.login("", gso.getAppConfig().personId, gso.getUtilService().getCookie());
        };

        /*Employee Details Fetching*/
        $scope.empDetails = function () {
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + profileUrlConfig.resources.employmentDetails + "?include=workCountryCd,workState,pfClient,posDesc,name,workCity,firstName,lastName", null,
                function (response) {
                    SharedDataService.getAppSharedData().countryCode= response.workCountryCd;
                    SharedDataService.getAppSharedData().userName = response.name;
                    gso.getAppConfig().countryCode = response.workCountryCd;
                    gso.getAppConfig().pfClient = response.pfClient;
                    gso.getAppConfig().designation = response.posDesc;
                    gso.getAppConfig().stateCode = response.workState;
                    gso.getAppConfig().username = response.name;
                    gso.getAppConfig().firstName= response.firstName;
                    gso.getAppConfig().lastName =response.lastName;
                    gso.getAppConfig().holidaySchedule = response.holidaySchedule;
                    gso.getAppConfig().workCity = response.workCity;
                    if (response.name !== null) {
                        $scope.monogrom = response.firstName.charAt(0).toUpperCase() + response.lastName.charAt(0).toUpperCase();
                        SharedDataService.getAppSharedData().userName = $scope.monogrom;
                    }
                    $scope.$broadcast('holidaySchedule', gso.getAppConfig().holidaySchedule);
                    $scope.showDashboard = true;
                    localStorage.setItem('notFirstLogin',true);
                    $scope.injectSalesForceLiveChat($scope.trinetLiveChat);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.getComponentsPermissions = function () {
            var permURL = homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + homeUrlConfig.resources.perm;
            gso.getCrudService().execute(constants.get, permURL, null,
                function (response) {
                    sharedProperties.setComponentPermissions(response);
                    var manageEmpSearchDirectResponse = response['81'];
                    if (Array.isArray(manageEmpSearchDirectResponse)) {
                        manageEmpSearchDirectResponse.filter(function (obj) {
                            if (obj.name === 'manageEmpSearchDirect' && obj.permission && obj.permission.canView && obj.permission.canEdit) {
                                SharedDataService.getAppSharedData().isShowManageEmpSearch =true;
                            }
                            else{
                                SharedDataService.getAppSharedData().isShowManageEmpSearch =false;
                            }
                        });
                    }

                    var editNoticesResponse = response['73'];
                    if (Array.isArray(editNoticesResponse)) {
                        editNoticesResponse.filter(function (obj) {
                            if (obj.name === 'editNotices' && obj.permission && obj.permission.canView && obj.permission.canEdit) {
                                SharedDataService.getAppSharedData().editNotices = true;
                            }
                        });
                    }

                    $scope.componentsPermissions = response;
                    if( SharedDataService.getAppSharedData().permissionId){
                        if ($scope.componentsPermissions !== undefined && $scope.componentsPermissions !== null) {
                            $scope.selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions($scope.componentsPermissions[SharedDataService.getAppSharedData().permissionId]);
                            gso.getUtilService().toggleComponentPermissions($scope.selectedMenuComponentPermissions);
                        }
                    }
                }, function (data) {
                    $scope.errorAlert = data;
                });
        };
        $scope.navigations = [];
        $scope.initializeUserData();

        function logoutXHR(url) {
            var cookies = $cookies.getAll();
            var hrDomain = ".hrpassport.com";
            var currentDomain = $location.host();
            var trinetDomain = ".trinet.com";

            //localStorage.clear();
            $window.sessionStorage.clear();
            angular.forEach(cookies, function (v, k) {
				$cookies.remove(k, {  domain: currentDomain });
				$cookies.remove(k, {  domain: hrDomain });
				$cookies.remove(k, {  domain: trinetDomain });
			});

            $http({
                url: url,
                method: 'GET',
                withCredentials: true
            }).then(function (sucess) {
                gso.getUtilService().redirectToLogin();
            }, function (err) {
                $scope.errorAlert = err;
                gso.getUtilService().redirectToLogin();
            });
        }

        $scope.signOut = function () {
        		var data = {source :'logOut', destUrl : ''};
			if(beforeLeavingAdminView(navigationConfirmation,data)){
	    			// Tell openAM to show success message
				hrpSignonService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie(), true);
			}

	    	};

        $scope.selectedMenuComponentPermissions = null;
        $scope.selectedEmpMenuComponentPermissions = null;
        $scope.getPermissions = function (menuId) {
            SharedDataService.getAppSharedData().permissionId= menuId;
            if ($scope.componentsPermissions !== undefined && $scope.componentsPermissions !== null) {
                $scope.selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions($scope.componentsPermissions[SharedDataService.getAppSharedData().permissionId]);
            }
        };

        /*  $scope.getExternalLinkStatus = function (menuId) {
              gso.getCrudService().execute(constants.get, '/api-navigation/v1/menu/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/menu-items/'+menuId+"?embed=status", null,
                  function (response) {
                      console.log(JSON.stringify(response));
                  },
                  function () {
                  });
          };*/

        $scope.profileNavClick = function (menuId) {
            SharedDataService.getAppSharedData().permissionId =menuId
            $scope.selectedMainMenu = null;
            SharedDataService.getAppSharedData().menuId=null
            //$scope.addDynamicNav();
            $scope.getPermissions(SharedDataService.getAppSharedData().permissionId);

            var data = {source :'profile', destUrl : $location.protocol() + '://'+ $location.host() +'/#/app/main/profile'};
    			if (beforeLeavingAdminView(navigationConfirmation,data)){

    				$window.open($location.protocol() + '://'+ $location.host() +'/#/app/main/profile','_self');
    			}

        };

        /* $scope.$on('$viewContentLoaded', function(event) {
             $timeout(function() {
                 if(localStorage.getItem("permissionId")){
                     $scope.getPermissions(localStorage.getItem("permissionId"));
                 }
             },0);
         });*/

        $scope.toggleMenu = function () {
            $mdSidenav('left').toggle();
        };

        $scope.logoClick = function () {
            $location.path('dashboard');
            $window.location.reload();
        };
        $scope.goToCurrentHRPSite = function () {
            var redirectURL = sharedProperties.hrpUrl+'/Link2HR.eng?/Saf/Entry/Portal.htm&betaPref=0';
            $window.ga('send', 'event', 'buttons', 'click', 'goBackToPreviousSite-admin');
            window.open(redirectURL, 'child');

        };

        /* Following functions are onboarding option view listener and redirect to the onboarding page */
        // Function listens to any broadcast that calls for clicking of onboardingoptionview
        $scope.$on("onboardingOptionView", function (event, data) {
            // Goes straight to onboarding newhire wse when user is authorized but does not have ta or k1
            if ($scope.onboardingRole == "HRENTRY" && ($scope.onboardingK1 == null || !$scope.onboardingK1)) {
                onboardingService.goToOnboarding(companyNameService.getCompanyId(), "newHire");
            }
            // Opens the option view for user to choose one
            else if ($scope.onboardingRole != null) {
                $scope.onboardingSelected = null;
                gso.getNGDialog().open({
                    templateUrl: fileConfig.onboarding.viewOnboardingOptions,
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            }
        });
        // Function listens for onboardingRole to be filled when companydashboard loads
        $scope.$on("onboardingRole", function (event, data) {
            switch(data){
                case "HRENTRY":
                    if ($scope.onboardingRole == null){
                        $scope.onboardingRole = data;
                    }
                    break;
                case "HRAUTH":
                    if ($scope.onboardingRole != "HRAUTH_R"){
                        $scope.onboardingRole = data;
                    }
                    break;
                default:
                    $scope.onboardingRole = data;
                    break;
            }
        });
        // Function listens for onboardingK1 to be filled when companydashboard loads
        $scope.$on("onboardingK1", function (event, data) {
            $scope.onboardingK1 = data;
        });
        // Function goes to the webpage user selected
        $scope.goToOnboarding = function (event) {
            gso.getNGDialog().closeAll();
            onboardingService.goToOnboarding(companyNameService.getCompanyId(), $scope.onboardingSelected);
        }
        // Function selects the option user clicked on
        $scope.selectOnboarding = function (event){
            $scope.onboardingSelected = event;
        }
        /* End of onboarding option view related functions */

        $scope.toggleAdminView = function () {
            $window.open($location.protocol() + '://' + $location.host() + '/', '_self');

        };

        $scope.toggleEmployeeView = function () {
        		//TER-1003 :  If any unsaved termination Changes,  confirm navigation before opening an employee window.
        		var data = {source :'employee', destUrl : $location.protocol() + '://' + $location.host() + '/'};
        		if(beforeLeavingAdminView(navigationConfirmation,data)){

        			$window.open($location.protocol() + '://' + $location.host() + '/', '_self');
        		}

        };

        function isInclude() {
            if (!String.prototype.includes) {
                String.prototype.includes = function () {
                    return String.prototype.indexOf.apply(this, arguments) !== -1;
                };
            }
        }
        isInclude();

       //function listens when termination redirect happens and stores terminated person Id
        $scope.$on("terminationRedirect", function(event,data){
        		$scope.termEmployeeId = data;
        });


        function terminationCheck(callback, params){
	        	if ($scope.termEmployeeId){
		        	var personSession = $window.sessionStorage.getItem($scope.termEmployeeId);
		    		var person ='';
		 		if (personSession){
		 			person= JSON.parse(personSession);
			        if (person  && person.trackChange ){
			        		callback(params);
			        		return false;
			        }
		 		}
			}
	        	return true;
        }


	    function navigationConfirmation(sourceParams){
	    		if (sourceParams && sourceParams.source){
	    			$rootScope.$broadcast('seekConfirmation', sourceParams);
	    		}
	    }

        //Check to see whether to navigate away from the current screen or not
        function beforeLeavingAdminView(callback, params){
    			return terminationCheck(callback, params);
        }


    }]);

