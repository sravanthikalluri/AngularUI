trinetApp.service('urlBuilder', function () {
    function forEachSorted(obj, iterator, context) {
        var keys = sortedKeys(obj);
        for (var i = 0; i < keys.length; i++) {
            iterator.call(context, obj[keys[i]], keys[i]);
        }
        return keys;
    }


    function sortedKeys(obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys.sort();
    }

    function buildUrl(url, params) {
        if (!params) {
            return url;
        }
        var parts = [];
        forEachSorted(params, function (value, key) {
            if (value === null || value === undefined) {
                return;
            }
            if (angular.isObject(value)) {
                value = angular.toJson(value);
            }
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });
        return url + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
    }

    return buildUrl;
});