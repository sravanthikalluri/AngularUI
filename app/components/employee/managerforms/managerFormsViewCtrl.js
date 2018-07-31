/*
 Program Description / functionality:
 1) Fetch all Manage Employee Form tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('managerFormViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.tab = 0;
        $scope.selectTab = function (setTab) {
            gso.getUtilService().setSidebarActive('sidebar' + setTab);
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.countMe = function (urlType) {
            var content;

            $scope.checked = urlType;
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/forms?formType=" + urlType + "&countryCode=" + gso.getAppConfig().countryCode, null,
                function (response) {
                    if (urlType === response.urlType && urlType !== 'employee' && urlType !== 'manager') {
                        $scope.allFormsData = response;
                        content = angular.element('#' + urlType);
                        content.html(gso.getCompile()('<div class="col-md-12 retirement-plan-enrolment" ng-if = "allFormsData.sub.length === 0" >' +
                            '<div class="no-enrolment">' +
                            '<h3>Forms are Not Available</h3>' +
                            '</div></div>' +
                            '<ul class="no-pad no-top-pad" ng-repeat="h in allFormsData.sub" ng-init="iconType(h.type)"> ' +
                            ' <li>' +
                            '<a id="allForms{{$index}}" target="_blank" ng-href="{{h.url | contentUrl}}">' +
                            '<span class="icon-icon_pdf" ng-if="h.type == iconTypePdf"></span><span class="icon-icon_excel" ng-if="h.type == iconTypeExcel"></span>{{h.label}}</a></li>' +

                            '</ul>')($scope));
                    }
                    else if (urlType === 'employee') {
                        $scope.employeeFormData = response;
                        content = angular.element('#' + urlType);
                        content.html(gso.getCompile()('<div>' +
                            '<h2 class="company-form-title">Employee Form</h2>' +
                            '<div class="col-md-12 retirement-plan-enrolment" ng-if = "employeeFormData.employeeForm.length === 0" >' +
                            '<div class="no-enrolment">' +
                            '<h3>Forms are Not Available</h3>' +
                            '</div></div>' +
                            ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.employeeForm"> ' +
                            ' <li>' +
                            '<a id="empForm{{$index}}" target="_blank" ng-href="{{form.url | contentUrl}}"><span class="icon-icon_pdf"></span>{{form.linkName}}</a></li>' +
                            '</ul></div></div>' +
                            '<div class="marg-top">' +
                            '<h2 class="company-form-title">Your Company Forms</h2>' +
                            '<div class="col-md-12 retirement-plan-enrolment" ng-if = "employeeFormData.companyForm.length === 0" >' +
                            '<div class="no-enrolment">' +
                            '<h3>Forms are Not Available</h3>' +
                            '</div></div>' +
                            ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.companyForm"> ' +
                            ' <li>' +
                            '<a id="companyForm{{$index}}" target="_blank" ng-href="{{form.url | contentUrl}}"><span class="icon-icon_pdf"></span>{{form.linkName}}</a></li>' +
                            '</ul></div></div>' +
                            '<div class="marg-top">' +
                            '<h2 class="company-form-title">Your Company REQUIRED Forms</h2>' +
                            '<div class="col-md-12 retirement-plan-enrolment" ng-if = "employeeFormData.companyReqForm.length === 0" >' +
                            '<div class="no-enrolment">' +
                            '<h3>Forms are Not Available</h3>' +
                            '</div></div>' +
                            ' <ul class="no-pad no-top-pad" ng-repeat="form in employeeFormData.companyReqForm"> ' +
                            ' <li>' +
                            '<a id="companyReqForm{{$index}}" target="_blank" ng-href="{{form.url | contentUrl}}"><span class="icon-icon_pdf"></span>{{form.linkName}}</a></li>' +
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
                            '<ul class="no-pad no-top-pad" ng-repeat="h in managersData.managerForms"  ng-init="iconType(h.type)"> ' +
                            ' <li>' +
                            '<a id="managerForm{{$index}}" target="_blank" ng-href="{{h.url | contentUrl}}"><span class="icon-icon_pdf" ng-if="h.type == iconTypePdf"></span><span class="icon-icon_excel" ng-if="h.type == iconTypeExcel"></span>{{h.label}}</a></li>' +
                            '</ul>' +
                            '<h2 class="company-form-title" >{{managerDat.text}}</h2>' +
                            '<div class="col-md-12 retirement-plan-enrolment" ng-if = "managerDat.length === 0" >' +
                            '<div class="no-enrolment">' +
                            '<h3>Forms are Not Available</h3>' +
                            '</div></div>' +
                            '<div ng-repeat="data in managerDat.managerForms" ng-init="iconType(h.type)">' +
                            '<h3 style="font-size:18px;color:#0073CF;padding:10px;">{{data.text}}</h3>' +
                            '<ul class="no-pad no-top-pad" ng-repeat="h in data.sub"> ' +
                            ' <li>' +
                            '<a id="manageForm{{$index}}" target="_blank" ng-href="{{h.url | contentUrl}}"><span class="icon-icon_pdf" ng-if="h.type == iconTypePdf"></span><span class="icon-icon_excel" ng-if="h.type == iconTypeExcel"></span>{{h.label}}</a></li>' +
                            '</ul>' + '</div>')($scope));
                    }

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.iconType = function (value) {
            if (value === 'pdf') {
                $scope.iconTypePdf = value;
            } else {
                $scope.iconTypeExcel = value;
            }

        };
        /*Fetching  benefit policy information */
        $scope.loadForms = function () {
            gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().userId + "/forms?countryCode=" + gso.getAppConfig().countryCode, null,
                function (response) {
                    $scope.managerFormData = response.forms;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };

        $scope.closePanel = function () {
            $scope.tab = 0;
        };

        $scope.loadForms();
    }]);