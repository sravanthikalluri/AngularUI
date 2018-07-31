/**
 Description: This is controller used to display payroll information on screen
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('adminPayrollScheduleCtrl', ['$scope', 'gso','$timeout',
    function ($scope, gso,$timeout) {
        $scope.weekDay = gso.getUtilService().weekDays();
        $scope.currentDate = gso.getUtilService().filterDate(new Date(), 'MMMM dd, yyyy');
        $scope.payDate = "";
        $scope.deductionNotTaken = "";
        $scope.checkDate = "";
        $scope.periodEndDate = "";
        $scope.format = "MM/dd/yyyy";
        $scope.firstTime = true;
        $scope.nextPayDate = "";
        var isPayrollAdmin = true;
        var payrollMonth = null,
            payrollMonthData = [],
            beginDate = null,
            currentMonthYr = 0,
            previousMonthYr = 0,
            prevPayrollSchedule = null,
            lastRecord = false;


        $scope.loadPayrollData = function(response){
            $scope.payrollData = response;
            //generatePayrollScheduleHelpInfo(response.payrollScheduleHelpInfo);
            $scope.payDateSorting($scope.payrollData);
            var index = currentMonthIndex(payrollMonthData, new Date().moveToFirstDayOfMonth().toString(constants.dateFormatUS), "firstDateOfMonth");
            $scope.change(index);
            $scope.onMonthCoverflowSelect(index);
        };

        function generatePayrollScheduleHelpInfo(payrollScheduleHelpInfo){
            switch (payrollScheduleHelpInfo.payFrequency) {
                case 'B' :
                    payrollScheduleHelpInfo.title = $scope.translation.money.payrollSchedule.biWeek;
                    payrollScheduleHelpInfo.message = $scope.translation.money.payrollSchedule.biWeekHelp;
                    break;
                case 'W' :
                    payrollScheduleHelpInfo.title = $scope.translation.money.payrollSchedule.week;
                    payrollScheduleHelpInfo.message = $scope.translation.money.payrollSchedule.weekHelp;
                    break;
                case 'S' :
                    payrollScheduleHelpInfo.title = $scope.translation.money.payrollSchedule.smMonth;
                    payrollScheduleHelpInfo.message = $scope.translation.money.payrollSchedule.semiMonthHelp;
                    break;
                case 'M' :
                    payrollScheduleHelpInfo.title = $scope.translation.money.payrollSchedule.mon;
                    payrollScheduleHelpInfo.message = $scope.translation.money.payrollSchedule.monthlyHelp;
                    break;
                default:
                    payrollScheduleHelpInfo.title = payrollScheduleHelpInfo.payFrequency;
            }
            $scope.scheduleInfo = payrollScheduleHelpInfo;
        }

        /* Payroll Schedule data fetching and parsing*/

        $scope.payrollInit = function () {
            var payGroupsURL = payrollUrlConfig.payrollApi + payrollUrlConfig.payrollBaseUrl + '/' + gso.getAppConfig().companyId + payrollUrlConfig.resources.payGroups;
            gso.getCrudService().execute(constants.get, payGroupsURL, null,
                function (response) {
                    if(response.length > 0){
                        response.filter(function (el,index) {
                             el.className = index === 0 ? 'active' : '';
                             return el;
                        });
                        $scope.payGroups = response;
                        var payGroup = $scope.payGroups[0];
                        generatePayrollScheduleHelpInfo(payGroup);
                        getPayrollData(payGroup);
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.initPayrollScheduleInfo = function(index,payGroup){
            if(payGroup.className !== 'active'){
                $scope.payGroups.filter(function (el,innerindex) {
                    el.className = innerindex === index ? 'active' : '';
                    return el;
                });

                generatePayrollScheduleHelpInfo(payGroup);
                getPayrollData(payGroup);
                $scope.nextPayDate = "";
            }


        };
        function getPayrollData(payrollGroup) {
            var currentDate = new Date(),
                startDate = currentDate.getFullYear() + '-' + '01' + '-' + '01',
                endDate = (currentDate.getFullYear() + 1 ) + '-' + '12' + '-' + '31';

            $scope.payGroupId = payrollGroup.payGroupId;
            var payrollScheduleURL = payrollUrlConfig.payrollApi + payrollUrlConfig.payrollBaseUrl + '/' + gso.getAppConfig().companyId + payrollUrlConfig.resources.payrollSchedules + '/' + $scope.payGroupId + '?startDate='+startDate + '&endDate='+endDate;
            gso.getCrudService().execute(constants.get, payrollScheduleURL, null,
                function (response) {
                    $scope.loadPayrollData(response);

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        }

        function currentMonthIndex(payrolMonthData, searchTerm, property) {
            for (var i = 0, len = payrolMonthData.length; i < len; i++) {
                if (payrolMonthData[i][property] === searchTerm) {
                    return i;
                }
            }
            return -1;
        }
        $scope.onMonthCoverflowSelect = function (index) {
            // If nextPayday hasn't been set, is initial load: This also means that the coverflow legend hasn't yet been configured
            setHeaderAndFooter(index, $scope.payrollMonthData[index]);
        };

        $scope.count = 0;
        $scope.payDateSorting = function (payrollData) {
            payrollMonthData = [];
            $scope.count++;
            var reminder = $scope.count % 2;
            previousMonthYr = reminder == 1 ? 0 : beginDate.getFullYear() + '' + beginDate.getMonth();

            angular.forEach(payrollData,function (payrollSchedule, i) {
                lastRecord = i === payrollData.length - 1;
                beginDate = new Date(payrollSchedule.payPeriodEndDate);
                // set values to detect yr/month for current record
                currentMonthYr = beginDate.getFullYear() + '' + beginDate.getMonth();
                // write record on month break or last record if it wasn't a break
                $scope.isMonthChange(payrollSchedule);
                // set break value
                previousMonthYr = beginDate.getFullYear() + '' + beginDate.getMonth();
            });
            $scope.payrollMonthData = payrollMonthData;

        };
        $scope.isMonthChange = function (payrollSchedule) {
            if (currentMonthYr !== previousMonthYr) {
                // add first prev payrollRecord, which will be the needed month or add previous record to array of recs to add to store
                if (previousMonthYr === 0) {
                    prevPayrollSchedule = payrollSchedule;
                }
                else {
                    payrollMonthData.push(payrollMonth);
                }
                payrollMonth = {
                    firstDateOfMonth: beginDate.moveToFirstDayOfMonth().toString(constants.dateFormatUS),
                    payFrequencyName: prevPayrollSchedule.payFrequencyName,
                    datesOfInterest: []
                };
            }
            payrollMonth = processDatesOfInterest(payrollMonth, payrollSchedule);
            prevPayrollSchedule = payrollSchedule;
            if (lastRecord) {
                payrollMonthData.push(payrollMonth);
            }
        };

        function processDatesOfInterest(payrollMonth, payrollSchedule) {
            var currentMonthArray = payrollMonth.firstDateOfMonth.split('/'),
                currentMonth = currentMonthArray[0],
                currentYear = currentMonthArray[2];

            // process all fields in the payrollSchedule record
            // for applicable fields and values, create many Date of Interest records for one PayrollMonth

            var data = $scope.payrollData;

            angular
                .forEach(
                    data, function (pay) {
                        payrollSchedule = pay;
                        angular
                            .forEach(
                                payrollSchedule,
                                function (value, key) {
                                    var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
                                    // there may be non-date items
                                    var match;
                                    if (typeof value === "string" && (match = value.match(regexIso8601))) {
                                        addDateIfInSameMonth(key, currentMonth, currentYear, gso.getUtilService().filterDate(value, constants.dateFormatUS), payrollMonth);
                                    }
                                    // handle benefitsDeducted date creation
                                    else if (value === "Y") {
                                        // need to pass in last day of month since this field is a boolean
                                        var date = gso.getUtilService().filterDate(payrollSchedule.payPeriodBeginDate, constants.dateFormatUS);
                                        var curArray = date.toString().split('/');
                                        if (curArray[0] === currentMonth && curArray[2] === currentYear) {
                                            addDateIfInSameMonth(key, currentMonth, currentYear, gso.getUtilService().filterDate(payrollSchedule.payPeriodEndDate, constants.dateFormatUS), payrollMonth);
                                        }

                                    }
                                });
                    });
            return payrollMonth;
        }

        function addDateIfInSameMonth(key, currentMonth, currentYear, date, payrollMonth) {
            var datesOfInterest = payrollMonth.datesOfInterest;
            // search store for potentially duplicate record
            var foundIndex = findBy(datesOfInterest, key, 'dateType', date);
            // avoid adding duplicate records
            if (foundIndex !== -1) {
                return;
            }
            var curArray = date.toString().split('/');
            if (curArray[0] === currentMonth && curArray[2] === currentYear) {
                datesOfInterest.push({
                    dateOfInterest: date,
                    dateType: key
                });
            }
        }

        function findBy(myArray, searchTerm, property, date) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i].dateOfInterest === date && myArray[i].dateType === searchTerm) {
                    return true;
                }
            }
            return -1;
        }

        $scope.change = function (index) {
            var calendars = $scope.payrollMonthData,
                coll = calendars,
                center = index,
                itemr = 0,
                afterzero = 0,
                itemsl = 0,
                className = '';
            if (calendars.length > 0) {
                // For list two or less than
                if (calendars.length <= 2) {
                    coll[center]['class'] = 'holder_bu_center' + ' holder_bu';
                    for (var i = 0; i < calendars.length; i++) {
                        if (i !== center) {
                            coll[i]['class'] = 'holder_bu_awayL1 holder_bu';
                        }
                    }
                    return;
                }
                // Hide all item
                angular.forEach(coll, function (item) {
                    item['class'] = 'hide';
                });
                // left array
                for (var j = center - 1; j >= 0; j--) {
                    itemsl++;
                    if (itemsl <= coll.length) {
                        if (itemsl > 4) {
                            className = 'hide';
                        } else {
                            className = '';
                        }
                        if (j >= 0) {
                            coll[j]['class'] = 'holder_bu_awayL' + itemsl + ' holder_bu ' + className;
                        }
                        else {
                            coll[coll.length + j]['class'] = 'holder_bu_awayL' + itemsl + ' holder_bu ' + className;
                        }
                    } else {
                        break;
                    }
                }
                // right
                for (var k = center + 1; k <= coll.length; k++) {
                    itemr++;
                    if (itemr < coll.length - center) {
                        if (itemr > 4) {
                            className = 'hide';
                        } else {
                            className = '';
                        }

                        if (k <= coll.length - 1) {
                            coll[k]['class'] = 'holder_bu_awayR' + itemr + ' holder_bu ' + className;
                        }
                        else {
                            coll[afterzero]['class'] = 'holder_bu_awayR' + itemr + ' holder_bu ' + className;
                            afterzero++;
                        }
                    } else {
                        break;
                    }
                }
                coll[center]['class'] = 'holder_bu_center' + ' holder_bu';

                $scope.payrollMonthData = coll;
            }
        };
        function getName(dateOfInterest, isFromFooter) {
            var name = '';
            if (dateOfInterest.dateType === 'paycheckIssueDate') {
                name = isFromFooter ? 'payDateIndication' : 'payDateCalendar';
            }
            else if (isPayrollAdmin && dateOfInterest.dateType === 'reportDate') {
                name = isFromFooter ? 'dueDateIndication' : 'dueDateCalendar radiusCircle';
            }
            else if (dateOfInterest.dateType === 'payPeriodEndDate') {
                name = isFromFooter ? 'payPeriodEndDateIndication' : 'payPeriodEndDateCalendar';
            }
            else if (dateOfInterest.dateType === 'benefitDeducted') {
                name = isFromFooter ? 'noBenefitDeductionsIndication' : 'noBenefitDeductionsCalendar';
            }
            else if (dateOfInterest.dateType === 'payrollPreparationDate') {
                name = isFromFooter ? 'payrollPreparationDateFooter' : 'payrollPreparationDate';
            }
            return name;
        }

        function checkPayDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {
                if (temp[0].dateOfInterest === temp[1].dateOfInterest && ( (temp[0].dateType === 'paycheckIssueDate' || temp[1].dateType === 'paycheckIssueDate') && (temp[0].dateType === 'payPeriodEndDate' || temp[1].dateType === 'payPeriodEndDate') )) {
                    isTrue = true;
                }
            }
            return isTrue;
        }

        function checkEndDateAndDeductionDate(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = true;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {
                if(temp[0].dateOfInterest === temp[1].dateOfInterest && ((temp[0].dateType === 'benefitDeducted' || temp[1].dateType === 'benefitDeducted' || temp[0].dateType === 'processDate' || temp[1].dateType === 'processDate') && (temp[0].dateType === 'payPeriodEndDate' || temp[1].dateType === 'payPeriodEndDate'))){
                    var isTrue = false;
                }
            }
            return isTrue;
        }

        function checkSubmitDateAndDueDate(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {
                if (temp[0].dateOfInterest === temp[1].dateOfInterest && ( (temp[0].dateType === 'payrollPreparationDate' || temp[1].dateType === 'payrollPreparationDate') && (temp[0].dateType === 'reportDate' || temp[1].dateType === 'reportDate') )) {
                    isTrue = true;
                }
            }
            return isTrue;
        }
        function checkDueDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay && (datesOfInterest.dateType === "reportDate" || datesOfInterest.dateType === "payPeriodEndDate")) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {
                if (checkType(temp, 'reportDate') && checkType(temp, 'payPeriodEndDate')) {
                    isTrue = true;
                }
            }
            return isTrue;
        }

        function checkType(temp, type) {
            var isTrue = false;
            angular.forEach(temp, function (obj) {
                if (obj.dateType === type) {
                    isTrue = true;
                }
            });
            return isTrue;
        }

        function checkDueDatePeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 3) {              
                if (checkType(temp, 'payPeriodEndDate') && checkType(temp, 'reportDate') && checkType(temp, 'benefitDeducted')) {
                    isTrue = true;
                }
            }
            return isTrue;
        }

        function checkPayDatePayPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay && (datesOfInterest.dateType === "payPeriodEndDate" || datesOfInterest.dateType === "benefitDeducted" || datesOfInterest.dateType === "paycheckIssueDate")) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 3) {              
                if (checkType(temp, 'payPeriodEndDate') && checkType(temp, 'paycheckIssueDate') && checkType(temp, 'benefitDeducted')) {
                    isTrue = true;
                }
            }
            return isTrue;
        }

        function checkPayPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay && (datesOfInterest.dateType === "payPeriodEndDate" || datesOfInterest.dateType === "benefitDeducted")) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {    
                if (checkType(temp, 'payPeriodEndDate') && checkType(temp, 'benefitDeducted')) {
                    isTrue = true;
                }
            }
            return isTrue;
        }

        function checkPreperationDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray) {
            var temp = [];
            var isTrue = false;
            angular.forEach(datesOfInterestArray, function (datesOfInterest) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterest.dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay && (datesOfInterest.dateType === "payPeriodEndDate" || datesOfInterest.dateType === "payrollPreparationDate")) {
                    temp.push(datesOfInterest);
                }
            });


            if (temp.length === 2) {    
                if (checkType(temp, 'payPeriodEndDate') && checkType(temp, 'payrollPreparationDate')) {
                    isTrue = true;
                }
            }
            return isTrue;
        }


        function getColorClassName(date, datesOfInterestArray, isFromFooter) {
            var dayToCheck = gso.getUtilService().filterDate(date, constants.dateFormatUS);
            var className = '';
            for (var i = 0; i < datesOfInterestArray.length; i++) {
                var currentDay = gso.getUtilService().filterDate(datesOfInterestArray[i].dateOfInterest, constants.dateFormatUS);
                if (dayToCheck === currentDay) {
                    if (isPayrollAdmin && checkDueDatePeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray)) {
                        className = isFromFooter ? 'payEndDatePayrollDueDateAndNoBenefitDeductionsIndication' : 'payEndDatePayrollDueDateAndNoBenefitDeductionsCalendar';
                    }else if (isPayrollAdmin && checkPayDatePayPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray)) {
                        className = isFromFooter ? 'payDatePayPeriodEndDateAndNoBenefitDeductionsIndication' : 'payDatePayPeriodEndDateAndNoBenefitDeductionsCalendar';
                    }else if (isPayrollAdmin && checkPayPeriodEndDateAndBenefitsDeducted(dayToCheck, datesOfInterestArray)) {
                        className = isFromFooter ? 'payEndDateAndNoBenefitDeductionsIndication' : 'payEndDateAndNoBenefitDeductionsCalendar';
                    }else if (isPayrollAdmin && checkPreperationDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray)) {
                        className = isFromFooter ? 'payrollPreparationDateAndPayPeriodEndDateFooter' : 'payrollPreparationDateAndPayPeriodEndDate';
                    } else if (!checkPayDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray)){
                        if (!checkDueDateAndPayPeriodEndDate(dayToCheck, datesOfInterestArray)) {
                          if (datesOfInterestArray[i].dateType !== 'payPeriodBeginDate' ) {
                              if (!checkSubmitDateAndDueDate(dayToCheck, datesOfInterestArray)) {
                                  if(className === ''){
                                    className = getName(datesOfInterestArray[i], isFromFooter);
                                  }
                                  if (!checkEndDateAndDeductionDate(dayToCheck, datesOfInterestArray)) {
                                      className = isFromFooter ? 'payPeriodEndDateIndication' : 'payPeriodEndDateCalendar';
                                  }
                              } else {
                                  className = isFromFooter ? 'submitDate-dueDate-indication' : 'submitDateAndDueDateCalender';
                              }
                          }
                        } else {
                            if(isPayrollAdmin){
                              className = isFromFooter ? 'dueDate-periodEndDate-indication' : 'dueDateAndPayperiodEndDateCalendar';
                            }else{
                              className = isFromFooter ? 'payPeriodEndDateIndication' : 'payPeriodEndDateCalendar';
                            }
                        }
                    } else{
                      className = isFromFooter ? 'payDate-periodEndDate-indication' : 'payDateAndPayPeriodEndDateCalendar';
                    }


                }
            }
            return className;
        }

        $scope.getDayClass = function ($index, date, data, mode) {
            if (mode === 'day') {
                $scope.periodEndDate = new Date(data.firstDateOfMonth).moveToLastDayOfMonth().toString(constants.dateFormatUS);
                return getColorClassName(date, data.datesOfInterest, false);
            }
        };

        function getDaysInMonth(month, year) {
            // Since no month has fewer than 28 days
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        }

        function checkTwoDatesSameMonthAndYear(interestDate, todayDate) {
            var isTrue;
            if (interestDate.getMonth() === todayDate.getMonth() && interestDate.getFullYear() === todayDate.getFullYear()) {
                isTrue =  true;
            } else {
                isTrue = false;
            }
            return isTrue;
        }

        function setHeader(datesOfInterests) {
            var today = new Date(),
                isFirstTime = true;

            angular.forEach(datesOfInterests, function (datesOfInterest) {
                if (datesOfInterest.dateType === "paycheckIssueDate") {
                    var interestDate = new Date(datesOfInterest.dateOfInterest);

                    if (checkTwoDatesSameMonthAndYear(interestDate, today)) {
                        if (interestDate > today && isFirstTime) {
                            $scope.payDate = datesOfInterest.dateOfInterest;
                            if($scope.nextPayDate.length === 0 && $scope.payDate.length !== 0){
                                $scope.nextPayDate = $scope.payDate;
                            }
                            isFirstTime = false;
                        }
                    } else {
                        if (isFirstTime) {
                            $scope.payDate = datesOfInterest.dateOfInterest;
                            if($scope.nextPayDate.length === 0 && $scope.payDate.length !== 0){
                                $scope.nextPayDate = $scope.payDate;
                            }
                            isFirstTime = false;
                        }
                    }
                }
            });
        }

        function getFooterName(name) {
            if (name === 'dueDateIndication') {
                return 'Payroll Due Date';
            } else if (name === 'payDateIndication') {
                return 'Pay Date';
            } else if (name === 'payPeriodEndDateIndication') {
                return 'Pay Period End Date';
            } else if (name === 'payDate-periodEndDate-indication') {
                return 'Pay Date and Pay Period End Date';
            } else if (name === 'dueDate-periodEndDate-indication') {
                return 'Payroll Due Date and Pay Period End Date';
            } else if (name === 'noBenefitDeductionsIndication') {
                return 'Pay Period End Date - No Benefit Deductions';
            } else if (name === 'payrollPreparationDateFooter') {
                return 'Payroll Changes Due';
            }else if(name === 'submitDate-dueDate-indication'){
                return 'Payroll Changes Due and Payroll Due Date';
            }else if (name === 'payEndDatePayrollDueDateAndNoBenefitDeductionsIndication') {
                return 'Payroll Due Date, Pay Period End Date and No Benefit Deductions';
            }else if (name === 'payEndDateAndNoBenefitDeductionsIndication') {
                return 'Pay Period End Date and No Benefit Deductions';
            }else if (name === 'payDatePayPeriodEndDateAndNoBenefitDeductionsIndication') {
                return 'Pay Date, Pay Period End Date and No Benefit Deductions';
            }else if (name === 'payrollPreparationDateAndPayPeriodEndDateFooter') {
                return 'Payroll Changes Due and Pay Period End Date';
            }
        }

        function uniqueArray(collection) {
            var output = [],
                keys = [];

            angular.forEach(collection, function (item) {
                var key = item;
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        }

        function setFooter(payrollMonthData, selectedMonth) {
            var date = new Date(selectedMonth),
                datesInMonth = getDaysInMonth(date.getMonth(), date.getFullYear()),
                footer = [];
            angular.forEach(datesInMonth, function (currDate) {
                var className = getColorClassName(currDate, payrollMonthData.datesOfInterest, true);
                if (className) {
                    footer.push(className);
                }

            });
            footer = uniqueArray(footer);
            var footerNames = [];
            if (footer.length > 0) {
                angular.forEach(footer, function (name) {
                    var obj = {
                        color: name,
                        value: getFooterName(name)
                    };
                    footerNames.push(obj);
                });
            }
            $scope.footerData = footerNames;
        }

        function setHeaderAndFooter(index, payrollMonthData) {
            $scope.payDate = '';
            var selectedMonth = payrollMonthData.firstDateOfMonth;
            var datesOfInterest = payrollMonthData.datesOfInterest;
            datesOfInterest.sort(function (a, b) {
                return new Date(a.dateOfInterest) - new Date(b.dateOfInterest);
            });
            setHeader(datesOfInterest);
            if ($scope.payDate.length === 0) {
                var nextMonthData = $scope.payrollMonthData[index + 1];
                var nextMonthDataDatesOfInterest = nextMonthData.datesOfInterest;
                nextMonthDataDatesOfInterest.sort(function (a, b) {
                    return new Date(a.dateOfInterest) - new Date(b.dateOfInterest);
                });

                setHeader(nextMonthDataDatesOfInterest);
            }
            setFooter(payrollMonthData, selectedMonth);
        }

        $scope.printPDF = function(){
            var startDate = new Date().moveToFirstDayOfMonth().toString(constants.dateFormat),
                yearDate = new Date();
                yearDate.setMonth(yearDate.getMonth() + 11);

             var endDate  = yearDate.moveToLastDayOfMonth().toString(constants.dateFormat);

            var payrollSchedulePrintPDFURL = payrollUrlConfig.payrollApi + payrollUrlConfig.moneyBaseUrl +
                payrollUrlConfig.resources.companyPayroll + "/" + gso.getAppConfig().companyId + "/" +
                $scope.payGroupId + payrollUrlConfig.resources.payrollDetailsPdf+'?startDate='+startDate+'&endDate='+endDate;

            window.open(payrollSchedulePrintPDFURL);
        };
        $scope.payrollInit();
    }]);
