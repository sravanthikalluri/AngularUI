/*
 * Program Description / functionality: To Fetch Build Maintain Information.
 */
'use strict';
trinetApp.controller('buildMaintainViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        gso.getUtilService().hideDIVS(true);
        $scope.buildmaintainData = null;
        $scope.check = true;
        $scope.checkedList = [];
        $scope.companyName = gso.getAppConfig().companyName;
        var data = {};
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'benefit-states?payFrequency=S', null,
            function (response) {
                $scope.buildmaintainData = response;
                angular.element('.states').each(function (index, obj) {
                    angular.forEach($scope.buildmaintainData.states, function(state){
                        if (obj.value === state) {
                            obj.checked = true;
                            $scope.checked = true;
                        }
                    })
                });
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );

        $scope.submitForm = function () {
            $scope.checkedList = [];
            angular.element('.states').each(function (index, obj) {
                if (obj.checked === true) {
                    $scope.checkedList.push(obj.value);
                }
            });
            data.company = $scope.buildmaintainData.company;
            data.states = $scope.checkedList;
            data.payFrequency = $scope.buildmaintainData.payFrequency;
            data = JSON.stringify(data);
            gso.getCrudService().execute(constants.put, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPlan + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'benefit-states', data,
                function () {
                    
                     gso.getNGDialog().open({
                        templateUrl: 'app/components/benefits/policies/benefitsSummary/buildMaintainStates/statesBuildData/statesBuildDataView.html',
                        controller: 'statesBuildDataCtrl',
                        scope: $scope,
                        preCloseCallback: function(value) {
                            $scope.buildMaintainModal.close();
                        }
                    });
                    $scope.$on('ngDialog.opened', function (event, $dialog) {
                        $dialog.find('.ngdialog-content').css('width', '80%');
                    });
                    data = {};
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
    }]);
