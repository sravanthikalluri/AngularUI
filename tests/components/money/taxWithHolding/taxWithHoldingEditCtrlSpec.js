/*
/!**
 * Created by Santosh on 10/30/2015.
 *!/



'use strict';
describe('Tax With Holding Edit Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        usResponse = {
            "data": [{"taxMaritalStat": "S", "taxMarStatDesc": "Single","exempt": "Yes"}, {
                "taxMaritalStat": "M",
                "taxMarStatDesc": "Married",
                "exempt": "Yes"
            }], "_statusCode": "200", "_statusText": "OK"
        };

    var $compile,$body = $('body');


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            $compile = $injector.get('$compile');
            $scope.taxWithHoldingsEditForm = function(){
                $scope.visibletaxWithholdingsNew = !$scope.visibletaxWithholdingsNew;
            };
            $scope.setNEStateAllowancesRequestedData = function(index){
                return index;
            };
            $scope.setNEStateMaritalStatusData = function(index){
                return index;
            };
            $scope.setNEStateMaritalStatusData = function(index){
                return index;
            };
            $scope.disableStateAllowances = function(payDedCode){
                return false;
            };
            $scope.date_label = "Effective 09/23/2016";
            $injector.get('$controller')('editCtrl', {$scope: $scope});

        });

        $scope.maritalStatusData = usResponse.data;

        $scope.taxWithHolingDataObject = usResponse.data;
        $scope.taxWithHolingDataObject[0].maritalStatusList = usResponse.data;

        $scope.maritalStatusData = [];
        $scope.taxWithHoldingData = {};
        $scope.taxWithHoldingData.addlAmount = 0;
    });

    describe('change function testing', function () {

        it('change is defined', function () {
            expect($scope.change).toBeDefined();
        });

        it('change is function index is 1  conf = Yes type = F ', function () {
            var conf = 'Yes';
            var index = 1;
            var type = 'F';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);

            expect($scope.editStateFieldsDisabled).toBeTruthy();



        });

        it('change is function index is 0', function () {
            var conf = 'Yes';
            var index = 0;
            var type = 'F';
            var confirmed = 'Yes';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);

            var fedAllowanceMaritalStatusUSResponse = {
                "data": [{
                    "taxMaritalStat": "S",
                    "taxMarStatDesc": "Single"
                }, {"taxMaritalStat": "M", "taxMarStatDesc": "Married"}], "_statusCode": "200", "_statusText": "OK"
            };

            $httpBackend
                .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats +"/"+$scope.taxWithHolingDataObject[index].payDedCode)
                .respond(200, fedAllowanceMaritalStatusUSResponse);


            $scope.change(confirmed, index, type, obj);
            $httpBackend.flush();

            var type = 'S';
            var confirmed = 'Yes';

            $scope.change(confirmed, index, type, obj);


        });

        it('change is function index is 0 with failure response', function () {
            var conf = 'Yes';
            var index = 0;
            var type = 'F';
            var confirmed = 'Yes';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "400", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);

            if (conf === 'Yes' && type === 'F') {
                expect($scope.editFieldsDisabled).toBeTruthy();

            }

            else if (conf === 'No' && type === 'F') {
                expect($scope.editFieldsDisabled).toBeFalsy();
                obj.data.stateTaxWithholdings.addlAmount = $scope.fedAmnt;
                expect($scope.fedAmnt).toEqual(obj.data.stateTaxWithholdings.addlAmount);

            }

            var fedAllowanceMaritalStatusUSResponse = {
                "data": [{
                    "taxMaritalStat": "S",
                    "taxMarStatDesc": "Single"
                }, {"taxMaritalStat": "M", "taxMarStatDesc": "Married"}], "_statusCode": "400", "_statusText": "OK","_error":{"detailMessage":"error"}
            };

            $httpBackend
                .whenGET(moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxUtils + moneyUrlConfig.resources.taxMaritalStats +"/"+$scope.taxWithHolingDataObject[index].payDedCode)
                .respond(400, fedAllowanceMaritalStatusUSResponse);


            $scope.change(confirmed, index, type, obj);
            $httpBackend.flush();

            var type = 'S';
            var confirmed = 'Yes';

            $scope.change(confirmed, index, type, obj);



        });



        it('change is function index is 0 and type is F', function () {
            var conf = 'No';
            var index = 0;
            var type = 'F';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "federalAllowancesRequested":true,"_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);

            expect($scope.editFieldsDisabled).toBeFalsy();


        });


        it('change is function index is 0  conf = No type = F ', function ()   {
            var conf = 'No';
            var index = 0;
            var type = 'F';
            $scope.maritalObj = {};
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);

            expect($scope.editStateFieldsDisabled).toBeFalsy();



        });

        it('change is function index is 0 and type is S', function () {
            var conf = 'No';
            var index = 0;
            var type = 'S';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "stateallowancesRequested":true,"maritalStateObj":true,"_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);



        });

        it('change is function index is 0 and type is S with stateallowancesRequested as false', function () {
            var conf = 'No';
            var index = 0;
            var type = 'S';
            var obj = {
                "data": [{
                    "stateTaxWithholdings": [{
                        "addlAmount": "0",
                        "addlExempts": "0",
                        "allowancesRequested": "0",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "31T"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "0",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-17",
                        "exempt": "Yes",
                        "maritalStatus": "Single",
                        "type": "Federal tax",
                        "payControlOrg": "31T"
                    }]
                }, {
                    "stateTaxWithholdings": [{
                        "addlExempts": "0",
                        "allowancesRequested": "12",
                        "payDedCode": "CA",
                        "relatedEntity": "$$US",
                        "desc": "California State Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "maritalStatus": "Single, or Married with two or more incomes",
                        "type": "State tax",
                        "payControlOrg": "7T1"
                    }],
                    "fedTaxWithholdings": [{
                        "addlExempts": "",
                        "allowancesRequested": "18",
                        "payDedCode": "$$US",
                        "relatedEntity": "$$US",
                        "desc": "Federal Tax",
                        "effectiveDate": "2015-10-01",
                        "exempt": "No",
                        "marriedFileSingle": "N",
                        "maritalStatus": "Married",
                        "type": "Federal tax",
                        "payControlOrg": "7T1"
                    }]
                }], "stateallowancesRequested":false,"maritalStateObj":true,"_statusCode": "200", "_statusText": "OK"
            };


            $scope.maritalStatusData[index] = $scope.taxWithHolingDataObject[0].maritalStatusList;

            $scope.change(conf, index, type, obj);



        });


    });

    describe('taxWithHoldingSaveData function testing', function () {

        it('taxWithHoldingSaveData is defined', function () {
            expect($scope.taxWithHoldingSaveData).toBeDefined();
        });


        it('taxWithHoldingSaveData  function call', function () {

            $scope.taxWithHoldingSaveData();

            expect($scope.submitted).toBeDefined();
            expect($scope.submitted).toBeTruthy();

            expect($scope.message).toEqual(money.taxWithHoldings.residentConfirmationMsg);
        });

        it('taxWithHoldingSaveData  function call with nonResidentislDeclared = Y', function () {

            $scope.nonResidentislDeclared = 'Y';

            $scope.taxWithHoldingSaveData();

        });

    });

    describe('saveMethod function testing', function () {

        it('saveMethod is defined', function () {
            expect($scope.saveMethod).toBeDefined();
        });

        it('saveMethod function call with success', function () {
            var i = '<input type="text" id="trinetTaxInputId" class="no-bg no-border medium" value="05/31/2016"></input>';
            var eli;
            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();
            for (var obj in $scope.taxWithHolingDataObject) {
                $scope.taxWithHolingDataObject[obj].type = [];
                $scope.taxWithHolingDataObject[obj].maritalStatusValue = $scope.taxWithHolingDataObject[obj];
            }
            var res={
            "data": "",
            "_statusCode": "200",
            "_statusText": "OK",
            "_statusMessage": "Updated Successfully",
            "_meta": []
            };

            $httpBackend.when('PUT',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.withHoldings+'?enableValidation=true', $scope.taxWithHoldingNewObject)
                .respond(200,res);
            $scope.saveMethod();

            $httpBackend.flush();


        });

        it('saveMethod function call failure', function () {
            var i = '<input type="text" id="trinetTaxInputId" class="no-bg no-border medium" value="03/29/2016"></input>';
            var eli;
            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();
            for (var obj in $scope.taxWithHolingDataObject) {
                $scope.taxWithHolingDataObject[obj].type = [];
                $scope.taxWithHolingDataObject[obj].maritalStatusValue = $scope.taxWithHolingDataObject[obj];
            }
            var res={
                        "data": "",
                        "_statusCode": "400",
                        "_statusText": "OK",
                        "_statusMessage": "Updated Successfully",
                        "_meta": [],
                        "_error":{"detailMessage":"error"}
                        };
            $httpBackend.when('PUT',moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.taxWithholding + "/" + appConfig.companyId + "/" +
                appConfig.userId + moneyUrlConfig.resources.withHoldings+'?enableValidation=true', $scope.taxWithHoldingNewObject)
                .respond(400,res);

            $scope.saveMethod();

            $httpBackend.flush();
        });

        it('saveMethod function call', function () {
            var i = '<input type="text" id="trinetTaxInputId" class="no-bg no-border medium" value="05/31/2016"></input>';
            var eli;
            eli = $compile(i)($scope);
            $body.append(eli);
            $rootScope.$digest();
            for (var obj in $scope.taxWithHolingDataObject) {
                $scope.taxWithHolingDataObject[obj].type = ['Local'];
                $scope.taxWithHolingDataObject[obj].maritalStatusValue = $scope.taxWithHolingDataObject[obj];
            }
            $scope.isSuccess = false;
            $scope.saveMethod();

        });

    });

    describe('if statement testing ', function () {
        var $scope = {};
        var appConfig = {};
        appConfig.userId = 1234;
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = appConfig.userId;
        }

        expect($scope.appUserId).toBeDefined();
    });

    describe('hideSPTest function testing',function(){
        it('hideSPTest is defined',function(){
            expect($scope.hideSPTest).toBeDefined();
        });

        it('hideSPTest function call',function(){
            $scope.hideSPTest();
        });
    });

    describe('openSPTest function testing',function(){
        it('openSPTest is defined',function(){
            expect($scope.openSPTest).toBeDefined();
        });

        it('openSPTest function call',function(){
            $scope.openSPTest();
        });
    });

    describe('editFieldsDisabledEvent $on function testing',function(){
        it('editFieldsDisabledEvent test',function(){
            spyOn($scope,'change');
            var data = {"exempt":"","type":""};
            $rootScope.$broadcast('editFieldsDisabledEvent',data);
            expect($scope.change).toHaveBeenCalled();
        });
    });

    describe('open function testing',function() {
        it('open is defined', function () {
            expect($scope.open).toBeDefined();
        });

        it('when open method is called',function(){
            $scope.payrollDates=['2016-03-31', '2016-04-15', '2016-04-29', '2016-05-13', '2016-05-31', '2016-06-15', '2016-06-30', '2016-07-15', '2016-07-29', '2016-08-15', '2016-08-31', '2016-09-15', '2016-09-30', '2016-10-14', '2016-10-31', '2016-11-15', '2016-11-30', '2016-12-15', '2016-12-30'];
            var event = jQuery.Event('open');
            $scope.open(event);
            event.preventDefault();
            event.stopPropagation();
            expect($scope.opened).toBe(true);
        });

        it('when open method is called with length 0',function(){
            $scope.payrollDates = [];
            var event = jQuery.Event('open');
            $scope.open(event);
            event.preventDefault();
            event.stopPropagation();
            expect($scope.opened).toBe(true);
        });


    });

    describe('disabled function testing',function() {
        it('disabled is defined', function () {
            expect($scope.disabled).toBeDefined();
        });

        it('when disabled method is called for sunday as date', function () {
            var date = '2016-03-31';
            var mode = 'day';
           $scope.disabled(date, mode);
        });
    });

    describe('cancel function testing',function(){
        it('cancel is defind',function(){
            expect($scope.cancel).toBeDefined();
        });

        it('cancel function call with false',function(){
            $scope.userForm = {};
            $scope.userForm.$pristine = false;
            $scope.cancel();
        });

        it('cancel function call with true',function(){
            $scope.userForm = {};
            $scope.userForm.$pristine = true;
            $scope.cancel();
        });
    });

    describe('checkMarriedFileSingle function testing',function(){
        it('checkMarriedFileSingle is defined',function(){
            expect($scope.checkMarriedFileSingle).toBeDefined();
        });

        it('checkMarriedFileSingle function call',function(){
            $scope.taxWithHolingDataObject = [{"taxMaritalStat": "S", "taxMarStatDesc": "Single","exempt": "Yes"}, {"maritalStatusValue":{"taxMaritalStat": "M"},"taxMarStatDesc": "Married","exempt": "Yes","marriedFileSingle":"Yes"}];
            var index = 1;
            $scope.checkMarriedFileSingle(index);
        });
    });

    describe('allowancesRequestedChange function testing',function(){
        it('allowancesRequestedChange is defined',function(){
            expect($scope.allowancesRequestedChange).toBeDefined();
        });

        it('allowancesRequestedChange function call with value as undefined',function(){
            var value = {};
            var elemId = 1;
            $scope.allowancesRequestedChange(value,elemId);
        });

        it('allowancesRequestedChange function call with value as defined',function(){
            var value = {"allowancesRequested":""};
            var elemId = 1;
            $scope.allowancesRequestedChange(value,elemId);
        });
    });

    describe('enableConfirm function testing',function(){
        it('enableConfirm is defined',function(){
            expect($scope.enableConfirm).toBeDefined();
        });

        it('enableConfirm function call',function(){
            $scope.enableConfirm();
        });
    });

    afterEach(function(){
        $body.empty();
    });



});
*/
