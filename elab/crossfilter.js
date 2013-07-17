// This is all very sub-optimal but works for now

function dilepton_plots(url) {
  d3.json(url, function(events) {

  console.log(events.length);

  var formatNumber = d3.format(",d");

  events.forEach(function(d, i) {
    d.E1 = +d.E1;
    d.E2 = +d.E2;
    d.pt1 = +d.pt1;
    d.pt2 = +d.pt2;
    d.eta1 = +d.eta1;
    d.eta2 = +d.eta2;
    d.phi1 = +d.phi2;
    d.phi2 = +d.phi2;
    d.Q1 = +d.Q1;
    d.Q2 = +d.Q2;
    d.M = +d.M;
  }); 

  var range_max = 400;

  var nestByPt = d3.nest()
    .key(function(d) {return d.pt1});

  var event = crossfilter(events),
    all = event.groupAll(),

    E1 = event.dimension(function(d) {return d.E1;}),
    E1s = E1.group(function(d) {return Math.floor(d/12.5)*12.5;}),
    
    E2 = event.dimension(function(d) {return d.E2;}),
    E2s = E2.group(function(d) {return Math.floor(d/12.5)*12.5;}),
   
    pt1 = event.dimension(function(d) {return d.pt1;}),
    pt1s = pt1.group(function(d) {return Math.floor(d/5.)*5;})
    
    pt2 = event.dimension(function(d) {return d.pt2;}),
    pt2s = pt2.group(function(d) {return Math.floor(d/5.)*5;}),

    eta1 = event.dimension(function(d) {return d.eta1;}),
    eta1s = eta1.group(function(d) {return Math.floor(d/0.2)*0.2;}), 
    
    eta2 = event.dimension(function(d) {return d.eta2;}),
    eta2s = eta2.group(function(d) {return Math.floor(d/0.2)*0.2;}),
    
    phi1 = event.dimension(function(d) {return d.phi1;}),
    phi1s = phi1.group(function(d) {return Math.floor(d/(Math.PI*0.05))*(Math.PI*0.05);}),
    
    phi2 = event.dimension(function(d) {return d.phi2;}),
    phi2s = phi2.group(function(d) {return Math.floor(d/(Math.PI*0.05))*(Math.PI*0.05);}),
   
    Q1 = event.dimension(function(d) {return d.Q1;}),
    Q1s = Q1.group(function(d) {return Math.floor(d);}),
    
      Q2 = event.dimension(function(d) {return d.Q2;}),
    Q2s = Q2.group(function(d) {return Math.floor(d);}),
   
    M = event.dimension(function(d) {return d.M;}),
    Ms = M.group(function(d) {return Math.floor(d/5.)*5;});

  var charts = [
    barChart()
        .dimension(E1)
        .group(E1s)
      .x(d3.scale.linear()
        .domain([0, 500])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(E2)
        .group(E2s)
      .x(d3.scale.linear()
        .domain([0, 500])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(pt1)
        .group(pt1s)
      .x(d3.scale.linear()
        .domain([0,200])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(pt2)
        .group(pt2s)
      .x(d3.scale.linear()
        .domain([0,200])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(eta1)
        .group(eta1s)
      .x(d3.scale.linear()
        .domain([-4, 4])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(eta2)
        .group(eta2s)
      .x(d3.scale.linear()
        .domain([-4, 4])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(phi1)
        .group(phi1s)
      .x(d3.scale.linear()
        .domain([-Math.PI, Math.PI])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(phi2)
        .group(phi2s)
      .x(d3.scale.linear()
        .domain([-Math.PI, Math.PI])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(Q1)
        .group(Q1s)
      .x(d3.scale.linear()
        .domain([-1.1, 1.1])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(Q2)
        .group(Q2s)
      .x(d3.scale.linear()
        .domain([-1.1, 1.1])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(M)
        .group(Ms)
      .x(d3.scale.linear()
        .domain([0, 200])
        .rangeRound([0,range_max]))
  ];

  var chart = d3.selectAll(".chart")
      .data(charts)
      .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

  renderAll();
 
  function render(method) {
    d3.select(this).call(method);
  }

  function renderAll() {
    chart.each(render);
    d3.select("#active").text(formatNumber(all.value()));
  }

  window.filter = function(filters) {
    filters.forEach(function(d, i) { charts[i].filter(d); });
    renderAll();
  };

  window.reset = function(i) {
    charts[i].filter(null);
    renderAll();
  };

  function barChart() {
    if (!barChart.id) barChart.id = 0;

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
        x,
        y = d3.scale.linear().range([200, 0]),
        id = barChart.id++,
        axis = d3.svg.axis().orient("bottom"),
        brush = d3.svg.brush(),
        brushDirty,
        dimension,
        group,
        round;

    function chart(div) {
      var width = x.range()[1],
          height = y.range()[0];

          y.domain([0, group.top(1)[0].value]);

      div.each(function() {

        var div = d3.select(this),
            g = div.select("g");

        if (g.empty()) {
          div.select(".title").append("a")
              .attr("href", "javascript:reset(" + id + ")")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

          g = div.append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          g.append("clipPath")
              .attr("id", "clip-" + id)
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          g.selectAll(".bar")
              .data(["background", "foreground"])
            .enter().append("path")
              .attr("class", function(d) { return d + " bar"; })
              .datum(group.all());

          g.selectAll(".foreground.bar")
              .attr("clip-path", "url(#clip-" + id + ")");

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(axis);

          var gBrush = g.append("g").attr("class", "brush").call(brush);
          gBrush.selectAll("rect").attr("height", height);
          gBrush.selectAll(".resize").append("path").attr("d", resizePath);
        }

        if (brushDirty) {
          brushDirty = false;
          g.selectAll(".brush").call(brush);
          div.select(".title a").style("display", brush.empty() ? "none" : null);
          if (brush.empty()) {
            g.selectAll("#clip-" + id + " rect")
                .attr("x", 0)
                .attr("width", width);
          } else {
            var extent = brush.extent();
            g.selectAll("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
          }
        }

        g.selectAll(".bar").attr("d", barPath);
      });

      function barPath(groups) {
        var path = [],
            i = -1,
            n = groups.length,
            d;

       
        while (++i < n) {
          d = groups[i];

          

          path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
        }
        return path.join("");
      }

      function resizePath(d) {
        var e = +(d == "e"),
            x = e ? 1 : -1,
            y = height / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }
    }

    brush.on("brushstart.chart", function() {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("display", null);
    });

    brush.on("brush.chart", function() {
      var g = d3.select(this.parentNode),
          extent = brush.extent();
      if (round) g.select(".brush")
          .call(brush.extent(extent = extent.map(round)))
        .selectAll(".resize")
          .style("display", null);
      g.select("#clip-" + id + " rect")
          .attr("x", x(extent[0]))
          .attr("width", x(extent[1]) - x(extent[0]));
      dimension.filterRange(extent);
    });

    brush.on("brushend.chart", function() {
      if (brush.empty()) {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", "none");
        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
        dimension.filterAll();
      }
    });

    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      axis.scale(x);
      brush.x(x);
      return chart;
    };

    chart.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return chart;
    };

    chart.dimension = function(_) {
      if (!arguments.length) return dimension;
      dimension = _;
      return chart;
    };

    chart.filter = function(_) {
      if (_) {
        brush.extent(_);
        dimension.filterRange(_);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return chart;
    };

    chart.group = function(_) {
      if (!arguments.length) return group;
      group = _;
      return chart;
    };

    chart.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return chart;
    };

    return d3.rebind(chart, brush, "on");
  }
});
};

function W_plots(url) {
  d3.json(url, function(events) {

  console.log(events.length);

  var formatNumber = d3.format(",d");

  events.forEach(function(d, i) {
    d.E = +d.E;
    d.MET = +d.MET;
    d.phi = +d.phi;
    d.phiMET = +d.phiMET;
    d.pt = +d.pt;
  }); 

  var range_max = 400;

  var nestByPt = d3.nest()
    .key(function(d) {return d.pt});

  var event = crossfilter(events),
    all = event.groupAll(),
    E = event.dimension(function(d) {return d.E;}),
    Es = E.group(function(d) {return Math.floor(d/12.5)*12.5;}),
    MET = event.dimension(function(d) {return d.MET;}),
    METs = MET.group(function(d) {return Math.floor(d/5)*5;}),
    phi = event.dimension(function(d) {return d.phi;}),
    phis = phi.group(function(d) {return Math.floor(d/(Math.PI*0.05))*(Math.PI*0.05);}),
    phiMET = event.dimension(function(d) {return d.phiMET;}),
    phiMETs = phiMET.group(function(d) {return Math.floor(d/(Math.PI*0.05))*(Math.PI*0.05);}),
    pt = event.dimension(function(d) {return d.pt;}),
    pts = pt.group(function(d) {return Math.floor(d/3.75)*3.75;});

  var charts = [
    barChart()
        .dimension(E)
        .group(Es)
      .x(d3.scale.linear()
        .domain([0, 500])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(MET)
        .group(METs)
      .x(d3.scale.linear()
        .domain([0, 200])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(phi)
        .group(phis)
      .x(d3.scale.linear()
        .domain([-Math.PI, Math.PI])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(phiMET)
        .group(phiMETs)
      .x(d3.scale.linear()
        .domain([-Math.PI, Math.PI])
        .rangeRound([0,range_max])),

    barChart()
        .dimension(pt)
        .group(pts)
      .x(d3.scale.linear()
        .domain([0,150])
        .rangeRound([0,range_max]))
  ];

  var chart = d3.selectAll(".chart")
      .data(charts)
      .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

  renderAll();
 
  function render(method) {
    d3.select(this).call(method);
  }

 
  function renderAll() {
    chart.each(render);
    d3.select("#active").text(formatNumber(all.value()));
  }

  window.filter = function(filters) {
    filters.forEach(function(d, i) { charts[i].filter(d); });
    renderAll();
  };

  window.reset = function(i) {
    charts[i].filter(null);
    renderAll();
  };

  function barChart() {
    if (!barChart.id) barChart.id = 0;

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
        x,
        y = d3.scale.linear().range([200, 0]),
        id = barChart.id++,
        axis = d3.svg.axis().orient("bottom"),
        brush = d3.svg.brush(),
        brushDirty,
        dimension,
        group,
        round;

    function chart(div) {
      var width = x.range()[1],
          height = y.range()[0];

          y.domain([0, group.top(1)[0].value]);

      div.each(function() {

        var div = d3.select(this),
            g = div.select("g");

        if (g.empty()) {
          div.select(".title").append("a")
              .attr("href", "javascript:reset(" + id + ")")
              .attr("class", "reset")
              .text("reset")
              .style("display", "none");

          g = div.append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          g.append("clipPath")
              .attr("id", "clip-" + id)
            .append("rect")
              .attr("width", width)
              .attr("height", height);

          g.selectAll(".bar")
              .data(["background", "foreground"])
            .enter().append("path")
              .attr("class", function(d) { return d + " bar"; })
              .datum(group.all());

          g.selectAll(".foreground.bar")
              .attr("clip-path", "url(#clip-" + id + ")");

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(axis);

          var gBrush = g.append("g").attr("class", "brush").call(brush);
          gBrush.selectAll("rect").attr("height", height);
          gBrush.selectAll(".resize").append("path").attr("d", resizePath);
        }

        if (brushDirty) {
          brushDirty = false;
          g.selectAll(".brush").call(brush);
          div.select(".title a").style("display", brush.empty() ? "none" : null);
          if (brush.empty()) {
            g.selectAll("#clip-" + id + " rect")
                .attr("x", 0)
                .attr("width", width);
          } else {
            var extent = brush.extent();
            g.selectAll("#clip-" + id + " rect")
                .attr("x", x(extent[0]))
                .attr("width", x(extent[1]) - x(extent[0]));
          }
        }

        g.selectAll(".bar").attr("d", barPath);
      }); // end of div.each

      function barPath(groups) {
        var path = [],
            i = -1,
            n = groups.length,
            d;

       
        while (++i < n) {
          d = groups[i];

          

          path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
        }
        return path.join("");
      }

      function resizePath(d) {
        var e = +(d == "e"),
            x = e ? 1 : -1,
            y = height / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
      }
    } // end of chart function

    brush.on("brushstart.chart", function() {
      var div = d3.select(this.parentNode.parentNode.parentNode);
      div.select(".title a").style("display", null);
    });

    brush.on("brush.chart", function() {
      var g = d3.select(this.parentNode),
          extent = brush.extent();
      if (round) g.select(".brush")
          .call(brush.extent(extent = extent.map(round)))
        .selectAll(".resize")
          .style("display", null);
      g.select("#clip-" + id + " rect")
          .attr("x", x(extent[0]))
          .attr("width", x(extent[1]) - x(extent[0]));
      dimension.filterRange(extent);
    });

    brush.on("brushend.chart", function() {
      if (brush.empty()) {
        var div = d3.select(this.parentNode.parentNode.parentNode);
        div.select(".title a").style("display", "none");
        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
        dimension.filterAll();
      }
    });

    chart.margin = function(_) {
      if (!arguments.length) return margin;
      margin = _;
      return chart;
    };

    chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      axis.scale(x);
      brush.x(x);
      return chart;
    };

    chart.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return chart;
    };

    chart.dimension = function(_) {
      if (!arguments.length) return dimension;
      dimension = _;
      return chart;
    };

    chart.filter = function(_) {
      if (_) {
        brush.extent(_);
        dimension.filterRange(_);
      } else {
        brush.clear();
        dimension.filterAll();
      }
      brushDirty = true;
      return chart;
    };

    chart.group = function(_) {
      if (!arguments.length) return group;
      group = _;
      return chart;
    };

    chart.round = function(_) {
      if (!arguments.length) return round;
      round = _;
      return chart;
    };

    return d3.rebind(chart, brush, "on");
  } // end of bar chart
});
};




