/*
 This directive is used to dynamically fetch the sso Artifacts
 and construct the request based on the payload.
 This is needed since we have a heterogenious group of SingleSignOn , with
 different parameters , http methods and sso servers.
 @Author : Laji Thomas
 */

'use strict';
trinetApp.directive('ssowidget', ['$window', 'ssoService', 'crudService', 'appConfig', 'companiesService', function ($window, ssoService, crudService, appConfig, companiesService) {

    return {
        restrict: 'EA',
        scope: {
            urlParams: "@"
        },
        controller: ['$scope', '$sce', function ($scope, $sce) {
            $scope.postParams = [];
            $scope.spinnerClass = true;
            $scope.showErrorClass = false;
            $scope.postURL = "";

            $scope.bindErrorMessage = function (data) {
                var errorAlert = {
                    _statusCode: "503",
                    _statusMessage: "Service UnAvailable"
                };

                if (data && data._statusCode && data._statusMessage) {
                    errorAlert._statusCode = data._statusCode;
                    errorAlert._statusMessage = data._statusMessage;
                }
                $scope.spinnerClass = false;
                $scope.errorAlert = errorAlert;
            };

            $scope.doPOST = function (data) {
                $scope.spinnerClass = false;
                $scope.postURL = $sce.trustAsResourceUrl(data.ssoServerURL);
                var params = data.postParams.contains("&") ? data.postParams.split("&") : [];

                params.map(function (param) {
                    var keyValue = param.split("=");
                    var retObj = {
                        name: keyValue[0],
                        value: keyValue[1]
                    };
                    $scope.postParams.push(retObj);
                    return retObj;
                });

                // Let the current process complete, so the dynamic inputs are
                // available to be posted (Without this , the post will not be
                // having any dynamically added inputs). Another method would be
                // to watch the form element , for childre being added.
                // This seems to be simpler.

                $window.setTimeout(function () {
                    angular.element('.ssopost')[0].submit();
                }, 0);
            };

            $scope.doGET = function (ssoUrl) {
                $scope.spinnerClass = false;
                $window.location.href = ssoUrl;
            };

            $scope.validateData = function (data) {
                return data && data.ssoServerURL && data.httpMethod;
            };

            $scope.isGetRequest = function (response) {
                return response.httpMethod.toUpperCase() === 'GET';
            };

            $scope.processServerResponse = function (ssoArtifactsData, resourceURL) {
                if ($scope.validateData(ssoArtifactsData)) {
                    ssoService.cacheSSOResponseToLocalStorage(ssoArtifactsData, resourceURL);
                    if ($scope.isGetRequest(ssoArtifactsData)) {
                        $scope.doGET(ssoArtifactsData.ssoServerURL);
                    } else {
                        $scope.doPOST(ssoArtifactsData);
                    }
                }
            };

            (function init() {
                var companyId = companiesService.getCompanyId();
                var peoId = companiesService.getPeoId();
                appConfig.userId = $window.sessionStorage.getItem('empId');
                crudService.execute(constants.get, profileUrlConfig.profileApi + profileUrlConfig.profileBaseUrl + profileUrlConfig.resources.platform + appConfig.userId + '/' + profileUrlConfig.resources.companies, null,
                    function (response) {
                        appConfig.companyId = companyId || response.companyInfo[0].companyId;
                        appConfig.peoId = peoId || response.companyInfo[0].peoId;

                        var resourceURL = ssoService.construtURLforGetSSOArtifactForID(
                            globalUrlConfig.ssoArtifactBase,
                            globalUrlConfig.resources.ssoArtifacts, angular.fromJson($scope.urlParams));

                        var ssoArtifacts = ssoService.getSSOResponseFromLocalStorage(resourceURL);
                        if (!ssoArtifacts) {
                            crudService.execute(constants.get, resourceURL, null,
                                function (ssoArtifacts) {
                                    $scope.processServerResponse(ssoArtifacts, resourceURL);
                                },
                                function (error) {
                                    $scope.bindErrorMessage(error);
                                });
                        } else {
                            $scope.processServerResponse(ssoArtifacts, resourceURL);
                        }


                    },
                    function (error) {
                        $scope.bindErrorMessage(error);
                    }
                );
            })();
        }],
        templateUrl: "app/shared/directives/sso/ssoTemplateView.html"
            //template: '<div layout="row" layout-xs="column" layout-align="center center" >'+
            //                        '<alert-view></alert-view>'+
            //                        '<div ng-class="{&quot;spinner-loader&quot;: spinnerClass}"></div>'+
            //                        '<form method="POST" action="" class="ssopost" novalidate>'+
            //                            '<p data-ng-repeat="param in postParams">'+
            //                                '<input type="text" name="{{param.name}}" value="{{param.value}}">'+
            //                            '</p>'+
            //                        '</form></div>'
    };
}]);
