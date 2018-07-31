/**
 * Created by ganesh on 12/1/2015.
 */

'use strict';

describe('Check Filter Testing', function () {

    beforeEach(module('TrinetPassport'));

    it('Test undefined', inject(function (checkFilterFilter) {
        var input = 'undefined';
        var res = checkFilterFilter(input);
        expect(res).toEqual('**ined');
    }));


    it('Test data', inject(function (checkFilterFilter) {
        var input = '123456789';
        var res = checkFilterFilter(input);
        expect(res).toEqual('**6789');
    }));


});