'use strict';
trinetApp.directive('scrollTo', ['ScrollTo', function (ScrollTo) {
        return {
            restrict: "AC",
            compile: function () {

                return function (scope, element, attr) {
                    element.bind("click", function () {
                        ScrollTo.idOrName(attr.scrollTo, attr.offset);
                    });
                };
            }
        };
    }])
    .service('ScrollTo', ['$window', 'ngScrollToOptions', function ($window, ngScrollToOptions) {
        //find element with the given id or name and scroll to the first element it finds
        this.idOrName = function (idOrName, offset, focus) {
            var document = $window.document;
            //move to top if idOrName is not provided
            if (!idOrName) {
                $window.scrollTo(0, 0);
            }
            //set default action to focus element
            if (focus === undefined) {
                focus = true;
            }

            //check if an element can be found with id attribute
            var el = document.getElementById(idOrName);
            //check if an element can be found with name attribute if there is no such id
            if (!el) {
                el = document.getElementsByName(idOrName);

                if (el && el.length) {
                    el = el[0];
                }
                else {
                    el = null;
                }
            }
            //if an element is found, scroll to the element
            if (el) {
                if (focus) {
                    el.focus();
                }

                ngScrollToOptions.handler(el, offset);
            }
        };

    }])
    .provider("ngScrollToOptions", function () {
        this.options = {
            handler: function (el, offset) {
                if (offset) {
                    var top = $(el).offset().top - offset; //jshint ignore:line
                    window.scrollTo(0, top);
                }
                else {
                    el.scrollIntoView();
                }
            }
        };
        this.$get = function () {
            return this.options;
        };
        this.extend = function (options) {
            this.options = angular.extend(this.options, options);
        };
    });

