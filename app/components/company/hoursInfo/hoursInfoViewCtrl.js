'use strict';
trinetApp.controller('hoursInformationCtrl',['$scope', 'gso',
    function ($scope, gso) {
    $scope.initHoursInfo = function () {
        // This is the call to get the Location details to logged in user.
        gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + "/api-config/v1/company/" + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + "/current-location", null,
            function (response) {
                var myLocation = response;
                $scope.myLocation = {
                    'addressLine': getAddressLine(myLocation.address),
                    'addressInfo': getAddressInfo(myLocation.address),
                    'phone': myLocation.telephone

                };
            },
            function () {
            }
        );

        // This call is to get the Head quater information for user
        gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + "/api-config/v1/company/" + gso.getAppConfig().companyId + "/locations?include=address", null,
            function (response) {
                var headquarterObj = getHeadQuarterData(response);
                if (headquarterObj !== null) {
                    $scope.headquarter = {
                        'addressLine': getAddressLine(headquarterObj.address),
                        'addressInfo': getAddressInfo(headquarterObj.address),
                        'phone': headquarterObj.phone,
                        'officeHours': headquarterObj.officeHours

                    };
                }

                $scope.otherLocations = getOtherLocations(response);
            },
            function () {

            }
        );

    };

    function getHeadQuarterData(data) {
        var headQuarter = null;
        angular.forEach(data, function (obj) {
            if (obj.headquarter === 'true') {
                headQuarter = obj;
            }
        });

        return headQuarter;
    }

    function getOtherLocations(data) {
        var otherLocations = [];
        angular.forEach(data, function (obj) {
            if (obj.headquarter === 'false') {
                var location = {
                    'addressLine': getAddressLine(obj.address),
                    'addressInfo': getAddressInfo(obj.address),
                    'phone': obj.phone

                };
                otherLocations.push(location);
            }
        });

        return otherLocations;
    }

    function getAddressLine(data) {
        var addressLine = '';
        if (data.address1 && (data.address1).trim().length > 0) {
            addressLine += data.address1;
        }
        if (data.address2) {
            if(data.address1){
                addressLine +=  ',';
            }
           addressLine = data.address2;

        }
        if (data.address3) {
            if(data.address1 || data.address2){
                addressLine +=  ',';
            }
            addressLine = data.address3;
        }
        if (data.address4) {
            if(data.address1 || data.address2 || data.address3){
                addressLine += ',';
            }
            addressLine = data.address4;
        }

        return addressLine;
    }

    function getAddressInfo(data) {
        var addressInfo = '';
        if (data.city && (data.city).trim().length > 0) {
            addressInfo += data.city;
        }
        if (data.state && (data.state).trim().length > 0) {
            if(data.city && (data.city).trim().length > 0){
             addressInfo += ',';
            }

            addressInfo += data.state;
        }
        if (data.postalCode && (data.postalCode).trim().length > 0) {
             if((data.city && (data.city).trim().length > 0)|| (data.state && (data.state).trim().length > 0)){
                addressInfo += ',';
            }
            addressInfo += data.postalCode;
        }


        return addressInfo;
    }

    $scope.initHoursInfo();

}]);