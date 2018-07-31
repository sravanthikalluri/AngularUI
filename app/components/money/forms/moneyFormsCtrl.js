/*
 Program Description / functionality:
 1) Fetch all My Money Form tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('moneyFormsCtrl', ['$scope', 'gso',function ($scope, gso) {
        $scope.stateChange = true;
        $scope.quantity = 3;
        $scope.divBoolValue = true;
        $scope.titleIndex = 0;
        $scope.object = {
            titleIndex: 0
        };
        $scope.innerDataLoop = null || [];

        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }

        $scope.companyId = gso.getAppConfig().companyId;
        $scope.payrollhtmlPath = 'app/components/money/forms/payrollForm.html';
        /**
         *
         */

        function getStateWithHoldingIndex(){
            var index = null;
            angular.forEach($scope.moneyFormData,function(forms,$index){
               if(forms.urlType === 'stateWithHolding'){
                   index = $index;
               }
            });

            return index;

        }
        $scope.toggleStates = function (event,value) {
               event.preventDefault();
               $scope.stateChange =! $scope.stateChange;
                var index = getStateWithHoldingIndex();
               if(value === 'close'){
                   if(index){
                       $scope.moneyFormData[index] = $scope.tempStateTaxData;
                   }
               }else{
                   var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                        "/" + $scope.companyId +
                        "/" + $scope.appUserId +
                        "/stateTaxForms" ;

                   gso.getCrudService().execute(constants.get, url, null,
                        function (response) {
                            if(index){
                                $scope.moneyFormData[index] = response.forms[0];
                            }
                        },
                        function (data) {
                            $scope.errorAlert = data;
                        }
                    );
               }
        };

        /**
         * get the selected tab data based on the parameter
         * @param urlType
         */
        $scope.getSelectedTabData = function (urlType) {
            var content;

            $scope.checked = urlType;

            var URL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType + "&countryCode=" + gso.getAppConfig().countryCode;

            content = angular.element('#' + urlType);
            if (content.children().length === 0) {
                gso.getCrudService().execute(constants.get, URL, null,
                    function (response) {
                        if (urlType === response.urlType && urlType !== 'employee' && urlType !== 'manager') {
                            $scope.moneyFormsData = response;

                            content = angular.element('#' + urlType);

                            content.html(gso.getCompile()('<div class="col-md-12 retirement-plan-enrolment" ng-if = "moneyFormsData.sub.length === 0" >' +
                                '<div class="no-enrolment">' +
                                '<h3>Forms are Not Available</h3>' +
                                '</div></div>' +
                                '<ul class="no-pad no-top-pad" ng-repeat="h in moneyFormsData.sub"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{h.url | contentUrl}}">{{h.label}}</a></li>' +
                                '</ul>')($scope));
                        }
                        else if (urlType === 'employee') {
                            $scope.employeeFormData = response;
                            content = angular.element('#' + urlType);

                            content.html(gso.getCompile()('<div>' +
                                '<h2 class="company-form-title">Employee Form</h2>' +
                                '<div class="col-md-12 retirement-plan-enrolment" ng-if = "employeeFormData.employeeForm.length === 0" >' +
                                '<div class="no-enrolment">' +
                                '<h3>Data is Not Available</h3>' +
                                '</div></div>' +
                                ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.employeeForm"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{form.url | contentUrl}}">{{form.linkName}}</a></li>' +
                                '</ul></div></div>' +
                                '<div class="marg-top">' +
                                '<h2 class="company-form-title">Your Company Forms</h2>' +
                                ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.companyForm"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{form.url | contentUrl}}">{{form.linkName}}</a></li>' +
                                '</ul></div></div>' +
                                '<div class="marg-top">' +
                                '<h2 class="company-form-title">Your Company REQUIRED Forms</h2>' +
                                ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.companyReqForm"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{form.url | contentUrl}}">{{form.linkName}}</a></li>' +
                                '</ul></div></div>'
                            )($scope));
                        }
                        else if (urlType === 'manager') {
                            $scope.managersData = response.sub[0];
                            $scope.managerDat = response.sub[1];
                            content = angular.element('#' + urlType);

                            content.html(gso.getCompile()('<h2 class="company-form-title" >{{managersData.text}}</h2>' +
                                '<div class="col-md-12 retirement-plan-enrolment" ng-if = "managersData.length === 0" >' +
                                '<div class="no-enrolment">' +
                                '<h3>Forms are Not Available</h3>' +
                                '</div></div>' +
                                '<ul class="no-pad no-top-pad" ng-repeat="h in managersData.managerForms"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{h.url | contentUrl}}">{{h.label}}</a></li>' +
                                '</ul>' +
                                '<h2 class="company-form-title" >{{managerDat.text}}</h2>' +
                                '<div class="col-md-12 retirement-plan-enrolment" ng-if = "managerDat.length === 0" >' +
                                '<div class="no-enrolment">' +
                                '<h3>Forms are Not Available</h3>' +
                                '</div></div>' +
                                '<div ng-repeat="data in managerDat.managerForms">' +
                                '<h3 style="font-size:18px;color:#0073CF;padding:10px;">{{data.text}}</h3>' +
                                '<ul class="no-pad no-top-pad" ng-repeat="h in data.sub"> ' +
                                ' <li><span class="icon-icon_pdf"></span>' +
                                '<a target="_blank" ng-href="{{h.url | contentUrl}}">{{h.label}}</a></li>' +
                                '</ul>')($scope));
                        }
                    },
                    function (data) {
                        $scope.errorAlert = data;
                    }
                );
            }

        };


        /**
         * initialize money forms data
         */
        $scope.loadForms = function () {
            var url = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId +
                "/forms?countryCode=" + gso.getAppConfig().countryCode+"&module=money";
            gso.getCrudService().execute(constants.get, url, null,
                function (response) {
                    $scope.moneyFormData = response.forms;
                    var index = getStateWithHoldingIndex();
                    if(index){
                        $scope.tempStateTaxData = $scope.moneyFormData[index];
                    }
                } ,
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        };


        $scope.payRollFun = function (index, $event, acc) {
            var selectTilevalue,
                $this = angular.element($event.currentTarget);
            $scope.innerDataLoop = acc;

            if (index % 2 !== 0) {
                selectTilevalue = index;
                $scope.selectedArrow2 = true;
                $scope.selectedArrow1 = false;

            } else {
                selectTilevalue = index + 1;
                $scope.selectedArrow1 = true;
                $scope.selectedArrow2 = false;
            }

            var selectPay = $this.closest('div#PayrollBenefitsMain').find("div#selectPay" + selectTilevalue),
                panelHtmlContent = gso.getUtilService().getTilePanelHtml(),
                panelContent = angular.element('div#panelContent');


            if (panelContent.length > 0) {
                panelContent.remove();
            }

            if (selectPay.length === 0) {
                selectPay = $this.closest('div#PayrollBenefitsMain').find("div#selectPay" + index);
            }

            selectPay.after(gso.getCompile()(panelHtmlContent)($scope));


        };

        $scope.selectTabAcc = function (value, acc, event) {
            $scope.tab = value;
            $scope.payRollFun(value, event, acc);

        };

        $scope.closePanel = function (event) {
            var $this = angular.element(event.currentTarget),
                contentBlock = $this.closest('div.content-block');
            contentBlock.remove();
        };

        $scope.loadForms();

    }]);
