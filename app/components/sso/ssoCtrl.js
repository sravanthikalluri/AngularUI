'use strict';
trinetApp.controller('ssoCtrl', ['$scope', 'gso', function ($scope, gso) {
    $scope.ssoParams = {
        ssoId: gso.getRouteParams().ssoId
    };
}]);
