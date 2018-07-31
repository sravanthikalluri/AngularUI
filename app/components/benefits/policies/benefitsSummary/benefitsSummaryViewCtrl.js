/*
 Program Description / functionality: To Benefits Summary Information.
 */
'use strict';
trinetApp.controller('benefitsSummaryViewCtrl', ['$scope', 'gso','$location','SharedDataService',
    function ($scope, gso,$location,SharedDataService) {
        $scope.benefitsSummaryData = [];
        $scope.benefitsSummaryNew = {};
        $scope.customindicator = $scope.benefitProgramArray = $scope.head = $scope.payFrquencyListArrayMain = $scope.fromDate = $scope.toDate = null;
        $scope.cobraDisplay = true;
        $scope.employeeBenefitProgram = $scope.employeePayFrequency = "";
        $scope.filteredBenefitsSummary = $scope.filteredBenefitsSummary1 = {};
        $scope.filteredBenefits = [];
        SharedDataService.getAppSharedData().fromDate = null;
        SharedDataService.getAppSharedData().toDate = null;
        /*getting plan start date & quarter start*/

        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'plans', null, function (response) {
                $scope.currentPlanStartDate = response.currentPlanStartDate;
                $scope.currentPlanEndDate = response.currentPlanEndDate;
                $scope.futurePlanStartDate = response.planStartDate;
                $scope.futurePlanEndDate = response.planEndDate;
                $scope.fromDate = gso.getUtilService().filterDate($scope.currentPlanStartDate, constants.fullDateFormat);
                $scope.toDate = gso.getUtilService().filterDate($scope.currentPlanEndDate, constants.fullDateFormat);
                $scope.futureFromDate = gso.getUtilService().filterDate($scope.futurePlanStartDate, constants.fullDateFormat);
                $scope.futureToDate = gso.getUtilService().filterDate( $scope.futurePlanEndDate , constants.fullDateFormat);

                $scope.payFrquencyListArray = response;
                $scope.benefitProgramArray = response.benefitProgramList;
                $scope.customindicator = response.customIndicator;
                $scope.subHeading = response.groupDesc;
                if (response.employeeBenefitProgram !== "undefined" && response.employeeBenefitProgram !== null &&
                    response.employeePayFrequency !== "undefined" && response.employeePayFrequency !== null) {
                    $scope.employeeBenefitProgram = response.employeeBenefitProgram;
                    $scope.employeePayFrequency = response.employeePayFrequency;
                }
                else {
                    $scope.employeeBenefitProgram = "";
                    $scope.employeePayFrequency = "";
                }
                /*fetching links data */
                gso.getCrudService().execute(constants.get, fileConfig.benefits.summaryPlanLinks, null,
                    function (response) {
                        angular.forEach(response, function (val1) {
                            $scope.benefitsSummaryData.push(val1);
                        });
                        $scope.displayLinks($scope.benefitsSummaryData, $scope.payFrquencyListArray, $scope.customindicator, $scope.benefitProgramArray);
                    },
                    function (data) {
                        $scope.childParentAlertMsg(data);
                    }
                );
                /*fetching links data end*/
                $scope.displayLinks = function (benefitsSummaryData, payFrquencyListArray, customindicator, benefitProgramArray) {
                    var k = 0;
                    $scope.payFrquencyListArrayMain = payFrquencyListArray.payFrequencyList;
                    $scope.filteredBenefitsSummary1=[];
                    angular.forEach($scope.payFrquencyListArrayMain, function (value) {
                    angular.forEach(benefitProgramArray, function (program, programKey) {
                            $scope.someArray = [];
                            $scope.filteredBenefits = [];
                            $scope.someArray = angular.copy(benefitsSummaryData);
                            for (k = 0; k < $scope.someArray.length; k++) {
                                if ($scope.someArray[k].key === value) {
                                    if ($scope.someArray[k].heading !== "") {
                                        if ($scope.someArray[k].heading.indexOf(':') !== -1) {
                                            $scope.someArray[k].heading = $scope.someArray[k].heading.substr(0, $scope.someArray[k].heading.indexOf(':'));
                                        }
                                        $scope.someArray[k].heading = $scope.someArray[k].heading + ":" + payFrquencyListArray.benefitProgramList[programKey].description;
                                        if ($scope.customindicator === true && $scope.someArray[k].type === 'cop') {
                                            $scope.someArray[k].heading = '';
                                        }
                                    }
                                    if (program.defaultProgram === 'Y') {
                                        $scope.someArray[k].subhead = "Default Benefit Program";
                                    }
                                    $scope.apply = $scope.appliesToYou(value);
                                    if ($scope.apply === true) {
                                        $scope.someArray[k].apply = "This one applies to you";
                                    }
                                    $scope.someArray[k].PlanCode = program.benefitProgram;
                                    $scope.filteredBenefits.push($scope.someArray[k]);
                                }
                            }
                            $scope.filteredBenefitsSummary1.push($scope.filteredBenefits);
                        });
                        $scope.filteredBenefitsSummary = $scope.filteredBenefitsSummary1;
                        $scope.filteredBenefitsSummary1 = {};
                    });
                };
                /*display links end*/
            },
            function (data) {
                $scope.childParentAlertMsg(data);
            }
        );
        $scope.reOrderId = function (benefitsSummaryNew) {
            angular.forEach(benefitsSummaryNew, function (value2, key2) {
                value2.id = key2;
            });
        };
        $scope.callme = function (incomeDetails,fromDate,toDate) {
            $scope.planCode = incomeDetails.PlanCode;
            $scope.planKey = incomeDetails.key;
            $scope.planType = incomeDetails.type;
            SharedDataService.getAppSharedData().planCode = $scope.planCode;
            SharedDataService.getAppSharedData().planKey = $scope.planKey;
            SharedDataService.getAppSharedData().planType = $scope.planType;
            $scope.setFromToDate(fromDate,toDate);
        };
        $scope.setFromToDate = function(fromDate,toDate){
            if(fromDate && toDate){
                SharedDataService.getAppSharedData().planCode = $scope.payFrquencyListArray.employeeBenefitProgram;
                SharedDataService.getAppSharedData().planKey =  $scope.payFrquencyListArray.employeePayFrequency;
                SharedDataService.getAppSharedData().fromDate = fromDate;
                SharedDataService.getAppSharedData().fromDate = toDate;
            }
        };
        $scope.appliesToYou = function (val) {
            angular.forEach($scope.payFrquencyListArray, function (p1, k1) {
                if (k1 === "benefitProgramList" && p1 !== null) {
                    angular.forEach(p1, function (p2) {
                        if ((p2.benefitProgram === $scope.employeeBenefitProgram) && ($scope.employeePayFrequency === val)) {
                            $scope.checkIndicator = true;
                        }
                        else {
                            $scope.checkIndicator = false;
                        }
                    });
                }
            });
            return $scope.checkIndicator;
        };

    }]);
