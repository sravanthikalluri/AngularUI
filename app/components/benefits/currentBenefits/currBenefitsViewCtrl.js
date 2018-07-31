/**
 Description: This is controller used to fetch Current Benefits details
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('currBenefitsCtrl', ['$scope', 'gso', '$sce','genericService',
    function ($scope, gso, $sce, genericService) {
			$scope.errorAlert = null;
			$scope.noRecordsAlert = null;
            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = gso.getAppConfig().userId;
                $scope.isEmployeeView = true;
            }
            else {
                $scope.isEmployeeView = false;
            }
            var appUserId = $scope.appUserId;
            $scope.selectTab = 'Current';
            $scope.showFutureTab = false;

            $scope.$parent.$on('menuLoaded', function (event, data) {
                if (data === true) {
                    $scope.hasLifeStatusChange = gso.getUtilService().checkIfNavigationExists("Benefits", "Submit Life Status Change");
                }
            });

			// ToDo: Getting the Employee Roles to the user:
			$scope.empRolesDataService = gso.getCrudService()
			.execute(constants.get,manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
				manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.userRoles, null, function (response) {
					$scope.empRolesData = response;
					$scope.adminRole = $scope.empRolesData.some(function(item){ return (item === "HRAdmin");});
				}
			);

            $scope.trust = $sce.trustAsHtml;
            $scope.currentBenefits = gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + appUserId + '/' + 'current-benefits', null,
                function (response) {
                    $scope.curBenefits = response.enrollment.curBenefits;
                    $scope.electionFlag = response.benefitElectionSubmitted;
                    $scope.depDetails = response.enrollment.curBenefits.dependentDetails;
                    // Service called for Gender Status
                gso.getAPIConfigDataService().getGenders().then(function(response) {
                    $scope.gender = response;
                    if ($scope.depDetails !== undefined && $scope.depDetails !== null) {
                        angular.forEach($scope.gender, function (input) {
                         angular.forEach($scope.depDetails,function(item){
                          if (input.key === item.sex) {
                               item.sex = input.value;
                           }
                         });
                        });
                    }
                  });

                  // Service called for Gender Status
                    gso.getAPIConfigDataService().getMaritalStatus().then(function(response) {
                  $scope.marital = response;
                  if ($scope.depDetails !== undefined && $scope.depDetails !== null) {
                      angular.forEach($scope.marital, function (input) {
                       angular.forEach($scope.depDetails,function(item){
                        if (input.key === item.maritalStatus) {
                             item.maritalStatus = input.value;
                         }
                       });
                     });
                  }
                });
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

              gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + appUserId + '/' + 'current-future-benefits', null,
                function (response) {
                        $scope.showFutureTab = true;
                    $scope.futureBenefits = response.enrollment.curBenefits.currentBenefits;
                     // Future-Benefit Condition:
                    var enrollEndDt=response.enrollment.enrollmentDeadlineData.enrollEndDt;
                    var payBeginDt=response.enrollment.enrollmentDeadlineData.planYearBeginDt;
                    $scope.todayDate = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                    if(gso.getUtilService().todayBtnTwoDates(new Date(),enrollEndDt,payBeginDt)){
                    if("Y"===response.enrollment.enrollmentDeadlineData.systemDefaultedElection || "N"===response.enrollment.enrollmentDeadlineData.systemDefaultedElection){
                       $scope.enableFutureBenefits= true;
                      }else{
                        $scope.enableFutureBenefits= false;
                      }
                    }
                },
                function (data) {
                       // $scope.errorAlert = data;
                        $scope.showFutureTab= data._statusCode === '404' ? true : false;
                }
            );
			$scope.showDetailsLink = function(coverag){
				return (coverag.dependentBeneficiaryType) ? true : false;
			};

            $scope.openPersonalDetails = function (index) {
                $scope.detailsData = $scope.depDetails[index];
                var body = angular.element('body');
                body.addClass('current-benfite-popup-new');
                gso.getNGDialog()
                    .open({
                        template: fileConfig.benefits.currBenDetails,
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });

                $scope.$on('ngDialog.closed', function () {
                    angular.element('body').removeClass('current-benfite-popup-new');
                });
            };

            $scope.splitKeyValue = function (value, index) {
                var arr = value.split('and');
                return arr[index];
            };

            $scope.getFlatIconName = function (value) {
                var flatIcons = {
                    "10": "icon-icon_stethescope",
                    "11": "icon-icon_tooth",
                    "14": "icon-icon_eye",
                    "23": "icon-icon_heart_lifeline",
                    "27": "icon-icon_heart_lifeline",
                    "30": "icon-icon_wheelchair",
                    "31": "icon-icon_wheelchair",
                    "60": "icon-icon_piggybank",
                    "40": "icon-icon_piggybank",
                    "4Q": "icon-icon_piggybank",
                    "61": "icon-icon_piggybank"
                };
                return flatIcons[value];
            };


            $scope.printCurrentBenf = function (id) {
                gso.getUtilService().printSection(id+'Print');
            };
    }]);
