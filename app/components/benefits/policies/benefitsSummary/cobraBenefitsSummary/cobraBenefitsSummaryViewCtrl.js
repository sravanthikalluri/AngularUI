/*
 * Program Description / functionality: To Fetch Cobra Benefits Summary Information.
 */
'use strict';
trinetApp.controller('cobraBenefitsSummaryViewCtrl', ['$scope', 'gso','SharedDataService',
    function ($scope, gso,SharedDataService) {
        $scope.cobraBenefitsSummaryData = null;
        $scope.cobraData = null;
        $scope.nullbucket = false;
        gso.getUtilService().hideDIVS(true);
        $scope.fromDate = $scope.dataForModal.startDate;
        $scope.toDate = $scope.dataForModal.endDate;
        $scope.showTable = false;

        $scope.cobraData = function (fromDate,toDate) {
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plan-details?type=cobra&startDate=' + fromDate + '&endDate=' + toDate, null,
                function (response) {
                    $scope.cobraBenefitsSummaryData = response;
                    angular.forEach($scope.cobraBenefitsSummaryData, function (val1) {
                        if (val1.length !== 0) {
                            $scope.showTable = true;
                        }
                    });
                },
                function (data) {
                    $scope.nullbucket = true;
                    $scope.cobraBenefitsSummaryData = null;
                    $scope.errorAlert = data;
                }
            );
         };
         $scope.cobraData($scope.fromDate, $scope.toDate);

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
