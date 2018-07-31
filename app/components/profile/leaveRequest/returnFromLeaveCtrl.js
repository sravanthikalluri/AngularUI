'use strict';
trinetApp.controller('returnFromLeaveCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = false;
        $scope.showLearn = true;
        $scope.returnLeave = {};
        $scope.showLearnMore = function () {
            $scope.IsVisible = !$scope.IsVisible;
            $scope.showLearn = $scope.showLearn ? false : true;
        };
        $scope.checkDate = function (date) {
            if (date) {
                var currentDate = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
                var returnToWorkDate = gso.getUtilService().filterDate(new Date(date), constants.dateFormat);
                return gso.getUtilService().checkCurrentFutureDate(returnToWorkDate, currentDate);
            }
        };
        /* To Sending Extended Leave Request details*/
        $scope.submitReturnRequest = function () {
            $scope.returnLeave.returnToWorkDate = gso.getUtilService().filterDate(new Date($scope.returnLeave.returnToWorkDate), constants.dateFormat);
            gso.getCrudService().execute(constants.post, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.timeOff + "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.returnLeave, $scope.returnLeave, function (response) {
                $scope.toggleReturnFromLeave();
                $scope.returnLeave = {};
                $scope.childParentAlertMsg(response);
                $scope.getEmployeePermissions(gso.getRouteParams().empId);
                $scope.empStatusChange();
            }, function (data) {
                $scope.childParentAlertMsg(data);
            });
        };

        $scope.cancel = function () {
            $scope.returnLeave = {};
            $scope.validationPatterns.returnFromLeave.blur.returnFromLeaveDate = null;
            $scope.validationPatterns.returnFromLeave.focus.returnFromLeaveDate = null;
            $scope.toggleReturnFromLeave();
        };

        $scope.validationPatterns = {
            returnFromLeave: {
                blur: {
                    returnLeaveFormreturndateRequired: null,
                    returnFromLeaveDate: null
                },
                focus: {
                    returnLeaveFormreturndateRequired: null,
                    returnFromLeaveDate: null
                }
            }
        };

        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'returnFromLeave') {
                $scope.validationPatterns.returnFromLeave.focus = temp;
            }
        };
    }]);
