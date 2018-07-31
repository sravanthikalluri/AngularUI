/**
 * Description: This is controller is used to fetch benefits forms tile information
 * Author:Krishnam Raju Kollu
 */
'use strict';
trinetApp.controller('holidayScheduleCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.currentDate=new Date();
        $scope.currentYear=$scope.currentDate.getFullYear();
        $scope.futureyear = $scope.currentDate.getFullYear()+1;

       $scope.holidayService = function(){
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
            "/" + gso.getAppConfig().companyId + "/holiday-schedule?year="+$scope.currentYear, null,
            function (response) {
                $scope.currentYearHolidayScheduleData = response;
            },
            function (data) {
                $scope.currentYearErrorAlert = data;
            }
            );
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.policy +
            "/" + gso.getAppConfig().companyId + "/holiday-schedule?year="+$scope.futureyear, null,
            function (response) {
                $scope.nextyearHolidayScheduleData = response;
            },
            function (data) {
                $scope.nextYearErrorAlert = data;
            }
            );
         };
        $scope.isUrl = function(url){
            if(url){
                return (url.indexOf(".pdf") !== -1)?  true : false;
            }
        };
      $scope.holidayService();
    }]);
