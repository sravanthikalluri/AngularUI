'use strict';
trinetApp
    .controller('radioButtonCtrl', [
        '$scope',
        function ($scope) {
            $scope.checked = function () {
                return $scope.value === $scope.model;
            };
        }
    ]);
