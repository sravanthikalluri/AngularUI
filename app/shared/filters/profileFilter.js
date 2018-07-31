/*Description : This is filter class contains different data type filter for profile module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
trinetApp.filter('names', function () {
    return function (items) {
        var names = [];
        var primaryNames = [];
        var preferredNames = [];
        angular.forEach(items, function (item) {
            if (item.nameType === "PRI") {
                primaryNames.push(item);
            } else if (item.nameType === "PRF") {
                preferredNames.push(item);
            }
        });
        names.push(primaryNames);
        names.push(preferredNames);
        return names;
    };
});
