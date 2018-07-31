describe('Find Employee Controller Testing', function () {

    var $rootScope,
        $scope,
        $httpBackend,
        appConfig;

    var deptDataResponse = {
        data: [{name: 'some emp data'}], "_statusCode": "200", "_statusText": "OK"
    };

    var employeeDataResponse = {
        data: [
            {key1: 'name1'}
        ], "_statusCode": "200", "_statusText": "OK"
    };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.getManagerList = function (employeeId, colleagueList, desc) {
                var empl = {"id":employeeId,"list":colleagueList,"desc":desc};
                return empl;
            };
            $scope.getDeptDetails = function(list,deptName) {
                var dept = {"list":list,"deptName":deptName};
                return dept;
            };
            $injector.get('$controller')('findEmployeeCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

    });

    describe('getView function testing ', function () {
        it('getView is defined ', function () {
            expect($scope.getView).toBeDefined();
        });

        it('getView function call with out a parameter ', function () {
            $scope.getView();

            expect($scope.searchQuery).toBeDefined();
            expect($scope.employeeData).toBeDefined();
            expect($scope.deptData).toBeDefined();
        });

        it('getView function call with a parameter as department', function () {
            var value = 'department';
            $scope.getView(value);

            expect($scope.searchQuery).toBeDefined();
            expect($scope.employeeData).toBeDefined();
            expect($scope.deptData).toBeDefined();
            expect($scope.findPlaceHolder).toBeDefined();
            expect($scope.findPlaceHolder).toEqual('Enter a department');
            expect($scope.isEmployeeViewVisible).toBeDefined();
            expect($scope.isEmployeeViewVisible).toBeFalsy();
        });

        it('getView function call with a parameter as employee', function () {
            var value = 'employee';
            $scope.getView(value);

            expect($scope.searchQuery).toBeDefined();
            expect($scope.employeeData).toBeDefined();
            expect($scope.deptData).toBeDefined();
            expect($scope.findPlaceHolder).toBeDefined();
            expect($scope.isEmployeeViewVisible).toBeDefined();
            expect($scope.isEmployeeViewVisible).toBeFalsy();
        });
    });

    describe('search and searchOnChange function is called', function () {
        var searchQuery = 'cse';
        expect(searchQuery).toBeDefined();
        expect(searchQuery).not.toEqual('');
        expect(searchQuery).not.toBeNull();

        it('search is defined ', function () {
            expect($scope.search).toBeDefined();
        });

        it('when search(department searchQuery) is called, should call searchDepartment(searchQuery)', function () {
            spyOn($scope, 'searchDepartment');
            $scope.search('department', searchQuery);
            expect($scope.searchDepartment).toHaveBeenCalled();

        });


        it('when search(employee searchQuery) is called, should call searchDepartment(searchQuery)', function () {
            spyOn($scope, 'searchEmployee');
            $scope.search('employee', searchQuery);
            expect($scope.searchEmployee).toHaveBeenCalled();

        });


    });

    describe('searchOnChange function testing ', function () {
        it('searchOnChange is defined ', function () {
            expect($scope.searchOnChange).toBeDefined();
        });

        it('searchOnChange function called, with two parameters as input ', function () {
            var searchQuery = 'cse';
            spyOn($scope, 'searchDepartment');
            $scope.searchOnChange('department', searchQuery);
            expect($scope.searchDepartment).toHaveBeenCalled();

            expect($scope.toggleLoading).toBeDefined();
            expect($scope.toggleLoading).toBeTruthy();

        });

        it('searchOnChange function called, with two parameters as input in different way', function () {
            var searchQuery = 'cse';
            spyOn($scope, 'searchEmployee');
            $scope.searchOnChange('departementtt', searchQuery);
            expect($scope.searchEmployee).toHaveBeenCalled();

            expect($scope.toggleLoading).toBeDefined();
            expect($scope.toggleLoading).toBeTruthy();

        });

        it('searchOnChange function called, with two parameters as input with searchQuery as empty', function () {
            var searchQuery = '';
            spyOn($scope, 'searchEmployee');
            $scope.searchOnChange('departementtt', searchQuery);

            expect($scope.toggleLoading).toBeDefined();
            expect($scope.toggleLoading).toBeFalsy();

        });


    });

    describe('getDepartmentEmployees function testing', function () {

        it('getDepartmentEmployees is defined ', function () {
            expect($scope.getDepartmentEmployees).toBeDefined();
        });

        it('when getDepartmentEmployees(dept) is called, should call getDeptHead(dept)', function () {
            var dept = 'cse';
            spyOn($scope, 'getDeptHead');
            $scope.getDepartmentEmployees(dept);
            expect($scope.getDeptHead).toHaveBeenCalled();

        });

    });

    describe('getDeptHead function testing ', function () {
        it('getDeptHead is defined ', function () {
            expect($scope.getDeptHead).toBeDefined();
        });

        it('getDeptHead function call with success response', function () {
            var response = {
                "data": {
                    "departmentHeads": [{
                        "designation": "CFO",
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
                            "department": "Executive",
                            "email": null,
                            "phone": "775/327-5555",
                            "preferredName": "John Smith",
                            "seniority": "14 years, 9 months, 27 days"
                        },
                        "employeeId": "00001000483",
                        "employeeName": "Johns Ana",
                        "status": "A",
                        "teamMemberCount": 1
                    }], "members": []
                }, "_statusCode": "200", "_statusText": "OK"
            }


            var dept = {
                "deptId": '123',
                "deptName": "HR"
            };


            $httpBackend
                .whenGET(companyUrlConfig.companyApi + '/api-company/v1/organization/' + appConfig.companyId + '/org-chart?deptId=' + dept.deptId)
                .respond(200, response);
            $scope.getDeptHead(dept);
            $httpBackend.flush();

        });

        it('getDeptHead function call with failure response', function () {
            var response = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };


            var dept = {
                "deptId": '123',
                "deptName": "HR"
            };


            $httpBackend
                .whenGET(companyUrlConfig.companyApi + '/api-company/v1/organization/' + appConfig.companyId + '/org-chart?deptId=' + dept.deptId)
                .respond(400, response);
            $scope.getDeptHead(dept);
            $httpBackend.flush();

        });
    });

    describe('searchDepartment function testing ', function () {
        it('searchDepartment is defined ', function () {
            expect($scope.searchDepartment).toBeDefined();
        });

        it('searchDepartment function call with a get call with success response and data as not null', function () {
            var searchUrl = globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + appConfig.companyId +
                globalUrlConfig.resources.departments + "?deptName=aa";
            $httpBackend.whenGET(searchUrl).respond(200, deptDataResponse);

            var dept = 'aa';
            $scope.searchDepartment(dept);
            $httpBackend.flush();

        });

        it('searchDepartment function call with a get call with success response and data as null', function () {

            var response1 = {
                data: [], "_statusCode": "200", "_statusText": "OK"
            };
            var searchUrl = globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + appConfig.companyId +
                globalUrlConfig.resources.departments + "?deptName=aa";
            $httpBackend.whenGET(searchUrl).respond(200, response1);

            var dept = 'aa';
            $scope.searchDepartment(dept);
            $httpBackend.flush();
        });

        it('searchDepartment function call with a get call with failure response ', function () {
            var response2 = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            var searchUrl = globalUrlConfig.globalApi + globalUrlConfig.globalBase +
                globalUrlConfig.resources.company + "/" + appConfig.companyId +
                globalUrlConfig.resources.departments + "?deptName=aa";
            $httpBackend.whenGET(searchUrl).respond(400, response2);

            var dept = 'aa';


            $scope.searchDepartment(dept);
            $httpBackend.flush();
        });
    });

    describe('searchEmployee function testing ', function () {
        it('searchEmployee is defined ', function () {
            expect($scope.searchEmployee).toBeDefined();
        });

        it('searchEmployee funciton call with success response ', function () {
            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.org + "/" + appConfig.companyId + "/" + appConfig.userId +
                companyUrlConfig.resources.orgChart + "?name=aa";
            $httpBackend.whenGET(url).respond(200, employeeDataResponse);

            var empName = 'aa'
            $scope.searchEmployee(empName);
            $httpBackend.flush();
        });

        it('searchEmployee funciton call with failure response ', function () {
            var employeeDataResponse = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.org + "/" + appConfig.companyId + "/" + appConfig.userId +
                companyUrlConfig.resources.orgChart + "?name=aa";
            $httpBackend.whenGET(url).respond(400, employeeDataResponse);

            var empName = 'aa'
            $scope.searchEmployee(empName);
            $httpBackend.flush();

        });


    });

    describe('closeAndUpdate funciton testing ', function () {
        it('closeAndUpdate is defined ', function () {
            expect($scope.closeAndUpdate).toBeDefined();
        });

        it('closeAndUpdate function call', function () {
            spyOn($scope, "getManagerList");
            $scope.closeAndUpdate();
            expect($scope.getManagerList).toHaveBeenCalled();
        });

    });

    describe('closeAndUpdate1 funciton testing ', function () {
        it('closeAndUpdate1 is defined ', function () {
            expect($scope.closeAndUpdate1).toBeDefined();
        });

        it('closeAndUpdate1 is defined ', function () {
            var id = 1;
            var colleagueList = [];
            var desc = 'dept';
            $scope.closeAndUpdate1(id,colleagueList,desc);
        });


    });
});
