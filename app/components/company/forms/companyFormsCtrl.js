/*
 Program Description / functionality:
 1) Fetch all My Money Form tiles information.
 2) Page Print Functionality
 */
'use strict';
trinetApp.controller('companyFormsCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        if (typeof $scope.appUserId === 'undefined') {
            $scope.appUserId = gso.getAppConfig().userId;
        }
        $scope.loadForms = function () {
            var formURL = companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl + companyUrlConfig.resources.forms +
                "/" + gso.getAppConfig().companyId + "/" + $scope.appUserId +
                "/companyForms?pfClient=" + gso.getAppConfig().pfClient;
            gso.getCrudService().execute(constants.get, formURL, null,
                function (response) {
                    $scope.companyFormData = response.forms;
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );

        };

        function removeActive(){
         angular.element('div#moneyForm-acc').find('.active').removeClass('active');
        }
        /*payroll forms logic */
        $scope.payRollFun = function (index, $event, acc) {
            var selectTilevalue,
                $this = angular.element($event.currentTarget),
                titleBlock = $this.find('div.title-block');
            $scope.innerDataLoop = acc;

            if (index % 2 !== 0) {
                selectTilevalue = index;

            } else {
                selectTilevalue = index + 1;
            }

            var selectPay = $this.closest('div#PayrollBenefitsMain').find("div#selectPay" + selectTilevalue),
                panelHtmlContent = gso.getUtilService().getTilePanelHtml(),
                panelContent = angular.element('div#panelContent');

               // othersub2

                removeActive();
                titleBlock.addClass('active');



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
            removeActive();
        };
        $scope.loadForms();

    }]);
