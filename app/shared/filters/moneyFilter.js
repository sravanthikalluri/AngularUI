/*Description : This is filter file contains different data type filters for money module
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
/* This code for getting stars in account number */
trinetApp.filter('checkFilter', function () {
    return function (input) {
        if (typeof input !== 'undefined' && input !== null) {
            input = '**' + input.slice(-4);
            return input;
        }
    };
});