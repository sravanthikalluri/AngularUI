/**
 * Created by Santosh on 10/23/2015.
 */

describe('Manage alerts Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('manage employee alerts are defined', function () {

        expect(employee).toBeDefined();
        expect(employee.managegGrp).toBeDefined();
        expect(employee.managegGrp.saveMessage).toBeDefined();
        expect(employee.managegGrp.DeleteMessage).toBeDefined();
        expect(employee.managegGrp.enterEffectiveDate).toBeDefined();

    });

    it('manage employee alerts are equal to specified constants', function () {

        expect(employee.managegGrp.saveMessage).toEqual('You have successfully submitted your change request');
        expect(employee.managegGrp.DeleteMessage).toEqual('You have Deleted Successfully');
        expect(employee.managegGrp.enterEffectiveDate).toEqual('Please enter effective date.');

    });


});
