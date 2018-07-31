'use strict';
trinetApp.controller('retirementCtrl', ['$scope','gso','SharedDataService',function ($scope,gso,SharedDataService) {
    $scope.setGoal = $scope.totalAmt = $scope.priorAmount = $scope.earningsCheckPayDate = $scope.federalAmount = $scope.federalAmount = $scope.goal_amt = constants.zeroDoublePrecision;
    $scope.section = constants.section;
    $scope.nextCheckIssueDate = null;
    $scope.showTimeline = true;
    $scope.isSetGoal = false;
    $scope.setGoalAmount = null;
    $scope.setPriorAmount = null;
    $scope.isLoading = false;
    $scope.ssoURL = "/ssowidget/ta_pass_001";

    $scope.update = {};
    $scope.update.goal_amount = false;

    /**
     * default options for doughnut
     * @type {{responsive: boolean, legendTemplate: string, percentageInnerCutout: number}}
     */
    $scope.options = {
        responsive: true,
        cutoutPercentage : 55,
        legend: {
            display: false
        },
        tooltips:{
            enabled:false
        }
    };

    /**
     * default data for doughnut
     * @type {*[]}
     */
    $scope.retirementDoughnutData = {
            datasets : [
                {
                    label: constants.retirementPlanFederalAmountLabel,
                    data: [ 1000 ],
                    backgroundColor: [constants.retirementPlanFederalColorCode]
                }
            ],
        labels: []
    };

    /**
     * initialize retirement data
     */
    $scope.initRetirementDataFn = function () {
        var nextPayDate = lSharedDataService.getAppSharedData().nextPayDate;
        if(nextPayDate && nextPayDate !== 'null'){
            $scope.nextCheckIssueDate = gso.getUtilService().splitConcatDateString(nextPayDate);
        }else{
            $scope.nextCheckIssueDate = null;
        }
        var retirementDataURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.retirementPlan + "/" + gso.getAppConfig().companyId + "/" +
            gso.getAppConfig().userId + moneyUrlConfig.resources.contributions;

        /*Retirement Plan Details get Method*/
        gso.getCrudService().execute(constants.get, retirementDataURL, null,
            function (response) {
                $scope.retirementData =  response;
                $scope.goal_amt = $scope.retirementData[0].goalAmount;
                $scope.federalAmount = $scope.retirementData[0].PreTax.federalAmount;
                $scope.totalYtd = $scope.retirementData[0].totalYtd;
                $scope.coverageElect = $scope.retirementData[0].coverageElect;

                if(SharedDataService.getAppSharedData().isSetGoal){
                    $scope.isSetGoal = SharedDataService.getAppSharedData().isSetGoal;
                }else{
                    $scope.isSetGoal = 'false';
                }

                $scope.doughnutVal = parseFloat($scope.goal_amt).toFixed(2);

                $scope.retirementDoughnutData = {
                    datasets : [
                        {
                            label: constants.retirementPlanGoalAmountLabel,
                            data: [ parseFloat($scope.doughnutVal), parseFloat($scope.federalAmount) - parseFloat($scope.doughnutVal)],
                            backgroundColor: [constants.retirementPlanGoalAmountColorCode,constants.retirementPlanFederalColorCode]
                        }
                    ],
                    labels: []
                };


                $scope.isLoading = true;
            },
            function (data) {
                $scope.isLoading = true;
                $scope.errorAlert = data;
            });
    };


    /**
     * initialize retirement data calling
     */
    $scope.initRetirementDataFn();


    /**
     * reset alert data
     */
    $scope.closeAlert = function () {
        $scope.errorAlert = null;
    };

    /**
     * goal event for updating goal amount
     */
    $scope.$on('goalEvent', function (evnt, goal_amt, isSetGoal, priorAmount, goalAmount, response) {
        $scope.setGoalAmount = null;
        $scope.setPriorAmount = null;
        SharedDataService.getAppSharedData().isSetGoal= isSetGoal;
        $scope.goal_amt = goal_amt;
        $scope.errorAlert = response;

        if (goalAmount) {
            SharedDataService.getAppSharedData().setGoalAmount= goalAmount;
            $scope.setGoalAmount = SharedDataService.getAppSharedData().setGoalAmount;
            $scope.update.goal_amt = true;

        }

        if (priorAmount) {
            SharedDataService.getAppSharedData().setPriorAmount= priorAmount;
            $scope.setPriorAmount = SharedDataService.getAppSharedData().setPriorAmount;
            $scope.update.goal_amt = false;
        }
        $scope.initRetirementDataFn();
    });

    /**
     * toggle the change history
     */
    $scope.toggleTimeLine = function () {
        $scope.showTimeline = !$scope.showTimeline;
    };


    /**
     * opens the change goal amount popup
     */
    $scope.changeGoalAmount = function () {
        if ($scope.errorAlert) {
            $scope.errorAlert = null;
        }
        $scope.totalAmt = constants.zeroDoublePrecision;
        $scope.federalAmount = parseFloat($scope.federalAmount);


        gso.getNGDialog().open({
            templateUrl: 'app/components/money/retirementPlan/retirementPlanModal.html',
            scope: $scope,
            closeByDocument: false,
            closeByEscape: false
        });
    };

    $scope.$on('ngDialog.opened', function () {
        if (SharedDataService.getAppSharedData().isSetGoal=== 'true') {
            angular.element('#goalamount').click();

            if (SharedDataService.getAppSharedData().setGoalAmount) {
                $scope.update.setGoal = SharedDataService.getAppSharedData().setGoalAmount;
                $scope.setGoalAmount = SharedDataService.getAppSharedData().setGoalAmount;
            } else {
                $scope.update.setGoal = null;
            }
            $scope.update.priorAmount = null;


        } else {
            if (SharedDataService.getAppSharedData().setPriorAmount) {
                $scope.update.priorAmount = SharedDataService.getAppSharedData().setPriorAmount;
                $scope.setPriorAmount = SharedDataService.getAppSharedData().setPriorAmount;
            } else {
                $scope.update.priorAmount = null;
            }


            $scope.update.setGoal = null;
            angular.element('#setgoal').click();

        }


    });


    /**
     * close the popup model
     */
    $scope.cancel = function () {
        gso.getNGDialog().closeAll();
    };

    $scope.get401KLabel = function(){
        var label = $scope.translation.get_started;
        if($scope.coverageElect === 'E') {
            label = $scope.translation.request_change;
        }
        return label;
    };

}]);
