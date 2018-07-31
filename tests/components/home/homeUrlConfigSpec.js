/**
 * Created by ganesh on 10/28/2015.
 */

(function () {

    "use strict";

    describe('Home URL Config Testing', function () {


        beforeEach(function () {
            module('TrinetPassport');

        });


        it('homeUrlConfig is defined', function () {
            expect(homeUrlConfig).toBeDefined();
            expect(homeUrlConfig.homeApi).toBeDefined();
            expect(homeUrlConfig.homeBase).toBeDefined();
            expect(homeUrlConfig.resources).toBeDefined();
            expect(homeUrlConfig.resources.home).toBeDefined();
        });


        it('homeUrlConfig is equal to data specified', function () {

            expect(homeUrlConfig.homeBase).toEqual("/api-navigation/v1");
            expect(homeUrlConfig.resources.home).toEqual("/home");


        });


    });

}());
