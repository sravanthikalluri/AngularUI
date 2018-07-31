
(function () {

    "use strict";


    describe('Company Name Service Testing', function () {
        var companiesService,
            $httpBackend,
            appConfig;
        var response ={"data":{"peoId":"PAS","peoName":"Passport","companyInfo":[{"companyId":"36T","companyDesc":"Paul Capital Advisors LLC","parentOrg":"0072","shortDesc":"P.C.A","companyCode":"P.C.A"},{"companyId":"4OV","companyDesc":"PCATN","parentOrg":"5159","shortDesc":"PCATN","companyCode":"PCATN"},{"companyId":"4U1","companyDesc":"Top Tier Capital Partners LLC","parentOrg":"5345","shortDesc":"Top Tier C","companyCode":"Top Tier C"},{"companyId":"4HX","companyDesc":"Paul Capital Advisors CAN","parentOrg":"4910","shortDesc":"PCA CAN","companyCode":"PCA CAN"}],"vertical":null,"verticalName":null},"_requestId":"5e74aec8-2bfe-4112-b4a3-ba721d97d7ed","_statusCode":"200","_statusText":"OK","_statusMessage":"Retrieved companies successfully"};

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                companiesService = $injector.get('companiesService');
                appConfig = $injector.get('appConfig');
                $httpBackend = $injector.get('$httpBackend');

            });

        });


        it('Company Service is defined', function () {
            expect(companiesService).toBeDefined();
        });


        describe('companyService switchCompany testing', function () {

            it('switchCompany is called ', function () {

                var companyId = '00001099190';
                //companiesService.switchCompany(companyId);
            });

        });

        describe('companyService getCompanies testing', function () {

            it('getCompanies is defined', function () {
                expect(companiesService.getCompanies).toBeDefined();
            });

            it('getCompanies function is called', function () {
                $httpBackend
                    .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile + appConfig.userId + '/' + profileUrlConfig.resources.companies)
                    .respond(response);

                companiesService.getCompanies();
                $httpBackend.flush();

            });

        });

        describe('companyService getCompanies testing', function () {

            it('getCompanies is defined', function () {
                expect(companiesService.getCompanies).toBeDefined();
            });

            it('getCompanies function is called', function () {
                $httpBackend
                    .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.profile + appConfig.userId + '/' + profileUrlConfig.resources.companies)
                    .respond(response);

                companiesService.getCompanies();
                $httpBackend.flush();

            });

        });

        describe('companyService getCurrentCompany testing', function () {

            it('getCurrentCompany is defined', function () {
                expect(companiesService.getCurrentCompany).toBeDefined();
            });

            it('getCurrentCompany function is called', function () {
                var companies = ['00001000485','00001040484','00002204001'];
                companiesService.getCurrentCompany(companies);
            });

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


    });

})();