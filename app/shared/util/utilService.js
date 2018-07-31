'use strict';
trinetApp.factory("utilService", function ($filter, $timeout, $state, $window, sharedProperties,SharedDataService) {
    return {
        /* To Filter next day date into "yyyy-MM-dd". */
        filterNextDayDate: function () {
            return $filter('date')(new Date().setDate(new Date().getDate() + 1),
                constants.dateFormat);
        },
        getStandardDate : function(date){
            var sDateArray = date.split('-');
            return new Date(sDateArray[0],sDateArray[1] - 1,sDateArray[2]);
        },
        filterToServerDateTimeStamp: function (date) {
            var getDateValue = new Date(date);
            return new Date(getDateValue.setDate(getDateValue.getDate() + 1));
        },
        /* To Filter today date in "yyyy-MM-dd" format.*/
        filterToDayDate: function () {
            return $filter('date')(new Date().setDate(new Date().getDate()),
                constants.dateFormat);
        },
        /* To Filter date into required format. */
        filterDate: function (date, format) {
            return $filter('date')(date, format);
        },
        getThirtyDates: function (value) {
            var time = new Date(value);
            return $filter('date')(time.setDate(time.getDate()+30));
        },
        /* To check date's effective for History Timeline. */
        effectiveDateCheck: function (data) {
            angular.forEach(data, function (input, i) {
                var date = '';
                if (angular.isDefined(input.effDate)) {
                    date = input.effDate;
                } else {
                    date = input.effectiveDate;
                }
                if (input.effDate && input.effDate.indexOf('Effective') !== -1) {
                    date = input.effDate.replace(/Effective/g, '');
                }
                var leftHand = $filter('date')(new Date(), 'MM-dd-yyyy');
                var arr = (date.indexOf('/') !== -1) ? date.split('/') : date.split('-');
                var rightHand = $filter('date')(new Date(arr[0], arr[1] - 1, arr[2]), 'MM-dd-yyyy');
                var checkTwoDates = function (date1, date2) {
                    if (date1 !== 'Invalid Date' && date2){
                        date1 = date1.split('-');
                        date2 = date2.split('-');
                        date1 = new Date(parseInt(date1[2], 10), (parseInt(date1[0], 10) - 1), date1[1]);
                        date2 = new Date(parseInt(date2[2], 10), (parseInt(date2[0], 10) - 1), date2[1]);
                        return date1 > date2;
                    }
                };
                if (checkTwoDates(rightHand, leftHand)) {
                    date = $filter('date')(date, constants.dateFormatUS);
                    data[i].effDate = constants.effective + date;
                    data[i].label = constants.on;
                } else {
                    date = $filter('date')(date, constants.dateFormatUS);
                    data[i].effDate = constants.effective + date;
                    data[i].label = constants.since;
                }
            });
            return data;
        },

        checkTwoDates: function (date1, date2) { // YYYY MM DD should be in this format to compare.
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[0], 10), (parseInt(date1[1], 10) - 1), date1[2]);
            date2 = new Date(parseInt(date2[0], 10), (parseInt(date2[1], 10) - 1), date2[2]);
            return date1 > date2;
        },
        /* To sort any object array in descending order by effective date. */
        sortData: function (data, asc) {
            data.sort(function (a, b) {
                if (!angular.isDefined(a.effectiveDate)) {
                    return new Date(b.effDate).getTime() - new Date(a.effDate).getTime();
                } else {
                    if (asc) {
                        return new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime();
                    }
                    return new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime();
                }
            });
            return data;
        },

        checkCurrentFutureDate: function (date1, date2) { // YYYY MM DD should be in this format to compare.
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[0], 10), (parseInt(date1[1], 10) - 1), date1[2]);
            date2 = new Date(parseInt(date2[0], 10), (parseInt(date2[1], 10) - 1), date2[2]);
            return date1 > date2;
        },

        /* To check email valid pattern. */
        emailValidity: function (emailLength) {
            for (var i = 0; i <= emailLength; i++) {
                var value = angular.element('#email_' + i).val();
                var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if (value === undefined) {
                    return false;
                }
                if (!pattern.test(value)) {
                    return false;
                }
            }
            return true;
        },

        // Function to check the current date in between Dates
          todayBtnTwoDates: function (dateCheck,toDate, fromDate) {
              var date1 = fromDate.split('-');
              var date2 = toDate.split('-');
              date1 = new Date(parseInt(date1[0], 10), (parseInt(date1[1], 10) - 1), date1[2]);
              date2 = new Date(parseInt(date2[0], 10), (parseInt(date2[1], 10) - 1), date2[2]);
              return dateCheck > date2 && dateCheck < date1;
           },

        /* To check phone valid pattern. */
        phoneValidity: function (start, phoneLength) {
            for (var i = start; i <= phoneLength; i++) {
                var value = angular.element('#phone_' + i).val();
                var pattern = /^[0-9]{3}.[0-9]{3}.[0-9]{4}$/;
                if (value === undefined) {
                    return false;
                }
                if (!pattern.test(value)) {
                    return false;
                }
            }
            return true;
        },

        /* To hide/show delete button. */
        showHideDelete: function (label) {
            var result = {};
            if (label && label.effDateLabel === constants.currentlyEffective) {
                result.hideDelete = true;
            } else {
                result.hideDelete = false;
            }
            return result;
        },
        showHideeDelete: function (id) {
            var result = {};
            result.index = angular.element(id).val();
            if (result.index === "0") {
                result.hideDelete = true;
            } else {
                result.hideDelete = false;
            }
            return result;
        },
        /* To iterate REST call errors. */
        filedErrorIterator: function (object) {
            var messageAlert = "";
            if (object.length === 1) {
                messageAlert = messageAlert.concat(object[0].message);
            } else {
                angular.forEach(object, function (input, i) {
                    messageAlert = messageAlert.concat(i + 1 + ". " + input.message + "\n");
                });
            }

            return messageAlert;
        },
        /* For null check of any value. */
        isNull: function (data) {
            if (data === null || data === '') {
                return true;
            }
            return false;
        },
        /* To change phone number format. */
        changePhoneFormat: function (phoneNumber) {
            return phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6, 4);
        },
        // Assuming you want the format "(123) 456-7890":
        formatThePhoneNumber: function (tel) {
            var s2 = (""+tel).replace(/\D/g, '');
            var m = s2.match(/^(\d{10,24})$/);
            return (!m) ? null :  m[0];
        },
        isDefined: function (trueValue, falseValue) {
            if (typeof trueValue !== 'undefined' && typeof trueValue !== 'object') {
                return trueValue;
            } else {
                return falseValue;
            }
        },
        getAngularElementById: function (idName) {
            return angular.element('#' + idName);
        },
        getAngularElementByClass: function (className) {
            return angular.element('.' + className);
        },

        toggleDIV: function (divId, isShow) {
            if (isShow) {
                this.getAngularElementById(divId).show();
            }
            else {
                this.getAngularElementById(divId).hide();
            }
        },
        hideDIVS: function (allHide) {
            if (allHide) {
                this.getAngularElementByClass('menu-main').hide();
                this.getAngularElementByClass('header').hide();
                this.getAngularElementByClass('container-content').css("width", "100%");
                this.getAngularElementByClass('container-content').css("height", "564px");
            }
        },
        getEnvironmentFromLocation: function () {
            var re = new RegExp("(platform|micro|local|greenstack)([a-zA-Z]+)\.hrpassport\.com");
            var value = re.exec(document.location.hostname);
            return (value !== null) ? value[2].toUpperCase() : null;
        },
        getAuthCookieNameFromLocation: function () {
            return sharedProperties.cookieName;
        },
        /*checkPermissionStatus:function(ele){
         if(ele.hasClass('visible-hide')){
                 ele.removeClass('visible-hide')
             }else{
                  ele.removeClass('visible-hide')
            }
        },*/
        getCookie: function () {
            // Externalize the cookie name to support openstack
            var cookieName = sharedProperties.getCookieName();
           // console.log("cookieName", cookieName);
            var re = new RegExp(cookieName + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value !== null) ? value[1] : null;
        },
        splitSubComponentsPermissions : function(selectedMenuComponentPermissions){
            if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
                var temp = [];
                angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
                    var subComponents = selectedMenu.subComponents;
                    angular.forEach(subComponents,function(obj){
                        temp.push(obj);
                    });
                });
                return selectedMenuComponentPermissions.concat(temp);
            }

        },

        // Adding this to view the subsections based on the component permission
        toggleView : function(type,name,canView){
            var ele = angular.element(type + name);
            if (canView) {
                if(ele.hasClass('ng-hide')){
                    ele.removeClass('ng-hide').addClass('ng-show');
                }else{
                    ele.show();
                }
            } else {
                if(ele.hasClass('ng-show')){
                    ele.removeClass('ng-show').addClass('ng-hide');
                }else{
                    ele.hide();
                }
            }
        },
         // Adding this to edit the subsections based on the component permission
        /*toggleEdit : function(type,name,canEdit){
            var $this = this;
            var ele = angular.element(type + "edit_"+name);
            if (canEdit) {$this.checkPermissionStatus(ele);}
        },
        // Adding this to delete the subsections based on the component permission
        toggleDelete : function(type,name,canDelete){
          var $this = this;
          var ele = angular.element(type + "delete_"+name);
          if (canDelete) {$this.checkPermissionStatus(ele);}

        },
        // Adding this to add the subsections based on the component permission
        toggleAdd : function(type,name,canAdd){
            var $this = this;
            var ele = angular.element(type + "add_"+name);
            if (canAdd) {$this.checkPermissionStatus(ele);}
        },

        // Adding this to view the subsections based on the component permission
        toggleSectionView : function(type,name,canView){
            var $this = this;
            var ele = angular.element(type + "secView_"+name);
            if (canView) {$this.checkPermissionStatus(ele);}
        },*/
        toggleComponentPermissions: function (selectedMenuComponentPermissions,index) {
            var $this = this;
            if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
                angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
                    if (typeof index !== 'undefined') {
                        $this.toggleView('#',selectedMenu.name+'_'+index,selectedMenu.permission.canView);
                        $this.toggleView('.',selectedMenu.name+'_'+index,selectedMenu.permission.canView);
                    }else{
                        $this.toggleView('#',selectedMenu.name,selectedMenu.permission.canView);
                        $this.toggleView('.',selectedMenu.name,selectedMenu.permission.canView);
                    }

                    //$this.toggleEdit(selectedMenu.name,selectedMenu.permission.canEdit);
                });
            }
        },
        showDIVS: function (allShow) {
            this.getAngularElementById('me').show();
            this.getAngularElementById("company").show();

            if (allShow) {
                this.getAngularElementByClass('menu-main').show();
                this.getAngularElementByClass('header').show();
            }
        },
        setSidebarActive: function (sidebar) {
            this.removeTitle();
            this.getAngularElementById(sidebar).addClass('title-block-active');
        },
        removeTitle: function () {
            this.getAngularElementByClass('title-block').removeClass('title-block-active');
        },
        printContent: function (printDiv) {
         var contents = this.getAngularElementById(printDiv).html(),
         frame1 = angular.element('<iframe />'),
         frameDoc;
         frame1[0].name = 'frame1';
         frame1.css({'position': 'absolute', 'top': '-1000000px'});
         angular.element('body').append(frame1);
         frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
         frameDoc.document.open();
         //Create a new HTML document.
         frameDoc.document.write('<html><head><title></title>');
         frameDoc.document.write('</head><body>');
         //Append the external CSS file.
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/bootstrap.css" type="text/css" />');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/dashboard/dashboard.css" type="text/css">');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/main.css" type="text/css" />');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/company/managereports.css" type="text/css" />');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/benefits/policesgeneral-benefits.css" type="text/css" />');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/global.css" type="text/css" />');
         frameDoc.document.write('<link rel="stylesheet" href="/assets/css/manageemp/manageemployee-form.css" type="text/css"/>');
         //Append the DIV contents.
         frameDoc.document.write(contents);
         frameDoc.document.write('</body></html>');
         frameDoc.document.close();
         setTimeout(function () {
         window.frames.frame1.focus();
         window.frames.frame1.print();
         frame1.remove();
         }, 500);
         },
        printSection: function (id) {
            var pw = window.open('', 'printGrid');
            var contents = this.getAngularElementById(id).html();
            pw.document.write('<html> <head>');
            pw.document.write('<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />');
            pw.document.write('<style>');
            pw.document.write('h2 { font-family: Helvetica; font-size: 18px; color: #0073cf; font-style: Semi Bold;}');
            pw.document.write('table {border: 1px solid;width: 100%;text-align: left;font-size: 11px;font-family: arial;border-collapse: collapse;}');
            pw.document.write('table th {padding: 4px 3px 4px 5px;border: 1px solid #d0d0d0;border-left-color: #eee;background-color: #ededed;}');
            pw.document.write('table td {padding: 4px 3px 4px 5px;border-style: none solid solid;border-width: 1px;border-color: #ededed;}');
            pw.document.write('</style>');
            pw.document.write('<title>' + "Print" + '</title>');
            pw.document.write('</head>');
            pw.document.write('<body>');
            pw.document.write(contents);
            pw.document.write('</body>');
			pw.focus();
			pw.print();
			pw.close();
        },
        splitConcatDateString: function (nextCheckIssueDate) {
            var dateArray = nextCheckIssueDate.split('-');
            return dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        },
        compareTwoDates: function (date1, date2) {
            // returns true if date1 is greater than or equal to date2.
            // date in the format of MM-dd-yyyy.
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[2], 10), (parseInt(date1[0], 10) - 1), date1[1]);
            date2 = new Date(parseInt(date2[2], 10), (parseInt(date2[0], 10) - 1), date2[1]);
            return date1 >= date2;
        },
        compareDates: function (date1, date2) {
            // returns true if date1 is greater than or equal to date2.
            // date in the format of yyyy-MM-dd.
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[0], 10), (parseInt(date1[1], 10) - 1), date1[2]);
            date2 = new Date(parseInt(date2[0], 10), (parseInt(date2[1], 10) - 1), date2[2]);
            return (date1 >= date2);
        },
        weekDays: function () {
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            return weekday[new Date().getDay()];
        },
        /* contentUrl: function (docUrl) {
         var url = docUrl;
         if (docUrl.startsWith('/')) {
         url = constants.docLocContext + docUrl;
         }
         return url;
         },
         */
        routeReloadTimeOut: function () {
           $state.reload();
        },
        focusInvalidElement: function (formName) {
            var visibleInvalids = angular.element(formName).find('.ng-invalid:visible');
            if (angular.isDefined(visibleInvalids)) {
                angular.forEach(visibleInvalids, function (element) {
                    if (angular.element(element).hasClass('ng-valid-date')) {
                        angular.element(element).parent().addClass('error-warning');
                    } else {
                        angular.element(element).addClass('error-warning');
                    }
                });
            }
        },
        getNEStateIndex: function(taxWithHolingDataObject){
            var index = -1;
            angular.forEach(taxWithHolingDataObject,function(taxWithHolingData,$index){
                if(taxWithHolingData.type === 'State tax' && taxWithHolingData.payDedCode === 'NE'){
                    index = $index;
                }
            });
            return index;
        },
        getTilePanelHtml: function () {

            return '<div class="content-block no-pad tilePanel show"  id="panelContent">' +
                '<div class="policies-info-box policies-info-box-tiles-adjustment">' +
                '<div class="col-md-12 no-pad">' +
                '<button id="overviewClose" type="button" class="close" aria-label="Close" ng-click="closePanel($event)">' +
                '<span aria-hidden="true" class="icon-close-temp"></span>' +
                '</button>' +
                '</div>' +
                '<div class="clear-fix"></div>'+
                '<div class="panel-group" id="accordion">' +
                '<div class="panel panel-default">' +
                '<div id="collapseOne" class="panel-collapse collapse in">' +
                '<div class="panel-body panel-body-background general-notice">' +
                '<p class="blod">{{innerDataLoop.label}}</p>' +
                '<p class="blod">{{innerDataLoop.subdescription}}</p>' +
                '<ul class="no-pad default-cursor" id="loop">' +
                ' <li class="block default-cursor " ng-repeat="lang in innerDataLoop.language">' +
                '<a id="currBook{{$index}}" ng-href="{{lang.url | contentUrl }}" class="pull-left hand color-grey" target="_blank">' +
                '<span class="icon-icon_pdf marg-right-tab-5"></span>{{lang.label}}</a>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                ' </div>';
        },
        openSSOInNewWindow: function (ssoId) {
            window.open("ssoindex.html#/" + ssoId);
        },
        clearAll : function () {
            this.clearStore();
            this.clearCookies();
        },
        clearStore : function () {
			localStorage.clear();
			$window.sessionStorage.clear();
        },
        clearCookies : function () {
           var cookieName = sharedProperties.getCookieName();;
           // Delete known cookies, Angular cookies remove does not work very well in all browsers.
           document.cookie = cookieName + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/;domain=.hrpassport.com" ;
          //console.log("Deleted cookies");


        },
        logout: function (isMessage) {

            // read external properties, openam identifies whether to route to Emp or Admin baded on prefs
            var gotoURL = sharedProperties.platformUrl;
            var ssoURL = sharedProperties.ssoUrl;

            // Bug in a login page,after ?, openAMLogin page does not read first parameter, so add dummy one
            // It works for legacy with no issues.
            //TODO add product info
            var logoutWithMessage = "";
            if ( isMessage ) {
                logoutWithMessage = "&logout=1";
            }
            gotoURL = escape(gotoURL + "?p=true" + logoutWithMessage +"&product=");
            // Delete known cookies of hrpassport domain
            // You cannot delete other domain cookies
            this.clearAll();
            // Give some time for cookie deletions
            $timeout(function () {
                window.location =  ssoURL + "/auth/UI/Logout?realm=sw_hrp&goto="  + gotoURL ;
            }, 1000);
        },
        redirectToLogin: function () {
            window.location = window.location.pathname.substring(0, window.location.pathname.length - 1);
            window.location.reload(true);
        },
        checkIfNavigationExists: function (parentName, childName) {
            var navigationMenu = JSON.parse(SharedDataService.getAppSharedData().navigationsSide);
            var navExists = false;

            if (navigationMenu !== undefined && navigationMenu !== null) {
                if (navigationMenu.length > 0) {
                    var parentMenu = navigationMenu.filter(function (obj) {
                        return obj.name === parentName;
                    });

                    if (parentMenu[0] !== undefined && parentMenu[0] !== null) {
                        if (parentMenu[0].subMenus !== undefined && parentMenu[0].subMenus !== null) {
                            var childMenuSubMenus = parentMenu[0].subMenus;

                            var childMenu = childMenuSubMenus.filter(function (obj) {
                                return obj.name === childName;
                            });

                            if (childMenu !== undefined && childMenu !== null) {
                                if (childMenu.length !== 0) {
                                    navExists = true;
                                }
                                else {
                                    navExists = false;
                                }
                            }
                            else {
                                navExists = false;
                            }
                        }
                    }
                }
            }
            return navExists;
        },
        checkIfWidgetExists: function (parentId, childId) {
            var widgetMenu = JSON.parse(SharedDataService.getAppSharedData().widgetInfo);
            var widgetExists = false;

            if (widgetMenu !== undefined && widgetMenu !== null) {
                if (widgetMenu.length > 0) {
                    var parentMenu = widgetMenu.filter(function (obj) {
                        return obj.menuId === parentId;
                    });

                    if (parentMenu[0] !== undefined && parentMenu[0] !== null) {
                        if (parentMenu[0].subMenus !== undefined && parentMenu[0].subMenus !== null) {
                            var childMenuSubMenus = parentMenu[0].subMenus;

                            var childMenu = childMenuSubMenus.filter(function (obj) {
                                return obj.menuId === childId;
                            });

                            if (childMenu !== undefined && childMenu !== null) {
                                if (childMenu.length !== 0) {
                                    widgetExists = true;
                                }
                                else {
                                    widgetExists = false;
                                }
                            }
                            else {
                                widgetExists = false;
                            }
                        }
                    }
                }
            }
            return widgetExists;
        },
        checkIfNavigationThemeExists: function (theme) {
            var navigationMenu = JSON.parse(SharedDataService.getAppSharedData().navigationsSide);
            var themeExists = false;

            if (navigationMenu !== undefined && navigationMenu !== null) {
                if (navigationMenu.length > 0) {
                    var themeMenu = navigationMenu.filter(function (obj) {
                        return obj.theme === theme;
                    });
                    if (themeMenu !== undefined && themeMenu !== null) {
                        if (themeMenu.length !== 0) {
                            themeExists = true;
                        }
                        else {
                            themeExists = false;
                        }
                    }
                    else {
                        themeExists = false;
                    }
                }
            }
            return themeExists;
        },
        enableValidationAndCache: function(method, restUrl){
            if(method !== constants.get){
                if(restUrl.contains('?')){
                    restUrl += '&enableValidation=true';
                }else{
                    restUrl += '?enableValidation=true';
                }
            }
            return restUrl;
        },
        sortArrayWithEmpname: function (items, string, terminated) {
            var stringMatch = new RegExp(string, 'i');
            if(terminated !=undefined) {
                items = terminated ? items : items.filter(function (item) {
                    return item.emplymntStatus === 'A' || item.emplymntStatus === 'L' || item.emplymntStatus === 'P' || item.emplymntStatus === 'S';
                });
            }
            return items.filter(function(item){
                if(item.name){
                    return stringMatch.test(item.name) || stringMatch.test(item.employeeId);
                }
                if(item.employeeName){
                    return stringMatch.test(item.employeeName) || stringMatch.test(item.employeeId);
                }
            });
        },
        sortArrayWithOtherAtBottom: function (arr) {
            var sortedArray,
                otherItem;
            sortedArray = $filter('orderBy')(arr, 'value');
            angular.forEach(sortedArray, function (input, index) {
                if(input.value === "Other") {
                    otherItem = sortedArray.splice(index, 1)[0];
                }
            });
            sortedArray.push(otherItem);
            return sortedArray;
        },
        convertToServerTimeZone: function (date){
            //EST
            var offset = constants[constants.timezone],
                clientDate;
            if (date) {
                clientDate = new Date(date);
            } else {
                clientDate = new Date();
            }

            var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
            var serverDate = new Date(utc + (3600000*offset));
            if (serverDate.toLocaleString().indexOf(',') >= 0) {
                return serverDate.toLocaleString().split(',')[0];
            } else {
                return serverDate.toLocaleString().split(' ')[0];
            }

        },
        employeeLeaveType: function (item) {
            var getIdValue = '';
            Object.keys(item).map(function (value) {
                if(value.contains('Values')){
                    getIdValue = value.split("Values")[0]+'Id';
                    if(item[value].length ===0){
                        item[value].push({ "key": "", "value": "Not Available" });
                        (item[getIdValue].length) ? item[getIdValue] = "" : angular.noop();
                    }else{
                        (item[getIdValue] === '') ? item[getIdValue] = "NOPLAN" : angular.noop();
                    }
                }
            });
        },
        mapObjectData :  function(mainIndex,obj,dataName,mapedKeyName,isKeyIndex){
            var keys = Object.keys(obj);
            keys.map(function (keyName,index) {
                isKeyIndex ? mainIndex = index : angular.noop();
                dataName[mapedKeyName+'['+ (mainIndex ) +']['+keyName+']'] = obj[keyName];
            });
        },
        filterRes :  function(arr,mapedKeyName,isKeyIndex) {
            var voluntaryDeductions = {};
            for(var i=0;i < arr.length;i++){
                var obj = arr[i];
                this.mapObjectData(i,obj,voluntaryDeductions,mapedKeyName,isKeyIndex);
            }
            return voluntaryDeductions;

        },

        mapData : function (obj,dataName){
            var voluntaryDeductions = {};
            var keys = Object.keys(obj);
            keys.map(function (keyName,index) {
                voluntaryDeductions[dataName+'['+keyName+']'] = obj[keyName];
            });
            return voluntaryDeductions;
    },
        checkForExceptionalEnv : function (env){
			var urls = {
					"env": env,
					"betaURL": sharedProperties.platformUrl,
					"classicURL": sharedProperties.hrpUrl
				};
			if (env === 'sr' || env === 'lr') {
				return urls;
			}
        },

        sortDscArr:function(items, prop) {
        var list = items.sort(function(a, b) {
            var nameA = a[prop].toUpperCase(); // ignore upper and lowercase
            var nameB = b[prop].toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        return list;
        },

        sortAscArr:function(items, prop) {
        var list = items.sort(function(a, b) {
            var nameA = a[prop].toUpperCase(); // ignore upper and lowercase
            var nameB = b[prop].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        return list;
        },

        changeWorkPhoneNumberFormat: function (workPhoneNumber) {
            return workPhoneNumber.toString().trim().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gi, '-');
        },

        GroupByItem:function (arr,property) {
            return arr.reduce(function(memo, x) {
                if (!memo[x[property]]) { memo[x[property]] = []; }
                memo[x[property]].push(x);
                return memo;
            }, {});
        }


    };
});
