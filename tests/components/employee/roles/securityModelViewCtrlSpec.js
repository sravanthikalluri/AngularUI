/**
 * Created by jaya krishna on 11/3/2015.
 */

describe('Security Model View Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('securityModelViewCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });


    });


    describe('searchEmployee function testing', function () {
        it('searchEmployee is defined', function () {
            expect($scope.searchEmployee).toBeDefined();
        });

        it('employeeData should have data through get call in success response', function () {
            var searchQuery = 'name',
                employeeDataRes = {
                    data: ['param1', '[param2']
                };

            $scope.searchEmployee(searchQuery);

            $httpBackend.whenGET(companyUrlConfig.companyApi + '/api-company/v1/organization/' + appConfig.companyId + '/' + appConfig.userId + '/org-chart?name=' + searchQuery + '').respond(200, employeeDataRes);
            $httpBackend.flush();


        });

        it('employeeData should have data through get call in failure response', function () {
            var searchQuery = 'name',
                employeeDataRes = {
                    data: ['param1', '[param2'],
                    "_error": {"detailMessage": "error"}

                };

            $scope.searchEmployee(searchQuery);

            $httpBackend.whenGET(companyUrlConfig.companyApi + '/api-company/v1/organization/' + appConfig.companyId + '/' + appConfig.userId + '/org-chart?name=' + searchQuery + '').respond(400, employeeDataRes);
            $httpBackend.flush();


        });

    });

    describe('closePanel function testing', function () {
        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call', function () {
            $scope.closePanel();
        });
    });

    describe('saveHrsecurity function testing', function () {
        it('saveHrsecurity is defined', function () {
            expect($scope.saveHrsecurity).toBeDefined();
        });
        it('saveHrsecurity function call yielding success response', function () {
            var hrSecurity = [{
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": null,
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "1877232", "employeeName": "Donella Anstett"
            }, {
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": "employee@31T.com",
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "00001036020", "employeeName": "Erich Amsterdam"
            }, {
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": "employee@31T.com",
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "1430826", "employeeName": "Christena Amadeo"
            }];
            $scope.filteredarray = ["1877232", "00001036020", "1430826"];
            $scope.assignRoleObject = {
                "employeeIds": $scope.filteredarray,
                "role": "HRSECURITY"
            };

            var res = {_statusCode: '200', _statusMessage: 'OK'};

            $httpBackend.when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/" +
                appConfig.userId + manageEmpUrlConfig.resources.employeeRoles+'?enableValidation=true', $scope.assignRoleObject).respond(200, res);

            $scope.saveHrsecurity(hrSecurity);
            $httpBackend.flush();
        });

        it('saveHrSecurity function call yielding failure response', function () {
            var hrSecurity = [{
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": null,
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "1877232", "employeeName": "Donella Anstett"
            }, {
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": "employee@31T.com",
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "00001036020", "employeeName": "Erich Amsterdam"
            }, {
                "employeeDetails": {
                    "address": null,
                    "department": null,
                    "email": "employee@31T.com",
                    "phone": null,
                    "preferredName": null,
                    "seniority": null
                }, "employeeId": "1430826", "employeeName": "Christena Amadeo"
            }];
            $scope.filteredarray = ["1877232", "00001036020", "1430826"];
            $scope.assignRoleObject = {
                "employeeIds": $scope.filteredarray,
                "role": "HRSECURITY"
            };

            var res = {_statusCode: '400', _statusMessage: 'OK', "_error": {"detailMessage": "error"}};

            $httpBackend.when('POST', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/" +
                appConfig.userId + manageEmpUrlConfig.resources.employeeRoles+'?enableValidation=true', $scope.assignRoleObject).respond(400, res);

            $scope.saveHrsecurity(hrSecurity);
            $httpBackend.flush();

        });
    });
});
