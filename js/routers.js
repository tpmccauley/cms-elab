var ElabRouter = Backbone.Router.extend({
	routes: {
		"": "gotoDatasets",
		"parameters/:name": "gotoParameters",
		"plots/": "gotoPlot"
	},

	// This is temporary until I sort out models/collections
	elabState: {
		dataset: "",
		parameters: [],
		rawData: [],
		filteredData: []
	},

	getData: function(dataurl) {
		var request = $.ajax({
			async: false,
			type: "GET", 
			url: dataurl, 
			dataType: "json"
		});

		request.error(function(xhr, textStatus, errorThrown) {
			console.log(textStatus+" "+errorThrown);
		});	

		var that = this;
		request.success(function() {
			var data = eval(request.responseText);
			that.elabState.rawData = data;
		});
	},

	gotoDatasets: function() {
		$("#datasets").show();
		$("#parameters").hide();
		$("#plots").hide();
	},

	buildHistogram: function(data) {
		var binWidth = 0.1;
		var h = [];
		var histmin = 999999;
		var histmax = 0;
		var histogram = [];

		for ( var i = 0; i < data.length; i++ ) {
			var va = data[i];
			var v = Math.floor(va / binWidth);
			
			while (h.length <= v) {
				h.push(0);
			}
		
			var count = h[v];
			
			if (count == null) {
				count = 0;
			}
		
			h[v] = ++count;
			
			if (histmin > v) {
				histmin = v;
			}
		
			if (histmax < v) {
				histmax = v;
			}
		}

		var last = 0;

		for ( var j = histmin; j <= histmax; j++ ) {
			var x = j * binWidth;
			var y = h[j];
		
			if (isNaN(y)) {
				y = 0;
			}
			
			histogram.push([x - 0.0001, last]);
			histogram.push([x, y]);
			histogram.push([x + binWidth - 0.0001, y]);
			last = y;
		}

		return histogram;
	},

	gotoParameters: function(name) {
		this.elabState.dataset = name;

		datasets.get(name).set('selected', true);
		datasets.get(name).get('parameters').deselectAll();

		parameterImageView.collection = datasets.get(name).get('parameters');
		parameterImageView.render();

		parameterTableView.collection = datasets.get(name).get('parameters');
		parameterTableView.render();

		$("#datasets").hide();
		$("#parameters").show();
		$("#plots").hide();
	},

	gotoPlot: function() {
		this.getData(datasets.get(this.elabState.dataset).get('url'));

		var that = this;
		datasets.get(this.elabState.dataset)
				.get('parameters')
				.getSelected()
				.forEach(function(p) {
					var name = p.get('name');
					var histogram = that.buildHistogram(that.elabState.rawData.map(function(d) {return d[name];}));
					var plot = new Plot({data: [histogram], title: name});
					plots.add(plot);
				});

		console.log("Number of plots: " + plots.length);

		plotPageView.collection = plots;
		plotPageView.render();

		$("#datasets").hide();
		$("#parameters").hide();
		$("#plots").show();
	}	
});