'use strict';
var cnt = 0;
var widget_cnt = 0;

trinetApp.controller('dashboardCtrl', ['$rootScope', '$scope', 'gso', 'widgetService', 'timeOffService', 'urlBuilder', 'onboardingService','$http','$window','$location','SharedDataService',
    function ($rootScope, $scope, gso, widgetService, timeOffService, urlBuilder, onboardingService,$http,$window,$location,SharedDataService) {

        // widgets have dependency on 'navigationsSide'
        $scope.currentYear=new Date().getFullYear();
        $scope.showOpenEnrollmentStatus = false;
        $scope.showNoticesReults = false;
        $scope.prorityType = {
            "0": "High",
            "1": "Medium",
            "2": "Low"
        };

        var navigationSideLocalStorage = SharedDataService.getAppSharedData().navigationsSide;
        var token= gso.getUtilService().getCookie();
        var companyId = gso.getAppConfig().companyId;
        var weekday = new Array(7);

        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };

        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        function GetDateDiff(a, b) {
            var MS_PER_DAY = 1000 * 60 * 60 * 24;
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            this.diffDays = Math.floor((utc2 - utc1) / MS_PER_DAY);
        }

        if (navigationSideLocalStorage !== undefined) {
            loadWidgets();
         }
         else {
          $scope.$parent.$on('menuLoaded', function (event, data) {
             if (data === true) {
                loadWidgets();
             }
         });
        }

        function loadWidgets() {
            $scope.today = new Date();
            var todaysDate = new Date.now();
            $scope.todaysDate = todaysDate.getMonthName().substring(0, 3) + " " + todaysDate.getDate() + ", " + todaysDate.getFullYear();
            $scope.myVar = false;

            /* Menu Id's
                Dashboard - 1
                Next Pay Day - 11
                Holiday - 12
                Time off - 13
            */

            $scope.showPayroll = gso.getUtilService().checkIfWidgetExists(1, 11);
            $scope.showHoliday = gso.getUtilService().checkIfWidgetExists(1, 12);
            $scope.showTimeOff = gso.getUtilService().checkIfWidgetExists(1, 13);
            $scope.showWorkInbox = gso.getUtilService().checkIfWidgetExists(1, 14);
            $scope.showAlerts = gso.getUtilService().checkIfWidgetExists(1, 136);
            $scope.showOpenEnrollmentStatus = gso.getUtilService().checkIfWidgetExists(7, 143);
            $scope.showIndependentContractor = gso.getUtilService().checkIfWidgetExists(7, 144);
            $scope.showBestPractices = gso.getUtilService().checkIfWidgetExists(1, 150);

            if ($scope.showOpenEnrollmentStatus) {
                gso.getCrudService().execute(constants.get,
                    benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/oe-stats',
                    null,
                    function (response) {
                        $scope.openEnrollmentStatusItems = response;
                        $scope.eligibleCount = response.eligibleCount;
                        $scope.submissionsCount = response.submissionsCount;
                        $scope.loggedInCount = response.loggedInCount;
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            }

           // service call for important notices
            gso.getCrudService().execute(constants.get,'/api-employee/v1/manage-employee/'+gso.getAppConfig().companyId + '/'+ gso.getAppConfig().userId+'/notices' ,
                null,
                function (response) {
                    $scope.notices = response;
                    if (response) {
                        var keys = Object.keys(response);
                        var arr = [];
                        keys.map(function (keyName, index) {
                            if (keyName === 'current' ) {
                                arr = arr.concat(response[keyName]);
                            }
                        });
                        $scope.noticesLength = arr.length;
                        $scope.currentNotices = arr.slice(0, 3);
                        $scope.setFullnotices = arr;
                        $scope.currentNoticesLength = $scope.currentNotices.slice(0, 3).length;
                        showMore();
                    }
                    $scope.showNoticesReults = true;
                },
                function (error) {
                    $scope.errorAlert = error;
                    $scope.currentNotices = [];
                    $scope.notices = [];
                    $scope.noticesLength = 0;
                    $scope.currentNoticesLength = 0;
                    $scope.showNoticesReults = true;
                }
            );
            // service call for biAlerts notices
            $scope.getAlerts = function () {
                $scope.alerts = [];
                $scope.titleMaping = {
                    urgentActionsCount: {
                        color: "red-box",
                        title: "Critical/Time Sensitive"
                    },
                    upcommingActionsCount: {
                        color: "yellow-box",
                        title: "Coming Up in < 5 days"
                    },
                    recentActivityCount: {
                        color: "green-box",
                        title: "Coming Up in < 50 days"
                    },
                    employeeInformationCount: {
                        color: "blue-box",
                        title: "Info Only"
                    }
                };
                gso.getCrudService().execute(constants.get, '/api-company/v1/alerts/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/bi-alerts',
                    null,
                    function (results) {
                        for (var prop in results) {
                            if (results[prop] && results[prop] > 0) {
                                $scope.alerts.push({
                                    count: results[prop],
                                    color: $scope.titleMaping[prop].color,
                                    title: $scope.titleMaping[prop].title
                                });
                            }
                        }
                    },
                    function (data) {
                        $scope.alerts = [];
                    }
                );
            };
            //service call for bi-alerts
            if($scope.showAlerts) {
               $scope.getAlerts();
            }

            $scope.hasTimeOff = $scope.showTimeOff;
            var companyId = gso.getAppConfig().companyId;
            $scope.visible = false;
            /*$scope.showDiv = function (index) {
             $scope.visible = !$scope.visible;
             var impid = $scope.importantNoticeData[index].title;
             angular.forEach($scope.pdfUrl, function (values) {
             if (impid === values.id) {
             $scope.firstdata = $scope.importantNoticeData[index].text.replace("%1", constants.docLocContext + values.url);
             }
             });

             };*/
            gso.getCrudService().execute(constants.get, "assets/data/dashboard/sectionsCount_data.json", null,
                function (response) {
                    $scope.sectionsCountDetails = response;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            /* $scope.dialogModel = {
             message: 'message from passed scope'
             };*/

            $scope.getPriority = function(key,item){
                var setPriotity = (key === item.priority.toString()) ?  true : false;
                return setPriotity;
            };
            function showMore(){
                $scope.setFullnotices.map(function (notices) {
                    if (notices.title.length > 65) {
                        notices.isShowMore = true;
                        //notices.title = notices.title.slice(0 , 65) + "... ";
                    }
                });
            };
            $scope.more = function(notices, index){
                /*notices.title = ctrl.currentNotices[index].title;*/
                $scope.data = notices;
                gso.getNGDialog().open({
                    templateUrl: 'app/shared/views/viewNoticesModal.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            };


            // service call for event base notices
            gso.getCrudService().execute(constants.get,'/api-employee/v1/manage-employee/'+gso.getAppConfig().companyId + '/'+ gso.getAppConfig().userId+'/event-based-notices' ,
                null,
                function (response) {
                    response.map(function (item) {
                        switch(item.noticeId) {
                            case "CBR_01":
                                break;
                            case "ALE_02":
                                break;
                            case "BNH_01":
                                break;
                            case "BNH_02":
                                break;
                            case "BNH_03":
                                break;
                            case "BNH_10":
                                break;
                            case "BNH_11":
                                break;
                            default:
                                item.redirectUrl = SharedDataService.getAppSharedData().hrpUrl + item.redirectUrl;
                        }
                        $scope.showDate = ((item.noticeId === "ALE_01")||(item.noticeId === "ALE_02")) ? false : true;
                        item.isAle =  (item.noticeId === "ALE_01") ? true : false;
                    });
                    $scope.noticeEventData= response;
                },
                function (error) {

                }
            );
            $scope.setselectedValues = function (panel_id, $index, selected_obj, widget) {
                if (!$scope.panel_ids) {
                    $scope.panel_ids = panel_id;
                    $scope.widget_names = widget;
                }
                else {
                    $scope.panel_ids = $scope.panel_ids + "," + panel_id;
                    $scope.widget_names = $scope.widget_names + "," + widget;
                }
            };
            $scope.getBodyParseValueForModal = function(value){
                return  value.replace(/(?:\r\n|\r|\n)/g, '<br />');
            };
            $scope.getBodyParseValue = function(value){
                var textFormat = value.slice(0 , 60);
                if(textFormat.match(/\n/g)){
                    textFormat = textFormat.split("\n", 3).join("\n");
                }
                return  textFormat.replace(/(?:\r\n|\r|\n)/g, '<br />');
            };
            $scope.addWidget = function () {
                if (!$scope.panel_ids || $scope.panel_ids === "") {
                    return false;
                }
                var str = $scope.panel_ids.split(",");
                var str1 = $scope.widget_names.split(",");
                for (var i = 0; i < str.length; i++) {
                    var el = angular.element('#sec_' + cnt);
                    $scope.header = str[i];
                    $scope.panel_content = "widget " + i;
                    var template = "<" + str1[i] + "-widget></" + str1[i] + "-widget>";
                    el.html(template).show();
                    gso.getCompile()(el.contents())($scope);
                    cnt++;
                    widget_cnt++;
                }
                if (str.length <= 6) {
                    $scope.myVar = true;

                    var ele = angular.element('#test_sec_' + widget_cnt);
                    ele.removeClass('ng-hide');
                    ele.show();
                    $scope.totalItems = 12;

                }
                gso.getNGDialog().closeAll();

            };

            /***********************************************************
             * Made changes for pagination and Drag and drop[Begin]
             */
            gso.getCrudService().execute(constants.get, "assets/data/dashboard/dashboard_data.json", null,
                function (response) {
                    $scope.sectionsDetails = response;
                    var length = $scope.sectionsDetails.length;
                    var sec_cnt = 0;
                    for (var j = 0; j < length; j++) {
                        var widget_name = $scope.sectionsDetails[j].directive;
                        var template = "<" + widget_name + "-widget></" + widget_name + "-widget>";
                        var el = angular.element('#sec_' + sec_cnt);
                        el.html(template).show();
                        var compiled = gso.getCompile()(template)($scope);
                        el.append(compiled);
                        sec_cnt++;
                        widget_cnt++;
                    }

                    $scope.totalItems = 13;
                    $scope.pageSize = 6;

                    $scope.currentPage = 0;

                    $scope.setPage = function (pageNo) {
                        $scope.currentPage = pageNo;
                    };

                    $scope.pageChanged = function () {
                    };
                    $scope.nextPage = function () {
                    };

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            $scope.sortablePanel = {
                containment: "parent",
                cursor: "move"
            };
            /***********************************************************
             * Made changes for pagination and drag and drop [End]
             */


            /* Changes for Next Pay Widget*/
            $scope.hasNextPayDay = false;
            //if ($scope.showPayroll) {
            gso.getCrudService().execute(constants.get, moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.payroll +
                "/" + companyId + '/' + gso.getAppConfig().userId + moneyUrlConfig.resources.payrollDates +
                '?payDay=previous,next', null,
                function (response) {
                    if (response.next !== null && response.next !== undefined) {
                        $scope.nextCheckDt = new Date(response.next.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
                        //var dayDue = Math.round(($scope.nextCheckDt - new Date()) / (1000 * 60 * 60 * 24));
                        var dayDueObject = new GetDateDiff(new Date(), $scope.nextCheckDt);
                        var dayDue = dayDueObject.diffDays;
                        var nextPayDayOrDays = dayDue > 1 ? "days" : "day";
                        $scope.previousCheckDt = new Date(response.previous.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
                        //var howManyDayAgo = Math.round((new Date() - $scope.previousCheckDt) / (1000 * 60 * 60 * 24));
                        var howManyDayAgoObject = new GetDateDiff($scope.previousCheckDt, new Date());
                        var lastPayDayOrDays = howManyDayAgoObject.diffDays > 1 ? "days" : "day";
                        $scope.nextCheckDtDay = weekday[$scope.nextCheckDt.getDay()];
                        $scope.inHowManyDays = "In " + dayDue + " " + nextPayDayOrDays;
                        $scope.lastPayDayText = howManyDayAgoObject.diffDays + " " + lastPayDayOrDays + " ago";
                        SharedDataService.getAppSharedData().nextPayDate= response.next;
                        $scope.hasNextPayDay = true;
                    }
                    else {
                        SharedDataService.getAppSharedData().nextPayDate=null;
                        $scope.nextCheckDt = "";
                        $scope.dayDue = "";
                        $scope.nextPayDayOrDays = "";
                        $scope.previousCheckDt = "";
                        $scope.nextCheckDtDay = "";
                        $scope.inHowManyDays = "Not available";
                        $scope.lastPayDayText = "Not available";
                        $scope.hasNextPayDay = false;
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
            //}


            /* Changes for Holiday Widget*/
            $scope.hasHolidayWidget = false;

            function checkHolidayHours(obj) {
                return obj.hours !== 0;
            }

              $scope.loadHolidayWidget=function(holidaySchedule) {
                if (holidaySchedule !== "" && holidaySchedule !== undefined) {
                    gso.getCrudService().execute(constants.get, globalUrlConfig.globalBase + '/company/' + companyId + '/holidays/' + gso.getAppConfig().holidaySchedule, null,
                        function (response) {
                            if (response.companyHolidayDetails !== null && response.companyHolidayDetails !== undefined) {
                                $scope.companyHolidayDetails = response.companyHolidayDetails.filter(checkHolidayHours);

                                var today = new Date();
                                var holidayDate;
                                var holidayName;
                                var displayHolidayDate = new Date();
                                var displayHolidayName = "";

                                var nextDateReached = false;
                                var allDates = [];
                                var futureDates= [];
                                var nextHolidayDt;

                                var pluck = function(arr, type) {
                                  var plucked = [];
                                  arr.forEach(function(element) {
                                    plucked.push(element[type]);
                                  });

                                  return plucked;
                                };

                                angular.forEach($scope.companyHolidayDetails, function (item) {
                                    holidayDate = new Date(item.date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
                                    holidayName = item.desc;
                                    allDates.push({'holidayDate': holidayDate, 'holidayName': holidayName});

                                });
                                futureDates = allDates.filter(function(input){ return input.holidayDate > today;});
                                var nextHolDate = new Date(Math.min.apply(null,pluck(futureDates, 'holidayDate')));

                                futureDates.forEach(function(element) {
                                  if(element.holidayDate.equals(nextHolDate)){
                                    nextHolidayDt = element;
                                  }
                                });
                                //var nextHolidayDt = new Date(Math.min.apply(null,pluck(futureDates, 'holidayDate')));
                                displayHolidayDate = nextHolidayDt.holidayDate;
                                displayHolidayName = nextHolidayDt.holidayName;

                                $scope.nextHolidayDt = displayHolidayDate;
                                //var dayHoliday = Math.round(($scope.nextHolidayDt - new Date()) / (1000 * 60 * 60 * 24));
                                var dayHolidayObject = new GetDateDiff(new Date(), $scope.nextHolidayDt);
                                var nextHolidayDayOrDays = dayHolidayObject.diffDays > 1 ? "days" : "day";
                                $scope.nextHolidayDtDay = weekday[$scope.nextHolidayDt.getDay()];
                                $scope.holidayInHowManyDays = "In " + dayHolidayObject.diffDays + " " + nextHolidayDayOrDays;
                                $scope.holidayName = displayHolidayName;
                                $scope.hasHolidayWidget = true;
                            }
                            else {
                                $scope.nextHolidayDt = "01/01/2017";
                                $scope.nextHolidayDtDay = "Sunday";
                                $scope.holidayInHowManyDays = "In 0 days";
                                $scope.holidayName = "Not available";
                            }
                        },
                        function (data) {
                            $scope.errorAlert = data;
                            if (data._statusCode === "404") {
                                $scope.hasHolidayWidget = false;
                            }
                        }
                    );
                }
            };

            if ($scope.showHoliday) {
                checkActiveAndLoadHolidays();
            }

            /* Changes for Onboarding Widget */
            $scope.hasOnboarding = false;
            $scope.unsubmitted = {
                currentPage: 1,
                dropdownIndex: '1',
                totalUnsubmitted: 0,
                unsubmittedIndex: -1,
                unsubmittedPages: [],
                unsubmittedRecords: [],
                unsubmittedRecordsPreview: []
            };
            // Checking for K1
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.manageCompany + "/" + companyId + "/org-details?viewType=all", null,
                function(response){
                    try{
                        $rootScope.$broadcast("onboardingK1", response['k1Flag']);
                    }
                    catch(error){

                    }
                }
            );

            // Checking for HRAuth or HREntry
            gso.getCrudService().execute(constants.get, manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee +
                '/' + companyId + '/' + gso.getAppConfig().userId + manageEmpUrlConfig.resources.employeeRoles, null,
                function (response) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].role !== null){
                            switch(response[i].role){
                                case "HRAUTH":
                                case "HRAUTH_R":
                                case "HRENTRY":
                                    $scope.onboardingCompanyId = gso.getAppConfig().companyId;
                                    $scope.hasOnboarding = true;
                                    $rootScope.$broadcast("onboardingRole", response[i].role);
                                    break;
                            }
                        }
                    }
                }
            );

            // Getting the number of people getting onboarding
            gso.getCrudService().execute(constants.get, onboardingUrlConfig.onboardingBaseUrl +
                onboardingUrlConfig.resources.dashboard + '/' + companyId + onboardingUrlConfig.resources.hiresNew + '?page=0&pageSize=10', null,
                function (response) {
                    // Success message from onboarding api call
                    $scope.newHireText = "New Hires";
                    $scope.unsubmitted.totalUnsubmitted = parseInt(response.totalSize,10);
                    for (var i = 1; i < $scope.unsubmitted.totalUnsubmitted / 10 + 1; i++) {
                        $scope.unsubmitted.unsubmittedPages.push(i);
                    }
                    if (response.entries !== null) {
                        $scope.unsubmitted.unsubmittedRecords = response.entries.slice(0, 10);
                        $scope.unsubmitted.unsubmittedRecordsPreview = $scope.unsubmitted.unsubmittedRecords.slice(0, 5);
                    }
                    $scope.inProgressText = "In Progress";
                },
                function (error) {
                    // Error message from  onboarding api call
                    $scope.newHireText = "New Hire";
                    $scope.inProgressText = "In Progress";
                }
            );

            $scope.goToOnboardingWithId = function(id){
                onboardingService.goToEmployeeOnboarding(companyId, id);
            };

            /*Changes for onboarding options */
            $scope.goToOptionView = function () {
                $rootScope.$broadcast("onboardingOptionView", "");
            };

            /*Changes for Unsubmitted View*/
            // Changes the pages viewed in unsubmitted view
            $scope.changePage = function () {
                var num = $scope.unsubmitted.currentPage - 1;
                gso.getCrudService().execute(constants.get, onboardingUrlConfig.onboardingBaseUrl +
                    onboardingUrlConfig.resources.dashboard + '/' + companyId + onboardingUrlConfig.resources.hiresNew + '?page=' + num.toString() + '&pageSize=10', null,
                    function (response) {
                        // Success message from onboarding api call
                        $scope.unsubmitted.totalUnsubmitted = parseInt(response.totalSize,10);
                        if (response.entries !== null) {
                            $scope.unsubmitted.unsubmittedRecords = response.entries.slice(0, 10);
                            $scope.unsubmitted.unsubmittedIndex = -1;
                            if ($scope.unsubmitted.currentPage !== parseInt($scope.unsubmitted.dropdownIndex,10)) {
                                $scope.unsubmitted.dropdownIndex = $scope.unsubmitted.currentPage.toString();
                            }
                            if (num === 0){
                                $scope.unsubmitted.unsubmittedRecordsPreview = $scope.unsubmitted.unsubmittedRecords.slice(0, 5);
                            }
                        }
                    }
                );
            };
            // Drop down changed and changing page as well
            $scope.dropdownChange = function () {
                $scope.unsubmitted.currentPage = parseInt($scope.unsubmitted.dropdownIndex,10);
                $scope.changePage();
            };

            // Closes the unsubmitted view
            $scope.closePanel = function () {
                gso.getNGDialog().closeAll();
            };
            // Goes to newhire onboarding with employee id
            $scope.goToEmployeeOnboarding = function () {
                if ($scope.unsubmitted.unsubmittedIndex >= 0) {
                    onboardingService.goToEmployeeOnboarding(companyId, $scope.unsubmitted.unsubmittedRecords[$scope.unsubmitted.unsubmittedIndex].key.key);
                }
            };

            $scope.removeEmployeeOnboarding = function () {
                if ($scope.unsubmitted.unsubmittedIndex >= 0) {
                    gso.getCrudService().execute(constants.put, onboardingUrlConfig.onboardingBaseUrl +
                        onboardingUrlConfig.resources.dashboard + '/' + companyId + '/hires/' + $scope.unsubmitted.unsubmittedRecords[$scope.unsubmitted.unsubmittedIndex].key.key + '/delete', null,
                        function (response) {
                            // Success message from onboarding delete api call
                            $scope.changePage();
                        }
                    );
                }
            };
            // Opens the unsubmitted view
            $scope.showUnsubmittedView = function () {
                gso.getNGDialog().open({
                    templateUrl: fileConfig.onboarding.viewUnsubmitted,
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });
            };

            // Toggles the selection in UnsubmittedView
            $scope.toggleUnsubmittedSelection = function (index) {
                if ($scope.unsubmitted.unsubmittedIndex !== index) {
                    $scope.unsubmitted.unsubmittedIndex = index;
                }
                else {
                    $scope.unsubmitted.unsubmittedIndex = -1;
                }
            };

            //time off
            $scope.showTimeOffChart = false;
            var vacatoionEarnCds = ['202', '472', '473', '506', 'CPA', 'CPR', 'CPT', 'CPV', 'CVP', 'LBV', 'LR8', 'VAC', 'VPA', 'VS', 'VSE', 'VST', '06', 'PTO'],//vacation
                sickLeaveEarnCds = ['07', '130', '507', '565', 'CBC', 'CPS', 'CSK', 'LR7', 'SC3', 'SCK', 'SFS', 'SSR', 'SST'],
                personalLeaveEarnCds = ['CPL', 'PER', 'PST'],
                rolloverLeaveEarnCds = ['EIB', 'LRP'],
                floatingHolEarndCds = ['526', '538', '547', '548', 'CHF', 'FHO', 'FHR', 'FST', 'FSU', 'HF', 'HFR', 'HL', 'HLF', 'LFH', 'PH', 'RFH', 'RHF', 'RSA', 'SAF'],
                //testEarnCds=['49A','BR'], //TODO Delete
                allAccruableEarnCds = [],
                accruableLeaves = [];

            //allAccruableEarnCds = allAccruableEarnCds.concat(testEarnCds); //TODO Delete
            allAccruableEarnCds = allAccruableEarnCds.concat(vacatoionEarnCds);
            allAccruableEarnCds = allAccruableEarnCds.concat(sickLeaveEarnCds);
            allAccruableEarnCds = allAccruableEarnCds.concat(personalLeaveEarnCds);
            allAccruableEarnCds = allAccruableEarnCds.concat(rolloverLeaveEarnCds);
            allAccruableEarnCds = allAccruableEarnCds.concat(floatingHolEarndCds);
            if ($scope.showTimeOff) {
                timeOffService.getTimeOffWidgetData(constants.get, "/trinetGateway/timeoff/services/v1.0/LeaveRequest/LeaveType",
                    //timeOffService.getTimeOffWidgetData(constants.get,"/trinetGateway/timeoff/services/v1.0/LeaveRequest/TimeOffList",
                    null,
                    function (response) {

                        //response not inline with standard services response
                        //need to change the service

                        //Also this functin should have been moved to servie //TODO
                        if (response.leaveTypes) {
                            $scope.leaveTypes = response.leaveTypes;
                            $scope.leaveTypesCombined = [];
                            for (var i = 0; i < $scope.leaveTypes.length; i++) {
                                var leave = $scope.leaveTypes[i];
                                if (leave && leave.accrued !== null) {
                                    if (leave.hrsLeft !== null) {
                                        accruableLeaves.push(leave);
                                    }
                                }
                            }

                            $scope.accruableLeaves = accruableLeaves;

                            var leaveCounter = 0;
                            for (var j = 0; j < Math.ceil(accruableLeaves.length / 2); j++) {
                                $scope.leaveTypesCombined.push({
                                    "first": accruableLeaves[leaveCounter++],
                                    "second": accruableLeaves[leaveCounter++]
                                });
                            }
                            $scope.showTimeOffChart = true;
                            $scope.tempAccruableLeave = accruableLeaves[0];
                            $scope.timeOffLoaded = true;
                        }
                    },
                    function () {
                        $scope.timeOffLoaded = false;
                        $scope.timeOffErrored = true;
                    });
            }
            //$scope.leaveTypes  = [{"leaveTypeDesc":"T/N Paid Time Off","leaveTypeCd":"APT","earnCd":"06","accrualDt":"2016-03-04","accrualFreq":"Hrs/Hour","accrued":211.13,"hrsLeft":59.13,"accrualCap":136.000,"taken":152.0,"planned":0.0,"projectedCapDays":208,"projectedCapDate":"2016-09-28","planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":162.77,"accrualRate":0.065,"allowNegativeBalance":true},{"leaveTypeDesc":"T/N Paid Administrative Leave","leaveTypeCd":"T49","earnCd":"49A","accrualDt":null,"accrualFreq":null,"accrued":null,"hrsLeft":null,"accrualCap":null,"taken":0.0,"planned":0.0,"projectedCapDays":null,"projectedCapDate":null,"planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":null,"accrualRate":null,"allowNegativeBalance":false},{"leaveTypeDesc":"T/N Bereavement","leaveTypeCd":"ABR","earnCd":"BR","accrualDt":null,"accrualFreq":null,"accrued":null,"hrsLeft":null,"accrualCap":null,"taken":0.0,"planned":0.0,"projectedCapDays":null,"projectedCapDate":null,"planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":null,"accrualRate":null,"allowNegativeBalance":false},{"leaveTypeDesc":"T/N Jury Duty","leaveTypeCd":"AJD","earnCd":"JUD","accrualDt":null,"accrualFreq":null,"accrued":null,"hrsLeft":null,"accrualCap":null,"taken":0.0,"planned":0.0,"projectedCapDays":null,"projectedCapDate":null,"planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":null,"accrualRate":null,"allowNegativeBalance":false},{"leaveTypeDesc":"T/N Leave Without Pay","leaveTypeCd":"ALW","earnCd":"LW","accrualDt":null,"accrualFreq":null,"accrued":null,"hrsLeft":null,"accrualCap":null,"taken":0.0,"planned":0.0,"projectedCapDays":null,"projectedCapDate":null,"planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":null,"accrualRate":null,"allowNegativeBalance":false},{"leaveTypeDesc":"T/N Volunteer Time Off (VTO)","leaveTypeCd":"VTO","earnCd":"VTO","accrualDt":null,"accrualFreq":null,"accrued":null,"hrsLeft":null,"accrualCap":null,"taken":0.0,"planned":0.0,"projectedCapDays":null,"projectedCapDate":null,"planTypeDesc":null,"requestList":{"totalRequest":0,"requests":null},"balance":null,"accrualRate":null,"allowNegativeBalance":false}];
            $scope.selectVacationClass = function (leaveType) {
                if (!leaveType) {
                    return;
                }

                if (vacatoionEarnCds.indexOf(leaveType.earnCd) > -1) {
                    return '{md-icon icon-icon_Vacation tn-icon-big-circle }';
                } else if (sickLeaveEarnCds.indexOf(leaveType.earnCd) > -1) {
                    return '{md-icon icon-icon_Sick tn-icon-big-circle }';
                } else if (personalLeaveEarnCds.indexOf(leaveType.earnCd) > -1) {
                    return '{md-icon icon-icon_Personal tn-icon-big-circle }';
                } else if (rolloverLeaveEarnCds.indexOf(leaveType.earnCd) > -1) {
                    return '{md-icon icon-icon_Rollover tn-icon-big-circle }';
                } else if (floatingHolEarndCds.indexOf(leaveType.earnCd) > -1) {
                    return '{md-icon icon-icon_Floating tn-icon-big-circle }';
                } else {
                    return '{md-icon icon-icon_Vacation tn-icon-big-circle }';
                }
            };

            $scope.selectVacationText = function (leaveType) {
                if (!leaveType) {
                    return "";
                } else {
                    return leaveType.leaveTypeDesc;
                }
            };
            $scope.leaveHours = function (hours) {
                if (angular.isNumber(hours)) {
                    return Math.floor(hours);
                } else {
                    return 0;
                }
            };
            //Leave Recent Acitivity
            $scope.emplRecentActivities = [];
            if ($scope.showTimeOff) {
                timeOffService.getTimeOffWidgetData(constants.get, "/trinetGateway/timeoff/services/v1.0/LeaveRequests",
                    //timeOffService.getTimeOffWidgetData(constants.get,"/trinetGateway/timeoff/services/v1.0/LeaveRequest/TimeOffList",
                    null,
                    function (response) {
                        //response not inline with standard services response
                        //need to change the service
                        //Also this functin should have been moved to servie //TODO
                        var emplRequest = response.empLeaveRequests,
                            listLength,
                            pendingStatus = ['W'],
                            approvedStatus = ['A'],
                            paidStatus = ['C'],
                            rejectedStatus = ['R'];

                        if (emplRequest.length <= 3) {
                            listLength = emplRequest.length;
                        } else {
                            listLength = 3;
                        }
                        emplRequest = emplRequest.sort(function (a, b) {
                            return new Date(b.leaveRequestSummary.leaveStartDt).getTime() - new Date(a.leaveRequestSummary.leaveStartDt).getTime();
                        });
                        if (emplRequest) {
                            for (var i = 0; i < listLength; i++) {
                                var empLeave = emplRequest[i],
                                    leaveRequestSummary = empLeave.leaveRequestSummary,
                                    isPeriod = true,
                                    period,
                                    isPending = false,
                                    isRejected = false,
                                    isApproved = false;

                                if (leaveRequestSummary.leaveStartDt === leaveRequestSummary.leaveEndDt) {
                                    isPeriod = false;
                                }

                                if (isPeriod) {
                                    period = getDateString(leaveRequestSummary.leaveStartDt) + " - " + getDateString(leaveRequestSummary.leaveEndDt);
                                } else {
                                    period = getDateString(leaveRequestSummary.leaveStartDt);
                                }

                                if (approvedStatus.indexOf(leaveRequestSummary.statusCd) > -1) {
                                    isApproved = true;
                                } else if (paidStatus.indexOf(leaveRequestSummary.statusCd) > -1) {
                                    isApproved = true;
                                } else if (rejectedStatus.indexOf(leaveRequestSummary.statusCd) > -1) {
                                    isRejected = true;
                                } else {
                                    isPending = true;
                                }

                                $scope.emplRecentActivities.push({
                                    "period": period,
                                    "status": leaveRequestSummary.statusDesc,
                                    "type": leaveRequestSummary.leaveTypeDesc,
                                    "isApproved": isApproved,
                                    "isRejected": isRejected,
                                    "isPending": isPending
                                });

                            }
                            $scope.timeOffLoaded = true;
                        }
                    },
                    function () {
                        $scope.timeOffLoaded = false;
                        $scope.timeOffErrored = true;
                    });
            }
        }



        $scope.absValue = function (val) {
            return Math.abs(val);
        };

        function getDateString(inputDate) {
            var lDate = new Date(inputDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1")),
                outputDateString,
                month,
                date;

            if (lDate.getMonth() === 0) { month = "Jan"; }
            else if (lDate.getMonth() === 1) { month = "Feb"; }
            else if (lDate.getMonth() === 2) { month = "Mar"; }
            else if (lDate.getMonth() === 3) { month = "Apr"; }
            else if (lDate.getMonth() === 4) { month = "May"; }
            else if (lDate.getMonth() === 5) { month = "Jun"; }
            else if (lDate.getMonth() === 6) { month = "Jul"; }
            else if (lDate.getMonth() === 7) { month = "Aug"; }
            else if (lDate.getMonth() === 8) { month = "Sep"; }
            else if (lDate.getMonth() === 9) { month = "Oct"; }
            else if (lDate.getMonth() === 10) { month = "Nov"; }
            else if (lDate.getMonth() === 11) { month = "Dec"; }
            else {
                console.log("wrong date");
            }

            outputDateString = month + " " + lDate.getDate() + ", " + lDate.getFullYear();

            return outputDateString;
        }

        /**
         * load widgets
         */
        $scope.widgets = [];
        widgetService
            .loadAllWidgets()
            .then(function (widgets) {
                $scope.widgets.notices = widgets.notices;
                $scope.widgets.offers = widgets.offers;
            });

        $scope.getNewHolidayAppUrl= function(){
          var newHolidayURL = '/holidaycalendar?Company='+gso.getAppConfig().companyId;
          window.open("http://" + window.location.hostname + newHolidayURL, '_blank');
        };

        $scope.holidayListRedirection=function(){
          $scope.activeHolidayCompany ? $scope.getNewHolidayAppUrl():$location.path('/holidaySchedule');
        };


        $scope.requestTimeOff = function () {
            $scope.params = {
                'USERID': gso.getAppConfig().userId,
                'TSESSIONID': gso.getUtilService().getCookie(),
                'USER_COMPANY': gso.getAppConfig().companyId

            };
            var timeOffUrl = urlBuilder('../ui/apps/TimeOff');
            window.open(timeOffUrl, '_blank');
        };

        function checkActiveAndLoadHolidays(){
          $http({
                 url: '/api-company-holiday-calendar/v1/holidaycalendar/'+ companyId + '/Y/activeCompany',
                 method: 'GET',
                 headers: {
                   'Authorization':'Bearer '+ token,
                   'X-Company-ID': gso.getAppConfig().companyId,
                   'Content-Type': 'application/json;charset=UTF-8'}
          })
          .success(function (response) {
              $scope.activeHolidayCompany=response.data;
              loadHolidays();
          })
          .error(function (error) {
             loadHolidays();
          });
        }

        function loadHolidays(){
          if($scope.activeHolidayCompany){
            loadNewHolidays();
          }else{
            if (gso.getAppConfig().holidaySchedule !== "") {
              $scope.loadHolidayWidget(gso.getAppConfig().holidaySchedule);
            }
            else {
              $scope.$parent.$on('holidaySchedule', function (event, data) {
                $scope.loadHolidayWidget(data);
              });
            }
          }
        }

        function loadNewHolidays(){
          $http({
            url: '/api-company-holiday-calendar/v1/holidaycalendar/'+companyId+'/Y/wseView?year='+$scope.currentYear,
            method: 'GET',
            headers: {
              'Authorization':'Bearer '+ token,
              'X-Company-ID': gso.getAppConfig().companyId,
              'Content-Type': 'application/json;charset=UTF-8'}
            })
            .success(function (response) {
              showNewHolidayWidget(response.data);
            })
            .error(function (error) {
              $scope.errorAlert = error;
              if (error._statusCode === "404") {
                  $scope.hasHolidayWidget = false;
              }
            });
        }

        function showNewHolidayWidget(response){
          if (response.holidayDetails !== null && response.holidayDetails !== undefined) {
            $scope.companyHolidayDetails = response.holidayDetails.filter(checkNewHolidayHours);

            var today = new Date();
            var holidayDate;
            var holidayName;
            var displayHolidayDate = new Date();
            var displayHolidayName = "";

            var nextDateReached = false;
            var allDates = [];
            var futureDates= [];
            var nextHolidayDt;

            var pluck = function(arr, type) {
              var plucked = [];
              arr.forEach(function(element) {
                plucked.push(element[type]);
              });

              return plucked;
            };

            angular.forEach($scope.companyHolidayDetails, function (item) {
              if(item.holidayDate !==null)
              {
                holidayDate = new Date(item.holidayDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"));
                holidayName = item.descr;
                allDates.push({'holidayDate': holidayDate, 'holidayName': holidayName});
             }
            });
            futureDates = allDates.filter(function(input){ return input.holidayDate > today;});
            var nextHolDate = new Date(Math.min.apply(null,pluck(futureDates, 'holidayDate')));

            futureDates.forEach(function(element) {
              if(element.holidayDate.equals(nextHolDate)){
                nextHolidayDt = element;
              }
            });
            displayHolidayDate = nextHolidayDt.holidayDate;
            displayHolidayName = nextHolidayDt.holidayName;

            $scope.nextHolidayDt = displayHolidayDate;
            //var dayHoliday = Math.round(($scope.nextHolidayDt - new Date()) / (1000 * 60 * 60 * 24));
            var dayHolidayObject = new GetDateDiff(new Date(), $scope.nextHolidayDt);
            var nextHolidayDayOrDays = dayHolidayObject.diffDays > 1 ? "days" : "day";
            $scope.nextHolidayDtDay = weekday[$scope.nextHolidayDt.getDay()];
            $scope.holidayInHowManyDays = "In " + dayHolidayObject.diffDays + " " + nextHolidayDayOrDays;
            $scope.holidayName = displayHolidayName;
            $scope.hasHolidayWidget = true;
          }else {
            $scope.nextHolidayDt = "01/01/2017";
            $scope.nextHolidayDtDay = "Sunday";
            $scope.holidayInHowManyDays = "In 0 days";
            $scope.holidayName = "Not available";
          }
        }

        function checkNewHolidayHours(obj) {
          return obj.hrs !== 0;
        }
        // bi-alerts functions and required service calls
        $scope.viewAlerts = function () {
            var alertURL = SharedDataService.getAppSharedData().reportsuiBaseUrl+'/UIGateway.jsp?companyId=' + gso.getAppConfig().companyId
                + '&employeeId=' + $window.sessionStorage.getItem('empId') +'&source=Alerts';
            $window.open(alertURL,'_blank');
        };

    }]);
