/**
 * Created by Krishnam Raju on 10/1/2015.
 */

'use strict';

describe('Manage Employee Filter Testing', function () {

    beforeEach(module('TrinetPassport'));

    it('when status is Begin equal to On Going ', inject(function (statusFilter) {
        expect(statusFilter('Begin')).toEqual('Ongoing');
        expect(statusFilter('End')).toEqual('Ended');
    }));


});

describe('Checked Unchecked Items Filter Testing', function () {

    beforeEach(module('TrinetPassport'));


    describe('Checked Unchecked Items Filter testing ', function () {
        it('Checked Unchecked Items Filter not an  array', inject(function (checkedUnCheckedItemsFilter) {
            var items = {};
            var props = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
            checkedUnCheckedItemsFilter(items, props);
        }));

        it('Checked Unchecked Items Filter ', inject(function (checkedUnCheckedItemsFilter) {
            var items = [
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key3': 'item3'}
            ];
            var props = {'key1': 'item1', 'key2': 'item2', 'key3': 'item3'};
            checkedUnCheckedItemsFilter(items, props);
        }));

    });

});
