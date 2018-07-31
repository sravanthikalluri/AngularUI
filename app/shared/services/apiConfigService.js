/**
 * Created by ganesh on 9/13/2016.
 */
'use strict';
trinetApp.service('apiConfigService', ['genericService','apiConfigDataService', function (genericService,apiConfigDataService) {
    return {
        execAll:function(){

            genericService.countries().then(function (response) {
                apiConfigDataService.setCountries(response.data.data);
            });

            genericService.gender().then(function (response) {
                apiConfigDataService.setGenders(response.data.data);
            });

            genericService.suffix().then(function (response) {
                apiConfigDataService.setSuffixes(response.data.data);
            });

            genericService.accessTypes().then(function (response) {
                apiConfigDataService.setAccessTypes(response.data.data);
            });

            genericService.relationShips().then(function (response) {
                apiConfigDataService.setRelationShips(response.data.data);
            });

            genericService.maritalStatus().then(function (response) {
                apiConfigDataService.setMaritalStatus(response.data.data);
            });

            genericService.addressTypes().then(function (response) {
                apiConfigDataService.setAddressTypes(response.data.data);
            });

            genericService.media().then(function (response) {
                apiConfigDataService.setMediaTypes(response.data.data);
            });

            genericService.dateOfBirth().then(function (response) {
                apiConfigDataService.setDateOfBirth(response.data);
            });

            genericService.chooseOption().then(function (response) {
                apiConfigDataService.setChooseOption(response.data);
            });

            genericService.formOfAddress().then(function (response) {
                apiConfigDataService.setTitles(response.data.data);
            });

        }
    };
}]);
