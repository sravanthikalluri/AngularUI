/**
 * Created by ganesh on 10/21/2015.
 */
(function () {

    "use strict";


    describe('Emergency Card Directive Testing', function () {
        var $scope,
            $compile,
            $body = $('body'),
            el,
            $rootScope,
            simpleHTML = '<emergency-card emergencyData="emergencyData"></emergency-card>',
            emergencyData = {
                "personId": "00001000483",
                "fullName": "lkjl",
                "uniqueId": 1,
                "primaryIndicator": "Y",
                "designeeRelation": "P",
                "lastName": "lkjl",
                "middleName": null,
                "firstName": "lkjl",
                "sameAdressPerson": "N",
                "line1": "gfhfg",
                "line2": "gfhfg",
                "line3": "ghgf",
                "line4": null,
                "city": "gfhfg",
                "county": "US",
                "stateProvinceCode": "AR",
                "postalCode": "12345",
                "countryCode": "US",
                "samePhonePerson": "N",
                "telephoneNumber1": "5464565465",
                "telephoneNumber2": null,
                "telephoneNumber3": null,
                "telephoneNumber4": null
            };
        beforeEach(function () {
            module('TrinetPassport');


            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $scope = $rootScope.$new();
                $compile = $injector.get('$compile');
            });

            $scope.$index = 0;

            $scope.emergencyData = emergencyData;

        });


        it('should contain profile id', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var $profile = $('#profile_' + $scope.$index);

            expect($profile.length).toEqual(1);
            expect($profile.is(":visible")).toBe(true);
        });

        it('should contain name', function () {

            el = $compile(simpleHTML)($scope);
            $body.append(el);
            $rootScope.$digest();


            var $h2 = el.find('h2');

            expect($h2.length).toEqual(1);
            expect($h2.text()).toEqual('');
        });


        afterEach(function () {
            $body.empty();
        });

    });


}());