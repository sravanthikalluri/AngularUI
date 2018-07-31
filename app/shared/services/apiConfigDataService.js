/**
 * Created by ganesh on 9/13/2016.
 */
'use strict';
trinetApp.service('apiConfigDataService', ['$timeout','$q',function ($timeout,$q) {
    var countries = [],
        genders = [],
        suffixes = [],
        accessTypes = [],
        relationShips = [],
        maritalStatus = [],
        addressTypes = [],
        mediaTypes = [],
        dateOfBirth = [],
        chooseOption = [],
        titles = [];
    return {
        setCountries : function(countriesData){
            countries = countriesData;
        },
        getCountries : function(){
            return deferData(countries,'countries').promise;
        },
        setGenders : function(gendersData){
            genders = gendersData;
        },
        getGenders : function(){
            return deferData(genders,'genders').promise;
        },
        setSuffixes : function(suffixesData){
            suffixes = suffixesData;
        },
        getSuffixes : function(){
            return deferData(suffixes,'suffixes').promise;
        },
        setAccessTypes : function(accessTypesData){
            accessTypes = accessTypesData;
        },
        getAccessTypes : function(){
            return deferData(accessTypes,'accessTypes').promise;
        },
        setRelationShips : function(relationShipsData){
            relationShips = relationShipsData;
        },
        getRelationShips : function(){
            return deferData(relationShips,'relationShips').promise;
        },
        setMaritalStatus : function(maritalStatusData){
            maritalStatus = maritalStatusData;
        },
        getMaritalStatus : function(){
            return deferData(maritalStatus,'maritalStatus').promise;
        },
        setAddressTypes : function(addressTypesData){
            addressTypes = addressTypesData;
        },
        getAddressTypes : function(){
            return deferData(addressTypes,'addressTypes').promise;
        },
        setMediaTypes : function(mediaTypesData){
            mediaTypes = mediaTypesData;
        },
        getMediaTypes : function(){
            return deferData(mediaTypes,'mediaTypes').promise;
        },
        setDateOfBirth : function(dateOfBirthData){
            dateOfBirth = dateOfBirthData;
        },
        getDateOfBirth : function(){
            return deferData(dateOfBirth,'dateOfBirth').promise;
        },
        setChooseOption : function(chooseOptionData){
            chooseOption = chooseOptionData;
        },
        getChooseOption : function(){
            return deferData(chooseOption,'chooseOption').promise;
        },
        setTitles : function(titlesData){
            titles = titlesData;
        },
        getTitles : function(){
            return deferData(titles,'titles').promise;
        }

    };

    function deferData(objectData,serviceType){
        var defer = $q.defer();
        if(objectData.length > 0){
            defer.resolve(objectData);
        }else{
            $timeout(function(){
                defer.resolve(getTimeoutObject(serviceType));
            },4000);
        }
        return defer;
    }

    function getTimeoutObject(serviceType){
        var dataArray = [];
        switch (serviceType){
            case 'countries':
                dataArray = countries;
                break;
            case 'genders':
                dataArray = genders;
                break;
            case 'suffixes':
                dataArray = suffixes;
                break;
            case 'accessTypes':
                dataArray = accessTypes;
                break;
            case 'relationShips':
                dataArray = relationShips;
                break;
            case 'maritalStatus':
                dataArray = maritalStatus;
                break;
            case 'addressTypes':
                dataArray = addressTypes;
                break;
            case 'mediaTypes':
                dataArray = mediaTypes;
                break;
            case 'dateOfBirth':
                dataArray = dateOfBirth;
                break;
            case 'chooseOption':
                dataArray = chooseOption;
                break;
            case 'titles':
                dataArray = titles;
                break;
        }
        return dataArray;

    }



}]);
