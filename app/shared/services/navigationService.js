'use strict';

/**
 * @ngdoc service
 * @name TrinetPassport.navigationService
 */
trinetApp.service('navigationService', [NavigationService]);

function NavigationService() {
    var openedSection = null;
    var currentSection = null;
    var currentPage = null;

    var self = {
        getMainMenuId: getMainMenuId,
        selectSection: selectSection,
        toggleSelectSection: toggleSelectSection,
        isSectionSelected: isSectionSelected,
        selectPage: selectPage,
        isPageSelected: isPageSelected,
        autoFocusContent: false,
        transformResponse: transformResponse,
        transformWidgetResponse: transformWidgetResponse
    };

    // APIs
    return self;

    // Internal Methods
    // -----------------

    function getMainMenuId(sideNavigations, url) {
        var subNavArray, subNav;

        for (var i = sideNavigations.length - 1; i >= 0; i--) {
            subNavArray = sideNavigations[i].subnav;

            // loop through the subnav
            if (angular.isArray(subNavArray)) {
                for (var j = subNavArray.length - 1; j >= 0; j--) {
                    subNav = subNavArray[j];
                    if (subNav.url === '#' + url) {
                        // find it
                        return sideNavigations[i].menuId;
                    }
                }
            }
        }

        return null;
    }

    function selectSection(section) {
        openedSection = section;
    }

    function toggleSelectSection(section) {
        openedSection = (openedSection === section ? null : section);
    }

    function isSectionSelected(section) {
        return openedSection === section;
    }

    function selectPage(section, page) {
        currentSection = section;
        currentPage = page;
    }

    function isPageSelected(page) {
        return currentPage === page;
    }

    function buildPages(data) {
        var subMenus;

        if (data && angular.isArray(data) && data.length > 0) {
            subMenus = data.map(function(item) {
                return {
                    menuId  : item.menuId,
                    name    : item.name,
                    url     : item.url,
                    theme   : item.theme,
                    target  : item.external === 'Y' ? '_blank' : '_self',
                    type  : item.type,
                    external : item.external
                };
            });
        }

      return subMenus;
    }

    function omitWidget(obj) {
        return obj.type !== 'Widget';
    }

    function transformResponse(data) {
        var menu, type, icon, subMenus;
        if (data && angular.isArray(data)) {
            menu = data.map(function(item) {
                type = item.subMenus.length > 0 ? 'toggle' : 'link';
                icon = 'tn-icon icon-icon_' + item.component;
                subMenus = buildPages(item.subMenus.filter(omitWidget));

                var returnObj =  {
                    menuId   : item.menuId,
                    type     : type,
                    name     : item.name,
                    theme    : item.theme,
                    icon     : icon,
                    url      : item.url,
                    external : item.external
                };

                if (subMenus){
                    returnObj.subMenus = subMenus;
                }
                else {
                    returnObj.type = 'link';
                }

                return returnObj;
            });
        }
        return menu;
    }

    function checkWidget(obj) {
        return obj.type === 'Widget';
    }

    function transformWidgetResponse(data) {
        var menu, type, icon, subMenus;
        if (data && angular.isArray(data)) {
            menu = data.map(function(item) {
                type = item.subMenus.length > 0 ? 'toggle' : 'link';
                icon = 'tn-icon icon-icon_' + item.component;
                subMenus = buildPages(item.subMenus.filter(checkWidget));

                var returnObj =  {
                    menuId   : item.menuId,
                    type     : type,
                    name     : item.name,
                    theme    : item.theme,
                    icon     : icon,
                    url      : item.url,
                    external : item.external
                };

                if (subMenus){
                    returnObj.subMenus = subMenus;
                }
                return returnObj;
            });
        }
        return menu;
    }

}
