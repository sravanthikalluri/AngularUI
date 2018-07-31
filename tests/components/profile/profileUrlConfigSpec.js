/**
 * Created by rbonthala on 10/21/2015.
 */
describe('Profile Url Config Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('profileUrlConfigs are defined', function () {

        expect(profileUrlConfig).toBeDefined();
        expect(profileUrlConfig.profileBase).toBeDefined();
        expect(profileUrlConfig.profileApi).toBeDefined();
        expect(profileUrlConfig.profileBaseUrl).toBeDefined();
        expect(profileUrlConfig.resources.profile).toBeDefined();
        expect(profileUrlConfig.resources.name).toBeDefined();
        expect(profileUrlConfig.resources.contact).toBeDefined();
        expect(profileUrlConfig.resources.address).toBeDefined();
        expect(profileUrlConfig.resources.personalInfo).toBeDefined();


    });


    it('profileUrlConfigs are equal to specified constants', function () {
        expect(profileUrlConfig.profileBase).toEqual('/api-profile/v1/identity/');
        expect(profileUrlConfig.profileBaseUrl).toEqual('/api-profile/v1/');
        expect(profileUrlConfig.resources.profile).toEqual('profile/');
        expect(profileUrlConfig.resources.name).toEqual('/names');
        expect(profileUrlConfig.resources.contact).toEqual('/contacts');
        expect(profileUrlConfig.resources.address).toEqual('/addresses');
        expect(profileUrlConfig.resources.personalInfo).toEqual('/personals');
        expect(profileUrlConfig.resources.personalStatus).toEqual('/ssn');


    });


});