'use strict';
trinetApp.service('sharedProperties', function () {
    var alertObject = {};
    var bool;
    var selectedCountry = {};
    var string;
    var object = [];
    var primaryNameData = null;
    var primaryNameDataBoolValue = false;
    var broadcastContactBoolValue = false;
    var cookieName = "";
    var hrpUrl = "";
    var platformUrl = "";
    var ssoUrl = "";
    var wfaUrl = "";
    var validateAllSessions = true;
    var componentPermissions = {};
    return {
        getAlertObject: function () {
            return alertObject;
        },
        setAlertObject: function (value) {
            alertObject = value;
        },

        getSelectedCountry: function () {
            return selectedCountry;
        },
        setSelectedCountry: function (value) {
            selectedCountry = value;
        },
        getObject: function () {
            return object;
        },
        setObject: function (result) {
            object = result;
        },
        getStringValue: function () {
            return string;
        },
        setStringValue: function (value) {
            string = value;
        },
        getboolValue: function () {
            return bool;
        },
        setboolValue: function (value) {
            bool = value;
        },
        setPrimaryNameData: function (value) {
            primaryNameData = value;
        },
        getPrimaryNameData: function () {
            return primaryNameData;
        },
        setPrimaryNameDataBoolValue: function (value) {
            primaryNameDataBoolValue = value;
        },
        getPrimaryNameDataBoolValue: function () {
            return primaryNameDataBoolValue;
        },
        setBroadcastContactBoolValue: function (value) {
            broadcastContactBoolValue = value;
        },
        getBroadcastContactBoolValue: function () {
            return broadcastContactBoolValue;
        },
        getCookieName : function () {
            return this.cookieName;
        }, 
        getHrpPassportUrl : function () {
            return this.hrpUrl;
        },
        getComponentPermissions: function(){
            return componentPermissions;
        },
        setComponentPermissions: function(value){
            componentPermissions = value;
        },
        getWfaUrl: function(){
            return wfaUrl;
        },
        setWfaUrl: function(value){
            wfaUrl = value;
        }
    };
});
