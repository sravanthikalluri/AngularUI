/*
 Program Description / functionality: To Fetch Benefits Guide Book Information.
 Parameter: companyId
 */
'use strict';
trinetApp.controller('benefitsGuideBookViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.initBenefitsGuideBookData = function () {
            $scope.benefitsGuideBookData = gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
                gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'guide-book', null,
                function (response) {
                    $scope.benefitGuideBookPdfData = response;
                    /*if user is not Canadian*/
                    if ($scope.benefitGuideBookPdfData.canadian === false) {
                        $scope.nonCandianPdfData = $scope.benefitGuideBookPdfData.guideBookDesc;
                        $scope.hidecandian = true;
                    }/*if user is Canadian*/
                    else {
                        $scope.candianPdfData = $scope.benefitGuideBookPdfData.guideBookDesc;
                    }
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.initBenefitsGuideBookData();

    }]);