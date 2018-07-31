/**
 * Created by Naveen on 10/21/2015.
 */
describe('Profile Alerts Testing', function () {


    beforeEach(function () {
        module('TrinetPassport');

    });

    it('profile alerts are defined', function () {

        expect(profile).toBeDefined();
        expect(profile.defaultMessages).toBeDefined();
        expect(profile.names).toBeDefined();
        expect(profile.contactMethod).toBeDefined();
        expect(profile.address).toBeDefined();
        expect(profile.personalInfo).toBeDefined();
        expect(profile.emergencyContact).toBeDefined();

        //default messages
        expect(profile.defaultMessages.mandatoryFields).toBeDefined();
        expect(profile.defaultMessages.confirmNoChanges).toBeDefined();
        expect(profile.defaultMessages.enterEffectiveDate).toBeDefined();

        //names
        expect(profile.names.deleteAlert).toBeDefined();
        expect(profile.names.deletePreferredNameAlert).toBeDefined();
        expect(profile.names.deletePrefSuccess).toBeDefined();
        expect(profile.names.deleteSuccess).toBeDefined();
        expect(profile.names.effDateEmpty).toBeDefined();
        expect(profile.names.firstNameEmpty).toBeDefined();
        expect(profile.names.firstNameValid).toBeDefined();
        expect(profile.names.lastNameEmpty).toBeDefined();
        expect(profile.names.preCreate).toBeDefined();

        //contact method
        expect(profile.contactMethod.emailEmpty).toBeDefined();
        expect(profile.contactMethod.emailValid).toBeDefined();
        expect(profile.contactMethod.phoneValid).toBeDefined();
        expect(profile.contactMethod.telephoneNoEmpty).toBeDefined();

        //address
        expect(profile.address.addressLineEmpty).toBeDefined();
        expect(profile.address.addressSuccess).toBeDefined();
        expect(profile.address.cityEmpty).toBeDefined();
        expect(profile.address.confirmDelete).toBeDefined();
        expect(profile.address.countrySelect).toBeDefined();
        expect(profile.address.deleteAddrSuccess).toBeDefined();
        expect(profile.address.effDateEmpty).toBeDefined();

        //personal info
        expect(profile.personalInfo.effDateEmpty).toBeDefined();
        expect(profile.personalInfo.genderEmpty).toBeDefined();
        expect(profile.personalInfo.personalInfoDelete).toBeDefined();
        expect(profile.personalInfo.personalInfoDeleteConfirm).toBeDefined();
        expect(profile.personalInfo.personalInfoDeleteFail).toBeDefined();
        expect(profile.personalInfo.personalInfoSave).toBeDefined();
        expect(profile.personalInfo.personalInfoSaveFail).toBeDefined();
        expect(profile.personalInfo.ssnValid).toBeDefined();


        // emergency contact
        expect(profile.emergencyContact.addressLineEmpty).toBeDefined();
        expect(profile.emergencyContact.cityEmpty).toBeDefined();
        expect(profile.emergencyContact.contactDelete).toBeDefined();
        expect(profile.emergencyContact.contactNameEmpty).toBeDefined();
        expect(profile.emergencyContact.deleteAlert).toBeDefined();
        expect(profile.emergencyContact.emergencyContactCreationFail).toBeDefined();
        expect(profile.emergencyContact.emergencyContactCreationSuccess).toBeDefined();
        expect(profile.emergencyContact.emrgContactDelete).toBeDefined();
        expect(profile.emergencyContact.newConcatSave).toBeDefined();
        expect(profile.emergencyContact.postaCodeEmpty).toBeDefined();
        expect(profile.emergencyContact.primaryContactDelete).toBeDefined();
        expect(profile.emergencyContact.stateEmpty).toBeDefined();


    });

    it('Profile alerts are equal to specified constants', function () {

        //default messages
        expect(profile.defaultMessages.confirmNoChanges).toEqual("You haven't made any changes do you want to save it?");
        expect(profile.defaultMessages.enterEffectiveDate).toEqual('Please enter effective date.');
        expect(profile.defaultMessages.mandatoryFields).toEqual('Please enter mandatory fields.');

        //names
        expect(profile.names.deleteAlert).toEqual('Are you sure do you want to delete selected Primary Name?');
        expect(profile.names.deletePreferredNameAlert).toEqual('Are you sure do you want to delete this Preferred Name?');
        expect(profile.names.deletePrefSuccess).toEqual('Preferred Name deleted Successfully');
        expect(profile.names.deleteSuccess).toEqual('Primary Name deleted Successfully');
        expect(profile.names.effDateEmpty).toEqual('Effective Date cannot be empty');
        expect(profile.names.firstNameEmpty).toEqual('First Name must be entered');
        expect(profile.names.firstNameValid).toEqual('Enter Valid First Name.');
        expect(profile.names.lastNameEmpty).toEqual('Last Name must be entered');
        expect(profile.names.preCreate).toEqual('Preferred Name created Successfully');

        //contact method
        expect(profile.contactMethod.emailEmpty).toEqual('Please enter an email address');
        expect(profile.contactMethod.telephoneNoEmpty).toEqual('Phone Number must be entered');
        expect(profile.contactMethod.emailValid).toEqual(' Please enter a valid email address');
        expect(profile.contactMethod.phoneValid).toEqual(' Please enter a valid phone number');

        //address
        expect(profile.address.effDateEmpty).toEqual('Effective Date cannot be empty');
        expect(profile.address.addressLineEmpty).toEqual('Address Line 1 or Address Line 2 must be entered');
        expect(profile.address.cityEmpty).toEqual('City must be entered');
        expect(profile.address.countrySelect).toEqual('City must be entered');
        expect(profile.address.confirmDelete).toEqual('Do you want to delete selected address?');
        expect(profile.address.addressSuccess).toEqual('Address updated Successfully');
        expect(profile.address.deleteAddrSuccess).toEqual('Address deleted Successfully');

        //personal Info
        expect(profile.personalInfo.effDateEmpty).toEqual('Effective Date cannot be empty.');
        expect(profile.personalInfo.genderEmpty).toEqual('Gender must be entered.');
        expect(profile.personalInfo.ssnValid).toEqual('Please enter a valid Social Security.');
        expect(profile.personalInfo.personalInfoDelete).toEqual('Personal information has been deleted successfully.');
        expect(profile.personalInfo.personalInfoDeleteConfirm).toEqual('Do you want to delete this personal information?');
        expect(profile.personalInfo.personalInfoDeleteFail).toEqual('An error has occurred while deleting Personal information.');
        expect(profile.personalInfo.personalInfoSaveFail).toEqual('An error has occurred while saving Personal information.');
        expect(profile.personalInfo.personalInfoSave).toEqual('Personal information saved Successfully.');


        // emergency contact
        expect(profile.emergencyContact.stateEmpty).toEqual('State cannot be empty');
        expect(profile.emergencyContact.addressLineEmpty).toEqual('Address Line 1 must be entered');
        expect(profile.emergencyContact.cityEmpty).toEqual('City must be entered');
        expect(profile.emergencyContact.postaCodeEmpty).toEqual('Postal Code must be entered');
        expect(profile.emergencyContact.contactNameEmpty).toEqual('Contact Name cannot be blank');
        expect(profile.emergencyContact.contactDelete).toEqual('Deleted successfully');
        expect(profile.emergencyContact.primaryContactDelete).toEqual('You must have at least one primary contact.');
        expect(profile.emergencyContact.newConcatSave).toEqual('Emergency contact details are saved successfully');
        expect(profile.emergencyContact.deleteAlert).toEqual('Are you sure you want to delete this emergency contact?');
        expect(profile.emergencyContact.emergencyContactCreationSuccess).toEqual('Emergency contact has been created successfully.');
        expect(profile.emergencyContact.emergencyContactCreationFail).toEqual('Emergency contact creation has been failed.');
        expect(profile.emergencyContact.emrgContactDelete).toEqual('Emergency contact has been deleted successfully.');


    });


});