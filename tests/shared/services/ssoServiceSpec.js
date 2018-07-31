(function(){
    "use strict";
 
    var storageKey , ssoService;
    
     describe('local Caching', function () {
         beforeEach(function () {
                module('TrinetPassport');
                inject(function ($injector) {
                    ssoService = $injector.get('ssoService');
                });
                    
                storageKey = "31T/00001000/sso-artifacts/ta";
                var store = {};

                spyOn(localStorage, 'getItem').andCallFake(function (key) {
                    var result = store[key];
                    if(result)
                        result = angular.fromJson(result);
                    return result;
                });
                spyOn(localStorage, 'setItem').andCallFake(function (key, value)                 {
                    store[key] = value + "";
                    return  store[key];
                });
                
                spyOn(localStorage, 'clear').andCallFake(function () {
                    store = {};
                });                
        });

        it("ssoService is defined", function () {
            expect(ssoService).toBeDefined();
        });
         
        it('No response should be found.', function () {
            expect(ssoService.getSSOResponseFromLocalStorage(storageKey)).toBeNull(); 
        }); 
         
        it('Should cache the response .', function () {
           var serverResponse = {"server" : "response"};
            ssoService.cacheSSOResponseToLocalStorage(serverResponse, storageKey); expect(ssoService.getSSOResponseFromLocalStorage(storageKey)).toEqual(serverResponse); 
        }); 
     });
    
    
    describe('construct resource URL', function () {
        angular.module('TrinetPassport').value('appConfig', {
            userId: "00001000483",
            companyId: "31T",
            peoId : "PAS"
        });
        
        inject(function ($injector) {
            ssoService = $injector.get('ssoArtifactService');
        });
        
        it('Should construct Resource URL .', function () {
           var result = "/api-sso/v1/IED/00001000483/sso-artifacts/ww?peoId=PAS";
            expect(ssoService.construtURLforGetSSOArtifactForID(globalUrlConfig.ssoArtifactBase, globalUrlConfig.resources.ssoArtifacts, {ssoId : 'ww'})).not.toEqual(result);
            
        });
    });
})();