
'use strict';
trinetApp
    .controller(
    'orgChartViewCtrl', ['$scope', '$q', 'gso', '$filter', '$location',
        function ($scope, $q, gso, $filter, $location) {
            var manageOrder = [];
            $scope.profilePageDisplay=function(){
                $location.path('/profile/profile/'+$scope.Id);
            };
            $scope.homePageDisplay=function() {
                $location.path('/manageEmployee');
            };
            $scope.init=function(){
                var Id=gso.getRouteParams().empId;
                $scope.bindOrgDeatails(Id);
                $scope.inDept = false;
            };
            $scope.viewOrg = function(){
                $scope.bindOrgDeatails(gso.getRouteParams().empId);
                $scope.inDept = false;
            };
            $scope.bindOrgDeatails = function(Id){
                $scope.Id = Id;
                $scope.memberslogoName=[];
                //service call to get the info of employee assignee's
                gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.org + "/" + gso.getAppConfig().companyId + "/" +
                    $scope.Id + companyUrlConfig.resources.orgChart+'?cache=flush', null,
                    function (response) {
                              $scope.bindCenterCard(response);
                              gso.getNGDialog().closeAll();
                           }, function (data) {
                                $scope.errorAlert = data;
                             });
                // service call to get the info of the Employee
                gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase +  gso.getAppConfig().companyId + '/' +   $scope.Id  + profileUrlConfig.resources.employmentDetails + "?include=name,posDesc,deptDesc&cache=flush" , null,
                    function (response) {
                      $scope.employeeName=response.name.split(',');
                      $scope.fullName="";
                      $scope.arrangeName=$scope.employeeName.length-1;
                      for (var name in $scope.employeeName) {
                          if(name) {
                              $scope.fullName += $scope.employeeName[$scope.arrangeName] + ' ';
                              $scope.arrangeName--;
                          }
                      }
                      $scope.position=response.posDesc;
                      $scope.department=response.deptDesc;
                      $scope.empLogoName =   $scope.employeeName[0].charAt(0).toUpperCase() +   $scope.employeeName[1].charAt(0).toUpperCase();
                    });
                };
                 $scope.getManagerList = function (empId) {
                      $scope.bindOrgDeatails(empId);
                      $scope.inDept = false;
                 };
                 $scope.getManagerListInMembersData = function(index , empId){
                        if($scope.inDept){
                            return;
                        }
                        $scope.bindOrgDeatails(empId);
                        $scope.inDept = false;
                 };
            $scope.findEmployees = function(){
                $scope.errorAlert = null;
                    gso.getNGDialog()
                    .open({
                        template: 'app/components/company/orgChart/findEmployee.html',
                        scope: $scope,
                        controller: 'findEmployeeCtrl',
                        closeByDocument: false
                    });
            };
            $scope.init();
            $scope.bindCenterCard = function(response){
                 $scope.membersCount = response.members.length;
                 $scope.membersData = response.members;
                 $scope.manager=response.managers;
                 for (var logo in $scope.membersData) {
                     if (logo) {
                         $scope.memberslogoName[logo] = $scope.membersData[logo].employeeName[0].charAt(0).toUpperCase() + $scope.membersData[logo].employeeName[1].charAt(0).toUpperCase();
                     }
                 }
                 var uniqueNames = [];
                 var uniqueObj = [];
                 if($scope.manager !== undefined){
                 for (var i = 0; i < $scope.manager.length; i++) {
                     if (uniqueNames.indexOf($scope.manager[i].employeeId) === -1) {
                         uniqueObj.push($scope.manager[i]);
                         uniqueNames.push($scope.manager[i].employeeId);
                     }
                 }
                 }
                 if (uniqueObj.length > 1) {
                         angular.forEach(uniqueObj, function (manager, index) {
                      if (manager.relation !== 'prox') {
                              if (manager.relation === 'supr') {
                                  manageOrder[0] = manager;
                              } else {
                                  manageOrder[1] = manager;
                              }
                         }
                     });
                          $scope.manager = manageOrder;
                      } else {
                          $scope.manager = uniqueObj;
                      }
                 };
                 $scope.getDeptDetails = function (response, desc) {
                     /*$scope.orgChart = response;
                     $scope.orgChart.managers = response.managers;*/
                        $scope.bindCenterCard(response);
                        $scope.data = response.departmentHeads;
                        $scope.mainHead = $scope.data.findIndex(function(item){
                           return item.employeeDetails;
                        });
                        $scope.employeeName=$scope.data[$scope.mainHead].employeeName.split(' ');
                        $scope.Id = $scope.data[$scope.mainHead].employeeId;
                        $scope.fullName="";
                        $scope.arrangeName=$scope.employeeName.length-1;
                        for (var name in $scope.employeeName) {
                            if(name) {
                                $scope.fullName += $scope.employeeName[$scope.arrangeName] + ' ';
                                $scope.arrangeName--;
                            }
                        }
                        $scope.data[$scope.mainHead].employeeDetails.posDesc ? $scope.position =  $scope.data[$scope.mainHead].employeeDetails.posDesc : $scope.position = '';
                        $scope.data[$scope.mainHead].employeeDetails.department ? $scope.department = $scope.data[$scope.mainHead].employeeDetails.department : $scope.department = '';
                        $scope.empLogoName = $scope.employeeName[0].charAt(0).toUpperCase() +   $scope.employeeName[1].charAt(0).toUpperCase();
                        $scope.inDept = true;
                        $scope.deptName = desc.deptName;
                        gso.getNGDialog().closeAll();

                };
        }]);
