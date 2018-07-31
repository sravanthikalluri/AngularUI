trinetApp.directive('radialProgressChart',[ 'd3Service',
    function(d3Service) {

        return {
            restrict: 'E',
            scope: {
                amt: '=',
                max: '='
            },
            link: function(scope, elem, attr) {
              d3Service.d3().then(
                function(d3){
                  var duration   = 1000,
                      transition = 200;
                  var max = scope.max ? scope.max : 0;
                  var amt = scope.amt ? scope.amt : 0;


                  /* the 120's adjust overall size. .25 adjusts vertical position of numberic value */
                  drawDonutChart(
                    elem,
                    amt,//$('#progress').data('donut'),
                    158,
                    158,
                    ".25em"
                  );

                  function drawDonutChart(elem, percent, width, height, text_y) {
                    width = typeof width !== 'undefined' ? width : 290;
                    height = typeof height !== 'undefined' ? height : 290;
                    text_y = typeof text_y !== 'undefined' ? text_y : "-.10em";
                    //alert("calcPercent = " + calcPercent(0));

                    var dataset = {
                      lower: calcPercent(0),
                      upper: calcPercent(percent)
                    },
                    //radius = Math.min(width, width) / 2 - 3,
                    radius = 63,
                    pie = d3.layout.pie().sort(null),
                    format = d3.format("g");

                    var arc = d3.svg.arc()
                    .innerRadius(radius - 8)
                    .outerRadius(radius + 16);

                    var svg = d3.select(elem[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    var path = svg.selectAll("path")
                    .data(pie(dataset.lower))
                    .enter().append("path")
                    .attr("class", function(d, i) { return "color" + i ;})
                    .attr("d", arc)
                    .each(function(d) { this._current = d; }); // store the initial values

                    var fullcircle = svg.append("svg:circle")
                    .attr("stroke", "#43B9E4")
                    .attr("r", radius - 1)
                    .attr("class", 'circle');

                    var text = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", text_y);

                    svg.append("text")
                    .attr("dy", "2.0em")
                    .style("text-anchor", "middle")
                    .attr("class", "leaveLabel")
                    .attr("fill", "#AFAFB1")
                    .text(function(d) { return 'Hours Left'; });

                    if (typeof(percent) === "string") {
                      text.text(percent);
                    }
                    else {
                      var progress = 0;
                      path = path.data(pie(dataset.upper)); // update the data
                      path.transition().duration(duration).attrTween("d", function (a) {
                        // Store the displayed angles in _current.
                        // Then, interpolate from _current to the new angles.
                        // During the transition, _current is updated in-place by d3.interpolate.
                        var i  = d3.interpolate(this._current, a);
                        var i2 = d3.interpolateRound(progress, percent);
                        this._current = i(0);
                        return function(t) {
                          text.text( format(i2(t)) );
                          return arc(i(t));
                        };
                      }); // redraw the arcs
                    }
                  }

                  function calcPercent(percent) {
                    // Need to do this because d3 can't draw a circle if the max is 0.
                    var total = max;

                    if (total === 0) {
                        total = 1;
                    }

                    return [percent, total - percent];
                  }

                }
              );

            }
        };
    }
]);
