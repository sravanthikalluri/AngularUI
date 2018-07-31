(function () {
    'use strict';


    /**
     * Widget DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAllWidgets: Function}}
     * @constructor
     */
    function WidgetService($q) {

        var widgets = {
            notices: [
                {
                    name: 'Your feedback is important -- All hands meeting...',
                    avatar: 'svg-1',
                    content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
                },
                {
                    name: 'Important W2 information',
                    avatar: 'svg-2',
                    content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
                },
                {
                    name: 'New Enhancement - Learn about new features...',
                    avatar: 'svg-3',
                    content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
                }
            ],
            offers: [
                {
                    name: 'Up to 50% off regular price rates on all sedans',
                    avatar: 'insert_emoticon'
                },
                {
                    name: 'Receive $29 a month membership',
                    avatar: 'attach_money'
                },
                {
                    name: '10% off your first Stitch Fix',
                    avatar: 'directions_car'
                }
            ]
        };

        // Promise-based API
        return {
            loadAllWidgets: function () {
                // Simulate async nature of real remote calls
                return $q.when(widgets);
            }
        };
    }

    angular.module('TrinetPassport')
        .service('widgetService', ['$q', WidgetService]);

})();
