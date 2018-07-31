/**
 * Created by ganesh on 5/20/2016.
 */
'use strict';
trinetApp.service('gso', ['utilService', 'crudService', 'internationalApiService', 'appConfig', '$compile', '$state', 'ngDialog', '$stateParams','apiConfigDataService','SharedDataService',
    function (utilService, crudService, internationalApiService, appConfig, $compile, $state, ngDialog, $stateParams,apiConfigDataService,SharedDataService) {

    this.getUtilService = function(){
        return utilService;
    };
    this.getCrudService = function(){
        return crudService;
    };
    this.getAppConfig = function(){
        return appConfig;
    };
    this.getCompile = function(){
        return $compile;
    };
    this.getRoute = function(){
        return $state;
    };
    this.getRouteParams = function(){
        return $stateParams;
    };
    this.getNGDialog = function(){
       return ngDialog;
    };
    this.getAPIConfigDataService = function(){
        return apiConfigDataService;
    };
    this.getInternationalApiService = function(){
        return internationalApiService;
    };

    this.getSharedData = function (){
       return sharedData;
    }

}]);
