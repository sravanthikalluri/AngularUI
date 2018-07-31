/**
 * Created by Krishnam Raju on 3/9/2017.
 */
trinetApp.controller('noticeLinkCtrl', ['$scope', 'gso','$timeout','SharedDataService',function ($scope,gso,$timeout,SharedDataService) {
    var Url =  companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + '/manage-company' + '/' + gso.getAppConfig().companyId + '/'+'notices';
    var rolesUrl = globalUrlConfig.globalBase+globalUrlConfig.resources.company+'/'+gso.getAppConfig().companyId + '/'+'roles?roleType=all';
   // var Url = "assets/data/manageEmp/notices.json";
    $scope.createNotice = false;
    $scope.editNotice = false;
    $scope.isNotices = true;
    $scope.filterData = [];
    $scope.getSelectedName = [];
    $scope.deleteItems =[];
    $scope.noticeFilterData = [];
    $scope.showText = true;
    $scope.disableAddFilter = true;
    $scope.setBoolean = false;
    $scope.showRolesStatus = false;
    $scope.selectRole = [{"count": 1}];
    $scope.isShowNoticesRole = SharedDataService.getAppSharedData().editNotices;
    $scope.prorityType = {
        "0": "High",
        "1": "Medium",
        "2": "Low"
    };
    /*getting Roles*/
    function getUserRoles() {
        gso.getCrudService().execute(constants.get,rolesUrl , null,
            function (response) {
              $scope.rolesData = response;
                $scope.rolesData.map(function (role) {
                    role.roleDesc = role.roleDesc+'-'+role.role;
                })
             },function (data) {
             $scope.errorAlert = data;
        });
    }

    function getNoticesArray(response){
        if(response.length > 0){
            response.map(function (resp) {
                    resp.status === 'A'  ? $scope.noticesPublishArray.push(resp) : $scope.noticesDraftArray.push(resp) ;
            });
         }
    }
    //Getting the trinet links notices data
    function getNoticeData() {
        $scope.noticesPublishArray =[];
        $scope.noticesDraftArray = [];
        gso.getCrudService().execute(constants.get,Url , null,
            function (response) {
                $scope.noticesHistory = response.history;
                getNoticesArray(response.current);
                getNoticesArray(response.future);
            },function (data) {
                $scope.errorAlert = data;
            });
    }
    $scope.getBodyParseValue = function(value){
       return  value.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };
    //createNew trinet links notices
    $scope.createNewNotice = function () {
        $scope.createNotice = true;
        $scope.isNotices = false;
        $scope.createObj ={};
        $scope.createObj.effectiveDate = new Date();
        $scope.currentDate = gso.getUtilService().filterToDayDate();
        $scope.createObj.endDate =  new Date(gso.getUtilService().getThirtyDates( $scope.createObj.effectiveDate));
        $scope.setDisable = $scope.createObj.effectiveDate;
    };

    // post service call
    $scope.addNewNotice = function(obj , value){
        obj.effectiveDate = gso.getUtilService().filterDate(obj.effectiveDate,'yyyy-MM-dd');
        obj.endDate = gso.getUtilService().filterDate(obj.endDate,'yyyy-MM-dd');
        obj.status = value;
        obj.filters = $scope.filterData;
        if(gso.getUtilService().checkCurrentFutureDate(obj.effectiveDate,obj.endDate)){
            $scope.setBoolean = true;
        }else {
            if (getUniqueObjects()) {
                gso.getCrudService().execute(constants.post, Url, obj,
                    function (response) {
                        $scope.errorAlert = response;
                        getNoticeData();
                        $scope.closeAlertMsg();
                    }, function (data) {
                        $scope.errorAlert = data;
                    });
                $scope.filterData = [];
                $scope.cancel();
            } else {
                $scope.showRolesStatus = true;
            }
        }
    };


    // Adding filter to the UI and creating filter array-object
    $scope.addFilter = function(obj){
        var newItemNo;
        if(obj && $scope.filterData.length === $scope.selectRole.length){
            newItemNo = $scope.selectRole.length+1;
            $scope.getSelectedName.push(obj);
            $scope.selectRole.push({'count': newItemNo});
        }else{
            $scope.disableAddFilter = true;
        }
    };

    function getUniqueObjects(){
        $scope.getArrayValues =[];
        $scope.filterData.filter(function (obj) {
            $scope.getArrayValues.push(Object.values(obj)[1]);
        });
        $scope.duplicateRoles  = $scope.getArrayValues.reduce(function(acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) {acc.push(el);} return acc;
        }, []);
        return ($scope.duplicateRoles.length === 0);
    }
    $scope.getFilterdValue = function(addRole,index){
        $scope.selectedRole = addRole.selectedRole.role;
        $scope.disableAddFilter = false;
        if($scope.filterData.length === 0){
            $scope.filterData.push({
                filterType:'R',
                filterValue:$scope.selectedRole
            });
        } else{
            if( $scope.filterData.length >= addRole.count ){
                $scope.filterData[index].filterValue = $scope.selectedRole;
            }else{
                $scope.filterData.push({
                    filterType:'R',
                    filterValue:$scope.selectedRole
                });
            }
        }

        $scope.showRolesStatus = !getUniqueObjects();
    };

    //Edit trinet links notices functionality
    $scope.editNoticeData = function (data,index) {
        $scope.editNotice = true;
        $scope.isNotices = false;
        $scope.selectRole =[];
        $scope.noticeFilterData = [];
        $scope.notices = angular.copy(data);
        $scope.notices.pointOfContact = data.pointOfContact;
        $scope.notices.priority =  data.priority.toString();
        $scope.notices.effectiveDate = new Date(gso.getUtilService().filterToServerDateTimeStamp($scope.notices.effectiveDate));
        $scope.notices.endDate = new Date(gso.getUtilService().filterToServerDateTimeStamp($scope.notices.endDate));
        $scope.disableDate = new Date();
        $scope.setDisable = new Date($scope.notices.effectiveDate);

        $scope.noticeFilterList = angular.copy($scope.notices.filters);
        if($scope.notices.filters.length !==0){
            $scope.notices.filters.map(function (val,index) {
                $scope.selectRole.push({"count": index+1,'selectedRole':getFilteredRoles(val)});
            });
            $scope.selectRole.push({"count": $scope.selectRole.length+1});
        }else{
            $scope.selectRole.push({"count": 1});
        }
    };

    function getFilteredRoles(val){
        val.filterValueDesc =  val.filterValueDesc +'-'+ val.filterValue;
        var rolesFilterValue = $scope.rolesData.filter(function(item){
            if(val.filterValue === item.role && val.filterValueDesc === item.roleDesc){
                $scope.filterData.push({'filterType':val.filterType,'filterValue':val.filterValue,'filterId':val.filterId});
                $scope.getSelectedName.push(val.filterValue);
            }
            return (val.filterValue === item.role && val.filterValueDesc === item.roleDesc);
        });
        return rolesFilterValue[0];
    }

    //formation of object for both put and post
    function getObjectData(list,value) {
        list.effectiveDate = gso.getUtilService().filterDate(list.effectiveDate,'yyyy-MM-dd');
        list.endDate= gso.getUtilService().filterDate(list.endDate,'yyyy-MM-dd');
        list.status = value;
        deletefilter();
        list.filters = $scope.filterData;
        return list;
    }

    function deletefilter(){
        $scope.deleteItems.map(function (list) {
            $scope.notices.filters.map(function (value) {
                if(list){
                    list.role === value.filterValue ? $scope.deleteFilterRoles($scope.notices,value.filterId) : angular.noop();
                }
            });
        });
    }

    //updating the data through put service call
    $scope.updateData = function(obj , value){
        var sendObject = getObjectData($scope.notices,value);
        if(gso.getUtilService().checkCurrentFutureDate(obj.effectiveDate,obj.endDate)){
            $scope.setBoolean = true;
        }else {
            if (getUniqueObjects()) {
                gso.getCrudService().execute(constants.put, Url + '/' + $scope.notices.noticeId, sendObject,
                    function (response) {
                        $scope.errorAlert = response;
                        $scope.editNotice = false;
                        getNoticeData();
                        $scope.closeAlertMsg();
                    }, function (data) {
                        $scope.errorAlert = data;
                    });
                $scope.cancel();
            } else {
                $scope.showRolesStatus = true;
            }
        }
    };


    $scope.removeSelect = function(item,index){
    /* var lastItem = $scope.selectRole.length-1;*/
         item ? $scope.deleteItems.push(item) : angular.noop();
         $scope.selectRole.splice(index,1);
         $scope.filterData.splice(index,1);
        if($scope.selectRole.length ===0){
            $scope.selectRole.push({"count": 1});
        }
        $scope.showRolesStatus = !getUniqueObjects();
    };

    // Delete filter that new added
    $scope.createDeleteFilter = function (item) {
        angular.forEach( $scope.createObj.filters,function (filter,index) {
            if(item.filterType === filter.filterType && item.filterValue === filter.filterValue){
                $scope.createObj.filters.splice(index,1);
                $scope.filterItemList.splice(index,1);
            }
        });
    };


    // create new notices date validation
    $scope.changeStartDate = function (startDate) {
        var effectiveDate = angular.copy(startDate);
        $scope.createObj.endDate =  new Date(gso.getUtilService().getThirtyDates(startDate));
        // $scope.createObj.endDate =  new Date(startDate.setDate(startDate.getDate()+30));
        $scope.setDisable =  effectiveDate;
        (effectiveDate > $scope.createObj.endDate)? $scope.setBoolean = true : $scope.setBoolean = false;
    };

    // edit notices date validation
    $scope.editStartDate = function (notices) {
        $scope.notices.effectiveDate = notices.effectiveDate;
        $scope.setDisable =  notices.effectiveDate;
        (notices.effectiveDate > notices.endDate)? $scope.setBoolean = true : $scope.setBoolean = false;
    };

    //Delete filter roles
    $scope.deleteFilterRoles = function(notice,filter){
        gso.getCrudService().execute(constants.remove,Url+'/'+notice.noticeId +'/filters/'+filter, null,
            function (response) {
                $scope.success =response;
            },function (data) {
                $scope.errorAlert = data;
            });
    };

    $scope.deleteSelectedRecord = function(notice){
        gso.getCrudService().execute(constants.remove,Url+'/'+notice.noticeId , null,
            function (response) {
                $scope.errorAlert =response;
                $scope.closeAlertMsg();
                getNoticeData();
            },function (data) {
                $scope.errorAlert = data;
            });
    };

    $scope.getDeleteStatus = function(deleteStatus){
        var getDate = gso.getUtilService().filterDate(deleteStatus,'yyyy-MM-dd');
        return gso.getUtilService().checkCurrentFutureDate(getDate,gso.getUtilService().filterToDayDate());
    };

    $scope.isValidForm = function (obj) {
        var boolValue= true;
        if(obj.effectiveDate && obj.endDate && obj.title && obj.body && obj.priority  && !$scope.setBoolean ) {
            boolValue = false;
        }
        return boolValue;
    };

    $scope.getPriority = function(key,item){
       if (key === item.priority.toString()){
            return true;
       }else{
            return false;
       }
    };
    $scope.closeAlert = function(){$scope.setBoolean = false;};

    $scope.closeAlertMsg = function(){
        $timeout(function(){
            $scope.errorAlert = null;
        },3000);
    };

    $scope.cancel = function () {
        $scope.createNotice = false;
        $scope.editNotice = false;
        $scope.isNotices = true;
        $scope.showRolesStatus = false;
        $scope.createObj ={};
        $scope.filterData = [];
        $scope.disableAddFilter = true;
        $scope.selectRole = [{"count": 1}];
        $scope.setBoolean = false;
        $scope.deleteItems =[];
        $scope.getSelectedName = [];
        $scope.noticeFilterData =[];
    };

    getNoticeData();
    getUserRoles();
    //getDepartmentItem();

}]);
