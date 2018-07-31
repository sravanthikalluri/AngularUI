
'use strict';
trinetApp.controller('executiveTemplateCtrl', ['$scope', 'gso', 'SharedDataService',
    function ($scope, gso, SharedDataService) {
        $scope.companyName = gso.getAppConfig().companyName;
        $scope.fetchData = null;
        $scope.dateList = {};
        $scope.showResults = false;
        $scope.fetchData = function (planCode, planKey, planType) {
            var type = null;
            if (planType === 'cop') {
                type = "custom";
            }
            else if (planType === 'soap') {
                type = "all";
            }
            gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan +
                '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plan-details?type=' + type + '&benefitPlanId=' + planCode + '&payFrequency=' + planKey + '&startDate=' + $scope.dataForModal.startDate + '&endDate=' + $scope.dataForModal.endDate, null,
                function (response) {
                    $scope.showResults = true;
                    $scope.executiveData = response;
                    if(response.companyHSA === 'A') {
                        $scope.companyHSAText = 'Annual Contribution';
                    }
                    else if(response.companyHSA === 'M') {
                        $scope.companyHSAText = 'Monthly Contribution';
                    }
                    else {
                        $scope.companyHSAText = 'Contribution';
                    }

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        if ($scope.planCode !== null && $scope.planKey !== null && $scope.planType !== null) {
            $scope.fetchData($scope.dataForModal.planCode, $scope.dataForModal.planKey, $scope.dataForModal.planType);
        }

        $scope.printSection = function () {
            var prtContent = document.getElementById('print');
            if (prtContent) {
                var WinPrint = window.open('', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
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
