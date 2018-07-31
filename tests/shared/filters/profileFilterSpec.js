/**
 * Created by Naveen Kumar on 10/1/2015.
 */

'use strict';

describe('Profile Filter Testing', function () {

    beforeEach(module('TrinetPassport'));
    var names = [];

    it('It should return each one object of primary and preferred', inject(function (namesFilter) {
        var items = [{nameType: 'PRF'}, {nameType: 'PRI'}, {nameType: 'PRT'}];
        names = namesFilter(items);
        expect(names).toEqual([[{nameType: 'PRI'}], [{nameType: 'PRF'}]]);
    }));

    it('It should return each one object of primary and preferred', inject(function (namesFilter) {
        var items = [{nameType: 'PRFF'}, {nameType: 'PRII'}, {nameType: 'PRTD'}];
        names = namesFilter(items);
        expect(names).toEqual([[], []]);
    }));

    it('It should return empty arrays of primary and preferred', inject(function (namesFilter) {
        var items = [];
        names = namesFilter(items);
        expect(names).toEqual([[], []]);
    }));

    it('It should return one object preferredNames', inject(function (namesFilter) {
        var items = [{nameType: 'PRF'}];
        names = namesFilter(items);
        expect(names).toEqual([[], [{nameType: 'PRF'}]]);
    }));

    it('It should return one object primaryNames', inject(function (namesFilter) {
        var items = [{nameType: 'PRI'}];
        names = namesFilter(items);
        expect(names).toEqual([[{nameType: 'PRI'}], []]);
    }));

});