var ElabRouter = Backbone.Router.extend({
	routes: {
		"": "gotoDatasets",
		"parameters/:name": "selectDataset",
		"plot/:parameter": "gotoPlot"
	},

	elabState: {
		dataset: "",
		parameter: "",
		rawData: [],
		filteredData: [],
		histogram: [],

		log: function() {
			console.log("dataset: " + this.dataset);
			console.log("parameter: " + this.parameter);
		}
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

	gotoPlot: function(parameter) {
		this.elabState.parameter = parameter;
	
		var dataset = datasets.get(this.elabState.dataset);
		this.getData(dataset.get('url'));

		this.elabState.filteredData = this.elabState.rawData.map(function(d) {return d[parameter];});

		this.buildHistogram();
		var plot = new Plot({data: [this.elabState.histogram]});
		plotView.model = plot;
		plotView.render();

		$("#datasets").hide();
		$("#parameters").hide();
		$("#plots").show();
	},	

	buildHistogram: function() {
		var binWidth = 0.1;
		var data = this.elabState.filteredData;
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

		this.elabState.histogram = histogram;
		//console.log(this.elabState.histogram);
	},

	selectDataset: function(name) {
		this.elabState.dataset = name;
		this.elabState.log();

		var parameters = datasets.get(name).get('parameters');
		console.log(parameters);

		parameterTableView.collection = parameters;
		parameterDropdownView.collection = parameters;

		parameterDropdownView.render();

		$("#datasets").hide();
		$("#parameters").show();
		$("#plots").hide();
	}
});