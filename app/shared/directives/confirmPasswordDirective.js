/**
 * Created by Jayakrishna on 2/26/2016.
 */
trinetApp.directive('pwCheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('pwmatch', elem.val() === angular.element(firstPassword).val());
                });
            });
        }
    };
});