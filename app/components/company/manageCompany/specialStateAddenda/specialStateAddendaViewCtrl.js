/**
 Description: This is controller used fetch states and state addendum information
 Author:Thaviti Naidu
 **/

trinetApp.controller('specialStateAddendaViewCtrl', ['$scope', 'gso','SharedDataService',
    function ($scope, gso,SharedDataService) {
        $scope.country = {};
        $scope.beforeSelectText = true;
        $scope.countryCode = gso.getAppConfig().countryCode;
        if($scope.countryCode){
        gso.getCrudService().execute(constants.get, companyUrlConfig.companyApi + companyUrlConfig.companyBaseUrl +
            companyUrlConfig.resources.forms + "/" + gso.getAppConfig().companyId + "/" +
            gso.getAppConfig().userId + companyUrlConfig.resources.specialState + "=" + $scope.countryCode, null,function (response) {

               var result =  sortByKey(response, 'stateProvinceDesc');
               $scope.countries = result;
            },
            function (data) {
                $scope.errorAlert = data;
            }
        );
        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var positionA = a[key]; var positionB = b[key];
                return ((positionA < positionB) ? -1 : ((positionA > positionB) ? 1 : 0));
            });
         }
       }
    }]);


if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
