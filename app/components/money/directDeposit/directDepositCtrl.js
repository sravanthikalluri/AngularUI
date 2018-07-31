'use strict';
trinetApp.controller('directDepositCtrl', ['$scope','gso','$timeout','$location',function ($scope,gso,$timeout,$location) {

        $scope.selectedTab = gso.getRouteParams().selectedTab;
        var initial = $scope.selectedTab;

        /** reset the alert */
        $scope.closeAlert = function () {
            if ($scope.errorAlert) {
                $scope.errorAlert = null;
            }
        };
        $timeout(function () {
            $scope.$on(constants.emitNoData, function (evnt, noData) {
                $scope.noData = noData;
            });
        }, 20);
        /**
         * activate the selected inner tab method
         * @param selected
         */
        $scope.activeLink = function (selected) {
            $scope.yes_btn = $scope.translation.yesDiscardChanges;
            $scope.no_btn = $scope.translation.no;
            $scope.confirmMessage = money.defaultMessages.cancelChanges;
            if (selected !== initial) {
                if (selected === 'earnings') {
                    if (angular.element('#reimsave').length !== 0 && angular.element('#reimedit').length !== 0 && !angular.element('#reimsave').hasClass("pointerEvent") && !angular.element('#reimedit').is(':visible')) {
                            gso.getNGDialog().openConfirm({
                                template: 'app/shared/views/confirmAlert.html',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            }).then(function () {
                                initial = selected;
                                $location.path("/directDeposit/earnings");
                            });

                    } else {
                        $location.path("/directDeposit/earnings");
                    }
                }
                else if (selected === 'reimbursements') {
                    if (angular.element('#earningsaveBtn').length !== 0 && angular.element('#viewonly').length !== 0 && !angular.element('#earningsaveBtn').hasClass("pointerEvent") && !angular.element('#viewonly').is(':visible')) {
                            gso.getNGDialog().openConfirm({
                                template: 'app/shared/views/confirmAlert.html',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            }).then(function () {
                                initial = selected;
                                $location.path("/directDeposit/reimbursements");
                            });
                    } else {
                        $location.path("/directDeposit/reimbursements");
                    }

                }
            }
        };


        function toggleFlags(accountData) {
            var netBalance = accountData.netBalance,
                fsaAccount = accountData.fsaAccount,
                apAccount = accountData.apAccount;

            if (!netBalance) {
                accountData.netBalance = true;
            }
            if (!fsaAccount) {
                accountData.fsaAccount = true;
            }
            if (!apAccount) {
                accountData.apAccount = true;
            }

            return accountData;
        }
        $scope.makeNetBalanceAccount = function(earningsData){
            angular.forEach(earningsData, function (value, key) {
                if(value.length === 1){
                    value[0] = toggleFlags(value[0]);
                }

            });
            return earningsData;
        };
         $scope.resetPriority = function(earningData){
            angular.forEach(earningData, function (value, index) {
                if (!value.netBalance) {
                    value.priority = 700 - (index * 25);
                } else if (value.netBalance) {
                    value.priority = 700;
                }
            });
            return earningData;
        };

        $scope.resetPriorityOrder = function(earningsData,index){
            var netBalanceAccount = earningsData[index];
            earningsData.splice(index,1);
            var tempData = earningsData;
            tempData.splice(0,0,netBalanceAccount);
            earningsData = tempData;

            return earningsData;
        };

        /** Get the net balance account index value
         * @returns {number}
         */
        $scope.getNetBalanceAccountIndex = function (data) {
            var indexValue = 0;
            angular.forEach(data, function (account, index) {
                if (account.netBalance) {
                    indexValue = index;
                }
            });
            return indexValue;
        };


        $scope.childParentAlertMsg = function (data) {
            $scope.errorAlert = data;
        };
    }]);
