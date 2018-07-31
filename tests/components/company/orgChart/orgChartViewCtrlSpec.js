/**
 * Created by Santosh on 11/3/2015.
 */


'use strict';
describe('Organization Chart  View Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        $routeParams,
        $location;
    var response = {
        "data": {
            "colleagues": [{
                "designation": "Tester",
                "employeeId": "00001000483",
                "employeeName": "Aracely Aldo",
                "status": "A",
                "teamMemberCount": 0
            }, {
                "designation": "Tester",
                "employeeId": "00001000483",
                "employeeName": "Aracely Aldo",
                "status": "A",
                "teamMemberCount": 0
            }, {
                "designation": "Applications Development Mgr",
                "employeeDetails": {
                    "address": {
                        "address1": "100 Clipper Dr",
                        "address2": null,
                        "address3": null,
                        "city": "Belmont",
                        "country": "US",
                        "postalCode": "94002",
                        "shortLocationDesc": "Belmont,CA",
                        "state": "CA"
                    },
                    "department": "0417041739",
                    "email": "employee@31T.com",
                    "phone": null,
                    "preferredName": "Cristy Acebo",
                    "seniority": "11 years, 2 months, 6 days"
                },
                "employeeId": "00001028491",
                "employeeName": "Cristy Acebo",
                "status": "A",
                "teamMemberCount": 7
            }],
            "managers": [{
                "designation": "Tech Support Specialist",
                "employeeId": "00001035193",
                "employeeName": "Eldon Aguiniga",
                "relation": "wksupr",
                "status": "A"
            }, {
                "designation": "Sales Support",
                "employeeId": "00001005513",
                "employeeName": "Fannie Amadon",
                "relation": "supr",
                "status": "A"
            }],
            "members": [{
                "designation": "Software Application Developer",
                "employeeId": "1003882",
                "employeeName": "Blanca Ahumada",
                "relation": "prox",
                "status": "A"
            }, {
                "designation": "Software Application Developer",
                "employeeId": "1042621",
                "employeeName": "Elenore Ajani",
                "status": "A"
            }],
            "departmentHeads": [{
                "designation": "Software Application Developer",
                "employeeId": "1003882",
                "employeeName": "Blanca Ahumada",
                "relation": "prox",
                "status": "A"
            }, {
                "designation": "Software Application Developer",
                "employeeId": "1042621",
                "employeeName": "Elenore Ajani",
                "status": "A"
            }]
        }, "_statusCode": "200", "_statusText": "OK"
    };
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

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            appConfig.userId = "00001000483";
            appConfig.companyId = "31T";
            $routeParams = $injector.get('$routeParams');
            $location = $injector.get('$location');
            $injector.get('$controller')('orgChartViewCtrl', {$scope: $scope});

        });

        $routeParams = {selectedTab: 'abc', empId: 123};
        $scope.isCompanyView = true;
        $httpBackend.whenGET(companyUrlConfig.companyApi + '/api-company/v1/organization/' + appConfig.companyId + '/' + appConfig.userId + '/org-chart?terminated=' + $scope.isTerminates)
            .respond(200, response);

        $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase +
            homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' +
            appConfig.userId + homeUrlConfig.resources.perm)
            .respond(200,permissionResponse);



        $httpBackend.flush();

    });

    describe('if condition testing', function () {

        it('when empId is passed', function () {

            $routeParams = {empId: 123};
            toggleSelectTab($routeParams);

            expect($scope.isCompanyView).toBeTruthy();
            expect($scope.hideme).toBeTruthy();
        });

        it('when empId is not passed', function () {

            $routeParams = {};
            toggleSelectTab($routeParams);

            expect($scope.isCompanyView).toBeFalsy();
            expect($scope.hideme).toBeFalsy();
        })
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
            $scope.userId = '1234566';
            $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase +
                homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' +
                $scope.userId + homeUrlConfig.resources.perm)
                .respond(200,permissionResponse);
            $scope.getEmployeePermissions($scope.userId );
            $httpBackend.flush();
        });

        it('getEmployeePermissions function call with failure response',function(){
            var permissionResponse = {
                data: [],
                _statusCode: "400",
                _statusText: "OOPs Error",
                "_error": {"detailMessage": "error"}
            };
            $scope.userId = '1234566';
            $httpBackend.whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase +
                homeUrlConfig.resources.menu + '/' + appConfig.companyId + '/' +
                $scope.userId + homeUrlConfig.resources.perm)
                .respond(400,permissionResponse);
            $scope.getEmployeePermissions($scope.userId );
            $httpBackend.flush();
        });
    });

    describe('resetFn function testing', function () {

        it('resetFn is defined', function () {

            expect($scope.resetFn).toBeDefined();
        });

        it('resetFn function call', function () {
            $scope.resetFn();
        });
    });

    describe('getManagerList function testing', function () {

        it('getManagerList is defined', function () {

            expect($scope.getManagerList).toBeDefined();
        });

        it('getManagerList function call', function () {

            var employeeId = 123;
            var colleagueList = [{
                                 "designation": "Tester",
                                 "employeeId": "00001000483",
                                 "employeeName": "Aracely Aldo",
                                 "status": "A",
                                 "teamMemberCount": 0
                             }, {
                                 "designation": "Tester",
                                 "employeeId": "00001000483",
                                 "employeeName": "Aracely Aldo",
                                 "status": "A",
                                 "teamMemberCount": 0
                             }];
            var desc = 'hr'

            $scope.getManagerList(employeeId, colleagueList, desc);
            expect($scope.currentSelectedEmp).toBeDefined();
            expect($scope.currentSelectedEmp).toEqual(employeeId);

        });


    });

    describe('getMemberList function testing', function () {

        it('getMemberList is defined', function () {

            expect($scope.getMemberList).toBeDefined();
        });

        it('getMemberList function call with success response', function () {
            spyOn($scope,'change');
            var employeeId = '00001000483';
            $scope.deptId = '123';
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                 companyUrlConfig.resources.org + "/" + appConfig.companyId +
                                 companyUrlConfig.resources.orgChart + "?deptId=" + $scope.deptId+"&headId="+employeeId)
                .respond(200, response);
            $scope.getMemberList(employeeId);
            $httpBackend.flush();
            expect($scope.orgChart.members).toEqual(response.data.members);
            expect($scope.change).toHaveBeenCalled();
        });

        it('getMemberList function call with failure response', function () {
            var employeeId = '00001000483';
            $scope.deptId = '123';
            var failureResponse = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                                 companyUrlConfig.resources.org + "/" + appConfig.companyId +
                                 companyUrlConfig.resources.orgChart + "?deptId=" + $scope.deptId+"&headId="+employeeId)
                .respond(400, failureResponse);
            $scope.getMemberList(employeeId);
            $httpBackend.flush();
        });
    });

    describe('onOFF function testing', function () {

        it('onOFF is defined', function () {

            expect($scope.onOFF).toBeDefined();
        });

        it('onOFF function call', function () {

            $scope.onOFF();
            expect($scope.isTerminates).toBeTruthy();
        });
    });

    describe('init function testing', function () {

        it('init is defined', function () {

            expect($scope.init).toBeDefined();
        });

        it('init function call', function () {

            var employeeId = appConfig.userId;
            var companyId = appConfig.companyId;
            var isClicked = true;

            var eId = '123',
                cId = '111';

            $scope.init(employeeId, companyId, isClicked);
            expect($scope.isInitCalled).toBeTruthy();
            expect($scope.clickedEmployeeID).toEqual(employeeId);
            if (angular.isDefined(employeeId) && angular.isDefined(companyId)) {
                expect(eId).toEqual('123');
                expect(cId).toEqual('111');
            } else {
                if (typeof $location.search().empId !== 'undefined') {
                    expect(eId).toEqual($location.search().empId);
                } else {
                    expect(eId).toEqual(appConfig.userId);
                }
                expect(cId).toEqual(appConfig.companyId);
            }

            expect($scope.logedInEmployee.cId).toEqual(appConfig.companyId);
            expect($scope.logedInEmployee.eId).toEqual(appConfig.userId);

            if ($scope.clickedEmployeeID !== $scope.logedInEmployee.eId &&
                typeof employeeId !== 'undefined') {
                expect($scope.visibleStatus.viewMyself).toBeTruthy();
            } else {
                expect($scope.visibleStatus.viewMyself).toBeFalsy();
            }
        });
    });

    describe('cancel function testing', function () {

        it('cancel is defined', function () {

            expect($scope.cancel).toBeDefined();
        });

        it('cancel function call', function () {

            $scope.cancel();
            expect($scope.isPreviousCalled).toBeFalsy();
        });
    });

    describe('openEmployeeData function testing', function () {

        it('openEmployeeData is defined', function () {

            expect($scope.openEmployeeData).toBeDefined();
        });

        it('openEmployeeData function call', function () {

            var manager = {
                "president": "president,Eldon Aguiniga",
                "employeeDetails": {address: {city: '', state: ''}}
            };
            $scope.openEmployeeData(manager);
            $rootScope.$broadcast('ngDialog.closed');
            expect($scope.manager).toEqual(manager);
        });
    });

    describe('change function testing', function () {

        it('change is defined', function () {

            expect($scope.change).toBeDefined();
        });
    });

    describe('openFindModal function testing', function () {

        it('openFindModal is defined', function () {

            expect($scope.openFindModal).toBeDefined();
        });

        it('openFindModal function call', function () {
            $scope.openFindModal();
        });
    });

    describe('generateSetsForCarousel function testing', function () {

        it('Test generateSetsForCarousel is defined', function () {

            expect($scope.generateSetsForCarousel).toBeDefined();
        });
    });

    describe('resetPermissions function testing',function(){
        it('resetPermissions is defined',function(){
            expect($scope.resetPermissions).toBeDefined();
        });

        it('resetPermissions function call',function(){
            var index = 0;
            $scope.resetPermissions(index);
        });
    });

    describe('joinmanager function testing', function () {

        it('joinmanager is defined', function () {

            expect($scope.joinmanager).toBeDefined();
        });

        it('joinmanager function call', function () {
            var managerarray = [{"employeeName": "abc"}, {"employeeName": "xyz"}, {"employeeName": "def"}];
            $scope.joinmanager(managerarray);
        });
    });

    describe('getDeptDetails function testing',function(){
        it('getDeptDetails is defined',function(){
            expect($scope.getDeptDetails).toBeDefined();
        });

        it('getDeptDetails function call',function(){
            var desc = 'Sales';
            $scope.startTemp = false;
            $scope.getDeptDetails(response.data,desc);
        });
    });


    function toggleSelectTab($routeParams) {

        if ($routeParams.empId !== undefined) {
            $scope.isCompanyView = true;
            $scope.hideme = true;
        } else {
            $scope.isCompanyView = false;
            $scope.hideme = false;
        }
    }


});
