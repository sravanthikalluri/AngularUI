(function () {
    'use strict';
    function printDirective() {
        var backup = document.body.innerHTML;

        var printSection = document.getElementById('printSection');
        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
        }
        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {
                    printElement(elemToPrint);
                }
                document.body.innerHTML = backup;
                //window.location.reload(true);
            });
            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            };
        }
        function printElement(elem) {
            // clones the element you want to print
            var domClone = elem.cloneNode(true);
            printSection.appendChild(domClone);
            document.body.innerHTML = printSection.innerHTML;
            window.print();
        }
        return {
            link: link,
            restrict: 'A'
        };
    }
    trinetApp.directive('ngPrint', [printDirective]);
}(window.angular));