/**
 * Created by Jayakrishna on 11/20/2015.
 */
describe('Money Url Config Testing', function () {

    beforeEach(function () {
        module('TrinetPassport');
    });

    it('moneyUrlConfigs are defined', function () {
        expect(moneyUrlConfig).toBeDefined();
        expect(moneyUrlConfig.moneyApi).toBeDefined();
        expect(moneyUrlConfig.moneyBaseUrl).toBeDefined();
        expect(moneyUrlConfig.resources).toBeDefined();

        expect(moneyUrlConfig.resources.payChecks).toBeDefined();
        expect(moneyUrlConfig.resources.payCheckDetails).toBeDefined();
        expect(moneyUrlConfig.resources.payCheckDetailsPdf).toBeDefined();
        expect(moneyUrlConfig.resources.payroll).toBeDefined();
        expect(moneyUrlConfig.resources.retirementPlan).toBeDefined();
        expect(moneyUrlConfig.resources.contributions).toBeDefined();
        expect(moneyUrlConfig.resources.all).toBeDefined();
        expect(moneyUrlConfig.resources.directDeposit).toBeDefined();
        expect(moneyUrlConfig.resources.accounts).toBeDefined();
        expect(moneyUrlConfig.resources.forms).toBeDefined();
        expect(moneyUrlConfig.resources.taxUtils).toBeDefined();
        expect(moneyUrlConfig.resources.taxMaritalStats).toBeDefined();
        expect(moneyUrlConfig.resources.taxWithholding).toBeDefined();
        expect(moneyUrlConfig.resources.withHoldings).toBeDefined();
        expect(moneyUrlConfig.resources.i9Status).toBeDefined();
    });

    it('moneyUrlConfigs are equal to specified constants', function () {
        expect(moneyUrlConfig.moneyBaseUrl).toEqual('/api-money/v1');

        expect(moneyUrlConfig.resources.payChecks).toEqual('/paychecks');
        expect(moneyUrlConfig.resources.payCheckDetails).toEqual('/paycheck-details');
        expect(moneyUrlConfig.resources.payCheckDetailsPdf).toEqual('/paycheck-details-pdf');
        expect(moneyUrlConfig.resources.payroll).toEqual('/payroll');

        expect(moneyUrlConfig.resources.retirementPlan).toEqual('/retirement-plan');
        expect(moneyUrlConfig.resources.contributions).toEqual('/contributions');
        expect(moneyUrlConfig.resources.all).toEqual('/all');
        expect(moneyUrlConfig.resources.directDeposit).toEqual('/direct-deposit');
        expect(moneyUrlConfig.resources.accounts).toEqual('/accounts');
        expect(moneyUrlConfig.resources.forms).toEqual('/forms');

        expect(moneyUrlConfig.resources.taxUtils).toEqual('/tax-util');
        expect(moneyUrlConfig.resources.taxMaritalStats).toEqual('/taxMaritalStats');
        expect(moneyUrlConfig.resources.taxWithholding).toEqual('/tax-withholding');
        expect(moneyUrlConfig.resources.withHoldings).toEqual('/withholdings');
        expect(moneyUrlConfig.resources.i9Status).toEqual('/i9Status');

    });
});
