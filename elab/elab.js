Elab.jpsi_dataset = new Elab.Dataset({id:"Jpsimumu"});
Elab.jpsi_dataset.set({
    name: "Jpsimumu",
    image: "../img/Jpsimumu.png",
    svg: "../svg/Jpsimumu.svg",
    description: "2000 di-muon events around the J/&#0968",
    url: "http://localhost:8000/data/dimuon_2-5GeV.json",
    content: "The J/&#0968 is made up of two charm quarks. It is unstable, and decays to two muons around 6% of the time."
});

Elab.zmumu_dataset = new Elab.Dataset({id:"Zmumu"});
Elab.zmumu_dataset.set({
    name: "Zmumu", 
    image: "../img/Zmumu.png",
    svg: "../svg/Zmumu.svg",
    description: "500 di-muon events around the Z boson",
    url: "http://localhost:8000/data/Zmumu.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.zee_dataset = new Elab.Dataset({id:"Zee"});
Elab.zee_dataset.set({        
    name: "Zee", 
    image: "../img/Zee.png",
    svg: "../svg/Zee.svg",
    description: "500 di-electron events around the Z boson",
    url: "http://localhost:8000/data/Zee.json",
    content: "The Z is a neutral gauge boson and is one of the carriers of the weak force. It is unstable, and decays to either two muons or two electrons around 3% of the time."
});

Elab.wenu_dataset = new Elab.Dataset({id:"Wenu"});
Elab.wenu_dataset.set({        
    name: "Wenu", 
    image: "../img/Wenu.png",
    svg: "../svg/Wenu.svg",
    description: "500 events of W to e&#0957",
    url: "http://localhost:8000/data/Wenu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.wmunu_dataset = new Elab.Dataset({id:"Wmunu"});
Elab.wmunu_dataset.set({
    name: "Wmunu", 
    image: "../img/Wmunu.png",
    svg: "../svg/Wmunu.svg",
    description: "500 events of W to &#0956&#0957",
    url: "http://localhost:8000/data/Wmunu.json",
    content: "The W is a charged gauge boson and is one of the carriers of the weak force. It is unstable, and decays into either a muon and a muon neutrino or an electron and an electron neutrino around 11% of the time.",
});

Elab.dimuon_dataset = new Elab.Dataset({id:"dimuon"});
Elab.dimuon_dataset.set({
    name: "dimuon", 
    image: "../img/dimuon.png",
    svg: "../svg/dimuon.svg",
    description: "100,000 di-muon events in the invariant mass range 2-110 GeV",
    url: "http://localhost:8000/data/dimuon100k.json",
    content: "Two protons colliding will produce all sorts of particles. Some of these particles can then produce two muons."
});

Elab.dielectron_dataset = new Elab.Dataset({id:"dielectron"});
Elab.dielectron_dataset.set({
    name: "dielectron",
    image: "../img/dielectron.png",
    svg: "../svg/dielectron.svg",
    description: "100,000 di-electron events in the invariant mass range 2-100 GeV",
    url: "http://localhost:8000/data/dielectron100k.json",
    content: "Two protons colliding will produce all sorts of particles. Some of these particles can then produce two electrons."
});

Elab.h4l_dataset = new Elab.Dataset({id:"Hto4l"});
Elab.h4l_dataset.set({
    name: "Hto4l",
    image: "../img/HtoZZ.png",
    svg: "../svg/HtoZZ.svg",
    description: "3 events in the mass range 120-130 GeV, where a Higgs candidate decays into 4 muons, 2 muons and 2 electrons, and into 4 electrons."
});

Elab.hgammagamma_dataset = new Elab.Dataset({id:"HtoGammaGamma"});
Elab.hgammagamma_dataset.set({
    name: "HtoGammaGamma",
    image: "../img/HtoGammaGamma.png",
    svg: "../svg/HtoGammaGamma.svg",
    description: "10 events in the mass range 120-130 GeV, where a Higgs candidate decays into two photons.",
    url: "http://localhost:8000/data/diphoton.json"
});

Elab.datasets = new Elab.Datasets();

Elab.datasets.on("add", function(ds) {
    console.log("Added dataset: " + ds.get("id"));
});

Elab.jpsi_primary = new Elab.ParentParticle({id:"jpsi"});
Elab.jpsi_primary.set({
    name: "jpsi",
    description: "J/&#0968",
    urls: ["http://localhost:8000/data/dimuon_2-5GeV.json"]
});

Elab.Z_primary = new Elab.ParentParticle({id:"Z"});
Elab.Z_primary.set({
    name: "Z",
    description: "Z",
    urls: ["http://localhost:8000/data/Zmumu.json", "http://localhost:8000/data/Zee.json"]
});

Elab.W_primary = new Elab.ParentParticle({id:"W"});
Elab.W_primary.set({
    name: "W",
    description: "W",
    urls: ["http://localhost:8000/data/Wenu.json", "http://localhost:8000/data/Wmunu.json"]
});

Elab.dimuon_product = new Elab.DecayProduct({id:"dimuon"});
Elab.dimuon_product.set({
    name: "dimuon",
    description: "dimuon",
    urls: ["http://localhost:8000/data/dimuon_2-5GeV.json", "http://localhost:8000/data/Zmumu.json", "http://localhost:8000/data/dimuon100k.json"]
});

Elab.dielectron_product = new Elab.DecayProduct({id:"dielectron"});
Elab.dielectron_product.set({
    name: "dielectron",
    description: "dielectron",
    urls: ["http://localhost:8000/data/Zee.json", "http://localhost:8000/data/dielectron100k.json"]
});

Elab.enu_product = new Elab.DecayProduct({id:"enu"});
Elab.enu_product.set({
    name: "enu",
    description: "enu",
    urls: ["http://localhost:8000/data/Wenu.json"]
});

Elab.munu_product = new Elab.DecayProduct({id:"munu"});
Elab.munu_product.set({
    name: "munu",
    description: "munu",
    urls: ["http://localhost:8000/data/Wmunu.json"]
});

// We could parse the data files to fetch the parameters but there
// is no information on the units nor is there a description of what 
// the parameters describe. We don't have to be too generic about this
// since we know what data will be read in. There are also some parameters
// that we don't want to (or can't) plot. Therefore, we specify
// the schema here.

Elab.Wenu_parameters = new Elab.Parameters([
    {name:"E", unit:"GeV", description:"The total energy of the electron", id:"E", selected:false, image:"../img/E.gif"},
    {name:"MET", unit:"GeV", description:"The missing transverse energy due to the neutrino", id:"MET", selected:false, image:"../img/MET.gif"},
    {name:"phiMET", unit:"radians", description:"The phi angle of the missing transverse energy", id:"phiMET", selected:false, image:"../img/phiMET.gif"},
    {name:"eta", unit:"", description:"The pseudorapidity of the electron", id:"eta", selected:false, image:"../img/eta.gif"},
    {name:"phi", unit:"radians", description:"The phi angle of the electron direction", id:"phi", selected:false, image:"../img/phi.gif"},
    {name:"pt", unit:"GeV", description:"The transverse momentum of the electron", id:"pt", selected:false, image:"../img/pt.gif"}
]);

Elab.Wmunu_parameters = new Elab.Parameters([
    {name:"E", unit:"GeV", description:"The total energy of the muon", id:"E", selected:false, image:"../img/E.gif"},
    {name:"MET", unit:"GeV", description:"The missing transverse energy due to the neutrino", id:"MET", selected:false, image:"../img/MET.gif"},
    {name:"phiMET", unit:"radians", description:"The phi angle of the missing transverse energy", id:"phiMET", selected:false, image:"../img/phiMET.gif"},
    {name:"eta", unit:"", description:"The pseudorapidity of the muon", id:"eta", selected:false, image:"../img/eta.gif"},
    {name:"phi", unit:"radians", description:"The phi angle of the muon direction", id:"phi", selected:false, image:"../img/phi.gif"},
    {name:"pt", unit:"GeV", description:"The transverse momentum of the muon", id:"pt", selected:false, image:"../img/pt.gif"}
]);

Elab.dimuon_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.dielectron_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first electron", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first electron", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first electron", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first electron direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first electron", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second electron", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second electron", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second electron", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second electron direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second electron", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two electrons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Jpsi_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Zmumu_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first muon", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first muon", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first muon", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first muon direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first muon", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second muon", id:"E2", selected:false, image:"../img/E2.gif"},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second muon", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second muon", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second muon direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second muon", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two muons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.Zee_parameters = new Elab.Parameters([
    {name:"E1", unit:"GeV", description:"The total energy of the first electron", id:"E1", selected:false, image:"../img/E1.gif"},
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first electron", id:"pt1", selected:false, image:"../img/pt1.gif"},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first electron", id:"eta1", selected:false, image:"../img/eta1.gif"},
    {name:"phi1", unit:"radians", description:"The phi angle of the first electron direction", id:"phi1", selected:false, image:"../img/phi1.gif"},
    {name:"Q1", unit:"", description:"The charge of the first electron", id:"Q1", selected:false, image:"../img/Q1.gif"},
    {name:"E2", unit:"GeV", description:"The total energy of the second electron", id:"E2", selected:false, image:"../img/E2.gif"},
   	{name:"pt2", unit:"GeV", description:"The transverse momentum of the second electron", id:"pt2", selected:false, image:"../img/pt2.gif"},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second electron", id:"eta2", selected:false, image:"../img/eta2.gif"},
    {name:"phi2", unit:"radians", description:"The phi angle of the second electron direction", id:"phi2", selected:false, image:"../img/phi2.gif"},
    {name:"Q2", unit:"", description:"The charge of the second electron", id:"Q2", selected:false, image:"../img/Q2.gif"},
    {name:"M", unit:"GeV", description:"The invariant mass of the two electrons", id:"M", selected:false, image:"../img/M.gif"}
]);

Elab.gammagamma_parameters = new Elab.Parameters([
    {name:"pt1", unit:"GeV", description:"The transverse momentum of the first photon", id:"pt1", selected:false},
    {name:"eta1", unit:"", description:"The pseudorapidity of the first photon", id:"eta1", selected:false},
    {name:"phi1", unit:"radians", description:"The phi angle of the first photon", id:"phi1", selected:false},
    {name:"pt2", unit:"GeV", description:"The transverse momentum of the second photon", id:"pt2", selected:false},
    {name:"eta2", unit:"", description:"The pseudorapidity of the second photon", id:"eta2", selected:false},
    {name:"phi2", unit:"radians", description:"The phi angle of the second photon", id:"phi2", selected:false},
    {name:"M", unit:"GeV", description:"The invariant mass of the two photons", id:"M", selected:false}
]);

Elab.jpsi_dataset.set('parameters', Elab.Jpsi_parameters);
Elab.zee_dataset.set('parameters', Elab.Zee_parameters);
Elab.zmumu_dataset.set('parameters', Elab.Zmumu_parameters);
Elab.wenu_dataset.set('parameters', Elab.Wenu_parameters);
Elab.wmunu_dataset.set('parameters', Elab.Wmunu_parameters);
Elab.dimuon_dataset.set('parameters', Elab.dimuon_parameters);
Elab.dielectron_dataset.set('parameters', Elab.dielectron_parameters);
Elab.hgammagamma_dataset.set('parameters', Elab.gammagamma_parameters);

Elab.datasets.add(Elab.jpsi_dataset);
Elab.datasets.add(Elab.zee_dataset);
Elab.datasets.add(Elab.zmumu_dataset);
Elab.datasets.add(Elab.wenu_dataset);
Elab.datasets.add(Elab.wmunu_dataset);
Elab.datasets.add(Elab.dimuon_dataset);
Elab.datasets.add(Elab.dielectron_dataset);
//Elab.datasets.add(Elab.h4l_dataset);
Elab.datasets.add(Elab.hgammagamma_dataset);

Elab.plots = new Elab.Plots();

/*
Elab.charts = new Elab.Charts();

Elab.charts.on("add", function(ch) {
    console.log("Added chart: " + ch.get("name") + ", size: " + this.size());
});
*/

Elab.emptyAll = function() {
    $('#datasets').empty();
    $('#parameters').empty();
    $('#plots').empty();
};

Elab.buildHistogram = function(data, bw) {
    data = data.map(function(d) {return +d;});
    
    var minx = d3.min(data),
        maxx = d3.max(data),
        nbins = Math.floor((maxx-minx) / bw);

    console.log('min, max, binwidth, nbins: ' + minx + ', ' + maxx + ', ' + bw + ', ' + nbins);

    var histogram = d3.layout.histogram();
    histogram.bins(nbins);
    data = histogram(data);

    var output = [];
    for ( var i = 0; i < data.length; i++ ) {
        output.push([data[i].x, data[i].y]);
        output.push([data[i].x + data[i].dx, data[i].y]);
    }
    return output;
};

Elab.getData = function(data_url) {
    var request = $.ajax({
        async: false,
        type: "GET", 
        url: data_url, 
        dataType: "json"
    });

    request.error(function(xhr, textStatus, errorThrown) {
        console.log(textStatus+" "+errorThrown);
    }); 

    request.success(function() {
        var data = eval(request.responseText);
        Elab.raw_data = data;
        Elab.crossfilter = crossfilter(data);
        Elab.all = Elab.crossfilter.groupAll();
        console.log(Elab.crossfilter.size());
    });
};

// For now, before we properly factorize all of this,
// follow closely from the crossfilter example.
Elab.barChart = function() {
    if (! Elab.barChart.id ) Elab.barChart.id = 0;

    var margin = {top: 10, right: 10, bottom: 20, left: 10},
        x,
        y = d3.scale.linear().range([200, 0]),
        id = Elab.barChart.id++,
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

                if ( g.empty() ) {
                
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

                if ( brushDirty ) {
                    brushDirty = false;
                    g.selectAll(".brush").call(brush);
                    div.select(".title a").style("display", brush.empty() ? "none" : null);
            
                    if ( brush.empty() ) {
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
};

Elab.charts = [];

$(function() {
    Elab.dataset_page_view = new Elab.DatasetPageView();
    Elab.parameter_page_view = new Elab.ParameterPageView();
    Elab.plot_page_view = new Elab.PlotPageView();

    Elab.dataset_list_view = new Elab.DatasetListView();
    Elab.dataset_image_view = new Elab.DatasetImageView();

    Elab.dataset_list_view.collection = Elab.datasets;
    Elab.dataset_image_view.collection = Elab.datasets;

    Elab.parameter_buttons_view = new Elab.ParameterButtonsView();
    Elab.parameter_table_view = new Elab.ParameterTableView();

    Elab.flot_plots_view = new Elab.FlotPlotsView();
    Elab.crossfilter_view = new Elab.CrossfilterView();

    Elab.router = new Elab.Router();
    Backbone.history.start();
});


