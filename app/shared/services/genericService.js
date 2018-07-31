'use strict';
trinetApp.service('genericService', ['$http', function ($http) {
    return {
        formOfAddress: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/titles', {
                cache: true
            });
        },
        suffix: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/suffixes', {
                cache: true
            });
        },
        countries: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/countries', {
                cache: true
            });
        },
        accessTypes: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/access-types', {
                cache: true
            });
        },
        relationShips: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/relationships', {
                cache: true
            });
        },
        states: function (countryCode) {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/countries/' + countryCode + '/states', {
                cache: true
            });
        },
        maritalStatus: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/marital-statuses', {
                cache: true
            });
        },
        gender: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/genders', {
                cache: true
            });
        },
        addressTypes: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/address-types', {
                cache: true
            });
        },
        media: function () {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/media-types', {
                cache: true
            });
        },
        militaryStatus: function (countryCode) {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/' + countryCode + '/military-statuses', {
                cache: true
            });
        },
        ethnicity: function (countryCode) {
            return $http.get(globalUrlConfig.globalApi + '/api-config/v1/global/' + countryCode + '/ethnicities', {
                cache: true
            });
        },
        dateOfBirth: function () {
            return $http.get('assets/data/personal/personinfo.json', {
                cache: true
            });
        },
        chooseOption: function () {
            return $http.get('assets/data/global/chooseOption.json', {
                cache: true
            });
        }
    };
}]);