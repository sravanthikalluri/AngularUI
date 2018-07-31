/*

/!*Created by Naveen on 10/29/2015.*!/


(function () {

    "use strict";

    describe('Work Info Controller Testing', function () {

        var $rootScope,
            $scope,
            $httpBackend,
            appConfig,
            genericService,
            utilService,
            $filter,
            $timeout,
            details = {},
            stateResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            workInfoDataResponse = {
               "data": {
                   "activeWorkProfileList": [{
                         "employeeId": "00002072023",
                         "businessTitle": "General Partner",
                         "compensationBasis": "Annual",
                         "compensationRate": "100000",
                         "deptId": "Royalty - NY",
                         "effectiveDate": "2014-04-01",
                         "employeeStatus": "Active",
                         "employeeType": "Full Time",
                         "jobCode": "1.1 Exec/Sr. Lvl Offcls & Mgrs",
                         "locationId": "Remote NY",
                         "supervisorId": "Philip Jensen",
                         "serviceDate": "1998-04-01",
                         "standardHours": "40",
                         "regularTemporary": "Regular",
                         "workEmail": "Ddeweese@Paulcap.Com",
                         "workPhone": "646/264-1102",
                         "workSupervisor": " "
                     }, {
                        "employeeId": "00002072023",
                        "businessTitle": "General Partner",
                        "compensationBasis": "Annual",
                        "compensationRate": "100000",
                        "deptId": "Royalty - NY",
                        "effectiveDate": "2014-04-01",
                        "employeeStatus": "Active",
                        "employeeType": "Full Time",
                        "jobCode": "1.1 Exec/Sr. Lvl Offcls & Mgrs",
                        "locationId": "Remote NY",
                        "supervisorId": "Philip Jensen",
                        "serviceDate": "1998-04-01",
                        "standardHours": "40",
                        "regularTemporary": "Regular",
                        "workEmail": "Ddeweese@Paulcap.Com",
                        "workPhone": "646/264-1102",
                        "workSupervisor": " "
                    }]
               }, "_statusCode": "200", "_statusText": "OK"
           }
           ,
            promotionReasonsResponse = {"data": [], "_statusCode": "200", "_statusText": "OK"},
            demotionReasonsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            compensationtypesResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            jobRecReasonsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            flsaResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            locationsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            directManagerResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            departmentsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            jobsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            transferReasonsResponse = {
                "data": [],
                "_statusCode": "200",
                "_statusText": "OK"
            },
            avaliableOptionsResponse = {
                "chooseOptions": [{
                    "name": "All",
                    "value": "all"
                }]
            },
            displayChangehistoryRes = {"data": [], "_statusCode": "200", "_statusText": "OK"},
            res = {
                                "data": {
                                    "businessTitle": "anghj",
                                    "demotion": {"compBasis": "A", "compRate": "52500"},
                                    "departments": [{"deptId": "922FTL", "percentage": 30}, {
                                        "deptId": "922FTL",
                                        "percentage": 30
                                    }, {"deptId": "922FUADEPT", "percentage": 40}, {"deptId": "922FUADEPT", "percentage": 40}],
                                    "employeeTransfer": {"locationId": "0000000GIR"},
                                    "jobReclassification": {
                                        "jobId": "3013T2",
                                        "flsaStatus": "C",
                                        "temporaryInd": "Y",
                                        "employeeType": "P",
                                        "standardHours": "30"
                                    },
                                    "managerId": "2224515",
                                    "optionalGrouping": {"groupA": "testAdh", "groupB": "testBdh"},
                                    "payChange": {"compBasis": "A", "compRate": "52500"},
                                    "promotion": {"compBasis": "A", "compRate": "52500"},
                                    "workComp": {
                                        "jobDuties": "gfhfhfghjobhgfhfghdsfdsfsdf",
                                        "workCompCode": "8742",
                                        "workCompState": "CA"
                                    },
                                    "seniorityDate": "2019-01-22",
                                    "workPhone": "9876543569"
                                }, "_statusCode": "200", "_statusText": "OK"
                            };

        var vactionResponse = {
                                  "data": [
                                      {
                                          "effectiveDate": "2014-01-01",
                                          "planType": "51",
                                          "benefitPlanCode": "00149O",
                                          "planTypeDescription": "Full-Time EE PTO",
                                          "planTypeShortName": "FT PTO"
                                      }
                                  ],
                                  "_meta": {
                                      "lastRefreshTime": "2016-11-09 08:55:55",
                                      "fromCache": true
                                  },
                                  "_requestId": "85ab8a8b-4e00-49ef-993e-6301245dc328",
                                  "_statusCode": "200",
                                  "_statusText": "OK",
                                  "_statusMessage": "Success"
                              };
        var sickResponse = {
                               "data": [
                                   {
                                       "effectiveDate": "2015-01-01",
                                       "planType": "50",
                                       "benefitPlanCode": "001MZ1",
                                       "planTypeDescription": "Sick Time Policy",
                                       "planTypeShortName": "Sick"
                                   }
                               ],
                               "_meta": {
                                   "lastRefreshTime": "2016-11-09 08:55:55",
                                   "fromCache": true
                               },
                               "_requestId": "2bd38270-5e44-49e4-b474-9c16c16c2b53",
                               "_statusCode": "200",
                               "_statusText": "OK",
                               "_statusMessage": "Success"
                           };
        var performanceResponse = {
                                      "data": [
                                          {
                                              "effectiveDate": "2015-01-01",
                                              "planType": "50",
                                              "benefitPlanCode": "001MZ1",
                                              "planTypeDescription": "Sick Time Policy",
                                              "planTypeShortName": "Sick"
                                          }
                                      ],
                                      "_meta": {
                                          "lastRefreshTime": "2016-11-09 08:55:55",
                                          "fromCache": true
                                      },
                                      "_requestId": "2bd38270-5e44-49e4-b474-9c16c16c2b53",
                                      "_statusCode": "200",
                                      "_statusText": "OK",
                                      "_statusMessage": "Success"
                                  };

        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $scope.childParentAlertMsg = function (data) {
                    $scope.alert = data; // need to removed once new service implementation is done.
                    $scope.errorAlert = data;
                };
                $scope.appUserId = '00001000485';
                $injector.get('$controller')('workInfoCtrl', {
                    $scope: $scope,
                    $routeParams: {selectedTab: 'workinfo'}
                });
                $httpBackend = $injector.get('$httpBackend');
                genericService = $injector.get('genericService');
                utilService = $injector.get('utilService');
                appConfig = $injector.get('appConfig');
                $injector.get('ngDialog');
                $filter = $injector.get('$filter');
                $injector.get('$route');
                $injector.get('$routeParams');
                $timeout = $injector.get('$timeout');
            });

            if (typeof $scope.appUserId === 'undefined') {
                $scope.appUserId = appConfig.userId;
            }

            var appUserId = $scope.appUserId,
                companyId = appConfig.companyId;

            var date = new Date();
            var effectiveDate = new Date(date.setDate(date.getDate() + 1));
            effectiveDate = utilService.filterDate(new Date(effectiveDate), constants.dateFormat);

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                                appConfig.companyId + "/" + appConfig.userId + manageEmpUrlConfig.resources.empChange + effectiveDate).respond(200, res);

            $httpBackend
                .whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + appUserId + profileUrlConfig.resources.workprofile)
                .respond(200, workInfoDataResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.promotionReasons).respond(200, promotionReasonsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.demotionReasons).respond(200, demotionReasonsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global +
                    globalUrlConfig.resources.compensationTypes).respond(200, compensationtypesResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.payChangeReasons).respond(200, compensationtypesResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.jobRecReasons).respond(200, jobRecReasonsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global +
                    globalUrlConfig.resources.flsa).respond(200, flsaResponse);

            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.locations).respond(200, locationsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + globalUrlConfig.resources.directManager).respond(200, directManagerResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + profileUrlConfig.resources.departments).respond(200, departmentsResponse);


            $httpBackend
                .whenGET(profileUrlConfig.profileApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + profileUrlConfig.resources.jobs).respond(200, jobsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + globalUrlConfig.resources.transferReasons).respond(200, transferReasonsResponse);


            $httpBackend
                .whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.global +
                    globalUrlConfig.resources.countries + "/" + appConfig.countryCode + globalUrlConfig.resources.states + "/" + appConfig.stateCode).respond(200, stateResponse);


            $httpBackend
                .whenGET('assets/data/global/chooseOption.json').respond(200, avaliableOptionsResponse);


            genericService.chooseOption();

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.displaychangehistory).respond(200, displayChangehistoryRes);

            var effDate = new Date();
            effDate = new Date(effDate.setDate(effDate.getDate() + 1));
            var effectivDate = $filter('date')(new Date(effDate), constants.dateFormat);

            $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                                appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.empChange + effectivDate).respond(200, res);

            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                 appConfig.companyId + "/leave-plans?leave=vacation&employeeId="+ $scope.appUserId).respond(200,vactionResponse);

            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                 appConfig.companyId + "/leave-plans?leave=sick&employeeId="+ $scope.appUserId).respond(200,sickResponse);

            $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                                 appConfig.companyId + "/performance-mgmt-job-codes").respond(200,performanceResponse);

            $httpBackend.flush();

            $timeout.flush();

        });

        describe('selectedObject function testing', function () {

            it('selectedObject is defined', function () {
                expect($scope.selectedObject).toBeDefined();
            });

            it('selectedObject function with effectiveDate', function () {
                $scope.workInfoData = [{
                    effectiveDate: '2001-11-01'
                }];
                $scope.displayChangehistorydata = [{effectiveDate: new Date()}];
                $scope.selectedObject(details);
                expect($scope.details).toBeDefined();
                expect($scope.details).toEqual(details);
            });

            it('selectedObject function with effectiveDate undefined', function () {
                $scope.workInfoData = [{
                    effectiveDate: undefined
                }];
                $scope.selectedObject(details);
            });

        });

        describe('removeRow function testing', function () {

            it('removeRow is defined', function () {
                expect($scope.removeRow).toBeDefined();
            });
            it('removeRow function call', function () {
                $scope.employmentChangeData.departments = [{
                    id: 1
                }, {
                    id: 2
                }];
                $scope.removeRow(1, '100');
                expect($scope.employmentChangeData.departments.length).toEqual(1);
                expect($scope.empTransferTotalpercent).toEqual(0);
                expect($scope.jobReclassificationTotalpercent).toEqual(0);

            });


        });

        describe('toggleTimeline function testing', function () {

            it('toggleTimeline is defined', function () {
                expect($scope.toggleTimeline).toBeDefined();
            });

            it('toggleTimeline function call', function () {

                expect($scope.showTimeline).toBeTruthy();

                $scope.toggleTimeline();

                expect($scope.showTimeline).toBeFalsy();

            });

        });



        describe('onWorkLocationChange function testing', function () {

            it('onWorkLocationChange is defined', function () {
                expect($scope.onWorkLocationChange).toBeDefined();
            });

            it('onWorkLocationChange function call', function () {

                expect($scope.workerComop).not.toBeDefined();

                $scope.onWorkLocationChange();

                expect($scope.workerComop).toBeTruthy();
            });

        });

        describe('totalOfPercentageJobReclassificationAfter function testing', function () {

            it('totalOfPercentageJobReclassificationAfter is defined', function () {
                expect($scope.totalOfPercentageJobReclassificationAfter).toBeDefined();
            });

            it('totalOfPercentageJobReclassificationAfter function call', function () {

                var totalpercentage = 200;
                $scope.totalOfPercentageJobReclassificationAfter(totalpercentage);

            });

        });

        describe('totalOfPercentageJobReclassificationAfter function testing', function () {

            it('totalOfPercentageJobReclassificationAfter is defined', function () {
                expect($scope.totalOfPercentageJobReclassificationAfter).toBeDefined();
            });

            it('totalOfPercentageJobReclassificationAfter function call', function () {

                var totalpercentage = 20;

                var jobReclassificationTotalpercent = $scope.jobReclassificationTotalpercent,
                    totPer = jobReclassificationTotalpercent += parseInt(totalpercentage, 10);

                $scope.totalOfPercentageJobReclassificationAfter(totalpercentage);

                expect($scope.jobReclassificationTotalpercent).toEqual(totPer);

                if ($scope.jobReclassificationTotalpercent > 100) {
                    expect($scope.alert).toEqual([{
                        type: constants.warning,
                        msg: 'total should be less than or equal to 100'
                    }]);
                }
            });

        });

        describe('totalOfPercentageJobReclassificationBefore function testing', function () {

            it('totalOfPercentageJobReclassificationBefore is defined', function () {
                expect($scope.totalOfPercentageJobReclassificationBefore).toBeDefined();
            });

            it('totalOfPercentageJobReclassificationBefore function call with totalpercentage as defined', function () {

                var totalpercentage = 20;

                var jobReclassificationTotalpercent = $scope.jobReclassificationTotalpercent,
                    totPer = jobReclassificationTotalpercent -= parseInt(totalpercentage, 10);

                $scope.totalOfPercentageJobReclassificationBefore(totalpercentage);

                expect($scope.jobReclassificationTotalpercent).toEqual(totPer);


            });

            it('totalOfPercentageJobReclassificationBefore function call with totalpercentage as undefined', function () {

                var totalpercentage;
                $scope.totalOfPercentageJobReclassificationBefore(totalpercentage);

            });

        });

        describe('totalOfPercentageEmpTransferAfter function testing', function () {

            it('totalOfPercentageEmpTransferAfter is defined', function () {
                expect($scope.totalOfPercentageEmpTransferAfter).toBeDefined();
            });

            it('totalOfPercentageEmpTransferAfter function call', function () {

                var totalpercentage = 200;
                $scope.totalOfPercentageEmpTransferAfter(totalpercentage);
            });

        });

        describe('totalOfPercentageEmpTransferBefore function testing', function () {

            it('totalOfPercentageEmpTransferBefore is defined', function () {
                expect($scope.totalOfPercentageEmpTransferBefore).toBeDefined();
            });

            it('totalOfPercentageEmpTransferBefore function call with totalpercentage as defined', function () {

                var totalpercentage = 20;

                var empTransferTotalpercent = $scope.empTransferTotalpercent,
                    totPer = empTransferTotalpercent -= parseInt(totalpercentage, 10);

                $scope.totalOfPercentageEmpTransferBefore(totalpercentage);

                expect($scope.empTransferTotalpercent).toEqual(totPer);


            });

            it('totalOfPercentageEmpTransferBefore function call with totalpercentage as undefined', function () {

                var totalpercentage;
                $scope.totalOfPercentageEmpTransferBefore(totalpercentage);

            });

        });

        describe('maximumRange function testing', function () {

            it('Should maximumRange defined', function () {
                expect($scope.maximumRange).toBeDefined();
            });

            it('maximumRange function call', function () {

                var num = 200,
                    percentage = 40;

                expect($scope.num).toEqual(0);
                expect($scope.percentchangeindex).not.toBeDefined();

                $scope.maximumRange(num, percentage);


                expect($scope.num).toEqual(num);
                expect($scope.percentchangeindex).toEqual(percentage);


            });

            it('Should test maximumRange function ', function () {

                var num = undefined,
                    percentage = 0;

                $scope.empChangeData = {
                    "departments": [{
                        "percentage": 0
                    }]
                };

                $scope.maximumRange(num, percentage);


                expect($scope.num).toEqual(num);
                expect($scope.percentchangeindex).toEqual(percentage);

                expect($scope.empChangeData.departments[$scope.percentchangeindex].percentage).toEqual(0);

            });

        });

        describe('addRow function testing', function () {

            it('addRow is defined', function () {
                expect($scope.addRow).toBeDefined();
            });

            it('addRow function call', function () {

                var len = $scope.employmentChangeData.departments.length;


                $scope.addRow();

                if ($scope.counter < 12) {
                    expect($scope.employmentChangeData.departments.length).toEqual(len + 1);
                } else {
                    expect($scope.employmentChangeData.departments.length).toEqual(len)
                }

            });

        });

        describe('effectiveDateselectAlert function testing', function () {

            it('effectiveDateselectAlert is defined', function () {
                expect($scope.effectiveDateselectAlert).toBeDefined();
            });

            it('effectiveDateselectAlert function call', function () {

                var effectiveDate = '';

                $scope.effectiveDateselectAlert(effectiveDate);


            });


        });

        describe('deSelectAll function testing', function () {

            it('deSelectAll is defined', function () {
                expect($scope.deSelectAll).toBeDefined();
            });

            it('deSelectAll function call', function () {

                $scope.first1 = true;


                $scope.deSelectAll();

                expect($scope.first2).toBeFalsy();
                expect($scope.first3).toBeFalsy();
                expect($scope.first).toBeFalsy();
                expect($scope.second).toBeFalsy();
                expect($scope.third).toBeFalsy();
                expect($scope.first4).toBeFalsy();
                expect($scope.EmployeeTransfer).toBeFalsy();
                expect($scope.JobReclassification).toBeFalsy();
                expect($scope.Promotion).toBeFalsy();
                expect($scope.OptionalGroupings).toBeFalsy();
                expect($scope.EmployeePayChange).toBeFalsy();
                expect($scope.Demotion).toBeFalsy();


            });

        });

        describe('changeEmployeeDetails function testing', function () {

            it('changeEmployeeDetails is defined', function () {
                expect($scope.changeEmployeeDetails).toBeDefined();
            });

            /!*it('changeEmployeeDetails function call with transfer details', function () {

                $scope.EmployeeTransfer = true;
                $scope.employmentChangeData = {"employeeTransfer": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with jobreclassification details', function () {

                $scope.JobReclassification = true;
                $scope.employmentChangeData = {"jobReclassification": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with promotion details', function () {

                $scope.Promotion = true;
                $scope.employmentChangeData = {"promotion": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with demotion details', function () {

                $scope.Demotion = true;
                $scope.employmentChangeData = {"demotion": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with employeePayChange  details', function () {

                $scope.EmployeePayChange = true;
                $scope.employmentChangeData = {"payChange": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with transfer details and managerId', function () {

                $scope.EmployeeTransfer = true;
                $scope.employmentChangeData = {"employeeTransfer": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with jobReclassification details and managerId', function () {

                $scope.JobReclassification = true;
                $scope.employmentChangeData = {"jobReclassification": {}};

                $scope.changeEmployeeDetails(new Date());
            });

            it('changeEmployeeDetails function call with demotion details and managerId', function () {

                $scope.Demotion = true;
                $scope.employmentChangeData = {"demotion": {}};

                $scope.changeEmployeeDetails(new Date());
            });*!/

            it('changeEmployeeDetails $scope.employmentChangeWorkerComp = {} function call', function () {
                var formName = {$valid:true};
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with businessTitleChange as true with success response', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {"workComp": {"workCompCode": "AL", "workCompState": ""}};
                $scope.businessTitleChange = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.employmentChangeData.businessTitle = 'SrManager';
                $scope.employmentChangeData.workPhone = '222-333-1111';
                $scope.employmentChangeData.seniorityDate = '2016-07-30';
                $scope.effdate = '2016-07-28';
                var workCompState =  $scope.employmentChangeData.workComp.workCompState;
                if (workCompState === undefined || workCompState === "") {
                    workCompState = appConfig.stateCode;
                }
                var successResponse = {"_statusCode": "200", "_statusText": "OK"};
                var data = {businessTitle: 'SrManager', workPhone: '222-333-1111', workComp:null, seniorityDate: utilService.filterDate(new Date($scope.employmentChangeData.seniorityDate), constants.dateFormat), effectiveDate: $scope.effdate, employeeId: $scope.appUserId};
                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                        manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/"
                                        + $scope.appUserId + manageEmpUrlConfig.resources.jobs+'?enableValidation=true', data).respond(200,successResponse);
                $scope.changeEmployeeDetails(formName);
                $httpBackend.flush();

            });

            it('changeEmployeeDetails with businessTitleChange as true with failure response', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {"workComp": {"workCompCode": "AL", "workCompState": ""}};
                $scope.businessTitleChange = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.employmentChangeData.businessTitle = 'SrManager';
                $scope.employmentChangeData.workPhone = '222-333-1111';
                $scope.employmentChangeData.seniorityDate = '2016-07-30';
                $scope.effdate = '2016-07-28';

                var workCompState =  $scope.employmentChangeData.workComp.workCompState;
                if (workCompState === undefined || workCompState === "") {
                    workCompState = appConfig.stateCode;
                }

                 var failureResponse = {
                                          "data": {},
                                          "_statusCode": "400",
                                          "_statusText": "OK",
                                          "_error": {"detailMessage": "error"}
                                      };
                var data = {businessTitle: 'SrManager', workPhone: '222-333-1111', workComp:null, seniorityDate: utilService.filterDate(new Date($scope.employmentChangeData.seniorityDate), constants.dateFormat), effectiveDate: $scope.effdate, employeeId: $scope.appUserId};
                $httpBackend.when('PUT',manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                                        manageEmpUrlConfig.resources.employee + "/" + appConfig.companyId + "/"
                                        + $scope.appUserId + manageEmpUrlConfig.resources.jobs+'?enableValidation=true', data).respond(400,failureResponse);
                $scope.changeEmployeeDetails(formName);
                $httpBackend.flush();
            });

            it('changeEmployeeDetails with $scope.EmployeeTransfer as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "employeeTransfer": {"reasonId": "123"}
                };
                $scope.EmployeeTransfer = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with $scope.JobReclassification as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "jobReclassification": {"reasonId": "123","temporaryInd":"Y","variableHour":"N"}
                };
                $scope.JobReclassification = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with $scope.Demotion as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "demotion": {"reasonId": "123"},
                    "payChange":{"compBasis":"A","compRate":"100"}
                };
                $scope.Demotion = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with $scope.Promotion as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "demotion": {"reasonId": "123"},
                    "payChange":{"compBasis":"A","compRate":"100"}
                };
                $scope.Promotion = false;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with $scope.EmployeePayChange as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "demotion": {"reasonId": "123"}
                };
                $scope.EmployeePayChange = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails with $scope.OptionalGroupings as true', function () {
                var formName = {$valid:true};
                $scope.employmentChangeData = {
                    "workComp": {"workCompCode": "AL", "workCompState": ""},
                    "demotion": {"reasonId": "123"}
                };
                $scope.OptionalGroupings = true;
                $scope.employmentChangeWorkerComp = {};
                $scope.changeEmployeeDetails(formName);
            });

            it('changeEmployeeDetails function call with form valid as false', function () {
                var formName = {$valid:false};
                $scope.changeEmployeeDetails(formName);
            });
        });

        describe('fillEmployeeChangeData function testing', function () {


            it('testing when effective date is less than current date', function () {
                var effectiveDate = '2001-11-01';
                $scope.fillEmployeeChangeData(effectiveDate);

            });

            it('testing when effective date is greater than current date', function () {
                var effectiveDate = $filter('date')(new Date(), constants.dateFormat);
                var res = {
                    "data": {
                        "businessTitle": "anghj",
                        "demotion": {"compBasis": "A", "compRate": "52500"},
                        "departments": [{"deptId": "922FTL", "percentage": 30}, {
                            "deptId": "922FTL",
                            "percentage": 30
                        }, {"deptId": "922FUADEPT", "percentage": 40}, {"deptId": "922FUADEPT", "percentage": 40}],
                        "employeeTransfer": {"locationId": "0000000GIR"},
                        "jobReclassification": {
                            "jobId": "3013T2",
                            "flsaStatus": "C",
                            "temporaryInd": "Y",
                            "employeeType": "P",
                            "standardHours": "30"
                        },
                        "managerId": "2224515",
                        "optionalGrouping": {"groupA": "testAdh", "groupB": "testBdh"},
                        "payChange": {"compBasis": "A", "compRate": "52500"},
                        "promotion": {"compBasis": "A", "compRate": "52500"},
                        "workComp": {
                            "jobDuties": "gfhfhfghjobhgfhfghdsfdsfsdf",
                            "workCompCode": "8742",
                            "workCompState": "CA"
                        },
                        "seniorityDate": "2019-01-22",
                        "workPhone": "9876543569"
                    }, "_statusCode": "200", "_statusText": "OK"
                };
                $scope.employmentChangeData = {};
                $scope.employmentChangeData.workComp = {"workCompCode": "AL", "workCompState": ""};
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                    appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.empChange + effectiveDate).respond(200, res);


                $scope.fillEmployeeChangeData(effectiveDate);
                $httpBackend.flush();

            });
            it('testing when effective date is greater than current date and data = 0', function () {
                var effectiveDate = $filter('date')(new Date(), constants.dateFormat);
                $scope.employmentChangeData = {};
                $scope.employmentChangeData.workComp = {"workCompCode": "AL", "workCompState": ""};
                var response = {
                                                   "data": {
                                                       "businessTitle": "anghj",
                                                       "demotion": {"compBasis": "A", "compRate": "52500"},
                                                       "departments": [{"deptId": "922FTL", "percentage": 30}, {
                                                           "deptId": "922FTL",
                                                           "percentage": 30
                                                       }, {"deptId": "922FUADEPT", "percentage": 40}, {"deptId": "922FUADEPT", "percentage": 40}],
                                                       "employeeTransfer": {"locationId": "0000000GIR"},
                                                       "jobReclassification": {
                                                           "jobId": "3013T2",
                                                           "flsaStatus": "C",
                                                           "temporaryInd": "Y",
                                                           "employeeType": "P",
                                                           "standardHours": "30"
                                                       },
                                                       "managerId": "2224515",
                                                       "optionalGrouping": {"groupA": "testAdh", "groupB": "testBdh"},
                                                       "payChange": {"compBasis": "A", "compRate": "52500"},
                                                       "promotion": {"compBasis": "A", "compRate": "52500"},
                                                       "workComp": {
                                                           "jobDuties": "gfhfhfghjobhgfhfghdsfdsfsdf",
                                                           "workCompCode": "8742",
                                                           "workCompState": "CA"
                                                       },
                                                       "seniorityDate": "2019-01-22",
                                                       "workPhone": "9876543569"
                                                   }, "_statusCode": "200", "_statusText": "OK"
                                               };
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                    appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.empChange + effectiveDate).respond(200, response);


                $scope.fillEmployeeChangeData(effectiveDate);
                $httpBackend.flush();

            });

            it('testing when effective date is greater than current date and failure response', function () {
                var effectiveDate = $filter('date')(new Date(), constants.dateFormat);
                $scope.employmentChangeData = {};
                $scope.employmentChangeData.workComp = {"workCompCode": "AL", "workCompState": ""};
                var response = {
                    "data": [],
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                };
                $httpBackend.whenGET(manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.employee + "/" +
                    appConfig.companyId + "/" + $scope.appUserId + manageEmpUrlConfig.resources.empChange + effectiveDate).respond(400, response);


                $scope.fillEmployeeChangeData(effectiveDate);
                $httpBackend.flush();

            });


        });

        describe("selecteddate function testing ", function () {
            it('selecteddate is defined ', function () {
                expect($scope.selecteddate).toBeDefined();
            });

            it('selecteddate function call ', function () {
                var viewdate = "current";
                $scope.selecteddate(viewdate);
            });

            it('selecteddate function call ', function () {
                var viewdate = "2012-10-01";
                $scope.selecteddate(viewdate);
            });
        });

        describe("employeeChangeRequest function testing ", function () {
            it('employeeChangeRequest is defined ', function () {
                expect($scope.employeeChangeRequest).toBeDefined();
            });

            it('employeeChangeRequest function call ', function () {
                $scope.employeeChangeRequest();
            });
        });

        describe("employeeGenerateForm function testing ", function () {
            it('employeeGenerateForm is defined ', function () {
                expect($scope.employeeGenerateForm).toBeDefined();
            });

            it('employeeGenerateForm function call ', function () {
                $scope.employeeGenerateForm();
            });
        });

        describe("closePanel function testing ", function () {
            it('closePanel is defined ', function () {
                expect($scope.closePanel).toBeDefined();
            });

            it('closePanel function call ', function () {
                $scope.closePanel();
            });
        });

        describe('init function testing', function () {

            it('init is defined', function () {
                expect($scope.init).toBeDefined();
            });

            it('init function is called with success response', function () {

                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId +
                    profileUrlConfig.resources.workprofile).respond(200, workInfoDataResponse);

                $scope.init();
                $httpBackend.flush();
            });

            it('init function is called with success response and data > 1', function () {
                var workInfoResponse = {
                    "data": {
                        "activeWorkProfileList": [{
                            "businessTitle": "Software Application Developer",
                            "compensationBasis": "Annual",
                            "compensationRate": "139000",
                            "department": "Information Systems",
                            "effectiveDate": "2012-10-01",
                            "employeeStatus": "Active",
                            "employeeType": "Part Time",
                            "job": "Administrator",
                            "location": "Remote CA1",
                            "reportsTo": "Everett Alu",
                            "serviceDate": "2004-01-01",
                            "standardHours": "29",
                            "temporaryIndicator": "Regular",
                            "workEmail": "employee@31T.com",
                            "workPhone": null
                        },
                            {
                                "businessTitle": "Software Application Developer",
                                "compensationBasis": "Annual",
                                "compensationRate": "139000",
                                "department": "Information Systems",
                                "effectiveDate": "2012-10-01",
                                "employeeStatus": "Active",
                                "employeeType": "Part Time",
                                "job": "Administrator",
                                "location": "Remote CA1",
                                "reportsTo": "Everett Alu",
                                "serviceDate": "2004-01-01",
                                "standardHours": "29",
                                "temporaryIndicator": "Regular",
                                "workEmail": "employee@31T.com",
                                "workPhone": null
                            }]
                    }, "_statusCode": "200", "_statusText": "OK"
                }
                $httpBackend.whenGET(profileUrlConfig.profileApi + profileUrlConfig.profileBase +
                    appConfig.companyId + '/' + appConfig.userId +
                    profileUrlConfig.resources.workprofile).respond(200, workInfoResponse);

                $scope.init();
                $httpBackend.flush();
            });
        });

        describe('worksCompService function testing', function () {
            it('worksCompService is defined', function () {
                expect($scope.worksCompService).toBeDefined();
            });

            it('worksCompService function call with success response', function () {
                $scope.workState = 'AZ';
                var worksCompResponse = {
                    "data": [{
                        "key": "8742",
                        "value": "SALESPERSONS OR COLLECTORS OS"
                    }, {"key": "8810", "value": "CLERICAL OFFICE EMPS"}], "_statusCode": "200", "_statusText": "OK"
                };
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + $scope.workState + globalUrlConfig.resources.workersCompLookUp).respond(200, worksCompResponse);
                $scope.worksCompService();
                $httpBackend.flush();
            });

            it('worksCompService function call with success response and data as 0', function () {
                $scope.workState = 'AZ';
                var worksCompResponse = {"data": [], "_statusCode": "200", "_statusText": "OK"};
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + $scope.workState + globalUrlConfig.resources.workersCompLookUp).respond(200, worksCompResponse);
                $scope.worksCompService();
                $httpBackend.flush();
            });

            it('worksCompService function call with failure response', function () {
                $scope.workState = 'AZ';
                var worksCompResponse = {
                    "data": [],
                    "_statusCode": "400",
                    "_statusText": "OK",
                    "_error": {"detailMessage": "error"}
                };
                $httpBackend.whenGET(globalUrlConfig.globalApi + globalUrlConfig.globalBase + globalUrlConfig.resources.company + "/" +
                    appConfig.companyId + "/" + $scope.workState + globalUrlConfig.resources.workersCompLookUp).respond(400, worksCompResponse);
                $scope.worksCompService();
                $httpBackend.flush();
            });
        });

        describe('changeLabel function testing',function(){
            it('changeLabel is defined',function(){
                expect($scope.changeLabel).toBeDefined();
            });

            it('changeLabel function call with true',function(){
                $scope.translation= {};
                $scope.translation.work_info= {};
                $scope.translation.work_info.change_details = 'change';
                $scope.employeeChangeRequestPopUpButton = true;
                $scope.changeLabel();
            });

            it('changeLabel function call with false',function(){
                $scope.translation= {};
                $scope.translation.work_info= {};
                $scope.translation.work_info.change_details = 'change';
                $scope.employeeChangeRequestPopUpButton = false;
                $scope.changeLabel();
            });
        });

        describe('employeeRequestFormbutton function testing',function(){
            it('employeeRequestFormbutton is defined',function(){
                expect($scope.employeeRequestFormbutton).toBeDefined();
            });

            it('employeeRequestFormbutton function call testing',function(){
                $scope.employeeRequestFormbutton();
            });
        });

        describe('closeAlert function testing',function(){
            it('closeAlert is defined',function(){
                expect($scope.closeAlert).toBeDefined();
            });

            it('closeAlert function call',function(){
                $scope.closeAlert();
            });
        });

        describe('departmentTotal function testing',function(){
            it('departmentTotal is defined',function(){
                expect($scope.departmentTotal).toBeDefined();
            });

            it('departmentTotal function call',function(){
                $scope.employmentChangeData.departments = [{deptId: '1045623', percentage: '10'}];
                $scope.departmentTotal();
            });
        });

        describe('clearPercentValue function testing',function(){
            it('clearPercentValue is defined',function(){
                expect($scope.clearPercentValue).toBeDefined();
            });

            it('clearPercentValue function call',function(){
                var value = {deptId: '1045623', percentage: 0};
                $scope.clearPercentValue(value);
            });
        });

    });


}());
*/
