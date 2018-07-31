/**
 * Created by Jayakrishna on 12/15/2015.
 */
describe('Benefits Url Config Testing', function () {
    beforeEach(function () {
        module('TrinetPassport');
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig).toBeDefined();
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig.policiesEmpApi).toBeDefined();
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig.policiesUrl).toBeDefined();
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig.resources).toBeDefined();
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig.resources.benefitPolicy).toBeDefined();
    });

    it('benefitsUrlConfig is defined', function () {
        expect(benefitsUrlConfig.resources.benefitPlan).toBeDefined();
    });
});
