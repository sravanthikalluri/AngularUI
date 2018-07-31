/*
 Program Description / functionality:
 Fetch Tax with holiday Form tiles information.
 */
'use strict';
trinetApp.controller('taxWithHoldingFormCtrl', ['$scope','gso',function ($scope,gso) {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.loadForms = function () {
            var taxformURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId +
                "/forms?countryCode=" + gso.getAppConfig().countryCode + "&module=twh";
            gso.getCrudService().execute(constants.get, taxformURL, null,
                function (response) {
                    $scope.taxFormData = response.forms;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        };
        $scope.getSelectedTabData = function (urlType, value) {

            var content;
            var URL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId + "/forms?formType=" + urlType + "&countryCode=" + gso.getAppConfig().countryCode;

            gso.getCrudService().execute(constants.get, URL, null,
                function (response) {
                    $scope.taxTileFormData = response;
                    if (angular.element('#nav').hasClass('content-block')) {
                        angular.element("div.content-block").remove();
                    }
                    if (value > 0) {
                        if (value % 2 !== 0) {
                            $scope.indexValue = value;
                            $scope.arrowPos = false;
                        } else {
                            $scope.indexValue = value + 1;
                            $scope.arrowPos = true;
                        }
                    } else {
                        $scope.indexValue = 0;
                        $scope.arrowPos = true;
                    }

                    content = angular.element('#selected' + $scope.indexValue);


                    content.after(gso.getCompile()(
                        '<div class="col-md-12 content-block no-pad tilePanel taxformadjust" id="nav">' +
                        '<div class="col-md-12" ng-if="arrowPos">' +
                        '<div class="col-md-6 text-center"><span class="arrow-up "></span></div>' +
                        '<div class="col-md-6 text-center"><span class="arrow-up hidden"></span></div>' +
                        '</div>' +
                        '<div class="col-md-12" ng-if="!arrowPos">' +
                        '<div class="col-md-6 text-center "><span class="arrow-up hidden"></span></div>' +
                        '<div class="col-md-6 text-center"><span class="arrow-up"></span></div>' +
                        '</div>' +
                        '<div class="policies-info-box">' +
                        '<div class="col-md-12">' +
                        '<button id="guideClose" type="button" class="close" aria-label="Close" ng-click="closePanel($event)">' +
                        '<span aria-hidden="true" class="icon-close-temp"></span>' +
                        '</button>' +
                        '</div>' +
                        '<div class="panel-group" id="accordion">' +
                        '<div class="panel panel-default">' +
                        '<div id="collapseOne" class="panel-collapse collapse in">' +
                        '<div class="panel-body panel-body-background general-notice">' +

                        '<ul class="no-pad" ng-repeat="form in taxTileFormData.employeeForm[0].sub">' +
                        '<li class="block">' +
                        '<a id="currBook{{$index}}" ng-href="{{form.url | contentUrl}}" class="pull-left" target="_blank"><span class="icon-icon_pdf"></span>' +
                        '<span id="currBookdates{{$index}}">{{form.label}}	</span>' +
                        '</a>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '</div>' +
                        '</div>'
                    )($scope));

                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.closePanel = function (event) {
            var $this = angular.element(event.currentTarget),
                contentBlock = $this.closest('div.content-block');
            contentBlock.remove();
        };
        $scope.loadForms();

    }]);