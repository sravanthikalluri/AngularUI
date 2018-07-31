/*
/!**
 * Created by jaya krishna on 11/3/2015.
 *!/
describe('Roles Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    var empRolesDataRes = {
        "data": [{"role": "BRIO_RPTS"}],
        "_statusCode": "200",
        "_statusText": "OK"
    };
    var rolesDataRes = {
            "data": [{"role": "CDM", "roleDesc": "Benefit Decision Maker"}], "_statusCode": "200", "_statusText": "OK"
        },
        rolesDeptMethodResponse = {
            "data": [{"deptId": "04172200", "deptName": "Marketing"}],
            "_statusCode": "200",
            "_statusText": "OK"
        },
        rolesLocationMethodResponse = {
            "data": [{
                "locationId": "00000005M8",
                "locationName": "/HR Passport Perm-Remote PA"
            }], "_statusCode": "200", "_statusText": "OK"
        };


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.childParentAlertMsg = function(data){
                return data;
            };
            $injector.get('$controller')('rolesCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'roles'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

        appConfig.companyId = "31T";
        appConfig.userId = "00001000483";


        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/" +
            $scope.appUserId + manageEmpUrlConfig.resources.rolesAll).respond(200, empRolesDataRes);


        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +
            globalUrlConfig.resources.company + "/" + appConfig.companyId + "/" +
            appConfig.userId + manageEmpUrlConfig.resources.roles).respond(200, rolesDataRes);


        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +
            globalUrlConfig.resources.company + "/" + appConfig.companyId + globalUrlConfig.resources.departments).respond(200, rolesDeptMethodResponse);

        $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase +
            globalUrlConfig.resources.company + "/" + appConfig.companyId + globalUrlConfig.resources.locations).respond(200, rolesLocationMethodResponse);


        $httpBackend.flush();
    });

    describe('showAssignRoles function testing ', function () {
        it('showAssignRoles is defined', function () {
            expect($scope.showAssignRoles).toBeDefined();
        });

        it('showAssignRoles function call', function () {
            $scope.showAssignRoles();

            expect($scope.showAssign).toBeDefined();
            expect($scope.showAssign).toBeTruthy();

            expect($scope.noRolesAssigned).toBeDefined();
            expect($scope.noRolesAssigned).toBeTruthy();
        });
    });

    describe('ShowHide function testing ', function () {
        it('ShowHide is defined', function () {
            expect($scope.ShowHide).toBeDefined();
        });

        it('ShowHide function call', function () {
            $scope.ShowHide();

            expect($scope.IsVisible).toBeDefined();
            expect($scope.IsVisible).toBeTruthy();

            expect($scope.IsVisible1).toBeDefined();
            expect($scope.IsVisible1).toBeFalsy();
        });
    });

    describe('update function testing ', function () {
        it('update is defined', function () {
            expect($scope.update).toBeDefined();
        });

        it('update function is called', function () {
            $scope.array = [];
            $scope.array_ = [];
            $scope.update();
        });
    });

    describe('addType function testing ', function () {
        it('addType is defined', function () {
            expect($scope.addType).toBeDefined();
        });

        it('addType function call with out a parameter ', function () {
            $scope.addType();

            expect($scope.getvalue).toBeUndefined();
        });

        it('addType function call with a parameter as true', function () {
            $scope.addType(true);

            expect($scope.getvalue).toBeDefined();
            expect($scope.getvalue).toBeTruthy();
        });

        it('addType function call with a parameter as false', function () {
            $scope.addType(false);

            expect($scope.getvalue).toBeDefined();
            expect($scope.getvalue).toBeFalsy();
        });
    });

    describe('openHrSecurity function testing ', function () {
        it('openHrSecurity is defined', function () {
            expect($scope.openHrSecurity).toBeDefined();
        });

        it('openHrSecurity function call with out a parameter', function () {
            $scope.openHrSecurity();
        });

        it('openHrSecurity function call with a parameter isChecked as false', function () {
            var isChecked = false;
            var roleId = 'HRSECURITY';
            $scope.openHrSecurity(isChecked, roleId);
        });

        it('openHrSecurity function call with a parameter isChecked as true', function () {
            var isChecked = true;
            var roleId = 'HRSECURITY';
            $scope.openHrSecurity(isChecked, roleId);
        });
    });

    describe('saveRolesDataObject function testing ', function () {
        it('saveRolesDataObject should be defined', function () {
            expect($scope.saveRolesDataObject).toBeDefined();
        });

        it('saveRolesDataObject function call', function () {
            $scope.rolesData = [{
                "role": "BRIO_RPTS",
                "isChecked": true,
                "deptId": "04172200",
                "location": "00000005M8"
            }];
            var url = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId +
                "/" + appConfig.userId + manageEmpUrlConfig.resources.rolesAll+'&enableValidation=true';
            var updateResponse = {_statusCode: 200, _statusMessage: 'OK'};
            var data = {"employeeRoleCreateList":[{"roles":[{"role":"BRIO_RPTS"},{"role":"BRIO_RPTS","deptId":"04172200","location":null},{"role":"BRIO_RPTS","deptId":null,"location":"00000005M8"}]}]};
            $httpBackend.when('PUT', url, data).respond(200, updateResponse);
            $scope.saveRolesDataObject();
            $httpBackend.flush();
        });

        it('saveRolesDataObject function call yielding failure', function () {
            $scope.rolesData = [{
                "role": "BRIO_RPTS",
                "isChecked": true,
                "deptId": "04172200",
                "location": "00000005M8"
            }];
            var url = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId +
                "/" + appConfig.userId + manageEmpUrlConfig.resources.rolesAll+'&enableValidation=true';
            var updateResponse = {
                "data": [],
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };
            var data = {"employeeRoleCreateList":[{"roles":[{"role":"BRIO_RPTS"},{"role":"BRIO_RPTS","deptId":"04172200","location":null},{"role":"BRIO_RPTS","deptId":null,"location":"00000005M8"}]}]};
            $httpBackend.when('PUT', url, data).respond(400, updateResponse);
            $scope.saveRolesDataObject();
            $httpBackend.flush();

        });
    });

    /!*describe('sendDept function testing ', function () {
        it('sendDept is defined', function () {
            expect($scope.sendDept).toBeDefined();
        });

        it('sendDept function call', function () {
            var obj = {
                    role: 'Emp'
                },
                value = 1;
            $scope.sendDept(obj, value);
        });
    });

    describe('sendLoc function testing ', function () {
        it('sendLoc is defined', function () {
            expect($scope.sendLoc).toBeDefined();
        });

        it('sendLoc function call', function () {
            var obj = {
                    role: 'Emp'
                },
                value = 1;
            $scope.sendLoc(obj, value);
        });
    });*!/

    describe('filterDept function testing ', function () {
        it('filterDept is defined', function () {
            expect($scope.filterDept).toBeDefined();
        });

        it('filterDept function call ', function () {
            var deptId = 1;
            $scope.departments = [
                {
                    deptId: 1
                },
                {
                    deptId: 11
                }
            ];
            $scope.filterDept(deptId);
        });
    });

    describe('filterLocation function testing', function () {
        it('filterLocation is defined ', function () {
            expect($scope.filterLocation).toBeDefined();
        });

        it('filterLocation function call', function () {
            var location = 'Hyd';
            $scope.locations = [{
                locationId: 'Hyd'
            }];
            $scope.filterLocation(location);
        });
    });
});
*/
