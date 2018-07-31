
(function () {

    "use strict";


    describe('Time Off Service Testing', function () {
        var timeOffService,
            service,
            $httpBackend,
            appConfig;
        var response ={"data":{"peoId":"PAS","peoName":"Passport","companyInfo":[{"companyId":"36T","companyDesc":"Paul Capital Advisors LLC","parentOrg":"0072","shortDesc":"P.C.A","companyCode":"P.C.A"},{"companyId":"4OV","companyDesc":"PCATN","parentOrg":"5159","shortDesc":"PCATN","companyCode":"PCATN"},{"companyId":"4U1","companyDesc":"Top Tier Capital Partners LLC","parentOrg":"5345","shortDesc":"Top Tier C","companyCode":"Top Tier C"},{"companyId":"4HX","companyDesc":"Paul Capital Advisors CAN","parentOrg":"4910","shortDesc":"PCA CAN","companyCode":"PCA CAN"}],"vertical":null,"verticalName":null},"_requestId":"5e74aec8-2bfe-4112-b4a3-ba721d97d7ed","_statusCode":"200","_statusText":"OK","_statusMessage":"Retrieved companies successfully"};

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                function successCallback(response){
                    return response;
                };
                timeOffService = $injector.get('timeOffService');
                appConfig = $injector.get('appConfig');
                $httpBackend = $injector.get('$httpBackend');

            });

        });


        it('Time Off Service is defined', function () {
            expect(timeOffService).toBeDefined();
        });


        describe('time off Service createCurrentCompanyIdCookie testing', function () {

            it('createCurrentCompanyIdCookie is defined ', function () {

               expect(timeOffService.createCurrentCompanyIdCookie).toBeDefined();
            });

            it('createCurrentCompanyIdCookie is called',function(){
                var companyId = '00001099190';
                timeOffService.createCurrentCompanyIdCookie(companyId);
            });

        });

        describe('timeOffService deleteCurrentCompanyIdCookie testing', function () {

            it('deleteCurrentCompanyIdCookie is defined', function () {
                expect(timeOffService.deleteCurrentCompanyIdCookie).toBeDefined();
            });

            it('deleteCurrentCompanyIdCookie is called', function () {
                timeOffService.deleteCurrentCompanyIdCookie();
            });

        });

        describe('timeOffService getTimeOffWidgetData testing', function () {

            it('getTimeOffWidgetData is defined', function () {
                expect(timeOffService.getTimeOffWidgetData).toBeDefined();
            });

        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


    });

})();
