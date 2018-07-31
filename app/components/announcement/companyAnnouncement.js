trinetApp.controller('companyAnnouncementCtrl', ['$scope', 'gso','$timeout',function ($scope,gso,$timeout) {
    var Url =  companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + '/manage-company' + '/' + gso.getAppConfig().companyId + '/'+'announcements';
    $scope.createNewAnnouncement = false;
    $scope.editAnnouncementItem = false;
    $scope.filterData = '';
    $scope.showText = true;
    $scope.itemsDeleteFilter =[];
    $scope.showErrorMsg = false;
    //Getting the announcement data
    function getAnnouncementData() {
        gso.getCrudService().execute(constants.get,Url , null,
            function (response) {
                $scope.anouncementData = response;
            },function (data) {
                $scope.anouncementData = {};
                $scope.errorAlert = data;
            });
    }
    //Edit announcement functionality
    $scope.editAnnouncement = function (data,index) {
        $scope.editAnnouncementItem = true;
        $scope.filterItemList = [];
        $scope.announcement = angular.copy(data);
        $scope.getName =[];
        $scope.announcement.effectiveDate = new Date(gso.getUtilService().filterToServerDateTimeStamp($scope.announcement.effectiveDate));
        $scope.announcement.endDate = new Date(gso.getUtilService().filterToServerDateTimeStamp($scope.announcement.endDate));
        $scope.disableDate = new Date();
        $scope.setDisable = new Date($scope.announcement.effectiveDate);
        $scope.filtersData = angular.copy($scope.announcement);
        if($scope.announcement.filters.length > 0){
            angular.forEach($scope.announcement.filters,function (val,index) {
                if(!val.filterType || !val.filterValue ){
                    $scope.announcement.filters.splice(index, 1);
                }
                if(val.filterType && val.filterValue){
                    $scope.filterItemList.push({
                        name:val.filterValueDesc,
                        filterType:val.filterType,
                        filterId:val.filterId,
                        filterValue:val.filterValue
                    });
                }
            });
            getTypeOfName($scope.filterItemList);
            $scope.showText = false;
        }
    };
    //createNew announcement
    $scope.createNew = function () {
        $scope.createObj ={};
        $scope.createObj.filters = [];
        $scope.createNewAnnouncement = true;
        $scope.filterItemList = [];
        $scope.createObj.effectiveDate = new Date();
        $scope.currentDate = gso.getUtilService().filterToDayDate();
        $scope.createObj.endDate =  new Date(gso.getUtilService().getThirtyDates( $scope.createObj.effectiveDate));
        $scope.setDisable = $scope.createObj.effectiveDate;
    };

    function getLocationItem(){
        gso.getCrudService().execute(constants.get,companyUrlConfig.companyApi + '/api-config/v1' + '/company' + '/' + gso.getAppConfig().companyId + '/'+ 'locations', null,
            function (response) {
                $scope.locationFilter = response;
            },function (data) {
                $scope.errorAlert = data;
            });
    }
    function getDepartmentItem(){
        gso.getCrudService().execute(constants.get,companyUrlConfig.companyApi + '/api-config/v1' + '/company' + '/' + gso.getAppConfig().companyId + '/'+ 'departments', null,
            function (response) {
                $scope.departementFilter = response;
            },function (data) {
                $scope.errorAlert = data;
            });
    }


    $scope.filterByItem = function (value) {
        $scope.filterData = value;
        if(value ==='locations'){
            $scope.filterList = $scope.locationFilter;
            $scope.selectedValue = null;
        }else if(value === 'departments'){
            $scope.filterList = $scope.departementFilter;
            $scope.selectedValue = null;
        }else{
            $scope.filterList = '';
        }
    };


    $scope.selectBox = function (value) {
        $scope.selectedValue = value;
    };

    function isExisted(filters,id){
        var value = filters.some(function (el) {
            return el.filterValue === id;
        });
        return value;
    }

    // Adding filter to the UI and creating filter array-object
    $scope.addFilter = function(value){
        $scope.showText = false;
        $scope.getName = [];
        if($scope.filterData ==='locations' && !isExisted(value.filters,$scope.selectedValue.locationId)){
            value.filters.push({
                filterType:'L',
                filterValue:$scope.selectedValue.locationId
            });
            $scope.filterItemList.push({
                name: $scope.selectedValue.locationName,
                filterType:'L',
                filterValue:$scope.selectedValue.locationId
            });
        }else if($scope.filterData ==='departments' && !isExisted(value.filters,$scope.selectedValue.deptId)){
            value.filters.push({
                filterType:'D',
                filterValue:$scope.selectedValue.deptId
            });
            $scope.filterItemList.push({
                name: $scope.selectedValue.deptName,
                filterType:'D',
                filterValue:$scope.selectedValue.deptId
            });
        }
        getTypeOfName($scope.filterItemList);
    };

    function getTypeOfName(filterItem) {
        angular.forEach(filterItem,function (value,index) {
            if(value.filterType === 'L' ){
                getFilterName('Locations');
            }else if( value.filterType === 'D' ){
                getFilterName('Departments');
            }
        });
    }

    function getFilterName(name){
        if($scope.getName.length > 0){
            if($scope.getName.indexOf(name) < 0){
                $scope.getName.push(name);
            }
        }else{
            $scope.getName.push(name);
        }
    }

    //formation of object for both put and post
    function getObjectData(list) {
        list.effectiveDate = gso.getUtilService().filterDate(list.effectiveDate,'yyyy-MM-dd');
        list.endDate= gso.getUtilService().filterDate(list.endDate,'yyyy-MM-dd');
        var data  = {
            "effectiveDate": list.effectiveDate,
            "endDate": list.endDate,
            "title": list.title,
            "body": list.body,
            "filters": list.filters
        };
        return data;
    }

    function isDeleteFilter(){
        $scope.itemsDeleteFilter.map(function(item){
            angular.forEach($scope.filtersData.filters,function (val,index) {
                if (val.filterId && val.filterId === item.filterId) {
                    $scope.deleteFilter($scope.filtersData,$scope.filtersData.filters[index]);
                }
            });
        });
    }

    //updating the data through put service call
    $scope.updateData = function(){
        var sendObject = getObjectData($scope.announcement);
        isDeleteFilter();
        gso.getCrudService().execute(constants.put,Url+'/'+$scope.announcement.announcementId , sendObject,
            function (response) {
                $scope.errorAlert = response;
                getAnnouncementData();
                $scope.editAnnouncementItem = false;
                $scope.closeAlertMsg();
            },function (data) {
                $scope.errorAlert = data;
            });
        $scope.cancel();
    };


    //Adding the new recoding using POST
    $scope.addNewAnnouncement = function (newAnnouncement) {
        var sendObject = getObjectData($scope.createObj);
            gso.getCrudService().execute(constants.post, Url, sendObject,
                function (response) {
                    $scope.errorAlert = response;
                    getAnnouncementData();
                    $scope.closeAlertMsg();
                }, function (data) {
                    $scope.errorAlert = data;
                });
        $scope.cancel();
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

    // Delete filter that edit added
    $scope.editDeleteFilter = function (item) {
        $scope.itemsDeleteFilter.push(item);
          angular.forEach($scope.announcement.filters,function (val,index) {
              if( val.filterId && val.filterId === item.filterId){
                  removeFilterItem($scope.announcement.filters[index]);
                  delete $scope.announcement.filters[index]['filterId'];
              }
              if(item.filterType  === val.filterType && item.filterValue === val.filterValue){
                  removeFilterItem($scope.announcement.filters[index]);
                  $scope.announcement.filters.splice(index,1);
              }
          });
    };

    function removeFilterItem(data){
        angular.forEach($scope.filterItemList,function(val,index){
            if(data.filterType  === val.filterType && data.filterValue === val.filterValue) {
                $scope.filterItemList.splice(index, 1);
            }
        });
    }



    // delete functionality for Announcement recode
    $scope.deleteAnnouncement = function (item) {
        $scope.deleteAnnouncementUrl = Url+'/'+item.announcementId;
        $scope.yes_btn = $scope.translation.yesDeleteText;
        $scope.no_btn = $scope.translation.no;
        $scope.confirmMessage = $scope.translation.announcementConfirmation;
        gso.getNGDialog().openConfirm({
            template: 'app/shared/views/confirmAlertView.html',
            scope: $scope,
            closeByDocument: false,
            closeByEscape: false,
            className: 'tn-confirm-delete'
        }).then(function(){
            $scope.deleteData($scope.deleteAnnouncementUrl);
        });
    };


    // delete functionality for filter
    $scope.deleteFilter = function (obj,filter) {
        var deleteFilter = Url +'/'+obj.announcementId+'/filters/'+filter.filterId;
        $scope.deleteData(deleteFilter);
    };

    // Delete the recode
    $scope.deleteData = function (deleteUrl) {
        gso.getCrudService().execute(constants.remove,deleteUrl, null,
            function (response) {
                $scope.errorAlert = response;
                $scope.isDeleteSuccess =true;
                getAnnouncementData();
                $scope.closeAlertMsg();
            },function (data) {
                $scope.errorAlert = data;
            });
    };

    // checking the value is greater than current date
    $scope.getEditStatus = function(value,text){
        var getDate = gso.getUtilService().filterDate(value,'yyyy-MM-dd');
        return gso.getUtilService().checkTwoDates(getDate,gso.getUtilService().filterToDayDate());
    };

    $scope.getDeleteStatus = function(value){
        var getDate = gso.getUtilService().filterDate(value,'yyyy-MM-dd');
        return gso.getUtilService().checkCurrentFutureDate(getDate,gso.getUtilService().filterToDayDate());
    };

    // create new announcement date validation
    $scope.changeEndDate = function (startDate) {
        $scope.createObj.endDate =  new Date(gso.getUtilService().getThirtyDates(startDate));
        $scope.setDisable =  new Date(startDate);
    };

    // edit announcement date validation
    $scope.editEndDate = function () {
        $scope.setDisable =  new Date($scope.announcement.effectiveDate);
        // changing the date object to date
        var getEffectiveDate = gso.getUtilService().filterDate($scope.announcement.effectiveDate,'yyyy-MM-dd');
        var getEndDate = gso.getUtilService().filterDate($scope.announcement.endDate,'yyyy-MM-dd');
        if(getEffectiveDate > getEndDate){
            $scope.showErrorMsg = true;
        }else{
            $scope.showErrorMsg = false;
        }

    };

    $scope.isValidForm = function (obj) {
        var boolValue;
       if(obj.effectiveDate && obj.endDate && obj.title && obj.body && !$scope.showErrorMsg) {
           boolValue = false;
       }else{
           boolValue = true;
       }
       return boolValue;
    };


    $scope.closeAlertMsg = function(){
        $timeout(function(){
            $scope.errorAlert = null;
        },3000);
    };

    $scope.cancel = function () {
        $scope.createNewAnnouncement = false;
        $scope.editAnnouncementItem = false;
        $scope.filterItemList = [];
        $scope.createObj ={};
        $scope.getName = [];
        $scope.itemsDeleteFilter =[];
        $scope.selectedValue = null;
        $scope.showText = true;
        $scope.showErrorMsg = false;
    };

    getAnnouncementData();
    getLocationItem();
    getDepartmentItem();

}]);
