describe('Company Policies View Controller Testing', function () {

    var $rootScope, $scope,$httpBackend, appConfig;
    var $compile,$body = $('body');
    var companyPolicyResponse = {
        "data": {
            "docMeta": [
                {
                    "id": 1,
                    "title": "Company Addendum",
                    "subheading": "This is where your online company Addendum resides with information that applies to policies and procedures unique to your company."
                }
            ]
        }
    };


    beforeEach(function () {
        module('TrinetPassport');


        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('companyPoliciesViewCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
        });

        var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                              companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                              appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies+"?pfClient="+appConfig.pfClient;

        $httpBackend.whenGET(url).respond(200, companyPolicyResponse);
        $httpBackend.flush();
    });


    describe('tab variable testing', function () {
        it('tab is defined', function () {
            expect($scope.tab).toBeDefined();
        });

        it('tab is equal to 0', function () {
            expect($scope.tab).toBe(0);
        });

    });

    describe('closeAlert function testing', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('closeAlert function called with out a parameter', function () {
            $scope.alert = ['param1', 'param2'];
            $scope.closeAlert();

            expect($scope.alert).toEqual(['param1', 'param2']);
        });
    });

    describe('isSelected function testing', function () {
        it('isSelected is defined', function () {
            expect($scope.isSelected).toBeDefined();
        });

        it('isSelected function call', function () {
            var tab = 2;
            expect($scope.isSelected(tab)).toBeFalsy();


            var tab1 = 0;
            expect($scope.isSelected(tab1)).toBeTruthy();
        });
    });

    describe('closePanel function testing', function () {

        it('closePanel is defined', function () {
            expect($scope.closePanel).toBeDefined();
        });

        it('closePanel function is called', function () {
            $scope.closePanel();
        });
    });

    describe('tileAction function testing', function () {

        it('tileAction is defined', function () {
            expect($scope.tileAction).toBeDefined();
        });

        it('tileAction function is called with success', function () {
            var html = "<button class='title-block active'></button>";
            var element1 = $compile(html)($scope);
            $body.append(element1);
            $rootScope.$digest();
            var setTab = 1;
            var title = 'ACA Lrg Employer Status';
            var url = '/api-config/v1/pdf';
            var result = {
                "data": {
                    "id": 1, "name": "Company Addendum",
                    "url": "/api-config/v1/pdf", "effectiveDate": "2015-10-15"
                }
                ,
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" + appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies + "?type=acaEmpStatus")
                .respond(200, result);
            $scope.tileAction(setTab, title, url);
            $httpBackend.flush();
        });

        it('tileAction function is called with failure', function () {
            var setTab = 1;
            var title = 'ACA Lrg Employer Status';
            var url = '/api-config/v1/pdf';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" + appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies + "?type=acaEmpStatus")
                .respond(400, response);
            $scope.tileAction(setTab, title, url);
            $httpBackend.flush();


        });

        it('tileAction function is called with title not equal to ACA Lrg Employer Status', function () {
            var setTab = 1;
            var title = 'Company Addendum';
            var url = '/api-config/v1/pdf';

            $scope.tileAction(setTab, title, url);

        });
    });

    describe('$on function testing', function () {
        it('$on function call', function () {
            var alert = "error";
            $rootScope.$broadcast(constants.emitCompanyAlert, alert);
        });
    });

    describe('selectTab function testing',function(){
        it('selectTab is defined',function(){
            expect($scope.selectTab).toBeDefined();
        });

        it('selectTab function call',function(){
            var value = 1;
            var data = true;
            $scope.selectTab(value,data);
        });
    });

    afterEach(function () {
        $body.empty();
    });


});
