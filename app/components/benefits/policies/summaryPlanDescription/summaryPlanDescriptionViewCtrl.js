/*
 *  Program Description / functionality: To Fetch Summary Plan Information.
 */
'use strict';
trinetApp.controller('summaryPlanDescriptionViewCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.summaryPlanPdfData = null;
        /*Fetching summaryPlanDescription information */
        gso.getCrudService().execute(constants.get, benefitsUrlConfig.policiesEmpApi + benefitsUrlConfig.policiesUrl + benefitsUrlConfig.resources.benefitPolicy + '/' +
            gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/' + 'summary-plan', null,
            function (response) {
                $scope.summaryPlanPdfData = response;
                $scope.getPdfLink = function (num) {
                    return new Array(num);
                };
                $scope.visionData = response.vision;
                $scope.lifeData = response.life;
                $scope.dentalData = response.dental;
                $scope.disability = response.disability;
                $scope.medicalData = response.medical;
                $scope.criticalIllnessData = response.criticalIllness;
                $scope.legalServicesData = response.legalServices;
                $scope.flexibleSpendingAmountsData = response.flexibleSpendingAccounts;
                $scope.employeeAssistancePlan = response.employeeAssistancePlan[0].sub[0].subpanes;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        $scope.atenaPopUp = function (index, type, sbc) {
            if (type === 'medical') {
                $scope.planData = $scope.medicalData[index];
                $scope.planName = $scope.medicalData[index].text;
                $scope.planType = 'Medical';
                $scope.sbcValue = sbc;
            }
            else if (type === 'vision') {
                $scope.planData = $scope.visionData[index];
                $scope.planName = $scope.visionData[index].text;
                $scope.planType = 'Vision';
            }
            else if (type === 'life') {
                $scope.planData = $scope.lifeData[index];
                $scope.planName = $scope.lifeData[index].text;
                $scope.planType = 'Life';
            }
            else if (type === 'dental') {
                $scope.planData = $scope.dentalData[index];
                $scope.planName = $scope.dentalData[index].text;
                $scope.planType = 'Dental';
            } else if (type === 'disability') {
                $scope.planData = $scope.disability[index];
                $scope.planName = $scope.disability[index].text;
                $scope.planType = 'Disability';
            } else if (type === 'criticalIllness') {
                $scope.planData = $scope.criticalIllnessData[index];
                $scope.planName = $scope.criticalIllnessData[index].text;
                $scope.planType = 'Critical Illness';
            } else if (type === 'legalServices') {
                $scope.planData = $scope.legalServicesData[index];
                $scope.planName = $scope.legalServicesData[index].text;
                $scope.planType = 'Legal Services';
            } else if (type === 'flexibleSpendingAccounts') {
                $scope.planData = $scope.flexibleSpendingAmountsData[index];
                $scope.planName = $scope.flexibleSpendingAmountsData[index].text;
                $scope.planType = 'Flexible Spending Accounts';
            }
            var body = angular.element('body');
            body.addClass('medium-popup');
            var dialog = gso.getNGDialog().open({
                template: fileConfig.benefits.summaryModal,
                controller: '',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false

            });
            dialog.closePromise.then(function () {
                body.removeClass('medium-popup');
            });
        };
        $scope.bindImgUrl = function (data) {
            var imageUrl = images[data];
            return imageUrl;
        };

    }]);