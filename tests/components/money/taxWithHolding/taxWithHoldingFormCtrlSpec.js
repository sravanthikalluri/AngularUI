/**
 * Created by santosh on 4/5/2015.
 */
describe('Tax With Holding Forms Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;
    var $compile;
    var $body = $('body')

    var html = '<div class="content-block no-pad tilePanel" id="nav"></div>';

    var typeResponse = {"data":{"employeeForm":[{"sub":[{"label":"Application for Employment","url":"/v1/extranet/Includes/Content/forms/PDF/Canada/Employee/appCAN001aREV.PDF"},{"description":"","label":"Leave Request Form","url":"/v1/extranet/Includes/Content/forms/PDF/Canada/Employee/leaveCAN346REV.PDF"},{"description":"","label":"Repayment Agreement Form","url":"/v1/extranet/Includes/Content/forms/PDF/Canada/Employee/CAN_Repay_Agree_Form.pdf"},{"description":"","label":"Resignation Letter","url":"/v1/extranet/Includes/Content/forms/PDF/Canada/Employee/CANResignationEmployment.pdf"},{"description":"","label":"Add a New Hire","url":"/v1/extranet/Includes/Content/forms/PDF/Canada/Employee/AddNewHire.pdf"}],"urlType":"employeeFormsData","text":"Employee Forms Data"}]},"_requestId":"35190","_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};

    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('taxWithHoldingFormCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
            $compile = $injector.get('$compile');
        });

        var response = {
            data : {
                forms : [{},{}]

            },
            _statusCode: "200"
        };
        $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                              "/" + appConfig.companyId + "/" + $scope.appUserId +
                              "/forms?countryCode=" + appConfig.countryCode+ "&module=twh")
            .respond(200,response);
        $httpBackend.flush();
    });


    describe('if statement testing ', function () {

        var $scope = {};
        var appConfig = {userId: '123'};
        if(typeof $scope.appUserId === 'undefined'){
            $scope.appUserId = appConfig.userId;
        }

        expect($scope.appUserId).toBeDefined();
    });


    describe('loadForms function testing ', function () {
        it('loadForms is defined ', function () {
            expect($scope.loadForms).toBeDefined();
        });

        it('loadForms function call with success response', function () {

            var response = {
                       data : {
                           forms : [{},{}]

                       },
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                              "/" + appConfig.companyId + "/" + $scope.appUserId +
                              "/forms?countryCode=" + appConfig.countryCode+ "&module=twh")
                .respond(200,response);
            $scope.loadForms();
        });

        it('loadForms function call with success response and data as null', function () {

            var response = {
                data : [],
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                  "/" + appConfig.companyId + "/" + $scope.appUserId +
                                  "/forms?countryCode=" + appConfig.countryCode+ "&module=twh")
                .respond(200,response);
            $scope.loadForms();
            $httpBackend.flush();

        });

        it('loadForms function call with failure response', function () {

            var response = {
                data : [],
                _statusCode: "400",
                _statusText : "OOPs Error",
                "_error":{"detailMessage":"error"}};
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                  "/" + appConfig.companyId + "/" + $scope.appUserId +
                                  "/forms?countryCode=" + appConfig.countryCode+ "&module=twh")
                .respond(400,response);
            $scope.loadForms();
            $httpBackend.flush();

        });


    });

    describe('closePanel function testing',function(){
        it('closePanel is defined',function(){
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function call',function(){
            var evt = {
                "currentTarget": ""
            };

            $scope.closePanel(evt);
        });
    });

    describe('getSelectedTabData function testing',function(){
        it('getSelectedTabData is defined',function(){
            expect($scope.getSelectedTabData).toBeDefined();
        });

        it('getSelectedTabData function call with success response with value 2',function(){
            var urlType = "employeeFormsData";
            var value = 2;
            var element = $compile(html)($scope);
            $body.append(element);
            $rootScope.$digest();

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                "/" + appConfig.companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType +
                                "&countryCode=" + appConfig.countryCode).respond(200,typeResponse);
            $scope.getSelectedTabData(urlType,value);
            $httpBackend.flush();
        });

        it('getSelectedTabData function call with success response with value 0',function(){
            var urlType = "employeeFormsData";
            var value = 0;
            var element = $compile(html)($scope);
            $body.append(element);
            $rootScope.$digest();

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                "/" + appConfig.companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType +
                                "&countryCode=" + appConfig.countryCode).respond(200,typeResponse);
            $scope.getSelectedTabData(urlType,value);
            $httpBackend.flush();
        });

        it('getSelectedTabData function call with success response with value 3',function(){
            var urlType = "employeeFormsData";
            var value = 3;
            var element = $compile(html)($scope);
            $body.append(element);
            $rootScope.$digest();

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                "/" + appConfig.companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType +
                                "&countryCode=" + appConfig.countryCode).respond(200,typeResponse);
            $scope.getSelectedTabData(urlType,value);
            $httpBackend.flush();
        });

        it('getSelectedTabData function call with failure response',function(){
            var urlType = "employeeFormsData";
            var value = 3;
            var failureResponse = {
                  data : [],
                  _statusCode: "400",
                  _statusText : "OOPs Error",
                  "_error":{"detailMessage":"error"}};

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                "/" + appConfig.companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType +
                                "&countryCode=" + appConfig.countryCode).respond(400,failureResponse);
            $scope.getSelectedTabData(urlType,value);
            $httpBackend.flush();
        });
    });

    afterEach(function () {
        $body.empty();
    });
});
