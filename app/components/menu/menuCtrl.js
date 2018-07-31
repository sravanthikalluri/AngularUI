'use strict';
trinetApp.controller('menuCtrl', ['$rootScope','$scope', '$location','$window', 'gso', 'navigationService','SharedDataService', '$state',
    function ($rootScope, $scope, $location, $window, gso, navigationService,SharedDataService, $state) {

        var navigationSideLocalStorage = SharedDataService.getAppSharedData().navigationsSide;

        function setMenu() {

            if($location.path() === '/manageCustomFields'){
                localStorage.removeItem('navFilter');
                $scope.navFilter = 'Company';
                localStorage.setItem('navFilter', 'Company');
                $state.go('manageCustomFields');
            }else if ($location.path() === '/companyDashboard'){
                localStorage.removeItem('navFilter');
                $scope.navFilter = 'Company';
                localStorage.setItem('navFilter', 'Company');

                var switchWorkInbox= $window.sessionStorage.getItem("switchWorkInbox");
                if(switchWorkInbox && switchWorkInbox === 'true'){
                    $location.path("workInbox");
                    $window.sessionStorage.setItem("switchWorkInbox",false);
                }else{
                    $state.go('dashboard');
                }


                $rootScope.$broadcast('navToggled', 'Company');
                localStorage.removeItem('menuId');
            }
            else if ($location.path() === '/dashboard' || $location.path() === '/'){
                localStorage.removeItem('navFilter');
                $scope.navFilter = 'Me';
                localStorage.setItem('navFilter', 'Me');
                $location.path('dashboard');
                $rootScope.$broadcast('navToggled', 'Me');
                localStorage.removeItem('menuId');
            }
            else {
                $scope.navFilter = localStorage.getItem('navFilter');
                $rootScope.$broadcast('navFilter', $scope.navFilter);
                $rootScope.$broadcast('navToggled', $scope.navFilter);
            }
        }

        if (navigationSideLocalStorage !== undefined) {
            $scope.$parent.$broadcast('menuLoaded', true);
            $scope.navigations.side = JSON.parse(SharedDataService.getAppSharedData().navigationsSide);
            $scope.widgetInfo = JSON.parse(SharedDataService.getAppSharedData().widgetInfo);
            $scope.navigations.profile = angular.fromJson(SharedDataService.getAppSharedData().navigationsProfile);
            $scope.companyThemeExists = gso.getUtilService().checkIfNavigationThemeExists("Company");
            setMenu();
        }
        else {
            if (gso.getAppConfig().userId !== null && gso.getAppConfig().companyId !== null) {
                gso.getCrudService().execute(constants.get, '/api-navigation/v1/menu/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + '/menu-items', null,
                    function (response) {
                        if (response.menuItems !== undefined && response.menuItems !== null) {
                            $rootScope.menuItemsObj=angular.copy(response.menuItems);
                            $rootScope.$broadcast('$locationChangeStart');
                            $scope.navigations.side = navigationService.transformResponse(response.menuItems);
                            angular.forEach($scope.navigations.side,function(subMenuId){
                                subMenuId.menuIdAttribute =subMenuId.name.replace(/\s/g, '');
                                if(subMenuId.subMenus !== undefined){
                                    var index = subMenuId.subMenus.findIndex(function (obj) {
                                        return (gso.getAppConfig().peoId === "ALP" && obj.menuId === 118);
                                    });
                                    if (index !== -1) {
                                        subMenuId.subMenus.splice(index, 1);
                                    }
                                    angular.forEach(subMenuId.subMenus , function (item) {
                                        item.menuIdAttribute =item.name.replace(/\s/g, '');
                                    });
                                }
                            });
                            $scope.widgetInfo = navigationService.transformWidgetResponse(response.menuItems);
                            SharedDataService.getAppSharedData().navigationsSide=JSON.stringify($scope.navigations.side);
                            SharedDataService.getAppSharedData().widgetInfo= JSON.stringify($scope.widgetInfo);
                            var navigationsSide = JSON.parse(SharedDataService.getAppSharedData().navigationsSide);

                            var profileNav = response.menuItems.filter(function (obj) {
                                return obj.name === "My Profile";
                            });

                            if (profileNav !== null && profileNav !== undefined){
                                $scope.navigations.profile = profileNav[0].subMenus;
                                SharedDataService.getAppSharedData().navigationsProfile=JSON.stringify(profileNav[0].subMenus);
                                SharedDataService.getAppSharedData().navigationsProfileMenuId= profileNav[0].menuId;
                                $scope.companyThemeExists = gso.getUtilService().checkIfNavigationThemeExists("Company");
                                $scope.$parent.$broadcast('menuLoaded', true);
                                setMenu();
                            }
                        }
                    },
                    function () {
                    });
            }
        }

    $scope.getMenuState = function () {


        if (SharedDataService.getAppSharedData().menuId !== null && SharedDataService.getAppSharedData().menuId !== undefined) {
            var menuId = SharedDataService.getAppSharedData().menuId;
            menuId = parseInt(menuId, 10);
            $scope.selectMainMenu(menuId);
        }

        if (localStorage.getItem("navFilter") !== null && localStorage.getItem("navFilter") !== undefined) {
            var navFilter = localStorage.getItem("navFilter");

            $scope.toggleNav(navFilter);

        }
    };
    /**
     * select the main menu based on the current url
     */
    $scope.selectedMainMenu = null;
    $scope.selectMainMenu = function (menuId) {
        if (menuId) {
            $scope.selectedMainMenu = menuId;
        } else {
            // refresh or first load
            if ($scope.navigations.side !== undefined && $scope.navigations.side !== null) {
                $scope.selectedMainMenu = navigationService.getMainMenuId($scope.navigations.side, $location.path());
            }
        }
    };

    $scope.toggleNav = function (menuName) {
        $scope.navFilter = menuName;
        $rootScope.$broadcast('navToggled', menuName);

    };

    $scope.setMyselfOrCompany = function (myselfOrCompany) {
        SharedDataService.getAppSharedData().myselfOrCompany= myselfOrCompany;
    };

    $scope.$on('toggleAdminView', function (event, arg) {
      if(arg === "Company"){
          $location.path('companyDashboard');
          $scope.toggleNav("Company",1);
          localStorage.removeItem('menuId');
      }
      else{
        $scope.toggleNav("Me",0);
          $location.path('dashboard');
          localStorage.removeItem('menuId');
      }
    });

    $scope.getMenuState();

}]);
