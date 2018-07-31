/**
 * Created by jaya krishna on 10/29/2015.
 */

describe('DirectDeposit Controller Testing', function () {
    var $rootScope;
    var $scope;
    var $routeParams;
    var $timeout;
    var timerCallback;
    var $compile, $body = $('body');


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $scope.translation = {"yesDiscardChanges": "Yes, discard changes"};
            $injector.get('$controller')('directDepositCtrl', {$scope: $scope});
            $routeParams = $injector.get('$routeParams');
            $timeout = $injector.get('$timeout');
            $compile = $injector.get('$compile');
        });
        $routeParams.selectedTab = 1;
        $scope.selectedTab = $routeParams.selectedTab;
        $scope.alert = [
            {key1: 'value1'},
            {key2: 'value2'},
            {key3: 'value3'}
        ];
        timerCallback = jasmine.createSpy('timerCallback');
    });

    it('selectedTab is defined', function () {
        expect($scope.selectedTab).toBeDefined();
    });

    it('closeAlert is defined', function () {
        expect($scope.closeAlert).toBeDefined();
    });

    it('constants.emitDDAlert Event danger testing', function () {
        var alert = [{
            type : constants.danger,
            msg : money.retirementPlan.validationMsg
        }];

        $rootScope.$broadcast(constants.emitDDAlert,  alert);

        expect($scope.alert).toEqual([ { key1 : 'value1' }, { key2 : 'value2' }, { key3 : 'value3' } ]);

    });

    it('constants.emitNoData Event danger testing', function () {
        var alert = [{
            type : constants.danger,
            msg : money.retirementPlan.validationMsg
        }];

        $timeout.flush(20);
        $rootScope.$broadcast(constants.emitNoData,  alert);

        expect($scope.noData).toEqual(alert);

    });

    describe('activeLink function testing', function () {

        it('activeLink function is defined', function () {
            expect($scope.activeLink).toBeDefined();
        });

        it('activeLink function is called with selected as earnings', function () {
            var HTML = '<button id="reimsave" name="save" class="pointerEvent" ng-enabled="enableReimburse " type="submit" data-toggle="modal" data-target="#myConfirmation" ng-click="insertReimbursementAccount(fsaSelected,apSelected,effectiveDate)" ng-bind="translation.save"></button>';
            var HTML1 = '<button id="reimedit" class="trinet-secondary-action-btn pull-right" ng-click="toggleEditReimbursement()" ng-bind="translation.edit_account"></button>';

            var eli = $compile(HTML)($scope);
            $body.append(eli);
            $rootScope.$digest();

            var element = $compile(HTML1)($scope);
            $body.append(element);
            $rootScope.$digest();

            var slected = 'earnings';
            $scope.activeLink(slected);
        });
        it('activeLink function is called with selected as sample', function () {
            var HTML = '<button id="reimsave" name="save" class="pointerEvent" ng-enabled="enableReimburse " type="submit" data-toggle="modal" data-target="#myConfirmation" ng-click="insertReimbursementAccount(fsaSelected,apSelected,effectiveDate)" ng-bind="translation.save"></button>';
            var HTML1 = '<button id="reimedit" class="trinet-secondary-action-btn pull-right" ng-click="toggleEditReimbursement()" ng-bind="translation.edit_account"></button>';

            var eli = $compile(HTML)($scope);
            $body.append(eli);
            $rootScope.$digest();

            var element = $compile(HTML1)($scope);
            $body.append(element);
            $rootScope.$digest();

            $scope.selectedTab = "earnings";
            var selected = 'sample';
            $scope.activeLink(selected);
        });


        it('activeLink function is called with selected as reimbursements', function () {
            var HTML = '<button id="earningsaveBtn" name="save" class="pointerEvent" type="submit" ng-disabled="enableSave || estimatedNewPayCheck" ng-click="saveData()" ng-bind="translation.save"></button>';
            var HTML1 = '<button id="viewonly"  ng-if="!dftrue" class="trinet-secondary-action-btn pull-right no-marg" ng-click="toggleEdit(selectedEffectiveDate)" ng-show="isEditViewable" ng-bind="translation.edit_account"></button>';

            var eli = $compile(HTML)($scope);
            $body.append(eli);
            $rootScope.$digest();

            var element = $compile(HTML1)($scope);
            $body.append(element);
            $rootScope.$digest();

            var slected = 'reimbursements';
            $scope.activeLink(slected);
        });

    });

    describe('closeAlert function testing', function () {
        it('closeAlert is defined', function () {
            expect($scope.closeAlert).toBeDefined();
        });

        it('closeAlert function call', function () {
            $scope.errorAlert = true;
            $scope.closeAlert();
        });
    });

    describe('hideAlert function testing', function () {
        it('hideAlert is defined', function () {
            expect($scope.hideAlert).not.toBeDefined();
        });
    });

    describe('makeNetBalanceAccount  function testing',function(){

        it('makeNetBalanceAccount  function is defined',function(){
            expect($scope.makeNetBalanceAccount ).toBeDefined();
        });

        it('makeNetBalanceAccount  function is called',function(){
            var earningsData =   {"Currently Effective": [{
                "effectiveDate": "2015-09-23",
                "accountName": "Account Name",
                "accountType": "Savings",
                "routingNumber": "333333333",
                "bankId": null,
                "branchId": null,
                "accountNumber": "333333333",
                "priority": 5,
                "netBalance": false,
                "fsaAccount": false,
                "apAccount": false,
                "amount": "500",
                "percent": null,
                "uniqueId": 1
            }] };
            $scope.makeNetBalanceAccount(earningsData);
        });

        it('activeLink function is called with selected as reimbursements', function () {
            var slected = 'reimbursements';
            $scope.activeLink(slected);
        });

    });

    describe('childParentAlertMsg function testing', function () {
        it('childParentAlertMsg is defined', function () {
            expect($scope.childParentAlertMsg).toBeDefined();
        });

        it('childParentAlertMsg function call', function () {
            var data = "error";
            $scope.childParentAlertMsg(data);
        });
    });

    describe('resetPriority function testing',function(){
        it('resetPriority is defined',function(){
            expect($scope.resetPriority).toBeDefined();
        });

        it('resetPriority function call with net balance false',function(){
             var earningsData = [{
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }];
             $scope.resetPriority(earningsData);
        });

        it('resetPriority function call with net balance true',function(){
             var earningsData = [{
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": true,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }];
             $scope.resetPriority(earningsData);
        });
    });

    describe('resetPriorityOrder function testing',function(){
        it('resetPriorityOrder is defined',function(){
            expect($scope.resetPriorityOrder).toBeDefined();
        });

        it('resetPriorityOrder function call',function(){
             var earningsData = [{
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": false,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }];
             var index = 0;
             $scope.resetPriorityOrder(earningsData,index);
        });
    });

    describe('getNetBalanceAccountIndex function testing',function(){
        it('getNetBalanceAccountIndex is defined',function(){
            expect($scope.getNetBalanceAccountIndex).toBeDefined();
        });

        it('getNetBalanceAccountIndex function call',function(){
             var data = [{
                            "effectiveDate": "2015-09-23",
                            "accountName": "Account Name",
                            "accountType": "Savings",
                            "routingNumber": "333333333",
                            "bankId": null,
                            "branchId": null,
                            "accountNumber": "333333333",
                            "priority": 5,
                            "netBalance": true,
                            "fsaAccount": false,
                            "apAccount": false,
                            "amount": "500",
                            "percent": null,
                            "uniqueId": 1
                        }];
             $scope.getNetBalanceAccountIndex(data);
        });
    });

    afterEach(function () {
        $body.empty();
    });
});
