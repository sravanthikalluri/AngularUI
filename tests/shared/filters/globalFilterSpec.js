/**
 * Created by Krishnam Raju on 10/1/2015.
 */

'use strict';

describe('Global Filter Testing', function () {

    beforeEach(module('TrinetPassport'));

    /*emptyCheckFilter Filter Test Case*/
    it('empty and boolen value testing', inject(function (emptyCheckFilterFilter) {
        expect(emptyCheckFilterFilter('undefined', true)).toEqual('undefined', true);
        expect(emptyCheckFilterFilter('null', true)).toEqual('null', true);
        expect(emptyCheckFilterFilter(null, true)).toEqual(true);
        expect(emptyCheckFilterFilter('', true)).toEqual(true, true);
        expect(emptyCheckFilterFilter('-', true)).toEqual(true, true);
        expect(emptyCheckFilterFilter('Data Unavailable', true)).toEqual(true, true);
        expect(emptyCheckFilterFilter('Unknown', true)).toEqual(true, true);
        expect(emptyCheckFilterFilter({}, true)).toEqual({}, true);
        expect(emptyCheckFilterFilter(undefined, true)).toEqual(true);
        expect(emptyCheckFilterFilter({name: 'Test'}, true)).toEqual({name: 'Test'}, true);
        expect(emptyCheckFilterFilter()).toEqual(true);

    }));
    /*emptyCheckFilter Filter Test Case*/

    /*YesOrNo Filter Test Case*/
    it('whether it is yes or no for testing -  ', inject(function ($filter) {
        var input = '-';
        var $emptyCheckFilter = $filter('emptyCheckFilter'),
            $yesOrNoFilter = $filter('yesOrNo');

        var $value = $emptyCheckFilter(input);


        if ($value) {
            expect($yesOrNoFilter(input)).toEqual('-');

        } else {
            if (input === 'Y' || input === 'y') {
                expect($yesOrNoFilter(input)).toEqual('Yes');
            } else {
                expect($yesOrNoFilter(input)).toEqual('No');
            }
        }
    }));

    it('whether it is yes or no for testing yes', inject(function ($filter) {
        var input = 'y';
        var $emptyCheckFilter = $filter('emptyCheckFilter'),
            $yesOrNoFilter = $filter('yesOrNo');

        var $value = $emptyCheckFilter(input);

        if ($value) {
            expect($emptyCheckFilter(input, true)).toBe(true);
        } else {
            if (input === 'Y' || input === 'y') {
                expect($yesOrNoFilter(input)).toEqual('Yes');
            } else {
                expect($yesOrNoFilter(input)).toEqual('No');
            }
        }
    }));

    it('whether it is yes or no for testing no', inject(function ($filter) {
        var input = 'n';
        var $emptyCheckFilter = $filter('emptyCheckFilter'),
            $yesOrNoFilter = $filter('yesOrNo');

        var $value = $emptyCheckFilter(input);

        if ($value) {
            expect($emptyCheckFilter(input, true)).toBe(true);
        } else {
            if (input === 'Y' || input === 'y') {
                expect($yesOrNoFilter(input)).toEqual('Yes');
            } else {
                expect($yesOrNoFilter(input)).toEqual('No');
            }
        }
    }));

    /*tel Filter Test Case */
    it('Telephone Number testing with number as numeric', inject(function (telFilter) {
        var tel = '9904562623';
        expect(telFilter(tel)).toEqual('990.456.2623');
    }));

    it('Telephone Number testing with number as alphanumeric', inject(function (telFilter) {
        var tel = 'HYD9904562623';
        expect(telFilter(tel)).toEqual('HYD9904562623');
    }));

    it('Telephone Number testinng with number as a singile integer', inject(function (telFilter) {
        var tel = '1';
        expect(telFilter(tel)).toEqual('1.');
    }));

    it('Telephone Number testing with number as null', inject(function (telFilter) {
        var tel = '';
        expect(telFilter(tel)).toEqual('');
    }));


    /*tel Filter Test Case */

    /* currencyFilter Filter Test Case */
    it('converting value into currency formate Test - Case  ', inject(function ($filter) {
        var data = '-',
            $currencyFilter = $filter('currencyFilter');

        expect($currencyFilter(data)).toEqual('-');

    }));

    it('converting value into currency formate Test 0 Case  ', inject(function ($filter) {
        var data = 0,
            $currencyFilter = $filter('currencyFilter');

        expect($currencyFilter(data)).toEqual('-');

    }));

    it('converting value into currency formate Test < 0 Case  ', inject(function ($filter) {
        var data = -1,
            $currencyFilter = $filter('currencyFilter');

        expect($currencyFilter(data)).not.toEqual('$-' + data);

    }));

    it('converting value into currency formate Test undefined Case  ', inject(function ($filter) {
        var data = 'undefined',
            $currencyFilter = $filter('currencyFilter');

        expect($currencyFilter(data)).toEqual(constants.zeroDoublePrecision);

    }));

    it('converting value into currency formate Test > 0 Case  ', inject(function ($filter) {
        var data = 3,
            $currencyFilter = $filter('currencyFilter');

        expect($currencyFilter(data)).toEqual('$3.00');


    }));

    /* currencyFilter Filter Test Case */


    /* trusted Filter Test Case */
    it('converting value into currency formate ', inject(function ($filter) {
        var data = 3;
        var $emptyCheckFilter = $filter('emptyCheckFilter'),
            $currency = $filter('currency'),
            $currencyFilter = $filter('currencyFilter');
        var $value = $emptyCheckFilter(data);
        if ($value) {
            expect($emptyCheckFilter(data, true)).toBe(true);
        } else if (data === 0) {
            expect($currencyFilter(data)).toEqual('-');
        } else if (data < 0) {
            expect($currencyFilter(data)).not.toEqual('$-3');// this is not the logic it need to be like -$3.
        } else {
            expect($currencyFilter(data)).toEqual('$3.00'); // need clarification of $3.00 n
        }

    }));
    /* trusted Filter Test Case */


    /*uniqueFilter test cases */
    describe('uniqueFilter filter testing ', function () {
        it('uniqueFilter Filter ', inject(function (uniqueFilter) {
            var items = [
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key1': 'item1'}
            ];
            expect(uniqueFilter(items, 'key1')).toEqual([
                {'key1': 'item1'},
                {'key2': 'item2'}
            ]);
        }));
    });

    /*propsFilter test cases */
    describe('propsFilter filter testing ', function () {
        it('propsFilter Filter not an  array', inject(function (propsFilterFilter) {
            var items = {};
            var props = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
            expect(propsFilterFilter(items, props)).toEqual({});
        }));

        it('propsFilter Filter ', inject(function (propsFilterFilter) {
            var items = [
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key3': 'item3'}
            ];
            var props = {'key1': 'item1', 'key2': 'item2', 'key3': 'item3'};
            expect(propsFilterFilter(items, props)).toEqual([
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key3': 'item3'}
            ]);
        }));

    });

    /*propsWithFilter test cases */
    describe('propWithsFilter filter testing ', function () {
        it('propsWithFilter Filter not an  array', inject(function (propsWithFilterFilter) {
            var items = [
                        {'key1': 'item1'}
                    ];
            var props = {'key1': '1', 'key2': '2', 'key3': '3'};
            expect(propsWithFilterFilter(items, props)).toEqual([{ key1 : 'item1' }]);
        }));


    });


    /*SearchCheckboxFilter test cases */
    /*describe('SearchCheckboxFilter filter testing ', function () {
        it('SearchCheckboxFilter Filter ', inject(function (SearchCheckboxFilterFilter) {
            var items = [
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key3': 'item3'}
            ];
            expect(SearchCheckboxFilterFilter(items, 'key1')).toEqual(items);
        }));
        it('SearchCheckboxFilter Filter ', inject(function (SearchCheckboxFilterFilter) {
            var items = [
                {'key1': 'item1'},
                {'key2': 'item2'},
                {'key3': 'item3'}
            ];
            expect(SearchCheckboxFilterFilter(items, '')).toEqual(items);
        }));


        it('SearchCheckboxFilter Filter ', inject(function (SearchCheckboxFilterFilter) {
            var items = [
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430788",
                    "employeeName": "Aamot,Camila ghj",
                    "managerName": "Abdel,Adelia ",
                    "position": "Sales",
                    "reportuser": false,
                    "standardReports": false
                },
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430781",
                    "employeeName": "Aasen,Bree te",
                    "managerName": "Ambrogi,Carolyn ",
                    "position": "Sales",
                    "reportuser": false,
                    "standardReports": true
                },
                {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "1430789",
                    "employeeName": "Abarca,Chi ",
                    "managerName": "Abdel,Adelia ",
                    "position": "Sales",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1430828",
                    "employeeName": "Abbas,Carmon ",
                    "managerName": "Almaras,Elwanda ",
                    "position": "Sales",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "1430810",
                    "employeeName": "Abbington,Carole ",
                    "managerName": "Angis,Eleanora ",
                    "position": "Sales",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "00001000840",
                    "employeeName": "Abbot,Cristi s",
                    "managerName": "hERO,John ",
                    "position": "Vice President of Sales",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "1437612",
                    "employeeName": "Abby,Danette test",
                    "managerName": "Ansoategui,Alice  ",
                    "position": "Qa Tester",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "00001023062",
                    "employeeName": "Abdalla,Charlyn  ",
                    "managerName": "Alu,Everett  ",
                    "position": "Software Application Developer",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": false,
                    "dashboards": true,
                    "employeeId": "00001030728",
                    "employeeName": "Abdul,Alexia  ",
                    "managerName": "Annarino,Arnold K",
                    "position": "Marketing Communications Mgr",
                    "reportuser": true,
                    "standardReports": true
                },
                {
                    "alerts": true,
                    "dashboards": true,
                    "employeeId": "2213424",
                    "employeeName": "Abdula,Alison ",
                    "managerName": "Alvia,Chase ",
                    "position": "System Monitor",
                    "reportuser": true,
                    "standardReports": true
                }
            ];
            expect(SearchCheckboxFilterFilter(items, 'Abdula,Alison ')).toEqual(items);
        }));


    });*/

    describe('dateFormat filter testing', function () {
        it('dateFormat filter', inject(function ($filter) {
            var $dateFormat = $filter('dateFormat')
            var date = null;
            expect($dateFormat(date)).toEqual("-");
        }));

        it('dateFormat filter', inject(function ($filter) {
            var $dateFormat = $filter('dateFormat')
            var date = "2016/02/23";
            expect($dateFormat(date)).toEqual("02/23/2016");
        }));
    });

    describe('decimal filter testing', function () {
        it('decimal filter', inject(function ($filter) {
            var $decimal = $filter('decimal')
            var decimal = null;
            expect($decimal(decimal)).toEqual("");
        }));

        it('decimal filter', inject(function ($filter) {
            var $decimal = $filter('decimal')
            var decimal = 2.4;
            $decimal(decimal)
        }));
    });

    describe('breakFilter filter testing', function () {
        it('breakFilter filter', inject(function ($filter) {
            var $breakFilter = $filter('breakFilter')
            var text = '/\n/g';
            expect($breakFilter(text)).toEqual('/<br />/g');
        }));
    });

    describe('contentUrl filter testing', function () {
        it('contentUrl filter', inject(function ($filter) {
            var $contentUrl = $filter('contentUrl')
            var docUrl = '/api-config';
            expect($contentUrl(docUrl)).toEqual(constants.docLocContext + docUrl);
        }));
    });

    describe('telFormat filter testing',function(){
        it('telFormat filter testing with 10 digits',inject(function ($filter) {
            var $telFormat = $filter('telFormat')
            var number = 1234567890;
            $telFormat(number);
        }));

        it('telFormat filter testing with 11 digits',inject(function ($filter) {
            var $telFormat = $filter('telFormat')
            var number = 12345678901;
            $telFormat(number);
        }));

        it('telFormat filter testing with 12 digits',inject(function ($filter) {
            var $telFormat = $filter('telFormat')
            var number = 123456789012;
            $telFormat(number);
        }));

        it('telFormat filter testing with 9 digits',inject(function ($filter) {
            var $telFormat = $filter('telFormat')
            var number = 123456789;
            $telFormat(number);
        }));

        it('telFormat filter testing with not digits',inject(function ($filter) {
            var $telFormat = $filter('telFormat')
            var number = "asdf";
            $telFormat(number);
        }));
    });

    describe('trusted filter testing', function(){
        it('trusted filter',inject(function($filter){
            var $trusted = $filter('trusted')
            var url = '/api-company';
            $trusted(url);
        }));
    });


});
