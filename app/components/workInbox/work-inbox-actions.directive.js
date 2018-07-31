'use strict';
trinetApp.directive('workInboxActions',
    function () {
        return {
            restrict: 'E',
            scope: {
                actions: "<",
                data : "<",
                type : "<",
                section : "<",
                selectedInnerTab : "<",
                checkout : "<",
                lrUrl : "<",
                error: '&',
                reInitialize: '&'
            },
            controller: function ($scope,gso) {
                $scope.approveText = 'approve';
                $scope.declineText = 'decline';
                $scope.approveMyOwnModelTitle = $scope.section === 'manager_assignments' ?  'Approve Manager Assignments' : 'Approve Employment Change Request';
                $scope.declainMyOwnModelTitle = $scope.section === 'manager_assignments' ?  'Decline Manager Assignments' : 'Decline Employment Change Request';
                $scope.approveMyOwnComment = '';
                $scope.positionId = gso.getAppConfig().positionId;
                $scope.companyId = gso.getAppConfig().companyId;
                $scope.lrUrl = '../' + $scope.lrUrl;
                $scope.sectionType = 'workInbox';

                /*To submit approval from user*/
                $scope.openApproveAndDeclineModal = function (userData, type) {
                    $scope.selectedType = type;
                    $scope.userData = userData;
                    $scope.approveMyOwnComment = '';
                    var dialog = gso.getNGDialog().open({
                        templateUrl: 'app/components/workInbox/approveAndDeclineView.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    });

                };

                $scope.getDetails = function(userData){
                    $scope.detailsData = null;
                    $scope.detailsHeaderData = {};
                    $scope.detailsHeaderNames = workInboxConstants.work_flow_details.headerNames;
                    var detailsUrl = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                        '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/details/'+userData.baseActionId;
                    gso.getCrudService().execute(constants.get, detailsUrl, null,
                        function (response) {
                            response.map(function(item){
                                var employeeId = item.employeeId ? ' ( ' + item.employeeId  + ' )' : '';
                                item.effectiveDate = item.effectiveDate ? gso.getUtilService().filterDate(item.effectiveDate,constants.dateFormatUS) : '';
                                item.dateEntered = item.dateEntered ? gso.getUtilService().filterDate(item.dateEntered,constants.dateFormatUS) : '';
                                item.lastAction = item.lastAction ? gso.getUtilService().filterDate(item.lastAction,constants.dateFormatUS) : '';
                                item.completedBy = item.completedBy === 'PS_SUBID' ? userData.initiatorName : item.completedBy;
                                $scope.detailsHeaderData.remarks = item.remarks;

                                $scope.detailsHeaderData.subjectName = (item.name == null ? '' : item.name) + employeeId;
                                $scope.detailsHeaderData.position = item.position;
                                $scope.detailsHeaderData.positionRelationId = item.positionRelationId;
                                $scope.detailsHeaderData.positionRelationName = item.positionRelationName;
                            });

                            $scope.detailsData = response;
                            $scope.process = userData.type;
                            var dialog = gso.getNGDialog().open({
                                templateUrl: 'app/components/workInbox/work-inbox-details.html',
                                className: 'ngdialog-theme-default workInboxDetailsModal',
                                scope: $scope,
                                closeByDocument: false,
                                closeByEscape: false
                            });
                        },
                        function (data) {
                            $scope.error({errorData : data});
                        }
                    );
                };

                $scope.approveMyOwnTask = function () {
                    var postData = {
                        "actionId": $scope.userData.actionId,
                        "baseActionId": $scope.userData.baseActionId,
                        "dateEntered": gso.getUtilService().filterDate(new Date($scope.userData.dateEntered),constants.dateFormat),
                        "approvalState": "F",
                        "initiorId": $scope.userData.subjectId,
                        "processId": $scope.userData.processId,
                        "worknotes": $scope.approveMyOwnComment
                    };
                    /*Approval submission to DB*/
                    var putUrl = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                        '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/items?type='+$scope.userData.groupingParam;
                    gso.getCrudService().execute(constants.put, putUrl, postData,
                        function (response) {
                            gso.getNGDialog().closeAll();
                            $scope.reInitialize({errorData : response,type:$scope.type});
                        },
                        function (data) {
                            gso.getNGDialog().closeAll();
                            $scope.error({errorData: data});
                        }
                    );


                };
                $scope.declineMyOwnTask = function () {
                    var postData = {
                        "actionId": $scope.userData.actionId,
                        "baseActionId": $scope.userData.baseActionId,
                        "dateEntered": gso.getUtilService().filterDate(new Date($scope.userData.dateEntered),constants.dateFormat),
                        "approvalState": "D",
                        "initiorId": $scope.userData.subjectId,
                        "processId": $scope.userData.processId,
                        "worknotes": $scope.approveMyOwnComment
                    };

                    var declineURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                        '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/items?type='+$scope.userData.groupingParam;
                    gso.getCrudService().execute(constants.put, declineURL, postData,
                        function (response) {
                            gso.getNGDialog().closeAll();
                            $scope.reInitialize({errorData : response,type:$scope.type});
                        },
                        function (data) {
                            $scope.error({errorData: data});

                        }
                    );

                };

                /*To open history modal*/
                $scope.openHistory = function (userData, $event) {

                    var $this = angular.element($event.currentTarget),
                        tr = $this.closest("tr"),
                        nextTr = tr.next();
                    if (!nextTr.hasClass('history')) {
                        var historyURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                            '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/history/' + userData.baseActionId + '/' + userData.processId;
                        gso.getCrudService().execute(constants.get, historyURL, null,
                            function (response) {
                                $scope.approvalHistory = response;
                                    tr.after(gso.getCompile()(' <tr class="history"> ' +
                                        ' <td colspan="6">' +
                                        '<div class="col-md-12 retirement-plan-enrolment" ng-if ="approvalHistory === 0" >' +
                                        '<div class="no-enrolment">' +
                                        '<h3>No History Found</h3>' +
                                        '</div></div>' +
                                        '<div class="timeline" >' +
                                        '<div class="time-line-adj">' +
                                        '<history-timeline type="sectionType" data="approvalHistory"></history-timeline>' +
                                        '<div class="clearfix">&nbsp;</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</td>' +
                                        '</tr>')($scope));

                            },
                            function (data) {
                                $scope.error({errorData: data});
                            }
                        );
                    } else {
                        nextTr.remove();
                    }
                };

                /*Assign to Me function to assign uer them selves*/
                $scope.assignToMe = function (userData) {
                    /*Assign to me submission to DB*/
                    var putUrl = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox +
                        '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/assignToMe/' + userData.actionId;
                    gso.getCrudService().execute(constants.put, putUrl, $scope.approvedObject,
                        function (response) {
                            $scope.reInitialize({errorData : response,type:'assignedToMe'});
                        },
                        function (data) {
                            $scope.error({errorData: data});
                        }
                    );

                };

                $scope.archiveTask = function (userData,type) {
                    $scope.yes_btn = type === 'archive' ? 'Yes, archive it' : 'Yes, delete it';
                    $scope.no_btn = 'Cancel';
                    $scope.confirmMessage = type === 'archive' ? 'This task will be removed from the list. Are you sure you want to archive this completed task?'
                                                               : 'Are you sure you want to delete this new hire entry?' ;

                    gso.getNGDialog().openConfirm({
                        template: 'app/shared/views/confirmAlert.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false
                    }).then(function () {
                        var archiveURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.inbox + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/items?actionId=' + userData.actionId;
                        gso.getCrudService().execute(constants.remove, archiveURL, null,
                            function (response) {
                                $scope.reInitialize({errorData : response,type:$scope.type});
                            },
                            function (data) {
                                $scope.error({errorData: data});
                            }
                        );
                    });
                };

                $scope.closeModal = function () {
                    gso.getNGDialog().closeAll();
                };

            },
            templateUrl: 'app/components/workInbox/work-inbox-actions.html'
        };
    });
