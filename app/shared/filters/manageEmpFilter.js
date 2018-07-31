/*Description : This is filter class contains different data type filters for employee module
 * Author : Raghavendra Kumar Bonthala
 */

'use strict';
trinetApp.filter('status', function () {
    return function (statusValue) {

        if (statusValue === "Begin") {
            return 'Ongoing';
        }
        else if (statusValue === "End") {
            return 'Ended';
        }
    };
});

trinetApp.filter('checkedUnCheckedItems', function () {
    return function (items, props) {
        var out = [];
        angular.forEach(items, function (item) {
            if (item.isChecked === props.checked) {
                out.push(item);
            }
        });
        return out;
    };
});

trinetApp.filter('filterDatesByDate', ['gso', function (gso) {
    return function (items, props) {
        return items.filter(function (obj) {
            return gso.getUtilService().checkTwoDates(obj.payBeginDate, props);
        });
    };
}]);

