'use strict';
trinetApp.controller('workInboxCtrl', ['$scope', '$modal', 'gso',
    function ($scope, $modal, gso) {

        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };
        $scope.textboxhide = function () {
            $scope.searchbox = false;

        };

        $scope.selection = [];

        $scope.toggleSelector = function (data,sectionId) {
            $scope.selection[sectionId]  =  $scope.selection[sectionId] ? $scope.selection[sectionId] : [];
            var idx = $scope.selection[sectionId].indexOf(data);
            // is currently selected
            if (idx > -1) {
                $scope.selection[sectionId].splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selection[sectionId].push(data);
            }


            if($scope.selection[sectionId].length === 0){
                angular.forEach($scope.selectedInnerTabData.catagory,function(item,index){
                    if(item.id === sectionId){
                     $scope.selectedInboxData[index].data  = item.data;
                    }
                });

            }else{
              angular.forEach($scope.selectedInnerTabData.catagory,function(item,index){
                    if(item.id === sectionId){
                        $scope.selectedInboxData[index].data  = item.data.filter(function(filterData){
                             return $scope.selection[sectionId].indexOf(filterData.actorName) > -1 ;
                         });
                    }
                });

            }

        };



        $scope.setInnerTab = function (index) {
            $scope.workInbox.map(function (item,innerIndex) {
                item.isShow = (innerIndex === index ) ? true : false;
            });

            $scope.selectedInnerTabData = $scope.workInbox[index];
            $scope.selectedInnerTab = $scope.selectedInnerTabData.name;
            $scope.selectedInboxData =   angular.copy($scope.selectedInnerTabData.catagory);
        };


        $scope.resetData = function (index) {
            $scope.selectedInboxData.map(function (item,innerIndex){
                item.isShow = (innerIndex === index && !item.isShow ) ? true : false;
            });
        };

        $scope.resetWorkInboxInitData = function(){
            $scope.workInbox = null;
            $scope.selectedInboxData = null;
            $scope.errorAlert = null;
        };

        $scope.getTasksCount = function () {
            var countURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl  +
                companyUrlConfig.resources.inbox + '/' + gso.getAppConfig().companyId + '/' +
                gso.getAppConfig().userId + companyUrlConfig.resources.items + '?task=Count';

            gso.getCrudService().execute(constants.get, countURL, null,
                function (response) {
                    $scope.tabs.map(function(item){
                        item.count = (response && response[item.countKey]) ? response[item.countKey] : 0;
                    });
                }
            );
        };
        $scope.workInboxDataFn = function (type,isGetCount) {
            $scope.resetWorkInboxInitData();
            $scope.type = type;
            var URL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                      companyUrlConfig.resources.inbox + '/' + gso.getAppConfig().companyId + '/' +
                      gso.getAppConfig().userId + companyUrlConfig.resources.items + '?task=' + type;

            gso.getCrudService().execute(constants.get, URL, null,
                function (response) {
                if(response.workInbox){
                    response.workInbox.map(function(item,index){
                        item.isShow = index === 0 ? true : false;
                        item.catagory.map(function(categoryItem,categoryIndex){
                            categoryItem.isShow = false;
                            categoryItem['displayIndex'] = workInboxConstants['display_order'][categoryItem.id];
                            categoryItem['headerNames'] = workInboxConstants[$scope.type][categoryItem.id];

                            item.name === 'Tasks I have approved' ? (workInboxConstants[$scope.type][categoryItem.id]['actorName'] === 'Waiting For' ? workInboxConstants[$scope.type][categoryItem.id]['actorName'] = 'Completed By' : angular.noop())
                                                                    : angular.noop();
                            categoryItem.data.map(function(data){
                                data.effectiveDate ? data.effectiveDate = filterDateFormat(data.effectiveDate) : angular.noop();
                                data.dateEntered ? data.dateEntered = filterDateFormat(data.dateEntered) : angular.noop();
                                data.lastAction ? data.lastAction = filterDateFormat(data.lastAction) : angular.noop();
                                data.isCheckOut = (data.checkOut && data.checkOut === 'Y') ? true : false;
                                data['actions'] = workInboxConstants[$scope.type][categoryItem.id+'_actions'];
                            });

                            categoryItem['filterNames'] = ($scope.type === 'assignedToOthers') ?
                                categoryItem.data.map(function(item) {
                                    return item.actorName;
                                }).filter(function (el, i, arr) {
                                    return arr.indexOf(el) === i;
                                })
                                :angular.noop();

                        });

                        item.catagory.sort(function(currentItem, nextItem) {
                            return parseInt(currentItem.displayIndex,10) - parseInt(nextItem.displayIndex,10);
                        });

                    });
                    $scope.workInbox = response.workInbox;
                    $scope.selectedInboxData = ($scope.workInbox && $scope.workInbox.length > 0) ? $scope.workInbox[0].catagory : [];
                }else{
                    response.catagory.map(function(categoryItem,categoryIndex){
                        categoryItem.isShow = false;
                        categoryItem['displayIndex'] = workInboxConstants['display_order'][categoryItem.id];
                        categoryItem['headerNames'] = workInboxConstants[$scope.type][categoryItem.id];
                        categoryItem.data.map(function(data){
                            data.effectiveDate ? data.effectiveDate = filterDateFormat(data.effectiveDate) : angular.noop();
                            data.dateEntered ? data.dateEntered = filterDateFormat(data.dateEntered) : angular.noop();
                            data.lastAction ? data.lastAction = filterDateFormat(data.lastAction) : angular.noop();
                            data.isCheckOut = (data.checkOut && data.checkOut === 'Y') ? true : false;
                            data['actions'] = workInboxConstants[$scope.type][categoryItem.id+'_actions'];
                        });
                    });
                    response.catagory.sort(function(currentItem, nextItem) {
                        return parseInt(currentItem.displayIndex,10) - parseInt(nextItem.displayIndex,10);
                    });
                    $scope.workInbox = null;
                    $scope.selectedInboxData = response.catagory;
                }
                    if(isGetCount){
                        $scope.getTasksCount();
                    }


                },
                function (data) {
                     $scope.errorAlert = data;
                }
            );
        };
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };
        $scope.alertError = function(response){
           $scope.errorAlert = response;
        };

        function filterDateFormat(dateVal) {
            var dt = '';
            if (angular.isDefined(dateVal)) {
                dt = gso.getUtilService().filterDate(dateVal,constants.dateFormatUS);
            }
            return dt;
        }

        $scope.workInboxInitFn = function () {
             setMainTabsData();
             var switchUnAssignedItems= sessionStorage.getItem("unAssignedItems");
             var switchAssignManagerItems= sessionStorage.getItem("assignManager");
            if(switchUnAssignedItems && switchUnAssignedItems === 'true'){
                $scope.tabs.map(function (tab) {
                    tab.active = tab.key === 'UnAssigned';
                });
                $scope.workInboxDataFn('UnAssigned',true);
                sessionStorage.setItem("unAssignedItems",false);

            }else if(switchAssignManagerItems && switchAssignManagerItems === 'true'){
                $scope.tabs.map(function (tab) {
                    tab.active = tab.key === 'assignedToOthers';
                });
                $scope.workInboxDataFn('assignedToOthers',true);
                sessionStorage.setItem("assignManager",false);
            }else{
                $scope.workInboxDataFn('assignedToMe',true);
            }

        };

        $scope.workInboxInitFn();

        function setMainTabsData(){
            $scope.tabs = [
                {title: 'ASSIGNED TO ME', key: 'assignedToMe', active: true, count : 0,isShow: true,countKey : 'assignedToMeCount'},
                {title: 'ASSIGNED TO OTHERS', key: 'assignedToOthers', active: false,count : 0,isShow: false,countKey: 'assignedToOthersCount'},
                {title: 'UNASSIGNED TASKS', key: 'UnAssigned', active: false,count : 0,isShow: false,countKey : 'unassignedCount'},
                {title: 'COMPLETED TASKS', key: 'Completed', active: false,count : 0,isShow: true,countKey: 'completedTaskCount'}
            ];
        }

        function setMainTabsData(){
            $scope.tabs = [
                {title: 'ASSIGNED TO ME', key: 'assignedToMe', active: true, count : 0,isShow: true,countKey : 'assignedToMeCount'},
                {title: 'ASSIGNED TO OTHERS', key: 'assignedToOthers', active: false,count : 0,isShow: false,countKey: 'assignedToOthersCount'},
                {title: 'UNASSIGNED TASKS', key: 'UnAssigned', active: false,count : 0,isShow: false,countKey : 'unassignedCount'},
                {title: 'COMPLETED TASKS', key: 'Completed', active: false,count : 0,isShow: true,countKey: 'completedTaskCount'}
            ];
        }

        $scope.reInitializeWorkInbox = function(errorData,type){
            if(type === 'assignedToMe'){
                setMainTabsData();
            }

            $scope.workInboxDataFn(type,true);
            $scope.alertError(errorData);

        };


    }]);
