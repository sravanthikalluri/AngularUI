/*
 * Program Description / functionality: To Fetch Additional Policy Information.
 */
'use strict';
trinetApp.controller('statesBuildDataCtrl', ['$scope', 'gso', 'sharedProperties','SharedDataService',
    function ($scope, gso, sharedProperties,SharedDataService) {
        $scope.payFrequencyType = null;
        $scope.companyName = gso.getAppConfig().companyName;
        $scope.quarterstartDate = null;
        $scope.quarterendDate = null;
        $scope.benefitProgram = null;
        $scope.loaderSpinner = false;
        sharedProperties.getStringValue();

        /*start of callpayfrequency*/
        $scope.callPayFrequency = function (fromDate, toDate) {
            $scope.loaderSpinner = true;
            /**
             *  Getting pay frequency of user start [Begin]
             */
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plans', null,
                function (response) {
                    $scope.payFrequencyData = response;
                    $scope.payFrequencyType = $scope.payFrequencyData.employeePayFrequency;
                    $scope.benefitProgram = $scope.payFrequencyData.employeeBenefitProgram;
                    if($scope.planDate === 'current'){
                        $scope.toDate = $scope.payFrequencyData.currentPlanEndDate;
                        $scope.fromDate = $scope.payFrequencyData.currentPlanStartDate;
                    }else if($scope.planDate === 'future'){
                        $scope.toDate = $scope.payFrequencyData.planEndDate;
                        $scope.fromDate = $scope.payFrequencyData.planStartDate;
                    }
                    gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                        gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plan-details?type=custom&benefitPlanId=' + $scope.benefitProgram + '&payFrequency=' + $scope.payFrequencyType + '&startDate=' + $scope.fromDate + '&endDate=' + $scope.toDate, null,
                        function (response) {
                            $scope.statesBuildData = response;
                            $scope.loaderSpinner = false;
                            var data = {
                                "data": $scope.statesBuildData
                            };
                            $scope.showFiled = sharedProperties.getStringValue();
                            $scope.benefitsDynamicfield = data.data[sharedProperties.getStringValue()];
                        },
                        function (data) {
                            $scope.errorAlert = data;
                        }
                    );
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            /*
             * [End]
             */
        };
         $scope.callPayFrequency($scope.fromDate, $scope.toDate);
         
         $scope.printSection = function(){
            var prtContent = document.getElementById('print');
		if (prtContent) {
			var WinPrint = window.open('','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
			WinPrint.document.write('<html><head><title>Print Plan Costs</title>');
			WinPrint.document.write('<link rel="stylesheet" href="./#/app/main/benefits/resources/additional-resources/benefits-summary-view/executive/executive.component.scss" media="print" type="text/css" />');
			WinPrint.document.write('</head><body >');
			WinPrint.document.write(prtContent.innerHTML);
			WinPrint.document.write('</body></html>');

			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();
		}
        }
    }]);
