/*Description : This is filter file contains different data type filters for company module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.filter('FLLFilters', function () {
    return function (collectName) {
        if (typeof collectName === 'undefined') {
            return '';
        }
        var headerNameSplit = collectName.split(' ');
        return headerNameSplit[0].charAt(0).toUpperCase() + "  " + headerNameSplit[1].charAt(0).toUpperCase();
    };
});