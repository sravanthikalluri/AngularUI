/*
/!**
 * Created by jaya krishna on 11/4/2015.
 *!/
describe('GroupChangeRequest controller testing', function () {

    var $scope;
    var appConfig;
    var $rootScope;
    var $httpBackend;

    var deparmentsDataRes = [
        {
            "deptId": "1",
            "deptName": "Sales"
        }
    ];
    var locationsRes = [
        {
            "locationId": "1",
            "locationName": "Belmont, CA"
        }
    ];
    var leaveplanRes = [
        {
            "leavePlanId": "1",
            "leavePlanName": "leavePlan1"
        }
    ];

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('groupChangeRequestCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        $httpBackend.whenGET('assets/data/company/departments.json').respond(200, deparmentsDataRes);

        $httpBackend.whenGET('assets/data/company/locations.json').respond(200, locationsRes);

        $httpBackend.whenGET('assets/data/company/leavePlans.json').respond(200, leaveplanRes);

        $httpBackend.flush();
    });

    describe('isGroupChangeEditClick function testing', function () {
        it('isGroupChangeEditClick is defined', function () {
            expect($scope.isGroupChangeEditClick).toBeDefined();
        });

        it('isGroupChangeEditClick function call', function () {
            $scope.isGroupChangeEditClick();
            expect($scope.isGroupChangeEdit).toBeTruthy();
        });
    });

    describe('changeall function testing', function () {
        it('changeall is defined', function () {
            expect($scope.changeall).toBeDefined();
        });

        it('changeall function call with val as selloc', function () {
            $scope.groupChangeData = {
                "groupChangesDetails": [{
                    "deptOld": null,
                    "deptNew": null,
                    "employeeId": null,
                    "employeeName": "Almendarez,Erma G",
                    "position": "sfasdfasdfasdf",
                    "leavePlan": null,
                    "leavePlanNew": null,
                    "leavePlanOld": null,
                    "leavePlan50New": null,
                    "leavePlan50Old": null,
                    "leavePlan51New": null,
                    "leavePlan51Old": null,
                    "leavePlan52New": null,
                    "leavePlan52Old": null,
                    "leavePlan5XNew": null,
                    "leavePlan5XOld": null,
                    "leavePlan5YNew": null,
                    "leavePlan5YOld": null,
                    "leavePlanTypes": null,
                    "locationOld": "Tonic3-HQ",
                    "locationNew": "Remote NY",
                    "manager": "Addair,Chandra L",
                    "managerId": null
                }], "planTypes": null
            };
            var key = 'selloc';
            var val = 'del';
            $scope.changeall(key, val);
        });

        it('changeall function call with val as selDept', function () {
            $scope.groupChangeData = {
                "groupChangesDetails": [{
                    "deptOld": null,
                    "deptNew": null,
                    "employeeId": null,
                    "employeeName": "Almendarez,Erma G",
                    "position": "sfasdfasdfasdf",
                    "leavePlan": null,
                    "leavePlanNew": null,
                    "leavePlanOld": null,
                    "leavePlan50New": null,
                    "leavePlan50Old": null,
                    "leavePlan51New": null,
                    "leavePlan51Old": null,
                    "leavePlan52New": null,
                    "leavePlan52Old": null,
                    "leavePlan5XNew": null,
                    "leavePlan5XOld": null,
                    "leavePlan5YNew": null,
                    "leavePlan5YOld": null,
                    "leavePlanTypes": null,
                    "locationOld": "Tonic3-HQ",
                    "locationNew": "Remote NY",
                    "manager": "Addair,Chandra L",
                    "managerId": null
                }], "planTypes": null
            };
            var key = 'DEP';
            var val = 'del';
            $scope.changeall(key, val);
        });
    });

    describe('cancel function testing', function () {
        it('cancel is defined', function () {
            expect($scope.cancel).toBeDefined();
        });

        it('cancel funciton call', function () {
            $scope.cancel();

            expect($scope.selectedAll).toBeDefined();
            expect($scope.checked).toBeDefined();
            expect($scope.showglobaldrpdown).toBeDefined();
            expect($scope.showglobaldrpdownloc).toBeDefined();
            expect($scope.showglobaldrpdownleave).toBeDefined();
            expect($scope.showglobaldrpdownleavesick).toBeDefined();
            expect($scope.selectedCount).toBeDefined();


        });

        it('cancel function call with groupChange data', function () {
            $scope.groupChangeData = [{
                checked: true,
                departmentChangesTo: 'Sales11',
                locationChangesTo: 'Belmont, CA',
                ptoChangeTo: '',
                sickLeaveChangesTo: '',
                employeeId: 1
            }, {
                checked: true,
                departmentChangesTo: 'Sales11',
                locationChangesTo: 'Belmont, CA',
                ptoChangeTo: '',
                sickLeaveChangesTo: '',
                employeeId: 1
            }];
            $scope.cancel();
            expect($scope.groupChangeData[0].checked).toBeFalsy();
            expect($scope.groupChangeData[1].checked).toBeFalsy();
        });
    });

    describe('selectAll function testing', function () {
        it('selectAll is defined', function () {
            expect($scope.selectAll).toBeDefined();
        });

        it('selectAll function call', function () {
            var val = 'all';
            $scope.groupChangeData = {
                "groupChangesDetails": [{
                    "deptOld": null,
                    "deptNew": null,
                    "employeeId": null,
                    "employeeName": "Almendarez,Erma G",
                    "position": "sfasdfasdfasdf",
                    "leavePlan": null,
                    "leavePlanNew": null,
                    "leavePlanOld": null,
                    "leavePlan50New": null,
                    "leavePlan50Old": null,
                    "leavePlan51New": null,
                    "leavePlan51Old": null,
                    "leavePlan52New": null,
                    "leavePlan52Old": null,
                    "leavePlan5XNew": null,
                    "leavePlan5XOld": null,
                    "leavePlan5YNew": null,
                    "leavePlan5YOld": null,
                    "leavePlanTypes": null,
                    "locationOld": "Tonic3-HQ",
                    "locationNew": "Remote NY",
                    "manager": "Addair,Chandra L",
                    "managerId": null
                }], "planTypes": null
            };
            $scope.selectAll(val);
            expect($scope.SelectAll).toEqual(val);
        });
    });

    describe('dateChanged function testing', function () {
        it('dateChanged is defined', function () {
            expect($scope.dateChanged).toBeDefined();
        });

        it('dateChanged function call', function () {
            var val = 'all';
            $scope.dateChanged(val);
            expect($scope.selectedDate).toEqual(val);
        });
    });

    describe('ChangedDate function testing', function () {
        it('ChangedDate is defined', function () {
            expect($scope.ChangedDate).toBeDefined();
        });

        it('ChangedDate function call', function () {
            var val = 'all';
            $scope.ChangedDate(val);
            expect($scope.effectiveDate).toEqual(val);
        });
    });

    describe('selectedEmpDepData function testing', function () {
        it('selectedEmpDepData is defined', function () {
            expect($scope.selectedEmpDepData).toBeDefined();
        });

        it('selectedEmpDepData function call with type as dep', function () {
            var type = 'DEP';
            var employeeSelected = {"deptNewId": "456", "employeeId": "123"};
            $scope.selectedEmpDepData(employeeSelected, type);
        });

        it('selectedEmpDepData function call with type as LOC', function () {
            var type = 'LOC';
            var employeeSelected = {"deptNewId": "456", "employeeId": "123", "locationId": "789"};
            $scope.selectedEmpDepData(employeeSelected, type);
        });

        it('selectedEmpDepData function call with type as LPC', function () {
            var type = 'LPC';
            var employeeSelected = {"deptNewId": "456", "employeeId": "123", "locationId": "789"};
            $scope.selectedEmpDepData(employeeSelected, type);
        });
    });

    describe('saveGroupChangeData function testing', function () {
        it('saveGroupChangeData is defined', function () {
            expect($scope.saveGroupChangeData).toBeDefined();
        });

        it('saveGroupChangeData function call with success response', function () {
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
            var successResponse = {"_statusCode": "200", "_statusText": "OK"};
            $httpBackend.when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId +
                "/" + appConfig.userId+'?enableValidation=true', $scope.selectedEmp).respond(200, successResponse);
            $scope.saveGroupChangeData();
            $httpBackend.flush();

        });

        it('saveGroupChangeData function call with failure response', function () {
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
            var failureResponse = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            $httpBackend.when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.managegroup + "/" + appConfig.companyId +
                "/" + appConfig.userId+'?enableValidation=true', $scope.selectedEmp).respond(400, failureResponse);
            $scope.saveGroupChangeData();
            $httpBackend.flush();

        });
    });


});
*/
