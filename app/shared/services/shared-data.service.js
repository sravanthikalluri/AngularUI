/**
 * Created by Naidu on 19/07/2017.
 */

'use strict';
trinetApp.service('SharedDataService', function () {

    var appSharedData = {};
    return {
        getAppSharedData: function () {
            return appSharedData;
        }
    };
});
