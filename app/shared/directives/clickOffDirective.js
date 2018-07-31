/**
 * Created by ganesh on 9/6/2016.
 */
'use strict';
var directiveName = "clickOff";
trinetApp.directive(directiveName, ['$document', "$parse", function ($document, $parse) {
    return {
        restrict: 'A',
        link:  function (scope, element, attr, controller) {
            var anyOtherClickFunction = $parse(attr[directiveName]);
            var documentClickHandler = function (event) {
                var eventOutsideTarget = (element[0] !== event.target) && (0 === element.find(event.target).length);
                if (eventOutsideTarget) {
                    scope.$apply(function () {
                        anyOtherClickFunction(scope, {});
                    });
                }
            };

            $document.on("click", documentClickHandler);
            scope.$on("$destroy", function () {
                $document.off("click", documentClickHandler);
            });
        }
    };
}]);