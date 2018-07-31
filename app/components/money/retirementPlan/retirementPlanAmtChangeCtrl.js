'use strict';
trinetApp.controller('goalAmtChangeCtrl', function ($scope,gso) {
    $scope.radioType = 'setGoalAmt';
    $scope.isFormSubmited = false;
    $scope.isShowGoalAmount = false;

    /**
     *  reset alert data
     */
    $scope.closeAlert = function () {
        $scope.errorAlert = null;
    };

    $scope.totalAmt = $scope.federalAmount;

    /**
     * change function for set goal amount field in popup
     * @param priorAmount
     */
    $scope.priorChangeFn = function (priorAmount) {
        $scope.tempTotal = $scope.federalAmount - priorAmount;
        if ($scope.tempTotal >= 0) {
            $scope.totalAmt = parseFloat($scope.federalAmount - priorAmount).toFixed(2);
        }else{
            $scope.totalAmt = 0;
        }

        $scope.priorAmount = priorAmount;
    };

    /**
     * change function for prior amount field in popup
     * @param setGoal
     */
    $scope.goalChangeFn = function (setGoal) {
        $scope.setGoal = setGoal;
    };

    $scope.getFloatValue = function (amount) {
        var isTrue;
        if (amount === '' || parseFloat(amount) === 0) {
            isTrue = true;
        } else {
            isTrue = false;
        }

        return isTrue;
    };

    $scope.validationPatterns = {
        update: {
            blur: {
                setGoalAmtRequired: null,
                setGoalAmtNotZero: null,
                setGoalAmtCondi: null,
                priorAmountPattern: null,
                priorAmountNotZero: null,
                priorAmountCondi: null
            },
            focus: {
                setGoalAmtRequired: null,
                setGoalAmtCondi: null,
                priorAmountPattern: null,
                priorAmountNotZero: null,
                priorAmountCondi: null

            }

        }
    };

    $scope.onBlur = function (name, object) {
        var temp = {};
        angular.forEach(object, function (value, key) {
            temp[key] = false;
        });
        if (name === 'update') {
            $scope.validationPatterns.update.blur = temp;
        }

    };

    $scope.onFocus = function (name, object) {
        var temp = {};
        angular.forEach(object, function (value, key) {
            temp[key] = false;
        });
        if (name === 'update') {
            $scope.validationPatterns.update.focus = temp;
        }
    };

    function focusInvalidElement(formName) {
        var visibleInvalids = angular.element(formName).find('.ng-invalid:visible');
        if (angular.isDefined(visibleInvalids)) {
            // if we find one, set focus
            angular.element(visibleInvalids).addClass('error-warning');
        }
    }

    function errorMsg() {
        focusInvalidElement('form#userform');
        $scope.onFocus('update', $scope.validationPatterns.update.focus);
        var customIdAlert = {
            _statusCode: '400',
            _statusMessage: $scope.translation.pageValidationMessage
        };
        $scope.errorAlert = customIdAlert;
    }

    function validateRetireMentPlan(){
        var isValid = true;
        if (!$scope.innerForm.$valid) {
            errorMsg();
            isValid = false;
        }

        if ($scope.radioType !== 'setGoalAmt'  && ($scope.setGoal === '' || parseFloat($scope.update.setGoal) === 0)) {
            errorMsg();
            $scope.validationPatterns.update.blur.setGoalAmtNotZero = true;
            isValid = false;
        }


        if (parseFloat($scope.federalAmount) < parseFloat($scope.update.setGoal) || parseFloat($scope.federalAmount) < parseFloat($scope.update.priorAmount)) {
            errorMsg();
            if(parseFloat($scope.federalAmount) < parseFloat($scope.update.setGoal)){
                $scope.validationPatterns.update.blur.setGoalAmtCondi = true;
            }
            if(parseFloat($scope.federalAmount) < parseFloat($scope.update.priorAmount)){
                $scope.validationPatterns.update.blur.priorAmountCondi = true;
            }
            isValid = false;
        }


       return isValid;
    }
    /**
     * update method
     */
    $scope.saveMethod = function () {
        $scope.submitted = true;
        $scope.isFormSubmited = true;
        $scope.closeAlert();
        var isValid = validateRetireMentPlan();
        if(isValid){
            if ($scope.radioType !== constants.goalAmountText) {
                $scope.totalAmt = $scope.update.setGoal;
            }
            $scope.retirementPlanObject = {
                goalAmount: $scope.totalAmt,
                employeeId: gso.getAppConfig().userId,
                company: $scope.retirementData[0].company,
                calendarYear: $scope.retirementData[0].calendarYear,
                limitType: $scope.retirementData[0].limitType,
                PreTax : {
                           limitExtType: $scope.retirementData[0].PreTax.limitExtType,
                           extAmount: $scope.retirementData[0].PreTax.extAmount
                         }
            };


            var putUrl = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.retirementPlan +
                "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + moneyUrlConfig.resources.contributions;
            gso.getCrudService().execute(constants.put, putUrl, $scope.retirementPlanObject,
                function (response) {
                    var priorAmount = null,
                        setGoalAmount = null;
                    $scope.isFormSubmited = false;
                    $scope.goal_amt = $scope.totalAmt;
                    if ($scope.radioType === constants.goalAmountText) {
                        $scope.isSetGoal = false;
                        priorAmount = $scope.update.priorAmount;
                    } else {
                        $scope.isSetGoal = true;
                        setGoalAmount = $scope.update.setGoal;
                    }

                    $scope.$emit('goalEvent', $scope.goal_amt, $scope.isSetGoal, priorAmount, setGoalAmount, response);
                    gso.getNGDialog().closeAll();


                },
                function (data) {
                    $scope.isFormSubmited = false;
                    $scope.errorAlert = data;
                });

        }



    };

    /**
     * while click on radio buttons in popup. It resets the fields
     * @param type
     */
    $scope.radioClickFn = function (type) {
        $scope.isFormSubmited = false;
        $scope.onFocus('update', $scope.validationPatterns.update.focus);
        $scope.onBlur('update', $scope.validationPatterns.update.blur);
        var goalAmtEl = angular.element('#goalAmtBorderId'),
            limitAmtEl = angular.element('#limitAmtBorderId');
        $scope.radioType = type;
        if (type === constants.goalAmountText) {
            $scope.totalAmt = constants.zeroDoublePrecision;
            $scope.setGoal = constants.zeroDoublePrecision;

            if ($scope.setPriorAmount) {
                $scope.totalAmt = parseFloat($scope.federalAmount - $scope.setPriorAmount).toFixed(2);
            }else{
                $scope.update.priorAmount = null;
            }

            limitAmtEl.removeClass('no-border');
            limitAmtEl.removeClass('pop-section-dissable');
            goalAmtEl.addClass('pop-section-dissable');
            goalAmtEl.addClass('no-border');

            $scope.isShowGoalAmount = false;
            $scope.update.selectGoal = true;
            $scope.update.goal_amount = false;
        } else {
            $scope.totalAmt = constants.zeroDoublePrecision;
            $scope.priorAmount = constants.zeroDoublePrecision;

            if($scope.setGoalAmount){
                $scope.update.setGoal = $scope.setGoalAmount;
            }else{
                $scope.update.setGoal = null;
            }

            goalAmtEl.removeClass('pop-section-dissable');
            goalAmtEl.removeClass('no-border');
            limitAmtEl.addClass('no-border');
            limitAmtEl.addClass('pop-section-dissable');

            $scope.isShowGoalAmount = true;
            $scope.update.selectPrior = true;
            $scope.update.goal_amount = true;
        }
    };


});
