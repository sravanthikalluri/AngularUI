/*Description : This is filter file contains different data type filters for benefits module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.filter('primaryContingentItems', function () {
    return function (items, props) {
        var out = [];
        angular.forEach(items, function (item) {
            if (item.primary === props.checked) {
                out.push(item);
            }
        });
        return out;
    };
});