/**
 * Description: This is controller is used to fetch resource tile information
 * Author:Krishnam Raju Kollu
 */
'use strict';
trinetApp.controller('benefitsResourceCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.benefitsResource = [];
        $scope.resourcesItems = [
            { id: 0, resourceName: 'What’s Changing'}
        ];
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/links?pageView=Admin", null,
            function (response) {
                angular.forEach(response.docMeta,function (value) {
                    value.title === "Summary of Medical Plan Changes" ? $scope.benefitsResource.push(value) : null;
                });
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/plans", null,
        function (response) {
            $scope.response = response;
            $scope.benefitProgramArray = $scope.response.benefitProgramList;
            $scope.currentPlanStartDate = $scope.response.currentPlanStartDate;
            $scope.currentPlanEndDate = $scope.response.currentPlanEndDate;
            $scope.futurePlanStartDate = $scope.response.planStartDate;
            $scope.futurePlanEndDate = $scope.response.planEndDate;
            $scope.fromDate = gso.getUtilService().filterDate($scope.currentPlanStartDate, "MMMM dd, yyyy"); //TODO: constantsConfig.fullDateFormat
            $scope.toDate = gso.getUtilService().filterDate($scope.currentPlanEndDate, "MMMM dd, yyyy");
            $scope.futureFromDate = gso.getUtilService().filterDate($scope.futurePlanStartDate, "MMMM dd, yyyy");
            $scope.futureToDate = gso.getUtilService().filterDate( $scope.futurePlanEndDate , "MMMM dd, yyyy");
            $scope.payFrquencyListArray = $scope.response;
            $scope.customindicator = $scope.response.customIndicator;
            $scope.subHeading = $scope.response.groupDesc;
				if ($scope.response.employeeBenefitProgram !== "undefined" && $scope.response.employeeBenefitProgram !== null &&
                $scope.response.employeePayFrequency !== "undefined" && $scope.response.employeePayFrequency !== null) {
                        $scope.employeeBenefitProgram = $scope.response.employeeBenefitProgram;
                        $scope.employeePayFrequency = $scope.response.employeePayFrequency;
				}
				else {
					$scope.employeeBenefitProgram = "";
					$scope.employeePayFrequency = "";
				}

                gso.getCrudService().execute(constants.get, "assets/data/benefits/benefitsSummaryLinks.json", null,
                function (response) {
                        $scope.benefitsSummaryData = angular.copy(response);
						$scope.displayLinks($scope.benefitsSummaryData, $scope.payFrquencyListArray, $scope.customindicator, $scope.benefitProgramArray);
					},
					function (data) {
                        $scope.errorAlert = data;
						$scope.childParentAlertMsg(data);
					});

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
										$scope.someArray[k].heading = $scope.someArray[k].heading + "for " + payFrquencyListArray.benefitProgramList[programKey].description;
										if ($scope.customindicator === true && $scope.someArray[k].type === 'cop') {
											$scope.someArray[k].heading = '';
										}
									}
									if (program.defaultProgram === 'Y') {
										$scope.someArray[k].subhead = "Default Benefit Program";
									}else{
										$scope.apply = $scope.appliesToYou(value,programKey);
										if ($scope.apply === true) {
											$scope.someArray[k].subhead = "This one applies to you";
										}
									}

									$scope.someArray[k].PlanCode = program.benefitProgram;
									$scope.filteredBenefits.push($scope.someArray[k]);
								}
							}
							$scope.filteredBenefits.benefitProgram = program.benefitProgram;
							$scope.filteredBenefits.description = program.description;
							$scope.filteredBenefitsSummary1.push($scope.filteredBenefits);
						});
                        $scope.filteredBenefitsSummary = $scope.filteredBenefitsSummary1;
					});
				};
        },
        function (data) {
            $scope.errorAlert = data;
        });

        $scope.appliesToYou = function (val,index) {
            var programList= $scope.payFrquencyListArray.benefitProgramList;
                    if(Array.isArray(programList)) {
                        return ((programList[index].benefitProgram === $scope.employeeBenefitProgram) && ($scope.employeePayFrequency === val)) ? true : false;
                    }
        };
        $scope.openBuildMaintainCustomModal = function(planDate){
            $scope.planDate = planDate;
            $scope.buildMaintainModal = gso.getNGDialog().open({
                templateUrl: 'app/components/benefits/policies/benefitsSummary/buildMaintainStates/buildMaintainView.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false,
                controller: 'buildMaintainViewCtrl'

            });
            $scope.$on('ngDialog.opened', function (event, $dialog) {
                $dialog.find('.ngdialog-content').css('width', '960px');
            });

        }



        $scope.openCobraSummaryModal = function(startDate, endDate) {
            $scope.dataForModal = {
                startDate: startDate,
                endDate: endDate
            }
            gso.getNGDialog().open({
                    templateUrl: 'app/components/benefits/policies/benefitsSummary/cobraBenefitsSummary/cobraBenefitsSummaryView.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false,
                    controller: 'cobraBenefitsSummaryViewCtrl'
                }
            )
        };

    }]);
