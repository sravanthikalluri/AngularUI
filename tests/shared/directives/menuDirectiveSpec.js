/*
/!**
 * Created by ganesh on 10/23/2015.
 *!/
(function () {

    "use strict";


    describe('Menu Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            $httpBackend,
            appConfig,
            $controller,
            menuData,
            simpleHTML = '<menu-list class="sidebar-menu"></menu-list>',
            response = {
                "data": [{
                    "menuId": 1,
                    "menuName": "My Time",
                    "url": "#MyTime",
                    "roleName": "HRENTRY",
                    "accessLevel": 1,
                    "parentMenuId": null,
                    "submenu": [{
                        "menuId": 2,
                        "menuName": "Policies",
                        "url": "#/Policies",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 1,
                        "submenu": []
                    }, {
                        "menuId": 3,
                        "menuName": "Leave request",
                        "url": "#/Leaverequest",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 1,
                        "submenu": []
                    }]
                }, {
                    "menuId": 4,
                    "menuName": "Trinet",
                    "url": "#Trinet",
                    "roleName": "HRENTRY",
                    "accessLevel": 1,
                    "parentMenuId": null,
                    "submenu": [{
                        "menuId": 5,
                        "menuName": "TrinetTca",
                        "url": "#/TrinetTca",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 4,
                        "submenu": []
                    }, {
                        "menuId": 6,
                        "menuName": "PrivacyPolicy",
                        "url": "#/PrivacyPolicy",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 4,
                        "submenu": []
                    }]
                }, {
                    "menuId": 13,
                    "menuName": "MYCalendar",
                    "url": "#MYCalendar",
                    "roleName": "HRENTRY",
                    "accessLevel": 1,
                    "parentMenuId": null,
                    "submenu": [{
                        "menuId": 14,
                        "menuName": "TimeOffOverview",
                        "url": "#/TimeOffOverview",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 13,
                        "submenu": []
                    }, {
                        "menuId": 15,
                        "menuName": "LeaveRequest",
                        "url": "#/LeaveRequest",
                        "roleName": "HRENTRY",
                        "accessLevel": 2,
                        "parentMenuId": 13,
                        "submenu": []
                    }]
                }, {
                    "menuId": 16,
                    "menuName": "Company",
                    "url": "#Company",
                    "roleName": "TU_ADMIN",
                    "accessLevel": 1,
                    "parentMenuId": null,
                    "submenu": [{
                        "menuId": 17,
                        "menuName": "TimeOffOverview",
                        "url": "#/TimeOffOverview",
                        "roleName": "TU_ADMIN",
                        "accessLevel": 2,
                        "parentMenuId": 16,
                        "submenu": []
                    }, {
                        "menuId": 18,
                        "menuName": "LeaveRequest",
                        "url": "#/LeaveRequest",
                        "roleName": "TU_ADMIN",
                        "accessLevel": 2,
                        "parentMenuId": 16,
                        "submenu": []
                    }]
                }], "_statusCode": "200", "_statusMessage": "Success"
            }
            ;


        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
                appConfig = $injector.get('appConfig');
                $httpBackend = $injector.get('$httpBackend');
                localStorage.setItem("currentCompanyId", appConfig.companyId);
                $controller = $injector.get('$controller')('menuCtrl', {$scope: $scope});

            });
            /!*
             $httpBackend
             .whenGET(homeUrlConfig.homeApi + homeUrlConfig.homeBase + homeUrlConfig.resources.home +"/" +appConfig.companyId+ "/" + appConfig.userId + homeUrlConfig.resources.menu).respond(200,response);
             *!/

            $httpBackend
                .whenGET("assets/data/menu/menu.json").respond(response);

            $httpBackend.flush();

        });

        it('Should contain menu ', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            $scope.menuDetails = menuData;

            var $ulMenu = el.find('ul#menu');

           // expect($ulMenu.length).toEqual(1);
           // expect($ulMenu.is(":visible")).toBe(true);


        });

        it('Should contain menu Home Items', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            $scope.menuDetails = menuData;


            var $menuHomeLI = el.find('li[id*="menuHome_"]');
            //expect($menuHomeLI.length).toEqual(response.data.length);


           // expect($($menuHomeLI[0]).hasClass('active')).toBe(true);


        });


        it('Should contain sub menu Items', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            $scope.menuDetails = menuData;


            var $subMenuLI = el.find('li[id*="menuId"]');
            expect($subMenuLI).toBeDefined();
        });

        afterEach(function () {
            $body.empty();
            $httpBackend.verifyNoOutstandingExpectation();

        });

    });


}());
*/
