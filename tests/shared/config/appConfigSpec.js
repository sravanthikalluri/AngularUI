/**
 * Created by ganesh on 10/14/2015.
 */
describe('TrinetApp App Config Testing',function(){
    var appConfig;
    beforeEach(function(){
        module('TrinetPassport');
        inject(function($injector){
            appConfig = $injector.get('appConfig');
        });
        localStorage.setItem("empId",'00001000483');
        localStorage.setItem("companyId",'31T');
        localStorage.setItem("countryCode",'US');
        localStorage.setItem("stateCode",'CA');
        localStorage.setItem("designation", "Director");
        localStorage.setItem("username", "Raghavendra,Bonthala");
        localStorage.setItem("companyName", "TriNet");
        localStorage.setItem("planType","cop");
        localStorage.setItem("planCode","312");
        localStorage.setItem("planKey","S");
        localStorage.setItem("authToken",null);
        localStorage.setItem("pfClient","9CKY");
        localStorage.setItem("menuId","81");
        localStorage.setItem("myselfOrCompany","myself");
        localStorage.setItem("holidaySchedule","HG7");
        appConfig.companyId =   localStorage.getItem("companyId");
        appConfig.userId =   localStorage.getItem("empId");
        appConfig.positionId =   localStorage.getItem("empId");
        appConfig.username = localStorage.getItem("username");
        appConfig.countryCode = localStorage.getItem("countryCode");
        appConfig.stateCode = localStorage.getItem("stateCode");
        appConfig.designation = localStorage.getItem("designation");
        appConfig.companyName = localStorage.getItem("companyName");
        appConfig.authToken = localStorage.getItem("authToken");
        appConfig.pfClient = localStorage.getItem("pfClient");
        appConfig.holidaySchedule = localStorage.getItem("holidaySchedule");
    });
    it('appConfig is defined', function() {
        expect(appConfig).toBeDefined();
    });
    it('appconfig values are equal to specified constants', function() {
        expect(appConfig.userId).toEqual(localStorage.getItem("empId"));
        expect(appConfig.companyId).toEqual(localStorage.getItem("companyId"));
        expect(appConfig.pfClient).toEqual(localStorage.getItem("pfClient"));
        expect(appConfig.designation).toEqual(localStorage.getItem("designation"));
        expect(appConfig.positionId).toEqual(localStorage.getItem("empId"));
        expect(appConfig.stateCode).toEqual(localStorage.getItem("stateCode"));
        expect(appConfig.countryCode).toEqual(localStorage.getItem("countryCode"));
        expect(appConfig.username).toEqual(localStorage.getItem("username"));
        expect(appConfig.authToken).toEqual(localStorage.getItem("authToken"));
        expect(appConfig.companyName).toEqual(localStorage.getItem("companyName"));
    });
});
