'use strict';
var trinetApp = angular.module('TrinetPassport', ['ui.bootstrap','TrinetPassport.templates','ngRoute', 'ngResource', 'ngSanitize', 'ngDialog', 'tc.chartjs', 'ngDraggable', 'ngMask',
    'ngStorage', 'ui.sortable', 'ui.select', 'ngCookies', 'angular.filter', 'ngTagsInput', 'vAccordion', 'ngMaterial', 'angulartics', 'angulartics.google.analytics','d3','infinite-scroll','ui.router','ngMap']);


/**
 * config Trinet Material Theme
 * @param  {Object} $mdThemingProvider Angular Material Theming service
 * https://material.angularjs.org
 */
trinetApp.config(function ($mdThemingProvider, $compileProvider, $mdIconProvider, $httpProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);
    $urlMatcherFactoryProvider.strictMode(false);
    $urlRouterProvider.otherwise('/companyDashboard');
    var primaryPalette = $mdThemingProvider.extendPalette('grey', {
        '500': 'FFFFFF' // trinet-white
    });

    var accentPalette = $mdThemingProvider.extendPalette('deep-orange', {
        'A200': 'E37222', // trinet-orange
        'A100': 'FFFFFF', // trinet-white
        'A400': '0073CF'  // trinet-blue
    });

    var backgroundPalette = $mdThemingProvider.extendPalette('grey', {
        '50': 'F9FAFB', // light-grey
        '100': 'E3E3E3', // background
        '200': 'F4F4F7', // warm-grey
        '300': 'B2BECF', // description
        '400': 'E4EBF1', // cool-grey
        '500': '7F96A3', // mid-grey
        '600': '546A79' // standard-font
    });

    // Register the palettes
    $mdThemingProvider.definePalette('primaryPalette', primaryPalette);
    $mdThemingProvider.definePalette('accentPalette', accentPalette);
    $mdThemingProvider.definePalette('backgroundPalette', backgroundPalette);

    // Use that theme for the primary intentions
    $mdThemingProvider.theme('trinet')
        .primaryPalette('primaryPalette', {
            'default': '500',
            'hue-1': '500',
            'hue-2': '500',
            'hue-3': '500'
        })
        .accentPalette('accentPalette', {
            'default': 'A200',
            'hue-1': 'A100',
            'hue-2': 'A400',
            'hue-3': 'A400'
        })
        .warnPalette('red')
        .backgroundPalette('backgroundPalette');

    // set 'trinet' as the default theme
    $mdThemingProvider.setDefaultTheme('trinet');

    $mdIconProvider
        .icon("menu", "../assets/svg/menu.svg", 24)
        .fontSet('tn', 'icomoon');
});

/**
 * config Trinet Material Icon
 * @param  {Object} $mdIconProvider) Angular Material Icon service
 * https://material.angularjs.org
 */
trinetApp.config(function ($mdIconProvider) {



});
trinetApp.run(function ($rootScope) {

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            // handle route changes
            function getObject(theObject,url) {
                var result = null;
                if(theObject instanceof Array) {
                    for(var i = 0; i < theObject.length; i++) {
                        result = getObject(theObject[i], url);
                            if (result) {
                            break;
                        }
                    }
                }
                else {
                    for(var prop in theObject){
                        if(prop == 'url') {
                            if(theObject[prop] == url) {
                                return theObject;
                            }
                        }
                        if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            result = getObject(theObject[prop], url);
                                if (result) {
                                    break;
                                }
                        }
                    }
                }
                return result;
            }
            if(next==null || next== undefined)
            {
                next = window.location.href;
            }
            var titleKey = next.substring(next.lastIndexOf("/")+1);
            if($rootScope.menuItemsObj ) {
                var titleObj=getObject($rootScope.menuItemsObj,"#/"+titleKey);
                if(titleObj && titleObj.name){
                    $rootScope.title ='TriNet Platform'+' | '+titleObj.name;
                }else{
                    $rootScope.title = 'TriNet Platform';
                }    
            }
        });
});

