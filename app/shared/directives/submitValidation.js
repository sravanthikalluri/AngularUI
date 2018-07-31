/**
 * Created by Naidu on 15-03-2016.
 */
'use strict';
trinetApp.directive("validSubmit", ["$parse", function ($parse) {
    return {
        restrict: 'AE',
        scope: {
            condition: "=",
            msg: "@"
        },
        require: 'form',
        // one time action per form
        link: function (scope, element, iAttrs, form) {
            form.$submitted = false;
            // get a hold of the function that handles submission when form is valid
            var fn = $parse(iAttrs.validSubmit);
            // register DOM event handler and wire into Angular's lifecycle with scope.$apply
            element.on("submit", function (event) {
                scope.$apply(function () {
                    // on submit event, set submitted to true (like the previous trick)
                    form.$submitted = true;
                    // if form is valid, execute the submission handler function and reset form submission state
                    if (form.$valid) {
                        fn(scope, {$event: event});
                        form.$submitted = false;
                    }
                    else {
                        angular.element('#' + iAttrs.id).addClass('movedown-alert');
                        angular.element('#' + iAttrs.id).prepend('<div class="alert red-alert alert-danger col-md-12 override-alert col-sm-12"><div class="col-md-1 col-sm-1 no-pad"><i class="icon-icon_Error error-icon" data-dismiss="alert" ng-click="closeAlert($index)"></i></div><div class="col-md-11 no-pad col-sm-11"> Please fix the below errors and submit again </div></div>  ');
                    }
                    var InvalidInputs = angular.element(event.currentTarget).find('.ng-invalid:visible');
                    angular.forEach(InvalidInputs, function (element) {
                        if (angular.element(element).hasClass('ng-valid-date')) {
                            angular.element(element).parent().addClass('error-warning');
                        } else {
                            angular.element(element).addClass('error-warning');
                        }
                    });


                });

            });
            element.on('focus', function () {
            });
            element.on('click', function () {
                scope.$apply(function () {
                });
            });
        }
    };
}
]);