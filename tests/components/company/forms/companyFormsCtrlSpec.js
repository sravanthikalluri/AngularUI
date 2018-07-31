/**
 * Created by jaya krishna on 11/5/2015.
 */
describe('Company Forms Controller Testing', function () {
    var $rootScope;
    var $scope;
    var appConfig;
    var $httpBackend;


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('companyFormsCtrl', {$scope: $scope});
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });

        var response = {
            data : {
                forms : [{},{}]

            },
            _statusCode: "200"
        };
        $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                              "/" + appConfig.companyId + "/" + $scope.appUserId +
                              "/companyForms?pfClient="+appConfig.pfClient)
            .respond(200,response);
        $scope.loadForms();
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
                                 "/companyForms?pfClient="+appConfig.pfClient)
                .respond(200,response);
            $scope.loadForms();
            expect($scope.companyFormData).toBeDefined();
        });

        it('loadForms function call with success response and data as null', function () {

            var response = {
                data : [],
                _statusCode: "200"
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                                 "/" + appConfig.companyId + "/" + $scope.appUserId +
                                 "/companyForms?pfClient="+appConfig.pfClient)
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
                                 "/forms?countryCode=" + appConfig.countryCode+"&module=company")
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

    describe('selectTabAcc function testing',function(){
        it('selectTabAcc is defined',function(){
            expect($scope.selectTabAcc).toBeDefined();
        });

        it('selectTabAcc function call with value 2',function(){
            var value = 2;
            var acc;
            var evt = {
                "currentTarget": ""
            };
            $scope.selectTabAcc(value,acc,evt);
        });

        it('selectTabAcc function call with value 3',function(){
            var value = 3;
            var acc;
            var evt = {
                "currentTarget": ""
            };
            $scope.selectTabAcc(value,acc,evt);
        });
    });
});
