/**
 * Created by Santosh on 11/4/2015.
 */
'use strict';
describe('Work Inbox Controller Testing', function () {
    var $rootScope,
        $scope,
        appConfig,
        $httpBackend,
        sharedProperties,
        response = {
            "data": {
                "inbox_data": [{
                    "catagory": "Assigned to me",
                    "subcategory": "MyTasks",
                    "action": "Manager Assignments",
                    "dateEntered": "2015-12-23 00:00:00.0",
                    "lastAction": "2015-12-23 00:00:00.0",
                    "effectiveDate": "2015-12-24 00:00:00.0",
                    "completedBy": "Adlam,Brooks Helene",
                    "waitingFor": "1008968",
                    "subjectId": "00001000483",
                    "status": "Pending",
                    "actionId": "4545258",
                    "processId": "3",
                    "baseActionId": "4545257",
                    "actorName": "Adlam,Brooks Helene",
                    "initiatorName": "Adlam,Brooks Helene"
                }],
                "metadata": {
                    "assignedToMeCount": "3",
                    "mytaskCount": "3",
                    "proxyCount": "0"
                }
            },
            "_statusCode": "200",
            "_statusText": "OK"
        };


    beforeEach(function () {
        module('TrinetPassport');

        inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $httpBackend = $injector.get('$httpBackend');
            appConfig = $injector.get('appConfig');
            sharedProperties = $injector.get('sharedProperties');
            $injector.get('$controller')('workInboxCtrl', {
                $scope: $scope
            });

        });


        $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=assignedToMe')
            .respond(200, response);
        $scope.workInboxInitFn();


    });

    describe('getData function testing', function () {

        it('getData function is defined', function () {
            expect($scope.getData).toBeDefined();
        });

        it('getData function is called with assignedToMe and success response', function () {
            var tab = 'assignedToMe';
            var response = {
                "data": {
                    "inbox_data": [{
                        "catagory": "Assigned to me",
                        "subcategory": "MyTasks",
                        "action": "Manager Assignments",
                        "dateEntered": "2015-12-23 00:00:00.0",
                        "lastAction": "2015-12-23 00:00:00.0",
                        "effectiveDate": "2015-12-24 00:00:00.0",
                        "completedBy": "Adlam,Brooks Helene",
                        "waitingFor": "1008968",
                        "subjectId": "00001000483",
                        "status": "Pending",
                        "actionId": "4545258",
                        "processId": "3",
                        "baseActionId": "4545257",
                        "actorName": "Adlam,Brooks Helene",
                        "initiatorName": "Adlam,Brooks Helene"
                    }],
                    "metadata": {
                        "assignedToMeCount": "3",
                        "mytaskCount": "3",
                        "proxyCount": "0"
                    }
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(200, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('assignedToMe');
            expect($scope.innerType).toEqual('MyTasks');
            expect($scope.assignedToMeCount).toEqual('3');
            expect($scope.assignedToOthersCount).toEqual(0);
            expect($scope.unassignedCount).toEqual(0);
            expect($scope.completedTaskCount).toEqual(0);
            expect($scope.tabsData).toEqual(response.data.inbox_data);
            expect($scope.metadata).toEqual(response.data.metadata);
        });

        it('getData function is called with assignedToMe and failure response', function () {
            var tab = 'assignedToMe';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(400, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('assignedToMe');

        });

        it('getData function is called with Completed and success response', function () {
            var tab = 'Completed';
            var response = {
                "data": {
                    "inbox_data": [{
                        "catagory": "Assigned to me",
                        "subcategory": "MyTasks",
                        "action": "Manager Assignments",
                        "dateEntered": "2015-12-23 00:00:00.0",
                        "lastAction": "2015-12-23 00:00:00.0",
                        "effectiveDate": "2015-12-24 00:00:00.0",
                        "completedBy": "Adlam,Brooks Helene",
                        "waitingFor": "1008968",
                        "subjectId": "00001000483",
                        "status": "Pending",
                        "actionId": "4545258",
                        "processId": "3",
                        "baseActionId": "4545257",
                        "actorName": "Adlam,Brooks Helene",
                        "initiatorName": "Adlam,Brooks Helene"
                    }],
                    "metadata": {
                        "completedTaskCount": "3",
                        "mytaskCount": "3",
                        "proxyCount": "0"
                    }
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(200, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('Completed');

        });
        it('getData function is called with Completed and failure response', function () {
            var tab = 'Completed';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(400, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('Completed');

        });

        it('getData function is called with assignedToOthers and success response', function () {
            var tab = 'assignedToOthers';
            var response = {
                "data": {
                    "inbox_data": [{
                        "catagory": "Assigned to me",
                        "subcategory": "MyTasks",
                        "action": "Manager Assignments",
                        "dateEntered": "2015-12-23 00:00:00.0",
                        "lastAction": "2015-12-23 00:00:00.0",
                        "effectiveDate": "2015-12-24 00:00:00.0",
                        "completedBy": "Adlam,Brooks Helene",
                        "waitingFor": "1008968",
                        "subjectId": "00001000483",
                        "status": "Pending",
                        "actionId": "4545258",
                        "processId": "3",
                        "baseActionId": "4545257",
                        "actorName": "Adlam,Brooks Helene",
                        "initiatorName": "Adlam,Brooks Helene"
                    }],
                    "metadata": {
                        "assignedToOthersCount": "3",
                        "mytaskCount": "3",
                        "proxyCount": "0"
                    }
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(200, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('assignedToOthers');

        });

        it('getData function is called with assignedToOthers and failure response', function () {
            var tab = 'assignedToOthers';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(400, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('assignedToOthers');

        });

        it('getData function is called with UnAssigned and success response', function () {
            var tab = 'UnAssigned';
            var response = {
                "data": {
                    "inbox_data": [{
                        "catagory": "Assigned to me",
                        "subcategory": "MyTasks",
                        "action": "Manager Assignments",
                        "dateEntered": "2015-12-23 00:00:00.0",
                        "lastAction": "2015-12-23 00:00:00.0",
                        "effectiveDate": "2015-12-24 00:00:00.0",
                        "completedBy": "Adlam,Brooks Helene",
                        "waitingFor": "1008968",
                        "subjectId": "00001000483",
                        "status": "Pending",
                        "actionId": "4545258",
                        "processId": "3",
                        "baseActionId": "4545257",
                        "actorName": "Adlam,Brooks Helene",
                        "initiatorName": "Adlam,Brooks Helene"
                    }],
                    "metadata": {
                        "unassignedCount": "3",
                        "mytaskCount": "3",
                        "proxyCount": "0"
                    }
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(200, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('UnAssigned');

        });

        it('getData function is called with UnAssigned and failure response', function () {
            var tab = 'UnAssigned';
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };

            $httpBackend.whenGET(companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                    companyUrlConfig.resources.inbox + '/' + appConfig.companyId +
                    '/' + appConfig.userId + companyUrlConfig.resources.items + '?task=' + tab)
                .respond(400, response);

            $scope.getData(tab);
            $httpBackend.flush();
            expect($scope.type).toEqual('UnAssigned');

        });
    });

    describe('setInnerTab function testing', function () {

        it('setInnerTab function is defined', function () {
            expect($scope.setInnerTab).toBeDefined();
        });

        it('setInnerTab function is called', function () {
            var innerTab = 'assignedToMe';
            $scope.setInnerTab(innerTab);
        });
    });

    describe('updateStyling function', function () {

        it('updateStyling function is defined', function () {
            expect($scope.updateStyling).toBeDefined();
        });

        it('updateStyling function is called', function () {
            var e = {
                "currentTarget": ""
            };
            $scope.updateStyling(e);
        });
    });

    describe('openMyHistroryModal function', function () {

        it('openMyHistroryModal function is defined', function () {
            expect($scope.openMyHistroryModal).toBeDefined();
        });

        it('openMyHistroryModal function is called with success response', function () {
            var userData = {
                "baseActionId": "45235"
            };
            var indexId = '12345'
            var e = jQuery.Event("click");
            var historyURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                '/' + appConfig.companyId + '/' + appConfig.userId + '/history?actionId=' + userData.baseActionId;
            var response = {
                "data": {
                    "name": "abc"
                },
                "_statusCode": "200",
                "_statusText": "OK"
            };
            $httpBackend.whenGET(historyURL).respond(200, response);
            $scope.openMyHistroryModal(userData, indexId, e);
//            $httpBackend.flush();
            expect($scope.prevClik).toEqual(indexId);
            expect($scope.clikced).toEqual(indexId);
            expect($scope.showTimeline).toBeTruthy();
        });

        it('openMyHistroryModal function is called with failure response', function () {
            var userData = {
                "baseActionId": "45235"
            };
            var indexId = '12345'
            var e = jQuery.Event("click");
            var historyURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                '/' + appConfig.companyId + '/' + appConfig.userId + '/history?actionId=' + userData.baseActionId;
            var response = {
                _error: {message: 'Test', field: 'one'},
                _statusCode: "400"
            };
            $httpBackend.whenGET(historyURL).respond(400, response);
            $scope.openMyHistroryModal(userData, indexId, e);
            $httpBackend.flush();
            expect($scope.prevClik).toEqual(indexId);
            expect($scope.clikced).toEqual(indexId);
            expect($scope.showTimeline).toBeTruthy();
        });
    });

    describe('searchPos function testing', function () {

        it('searchPos function is defined', function () {
            expect($scope.searchPos).toBeDefined();
        });

        it('searchPos function is called', function () {
            var value = 1;
            $scope.searchPos(value);
            expect($scope.searchbox).toEqual(value);
        });
    });

    describe('textboxhide function testing', function () {

        it('textboxhide function is defined', function () {
            expect($scope.textboxhide).toBeDefined();
        });

        it('textboxhide is called', function () {
            $scope.textboxhide();
            expect($scope.searchbox).toBeFalsy();
        });
    });

    describe('toggleSelector function testing', function () {

        it('toggleSelector function is defined', function () {
            expect($scope.toggleSelector).toBeDefined();
        });

        it('toggleSelector is called', function () {
            var data = ["adam", "john", "adam", "eley"];
            $scope.toggleSelector(data);
        });
    });

    describe('deleteUnassignedTask function testing', function () {

        it('deleteUnassignedTask function is defined', function () {
            expect($scope.deleteUnassignedTask).toBeDefined();
        });

        it('deleteUnassignedTask function is called', function () {
            var userData = {
                "baseActionId": "45235"
            };
            $scope.deleteUnassignedTask(userData);
            expect($scope.yes_btn).toEqual('Yes, delete it');
            expect($scope.no_btn).toEqual('Cancel');
            expect($scope.confirmMessage).toEqual('Are you sure you want to delete this new hire entry?');
        });
    });

    describe('toggleSelection function testing', function () {

        it('toggleSelection function is defined', function () {
            expect($scope.toggleSelection).toBeDefined();
        });

        it('toggleSelection function is called with length = 0', function () {
            var item = {
                "actionId": "456245"
            };
            $scope.approved = [];
            $scope.toggleSelection(item);
        });

        it('toggleSelection function is called with length > 0', function () {
            var item = {
                "actionId": "456245"
            };
            $scope.approved = [1, 2, 3];
            $scope.toggleSelection(item);
        });
    });

    describe('checkFormat function testing', function () {

        it('checkFormat function is defined', function () {
            expect($scope.checkFormat).toBeDefined();
        });

        it('checkFormat function is called', function () {
            var dateVal = '24-DECEMBER-2015';
            $scope.checkFormat(dateVal);
        });
    });

    describe('workInboxInitFn function testing', function () {

        it('workInboxInitFn function is defined', function () {
            expect($scope.workInboxInitFn).toBeDefined();
        });

        it('workInboxInitFn function is called without string', function () {
            $scope.workInboxInitFn();
        });

        it('workInboxInitFn function is called with string', function () {
            var val = 'completedTasks';
            sharedProperties.setStringValue(val);
            $scope.workInboxInitFn();
        });
    });

    describe('archiveTask function testing', function () {

        it('archiveTask function is defined', function () {
            expect($scope.archiveTask).toBeDefined();
        });

        it('archiveTask function is called', function () {
            var userData = {
                "actionId": "456245"
            };
            var response = {"_statusCode": "200", "_statusText": "OK"};
            var archiveURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox + '/' + appConfig.companyId + '/' + appConfig.userId + '/items?actionId=' + userData.actionId;
            $httpBackend.when('DELETE', archiveURL).respond(200, response);
            $scope.archiveTask(userData);
            $httpBackend.flush();
            expect($scope.yes_btn).toEqual('Yes, archive it');
            expect($scope.no_btn).toEqual('Cancel');
            expect($scope.confirmMessage).toEqual('This task will be removed from the list. Are you sure you want to archive this completed task?');
        });
    });

    describe('assignToMe function testing', function () {

        it('assignToMe function is defined', function () {
            expect($scope.assignToMe).toBeDefined();
        });

        it('assignToMe function is called with success response', function () {
            var userData = {
                "actionId": "456245"
            };

            var data = [{
                "actionId": userData.actionId,

            }];
            var response = {"_statusCode": "200", "_statusText": "OK"};

            $httpBackend.when('PUT', companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                '/' + appConfig.companyId + '/' + appConfig.userId + '/assignToMe?actionId=' + userData.actionId+'&enableValidation=true', data).respond(200, response);
            $scope.assignToMe(userData);
            $httpBackend.flush();

        });

        it('assignToMe function is called with failure response', function () {
            var userData = {
                "actionId": "456245"
            };

            var data = [{
                "actionId": userData.actionId,

            }];
            var failureResponse = {
              "_statusCode": "400",
              "_statusText": "OK",
              "_error": {"detailMessage": "error"}
            };

            $httpBackend.when('PUT', companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                '/' + appConfig.companyId + '/' + appConfig.userId + '/assignToMe?actionId=' + userData.actionId+'&enableValidation=true', data).respond(400, failureResponse);
            $scope.assignToMe(userData);
            $httpBackend.flush();

        });
    });

    describe('openApproveAndDeclineModal function testing', function () {
        it('openApproveAndDeclineModal is defined', function () {
            expect($scope.openApproveAndDeclineModal).toBeDefined();
        });

        it('openApproveAndDeclineModal function call', function () {
            var userData = {
                "actionId": "456245",
                "processId": "3",
                "baseActionId": "4545257"
            };
            var type = "base";
            $scope.openApproveAndDeclineModal(userData, type);
        });
    });

    describe('closeModal function testing',function(){
        it('closeModal is defined',function(){
            expect($scope.closeModal).toBeDefined();
        });

        it('closeModal function call',function(){
            $scope.closeModal();
        });
    });

});