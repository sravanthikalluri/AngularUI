/*Created by ganesh on 10/28/2015.*/

/*(function () {

    "use strict";
    describe('Dashboard Controller Testing', function () {
        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            nameDataResponse = {
                "data": {
                    "priNamesActiveList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 4,
                            "name": "Albert",
                            "effectiveDate": "2015-10-07",
                            "endDate": "2015-10-22",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "nameSuffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "priNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRI",
                            "uniqueId": 3,
                            "name": "Albert",
                            "effectiveDate": "2015-09-16",
                            "endDate": "2015-10-06",
                            "formOfAddress": null,
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Paul",
                            "middleName": "ttt",
                            "nameSuffix": "Senior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "prfNamesActiveList": [],
                    "prfNamesHistoryList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 1,
                            "name": "Albro",
                            "effectiveDate": "2003-09-25",
                            "endDate": "2015-09-14",
                            "formOfAddress": " ",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "Cletus",
                            "middleName": "D",
                            "nameSuffix": " ",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ],
                    "prfNamesCurrentList": [
                        {
                            "personId": "00001005514",
                            "nameType": "PRF",
                            "uniqueId": 5,
                            "name": "hfgh",
                            "effectiveDate": "2015-10-09",
                            "endDate": "2099-12-31",
                            "formOfAddress": "Mr",
                            "personTitle": null,
                            "nameFormat": null,
                            "firstName": "hg",
                            "middleName": "hfg",
                            "nameSuffix": "Junior",
                            "reasonChangeCode": null,
                            "approvalStatus": "F"
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK"
            },
            importantNoticeDataResponse = {
                "errorCode": null,
                "data": [
                    {
                        "title": "SP_143",
                        "text": "<span class=\"mainboldred\">Transportation Benefits Changes</span><br>The transit tax benefit was increased to $245. Learn about the increase and the retroactive adjustment.[<a href='%1' target='BODY'>more</a>]"
                    },
                    {
                        "title": "SP_083",
                        "text": "<span class=\"mainboldred\">Internet Explorer 6.0 Users, Please Note</span><br>We apologize for the inconvenience. [<a href='%1' target='BODY'>more</a>]"
                    },
                    {
                        "title": "SP_084",
                        "text": "<span class=\"mainboldorange\">A Change to Group Life Insurance plan</span> <br>Effective July 1, 2009, there is a minor change to the Employer-paid Life Insurance plans.  [<a href='%1' target='BODY'>more</a>]"
                    },
                    {
                        "title": "SP_071",
                        "text": "<span class=\"mainboldred\">TriNet and Gevity</span><br>TriNet completes acquisition of Gevity. [<a href='%1' target='_blank'>more</a>]"
                    }
                ],
                "_statusCode": "200",
                "_statusMessage": "Success"
            },
            pdfUrlResponse = {"data":{
                "resource": [
                    {
                        "id": "SP_083",
                        "url": "assets/pdf/portal_visual_spec_allpages.pdf"
                    }


                ]
           },
                             "_statusCode": "200",
                             "_statusMessage": "Success" },
            menuResponse ={
                "data": {
                    "empId": "00001411732",
                    "menuItems": [
                        {
                            "subMenus": [],
                            "menuId": 1,
                            "name": "Dashboard",
                            "theme": "Me",
                            "component": "dashboard",
                            "url": "#/dashboard",
                            "displayOrder": 1,
                            "external": "N",
                            "isLeaf": true,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 21,
                                    "name": "Profile",
                                    "theme": "Me",
                                    "component": "profile",
                                    "url": "#/profile/profile",
                                    "displayOrder": 1,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 2,
                            "name": "My Profile",
                            "theme": "Me",
                            "component": null,
                            "url": null,
                            "displayOrder": 2,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 31,
                                    "name": "PayChecks and Statements",
                                    "theme": "Me",
                                    "component": null,
                                    "url": "#/earning",
                                    "displayOrder": 2,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 3,
                            "name": "My Money",
                            "theme": "Me",
                            "component": "pay",
                            "url": null,
                            "displayOrder": 3,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 42,
                                    "name": "Enroll in Benefits",
                                    "theme": "Me",
                                    "component": null,
                                    "url": "#/openenrollment",
                                    "displayOrder": 2,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 4,
                            "name": "My Benefits",
                            "theme": "Me",
                            "component": "umbrella",
                            "url": "#/mytime",
                            "displayOrder": 4,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 57,
                                    "name": "Time Off",
                                    "theme": "Me",
                                    "component": null,
                                    "url": "/ui/apps/TimeOff/",
                                    "displayOrder": 3,
                                    "external": "Y",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 5,
                            "name": "Time",
                            "theme": "Me",
                            "component": "time",
                            "url": null,
                            "displayOrder": 5,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 62,
                                    "name": "Organization Chart",
                                    "theme": "Me",
                                    "component": null,
                                    "url": "#/organizationalChart/me",
                                    "displayOrder": 2,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 6,
                            "name": "About My Company",
                            "theme": "Me",
                            "component": "company",
                            "url": null,
                            "displayOrder": 6,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 81,
                                    "name": "Manage Employees",
                                    "theme": "Company",
                                    "component": null,
                                    "url": "#/manageEmployee",
                                    "displayOrder": 1,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 8,
                            "name": "Employees",
                            "theme": "Company",
                            "component": "employees",
                            "url": null,
                            "displayOrder": 2,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        },
                        {
                            "subMenus": [
                                {
                                    "subMenus": [],
                                    "menuId": 91,
                                    "name": "Company Overview",
                                    "theme": "Company",
                                    "component": null,
                                    "url": null,
                                    "displayOrder": 1,
                                    "external": "N",
                                    "isLeaf": true,
                                    "type": "Menu"
                                }
                            ],
                            "menuId": 9,
                            "name": "Company Setup",
                            "theme": "Company",
                            "component": "company",
                            "url": null,
                            "displayOrder": 3,
                            "external": "N",
                            "isLeaf": false,
                            "type": "Menu"
                        }
                    ]
                },
                "_statusCode": "200",
                "_statusText": "OK",
                "_statusMessage": "Success"
            },

            sectionsResponse = {"data":[
                                       {
                                           "id": "1",
                                           "title": "My Profile",
                                           "directive": "profile"
                                       }
                                   ],"_statusCode": "200","_statusMessage": "Success"},
            sectionsCountResponse = [
                {
                    "id": "sec_0"
                }];

          var payResponse = {"data":["2016-04-15","2016-04-29"],"_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};

          var leaveResponse = {"leaveTypes":[{"accrued":"casual"}],"_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};

        var holidayScheduleResponse = {"data":{"companyHolidayDetails":[{"schedule":"5CW","date":"01-Jan-16","desc":"New Years Day","hours":8},{"schedule":"5CW","date":"18-Jan-16","desc":"Martin Luther King, Jr. Day","hours":0},{"schedule":"5CW","date":"15-Feb-16","desc":"Presidents Day","hours":8},{"schedule":"5CW","date":"30-May-16","desc":"Memorial Day","hours":8},{"schedule":"5CW","date":"04-Jul-16","desc":"Independence Day","hours":8},{"schedule":"5CW","date":"05-Sep-16","desc":"Labor Day","hours":8},{"schedule":"5CW","date":"10-Oct-16","desc":"Columbus Day","hours":0},{"schedule":"5CW","date":"11-Nov-16","desc":"Veterans Day","hours":0},{"schedule":"5CW","date":"24-Nov-16","desc":"Thanksgiving Day","hours":8},{"schedule":"5CW","date":"25-Nov-16","desc":"Day after Thanksgiving","hours":8},{"schedule":"5CW","date":"23-Dec-16","desc":"Christmas Eve","hours":8},{"schedule":"5CW","date":"26-Dec-16","desc":"Christmas Day","hours":8},{"schedule":"5CW","date":"30-Dec-16","desc":"New Years Eve","hours":8},{"schedule":"5CW","date":"02-Jan-17","desc":"New Years Day","hours":0}]},"_requestId":"170bf882-6bf5-4bf7-864d-fffbeed4c557","_statusCode":"200","_statusText":"OK","_statusMessage":"Success"};

        var leaveRequestsResponse = {"empLeaveRequests":[{"leaveRequestSummary":{"requestId":"7","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2016-07-22 23:28:57+00:00","totalHours":16.0,"leaveStartDt":"2016-07-25","leaveEndDt":"2016-07-26","statusCd":"R","statusDesc":"Not Approved","status":["All"],"comments":"","approverComments":"test","leaveStatusEdit":"Yes","leaveStatusAction":["Edit","Cancel"],"supervisorName":"Bhabani Sahu","dateCreated":"2016-07-22","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2016-07-25","hours":8},{"leaveDt":"2016-07-26","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"8","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2016-07-22 23:12:48+00:00","totalHours":8.0,"leaveStartDt":"2016-08-03","leaveEndDt":"2016-08-03","statusCd":"W","statusDesc":"Submitted","status":["All","Taken"],"comments":"","approverComments":"","leaveStatusEdit":"Yes","leaveStatusAction":["Edit","Cancel"],"supervisorName":"Bhabani Sahu","dateCreated":"2016-07-22","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2016-08-03","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"3","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2014-12-21 14:56:01+00:00","totalHours":56.0,"leaveStartDt":"2014-12-01","leaveEndDt":"2014-12-09","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2014-11-10","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2014-12-01","hours":8},{"leaveDt":"2014-12-02","hours":8},{"leaveDt":"2014-12-03","hours":8},{"leaveDt":"2014-12-04","hours":8},{"leaveDt":"2014-12-05","hours":8},{"leaveDt":"2014-12-08","hours":8},{"leaveDt":"2014-12-09","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"2","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2014-12-09 00:08:52+00:00","totalHours":24.0,"leaveStartDt":"2014-11-24","leaveEndDt":"2014-11-26","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2014-11-10","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2014-11-24","hours":8},{"leaveDt":"2014-11-25","hours":8},{"leaveDt":"2014-11-26","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"1","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2014-11-23 17:02:45+00:00","totalHours":24.0,"leaveStartDt":"2014-11-12","leaveEndDt":"2014-11-14","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2014-11-10","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2014-11-12","hours":8},{"leaveDt":"2014-11-13","hours":8},{"leaveDt":"2014-11-14","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"6","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2015-03-16 19:19:31+00:00","totalHours":40.0,"leaveStartDt":"2015-02-23","leaveEndDt":"2015-02-27","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"Sick - Knee Ache and Fever","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2015-02-23","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2015-02-23","hours":8},{"leaveDt":"2015-02-24","hours":8},{"leaveDt":"2015-02-25","hours":8},{"leaveDt":"2015-02-26","hours":8},{"leaveDt":"2015-02-27","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"5","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2015-03-02 22:03:06+00:00","totalHours":32.0,"leaveStartDt":"2015-02-17","leaveEndDt":"2015-02-20","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"Taking care of family\r\ntrying to sale my property as well while in India","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2015-02-17","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2015-02-17","hours":8},{"leaveDt":"2015-02-18","hours":8},{"leaveDt":"2015-02-19","hours":8},{"leaveDt":"2015-02-20","hours":8}],"adjOrigInfo":null,"comments":null},{"leaveRequestSummary":{"requestId":"4","emplId":"00001422211","positionId":"00001422211","empName":"Abhishek Shrivastava","earnCd":"06","leaveTypeDesc":"T/N Paid Time Off","lastUpdated":"2015-02-16 15:09:37+00:00","totalHours":80.0,"leaveStartDt":"2015-02-02","leaveEndDt":"2015-02-13","statusCd":"C","statusDesc":"Paid","status":["All","Taken"],"comments":"","approverComments":"","leaveStatusEdit":"No","leaveStatusAction":["Adjust"],"supervisorName":"Bhabani Sahu","dateCreated":"2015-01-29","company":"001","leaveTypeCd":"APT"},"leaveHrsByDay":[{"leaveDt":"2015-02-02","hours":8},{"leaveDt":"2015-02-03","hours":8},{"leaveDt":"2015-02-04","hours":8},{"leaveDt":"2015-02-05","hours":8},{"leaveDt":"2015-02-06","hours":8},{"leaveDt":"2015-02-09","hours":8},{"leaveDt":"2015-02-10","hours":8},{"leaveDt":"2015-02-11","hours":8},{"leaveDt":"2015-02-12","hours":8},{"leaveDt":"2015-02-13","hours":8}],"adjOrigInfo":null,"comments":null}],"leaveRequestEntryLookupInfo":{"leaveTypes":null,"existingLeaveDays":[{"leaveDt":"2016-08-03","myself":1,"team":null,"hours":8},{"leaveDt":"2016-06-28","myself":null,"team":1,"hours":null},{"leaveDt":"2016-06-27","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-20","myself":null,"team":1,"hours":null},{"leaveDt":"2016-06-29","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-13","myself":null,"team":1,"hours":null},{"leaveDt":"2016-06-30","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-29","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-25","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-29","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-26","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-15","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-19","myself":null,"team":1,"hours":null},{"leaveDt":"2015-08-11","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-08","myself":null,"team":1,"hours":null},{"leaveDt":"2015-08-13","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-06","myself":null,"team":1,"hours":null},{"leaveDt":"2016-04-05","myself":null,"team":1,"hours":null},{"leaveDt":"2015-10-01","myself":null,"team":1,"hours":null},{"leaveDt":"2015-10-02","myself":null,"team":1,"hours":null},{"leaveDt":"2015-11-04","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-03","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-19","myself":null,"team":1,"hours":null},{"leaveDt":"2015-10-16","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-24","myself":null,"team":3,"hours":null},{"leaveDt":"2016-07-16","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-26","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-15","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-18","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-27","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-17","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-28","myself":null,"team":2,"hours":null},{"leaveDt":"2015-12-29","myself":null,"team":2,"hours":null},{"leaveDt":"2016-03-03","myself":null,"team":3,"hours":null},{"leaveDt":"2016-03-02","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-01","myself":null,"team":1,"hours":null},{"leaveDt":"2015-10-23","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-04","myself":null,"team":3,"hours":null},{"leaveDt":"2016-07-22","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-17","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-20","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-31","myself":null,"team":4,"hours":null},{"leaveDt":"2016-07-21","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-30","myself":null,"team":2,"hours":null},{"leaveDt":"2016-02-14","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-07","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-06","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-16","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-05","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-17","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-10","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-11","myself":null,"team":1,"hours":null},{"leaveDt":"2016-01-15","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-12","myself":null,"team":1,"hours":null},{"leaveDt":"2016-01-14","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-09","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-13","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-11","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-08","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-18","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-17","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-18","myself":null,"team":2,"hours":null},{"leaveDt":"2016-02-19","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-18","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-10","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-28","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-13","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-27","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-14","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-26","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-11","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-25","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-12","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-05","myself":null,"team":2,"hours":null},{"leaveDt":"2015-09-29","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-03","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-06","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-04","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-03","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-04","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-01","myself":null,"team":1,"hours":null},{"leaveDt":"2016-01-02","myself":null,"team":1,"hours":null},{"leaveDt":"2016-01-29","myself":null,"team":2,"hours":null},{"leaveDt":"2016-03-29","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-12","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-28","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-27","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-26","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-09","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-07","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-25","myself":null,"team":1,"hours":null},{"leaveDt":"2015-12-08","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-07","myself":null,"team":1,"hours":null},{"leaveDt":"2016-02-08","myself":null,"team":1,"hours":null},{"leaveDt":"2016-03-31","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-06","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-04","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-05","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-02","myself":null,"team":1,"hours":null},{"leaveDt":"2015-09-30","myself":null,"team":1,"hours":null},{"leaveDt":"2016-05-03","myself":null,"team":1,"hours":null},{"leaveDt":"2015-11-13","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-01","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-02","myself":null,"team":1,"hours":null},{"leaveDt":"2016-07-03","myself":null,"team":1,"hours":null}],"nonWorkWeekDays":[{"nonWorkWeekDay":"Saturday"},{"nonWorkWeekDay":"Sunday"}],"addlInfo":{"brvmntLv":"Y","brvmntLvDays":5,"brvmntLvComment":"5 days per occurence. Must be used only for your immediate family. Immediate family includes spouse, child, parent, brother, sister, grandparent,mother-in-law, father-in-law and domestic partner.","brvmnLvJryService":"None","juryLvDays":3,"juryLvComment":" ","floatholidaysER":0,"floatholidaysEE":0,"floatHolidayEvent":" ","leaveMinSalHrs":0,"leaveMaxSalHrs":8,"defaultWorkDayHrs":8,"supervisorName":"Bhabani Sahu","compType":"S"}}}

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.loadHolidayWidget = function(value){
                    return value;
                };
                $injector.get('$controller')('dashboardCtrl', {$scope: $scope});
                $httpBackend = $injector.get('$httpBackend');
                appConfig = $injector.get('appConfig');
            });

            var companyId = appConfig.companyId;

            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                companyId + '/' + appConfig.userId + profileUrlConfig.resources.name).respond(200, nameDataResponse);


            $httpBackend
                .whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.home + '/' +
                companyId + '/' + appConfig.userId + homeUrlConfig.resources.impNotice).respond(200, importantNoticeDataResponse);


            $httpBackend
                .whenGET('assets/data/dashboard/pdfurl.json').respond(200, pdfUrlResponse);

            $httpBackend
                .whenGET('assets/data/dashboard/dashboard_data.json').respond(200, sectionsResponse);


            $httpBackend
                .whenGET('assets/data/dashboard/sectionsCount_data.json').respond(200, sectionsCountResponse);

            $httpBackend.whenGET(moneyUrlConfig.moneyBaseUrl +
                                 moneyUrlConfig.resources.payroll + "/"+companyId + '/' +
                                 appConfig.userId + moneyUrlConfig.resources.payrollDates +
                                 '?payDay=previous,next').respond(200,payResponse);

            $httpBackend.whenGET("/trinetGateway/timeoff/services/v1.0/LeaveRequest/LeaveType").respond(200,leaveResponse);

            $httpBackend.whenGET("/trinetGateway/timeoff/services/v1.0/LeaveRequests").respond(200,leaveRequestsResponse);

            $httpBackend.whenGET('/api-navigation/v1/menu/' + companyId + '/' + appConfig.userId + '/menu-items').respond(200,menuResponse);

            appConfig.holidaySchedule = "HG7";
            var data = appConfig.holidaySchedule;
            $httpBackend.whenGET(globalUrlConfig.globalBase + '/company/' + companyId + '/holidays/' + data).respond(200,holidayScheduleResponse);

            $httpBackend.flush();


            $scope.sectionsDetails = sectionsResponse;
        });

     /!*describe('dialogModel testing', function () {

            it('dialogModel is defined', function () {
                expect($scope.dialogModel).toBeDefined();
            });

            it('dialogModel message is defined', function () {
                expect($scope.dialogModel.message).toBeDefined();
            });

            it('dialogModel message is equal to content', function () {
                expect($scope.dialogModel.message).toEqual("message from passed scope");
            });

        });*!/

        describe('setPage testing', function () {

            it('setPage is defined', function () {
                expect($scope.setPage).toBeDefined();
            });

            it('setPage function call testing', function () {
                var pageNo = 1;
                $scope.setPage(pageNo);
                expect($scope.currentPage).toEqual(pageNo);
            });


        });

        describe('pageChanged testing', function () {

            it('pageChanged is defined', function () {
                expect($scope.setPage).toBeDefined();
            });

            it('pageChanged  function call testing', function () {
                $scope.pageChanged();
            });


        });

        describe('sortablePanel testing', function () {

            it('sortablePanel is defined', function () {
                expect($scope.sortablePanel).toBeDefined();
            });

            it('sortablePanel containment is defined', function () {
                expect($scope.sortablePanel.containment).toBeDefined();
            });

            it('sortablePanel cursor is defined', function () {
                expect($scope.sortablePanel.cursor).toBeDefined();
            });


            it('sortablePanel containment is equal to parent', function () {
                expect($scope.sortablePanel.containment).toEqual("parent");
            });

            it('sortablePanel cursor is equal to move', function () {
                expect($scope.sortablePanel.cursor).toEqual("move");
            });


        });

        describe('addWidget testing', function () {

            it('addWidget is defined', function () {
                expect($scope.addWidget).toBeDefined();
            });

            it('addWidget function call testing ', function () {
                expect($scope.addWidget()).toBeFalsy();
                expect($scope.myVar).toBeFalsy();
            });

            it('addWidget function call with success response', function () {
                $scope.panel_ids = '0,1,2';
                $scope.widget_names = 'My Profile,My Money,My Company';
                $scope.addWidget();
            });


        });

        describe('setselectedValues testing', function () {

            it('setselectedValues is defined', function () {
                expect($scope.setselectedValues).toBeDefined();
            });


            it('panel_ids is defined', function () {
                expect($scope.panel_ids).not.toBeDefined();
            });

            it('widget_names is defined', function () {
                expect($scope.widget_names).not.toBeDefined();
            });


            it('addWidget function call testing', function () {

                var $index = 0,
                    section_items = sectionsResponse.data;

                $scope.setselectedValues(section_items.title, $index, section_items, section_items.directive);

                expect($scope.panel_ids).not.toBeDefined();
                expect($scope.widget_names).not.toBeDefined();

            });

        });



        describe('selectVacationClass function testing',function(){
            it('selectVacationClass is defined',function(){
                expect($scope.selectVacationClass).toBeDefined();
            });

            it('selectVacationClass function call',function(){
                var leaveType = {"earnCd":"RTF"};
                $scope.selectVacationClass(leaveType);
            });
        });

        describe('selectVacationText function testing',function(){
            it('selectVacationText is defined',function(){
                expect($scope.selectVacationText).toBeDefined();
            });

            it('selectVacationText function call',function(){
                var leaveType = {"leaveTypeDesc":"Active"};
                $scope.selectVacationText(leaveType);
            });

            it('selectVacationText function call with leaveType as undefined',function(){
                $scope.selectVacationText();
            });
        });

        describe('leaveHours function testing',function(){
            it('leaveHours is defined',function(){
                expect($scope.leaveHours).toBeDefined();
            });

            it('leaveHours function call',function(){
                var hours = 12;
                $scope.leaveHours(hours);
            });

            it('leaveHours function call with not a number',function(){
                var hours = 'a';
                $scope.leaveHours(hours);
            });
        });

        describe('requestTimeOff function testing',function(){
            it('requestTimeOff is defined',function(){
                expect($scope.requestTimeOff).toBeDefined();
            });

            it('requestTimeOff function call',function(){
                $scope.requestTimeOff();
            });
        });

        describe('holidayWidget function testing',function(){
            it('holidayWidget is defined',function(){
                expect($scope.loadHolidayWidget).toBeDefined();
            });

            it('holidayWidget function call',function(){
                $scope.loadHolidayWidget(appConfig.holidaySchedule);
            });
        });

        describe('$on event testing',function(){
            it('menuLoaded event testing with true', function () {
                var data = true;
                $rootScope.$broadcast('menuLoaded', data);
            });
        });
    });
}());*/
