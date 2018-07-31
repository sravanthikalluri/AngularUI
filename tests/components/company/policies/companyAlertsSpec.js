/**
 * Created by Santosh on 10/23/2015.
 */

describe('Company Alerts Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('Company alert is defined', function () {

        expect(company).toBeDefined();
        expect(company.companyPoliciesAlertMessages).toBeDefined();
        expect(company.companyPoliciesAlertMessages.creationFail).toBeDefined();
        expect(company.companyPoliciesAlertMessages.successSaveMsg).toBeDefined();
        expect(company.companyPoliciesAlertMessages.dataExistsValidation).toBeDefined();
        expect(company.companyPoliciesAlertMessages.dataExceptionMsg).toBeDefined();
        expect(company.companyPoliciesAlertMessages.validationMsg).toBeDefined();

    });

    it('Company alert is equal to specified constants', function () {

        expect(company.companyPoliciesAlertMessages.creationFail).toEqual('Benefits Policies creation has been failed.');
        expect(company.companyPoliciesAlertMessages.successSaveMsg).toEqual('Details are saved successfully');
        expect(company.companyPoliciesAlertMessages.dataExistsValidation).toEqual('Data is not available for this personId');
        expect(company.companyPoliciesAlertMessages.dataExceptionMsg).toEqual('Data is not coming due to internal problems.');
        expect(company.companyPoliciesAlertMessages.validationMsg).toEqual('Please enter goal/limited amount.');

    });


});
