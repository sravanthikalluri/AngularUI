/**
 * Created by Santosh on 10/23/2015.
 */

describe('Benefits Alerts Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('benefits policies alert is defined', function () {
        expect(benefits).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages.creationFail).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages.successSaveMsg).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages.dataExistsValidation).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages.dataExceptionMsg).toBeDefined();
        expect(benefits.benefitsPoliciesAlertMessages.validationMsg).toBeDefined();
    });

    it('benefits policies alerts is equal to alerts specified', function () {

        expect(benefits.benefitsPoliciesAlertMessages.creationFail).toEqual('Benefits Policies creation has been failed.');
        expect(benefits.benefitsPoliciesAlertMessages.successSaveMsg).toEqual('Deatails are saved successfully');
        expect(benefits.benefitsPoliciesAlertMessages.dataExistsValidation).toEqual('Data is not available for this personId');
        expect(benefits.benefitsPoliciesAlertMessages.dataExceptionMsg).toEqual('Data is not coming due to internal problems.');
        expect(benefits.benefitsPoliciesAlertMessages.validationMsg).toEqual('Please enter goal/limited amount.');

    });


});
