/**
 * Created by jaya krishna on 10/26/2015.
 */
describe('Assign Manager Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var actualResponse = {
                           "data": [
                             {
                               "employeeName": null,
                               "employeeId": null,
                               "position": null,
                               "departement": null,
                               "location": "",
                               "directManager": null,
                               "directManagerEmployeeId": null,
                               "workSupervisor": "Danelle Aninion",
                               "workSupervisorEmployeeId": "00001601717",
                               "company": null,
                               "actorCompany": null,
                               "subjectCompany": null,
                               "status": null,
                               "effectiveDate": "2016-02-25 00:00:00.0",
                               "loginName": null
                             }
                           ],
                           "_statusCode": "200",
                           "_statusText": "OK",
                           "_statusMessage": "Success"
                         };
    var $compile,$body = $('body');


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('assignManagerCtrl', {$scope: $scope});
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });

        $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
            manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + manageEmpUrlConfig.resources.assignManager).respond(200, actualResponse);

        $httpBackend.flush();


    });

    describe('formatDate function testing ', function () {
        it('formatDate is defined ', function () {
            expect($scope.formatDate).toBeDefined();
        });

        it('formatDate function call', function () {
            $scope.formatDate('28-12-2015');
        });
    });

    describe('toggleSelection function testing ', function () {
        it('toggleSelection is defined ', function () {
            expect($scope.toggleSelection).toBeDefined();
        });

        it('toggleSelection function call', function () {
            $scope.selection = [1, 3];
            var data = 1;
            $scope.toggleSelection(data);
        });

        it('toggleSelection function call', function () {
            $scope.selection = [1, 3];
            var data = 11;
            $scope.toggleSelection(data);
        });
    });

    describe('searchPos function testing', function () {

        it("searchPos is defined", function () {
            expect($scope.searchPos).toBeDefined();
        });

        it("searchPos function call", function () {
            var value = true;
            $scope.searchPos(value);
            expect($scope.searchbox).toBeDefined();
            expect($scope.searchbox).toBeTruthy();
        });

    });

    describe('textboxhide function testing', function () {

        it("textboxhide is defined", function () {
            expect($scope.textboxhide).toBeDefined();
        });

        it("textboxhide function call", function () {
            $scope.textboxhide();
            expect($scope.searchbox).toBeDefined();
            expect($scope.searchbox).toBeFalsy();
        });
    });

    describe('changeReq function testing', function () {

        it('changeReq is defined', function () {
            expect($scope.changeReq).toBeDefined();
        });

        it('changeReq function called with update function yealding success', function () {
            var val = 0;
            var nameResponse = {
                                 "data": "varma raju",
                                 "_statusCode": "200",
                                 "_statusText": "OK",
                                 "_statusMessage": "Success"
                               };
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                 manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + '/' + appConfig.userId + '/name').respond(200,nameResponse);
             $scope.changeReq(val);
             $httpBackend.flush();
        });

        it('changeReq function called with update function yealding error', function () {
            var val = 0;
            var nameResponse = {"data":{},
                               _statusCode: "400",
                               _statusText : "OOPs Error",
                               "_error":{"detailMessage":"error"}};
            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                 manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + '/' + appConfig.userId + '/name').respond(400,nameResponse);
            $scope.changeReq(val);
            $httpBackend.flush();

        });

    });

    describe('updateData function testing',function(){
        it('updateData is defined',function(){
            expect($scope.updateData).toBeDefined();
        });

        it('updateData function call with success response',function(){
            $scope.indexvalue = 0;
            var data =
                {
                    "employeeId": null,
                    "directManagerEmployeeId": appConfig.userId,
                    "workSupervisorEmployeeId": appConfig.userId,
                    "effectiveDate": '2016-05-20'

                };
            var successResponse = {_statusCode: 200, _statusMessage: 'OK'};
            var HTML1 = '<input type="text" id="assignmanger_effDate" class="no-bg no-border medium" value="05/20/2016"></input>';
            var element1 = $compile(HTML1)($scope);
            $body.append(element1);
            $rootScope.$digest();
            $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                              appConfig.companyId + '/' + appConfig.userId + manageEmpUrlConfig.resources.assignManager+'?enableValidation=true', data).respond(200,successResponse);
            $scope.updateData();
            $httpBackend.flush();
        });

        it('updateData function call with success response',function(){
            $scope.indexvalue = 0;
            var data =
                {
                    "employeeId": null,
                    "directManagerEmployeeId": appConfig.userId,
                    "workSupervisorEmployeeId": appConfig.userId,
                    "effectiveDate": '2016-05-20'

                };
            var failureResponse = { _statusCode: "400",_statusText : "OOPs Error","_error":{"detailMessage":"error"}};
            var HTML1 = '<input type="text" id="assignmanger_effDate" class="no-bg no-border medium" value="05/20/2016"></input>';
            var element1 = $compile(HTML1)($scope);
            $body.append(element1);
            $rootScope.$digest();
            $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + '/' +
                              appConfig.companyId + '/' + appConfig.userId + manageEmpUrlConfig.resources.assignManager+'?enableValidation=true', data).respond(400,failureResponse);
            $scope.updateData();
            $httpBackend.flush();
        });
    });

    describe('lengthProperty function testing',function(){
        it('lengthProperty is defined',function(){
            expect($scope.lengthProperty).toBeDefined();
        });

        it('lengthProperty function call',function(){
            $scope.lengthProperty();
        })
    });

    afterEach(function(){
        $body.empty();
    });

});