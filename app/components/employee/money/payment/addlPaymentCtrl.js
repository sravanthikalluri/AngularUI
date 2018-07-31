'use strict';
trinetApp.controller('addlPaymentCtrl', ['$scope', 'gso','$filter','SharedDataService',
    function ($scope, gso,$filter,SharedDataService) {
        $scope.errorAlert = null;
        $scope.noRecordsAlert = null;
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.errorCodeMsg = false;
        $scope.errorAdditionalPay=false;
        $scope.errorAlert = null;
        $scope.moneyPayData = [];
        $scope.pay = {};
        $scope.autoWidth = 0;
        $scope.submitTransactionData = {};
        $scope.payBeginDates = [];
        $scope.payEndDates = [];
        $scope.minDate = new Date();
        $scope.noAdditionalPayment=false;
        var appUserId = $scope.appUserId;
        $scope.companyName =  gso.getAppConfig().companyName;
        $scope.viewTransactionData = {};
        $scope.disableSaveButton = false;
        $scope.onSelectedPaymentRow = false;
        $scope.selectBeginPaymentDateText = "Please select payment frequency";

        /* Add'l Begin/End report data fetching and parsing   */


      /*  $scope.closeAlert = function (index, alrType) {+
            $scope.alert && $scope.alert.splice(index, 1);
            if (typeof alrType !== 'undefined' &&
                alrType === 'success') {
                if (typeof $scope.createNewPaymentPopUp !== 'undefined' && gso.getNGDialog().isOpen($scope.createNewPaymentPopUp.id)) {
                    $scope.createNewPaymentPopUp.close();
                    gso.getRoute().reload();
                }
                if (typeof $scope.viewTransDetailsPopUp !== 'undefined' && gso.getNGDialog().isOpen($scope.viewTransDetailsPopUp.id)) {
                    $scope.submitTransDetailsPopUp.close();
                    $scope.viewTransDetailsPopUp.close();
                }
            }
        };*/
        /* to disable right click */
        function disableclick() {
            if (event.button === 1) {
                return false;
            }
        }

        /* toggle button for end payment*/
        $scope.onOFF = function (index) {
            $scope.onOffIndexValue = index;
            if (!angular.element('#myonoffswitch' + index)[0].checked) {
                document.onmousedown = disableclick;
                $scope.submitTransDetails();
            }
            angular.element('.tooltip-pop').toggle();
            $scope.viewTransDetails(index);
            $scope.errorCodeMsg = false;
            $scope.errorAlert = null;
        };

        $scope.closePanel = function () {
            if($scope.onOffIndexValue !== undefined) {
                angular.element('#myonoffswitch' + $scope.onOffIndexValue)[0].checked = true;
            }
            gso.getNGDialog().closeAll();
        };
/*        $scope.closeCreatePanel = function(){
            gso.getNGDialog().closeAll();
            getAdditionalPayments();
        };*/

        /*    Mapping Pay detail to model window*/
        $scope.viewTransDetails = function (rowId,event) {
            $scope.viewTransactionData = $scope.moneyPayData[rowId];
            if (event && event.currentTarget.nodeName === 'TR') {
                $scope.onSelectedPaymentRow = true;
            }
        };
        $scope.closeThisSection = function () {
            $scope.onSelectedPaymentRow = false;
        };


        /*    Edit Pay detail and saving using model window*/
            $scope.submitTransDetails = function () {
            $scope.submitTransactionData = $scope.viewTransactionData;
            $scope.onSelectedPaymentRow = false;
            $scope.submitTransDetailsPopUp = gso.getNGDialog().open({
                templateUrl: 'app/components/employee/money/payment/endPayment.html',
                scope: $scope
            });
            $scope.submitTransDetailsPopUp.closePromise.then(function (data) {
                $scope.closePanel();
            });
        };

        $scope.createPaymentDetails = function () {
            $scope.pay = {};
            $scope.pay.actionType = 'Begin';
            $scope.errorCodeMsg = false;
            $scope.errorAlert = null;
            $scope.payBeginDates = [];
            init();
            $scope.createNewPaymentPopUp = gso.getNGDialog().open({
                templateUrl: 'app/components/employee/money/payment/createPayment.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: true
            });
        };

        /* Pay Frequencies data fetching  & parsing  */
        gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            gso.getAppConfig().companyId + globalUrlConfig.resources.payFreq, null,
            function (response) {

                gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    gso.getAppConfig().companyId + globalUrlConfig.resources.payGroups, null,
                    function (res) {
                        if (res && (res.length > 0) && (res[0].payFrequency === "M")) {
                            var single_object = $filter('filter')($scope.payFreqData, function (d) {
                                return d.key === "Every";
                            });
                            if (single_object) {
                                $scope.payFreqData = single_object;
                            }
                        }
                    }
                );
                $scope.payFreqData = response;

            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        /* Earn Types data fetching  & parsing  */
        $scope.beginEarnType = [];
        $scope.endEarnType = [];
        gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            gso.getAppConfig().companyId + "/" + appUserId +  globalUrlConfig.resources.earnType, null,
            function (response) {
                $scope.beginEarnType = response.beginEarnType;
                $scope.endEarnType = response.endEarnType;

                $scope.earnTypeData = $scope.beginEarnType;
            },
            function (data) {
                //$scope.errorAlert = data;
            }
        );


        /*Begin Date data fetching*/
        $scope.earnTypeDatesData = {};
        gso.getCrudService().execute(constants.get, globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
            gso.getAppConfig().companyId  + "/" + appUserId + globalUrlConfig.resources.earnTypeDates, null, function (response) {
                $scope.earnTypeDatesData.payBeginDate = response.payBeginDate;
                $scope.earnTypeDatesData.payEndDate = response.payEndDate;
                $scope.payEndDates = angular.copy($scope.earnTypeDatesData.payEndDate);
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );


        /* To update Pay details*/
        $scope.savePayData = function (date) {
            var data = {
                'auditKey': $scope.submitTransactionData.auditKey,
                'company': $scope.submitTransactionData.company,
                'endDate': date.payEndDate,
                'subjectId': $scope.submitTransactionData.subjectId,
                'submitById': $scope.submitTransactionData.submitById
            };

            gso.getCrudService().execute(constants.put,
                manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay, data,
                function (response) {
                    gso.getNGDialog().closeAll();
                    SharedDataService.getAppSharedData().sMessage=JSON.stringify(response);
                    gso.getRoute().reload();
                    init();
                    //$scope.windowReload();
                    $scope.childParentAlertMsg(response);

                },
                function (data) {
                    /*$scope.errorCodeMsg = true;*/
                    /*$scope.errorAlert = data;*/
                    $scope.childParentAlertMsg(data);

                }
            );
        };

        /* To validate form fields*/
        $scope.validateData = function (formName) {
            $scope.submitted = true;
            if (!formName.$valid) {
                $scope.disableSaveButton = false;
            } else {
                $scope.disableSaveButton = true;
                $scope.createPayData();
            }
        };

        /* To create Pay details*/
        $scope.createPayData = function () {

            $scope.savenewPaymentObj = {
                recurringAction: $scope.pay.actionType,
                beginDate: angular.isObject($scope.pay.beginDate) ? $scope.pay.beginDate.payBeginDate : null,
                endDate: angular.isObject($scope.pay.endDate) ? $scope.pay.endDate.payEndDate : null,
                goalAmount: $scope.pay.goalAmount === "" ? null : $scope.pay.goalAmount,
                earnType: angular.isObject($scope.pay.earnType) ? $scope.pay.earnType.key : null,
                earnAmount: $scope.pay.earnAmount === "" ? null : $scope.pay.earnAmount,
                paymentFrequency: angular.isObject($scope.pay.paymentFrequency) ? $scope.pay.paymentFrequency.key : null,
                company: gso.getAppConfig().companyId,
                subjectId: appUserId,
                submitById: gso.getAppConfig().userId
            };
            gso.getCrudService().execute(constants.post,
                manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay,
                $scope.savenewPaymentObj,
                function (response) {
                    SharedDataService.getAppSharedData().sMessage=JSON.stringify(response)
                    gso.getNGDialog().closeAll();
                    gso.getRoute().reload();
                    $scope.disableSaveButton = false;
                    init();
                },
                function (data) {
                    // $scope.errorCodeMsg = true;
                    //$scope.errorAlert = data;
                    $scope.disableSaveButton = false;
                    $scope.childParentAlertMsg(data);
                }
            );
        };

        $scope.windowReload = function () {
            setTimeout(function () {
                gso.getRoute().reload();
            }, 500);
        };
        $scope.validationPatterns = {
            createPayment: {
                blur: {
                    beginDateRequired: null,
                    endDateRequired: null
                },
                focus: {
                    beginDateRequired: null,
                    endDateRequired: null
                }
            }
        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'createPayment') {
                $scope.validationPatterns.createPayment.focus = temp;
            }
        };


        $scope.filterEndDates = function (startDate) {
            if(startDate) {
                $scope.payEndDates = $scope.payEndDates.filter(function (obj) {
                    return gso.getUtilService().checkTwoDates(obj.payBeginDate, startDate.payBeginDate);
                });
            } else {
                $scope.payEndDates = angular.copy($scope.earnTypeDatesData.payEndDate);
            }
        };


        $scope.loadDates = function(selectedAction){
            if(selectedAction === "Begin") {
                var myArray = angular.copy($scope.earnTypeDatesData.payBeginDate);
                $scope.payEndDates = angular.copy($scope.earnTypeDatesData.payEndDate);

                if ($scope.pay.paymentFrequency.key === "First") {
                    $scope.updateBeginDates("1");
                }
                else if ($scope.pay.paymentFrequency.key === "Second") {
                    $scope.updateBeginDates("2");
                }
                else if ($scope.pay.paymentFrequency.key === "FirstSecond") {
                    $scope.updateBeginDates("1,2");
                }
                else {
                    $scope.payBeginDates = myArray;
                }
            }
            else{
                $scope.payEndDates = angular.copy($scope.earnTypeDatesData.payEndDate);
            }

            $scope.selectBeginPaymentDateText = "Select Begin Payment Date";
        };

        $scope.loadAction = function(selectedAction){
            $scope.pay.goalAmount = "";
            $scope.earnTypeData = [];

            if(selectedAction === "End"){
                $scope.payBeginDates = [];
                $scope.earnTypeData = angular.copy($scope.endEarnType);
                if($scope.earnTypeData.length === 0){
                    $scope.confirmMessage = "There are no available additional payments to end for this employee.";
                    $scope.callAlertPopup();
                }
                $scope.loadDates(selectedAction);
            }
            else{
                $scope.earnTypeData = angular.copy($scope.beginEarnType);
            }
        };
        $scope.getPayCheck = function(booleanValue,index){
            if(booleanValue){
                angular.element('#myonoffswitch' + index)[0].checked = false;
            }
            return false;
        };

        function getAdditionalPayments() {
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + gso.getAppConfig().companyId + "/" + appUserId + manageEmpUrlConfig.resources.moneyPay, null,
                function (response) {
                    $scope.moneyPayData = response;
                    $scope.moneyPayData.map(function (value) {
                        (new Date(value.endDate) >= new Date() && value.action ==="End") ? value.isFutureDate = true: value.isFutureDate = false;
                    });
                    $scope.autoWidth = 100/7;
                },
                function (data) {
                    $scope.errorAdditionalPay=true;
                    $scope.errorAlert = data;
                }
            );
        }

        function init() {
            $scope.loadAction($scope.pay.actionType);
            getAdditionalPayments();
        }
        getAdditionalPayments();


        $scope.updateBeginDates = function(payPeriod){
            if($scope.pay.actionType === "Begin") {
                $scope.payBeginDates = [];
                var periodLength = payPeriod.length;
                angular.forEach($scope.earnTypeDatesData.payBeginDate, function (item) {
                    if (periodLength > 1) {
                        if (item.payPeriod === "1" || item.payPeriod === "2") {
                            $scope.payBeginDates.push(item);
                        }
                    }
                    else {
                        if (payPeriod === item.payPeriod) {
                            $scope.payBeginDates.push(item);
                        }
                    }
                });
            }
        };

        $scope.checkFieldValid = function(value) {
            if (value) {
                var bool = isNaN(value);
                if (bool) {
                    if ($scope.pay.goalAmount.length > 0) {
                        $scope.confirmMessage = "Goal Amount previously entered.  To enter Final Payment Date, please delete Goal Amount.";
                        $scope.callAlertPopup();
                        $scope.pay.endDate = {};
                    }
                }
                else {
                    if ($scope.pay.endDate) {
                        if ($scope.pay.endDate.addlPageValue.length > 0) {
                            $scope.confirmMessage = "Final Payment Date previously entered. To enter Goal Amount, please delete Final Payment Date.";
                            $scope.callAlertPopup();
                            $scope.pay.goalAmount = "";
                        }
                    }
                }
            }
        };

        $scope.callAlertPopup = function(){
            $scope.alertPopup = gso.getNGDialog().open({
                templateUrl: 'app/shared/views/alertPopup.html',
                scope: $scope,
                closeByDocument:false
            });
        };

        $scope.confirm = function(){
            $scope.alertPopup.close();
        };

    }]).directive('myCurrency', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            scope.$watch(attr.ngModel, function (v) {
                var transformedInput = v;

                /*-- Two Decimals Only --*/
                if(attr.decimalsOnly && attr.decimalsOnly !== "false" && transformedInput) {
                    transformedInput = transformedInput.replace(/[^0-9.]/g, '');
                    var decimalCheck = transformedInput.split('.');

                    if (!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] = decimalCheck[1].slice(0, 2);
                        transformedInput = decimalCheck[0] + '.' + decimalCheck[1];
                    }
                }

                if(transformedInput && attr.maxLengthBeforeDecimal && attr.maxLengthBeforeDecimal > 0) {
                    transformedInput = transformedInput.replace(/[^0-9.]/g, '');
                    var beforeDecimalCheck = transformedInput.split('.');

                    if (!angular.isUndefined(beforeDecimalCheck[0]) && beforeDecimalCheck[0].length > attr.maxLengthBeforeDecimal) {
                        transformedInput = beforeDecimalCheck[0].substring(0, attr.maxLengthBeforeDecimal);
                    }
                }
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
            });
        }
    };
});
