/* Description: This is controller is used to fetch all Employees data
 * Author:Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.controller('directoryViewCtrl', ['$scope', 'gso','$timeout',
    function ($scope, gso,$timeout) {
        var offset = 0;
        $scope.companyName = gso.getAppConfig().companyName;
        $scope.sortType = 'employeeName'; // set the default sort type
        $scope.sortReverse = false;
        $scope.sortTypeEmp = 'name';
        $scope.totalDiv = false;
        $scope.searchbox = false;
        $scope.isvisable = false;
        $scope.callback=false;
        $scope.showdirectoryReq = false;
        $scope.flyout = true;
        $scope.selectdep = {};
        $scope.selectLoc = {};

        $scope.value = {
            selectchange : false
        };
        $scope.closePopUp = function () {
            $scope.showdirectoryReq = !$scope.showdirectoryReq;
        };
        $scope.searchPos = function (value) {
            $scope.searchbox = value;
        };
        $scope.setClickedRow = function (index) {
            $scope.selectedRow = index;
        };
        $scope.textboxhide = function () {
            $scope.searchbox = false;
            $scope.isvisable = false;
            $scope.showFlyout = false;
            $scope.mailFlyoutData = false;
            $scope.showManageEmpColList = false;
        };

        $scope.flyout = function (val) {
            $scope.showFlyout = val;
        };
        $scope.formatDate = function (date) {
            var dateArray = date.split(' ');
            return gso.getUtilService().splitConcatDateString(dateArray[0]);
        };
        $scope.mailFlyout = function (val) {
            $scope.mailFlyoutData = val;
        };
        $scope.finalEmpData = [];
        /** ****************Directory Data**************** */
        $scope.loadMore = function () {
            if ($scope.busy) {
                return;
            }
            $scope.busy = true;
            gso.getCrudService()
                .execute(constants.get, manageEmpUrlConfig.manageEmpApi + manageEmpUrlConfig.manageBaseUrl +
                manageEmpUrlConfig.resources.employee + '/' + gso.getAppConfig().companyId +
                manageEmpUrlConfig.resources.allEmp + "?employmentStatus=active&limit=20&offset=" + offset, null, function (response) {
                    $scope.finalEmpData = $scope.finalEmpData.concat(response.empLst);
                    $scope.allEmpData = $scope.finalEmpData;
                    $scope.count = $scope.allEmpData.length;
                    $scope.totalCount = response.count;
                    $scope.busy = false;
                    $scope.callback=true;
                    $scope.totalDiv = true;
                    offset = $scope.finalEmpData.length;
                },
                function (data) {
                   if($scope.callback !== true){
                    $scope.errorAlert = data;
                   }
                }
            );
        };
        $scope.loadMore();
        $scope.selection = [];
        $scope.selectCheckBox = function(e){
           var $this = angular.element(e.currentTarget),
               closestSpan = $this.closest('p').prev();

            if(closestSpan.hasClass('icon-icon_checkmark_emptybox')){
                closestSpan.removeClass('icon-icon_checkmark_emptybox')
                           .addClass('icon-icon_checkmarkwithbox');
            }else {
                closestSpan.removeClass('icon-icon_checkmarkwithbox')
                           .addClass('icon-icon_checkmark_emptybox');
            }

        };
        /** **************** Details Directory Data**************** */
            $scope.positionSet= function(val){
            var clickedRow = angular.element('#mgEmp_'+val),
                clickedRowHeight = clickedRow.height(),
                clickedRowTop = clickedRow.offset(),
                windowHeight = angular.element(window).height(),
                tablePosition = clickedRow.closest('#fixed').offset(),
                fixedTableHeight = windowHeight - tablePosition.top,
                halfFixedTableHeight = fixedTableHeight/2,
                OpenDivPosition = clickedRowTop.top - tablePosition.top,
                halfOpenDivPosition = OpenDivPosition/ 2;

                if(OpenDivPosition >= halfFixedTableHeight  ){
                    $scope.position = {"top" :  halfFixedTableHeight - clickedRowHeight };

                }else{
                    $scope.position = {"top" :  OpenDivPosition + clickedRowHeight};
                }

            };

        $scope.getDirectoryDetail = function (val, data) {
            $scope.directoryDetail = {};
            $scope.empDirectoryDetail = "";
            $scope.monogramName = "";
            $scope.selectedRow = val;
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
                companyUrlConfig.resources.org + "/" + gso.getAppConfig().companyId + "/" +
                data.employeeId + "/emp-details", null,
                function (response) {
                    $scope.directoryDetail = response;
                    $scope.getAddressLine($scope.directoryDetail);
                    $scope.monogramName = data.name.split(",")[1].trim().split("")[0]+ data.name.split(",")[0].trim().split("")[0];
                    $scope.showdirectoryReq = true;
                    $timeout(function(){
                         $scope.positionSet(val);
                    },10);

                },
                function (data) {
                    $scope.errorDetails = data;

                }
            );
        };

        function getSelectedEmployeeData(allEmpData,selectedEmpId){
           var employeeObject = null;
            angular.forEach(allEmpData,function(empData){
               if(empData.employeeId === selectedEmpId){
                  employeeObject = empData;
               }
             });
             return employeeObject;
        }

        function toogleActiveClass(currentTr){
          var allTrs = angular.element('tbody').find('tr');
          allTrs.removeClass('activeDirectory');
          return {empId : currentTr.data('empId'),index :  currentTr.data('index')};
        }
         // For Key up and Down
       $scope.getKeyDownDirectoryDetail = function (data, event) {
          var currentTr = angular.element('tbody').find('tr.activeDirectory'),
              nextTr = currentTr.next(),
              prevTr = currentTr.prev(),
              currTrObject = {};

          if (event.keyCode === 38) {
              currTrObject = toogleActiveClass(prevTr);
              $scope.getDirectoryDetail(currTrObject.index, getSelectedEmployeeData(data,currTrObject.empId));

          }
          if (event.keyCode === 40) {
               currTrObject = toogleActiveClass(nextTr);
               $scope.getDirectoryDetail(currTrObject.index, getSelectedEmployeeData(data,currTrObject.empId));
          }
       };
        // Binding the Addresses of employee
        $scope.getAddressLine = function (data) {
            $scope.empDirectoryDetail = '';
            if (data.employeeDetails.address.city) {
                $scope.empDirectoryDetail += data.employeeDetails.address.city + ',';
            }
            if (data.employeeDetails.address.state) {
                $scope.empDirectoryDetail += data.employeeDetails.address.state + ',';
            }
            if (data.employeeDetails.address.country) {
                $scope.empDirectoryDetail += data.employeeDetails.address.country + ',';
            }

            return $scope.empDirectoryDetail;
        };
         // Added this logic to observe my ng-model changes
           $scope.$watch(function () {
                   return {
                       allEmpData: $scope.allEmpData,
                       selectdep: $scope.selectdep,
                       selectLoc: $scope.selectLoc
                   };
           },function(){
            var selected;
             var filterAfterloc = [], filterAfterlocCount;
                selected = false;
                for (var j = 0; j < $scope.count; j++) {
                    var filterDept = $scope.allEmpData[j];
                    for (var i in $scope.selectLoc) {
                        if ($scope.selectLoc[i]) {
                            selected = true;
                            if (i === filterDept.workShortLocDesc) {
                                filterAfterloc.push(filterDept);
                                break;
                            }
                        }
                    }
                }
            filterAfterlocCount=filterAfterloc.length;
            if (!selected) {
                filterAfterloc = $scope.allEmpData;
                filterAfterlocCount= $scope.count;
            }
            var filterAfterdept = [];
            selected = false;
            for (var k = 0; k < filterAfterlocCount; k++) {
                var filterLocItem = filterAfterloc[k];
                for (var item in $scope.selectdep) {
                    if ($scope.selectdep[item]) {
                        selected = true;
                        if (item === filterLocItem.deptDesc) {
                            filterAfterdept.push(filterLocItem);
                            break;
                        }
                    }
                }
            }
            if (!selected) {
                filterAfterdept = filterAfterloc;
            }
           $scope.filterByData =  filterAfterdept;
            }, true);

    }]);
