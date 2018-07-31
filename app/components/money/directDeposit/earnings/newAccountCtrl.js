'use strict';
trinetApp.controller('newAccountCtrl', ['$scope', 'gso',function ($scope,gso) {
        $scope.errorLog = {};
        $scope.showImg = true;
        $scope.isFormSubmited = false;

        $scope.setCanadian = function (countryCode) {
            if (countryCode === 'CA') {
                $scope.canadianFields = true;
            } else {
                $scope.canadianFields = false;
            }
        };

        $scope.setCanadian(gso.getAppConfig().countryCode);


        /**
         * new change method
         */
        $scope.newChange = function () {
            $scope.validationPatterns.addAccount.focus.percentageValueReq = false;
            $scope.validationPatterns.addAccount.blur.percentageValueReq = false;
            $scope.validationPatterns.addAccount.focus.dollarValueRequired = false;
            $scope.validationPatterns.addAccount.blur.dollarValueRequired = false;
            $scope.errorAlert = null;
        };

        $scope.verifyRoutingNum = function (val) {
            var routingVal = val,
                routingRE = /^[0-3]\d{8}$/;
            /* Routing Number should be 9 numeric characters long and start with 0,1,2,3 only */
            if (routingVal !== undefined) {
                if (!routingVal.match(routingRE)) {
                    $scope.msg = $scope.translation.money.direct_deposit.validations.transitRoutingNumber;
                    return true;
                }

                var x = parseInt(routingVal.charAt(0), 10) * 3 + parseInt(routingVal.charAt(1), 10) * 7 + parseInt(routingVal.charAt(2), 10) * 1 + parseInt(routingVal.charAt(3), 10) * 3 +
                    parseInt(routingVal.charAt(4), 10) * 7 + parseInt(routingVal.charAt(5), 10) * 1 + parseInt(routingVal.charAt(6), 10) * 3 + parseInt(routingVal.charAt(7), 10) * 7;

                x = 10 - x % 10;

                if (x === 10) {
                    x = 0;
                }

                if (x !== parseInt(routingVal.charAt(8), 10)) {
                    $scope.msg = $scope.translation.money.direct_deposit.validations.transitRoutingNumber;
                    return true;
                }
            }
        };

        /**
         * close the model method
         */
        $scope.closeModal = function () {
            if (!angular.isDefined($scope.newAccountForm)) {
                if ($scope.addAccountForm.$dirty) {
                    $scope.yes_btn = $scope.translation.yesDiscardChanges;
                    $scope.no_btn = $scope.translation.no;
                    $scope.confirmMessage = money.defaultMessages.cancelChanges;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function () {
                        gso.getNGDialog().closeAll();
                    });
                } else {
                    gso.getNGDialog().closeAll();
                }
            } else {
                if ($scope.newAccountForm.$dirty) {
                    $scope.yes_btn = $scope.translation.yes;
                    $scope.no_btn = $scope.translation.no;
                    $scope.confirmMessage = money.taxWithHoldings.wantToClose;
                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function () {
                        gso.getNGDialog().closeAll();
                    });
                } else {
                    gso.getNGDialog().closeAll();
                }
            }
        };

        /**
         * close the alert
         */
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        function focusInvalidElement(formName) {
            var visibleInvalids = angular.element(formName).find('.ng-invalid:visible');
            if (angular.isDefined(visibleInvalids)) {
                // if we find one, set focus
                angular.element(visibleInvalids).addClass('error-warning');
            }
        }

        /**
         * validate new account method
         * @param value
         */
        $scope.validateNewAccount = function (value) {
            $scope.isFormSubmited = true;
            $scope.closeAlert();
            var customIdAlert;
            if (!$scope.newAccountForm.$valid || (!$scope.canadianFields && $scope.verifyRoutingNum($scope.newAccountData.routingNumber))) {
                focusInvalidElement('form#newaccountform');
                $scope.onFocus('newAccount', $scope.validationPatterns.newAccount.focus);
                customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
                $scope.errorAlert = customIdAlert;
            }
            else {
                $scope.selectAccountType = true;
                $scope.addAccount(value, $scope.canadianFields);
            }
        };

        /**
         * validate the add account method
         * @param value
         */
        $scope.validateAddAccount = function (value) {
            $scope.isFormSubmited = true;
            $scope.closeAlert();
            var customIdAlert;
            if (!$scope.addAccountForm.$valid || $scope.addAccountData.amount > $scope.checkRemAmount || $scope.addAccountData.percentage > $scope.percentageShould || ( !$scope.canadianFields && $scope.verifyRoutingNum($scope.addAccountData.routingNumber) )) {
                focusInvalidElement('form#add_account_form');
                $scope.onFocus('addAccount', $scope.validationPatterns.addAccount.focus);

                customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
                $scope.errorAlert = customIdAlert;
            } else if($scope.addAccountData.amountType === 'dollar' && $scope.addAccountData.amount <=  0 ) {
                focusInvalidElement('form#add_account_form');
                $scope.onFocus('addAccount', $scope.validationPatterns.addAccount.focus);

                customIdAlert = {
                    _statusCode: '400',
                    _statusMessage: $scope.translation.pageValidationMessage
                };
                $scope.errorAlert = customIdAlert;
            }else {
                $scope.addAccount(value, $scope.canadianFields);
            }

        };

        /**
         * validate the percentage method
         * @param percentage
         */
        $scope.validatePercentage = function (percentage) {
            if (percentage > 100) {
                $scope.errorLog = {
                    'percentageValidation': money.defaultMessages.percentageValidation
                };
            }
        };

        /**
         * validate name method
         * @param name
         */
        $scope.validateName = function (name) {
            if (/^[a-zA-Z]+$/.test(name)) {
                $scope.errorLog = {
                    'nameValidation': money.defaultMessages.nameValidation
                };
            }
        };
        /**
         * selected account type method
         * @param value
         */

        $scope.selectedAccountType = function (value) {
            if (value !== '3') {
                $scope.selectAccountType = false;
            }
            else {
                $scope.selectAccountType = true;
            }
        };
        $scope.validationPatterns = {
            addAccount: {
                blur: {
                    addAccountNameRequired: null,
                    accountNamePattern: null,
                    addAccountTypeRequired: null,
                    routingNumberRequired: null,
                    smallRoutingNumberRequired: null,
                    routingNumberPattern: null,
                    transitRouting: null,
                    accountNumberRequired: null,
                    accountNumberPattern: null,
                    branchIdRequired: null,
                    bankIdRequired: null,
                    branchIdPattern: null,
                    bankIdPattern: null,
                    smallBranchIdRequired: null,
                    smallBankIdRequired: null,
                    dollarValueRequired: null,
                    dollarValueZeroRequired: null,
                    percentageValueReq: null
                },
                focus: {
                    addAccountNameRequired: null,
                    accountNamePattern: null,
                    addAccountTypeRequired: null,
                    routingNumberRequired: null,
                    smallRoutingNumberRequired: null,
                    routingNumberPattern: null,
                    transitRouting: null,
                    accountNumberRequired: null,
                    accountNumberPattern: null,
                    branchIdRequired: null,
                    bankIdRequired: null,
                    branchIdPattern: null,
                    bankIdPattern: null,
                    smallBranchIdRequired: null,
                    smallBankIdRequired: null,
                    dollarValueRequired: null,
                    dollarValueZeroRequired: null,
                    percentageValueReq: null
                }

            },
            newAccount: {
                blur: {
                    newAccountTypeRequired: null,
                    routingNumberRequired: null,
                    smallRoutingNumberRequired: null,
                    routingNumberPattern: null,
                    transitRouting: null,
                    accountNumberRequired: null,
                    accountNumberPattern: null,
                    branchIdRequired: null,
                    bankIdRequired: null,
                    branchIdPattern: null,
                    bankIdPattern: null,
                    smallBranchIdRequired: null,
                    smallBankIdRequired: null

                },
                focus: {
                    newAccountTypeRequired: null,
                    routingNumberRequired: null,
                    smallRoutingNumberRequired: null,
                    routingNumberPattern: null,
                    transitRouting: null,
                    accountNumberRequired: null,
                    accountNumberPattern: null,
                    branchIdRequired: null,
                    bankIdRequired: null,
                    branchIdPattern: null,
                    bankIdPattern: null,
                    smallBranchIdRequired: null,
                    smallBankIdRequired: null
                }
            }
        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });
            if (name === 'addAccount') {
                $scope.validationPatterns.addAccount.focus = temp;
            }
            if (name === 'newAccount') {
                $scope.validationPatterns.newAccount.focus = temp;
            }
        };
    }]);