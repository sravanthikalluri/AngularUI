/**
 * Created by jaya krishna on 10/28/2015.
 */
describe('reportAnalytics Controller testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var $compile, $body = $('body');

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('reportAnalyticsCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });


        var res = {
            "data": {
                "employeeCount": 301,
                "employeeDetails": [{
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430788",
                    "employeeName": "Aamot,Camila ghj",
                    "managerName": "Abdel,Adelia ",
                    "position": "Sales",
                    "reportuser": false,
                    "standardReports": false
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430781",
                    "employeeName": "Aasen,Bree te",
                    "managerName": "Ambrogi,Carolyn ",
                    "position": "Sales",
                    "reportuser": false,
                    "standardReports": true
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1696673",
                    "employeeName": "Abaya,Barrett ",
                    "managerName": "AnaS,Johns N",
                    "position": "DMT Test Employee",
                    "reportuser": false,
                    "standardReports": true
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430828",
                    "employeeName": "Abbas,Carmon ",
                    "managerName": "Almaras,Elwanda ",
                    "position": "Sales",
                    "reportuser": true,
                    "standardReports": true
                }, {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "1026861",
                    "employeeName": "Abbassi,Dominque  ",
                    "managerName": "Almarza,Dalila  ",
                    "position": "Software Application Developer",
                    "reportuser": false,
                    "standardReports": true
                }, {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "1430810",
                    "employeeName": "Abbington,Carole ",
                    "managerName": "Angis,Eleanora ",
                    "position": "Sales",
                    "reportuser": true,
                    "standardReports": true
                }, {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "00001000840",
                    "employeeName": "Abbot,Cristi s",
                    "managerName": "AnaS,Johns N",
                    "position": "Vice President of Sales",
                    "reportuser": true,
                    "standardReports": true
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1437612",
                    "employeeName": "Abby,Danette test",
                    "managerName": "Ansoategui,Alice  ",
                    "position": "Qa Tester",
                    "reportuser": true,
                    "standardReports": true
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "00001023062",
                    "employeeName": "Abdalla,Charlyn  ",
                    "managerName": "Alu,Everett  ",
                    "position": "Software Application Developer",
                    "reportuser": true,
                    "standardReports": true
                }, {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "00001030728",
                    "employeeName": "Abdul,Alexia  ",
                    "managerName": "Annarino,Arnold K",
                    "position": "Marketing Communications Mgr",
                    "reportuser": true,
                    "standardReports": true
                }]
            }, "_statusCode": "200", "_statusText": "OK"
        };


        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + manageEmpUrlConfig.resources.reportsAnalytics).respond(200, res);

        $httpBackend.flush();

    });


    it('totalDiv is defined ', function () {
        expect($scope.totalDiv).toBeDefined();
    });

    it('analyticData is defined ', function () {
        expect($scope.analyticData).toBeDefined();
    });

    it('sortReverse is defined ', function () {
        expect($scope.sortReverse).toBeDefined();
    });

    it('showchangeReq is defined ', function () {
        expect($scope.showchangeReq).toBeDefined();
    });

    it('sortTypeEmp is defined ', function () {
        expect($scope.sortTypeEmp).toBeDefined();
    });

    it('settingData is defined ', function () {
        expect($scope.settingData).toBeDefined();
    });

    it('searchbox is defined ', function () {
        expect($scope.searchbox).toBeDefined();
    });

    it('searchPos is defined ', function () {
        expect($scope.searchPos).toBeDefined();
    });

    it('textboxhide is defined ', function () {
        expect($scope.textboxhide).toBeDefined();
    });

    it('analyticData is defined ', function () {
        expect($scope.analyticData).toBeDefined();
    });

    it('when searchPos funciton called should assign passed value to a variable', function () {
        $scope.searchPos(1);
        expect($scope.searchbox).toEqual(1);
    });

    it('when searchPos funciton called without a parameter', function () {
        $scope.searchPos();
        expect($scope.searchbox).toEqual(null);
    });

    it('when textboxhide funciton called ', function () {
        $scope.textboxhide();
        expect($scope.searchbox).toBeFalsy();
    });


    describe('openSelectRow finction', function () {

        it('openSelectRow is defined ', function () {
            expect($scope.openSelectRow).toBeDefined();
        });

        it('openSelectRow function call', function () {
            $scope.analyticData = [
                {employeeName: 'name', alerts: 'alerts', dashboards: 'dashboards', reportuser: 'reportuser'}
            ];
            $scope.openSelectRow(0);

            expect($scope.saveReportAnalytic).toBeDefined();


        });

        it('saveReportAnalytic function call ', function () {
            var element1, HTML1 = '<input type="text" id="standardReportsId" class="" value="true"></input>';
            var element2, HTML2 = '<input type="text" id="alertValueId" class="" value="true"></input>';
            var element3, HTML3 = '<input type="text" id="dashboardsId" class="" value="true"></input>';
            var element4, HTML4 = '<input type="text" id="reportuserId" class="" value="true"></input>';

            element1 = $compile(HTML1)($scope);
            $body.append(element1);
            $rootScope.$digest();

            element2 = $compile(HTML2)($scope);
            $body.append(element2);
            $rootScope.$digest();

            element3 = $compile(HTML3)($scope);
            $body.append(element3);
            $rootScope.$digest();

            element4 = $compile(HTML4)($scope);
            $body.append(element4);
            $rootScope.$digest();

            var data = [{
                "employeeId": "1430788",
                "roles": [{"role": "STD_RPTS"}, {"role": "BI_ALERTS"}, {"role": "BI_DASH"}, {"role": "BI_USER"}]
            }];
            var updateResponse = {"_statusCode": "200", "_statusText": "OK"};
            var url = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +//jshint ignore:line
                manageEmpUrlConfig.resources.accessRolesMethod

            $httpBackend.when('PUT', url, data).respond(200, updateResponse);

            $scope.openSelectRow(0);

            $scope.saveReportAnalytic();
        });

        it('saveReportAnalytic function call ', function () {
            var data = {
                'company': appConfig.companyId,
                'employeeId': $scope.empID,
                'roles': ''
            };
            var updateResponse = {"_statusCode": "201", "_statusText": "OK"};
            var url = manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +//jshint ignore:line
                manageEmpUrlConfig.resources.accessRolesMethod;

            $httpBackend.when('PUT', url, data).respond(200, updateResponse);

            $scope.analyticData = [
                {employeeName: 'name', alerts: 'alerts', dashboards: 'dashboards', reportuser: 'reportuser'}
            ];
            $scope.openSelectRow(0);

            $scope.saveReportAnalytic();
        });

    });

    describe('toggleSelection function testing ', function () {
        it('toggleSelection is defined ', function () {
            expect($scope.toggleSelection).toBeDefined();
        });

        it('toggleSelection function call', function () {
            $scope.selection = [0, 1];
            $scope.toggleSelection(0);
        });

        it('toggleSelection function call', function () {
            $scope.selection = [0, 1];
            $scope.toggleSelection(5);
        });
    });

    describe('submitMultipleReportAnalytic function', function () {

        it('submitMultipleReportAnalytic is defined', function () {
            expect($scope.submitMultipleReportAnalytic).toBeDefined
        });

        it('Test submitMultipleReportAnalytic function is called with success response', function () {
            var data = [{"employeeId": "1430788", "roles": [{"role": "BI_DASH"}]}, {
                "employeeId": "1430781",
                "roles": [{"role": "BI_DASH"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1696673", "roles": [{"role": "BI_DASH"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1430828", "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1026861", "roles": [{"role": "BI_ALERTS"}, {"role": "BI_DASH"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1430810", "roles": [{"role": "BI_ALERTS"}, {"role": "BI_DASH"},
                    {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001000840", "roles": [{"role": "BI_ALERTS"},
                    {"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1437612",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001023062",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001030728",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }]
            var response = {"_statusCode": "200", "_statusText": "OK"};
            $httpBackend.when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/" + $scope.empID +
                manageEmpUrlConfig.resources.reportsAnalyticsPut+'&enableValidation=true', data).respond(200, response);
            $scope.submitMultipleReportAnalytic();
            $httpBackend.flush();
        });

        it('Test submitMultipleReportAnalytic function is called with failure response', function () {
            var data = [{"employeeId": "1430788", "roles": [{"role": "BI_DASH"}]}, {
                "employeeId": "1430781",
                "roles": [{"role": "BI_DASH"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1696673", "roles": [{"role": "BI_DASH"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1430828", "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1026861", "roles": [{"role": "BI_ALERTS"}, {"role": "BI_DASH"},
                    {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1430810", "roles": [{"role": "BI_ALERTS"}, {"role": "BI_DASH"},
                    {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001000840", "roles": [{"role": "BI_ALERTS"},
                    {"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "1437612",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001023062",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }, {
                "employeeId": "00001030728",
                "roles": [{"role": "BI_DASH"}, {"role": "BI_USER"}, {"role": "STD_RPTS"}]
            }]
            var response = {"_statusCode": "400", "_statusText": "OK", "_error": {"detailMessage": "error"}};
            $httpBackend.when('PUT', manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/" + $scope.empID +
                manageEmpUrlConfig.resources.reportsAnalyticsPut+'&enableValidation=true', data).respond(400, response);
            $scope.submitMultipleReportAnalytic();
            $httpBackend.flush();
        });
    });

    afterEach(function () {
        $body.empty();
    });
});
