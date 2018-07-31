'use strict';

/**
 * @ngdoc directive
 * @name TrinetPassport.menuToggle
 */
trinetApp.directive('menuToggle', ['navigationService','$timeout', MenuToggle]);

/**
 * @ngdoc directive
 * @name  menuToggle
 * @module TrinetPassport
 * 
 * @restrict E
 * 
 * @description
 * Menu Toggle is a navigation component that toggles a list of links vertically
 * ported from https://material.angularjs.org
 *
 * @param section
 * section: {
 *     name : 'Section Name',
 *     type : 'toggle'
 *     subMenus: [
 *         {
 *             name : 'Page Name',
 *             url  : 'url',
 *             type : 'link',
 *             icon : 'tn-icon icon-icon_dashboard' // optional
 *         }
 *     ]
 * }
 * 
 * @usage
 * Basic:
 * <hljs lang="html">
 *     <menu-toggle section="section" ng-if="section.type === 'toggle' && !section.hidden"></menu-toggle>
 * </hljs>
 */
function MenuToggle(navigationService, $timeout){
    return {
        restrict: 'E',
        scope: {
            section: '='
        },
        templateUrl: 'app/shared/views/menuToggleView.html',
        link: function($scope, $element) {

            $scope.isOpen = function() {
                return navigationService.isSectionSelected($scope.section);
            };

            $scope.toggle = function() {
                angular.element('body').css('overflow-y', 'hidden');
                navigationService.toggleSelectSection($scope.section);

                $timeout(function () {
                    angular.element('body').css('overflow-y', 'visible');
                }, 1000);

            };
        }
    };
}
