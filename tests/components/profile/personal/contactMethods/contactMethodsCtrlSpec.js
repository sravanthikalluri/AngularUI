/*
/!**
 * Created by ganesh on 10/29/2015.
 *!/
(function () {

    "use strict";

    describe('Contact Methods Controller Testing', function () {

        var $rootScope,
            $scope,
            contactMethodDataResponse = {
                "data": [{
                    "personId": "00001005514",
                    "uniqueId": 1,
                    "accessType": "Work",
                    "media": "Email",
                    "telephoneNumber": "456-456-9874",
                    "url": "john.gouri@trinet.com",
                    "notes": null,
                    "effectiveDate": "2005-01-01",
                    "actualAccessType": "Work"
                }],
                "_statusCode": "200",
                "_statusText": "OK"
            };
        var $compile, $body = $('body');


        beforeEach(function () {
            module('TrinetPassport');

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $injector.get('$controller')('contactMethodsCtrl', {
                    $scope: $scope
                });
                $compile = $injector.get('$compile');
            });


        });

        describe('toggleContact function testing', function () {

            it('toggleContact is defined', function () {
                expect($scope.toggleContact).toBeDefined();
            });

            it('toggleContact function call testing', function () {

                expect($scope.visibleContact).toBeFalsy();

                $scope.toggleContact();

                expect($scope.visibleContact).toBeTruthy();

            });

        });

        describe('selectPreferred function testing', function () {

            it('selectPreferred is defined', function () {
                expect($scope.selectPreferred).toBeDefined();
            });

            it('selectPreferred function call testing', function () {

                var index = 1,
                    data = [];

                expect($scope.preferredData).toBeUndefined();

                $scope.contactMethodData = contactMethodDataResponse;

                $scope.selectPreferred(index);

                data.push($scope.contactMethodData[index]);
                expect($scope.preferredData).toEqual(data);

            });

        });

        describe('converttophoneformat function testing', function () {

            it('converttophoneformat is defined', function () {
                expect($scope.converttophoneformat).toBeDefined();
            });

            it('converttophoneformat function call testing', function () {
                var phoneNumber = '55555666666';
                $scope.converttophoneformat(phoneNumber);

            });

        });

        describe('$on function testing', function () {
            it('$on function call', function () {
                var element, HTML = ' <div id="contactMethodsView" ng-include="app/components/profile/personal/contactMethods/contactMethodsView.html"></div>';
                element = $compile(HTML)($scope);
                $body.append(HTML);
                $rootScope.$digest();
                var data = [{
                    "personId": "00001005514",
                    "uniqueId": 1,
                    "accessType": "Work",
                    "media": "Email",
                    "telephoneNumber": "456-456-9874",
                    "url": "john.gouri@trinet.com",
                    "notes": null,
                    "effectiveDate": "2005-01-01",
                    "actualAccessType": "Work"
                }];
                $rootScope.$broadcast('toggleContact', data);

            });
        });

        afterEach(function () {
            $body.empty();
        });


    });


}());*/
