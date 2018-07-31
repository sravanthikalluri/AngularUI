/**
 * This directive is used to format the currency value with dollar symbol
 * Created by Ganesh on 12/11/2015.
 */

trinetApp.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.$formatters.unshift(function () {
                return $filter(attrs.format)(ctrl.$modelValue);
            });

            elem.bind('blur', function () {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]);

