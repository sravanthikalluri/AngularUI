'use strict';
trinetApp.directive('delayedModel', function ($timeout) {
    return {
        scope: {
            model: '=delayedModel'
        },
        link: function (scope, element) {
            element.val(scope.model);
            scope.$watch('model', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    element.val(scope.model);
                }
            });
        }
    };
});
