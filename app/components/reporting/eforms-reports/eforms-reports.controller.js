
'use strict';
trinetApp.controller('eformsReportsCtrl', ['$scope', 'gso','$timeout','utilService',
    function ($scope, gso,$timeout,utilService) {

        $scope.isSelectOption1 = true;
        $scope.autoWidth = 0;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.sortOrderInit = "employeeName";
        $scope.index = 0;
        $scope.icondown = false;
		$scope.errorAlert = null;
		$scope.noRecordsAlert = null;

        $scope.printSection = function () {
            window.print();
        };

        $scope.getEformsReports = function () {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.eforms + '/' +
                gso.getAppConfig().companyId + companyUrlConfig.resources.eformsStatus,null,
                function (response) {

                    var formIdsArray = response.formList.map(function (form) {
                       return form.formId;
                    });

                    var filteredEmpList = response.eform_data.filter(function (employee) {
                        return formIdsArray.indexOf(employee.formId) >= 0;
                    });

                    $scope.allData = filteredEmpList;
                    $scope.loadData = true;
                    var eform_data= filteredEmpList,
                        groupByData = groupBy(eform_data,'formId');

                    $scope.groupByData = groupByData;

                    $scope.eformsReportsData = Object.keys(groupByData).map(function(key){
                        return {
                            formDesc : groupByData[key][0].formDesc,
                            formId : groupByData[key][0].formId,
                            accept : groupByData[key].filter(function(item){
                                return item.formStatus === 'accepted';
                            }),
                            decline : groupByData[key].filter(function(item){
                                return item.formStatus === 'decline';
                            }),
                            notCompleted : groupByData[key].filter(function(item){
                                return item.formStatus === 'not completed';
                            })

                        };
                    });

                    $scope.eformsReportsData.map(function (obj, index) {
                        obj.testFilter = 'form'+index;
                    });

                    /**
                     * Logic: adding forms to each employee along with id's and status START
                     */
                    var pullFormStatus = function(employeeName, formId){
                        var data =  $scope.groupByData[formId].filter(function(item){
                            return item.employeeName === employeeName;
                        });

                        //outerObj[innerObj['testFilter']] = data.length > 0 ? data[0].formStatus : 'not completed';
                        return data.length > 0 ? data[0].formStatus : 'not completed';
                    };

                    var res = eform_data.map(function (employee) {
                        var obj = {
                            forms: []
                        };
                        $scope.eformsReportsData.forEach(function (formData) {
                            obj['employeeName'] = employee.employeeName;
                            obj.forms.push({formId: formData.formId})
                        });
                        return obj;
                    });

                    // employee data with having all the formids in forms
                    res.map(function (employee) {
                        employee.forms.map(function (formData, index) {
                            employee['form'+index] = pullFormStatus(employee.employeeName, formData.formId);
                            formData.formStatus = pullFormStatus(employee.employeeName, formData.formId);
                        })
                    });

                    var finalResult = [];
                    res.map(function (obj) {
                        if (finalResult.length) {
                            var index = finalResult.findIndex(function (innerObj) {
                                return (innerObj.employeeName == obj.employeeName);
                            });
                            if (index === -1) {
                                finalResult.push(obj);
                            }
                        } else {
                            finalResult.push(obj);
                        }
                    });
                    $scope.finalEmpList = finalResult;
                    /**
                     * Logic: adding forms to each employee along with id's and status END
                     */

                    $scope.autoWidth = Math.floor(100/($scope.eformsReportsData.length + 1));

                    utilService.sortAscArr($scope.allData,$scope.sortOrderInit);
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.initEformsReports = function(){
            $scope.getEformsReports();
        };

        $scope.initEformsReports();

        $scope.PrintElem = function (printDiv) {
            $timeout(function(){
                 gso.getUtilService().printSection(printDiv);
            });
         };

        $scope.toggleOptions = function (isToggle) {
            $scope.isSelectOption1 = isToggle;
        };

        $scope.getFormStatus = function(employeeName,formId, outerObj, innerObj){
            var data =  $scope.groupByData[formId].filter(function(item){
                   return item.employeeName === employeeName;
            });

            outerObj[innerObj['testFilter']] = data.length > 0 ? data[0].formStatus : 'not completed';
            //return data.length > 0 ? data[0].formStatus : 'not completed';
        };




        $scope.isArranged = false;
        $scope.empSort = false;
        $scope.orderByColumn = function (prop) {
            if(prop === 'employeeName'){
                $scope.empSort = !$scope.empSort;
            }
            if(!$scope.isArranged){
                $scope.finalEmpList = utilService.sortAscArr($scope.finalEmpList, prop);
                $scope.isArranged = true;
            } else{
                $scope.finalEmpList = utilService.sortDscArr($scope.finalEmpList, prop);
                $scope.isArranged = false;
            }
        };

        $scope.numberOfPages=function(){
            return Math.ceil($scope.reportDetails.length/$scope.pageSize);
        };

        $scope.viewDetails = function(data,type,countOfEmp,index){
            if(data.length > 0){
                $scope.highlightIndex = index;
                $scope.highlightType = type;
                $scope.reportDetails = data;
                $scope.pagesList = [];
                var totalpages = $scope.numberOfPages();
                for (var i=1; i<=totalpages; i++) {
                    $scope.pagesList.push(i);
                }
                $scope.count =countOfEmp;
                $scope.title = type === 'accept' ? 'List of Employees Who Have Accepted the Terms for '+ data[0].formDesc : 'List of Employees Who Have Not Completed the Terms for '+ data[0].formDesc;
                $scope.viewDetailsData = true;
                /*gso.getNGDialog().open({
                    templateUrl: 'app/components/reporting/eforms-reports/eforms-report-details.html',
                    scope: $scope,
                    closeByDocument: false,
                    closeByEscape: false
                });*/
            }
        };

        function groupBy(arr, property) {
            return arr.reduce(function(memo, x) {
                if (!memo[x[property]]) { memo[x[property]] = []; }
                memo[x[property]].push(x);
                return memo;
            }, {});
        }
    }]);
