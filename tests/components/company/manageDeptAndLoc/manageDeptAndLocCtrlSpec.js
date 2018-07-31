(function() {


    'use strict';

    describe('Manage Department And Location Controller Testing', function() {

        var $rootScope,
            $scope,
            appConfig,
            $httpBackend;


        var getDepartmentsResponse = {
            "data": [{
                "deptEmployeeCount": 8,
                "deptId": "04172200",
                "deptLocationCount": 3,
                "deptName": "Marketing"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        };


        var getLocationsResponse = {
            "data": [{
                "locationDeptCount": 0,
                "locationEmployeeCount": 0,
                "locationId": "00000005M8",
                "locationName": "/HR Passport Perm-Remote PA"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        };


        var getCountriesResponse = {
            "data": [{
                "key": "CA",
                "value": "Canada"
            }, {
                "key": "US",
                "value": "United States of America"
            }],
            "_statusCode": "200",
            "_statusText": "OK"
        };

        var $compile,$body = $('body');


        beforeEach(function() {
            module('TrinetPassport');

            inject(function($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
                $compile = $injector.get('$compile');
                $injector.get('$controller')('manageDeptAndLocCtrl', {
                    $scope: $scope
                });

            });

            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + appConfig.companyId + manageEmpUrlConfig.resources.allDepartments+ "&cache=flush").respond(200,getDepartmentsResponse);

            $httpBackend.flush();


        });

        describe('searchPos function testing', function() {

            it('searchPos function is defined', function() {
                expect($scope.searchPos).toBeDefined();
            });

            it('searchPos is called', function() {
                var value = 1;
                $scope.searchPos(value);
                expect($scope.searchbox).toEqual(value);
            });
        });

        describe('textboxhide function testing', function() {

            it('textboxhide function is defined', function() {
                expect($scope.textboxhide).toBeDefined();
            });

            it('textboxhide function is called', function() {
                $scope.textboxhide();
                expect($scope.searchbox).toBeFalsy();
                expect($scope.isvisable).toBeFalsy();
                expect($scope.showFlyout).toBeFalsy();
                expect($scope.mailFlyoutData).toBeFalsy();
                expect($scope.showManageEmpColList).toBeFalsy();
            });
        });

        describe('flyout function', function() {

            it('flyout function is defined', function() {
                expect($scope.flyout).toBeDefined();
            });

            it('flyout function is called', function() {
                var val = 1;
                $scope.flyout(val);
                expect($scope.showFlyout).toEqual(val);
            });
        });

        describe('selectTab function', function() {

            it('selectTab function is defined', function() {
                expect($scope.selectTab).toBeDefined();
            });

            it('selectTab function is called with value 1 and success response with data > 0', function() {
                var newValue = 1;
                $scope.loc = {};
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + appConfig.companyId + manageEmpUrlConfig.resources.allDepartments + "&cache=flush").respond(200, getDepartmentsResponse);
                $scope.selectTab(newValue);
                $httpBackend.flush();

            });

            it('selectTab function is called with value 1 and failure response', function() {
                var newValue = 1;
                $scope.loc = {};
                var response = {
                    "data": {},
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error":{"detailMessage":"error"}
                };

                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + appConfig.companyId + manageEmpUrlConfig.resources.allDepartments + "&cache=flush").respond(400, response);
                $scope.selectTab(newValue);
                $httpBackend.flush();



            });

            it('selectTab function is called with value 2 and success response with data > 0', function() {
                var newValue = 2;
                $scope.departm = {};
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                                         "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(200, getLocationsResponse);

                $scope.selectTab(newValue);
                $httpBackend.flush();
            });

            it('selectTab function is called with value 2 and failure response', function() {
                var newValue = 2;
                $scope.departm = {};
                var response = {
                    "data": [],
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error":{"detailMessage":"error"}
                };

                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                     "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(400, response);

                $scope.selectTab(newValue);
                $httpBackend.flush();

            });
        });

        describe('mailFlyout function testing', function() {

            it('mailFlyout function is defined', function() {
                expect($scope.mailFlyout).toBeDefined();
            });

            it('mailFlyout function is called', function() {
                var val = 1;
                $scope.mailFlyout(val);
                expect($scope.mailFlyoutData).toEqual(val);
            });
        });

        describe('childParentAlertMsg function testing',function(){
            it('childParentAlertMsg is defined',function(){
                expect($scope.childParentAlertMsg).toBeDefined();
            });

            it('childParentAlertMsg function call',function(){
                var data = "data";
                $scope.childParentAlertMsg(data);
            });
        });

        describe('getEmployeeData function testing', function() {

            it('getEmployeeData function is defined', function() {
                expect($scope.getEmployeeData).toBeDefined();
            });

            it('getEmployeeData function call for if condition',function(){
                var evt = {
                    "currentTarget": "#id1"
                };
                var dept = {
                    "deptId": "123",
                    "deptEmployeeCount": "1"
                };
                var html = "<tr id='id1'>"+"<td>"+"<div class='in'>"+"</div>"+"</td>"+"</tr>"+
                           "<tr id='id2'>"+"<td>"+"<div class='in'>"+"</div>"+"</td>"+"</tr>";
                var element1 = $compile(html)($scope);
                $body.append(element1);
                $rootScope.$digest();
                $scope.getEmployeeData(evt, dept);
            });

            it('getEmployeeData function is called with success and data > 0 ', function() {
                var evt = {
                    "currentTarget": ""
                };
                var dept = {
                    "deptId": "123",
                    "deptEmployeeCount": "1"
                };
                var response = {
                    "data": {
                        "name": "john"
                    },
                    "_statusCode": "200",
                    "_statusText": "OK"
                };

                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.departmentEmployees + dept.deptId).respond(200, response);
                $scope.getEmployeeData(evt, dept);
                $httpBackend.flush();
                expect(dept.employees).toEqual(response.data);
            });

            it('getEmployeeData function is called with success and data = 0 ', function() {
                var evt = {
                    "currentTarget": ""
                };
                var dept = {
                    "deptId": "123",
                    "deptEmployeeCount": "1"
                };
                var response = {
                    "data": [],
                    "_statusCode": "200",
                    "_statusText": "OK"
                };

                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.departmentEmployees + dept.deptId).respond(200, response);
                $scope.getEmployeeData(evt, dept);
                $httpBackend.flush();


            });

            it('getEmployeeData function is called with failure', function() {
                var evt = {
                    "currentTarget": ""
                };
                var dept = {
                    "deptId": "123",
                    "deptEmployeeCount": "1"
                };
                var response = {
                    "data": [],
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error":{"detailMessage":"error"}

                };

                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.departmentEmployees + dept.deptId).respond(400, response);
                $scope.getEmployeeData(evt, dept);
                $httpBackend.flush();


            });
        });

        describe('getEmployeeDatabyLoc function testing', function() {

            it('getEmployeeDatabyLoc function is defined', function() {
                expect($scope.getEmployeeDatabyLoc).toBeDefined();
            });

            it('getEmployeeDatabyLoc function call for if condition',function(){
                var evt = {
                    "currentTarget": "#id1"
                };
                var location = {
                    "locationName": "CL",
                    "locationEmployeeCount":"1"
                };
                var html = "<tr id='id1'>"+"<td>"+"<div class='in'>"+"</div>"+"</td>"+"</tr>"+
                           "<tr id='id2'>"+"<td>"+"<div class='in'>"+"</div>"+"</td>"+"</tr>";
                var element1 = $compile(html)($scope);
                $body.append(element1);
                $rootScope.$digest();
                $scope.getEmployeeDatabyLoc(evt, location);
            });

            it('getEmployeeDatabyLoc function is called with success and data > 0', function() {
                var evt = {
                    "currentTarget": ""
                };
                var location = {
                    "locationName": "CL",
                    "locationEmployeeCount":"1"
                };
                var response = {
                    "data": {
                        "name": "john"
                    },
                    "_statusCode": "200",
                    "_statusText": "OK"
                };
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.locationEmployees + location.locationName).respond(200, response);

                $scope.getEmployeeDatabyLoc(evt, location);
                $httpBackend.flush();
            });

            it('getEmployeeDatabyLoc function is called with success and data = 0', function() {
                var evt = {
                    "currentTarget": ""
                };
                var location = {
                    "locationName": "CL",
                    "locationEmployeeCount":"1"
                };
                var response = {"_statusCode": "200","_statusText": "OK"};
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.locationEmployees + location.locationName).respond(200, response);

                $scope.getEmployeeDatabyLoc(evt, location);
                $httpBackend.flush();

            });

            it('getEmployeeDatabyLoc function is called with failure', function() {
                var evt = {
                    "currentTarget": ""
                };
                var location = {
                    "locationName": "CL",
                    "locationEmployeeCount":"1"
                };
                var response = {
                    "data": [],
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error":{"detailMessage":"error"}
                };
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                    appConfig.companyId + manageEmpUrlConfig.resources.locationEmployees + location.locationName).respond(400, response);

                $scope.getEmployeeDatabyLoc(evt, location);
                $httpBackend.flush();

            });
        });

        describe('trimLocation function testing',function(){

            it('trimLocation function is defined',function(){
                expect($scope.trimLocation).toBeDefined();
            });

            it('Test trimLocation function is called without parameter',function(){
                var val;
                $scope.trimLocation(val);
            });

            it('Test trimLocation function is called with parameter',function(){
                var val = 'abc-def';
                $scope.trimLocation(val);
            });

        });

        describe('toggleSelection function testing',function(){

            it('toggleSelection is defined',function(){
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

        describe('closePanel function testing',function(){

            it('closePanel is defined',function(){
                expect($scope.closePanel).toBeDefined();
            });

            it('closePanel is called',function(){
                $scope.closePanel();
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

        describe('checkCountry function testing ', function () {
            it('checkCountry function is defined ', function () {
                expect($scope.checkCountry).toBeDefined();
            });

            it('checkCountry function call ', function () {
                var countrycode;
                $scope.checkCountry(countrycode);
            });
        });

        describe('isDisabled function testing',function(){

            it('isDisabled function is defined',function(){
                expect($scope.isDisabled).toBeDefined();
            });

            it('isDisabled function is called',function(){
                $scope.isDisabled();
                expect($scope.isvisable).toBeTruthy();
            });
        });

        describe('getCountryList function testing',function(){
            it('getCountryList is defined',function(){
                expect($scope.getCountryList).toBeDefined();
            });

            it('getCountryList function call',function(){
                var countryResponse ={"data":[{"key":"CA","value":"Canada"},{"key":"US","value":"United States of America"}],"_statusCode":"200","_statusText":"OK"};
                var statesResponse ={"data":[{"key":"Al","stateDesc":"Alabama"}],"_statusCode":"200","_statusText":"OK"};
                 appConfig.countryCode ="US";
                 $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + appConfig.countryCode + '/states' + "?cache=flush").respond(200,statesResponse);

                $scope.getCountryList();
            });
        });

        describe('getStateCode function testing',function(){
            it('getStateCode is defined',function(){
                expect($scope.getStateCode).toBeDefined();
            });

            it('getStateCode function call',function(){
             var statesResponse ={"data":[{"key":"Al","stateDesc":"Alabama"}],"_statusCode":"200","_statusText":"OK"}
             $scope.addlocatn = {};
             $scope.addlocatn.address = {};
             var countryCode ="US";
             $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + countryCode + '/states').respond(200,statesResponse);
             $scope.getStateCode(countryCode);
             $httpBackend.flush();
            });
        });

        describe('editLoc function testing',function(){
            it('editLoc is defined',function(){
                expect($scope.editLoc).toBeDefined();
            });

            it('editLoc function call with success response and location data as success',function(){

                var editLocData = {"address": {
                                                  "address1": "123 Test",
                                                  "address2": "345 Test",
                                                  "address3": "test",
                                                  "address4":"test",
                                                  "city": "XYZ",
                                                  "country": "US",
                                                  "county": "qwe",
                                                  "postalCode": "12345",
                                                  "state": "AL"
                                              },
                                              "locationId": "0000000D1O",
                                              "locationName": "Your Company Name Remote AL",
                                              "shortDesc": "Remote AL"
                                          };
                var successResponse = {"_statusCode":"200","_statusText":"OK"};

                var countResponse = {"data":[{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000005M8","locationName":"/HR Passport Perm-Remote PA"},{"locationDeptCount":9,"locationEmployeeCount":40,"locationId":"00000004Z6","locationName":"HR Passport New Company-HQ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000AJE","locationName":"Test Add New Location"},{"locationDeptCount":3,"locationEmployeeCount":3,"locationId":"000000034M","locationName":"Your Co Name-Allen, TX"},{"locationDeptCount":6,"locationEmployeeCount":9,"locationId":"000000034O","locationName":"Your Co Name-Atlanta, GA"},{"locationDeptCount":6,"locationEmployeeCount":10,"locationId":"00000005DO","locationName":"Your Co Name-California"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"00000003S4","locationName":"Your Co Name-Cedarville, OH"},{"locationDeptCount":4,"locationEmployeeCount":8,"locationId":"00000003S3","locationName":"Your Co Name-Chicago, IL"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S8","locationName":"Your Co Name-Lakeville, MN"},{"locationDeptCount":3,"locationEmployeeCount":4,"locationId":"00000003S5","locationName":"Your Co Name-Las Vegas, NV"},{"locationDeptCount":2,"locationEmployeeCount":3,"locationId":"00000003S2","locationName":"Your Co Name-Libertyville, IL"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000003S7","locationName":"Your Co Name-Malvern, PA"},{"locationDeptCount":5,"locationEmployeeCount":6,"locationId":"000000034L","locationName":"Your Co Name-New Fairfield, CT"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000034N","locationName":"Your Co Name-Plano, TX"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"000000034K","locationName":"Your Co Name-Ridgefield, CT"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S6","locationName":"Your Co-Neshanic Station, NJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"W000000JUX","locationName":"Your Company Name - Office AZ"},{"locationDeptCount":4,"locationEmployeeCount":7,"locationId":"0000000D1O","locationName":"Your Company Name - Remote AZ"},{"locationDeptCount":4,"locationEmployeeCount":23,"locationId":"W0000003Z0","locationName":"Your Company Name-Austin, TX"},{"locationDeptCount":5,"locationEmployeeCount":11,"locationId":"W0000003YL","locationName":"Your Company Name-Boston, MA"},{"locationDeptCount":5,"locationEmployeeCount":20,"locationId":"W0000003Z1","locationName":"Your Company Name-Bradenton FL"},{"locationDeptCount":3,"locationEmployeeCount":9,"locationId":"W0000003YJ","locationName":"Your Company Name-Denver, CO"},{"locationDeptCount":10,"locationEmployeeCount":57,"locationId":"000000032O","locationName":"Your Company Name-HQ"},{"locationDeptCount":4,"locationEmployeeCount":24,"locationId":"W0000003YK","locationName":"Your Company Name-Houston, TX"},{"locationDeptCount":10,"locationEmployeeCount":22,"locationId":"W0000003YI","locationName":"Your Company Name-Irvine, CA"},{"locationDeptCount":2,"locationEmployeeCount":21,"locationId":"W0000003YZ","locationName":"Your Company Name-ManhattanNY"},{"locationDeptCount":3,"locationEmployeeCount":7,"locationId":"W0000003YN","locationName":"Your Company Name-McLean, VA"},{"locationDeptCount":2,"locationEmployeeCount":14,"locationId":"W0000003Z3","locationName":"Your Company Name-Miami, FL"},{"locationDeptCount":3,"locationEmployeeCount":16,"locationId":"W0000003Z2","locationName":"Your Company Name-Orlando, FL"},{"locationDeptCount":5,"locationEmployeeCount":14,"locationId":"W0000003YM","locationName":"Your Company Name-ParsippanyNJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000063V","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000092Y","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":4,"locationEmployeeCount":5,"locationId":"00000007JL","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000B93","locationName":"Your Company Name-Remote CA4"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"W0000001E8","locationName":"Your Company Name-Remote CO"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006XE","locationName":"Your Company Name-Remote KS"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000008IR","locationName":"Your Company Name-Remote MA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000ALY","locationName":"Your Company Name-Remote NY"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"W000000DJH","locationName":"Your Company Name-Remote SC"},{"locationDeptCount":1,"locationEmployeeCount":7,"locationId":"00000005TV","locationName":"Your Company Name-Remote TX"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000812","locationName":"Your Company Name-Remote UT"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"0000000ALX","locationName":"Your Company Name-Remote VA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006WN","locationName":"Your Company Name-Remote WI"},{"locationDeptCount":1,"locationEmployeeCount":16,"locationId":"W0000003Z4","locationName":"Your Company Name-Tampa, FL"}],"_statusCode":"200","_statusText":"OK"};

                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                  manageEmpUrlConfig.resources.editlocation + "/" + appConfig.companyId + "/" +
                                  appConfig.userId+'?enableValidation=true',editLocData).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                     "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(200,countResponse);
                $scope.editLoc(editLocData);
                $httpBackend.flush();
            });

            it('editLoc function call with success response and location data as failure',function(){

                var editLocData = {"address": {
                                                  "address1": "123 Test",
                                                  "address2": "345 Test",
                                                  "address3": "test",
                                                  "address4":"test",
                                                  "city": "XYZ",
                                                  "country": "US",
                                                  "county": "qwe",
                                                  "postalCode": "12345",
                                                  "state": "AL"
                                              },
                                              "locationId": "0000000D1O",
                                              "locationName": "Your Company Name Remote AL",
                                              "shortDesc": "Remote AL"
                                          };
                var successResponse = {"_statusCode":"200","_statusText":"OK"};

                var countResponse = {"data":[{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000005M8","locationName":"/HR Passport Perm-Remote PA"},{"locationDeptCount":9,"locationEmployeeCount":40,"locationId":"00000004Z6","locationName":"HR Passport New Company-HQ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000AJE","locationName":"Test Add New Location"},{"locationDeptCount":3,"locationEmployeeCount":3,"locationId":"000000034M","locationName":"Your Co Name-Allen, TX"},{"locationDeptCount":6,"locationEmployeeCount":9,"locationId":"000000034O","locationName":"Your Co Name-Atlanta, GA"},{"locationDeptCount":6,"locationEmployeeCount":10,"locationId":"00000005DO","locationName":"Your Co Name-California"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"00000003S4","locationName":"Your Co Name-Cedarville, OH"},{"locationDeptCount":4,"locationEmployeeCount":8,"locationId":"00000003S3","locationName":"Your Co Name-Chicago, IL"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S8","locationName":"Your Co Name-Lakeville, MN"},{"locationDeptCount":3,"locationEmployeeCount":4,"locationId":"00000003S5","locationName":"Your Co Name-Las Vegas, NV"},{"locationDeptCount":2,"locationEmployeeCount":3,"locationId":"00000003S2","locationName":"Your Co Name-Libertyville, IL"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000003S7","locationName":"Your Co Name-Malvern, PA"},{"locationDeptCount":5,"locationEmployeeCount":6,"locationId":"000000034L","locationName":"Your Co Name-New Fairfield, CT"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000034N","locationName":"Your Co Name-Plano, TX"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"000000034K","locationName":"Your Co Name-Ridgefield, CT"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S6","locationName":"Your Co-Neshanic Station, NJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"W000000JUX","locationName":"Your Company Name - Office AZ"},{"locationDeptCount":4,"locationEmployeeCount":7,"locationId":"0000000D1O","locationName":"Your Company Name - Remote AZ"},{"locationDeptCount":4,"locationEmployeeCount":23,"locationId":"W0000003Z0","locationName":"Your Company Name-Austin, TX"},{"locationDeptCount":5,"locationEmployeeCount":11,"locationId":"W0000003YL","locationName":"Your Company Name-Boston, MA"},{"locationDeptCount":5,"locationEmployeeCount":20,"locationId":"W0000003Z1","locationName":"Your Company Name-Bradenton FL"},{"locationDeptCount":3,"locationEmployeeCount":9,"locationId":"W0000003YJ","locationName":"Your Company Name-Denver, CO"},{"locationDeptCount":10,"locationEmployeeCount":57,"locationId":"000000032O","locationName":"Your Company Name-HQ"},{"locationDeptCount":4,"locationEmployeeCount":24,"locationId":"W0000003YK","locationName":"Your Company Name-Houston, TX"},{"locationDeptCount":10,"locationEmployeeCount":22,"locationId":"W0000003YI","locationName":"Your Company Name-Irvine, CA"},{"locationDeptCount":2,"locationEmployeeCount":21,"locationId":"W0000003YZ","locationName":"Your Company Name-ManhattanNY"},{"locationDeptCount":3,"locationEmployeeCount":7,"locationId":"W0000003YN","locationName":"Your Company Name-McLean, VA"},{"locationDeptCount":2,"locationEmployeeCount":14,"locationId":"W0000003Z3","locationName":"Your Company Name-Miami, FL"},{"locationDeptCount":3,"locationEmployeeCount":16,"locationId":"W0000003Z2","locationName":"Your Company Name-Orlando, FL"},{"locationDeptCount":5,"locationEmployeeCount":14,"locationId":"W0000003YM","locationName":"Your Company Name-ParsippanyNJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000063V","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000092Y","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":4,"locationEmployeeCount":5,"locationId":"00000007JL","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000B93","locationName":"Your Company Name-Remote CA4"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"W0000001E8","locationName":"Your Company Name-Remote CO"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006XE","locationName":"Your Company Name-Remote KS"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000008IR","locationName":"Your Company Name-Remote MA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000ALY","locationName":"Your Company Name-Remote NY"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"W000000DJH","locationName":"Your Company Name-Remote SC"},{"locationDeptCount":1,"locationEmployeeCount":7,"locationId":"00000005TV","locationName":"Your Company Name-Remote TX"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000812","locationName":"Your Company Name-Remote UT"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"0000000ALX","locationName":"Your Company Name-Remote VA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006WN","locationName":"Your Company Name-Remote WI"},{"locationDeptCount":1,"locationEmployeeCount":16,"locationId":"W0000003Z4","locationName":"Your Company Name-Tampa, FL"}],"_statusCode":"200","_statusText":"OK","_error":{"detailMessage":"error"}};

                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                  manageEmpUrlConfig.resources.editlocation + "/" + appConfig.companyId + "/" +
                                  appConfig.userId+'?enableValidation=true',editLocData).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                     "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(400,countResponse);
                $scope.editLoc(editLocData);
                $httpBackend.flush();
            });

            it('editLoc function call with failure response',function(){

                var editLocData = {"address": {
                                                  "address1": "123 Test",
                                                  "address2": "345 Test",
                                                  "address3": "test",
                                                  "address4":"test",
                                                  "city": "XYZ",
                                                  "country": "US",
                                                  "county": "qwe",
                                                  "postalCode": "12345",
                                                  "state": "AL"
                                              },
                                              "locationId": "0000000D1O",
                                              "locationName": "Your Company Name Remote AL",
                                              "shortDesc": "Remote AL"
                                          };
                var successResponse = {"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                  manageEmpUrlConfig.resources.editlocation + "/" + appConfig.companyId + "/" +
                                  appConfig.userId+'?enableValidation=true',editLocData).respond(400,successResponse);

                $scope.editLoc(editLocData);
                $httpBackend.flush();
            });
        });

        describe('addLoc function testing',function(){
            it('addLoc is defined',function(){
                expect($scope.addLoc).toBeDefined();
            });

            it('addLoc function call with success response and location data with success',function(){
                var addLocData = {"address": {
                                                 "address1": "123 Test",
                                                 "address2": "345 Test",
                                                 "address3": "test",
                                                 "address4":"test",
                                                 "city": "XYZ",
                                                 "country": "US",
                                                 "county": "qwe",
                                                 "postalCode": "12345",
                                                 "state": "AL"
                                             },
                                             "locationId": "0000000D1O",
                                             "locationName": "Your Company Name Remote AL",
                                             "shortDesc": "Remote AL"
                                         };
                var successResponse = {"_statusCode":"200","_statusText":"OK"};
                var countResponse = {"data":[{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000005M8","locationName":"/HR Passport Perm-Remote PA"},{"locationDeptCount":9,"locationEmployeeCount":40,"locationId":"00000004Z6","locationName":"HR Passport New Company-HQ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000AJE","locationName":"Test Add New Location"},{"locationDeptCount":3,"locationEmployeeCount":3,"locationId":"000000034M","locationName":"Your Co Name-Allen, TX"},{"locationDeptCount":6,"locationEmployeeCount":9,"locationId":"000000034O","locationName":"Your Co Name-Atlanta, GA"},{"locationDeptCount":6,"locationEmployeeCount":10,"locationId":"00000005DO","locationName":"Your Co Name-California"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"00000003S4","locationName":"Your Co Name-Cedarville, OH"},{"locationDeptCount":4,"locationEmployeeCount":8,"locationId":"00000003S3","locationName":"Your Co Name-Chicago, IL"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S8","locationName":"Your Co Name-Lakeville, MN"},{"locationDeptCount":3,"locationEmployeeCount":4,"locationId":"00000003S5","locationName":"Your Co Name-Las Vegas, NV"},{"locationDeptCount":2,"locationEmployeeCount":3,"locationId":"00000003S2","locationName":"Your Co Name-Libertyville, IL"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000003S7","locationName":"Your Co Name-Malvern, PA"},{"locationDeptCount":5,"locationEmployeeCount":6,"locationId":"000000034L","locationName":"Your Co Name-New Fairfield, CT"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000034N","locationName":"Your Co Name-Plano, TX"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"000000034K","locationName":"Your Co Name-Ridgefield, CT"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S6","locationName":"Your Co-Neshanic Station, NJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"W000000JUX","locationName":"Your Company Name - Office AZ"},{"locationDeptCount":4,"locationEmployeeCount":7,"locationId":"0000000D1O","locationName":"Your Company Name - Remote AZ"},{"locationDeptCount":4,"locationEmployeeCount":23,"locationId":"W0000003Z0","locationName":"Your Company Name-Austin, TX"},{"locationDeptCount":5,"locationEmployeeCount":11,"locationId":"W0000003YL","locationName":"Your Company Name-Boston, MA"},{"locationDeptCount":5,"locationEmployeeCount":20,"locationId":"W0000003Z1","locationName":"Your Company Name-Bradenton FL"},{"locationDeptCount":3,"locationEmployeeCount":9,"locationId":"W0000003YJ","locationName":"Your Company Name-Denver, CO"},{"locationDeptCount":10,"locationEmployeeCount":57,"locationId":"000000032O","locationName":"Your Company Name-HQ"},{"locationDeptCount":4,"locationEmployeeCount":24,"locationId":"W0000003YK","locationName":"Your Company Name-Houston, TX"},{"locationDeptCount":10,"locationEmployeeCount":22,"locationId":"W0000003YI","locationName":"Your Company Name-Irvine, CA"},{"locationDeptCount":2,"locationEmployeeCount":21,"locationId":"W0000003YZ","locationName":"Your Company Name-ManhattanNY"},{"locationDeptCount":3,"locationEmployeeCount":7,"locationId":"W0000003YN","locationName":"Your Company Name-McLean, VA"},{"locationDeptCount":2,"locationEmployeeCount":14,"locationId":"W0000003Z3","locationName":"Your Company Name-Miami, FL"},{"locationDeptCount":3,"locationEmployeeCount":16,"locationId":"W0000003Z2","locationName":"Your Company Name-Orlando, FL"},{"locationDeptCount":5,"locationEmployeeCount":14,"locationId":"W0000003YM","locationName":"Your Company Name-ParsippanyNJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000063V","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000092Y","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":4,"locationEmployeeCount":5,"locationId":"00000007JL","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000B93","locationName":"Your Company Name-Remote CA4"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"W0000001E8","locationName":"Your Company Name-Remote CO"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006XE","locationName":"Your Company Name-Remote KS"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000008IR","locationName":"Your Company Name-Remote MA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000ALY","locationName":"Your Company Name-Remote NY"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"W000000DJH","locationName":"Your Company Name-Remote SC"},{"locationDeptCount":1,"locationEmployeeCount":7,"locationId":"00000005TV","locationName":"Your Company Name-Remote TX"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000812","locationName":"Your Company Name-Remote UT"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"0000000ALX","locationName":"Your Company Name-Remote VA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006WN","locationName":"Your Company Name-Remote WI"},{"locationDeptCount":1,"locationEmployeeCount":16,"locationId":"W0000003Z4","locationName":"Your Company Name-Tampa, FL"}],"_statusCode":"200","_statusText":"OK"};

                $httpBackend.when('POST',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                         companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                         companyUrlConfig.resources.locations +'?enableValidation=true',addLocData).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                     "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(200,countResponse);
                $scope.addLoc(addLocData);
                $httpBackend.flush();
            });

            it('addLoc function call with success response and location data with failure',function(){
                var addLocData = {"address": {
                                                 "address1": "123 Test",
                                                 "address2": "345 Test",
                                                 "address3": "test",
                                                 "address4":"test",
                                                 "city": "XYZ",
                                                 "country": "US",
                                                 "county": "qwe",
                                                 "postalCode": "12345",
                                                 "state": "AL"
                                             },
                                             "locationId": "0000000D1O",
                                             "locationName": "Your Company Name Remote AL",
                                             "shortDesc": "Remote AL"
                                         };
                var successResponse = {"_statusCode":"200","_statusText":"OK"};
                var countResponse = {"data":[{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000005M8","locationName":"/HR Passport Perm-Remote PA"},{"locationDeptCount":9,"locationEmployeeCount":40,"locationId":"00000004Z6","locationName":"HR Passport New Company-HQ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000AJE","locationName":"Test Add New Location"},{"locationDeptCount":3,"locationEmployeeCount":3,"locationId":"000000034M","locationName":"Your Co Name-Allen, TX"},{"locationDeptCount":6,"locationEmployeeCount":9,"locationId":"000000034O","locationName":"Your Co Name-Atlanta, GA"},{"locationDeptCount":6,"locationEmployeeCount":10,"locationId":"00000005DO","locationName":"Your Co Name-California"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"00000003S4","locationName":"Your Co Name-Cedarville, OH"},{"locationDeptCount":4,"locationEmployeeCount":8,"locationId":"00000003S3","locationName":"Your Co Name-Chicago, IL"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S8","locationName":"Your Co Name-Lakeville, MN"},{"locationDeptCount":3,"locationEmployeeCount":4,"locationId":"00000003S5","locationName":"Your Co Name-Las Vegas, NV"},{"locationDeptCount":2,"locationEmployeeCount":3,"locationId":"00000003S2","locationName":"Your Co Name-Libertyville, IL"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000003S7","locationName":"Your Co Name-Malvern, PA"},{"locationDeptCount":5,"locationEmployeeCount":6,"locationId":"000000034L","locationName":"Your Co Name-New Fairfield, CT"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000034N","locationName":"Your Co Name-Plano, TX"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"000000034K","locationName":"Your Co Name-Ridgefield, CT"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S6","locationName":"Your Co-Neshanic Station, NJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"W000000JUX","locationName":"Your Company Name - Office AZ"},{"locationDeptCount":4,"locationEmployeeCount":7,"locationId":"0000000D1O","locationName":"Your Company Name - Remote AZ"},{"locationDeptCount":4,"locationEmployeeCount":23,"locationId":"W0000003Z0","locationName":"Your Company Name-Austin, TX"},{"locationDeptCount":5,"locationEmployeeCount":11,"locationId":"W0000003YL","locationName":"Your Company Name-Boston, MA"},{"locationDeptCount":5,"locationEmployeeCount":20,"locationId":"W0000003Z1","locationName":"Your Company Name-Bradenton FL"},{"locationDeptCount":3,"locationEmployeeCount":9,"locationId":"W0000003YJ","locationName":"Your Company Name-Denver, CO"},{"locationDeptCount":10,"locationEmployeeCount":57,"locationId":"000000032O","locationName":"Your Company Name-HQ"},{"locationDeptCount":4,"locationEmployeeCount":24,"locationId":"W0000003YK","locationName":"Your Company Name-Houston, TX"},{"locationDeptCount":10,"locationEmployeeCount":22,"locationId":"W0000003YI","locationName":"Your Company Name-Irvine, CA"},{"locationDeptCount":2,"locationEmployeeCount":21,"locationId":"W0000003YZ","locationName":"Your Company Name-ManhattanNY"},{"locationDeptCount":3,"locationEmployeeCount":7,"locationId":"W0000003YN","locationName":"Your Company Name-McLean, VA"},{"locationDeptCount":2,"locationEmployeeCount":14,"locationId":"W0000003Z3","locationName":"Your Company Name-Miami, FL"},{"locationDeptCount":3,"locationEmployeeCount":16,"locationId":"W0000003Z2","locationName":"Your Company Name-Orlando, FL"},{"locationDeptCount":5,"locationEmployeeCount":14,"locationId":"W0000003YM","locationName":"Your Company Name-ParsippanyNJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000063V","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000092Y","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":4,"locationEmployeeCount":5,"locationId":"00000007JL","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000B93","locationName":"Your Company Name-Remote CA4"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"W0000001E8","locationName":"Your Company Name-Remote CO"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006XE","locationName":"Your Company Name-Remote KS"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000008IR","locationName":"Your Company Name-Remote MA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000ALY","locationName":"Your Company Name-Remote NY"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"W000000DJH","locationName":"Your Company Name-Remote SC"},{"locationDeptCount":1,"locationEmployeeCount":7,"locationId":"00000005TV","locationName":"Your Company Name-Remote TX"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000812","locationName":"Your Company Name-Remote UT"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"0000000ALX","locationName":"Your Company Name-Remote VA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006WN","locationName":"Your Company Name-Remote WI"},{"locationDeptCount":1,"locationEmployeeCount":16,"locationId":"W0000003Z4","locationName":"Your Company Name-Tampa, FL"}],"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                $httpBackend.when('POST',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                         companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                         companyUrlConfig.resources.locations +'?enableValidation=true',addLocData).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company +
                                     "/" + appConfig.companyId + manageEmpUrlConfig.resources.location + "&cache=flush").respond(400,countResponse);
                $scope.addLoc(addLocData);
                $httpBackend.flush();
            });

            it('addLoc function call with failure response',function(){
                var addLocData = {"address": {
                                                 "address1": "123 Test",
                                                 "address2": "345 Test",
                                                 "address3": "test",
                                                 "address4":"test",
                                                 "city": "XYZ",
                                                 "country": "US",
                                                 "county": "qwe",
                                                 "postalCode": "12345",
                                                 "state": "AL"
                                             },
                                             "locationId": "0000000D1O",
                                             "locationName": "Your Company Name Remote AL",
                                             "shortDesc": "Remote AL"
                                         };
                var successResponse = {"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                var countResponse = {"data":[{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000005M8","locationName":"/HR Passport Perm-Remote PA"},{"locationDeptCount":9,"locationEmployeeCount":40,"locationId":"00000004Z6","locationName":"HR Passport New Company-HQ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000AJE","locationName":"Test Add New Location"},{"locationDeptCount":3,"locationEmployeeCount":3,"locationId":"000000034M","locationName":"Your Co Name-Allen, TX"},{"locationDeptCount":6,"locationEmployeeCount":9,"locationId":"000000034O","locationName":"Your Co Name-Atlanta, GA"},{"locationDeptCount":6,"locationEmployeeCount":10,"locationId":"00000005DO","locationName":"Your Co Name-California"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"00000003S4","locationName":"Your Co Name-Cedarville, OH"},{"locationDeptCount":4,"locationEmployeeCount":8,"locationId":"00000003S3","locationName":"Your Co Name-Chicago, IL"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S8","locationName":"Your Co Name-Lakeville, MN"},{"locationDeptCount":3,"locationEmployeeCount":4,"locationId":"00000003S5","locationName":"Your Co Name-Las Vegas, NV"},{"locationDeptCount":2,"locationEmployeeCount":3,"locationId":"00000003S2","locationName":"Your Co Name-Libertyville, IL"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000003S7","locationName":"Your Co Name-Malvern, PA"},{"locationDeptCount":5,"locationEmployeeCount":6,"locationId":"000000034L","locationName":"Your Co Name-New Fairfield, CT"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000034N","locationName":"Your Co Name-Plano, TX"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"000000034K","locationName":"Your Co Name-Ridgefield, CT"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000003S6","locationName":"Your Co-Neshanic Station, NJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"W000000JUX","locationName":"Your Company Name - Office AZ"},{"locationDeptCount":4,"locationEmployeeCount":7,"locationId":"0000000D1O","locationName":"Your Company Name - Remote AZ"},{"locationDeptCount":4,"locationEmployeeCount":23,"locationId":"W0000003Z0","locationName":"Your Company Name-Austin, TX"},{"locationDeptCount":5,"locationEmployeeCount":11,"locationId":"W0000003YL","locationName":"Your Company Name-Boston, MA"},{"locationDeptCount":5,"locationEmployeeCount":20,"locationId":"W0000003Z1","locationName":"Your Company Name-Bradenton FL"},{"locationDeptCount":3,"locationEmployeeCount":9,"locationId":"W0000003YJ","locationName":"Your Company Name-Denver, CO"},{"locationDeptCount":10,"locationEmployeeCount":57,"locationId":"000000032O","locationName":"Your Company Name-HQ"},{"locationDeptCount":4,"locationEmployeeCount":24,"locationId":"W0000003YK","locationName":"Your Company Name-Houston, TX"},{"locationDeptCount":10,"locationEmployeeCount":22,"locationId":"W0000003YI","locationName":"Your Company Name-Irvine, CA"},{"locationDeptCount":2,"locationEmployeeCount":21,"locationId":"W0000003YZ","locationName":"Your Company Name-ManhattanNY"},{"locationDeptCount":3,"locationEmployeeCount":7,"locationId":"W0000003YN","locationName":"Your Company Name-McLean, VA"},{"locationDeptCount":2,"locationEmployeeCount":14,"locationId":"W0000003Z3","locationName":"Your Company Name-Miami, FL"},{"locationDeptCount":3,"locationEmployeeCount":16,"locationId":"W0000003Z2","locationName":"Your Company Name-Orlando, FL"},{"locationDeptCount":5,"locationEmployeeCount":14,"locationId":"W0000003YM","locationName":"Your Company Name-ParsippanyNJ"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000063V","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"000000092Y","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":4,"locationEmployeeCount":5,"locationId":"00000007JL","locationName":"Your Company Name-Remote CA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000B93","locationName":"Your Company Name-Remote CA4"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"W0000001E8","locationName":"Your Company Name-Remote CO"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006XE","locationName":"Your Company Name-Remote KS"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"00000008IR","locationName":"Your Company Name-Remote MA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000ALY","locationName":"Your Company Name-Remote NY"},{"locationDeptCount":1,"locationEmployeeCount":1,"locationId":"W000000DJH","locationName":"Your Company Name-Remote SC"},{"locationDeptCount":1,"locationEmployeeCount":7,"locationId":"00000005TV","locationName":"Your Company Name-Remote TX"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"0000000812","locationName":"Your Company Name-Remote UT"},{"locationDeptCount":2,"locationEmployeeCount":2,"locationId":"0000000ALX","locationName":"Your Company Name-Remote VA"},{"locationDeptCount":0,"locationEmployeeCount":0,"locationId":"00000006WN","locationName":"Your Company Name-Remote WI"},{"locationDeptCount":1,"locationEmployeeCount":16,"locationId":"W0000003Z4","locationName":"Your Company Name-Tampa, FL"}],"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                $httpBackend.when('POST',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                         companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                         companyUrlConfig.resources.locations +'?enableValidation=true',addLocData).respond(400,successResponse);

                $scope.addLoc(addLocData);
                $httpBackend.flush();
            });
        });

        describe('editDepart function testing',function(){
            it('editDepart is defined',function(){
                expect($scope.editDepart).toBeDefined();
            });

            it('editDepart function call with success response and department data with success',function(){
                var editDeptdata = {
                                       "deptCode": "7301",
                                       "deptId": "04177300",
                                       "deptName": "Dept 7301",
                                       "shortDesc": "SD 7301"
                                   };

                var successResponse = {
                                          "_statusCode": "200",
                                          "_statusText": "OK"
                                      };
                var departmentResponse ={"data":[{"deptEmployeeCount":8,"deptId":"04172200","deptLocationCount":3,"deptName":"Marketing"}],"_statusCode":"200","_statusText":"OK"};
                $httpBackend.when('PUT',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                        companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                        companyUrlConfig.resources.departments + "/" + editDeptdata.deptId+'?enableValidation=true',editDeptdata).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + appConfig.companyId + manageEmpUrlConfig.resources.allDepartments + "&cache=flush").respond(200,departmentResponse);
                $scope.editDepart(editDeptdata);
                $httpBackend.flush();
            });

            it('editDepart function call with success response and department data with failure',function(){
                var editDeptdata = {
                                       "deptCode": "7301",
                                       "deptId": "04177300",
                                       "deptName": "Dept 7301",
                                       "shortDesc": "SD 7301"
                                   };

                var successResponse = {
                                          "_statusCode": "200",
                                          "_statusText": "OK"
                                      };
                var departmentResponse ={"data":[{"deptEmployeeCount":8,"deptId":"04172200","deptLocationCount":3,"deptName":"Marketing"}],"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                $httpBackend.when('PUT',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                        companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                        companyUrlConfig.resources.departments + "/" + editDeptdata.deptId+'?enableValidation=true',editDeptdata).respond(200,successResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" + appConfig.companyId + manageEmpUrlConfig.resources.allDepartments+ "&cache=flush").respond(400,departmentResponse);
                $scope.editDepart(editDeptdata);
                $httpBackend.flush();
            });

            it('editDepart function call with failure response',function(){
                var editDeptdata = {
                                       "deptCode": "7301",
                                       "deptId": "04177300",
                                       "deptName": "Dept 7301",
                                       "shortDesc": "SD 7301"
                                   };

                var successResponse = {
                                          "_statusCode": "400",
                                          "_statusText": "OK",
                                          "_error":{"detailMessage":"error"}
                                      };

                $httpBackend.when('PUT',companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                        companyUrlConfig.resources.manageCompany + "/" + appConfig.companyId +
                                        companyUrlConfig.resources.departments + "/" + editDeptdata.deptId+'?enableValidation=true',editDeptdata).respond(400,successResponse);

                $scope.editDepart(editDeptdata);
                $httpBackend.flush();
            });
        });

        describe('checkCodeAvailability function testing',function(){
            it('checkCodeAvailability is defined',function(){
                expect($scope.checkCodeAvailability).toBeDefined();
            });

            it('checkCodeAvailability function call with success response',function(){
                var code = '7300';

                var successResponse = {"data":{"deptCode":"7300","deptId":"04177300","deptName":"Leapfrog","shortDesc":"Leapfrog"},"_statusCode":"200","_statusText":"OK"};
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company
                                     + "/" + appConfig.companyId + globalUrlConfig.resources.departments + "?deptCode="+code).respond(200,successResponse);
                $scope.checkCodeAvailability(code);
                $httpBackend.flush();
            });

            it('checkCodeAvailability function call with failure response',function(){
                var code = '7300';

                var successResponse = {"data":{"deptCode":"7300","deptId":"04177300","deptName":"Leapfrog","shortDesc":"Leapfrog"},"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company
                                     + "/" + appConfig.companyId + globalUrlConfig.resources.departments + "?deptCode="+code).respond(400,successResponse);
                $scope.checkCodeAvailability(code);
                $httpBackend.flush();
            });
        });

        describe('addlocation function testing',function(){
            it('addlocation is defined',function(){
                expect($scope.addlocation).toBeDefined();
            });

            it('addlocation function call with success response',function(){
                var htmlResponse = {"data":{},"_statusCode":"200","_statusText":"OK"};
                var locationResponse ={"data":"W000000RS1","_statusCode":"200","_statusText":"OK"};
                var statesResponse ={"data":[{"key":"Al","stateDesc":"Alabama"}],"_statusCode":"200","_statusText":"OK"};
                appConfig.countryCode ="US";
                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + appConfig.countryCode + '/states' + "?cache=flush").respond(200,statesResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global + globalUrlConfig.resources.countries).respond(200, getCountriesResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                                    globalUrlConfig.resources.global + globalUrlConfig.resources.locationcode+"?cache=flush").respond(200,locationResponse);
                $httpBackend.whenGET('app/components/company/manageDeptAndLoc/location/addLocation.html').respond(200,htmlResponse);
                $scope.addlocation();
                $httpBackend.flush();
            });

            it('addlocation function call with failure response',function(){
                var htmlResponse = {"data":{},"_statusCode":"200","_statusText":"OK"};
                var locationResponse ={"data":"W000000RS1","_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                var statesResponse ={"data":[{"key":"Al","stateDesc":"Alabama"}],"_statusCode":"200","_statusText":"OK"};
                 appConfig.countryCode ="US";
                 $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + appConfig.countryCode + '/states' + "?cache=flush").respond(200,statesResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global + globalUrlConfig.resources.countries).respond(200, getCountriesResponse);
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                                    globalUrlConfig.resources.global + globalUrlConfig.resources.locationcode+"?cache=flush").respond(400,locationResponse);
                $httpBackend.whenGET('app/components/company/manageDeptAndLoc/location/addLocation.html').respond(200,htmlResponse);
                $scope.addlocation();
                $httpBackend.flush();
            });
        });

        describe('addDepartment function testing',function(){
            it('addDepartment is defined',function(){
                expect($scope.addDepartment).toBeDefined();
            });

            it('addDepartment function call',function(){
                $scope.addDepartment();
            });
        });

        describe('editDepartmentFunc function testing',function(){
            it('editDepartmentFunc is defined',function(){
                expect($scope.editDepartmentFunc).toBeDefined();
            });

            it('editDepartmentFunc function call',function(){
                var dept = {
                           "deptEmployeeCount": 8,
                           "deptId": "04172200",
                           "deptLocationCount": 3,
                           "deptName": "Marketing"
                       };
                $scope.editDepartmentFunc(dept);
            });
        });

        describe('editlocatn function testing',function(){
            it('editlocatn is defined',function(){
                expect($scope.editlocatn).toBeDefined();
            });

            it('editlocatn function call',function(){
               var htmlResponse = {"data":{},"_statusCode":"200","_statusText":"OK"};
               var statesResponse ={"data":[{"key":"Al","stateDesc":"Alabama"}],"_statusCode":"200","_statusText":"OK"};
               appConfig.countryCode ="US";
                $httpBackend.whenGET(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + appConfig.countryCode + '/states' + "?cache=flush").respond(200,statesResponse);
                $httpBackend.whenGET('app/components/company/manageDeptAndLoc/location/editLocation.html').respond(200,htmlResponse);
                var loc = {
                          "locationDeptCount": 0,
                          "locationEmployeeCount": 0,
                          "locationId": "00000005M8",
                          "locationName": "/HR Passport Perm-Remote PA"
                      };
                $scope.editlocatn(loc);
            });
        });

        describe('inactiveDept function testing',function(){
            it('inactiveDept is defined',function(){
                expect($scope.inactiveDept).toBeDefined();
            });

            it('inactiveDept function call',function(){
                $scope.inactiveDept();
            });
        });

        describe('assignToAnotherEmployee function testing',function(){
            it('assignToAnotherEmployee is defined',function(){
                expect($scope.assignToAnotherEmployee).toBeDefined();
            });

            it('assignToAnotherEmployee function call',function(){
                $scope.assignToAnotherEmployee();
            });
        });

        describe('assign function testing',function(){
            it('assign is defined',function(){
                expect($scope.assign).toBeDefined();
            });

            it('assign function call',function(){
                $scope.assign();
            });
        });
     afterEach(function () {
        $body.empty();
    });


    });

}());
