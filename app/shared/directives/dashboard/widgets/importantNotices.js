'use strict';

trinetApp.directive('importantNotices', function() {
    return {
        restrict : 'E',
        scope : false,
        templateUrl : 'app/shared/views/importantNotices.html'
    };
});
