/*Description : This is filter file contains different common type filters for all modules
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';

trinetApp.filter('emptyCheckFilter', function () {
    return function (data, defaultVal) {
        var returnVal = true;
        if (defaultVal) {
            returnVal = defaultVal;
        }
        try {
            if (data === null) {
                return returnVal;
            }
            else if (typeof(data) === 'undefined') {
                return returnVal;
            }
            else if (data.length === 0) {
                return returnVal;
            }
            else if (typeof (data) === 'string') {
                if (data === '' || data === '-' || data === 'Data Unavailable' || data === "Unknown") {
                    return returnVal;
                }
                else {
                    return defaultVal ? data : false;
                }
            }
            else if (typeof(data) === 'object') {
                if (Object.prototype.toString.call(data) === '[object Date]') {
                    return defaultVal ? data : false;
                }
                var count = 0;
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        count++;
                    }
                }
                if (count === 0) {
                    return defaultVal ? data : false;
                }
            }
            return defaultVal ? data : false;
        } catch (e) {
        }

        return returnVal;
    };
});

trinetApp.filter('yesOrNo', function ($filter) {
    var emptyCheckFilter = $filter('emptyCheckFilter');
    return function (input) {
        if (emptyCheckFilter(input, '-') === '-') {
            return '-';
        } else if (input) {
            return ((input.toLowerCase() === 'y') ? 'Yes' : 'No');
        }
    };
});

trinetApp.filter('currencyFilter', function ($filter) {
    var emptyCheckFilter = $filter('emptyCheckFilter');
    var currencyFilter = $filter('currency');
    return function (data) {
        if (emptyCheckFilter(data, '-') === '-') {
            return '-';
        }
        else if (data === 0 || data === 0.00) {
            return '-';
        }
        else if (data < 0) {
            var value = currencyFilter(data).substring(1, currencyFilter(data).length - 1).split('.')[0];
            var floatvalue = currencyFilter(data).substring(1, currencyFilter(data).length - 1).split('.')[1];
                if(floatvalue.length === 1){
                  floatvalue = floatvalue + 0;
                }

            return '-' + value +'.'+floatvalue;
        } else if (emptyCheckFilter(data, 'undefined') === 'undefined' || emptyCheckFilter(data, '') === '') {
            return constants.zeroDoublePrecision;
        }
        else {
            return currencyFilter(data);
        }
    };
});

trinetApp.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


trinetApp.filter('propsWithFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items
                .forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(
                                text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
        } else {
            out = items;
        }
        return out;
    };
});

trinetApp.filter('customFilter', function() {
    return function(items, string) {
        var filtered = [];
        var stringMatch = new RegExp(string, 'i');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (stringMatch.test(item.name) || stringMatch.test(item.employeeId)) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});
trinetApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (typeof item[prop] !== 'undefined' && item[prop].toString().toLowerCase().startsWith(text, 0)) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});


// Filter to search the multi check box
trinetApp.filter('SearchCheckboxFilter', [function () {
    return function (inputArray, selection) {
        if (angular.isDefined(selection) && selection.length === 0) {
            return inputArray;
        }
        var data = [];
        angular.forEach(inputArray, function (item) {
            for (var i = 0; i < selection.length > 0; i++) {
                if (item.department === selection[i] || item.position === selection[i] ||
                    item.changeTypes === selection[i] || item.location === selection[i] || item.leavePlan === selection[i] ||
                    item.posDesc === selection[i] || item.emplymntStatus === selection[i] || item.deptDesc === selection[i] ||
                    item.workShortLocDesc === selection[i] || item.locationDesc === selection[i] ||  item.department === selection[i] || item.directManager === selection[i] ||
                    item.workSupervisor === selection[i] || item.name === selection[i] || item.formStatus === selection[i] || item.deptName === selection[i] ||
                    item.locationName === selection[i] || item.actorName === selection[i] || item.changeType === selection[i] || item.departement === selection[i] || item.manageDirect === selection[i] ) {
                    data.push(item);
                }
            }
        });
        /*if (data.length === 0) {
            angular.forEach(inputArray, function (item) {
                if(item.emplymntStatus === 'T'){
                    data = [];
                }else{
                    data = inputArray;
                }
            });

        }*/
        return data;
    };
}]);

trinetApp.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

trinetApp.filter('tel', function () {
    return function (tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '.' + number.slice(3, 7);
            }
            return ( city + "." + number).trim();
        }
        else {
            return city + ".";
        }

    };
});

trinetApp.filter('dateFormat', function ($filter, gso) {
    return function (input) {
        if (input === null) {
            return "-";
        }

        var _date = gso.getUtilService().splitConcatDateString(input);

        return _date;

    };
});

trinetApp.filter('decimal', function ($filter) {
    return function (input) {
        if (input === null || input === '') {
            return "";
        }

        return $filter('number')(input, 2);

    };
});

trinetApp.filter('breakFilter', function () {
    return function (text) {
        if (text !== undefined) {
            return text.replace(/\n/g, '<br />');
        }
    };
});


/* To filter relative urls from absolute urls */
trinetApp.filter('contentUrl', function () {
    return function (docUrl) {
        if (docUrl !== undefined) {
            if (docUrl !== null && docUrl.startsWith('/')) {
                docUrl = constants.docLocContext + docUrl;
            }
        }
        return docUrl;
    };
});

trinetApp.filter('limitTo', function () {
    return function (input, from, to) {
        return (input !== undefined) ? input.slice(from, to) : '';
    };
});

trinetApp.filter('hyphen', function () {
    return function (input) {
        return input  ? input : '-';
    };
});

trinetApp.filter('telFormat', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number,formatNumber;

        switch (value.length) {
            case 10:
                country = '';
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11:
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12:
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

		if (country === '') {
            formatNumber = (city +'-'+ number).trim();
        }else{
            formatNumber = (country + "-" + city + "-" + number).trim();
        }

        return formatNumber;


    };
});

trinetApp.filter('addSpaceToComma', function () {
    return function (input) {
        return input.replace(/,/g, ', ');
    };
});

trinetApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
