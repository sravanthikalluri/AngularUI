/**
 Description: This is controller used to resize the screen
 Author:Raghavendra Kumar Bonthala
 **/
trinetApp.controller('screenSizeCtrl', function ($scope, $window) {

    var w = angular.element($window);
    var h = 260;

    $scope.getWindowDimensions = function () {

        var winscreen = w.height() - h + "px";
        angular.element(".resize").css("height", winscreen);
    };
});