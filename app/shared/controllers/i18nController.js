/**
 * Description: This is controller is used to find locale information and execute the translate service function
 *
 * Author:Krishnam Raju Kollu
 * @TODO, rename this controller to include the global preferenances too.
 */
'use strict';
trinetApp.controller('i18nController', ['$scope', 'translationService', '$location',

    function ($scope, translationService, $location) {
  
        var ssoPathRegex = /^\/ssowidget\/\w{2,15}$/i;
                                        
        //Run translation if selected language changes
        $scope.translate = function () {
            translationService.getTranslation($scope, $scope.selectedLanguage);

        };

        $scope.selectedLanguage = navigator.userLanguage || navigator.language;

        $scope.translate();
        /*Date and Time*/
        $scope.currentTime = Date.now();
        $scope.preferece = {};
        $scope.preferece.topWindow = ssoPathRegex.test($location.path());
    }]);