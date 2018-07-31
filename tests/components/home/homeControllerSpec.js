/*
/!**
 * Created by ganesh on 12/4/2015.
 *!/

(function(){

  "use strict";

  describe('Home Controller Testing',function(){


    var $rootScope,
        $scope,
        utilService,
        appConfig,
        $timeout,
        $httpBackend;

    var menuResponse ={
      "data": {
        "empId": "00001411732",
        "menuItems": [
          {
            "subMenus": [],
            "menuId": 1,
            "name": "Dashboard",
            "theme": "Me",
            "component": "dashboard",
            "url": "#/dashboard",
            "displayOrder": 1,
            "external": "N",
            "isLeaf": true,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 21,
                "name": "Profile",
                "theme": "Me",
                "component": "profile",
                "url": "#/profile/profile",
                "displayOrder": 1,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 2,
            "name": "My Profile",
            "theme": "Me",
            "component": null,
            "url": null,
            "displayOrder": 2,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 31,
                "name": "PayChecks and Statements",
                "theme": "Me",
                "component": null,
                "url": "#/earning",
                "displayOrder": 2,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 3,
            "name": "My Money",
            "theme": "Me",
            "component": "pay",
            "url": null,
            "displayOrder": 3,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 42,
                "name": "Enroll in Benefits",
                "theme": "Me",
                "component": null,
                "url": "#/openenrollment",
                "displayOrder": 2,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 4,
            "name": "My Benefits",
            "theme": "Me",
            "component": "umbrella",
            "url": "#/mytime",
            "displayOrder": 4,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 57,
                "name": "Time Off",
                "theme": "Me",
                "component": null,
                "url": "/ui/apps/TimeOff/",
                "displayOrder": 3,
                "external": "Y",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 5,
            "name": "Time",
            "theme": "Me",
            "component": "time",
            "url": null,
            "displayOrder": 5,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 62,
                "name": "Organization Chart",
                "theme": "Me",
                "component": null,
                "url": "#/organizationalChart/me",
                "displayOrder": 2,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 6,
            "name": "About My Company",
            "theme": "Me",
            "component": "company",
            "url": null,
            "displayOrder": 6,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 81,
                "name": "Manage Employees",
                "theme": "Company",
                "component": null,
                "url": "#/manageEmployee",
                "displayOrder": 1,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 8,
            "name": "Employees",
            "theme": "Company",
            "component": "employees",
            "url": null,
            "displayOrder": 2,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          },
          {
            "subMenus": [
              {
                "subMenus": [],
                "menuId": 91,
                "name": "Company Overview",
                "theme": "Company",
                "component": null,
                "url": null,
                "displayOrder": 1,
                "external": "N",
                "isLeaf": true,
                "type": "Menu"
              }
            ],
            "menuId": 9,
            "name": "Company Setup",
            "theme": "Company",
            "component": "company",
            "url": null,
            "displayOrder": 3,
            "external": "N",
            "isLeaf": false,
            "type": "Menu"
          }
        ]
      },
      "_statusCode": "200",
      "_statusText": "OK",
      "_statusMessage": "Success"
    };
    var response = {
      "data": {
        "inbox_data": [{
          "catagory": "Time off Requests",
          "action": "Leave Request Manager Notification",
          "dateEntered": "2009-06-09 07:16:26.0",
          "lastAction": null,
          "effectiveDate": "2009-06-09 00:00:00.0",
          "completedBy": "Fred M Christiensen",
          "role": "Leave Request Manager Notification",
          "waitingFor": "1097162",
          "notified": null,
          "subjectId": "00001005496",
          "firstName": "Annie",
          "lastName": "H",
          "status": "Pending",
          "actionId": "20",
          "processId": "2"
        }],
        "metadata": {
          "mytaskCount": "36",
          "proxyCount": "5",
          "unassignedCount": "0",
          "assignedToMeCount": "10",
          "completedCount": "15"
        }
      },
      "_statusCode": "200",
      "_statusText": "OK"
    };

    var envResponse = {
      "envCookie": "TriNetAuthCookieBIB"
    };

    var loginResponse = {"username":"00001000483","emplid":["00001000483"],"ssn":null,"customid":null,"personid":"00001000483","userpassword":null,"olduserpassword":null,"sn":null,"givenname":"papa,John ","middlename":null,"objectClass":"trinetPerson","companyid":["31T"],"inetUserStatus":null,"name":"papa,John ","currentCompanyId":"31T"};

    var empResponse = {
                          "data": {
                              "workCountryCd": "US",
                              "workState": "IN",
                              "pfClient": "9BN2",
                              "posDesc": "Leasing Coordinator",
                              "name": "Mayberry,Nini ",
                              "workCity":"Quebec",
                              "holidaySchedule": "HG7"
                          },
                          "_requestId": "bdf1bfc3-3d05-4c47-9610-bcde37d9bfe1",
                          "_statusCode": "200",
                          "_statusText": "OK",
                          "_statusMessage": "from cache"
                      };

    var companiesResponse = {"data":{"peoId":null,"peoName":null,
      "companyInfo":[{"companyId":"31T",
        "companyDesc":"Inflection.com, Inc.",
        "parentOrg":"6055",
        "shortDesc":"Inflection",
        "companyCode":"Inflection"}],
      "vertical":null,"verticalName":null},
      "_requestId":"21554",
      "_statusCode":"200",
      "_statusText":"OK",
      "_statusMessage":"Retrieved companies successfully!!!"}

    var componentsResponse = {
      "data": {
        "31": [
          {
            "id": 6,
            "name": "terminate",
            "url": "#",
            "type": "Button",
            "external": "N",
            "permission": {
              "canView": false,
              "canAdd": false,
              "canEdit": true,
              "canDelete": false,
              "canPreliminaryApprove": false,
              "canFinalApprove": false
            },
            "subComponents": []
          },
          {
            "id": 4,
            "name": "money",
            "url": "#",
            "type": "Tab",
            "external": "N",
            "permission": {
              "canView": true,
              "canAdd": false,
              "canEdit": true,
              "canDelete": false,
              "canPreliminaryApprove": false,
              "canFinalApprove": false
            },
            "subComponents": [
              {
                "id": 7,
                "name": "TaxWithholding",
                "url": "#",
                "type": "section",
                "external": "N",
                "permission": {
                  "canView": true,
                  "canAdd": false,
                  "canEdit": true,
                  "canDelete": false,
                  "canPreliminaryApprove": false,
                  "canFinalApprove": false
                },
                "subComponents": []
              }
            ]
          },
          {
            "id": 5,
            "name": "requestExtendedLeave",
            "url": "#",
            "type": "Button",
            "external": "N",
            "permission": {
              "canView": true,
              "canAdd": false,
              "canEdit": true,
              "canDelete": false,
              "canPreliminaryApprove": false,
              "canFinalApprove": false
            },
            "subComponents": []
          },
          {
            "id": 3,
            "name": "workInfo",
            "url": "#",
            "type": "Tab",
            "external": "N",
            "permission": {
              "canView": true,
              "canAdd": false,
              "canEdit": true,
              "canDelete": false,
              "canPreliminaryApprove": false,
              "canFinalApprove": false
            },
            "subComponents": []
          }
        ],
        "81": [
          {
            "id": 2,
            "name": "newHireId",
            "url": "#",
            "type": "Button",
            "external": "N",
            "permission": {
              "canView": true,
              "canAdd": false,
              "canEdit": true,
              "canDelete": false,
              "canPreliminaryApprove": false,
              "canFinalApprove": false
            },
            "subComponents": [
              {
                "id": 1,
                "name": "SUBMIT",
                "url": "#",
                "type": "Button",
                "external": "N",
                "permission": {
                  "canView": true,
                  "canAdd": true,
                  "canEdit": true,
                  "canDelete": false,
                  "canPreliminaryApprove": true,
                  "canFinalApprove": true
                },
                "subComponents": []
              }
            ]
          }
        ]
      },
      "_statusCode": "200",
      "_statusText": "OK",
      "_statusMessage": "Success"
    }


    var   countriesDataResponse = {
            "data": [{
                "key": "CA",
                "value": "Canada"
            }, {
                "key": "US",
                "value": "United States of America"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        genderResponse = {
            "data": [{"key": "F", "value": "Female"}, {"key": "M", "value": "Male"}],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        relationShipsDataResponse = {
            "data": [{
                "key": "O",
                "value": "Domestic Partner Adult"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        accessTypesResponse = {
            "data": [
                {
                    "key": "Work",
                    "value": "Work"
                },
                {
                    "key": "Emerg",
                    "value": "Emergency"
                },
                {
                    "key": "Home",
                    "value": "Home"
                },
                {
                    "key": "Other",
                    "value": "Other"
                },
                {
                    "key": "Work2",
                    "value": "Second Work"
                },
                {
                    "key": "Campus",
                    "value": "Campus"
                },
                {
                    "key": "Dorm",
                    "value": "Dormitory"
                }
            ],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        suffixesResponse = {
            "data": [{
                "key": "II",
                "value": "II"
            }, {
                "key": "Jr",
                "value": "Junior"
            }, {
                "key": "III",
                "value": "III"
            }, {
                "key": "Sr",
                "value": "Senior"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        titlesResponse = {
            "data": [{
                "key": "Mr",
                "value": "Mr"
            }, {
                "key": "Mrs",
                "value": "Mrs"
            }, {
                "key": "Ms",
                "value": "Ms"
            }, {
                "key": "Miss",
                "value": "Miss"
            }, {
                "key": "Dr",
                "value": "Dr"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        sampleResponse = {data: {status: 'success', ticket: 6180010}};
    beforeEach(function(){
      module('TrinetPassport');
      inject(function($injector){
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
        appConfig = $injector.get('appConfig');
        utilService = $injector.get('utilService');
        $injector.get('navigationService');
        $timeout = $injector.get('$timeout');
        $scope = $rootScope.$new();
        appConfig.userId = null;
        appConfig.companyId = null;
        $injector.get('$controller')('homeController',{$scope : $scope});
      });

      var res = {data : []};

      var companyId = '31T';

      var userId = '00001000483';
      var credentials = {
        emplid: '00001669553',
        userpassword: '1234'
      };



      $httpBackend.whenGET('/api-profile/v1/profile/00001000483/companies').respond(200,companiesResponse);

      $httpBackend.whenPOST(loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signon + "?realm=sw_hrp", credentials).respond(200, {});

      //$httpBackend.whenGET('app/shared/config/env.json').respond(200,envResponse);

      $httpBackend.whenGET(loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.empDetails+ "null?realm=sw_hrp").respond(200,loginResponse);

      $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + userId + profileUrlConfig.resources.employmentDetails + "?include=workCountryCd,workState,pfClient,posDesc,name,workCity").respond(200,empResponse);


      $httpBackend
          .when('GET', loginUrlConfig.loginAPI +loginUrlConfig.loginBaseURL + 'user/token/'+ $scope.cookieAuth +"?realm=sw_hrp")
          .respond(200, res);

      $httpBackend.whenGET('/api-navigation/v1/menu/' + companyId + '/' + userId + '/menu-items').respond(200,menuResponse);

      $httpBackend.whenGET("assets/data/menu/menu.json").respond(200, menuResponse);

      $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + companyId + '/' + userId + homeUrlConfig.resources.perm).respond(200,componentsResponse);

      $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
      '/' + companyId + '/' + userId + companyUrlConfig.resources.items + '?task=assignedToMe').respond(200, response);

      $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries').respond(countriesDataResponse);

        $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/genders').respond(200, genderResponse);

      $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/relationships').respond(relationShipsDataResponse);


        $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/suffixes').respond(200, suffixesResponse);

        $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/titles').respond(200, titlesResponse);

        $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/access-types')
            .respond(200, accessTypesResponse);

        $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/address-types').respond(sampleResponse);

        $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/media-types').respond(response);

        $httpBackend
            .whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/marital-statuses').respond(response);

        $httpBackend
            .whenGET('assets/data/personal/personinfo.json').respond(response);

        $httpBackend
            .whenGET('assets/data/global/chooseOption.json').respond(response);

        $httpBackend.flush();

    });



    describe('signOut function testing',function() {

      it('signOut is defined', function () {
        expect($scope.signOut).toBeDefined();
      });

      it('signOut function call with success response', function () {
        spyOn(utilService, 'redirectToLogin');
        var logoutResponse = {
          _statusCode: "200"
        };

        var tokenData = {
          token: utilService.getCookie()
        };

        var URL = (loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signOff + "?realm=sw_hrp&enableValidation=true");


        $httpBackend
            .when('POST', URL, tokenData)
            .respond(200, logoutResponse);


        $scope.signOut();

        $httpBackend.flush();

        $timeout(function () {
          expect(utilService.redirectToLogin).toHaveBeenCalled();
        }, 6000);


      });

      it('signOut function call with failure response', function () {
        spyOn(utilService, 'redirectToLogin');
        var logoutResponse = {
          _statusCode: "400",
          "_error":{"detailMessage":"error"}
        };

        var tokenData = {
          token: utilService.getCookie()
        };

        var URL = (loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signOff + "?realm=sw_hrp&enableValidation=true");


        $httpBackend
            .when('POST', URL, tokenData)
            .respond(400, logoutResponse);


        $scope.signOut();

        $httpBackend.flush();
        $timeout(function () {
          expect(utilService.redirectToLogin).toHaveBeenCalled();
        }, 6000);
      });


    });

    describe('getPermissions function testing',function(){
      it('getPermissions is defined',function(){
        expect($scope.getPermissions).toBeDefined();
      });

      it('getPermissions function call',function(){
        var menuId = 81;
        $scope.getPermissions(menuId);
      });
    });

    describe('$on testing',function(){
      it('$on testing',function(){
        $rootScope.$broadcast('$routeChangeSuccess');
        $timeout.flush(50);
      });
    });

    describe('profileNavClick function testing',function(){
      it('profileNavClick is defined',function(){
        expect($scope.profileNavClick).toBeDefined();
      });

      it('profileNavClick function call',function(){
        $scope.profileNavClick();
      });
    });

    describe('toUserDetails function testing',function(){
      it('toUserDetails is defined',function(){
        expect($scope.toUserDetails).toBeDefined();
      });

      it('toUserDetails function call',function(){
        $scope.toUserDetails();
      });

       it('toUserDetails function call with failure response',function(){
         var failureResponse = { _statusCode: "400","_error":{"detailMessage":"error"}};
         $httpBackend.whenGET(loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.empDetails+ "null?realm=sw_hrp").respond(400,failureResponse);
         $scope.toUserDetails();
         $httpBackend.flush();
       });
    });

    describe('toggleMenu function testing',function(){
        it('toggleMenu is defined',function(){
            expect($scope.toggleMenu).toBeDefined();
        });

        it('toggleMenu function call',function(){
            $scope.toggleMenu();
        });
    });



  });

}());
*/
