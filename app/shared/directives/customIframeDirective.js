'use strict';
trinetApp.directive('customIframe', function () {
    return {
        restrict: 'EA',
        template: '<iframe id="{{customId}}" class="extapp" style="overflow:hidden;height:900px;width:100%;border:0px;"' +
            //=' height="100%" width="100%"
        'border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" ' +
        'ng-src="{{url}}"></iframe>',

        link: function (scope, element) {
        }
    };
});