/**
 * Description: This is service is used to load i18n information from all json
 * files for different modules based on locale
 * Author:Krishnam Raju Kollu
 */
'use strict';
trinetApp.service('translationService', function ($http) {

    this.getTranslation = function ($scope, language) {
        var moduleArray = constants.modules.split(",");
        var mainData = {};
        var languageFilePath;
        var responseObj = {};
        /*jshint -W083 */
        for (var i = 0; i < moduleArray.length; i++) {
            languageFilePath = constants.i18nPath + moduleArray[i] + '/' + language + '.json';
            $http.get(languageFilePath).then(function (response) {
                responseObj = response.status;
                angular.extend(mainData, response.data);
                $scope.translation = mainData;
            });
            if (responseObj !== 200) {
                languageFilePath = constants.i18nPath + moduleArray[i] + '/' + constants.defaultLanguage + '.json';
                $http.get(languageFilePath).then(function (response) {
                    angular.extend(mainData, response.data);
                    $scope.translation = mainData;
                });
            }
        }
    };
});