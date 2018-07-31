'use strict';
trinetApp.directive('dashboardSections', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'app/shared/views/dashboardTemplate.html'
    };
});

/**
 * This is for adding selected widgets
 */
trinetApp.directive('widgetList', function () {
    var directive = {};

    directive.restrict = 'E';
    /* restrict this directive to elements */

    directive.compile = function () {
        var linkFunction = function ($scope, element) {
            var tpl = '<div class="my_panel panel-default" style="width:300px;height:190px;">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' + $scope.header +
                '</h4>' +
                '</div><div class="panel-body">' + $scope.panel_content +
                '</div></div>';
            element.html(tpl);
        };

        return linkFunction;
    };

    return directive;
});
trinetApp.directive('addWidget', function () {
    var directive = {};

    directive.restrict = 'E';
    /* restrict this directive to elements */

    directive.compile = function () {
        var linkFunction = function ($scope, element) {
            var tpl = '<div id="sec_' + $scope.widget_length + '" class="panel-body" style="height:200px;">' +
                '<img src="assets/images/plus.png"' +
                'ng-dialog="firstDialogId"' +
                'ng-dialog-controller="widgetCtrl"' +
                'ng-dialog-scope="' + $scope + '"' +
                'ng-dialog-class="ngdialog-theme-default"' +
                'ng-dialog-pre-close-callback="directivePreCloseCallback"' +
                'ng-dialog-show-close="true"/></div>';
            element.html(tpl);
        };

        return linkFunction;
    };

    return directive;
});
