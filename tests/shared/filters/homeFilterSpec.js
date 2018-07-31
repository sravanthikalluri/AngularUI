/**
 * Created by ganesh on 10/28/2015.
 */
(function () {

    "use strict";

    describe('Start From Filter Testing', function () {

        var sectionsCountResponse = [
            {
                "id": "sec_0"
            },
            {
                "id": "sec_1"
            },
            {
                "id": "sec_2"
            }, {
                "id": "sec_3"
            },
            {
                "id": "sec_4"
            },
            {
                "id": "sec_5"
            }, {
                "id": "sec_6"
            },
            {
                "id": "sec_7"
            },
            {
                "id": "sec_8"
            }, {
                "id": "sec_9"
            },
            {
                "id": "sec_10"
            },
            {
                "id": "sec_11"
            }];

        beforeEach(module('TrinetPassport'));

        it('startFromFilter testing if id is 0 ', inject(function (startFromFilter) {

            var id = 0;
            expect(startFromFilter(sectionsCountResponse, id)).toEqual(sectionsCountResponse.slice(++id));


        }));

        it('startFromFilter testing if id is not 0 ', inject(function (startFromFilter) {

            var id = 1;
            expect(startFromFilter(sectionsCountResponse, id)).not.toBeDefined();


        }));


    });
}());