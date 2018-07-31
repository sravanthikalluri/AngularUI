'use strict';
trinetApp.controller('complianceCtrl', ['$scope','gso',
    function ($scope,gso) {
        $scope.checkStatus = false;
        var companyId = gso.getAppConfig().companyId;
        var userId = gso.getAppConfig().userId;
        var url = '/api-profile/v1/identity' +'/'+companyId+ '/'+userId+'/preferences';
        var complianceCenterUrls = {
            'trinetReferenceLibrary': globalUrlConfig.resources.trinetRefLibUrl,
            'trinetNavigatorSuite': globalUrlConfig.resources.trinetNavigatorSuiteUrl,
            'trinetLegalServices': ''
        };

        $scope.openDialog = function(target){
            $scope.complianceCenterSelectedUrl = complianceCenterUrls[target];
            gso.getCrudService().execute(constants.get,url,null,
                function(data){
                    var preference = data.filter(function(item){
                        if(item.preferenceType === 'THIRD_PARTY_MODAL_HIDE'){
                            return item.preferenceValue;
                        }
                    });
                    if(preference[0]){
                        preference[0].preferenceValue === 'Y' ? $scope.openThirdPartySite() :  $scope.openModal();
                    }
                    if(!preference || !preference[0]){
                        $scope.openModal();
                    }
                },
                function(error){
                    $scope.errorAlert = error;
                }
            );

        }

        $scope.openThirdPartySite = function(){
            var goToUrl = '#/ssowidget' + $scope.complianceCenterSelectedUrl;
            window.open(goToUrl, 'child');
            gso.getNGDialog().closeAll();
        }

        $scope.suppressModal = function(){
            $scope.checkStatus= !$scope.checkStatus;
            var data = {
                preferenceType  : "THIRD_PARTY_MODAL_HIDE",
                preferenceValue : $scope.checkStatus ? 'Y' : 'N'
            };
            gso.getCrudService().execute(constants.put,url,data,
                function(data){},
                function(error){
                    $scope.errorAlert = error;
                }
            );
        }

        $scope.openModal = function(){
            gso.getNGDialog().open({
                templateUrl: 'app/shared/views/thirdPartyPopup.html',
                scope: $scope,
                closeByDocument: false,
                closeByEscape: false
            });
        }
    }]);
