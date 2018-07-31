'use strict';
trinetApp.directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            setTimeout(function () {
                scope.$emit('onRepeatLast', element, attrs);
                angular.element(".gridder").gridderExpander({
                    scrollOffset: 60,
                    scrollTo: "panel",
                    animationSpeed: 400,
                    animationEasing: "easeInOutExpo",
                    onStart: function () {
                    },
                    onExpanded: function () {
                        angular.element(".carousel").carousel();
                    },
                    onChanged: function () {
                    },
                    onClosed: function () {
                    }
                });
            }, 1);
        }
    };
});