describe('Employee Policies Controller Testing', function () {

    var $rootScope, $scope, $httpBackend, appConfig;
    var employeePolicyResponse = {
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
            $injector.get('$controller')('employeePoliciesCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });


    });


    describe('onload call testing', function () {
        it('onload call with success response', function () {
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode
                + "/policies?type=employee").respond(200, employeePolicyResponse);
            $httpBackend.flush();
        });

        it('onload call with failure response', function () {
            var response = {
                "data": {},
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };
            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode
                + "/policies?type=employee").respond(400, response);
            $httpBackend.flush();
        });
    });


});
