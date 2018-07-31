/**
 * Created by jaya krishna on 10/29/2015.
 */
describe('Payroll Schedule Controller Testing', function () {
    var $scope;
    var $rootScope;
    var appConfig;
    var $httpBackend;
    var response = {
                       "data": {
                           "payCalItems": [
                               {
                                   "periodBeginDate": "2016-01-01",
                                   "periodEndDate": "2016-01-15",
                                   "dueDate": "2016-01-12",
                                   "checkIssuedDate": "2016-01-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-01-16",
                                   "periodEndDate": "2016-01-31",
                                   "dueDate": "2016-01-26",
                                   "checkIssuedDate": "2016-01-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-02-01",
                                   "periodEndDate": "2016-02-15",
                                   "dueDate": "2016-02-09",
                                   "checkIssuedDate": "2016-02-12",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-02-16",
                                   "periodEndDate": "2016-02-29",
                                   "dueDate": "2016-02-24",
                                   "checkIssuedDate": "2016-02-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-03-01",
                                   "periodEndDate": "2016-03-15",
                                   "dueDate": "2016-03-10",
                                   "checkIssuedDate": "2016-03-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-03-16",
                                   "periodEndDate": "2016-03-31",
                                   "dueDate": "2016-03-28",
                                   "checkIssuedDate": "2016-03-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-04-01",
                                   "periodEndDate": "2016-04-15",
                                   "dueDate": "2016-04-12",
                                   "checkIssuedDate": "2016-04-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-04-16",
                                   "periodEndDate": "2016-04-30",
                                   "dueDate": "2016-04-26",
                                   "checkIssuedDate": "2016-04-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-05-01",
                                   "periodEndDate": "2016-05-15",
                                   "dueDate": "2016-05-10",
                                   "checkIssuedDate": "2016-05-13",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-05-16",
                                   "periodEndDate": "2016-05-31",
                                   "dueDate": "2016-05-25",
                                   "checkIssuedDate": "2016-05-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-06-01",
                                   "periodEndDate": "2016-06-15",
                                   "dueDate": "2016-06-10",
                                   "checkIssuedDate": "2016-06-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-06-16",
                                   "periodEndDate": "2016-06-30",
                                   "dueDate": "2016-06-27",
                                   "checkIssuedDate": "2016-06-30",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-07-01",
                                   "periodEndDate": "2016-07-15",
                                   "dueDate": "2016-07-12",
                                   "checkIssuedDate": "2016-07-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-07-16",
                                   "periodEndDate": "2016-07-31",
                                   "dueDate": "2016-07-26",
                                   "checkIssuedDate": "2016-07-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-08-01",
                                   "periodEndDate": "2016-08-15",
                                   "dueDate": "2016-08-10",
                                   "checkIssuedDate": "2016-08-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-08-16",
                                   "periodEndDate": "2016-08-31",
                                   "dueDate": "2016-08-26",
                                   "checkIssuedDate": "2016-08-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-09-01",
                                   "periodEndDate": "2016-09-15",
                                   "dueDate": "2016-09-12",
                                   "checkIssuedDate": "2016-09-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-09-16",
                                   "periodEndDate": "2016-09-30",
                                   "dueDate": "2016-09-27",
                                   "checkIssuedDate": "2016-09-30",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-10-01",
                                   "periodEndDate": "2016-10-15",
                                   "dueDate": "2016-10-11",
                                   "checkIssuedDate": "2016-10-14",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-10-16",
                                   "periodEndDate": "2016-10-31",
                                   "dueDate": "2016-10-26",
                                   "checkIssuedDate": "2016-10-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-11-01",
                                   "periodEndDate": "2016-11-15",
                                   "dueDate": "2016-11-09",
                                   "checkIssuedDate": "2016-11-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-11-16",
                                   "periodEndDate": "2016-11-30",
                                   "dueDate": "2016-11-23",
                                   "checkIssuedDate": "2016-11-30",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-12-01",
                                   "periodEndDate": "2016-12-15",
                                   "dueDate": "2016-12-12",
                                   "checkIssuedDate": "2016-12-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2016-12-16",
                                   "periodEndDate": "2016-12-31",
                                   "dueDate": "2016-12-22",
                                   "checkIssuedDate": "2016-12-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-01-01",
                                   "periodEndDate": "2017-01-15",
                                   "dueDate": "2017-01-10",
                                   "checkIssuedDate": "2017-01-13",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-01-16",
                                   "periodEndDate": "2017-01-31",
                                   "dueDate": "2017-01-26",
                                   "checkIssuedDate": "2017-01-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-02-01",
                                   "periodEndDate": "2017-02-15",
                                   "dueDate": "2017-02-10",
                                   "checkIssuedDate": "2017-02-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-02-16",
                                   "periodEndDate": "2017-02-28",
                                   "dueDate": "2017-02-23",
                                   "checkIssuedDate": "2017-02-28",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-03-01",
                                   "periodEndDate": "2017-03-15",
                                   "dueDate": "2017-03-10",
                                   "checkIssuedDate": "2017-03-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-03-16",
                                   "periodEndDate": "2017-03-31",
                                   "dueDate": "2017-03-28",
                                   "checkIssuedDate": "2017-03-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-04-01",
                                   "periodEndDate": "2017-04-15",
                                   "dueDate": "2017-04-11",
                                   "checkIssuedDate": "2017-04-14",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-04-16",
                                   "periodEndDate": "2017-04-30",
                                   "dueDate": "2017-04-25",
                                   "checkIssuedDate": "2017-04-28",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-05-01",
                                   "periodEndDate": "2017-05-15",
                                   "dueDate": "2017-05-10",
                                   "checkIssuedDate": "2017-05-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-05-16",
                                   "periodEndDate": "2017-05-31",
                                   "dueDate": "2017-05-25",
                                   "checkIssuedDate": "2017-05-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-06-01",
                                   "periodEndDate": "2017-06-15",
                                   "dueDate": "2017-06-12",
                                   "checkIssuedDate": "2017-06-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-06-16",
                                   "periodEndDate": "2017-06-30",
                                   "dueDate": "2017-06-27",
                                   "checkIssuedDate": "2017-06-30",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-07-01",
                                   "periodEndDate": "2017-07-15",
                                   "dueDate": "2017-07-11",
                                   "checkIssuedDate": "2017-07-14",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-07-16",
                                   "periodEndDate": "2017-07-31",
                                   "dueDate": "2017-07-26",
                                   "checkIssuedDate": "2017-07-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-08-01",
                                   "periodEndDate": "2017-08-15",
                                   "dueDate": "2017-08-10",
                                   "checkIssuedDate": "2017-08-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-08-16",
                                   "periodEndDate": "2017-08-31",
                                   "dueDate": "2017-08-28",
                                   "checkIssuedDate": "2017-08-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-09-01",
                                   "periodEndDate": "2017-09-15",
                                   "dueDate": "2017-09-12",
                                   "checkIssuedDate": "2017-09-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-09-16",
                                   "periodEndDate": "2017-09-30",
                                   "dueDate": "2017-09-26",
                                   "checkIssuedDate": "2017-09-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-10-01",
                                   "periodEndDate": "2017-10-15",
                                   "dueDate": "2017-10-10",
                                   "checkIssuedDate": "2017-10-13",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-10-16",
                                   "periodEndDate": "2017-10-31",
                                   "dueDate": "2017-10-26",
                                   "checkIssuedDate": "2017-10-31",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-11-01",
                                   "periodEndDate": "2017-11-15",
                                   "dueDate": "2017-11-10",
                                   "checkIssuedDate": "2017-11-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-11-16",
                                   "periodEndDate": "2017-11-30",
                                   "dueDate": "2017-11-27",
                                   "checkIssuedDate": "2017-11-30",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-12-01",
                                   "periodEndDate": "2017-12-15",
                                   "dueDate": "2017-12-12",
                                   "checkIssuedDate": "2017-12-15",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               },
                               {
                                   "periodBeginDate": "2017-12-16",
                                   "periodEndDate": "2017-12-31",
                                   "dueDate": "2017-12-26",
                                   "checkIssuedDate": "2017-12-29",
                                   "payFrequencyType": "S0",
                                   "payFrequencyName": "Semimonthly",
                                   "benefitsDeducted": "N"
                               }
                           ],
                           "payrollScheduleHelpInfo": {
                               "payFrequencyName": "Semimonthly",
                               "firstCheckIssueDay": "15th",
                               "firstPayPeriodBeginDay": "1st",
                               "firstPayPeriodEndDay": "15th",
                               "secondCheckIssueDay": "Last Day Of Month",
                               "secondPayPeriodBeginDay": "16th",
                               "secondPayPeriodEndDay": "Last Day Of Month"
                           }
                       },
                       "_requestId": "4101392b-572f-4392-b47c-a93d69298653",
                       "_statusCode": "200",
                       "_statusText": "OK",
                       "_statusMessage": "Success"
                   };

    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $injector.get('$controller')('payrollScheduleCtrl', {$scope: $scope});
            $scope.translation = {
                                    "money": {
                                        "payrollSchedule": {
                                            "biWeek": "Bi-Weekly",
                                            "week": "Weekly",
                                            "smMonth": "Semi-Monthly",
                                            "mon": "Monthly",
                                            "biWeekHelp": "Your pay period is <b>{{scheduleInfo.payFrequencyName}}</b> from {{scheduleInfo.firstPayPeriodBeginDay}} through next {{scheduleInfo.firstPayPeriodEndDay}}. Regular paydays will occur on the next {{scheduleInfo.firstCheckIssueDay}}.",
                                            "weekHelp": "Your pay period is <b>{{scheduleInfo.payFrequencyName}}</b> from {{scheduleInfo.firstPayPeriodBeginDay}} through {{scheduleInfo.firstPayPeriodEndDay}}. Your regular pay date is {{scheduleInfo.firstCheckIssueDay}}.",
                                            "semiMonthHelp": "Your pay period is <b>{{scheduleInfo.payFrequencyName}}</b> from {{scheduleInfo.firstPayPeriodBeginDay}} through the {{scheduleInfo.firstPayPeriodEndDay}} and the {{scheduleInfo.secondPayPeriodBeginDay}} through the last day of each month. Your regular pay date is the {{scheduleInfo.firstCheckIssueDay}} and the last day of each month.",
                                            "monthlyHelp": "Your pay period is <b>{{scheduleInfo.payFrequencyName}}</b> from {{scheduleInfo.firstPayPeriodBeginDay}} through the last day of each month. Regular paydays will occur on the last day of each month."
                                        }
                                    }
                                 }
            appConfig = $injector.get('appConfig');
            $httpBackend = $injector.get('$httpBackend');
        });
        $scope.componentsPermissions= {
              "data": {
                "31": [
                  {
                    "id": 6,
                    "name": "terminate",
                    "url": "#",
                    "type": "Button",
                    "external": "N",
                    "permission": {
                      "canView": false,
                      "canAdd": false,
                      "canEdit": true,
                      "canDelete": false,
                      "canPreliminaryApprove": false,
                      "canFinalApprove": false
                    },
                    "subComponents": []
                  },
                  {
                    "id": 4,
                    "name": "money",
                    "url": "#",
                    "type": "Tab",
                    "external": "N",
                    "permission": {
                      "canView": true,
                      "canAdd": false,
                      "canEdit": true,
                      "canDelete": false,
                      "canPreliminaryApprove": false,
                      "canFinalApprove": false
                    },
                    "subComponents": [
                      {
                        "id": 7,
                        "name": "TaxWithholding",
                        "url": "#",
                        "type": "section",
                        "external": "N",
                        "permission": {
                          "canView": true,
                          "canAdd": false,
                          "canEdit": true,
                          "canDelete": false,
                          "canPreliminaryApprove": false,
                          "canFinalApprove": false
                        },
                        "subComponents": []
                      }
                    ]
                  },
                  {
                    "id": 5,
                    "name": "requestExtendedLeave",
                    "url": "#",
                    "type": "Button",
                    "external": "N",
                    "permission": {
                      "canView": true,
                      "canAdd": false,
                      "canEdit": true,
                      "canDelete": false,
                      "canPreliminaryApprove": false,
                      "canFinalApprove": false
                    },
                    "subComponents": []
                  },
                  {
                    "id": 3,
                    "name": "workInfo",
                    "url": "#",
                    "type": "Tab",
                    "external": "N",
                    "permission": {
                      "canView": true,
                      "canAdd": false,
                      "canEdit": true,
                      "canDelete": false,
                      "canPreliminaryApprove": false,
                      "canFinalApprove": false
                    },
                    "subComponents": []
                  }
                ],
                "81": [
                  {
                    "id": 2,
                    "name": "newHireId",
                    "url": "#",
                    "type": "Button",
                    "external": "N",
                    "permission": {
                      "canView": true,
                      "canAdd": false,
                      "canEdit": true,
                      "canDelete": false,
                      "canPreliminaryApprove": false,
                      "canFinalApprove": false
                    },
                    "subComponents": [
                      {
                        "id": 1,
                        "name": "SUBMIT",
                        "url": "#",
                        "type": "Button",
                        "external": "N",
                        "permission": {
                          "canView": true,
                          "canAdd": true,
                          "canEdit": true,
                          "canDelete": false,
                          "canPreliminaryApprove": true,
                          "canFinalApprove": true
                        },
                        "subComponents": []
                      }
                    ]
                  }
                ]
              },
              "_statusCode": "200",
              "_statusText": "OK",
              "_statusMessage": "Success"
            };

        var currentDate = new Date(),
            startDate = currentDate.getFullYear() + '-' + '01' + '-' + '01',
            endDate = (currentDate.getFullYear() + 1 ) + '-' + '12' + '-' + '31';


        var payrollScheduleDataURL = moneyUrlConfig.moneyApi + moneyUrlConfig.moneyBaseUrl +
            moneyUrlConfig.resources.payroll + "/" + appConfig.companyId + "/" +
           appConfig.userId + moneyUrlConfig.resources.payrollschedule+'?startDate='+startDate+'&endDate='+endDate;


        $httpBackend.whenGET(payrollScheduleDataURL).respond(200, response);
        $httpBackend.flush();
    });


    describe('getDayClass function testing', function () {
        it('getDayClass is defined', function () {
            expect($scope.getDayClass).toBeDefined();
        });

        it('getDayClass function call', function () {
            var index = 0;
            var date = "03/03/2016";
            var data = {"datesOfInterest": [{"dateOfInterest": "03/03/2016"}, {"dateOfInterest": "03/04/2016"}, {"dateOfInterest": "03/05/2016"}]};
            var mode = "day";
            $scope.getDayClass(index, date, data, mode);
        });
    });

    describe('printPDF function testing', function () {
        it('printPDF is defined', function () {
            expect($scope.printPDF).toBeDefined();
        });

        it('printPDF function call', function () {
            $scope.printPDF();
        });
    });

});
