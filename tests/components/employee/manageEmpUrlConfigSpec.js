/**
 * Created by Santosh on 10/23/2015.
 */

describe('Manage Employee URL Config Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('manageEmpUrlConfigs are defined', function () {

        expect(manageEmpUrlConfig).toBeDefined();
        expect(manageEmpUrlConfig.manageEmpApi).toBeDefined();
        expect(manageEmpUrlConfig.resources).toBeDefined();
        expect(manageEmpUrlConfig.manageBaseUrl).toBeDefined();
        expect(manageEmpUrlConfig.resources).toBeDefined();
        expect(manageEmpUrlConfig.resources.forms).toBeDefined();
        expect(manageEmpUrlConfig.resources.payFreq).toBeDefined();
        expect(manageEmpUrlConfig.resources.earnType).toBeDefined();
        expect(manageEmpUrlConfig.resources.allDepartments).toBeDefined();
        expect(manageEmpUrlConfig.resources.departmentEmployees).toBeDefined();
        expect(manageEmpUrlConfig.resources.location).toBeDefined();
        expect(manageEmpUrlConfig.resources.locationEmployees).toBeDefined();
        expect(manageEmpUrlConfig.resources.getSetRequest).toBeDefined();
        expect(manageEmpUrlConfig.resources.assignRole).toBeDefined();

    });


});