/**
 * Created by jaya krishna on 10/29/2015.
 */
describe('New Account Controller Testing', function () {
    var $rootScope;
    var $scope;
    var ngDialog;

    var simpleHTML = '<select id="choosenewaccount" class="col-md-5 col-sm-5 medium"  name="accountType">' +
            '<option value="3">Select an Account Type</option>' +
            ' </select>',
        $compile,
        el,
        $body = $('body');


    beforeEach(function () {
        module('TrinetPassport');
        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.addAccount = function (op, canadianFields) {
                var data = {"op":op,"fields":canadianFields};
                return data;
            };
            $scope.translation = {"money":{"direct_deposit":{"addAccountFor":"Add Account for ","validations":{"transitRoutingNumber1":"Invalid Transit Routing Number.Please use the links below if you need help","transitRoutingNumber2":"Invalid Transit Routing Number.\nTransit Routing Number be 9 numeric digits long and should begin with 0,1,2 or 3.\nPlease use the links below if you need help."}}},"yes": "Yes",  "pageValidationMessage":"This page contains errors. Please correct the errors below.","yesDiscardChanges": "Yes, discard changes"};
            $injector.get('$controller')('newAccountCtrl', {$scope: $scope});
            ngDialog = $injector.get('ngDialog');
            $compile = $injector.get('$compile');
        });


    });

    describe('validateName function testing', function () {
        it('validateName is defined', function () {
            expect($scope.validateName).toBeDefined();
        });

    });

    describe('validatePercentage function testing', function () {
        it('validatePercentage is defined', function () {
            expect($scope.validatePercentage).toBeDefined();
        });

        it('validatePercentage function called with a parameter', function () {
            var errorLog = {
                'percentageValidation': 'Percentage should not be more than 100.'
            };
            var percentage = 101;
            $scope.validatePercentage(percentage);
            expect($scope.errorLog).toEqual(errorLog);
        });
    });

    describe('validateAddAccount function testing', function () {
        it('validateAddAccount is defined', function () {
            expect($scope.validateAddAccount).toBeDefined();
        });

        it('validateAddAccount function $scope.addAccountForm.$valid = false', function () {

            $scope.addAccountForm = {};
            $scope.addAccountForm.$valid = true;
            $scope.addAccountData = {};
            $scope.addAccountData = {"amount": 100, "percentage": 100, "routingNumber": '010101010'};
            $scope.checkRemAmount = 200;
            $scope.percentageShould = 200;
            var val = 1;

            $scope.validateAddAccount(val);


        });

        it('validateAddAccount function $scope.addAccountForm.$valid = true', function () {

            $scope.addAccountForm = {};
            $scope.addAccountForm.$valid = true;
            $scope.addAccountData = {};
            $scope.addAccountData = {"amount": 100, "percentage": 100, "routingNumber": '325070760'};
            $scope.checkRemAmount = 99;
            $scope.percentageShould = 99;
            var val = 1;

            $scope.validateAddAccount(val);


        });


    });

    describe('validateNewAccount function testing', function () {
        it('validateNewAccount is defined', function () {
            expect($scope.validateNewAccount).toBeDefined();
        });

        it('validateNewAccount function  $scope.newAccountForm.$valid = true', function () {
            $scope.newAccountForm = {};
            $scope.newAccountData = {};
            $scope.newAccountData.routingNumber = '325070760';
            $scope.newAccountForm.$valid = true;
            var val = 1;

            $scope.validateNewAccount(val);


        });

        it('validateNewAccount function  $scope.newAccountForm.$valid = false', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();

            $scope.newAccountForm = {};
            $scope.newAccountData = {};
            $scope.newAccountData.routingNumber = '010101010';
            $scope.newAccountForm.$valid = true;

            var val = 1;
            $scope.validateNewAccount(val);


        });


        it('validateNewAccount function  $scope.newAccountForm.$valid = false', function () {
            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            $scope.newAccountForm = {};
            $scope.newAccountForm.$valid = false;


        });


    });

    describe('closeModal function testing', function () {
        it('closeModal is defined', function () {
            expect($scope.closeModal).toBeDefined();
        });

        it('closeModal function  $scope.addAccountForm.$dirty = false', function () {

            spyOn(ngDialog, 'closeAll')
            $scope.newAccountForm = false;
            $scope.addAccountForm = {};
            $scope.addAccountForm.$dirty = false;

            $scope.closeModal();

            expect(ngDialog.closeAll).toHaveBeenCalled();
        });

        it('closeModal function  $scope.addAccountForm.$dirty = true', function () {

            $scope.addAccountForm = {};
            $scope.addAccountForm.$dirty = true;

            $scope.newAccountForm = {};
            $scope.newAccountForm.$dirty = false;

            $scope.closeModal();

        });

        it('closeModal function  $scope.addAccountForm.$dirty = true', function () {

            $scope.addAccountForm = {};
            $scope.addAccountForm.$dirty = true;

            $scope.newAccountForm = undefined;

            $scope.closeModal();

        });


        it('closeModal function  $scope.newAccountForm.$dirty = true', function () {

            spyOn(ngDialog, 'closeAll')
            $scope.newAccountForm = {};
            $scope.newAccountForm.$dirty = true;

            $scope.closeModal();

            expect($scope.yes_btn).toEqual('Yes');
        });


    });

    describe('newChange function testing', function () {
        it('newChange is defined', function () {
            expect($scope.newChange).toBeDefined();
        });

        it('newChange function is called', function () {
            $scope.newChange();
            expect($scope.percentageValueReq).toBeFalsy();
            expect($scope.dollarValueRequired).toBeFalsy();
        });
    });


    describe('validateName function testing', function () {
        it('validateName is defined', function () {
            expect($scope.validateName).toBeDefined();
        });

        it('validateName function is called', function () {
            var name = 'Test';
            $scope.validateName(name);


        });


    });


    describe('selectedAccountType function testing', function () {
        it('selectedAccountType is defined', function () {
            expect($scope.selectedAccountType).toBeDefined();
        });

        it('selectedAccountType function is called', function () {
            var selectedAccountType = '1';
            $scope.selectedAccountType(selectedAccountType);
            expect($scope.selectAccountType).toBeFalsy();


        });

        it('selectedAccountType function is called with account type as 3', function () {
            var selectedAccountType = '3';
            $scope.selectedAccountType(selectedAccountType);
            expect($scope.selectAccountType).toBeTruthy();


        });


    });


    describe('newChange  function testing', function () {
        it('newChange  is defined', function () {
            expect($scope.newChange).toBeDefined();
        });

        it('newChange  function is called', function () {
            $scope.newChange();
            expect($scope.percentageValueReq).toBeFalsy();
            expect($scope.dollarValueRequired).toBeFalsy();


        });


    });

    describe('closeAlert function testing', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('closeAlert function call', function () {
            $scope.closeAlert();
        });
    });

    describe('verifyRoutingNum function testing', function () {
        it('verifyRoutingNum is defined', function () {
            expect($scope.verifyRoutingNum).toBeDefined();
        });

        it('verifyRoutingNum function call with invalid value', function () {
            var value = '010101010';
            $scope.verifyRoutingNum(value);
        });

        it('verifyRoutingNum function call with valid value', function () {
            var value = '325070760';
            $scope.verifyRoutingNum(value);
        });
        it('verifyRoutingNum function call with charecter value', function () {
            var value = 'ASD012112';
            $scope.verifyRoutingNum(value);
        });
    });


    describe('setCanadian function testing', function () {
        it('setCanadian is defined', function () {
            expect($scope.setCanadian).toBeDefined();
        });

        it('setCanadian function countryCode = CA is called', function () {
            $scope.setCanadian('CA');
            expect($scope.canadianFields).toBeTruthy();
        });

        it('setCanadian function countryCode = US is called', function () {
            $scope.setCanadian('US');
            expect($scope.canadianFields).toBeFalsy();
        });
    });

    afterEach(function () {
        $body.empty();
    });

});
