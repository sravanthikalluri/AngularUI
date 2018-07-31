/**
 * Created by JAY on 1/27/2017.
 */
'use strict';
trinetApp.controller('payrollEstimatesController', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.payFrame = false;
        $scope.noPercentStates = ['CT', 'DC', 'DE', 'HI', 'KY', 'LA', 'MA', 'MS', 'NJ', 'PR', 'UT'];
        $scope.symmetryPaycheckCityInfo = {
            "style": {"body": {"background-color": "#ebebec"}, "labels": {"color": "#f47b2a"}},
            "model": {}
        };

        var appUserId = '';

        $scope.setUserId = function (empId) {
            if (empId !== undefined) {
                appUserId = gso.getRouteParams().empId;
            } else {
                appUserId = gso.getAppConfig().userId;
            }
        };

        $scope.setUserId(gso.getRouteParams().empId);

        $scope.hideCalc = function () {
            $scope.payFrame = !$scope.payFrame;
        };

        var currentState = gso.getAppConfig().stateCode;

        $scope.getPaycheckCity = function () {

            var getCompensationStatements = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
                moneyUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" +
                appUserId + moneyUrlConfig.resources.payCheckCity;

            $scope.isShowPayrollEstimate = true;

            $scope.symmetryCalculators = [
                {name: 'symmetry-salary', title: $scope.translation.money.earnings_statements['sal-paycheck-cal'],desc: $scope.translation.money.earnings_statements['sal-paycheck-cal-desc']},
                {name: 'symmetry-hourly', title: $scope.translation.money.earnings_statements['hour-paycheck-cal'],desc: $scope.translation.money.earnings_statements['hour-paycheck-cal-desc']},
                {name: 'symmetry-gross-up', title: $scope.translation.money.earnings_statements['gross-up-cal'],desc: $scope.translation.money.earnings_statements['gross-up-cal-desc']},
                {name: 'w4-assistant', title: $scope.translation.money.earnings_statements['w4-assistant'],desc: $scope.translation.money.earnings_statements['w4-assistant-desc'],url: $scope.translation.money.earnings_statements['w4-assistant-url']}
            ];

            $scope.isBonusPayAggregate = $scope.noPercentStates.indexOf(currentState) >= 0 ? true : false;
            $scope.isBonusPayAggregate ? $scope.symmetryCalculators.splice(2, 0, {
                name: 'symmetry-bonus-pay-aggregate',
                title: $scope.translation.money.earnings_statements['bonus-cal'],
                desc: $scope.translation.money.earnings_statements['bonus-cal-desc']
            })
                : $scope.symmetryCalculators.splice(2, 0, {
                name: 'symmetry-bonus-pay-percent',
                title: $scope.translation.money.earnings_statements['bonus-percent-cal'],
                desc: $scope.translation.money.earnings_statements['bonus-percent-cal-desc']
            });

            gso.getCrudService().execute(constants.get, getCompensationStatements, null, function (successRes) {

                /* Removing the special characters from deductionName */
                if(successRes.voluntaryDeductions && successRes.voluntaryDeductions.length > 0){
                    successRes.voluntaryDeductions.map(function(item){
                        item.deductionName = item.deductionName.replace(/[^a-zA-Z0-9 ]/g,'');
                        return item;
                    });
                }

                (successRes.voluntaryDeductions && successRes.voluntaryDeductions.length > 0)  ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.voluntaryDeductions,'voluntaryDeductions',false))   : angular.noop();
                (successRes.stateValues && successRes.stateValues.length > 0 ) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.stateValues,'stateValues',true))   : angular.noop();
                successRes.locale ? angular.extend(successRes,gso.getUtilService().mapData(successRes.locale,'locale'))   : angular.noop();
                successRes.print ? angular.extend(successRes,gso.getUtilService().mapData(successRes.print,'print'))   : angular.noop();
                (successRes.otherIncome && successRes.otherIncome.length > 0) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.otherIncome,'otherIncome',false))   : angular.noop();
                (successRes.rates && successRes.rates.length > 0) ? angular.extend(successRes,gso.getUtilService().filterRes(successRes.rates,'rates',false))   : angular.noop();

                successRes['voluntaryDeductions'] ? delete successRes['voluntaryDeductions'] : angular.noop();
                successRes['stateValues'] ? delete successRes['stateValues'] : angular.noop();
                successRes['locale'] ? delete successRes['locale'] : angular.noop();
                successRes['otherIncome'] ? delete successRes['otherIncome'] : angular.noop();
                successRes['print'] ? delete successRes['print'] : angular.noop();
                successRes['rates'] ? delete successRes['rates'] : angular.noop();

                $scope.symmetryPaycheckCityInfo["model"] = successRes;

            },function (data) {
                $scope.symmetryPaycheckCityInfo["model"] = defaultData;
                $scope.errorAlert = data;
            });
        };


        $scope.getPaycheckCity();


        $scope.toggleSymmetryVisibility = function (selectedSymmetry, event) {
            event.preventDefault();
            $scope.payFrame = true;
            $scope.selectedSymmetryCalc = selectedSymmetry;
        };

        var defaultData = {
            "optionalRatesAndHours": [],
            "exemptFederal": false,
            "exemptMedicare": false,
            "exemptFica": false,
            "grossPay": 0.00,
            "grossPayType": "PAY_PER_PERIOD",
            "grossPayYTD": 0.00,
            "roundFederalWithholding": false,
            "companyName": "",
            "checkDate": "",
            "voluntaryDeductions": [],
            "otherIncome": [],
            "payFrequency": "",
            "state": currentState,
            "stateValues": [],
            "federalFilingStatusType": "",
            "federalAllowances": 0,
            "additionalFederalWithholding": 0
        };

    }]);
