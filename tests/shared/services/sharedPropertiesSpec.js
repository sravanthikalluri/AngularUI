/**
 * Created by ganesh on 10/19/2015.
 */
(function () {

    "use strict";


    describe('Shared Properties Service Testing', function () {
        var sharedPropertiesService;

        beforeEach(function () {
            module('TrinetPassport');
            inject(function ($injector) {
                sharedPropertiesService = $injector.get('sharedProperties');
            });

        });

        it('Shared Properties Service is defined', function () {
            expect(sharedPropertiesService).toBeDefined();
        });


        it('Shared Properties Service check set/get of alert object testing', function () {

            var data = {name: 'ganga'};
            sharedPropertiesService.setAlertObject(data);

            expect(sharedPropertiesService.getAlertObject()).toEqual(data);
        });

        it('Shared Properties Service check set/get of selected Country testing', function () {

            var data = {countryName: 'INDIA'};
            sharedPropertiesService.setSelectedCountry(data);

            expect(sharedPropertiesService.getSelectedCountry()).toEqual(data);
        });


        it('Shared Properties Service check set/get of object testing', function () {

            var data = [{countryName: 'INDIA'}, {countryName: 'USA'}];
            sharedPropertiesService.setObject(data);
            expect(sharedPropertiesService.getObject()).toEqual(data);
        });


        it('Shared Properties Service check set/get of String Value testing', function () {

            var data = 'Hello';
            sharedPropertiesService.setStringValue(data);
            expect(sharedPropertiesService.getStringValue()).toEqual(data);
        });
        it('Shared Properties Service check set/get of Boolean Value testing', function () {

            var data = true;
            sharedPropertiesService.setboolValue(data);
            expect(sharedPropertiesService.getboolValue()).toEqual(data);
        });

    });

})();