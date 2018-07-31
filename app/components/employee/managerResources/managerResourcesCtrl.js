
'use strict';
trinetApp.controller('managerResourcesCtrl', ['$scope', 'gso',
    function ($scope, gso) {
        /*Fetching  manager forms information */
        $scope.setIconState = function(pdf){
            return pdf.url.indexOf("pdf") > -1 ? true : false;
        }
    }
]);
