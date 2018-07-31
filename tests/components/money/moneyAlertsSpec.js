/**
 * Created by Santosh on 10/23/2015.
 */
describe('Money Alerts Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');
    });

    it('money alerts are defined', function () {

        expect(money).toBeDefined();
        expect(money.defaultMessages).toBeDefined();
        expect(money.taxWithHoldings).toBeDefined();
        expect(money.retirementPlan).toBeDefined();
        expect(money.directDeposit).toBeDefined();
        expect(money.workInbox).toBeDefined();

        //default messages
        expect(money.defaultMessages.mandatoryFields).toBeDefined();
        expect(money.defaultMessages.confirmNoChanges).toBeDefined();
        expect(money.defaultMessages.enterEffectiveDate).toBeDefined();

        //tax with holdings
        expect(money.taxWithHoldings.creationFail).toBeDefined();
        expect(money.taxWithHoldings.successSaveMsg).toBeDefined();
        expect(money.taxWithHoldings.residentConfirmationMsg).toBeDefined();
        expect(money.taxWithHoldings.NonResidentConfirmationMsg).toBeDefined();
        expect(money.taxWithHoldings.i9StatusCheckingMsg).toBeDefined();
        expect(money.taxWithHoldings.defaultMsg).toBeDefined();
        expect(money.taxWithHoldings.dateFieldValidationMsg).toBeDefined();
        expect(money.taxWithHoldings.rangeWarningMsg).toBeDefined();
        expect(money.taxWithHoldings.lockedMsg).toBeDefined();
        expect(money.taxWithHoldings.stateLockedMsg).toBeDefined();

        //retirement plan
        expect(money.retirementPlan.creationFail).toBeDefined();
        expect(money.retirementPlan.successSaveMsg).toBeDefined();
        expect(money.retirementPlan.dataExistsValidation).toBeDefined();
        expect(money.retirementPlan.dataExceptionMsg).toBeDefined();
        expect(money.retirementPlan.validationMsg).toBeDefined();

        //direct deposit
        expect(money.directDeposit.accountSaveSuccess).toBeDefined();
        expect(money.directDeposit.accountSaveFailure).toBeDefined();
        expect(money.directDeposit.reimbursementAccountSaveSucess).toBeDefined();
        expect(money.directDeposit.validationMsg).toBeDefined();
        expect(money.directDeposit.errorMsg).toBeDefined();
        expect(money.directDeposit.errorSaveMsg).toBeDefined();

        //work inbox
        expect(money.workInbox.workInboxSaveSuccess).toBeDefined();
        expect(money.workInbox.workInboxSaveFailure).toBeDefined();
        expect(money.workInbox.workInboxValidation).toBeDefined();

    });

    it('money alerts are equal to specified constants', function () {

        //default messages
        expect(money.defaultMessages.confirmNoChanges).toEqual("You did not make any changes do you want to save it?");
        expect(money.defaultMessages.enterEffectiveDate).toEqual('Please enter effective date.');
        expect(money.defaultMessages.mandatoryFields).toEqual('Please enter goal/limited amount.');

        //tax with holdings
        expect(money.taxWithHoldings.creationFail).toEqual('Tax Withholding creation has been failed.');
        expect(money.taxWithHoldings.successSaveMsg).toEqual('Your change has been successfully saved and can take up to 24 hours to become effective.');
        expect(money.taxWithHoldings.defaultMsg).toEqual('Edit your tax withholding below. If you do not make any changes, your tax withholding will automatically be set to the default amount shown below.');
        expect(money.taxWithHoldings.rangeWarningMsg).toEqual('You must use the same number of allowances for your local and state tax withholding. Any change you make to your state allowance will also be applied to your local tax.');
        expect(money.taxWithHoldings.lockedMsg).toEqual('The IRS has established a maximum of 99 for your federal withholding.');
        expect(money.taxWithHoldings.stateLockedMsg).toEqual('The IRS has established a maximum of 99 for your state withholding.');

        //retirement plan
        expect(money.retirementPlan.creationFail).toEqual('Retirement Plan creation has been failed.');
        expect(money.retirementPlan.successSaveMsg).toEqual('Retirement Plan details are saved successfully');
        expect(money.retirementPlan.dataExistsValidation).toEqual('Data is not available for this employeeId');
        expect(money.retirementPlan.dataExceptionMsg).toEqual('Data base server is busy unable to fetch the data.');
        expect(money.retirementPlan.validationMsg).toEqual('Please enter goal/limited amount.');

        //direct deposit
        expect(money.directDeposit.accountSaveSuccess).toEqual('Accounts have been updated successfully.');
        expect(money.directDeposit.accountSaveFailure).toEqual('Error occurred while updating accounts.');
        expect(money.directDeposit.validationMsg).toEqual('No changes done.');
        expect(money.directDeposit.errorMsg).toEqual('Could not Fetch Work Country Code of the employee.');
        expect(money.directDeposit.errorSaveMsg).toEqual('You should not save negative values.');

        //work inbox
        expect(money.workInbox.workInboxSaveSuccess).toEqual('Approved successfully.');
        expect(money.workInbox.workInboxSaveFailure).toEqual('Could not access Notifications.Please contact system admin.');
        expect(money.workInbox.workInboxValidation).toEqual('Please select action records.');

    });


});
