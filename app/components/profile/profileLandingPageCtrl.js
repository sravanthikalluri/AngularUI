/**
 Description: This is controller used to fetch the details of profile page sections information
 Author:Raghavendra Kumar Bonthala
 **/
'use strict';
trinetApp.controller('profileLandingPageCtrl', ['$rootScope','$scope', 'sharedProperties', 'genericService', 'gso', '$timeout', '$location', '$filter', 'passportUrlBuilder','$http', '$sce', '$window','SharedDataService', '$state','hrpSignonService',
    function ($rootScope,$scope, sharedProperties, genericService, gso, $timeout, $location, $filter, passportUrlBuilder, $http, $sce, $window,SharedDataService, $state,hrpSignonService) {
        //$scope.hideManageEmployee = true;

        $scope.namesSection = false;
        $scope.contactsSection = false;
        $scope.addressSection = false;
        $scope.primaryNamesHideDelete = true;
        $scope.preferredNamesHideDelete = true;
        $scope.appUserId = "";
        $scope.AddressHideDelete = true;
        $scope.profileAuthenticated = true;
        $scope.userPicture = "";
        $scope.IsRemoteEmployee=true;
        $scope.closeAlert = function () {
            $scope.errorAlert = null;
        };
        /*if (gso.getRouteParams().EM) {
            $scope.hideManageEmployee = false;
        }*/
        $scope.notMeTab = false;
        $scope.empStatus = "";
        var midName = '';
        var lstName='';
        var companyId = gso.getAppConfig().companyId;
        $scope.visibleName = false;
        $scope.visible = false;

        $scope.subMenuArray = ['profile','workinfo','money','timeoff','benefits','permissions','eforms'];
         $scope.childParentAlertMsg = function (data) {
             if(data && data._statusCode  && data._statusCode !== '404' && data._statusCode !== '403'){
                 $scope.errorAlert = data;
             }else{
                 $scope.noRecordsAlert = data;
             }

          };

        if(SharedDataService.getAppSharedData().sMessage !== undefined){
            var data = JSON.parse(SharedDataService.getAppSharedData().sMessage);
            SharedDataService.getAppSharedData().sMessage =null;
            $scope.childParentAlertMsg(data);
        }
        if (typeof $location.search().tab !== 'undefined') {
            $scope.setTab($location.search().tab);
        }


        $scope.isAuthenticated = function(name,selectedMenuComponentPermissions){
            if(name === 'profile'){
                name = 'personal';
            }
            if(name === 'eforms'){
                name = 'e-forms';
            }

            if(name === 'permissions'){
                name = 'roles';
            }

            var isAuthenticated = false;
            if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
                angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
                    if (selectedMenu.name === name && selectedMenu.permission.canView) {
                        isAuthenticated = true;
                    }
                });
            }
            if(name === 'personal' && isAuthenticated){
                $scope.profileAuthenticated = true;
            }else if(name === 'personal' && !isAuthenticated){
                $scope.profileAuthenticated = false;
            }

            return isAuthenticated;
        };

        $scope.checkRoute = function (newValue,selectedMenuComponentPermissions) {
            var keepGoing = true,
                menuName = '';
            angular.forEach($scope.subMenuArray,function(subMenu){
                if(keepGoing) {
                    var isAuthenticated = $scope.isAuthenticated(subMenu,selectedMenuComponentPermissions);
                    if(isAuthenticated){
                        keepGoing = false;
                        menuName =  subMenu;
                    }
                }

            });

            return menuName;
        };

        $scope.navigateToOrg = function () {
            $state.go('organizationalChartSelectedTabEmpID', {selectedTab: 'company',empId: $scope.appUserId});
        };

        $scope.getUserPicture = function () {
            var url = profileUrlConfig.profileApi + profileUrlConfig.profilePictureBaseUrl + gso.getAppConfig().companyId + '/' + $scope.appUserId  + profileUrlConfig.resources.picture;
            $http.get(url, { responseType: 'arraybuffer' })
                .success(function (data) {
                    var showImage = (data.byteLength <=1000) ? false : true;
                    if(showImage){
                        var arrayBufferView = new Uint8Array(data);
                        var blob = new Blob([arrayBufferView], { type: "image/jpeg, image/png" });
                        var imageUrl = URL.createObjectURL(blob);
                        $scope.userPicture = imageUrl;
                    }
                });
        };


        $scope.togglePermissions = function(selectedMenuComponentPermissions){
            gso.getUtilService().toggleComponentPermissions(selectedMenuComponentPermissions);

            //gso.getUtilService().toggleView('.','personal', $scope.hasWorkInfo);
            //gso.getUtilService().toggleView('.','workinfo', $scope.hasWorkInfo);

            if (gso.getRouteParams().empId !== undefined) {
                if(localStorage.getItem("isFromSetTab") === 'true'){
                    $scope.tab = gso.getRouteParams().selectedTab;
                    $scope.checkRoute($scope.tab,selectedMenuComponentPermissions);
                }else{
                   $scope.tab = $scope.checkRoute(gso.getRouteParams().selectedTab,selectedMenuComponentPermissions);
                }

                if ($scope.tab !== ''){
                    //$location.path('/profile/' + $scope.tab + '/' + $scope.appUserId);
                    $state.go('profile.profile', {selectedTab: $scope.tab, empId: $scope.appUserId});
                }
            }else{
                $scope.tab = gso.getRouteParams().selectedTab;
            }
        };

        $scope.canEdit = function(name){
            var canEdit = false;
            if ($scope.selectedEmpMenuComponentPermissions && $scope.selectedEmpMenuComponentPermissions.length > 0) {
                angular.forEach($scope.selectedEmpMenuComponentPermissions, function (selectedMenu) {
                    if(name === selectedMenu.name && !selectedMenu.permission.canEdit){
                        canEdit = true;
                    }
                });
            }
            return canEdit;

        };

        $scope.canAdd = function(name){
            var canAdd = false;
            if ($scope.selectedEmpMenuComponentPermissions && $scope.selectedEmpMenuComponentPermissions.length > 0) {
                angular.forEach($scope.selectedEmpMenuComponentPermissions, function (selectedMenu) {
                    if(name === selectedMenu.name && !selectedMenu.permission.canAdd){
                        canAdd = true;
                    }
                });
            }
            return canAdd;

        };

        $scope.canDelete = function(name){
            var canDelete = false;
            if ($scope.selectedEmpMenuComponentPermissions && $scope.selectedEmpMenuComponentPermissions.length > 0) {
                angular.forEach($scope.selectedEmpMenuComponentPermissions, function (selectedMenu) {
                    if(name === selectedMenu.name && !selectedMenu.permission.canDelete){
                        canDelete = true;
                    }
                });
            }
            return canDelete;

        };

         $scope.subSectionView = function(name){
            var canView = false;
            if ($scope.selectedEmpMenuComponentPermissions && $scope.selectedEmpMenuComponentPermissions.length > 0) {
                angular.forEach($scope.selectedEmpMenuComponentPermissions, function (selectedMenu) {
                    if(name === selectedMenu.name && selectedMenu.permission.canView){
                        canView = true;
                    }
                });
            }
            return canView;
        };

        $scope.isSet = function (tabName) {
            return this.tab === tabName;
        };

        $scope.redirectToProfile = function (personId) {
            var redirectUrl = '/profile/profile/' + personId;
            $location.path(redirectUrl);
        };


        /*Employee Status data fetching*/

        function isCheckNullUndefinedEmpty(value) {
            return (value === undefined) || (value === 'null') || (value === null) || (value === ' ') ? '' : value;
        }

        $scope.empStatusChange = function () {
            $scope.customerInformation = gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + gso.getAppConfig().companyId + '/' + $scope.appUserId + profileUrlConfig.resources.employmentDetails + "?include=emplymntStatus,name,posDesc,workCity,workState,workLine1,workLine2,workCountryCd,workPostalCd,positionId,personId,workEmail,workPhone,firstName,middleName,lastName,serviceDt,employeeClass,companyDesc,workLocDesc,terminationDt&cache=flush", null, function (response) {
                     $scope.currentData=response;
                     $scope.officeAddress = $scope.getOfficeAddressGoolgeMaps($scope.currentData);
                     var workAddressLine1 = response.workLine1;
                     var workAddressLine2 = response.workLine2;
                     var workCity = response.workCity;
                     var workState = response.workState;
                     var workPostal = response.workPostalCd;
                     var currentDate = new Date();
                     var calcEndDate = new Date();
                     $scope.employmentServiceDate = new Date(response.serviceDt);
                     $scope.workLocDesc=response.workLocDesc;
                     $scope.currentCompanyName=response.companyDesc;
                     $scope.IsRemoteEmployee= ((workCity ==null)|| (workCity=="")||($scope.workLocDesc? $scope.workLocDesc.includes("Remote"):false));
                     $scope.empTerminationDate =response.terminationDt;
                     if($scope.empTerminationDate){
                        calcEndDate  =new Date($scope.empTerminationDate);
                     }
                     var dateDiff =$scope.datesDifference(calcEndDate,$scope.employmentServiceDate);
                     $scope.years=dateDiff.years;
                     $scope.months=dateDiff.months;
                     gso.getCrudService().execute(constants.get,'https://maps.googleapis.com/maps/api/geocode/json?address='+workAddressLine1+','+workCity+','+workState+'&key=AIzaSyAG41vi29rdgPUM-pSdcC5oZMcXl4o-Ekc', null,
                         function (response) {
                             var json = data.data;
                             return {
                                 id: JSON.stringify(json),
                                 latitude: json.results[0].geometry.location.lat,
                                 longitude: json.results[0].geometry.location.lng,
                                 workAddressLine1: workAddressLine1,
                                 workAddressLine2: workAddressLine2,
                                 workCity: workCity,
                                 workState: workState,
                                 workPostal: workPostal
                             };
                         },function (data) {
                    });
                    SharedDataService.getAppSharedData().employeeClass =response.employeeClass;
                    SharedDataService.getAppSharedData().currentSelectedEmpCountrycode =response.workCountryCd;
                    $scope.empStatus = response.emplymntStatus;
                    $scope.employeeClass = response.employeeClass;
                    $scope.headerPhno = isCheckNullUndefinedEmpty(response.workPhone);

                    // removing all non numeric characters from phone number
                    $scope.headerPhno = $scope.headerPhno.replace(/\D/g,'');
                    $scope.extension = ($scope.headerPhno.length > 10) ? $scope.headerPhno.substring(10) : '';
                    $scope.headerPhno = $scope.headerPhno.substring(0, 10);
                    $scope.headerPhno = $scope.headerPhno.replace( /\D+/g, "" ).replace( /([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "($1) $2-$3" );

                    $scope.headerEmail = isCheckNullUndefinedEmpty(response.workEmail);
                    $scope.firstName = response.firstName;
                    $scope.lastName = response.lastName;
                    $scope.headerName = isCheckNullUndefinedEmpty(response.firstName) + ' ' + isCheckNullUndefinedEmpty(response.middleName) + ' ' + isCheckNullUndefinedEmpty(response.lastName);
                    var headerNameSplit = $scope.headerName.split(" ");
                    $scope.monogram = ($scope.firstName && $scope.firstName.trim().charAt(0).toUpperCase()) + ($scope.lastName && $scope.lastName.trim().charAt(0).toUpperCase());
                    $scope.headerAddress = (!response.workCity ? '' : response.workCity + ", ") + isCheckNullUndefinedEmpty(response.workState);
                    $scope.setPermissions();
                    $scope.empName = response.name;
                    $scope.designation = !response.posDesc ? '' : (response.posDesc === 'null' ? '' : response.posDesc);
                    $scope.workState = response.workState;
                    $scope.positionId = response.positionId;
                    $scope.personId = response.personId;
                    if($scope.empStatus === 'A'){
                        $scope.terminateButtonName = $scope.translation.shared.startTerminate;
                    }else if ($scope.empStatus === 'T'){
                        $scope.terminateButtonName = $scope.translation.shared.terminated;
                    }
                },
                function (data) {
                    $scope.childParentAlertMsg(data);
                }
            );
        };

        $scope.getEmployeePermissions = function(empId){
            var permURL = homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.menu + '/' + gso.getAppConfig().companyId + '/' + empId + homeUrlConfig.resources.perm+'/'+gso.getAppConfig().userId;
            gso.getCrudService().execute(constants.get,permURL , null,
                function (response) {
                    if (response !== undefined && response !== null) {
                        $scope.$parent.selectedEmpMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(response[SharedDataService.getAppSharedData().permissionId]);
                        $scope.togglePermissions($scope.selectedEmpMenuComponentPermissions);
                    }
                },function (data) {
                    $scope.errorAlert = data;
                });
        };

        $scope.setPermissions = function(){
         if (gso.getRouteParams().empId !== undefined) {
             /*if (gso.getRouteParams().EM) {
                 localStorage.setItem("permissionId",2);

                 $scope.getPermissions(localStorage.getItem("permissionId"));
                 $scope.togglePermissions($scope.selectedMenuComponentPermissions);
             }else{*/
                 SharedDataService.getAppSharedData().permissionId=2;
                 if($scope.selectedEmpMenuComponentPermissions){
                     $scope.togglePermissions($scope.selectedEmpMenuComponentPermissions);
                 }else{
                     $scope.getEmployeePermissions(gso.getRouteParams().empId);
                 }

             //}

         } else {
             SharedDataService.getAppSharedData().permissionId=2;
             $scope.getPermissions(SharedDataService.getAppSharedData().permissionId);
             $scope.togglePermissions($scope.selectedMenuComponentPermissions);
         }
        };

        if (gso.getRouteParams().empId !== undefined) {
            $scope.appUserId = gso.getRouteParams().empId;
            $scope.empStatusChange();
            $scope.notMeTab = true;/*
            if (!gso.getRouteParams().EM) {

            }*/

        } else {
            $scope.designation = !gso.getAppConfig().designation ? '' : (gso.getAppConfig().designation === 'null' ? '' : gso.getAppConfig().designation);
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.populateStates = function (country) {
            genericService
                .states(country.key)
                .then(
                function (data) {
                    $scope.statesData = data.data.data;
                    angular
                        .forEach(
                        $scope.statesData,
                        function (input) {
                            if (angular.isDefined($scope.selectedAddressData) && input.key === $scope.selectedAddressData.stateProvince) {
                                $scope.selectedAddressData.stateProvince = input;
                            }
                        });
                });
        };

        $scope.calculateLength = function (data) {
            $scope.emailData = [];
            $scope.phoneData = [];
            var length = {};
            $scope.emailStart = -1;
            $scope.phoneStart = -1;
            length.emailLength = 0;
            length.phoneLength = 0;
            $scope.emailAccessTypes = [
                {
                    "key": "Home",
                    "value": "Home"
                },
                {
                    "key": "Emerg",
                    "value": "Emergency"
                },
                {
                    "key": "Work",
                    "value": "Work"
                },
                {
                    "key": "Other",
                    "value": "Other"
                }
            ];
            $scope.phoneAccessTypes = [
                {
                    media: 'Phone',
                    accessType: 'Campus',
                    value: 'Campus Phone',
                    key: 'Campus Phone'
                },
                {
                    media: 'Phone',
                    accessType: 'Dorm',
                    value: 'Dormitory Phone',
                    key: 'Dormitory Phone'
                },
                {
                    media: 'Fax',
                    accessType: 'Emerg',
                    value: 'Fax - Emergency',
                    key: 'Fax - Emergency'
                },
                {
                    media: 'Cellular',
                    accessType: 'Emerg',
                    value: 'Mobile - Emergency',
                    key: 'Mobile - Emergency'
                },
                {
                    media: 'Pager',
                    accessType: 'Emerg',
                    value: 'Pager - Emergency',
                    key: 'Pager - Emergency'
                },
                {
                    media: 'Fax',
                    accessType: 'Home',
                    value: 'Fax - Home',
                    key: 'Fax - Home'
                },
                {
                    media: 'Cellular',
                    accessType: 'Home',
                    value: 'Mobile',
                    key: 'Mobile'
                },
                {
                    media: 'Pager',
                    accessType: 'Home',
                    value: 'Pager - Home',
                    key: 'Pager - Home'
                },
                {
                    media: 'Phone',
                    accessType: 'Home',
                    value: 'Home',
                    key: 'Home'
                },
                {
                    media: 'Phone',
                    accessType: 'Other',
                    value: 'Other Phone',
                    key: 'Other Phone'
                },
                {
                    media: 'Telex',
                    accessType: 'Other',
                    value: 'Other - Telex',
                    key: 'Other - Telex'
                },
                {
                    media: 'Fax',
                    accessType: 'Work',
                    value: 'Fax - Work',
                    key: 'Fax - Work'
                },
                {
                    media: 'Cellular',
                    accessType: 'Work',
                    value: 'Mobile - Work',
                    key: 'Mobile - Work'
                },
                {
                    media: 'Pager',
                    accessType: 'Work',
                    value: 'Pager - Work',
                    key: 'Pager - Work'
                },
                {
                    media: 'Phone',
                    accessType: 'Work',
                    value: 'Work',
                    key: 'Work'
                },
                {
                    media: 'Phone',
                    accessType: 'Work2',
                    value: 'Work 2',
                    key: 'Work 2'
                }
            ];
            angular.forEach(data, function (input, index) {
                if (input.media === constants.mediaTypeEmail) {
                    angular.forEach($scope.emailAccessTypes, function (obj) {
                        if (input.accessType === obj.key) {
                            input.accessType = obj.value;
                            if (input.media === constants.mediaTypePhone) {
                                input.phoneType = obj;
                            }else if (input.media === constants.mediaTypeEmail) {
                                input.emailType = obj;
                            }
                        }
                    });
                    if (input.media === constants.mediaTypeEmail) {
                        if ($scope.emailStart === -1) {
                            $scope.emailStart = index;
                        }
                        if(input.accessType === constants.priorityIsWork){
                            $scope.emailData.unshift(input);
                        }
                         else {$scope.emailData.push(input)};

                        length.emailLength = length.emailLength + 1;
                    } else if (input.media === constants.mediaTypePhone) {
                        if ($scope.phoneStart === -1) {
                            $scope.phoneStart = index;
                        }
                        input.phone = input.telephoneNumber;
                        $scope.phoneData.push(input);
                        length.phoneLength = length.phoneLength + 1;
                    }
                } else {
                    angular.forEach($scope.phoneAccessTypes, function (obj) {
                        if (input.accessType === obj.accessType && input.media === obj.media) {
                            input.accessType = obj.accessType;
                            if (input.media === constants.mediaTypeEmail) {
                                input.emailType = obj;
                            }else {
                                input.phoneType = obj;
                            }
                        }
                    });
                    if (input.media === constants.mediaTypeEmail) {
                        if ($scope.emailStart === -1) {
                            $scope.emailStart = index;
                        }
                        $scope.emailData.push(input);

                        length.emailLength = length.emailLength + 1;
                    } else {
                        if ($scope.phoneStart === -1) {
                            $scope.phoneStart = index;
                        }
                        input.phone = input.telephoneNumber;
                        if(input.accessType === constants.priorityIsWork){
                            $scope.phoneData.unshift(input);
                        }
                        else {$scope.phoneData.push(input)};
                        length.phoneLength = length.phoneLength + 1;
                    }
                }

            });

            length.start = length.emailLength - 1;
            if (length.start < 0) {
                length.start = 0;
            } else {
                length.start = length.emailLength - 1;
            }

            $scope.phoneData = $scope.phoneData.filter(function (phoneObj) {
                return phoneObj.phone;
            });

            $scope.emailData = $scope.emailData.filter(function (emailObj) {
                return emailObj.url;
            });
            return length;
        };

        $scope.primarySuffix = function () {
            gso.getAPIConfigDataService().getSuffixes().then(function(response) {
                    $scope.suffixData = response;
                    if ($scope.primaryNameData !== undefined && $scope.primaryNameData !== null) {

                        angular.forEach($scope.suffixData,
                            function (input, i) {
                                if (input.value === $scope.primaryNameData.nameSuffix) {
                                    $scope.primaryNameData.nameSuffix = $scope.suffixData[i];
                                }
                            });
                    }
                });
        };
        $scope.preferedSuffix = function () {
            gso.getAPIConfigDataService().getSuffixes().then(function(response) {
                    $scope.suffixData = response;
                    if ($scope.preferredNameData !== undefined && $scope.preferredNameData !== null) {
                        angular.forEach($scope.suffixData, function (input, i) {
                            if (input.value === $scope.preferredNameData.nameSuffix) {
                                $scope.preferredNameData.nameSuffix = $scope.suffixData[i];
                            }
                        });
                    }

                });
        };
        $scope.primaryFormOfAddress = function () {
            gso.getAPIConfigDataService().getTitles().then(function(response) {
                    $scope.formOfAddressData = response;
                    if ($scope.primaryNameData !== undefined && $scope.primaryNameData !== null) {
                        angular
                            .forEach(
                            $scope.formOfAddressData,
                            function (input, i) {
                                if (input.value === $scope.primaryNameData.formOfAddress) {
                                    $scope.primaryNameData.formOfAddress = $scope.formOfAddressData[i];
                                }
                            });
                    }
                });
        };
        $scope.preferedFormOfAddress = function () {
            gso.getAPIConfigDataService().getTitles().then(function(response) {
                    $scope.formOfAddressData = response;
                    if ($scope.preferredNameData !== undefined && $scope.preferredNameData !== null) {
                        angular.forEach($scope.formOfAddressData,
                            function (input, i) {
                                if (input.value === $scope.preferredNameData.formOfAddress) {
                                    $scope.preferredNameData.formOfAddress = $scope.formOfAddressData[i];
                                }
                            });
                    }
                });
        };

        $scope.changeDeleteLable = function (hideDelete) {
            $scope.primaryNamesHideDelete = hideDelete;
        };
        $scope.changeDeleteLablePreferred = function (value) {
            $scope.preferredNamesHideDelete = value;
        };
        $scope.changeDeleteLableAddress = function (hideDelete) {
            $scope.AddressHideDelete = hideDelete;
        };

        $scope.primaryPreferedNames = function (isEditParam) {
            $scope.$broadcast('togglePrimaryName', {
                visible: false,
                visibleName: false
            });
            /** ****************Retrieve the Customer names**************** */
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + $scope.appUserId + profileUrlConfig.resources.name + '?effectivedate=', null,
                function (response) {
                    $scope.nameData = response;
                    $scope.prfNamesCurrentList = response.prfNamesCurrentList;
                    if (response.prfNamesCurrentList.length > 0) {
                        $scope.preferredNameDataList = response.prfNamesCurrentList;
                        $scope.preferredNameDataList[0].effDateLabel = constants.currentlyEffective;
                        if (response.prfNamesActiveList.length > 0) {
                            angular.forEach(response.prfNamesActiveList, function (input) {
                                input.effDateLabel = constants.effective + gso.getUtilService().filterDate(input.effectiveDate, constants.dateFormatUS);
                                $scope.preferredNameDataList.push(input);
                            });
                            $scope.preferredNameComboData = $scope.preferredNameDataList[0];
                            $scope.preferredNameData = $scope.preferredNameDataList[0];
                        }
                    } else {
                        $scope.noPref = true;
                    }

                    if (response.priNamesActiveList.length === 1) {
                        $scope.primaryNameData = response.priNamesActiveList[0];
                        midName = $scope.primaryNameData.middleName === null || $scope.primaryNameData.middleName === undefined ? '' : $scope.primaryNameData.middleName;
                        lstName = $scope.primaryNameData.lastName === null || $scope.primaryNameData.lastName === undefined ? '' : $scope.primaryNameData.lastName;
                        $scope.headerName = $scope.primaryNameData.firstName + " " + midName + " " + lstName;
                        response.priNamesActiveList[0].oldeffectiveDate = response.priNamesActiveList[0].effectiveDate;
                        response.priNamesActiveList[0].effectiveDate = gso.getUtilService().filterToDayDate();

                        $scope.primaryNameList = response.priNamesActiveList;
                        $scope.primaryNamesHideDelete = true;
                        $scope.primarySuffix();
                        $scope.primaryFormOfAddress();
                    } else if (response.priNamesActiveList.length > 1) {
                        var priNamesArray = [];
                        response.priNamesActiveList[0].effDateLabel = constants.currentlyEffective;
                        response.priNamesActiveList[0].oldeffectiveDate = response.priNamesActiveList[0].effectiveDate;
                        response.priNamesActiveList[0].effectiveDate = gso.getUtilService().filterToDayDate();
                        priNamesArray.push(response.priNamesActiveList[0]);

                        angular.forEach(response.priNamesActiveList, function (input, index) {
                            if (index >= 1) {
                                response.priNamesActiveList[index].effDateLabel = constants.effective + gso.getUtilService().filterDate(response.priNamesActiveList[index].effectiveDate, constants.dateFormatUS);
                                priNamesArray.push(input);
                            }

                        });
                        $scope.primaryNameList = priNamesArray;

                        var selectedVal = SharedDataService.getAppSharedData().primNameSelectedeffdate;
                        if (selectedVal === null || selectedVal === undefined || selectedVal === '') {
                            selectedVal = 0;
                        } else {
                            if (parseInt(selectedVal, 10) === 0) {
                                $scope.primaryNamesHideDelete = true;
                            } else if (parseInt(selectedVal, 10) === 1) {
                                $scope.primaryNamesHideDelete = false;
                            }
                        }

                        $scope.primaryNameData = $scope.primaryNameList[selectedVal];

                        var selectedValPred = SharedDataService.getAppSharedData().preferredNameSelectedeffdate;
                        if (selectedValPred === null || selectedValPred === undefined || selectedValPred === '') {
                            selectedValPred = 0;
                        } else {
                            if (parseInt(selectedValPred, 10) === 0) {
                                $scope.preferredNamesHideDelete = true;
                            } else if (parseInt(selectedValPred, 10) === 1) {
                                $scope.preferredNamesHideDelete = false;
                            }
                        }

                        if (Array.isArray($scope.preferredNameDataList)) {
                            $scope.preferredNameComboData = $scope.preferredNameDataList[selectedValPred];
                        }


                        $scope.primarySuffix();
                        $scope.primaryFormOfAddress();
                        midName = $scope.primaryNameList[0].middleName === null || $scope.primaryNameList[0].middleName === undefined ? '' : $scope.primaryNameList[0].middleName;
                        lstName = $scope.primaryNameList[0].lastName === null || $scope.primaryNameList[0].lastName === undefined ||$scope.primaryNameList[0].lastName === "null" ? '' : $scope.primaryNameList[0].lastName;
                        $scope.headerName = $scope.primaryNameList[0].firstName + " " + midName + " " +lstName;



                    }
                    var prfNamesArray = [];
                    if (isEditParam) {
                        // edit mode
                        if (response.prfNamesActiveList.length >= 1) {

                            angular.forEach(
                                response.prfNamesActiveList,
                                function (input) {
                                    prfNamesArray.push(input);
                                });

                            $scope.preferredNameData = response.prfNamesActiveList[0];
                            $scope.preferedSuffix();
                            $scope.preferedFormOfAddress();
                            if (new Date($scope.preferredNameData.effectiveDate).getTime() <
                                new Date().getTime()) {
                                $scope.preferredNameData.oldeffectiveDate = $scope.preferredNameData.effectiveDate;
                                $scope.preferredNameData.effectiveDate = gso.getUtilService().filterToDayDate();
                            }
                            else {
                                $scope.effectiveDate = new Date(
                                    $scope.selectedAddressData.effectiveDate);
                            }
                            $scope.headerPrefName = $scope.preferredNameData.firstName + " " +
                                $scope.preferredNameData.lastName;
                        } else {
                            $scope.noPref = true;
                        }
                    } else {
                        if (response.prfNamesCurrentList.length >= 1) {
                            var prfNamesArray1 = [];
                            angular.forEach(
                                response.prfNamesCurrentList,
                                function (input) {
                                    prfNamesArray1.push(input);
                                });

                            $scope.preferredNameData = response.prfNamesCurrentList[0];
                            $scope.preferredNameComboData = response.prfNamesCurrentList[0];
                            $scope.preferedSuffix();
                            $scope.preferedFormOfAddress();
                            if (new Date($scope.preferredNameData.effectiveDate).getTime() <
                                new Date().getTime()) {
                                $scope.preferredNameData.oldeffectiveDate = $scope.preferredNameData.effectiveDate;
                                $scope.preferredNameData.effectiveDate = gso.getUtilService().filterToDayDate();
                            }
                            else {
                                $scope.effectiveDate = new Date(
                                    $scope.selectedAddressData.effectiveDate);
                            }

                            $scope.preferredNameData.middleName = $scope.preferredNameData.middleName === null ? '' : $scope.preferredNameData.middleName;
                            $scope.headerPrefName = $scope.preferredNameData.firstName + " " + $scope.preferredNameData.middleName + " " +$scope.preferredNameData.lastName;
                        } else {
                            $scope.noPref = true;
                        }
                    }


                    var headerNameSplit;
                    if ($scope.headerPrefName !== undefined &&
                        $scope.headerPrefName !== null &&
                        $scope.headerPrefName.length > 0) {
                        $scope.headerName = $scope.headerPrefName;
                        $scope.nameType = constants.preferredNameType;
                        headerNameSplit = $scope.headerName.split(" ");
                        //$scope.monogram = headerNameSplit[0].charAt(0).toUpperCase() + headerNameSplit[headerNameSplit.length - 1].charAt(0).toUpperCase();
                        $scope.monogram = ($scope.firstName && $scope.firstName.trim().charAt(0).toUpperCase()) + ($scope.lastName && $scope.lastName.trim().charAt(0).toUpperCase());
                        if($scope.appUserId===gso.getAppConfig().userId){
                         $scope.$emit(constants.emitLogoName, $scope.monogram);
                        }
                    } else {
                        headerNameSplit = $scope.headerName.split(" ");
                        //$scope.monogram = headerNameSplit[0].charAt(0).toUpperCase() + headerNameSplit[headerNameSplit.length - 1].charAt(0).toUpperCase();
                        $scope.monogram = ($scope.firstName && $scope.firstName.trim().charAt(0).toUpperCase()) + ($scope.lastName && $scope.lastName.trim().charAt(0).toUpperCase());
                        if($scope.appUserId===gso.getAppConfig().userId){
                         $scope.$emit(constants.emitLogoName, $scope.monogram);
                      }
                    }
                },
                function (data) {
                    if(data._statusCode === '403'){
                        $scope.errorStatus = false;
                    }
                    else {
                        $scope.namesSection = true;
                        $scope.childParentAlertMsg(data);
                    }
                }
            );
        };

        $scope.contactMethods = function () {
            //** ****************Retrieve the Customer Contact Information**************** *//
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + $scope.appUserId + profileUrlConfig.resources.contact + '?excludehistory=true', null,
                function (response) {
                    $scope.emailData = [];
                    $scope.phoneData = [];
                    if (response !== undefined) {
                        angular.forEach(response, function (input) {
                            if(input.media==="Phone" && input.telephoneNumber){
                                input.telephoneNumber = input.telephoneNumber.replace(/[^\d]+/gi, "-");
                                input.telephoneNumber = input.telephoneNumber.replace(/-/g, '');
                            }
                       });
                        $scope.contactMethodData = response;
                        if (!gso.getUtilService().isNull(response)) {
                            gso.getAPIConfigDataService().getAccessTypes().then(function(response) {
                                $scope.accessTypes = response;
                                $scope.accessTypes = gso.getUtilService().sortArrayWithOtherAtBottom($scope.accessTypes);
                                var length = $scope.calculateLength($scope.contactMethodData);
                                $scope.emailLength = length.emailLength;
                            });
                        }
                    }
                },
                function (data) {
                    if(data._statusCode === '403'){
                        $scope.errorStatus = false;
                    }
                    else {
                        $scope.contactsSection = true;
                        $scope.childParentAlertMsg(data);
                    }
                }
            );
        };


        /*$scope.getWorkAddressData = function () {
          gso.getCrudService().execute(constants.get,companyUrlConfig.companyApi + '/api-config/v1' + '/company' + '/' + gso.getAppConfig().companyId + '/'+ 'locations?include=address', null,
              function (response) {
                  $scope.workAddressData = response;
                  if ($filter('filter')($scope.workAddressData, {locationName:$scope.locationName})[0]) {
                      $scope.workCityData = $filter('filter')($scope.workAddressData, {locationName:$scope.locationName})[0].address.city;
                      $scope.workStateData = $filter('filter')($scope.workAddressData, {locationName:$scope.locationName})[0].address.state;
                      $scope.headerAddress = (!$scope.workCityData ? '' : $scope.workCityData + ", ") + (!$scope.workStateData ? '' : $scope.workStateData);
                  }
              },function (data) {
                  if(data._statusCode === '403'){
                      $scope.errorStatus = false;
                  }
                  else {
                      $scope.childParentAlertMsg(data);
                  }
          });
        }*/

        $scope.getAddressData = function () {
            $scope.visible = false;
            $scope.section = constants.sectionAddress;
            //** ****************Retrieve the customer Address**************** *//
            gso.getCrudService().execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBase + companyId + '/' + $scope.appUserId + profileUrlConfig.resources.address + '?effectivedate=', null,
                function (response) {
                    SharedDataService.getAppSharedData().permissionId= 2;
                    $scope.setPermissions();
                    $scope.addressData = response;
                    if (response !== undefined) {
                        if (!gso.getUtilService().isNull(response)) {
                            if (response.activeAddressList.length === 0) {
                                $scope.addressList = [];
                            }
                            if (response.activeAddressList.length === 1) {
                                response.activeAddressList[0].effDateLabel = constants.currentlyEffective;
                                $scope.selectedAddressData = response.activeAddressList[0];
                                $scope.selectedAddressData.oldeffectiveDate = $scope.selectedAddressData.effectiveDate;
                                $scope.selectedAddressData.effectiveDate = gso.getUtilService().filterToDayDate();
                            } else if (response.activeAddressList.length > 1) {
                                var addressArray = [];
                                response.activeAddressList[0].effDateLabel = constants.currentlyEffective;
                                response.activeAddressList[0].oldeffectiveDate = response.activeAddressList[0].effectiveDate;
                                response.activeAddressList[0].effectiveDate = gso.getUtilService().filterToDayDate();
                                addressArray.push(response.activeAddressList[0]);

                                angular.forEach(response.activeAddressList, function (input, index) {
                                    if (index >= 1) {
                                        response.activeAddressList[index].effDateLabel = constants.effective + gso.getUtilService().filterDate(response.activeAddressList[index].effectiveDate, constants.dateFormatUS);
                                        addressArray.push(input);
                                    }
                                });
                                $scope.addressList = addressArray;
                                var selectedEffDate = SharedDataService.getAppSharedData().addressSelectedeffdate;
                                if (selectedEffDate === "undefined" || selectedEffDate === '' || selectedEffDate === null) {
                                    selectedEffDate = 0;
                                } else {
                                    if (parseInt(selectedEffDate, 10) === 0) {
                                        $scope.AddressHideDelete = true;
                                    } else if (parseInt(selectedEffDate, 10) === 1) {
                                        $scope.AddressHideDelete = false;
                                    }
                                }
                                $scope.selectedAddressData = $scope.addressList[selectedEffDate];
                                if (!$scope.selectedAddressData) {
                                    $scope.selectedAddressData = $scope.addressList[0];
                                }
                                if($scope.addressSelectedeffdate !== undefined && $scope.addressSelectedeffdate !== null) {
                                    if ($scope.selectedAddressData.stateProvince === null || $scope.selectedAddressData.stateProvince === '') {
                                        $scope.headerAddress = $scope.selectedAddressData.city;
                                    } else {
                                        $scope.headerAddress = $scope.selectedAddressData.city + ($scope.selectedAddressData.stateProvince === null ? '' : ", " + $scope.selectedAddressData.stateProvince);
                                    }

                                    gso.getAPIConfigDataService().getCountries().then(function(response) {
                                        $scope.countriesData = response;
                                        if (angular.isDefined($scope.selectedAddressData)) {
                                            angular.forEach($scope.countriesData,
                                                function (input) {
                                                    if (input.key === $scope.selectedAddressData.country) {
                                                        $scope.selectedAddressData.country = input;
                                                        sharedProperties.setSelectedCountry($scope.selectedAddressData.country.key);
                                                        $scope.populateStates(input);
                                                    }
                                                });
                                        }
                                    });
                                }
                            }
                        } else {
                            $scope.setPermissions();
                            $scope.selectedAddressData = {};
                            $scope.selectedAddressData.effectiveDate = gso.getUtilService().filterToDayDate();
                        }
                        gso.getAPIConfigDataService().getCountries().then(function(response) {
                            $scope.countriesData = response;
                            if (angular.isDefined($scope.selectedAddressData)) {
                                angular.forEach($scope.countriesData,
                                    function (input) {
                                        if (input.key === $scope.selectedAddressData.country) {
                                            $scope.selectedAddressData.country = input;
                                            sharedProperties.setSelectedCountry($scope.selectedAddressData.country.key);
                                            $scope.populateStates(input);
                                        }
                                    });
                            }else {
                                $scope.populateStates(data.data.data[0]);
                            }
                        });
                    }
                },
                function (data) {
                    if(data._statusCode === '403'){
                        $scope.errorStatus = false;
                    }
                    else {
                        $scope.addressSection = true;
                        $scope.childParentAlertMsg(data);
                    }

                }
            );
        };
            // TODO: Ideally we can create an officeAddress computed property on the
            // current-location js-data resource and access it from there so we don't
            // have to add this logic to the controller
            $scope.getOfficeAddress =function(data){
                var address = "";
                address = address + (data.workLine1 ? data.workLine1 +'<br/>': '');
                address = address + (data.workLine2 ? data.workLine2 +'<br/>': '');
                address = address + (data.workCity ?  data.workCity + ', ' : '');
                address = address + (data.workState ? data.workState + '<br/>': '');
                address = address + (data.workPostalCd ? data.workPostalCd : '');
                return address;

            };

            $scope.getOfficeAddressGoolgeMaps =function(data){
               var addressGoogleMaps = $scope.getOfficeAddress(data);
               // removing <br/> in the address as <ng-map> does not take <br/> characters
               addressGoogleMaps = addressGoogleMaps.replace(/<br\/>/g, '');
               return addressGoogleMaps;
            };
        $scope.datesDifference=function(dt1, dt2)
        {
            /*
             * setup 'empty' return object
             */
            var ret = {days:0, months:0, years:0};

            /*
             * If the dates are equal, return the 'empty' object
             */
            if (dt1 == dt2) return ret;

            /*
             * ensure dt2 > dt1
             */
            if (dt1 > dt2)
            {
                var dtmp = dt2;
                dt2 = dt1;
                dt1 = dtmp;
            }

            /*
             * First get the number of full years
             */

            var year1 = dt1.getFullYear();
            var year2 = dt2.getFullYear();

            var month1 = dt1.getMonth();
            var month2 = dt2.getMonth();

            var day1 = dt1.getDate();
            var day2 = dt2.getDate();

            /*
             * Set initial values bearing in mind the months or days may be negative
             */

            ret['years'] = year2 - year1;
            ret['months'] = month2 - month1;
            ret['days'] = day2 - day1;

            /*
             * Now we deal with the negatives
             */

            /*
             * First if the day difference is negative
             * eg dt2 = 13 oct, dt1 = 25 sept
             */
            if (ret['days'] < 0)
            {
                /*
                 * Use temporary dates to get the number of days remaining in the month
                 */
                var dtmp1 = new Date(dt1.getFullYear(), dt1.getMonth() + 1, 1, 0, 0, -1);

                var numDays = dtmp1.getDate();

                ret['months'] -= 1;
                ret['days'] += numDays;

            }

            /*
             * Now if the month difference is negative
             */
            if (ret['months'] < 0)
            {
                ret['months'] += 12;
                ret['years'] -= 1;
            }

            return ret;
        }
        $scope.initProfileLanding = function () {
            $scope.getAddressData();
            $scope.contactMethods();
            $scope.primaryPreferedNames(false);
            $scope.getUserPicture();
            $timeout(function () {
                $scope.setPermissions();
            }, 1000);
        };
        $scope.initProfileLanding();
        $scope.redirectFunction = function (newValue) {
            var redirectUrl = '/profile/' + newValue;
            //$location.path(redirectUrl);
            $state.go('profile.profile', {selectedTab: newValue, empId: $scope.appUserId});
        };

        $scope.setTab = function (newValue) {
            $scope.tab = newValue;
            if (newValue === 'profile') {
                sharedProperties.setPrimaryNameDataBoolValue(false);
                sharedProperties.setBroadcastContactBoolValue(false);
                $scope.initProfileLanding();
            }

            if (gso.getRouteParams().empId !== undefined) {
                localStorage.setItem("isFromSetTab",true);
                $scope.redirectFunction(newValue);
            }else{
                $scope.redirectFunction(newValue);
            }
        };

        $scope.disabled = function (date, mode) {
            var today = gso.getUtilService().filterDate(new Date(), constants.dateFormat);
            var dateCompare = gso.getUtilService().filterDate(date, constants.dateFormat);
            return ((mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)) ||
            (new Date(today).getTime() === new Date(dateCompare).getTime()));
        };
        $timeout(function () {
            $scope.$on(constants.emitName, function (evnt, headerName, nameType) {
                $scope.headerName = headerName;
                $scope.nameType = nameType;
                var headerNameSplit = $scope.headerName.split(" ");
                //$scope.monogram = headerNameSplit[0].charAt(0).toUpperCase() + headerNameSplit[headerNameSplit.length - 1].charAt(0).toUpperCase();
                $scope.monogram = ($scope.firstName && $scope.firstName.trim().charAt(0).toUpperCase()) + ($scope.lastName && $scope.lastName.trim().charAt(0).toUpperCase());
            });
        }, 200);


        $scope.$on('$routeChangeSuccess', function(next, current) {
            if (sharedProperties.getPrimaryNameData() === 'PRF' && sharedProperties.getPrimaryNameDataBoolValue()) {
                setTimeout(function () {
                    $scope.$broadcast('togglePrefferredName', {
                        visible: true,
                        visiblePreferredName: true
                    });
                }, 2000);
            } else {
                $scope.$broadcast('togglePrimaryName', {
                    visible: true,
                    visibleName: true
                });
            }

            if (sharedProperties.getBroadcastContactBoolValue()) {
                setTimeout(function () {
                    $scope.$broadcast(constants.broadcastContact, true);
                }, 2000);
            }
        });
        $scope.broadcastPrimaryName = function () {
            $scope.primaryNameModelData = angular.copy($scope.primaryNameData);
            $scope.preferredNameEditData = angular.copy($scope.preferredNameData);
            sharedProperties.setPrimaryNameData($scope.nameType);
            var tabsArray = ['workinfo','security','options','money','timeoff','benefits','permissions','eforms'];
            if (tabsArray.indexOf($scope.tab) >= 0) {
                if (gso.getRouteParams().empId !== undefined) {
                    $location.path('/profile/profile/'+gso.getRouteParams().empId, false);
                } else {
                    $location.path('/profile/profile', false);
                }

                sharedProperties.setPrimaryNameDataBoolValue(true);
            }

            if ($scope.nameType === 'PRF') {
                $scope.$broadcast('togglePrefferredName', {
                    visible: true,
                    visiblePreferredName: true
                });

            } else {
                $scope.$broadcast('togglePrimaryName', {
                    visible: true,
                    visibleName: true
                });
            }

            $scope.$broadcast(constants.broadcastContact, false);
        };

        $scope.broadcastContact = function () {
            var tabsArray = ['workinfo','security','options','money','timeoff','benefits','permissions','eforms'];
            if (tabsArray.indexOf($scope.tab) >= 0) {
                if (gso.getRouteParams().empId !== undefined) {
                    $location.path('/profile/profile/'+gso.getRouteParams().empId, false);
                } else {
                    $location.path('/profile/profile', false);
                }
                sharedProperties.setBroadcastContactBoolValue(true);
            }

            $scope.$broadcast(constants.broadcastContact, true);
            if ($scope.nameType === 'PRF') {
                $scope.$broadcast('togglePrefferredName', {
                    visible: false,
                    visiblePreferredName: false
                });
            } else {
                $scope.$broadcast('togglePrimaryName', {
                    visible: false,
                    visibleName: false
                });
            }
        };


        $scope.manageEmpProfile = false;
        $scope.leaveFormDisplay = false;
        $scope.changeWorkDetails = false;
        $scope.changeWorkDetails=false;
        $scope.returnFromLeave = false;
        $scope.extendedleave = false;
        $scope.returnleave = true;
        $scope.terminationFormDisplay = false;
        $scope.chooseWorkDetails=function () {
            $scope.changeWorkDetails=!$scope.changeWorkDetails;
            angular.element('.earningStmtbody').addClass(
                'employment-change-request');
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/workinfo/empChange/chooseEmpChange.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
        };
        $scope.chooseWorkDetails = function () {
            $scope.changeWorkDetails=!$scope.changeWorkDetails;
            angular.element('.earningStmtbody').addClass(
                'employment-change-request');
            gso.getNGDialog().open({
                templateUrl: 'app/components/profile/workinfo/empChange/chooseEmpChange.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
        };
        $scope.toggleExtendLeaveRequest = function () {
            $scope.extendedLeaveObject = {};
            $scope.extendedleave = true;
            $scope.returnleave = false;
            $scope.manageEmpProfile = !$scope.manageEmpProfile;
            $scope.leaveFormDisplay = !$scope.leaveFormDisplay;
        };
        $scope.toggleReturnFromLeave = function () {
            $scope.extendedleave = false;
            $scope.returnleave = true;
            $scope.manageEmpProfile = !$scope.manageEmpProfile;
            $scope.returnFromLeave = !$scope.returnFromLeave;
        };
        if (typeof $location.search().leave !== "undefined") {
            if ($location.search().leave === 'A') {
                $scope.toggleExtendLeaveRequest();

                $scope.toggleReturnFromLeave();
            }
        }

        $scope.validatePasteAndFutureDates = function(obj,fieldsArray){
            var isTrue = false;
              angular.forEach(fieldsArray,function(field){
                   if(obj[field]){
                     isTrue = true;
                   }
              });
              return isTrue;
        };

        $scope.toggleTerminationDisplay = function () {
          $scope.manageEmpProfile = !$scope.manageEmpProfile;
          $scope.terminationFormDisplay = !$scope.terminationFormDisplay;
          $scope.closeAlert();
        };

      	angular.element($window).bind('resize', function() {
      			$timeout($scope.resizeTerminationFrame, 100);
      	});

      	$scope.resizeTerminationFrame =  function(){
      		if( $scope.terminationFormDisplay){
      			var header = document.getElementsByClassName("tn-toolbar-tools");
      			var headerHeight = 68; // 68px is height of toolbar header
      			if(header && header[0]) {
      				headerHeight = header[0].offsetHeight;
      			}
	      		$scope.iFrameHeight = (document.body.offsetHeight - headerHeight) + "px";
      		}
        };

      	$scope.terminationRedirect = function () {
      		//TER -1453 :: Default New Term Form Enablement for all companies

            $scope.toggleTerminationDisplay();
            $scope.resizeTerminationFrame();
            $rootScope.$broadcast("terminationRedirect", gso.getRouteParams().empId);
            $scope.terminationUrl = $sce.trustAsResourceUrl( "/ui-termination/#" + "?companyId=" + gso.getAppConfig().companyId + "&hrAuthId=" + gso.getAppConfig().userId +"&employeeId=" + gso.getRouteParams().empId);
        };


        $scope.requestTermination = function (){
          if(gso.getRouteParams().empId) {
              $scope.terminationRedirect();
          }
        };
        $scope.navigationData ='';
        $scope.$on("seekConfirmation", function(event,data){
        		$scope.navigationData = data;
        		if(data && data.source === 'employee'){
        			var person = getTerminatedPersonObj();
        	 		confirmNavigation(gso.getRouteParams().empId, person, data.destUrl);
        		}

        });

        $scope.$on('$locationChangeStart', function(event,next,current){
         	var person = getTerminatedPersonObj();
	        if (person  && person.trackChange ){
	        		event.preventDefault();
	        		confirmNavigation(gso.getRouteParams().empId, person, next);
	 		}
        });

        $window.onbeforeunload = function(){
	        	var person = getTerminatedPersonObj();
    	 		if (person  && person.trackChange){
    	 			return "You have unsaved changes.  Are you sure you want to leave this page?";
	        	}

        }

        function confirmNavigation(employeeId, person, targetUrl){
	        gso.getNGDialog().openConfirm({
	            template: 'app/shared/views/confirmNavigation.html',
	            scope: $scope,
	            closeByDocument: false,
	            closeByEscape: false
	        }).then(function(){
	        		//setting false to trackChange property if the user wishes to navigate away from the termination screen.
	        		person.trackChange = false;
	            $window.sessionStorage.setItem(employeeId,JSON.stringify(person));

	            if ($scope.navigationData){
	            		if ($scope.navigationData.destUrl){
	            			$window.open($scope.navigationData.destUrl, '_self');
	            		}else{
	            			hrpSignonService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie(), true);
	            		}
	            } else{
	            		$window.location.href = targetUrl;
	            }
	            $scope.navigationData='';
	        }, function(){
	        		gso.getNGDialog().closeAll();
	        		$scope.navigationData='';
	        });
        }

        function getTerminatedPersonObj(){
	        	var personSession = $window.sessionStorage.getItem(gso.getRouteParams().empId);
	 		if (personSession){
	 			return JSON.parse(personSession);
	 		}
	 		return null;

        }

    }
]);
