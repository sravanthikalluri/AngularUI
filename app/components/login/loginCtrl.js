'use strict';
trinetApp.controller('loginController', ['$scope', 'gso',
    function ($scope, gso) {
        $scope.sendData = function () {
            //With authentication
            var credentials = {
                emplid: $scope.empId,
                userpassword: $scope.userpassword
            };
            /**
             *   employee login functionality based on credentials
             */
            gso.getCrudService().execute(constants.post, loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.signon + "?realm=sw_hrp", credentials,
                function () {
                    $scope.sendHome();
                },
                function (data) {
                    $scope.errorAlert = data;
                }
            );
        };
        $scope.sendHome = function () {
            window.location = "index.html";
        };
    }
]);