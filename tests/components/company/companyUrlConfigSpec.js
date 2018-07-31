/**
 * Created by Santosh on 10/23/2015.
 */

describe('Company Url Config Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('companyUrlConfigs are defined', function () {

        expect(companyUrlConfig).toBeDefined();
        expect(companyUrlConfig.companyApi).toBeDefined();
        expect(companyUrlConfig.companyBaseUrl).toBeDefined();
        expect(companyUrlConfig.resources).toBeDefined();

    });


});