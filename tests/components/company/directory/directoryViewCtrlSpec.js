/*Created by ganesh on 12/2/2015.*/

(function() {


    'use strict';

    describe('Directory View Controller Testing', function() {

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
                $injector.get('$controller')('directoryViewCtrl', {
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
                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId +
                manageEmpUrlConfig.resources.allEmp+ "?employmentStatus=active&limit=20&offset=0").respond(200, allEmpResponse);

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

        describe('formatDate function tesing ', function () {
            it('formatDate function is defined ', function () {
                expect($scope.formatDate).toBeDefined();
            });

            it('formatDate funciton call ', function () {
                $scope.formatDate('28-12-2015');
            });
        });


        describe('flyout function testing',function(){
            it('flyout is defined',function(){
                expect($scope.flyout).toBeDefined();
            });

            it('flyout function call',function(){
                var val = true;
                $scope.flyout(val);
            });
        });

        describe('mailFlyout function testing',function(){
            it('mailFlyout is defined',function(){
                expect($scope.mailFlyout).toBeDefined();
            });

            it('mailFlyout function call',function(){
                var val = true;
                $scope.mailFlyout(val);
            });
        });

        describe('setClickedRow function testing',function(){
            it('setClickedRow is defined',function(){
                expect($scope.setClickedRow).toBeDefined();
            });

            it('setClickedRow function call',function(){
                var index = 0;
                $scope.setClickedRow(index);
            });
        });

        describe('getDirectoryDetail function testing',function(){
            it('getDirectoryDetail is defined',function(){
                expect($scope.getDirectoryDetail).toBeDefined();
            });

            it('getDirectoryDetail function call with success response',function(){
                spyOn($scope, 'positionSet');
                var val = true;
                var data = {"employeeId":"00001669553","name":"John,Lewis"};
                var response = {"data":{"designation":"SSS","employeeDetails":{"address":{"address1":null,"address2":null,"address3":null,"city":"Central City","country":"US","postalCode":"123456","shortLocationDesc":"HQ","state":"CA"},"department":"Testing","email":null,"phone":"9876543569","preferredName":"rajuuuu varma","seniority":null},"employeeId":"00001669553","employeeName":"varma raju","status":"A","managerId":"00001601722","managerName":"Dacia Alloway"},"_requestId":"92233","_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};
                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                     companyUrlConfig.resources.org + "/" + appConfig.companyId + "/" +
                                     data.employeeId + "/emp-details").respond(200,response);
                $scope.getDirectoryDetail(val,data);
                $httpBackend.flush();
                //expect($scope.positionSet).toHaveBeenCalled();
            });

            it('getDirectoryDetail function call with failure response',function(){
                var val = true;
                var data = {"employeeId":"00001669553"};
                var response = {"data":{},
                _statusCode: "400",
                _statusText : "OOPs Error",
                "_error":{"detailMessage":"error"}};
                $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                     companyUrlConfig.resources.org + "/" + appConfig.companyId + "/" +
                                     data.employeeId + "/emp-details").respond(400,response);
                $scope.getDirectoryDetail(val,data);
                $httpBackend.flush();
            });
        });

        describe('getKeyDownDirectoryDetail function testing',function(){
             it('getKeyDownDirectoryDetail is defined',function(){
                 expect($scope.getKeyDownDirectoryDetail).toBeDefined();
             });

             it('getKeyDownDirectoryDetail function call with event code as 38',function(){
                var HTML = '<table><tbody><tr class= "" data-emp-id="00001552807" data-index="1"></tr><tr class= "activeDirectory"></tr><tr class= "" data-emp-id="00001000485" data-index="2"></tr>';
                var element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();
                $scope.selectedRow = 0;
                var data = [
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
                            },{
                              "name": "Kruger,Kurt  ",
                              "employeeId": "00001000485",
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
                var event = {"keyCode":38};
                $scope.getKeyDownDirectoryDetail(data,event);

             });


             it('getKeyDownDirectoryDetail function call with event code as 40',function(){
                 var HTML = '<table><tbody><tr class= "" data-emp-id="00001552807" data-index="1"></tr><tr class= "activeDirectory"></tr><tr class= "" data-emp-id="00001000485" data-index="2"></tr>';
                 var element = $compile(HTML)($scope);
                 $body.append(element);
                 $rootScope.$digest();
                 $scope.selectedRow = 1;
                 var data = [
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
                                             },{
                                               "name": "Kruger,Kurt  ",
                                               "employeeId": "00001000485",
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
                 var event = {"keyCode":40};
                 $scope.getKeyDownDirectoryDetail(data,event);
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
                var evt = {
                    "currentTarget": ""
                };

                $scope.selectCheckBox(evt);
            });

            it('selectCheckBox function call without class',function(){
                var HTML = '<input type="checkbox" id="id1" class="icon-icon_checkmarkwithbox"></input>';
                var element = $compile(HTML)($scope);
                $body.append(element);
                $rootScope.$digest();
                var evt = {
                    "currentTarget": ""
                };
                $scope.selectCheckBox(evt);
            });
        });

        describe('$watch testing',function(){
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

        describe('closePopUp function testing',function(){
            it('closePopUp is defined',function(){
                expect($scope.closePopUp).toBeDefined();
            });

            it('closePopUp function call',function(){
                $scope.closePopUp();
            });
        });


        afterEach(function () {
            $body.empty();
        });
    });

}());
