/*Description : This is filter file contains different data type filters for home module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';

/* Made changes for pagination and drag and drop [Begin] */
trinetApp.filter('startFrom', function () {
    return function (input, id) {
        if (id === 0) {
            id = ++id;
            return input.slice(id);
        }
    };
});
/* Made changes for pagination and drag and drop [End] */
