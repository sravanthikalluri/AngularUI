/*
/!**
 * Created by jaya krishna on 10/28/2015.
 *!/
describe('Reports Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;

    var $compile,e1,
        $body = $('body'),
        simpleHTML = '<span id="spanTermId1" class="sub-txt pad-5"></span>';

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('reportsCtrl', {
                $scope: $scope,
                $routeParams: {selectedTab: 'reports'}
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });


    });

    /!*describe('selectTab function testing', function () {
        it('selectTab is defined', function () {
            expect($scope.selectTab).toBeDefined();
        });

        it('when selectTab function index is 1 called ', function () {
            spyOn($scope, 'termReport');
            var index = 1;
            $scope.selectTab(index);
            expect($scope.tab).toEqual(index);
            var sidebar = '#list' + index;
            expect(sidebar).toEqual('#list' + index);
            expect($scope.termReport).toHaveBeenCalled();

        });

        it('when selectTab function index not 1 called ', function () {
            spyOn($scope, 'reportPayDataFun');
            var index = 2;
            $scope.selectTab(index);
            expect($scope.tab).toEqual(index);
            var sidebar = '#list' + index;
            expect(sidebar).toEqual('#list' + index);
            expect($scope.reportPayDataFun).toHaveBeenCalled();
        });
    });*!/

    describe('closePanel function testing', function () {
        it('close panel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('when closePanel function called with index as parameter ', function () {
            $scope.closePanel();
            expect($scope.tab).toEqual(0);
        });
    });

    describe('isSelected function testing', function () {
        it('isSelected is defined', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('when isSelected function called with number as parameter ', function () {
            $scope.tab = 1;
            expect($scope.isSelected(1)).toBeTruthy();
        });

        it('when isSelected function called with NaN as parameter ', function () {
            $scope.tab = NaN;
            expect($scope.isSelected(1)).toBeFalsy();
        });

        it("when isSelected function called without a parameter", function () {
            $scope.tab = 1;
            expect($scope.tab).toEqual(1);
            expect($scope.isSelected()).toBeFalsy();
        });
    });

    describe('termReport function testing', function () {
        it('termReport is defined', function () {
            expect($scope.termReport).toBeDefined();
        });

        it('termReoprt is called with data length is not equal to zero', function () {
            var actualResponse = {
                _statusCode: '200',
                _statusText: 'asfd',
                data: [
                    "angular", "javscript"
                ]
            };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.termReport).respond(200, actualResponse);

            $scope.termReport();
            $httpBackend.flush();
            expect($scope.reportData).toEqual(actualResponse.data);

        });

        it('termReoprt is called with data length is equal to zero', function () {
            var actualResponse = {
                _statusCode: '200',
                _statusText: 'asfd',
                data: []
            };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.termReport).respond(200, actualResponse);

            $scope.termReport();
            $httpBackend.flush();

        });

        it('termReoprt is called with failure response', function () {
            var actualResponse = {
                _statusCode: '400',
                _statusText: 'asfd',
                "_error": {"detailMessage": "error"},
                data: []
            };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.termReport).respond(400, actualResponse);

            $scope.termReport();
            $httpBackend.flush();

        });
    });

    describe('reportPayDataFun function testing', function () {
        it('reportPayDataFun is defined', function () {
            expect($scope.reportPayDataFun).toBeDefined();
        });

        it('reportPayDataFun is called with data not equal to zero', function () {
            var actualResponse = {
                _statusCode: '200',
                _statusText: 'asfd',
                data: [
                    "angular", "javscript"
                ]
            };

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.payReport).respond(200, actualResponse);

            $scope.reportPayDataFun();
            $httpBackend.flush();
            expect($scope.reportPayData).toEqual(actualResponse.data);
        });

        it('reportPayDataFun is called with data equal to zero', function () {
            var actualResponse = {
                _statusCode: '200',
                _statusText: 'asfd',
                data: []
            };

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.payReport).respond(200, actualResponse);

            $scope.reportPayDataFun();
            $httpBackend.flush();

        });

        it('reportPayDataFun is called with failure response', function () {
            var actualResponse = {
                _statusCode: '400',
                _statusText: 'asfd',
                "_error": {"detailMessage": "error"},
                data: []
            };

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                appConfig.companyId + "/employees?report=" + manageEmpUrlConfig.resources.payReport).respond(400, actualResponse);

            $scope.reportPayDataFun();
            $httpBackend.flush();

        });

    });

    describe('viewTermReport function testing', function () {
        it('viewTermReport is defined', function () {
            expect($scope.viewTermReport).toBeDefined();
        });

        it('viewTermReport function is called with data not equal to zero', function () {
            var termIndex = 1;
            e1 = $compile(simpleHTML)($scope);
            $body.append(e1);
            $rootScope.$digest();

            var termEmpId = document.getElementById('spanTermId' + termIndex).innerHTML;
            var actualResponse = {
                _statusCode: '200',
                _statusText: 'asfd',
                data: [
                    "angular", "javscript"
                ]
            };

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId +
                '/' + termEmpId + manageEmpUrlConfig.resources.allEmp + '?report=' + manageEmpUrlConfig.resources.termReport).respond(200, actualResponse);
            $scope.viewTermReport(termIndex);
            $httpBackend.flush();
        });

        it('viewTermReport function is called with failure response', function () {
            var termIndex = 1;
            e1 = $compile(simpleHTML)($scope);
            $body.append(e1);
            $rootScope.$digest();

            var termEmpId = document.getElementById('spanTermId' + termIndex).innerHTML;
            var actualResponse = {
                _statusCode: '400',
                _statusText: 'asfd',
                "_error": {"detailMessage": "error"},
                data: [
                    "angular", "javscript"
                ]
            };

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + appConfig.companyId +
                '/' + termEmpId + manageEmpUrlConfig.resources.allEmp + '?report=' + manageEmpUrlConfig.resources.termReport).respond(400, actualResponse);
            $scope.viewTermReport(termIndex);
            $httpBackend.flush();
        });
    });

    describe('viewPayReport function testing', function () {
        it('viewPayReport is defined', function () {
            expect($scope.viewPayReport).toBeDefined();
        });

        it('viewPayReport is called', function () {
            var payIndex = 0;
            $scope.viewPayReport(payIndex);
            expect($scope.viewPayReportData).toEqual(undefined);
        });
    });

    describe('Test formatDate function testing', function () {

        it('Test formatDate function is defined', function () {
            expect($scope.formatDate).toBeDefined();
        });

        it('Test formatDate is called', function () {
            var date = '30-12-2015';
            $scope.formatDate(date);
        });
    });


});
*/
