'use strict';
trinetApp.controller('extendLeaveRequestCtrl', ['$scope', 'gso', '$compile', 'appConfig',
    function ($scope, gso, $compile, appConfig) {
        $scope.IsVisible = false;
        $scope.showLearn = true;
        $scope.submitLeaveRequestSubmitted = false;
        $scope.extendedLeaveOfAbsenceValues = [];
        $scope.extendLeave = { leaveReason: {}, fmlaQualification: {}, benefitPremiumRepayment: {}};
        $scope.extendLeave.leaveReason.reasonCode = {};
        $scope.isShow = false;
        $scope.isNumberOfPayPeriodsRequired = false;
        $scope.error = 'error-warning';
        $scope.noError = '';
        $scope.isAmbrose = appConfig.peoId === 'AMB';
        var modelObj = {
            'ILL': 'disabilityDate',
            'MAF': 'newbornDate',
            'ADP': 'adoptionDate',
            'WOR': 'workInjuryDate'
        };

        var fieldNames = {
            'ILL': 'Date of Disability',
            'MAF': 'Estimated Due Date',
            'ADP': 'Date of the event',
            'WOR': 'Date of the event'
        };

        function insertInput(a, b, at) {
            var position = a.indexOf(at);
            if (position !== -1) {
                return a.substr(0, position) + b + a.substr(position);
            }
        }

        function addNumberOfPayPeriods(name) {
            return name.indexOf('earnings over') > 0 ? (insertInput(name, '<div class="relative benefitPremiumRepayment"><input type="text" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" class="input-mini" ng-model="extendLeave.benefitPremiumRepayment.numberOfPayPeriods" ng-class="(isNumberOfPayPeriodsRequired && !extendLeave.benefitPremiumRepayment.numberOfPayPeriods) ? error: noError" ng-focus="showMessage = true;" ng-blur="showMessage = false;" ng-required="isNumberOfPayPeriodsRequired" /><Validation condition="isNumberOfPayPeriodsRequired && showMessage && !extendLeave.benefitPremiumRepayment.numberOfPayPeriods" msg="{{translation.required_field}}"></Validation></Validation></div>', 'earnings over')) : name;
        }

        function filteredAsKeyValuePairs(obj, bool, isBenefitsPremium) {
            return Object.keys(obj).map(function (keyName) {
                return {
                    key: keyName,
                    value: bool ? obj[keyName].substring(0, 80) : (isBenefitsPremium ? addNumberOfPayPeriods(obj[keyName]) : obj[keyName]),
                    desc: bool ? obj[keyName] : (isBenefitsPremium ? addNumberOfPayPeriods(obj[keyName]) : obj[keyName]),
                    isSelect: false
                };
            });
        }

        function filterDataCallback(obj) {
            $scope.extendedLeaveOfAbsenceValues.extendedLOACds = filteredAsKeyValuePairs(obj.extendedLOACds, true);
            $scope.extendedLeaveOfAbsenceValues.flexibleSpendingAcc = filteredAsKeyValuePairs(obj.fsaCds);
            $scope.extendedLeaveOfAbsenceValues.benefitPreRepayCds = filteredAsKeyValuePairs(obj.benefitPreRepayCds, false, true);
        }

        function initializeLeaveOfAbasence() {
            $scope.extendLeave.leaveOfAbsence = {};
            $scope.extendLeave.leaveOfAbsence.additionalTime = [{
                leaveType: '',
                leaveDesc: '',
                hours: ''
            }];
        }

        function timeOff() {
            $scope.leaveTypes = [];
            var planTypes = ['50', '51', '52'];
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.timeOff + "/" + gso.getAppConfig().companyId + '/' + $scope.appUserId + manageEmpUrlConfig.resources.timeOffHistory, null, function (response) {
                response.map(function (obj) {
                    if (planTypes.indexOf(obj.planType) >= 0) {
                        $scope.leaveTypes.push({key: obj.planTypeDesc , value: obj.accrualList[0].balanceHrs, name: (obj.planTypeDesc !== '') ? obj.planTypeDesc + ' (' + obj.accrualList[0].balanceHrs + ' hrs left)' : ''});
                    }
                });
                $scope.leaveTypes.push({key: 'Othertype', value: '', name: 'Other Types'});
            }, function (data) {
                $scope.leaveTypes.push({key: 'Sick', value: 0, name: 'Sick (0 hrs left)'});
                $scope.leaveTypes.push({key: 'PTO', value: 0, name: 'PTO (0 hrs left)'});
                $scope.leaveTypes.push({key: 'Vacation', value: 0, name: 'Vacation (0 hrs left)'});
                $scope.leaveTypes.push({key: 'Othertype', value: '', name: 'Other Types'});
            });
        }

        function init() {
            initializeLeaveOfAbasence();
            timeOff();
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.timeOff + "/" + gso.getAppConfig().companyId + manageEmpUrlConfig.resources.extendedLeaveCds, null, function (response) {
                $scope.extendedLeaveOfAbsenceValues = response;
                filterDataCallback(response);
            }, function (data) {
                console.log('data', data);
            });
        }

        init();

        $scope.selectAndDeselect = function (arr, obj, bool) {
            arr.map(function (_obj) {
                _obj.isSelect = _obj.key === obj.key;
            });
            if (!bool) {
                $scope.extendLeave.fsaContribution = obj.key;
            } else {
                $scope.extendLeave.benefitPremiumRepayment.benefitPremiumCode = obj.key;
                $scope.isNumberOfPayPeriodsRequired = obj.key === 'PRO_DED_PP';
                if (obj.key !== 'PRO_DED_PP') {
                    $scope.extendLeave.benefitPremiumRepayment.numberOfPayPeriods = '';
                }
            }

        };

        $scope.isHoursExceededFun = function (obj) {
            var requiredLeaveType = $scope.leaveTypes.filter(function (leaveObj) {
                return leaveObj.key === obj.leaveType;
            });

            $scope.isHoursExceeded = (requiredLeaveType[0] && requiredLeaveType[0].value < obj.hours);
        };

        $scope.populateRespectiveField = function (item) {
            item = item ? JSON.parse(item) : {};
            $scope.selectedReason = item;
            $scope.isShow = ['ILL', 'MAF', 'ADP', 'WOR'].indexOf(item.key) >= 0;
            $scope.fieldName = fieldNames[item.key];
            $scope.extendLeave.modleName = null;
            $scope.extendLeave.leaveReason.isWorkersCompFiled = "";
        };

        $scope.showLearnMore = function () {
            $scope.IsVisible = !$scope.IsVisible;
            $scope.showLearn = $scope.showLearn ? false : true;
        };

        $scope.addAdditionalTime = function () {
            if ($scope.extendLeave.leaveOfAbsence.additionalTime === undefined) {
                $scope.extendLeave.leaveOfAbsence.additionalTime = [];
            }
            $scope.extendLeave.leaveOfAbsence.additionalTime.push({
                leaveType: '',
                leaveDesc: '',
                hours: ''
            });
        };

        $scope.removeAdditionalTime = function () {
            var lastItem = $scope.extendLeave.leaveOfAbsence.additionalTime.length - 1;
            $scope.extendLeave.leaveOfAbsence.additionalTime.splice(lastItem);
        };

        $scope.checkFirstDayLeaveIsUnpaid = function () {
            if ($scope.extendLeave.extendedLeaveStartDate && $scope.extendLeave.unpaidLeaveDate) {
                var extendedLeaveStartDate = gso.getUtilService().filterDate(new Date($scope.extendLeave.extendedLeaveStartDate), constants.dateFormat);
                var unpaidLeaveDate = gso.getUtilService().filterDate(new Date($scope.extendLeave.unpaidLeaveDate), constants.dateFormat);
                if (!gso.getUtilService().compareDates(unpaidLeaveDate, extendedLeaveStartDate)) {
                    var alert = {
                        _statusCode: constants.warning,
                        _statusMessage: profile.leaveRequest.unpaidLeaveDateAlert
                    };
                    $scope.childParentAlertMsg(alert);
                    $scope.extendLeave.unpaidLeaveDate = '';
                }
            }
        };

        $scope.dateValidate = function () {
            var currentDate = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
            var lastWorkedDate1 = angular.element("#lastWorkedDate").val();
            var extendedLeaveStartDate1 = angular.element("#extendedLeaveStartDate").val();
            if (lastWorkedDate1.indexOf('/') !== -1) {
                $scope.extendLeave.lastWorkedDate = gso.getUtilService().filterDate(lastWorkedDate1, constants.dateFormat);
            }
            if (extendedLeaveStartDate1.indexOf('/') !== -1) {
                $scope.extendLeave.extendedLeaveStartDate = gso.getUtilService().filterDate(extendedLeaveStartDate1, constants.dateFormat);
            }


            if ($scope.extendLeave.extendedLeaveStartDate === undefined || $scope.extendLeave.extendedLeaveStartDate === "0NaN-NaN-NaN") {
                if ($scope.extendLeave.lastWorkedDate > currentDate) {
                    var alert = {
                        _statusCode: constants.warning,
                        _statusMessage: profile.leaveRequest.lastWorkDateAlert
                    };
                    //$scope.childParentAlertMsg(alert);
                    //$scope.extendLeave.lastWorkedDate = '';
                }
                $scope.extendLeave.extendedLeaveStartDate = '';
            }
            else {
                if ($scope.extendLeave.extendedLeaveStartDate !== "" && (new Date($scope.extendLeave.extendedLeaveStartDate) <= new Date($scope.extendLeave.lastWorkedDate))) {
                        var leaveRequestAlert = {
                            _statusCode: constants.warning,
                            _statusMessage: profile.leaveRequest.extendedLeaveStartDateAlert
                        };
                        $scope.childParentAlertMsg(leaveRequestAlert);

                        $scope.extendLeave.extendedLeaveStartDate = '';
                }

            }
        };
        $scope.addSevenDays = function (from) {
            if (from == 'extendedLeaveStartDate') {
                $scope.extendLeave.unpaidLeaveDate = '';
            }
            if ((new Date($scope.extendLeave.extendedLeaveStartDate)) > (new Date($scope.extendLeave.estimatedReturnDate))) {
                var alert = {
                    _statusCode: constants.warning,
                    _statusMessage: profile.leaveRequest.estimatedReturnToWorkDate
                };
                $scope.childParentAlertMsg(alert);
                $scope.extendLeave.estimatedReturnDate = '';
            }
            else {
                $scope.diffDays = Math.round(Math.abs((new Date($scope.extendLeave.extendedLeaveStartDate)).getTime() - (new Date($scope.extendLeave.estimatedReturnDate)).getTime()) / (1000 * 60 * 60 * 24));

                if ($scope.diffDays < 7 || $scope.extendLeave.extendedLeaveStartDate > $scope.extendLeave.estimatedReturnDate) {
                    var customAlert = {
                        _statusCode: constants.warning,
                        _statusMessage: profile.leaveRequest.estimatedReturnToWorkDate
                    };
                    $scope.childParentAlertMsg(customAlert);
                    $scope.extendLeave.estimatedReturnDate = '';
                }
            }
        };


        $scope.filterDateFormat = function (date) {
            return date ? gso.getUtilService().filterDate(new Date(date), constants.dateFormat) : null;
        };

        $scope.submitLeaveRequest = function (extendLeave) {
            $scope.submitLeaveRequestSubmitted = true;
            $scope.extendLeave.isAcknowledged = extendLeave.fmlaQualification.isAcknowledged ? true : false;
            $scope.extendLeave.fmlaQualification.isAcknowledged = extendLeave.fmlaQualification.isAcknowledged ? true : false;
            $scope.extendLeave.lastWorkedDate = $scope.filterDateFormat(extendLeave.lastWorkedDate);
            $scope.extendLeave.extendedLeaveStartDate = $scope.filterDateFormat(extendLeave.extendedLeaveStartDate);
            $scope.extendLeave.estimatedReturnDate = $scope.filterDateFormat(extendLeave.estimatedReturnDate);

            $scope.extendLeave.unpaidLeaveDate = $scope.filterDateFormat(extendLeave.unpaidLeaveDate);
            $scope.extendLeave.eventDate = null;
            $scope.extendLeave.leaveReason.reasonCode = JSON.parse($scope.extendLeave.leaveReason.reasonCode);
            var mgdReason = $scope.extendLeave.leaveReason.reasonCode.key;
            delete $scope.extendLeave.leaveReason.reasonCode;

            var obj = angular.extend({}, $scope.extendLeave);
            obj.leaveReason['reasonCode'] = mgdReason;
            $scope.extendLeave.modleName = $scope.filterDateFormat(extendLeave.modleName);
            if (modelObj[mgdReason]) {
                obj.leaveReason[modelObj[mgdReason]] = $scope.extendLeave.modleName;
            }

            gso.getCrudService().execute(constants.post, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.timeOff + "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.extLeave, obj, function (response) {
                $scope.childParentAlertMsg(response);
                $scope.getEmployeePermissions(gso.getRouteParams().empId);
                $scope.empStatusChange();
            }, function (data) {
                $scope.childParentAlertMsg(data);
            });
            $scope.toggleExtendLeaveRequest();
            $scope.extendLeave = {};
        };

        $scope.validationPatterns = {
            leaveDesc: {
                blur: {
                    leaveDescRequired: null
                },
                focus: {
                    leaveDescRequired: null
                }
            },
            hours: {
                blur: {
                    hoursRequired: null,
                    hoursPattern: null
                },
                focus: {
                    hoursRequired: null,
                    hoursPattern: null
                }
            },
            extendLeave: {
                blur: {
                    extendLeaveFormlastWorkedDateRequired: null,
                    lastWorkedDate: null,
                    extendLeaveFormStartDateRequired: null,
                    extendedLeaveStartDate: null,
                    extendLeaveFormSestimatedReturnDateRequired: null,
                    firstDayleaveUnpaidRequired: null,
                    reasonLeaveRequired: null,
                    preferredPhoneRequired: null,
                    preferredPhonePattern: null,
                    extendLeaveReturnFromLeaveDateRequired: null
                },
                focus: {
                    extendLeaveFormlastWorkedDateRequired: null,
                    lastWorkedDate: null,
                    extendLeaveFormStartDateRequired: null,
                    extendedLeaveStartDate: null,
                    extendLeaveFormSestimatedReturnDateRequired: null,
                    firstDayleaveUnpaidRequired: null,
                    reasonLeaveRequired: null,
                    preferredPhoneRequired: null,
                    preferredPhonePattern: null,
                    extendLeaveReturnFromLeaveDateRequired: null
                }
            }
        };
        $scope.onFocus = function (name, object) {
            var temp = {};
            angular.forEach(object, function (value, key) {
                temp[key] = false;
            });

            if (name === 'extendLeave') {
                $scope.validationPatterns.extendLeave.focus = temp;
            }
        };
    }]);
