/**
 * Created by Santosh on 11/5/2015.
 */

'use strict';

describe('FLL Filter Testing', function () {

    beforeEach(module('TrinetPassport'));
    var fill = {};

    it('It should return empty', inject(function (FLLFiltersFilter) {
        var collectName;
        fill = FLLFiltersFilter(collectName);
        expect(fill).toEqual('');
    }));

    it('It should return a string', inject(function (FLLFiltersFilter) {
        var collectName = 'jhon andrew';
        fill = FLLFiltersFilter(collectName);
        expect(fill).toEqual('J  A');
    }));

});