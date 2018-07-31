trinetApp.service('contentService', ['$http', '$q', function ($http, $q) {
    var service = {
        authToken: null,
        baseUrl: '/alfresco',
        addAuthTokenToUrl: function (url) {
            return url + '?alf_ticket=' + this.authToken;
        },
        login: function (username, password) {
            return $http.get('/alfresco/service/api/login.json?u=' + username +
                '&pw=' + password);
        },
        getImportantNotices: function (employeeData, searchTags) {
            var me = this,
                url,
                deferred = $q.defer();
            url = me.addAuthTokenToUrl('/alfresco/service/important-notices/employee.json');
            if (searchTags) {
                url += '&searchtags=' + searchTags;
            }
            $http.post(url, employeeData).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        searchByTags: function (searchTags, site) {
            var me = this,
                url = '/alfresco/service/search-by-tags/';
            if (!site) {
                site = 'important-notices';
            }
            url += site + '/employee.json';
            url = me.addAuthTokenToUrl(url);
            if (searchTags) {
                url += '&searchtags=' + searchTags;
            }
            var documents = $http.get(url).then(function (response) {
                return response.data.data;
            }, function () {
                // failure case.
            });
            return documents;
        }
    };
    return service;
}]);