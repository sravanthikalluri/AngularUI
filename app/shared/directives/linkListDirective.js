'use strict';
trinetApp.directive('linkList',
    function (gso, SharedDataService) {
        return {
            restrict: 'AE',
            scope: {
                summaryData: '=',
                startDate: '=',
                endDate: '=',
                planType: '=',
                planKey: '=',
                planCode: '='
            },
            templateUrl: 'app/shared/views/linkListView.html',
            controller: function ($scope) {
                $scope.payFrequencyKey = {
                    S: "Semi Monthly",
                    W: "Weekly",
                    B: "Bi Weekly",
                    M: "Monthly"
                };

                $scope.openExecutiveModal = function () {
                    $scope.dataForModal = {
                        summaryData: $scope.summaryData,
                        startDate: $scope.startDate,
                        endDate: $scope.endDate,
                        planType: $scope.planType,
                        planKey: $scope.planKey,
                        planCode: $scope.planCode
                    };
                    $scope.translation = $scope.$parent.translation;
                    gso.getNGDialog().open({
                        templateUrl: 'app/components/benefits/benefitsResource/executive/executiveTemplate.html',
                        scope: $scope,
                        closeByDocument: false,
                        closeByEscape: false,
                        controller: 'executiveTemplateCtrl'
                    });


                }

            }
        }

    });
