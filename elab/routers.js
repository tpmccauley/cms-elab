Elab.Router = Backbone.Router.extend({
	routes: {
		"datasets-page": "showDatasets",
		"parameters-page/:name": "showParameters",
		"plots-page": "showPlots"
	},

	showDatasets: function() {
		console.log("showDatasets");
  
        Elab.emptyAll();   
        Elab.dataset_page_view.render();
        Elab.dataset_list_view.render();
        Elab.dataset_image_view.render();
	},

	showParameters: function(name) {
		console.log("showParameters");
        console.log(name, ' selected');

        Elab.selected_dataset = name;

        Elab.emptyAll();
        Elab.parameter_page_view.render();

        Elab.datasets.get(name).get('parameters').deselectAll();
        console.log(Elab.datasets.get(name).get('parameters').getSelected().length, ' parameters selected');

        Elab.parameter_buttons_view.collection = Elab.datasets.get(name).get('parameters');
        Elab.parameter_buttons_view.render();

        Elab.parameter_table_view.collection = Elab.datasets.get(name).get('parameters');
        Elab.parameter_table_view.render();
	},
	
    showPlots: function() {
		console.log("showPlots");

        Elab.getData(Elab.datasets.get(Elab.selected_dataset).get('url'));

        Elab.plots.reset();
        //Elab.charts.reset();

        Elab.charts.length = 0;

        Elab.datasets
            .get(Elab.selected_dataset)
            .get('parameters')
            .getSelected().each(function(p) {
                var name = p.get('name');
                var histogram = Elab.buildHistogram(Elab.raw_data.map(function(d) {return d[name];}), 0.1);
                var plot = new Elab.Plot({data: [histogram], title: name, name: name});

                plot.on("change", function(p){
                    console.log('changed attributes: ' + p.changedAttributes());
                });

                Elab.plots.add(plot);

                var dimension = Elab.crossfilter.dimension(function(d) {return +d[name];});
                //console.log(dimension.top(1));

                var group = dimension.group(function(d) {return Math.floor(d/0.1)*0.1;});
                //console.log(group);

                var xmax = dimension.top(1)[0][name];
                var xmin = dimension.bottom(1)[0][name];

                Elab.charts.push(Elab.barChart().dimension(dimension).group(group).x(d3.scale.linear().domain([xmin, xmax]).rangeRound([0,500])));

                //var chart = new Elab.Chart({name:name, dimension:dimension, group:group});
                //Elab.charts.add(chart);
            });

        Elab.emptyAll();
        Elab.plot_page_view.render();

        Elab.flot_plots_view.collection = Elab.plots;
        Elab.flot_plots_view.render();

        Elab.crossfilter_view.collection = Elab.datasets.get(Elab.selected_dataset).get('parameters').getSelected();
        Elab.crossfilter_view.render();
        //Elab.crossfilter_view.collection = Elab.charts;
        //Elab.crossfilter_view.render();

        var formatNumber = d3.format(",d");

        var chart = d3.selectAll(".chart")
                .data(Elab.charts)
                .each(function(chart) { chart.on("brush", renderAll).on("brushend", renderAll); });

        function render(method) {
            d3.select(this).call(method);
        }

        function renderAll() {
            chart.each(render);
            d3.select("#active").text(formatNumber(Elab.all.value()));
        }

        /*
        window.filter = function(filters) {
            filters.forEach(function(d, i) { Elab.charts[i].filter(d); });
            renderAll();
        };

        window.reset = function(i) {
            Elab.charts[i].filter(null);
            renderAll();
        };
        */

        renderAll();
	}
});