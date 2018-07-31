/*Created by ganesh on 12/2/2015.*/

(function () {


    'use strict';

    describe('Manage Employee Controller Testing', function () {

        var $rootScope,
            $scope,
            appConfig,
            $httpBackend,
            allEmpResponse = {
                                 "data": {
                                     "empLst": [
                                         {
                                             "name": "Koelsch, Gerald A",
                                             "employeeId": "00001010440",
                                             "firstName": "Gerald",
                                             "lastName": "Koelsch",
                                             "posDesc": "Vice President, Neurobiology",
                                             "emplymntStatus": "A",
                                             "deptDesc": "Oklahoma City Research",
                                             "workShortLocDesc": "OK",
                                             "serviceDt": "2001-12-29",
                                             "homePhone": "405/370-3689",
                                             "work_email": "gkoelsch@comentis.com",
                                             "supervisorName": "Kelly,Terence A.",
                                             "expectedStartDt": null,
                                             "expectedStopDt": null
                                         }
                                     ],
                                     "count": "50"
                                 },
                                 "_requestId": "b91a8f74-cfa4-4c9b-beec-f4e668d6c3f3",
                                 "_statusCode": "200",
                                 "_statusText": "OK",
                                 "_statusMessage": "Success"
                             },
            locationsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            positionResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            departmentsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            };

        var $compile,$body = $('body');
        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
                $scope.selectedMenuComponentPermissions = [
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
                                                          ];
                $scope.getPermissions = function(data){
                    return data;
                };
                $injector.get('$controller')('manageEmployeeCtrl', {
                    $scope: $scope
                });

            });

            $scope.allEmpData = [
                     {
                       "name": "Kruger,Kurt  ",
                       "employeeId": "00001552807",
                       "posDesc": "Partner, Investment Banking",
                       "emplymntStatus": "A",
                       "deptDesc": "NY Investment Banking",
                       "workShortLocDesc": "NewYorkNY",
                       "serviceDt": "2014-06-16",
                       "homePhone": null,
                       "work_email": "kkruger@wrhambrecht.com",
                       "supervisorName": "Hullar,John  ",
                       "Partner, Investment Banking":"off",
                       "NewYorkNY":"off",
                       "NY Investment Banking":"off",
                       "expectedStartDt": null,
                       "expectedStopDt": null
                     }
                   ];
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId + '/' + appConfig.userId +
                manageEmpUrlConfig.resources.allEmp+"?employmentStatus=active&limit=20&offset=0").respond(200, allEmpResponse);
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId + '/' + appConfig.userId +
                manageEmpUrlConfig.resources.allEmp).respond(200, allEmpResponse);
            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                appConfig.companyId + globalUrlConfig.resources.locations).respond(200, locationsResponse);
            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                appConfig.companyId + "/" + profileUrlConfig.resources.departments).respond(200, departmentsResponse);
            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                  "/" + appConfig.companyId + "/" + globalUrlConfig.resources.positions).respond(200, positionResponse);

            $httpBackend.flush();


        });

        describe('searchPos function testing', function () {

            it('searchPos function is defined', function () {
                expect($scope.searchPos).toBeDefined();
            });

            it('searchPos is called', function () {
                var value = 1;
                $scope.searchPos(value);
                expect($scope.searchbox).toEqual(value);
            });
        });

        describe('textboxhide function testing', function () {

            it('textboxhide function is defined', function () {
                expect($scope.textboxhide).toBeDefined();
            });

            it('textboxhide function is called', function () {
                $scope.textboxhide();
                expect($scope.searchbox).toBeFalsy();
                expect($scope.isvisable).toBeFalsy();
                expect($scope.showFlyout).toBeFalsy();
                expect($scope.mailFlyoutData).toBeFalsy();
                expect($scope.showManageEmpColList).toBeFalsy();
            });
        });

        describe('flyout function', function () {

            it('flyout function is defined', function () {
                expect($scope.flyout).toBeDefined();
            });

            it('flyout function is called', function () {
                var val = 1;
                $scope.flyout(val);
                expect($scope.showFlyout).toEqual(val);
            });
        });

        describe('mailFlyout function testing', function () {

            it('mailFlyout function is defined', function () {
                expect($scope.mailFlyout).toBeDefined();
            });

            it('mailFlyout function is called', function () {
                var val = 1;
                $scope.mailFlyout(val);
                expect($scope.mailFlyoutData).toEqual(val);
            });
        });

        describe('stopclick function testing', function () {

            it('stopclick function is defined', function () {
                expect($scope.stopclick).toBeDefined();
            });

            it('stopclick function is called with event obj as phone with onoffswitchEmp as false', function () {
                $scope.onoffswitchEmp = false;
                var event = {
                    "target": {
                        "id": "phone"
                    }
                };
                var empId = '123';
                var empStatus = 'T';
                $scope.stopclick(event, empId, empStatus);
            });

            it('stopclick function is called without event obj as ID with onoffswitchEmp as false', function () {
                $scope.onoffswitchEmp = false;
                var event = {
                    "target": {
                        "id": "ID"
                    }
                };
                var empId = '123';
                var empStatus = 'A';
                $scope.stopclick(event, empId, empStatus);
            });

            it('stopclick function is called with event obj as phone with onoffswitchEmp as true', function () {
                $scope.onoffswitchEmp = true;
                var event = {
                    "target": {
                        "id": "phone"
                    }
                };
                var empId = 'L';
                var empStatus = true;
                $scope.stopclick(event, empId, empStatus);
            });
        });

        describe('formatDate function tesing ', function () {
            it('formatDate function is defined ', function () {
                expect($scope.formatDate).toBeDefined();
            });

            it('formatDate funciton call ', function () {
                $scope.formatDate('28-12-2015');
            });
        });

        describe('toggleSelection function testing', function () {

            it('toggleSelection is defined', function () {
                expect($scope.toggleSelection).toBeDefined();
            });

            it('toggleSelection function call ', function () {
                var data = 1;
                $scope.selection = [1, 2, 3, 4];
                $scope.toggleSelection(data);
            });

            it('toggleSelection function call ', function () {
                var data = 5;
                $scope.selection = [1, 2, 3, 4];
                $scope.toggleSelection(data);
            });

        });

        describe('toggleOnOffSelection function testing',function(){
            it('toggleOnOffSelection is defined',function(){
                expect($scope.toggleOnOffSelection).toBeDefined();
            });

            it('toggleOnOffSelection function call with data as true',function(){
                var data = true;
                $scope.toggleOnOffSelection(data);
            });

            it('toggleOnOffSelection function call with data as false',function(){
                var data = false;
                $scope.toggleOnOffSelection(data);
            });
        });

        describe('selectCheckBox function testing',function(){
            it('selectCheckBox is defined',function(){
                expect($scope.selectCheckBox).toBeDefined();
            });

            it('selectCheckBox function call with class',function(){
                var HTML = '<input type="checkbox" id="id1" class="icon-icon_checkmark_emptybox"></input>';
                var element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();
                $scope.selectCheckBox(1,'id');
            });

            it('selectCheckBox function call without class',function(){
                var HTML = '<input type="checkbox" id="id1" class="icon-icon_checkmarkwithbox"></input>';
                var element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();
                $scope.selectCheckBox(1,'id');
            });
        });

        describe('$watch testing',function(){

            it('$watch testing for title',function(){
                $scope.title = {
                   "name": "Kruger,Kurt  ",
                   "employeeId": "00001552807",
                   "posDesc": "Partner, Investment Banking",
                   "emplymntStatus": "A",
                   "deptDesc": "NY Investment Banking",
                   "workShortLocDesc": "NewYorkNY",
                   "serviceDt": "2014-06-16",
                   "homePhone": null,
                   "work_email": "kkruger@wrhambrecht.com",
                   "supervisorName": "Hullar,John  ",
                   "Partner, Investment Banking":"off",
                   "NewYorkNY":"off",
                   "NY Investment Banking":"off",
                   "expectedStartDt": null,
                   "expectedStopDt": null
                 };
                $scope.$digest();
            });

            it('$watch testing for location',function(){
                $scope.selectLoc = {
                   "name": "Kruger,Kurt  ",
                   "employeeId": "00001552807",
                   "posDesc": "Partner, Investment Banking",
                   "emplymntStatus": "A",
                   "deptDesc": "NY Investment Banking",
                   "workShortLocDesc": "NewYorkNY",
                   "serviceDt": "2014-06-16",
                   "homePhone": null,
                   "work_email": "kkruger@wrhambrecht.com",
                   "supervisorName": "Hullar,John  ",
                   "Partner, Investment Banking":"off",
                   "NewYorkNY":"off",
                   "NY Investment Banking":"off",
                   "expectedStartDt": null,
                   "expectedStopDt": null
                 };
                $scope.$digest();
            });

            it('$watch testing for department',function(){
                $scope.selectdep = {
                   "name": "Kruger,Kurt  ",
                   "employeeId": "00001552807",
                   "posDesc": "Partner, Investment Banking",
                   "emplymntStatus": "A",
                   "deptDesc": "NY Investment Banking",
                   "workShortLocDesc": "NewYorkNY",
                   "serviceDt": "2014-06-16",
                   "homePhone": null,
                   "work_email": "kkruger@wrhambrecht.com",
                   "supervisorName": "Hullar,John  ",
                   "Partner, Investment Banking":"off",
                   "NewYorkNY":"off",
                   "NY Investment Banking":"off",
                   "expectedStartDt": null,
                   "expectedStopDt": null
                 };
                $scope.$digest();
            });
        });

        describe('getEmployeePermissions function testing',function(){
            it('getEmployeePermissions is defined',function(){
                expect($scope.getEmployeePermissions).toBeDefined();
            });

            it('getEmployeePermissions function call with success response',function(){
                var permissionResponse = {
                                           "data": {
                                             "2": [
                                               {
                                                 "id": 4,
                                                 "name": "workinfo",
                                                 "url": "#",
                                                 "type": "tab",
                                                 "external": "N",
                                                 "permission": {
                                                   "canView": true,
                                                   "canAdd": false,
                                                   "canEdit": false,
                                                   "canDelete": false,
                                                   "canPreliminaryApprove": false,
                                                   "canFinalApprove": false
                                                 },
                                                 "subComponents": []
                                               },
                                               {
                                                 "id": 5,
                                                 "name": "money",
                                                 "url": "#",
                                                 "type": "tab",
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
                                                   "id": 17,
                                                   "name": "payrollEstimates",
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
                                                 }]
                                               },
                                               {
                                                 "id": 3,
                                                 "name": "personal",
                                                 "url": "#",
                                                 "type": "tab",
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
                                                     "id": 14,
                                                     "name": "homeaddress",
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
                                                   },
                                                   {
                                                     "id": 15,
                                                     "name": "contactmethods",
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
                                                   },
                                                   {
                                                     "id": 16,
                                                     "name": "emergencycontact",
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
                                                 "id": 11,
                                                 "name": "requestExtendedLeave",
                                                 "url": "#",
                                                 "type": "button",
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
                                                 "id": 12,
                                                 "name": "terminate",
                                                 "url": "#",
                                                 "type": "button",
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
                                                 "id": 13,
                                                 "name": "returnFromLeave",
                                                 "url": "#",
                                                 "type": "button",
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
                                                   "canAdd": true,
                                                   "canEdit": true,
                                                   "canDelete": false,
                                                   "canPreliminaryApprove": true,
                                                   "canFinalApprove": true
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
                                           "_requestId": "27647",
                                           "_statusCode": "200",
                                           "_statusText": "OK",
                                           "_statusMessage": "Success"
                                         };
                $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase +
                                     homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' +
                                     $scope.appUserId + homeUrlConfig.resources.perm)
                                     .respond(200,permissionResponse);
                $scope.getEmployeePermissions();
                $httpBackend.flush();
            });

            it('getEmployeePermissions function call with failure response',function(){
                var permissionResponse = {
                                         data: [],
                                         _statusCode: "400",
                                         _statusText: "OOPs Error",
                                         "_error": {"detailMessage": "error"}
                                     };
                $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase +
                                     homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' +
                                     $scope.appUserId + homeUrlConfig.resources.perm)
                                     .respond(400,permissionResponse);
                $scope.getEmployeePermissions();
                $httpBackend.flush();
            });
        });

        describe('showAllEmps function testing',function(){
            it('showAllEmps is defined',function(){
                expect($scope.showAllEmps).toBeDefined();
            });

            it('showAllEmps function call with success response',function(){
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId + '/' + appConfig.userId +
                                manageEmpUrlConfig.resources.allEmp+"?limit=20&offset=0").respond(200, allEmpResponse);
                $scope.showAllEmps(true);
                $httpBackend.flush();
            });

            it('showAllEmps function call with failure response',function(){
                var failureResponse = {
                                      "data": [],
                                      "_statusCode": "400",
                                      "_statusText": "OK",
                                      "_error": {"detailMessage": "error"}
                                  };
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId + '/' + appConfig.userId +
                                manageEmpUrlConfig.resources.allEmp+"?limit=20&offset=0").respond(400, failureResponse);
                $scope.showAllEmps(true);
                $httpBackend.flush();
            });

            it('showAllEmps function call with false',function(){
                $scope.showAllEmps(false);
            });
        });

        describe('loadData function testing',function(){
            it('loadData is defined',function(){
                expect($scope.loadData).toBeDefined();
            });

            it('loadData function call with true',function(){
                var onoffswitchEmp = true;
                $scope.loadData(onoffswitchEmp);
            });

            it('loadData function call with false',function(){
                var onoffswitchEmp = false;
                $scope.loadData(onoffswitchEmp);
            });
        });

        afterEach(function () {
            $body.empty();
        });

    });

}());
