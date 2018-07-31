describe('Trinet TCA View Controller Testing', function () {

    var $rootScope, $scope,$httpBackend, appConfig;
    var response = {
        "data": {
            "eforms_data": [{
                "formId": "1015",
                "formStatus": "accepeted",
                "formDesc": "Employee Handbook",
                "formPath": "Employee_Handbook.htm",
                "timeStamp": "2015-10-07"
            }]
        },
        "_statusCode": "200",
        "_statusText": "OK"
    };

    var companyPolicyResponse = {
        "data": {
            "docMeta": [
                {
                    "id": 1,
                    "title": "Company Addendum",
                    "subheading": "This is where your online company Addendum resides with information that applies to policies and procedures unique to your company."
                },
                {
                    "id": 2,
                    "title": "Additional Policies",
                    "subheading": "This is your place to find additional policies and resources that correlate to your company."
                },
                {
                    "id": 3,
                    "title": "Employee Handbook",
                    "subheading": "Here is the latest version of your company's Employee Handbook."
                }
            ]
        }
    };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('trinetTCAViewCtrl', {
                $scope: $scope
            });
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
        });

    });

    describe('empHandbookStatus function testing', function () {

        it('empHandbookStatus is defined', function () {
            expect($scope.empHandbookStatus).toBeDefined();
        });
        it('Test empHandbookStatus success function ', function () {

            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy + "/" + appConfig.companyId + "/" +
                appConfig.userId + "/" + appConfig.countryCode + "/" + appConfig.stateCode + companyUrlConfig.resources.companyPolicies;


            $httpBackend.whenGET(url).respond(200, companyPolicyResponse);

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + appConfig.companyId + "/" +
                appConfig.userId + companyUrlConfig.resources.eformsStatus).respond(200, response);

            $scope.empHandbookStatus();
            $httpBackend.flush();
            expect($scope.trinetTca).toEqual(response.data);
        });

    });

    describe('acceptReq function testing', function () {

        it('acceptReq is defined', function () {
            expect($scope.acceptReq).toBeDefined();
        });

        it('acceptReq function call with success response', function () {
            $scope.trinetTca = {
                "eforms_data": [{
                    "formId": "1015",
                    "formStatus": "Accept",
                    "formDesc": "Employee Handbook",
                    "formPath": "Employee_Handbook.htm",
                    "timeStamp": "2015-10-07"
                }]
            };
            var data = {
                "formStatus": "accepted",
                "formId": "1015"
            };
            var successResponse = {
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.when('POST', companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + appConfig.companyId + "/" +
                appConfig.userId + companyUrlConfig.resources.eformsStatus+'?enableValidation=true', data).respond(200, successResponse);
            $scope.acceptReq();
            $httpBackend.flush();
        });

        it('acceptReq function call with failure response', function () {
            $scope.trinetTca = {
                "eforms_data": [{
                    "formId": "1015",
                    "formStatus": "Accept",
                    "formDesc": "Employee Handbook",
                    "formPath": "Employee_Handbook.htm",
                    "timeStamp": "2015-10-07"
                }]
            };
            var data = {
                "formStatus": "accepted",
                "formId": "1015"
            };
            var successResponse = {
                "_statusCode": "400",
                "_statusText": "OK",
                "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('POST', companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.eforms + "/" + appConfig.companyId + "/" +
                appConfig.userId + companyUrlConfig.resources.eformsStatus+'?enableValidation=true', data).respond(400, successResponse);
            $scope.acceptReq();
            $httpBackend.flush();
        });
    });

});