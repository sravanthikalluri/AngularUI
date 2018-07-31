/*
/!**
 * Created by jaya krishna on 11/4/2015.
 *!/
describe('ManageGroups controller testing', function() {

    var $scope;
    var appConfig;
    var $rootScope;
    var $httpBackend;

    var manageGroupDataRes = {"data":[{"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null},{"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-19","employeeCount":1,"status":"Completed","submittedOn":null,"submittedBy":null},
                                                        {"changeType":"Department Change","changeTypeCode":"DEP","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null},{"changeType":"Leave Plan Change","changeTypeCode":"LPC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null}],"_statusCode":"200","_statusText":"OK"};
    var createGroupChangeDataRes = {data :  [{
        "employeeId": "1",
        "employeeName": "Abbott, Tony EMP ID: 0000123685",
        "position": "Analyst",
        "directManager": "Blaire, Jen",
        "department": "Consulting",
        "location": "Belmont, CA",
        "leavePlan": "Leave Plan1"
    }],
        _statusCode : "200"
    };
    var departmentsDataRes = { data : [{
        "deptId": "1",
        "deptName": "Sales"
    }],
        _statusCode : "200"
    };
    var locationsDataRes = [{
        "locationId": "1",
        "locationName": "Belmont, CA"
    }];
    var leaveplanRes = [{
        "leavePlanId": "1",
        "leavePlanName": "leavePlan1"
    }];

    var manageGroupServiceResponse = {
        "data": [
            {
                "changeType": "Location Change",
                "changeTypeCode": "LOC",
                "effectiveDate": "2015-12-23",
                "employeeCount": 1,
                "status": "Pending",
                "submittedOn": null,
                "submittedBy": null
            },
            {
                "changeType": "Location Change",
                "changeTypeCode": "LOC",
                "effectiveDate": "2015-12-19",
                "employeeCount": 1,
                "status": "Completed",
                "submittedOn": null,
                "submittedBy": null
            }
        ],
        "_statusCode": "200",
        "_statusText": "OK"
    };

    beforeEach(function() {
        module('TrinetPassport');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('manageGroupsCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $injector.get('sharedProperties');
        });

        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                             manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" + appConfig.userId + manageEmpUrlConfig.resources.groupchanges).respond(200, manageGroupDataRes);

        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" + appConfig.userId +  manageEmpUrlConfig.resources.managegroupdep).respond(200, createGroupChangeDataRes);


        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +  globalUrlConfig.resources.company  +  "/" +
            appConfig.companyId  + "/"  +  profileUrlConfig.resources.departments).respond(200, departmentsDataRes);



        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            appConfig.companyId + globalUrlConfig.resources.locations).respond(200, locationsDataRes);

        $httpBackend.whenGET('assets/data/company/leavePlans.json').respond(200, leaveplanRes);


        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" + appConfig.userId +  manageEmpUrlConfig.resources.groupchanges)
            .respond(200, manageGroupServiceResponse);



        $httpBackend.flush();
    });

     describe('dateChanged function testing', function() {
        it('dateChanged is defined', function() {
            expect($scope.dateChanged).toBeDefined();
        });

        it('dateChanged function call with if condition true', function() {
            var value = '11/27/2015';
            $scope.dateChanged(value);
            expect($scope.selectedDate).toEqual(value);
        });

        it('dateChanged function call with if condition false', function() {
            var value = '11/27/2015';
            $scope.dateChanged(value);
            expect($scope.selectedDate).toEqual(value);
        });
    });

     describe('requestGroupChange function testing', function() {
            it('requestGroupChange is defined', function() {
                expect($scope.requestGroupChange).toBeDefined();
            });

            it('requestGroupChange function call', function() {
                $scope.requestGroupChange();

                expect($scope.requestGroupChangeFlag).toBeDefined();
                expect($scope.effectiveNewDate).toBeDefined();
            });
        });

     describe('searchPos function testing', function() {
            it('searchPos is defined', function() {
                expect($scope.searchPos).toBeDefined();
            });

            it('searchPos function call', function() {
                var value = 123;
                $scope.searchPos(value);

                expect($scope.searchbox).toBeDefined();
                expect($scope.searchbox).toEqual(value);
            });
        });

     describe('textboxhide function testing', function() {
            it('textboxhide is defined', function() {
                expect($scope.textboxhide).toBeDefined();
            });

            it('textboxhide function call ', function() {
                $scope.textboxhide();

                expect($scope.searchbox).toBeDefined();
                expect($scope.dropdown).toBeDefined();


                expect($scope.searchbox).toBeFalsy();
                expect($scope.dropdown).toBeFalsy();

            });
        });

     describe('dropdownlocationfun function testing', function() {
            it('dropdownlocationfun is defined', function() {
                expect($scope.dropdownlocationfun).toBeDefined();
            });

            it('dropdownlocationfun function call ', function() {
                $scope.dropdownlocationfun();

                expect($scope.locationfiltercond).toBeDefined();

                expect($scope.locationfiltercond).toBeTruthy();
            });
        });

     describe('visibleManageGroups function testing', function() {
            it('visibleManageGroups is defined', function() {
                expect($scope.visibleManageGroups).toBeDefined();
            });

            it('visibleManageGroups function call', function() {
                $scope.visibleManageGroups();

                expect($scope.groupChangeRequest).toBeDefined();



            });
        });

     describe('closePanel function testing', function() {
            it('closePanel is defined', function() {
                expect($scope.closePanel).toBeDefined();
            });

            it('closePanel function call', function() {
                $scope.closePanel();
            });
        });

     describe('cancelRequest function testing', function() {
            it('cancelRequest is defined', function() {
                expect($scope.cancelRequest).toBeDefined();
            });

            it('cancelRequest function call', function() {
                $scope.createGroupChangeData = [{}];
                $scope.cancelRequest();
            });
        });

     describe('isGroupChangeEditClick function testing', function() {
            it('isGroupChangeEditClick is defined', function() {
                expect($scope.isGroupChangeEditClick).toBeDefined();
            });

            it('isGroupChangeEditClick is called', function() {
                $scope.isGroupChangeEditClick();
                expect($scope.isGroupChangeEdit).toBeTruthy();
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

     describe('selectedEmpDepData function testing',function(){
            it('selectedEmpDepData is defined',function(){
              expect($scope.selectedEmpDepData).toBeDefined();
            });

            it('selectedEmpDepData function call with type as dep',function(){
                var type = 'DEP';
                var employeeSelected = {"deptNewId":"456","employeeId":"123"};
                $scope.selectedEmpDepData(employeeSelected,type);
            });

            it('selectedEmpDepData function call with type as LOC',function(){
                var type = 'LOC';
                var employeeSelected = {"deptNewId":"456","employeeId":"123","locationId":"789"};
                $scope.selectedEmpDepData(employeeSelected,type);
            });

            it('selectedEmpDepData function call with type as LPC',function(){
                var type = 'LPC';
                var employeeSelected = {"deptNewId":"456","employeeId":"123","locationId":"789"};
                $scope.selectedEmpDepData(employeeSelected,type);
            });
        });

     describe('ChangedDate function testing', function () {
            it('ChangedDate is defined', function () {
                expect($scope.ChangedDate).toBeDefined();

                var val = 2;
                $scope.ChangedDate(val);
            });
        });

     describe('dropdownfun function testing',function(){
            it('dropdownfun is defined',function(){
                expect($scope.dropdownfun).toBeDefined();
            });

            it('dropdownfun function call',function(){
                $scope.dropdownfun();
                expect($scope.filtercond).toBeDefined();
                expect($scope.filtercond).toBeTruthy();
            });
        });

     describe('visibleGroupChange function testing',function(){
            it('visibleGroupChange is defined',function(){
                expect($scope.visibleGroupChange).toBeDefined();
            });

            it('visibleGroupChange function call for location with success response',function(){
                var data = {"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};

                var effectiveDate = '2015-12-23';
                var response = {"data":{"groupChangesDetails":[{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Almendarez,Erma G","position":"sfasdfasdfasdf","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":"Tonic3-HQ","locationNew":"Remote NY","manager":"Addair,Chandra L","managerId":null}],"planTypes":null},"_statusCode":"200","_statusText":"OK"};

                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangesloc + effectiveDate).respond(200,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });

            it('visibleGroupChange function call for location with failure response',function(){
                var data = {"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};
                var effectiveDate = '2015-12-23';
                var response = {"data":{"groupChangesDetails":[{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Almendarez,Erma G","position":"sfasdfasdfasdf","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":"Tonic3-HQ","locationNew":"Remote NY","manager":"Addair,Chandra L","managerId":null}],"planTypes":null},"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangesloc + effectiveDate).respond(400,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });

            it('visibleGroupChange function call with status as completed',function(){
                var data = {"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-19","employeeCount":1,"status":"Completed","submittedOn":null,"submittedBy":null};
                $scope.visibleGroupChange(data);
            });

            it('visibleGroupChange function call for department with success response',function(){
                var data = {"changeType":"Department Change","changeTypeCode":"DEP","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};
                var response = {"data":{"groupChangesDetails":[{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Aguliar,Ara  ","position":"Ux Designer","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Alloway,Dacia  ","position":"Uxa","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Anast,Fallon J","position":"Project Manager 2c","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Albritton,Adrianne  ","position":"Usability Analyst Level 3a","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Aningalan,Dalene  ","position":"Copywriter","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null}],"planTypes":null},"_statusCode":"200","_statusText":"OK"};

                var effectiveDate = '2015-12-23';
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangesdep + effectiveDate).respond(200,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });

            it('visibleGroupChange function call for department with failure response',function(){
                var data = {"changeType":"Department Change","changeTypeCode":"DEP","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};
                var response = {"data":{"groupChangesDetails":[{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Aguliar,Ara  ","position":"Ux Designer","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Alloway,Dacia  ","position":"Uxa","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Anast,Fallon J","position":"Project Manager 2c","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Albritton,Adrianne  ","position":"Usability Analyst Level 3a","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":"No Change","deptNew":"Admin","employeeId":null,"employeeName":"Aningalan,Dalene  ","position":"Copywriter","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null}],"planTypes":null},"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                var effectiveDate = '2015-12-23';
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangesdep + effectiveDate).respond(400,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });

            it('visibleGroupChange function call for leave plan with success response',function(){
                var data = {"changeType":"Leave Plan Change","changeTypeCode":"LPC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};
                var response = {"data":{"groupChangesDetails":[{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null}],"planTypes":["Leapfrog","Leapfrog"]},"_statusCode":"200","_statusText":"OK"};

                var effectiveDate = '2015-12-23';
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangeslpc + effectiveDate).respond(200,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });

            it('visibleGroupChange function call for leave plan with failure response',function(){
                var data = {"changeType":"Leave Plan Change","changeTypeCode":"LPC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null};
                var response = {"data":{"groupChangesDetails":[{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":null,"leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":null,"leavePlan51Old":null,"leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":"SICK","leavePlan50Old":"No Change","leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":" ","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null},{"deptOld":null,"deptNew":null,"employeeId":null,"employeeName":"Anneler,Arlen A","position":"Dev","leavePlan":null,"leavePlanNew":null,"leavePlanOld":null,"leavePlan50New":null,"leavePlan50Old":null,"leavePlan51New":"VAC","leavePlan51Old":"No Change","leavePlan52New":null,"leavePlan52Old":null,"leavePlan5XNew":null,"leavePlan5XOld":null,"leavePlan5YNew":null,"leavePlan5YOld":null,"leavePlanTypes":null,"locationOld":null,"locationNew":null,"manager":"Almendarez,Erma G","managerId":null}],"planTypes":["Leapfrog","Leapfrog"]},"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};

                var effectiveDate = '2015-12-23';
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                     manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId + "/" +
                                     appConfig.userId + manageEmpUrlConfig.resources.groupchangeslpc + effectiveDate).respond(400,response);
                $scope.visibleGroupChange(data);
                $httpBackend.flush();
            });
        });

        describe('changeallCG function testing',function(){
            it('changeallCG is defined',function(){
                expect($scope.changeallCG).toBeDefined();
            });

            it('changeallCG function call with val as selloc',function(){
                $scope.createGroupChangeData ={"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer"},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer"}]};
                var key = 'selloc';
                var val = '123';
                $scope.changeallCG(key,val);
            });

            it('changeallCG function call with val as selDept',function(){
                $scope.createGroupChangeData ={"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer"},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer"}]};
                var key = 'DEP';
                var val = '123';
                $scope.changeallCG(key,val);
            });
        });

        describe('saveData function testing',function(){
            it('saveData is defined',function(){
                expect($scope.saveData).toBeDefined();
            });

            it('saveData function call with success response',function(){
                $scope.selectedEmp = {
                                         "changeType": "LOC",
                                         "effectiveDate": "2015-12-11",
                                         "employees": [
                                             {
                                                 "deptId": "04171202",
                                                 "employeeId": "00001000484",
                                                 "locationId": "00000003S7"
                                             }
                                         ]
                                     };
                var successResponse = {"_statusCode":"200","_statusText":"OK"};
                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                        manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId +
                                        "/" + appConfig.userId+'?enableValidation=true', $scope.selectedEmp).respond(200,successResponse);
                $scope.saveData();
                $httpBackend.flush();

            });

            it('saveData function call with failure response',function(){
                $scope.selectedEmp = {
                                         "changeType": "LOC",
                                         "effectiveDate": "2015-12-11",
                                         "employees": [
                                             {
                                                 "deptId": "04171202",
                                                 "employeeId": "00001000484",
                                                 "locationId": "00000003S7"
                                             }
                                         ]
                                     };
                var failureResponse = {"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                        manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId +
                                        "/" + appConfig.userId+'?enableValidation=true', $scope.selectedEmp).respond(400,failureResponse);
                $scope.saveData();
                $httpBackend.flush();

            });
        });

        describe('getMoreData function testing',function(){
            it('getMoreData is defined',function(){
                expect($scope.getMoreData).toBeDefined();
            });

            it('getMoreData function call with success response',function(){
                appConfig.companyId = "31T";
                appConfig.userId = "00001000483";
                var res = {"data":[{"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-23","employeeCount":1,"status":"Pending","submittedOn":null,"submittedBy":null},{"changeType":"Location Change","changeTypeCode":"LOC","effectiveDate":"2015-12-19","employeeCount":1,"status":"Completed","submittedOn":null,"submittedBy":null}],"_statusCode":"200","_statusText":"OK"};
                $httpBackend.whenGET("/api-employee/v1/manage-group/31T/00001000483/group-changes?offset=0&limit=5").respond(200,res);
                $scope.getMoreData();
                $httpBackend.flush();
            });

            it('getMoreData function call with failure response',function(){
                var res = {"data":[],"_statusCode":"400","_statusText":"OK","_error":{"detailMessage":"error"}};
                $httpBackend.whenGET("/api-employee/v1/manage-group/31T/00001000483/group-changes?offset=0&limit=5").respond(400,res);
                $scope.getMoreData();
                $httpBackend.flush();
            });
        });

        describe('checkAllEmployees function testing',function(){
            it('checkAllEmployees is defined',function(){
                expect($scope.checkAllEmployees).toBeDefined();
            });

            it('checkAllEmployees function call with all as true',function(){
                var all = true;
                $scope.createGroupChangeData = {"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true}]};
                $scope.checkAllEmployees(all);
            });

            it('checkAllEmployees function call with all as false',function(){
                var all = false;
                $scope.createGroupChangeData = {"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true}]};
                $scope.checkAllEmployees(all);
            });
        });

        describe('showManageEmpColListfun function testing',function(){
            it('showManageEmpColListfun is defined',function(){
                expect($scope.showManageEmpColListfun).toBeDefined();
            });

            it('showManageEmpColListfun function call',function(){
                $scope.showManageEmpColListfun();
            });
        });

        describe('singleCheck function testing',function(){
            it('singleCheck is defined',function(){
                expect($scope.singleCheck).toBeDefined();
            });

            it('singleCheck function call with selected as true',function(){
                var val = 0;
                $scope.createGroupChangeData = {"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":true}]};
                $scope.singleCheck(val);
            });

            it('singleCheck function call with selected as false',function(){
                var val = 0;
                $scope.createGroupChangeData = {"employees":[{"deptId":"9CKY1@","deptName":"vbxcvb","deptShortDesc":"cvbvcxb","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"W000000RW9","locationName":"sf","locationShortDesc":"sfsd","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":false},{"deptId":"9CKYUADEPT","deptName":"Admin","deptShortDesc":"Admn","employeeId":"00001636048","employeeName":"Aase,Caridad  ","locationId":"0000001REY","locationName":"Remote FL","locationShortDesc":"Leapfrog","managerId":"00001669553","managerName":"Smith,Zooly ","position":"Graphic Designer","Selected":false}]};
                $scope.singleCheck(val);
            });
        });
});*/
