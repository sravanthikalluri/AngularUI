'use strict';
trinetApp.directive('historyTimeline',
    function (gso,SharedDataService) {
        return {
            restrict: 'AE',
            scope: {
                mydata: '=data',
                sectionType: "=section",
                translation:"=translation",
                type:"=type"
            },
            controller: function ($scope) {
                $scope.dateConvert = function (inDate) {
                    return new Date(inDate);
                };
                $scope.errorAlert = null;
                $scope.noRecordsAlert = null;

                $scope.displayHistory = function (selectedEffectiveDate, detail) {
                    if($scope.sectionType === "employeementChange"){
                        $scope.appUserId = SharedDataService.getAppSharedData().displayHistoryUserId;
                    }else{
                        $scope.appUserId = gso.getAppConfig().userId;
                    }
                    gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                        gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.displaychange + selectedEffectiveDate, null,
                        function (response) {
                            detail.showTable = true;
                            detail.showClose = true;
                            if (response.length === 0) {
                                $scope.errorAlert = {
                                    _statusCode: constants.warning,
                                    _statusMessage: "display Change history Data Not Available"
                                };
                            } else {
                                detail.displayChangeData = response;
                            }
                        },
                        function (data) {
                            detail.showTable = true;
                            detail.errorDisplayChnageData = true;
							$scope.errorAlert = data;
                            $scope.childParentAlertMsg(data);
                        }
                    );
                };

                $scope.closeAlert = function () {
                    $scope.errorResp = null;
                    $scope.errorCodeBool = false;

                };

                $scope.childParentAlertMsg = function (data) {
                 if(data && data._statusCode  && data._statusCode !== '404'){
                     $scope.errorAlert = data;
                 }else{
                     $scope.noRecordsAlert = data;
                 }

               };

            },
            templateUrl: 'app/shared/views/historyView.html'
        };
    });
