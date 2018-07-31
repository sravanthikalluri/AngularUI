'use strict';

describe('Primary Contingent Items Filter Testing', function () {

    beforeEach(module('TrinetPassport'));


    describe('Primary Contingent Items Filter testing ', function () {
        it('Primary Contingent Items Filter not an  array', inject(function (primaryContingentItemsFilter) {
            var items = {};
            var props = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
            primaryContingentItemsFilter(items, props);
        }));

        it('Checked Unchecked Items Filter ', inject(function (primaryContingentItemsFilter) {
            var items = [
                {'primary': 'item1'},
                {'primary': 'item2'},
                {'primary': 'item3'}
            ];
            var props = {'checked': 'item1', 'key2': 'item2', 'key3': 'item3'};
            primaryContingentItemsFilter(items, props);
        }));

    });

});